
function createScript(url) {
    return new Promise((resolve) => {
        let s = document.createElement('script');
        s.src = url;
        document.body.appendChild(s);
        s.onload = () => {
            resolve()
        }
    })
}

const lodash = "../libs/lodash.js";
const platform = "../libs/platform.js";
const benchmark = "../libs/benchmark.js";
let loading = true;
async function loadDependencies() {
    await createScript(lodash)
    await createScript(platform)
    await createScript(benchmark)

    loading = false;
}

let logbox = document.createElement('div')
document.body.appendChild(logbox);
function log(text){
    let p = document.createElement('p')
    p.textContent = Date.now() + '：' + text;
    logbox.appendChild(p);
    return text;
}

function gf(fn, ...args){
    return function(){
        Reflect.apply( fn, null, args)
    }
}
window.Test = async function (...args) {
    if(loading) loadDependencies().then(run)
    else run()

    function run(){
        var suite = new Benchmark.Suite;
    
        args.forEach((item,i)=>{
            if (!item.fn) return;
            item.params = item.params || []
            suite.add(item.name || item.fn.name || `index${i}`, gf(item.fn, ...item.params))
        })
        
        console.log(log('start running test...'));
        // add tests
        suite
            // add listeners
            .on('cycle', function (event) {
                let str = (String(event.target));
                console.log(str);
                log(str);
            })
            .on('complete', function () {
                let str = ('Fastest is ' + this.filter('fastest').map('name'));
                console.log(str);
                log(str)
            })
            // run async
            .run({ 'async': true });


    }
}