import { AtTabs } from 'taro-ui'
import { useState } from 'react';
import Taro from '@tarojs/taro';

interface CustomerNavProps {
  config: {
    tabList: {
      title: string;
      linkInfo: {
        url: string;
        name: string;
      };
    }[];
  }
}

export const CustomerNav = (props: CustomerNavProps) => {
  const [current, setCurrent] = useState<number>(0);
  const onTabsClick = (current: number) => {
    const { linkInfo } = tabList[current];
    Taro.navigateTo({url: linkInfo.url});
    setCurrent(current);
  }

  const tabList = props.config.tabList;
  return (
    <AtTabs current={current} tabList={tabList} onClick={onTabsClick} scroll></AtTabs>
  )
}
