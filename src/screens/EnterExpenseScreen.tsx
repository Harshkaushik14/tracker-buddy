import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addExpense} from '../redux/store/action';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../utils/functions';
import {getGreeting} from '../utils/constatns';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AnimatedText from '../components/AnimatedCounter';
import AnimatedCounter from '../components/AnimatedCounter';

interface Expense {
  date: Date;
  value: string;
  amount: number;
}

const data = [
  {
    id: '1',
    title: 'Upwork',
    date: 'Today',
    amount: '- $850.00',
    icon: 'bug',
  },
  {
    id: '2',
    title: 'Freelance',
    date: 'Yesterday',
    amount: '- $300.00',
    icon: 'briefcase',
  },
  {
    id: '3',
    title: 'Salary',
    date: 'Last Week',
    amount: '+ $2000.00',
    icon: 'wallet',
  },
  {
    id: '4',
    title: 'Salary',
    date: 'Last Week',
    amount: '+ $2000.00',
    icon: 'wallet',
  },
  {
    id: '5',
    title: 'Salary',
    date: 'Last Week',
    amount: '+ $2000.00',
    icon: 'wallet',
  },
  {
    id: '6',
    title: 'Salary',
    date: 'Last Week',
    amount: '+ $2000.00',
    icon: 'wallet',
  },
  {
    id: '7',
    title: 'Salary',
    date: 'Last Week',
    amount: '+ $2000.00',
    icon: 'wallet',
  },
];

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

  const renderItem = ({item}: {item: (typeof data)[0]}) => (
    <View style={styles.listItem}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconContainer}>
          <Entypo name={item.icon} size={18} color={'#fff'} />
        </View>
        <View style={{left: 10, marginTop: 3}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.amount,
          {color: item.amount.startsWith('+') ? '#4CAF50' : '#F95B51'},
        ]}>
        {item.amount}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#2A7C76'}
        barStyle={'light-content'}
      />
      <View
        style={{
          height: '26%',
          width: '100%',
        }}>
        <LinearGradient
          colors={['#2A7C76', '#145A58']}
          style={styles.gradientBox}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={[styles.greeting, {fontSize: 20, marginTop: 5}]}>
                Harsh Kaushik
              </Text>
            </View>

            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color={'#fff'}
              style={{left: -52}}
            />
          </View>
        </LinearGradient>

        <View
          style={{
            backgroundColor: '#2F7E79',
            position: 'absolute',
            zIndex: 1,
            padding: 20,
            width: '90%',
            left: 20,
            bottom: -100,
            height: '90%',
            borderRadius: 20,
            elevation: 2,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: '400',
                  textAlign: 'left',
                }}>
                Total Expense Today
              </Text>
            
              <AnimatedCounter
                targetValue={2548}
                duration={2000}
                style={{fontSize: 30, color: '#fff'}}
                prefix="$ "
                // suffix=".00"
              />
            </View>

            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={'#fff'}
            />
          </View>

          <View
            style={{marginTop: 50, flexDirection: 'row', alignItems: 'center',justifyContent:"space-between"}}>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontWeight: '400',
                letterSpacing: 1,
              }}>
              XXXX XXXX XXXX 1881
            </Text>

            <FontAwesome name="cc-visa" color={'#fff'} size={30} />
          </View>
        </View>
      </View>

      <View style={styles.flatContainer}>
        <View style={{height: '25%'}} />
        <View style={styles.header}>
          <Text style={styles.historyText}>History</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{marginBottom: '20%'}} />}
        />
      </View>

      {/* <View style={{marginHorizontal: 20, marginTop: 120}}>
        <Text style={{color: '#000'}}>Enter Date:</Text>
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

        <Text style={{color: '#000'}}>Category:</Text>
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

        <Text style={{color: '#000'}}>Amount:</Text>
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
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
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
  gradientBox: {
    backgroundColor: '#2A7C76',
    height: '100%',
    // width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    left: 25,
  },
  flatContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyText: {
    color: '#000',
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#000',
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: '300',
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  iconContainer: {
    padding: 15,
    backgroundColor: '#F0F6F5',
    borderRadius: 8,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#000',
    fontSize: 16,
    fontWeight: '300',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
