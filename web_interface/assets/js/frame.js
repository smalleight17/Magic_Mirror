function getImgFrame(new_width, new_height){
	var randomNum = Math.floor(Math.random() * 7);
	switch (randomNum){
		case 0:
			var shape = new mojs.Shape({
    		    shape: 'rect',
    		    fill: 'white',
    		    x: new_width * (-0.5),
    		    //y: -11,
    		   	radiusX: 10,
    		    radiusY: new_height/2,
    		    duration: 1000
    		}).play();
    		return shape.el;
    		break;

    	default:
    		break;

	}

}