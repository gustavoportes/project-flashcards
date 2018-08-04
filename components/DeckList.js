import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDecks } from "../utils/storage";
import { loadDecks } from "../actions";
import { Entypo } from '@expo/vector-icons';

const DeckItem = ( props ) => {
  return (
    <View style={styles.deckItem} key={props.item.title}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Deck', { deck: props.item })}>
        <Text style={styles.deckItemTitle}>{props.item.title}</Text>
        <Text style={styles.deckItemAmount}>{props.item.questions.length} cards</Text>
      </TouchableOpacity>
    </View>
  )
}

class DeckList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Decks',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
          <Entypo name='plus' size={30} color={'#27b3e4'} />
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    getDecks()
      .then(decks => this.props.dispatch(loadDecks(decks)));
  }

  renderItem = ( item ) => {
    return <DeckItem 
            item={this.props.decks[item.item]}
            navigation={this.props.navigation}
          />
  }

  render() {
    const decks = this.props.decks;
    return (
      <View style={styles.deckList}>
        <FlatList
          data={Object.keys(decks)}
          renderItem={this.renderItem}
          keyExtractor={item => item }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  deckItem: {
    paddingVertical: 30,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
  },
  deckItemTitle: {
    textAlign: 'center',
    fontSize: 32,
  },
  deckItemAmount: {
    textAlign: 'center',
    color: '#ffa234',
  },
});

const mapStateToProps = ( decks ) => {
  return { 
    decks 
  };
}

export default connect(mapStateToProps)(DeckList);