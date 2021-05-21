import { AtTabs, } from 'taro-ui'
import Taro from '@tarojs/taro';
import { Component } from 'react';
import { Text } from '@tarojs/components';

import { getQueryVariable } from '../../../services';

interface CustomerNavProps {
  config: {
    items: {
      title: string;
      linkInfo: {
        url: string;
        name: string;
      };
    }[];
  };
  isEdit: Boolean;
}

export class CustomerNav extends Component<CustomerNavProps> {
  state = {
    current: 0,
    items: this.props.config.items,
  }
  onTabsClick = (current: number) => {
    const { isEdit, config: { items } } = this.props;
    const { linkInfo } = items[current];
    !isEdit && Taro.redirectTo({url: linkInfo.url});
    this.setCurrent(current);
  }

  setCurrent = (current: number) => {
    this.setState({ current });
  }

  componentDidMount() {
    const path = Taro.getCurrentInstance().router?.path;
    const search = path?.split('?')[1];
    if(search) {
      const { config: { items = [] } } = this.props;
      const page = getQueryVariable(search as string).page;
      items.forEach((item, index) => {
        const { linkInfo: { name } } = item;
        if(page === name) {
          this.setCurrent(index);
        }
      });
    }
  }

  render() {
    const { current, items = [] } = this.state;
    const { isEdit } = this.props;
    if(!items.length && isEdit) {
      return <Text style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Nav</Text>;
    }
    if(!items.length && !isEdit) {
      return null;
    }
    return (
      <AtTabs current={current} tabList={items} onClick={this.onTabsClick} scroll></AtTabs>
    )
  }
}
