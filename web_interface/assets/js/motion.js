/********************** small motion graphics from here ****************************/

function getShape(list){

  var randomNum = Math.floor(Math.random() * list.length);
  var shapeIndex = list[randomNum];
  
  console.log("shapeIndex", shapeIndex);

  switch(shapeIndex){
      case 0:                   //rect changing strokeDashOffset
        var shape = new mojs.Shape({
         shape: 'rect',
         fill: 'none',
         radius: 50 + Math.floor(Math.random()*10),
         stroke: 'white',
         strokeWidth: {25:10},
         strokeDasharray: '100%',
         strokeDashoffset:{'-100%':'100%'},
         angle: {0: 180},
         duration: 2000,
         repeat: 10
        }).play();
        return shape.el;
        break;
  
      case 1:                 //rotating square filled up
        var outline = new mojs.Shape({
          shape:          'rect',
          fill:           'none',
          stroke:         'white',
          radius:         40,
          strokeWidth:    10,
          isShowStart:true
        });
  
        var rect = new mojs.Shape({
          shape:          'rect',
          fill:           'white',
          radius:         36,
          radiusY: 36,
          y: 0,
        }).play();
  
        TweenMax.to(outline.el, 1, {rotation:180, delay:1 , repeat:-1, repeatDelay:1});
        var svg_rect = rect.el.childNodes[0].childNodes[0];
        TweenMax.to(svg_rect, 1, {height: 0, repeat:-1, repeatDelay:1});
  
        var div_el = document.createElement('div');
        div_el.appendChild(outline.el);
        div_el.appendChild(rect.el);
  
        return div_el;
        break;

      case 2:                 // 3 nested arc rotating

        var circle1 = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          stroke: 'white',
          radius: 80,
          strokeWidth:  10,
          strokeDasharray: '50%',
          strokeDashoffset: '0%',
          angle:{0:-360},
          //isShowStart: true
          easing: 'linear.none',
          duration: 2000,
          repeat: 50
        }).play();
  
        var circle2 = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          stroke: 'white',
          radius: 60,
          strokeWidth:  10,
          strokeDasharray: '50%',
          strokeDashoffset: '0%',
          angle:{120:480},
          //isShowStart: true
          easing: 'linear.none',
          duration: 1000,
          repeat: 50
        }).play();

      
        var circle3 = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          stroke: 'white',
          radius: 40,
          strokeWidth:  10,
          strokeDasharray: '50%',
          strokeDashoffset: '0%',
          angle:{240:600},
          //isShowStart: true
          easing: 'linear.none',
          duration: 2000,
          repeat: 50
        }).play();
  
        var div_el = document.createElement('div');
        div_el.appendChild(circle1.el);
        div_el.appendChild(circle2.el);
        div_el.appendChild(circle3.el);
        return div_el;
        break;


      case 3:           //2 dashed circle rotating
        var circle_out = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          stroke: 'white',
          radius: 60,
          strokeWidth:  8,
          strokeDasharray: '5%',
          strokeDashoffset: '0%',
          angle:{0:360},
          //isShowStart: true
          easing: 'linear.none',
          duration: 4000,
          repeat: 50
        }).play();
        
        
        var circle_in = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          stroke: 'white',
          radius: 45,
          strokeWidth:  1,
          strokeDasharray: '4%',
          strokeDashoffset: '0%',
          angle:{0:-360},
          //isShowStart: true
          easing: 'linear.none',
          duration: 3000,
          repeat: 50
        }).play();
  
        var div_el = document.createElement('div');
        div_el.appendChild(circle_out.el);
        div_el.appendChild(circle_in.el);
        return div_el;
        break;
      
      case 4:               // five rect up and down
        var div_el = document.createElement('div');
        var rect_list = [];
        for (var i=0; i< 5; i++){
          var shape = new mojs.Shape({
            shape:          'rect',
            fill:           'white',
            radiusX:        5,
            radiusY:        30,
            x:              -50 + i*25,
            y:              50,
            isYoyo:         true,
            duration:       1000,
            easing:       'sin.inout',
            repeat:         20,
            //delay: i*100,
            isShowStart: true
          });
        
          rect_list.push(shape.el);
          div_el.appendChild(shape.el);
        }
        var tl = new TimelineMax({repeat: -1});
        tl.staggerTo(rect_list, 1, {top:"-=100"}, 0.1)
          .staggerTo(rect_list, 1, {top:"+=100"}, 0.1);

        return div_el;
        break;

      case 5:             //skew rect left and right
        var shape_left = new mojs.Shape({
          shape:          'rect',
          fill:           'white',
          x: -60,
          radius:         10,
          radiusY:      30,
          isShowStart: true
        });
  
        var shape_right = new mojs.Shape({
          shape:          'rect',
          fill:           'white',
          x: -20,
          radius:         10,
          radiusY:      30,
          isShowStart: true
        });
  
        TweenMax.to([shape_left.el, shape_right.el], 1, {skewX:"30deg"});
  
        var tl = new TimelineMax({repeat: -1});
        tl.to([shape_left.el, shape_right.el], 1, {left:"+=80px", ease:Circ.easeout})
        .to([shape_left.el, shape_right.el], 1, {left:"-=80px", ease:Circ.easeout})
        .to([shape_left.el, shape_right.el], 1, {height: 0})
        .to([shape_left.el, shape_right.el], 1, {height: 60});
  
  
        var div_el = document.createElement('div');
        div_el.appendChild(shape_left.el);
        div_el.appendChild(shape_right.el);
        return div_el;
        break;

      case 6:

         // Gucci shape
         var shape_left = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          radius: 40,
          stroke: 'white',
          strokeWidth: 15,
          strokeDasharray: '100%',
          strokeDashoffset: '-100%',
          angle: 0,
          x: -60,
          isShowStart: true
        });
        
         var shape_right = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          radius: 40,
          stroke: 'white',
          strokeWidth: 15,
          strokeDasharray: '100%',
          strokeDashoffset: '100%',
          angle: -180,
          x: 60,
          isShowStart:true
        });
        
        
         var left_svg = shape_left.el.childNodes[0].childNodes[0];
         var right_svg = shape_right.el.childNodes[0].childNodes[0];
        
         var tl = new TimelineMax({repeat: -1, repeatDelay: 1});
         tl.to(left_svg, 2, {strokeDashoffset:0, strokeWidth: 10, ease:Sine.easeInOut})
         .to(right_svg, 2, {strokeDashoffset:0, strokeWidth: 10, ease:Sine.easeInOut}, 0)
         .to(shape_left.el, 2, {rotation: "-=180"}, 0)
         .to(shape_right.el, 2, {rotation: "+=180"}, 0)
         .to([left_svg, right_svg], 1, {strokeWidth: 5},2)
         .to(shape_left.el, 1, {left:"+=30px"}, 2)
         .to(shape_right.el, 1, {left:"-=30px"}, 2)
         .to(shape_left.el, 1, {left:"-=30px"}, 3)
         .to(shape_right.el, 1, {left:"+=30px"}, 3)
         .to([left_svg, right_svg], 1, {strokeWidth: 10},3)
         .to(left_svg, 2, {strokeDashoffset: -251.2, strokeWidth: 15, ease:Sine.easeInOut}, 4)
         .to(right_svg, 2, {strokeDashoffset: 251.2, strokeWidth: 15, ease:Sine.easeInOut}, 4)
         .to(shape_left.el, 2, {rotation: "+=180"}, 4)
         .to(shape_right.el, 2, {rotation: "-=180"}, 4)
        
         var div_el = document.createElement('div');
         div_el.appendChild(shape_left.el);
         div_el.appendChild(shape_right.el);
         return div_el;
         break;

      case 7:
        // line with circle on both end
        var shape = new mojs.Shape({
          shape:          'rect',
          fill:           'white',
          radiusX:        2,
          radiusY:      100, 
          scaleY:        {0: 1},
          top: '10%',
          y: {0: 100},
          duration:       1000,
        }).play();
  
        var circle_top = new mojs.Shape({
          shape: 'circle',
          fill: 'white',
          radius: 8,
          y: {0:200},
          top: '10%',
          delay: 1000,
          duration: 1000,
          isShowStart: true
        }).play();
  
        var circle_bottom = new mojs.Shape({
          shape: 'circle',
          fill: 'white',
          radius: 8,
          top: '10%',
          y: {0:200},
          //delay: 1000,
          duration: 1000,
          isShowStart: true
        }).play();

        var div_el = document.createElement('div');
        div_el.appendChild(shape.el);
        div_el.appendChild(circle_top.el);
        div_el.appendChild(circle_bottom.el);
  
        TweenMax.to(shape.el, 1, {delay:1, scaleY: 0, y:200});
        TweenMax.to(div_el, 1, {opacity:0, delay: 2});
  
        return div_el;
        break;

      case 8:
        // two nested arc with circle on one end
        var arc_out = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          radius: 140,
          stroke: 'white',
          strokeWidth: 2,
          strokeDasharray: '100%',
          strokeDashoffset: {'85%':'40'},
          easing: 'sin.inout',
          angle: {0:-1080},
          duration: 6000,
          isShowStart: true,
          repeat: 999
        }).play();
        
        var circle_out = new mojs.Shape({
          shape: 'circle',
          fill: 'white',
          radius: 5,
          angle: 20,
          x: 140,
          isShowStart:true
        }).play();
        
        var arc_in = new mojs.Shape({
          shape: 'circle',
          fill: 'none',
          radius: 120,
          stroke: 'white',
          strokeWidth: 2,
          strokeDasharray: '100%',
          strokeDashoffset:'75%',
          easing: 'sin.inout',
          angle: {0:1080},
          duration: 6000,
          isShowStart: true,
          repeat: 999
        }).play();
        
        var circle_in = new mojs.Shape({
          shape: 'circle',
          fill: 'white',
          radius: 5,
          angle: 20,
          x:0,
          y: 120,
          isShowStart:true
        }).play();

        arc_in.el.appendChild(circle_in.el);
        arc_out.el.appendChild(circle_out.el);
        var div_el = document.createElement('div');
        div_el.appendChild(arc_in.el);
        div_el.appendChild(arc_out.el);
        return div_el;
        break;

      case 9:
        var shape = new mojs.Shape({
        shape:          'rect',
        fill:           'white',
        radiusX:        1,
        radiusY:      100, 
        left:         '20%',
        duration:       1000,
        isShowStart: true
      });
      
      var circle_top = new mojs.Shape({
        shape: 'circle',
        fill: 'white',
        radius: 6,
        y:-100,
       
        delay: 1000,
        duration: 1000,
        isShowStart: true,
      });
      
      var circle_bottom = new mojs.Shape({
        shape: 'circle',
        fill: 'white',
        radius: 6,
        y:-100,
        duration: 1000,
        isShowStart: true
      });
    
      shape.el.append(circle_top.el);
      shape.el.append(circle_bottom.el);
    
      var line_svg = shape.el.childNodes[0].childNodes[0];

      TweenMax.to(line_svg, 0.1, {height: 0});
      var tl = new TimelineMax({yoyo: true, repeat: -1});
      tl.to(line_svg, 1, {height:200}, 0.1)
        .to(circle_bottom.el, 1, {top:"+=200"}, 0.1)
        .to(line_svg, 1, {height: 0, y:"+=200"}, 1.1)
        .to(circle_top.el, 1, {top:"+=200"}, 1.1)
        .to(shape.el, 0.1, {rotation:"+=90" , transformOrigin:"bottom left"}, 2)
        .to(line_svg, 1, {height: 200, y:"-=200"}, 2.1)
        .to(circle_bottom.el, 1, {top:"-=200"}, 2.1)
        .to(line_svg, 1, {height: 0}, 3.1)
        .to(circle_top.el, 1, { top:"-=200"}, 3.1)
        .to(shape.el, 1, {opacity: 0});

      var div_el = document.createElement('div');
      div_el.appendChild(shape.el);
      return div_el;
      break;

      case 10:
      var left = new mojs.Shape({
        shape:          'circle',
        fill:           'white',
        radius:        8,
        x:              -30,
        isShowStart: true
      });
      
      var middle = new mojs.Shape({
        shape:          'circle',
        fill:           'white',
        radius:        8,
        isShowStart: true
      });
      
      var right = new mojs.Shape({
        shape:          'circle',
        fill:           'white',
        radius:        8,
        x:              30,
        isShowStart: true
      });
      
      var tl = new TimelineMax({repeat: -1});
      tl.staggerTo([left.el, middle.el, right.el], 0.5, {opacity: 0}, 0.1)
      .staggerTo([left.el, middle.el, right.el], 0.5, {opacity: 1}, 0.1);
      
      var div_el = document.createElement('div');
      div_el.appendChild(left.el);
      div_el.appendChild(middle.el);
      div_el.appendChild(right.el);
      return div_el;
      break;

      default: 
        break;
    }
}
