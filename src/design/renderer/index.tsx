import { EditableRenderer } from './editable-renderer';
import { DisplayRenderer } from './display-renderer';
import { getCurrentInstance, getCurrentPages } from '@tarojs/taro'
import { useEffect, useState } from 'react';
import { MessageDataInterface } from '../../types';

export const Renderer = (props: { pageConfig: MessageDataInterface }) => {
  const [type, setType] = useState<string|undefined>('');
  const [pageConfig, setPageConfig] = useState<MessageDataInterface>();
  useEffect(() => {
    // @ts-ignore
    const params = getCurrentInstance().router.params;
    const type = params.type;
    const currentPage = getCurrentPages()[getCurrentPages().length -1];
    setType(type);
  }, []);
  useEffect(() => {
    const { pageConfig } = props;
    setPageConfig(pageConfig);
  }, [props.pageConfig]);
  if(type === 'edit') {
    return <EditableRenderer pageConfig={pageConfig as MessageDataInterface} />
  }
  return <DisplayRenderer pageConfig={pageConfig as MessageDataInterface} />;
}
