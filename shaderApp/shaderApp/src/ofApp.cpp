#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	cout << "listening for osc messages on port " << PORT << "\n";
	receiver.setup(PORT);

	ofDisableArbTex();
	running_shader = false; 	
	index = 0;
}

//--------------------------------------------------------------
void ofApp::update(){
	while (receiver.hasWaitingMessages()) {
		ofxOscMessage m;
		receiver.getNextMessage( &m);

		if (m.getAddress() == "/start_shader") {
			current_object = m.getArgAsString(0);
			running_shader = true;
			start_time = ofGetFrameNum();
		}
		else {
			running_shader = false;
		}
	}
}
//--------------------------------------------------------------
void ofApp::draw(){
	ofSetColor(255);
	ofBackground(ofColor::white);

	if (running_shader) {
		index = (ofGetFrameNum() - start_time) / 120;
		
		string filename = "../../../../pythonServer/" + current_object + "/" + ofToString(index) + ".jpg";
		baseImg.loadImage(filename);
		baseImg.draw(0, 0);
		
		
	}

}