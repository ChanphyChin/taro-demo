import { AtTabs, } from 'taro-ui'
import Taro from '@tarojs/taro';
import { Component } from 'react';
import { Text } from '@tarojs/components';

import { getQueryVariable } from '../../../services';

interface CustomerNavProps {
  config: {
    tabList: {
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
    tabList: this.props.config.tabList,
  }
  onTabsClick = (current: number) => {
    const { isEdit, config: { tabList } } = this.props;
    const { linkInfo } = tabList[current];
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
      const page = getQueryVariable(search as string).page;
      this.props.config.tabList.forEach((item, index) => {
        const { linkInfo: { name } } = item;
        if(page === name) {
          this.setCurrent(index);
        }
      });
    }
  }

  render() {
    const { current, tabList } = this.state;
    const { isEdit } = this.props;
    if(!tabList.length && isEdit) {
      return <Text style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Nav</Text>;
    }
    if(!tabList.length && !isEdit) {
      return null;
    }
    return (
      <AtTabs current={current} tabList={tabList} onClick={this.onTabsClick} scroll></AtTabs>
    )
  }
}
