#include "ofMain.h"
#include "ofApp.h"

//========================================================================
int main( ){
	//ofSetupOpenGL(1024,768, OF_WINDOW);

	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:	

	ofGLFWWindowSettings settings;
	settings.width = 1680;
	settings.height = 1050;
	settings.setGLVersion(3, 2);
	ofCreateWindow(settings);
	ofRunApp(new ofApp());
}
