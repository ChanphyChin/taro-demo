import { Text } from '@tarojs/components';
import { CSSProperties } from 'react';

interface CustomerTextProps {
    config: {
        url?: string;
        text: string;
        color: string;
        fontSize: number;
    }
}

export const CustomerText = (props: CustomerTextProps) => {
    const onClick = () => {
        const { config: { url } } = props;
        if(url) {
            Taro.navigateTo({url});
        }
    }
    const { text, color, fontSize } = props.config;
    const style: CSSProperties = {
      fontSize,
      color
    };
  return (
    <div onClick={onClick}>
      <Text style={style}>{text}</Text>
    </div>
  );
}
