import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [
  {
    id: 0,
    completed: false,
    text: 'Use Redux'
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1, // 这个方法返回的id永远比原来最大的那个再+1
          completed: false,
          text: action.text
        }, 
        ...state
      ] // 返回值是[{新增的id n+1,新增的completed为false,新增的text为传入的action的text}，{原来的todo n}，{原来的todo n-1} ...]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      ) // 返回值是 过滤掉的todo.id等于传入的action.id的那个todo;假如传入的action.id = n-2,则返回[{todo n}, {todo n-1}, {todo n-3}，...]

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { text: action.text }) :
          todo
      ) // 假如n-1是action传入的id[{todo n}, {text: action.text, completed: todo.completed, id: todo.id}, {todo n-2}]

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      ) // 假如n-1是action传入的id[{todo n}, {text: todo.text, completed: !todo.completed, id: todo.id}, {todo n-2}]

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed) // arr.every返回值为布尔值。遍历todo判断todo.completed是否全为true,全为true返回true，否则返回false
      return state.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      })) // 再遍历所有todo，让所有todo.completed = !areAllMarked

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false) // 返回所有todo.completed = false的 的todo, todo.completed = true 的全过滤掉

    default:
      return state
  }
}
