var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// 获取 range 组件
var slider = document.getElementById('range');

// 动态创建离屏 canvas 水印元素
var waterMark = document.createElement('canvas');

// 新建一个 image 对象
var image = new Image();

var drawImageByScale = function (scale) {
    // 获取缩放后的图像的长度，宽度
    var sclImgWidth = canvas.width * scale;
    var sclImgHeight = canvas.height * scale;

    // 获取缩放后的图像与 canvas 画布的水平间距与垂直间距
    var dx = canvas.width / 2 - sclImgWidth / 2;
    var dy = canvas.height / 2 - sclImgHeight / 2;

    // 首先清除 canvas 画布上已有的内容，避免重复绘制
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制图片
    context.drawImage(image, dx, dy, sclImgWidth, sclImgHeight);

    // 绘制水印
    context.drawImage(waterMark, canvas.width - waterMark.width, canvas.height - waterMark.height);
}

// 初始化 canvas，image 以及 waterMark
var init = function () {
    // 设置 canvas 的宽和高
    canvas.width = 960;
    canvas.height = 540;

    // 获取 range 组件的 value 值
    var scale = slider.value;

    // 设置 image 的路径
    image.src = "img/snow.jpg";

    // image 加载完成后执行函数
    image.onload = function () {
        // 当图片首次加载时绘制 canvas
        drawImageByScale(scale); 

        // 当 range 组件滑动时，动态更新其 value 值并绘制相应的缩放图片
        slider.onmousemove = function () {
            scale = slider.value;
            drawImageByScale(scale);
        }
    }

    // 初始化离屏水印 canvas 的宽高及文字内容
    waterMark.width = 200;
    waterMark.height = 40;
    var waterMarkContext = waterMark.getContext('2d');
    waterMarkContext.font = "bold 20px Arial";
    waterMarkContext.fillStyle = "rgba(255, 255, 255, 0.5)";
    waterMarkContext.textAlign = "right";
    waterMarkContext.textBaseline = "middle";
    waterMarkContext.fillText("By lugusliu", 180, 20);
}

window.onload = init;