import React, { Component } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

class Home extends Component {
  render() {
    const { push, children } = this.props
    return (
      <div>
        <header>
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/todo">App</Link>
          {' '}
          <Link to="/foo">foo</Link>
        </header>
        <div>
          <button onClick={() => push('/foo')}>Go to /foo</button>
        </div>
        <div style={{ marginTop: '1.5em' }}>{children}</div>
      </div>
    )
  }
}

export default connect(
  null,
  { push: routeActions.push }
)(Home)
