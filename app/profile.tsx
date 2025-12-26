import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as C from '@/constants/colors';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '@/types/models';
import BottomTabs from '@/components/ui/bottom-tabs';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
          setUser(snap.data() as User);
        } else {
          // fallback to auth profile
          setUser({
            id: uid,
            name: auth.currentUser?.displayName || 'User',
            email: auth.currentUser?.email || '',
            phone: (auth.currentUser?.phoneNumber as string) || '',
            countryCode: '+000',
            photoURL: auth.currentUser?.photoURL || null,
            authProvider: 'password',
            createdAt: new Date() as any,
            updatedAt: new Date() as any,
          });
        }
      } catch (e) {
        console.log('Profile load', e);
      }
    })();
  }, []);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={ user.photoURL ? { uri: user.photoURL } : undefined } style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Phone</Text>
        <Text style={styles.cardValue}>{`${user.countryCode} ${user.phone}`}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Account created</Text>
        <Text style={styles.cardValue}>{user.createdAt ? new Date((user.createdAt as any).seconds ? (user.createdAt as any).seconds * 1000 : (user.createdAt as any)).toLocaleDateString() : '-'}</Text>
      </View>

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.BACKGROUND_LIGHT, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#EEE' },
  name: { fontSize: 20, fontWeight: '900', color: C.TEXT_PRIMARY },
  email: { color: C.TEXT_SECONDARY, marginTop: 4 },
  card: { backgroundColor: C.CARD_LIGHT, padding: 12, marginTop: 12, borderRadius: 12 },
  cardLabel: { color: C.TEXT_SECONDARY, fontWeight: '800' },
  cardValue: { color: C.TEXT_PRIMARY, marginTop: 6, fontWeight: '700' },
});
