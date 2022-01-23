import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/rootReducer';

import Tabs from './navigation/tabs';
import { Location, Order, OrderDetail } from './screens';

const Stack = createStackNavigator();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const App = () => {

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          // backgroundColor="#595683"
          backgroundColor="transparent"
          translucent={true}
          barStyle="light-content"
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            presentation: 'card',
          }}
          initialRouteName={'MainLayout'}
        >
          <Stack.Screen
              name="MainLayout"
              component={Tabs}
            />
          <Stack.Screen
              name="Location"
              component={Location}
            />
          <Stack.Screen
              name="Order"
              component={Order}
            />
          <Stack.Screen
              name="OrderDetail"
              component={OrderDetail}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;