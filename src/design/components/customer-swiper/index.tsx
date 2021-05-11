import { Swiper, SwiperItem, Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import swiperImg from '../../../static/images/1.jpg';

interface CustomerSwiperProps {
  config: {
    items: {
      url: string;
      linkInfo: {
        name: string;
        url: string;
      };
    }[];
  };
}
const defaultList = [
  {
    url: '/',
    pic: swiperImg
  }
]

export const CustomerSwiper = (props: CustomerSwiperProps) => {
  const renderSwiperItem = () => {
    const { config: { items = [] } } = props;
    return items.map(item => {
      const { url, linkInfo } = item;
      return(
        <SwiperItem key={url}>
          <View onClick={() => Taro.navigateTo({url: linkInfo.url})}>
            <Image src={url} mode='scaleToFill'/>
          </View>
        </SwiperItem>
      );
    });
  }
  console.log(props);
  return (
    <div>
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        {renderSwiperItem()}
      </Swiper>
    </div>
  );
}
