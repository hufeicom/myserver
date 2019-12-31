const {spawn, execFile} = require('child_process')
const path = require('path')
const log = console.log;
const ls = spawn('ls', ['-lh', './'])


// outCallback(ls)

ls.on('close', (...args)=>{
    console.log(`child process close and close args`, args)
})


const file = path.resolve('./test.sh')
console.log(file)
execFile(file, [], {
    cwd: './',
    shell: process.env.ComSpec
},(err, stdout, stderr)=>{
   if(err){
       log(11)
       console.log(err)
   } else {
    console.log( stderr)

   }
})

// outCallback(lsf);

function outCallback(target){
    const pipes = ['stdout', 'stderr'];

    pipes.forEach(name=>{
        target[name].on('data', d=>{
            console.log(name, d.toString());
        })
    })
}