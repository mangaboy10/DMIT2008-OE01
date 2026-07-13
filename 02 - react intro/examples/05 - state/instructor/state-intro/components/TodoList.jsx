// state lets us store persistent data across component re-renders,
// and automate re-rendering whenever that data changes.

import { useState } from 'react';

import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function TodoList() {

  // first term:  the variable that will hold the value
  // second term: the setter function; the only thing allowed to change that value
  // initial param for useState: initial value
  const [todoItem, setTodoItem] = useState("")
  const [allTodos, setAllTodos] = useState([])

  const onTodoTextChange = (event) => {
    // call state variable's setter w/ new value to write.
    // since this function is just wrapping the call of one other function,
    // we don't *really* need it (see below in JSX)
    setTodoItem(event.target.value)
  }

  const onAddTodoClick = () => {
    console.log("clicked!")
    if (todoItem) {
      // we can't just e.g. push a new element to the array, because the setter function is the only thing
      // that can change the stateful variable's value, so I need to entirely reconstruct the new array.
      // Here, that just means... everything I had before, plus the new item.
      const newTodos = [...allTodos, todoItem]
      // We'll use the spread operator (...) for that. Basically, it means taking all elements of a series (e.g. from an array)
      // without actually *being* in that container.
      // The line above says: "take the *elements inside* allTodos, tack on todoItem after that, and wrap everything
      // in a new array".
      setAllTodos(newTodos)
    }
  }

  return (
      <Grid container spacing={2} sx={{ my: 4 }}>

        <Grid size={10}>
          {/* Most front-end frameworks use a 12-columnd grid (convenient lowest-common mulitple),
              so something being "12 columns wide" means it takes up the whole row.
          */}
          <TextField
            id="standard-basic"
            label="New todo item"
            variant="standard"
            sx={{ width: '100%' }}
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
          />
        </Grid>

        <Grid size={2}>
          <Button
            variant="contained"
            onClick={onAddTodoClick}
          >
            Add Todo Item
          </Button>
        </Grid>

        <Grid size={12}>

          <List sx={{ width: '75%' }}>
            {allTodos.map(
              /* Don't forget index when serialising lists in React! */
              (todo, index) => {
                return <ListItem key={index}>
                  <ListItemText>
                    <Typography>- {todo}</Typography>
                  </ListItemText>
                </ListItem>
              }
            )}
          </List>

        </Grid>
      </Grid>
  )

}