import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

export default function ExpenseGraph({expenses}: {expenses: any[]}) {
  const groupedData = groupExpensesByDate(expenses);
  const labels = Object.keys(groupedData); 
  const amounts = Object.values(groupedData); 

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels,
          datasets: [{data: amounts}],
        }}
        width={Dimensions.get('window').width - 20} // Adjust width
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // Optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

// Reuse the grouping function
const groupExpensesByDate = (data: {amount: number; date: string}[]) => {
  const grouped: {[key: string]: number} = {};
  data.forEach(({amount, date}) => {
    const formattedDate = new Date(date).toLocaleDateString();
    grouped[formattedDate] = (grouped[formattedDate] || 0) + amount;
  });
  return grouped;
};
