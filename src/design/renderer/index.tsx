import { EditableRenderer } from './editable-renderer';
import { DisplayRenderer } from './display-renderer';
import { getCurrentInstance, getCurrentPages } from '@tarojs/taro'
import { useEffect, useState } from 'react';
import { MessageDataInterface } from '../../types';

export const Renderer = () => {
  const [type, setType] = useState<string|undefined>('');
  const [pageConfig, setPageConfig] = useState<MessageDataInterface>();
  useEffect(() => {
    // @ts-ignore
    const params = getCurrentInstance().router.params;
    const type = params.type;
    const currentPage = getCurrentPages()[getCurrentPages().length -1];
    console.log(currentPage);
    setType(type);
  }, []);
  useEffect(() => {
    setPageConfig({
      config: {
        component: '',
        config: ''
      },
      index: 0,
      items: [
        {
          component: 'CustomerSwiper',
          config: '{"list": [{"url": "", "pic": ""}]}',
          id: 'a'
        },
        {
          component: 'CustomerText',
          config: '{"text": "this is text component", "color": "#000", "fontSize": 20}',
          id: 'b'
        },
        {
          component: 'CustomerNav',
          config: '{"list": [{"url": "", "title": "NAV"}, {"url": "", "title": "NAV1"}, {"url": "", "title": "NAV2"}], "rowCount": 3}',
          id: 'c'
        },
      ],
      type: 'edit'
    });
  }, []);
  if(type === 'edit') {
    return <EditableRenderer pageConfig={pageConfig as MessageDataInterface} />
  }
  return <DisplayRenderer pageConfig={pageConfig as MessageDataInterface} />;
}
