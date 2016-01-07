/**************************************
 * Created by Kid on 2015年8月31日
 **************************************/
'use strict'

import React, { Component }from 'react'

class TodoHeader extends Component {
  // 绑定键盘回车事件,添加新任务
  handlerKeyUp(event) {
    if (event.keyCode === 13) {
      const value = event.target.value

      if (!value) return false

      event.target.value = ''
      
      this.props.addTodo(value)
    }
  }

  render() {
    return (
      <div className="panel-header">
        <input type="text" onKeyUp={ this.handlerKeyUp.bind(this) } placeholder="what's your task ?"/>
      </div>
    )
  }

}

export default TodoHeader
