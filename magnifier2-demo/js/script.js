var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var magnifierCanvas = document.createElement('canvas');
var magnifierContext = magnifierCanvas.getContext('2d');
// 新建一个 image 对象
var image = new Image();

var isMouseDown = false;

var scale = 0;

var init = function () {
    // 设置 canvas 的宽和高
    canvas.width = 960;
    canvas.height = 540;

    // 设置 image 的路径
    image.src = "img/snow.jpg";

    // image 加载完成后执行函数
    image.onload = function () {
        magnifierCanvas.width = image.width;
        magnifierCanvas.height = image.height;
        scale = magnifierCanvas.width / canvas.width;

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        magnifierContext.drawImage(image, 0, 0);
    }
}

var posInCanvas = function (x, y) {
    var canBox = canvas.getBoundingClientRect();
    return { x: x - canBox.left, y: y - canBox.top };
}

var drawCanvasWithMagnifier = function (isShowMagnifier, point) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    if (isShowMagnifier === true) {
        drawMagnifier(point);
    }
}

var drawMagnifier = function (point) {
    var imageSourceX = point.x * scale;
    var imageSourceY = point.y * scale;

    var magnifierRadius = 100;

    var sx = imageSourceX - magnifierRadius;
    var sy = imageSourceY - magnifierRadius;

    var dx = point.x - magnifierRadius;
    var dy = point.y - magnifierRadius;

    context.save();
    context.beginPath();
    context.arc(point.x, point.y, magnifierRadius, 0, Math.PI * 2);
    context.lineWidth = 5;
    context.strokeStyle = "#666";
    context.stroke();
    context.clip();
    context.drawImage(magnifierCanvas, sx, sy, 2 * magnifierRadius, 2 * magnifierRadius, dx, dy, 2 * magnifierRadius, 2 * magnifierRadius);
    context.restore();
}

canvas.onmousedown = function (e) {
    e.preventDefault();
    var pos = posInCanvas(e.clientX, e.clientY);
    console.log(pos.x, pos.y);        
    isMouseDown = true;
    drawCanvasWithMagnifier(true, pos);
}

canvas.onmousemove = function (e) {
    e.preventDefault();
    if (isMouseDown === true) {
        var pos = posInCanvas(e.clientX, e.clientY);        
        console.log(pos.x, pos.y); 
        drawCanvasWithMagnifier(true, pos);
           
    }
}

canvas.onmouseup = function (e) {
    e.preventDefault();
    isMouseDown = false;
    drawCanvasWithMagnifier(false);    
}

canvas.onmouseout = function (e) {
    e.preventDefault();
    isMouseDown = false;
    drawCanvasWithMagnifier(false);    
}


window.onload = function () {
    init();
};