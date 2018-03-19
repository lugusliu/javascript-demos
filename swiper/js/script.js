function swiper(obj) {
  // 初始化一些全局数据
  let data = {
    startPos: 0,
    startPoint: {},
    liWidth: obj.li[0].offsetWidth
  };

  // 获取标签 li 元素的个数
  let len = obj.li.length;

  // 设置 ul 的总宽度
  obj.ul.style.width = len + '00%';
  
  // 绑定手指触摸事件
  obj.ul.addEventListener('touchstart', touch);
  
  // 绑定手指滑动事件
  obj.ul.addEventListener('touchmove', touch);
  
  // 绑定手指抬起事件
  obj.ul.addEventListener('touchend', touch);
  
  // 初始化一个对象存放 ul 面板的初始的一些值
  obj.ul.pos = 0;

  // 将 touch 事件统一放到下面的函数处理
  function touch() {
    let e = window.event || event;
    switch (e.type) {
      case 'touchstart':
        data.startPoint = e.changedTouches[0];
        data.startPos = obj.ul.pos;
        obj.ul.style.transform = `translateX(${obj.ul.pos}px)`;      
        break;
      case 'touchmove':
      obj.ul.style.transition = '';
        e.preventDefault();
        let movePoint = e.changedTouches[0];
        let movePos = movePoint.pageX - data.startPoint.pageX + data.startPos;
        obj.ul.pos = movePos;
        obj.ul.style.transform = `translateX(${obj.ul.pos}px)`;
        break;
      case 'touchend':
        let currentPos = obj.ul.pos;
        currentPos = Math.min(0, currentPos);
        currentPos = Math.max(-data.liWidth * (len - 1), currentPos);
        let num = Math.round(- currentPos / data.liWidth);
        obj.ul.style.transition = 'transform 0.5s';
        obj.bg.setAttribute('src', obj.li[num].children[0].src);
        obj.bg.setAttribute('alt', `landscape${num + 1}`);
        obj.ul.pos = - num * data.liWidth;
        obj.ul.style.transform = `translateX(${obj.ul.pos}px)`;  
        break;
    }
  }
}
