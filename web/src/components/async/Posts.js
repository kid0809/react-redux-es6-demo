import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>序号：{i + 1} 商品名称：{post.good.goodname}({post.goodid}) 单位：{post.good.unit} 实采总量：{post.goodtotal} 实采价格: {post.pprice} 采购总计：{post.pprice * post.goodtotal}</li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
