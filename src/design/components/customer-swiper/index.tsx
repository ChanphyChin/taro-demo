import { Swiper, SwiperItem, Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

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
  return (
    <View>
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
    </View>
  );
}
