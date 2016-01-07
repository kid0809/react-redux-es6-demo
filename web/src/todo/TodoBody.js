/**************************************
 * Created by Kid on 2015年8月31日
 **************************************/
'use strict'

import React from 'react'
import TodoItem from './TodoItem'

export default class TodoBody extends React.Component {
  render() {
    const { todos, actions } = this.props
    return (
      <ul className="todo-list">
        {todos.map(todo => {
          return <TodoItem key={todo.id} todo={todo} {...actions} />
        })}
      </ul>
    )
  }
}
