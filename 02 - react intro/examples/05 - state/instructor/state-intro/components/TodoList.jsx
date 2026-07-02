// state lets us store persistent data across component re-renders,
// and automate re-rendering whenever that data changes.

import { useState } from 'react';

import TextField from '@mui/material/TextField';

export default function TodoList() {

  // first term:  the variable that will hold the value
  // second term: the setter function; the only thing allowed to change that value
  // initial param for useState: initial value
  const [todoItem, setTodoItem] = useState("")

  const onTodoTextChange = (event) => {
    // call state variable's setter w/ new value to write.
    setTodoItem(event.target.value)
  }

  return (
    <TextField
      id="standard-basic"
      label="New todo item"
      variant="standard"
      sx={{ width: '100%' }}
      value={todoItem}
      onChange={onTodoTextChange}
    />
  )

}