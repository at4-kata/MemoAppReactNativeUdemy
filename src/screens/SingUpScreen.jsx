// next step https://reffect.co.jp/react/react-native-firebase/
// next step https://firebase.google.com/docs/auth/web/start?hl=ja#web-modular-api_1
import { useState } from 'react';

import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
} from 'react-native';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Button from '../components/Button';

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlePress() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in (using curly bracket for eslint error Use object destructuring)
        const { user } = userCredential;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Alert.alert(errorCode);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          label="Submit"
          // eslint-disable-next-line
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LogIn' }],
              });
            }}
          >
            <Text style={styles.footerLink}>Log In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    lineHeight: 32,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 48,
    fontSize: 16,
    // color: '#dddddd',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#dddddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
});
