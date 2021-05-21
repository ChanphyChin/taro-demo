import { Swiper, SwiperItem, Image, View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';

import './index.scss';

interface CustomerSwiperProps {
  config: {
    items: {
      imgInfo: {url: string; name:string;};
      linkInfo: {
        name: string;
        url: string;
      };
    }[];
  };
  isEdit: Boolean;
}

export const CustomerSwiper = (props: CustomerSwiperProps) => {
  const renderSwiperItem = () => {
    const { config: { items = [] } } = props;
    return items.map(item => {
      const { imgInfo, linkInfo } = item;
      return(
        <SwiperItem key={imgInfo?.url}>
          <View
            onClick={() => {
              !props.isEdit && Taro.navigateTo({url: linkInfo?.url});
            }}
            style={{ textAlign: 'center', display: 'flex', justifyItems: 'center', alignItems: 'center' }}
          >
            <Image style={{ flex: 1 }} src={imgInfo?.url} mode='aspectFit'/>
          </View>
        </SwiperItem>
      );
    });
  }
  if(!props.config.items.length && props.isEdit) {
    return(
      <View>
        <Text style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Swiper</Text>
      </View>
    );
  }
  if(!props.config.items.length && !props.isEdit) {
    return null;
  }
  return (
    <View>
      {!props.config.items.length && (
          <Text style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Swiper</Text>
      )}
      <Swiper
        className='customer-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        {renderSwiperItem()}
      </Swiper>
    </View>
  );
}
