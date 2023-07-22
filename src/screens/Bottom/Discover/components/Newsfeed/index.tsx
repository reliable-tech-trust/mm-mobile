import {ICONS} from '@assets';
import {Block, Image, Text} from '@components';
import {INEWSFEED} from '@screens/Bottom/Discover/types';
import {getSize, width} from '@utils/responsive';
import React from 'react';
import {FlatList, ImageBackground, ListRenderItem, Pressable, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DATA} from './data';

const FULL_WIDTH = width - getSize.s(16 * 2);
const HALF_WIDTH = (width - getSize.s(16 * 2 + 11)) / 2;

const Newsfeed: React.FC = () => {
  const _renderItem: ListRenderItem<INEWSFEED> = ({item, index}) => {
    const {image, title, loved, author} = item;
    const position = index + 1;
    const specific = position % 9 === 0 ? 9 : position % 9;
    const specificStyle: {[k: number]: ViewStyle} = {
      1: {width: FULL_WIDTH, height: FULL_WIDTH * 0.57},
      2: {width: HALF_WIDTH, height: HALF_WIDTH * 1.16},
      3: {width: HALF_WIDTH, height: HALF_WIDTH * 1.45},
      4: {width: HALF_WIDTH, height: HALF_WIDTH * 1.45},
      5: {width: HALF_WIDTH, height: HALF_WIDTH * 1.16},
      6: {width: FULL_WIDTH, height: FULL_WIDTH},
      7: {width: HALF_WIDTH, height: HALF_WIDTH},
      8: {width: HALF_WIDTH, height: FULL_WIDTH},
      9: {width: HALF_WIDTH, height: HALF_WIDTH},
    };
    const isFourthItem = (position - 4) % 9 === 0;
    const isNinethItem = position % 9 === 0;
    let marginTop = 0;
    if (isFourthItem) {
      marginTop = -HALF_WIDTH * 0.285;
    } else if (isNinethItem) {
      marginTop = -HALF_WIDTH - 4;
    }

    return (
      <Pressable>
        <Block radius={24} overflow="hidden" marginTop={marginTop} marginBottom={12}>
          <ImageBackground source={image} style={specificStyle[specific]}>
            <LinearGradient
              style={{...StyleSheet.absoluteFillObject}}
              colors={['#00000060', '#00000020', '#00000000', '#00000020', '#00000060']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <Block flex paddingHorizontal={16} paddingTop={12} paddingBottom={8} space="between">
                <Text type="bold" color="#FAFAFA" numberOfLines={3}>
                  {title}
                </Text>
                <Block row alignCenter space="between">
                  <Text flex sm color="#FAFAFA" numberOfLines={1}>
                    {author}
                  </Text>
                  <Pressable>
                    <Block alignCenter justifyCenter round={36} backgroundColor="#00000070">
                      <Image source={loved ? ICONS.loved : ICONS.unloved} square={20} resizeMode="contain" />
                    </Block>
                  </Pressable>
                </Block>
              </Block>
            </LinearGradient>
          </ImageBackground>
        </Block>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item: INEWSFEED) => String(item.id)}
      renderItem={_renderItem}
      contentContainerStyle={styles.flatListcontentContaine}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Newsfeed;

const styles = StyleSheet.create({
  flatListcontentContaine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: getSize.m(16),
    paddingBottom: getSize.m(32),
  },
});
