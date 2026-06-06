import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { useAppContext } from '../../context/AppContext';

export const MenuScreen = () => {
  const { logout, user } = useAppContext();

  return (
    <View style={globalStyles.container}>
      <Header title="My Profile" />
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>
          <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.designation}>{user?.designation || 'Member'}</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Login Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Icon name="mail" size={20} color={colors.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Email Address</Text>
              <Text style={styles.detailValue}>{user?.socialMedia?.email || 'user@example.com'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Icon name="phone" size={20} color={colors.success} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>{user?.socialMedia?.phone || '+1 234 567 890'}</Text>
            </View>
          </View>

          {user?.company && (
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icon name="briefcase" size={20} color={colors.accent} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Company</Text>
                <Text style={styles.detailValue}>{user.company.name}</Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="log-out" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout from BSN</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  designation: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xxl, // extra padding for bottom tab
  },
  logoutText: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.error,
    marginLeft: spacing.sm,
  },
});
