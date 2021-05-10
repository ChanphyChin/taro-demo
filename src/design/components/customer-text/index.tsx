import { Text } from '@tarojs/components';
import { CSSProperties } from 'react';

interface CustomerTextProps {
    config: {
        url?: string;
        text: string;
        color: string;
        textAlign: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
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
    const { text, color, fontSize, textAlign } = props.config;
    const style: CSSProperties = {
      fontSize: `${fontSize}px`,
      color,
    };
  return (
    <div onClick={onClick} style={{ textAlign }}>
      <Text style={style}>{text}</Text>
    </div>
  );
}
