import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Renderer } from '../../design';
import './index.scss'


@inject('store')
@observer
class Index extends Component<any, any> {
  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { counterStore: { counter } } = this.props.store
    return (
      <Renderer />
    )
  }
}

export default Index
