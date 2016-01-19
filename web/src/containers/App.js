import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/todo/TodoHeader'
import TodoBody from '../components/todo/TodoBody'
import TodoFooter from '../components/todo/TodoFooter'
// import MainSection from '../components/MainSection'
import * as TodoActions from '../actions/todos'


class App extends Component {
  handleChange(event) {
    console.log(event.target.value)
  }

  render() {
    const { todos, actions } = this.props
    const props = {
      todoCount: todos.length || 0,
      todoDoneCount: (todos && todos.filter((todo) => todo.completed)).length || 0
    }
    return (
      <div className="panel">
        <Header addTodo={actions.addTodo} />
        <TodoBody todos={todos} actions={actions} />
        <TodoFooter { ...props } actions={actions} />
        { /* <MainSection todos={todos} actions={actions} /> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
