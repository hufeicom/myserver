import React from 'react';

class Son extends React.Component {
    render() {
        const { nums, parent } = this.props;
        return (
            <div>  <div>{nums.map((n,i) => <span key={Date.now()+i}>{n}, </span>)} </div>{parent()}</div>
        );
    }
}

class Parent extends React.Component {
    constructor() {
        super();
        this.state = {
            numbers: Array.from(new Array(10)).map((v, i) => {
                return parseInt(Math.random() * 10)
            })
        }
        this.oddSum = this.oddSum.bind(this)
        this.evenSum = this.evenSum.bind(this)
    }
    oddSum() {
        return <h2> This odd number's indexs is : {this.state.numbers.map((v,i) => v & 1 ? i : '').join(',')}  </h2>
    }
    evenSum() {
        return <h2> This even number's indexs is : {this.state.numbers.map((v,i)=> !(v & 1) ? i : null).join(',')}  </h2>
    }
    render() {
        return (
            <div><Son parent={this.oddSum} nums={this.state.numbers.filter(v => v & 1)}></Son>
                <Son parent={this.evenSum} nums={this.state.numbers.filter(v => !(v & 1))}></Son></div>
        );
    }
}

export default Parent;