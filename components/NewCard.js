import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView } from 'react-native'
import { addCardToDeck } from "../utils/storage";
import { connect } from 'react-redux';
import { addCard } from "../actions";

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    errors: {}
  };

  static navigationOptions = {
    title: 'Add Card'
  };

  handleChangeTextQuestion = (text) => {
    this.setState({
      question: text
    });
  }

  handleChangeTextAnswer = (text) => {
    this.setState({
      answer: text
    });
  }

  validate = (question, answer) => {
    const errors = {};
    if( !question || !question.trim>0 ) {
      errors.question = "Question is required!!!";
    }
    if( !answer || !answer.trim>0 ) {
      errors.answer = "Answer is required!!!";
    }
    return errors;
  }

  handleSubmit = () => {
    const { deck } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    const errors = this.validate(question,answer);
    this.setState({errors});
    if ( Object.keys(errors).length === 0) {
      const questions = [ { question, answer }];
      addCardToDeck(deck.title,questions);
      this.props.dispatch(addCard({
          title: deck.title, 
          questions: questions
        })
      );
      this.props.navigation.goBack();
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <KeyboardAvoidingView style={styles.newCard} behavior="padding">
          <View style={styles.content}>
            <Text style={styles.label}>Question</Text>
            { errors.question && <Text style={styles.error}>{errors.question}</Text> }
            <TextInput
              style={styles.input}
              onChangeText={this.handleChangeTextQuestion}
              value={this.state.text}
            />
            <Text style={styles.label}>Answer</Text>
            { errors.answer && <Text style={styles.error}>{errors.answer}</Text> }
            <TextInput
              style={styles.input}
              onChangeText={this.handleChangeTextAnswer}
              value={this.state.text}
            />
          </View>
          <View style={[styles.groupButton, styles.button]}>
            <Button
              title="Submit"
              onPress={this.handleSubmit}
              color="#27b3e4"
            />
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  newCard: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  content: {
    alignItems: 'center',
    paddingTop: 64,
    marginBottom: 60
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 15,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d6d7da',
  },
  groupButton: {
    padding: 10,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  error: {
    color: '#ff0000'
  }
});

export default connect()(NewCard);