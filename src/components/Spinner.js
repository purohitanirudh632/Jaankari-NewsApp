import React, { Component } from 'react'
import Infinity from './Infinity4.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
      <img src={Infinity} alt='loading'></img>
    </div>
    )
  }
}

export default Spinner


