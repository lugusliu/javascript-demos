// 此方法将传入的参数在页面加载完成时执行
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

// 此方法在已有元素的后面插入一个参数
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// 此方法负责把"placeholder"图片切换为目标图片
function showPic(whichpic) {
    if (!document.getElementById('placeholder')) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById('placeholder');
    if (placeholder.nodeName != 'IMG') return false;
    placeholder.setAttribute('src', source);
    if (document.getElementById('description')) {
        var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : "";
        var description = document.getElementById('description');
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

// 动态创建一个 img 元素和一个 p 元素
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById('imagegallery')) return false;

    var placeholder = document.createElement('img');
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute('src', 'img/placeholder.jpg');
    placeholder.setAttribute('alt', 'my image gallery');
    
    var description = document.createElement('p');
    description.setAttribute('id', 'description');
    var desctext = document.createTextNode('Choose an image');
    description.appendChild(desctext);

    var gallery = document.getElementById('imagegallery');
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

// 负责处理链接 a 的点击事件
function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById('imagegallery')) return false;

    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return showPic(this) ? false : true;
        }
    }
}

// 在页面加载完成时调用 preparePlaceholder 和 prepareGallery 函数
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);