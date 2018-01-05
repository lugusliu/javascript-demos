function getByClass(clsName, parentId) {
    var oParent = parentId ? document.getElementById(parentId) : document;
        eles = [];
        elements = oParent.getElementsByTagName('*');

    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].className == clsName) {
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload = drag;

function drag() {
    var clickBox = getByClass('drag-box')[0];
    clickBox.onmousedown = musDown;
}

function musDown(event) {
    // 浏览器兼容性处理
    event = event || window.event;

    var dragBox = document.getElementById('drag-box');
        // 光标按下时光标和移动面板之间的距离
        disX = event.clientX - dragBox.offsetLeft,
        disY = event.clientY - dragBox.offsetTop;
    
    // 移动
    document.onmousemove = function (event) {
        event = event || window.event;
        dragMove(event, disX, disY);
    }

    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function dragMove(e, posX, posY) {
    var dragBox = document.getElementById('drag-box'),
        x = e.clientX - posX,
        y = e.clientY - posY;
        winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxW = winW - dragBox.offsetWidth,
        maxH = winH - dragBox.offsetHeight;
        
    if (x < 0) {
        x = 0;
    } else if (x > maxW) {
        x = maxW;
    }

    if (y < 0) {
        y = 0;
    } else if (y > maxH) {
        y = maxH;
    }
    
    dragBox.style.left = x + 'px';
    dragBox.style.top = y + 'px'; 
} 