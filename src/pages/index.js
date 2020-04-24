import React, { Component } from 'react';
import router from 'umi/router';
export default class index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(localStorage.getItem('userid'));
    if (localStorage.getItem('userid') === null) {
      this.props.history.push('/login');
    }
  }
  render() {
    return <div>403</div>;
  }
}
