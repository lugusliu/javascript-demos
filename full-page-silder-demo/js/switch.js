(function ($) {
    "use strict";
    var _prefix = (function (temp) {
        var aPrefix = ["webkit", "Moz", "o", "ms"],
            props = "";
        for (var i in aPrefix) {
            props = aPrefix[i] + "transition";
            if (temp.style[props] !== undefined) {
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
    })(document.createElement(PageSwitch));

    var PageSwitch = (function () {
        function PageSwitch(element, options) {
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options||{});
            this.element = element;
            this.init();
        }

        PageSwitch.prototype = {
            // 初始化插件

            // 初始化dom结构，布局，分页及绑定事件
            init: function () {
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.sections.find(me.selectors.section);
                me.direction = me.settings.direction == "vertical" ? true : false;
                me.pagesCount = me.pagesCount();
                me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

                me.canScroll = true;
            
                if (!me.direction || me.index) {
                    me._initLayout();
                }

                if (me.settings.pagination) {
                    me._initPaging();
                }

                me._initEvent();
            },

            // 获取滑动页面的数量
            pagesCount: function () {
                return this.section.length;
            },

            // 获取滑动的宽度（横屏滑动）或高度（竖屏滑动）
            switchLength: function () {
                return this.direction == 1 ? this.element.height() : this.element.width();
            },

            // 向前滑动一个页面
            prve: function () {
                var me = this;
                if (me.index > 0) {
                    me.index --;
                }else if (me.settings.loop) {
                    me.index = me.pagesCount - 1;
                }
                me._scrollPage();
            },
            
            // 向后滑动一个页面
            next: function () {
                var me = this;
                if (me.index < me.pagesCount) {
                    me.index ++;
                }else if (me.settings.loop) {
                    me.index = 0;
                }
                me._scrollPage();
            },

            // 针对横屏情况进行页面布局
            _initLayout: function () {
                var me = this;
                if (!me.direction) {
                var width = (me.pagesCount * 100) + "%",
                    cellWidth = (100 / me.pagesCount).toFixed(2) + "%";
                me.sections.width(width);
                me.section.width(cellWidth).css("float", "left");  
                }
                if(me.index){
					me._scrollPage(true);
				}
            },

            // 页面分页UI布局
            _initPaging: function () {
                var me = this,
                    pagesClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);
                
                var pageHtml = "<ul class=" + pagesClass + ">";

                for (var i = 0; i < me.pagesCount; i++) {
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                me.element.append(pageHtml);
                var pages = me.element.find(me.selectors.page);
                me.pageItem = pages.find("li");
                me.pageItem.eq(me.index).addClass(me.activeClass);

                if (me.direction) {
                    pages.addClass("vertical");
                } else {
                    pages.addClass("horizontal");
                }
            },

            // 初始化插件事件
            _initEvent: function () {
                var me = this;
                // 绑定鼠标点击事件
                me.element.on("click", me.selectors.pages + " li", function () {
                    me.index = $(this).index();
                    me._scrollPage();
                });

                // 绑定鼠标滚轮时间
                me.element.on("mousewheel DOMMouseScroll", function (e) {
                    e.preventDefault();
                    var delta = e.originalEvent.wheelDelta || - e.originalEvent.detail;
                    if (me.canScroll) {
                        if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
                            me.prve();
                        } else if (delta < 0 &&(me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
                            me.next();
                        }
                    } 
                });

                // 判断键盘点击事件
                if (me.settings.keyboard) {
                    $(window).on("keydown", function(e) {
                        var keyCode = e.keyCode;
                        if (keyCode === 37 || keyCode === 38) {
                            me.prve();
                        } else if (keyCode === 39 || keyCode === 40) {
                            me.next();
                        }
                    })
                }

                // 绑定窗口改变时间
                var resizeId;
                $(window).resize(function () {
                    clearTimeout(resizeId);
                    resizeId = setTimeout(function () {
                        var currentLength = me.switchLength(),
                        offset = me.settings.direction ? me.section.eq(me.index).
                            offset().top : me.section.eq(me.index).offset().left;

                        if (Math.abs(offset) > currentLength / 2 && me.index < (me.
                            pagesCount - 1)) {
                                me.index ++;
                        }
                        if (me.index) {
                            me._scrollPage();
                        }
                    }, 500);
                });

                // 绑定 transitionend 事件
                me.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function () {
                    me.canScroll = true;
                    if (me.settings.callback && $.type(me.settings.callback) === "function") {
                        me.settings.callback();
                    }
                });
            },

            // 滑动动画
            _scrollPage: function (init) {
                var me = this;
                var dest = me.section.eq(me.index).position();
                    if (!dest) return;

                    me.canScroll = false;
                
                    if (_prefix) {
                        me.sections.css(_prefix + "transition", "all " + me.settings.duration + "ms " + me.settings.easing);
                        var translate = me.direction ? "translateY(-" + dest.top + "px)" : "translateY(-" + dest.left + "px)";
                        me.section.css(_prefix + "transform", translate);
                    } else {
                        var animateCss = me.direction ? {top: -dest.top} : {left: -dest.left};
                        me.sections.animate(animateCss, me.settings.duration, function () {
                            me.canScroll = true;
                            if (me.settings.callback && $.type(me.settings.callback) === "function") {
                                me.settings.callback();
                            }
                        });
                    }

                    if (me.settings.pagination && !init) {
                        me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                    }
            }
        };

        return PageSwitch;

    })();

    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data("PageSwitch");
            if (!instance) {
                me.data("PageSwitch", (instance = new PageSwitch(me, options)));
            }
            if($.type(options) === "string") return instance[options]();
        });
    };

    $.fn.PageSwitch.defaults = {
        selectors: {
            sections: ".sections",
            section: ".section",
            page: ".pages",
            active: ".active"
        },
        index: 0,
        easing: "ease",
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: "horizontal",
        callback: ""
    };

    $(function () {
        $('[data-PageSwitch]').PageSwitch();
    });
})(jQuery);