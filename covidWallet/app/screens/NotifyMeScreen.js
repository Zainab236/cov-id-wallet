import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, BackHandler ,Alert,AsyncStorage } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { PRIMARY_COLOR } from '../theme/Colors';
import ImageBoxComponent from '../components/ImageBoxComponent';
import TextComponent from '../components/TextComponent';
import {useRoute} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const img = require('../assets/images/notifications.png');
const AuthContext = React.createContext();
const { signIn } = React.useContext(AuthContext);
function NotifyMeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  nextHandler = () => {
    navigation.navigate('MainScreen');
    signIn("userIn","userInPass");
  }
  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async data => {

  //       dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
  //     },
     
  //     signUp: async data => {
  //       // In a production app, we need to send user data to server and get a token
  //       // We will also need to handle errors if sign up failed
  //       // After getting token, we need to persist the token using `AsyncStorage`
  //       // In the example, we'll use a dummy token

  //       dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
  //     },
  //   }),
  //   []
  // );
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBoxComponent
          source={img}
        />
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.TextContainerHead}>Stay Notified</Text>
        <TextComponent onboarding={true} text="We use push notifications to deliver messages for important events,
          such as when you recieve a new vaccination certificate."/>

      </View>
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <PrimaryButton text="Enable Notifications" nextHandler={nextHandler} />
        <Text style={styles.TextContainerEnd}
          onPress={nextHandler} >Continue without alerts</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  TextContainerEnd: {
    alignItems: 'center', justifyContent: 'center', color: PRIMARY_COLOR, paddingTop: 15
  },
  TextContainerHead: {
    alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold',
    fontSize: 32, flexDirection: 'column',
  },
});

export default NotifyMeScreen;