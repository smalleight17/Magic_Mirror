import asyncio
#import requests
import datetime
import random

import time
import sys
import os
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError
import http.client
from pathlib import Path

search_keyword = 'circle nature'
keywords = ' high resolution'
DIR_PATH = "./{}".format(search_keyword)

try:
    os.makedirs(search_keyword)
except OSError as e:
    if e.errno != 17:
        raise
    pass

search = search_keyword.replace(' ', '%20')
keywords = keywords.replace(' ', '%20')

t0 = time.time()


# Downloading entire Web Document (Raw Page Content)
def download_page(url):
    version = (3, 0)
    cur_version = sys.version_info
    if cur_version >= version:  # If the Current Version of Python is 3.0 or above
        import urllib.request  # urllib library for Extracting web pages
        try:
            headers = {}
            headers[
                'User-Agent'] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
            req = urllib.request.Request(url, headers=headers)
            resp = urllib.request.urlopen(req)
            respData = str(resp.read())
            return respData
        except Exception as e:
            print(str(e))
    else:  # If the Current Version of Python is 2.x
        import urllib2
        try:
            headers = {}
            headers[
                'User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
            req = urllib2.Request(url, headers=headers)
            response = urllib2.urlopen(req)
            page = response.read()
            return page
        except:
            return "Page Not found"


# Finding 'Next Image' from the given raw page
def _images_get_next_item(s):
    start_line = s.find('rg_di')
    if start_line == -1:  # If no links are found then give an error!
        end_quote = 0
        link = "no_links"
        return link, end_quote
    else:
        start_line = s.find('"class="rg_meta"')
        start_content = s.find('"ou"', start_line + 1)
        end_content = s.find(',"ow"', start_content + 1)
        content_raw = str(s[start_content + 6:end_content - 1])
        return content_raw, end_content


# Getting all links with the help of '_images_get_next_image'
def _images_get_all_items(page):
    items = []
    while True:
        item, end_content = _images_get_next_item(page)
        if item == "no_links":
            break
        else:
            items.append(item)  # Append all the links in the list named 'Links'
            # time.sleep(0.1)        #Timer could be used to slow down the request for image downloads
            page = page[end_content:]
    return items


url = 'https://www.google.com/search?q=' + search + keywords + '&espv=2&biw=1366&bih=667&site=webhp&source=lnms&tbm=isch&sa=X&ei=XosDVaCXD8TasATItgE&ved=0CAcQ_AUoAg'
raw_html = (download_page(url))
items = _images_get_all_items(raw_html)
data_list = []

print("Total Image Links = " + str(len(items)))
print("\n")

'''
info = open('output.txt', 'a')
info.write(search_keyword + ": " + str(items) + "\n\n\n")  # Write the title of the page
info.close()
'''

print("Starting Download...")


def download_image(k, url):
    try:
        req = Request(url, headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"})
        response = urlopen(req, None, 5)

        data = response.read()
        response.close()

    # dir_list = os.listdir(DIR_PATH)
    # print(os.path.abspath(DIR_PATH), len(dir_list))

    # output_file = open(search_keyword+"/"+str(k)+".jpg",'wb')
    # output_file.write(data)

    # print("completed ====> "+str(k))

    except IOError as e:
        print("IOError on image " + str(k) + "\t" + str(e))
        return 0

    except HTTPError as e:
        print("HTTPError" + str(k))
        return 0

    except URLError as e:
        print("URLError " + str(k))
        return 0

    print ("Successfully get data", k)
    return data


async def main():
    loop = asyncio.get_event_loop()

    k = 0
    future_list = []
    while (k < len(items)):
        future = loop.run_in_executor(None, download_image, k, items[k])
        future_list.append(future)
        k = k + 1

    k = 0
    while (k < len(future_list)):
        data = await future_list[k]
        data_list.append(data)
        k = k + 1


loop = asyncio.get_event_loop()
loop.run_until_complete(main())

print ("data_list len:", len(data_list))

#write to folder
i=0
while (i < len(data_list)):
    if (data_list[i] != 0):
        output_file = open(search_keyword + "/" + str(i) + ".jpg", 'wb')
        output_file.write(data_list[i])
    i = i + 1

t1 = time.time()
print("Total time taken: ", t1 - t0)
