# Magic Mirror
Magic Mirror uses Yolo real-time object detection, shader and transparent LCD. When you put an object under the camera, Yolo detects it and shader runs an animation sharing same context on the transparent screen. (For example, if you put an exotic Aladdin's lamp, it will show Genie and smoke on the screen)

## Video


## How to configure Yolo on Windows and Visual Studio
* Requires nVidia GPU and CUDA.
* I used openFramework and [ofxDarknet](https://github.com/mrzl/ofxDarknet). Refer to the repo on setup.



## How to train your own model for custom objects
I was mostly following [this tutorial](https://timebutt.github.io/static/how-to-train-yolov2-to-detect-custom-objects/) on how to prepare my own dataset, and also read a lot on the original [darknet repo](https://github.com/AlexeyAB/darknet) on training, when to stop training and how to make sense of all the parameters.

I trained 4 custom objects on my own at first. Later I downloaded original [Pascal VOC dataset](https://pjreddie.com/projects/pascal-voc-dataset-mirror/) and merge with my own dataset and trained them together, so I have a model that detects 24 objects.