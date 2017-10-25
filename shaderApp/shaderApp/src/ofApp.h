#pragma once

#include "ofMain.h"
#include "ofxOsc.h"

#include "ofxCurlNoise.h"

#define HOST "localhost"
#define PORT 12345
class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		//void load_shader(string object);
		//void run_umbrella_shader();
		//void run_space_shader();
		//void run_genie_shader();
		//void run_FL_shader();

		ofShader shader, shaderBuffer;
		ofImage baseImg, baseImg2, baseImg3;
		ofImage noiseImg;
		ofFbo bufferFBO, rotateFBO;
		bool running_shader;
		bool load_shader_bool = true;
		string current_object;
		float pos_x;
		float particle_time = 0;
		float start_time;

		ParticleEmitter emitter;
		ofxCurlNoise curlNoise;
		ofxOscReceiver	receiver;
};
