import { useState } from 'react';

import {
  KeyboardAvoidingView, TextInput, StyleSheet, View,
} from 'react-native';

import { getAuth } from 'firebase/auth';

import {
  getFirestore, collection, addDoc,
} from 'firebase/firestore';

import CircleButton from '../components/CircleButton';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');

  async function handlePress() {
    const { currentUser } = getAuth();
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, `users/${currentUser.uid}/memos`), {
        bodyText,
        updatedAt: new Date(),
      });
      console.log('Document written with ID: %s', docRef.id);
      // navigation.goBack();
      navigation.reset({
        index: 0,
        routes: [{ name: 'MemoList' }],
      });
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={80}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.inputText}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        // eslint-disable-next-line
        onPress={handlePress}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    // backgroundColor: 'blue',
  },
});
