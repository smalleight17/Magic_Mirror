/************************** #1 dot matrix *************************************/

var dotsArr = [];
var dotsIndexShuffle = [];
var shapeArr = [];

for (var i=0; i< 25; i++){
  dotsIndexShuffle.push(i);
}

shuffle(dotsIndexShuffle);

for (var k=0; k < 25; k++){
  var dot;

  if(k==12){
    dot = {
      index: k,
      delay: dotsIndexShuffle[k]/8,
      origPosX: k % 5 * 20 - 40,
      origPosY: Math.floor(k / 5) * 20 - 40,
      finalPosX: 1800,
      finalPosY: 2000 
    };
  }else{
    dot = {
      index: k,
      delay: dotsIndexShuffle[k]/8,
      origPosX: k % 5 * 20 - 40,
      origPosY: Math.floor(k / 5) * 20 - 40,
      finalPosX: (k % 5 * 20 - 40) * 50 + (Math.random() * 500 - 250),
      finalPosY: (Math.floor(k/ 5) * 20 - 40) * 50 + (Math.random() * 500 - 250) 
    };
  }

  dotsArr.push(dot);
}

for(var j=0; j< 25; j++){
  //console.log(dotsArr[j]);
  var shape = new mojs.Shape({
    shape: 'circle',
    radius: 1,
    fill: 'white',
    x: dotsArr[j].origPosX,
    y: dotsArr[j].origPosY,
    delay: dotsArr[j].delay,
    opacity: 0,
    isShowStart: true
  });
  shapeArr.push(shape.el);
}

console.log(dotsArr);
for(var a = 0; a < 25; a++){
  var stringX = "+=" + dotsArr[a].finalPosX + "px";
  var stringY = "+=" + dotsArr[a].finalPosY + "px";

  var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
  tl.to(shapeArr[a],0.5, {opacity:1, delay: dotsArr[a].delay})
    .to(shapeArr[a], 1, {left: stringX, top:stringY}, 10);  
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}


/************************** #2 three rect *************************************/
// var rect1 = new mojs.Shape({
//     shape: 'rect',
//     radiusX: 40,
//     radiusY: 8,
//     y: -35,
//     fill: 'white',
//     isShowStart: true
// });

// var rect2 = new mojs.Shape({
//     shape: 'rect',
//     radiusX: 40,
//     radiusY: 8,
//     fill: 'white',
//     isShowStart: true
// });

// var rect3 = new mojs.Shape({
//     shape: 'rect',
//     radiusX: 40,
//     radiusY: 8,
//     y: 35,
//     fill: 'white',
//     isShowStart: true
// });

// var tl = new TimelineMax({repeat: -1, repeatDelay: 2.5, delay: 1});
// tl.staggerTo([rect1.el, rect2.el, rect3.el], 0.5 ,{left: "+=100px", ease:Power4.easeOut}, 0.08)
// .to([rect1.el, rect2.el], 0.5, {top:"+=35"}, 3)
// .to(rect3.el, 0.5, {top:"-=70"}, 3)
// .staggerTo([rect3.el, rect1.el, rect2.el], 0.5 ,{left: "-=100px", ease:Power4.easeOut}, 0.08);

/************************** #3 half circle *************************************/

// var circle1 = new mojs.Shape({
//   shape:        'circle',
//   fill:         'none',
//   radius:       100,
//   stroke:       'white',
//   strokeWidth:  20,
//   strokeDasharray: '100%',
//   strokeDashoffset: '-100%',
//   angle:        180,  
//   isShowStart:  true,
// });

// var circle2 = new mojs.Shape({
//   shape:        'circle',
//   fill:         'none',
//   radius:       100,
//   stroke:       'white',
//   strokeWidth:  20,
//   strokeDasharray: '100%',
//   strokeDashoffset: '50%',
//   opacity: 0,
//   isShowStart:  true,

// });

// var circle1SVG = circle1.el.childNodes[0].childNodes[0];
// var circle2SVG = circle2.el.childNodes[0].childNodes[0];

// var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
// tl.to(circle1SVG, 1, {strokeDashoffset: -314.1592653589793})
//   .to(circle2.el, 1, {opacity: 1}, 2)
//   .to(circle1.el, 1, {opacity: 0}, 3)
//   .to(circle2SVG, 1, {strokeDashoffset: 628.3185307179587}, 9);

/************************** #4 two skew rect *************************************/

// var shape_left = new mojs.Shape({
//   shape:          'rect',
//   fill:           'white',
//   radius:         15,
//   radiusY:      40,
//   opacity: 0,
//   isShowStart: true
// });

