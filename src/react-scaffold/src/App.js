import React, { Component, useState } from 'react';
import './App.css';


class AddTodo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newItem: ''
		}
	}
	updateInput = e => {
		this.setState({ newItem: e.target.value })
	}
	addTodo = () => {
		if (this.state.newItem) {
			this.props.transferValue(this.state.newItem)
			this.setState({
				newItem: ""
			})
		}
	}
	render() {
		return (
			<div> <input value={this.state.newItem} onChange={this.updateInput}></input>
				<button onClick={this.addTodo}>add</button>
			</div>
		)
	}
}

function DoneStyle(WrappedComponent) {
	const gray = {
		color: 'gray'
	}
	return class extends Component {
		render() {
			return <div style={gray}> <WrappedComponent  {...this.props} /> </div>;
		}
	}
}

// class Todo extends Component {
// 	render = () => {
// 		const todo = this.props.todo;
// 		const [complete, setDone] = useState(todo.done)
// 		return (<li > <input type="checkbox" onChange={setDone} checked={complete ? "checked" :''}></input>{todo.name}</li>)
// 	}
// 	complete = () => {
// 		this.props.complete(this.props.todo.id)
// 	}
// }
function Todo(todo) {
		const [complete, setDone] = useState(todo.done)
		return (<li > <input type="checkbox" onChange={setDone} checked={complete ? "checked" :''}></input>{todo.name}</li>)

}

const Done = DoneStyle(Todo);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
	}
	childValue = data => {
		this.setState({
			todos: this.state.todos.concat({
				id: Date.now(),
				name: data,
				done: false
			})
		})
	}
	complete = (id) => {
		this.setState({
			todos: this.state.todos.map(v => {
				if (v.id === id) {
					v.done = !v.done;
				}
				return v;
			})
		})
	}

	render() {
		const todos = this.state.todos.map((v, i) => {
			if (v.done) return <Done key={i} todo={v} complete={this.complete} ></Done>
			return Todo(v)
		})
		const done = this.state.todos.filter(v => v.done)
		return (
			<div className="App"> <AddTodo transferValue={this.childValue}></AddTodo>
				<p> done: {done.length}</p>
				<ul>{todos}</ul>
			</div>
		)
	}

}

export default App;
