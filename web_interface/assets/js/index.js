var gridster;
var widgets;
var count = 11;
var imgIndex = 3;

$(function () {         //equivalant for $(document).ready(function() { ... });
    gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [100, 100]
    }).data('gridster');

    widgets = [
        ['<li></li>', 1, 2],
        ['<li><img src="assets/images/3.jpg" width=300 height=492></img></li>', 3, 5],
        ['<li></li>', 2, 1],
        ['<li></li>', 1, 3],
        ['<li></li>', 1, 3],
        ['<li><img src="assets/images/2.jpg" width=200 height=414></img></li>', 2, 4],
        ['<li></li>', 1, 1],
        ['<li></li>', 2, 2],
        ['<li></li>', 2, 1],
        ['<li><img src="assets/images/1.jpg" width=200 height= 308></img></li>', 2, 3]
    ];

    $.each(widgets, function (i, widget) {
        gridster.add_widget.apply(gridster, widget)
    });
});

function testOnClick(){
    gridster.remove_widget( $('.gridster li').eq(0));
      
    if (count++ % 2 == 0){
        //add a new image
        imgIndex = (imgIndex++)%9+1;
        var newImg = document.createElement('img');
        var img_src = "assets/images/"+ imgIndex+".jpg";
        newImg.src = img_src;

        //get image size before load
        //to calculate the aspect ratio
        var poll = setInterval(function () {
            if (newImg.naturalWidth) {
                clearInterval(poll);

            //console.log(img_src, newImg.width, newImg.height);
            var ratio = newImg.height / newImg.width;
            var randomNum = Math.floor(Math.random()* 2)+3;
            var new_width = 100 * randomNum;
            
            var new_widget = '<li><img src='+img_src+' width='+new_width+'></img></li>';
            gridster.add_widget(new_widget, randomNum,Math.ceil(randomNum * ratio));
            }
        }, 10); 

    }else{
        //add a random size unit
        var gridX = Math.floor(Math.random() * 3) + 2;
        var gridY = Math.floor(Math.random() * 3) + 2;
        var li_el = document.createElement('li');

        var shape;
        if(gridX > gridY){
          shape = getHorizontalShape();
        } else if(gridX < gridY){
          shape = getVerticalShape();
        }else{
          shape = getSquareShape();
        }

        //var shape = getRandomShape();
        li_el.appendChild(shape);
        gridster.add_widget(li_el, gridX, gridY);
    }
}

/********************** small motion graphics from here ****************************/
function getHorizontalShape(){
    var randomNum = Math.floor(Math.random() * 2);
      
    switch(randomNum){
      case 0:                 //circle, horizontal
        var shape_left = new mojs.Shape({
            shape: 'circle',
            fill: 'none',
            radius: 40,
            stroke: 'white',
            strokeWidth: {15: 10},
            strokeDasharray: '100%',
            strokeDashoffset:{'-100%':'0', easing:'sin.inout'},
            angle: {0: -180},
            left:'42%',
            duration: 2000,
            repeat: 5
        }).play();
        
        var shape_right = new mojs.Shape({
            shape: 'circle',
            fill: 'none',
            radius: 40,
            stroke: 'white',
            strokeWidth: {15: 10},
            strokeDasharray: '100%',
            strokeDashoffset:{'100%':'0', easing:'sin.inout'},
            angle: {[-180]:0},
            left:'58%',
            duration: 2000,
            repeat: 5
        }).play();

        var div_el = document.createElement('div');
        div_el.appendChild(shape_left.el);
        div_el.appendChild(shape_right.el);
        return div_el;
        break;

      case 1:                 //line, horizontal
          const shiftCurve = mojs.easing.path( 'M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0' );
          const scaleCurveBase = mojs.easing.path( 'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100' );
          const scaleCurve = (p) => { return 1 + scaleCurveBase(p); };
          const nScaleCurve = (p) => { return 1 - scaleCurveBase(p)/10; };
          
          var shape = new mojs.Shape({
            shape:        'rect',
            fill:         { '#FFFFFF' : '#FFFFFF', curve: scaleCurve },
            radius:       10,
            rx:           3,
            x:            { [-125] : 125, easing: shiftCurve },
            scaleX:       { 1 : 1, curve: scaleCurve },
            scaleY:       { 1 : 1, curve: nScaleCurve },
            origin:       { '0 50%' : '100% 50%', easing: shiftCurve },
            
            isYoyo:       true,
            duration:     1000,
            repeat:       2
          }).play();
          return shape.el;
          break;

        default:break;
      }

}

function getVerticalShape(){
   var shape_left = new mojs.Shape({
      shape:          'rect',
      fill:           'white',
      radiusX:        40,
      radiusY:        8,
      x:              30,
      y:            {[-100]:100},  
      isYoyo:         true,
      duration:       2000,
      repeat:         2 
    }).play();

    var shape_right = new mojs.Shape({
      shape:          'rect',
      fill:           'white',
      radiusX:        40,
      radiusY:        8,
      left:           60,
      y:            {[-100]:100},  
      isYoyo:         true,
      duration:       2000,
      delay:          500,
      repeat:         2 
    }).play();
   
    var div_el = document.createElement('div');
    div_el.appendChild(shape_left.el);
    div_el.appendChild(shape_right.el);
    return div_el;

}

function getSquareShape(){
    var randomNum = Math.floor(Math.random() * 2);
      
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
             repeat: 2
         }).play();
         return shape.el;
         break;

      case 1:                 //rect, square
         var shape = new mojs.Shape({
           shape:          'rect',
           fill:           'none',
           stroke:         'white',
           radius:         40,
           strokeWidth:    {30: 0, easing:'sin.in'},
           angle:          { [-180] : 0 },
           duration:       1000,
           repeat: 2 
         }).play();
         return shape.el;
         break;

      default: break;
    }
}

//$(document).click(testOnClick);
setInterval(testOnClick, 1000);