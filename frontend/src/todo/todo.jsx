import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const BASE_URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = { description: '', list: [] }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
    this.handleRemove = this.handleRemove.bind(this)

    this.refresh()
  }

  handleChange(event) {
    this.setState({ ...this.state, description: event.target.value })
  }

  handleAdd() {
    const description = this.state.description
    axios.post(BASE_URL, { description })
         .then(response => this.refresh())
  }

  handleSearch() {
    this.refresh(this.state.description)
  }

  handleMarkAsDone(todo) {
    axios.put(`${BASE_URL}/${todo._id}`, { ...todo, done: true })
         .then(response => this.refresh(this.state.description))
  }

  handleMarkAsPending(todo) {
    axios.put(`${BASE_URL}/${todo._id}`, { ...todo, done: false })
         .then(response => this.refresh(this.state.description))
  }

  handleRemove(todo) {
    axios.delete(`${BASE_URL}/${todo._id}`)
         .then(response => this.refresh(this.state.description))
  }

  refresh(description = '') {
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${BASE_URL}?sort=-createdAt${search}`)
         .then(response => {
           this.setState({...this.state, description, list: response.data })
         })
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro'></PageHeader>

        <TodoForm description={this.state.description}
                  handleChange={this.handleChange}
                  handleAdd={this.handleAdd}
                  handleSearch={this.handleSearch} />

        <TodoList list={this.state.list}
                  handleMarkAsDone={this.handleMarkAsDone}
                  handleMarkAsPending={this.handleMarkAsPending}
                  handleRemove={this.handleRemove} />
      </div>
    )
  }
}
