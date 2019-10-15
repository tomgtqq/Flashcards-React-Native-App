import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');

class Deck extends React.Component {
  render() {
    const { Deck, horizontal, full, style, subTitleColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.Deck, styles.shadow, style]}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: Deck.image }} style={imageStyles} />
          </Block>
          <Block flex space="between" style={styles.DeckDescription}>
            <Text size={14} style={styles.DeckTitle}>{Deck.title}</Text>
            <Text size={12} muted={!subTitleColor} color={subTitleColor}>{Deck.subTitle}</Text>
          </Block>
      </Block>
    );
  }
}

export default withNavigation(Deck);

const styles = StyleSheet.create({
  Deck: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  DeckTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  DeckDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});