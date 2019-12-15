const argv = process.argv.slice(2)

const params = {
    port: 3000 // default port 80
};
argv.map( v=>{
    if(/^p\d+$/.test(v)){
        params.port = v.slice(1)
    }
})
module.exports=params;
