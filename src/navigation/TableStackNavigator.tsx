import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TableScreen } from '../screens/main/TableScreen';
import { TableDetailsScreen } from '../screens/main/TableDetailsScreen';

const Stack = createNativeStackNavigator();

export const TableStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TableList" component={TableScreen} />
      <Stack.Screen name="TableDetails" component={TableDetailsScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
};
