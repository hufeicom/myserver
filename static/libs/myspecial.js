/* jQuery 模拟clickout 事件 */
(function (jQuery) {
    var elems = []; /* 存储所有绑定clickout事件的元素， 用于触发click时，进行遍历*/
    jQuery.event.special['clickout'] = {
        noBubble: true,
        setup: function () {
            console.log('clickout setup')
            // 依赖于事件的捕获机制， 之所以绑定在document的捕获过程上是为了监听所有的click事件
            document.addEventListener('click', clickOutsideHandler, true)
        },
        teardown: function () { 
            if( elems.length )return;
            document.removeEventListener('click', clickOutsideHandler);
            console.log('clickout teardown');
         },
        add: function () {
            elems.indexOf(this) === -1 && elems.push(this)
        },
        remove: function () {
            var elem = this;
            elems.forEach(function (v, i) {
                v === elem && elems.splice(i, 1)
            })
        },
        trigger: function(e){
            if(e.target === this){ // 手动触发
                triggerHandler(this, e) 
            }
        }
    }

    function clickOutsideHandler(e) {
        jQuery.each(elems, function (_, elem) {
            if (e.target !== elem && !elem.contains(e.target)) {
                jQuery.event.simulate('clickout', elem, jQuery.event.fix(e))
            }
        })
    }
    function triggerHandler(el, event){
        jQuery.each(elems, function (_, elem) {
            if ( el.contains(elem)) {
                event.isPropagationStopped=function(){return false;} /* 这一句很奇怪 */
                jQuery.event.dispatch.call(elem, event)
            }
        })
    }

})(jQuery)