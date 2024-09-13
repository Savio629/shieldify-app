import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import EmployeeLogsScreen from './screens/EmployeeLogs'; // Import Employee Logs Screen

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Dashboard: DashboardScreen,
    EmployeeLogs: EmployeeLogsScreen, // Add Employee Logs screen to the stack
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1ABC9C',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default createAppContainer(AppNavigator);
