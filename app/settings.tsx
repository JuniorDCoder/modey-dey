import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as C from '@/constants/colors';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import BottomTabs from '@/components/ui/bottom-tabs';

export default function Settings() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Toast.show({ type: 'success', text1: 'Signed out', text2: 'You have been signed out.' });
      router.replace('/auth/login');
    } catch (e) {
      console.log('Logout error', e);
      Toast.show({ type: 'error', text1: 'Could not sign out', text2: 'Try again.' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Pressable style={styles.row} onPress={() => router.push('/profile' as any)}>
          <Text style={styles.rowLabel}>Profile</Text>
        </Pressable>
        <Pressable style={[styles.row, styles.logout]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Pressable style={styles.row} onPress={() => {}}>
          <Text style={styles.rowLabel}>Notifications</Text>
        </Pressable>
      </View>

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.BACKGROUND_LIGHT, padding: 20 },
  title: { fontSize: 26, fontWeight: '900', color: C.TEXT_PRIMARY },
  section: { marginTop: 20, backgroundColor: C.CARD_LIGHT, padding: 12, borderRadius: 14 },
  sectionTitle: { color: C.TEXT_SECONDARY, fontWeight: '800', marginBottom: 8 },
  row: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.BORDER },
  rowLabel: { color: C.TEXT_PRIMARY, fontWeight: '700' },
  logout: { borderBottomWidth: 0, marginTop: 8, backgroundColor: '#FFF3F3', borderRadius: 10, padding: 12 },
  logoutText: { color: '#B91C1C', fontWeight: '900' },
});
