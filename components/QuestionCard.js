import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Button } from 'react-native-paper'
import materialTheme from '../constants/Theme';

class QuestionCard extends Component {
  showQuestion(flipTheCard) {
    const { card } = this.props
    return (
      <View>
        <Text style={styles.questionText}>
          {card.question}
        </Text>
        <Button mode="Text" onPress={flipTheCard} >
          <Text style={styles.flipBtn}>Show Answer</Text>
        </Button>
      </View>
    )
  }
  showAnswer(flipTheCard) {
    const { card } = this.props
    return (
      <View>
        <Text style={styles.questionText}>
          {card.answer}
        </Text>
        <Button mode="Text" onPress={flipTheCard} >
          <Text style={styles.flipBtn}>Show Question</Text>
        </Button>
      </View>
    )
  }
  render() {
    const { showQuestion, flipTheCard } = this.props
    return showQuestion ? this.showQuestion(flipTheCard) : this.showAnswer(flipTheCard)
  }
}
export default QuestionCard

const styles = StyleSheet.create({
  flipBtn:{
    color:materialTheme.COLORS.PRIMARY,
    margin:16
  },
  questionText:{
    fontSize:32,
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:16
  }
})