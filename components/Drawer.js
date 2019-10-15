import React from 'react';
import { Platform,StyleSheet, Dimensions } from 'react-native';
import { Block, Text, theme } from "galio-framework";

import Icon from './Icon';
import materialTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Home':
        return (
          <Icon
            size={16}
            name={Platform.OS === 'ios'? "ios-home": "md-home"}
            family="ionicon"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Add Deck':
        return (
          <Icon
            size={16}
            name={Platform.OS === 'ios'? "ios-albums": "md-albums"}
            family="ionicon"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      default:
        return null;
    }
  }
  render() {
    const { focused, title } = this.props;

    return (
      <Block flex row style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadow] : null]}>
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {this.renderIcon()}
        </Block>
        <Block flex={0.9}>
          <Text size={18} color={focused ? 'white' : 'black'}>{title}</Text>
        </Block>
      </Block>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
})