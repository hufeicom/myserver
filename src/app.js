const Koa = require('koa2');
const views = require('koa-views');
const path = require('path')

const app = new Koa();
app.use(require('koa-static')('./static'));
app.use(views( path.join(__dirname, '../views'), {
    map: {
        html: 'ejs'
    }
}));

const opt = require('./init.js')

app.use(async ctx => {
    const path = ctx.path;
    if(path.indexOf('/api') === 0 ){
        await Mock(path.slice(4)).then( data=>{
            ctx.type = 'application/json';
            ctx.body = data;
        }), ()=>{
            ctx.body = 'no data~~~'
        };
        
    } else {
        await ctx.render(ctx.path.slice(1));
    }
});



const fs = require('fs')
function Mock(file){
    return new Promise( (resolve, reject) =>{
        fs.readFile( `${__dirname}/mock${file}.json`, (err, data) =>{
            if(err){
                reject()
            } else {
                resolve(data)
            }
        })
    })
}

app.listen(opt.port, ()=>{
    console.log(`server start successfully`, `\nyou can visit http://localhost${opt.port===80?'':':'+opt.port}`)
});