import { Component } from 'react'

import { api, IframeManager } from '../../services';
import { MessageDataInterface } from '../../types';
import { Renderer } from '../../design';
import './index.scss'


class Index extends Component<any, any> {
  state = {
    pageConfig: {}
  }
  componentWillMount () { }

  componentDidMount () {
    api.get({
      apiPath: '/client/config',
      params: {
        pageType: 'home'
      }
    }).then((pageConfig: MessageDataInterface) => {
      this.setState({ pageConfig });
      pageConfig.config = { component: '', config: '' };
      IframeManager.postMessage(pageConfig);
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { pageConfig } = this.state;
    return (
      <Renderer pageConfig={pageConfig as MessageDataInterface}/>
    )
  }
}

export default Index
