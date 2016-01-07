/**************************************
 * Created by Kid on 2015年8月31日
 **************************************/
'use strict'

import React from 'react'

import TodoHeader from './TodoHeader'
import TodoBody from './TodoBody'
import TodoFooter from './TodoFooter'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      isAllChecked: false
    }
  }


  // 判断是否所有任务状态都完成,同步底部全选框
  allChecked() {
    let isAllChecked = false

    // every() 循环判断是不是每个任务都完成
    if (this.state.todos.every((todo) => todo.isDone)) {
      isAllChecked = true
    }

    const todos = this.state.todos

    this.setState({
      todos,
      isAllChecked
    })
  }


  // 添加任务,传递给Header组件
  addTodo(todoItem) {
    // 把任务对象 todoItem 添加到数组中
    this.state.todos.push(todoItem)
    this.allChecked()
  }


  // 改变任务状态,传递给TodoItem和Footer组件方法
  changeTodoState(index, isDone, isChangeAll = false) {
    if (isChangeAll) {
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.isDone = isDone
          return todo
        }),
        isAllChecked: isDone
      })
    } else {
      this.state.todos[index].isDone = isDone
      this.allChecked()
    }
  }


  // 清除已完成任务,传递给Footer
  clearDone() {
    const todos = this.state.todos.filter(todo => !todo.isDone)

    const isAllChecked = false
    this.setState({
      todos,
      isAllChecked
    })
  }

  // 删除当前的任务,传递给TodoItem
  deleteTodo(index) {
    this.state.todos.splice(index, 1)

    this.setState({
      todos: this.state.todos
    })
  }

  render() {
    const props = {
      todoCount: this.state.todos.length || 0,
      todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
    }

    return (
      <div className="panel">

        <TodoHeader addTodo={ this.addTodo.bind(this) } />

        <TodoBody
          deleteTodo={ this.deleteTodo.bind(this) }
          todos={ this.state.todos }
          changeTodoState={ this.changeTodoState.bind(this) }
        />

        <TodoFooter
          { ...props }
          isAllChecked={ this.state.isAllChecked }
          clearDone={ this.clearDone.bind(this) }
          changeTodoState={ this.changeTodoState.bind(this) }
        />
      </div>
    )
  }
}
