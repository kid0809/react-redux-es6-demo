/**************************************
 * Created by Kid on 2015年8月31日
 **************************************/
'use strict'

import React from 'react'

export default class TodoItem extends React.Component {
  constructor() {
    super()
  }

  // 鼠标移入
  handlerMouseOver() {
    this.refs.deleteBtn.style.display = 'inline'
  }

  // 鼠标移出
  handlerMouseOut() {
    this.refs.deleteBtn.style.display = 'none'
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props
    const doneStyle = todo.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }
    return (
      <li onMouseOver={ this.handlerMouseOver.bind(this) } onMouseOut={ this.handlerMouseOut.bind(this) }>
        <input className="fl" type="checkbox" checked={todo.completed} onChange={ () => completeTodo(todo.id) } />
        <span style={ doneStyle }>{ todo.text }</span>
        <button ref="deleteBtn" style={{ 'display': 'none' }} className="fr" onClick={() => deleteTodo(todo.id)}>删除</button>
      </li>
    )
  }
}
