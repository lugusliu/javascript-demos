// 封装一个简单的id选择器的函数
var $ = function (id) {
    return typeof id === "string" ? document.getElementById(id) : id;
};

// 选项卡主函数
var tabs = function () {

    // 获取鼠标滑过或点击的标签和相应的内容元素及其索引，初始化定时器变量
    var titles = $("notice-title").getElementsByTagName("li"),
        contents = $("notice-content").getElementsByTagName("div"),
        timer = null,
        index = 0;

    // 封装一个传入当前的 curIndex 执行相应操作的函数，并更新全局的 index 为 curIndex
    var changeOption = function (curIndex) {
        // 清除所有 li 上已有的样式以及 div 已有的 display 属性
        for (var j = 0; j < titles.length; j++) {
            titles[j].className = "";
            contents[j].style.display = "none";
        }
        titles[curIndex].className = "select";
        contents[curIndex].style.display = "block";  
        index = curIndex;                 
    };

    // 为定时器封装一个循环选项卡 index 的函数
    var autoPlay = function () {
        index += 1;
        if (index >= titles.length) {
            index = 0;
        }
        changeOption(index);
    };

    // 如果标题的个数与内容的篇数不相同则返回 false
    if (titles.length !== contents.length) return false;

    // 遍历 titles 下的所有li，并为其绑定滑过和滑出事件
    for (var i = 0; i < titles.length; i++) {
        // 利用立即执行函数和闭包将一次循环中的 i 的值保存
        (function (i) {
            titles[i].onmouseover = function () {
                clearInterval(timer);
                changeOption(i);
            }
            titles[i].onmouseout = function () {
                timer = setInterval(autoPlay, 2000);
            }
        })(i);
    }

    // 执行定时器之前先清除已有的定时器，优化代码
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    // 执行定时器
    timer = setInterval(autoPlay, 2000);
};

// 在window对象加载完成之后立即执行选项卡主函数
window.onload = function () {
    tabs();
};