
(function (_, jQuery) {
    function dbhandler(e) {
        console.log('dblclick handler', e.type, e.target)
    }
    jQuery.event.special['dblclick'] = {
        setup: function () {
            document.addEventListener('dblclick', dbhandler)
            return false;
        },
        teardown: function () {
            document.removeEventListener('dblclick', dbhandler)
            return false;
        }
    }

 
    var elems = [];
    jQuery.event.special['clickout'] = {
        setup: function () {
            console.log('clickout setup')
            // 依赖于事件的捕获机制
            document.addEventListener('click', clickOutsideHandler, true)
        },
        teardown: function () { 
            if( elems.length )return;
            document.removeEventListener('click', clickOutsideHandler);
            console.log('clickout teardown');
         },
        add: function (handleObj) {
            var handler = handleObj.handler;
            handleObj.handler = function (e) {
                e.stopPropagation();
                handler.call(this, e)
            }
            elems.indexOf(this) === -1 && elems.push(this)
        },
        remove: function () {
            var elem = this;
            elems.forEach(function (v, i) {
                v === elem && elems.splice(i, 1)
            })
        }
    }

    function clickOutsideHandler(e) {
        jQuery.each(elems, function (_, elem) {
            if (e.target !== elem && !elem.contains(e.target)) {
                jQuery.event.simulate('clickout', elem, jQuery.event.fix(e))
            }
        })
    }

})(window, jQuery)