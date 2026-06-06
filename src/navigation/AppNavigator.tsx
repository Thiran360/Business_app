import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { BusinessProfileScreen } from '../screens/main/BusinessProfileScreen';
import { LeadsScreen } from '../screens/main/LeadsScreen';
import { MarketplaceScreen } from '../screens/main/MarketplaceScreen';
import { NetworkGroupsScreen } from '../screens/main/NetworkGroupsScreen';
import { MessagesScreen } from '../screens/main/MessagesScreen';
import { AdminNavigator } from './AdminNavigator';
import { useAppContext } from '../context/AppContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { user, isAdmin } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAdmin ? (
          <Stack.Screen name="AdminRoot" component={AdminNavigator} />
        ) : user ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            {/* Placing BusinessProfile here allows it to cover the bottom tabs when opened */}
            <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
            <Stack.Screen name="LeadsBoard" component={LeadsScreen} />
            <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
            <Stack.Screen name="NetworkGroups" component={NetworkGroupsScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
