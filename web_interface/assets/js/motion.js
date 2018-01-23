/********************** small motion graphics from here ****************************/

function getSquareShape(){
    var randomNum = Math.floor(Math.random() * 6);
    //var randomNum = 2;

    switch(randomNum){
      case 0:                   //rect, sauqre
         var shape = new mojs.Shape({
             shape: 'rect',
             fill: 'none',
             radius: 40,
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

      case 1:                 //rotating square
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
        radius: 60,
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
        radius: 40,
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
        radius: 20,
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
      for (var i=0; i< 5; i++){
          var shape = new mojs.Shape({
          shape:          'rect',
          fill:           'white',
          radiusX:        5,
          radiusY:        30,
          x:              -50 + i*25,
          y:            {[-50]:50},  
          isYoyo:         true,
          duration:       1000,
          easing: 'sin.inout',
          repeat:         20,
          delay: i*100,
          isShowStart: true
        }).play();
         div_el.appendChild(shape.el);
      }
      return div_el;
      break;

    case 5:
      //skew rect, square
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

      default: break;
    }
}

function getHorizontalShape(){
  
}

function getVerticalShape(){
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
}