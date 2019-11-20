import React, { Component } from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store'
import Routes from './Routes';

import OneSignal from 'react-native-onesignal'; // Import package from node modules

export class App extends Component {

  constructor(properties) {
    super(properties);
    OneSignal.init("e60ff514-98e1-473c-bcf9-9104ea271768");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </ReduxProvider>
    )
  }
}

export default App
