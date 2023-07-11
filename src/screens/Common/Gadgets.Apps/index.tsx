import {Block, Header, Image, Text} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {Pressable} from 'react-native';
import Menu, {IAppsMenu} from './AppsMenu';

const ITEM_WIDTH = (width - 16 * 4) / 3;

const Apps: React.FC = () => {
  const _renderItem = (item: IAppsMenu) => {
    const {icon, label} = item;
    return (
      <Pressable key={item.id} onPress={() => {}}>
        <Block width={ITEM_WIDTH}>
          <Image source={icon} square={ITEM_WIDTH} />
          <Text center sm marginTop={12} type="medium">
            {label}
          </Text>
        </Block>
      </Pressable>
    );
  };

  return (
    <Block flex backgroundColor="background">
      <Header canGoBack title="Apps" />
      <Block row wrap paddingLeft={16} paddingTop={60} gap={16}>
        {Menu.map(_renderItem)}
      </Block>
    </Block>
  );
};

export default Apps;
