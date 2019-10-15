import React, { Component } from "react"
import { connect } from "react-redux"
import {Alert, View, Text, ScrollView, StyleSheet} from "react-native"
import {Button, Card, Headline, ProgressBar, Paragraph} from 'react-native-paper'
import { clearQuizTimeNotification, setQuizTimeNotification } from "../utils/api"
import { QuestionCard } from '../components'
import materialTheme from '../constants/Theme';

class QuizView extends Component {
  state = {
    totalScore: 0,
    questionId: 0,
    showQuestion: true
  }

  submitCorrect = async () => {
    this.setState(lastState => {
      return { totalScore: lastState.totalScore + 1 }
  })
    this.setState(lastState => {
      return {
        questionId: lastState.questionId + 1,
        showQuestion: true
    }
  })
    await clearQuizTimeNotification()
    await setQuizTimeNotification()
  }

  submitIncorrect = async () => {
    this.setState(lastState => {
      return {
        questionId: lastState.questionId + 1,
        showQuestion: true
        }
      })

    await clearQuizTimeNotification()
    await setQuizTimeNotification()
  }

  backToHome = () => {
    const { navigate } = this.props.navigation;
    navigate("Home", { deckTitle: this.props.deck.title });
  }

  restartQuiz = () => {
    this.setState({
      totalScore: 0,
      questionId: 0
    })
  }

  flipTheCard = () => {
    this.setState(lastState => {
      return { showQuestion: !lastState.showQuestion }
    })
  }

  render() {
    const { deck } = this.props
    if (!deck) {
      return (
        <View> <Text>Loading ...</Text> </View>
      ) 
    }
    if (deck.questions.length === 0) {
       { Alert.alert("No question in the Deck")}
    }
    if (this.state.questionId === deck.questions.length) {
      return (
        <ScrollView>
          <Card style={styles.card} elevation={4} >
            <Headline >Quiz Results</Headline>
            <Text style={{color: materialTheme.COLORS.PRIMARY,fontSize: 12,}}>
              Score: {this.state.totalScore} out of {deck.questions.length}
            </Text>
            <Card.Actions style={{ justifyContent:'flex-end'}}>
              <Button 
                mode="contained" 
                style={{ backgroundColor:materialTheme.COLORS.PRIMARY}}
                onPress={() => this.restartQuiz()} > Restart </Button>
                <Button  style={{ backgroundColor:materialTheme.COLORS.PRIMARY, marginLeft:20 }} mode="contained" onPress={() => this.backToHome()} >Home</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      )
    }

      return (
        <ScrollView>
          <Card  style={styles.card} elevation={4}>
            <Card.Title title={`Deck: ${deck.title}`} />
            <Card.Content >
            <ProgressBar 
            progress={(this.state.questionId + 1)/deck.questions.length} 
            color={materialTheme.COLORS.PRIMARY} />
            <Paragraph style={{marginBottom:16}}>
              Question progress: {this.state.questionId + 1}/{deck.questions.length}
            </Paragraph>
            <QuestionCard
                flipTheCard={this.flipTheCard}
                showQuestion={this.state.showQuestion}
                card={deck.questions[this.state.questionId]}
            >
            </QuestionCard>
            <Card.Actions style={{ justifyContent:'space-around', marginTop:50}} elevation={2}>
              <Button
                mode="text"
                icon={{uri: 'https://react-1252743632.cos.ap-beijing.myqcloud.com/FlashCard/ic_login_incorrect.png'}}
                onPress={() => this.submitIncorrect()}
                color={materialTheme.COLORS.ERROR}
              >
              </Button>
              <Button
                mode="text"
                icon={{ uri: 'https://react-1252743632.cos.ap-beijing.myqcloud.com/FlashCard/ic_login_correct.png'}}
                onPress={() => this.submitCorrect()}
                color={materialTheme.COLORS.SUCCESS}
              >
              </Button>
            </Card.Actions>
          </Card.Content>
        </Card>
      </ScrollView>
    )
  }
}

const mapStateToProps = (decks, navProps) => {
  const { deckTitle } = navProps.navigation.state.params
  const deck = decks[deckTitle]
  return { deck }
}

export default connect(mapStateToProps)(QuizView)

const styles = StyleSheet.create({
  questionText:{
    fontSize:32,
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:16
  },
  card:{
    margin:16,
    padding:16,
    flex:1
  },
})