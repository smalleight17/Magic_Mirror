var gridster;
var widgets = [];
var count = 11;
var imgIndex = 3;

$(function () {         //equivalant for $(document).ready(function() { ... });
    gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [100, 100]
    }).data('gridster');

    
    for (var i=0; i< 30; i++){
      if(i==9){
        widgets.push(['<li><img src="assets/images/3.jpg" width=300></img></li>', 3, 5]);
      }else if(i==19){
         widgets.push(['<li><img src="assets/images/2.jpg" width=300></img></li>', 3, 6]);
       }else if(i==29){
         widgets.push(['<li><img src="assets/images/1.jpg" width=300></img></li>', 3, 5]);
       }
      var gridX = Math.floor(Math.random() * 3) + 1;
      var gridY = Math.floor(Math.random() * 3) + 1;
      var unit = ['<li></li>', gridX, gridY];
      widgets.push(unit);
    }
   
    $.each(widgets, function (i, widget) {
        gridster.add_widget.apply(gridster, widget)
    });
});

function testOnClick(){
    gridster.remove_widget( $('.gridster li').eq(0));
 
    if (count++ % 10 == 0){
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
              var new_width_unit = Math.floor(Math.random()* 2)+ 3;
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

        if(gridX > 1 && gridY > 1){
          if (gridX==3 && gridY == 3){
            shape = getShape([8, 9]);
          } else if (gridX == 3 && gridY == 2){
            shape = getShape([0,2,3,4,5,6]);
          }else{
            shape = getShape([0,2,3,4]);
          }
        }else{
          if(gridY == 3){
            shape = getShape([7, 9]);
          }else if (gridX == 3){
            shape = getShape([5, 6, 11]); // 11 is not mapping to any animation
          }else if ( gridX == 2){
            shape = getShape([5, 11]);
          }else if (gridX == 1 && gridY == 1){
            shape = getShape([10, 11]);
          }
        }
        if(shape != null)
          li_el.appendChild(shape);
        gridster.add_widget(li_el, gridX, gridY);
    }
}


//$(document).click(testOnClick);
setInterval(testOnClick, 1000);