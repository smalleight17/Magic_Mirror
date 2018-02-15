from flask import Flask
import asyncio
import threading
import time
import sys
import os
import http.client
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError


# global variables
index = 0
era = '90s'
keyword_list = ['entertainment', 'fashion', 'toys', 'culture', 'style', 'games', 'music', 'celebrity']
#search_keyword = ''
items = []

app = Flask(__name__, static_url_path = '')

def run_app():
    print ('server is up running!')
    app.run()

@app.route('/')
def index_page():
	return app.send_static_file('index.html')


# Downloading entire Web Document (Raw Page Content)
def download_page(url):
    version = (3, 0)
    cur_version = sys.version_info
    if cur_version >= version:  # If the Current Version of Python is 3.0 or above
        import urllib.request  # urllib library for Extracting web pages
        try:
            headers = {}
            headers['User-Agent'] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
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
            headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
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
    global items
    items = []
    # while True:
    #     item, end_content = _images_get_next_item(page)
    #     if item == "no_links":
    #         break
    #     else:
    #         items.append(item)  # Append all the links in the list named 'Links'
    #         # time.sleep(0.1)        #Timer could be used to slow down the request for image downloads
    #         page = page[end_content:]

    count = 0
    while (count < 20):
        item, end_content = _images_get_next_item(page)
        if item == "no_links":
            break
        else:
            items.append(item)  # Append all the links in the list named 'Links'
            page = page[end_content:]
            count+=1

    return items



def download_image(k, url):

    try:
        req = Request(url, headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"})
        response = urlopen(req, None, 5)

        data = response.read()
        response.close()
        #print("Successfully get data ====>", k)
        return data

    except IOError as e:
        #print("IOError on image " + str(k) + "\t" + str(e))
        return 0

    except HTTPError as e:
        #print("HTTPError" + str(k))
        return 0

    except URLError as e:
        #print("URLError " + str(k))
        return 0

    except http.client.IncompleteRead as e:
        #print("Incomplete Read " + str(k))
        return 0


def write_image_file(future):
    global index
    data = future.result()
    if data != 0 :
        output_file = open('static/'+ era +"/"+str(index)+".jpg",'wb')
        output_file.write(data)
        #print ("Callback function", index, "write to image")

        index += 1
    else:
        #print("Callback function", index, "error")
        pass

async def main():
    loop = asyncio.get_event_loop()

    k = 0
    future_list = []
    while k < len(items):
        future = loop.run_in_executor(None, download_image, k, items[k])
        future.add_done_callback(write_image_file)
        future_list.append(future)
        k = k + 1

    k = 0
    while k < len(future_list):
        await future_list[k]
        k = k + 1


def start_download(args):
    print("Start downloading images... Keyword: ", args)

    global era
    search_keyword = args

    try:
        os.makedirs('static/'+ era)
    except OSError as e:
        if e.errno != 17:
            raise
        pass

    search = search_keyword.replace('_', '%20')

    url = 'https://www.google.com/search?q=' + search + '&espv=2&biw=1366&bih=667&site=webhp&source=lnms&tbm=isch&sa=X&ei=XosDVaCXD8TasATItgE&ved=0CAcQ_AUoAg'

    raw_html = (download_page(url))
    items = _images_get_all_items(raw_html)

    print("Total Image Links = " + str(len(items)))

    t0 = time.time()

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())

    t1 = time.time()
    print("Total time taken: ", t1 - t0, "\n")


if __name__ == "__main__":

    # start a new thread for serving webpage
    threads = []
    t = threading.Thread(target = run_app)
    threads.append(t)
    t.start()

    # download images based on keywords
    for i in range(len(keyword_list)):
        start_download(era+"_"+keyword_list[i])