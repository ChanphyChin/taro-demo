import { Swiper, SwiperItem, Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import swiperImg from '../../../static/images/1.jpg';

interface CustomerSwiperProps {
  config: {
    list: {
      url: string;
      pic: string;
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
    // const { list } = props;
    return defaultList.map(item => {
      const { url, pic } = item;
      return(
        <SwiperItem key={pic}>
          <View onClick={() => Taro.navigateTo({url})}>
            <Image src={pic} mode='scaleToFill'/>
          </View>
        </SwiperItem>
      );
    });
  }
  // if(!props.list.length) {
  //   return null;
  // }
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
