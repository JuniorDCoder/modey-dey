import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BottomTabs from '@/components/ui/bottom-tabs';
import * as C from '@/constants/colors';

const sample = [
  { id: '1', title: 'Payment received', body: 'You received XAF 5,000 from John.' },
  { id: '2', title: 'Upcoming due', body: 'Debt to Mary is due in 2 days.' },
];

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Recent alerts and reminders</Text>

      <FlatList
        data={sample}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemBody}>{item.body}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 140 }}
      />

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.BACKGROUND_LIGHT, padding: 20 },
  title: { fontSize: 26, fontWeight: '900', color: C.TEXT_PRIMARY },
  subtitle: { color: C.TEXT_SECONDARY, marginTop: 6, marginBottom: 12 },
  item: { backgroundColor: C.CARD_LIGHT, padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: C.BORDER },
  itemTitle: { fontWeight: '800', color: C.TEXT_PRIMARY },
  itemBody: { color: C.TEXT_SECONDARY, marginTop: 6 },
});
