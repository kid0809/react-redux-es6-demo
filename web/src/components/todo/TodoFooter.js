/**************************************
 * Created by Kid on 2015年8月31日
 **************************************/
'use strict'

import React from 'react'

export default class TodoFooter extends React.Component {
  constructor() {
    super()
  }

  // 处理全选与全不选
  // handlerAllState(event) {
  //   this.props.changeTodoState(null, event.target.checked, true)
  // }

  // 绑定点击事件, 清除已完成
  // handlerClick() {
  //   this.props.clearDone()
  // }

  render() {
    const { actions } = this.props
    return (
      <div className="clearfix todo-footer">
        <input type="checkbox" className="fl" checked={ this.props.isAllChecked } onChange={ () => actions.completeAll() }/>
        <span className="fl">{ this.props.todoDoneCount }已完成 / { this.props.todoCount }总数 </span>
        <button className="fr" onClick={ () => actions.clearCompleted() }>清除已完成</button>
      </div>
    )
  }
}
