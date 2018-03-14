const ul = document.querySelector('ul');
const li = document.querySelectorAll('li');
const bg = document.querySelector('.bg-pic > img');
let len = li.length;

ul.style.width = len + '00%';

// 绑定手指触摸事件
ul.addEventListener('touchstart', touch);

// 绑定手指滑动事件
ul.addEventListener('touchmove', touch);

// 绑定手指抬起事件
ul.addEventListener('touchend', touch);

// 将 touch 事件统一放到下面的函数处理
function touch() {
  let e = window.event || event;
  switch (e.type) {
    case 'touchstart':
      ul.style.transform = 'translateX(-20%)';
      bg.setAttribute('src', 'image/2.jpg');
      bg.setAttribute('alt', 'landscape2');
      break;
      case 'touchmove':
      console.log('touchmove');
      break;
      case 'touchend':
      console.log('touchend');
      break;
  }
}