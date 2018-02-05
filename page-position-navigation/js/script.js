function mainMethod() {
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    var menus = document.getElementById('menu').getElementsByTagName('a');
    var items = document.getElementById('content').getElementsByClassName("item");
    var currentId = '';

    for (var i = 0; i < items.length; i++) {
        var _item = items[i];
        var _itemTop = _item.offsetTop;

        if (top > _itemTop - 100) {
           currentId = '#' + _item.id;
        } else {
            break;
        }
    }

    if (currentId) {
        for (var j = 0; j < menus.length; j++) {
            var _menu = menus[j];
            var _href = _menu.getAttribute('href');

            if (_href !== currentId) {
                _menu.setAttribute('class', '');
                // console.log(_menu.className);
            } else {
                _menu.setAttribute('class', 'current');
            }
        }
    }

}

window.onload = function () {
    window.onscroll = mainMethod;
};