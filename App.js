import React from 'react'
import { createStore } from "redux"
import { Provider as StoreProvider } from 'react-redux'
import { Platform, StatusBar, Image } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { setQuizTimeNotification } from './utils/api'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import { Images, materialTheme } from './constants/'
import { Block, GalioProvider } from 'galio-framework'
import Screens from './navigation/Screens' // AppContainer
import reducer from "./reducers"

const store = createStore(reducer)
const assetImages = [
  Images.Avatar,
  Images.Onboarding,
]

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }
  async componentDidMount() {
    await setQuizTimeNotification()
  }
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <StoreProvider store={store}>
          <PaperProvider>
            <GalioProvider theme={materialTheme}>
              <Block flex>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <Screens />
              </Block>
            </GalioProvider>
          </PaperProvider>
        </StoreProvider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ])
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}
