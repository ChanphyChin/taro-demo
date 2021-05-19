import { Text, View } from '@tarojs/components';
import { CSSProperties } from 'react';

interface CustomerTextProps {
    config: {
        url?: string;
        text: string;
        color: string;
        textAlign: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
        fontSize: number;
    };
    isEdit: Boolean;
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
  if(JSON.stringify(props.config) === '{}' && props.isEdit) {
    return(
      <View onClick={onClick} style={{ textAlign }}>
        {JSON.stringify(props.config) === '{}' && (
            <Text style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Text</Text>
        )}
      </View>
    );
  }
  if(JSON.stringify(props.config) === '{}' && !props.isEdit) {
    return null;
  }
  return (
    <View onClick={onClick} style={{ textAlign }}>
      {JSON.stringify(props.config) === '{}' && (
          <Text style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Text</Text>
      )}
      <Text style={style}>{text}</Text>
    </View>
  );
}
