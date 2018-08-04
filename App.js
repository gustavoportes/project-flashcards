import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import Deck from './components/Deck';
import DeckList from './components/DeckList';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import { setLocalNotification } from './utils/helpers';

const store = createStore(reducer);

const RootStack = createStackNavigator({
    DeckList: DeckList,
    Deck: Deck,
    Quiz: Quiz,
    NewDeck: NewDeck,
    NewCard: NewCard
  },
  {
    initialRouteName: 'DeckList',
  }
);

export default class App extends React.Component {
  
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store} >
          <RootStack />
      </Provider>
    );
  }
}