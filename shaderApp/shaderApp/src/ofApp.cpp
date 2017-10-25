#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	cout << "listening for osc messages on port " << PORT << "\n";
	receiver.setup(PORT);

	ofDisableArbTex();

	running_shader = false;
	//load_shader("FAKE_LOVE");
}

//--------------------------------------------------------------
void ofApp::update(){
	while (receiver.hasWaitingMessages()) {
		ofxOscMessage m;
		receiver.getNextMessage( &m);

		if (m.getAddress() == "/start_shader") {
			current_object = m.getArgAsString(0);
			pos_x = m.getArgAsFloat(1);
			pos_x = ofMap(pos_x, 0, 640, 1680, 0) - 20;
			
			if (load_shader_bool) {
				load_shader(current_object);
				load_shader_bool = false;
			}
			running_shader = true;
		}
		else {
			running_shader = false;
			load_shader_bool = true;
		}
	}
}
//--------------------------------------------------------------
void ofApp::draw(){
	ofSetColor(255);
	ofBackground(ofColor::white);
	//run_FL_shader();

	if (running_shader) {
		if (current_object == "ALADDIN'S_LAMP") {
			run_genie_shader();
		}
		if (current_object == "FAKE_LOVE") {
			run_FL_shader();
		}
		if (current_object == "MY_AIRPLANE") {
			run_space_shader();
		}
	}
	ofDrawBitmapStringHighlight(ofToString(ofGetFrameRate()), 20 , 20);
	/*
	ofFill();
	ofSetColor(ofColor::white);
	ofDrawCircle(pos_x, 800, 200);
	*/
}


//void ofApp::load_shader(string object) {
//
//	start_time = ofGetElapsedTimef();
//	
//	if (object == "umbrella") {
//		shader.load("shader/umbrella/rain_effect");
//		baseImg.loadImage("image/Balloon.jpg");
//		noiseImg.loadImage("image/noise.JPG");
//	}
//	if (object == "ALADDIN'S_LAMP") {
//		cout << "loading ALADDIN shader" << endl;
//		shader.load("shader/genie/genie");
//		baseImg.loadImage("image/genie_crop.jpg");
//		noiseImg.loadImage("image/noise1.jpg");
//
//		emitter.setup();
//		curlNoise.setup(1024 * 256);
//	}
//	if (object == "FAKE_LOVE") {
//		bufferFBO.allocate(1000, 1000);
//		bufferFBO.begin();
//		ofClear(0, 0, 0, 255);
//		bufferFBO.end();
//
//		rotateFBO.allocate(500, 1000);
//		rotateFBO.begin();
//		ofClear(0, 0, 0, 255);
//		rotateFBO.end();
//
//		shader.load("shader/FakeLove/FakeLove");
//		shaderBuffer.load("shader/heartBeat/heartBeat");
//		baseImg.loadImage("image/FL_crop.jpg");
//		baseImg2.loadImage("image/FL_edge.jpg");
//		baseImg3.loadImage("image/FL_black.jpg");
//	}
//	
//	if (object == "MY_AIRPLANE") {		//space shuttle
//		shader.load("shader/spaceship/galaxy");
//		baseImg.loadImage("image/universe.png");
//	}
//}
//
//void ofApp::run_umbrella_shader() {
//	shader.begin();
//	float current_time = ofGetElapsedTimef();
//	current_time = current_time - int(current_time / 5) * 5;
//	//cout << current_time << endl;
//	shader.setUniform1f("current_time", current_time);
//	shader.setUniform2f("windowSize", ofGetWidth(), ofGetHeight());
//	shader.setUniformTexture("baseImg", baseImg.getTextureReference(), 1);
//	shader.setUniformTexture("noiseImg", noiseImg.getTextureReference(), 2);
//
//	ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
//	shader.end();
//}
//
//void ofApp::run_genie_shader() {
//	ofBackground(ofColor::black);
//	float current_time = ofGetElapsedTimef() - start_time;
//
//	cout << ofToString(current_time)  << endl;
//
//	shader.begin();
//	shader.setUniform1f("u_time", current_time);
//	shader.setUniform2f("windowSize", ofGetWidth(), ofGetHeight());
//	shader.setUniformTexture("genie_tex", baseImg.getTextureReference(), 1);
//	shader.setUniformTexture("noise_tex", noiseImg.getTextureReference(), 2);
//	ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
//	shader.end();
//
//
//	if (sin(current_time / 2) + 0.5 < .3) {
//		particle_time += .03;
//		float t = particle_time;
//		float a = 350;
//		float x = a*cos(t) / (1 + sin(t)*sin(t));
//		float y = a*sin(t)*cos(t) / (1 + sin(t)*sin(t)) + 200;
//	
//		//cout << ofToString(x) << "\t" << ofToString(y) << endl;
//
//		emitter.update(x, y);
//		curlNoise.update();
//		
//		ofPushStyle();
//		ofSetColor(255, 255, 255);
//		ofPushMatrix();
//		ofTranslate(ofGetWidth() / 2.0, ofGetHeight() / 2.0);
//		curlNoise.draw();
//		ofSetColor(ofColor::white);
//		emitter.draw();
//		ofPopMatrix();
//		ofPopStyle();
//	}
//
//	// to-do: crossfade effect between two effects. now it's a rough cut
//}
//
//void ofApp::run_FL_shader() {
//	float current_time = ofGetElapsedTimef() - start_time;
//
//	bufferFBO.begin();
//	ofClear(255,255,255, 255);
//	shaderBuffer.begin();
//	shaderBuffer.setUniform1f("iTime", current_time);
//	shaderBuffer.setUniform2f("iResolution", 1000,1000);
//	shaderBuffer.setUniformTexture("FL_black", baseImg3.getTextureReference(), 1);
//	ofDrawRectangle(0, 0, 1000, 1000);
//	shaderBuffer.end();
//	bufferFBO.end();
//	//bufferFBO.draw(0, 0, 1000,1000);
//
//	//rotate the crop image and draw to a fbo
//	rotateFBO.begin();
//	ofClear(0,0,0,255);
//	ofPushMatrix();
//	ofTranslate(baseImg.getWidth() / 2, baseImg.getHeight() / 2);
//	ofRotate(ofGetFrameNum() * .1, 0, 0, 1);
//	baseImg.draw(-baseImg.getWidth() / 2, -baseImg.getHeight() / 2);
//	ofPopMatrix();
//	rotateFBO.end();
//
//	//rotateFBO.draw(0, 0);	
//
//	shader.begin();
//	shader.setUniform1f("iTime", current_time);
//	shader.setUniform2f("iResolution", ofGetWidth(), ofGetHeight());
//	shader.setUniformTexture("FL_crop", rotateFBO.getTextureReference(), 1);
//	shader.setUniformTexture("FL_edge", baseImg2.getTextureReference(), 2);
//	//shader.setUniformTexture("FL_black", baseImg3.getTextureReference(), 3);
//	shader.setUniformTexture("FL_bump", bufferFBO.getTextureReference(), 4);
//
//	ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
//	shader.end();
//}
//
//
//void ofApp::run_space_shader() {
//
//	shader.begin();
//	float current_time = ofGetElapsedTimef() - start_time;
//
//	cout << "current_time: " << ofToString(current_time ) << endl;
//
//	shader.setUniform1f("current_time", current_time);
//	shader.setUniform2f("resolution", ofGetWidth(), ofGetHeight());
//	shader.setUniformTexture("baseImg", baseImg.getTextureReference(), 1);
//	ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
//	shader.end();
//
//	//baseImg.draw(0, 0, ofGetWidth(), ofGetHeight());
//}
