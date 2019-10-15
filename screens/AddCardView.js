import React, { Component } from "react"
import { StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Platform } from 'react-native'
import { Block, Button, Input, Text, theme } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { materialTheme } from '../constants/'
import { HeaderHeight } from "../constants/utils"
import { connect } from "react-redux"
import { addCardToDeck } from "../actions"
import { saveCardToDeck } from "../utils/api"

const { width } = Dimensions.get('window')

class AddCardView extends Component {
  state = {
    question: "",
    answer: ""
  }
  
  submitCardToDeck = async () => {
    const { navigate } = this.props.navigation
    const { deckTitle } = this.props.navigation.state.params
    const newCard = this.createCardToSave(this.state.question, this.state.answer)
    await saveCardToDeck(deckTitle, newCard)
    this.props.addCardToDeck(newCard, deckTitle)
    navigate("DeckView", { deckTitle })
  }

  createCardToSave(question, answer) {
    return { question, answer }
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#6C24AA', '#15002B']}
        style={[styles.addCard, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block middle style={{ paddingVertical: theme.SIZES.BASE * 2.625}}>
              <Text center color="white" size={14}>
                Create your own Quiz and Answer
              </Text>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  borderless
                  color="white"
                  placeholder="Question"
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  value={this.state.question}
                  onChangeText={question => this.setState({ question })}
                />
                <Input
                  borderless
                  color="white"
                  placeholder="Answer"
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  value={this.state.answer}
                  onChangeText={answer => this.setState({ answer })}
                />
              </Block>
              <Block flex top style={{ marginTop: 20 }}>
                <Button
                  shadowless
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  style={{ height: 48 }}
                  disabled={this.state.question === "" || this.state.answer === "" }
                  onPress={() => this.submitCardToDeck()}
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

export default connect(null, { addCardToDeck })(AddCardView)

const styles = StyleSheet.create({
  addCard: {        
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  input: {
    width: width * 0.9, 
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
})
