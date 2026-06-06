import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { useAppContext } from '../../context/AppContext';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export const TableDetailsScreen = () => {
  const { tables, members } = useAppContext();
  const route = useRoute<any>();
  const tableId = route.params?.tableId;

  const currentTable = tables.find(t => t.id === tableId);
  
  if (!currentTable) return null;

  // Find the full member objects for the assigned IDs
  const assignedMembers = members.filter(m => currentTable.assignedMembers.includes(m.id));

  return (
    <View style={globalStyles.container}>
      <Header title="Table Details" showBack />
      
      <View style={styles.tableInfo}>
        <View style={styles.iconBox}>
          <Icon name="coffee" size={32} color={colors.primary} />
        </View>
        <Text style={styles.title}>{currentTable.tableName}</Text>
        <View style={styles.metaRow}>
          <Icon name="map-pin" size={14} color={colors.textSecondary} />
          <Text style={styles.metaText}>{currentTable.location}</Text>
        </View>
        <View style={styles.capacityBadge}>
          <Text style={styles.capacityText}>
            {assignedMembers.length} / {currentTable.capacity} Seats Filled
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Business Owners at this Table</Text>
      </View>

      {assignedMembers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No members have been assigned to this table yet.</Text>
        </View>
      ) : (
        <FlatList
          data={assignedMembers}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.memberCard}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.initialsContainer]}>
                  <Text style={styles.initialsText}>
                    {item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberBusiness}>{item.company?.name || 'Business Owner'}</Text>
                <Text style={styles.memberCategory}>{item.company?.category || 'Category'}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tableInfo: {
    padding: spacing.xl,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  metaText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  capacityBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
  },
  capacityText: {
    color: '#1976D2',
    fontSize: typography.sizes.sm,
    fontWeight: 'bold',
  },
  sectionHeader: {
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  list: {
    padding: spacing.md,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.md,
  },
  initialsContainer: {
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#475569',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  memberBusiness: {
    fontSize: typography.sizes.md,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  memberCategory: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
