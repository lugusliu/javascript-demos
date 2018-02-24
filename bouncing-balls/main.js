var canvas = document.querySelector('canvas');
var score = document.querySelector('p');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

ctx.globalCompositeOperation = "source-over";


// 生成min ~ max之前的随机数函数
function random(min,max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

/* 
 * 创建一个 Shape() 构造函数，并且拥有 5 个参数
 * x，y 为 shape 的初始位置
 * velX，velY 为 shape 的水平和竖直移动速度
 * exists 为 shape 是否存在于程序中，是一个布尔型
 */
function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function EvilCircle(x, y, exists, color, size, velX, velY) {
    Shape.call(this, x, y, exists);
    this.color = color;
    this.size = size;
    this.velX = velX;
    this.velY = velY;
}

EvilCircle.prototype = Object.create(Ball.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function () {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
};

EvilCircle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x = width - this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x = this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y = height - this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y = this.size;
    }
}

EvilCircle.prototype.setControls = function () {
    var _this = this;
    window.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38:
            _this.y -= _this.velY;
            break;
            
            case 40:
            _this.y += _this.velY;
            break;

            case 37:
            _this.x -= _this.velX;
            break;

            case 39:
            _this.x += _this.velX;
            break;
        }
    }
};

EvilCircle.prototype.collisionDetect = function () {
    for (var j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
          var dx = this.x - balls[j].x;
          var dy = this.y - balls[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= this.size + balls[j].size) {
              balls[j].exists = false;
          }
        }
    }
};

/*
 * 创建 Ball() 构造器，继承 Shape() 中 5 个属性，并定义了自己的属性，其中
 * color 为 ball 的颜色
 * size 为 ball 的大小
 * num 为 ball 的编号
 * numColor 为 ball 的编号颜色
 */
function Ball (x, y, velX, velY, exists, color, size, num, numColor) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
    this.num = num;
    this.numColor = numColor;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// 在 Ball 的原型上添加 draw() 方法，即在屏幕上绘制小球
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.numColor;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.font = "bolder 20px serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fill();
    ctx.strokeText(this.num, this.x, this.y);    
}

// 在 Ball 的原型上添加 update() 方法来更新小球的数据
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

// 在 Ball 的原型上添加 collisionDetect() 方法，检测小球碰撞的函数
Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
          var dx = this.x - balls[j].x;
          var dy = this.y - balls[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= this.size + balls[j].size) {
              balls[j].color = this.color;
          }
        }
    }
}

var balls = [];

var evilcircle = new EvilCircle(100, 100, true, "#f66", 30, 20, 20);

evilcircle.setControls();

var timer;

function loop() {
    ctx.clearRect(0, 0, width, height);
    var num = 1;
    while (balls.length < 50) {
        var ball = new Ball(
            random(50, width),
            random(50, height),
            random(-4, 4),
            random(-4, 4),
            true,
            'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ',' + random(0.50, 1) + ')',
            random(20,30),
            num,
            "black"
        );
        balls.push(ball);
        num = num + 1;
    }

    var ballNum = 0;

    for (var i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            ballNum += 1;
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    score.textContent = ballNum;



    evilcircle.draw();
    evilcircle.checkBounds();
    evilcircle.collisionDetect();
    

    if (ballNum > 0) {
        timer = requestAnimationFrame(loop);
    } else {
        cancelAnimationFrame(timer);
        alert("You win");
    }
}

loop();