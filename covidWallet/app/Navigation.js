import * as React from 'react';
import { StyleSheet,AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './components/TabNavigator';
import SplashScreen from 'react-native-splash-screen';
import PassCodeContainer from './containers/PassCodeContainer';
import WelcomeScreen from './screens/WelcomeScreen';
import SecureIdContainer from './containers/SecureIdContainer';
import SecurityScreen from './screens/SecurityScreen';
import NotifyMeScreen from './screens/NotifyMeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from './screens/SettingsScreen';
import QRScreen from './screens/QRScreen';
import { BLACK_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from './theme/Colors';

const Stack = createStackNavigator();
const AuthContext = React.createContext();
function NavigationComponent() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        // case 'SIGN_OUT':
        //   return {
        //     ...prevState,
        //     isSignout: true,
        //     userToken: null,
        //   };
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );


  React.useEffect(() => { 
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
    SplashScreen.hide();
  }, [])
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
                
          <Stack.Navigator initialRouteName="WelcomeScreen">
        {state.isLoading ? 
        (
          <Stack.Screen options={{ headerShown: false }} name="WelcomeScreen" component={WelcomeScreen} />
        
        ): state.userToken == null ?
        (
          <Stack.Screen options={{ headerShown: false }} name="PassCodeContainer" component={PassCodeContainer} />
          // <Stack.Screen options={{ headerShown: false }} name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SecurityScreen" component={SecurityScreen}/>
          <Stack.Screen options={{ headerShown: false }} name="SecureidContainer" component={SecureIdContainer} />
          <Stack.Screen options={{ headerShown: false }} name="NotifyMeScreen" component={NotifyMeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen options={{ headerShown: false }} name="QRScreen" component={QRScreen} />
        ):
        (
        <Stack.Screen name="MainScreen"
          options={({ navigation }) => ({
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            }, title: false, headerRight: () => (
              <MaterialCommunityIcons onPress={() => { navigation.navigate('QRScreen') }} style={styles.headerRightIcon} size={30} name="qrcode" padding={30} />
            ), headerLeft: () => (
              <MaterialCommunityIcons onPress={() => { navigation.navigate('SettingsScreen') }} style={styles.headerRightIcon} size={30} name="settings" padding={30} />
            )
          })}
          component={TabNavigator} />   
         ) } 
        </Stack.Navigator>   
       
        </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerRightIcon: {
    padding: 10,
    color: BLACK_COLOR
  }
});

export default NavigationComponent;
