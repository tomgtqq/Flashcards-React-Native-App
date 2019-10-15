import React, { Component } from "react"
import { connect } from "react-redux"
import { View, ScrollView, Text } from 'react-native'
import { getDecks } from "../utils/api"
import { receiveDecks } from "../actions"
import { Card, TouchableRipple } from 'react-native-paper'
import materialTheme from '../constants/Theme'

class DeckListView extends Component {
  state = {
    decksRetrieved: false
  }
  async componentDidMount() {
    let decks = await getDecks()
    this.props.receiveDecks(decks)
    this.setState({
      decksRetrieved: true
    })
  }
  navigateToDeckView = (deckTitle) => {
    const { navigate } = this.props.navigation
    navigate("DeckView", { deckTitle })
  }
  render() {
    if (!this.state.decksRetrieved) {
      return (
        <View><Text>Loading...</Text></View>
      )
    }
    const { decks } = this.props
    return (
      <ScrollView>
        {Object.keys(decks).map(deckTitle => {
          const deck = decks[deckTitle]
          return (
            <Card key={deckTitle} 
              style={{ margin:18, backgroundColor:"white", flex:1, justifyContent:'space-around'}} 
              elevation={2}>
              <TouchableRipple rippleColor= {materialTheme.COLORS.DEFAULT} onPress={() => this.navigateToDeckView(deckTitle)}>
                <Card.Title style={{margin:18}} title={deck.title} subtitle={`${deck.questions.length} Cards`} >
                </Card.Title>
              </TouchableRipple>
            </Card>
           )
        })}
      </ScrollView>
    )
  }
}
const mapStateToProps = decks => {
  return { decks }
}

export default connect( mapStateToProps, {receiveDecks} )(DeckListView)
