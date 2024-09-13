import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function EmployeeLogsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#1ABC9C' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Employee Logs" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.text}>Employee Logs will be displayed here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2C3E50',
  },
});
