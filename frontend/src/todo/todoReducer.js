const INITIAL_STATE = { description: '', list: [] }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'DESCRIPTION_CHANGED':
      return { ...state, description: action.payload }
    case 'TODO_SEARCHED':
      return { ...state, list: action.payload.data }
    case 'TODO_CLEAR':
      return { ...state, description: '' }
    case 'TODO_MARKED_AS_DONE':
      return { ...state, list: updateTodoInList(action.payload, true, state.list) }
    case 'TODO_MARKED_AS_PENDING':
      return { ...state, list: updateTodoInList(action.payload, false, state.list) }
    case 'TODO_REMOVED':
      return { ...state, list: removeTodoFromList(action.payload, state.list) }
    default:
      return state
  }
}

const updateTodoInList = (id, done, list) => {
  const updatedList = []
  let todo

  for (let i = 0 ; i < list.length ; i += 1) {
    todo = list[i]
    if (todo._id === id) todo.done = done

    updatedList.push(todo)
  }

  return updatedList
}

const removeTodoFromList = (id, list) => {
  return list.filter(todo => todo._id !== id)
}
