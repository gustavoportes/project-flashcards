import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, StyleSheet } from 'react-native';

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
    return {
      title: deck.title,
    }
  }

  addCard = () => {
    this.props.navigation.navigate('NewCard',{ deck: this.props.deck });
  }
  
  startQuiz = () => {
    this.props.navigation.navigate('Quiz',{ deck: this.props.deck });
  }

  render() {
    const { deck } = this.props;

    return (    
      <View style={styles.deck}>
        <View style={styles.content}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckAmount}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.groupButton} >
          <View style={styles.button}>
            <Button
              title="Add Card"
              onPress={this.addCard}
              color="#27b3e4"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Start Quiz"
              onPress={this.startQuiz}
              disabled={deck.questions.length===0}
              color="#008000"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold'
  },
  deckAmount: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffa234'
  },
  groupButton: {
    padding: 10,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  }
});

const mapStateToProps = (state, props) => {
  return { deck: state[props.navigation.state.params.deck.title] };
}

export default connect(mapStateToProps)(Deck);