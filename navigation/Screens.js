import React from 'react';
import { Easing, Animated } from 'react-native'
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import OnboardingScreen from '../screens/Onboarding'
import HomeViewScreen from '../screens/DeckListView'
import AddDeckViewScreen from '../screens/AddDeckView'
import DeckViewScreen from '../screens/DeckView'
import AddCardViewScreen from '../screens/AddCardView'
// import QuestionCardScreen from '../components/QuestionCard'
import QuizViewScreen from '../screens/QuizView'
import Menu from './Menu';
import { Header, Drawer } from '../components/';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeViewScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header  title="Home" navigation={navigation} />,
    })
  },
  DeckView: {
    screen: DeckViewScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Deck" navigation={navigation} />,
    })
  },
  AddDeck: {
    screen: AddDeckViewScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Add Deck" navigation={navigation} />,
    })
  },
  AddCard: {
    screen: AddCardViewScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Add Card" navigation={navigation} />,
    })
  },
  // QuestionCard: {
  //   screen: QuestionCardScreen,
  //   navigationOptions: ({navigation}) => ({
  //     header: <Header back title="Questhion" navigation={navigation} />,
  //   })
  // },
  QuizView: {
    screen: QuizViewScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Quiz" navigation={navigation} />,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AppStack = createDrawerNavigator({
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Home: {
      screen: HomeStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        ),
      }),
    },
    AddDeck: {
      screen: AddDeckViewScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="AddDeck" title="Add Deck" />
        ),
      }),
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
