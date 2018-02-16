# Magic Mirror
Magic Mirror uses Yolo real-time object detection, shader and transparent LCD. When you put an object under the camera, Yolo detects it and shader runs an animation sharing same context on the transparent screen. (For example, if you put an exotic Aladdin's lamp, it will show Genie and smoke on the screen)

## Video

## Yolo App
I'm doing this on Windows and would recommend Visual Studio 2015 because ofxDarknet is using CUDA 8.0 and there's no official announce that it supports VS 2017.

### Dependencies
* ofxDarknet
* ofxOpenCV
* ofxOsc

### How to configure Yolo on Windows and Visual Studio
* Requires nVidia GPU and CUDA.
* I used openFramework and [ofxDarknet](https://github.com/mrzl/ofxDarknet). Refer to the repo on setup.



### How to train your own model for custom objects
* I was mostly following [this tutorial](https://timebutt.github.io/static/how-to-train-yolov2-to-detect-custom-objects/) on how to prepare my own dataset, and also read a lot on the original [darknet repo](https://github.com/AlexeyAB/darknet) on training, when to stop training and how to make sense of all the parameters.

* I trained 4 custom objects on my own at first. Later I downloaded original [Pascal VOC dataset](https://pjreddie.com/projects/pascal-voc-dataset-mirror/) and merge with my own dataset and trained them together, so I have a model that detects 24 objects.

* Weights file of my custom model can be downloaded [here](https://drive.google.com/open?id=0B_VZFKGn-JtrS0x3R2dVSXBROGM). Put them under yoloApp/yoloApp/bin/data.

## Shader App

### Dependencies
* ofxOsc
* ofxCurlNoise

Put everything in the shader folder under shaderApp/shaderApp/bin/data