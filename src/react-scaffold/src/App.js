import React, { useState, useRef, useEffect } from 'react';
import './App.css';
// import Todo from "./todo"

function AddTodo(props, ref) {
	const [newItem, setItem] = useState('')
	const { addItem } = props;
	return <div> <input value={newItem} onChange={e=>{ setItem(e.target.value) }}></input>
		<button onClick={()=>addItem(newItem)}>add</button>
	</div>
}

function DoneStyle() {
	const gray = {
		color: 'gray'
	}
	return function (props) {
		const {todo} = props;
		return <div style={gray}> <Todo todo={todo}></Todo> </div>;
	}
}
function Todo(props) {
	const index = props.index;
	const { name, id, done } = props.todo;
	const pSetDone = props.setDone;
	const [ complete, setDone ] = useState(done);
	console.log(id, done, complete)
	return (<li key={id}> <input type="checkbox" checked={complete ? 'checked':''} onChange={(e)=>{
		// console.log( e.target.value === 'on');
		// setDone( !complete );
		pSetDone( id, !complete)
	}}></input>{name}</li>)

}

const Done = DoneStyle(Todo);

function App() {
	const [todos, setTodos] = useState([{
		id: Date.now()
		,name: "hhaha"
		, done: true
	}]);
	console.log(todos);
	// const pchildref = useRef();
	function childValue(data) {
		const newTodos = todos.concat([{
			id: Date.now(),
			name: data,
			done: false
		}]);
		console.log(newTodos)
		setTodos(newTodos)
	}

	function setDone(id, done){
		const newtodo = todos.map( v=>{
			console.log(id, v.id, done)
			if( v.id == id) v.done = done;
			console.log(v)
			return v;
		});
		
		setTodos(todos)
	}
	// useEffect()
	return (
		<div className="App"> <AddTodo addItem={(data)=>{ 
			childValue(data)
		}}></AddTodo>
			<p> done: {todos.filter(v => v.done).length}</p>
			<ul> {console.log(Date.now()),todos.map((v, i) => {
				if (v.done) return <Done key={i} todo={v}></Done>
				return <Todo key={i} index={i} todo={v} setDone={(id,done)=>{
					setDone(id, done)
				}}></Todo>
			})}</ul>
		</div>
	)


}

export default App;
