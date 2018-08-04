import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { saveDeckTitle } from "../utils/storage";
import { connect } from 'react-redux';
import { addDeck } from "../actions";

class NewDeck extends Component {

  static navigationOptions = {
    title: 'New Deck'
  };

  state = { 
    title: '',
    error: ''
  };

  handleChangeText = (text) => {
    this.setState({
      title: text
    });
  }

  handleSubmit = () => {
    if( !this.state.title || !this.state.title.trim>0 ) {
      this.setState({ error: "Deck is required!!!" });
    } else {
      saveDeckTitle(this.state.title);
      this.props.dispatch(
        addDeck({
          title: this.state.title, 
          questions: []
        })
      );
      let newDeck = { 
        title: this.state.title,
        questions: []
      };
      this.props.navigation.navigate('Deck', { deck: newDeck });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.newDeck} behavior="padding">
        <View style={styles.content}>
          <Text style={styles.label}>What is the title of your new deck?</Text>
          { ( error.length > 0 ) && <Text style={styles.error}>{error}</Text> }
          <TextInput
            style={styles.input}
            onChangeText={this.handleChangeText}
            value={this.state.text}
          />
        </View>
        <View style={[styles.groupButton, styles.button]}>
          <Button
            title="Create Deck"
            onPress={this.handleSubmit}
            color="#27b3e4"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  newDeck: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    alignItems: 'center',
    paddingTop: 64,
    marginBottom: 60,
  },
  label: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
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
    color: '#ff0000',
  }
});

export default connect()(NewDeck);