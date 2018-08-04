import React, { Component } from 'react';
import { TouchableOpacity, Button, View, Text, StyleSheet } from 'react-native';
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {

  state = {
    currentyQuestion: 0,
    showAnswer: false,
    score: 0,
    finalScore: false
  };

  static navigationOptions = {
    title: 'Quiz',
  };

  toogleAnswer = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  }

  submitCorrect = () => {
    this.setState((prevState) => ({ 
      score: prevState.score + 1 
    }));
    this.nextQuestion();
  }

  submitIncorrect = () => {
    this.nextQuestion();
  }

  nextQuestion = () => {
    const deck = this.props.navigation.getParam('deck');
    if( this.state.currentyQuestion === deck.questions.length - 1) {
      this.setState({ 
        finalScore: true 
      });
    } else {
      this.setState((prevState) => ({ 
        currentyQuestion: prevState.currentyQuestion + 1,
        showAnswer: false
      }));
    }
  }

  calculateFinalScore = () => {
    const deck = this.props.navigation.getParam('deck');
    let perc = (this.state.score/deck.questions.length)*100;
    clearLocalNotification().then(setLocalNotification);
    return perc.toFixed(2);
  }

  restartQuiz = () => {
    this.setState( {
      currentyQuestion: 0,
      showAnswer: false,
      score: 0,
      finalScore: false
    });
  }

  backToDeck = () => {
    this.props.navigation.goBack();    
  }

  render() {
    const { currentyQuestion, showAnswer, finalScore, score } = this.state;
    const deck = this.props.navigation.getParam('deck');
    const question = deck.questions[currentyQuestion].question;
    const answer = deck.questions[currentyQuestion].answer;
    return (
      <View style={styles.quiz}>
        { !finalScore && <Text style={styles.pointer}>{currentyQuestion+1}/{deck.questions.length}</Text> }
        { !finalScore ? (
          <View style={styles.question}>
            <Text style={styles.title}>
              {showAnswer ? answer : question}
            </Text>
            <TouchableOpacity onPress={this.toogleAnswer}>
              <Text style={styles.toggleAnswer}>{showAnswer ? 'Show Question' : 'Show Answer'}</Text>
            </TouchableOpacity>
            <View style={styles.groupButton}>
              <View style={styles.button}>
                <Button
                  disabled={!showAnswer}
                  onPress={this.submitCorrect}
                  title="Correct"
                  color="#008000"
                />
              </View>
              <View style={styles.button}>
                <Button
                  disabled={!showAnswer}
                  onPress={this.submitIncorrect}
                  title="Incorrect"
                  color="#ff0000"
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.question}>
            <Text style={styles.finalScore}>
              Final Score: {this.calculateFinalScore()}%
            </Text>
            <View style={styles.groupButton}>
              <View style={styles.button}>
                <Button
                  disabled={!showAnswer}
                  onPress={this.restartQuiz}
                  title="Restart Quiz"
                  color="#008000"
                />
              </View>
              <View style={styles.button}>
                <Button
                  disabled={!showAnswer}
                  onPress={this.backToDeck}
                  title="Back to Deck"
                  color="#27b3e4"
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  pointer: {
    padding: 10
  },
  question: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  toggleAnswer: {
    padding: 10,
    fontSize: 20,
    color: '#8b0000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50
  },
  groupButton: {
    padding: 10,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  finalScore:{
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 30
  }
});

export default Quiz;