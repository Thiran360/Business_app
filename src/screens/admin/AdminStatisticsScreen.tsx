import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { useAppContext } from '../../context/AppContext';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';

export const AdminStatisticsScreen = () => {
  const navigation = useNavigation();
  const { members, login } = useAppContext();

  const businessCount = members.filter(m => m.type === 'Business').length;
  const expertCount = members.length - businessCount;

  return (
    <View style={globalStyles.container}>
      <Header title="BSN Admin Portal" dark showBack onBackPress={() => login('user')} />
      <AdminTopNav />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.summaryGrid}>
          <View style={styles.statCard}>
            <Icon name="users" size={24} color={colors.primary} style={styles.statIcon} />
            <Text style={styles.statValue}>{members.length}</Text>
            <Text style={styles.statLabel}>Total Members</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="briefcase" size={24} color="#10B981" style={styles.statIcon} />
            <Text style={styles.statValue}>{businessCount}</Text>
            <Text style={styles.statLabel}>Businesses</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="star" size={24} color="#F59E0B" style={styles.statIcon} />
            <Text style={styles.statValue}>{expertCount}</Text>
            <Text style={styles.statLabel}>Experts</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="clock" size={24} color="#8B5CF6" style={styles.statIcon} />
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Pending Verifications</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Recent Activity</Text>
          <View style={styles.mockChart}>
            {/* A very simple CSS-based mock bar chart */}
            <View style={[styles.bar, { height: 40 }]} />
            <View style={[styles.bar, { height: 70 }]} />
            <View style={[styles.bar, { height: 50 }]} />
            <View style={[styles.bar, { height: 90 }]} />
            <View style={[styles.bar, { height: 60 }]} />
            <View style={[styles.bar, { height: 110, backgroundColor: colors.primary }]} />
          </View>
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabelText}>Mon</Text>
            <Text style={styles.chartLabelText}>Tue</Text>
            <Text style={styles.chartLabelText}>Wed</Text>
            <Text style={styles.chartLabelText}>Thu</Text>
            <Text style={styles.chartLabelText}>Fri</Text>
            <Text style={[styles.chartLabelText, { color: colors.primary, fontWeight: 'bold' }]}>Sat</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: spacing.xs,
    marginRight: spacing.md,
  },
  topHeaderTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chartCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartTitle: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  mockChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
  },
  bar: {
    width: 30,
    backgroundColor: colors.primary + '40',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    marginTop: spacing.sm,
  },
  chartLabelText: {
    fontSize: 10,
    color: colors.textSecondary,
    width: 30,
    textAlign: 'center',
  },
});
