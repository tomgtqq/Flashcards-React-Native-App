import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Block,theme } from 'galio-framework'
import { StyleSheet, Dimensions, ScrollView,  View, Text } from 'react-native'
import { Icon, Deck } from '../components/'
import { Images } from '../constants'

const { width } = Dimensions.get('screen')

class DeckView extends Component {
  renderTabs = () => {
    const { navigate } = this.props.navigation
    const { deckTitle } = this.props.navigation.state.params
    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigate("AddCard", { deckTitle })}>
          <Block row middle>
            <Icon name="layers" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Add Card</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigate("QuizView", { deckTitle })}>
          <Block row middle>
            <Icon size={16} name="bar-chart-2" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Start Quiz</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderDeck = (deck) => {
    return(
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: width - theme.SIZES.BASE * 2,paddingVertical: theme.SIZES.BASE * 2}}>
        <Block flex>
          <Deck Deck={{...deck,
                          image:Images.CardImages["Code"],
                          subTitle:`${deck.questions.length} cards`}
                      } 
                full 
                />  
        </Block>
      </ScrollView>
    )
  }
  
  render() {
    const { deck } = this.props
    if (!deck) {
      return (
        <View><Text>Loading ...</Text></View>
      )
    }
    return (
      <Block flex center style={styles.home}>
        {this.renderTabs()}
        {this.renderDeck(deck)}
      </Block>
    )
  }
}

const mapStateToProps = (decks, navProps) => {
  const { deckTitle } = navProps.navigation.state.params
  const deck = decks[deckTitle]
  return { deck }
}

export default connect(mapStateToProps)(DeckView)


const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom:24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
})
