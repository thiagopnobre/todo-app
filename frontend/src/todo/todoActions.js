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
  const request = axios.post(BASE_URL, { description })
  return dispatchRequestAndSearch(request, 'TODO_ADDED')
}

export const markAsDone = (todo) => {
  const request = axios.put(`${BASE_URL}/${todo._id}`, { ...todo, done: true })
  return dispatchRequestAndSearch(request, 'TODO_MARKED_AS_DONE')
}

const dispatchRequestAndSearch = (request, request_dispatch_type) => {
  return dispatch => {
    request.then(response => {
      dispatch({ type: request_dispatch_type, payload: response.data })
    }).then(response => dispatch(search()))
  }
}
