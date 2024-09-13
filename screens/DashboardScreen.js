import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart, BarChart, LineChart, ProgressChart } from 'react-native-chart-kit';
import * as Notifications from 'expo-notifications';
import { Appbar, Drawer } from 'react-native-paper';
import { DrawerLayout } from 'react-native-gesture-handler';

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
}

export default function DashboardScreen({ navigation }) {
  const drawer = useRef(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    return () => subscription.remove();
  }, []);

  const handleSendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Notification 📬',
        body: 'This is a notification message.',
        data: { someData: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  };

  const pieChartData = [
    { name: 'JavaScript', population: 30, color: '#ffcd56', legendFontColor: '#2C3E50', legendFontSize: 15 },
    { name: 'Python', population: 50, color: '#36a2eb', legendFontColor: '#2C3E50', legendFontSize: 15 },
    { name: 'Java', population: 20, color: '#ff6384', legendFontColor: '#2C3E50', legendFontSize: 15 },
  ];

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [30, 40, 80, 55, 90, 100] }],
  };

  const progressChartData = {
    labels: ['Progress'], 
    data: [0.6],
  };

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <Drawer.Section title="Navigation">
        <Drawer.Item label="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
        <Drawer.Item label="Employee Logs" onPress={() => navigation.navigate('EmployeeLogs')} />
        <Drawer.Item label="Settings" onPress={() => navigation.navigate('Settings')} />
      </Drawer.Section>
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayout
      ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
    >
      <View style={styles.mainContainer}>
        <Appbar.Header style={{ backgroundColor: '#1ABC9C' }}>
          <Appbar.Action icon="menu" onPress={() => drawer.current.openDrawer()} />
          <Appbar.Content title="Dashboard" />
        </Appbar.Header>

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>Dashboard Charts</Text>

          {/* Pie Chart */}
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width - 50}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          {/* Bar Chart */}
          <BarChart
            style={styles.chart}
            data={barChartData}
            width={Dimensions.get('window').width - 50}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />

          {/* Line Chart */}
          <LineChart
            style={styles.chart}
            data={lineChartData}
            width={Dimensions.get('window').width - 50}
            height={220}
            chartConfig={chartConfig}
          />

          {/* Progress Chart */}
          <ProgressChart
            data={progressChartData}
            width={Dimensions.get('window').width - 50}
            height={220}
            chartConfig={chartConfig}
            strokeWidth={16}
            radius={32}
          />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.notificationButton} onPress={handleSendNotification}>
            <Text style={styles.notificationText}>Send Notification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerLayout>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#f3f3f3',
  backgroundGradientTo: '#ececec',
  color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  footer: {
    backgroundColor: '#1ABC9C',
    padding: 10,
    alignItems: 'center',
  },
  notificationButton: {
    backgroundColor: '#16A085',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  notificationText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
