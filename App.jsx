// import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from './node_modules/@react-navigation/native';
// import { createNativeStackNavigator } from './node_modules/@react-navigation/native-stack';
import {
  createStackNavigator, CardStyleInterpolators,
} from './node_modules/@react-navigation/stack';

import { initializeApp } from './node_modules/firebase/app';
// import { getAuth } from './node_modules/firebase/auth';

import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SingUpScreen';

import { firebaseConfig } from './env';

// require('firebase/firestore');

// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// getAuth(app);
// const auth = getAuth(app);

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerStyle: { backgroundColor: '#467fd3' },
          headerTitleStyle: { color: '#ffffff' },
          headerTitle: 'Memo App',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          // animation: 'slide_from_right',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            // animation: 'fade_from_bottom',
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            // animation: 'fade_from_bottom',
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <MemoDetailScreen />
    // <MemoListScreen />
    // <MemoEditScreen />
    // <MemoCreateScreen />
    // <LogInScreen />
    // <SignUpScreen />
  );
}
