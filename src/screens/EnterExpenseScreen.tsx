import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addExpense} from '../redux/store/action';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../utils/functions';

interface Expense {
  date: Date;
  value: string;
  amount: number;
}

export default function EnterExpenseScreen() {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    {label: 'Travel', value: 'travel'},
    {label: 'Entertainment', value: 'ent'},
    {label: 'Grocery', value: 'grocery'},
    {label: 'Utilities', value: 'utilities'},
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSubmit = () => {
    if (!date || !value || !amount) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    dispatch(addExpense({date, value, amount: parseFloat(amount)}));
    setDate(new Date());
    setAmount('');
    setValue(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: '#000',
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20,
          marginBottom: 20,
        }}>
        Welcome
      </Text>

      <View>
        <Text style={{color:"#000"}}>Enter Date:</Text>
        <TouchableOpacity
          onPress={() => setOpenDatePicker(true)}
          style={styles.input}>
          <Text>{formatDate(date)}</Text>
        </TouchableOpacity>

        <DatePicker
          mode="date"
          minimumDate={today}
          modal
          open={openDatePicker}
          date={date}
          onConfirm={(selectedDate: Date) => {
            setOpenDatePicker(false);
            setDate(selectedDate);
          }}
          onCancel={() => setOpenDatePicker(false)}
        />

        <Text style={{color:"#000"}}>Category:</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a category"
        />

        <Text style={{color:"#000"}}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter Amount"
          keyboardType="numeric"
          placeholderTextColor={'#000'}
          maxLength={6}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  input: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    color: '#000',
  },
  dropdown: {
    marginTop: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  submitButton: {
    padding: 16,
    backgroundColor: '#4069E1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
