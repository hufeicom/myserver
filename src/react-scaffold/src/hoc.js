import React from 'react'
import { render } from 'ejs'


class Base extends React.Component {
    constructor() {
        super();
        this.state = {
            name: 'BASE LEVEL'
        }
        this.render = this.render.bind(this)
    }
    render(props) {
        console.log(props)
        return <h3> {JSON.stringify(props)}</h3>
    }
}

let i = 0;

function Factory(comp) {
    
    return class extends comp {
        constructor() {
            super();
            console.log(i);
            let k = 'a'+(Math.random()).toString(16).slice(-6);
            console.log(k)
            this.state = {
                [k]: "LEVEL " + i
            }
        }
        render(props) {
            console.log(props, this.state)
            let newProps = Object.assign(props ? props : {}, this.state);
            
            return <div> <p> {Date.now() + '-' + (i++)}</p>{super.render(newProps)} </div>
        }
    }
}



export default Factory(Factory(Factory(Factory(Factory(Base)))))