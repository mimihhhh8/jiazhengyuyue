import React, { Component } from 'react'

export default class Hidden extends Component {
  render() {
    const { visible, children, tag = 'div', ...rest } = this.props
    const content = visible ? children : null
    return (
      React.createElement(tag, rest, content)
    )
    // return (
    // 尝试用这种方法去实现，发现不符合react的规则，所以使用最原始的渲染方法
    // React.createElement
    //  `<`${tag}`>` + { content } + `</`${tag}`>` 
    // )
  }
}