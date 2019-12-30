import React, { useState, useEffect } from 'react'
import './App.css'

const MAX = 3;
function Huomian(props) {
	let [time, updateTime] = useState(0);
	let max = props.max;
	useEffect(() => {
		let id = setInterval(() => {
			time++;
			if (time <= max) updateTime(time++);
			else {
				props.onDone()
			}
		}, 800);
		return () => clearInterval(id);
	})
	return <p>{time} seconds gone~~ ( after {max} seconds)</p>
}
function Mantou() {
	let [done, updateDone] = useState(false)
	return <div> {done ? <p>  蒸馒头</p> : <Huomian max={MAX} onDone={() => { updateDone(!done) }}></Huomian>}</div>
}
function Baozi(){
	let [done, updateDone] = useState(false)
	return <div>
		{done ? <p>蒸包子</p> : <Huomian max={MAX+3} onDone={ ()=>{updateDone(!done)}}></Huomian>}
	</div>
}


function Todos() {
	let [todos, updateTodos] = useState([
		{
			name: 'foo',
			id: Date.now(),
			done: false
		}
	])
	let [newItem, updateNewItem] = useState('')
	function handleKeyUp(e){
		if(e.keyCode === 13 && e.target.value){
			const [...newTodos] = todos;
			newTodos.push({
				name: newItem,
				id: Date.now(),
				done:false
			})
			updateNewItem('')
			updateTodos(newTodos)
		}
	}

	function toggleDone(id) {
		const [...newTodos] = todos;

		newTodos.forEach(v => {
			if (v.id === id) {
				v.done = !v.done;
			}
		})
		updateTodos(newTodos)
	}

	const doneStyle={
		color: 'gray'
	}

	return <div> 
			<input type="text" value={newItem} onChange={ e=>updateNewItem(e.target.value) } onKeyUp={ handleKeyUp }></input>
		<p> count: {(todos.filter(v => v.done)).length} </p><ul> {todos.map((v, i) => <li key={i} style={v.done ? doneStyle : {}}>
		<input type="checkbox" onChange={() => { toggleDone(v.id) }} checked={v.done} />  {v.name}</li>)}</ul>
	</div>
}

export default Todos;

export { Mantou, Baozi}