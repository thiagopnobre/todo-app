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
  }

  handleChange(event) {
    this.setState({ ...this.state, description: event.target.value })
  }

  handleAdd() {
    const description = this.state.description
    axios.post(BASE_URL, { description })
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
        <TodoForm description={this.state.description}
                  handleChange={this.handleChange}
                  handleAdd={this.handleAdd} />
        <TodoList />
      </div>
    )
  }
}
