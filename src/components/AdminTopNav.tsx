import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing, typography } from '../theme';

export const AdminTopNav = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const tabs = [
    { name: 'Business', route: 'AdminBusinesses', icon: 'briefcase' },
    { name: 'Create Account', route: 'AdminCreateUser', icon: 'user-plus' },
    { name: 'Categories', route: 'AdminCategories', icon: 'tag' },
    { name: 'Announcement', route: 'AdminAnnouncements', icon: 'bell' },
    { name: 'Event', route: 'AdminAddEvent', icon: 'calendar' },
    { name: 'Table', route: 'AdminTable', icon: 'list' },
  ];

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => route.name === tab.route || (tab.route === 'AdminBusinesses' && route.name === 'AdminAddMember'));
    if (activeIndex >= 3) {
      // Small delay to ensure layout is complete before scrolling
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: activeIndex * 90, animated: true });
      }, 100);
    }
  }, [route.name]);

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab, index) => {
          // Both AdminBusinesses and AdminAddMember should highlight the Business tab
          const isActive = route.name === tab.route || (tab.route === 'AdminBusinesses' && route.name === 'AdminAddMember');
          return (
            <TouchableOpacity
              key={tab.route}
              style={[
                styles.tab, 
                isActive && styles.activeTab,
                index !== tabs.length - 1 && { marginRight: spacing.sm }
              ]}
              onPress={() => navigation.navigate(tab.route)}
              activeOpacity={0.7}
            >
              <Icon name={tab.icon} size={16} color={isActive ? '#FFFFFF' : colors.textSecondary} />
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.background,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeTab: {
    backgroundColor: '#0F172A', // matching the premium theme from home screen
    borderColor: '#0F172A',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
