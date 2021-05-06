import { ScrollView, View } from '@tarojs/components';
import chunk from 'lodash/chunk';
import map from 'lodash/map';

interface CustomerNavProps {
  config: {
    list: {
      url: string;
      title: string;
    }[];
    /**
     * 每行显示多少个标题
     */
    rowCount: number; 
  }
}

export const CustomerNav = (props: CustomerNavProps) => {
  const renderNav = () => {
    const { config: { list, rowCount } } = props;
    return(
      <View>
        {map(chunk(list, rowCount), chunkList => {
          return (
            <View style={{ display: 'flex', width: `${chunkList.length * 100}px`}} key={JSON.stringify(chunkList)}>
              {chunkList.map(item => {
                return(
                  <View key={item.title} style={{ flex: 1, textAlign: 'center' }}>
                      <View style={{ flex: 1 }}>{item.title}</View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
  const { config: { list, rowCount } } = props;
  return (
    <ScrollView
      className='scrollview'
      scrollX
      scrollWithAnimation
      style={{ height: `${Math.ceil(list.length / rowCount)*35}px`, }}
    >
      {renderNav()}
    </ScrollView>
  );
}
