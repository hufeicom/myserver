import React, { useState } from "react";

export default function (todo) {
    const [complete, setDone] = useState(todo.done)
    return (<li > <input type="checkbox" onChange={setDone} checked={complete ? "checked" : ''}></input>{todo.name}</li>)
}

