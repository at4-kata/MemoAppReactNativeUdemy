import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import {
  getFirestore, collection, getDocs, query, orderBy,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

function headerRightButtonControl() {
  return (
    <LogOutButton />
  );
}

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      // headerRight: () => <LogOutButton />,
      headerRight: headerRightButtonControl,
    });
  }, []);

  useEffect(() => {
    // (async () => {
    //   const db = getFirestore();
    //   const { currentUser } = getAuth();
    //   const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/memos`));
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, doc.data());
    //   });
    // })();
    const db = getFirestore();
    const { currentUser } = getAuth();
    if (currentUser) {
      const getMemoData = async () => {
        const q = query(collection(db, `users/${currentUser.uid}/memos`), orderBy('updatedAt', 'desc'));
        // const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/memos`));
        const userMemos = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          const data = doc.data();
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          });
        });
        setMemos(userMemos);
      };
      getMemoData()
        .catch((error) => {
          console.log(error);
          Alert.alert('Failed to load data');
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});
