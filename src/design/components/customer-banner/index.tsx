import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';

interface CustomerBannerProps {
    config: {
        linkInfo: {
            url: string;
            name: string;
        };
        imgInfo: {
            url: string;
            name: string; 
        }
    };
    isEdit: Boolean;
}

export const CustomerBanner = (props: CustomerBannerProps) => {
  const {config, isEdit} = props;
  if(JSON.stringify(config) === '{}' && isEdit) {
      return(
          <View>
              <Text style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Banner</Text>
          </View>
      );
  }
  if(JSON.stringify(config) === '{}' && !isEdit) {
      return null;;
  }
  return (
    <View onClick={() => !isEdit && Taro.navigateTo({ url: config.linkInfo.url })} style={{ textAlign: 'center' }}>
        <Image src={config.imgInfo.url} mode='scaleToFill'/>
    </View>
  );
}