// var shape_right = new mojs.Shape({
//   shape:          'rect',
//   fill:           'white',
//   radius:         15,
//   radiusY:      40,
//   opacity: 0,
//   isShowStart: true
// });
  
// TweenMax.to([shape_left.el, shape_right.el], 0.1, {skewX:"30deg", opacity:1});

// var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
// tl.to(shape_left.el, 0.8, {top:"+=15px"}, 0.2)
//   .to(shape_right.el, 0.8, {top:"-=15px"}, 0.2)
//   .to(shape_left.el, 0.8, {left:"-=30px"}, 1)
//   .to(shape_right.el, 0.8, {left:"+=30px"}, 1)
//   .to(shape_left.el, 0.8, {top:"-=15px"}, 1.8)
//   .to(shape_right.el, 0.8, {top:"+=15px"}, 1.8)
//   .to(shape_left.el, 0.8, {left:"+=30px"}, 2.6)
//   .to(shape_right.el, 0.8, {left:"-=30px"}, 2.6)

/************************** #5 two half circles *************************************/

// var circle1 = new mojs.Shape({
// 	shape: 'circle',
// 	fill:  'none',
// 	stroke: 'white',
// 	strokeWidth: 12,
// 	radius: 45,
// 	y: -70,
// 	strokeDasharray: '100%',
// 	strokeDashoffset: '50%',
// 	isShowStart: true
// });

// var circle2 = new mojs.Shape({
// 	shape: 'circle',
// 	fill:  'none',
// 	stroke: 'white',
// 	strokeWidth: 12,
// 	radius: 45,
// 	y: 70,
// 	strokeDasharray: '100%',
// 	strokeDashoffset: '50%',
// 	angle: 90,
// 	isShowStart: true
// });

// var tl = new TimelineMax({repeat:-1,repeatDelay:8});
// tl.to([circle1.el, circle2.el], 2, {rotation: "+=90"})
// 	.to([circle1.el, circle2.el], 2, {rotation: "+=90",delay: 8})
// 	.to([circle1.el, circle2.el], 2, {rotation: "+=90",delay: 8})
// 	.to([circle1.el, circle2.el], 2, {rotation: "+=90",delay: 8});

/************************** #6 line and dots *************************************/

  // var shape = new mojs.Shape({
  //       shape:          'rect',
  //       fill:           'white',
  //       radiusX:        1,
  //       radiusY:      200, 
  //       x: 400,
  //       y: -300,
  //       opacity: 0,
  //       left:         '20%',
  //       duration:       1000,
  //       isShowStart: true
  //     });
      
  // var circle_top = new mojs.Shape({
  //   shape: 'circle',
  //   fill: 'white',
  //   radius: 3,
  //   y:-200,
  //   opacity: 0,
  //   delay: 1000,
  //   duration: 1000,
  //   isShowStart: true,
  // });
      
  // var circle_bottom = new mojs.Shape({
  //   shape: 'circle',
  //   fill: 'white',
  //   radius: 3,
  //   y:-200,
  //   opacity: 0,
  //   duration: 1000,
  //   isShowStart: true
  // });
  
  // shape.el.append(circle_top.el);
  // shape.el.append(circle_bottom.el);
  
  // var line_svg = shape.el.childNodes[0].childNodes[0];

  // TweenMax.to(line_svg, 0.1, {height: 0});
  // var tl = new TimelineMax({repeat: -1, repeatDelay: 6});
  // tl.to([shape.el, circle_bottom.el, circle_top.el], 0.1, {opacity: 1}, 0.4)
  //   .to(line_svg, 1, {height:400}, 0.5)
  //   .to(circle_bottom.el, 1, {top:"+=400"}, 0.5)
  //   .to(line_svg, 1, {height: 0, y:"+=400"}, 1.5)
  //   .to(circle_top.el, 1, {top:"+=400"}, 1.5)
  //   .to(shape.el, 0.1, {rotation:"+=90" , transformOrigin:"bottom left"}, 2.4)
  //   .to(line_svg, 1, {height: 400, y:"-=400"}, 2.5)
  //   .to(circle_bottom.el, 1, {top:"-=400"}, 2.5)
  //   .to(line_svg, 1, {height: 0}, 3.5)
  //   .to(circle_top.el, 1, { top:"-=400"}, 3.5)
  //   .to(shape.el, 1, {opacity: 0});

/************************** #7 dot alpha *************************************/

  // var circle = new mojs.Shape({
  //   shape: 'circle',
  //   fill: 'white',
  //   radius: 8,
  //   isShowStart: true
  // });

  // var tl = new TimelineMax({repeat: -1});
  // tl.to(circle.el, 2, {opacity: 0}, 8)
  //   .to(circle.el, 2, {opacity: 1}, 16);

