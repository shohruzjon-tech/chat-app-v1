import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { store, RootState } from './src/store';
import AuthScreen from './src/screens/AuthScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import websocketService from './src/services/websocket';
import notificationService from './src/services/notifications';

const Stack = createStackNavigator();

function AppNavigator() {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Initialize services when authenticated
    if (isAuthenticated && token) {
      websocketService.connect(token);
      notificationService.initialize();
    }

    return () => {
      if (isAuthenticated) {
        websocketService.disconnect();
      }
    };
  }, [isAuthenticated, token]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppNavigator />
    </Provider>
  );
}

