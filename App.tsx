import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store/store';
import EnterExpenseScreen from './src/screens/EnterExpenseScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import {PaperProvider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View} from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity style={{top:-30,justifyContent:"center",alignItems:"center"}} onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: 'red',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                options={{
                  headerShown: false,
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name="add-circle" size={size} color={color} />
                  ),
                }}
                name="Enter Expense"
                component={EnterExpenseScreen}
              />
{/* 
              <Tab.Screen
                options={{
                  headerShown: false,
                  tabBarLabel:"",
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name="add-circle" size={size} color={color} style={{backgroundColor:"blue",}} />
                  ),
                  tabBarButton: props => <CustomTabBarButton {...props} />,
                }}
                name="Post"
                component={EnterExpenseScreen}
              /> */}
              <Tab.Screen
                options={{
                  headerShown: false,
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name="bar-chart" size={size} color={color} />
                  ),
                }}
                name="Summary"
                component={SummaryScreen}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}
