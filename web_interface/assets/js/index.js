// hide scrollbar
$("body").css("overflow", "hidden");

$(document).click(function(){

	circleWithTail(-600, 0, 200);
	setTimeout(loadMotionGraphics, 5000);
});



function loadMotionGraphics(){

	dotMatrix(500,-450, 0, true);
	dotMatrix(0,400, 6, true);
	dotMatrix(-800,-200, 3, false);
	
	threeRect(-50,200);
	twoSkewRect(-500, 400);
	twoSkewRect(-540, 430);
	
	dotCross(500, 200);
	
	halfCircle(960,200,90);
	twoHalfCircles(600, -300);
	
	rotatingCross(-400, -300);
	
	//need to change direction
	lineAndDots();
	sineWaveInit();

	//eraSVG();
	loadImages();

}

function loadImages(){
	// img #1
	var newImg1 = document.createElement('img');
	newImg1.src= "assets/images/1.jpg";
	newImg1.width = 300;
	newImg1.height = 300;
	newImg1.style.position = "absolute";
	newImg1.style.left = "800px";
	newImg1.style.top = "150px";
	newImg1.style.opacity = "0";
	document.body.appendChild(newImg1);

	// img #2
	var newImg2 = document.createElement('img');
	newImg2.src= "assets/images/2.jpg";
	newImg2.style.position = "absolute";
	newImg2.style.left = "1196px";
	newImg2.style.top = "634px";
	newImg2.style.opacity = "0";
	document.body.appendChild(newImg2);

	// img #3
	var newImg3 = document.createElement('img');
	newImg3.src= "assets/images/3.jpg";
	newImg3.width = 560;
	newImg3.style.position = "absolute";
	newImg3.style.left = "650px";
	newImg3.style.top = "600px";
	newImg3.style.opacity = "0";
	document.body.appendChild(newImg3);


	var tl = new TimelineMax({repeat: -1, repeatDelay: 2});
	tl.to(newImg1, 2, {opacity: 1},1)
	  .to(newImg1, 2, {opacity: 0}, 10)
	  .to(newImg2, 2, {opacity: 1}, 12)
	  .to(newImg2, 2, {opacity: 0}, 22)
	  .to(newImg3, 2, {opacity: 1}, 24)
	  .to(newImg3, 2, {opacity: 0}, 34);

	imgFrame(520,225, 560, 375);

}