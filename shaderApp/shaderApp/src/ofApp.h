#pragma once

#include "ofMain.h"
#include "ofxOsc.h"

#include "ofxCurlNoise.h"

#define HOST "localhost"
#define PORT 5000
class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		ofShader shader, shaderBuffer;
		ofImage baseImg, baseImg2, baseImg3;

		ofFbo bufferFBO, rotateFBO;
		bool running_shader;
		int index;
		string current_object;
		float pos_x;

		int start_time;


		ofxOscReceiver	receiver;
};
