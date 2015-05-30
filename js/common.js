$(document).ready(function(){
	"use strict";

	var action = "up",
		canvas = $("#cnvs"),
		color = $("#color"),
		body = $("body"),
		ctx = canvas[0].getContext('2d'),
		offset = 1000,
		points = [],
		bufer = ctx.getImageData(0, 0, canvas.width(),canvas.height());


	ctx.lineWidth = 10;
	ctx.shadowColor = "#000000";
	ctx.shadowBlur = 5;
	ctx.shadowOffsetX = -offset;


	body.on("mousedown", function(e){
		action = "down";
		points.push([e.pageX, e.pageY]);
	});

	body.on("mousemove", function(e){
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

	body.on("mouseup", function(){
		action = "up";
		points = [];
		bufer = ctx.getImageData(0, 0, canvas.width(),canvas.height());
	});

	color.on("change", function(e){
		ctx.shadowColor = e.target.value;
	});
});