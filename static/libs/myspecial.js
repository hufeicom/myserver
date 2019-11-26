
(function (_, jQuery) {
    let i = 0;
    function dbhandler() {
        console.log('dblclick handler')
    }
    jQuery.event.special['dblclick'] = {
        setup: function () {
            console.log('dblclick count', i++)
            document.addEventListener('dblclick', dbhandler)
            return false;
        },
        teardown: function () {
            document.removeEventListener('dblclick', dbhandler)
            return false;
        },
        add: function () { },
        remove: function () { }
    }

    jQuery.event.special[''] = {
        setup: function () {
            document.addEventListener('dblclick', dbhandler)
            return false;
        },
        teardown: function () {
            document.removeEventListener('dblclick', dbhandler)
            return false;
        },
        add: function () { },
        remove: function () { }
    }

    let c = 0;
    let elems = _.elems = [];
    jQuery.event.special['clickoutside'] = {
        setup: function () {
            c++;
            if(c>1) return;
            document.addEventListener('click', clickOutsideHandler)
        },
        teardown: function () {
            document.removeEventListener('click', clickOutsideHandler)
            return false;
        },
        add: function () {
            if (elems.indexOf(this) === -1) {
                elems.push(this)
            }
        },
        remove: function () {
            console.log(arguments)
            console.log(elems)
            elems.forEach(function (v, i) {
                if (v === this) {
                    console.log(this, i)
                    elems.splice(i, 1)
                }
            })
        }
    }

    function clickOutsideHandler(e) {
        console.log(c)
        jQuery.each(elems, function (_, elem) {
            if (e.target !== elem && !elem.contains(e.target)) {
                jQuery.event.simulate('clickoutside', elem, e)
            }
        })
    }



})(window, jQuery)