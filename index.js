const Koa = require('koa2');
const views = require('koa-views');

const app = new Koa();
app.use(require('koa-static')('./static'));
app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
}));

const PORT = 80;

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

app.listen(PORT);

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