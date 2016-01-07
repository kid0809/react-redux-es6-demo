'use strict'

import {expect} from 'chai'
import {List, Map} from 'immutable'

describe('immutability', () => {

  describe('A Number', () => {
    function increment(currentState) {
      return currentState + 1
    }

    // 这个方法返回的应该是个新值而不能改变state
    it('is immutable', () => {
      let state = 42
      let nextState = increment(state)

      expect(nextState).to.equal(43)
      expect(state).to.equal(42)
    })
  })


  describe('A List', () => {
    function addList(currentState, item) {
      return currentState.push(item)
    }

    it('is immutable', () => {
      let state = List.of('Item 1', 'Item 2')
      let nextState = addList(state, 'Item 3')

      expect(nextState).to.equal(List.of(
        'Item 1',
        'Item 2',
        'Item 3'
      ))

      expect(state).to.equal(List.of(
        'Item 1',
        'Item 2'
      ))

    })
  })


  describe('A Tree', () => {
    function addMap(currentState, item) {
      return currentState.set('items', currentState.get('items').push(item))
    }

    it('is immutable', () => {
      let state = Map({
        items: List.of('Item 1', 'Item 2')
      })
      let nextState = addMap(state, 'Item 3')

      expect(nextState).to.equal(Map({
        items: List.of(
          'Item 1',
          'Item 2',
          'Item 3'
        )
      }))

      expect(state).to.equal(Map({
        items: List.of(
          'Item 1',
          'Item 2'
        )
      }))
    })
  })

})