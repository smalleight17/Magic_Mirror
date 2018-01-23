var gridster;
var widgets = [];
var count = 11;
var imgIndex = 3;

$(function () {         //equivalant for $(document).ready(function() { ... });
    gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [100, 100]
    }).data('gridster');

    for (var i=0; i< 20; i++){
      var gridX = Math.floor(Math.random() * 3) + 1;
      var gridY = Math.floor(Math.random() * 3) + 1;
      var unit = ['<li></li>', gridX, gridY];
      widgets.push(unit);
    }
    widgets.push(['<li><img src="assets/images/3.jpg" width=300></img></li>', 3, 5]);
    widgets.push(['<li><img src="assets/images/2.jpg" width=200></img></li>', 2, 4]);
    widgets.push(['<li><img src="assets/images/1.jpg" width=200></img></li>', 2, 3]);

    $.each(widgets, function (i, widget) {
        gridster.add_widget.apply(gridster, widget)
    });
});

function testOnClick(){
    gridster.remove_widget( $('.gridster li').eq(0));
 
    if (count++ % 3 == 0){
        //add a new image
        imgIndex = (imgIndex++)%9+1;
       
        var newImg = document.createElement('img');
        newImg.src= "assets/images/"+ imgIndex+".jpg";
        //newImg.style.display = "block";
        newImg.align = "middle";


        //get image size before load
        //to calculate the aspect ratio
        var poll = setInterval(function () {
            if (newImg.naturalWidth) {
              clearInterval(poll);
            
              var ratio = newImg.height / newImg.width;
              var new_width_unit = Math.floor(Math.random()* 2)+2;
              var new_height_unit = Math.ceil(new_width_unit * ratio);
              var new_width = 100 * new_width_unit; 
              var new_height = 100 * new_height_unit;
              newImg.width = new_width;

              var li_el = document.createElement('li');
              //var frame_el = getImgFrame(new_width, new_height);
              //li_el.appendChild(frame_el);
              li_el.appendChild(newImg);

              gridster.add_widget(li_el, new_width_unit, new_height_unit);
              //console.log(li_el);
            }
        }, 10); 

    }else{
     //add a random size unit
        var gridX = Math.floor(Math.random() * 3) + 1;
        var gridY = Math.floor(Math.random() * 3) + 1;
        var li_el = document.createElement('li');

        var shape;
        // if(gridX > 1 && gridX == gridY){
        //   shape = getSquareShape();
        //   li_el.appendChild(shape);
        // } else if(gridX > gridY){
        //   if(Math.random() < 0.5){
        //     shape = getHorizontalShape();
        //     li_el.appendChild(shape);
        //   }
        // }else if(gridX < gridY){
        //   if(gridY > 2){
        //     shape = getVerticalShape();
        //     li_el.appendChild(shape);
        //   }   
        // }

        if(gridX > 1 && gridY > 1){
          shape = getSquareShape();
          li_el.appendChild(shape);
        }else if ( gridY > 2){
          shape = getVerticalShape();
          li_el.appendChild(shape);
        }
        gridster.add_widget(li_el, gridX, gridY);
    }
}


//$(document).click(testOnClick);
setInterval(testOnClick, 1000);