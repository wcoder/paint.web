(function (w, d) {
	"use strict";

	var action = "up",
		canvas = d.querySelector("#cnvs"),
		color = d.querySelector("#color"),
		body = d.querySelector("body"),
		ctx = canvas.getContext("2d"),
		offset = 1000,
		points = [],
		bufer = ctx.getImageData(0, 0, canvas.width,canvas.height);


	ctx.lineWidth = 4;
	ctx.shadowColor = "#000000";
	ctx.shadowBlur = 1;
	ctx.shadowOffsetX = -offset;


	body.addEventListener("mousedown", function(e){
		action = "down";
		points.push([e.pageX, e.pageY]);
	});

	body.addEventListener("mousemove", function(e){
		if (action === "down") {
			ctx.putImageData(bufer, 0, 0);
			points.push([e.pageX,e.pageY]);
			ctx.beginPath();
			ctx.moveTo(points[0][0]+offset, points[0][1]);
			for (var i = 1; i < points.length; i++){
				ctx.lineTo(points[i][0]+offset, points[i][1]);
			}
			ctx.stroke();
		}
	});

	body.addEventListener("mouseup", function(){
		action = "up";
		points = [];
		bufer = ctx.getImageData(0, 0, canvas.width,canvas.height);
	});

	color.addEventListener("change", function(e){
		ctx.shadowColor = e.target.value;
	});
}(window, document));