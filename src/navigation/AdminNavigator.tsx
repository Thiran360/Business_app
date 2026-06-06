import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminAddMemberScreen } from '../screens/admin/AdminAddMemberScreen';
import { AdminBusinessesScreen } from '../screens/admin/AdminBusinessesScreen';
import { AdminAnnouncementsScreen } from '../screens/admin/AdminAnnouncementsScreen';
import { AdminAddEventScreen } from '../screens/admin/AdminAddEventScreen';
import { AdminTableScreen } from '../screens/admin/AdminTableScreen';
import { AdminAssignMembersScreen } from '../screens/admin/AdminAssignMembersScreen';
import { AdminCreateUserScreen } from '../screens/admin/AdminCreateUserScreen';
import { AdminCategoriesScreen } from '../screens/admin/AdminCategoriesScreen';
import { AdminEditMemberScreen } from '../screens/admin/AdminEditMemberScreen';

const Stack = createNativeStackNavigator();

export const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AdminBusinesses">
      <Stack.Screen name="AdminBusinesses" component={AdminBusinessesScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="AdminAddMember" component={AdminAddMemberScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="AdminAnnouncements" component={AdminAnnouncementsScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="AdminAddEvent" component={AdminAddEventScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="AdminTable" component={AdminTableScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="AdminAssignMembers" component={AdminAssignMembersScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="AdminCreateUser" component={AdminCreateUserScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="AdminCategories" component={AdminCategoriesScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="AdminEditMember" component={AdminEditMemberScreen} options={{ animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
};
