import React from 'react';
import {MainView} from './src/views';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainView />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
