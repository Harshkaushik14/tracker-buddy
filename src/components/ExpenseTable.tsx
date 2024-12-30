import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {DataTable} from 'react-native-paper';

export default function ExpenseTable({
  expenses,
}: {
  expenses: {amount: number; date: string; value: string}[];
}) {
  const prepareTableData = (
    data: {amount: number; date: string; value: string}[],
  ) => {
    const groupedData: Record<string, Record<string, number>> = {};
    const uniqueHeaders = new Set<string>();

    data.forEach(({date, amount, value}) => {
      const dateObj = new Date(date);

      if (isNaN(dateObj.getTime())) {
        console.error(`Invalid date: ${date}`);
        return;
      }

      const formattedDate = `${dateObj.toLocaleString('en-US', {
        month: 'short',
      })} ${dateObj.getDate()}`;

      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = {};
      }
      groupedData[formattedDate][value] = amount;
      uniqueHeaders.add(value);
    });

    return {
      tableData: groupedData,
      headers: Array.from(uniqueHeaders),
    };
  };

  const {tableData, headers} = prepareTableData(expenses);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>
          <Text style={{color: '#000', fontSize: 10}}>DATE</Text>
        </DataTable.Title>
        {headers.map((header, index) => (
          <DataTable.Title key={index} numeric>
            <Text style={{color: '#000', fontSize: 10}}>
              {' '}
              {header.toUpperCase()}
            </Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {Object.keys(tableData).map((date, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>
            {' '}
            <Text style={{color: '#000', fontSize: 12}}>{date}</Text>
          </DataTable.Cell>
          {headers.map((header, idx) => (
            <DataTable.Cell key={idx} numeric>
              <Text style={{color: '#000', fontSize: 12}}>
                {tableData[date][header] || '-'}
              </Text>
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({});
