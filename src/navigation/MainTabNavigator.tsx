import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme';

import { HomeScreen } from '../screens/main/HomeScreen';
import { BusinessesScreen } from '../screens/main/BusinessesScreen';
import { EventsScreen } from '../screens/main/EventsScreen';
import { MenuScreen } from '../screens/more/MenuScreen';
import { TableStackNavigator } from './TableStackNavigator';

import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          paddingBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarIcon: ({ color }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Businesses') iconName = 'briefcase';
          else if (route.name === 'TableStack') iconName = 'users';
          else if (route.name === 'EventsTab') iconName = 'calendar';
          else if (route.name === 'Menu') iconName = 'user';

          return <Icon name={iconName} size={22} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 70,
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          elevation: 10,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Businesses" component={BusinessesScreen} options={{ tabBarLabel: 'Network' }} />
      <Tab.Screen name="TableStack" component={TableStackNavigator} options={{ tabBarLabel: 'Tables' }} />
      <Tab.Screen name="EventsTab" component={EventsScreen} options={{ tabBarLabel: 'Events' }} />
      <Tab.Screen name="Menu" component={MenuScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};
