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
