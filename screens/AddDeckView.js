import React, { Component } from "react"
import { connect } from "react-redux"
import { StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { Block, Button, Input, Text, theme } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { materialTheme } from '../constants/'
import { HeaderHeight } from "../constants/utils"
import { addNewDeck } from "../actions"
import { saveNewDeck } from "../utils/api"

const { width } = Dimensions.get('window')

class AddDeckView extends Component {
  state = {
    deckTitle: ""
  }
  createDeckToSave(deckTitle) {
    return {
      [deckTitle]: {
        title: deckTitle,
        questions: []
      }
    }
  }
  submitDeck = async () => {
    const deckTitle = this.state.deckTitle
    const { navigate } = this.props.navigation
    const Deck = this.createDeckToSave(deckTitle)
    await saveNewDeck(Deck)
    this.props.addNewDeck(Deck)
    this.setState({ deckTitle: "" })
    navigate("DeckView", { deckTitle: deckTitle })
  }
  render() {
    return (
      <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={['#6C24AA', '#15002B']}
      style={[styles.addDeck, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>
      <Block flex middle>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Block middle style={{ paddingVertical: theme.SIZES.BASE * 2.625}}>
            <Text center color="white" size={14}>
              Create your own Deck
            </Text>
          </Block>
          <Block flex>
            <Block center>
              <Input
                borderless
                color="white"
                placeholder="Deck name"
                bgColor='transparent'
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                right
                icon={Platform.OS === "ios"? "ios-albums": "md-albums"}
                family="ionicon"
                iconSize={14}
                iconColor={theme.COLORS.THEME}
                value={this.state.deckTitle}
                onChangeText={deckTitle => this.setState({ deckTitle })}
              />
            </Block>
            <Block flex top style={{ marginTop: 20 }}>
              <Button
                shadowless
                color={materialTheme.COLORS.BUTTON_COLOR}
                style={{ height: 48 }}
                disabled={this.state.deckTitle === "" }
                onPress={() => this.submitDeck()}
              >
                Submit
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </LinearGradient>
    )
  }
}

export default connect(null, { addNewDeck })(AddDeckView)

const styles = StyleSheet.create({
  addDeck: {        
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  input: {
    width: width * 0.9, 
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
})
