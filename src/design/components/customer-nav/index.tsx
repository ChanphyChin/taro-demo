import { AtTabs } from 'taro-ui'
import { useState, useEffect } from 'react';
import Taro, { render } from '@tarojs/taro';
import { Component } from 'react';

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
  disabled: Boolean;
}

export class CustomerNav extends Component<CustomerNavProps> {
  state = {
    current: 0,
    tabList: this.props.config.tabList,
  }
  onTabsClick = (current: number) => {
    const { disabled, config: { tabList } } = this.props;
    const { linkInfo } = tabList[current];
    !disabled && Taro.redirectTo({url: linkInfo.url});
    this.setCurrent(current);
  }

  setCurrent = (current: number) => {
    this.setState({ current });
  }

  componentDidMount() {
    const path = Taro.getCurrentInstance().router?.path;
    const search = path?.split('?')[1];
    const page = getQueryVariable(search as string).page;
    this.props.config.tabList.forEach((item, index) => {
      const { linkInfo: { name } } = item;
      if(page === name) {
        this.setCurrent(index);
      }
    });
  }

  render() {
    const { current, tabList } = this.state;
    return (
      <AtTabs current={current} tabList={tabList} onClick={this.onTabsClick} scroll></AtTabs>
    )
  }
}