/************************** #8 dot -> cross *************************************/

// var rect1 = new mojs.Shape({
//   shape:          'rect',
//   fill:           'white',
//   radiusX:        40, 
//   radiusY:        10,
//   isShowStart: true
// });

// var rect2 = new mojs.Shape({
//   shape:          'rect',
//   fill:           'white',
//   radiusX:        10,
//   radiusY:        40,
//   isShowStart: true
// });

// var rect1SVG = rect1.el.childNodes[0].childNodes[0];
// var rect2SVG = rect2.el.childNodes[0].childNodes[0];

// //TweenMax.to(rect1SVG, 1, {width: 20, x:"+=30"});
// //TweenMax.to(rect2SVG, 1, {height: 20, y:"+=30"});

// var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
// tl.to(rect1SVG, 2, {width: 20, x:"+=30"},0)
//   .to(rect2SVG, 2, {height: 20, y:"+=30"},0)
//   .to(rect1SVG, 2, {width: 80, x:"-=30"},10)
//   .to(rect2SVG, 2, {height: 80, y:"-=30"},10);

/************************** #9 rotating cross *************************************/
// var rect1 = new mojs.Shape({
//   shape:          'rect',
//   fill:           'white',
//   radiusX:        40, 
//   radiusY:        10,
//   isShowStart: true
// });

// var rect2 = new mojs.Shape({
//   shape:          'rect',
//   fill:           'white',
//   radiusX:        10,
//   radiusY:        40,
//   isShowStart: true
// });

// var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
// tl.to(rect1.el, 2, {rotation:"+=90"},0)
//   .to(rect2.el, 2, {rotation:"-=90"},0)
//   .to(rect1.el, 2, {rotation:"-=90"},10)
//   .to(rect2.el, 2, {rotation:"+=90"},10);

/************************** #10 circle with tail *************************************/
// var arc_out = new mojs.Shape({
//   shape: 'circle',
//   fill: 'none',
//   radius: 80,
//   stroke: 'white',
//   strokeWidth: 2,
//   strokeDasharray: '100%',
//   strokeDashoffset: '100%',
//   isShowStart: true,
// });

// var dot_out = new mojs.Shape({
//   shape: 'circle',
//   fill: 'white',
//   radius: 3,
//   angle: 20,
//   x: 80,
//   isShowStart:true
// });

// var circle_in = new mojs.Shape({
//   shape: 'circle',
//   fill: 'none',
//   radius: 40,
//   stroke: 'white',
//   strokeWidth: 2,
//   isShowStart: true,
// });

// arc_out.el.appendChild(dot_out.el);

// var arcSVG = arc_out.el.childNodes[0].childNodes[0];

// var tl = new TimelineMax({repeat: -1, repeatDelay: 6});
// tl.to(arc_out.el, 6, {rotation: "-=1080", ease: Sine.easeInOut}, 0)
//   .to(arcSVG, 2, {strokeDashoffset: 300, ease: Sine.easeIn}, 0)
//   .to(arcSVG, 2, {strokeDashoffset: 502.6548245743669, ease: Sine.easeOut},5);

/************************** #11 sine wave across the screen *************************************/

// var x = 0;
// var animFlag;

// function init() {
//   setInterval(function() {sineWave()}, 1)
// }

// function sineWave(){
//   var canvas = document.getElementById("canvas");
//   if (canvas.getContext) {
//     var ctx = canvas.getContext("2d");


//   var y = Math.sin(x*Math.PI/90);
//   y = y * 30 + 100;
//   ctx.fillStyle = "white";  
//   ctx.fillRect(x, y, 5 , 18);
  
//   var x_delay = x- 150;
//   var y_delay = Math.sin(x_delay * Math.PI/90);
//   y_delay = y_delay * 30 + 100;
//   ctx.fillStyle = "black";  
//   ctx.fillRect(x_delay, y_delay-1, 5 , 20);
  
//   x+=0.6;
  
//   if(x > 1500)
//     x = 0;
//     //clearInterval (animFlag);
//   }
// }

/************************** #12 "90" *************************************/

// function init(){

//   var nine = document.getElementById("nine");
//   var zero = document.getElementById("zero");

//    var tl = new TimelineMax({repeat: -1, repeatDelay: 6, yoyo: true});
//    tl.to(nine, 3, {strokeDashoffset: 500, ease: Sine.easeInOut},0)
//      .to(zero, 3, {strokeDashoffset: 500, ease: Sine.easeInOut}, 0)
// }
