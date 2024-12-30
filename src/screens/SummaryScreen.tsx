import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseGraph from '../components/ExpenseGraph';

export default function SummaryScreen() {
  const expenses = useSelector((state: any) => state.expenses);

  if (!expenses || expenses.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No expenses recorded</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          color: '#000',
          marginTop: 30,
          marginBottom: 10,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Table
      </Text>
      <ExpenseTable expenses={expenses} />
      <Text
        style={{
          color: '#000',
          marginTop: 30,
          marginBottom: 10,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        STATS
      </Text>
      <ExpenseGraph expenses={expenses} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
  },
});
