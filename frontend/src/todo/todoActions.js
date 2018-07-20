import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
})

export const search = () => {
  const request = axios.get(`${BASE_URL}?sort=-createdAt`)
  return {
    type: 'TODO_SEARCHED',
    payload: request
  }
}

export const add = (description) => {
  return dispatch => {
    axios.post(BASE_URL, { description })
         .then(response => dispatch({ type: 'TODO_ADDED', payload: response.data }))
         .then(response => dispatch(search()))
  }
}

export const markAsDone = todo => markAs(todo, true)

export const markAsPending = todo => markAs(todo, false)

const markAs = (todo, done) => {
  return dispatch => {
    axios.put(`${BASE_URL}/${todo._id}`, { ...todo, done })
         .then((response) => {
            const status = done ? 'DONE' : 'PENDING'
            dispatch({ type: `TODO_MARKED_AS_${status}`, payload: response.data._id })
         })
         .catch(error => alertRequestError(error))
  }
}

const alertRequestError = (error) => {
  const error_message = error.response || error.request || error.message
  alert(`Error: ${error_message}`)
}
