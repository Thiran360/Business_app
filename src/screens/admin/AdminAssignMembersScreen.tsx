import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { useAppContext } from '../../context/AppContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export const AdminAssignMembersScreen = () => {
  const { members, tables, assignMembersToTable } = useAppContext();
  const route = useRoute<any>();
  const navigation = useNavigation();
  const tableId = route.params?.tableId;

  const currentTable = tables.find(t => t.id === tableId);
  
  // Start with already assigned members
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(currentTable?.assignedMembers || []));

  const toggleSelection = (memberId: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      if (currentTable && newSelected.size >= currentTable.capacity) {
        Alert.alert('Capacity Reached', `This table can only hold ${currentTable.capacity} members.`);
        return;
      }
      newSelected.add(memberId);
    }
    setSelectedIds(newSelected);
  };

  const handleSave = () => {
    if (!currentTable) return;
    
    // We allow them to save any number up to capacity. 
    assignMembersToTable(currentTable.id, Array.from(selectedIds));
    Alert.alert('Success', 'Members assigned successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  if (!currentTable) return null;

  return (
    <View style={globalStyles.container}>
      <Header title="Assign Members" showBack />
      
      <View style={styles.infoSection}>
        <Text style={styles.tableTitle}>{currentTable.tableName}</Text>
        <Text style={styles.capacityText}>
          Selected: {selectedIds.size} / {currentTable.capacity}
        </Text>
      </View>

      <FlatList
        data={members}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = selectedIds.has(item.id);
          return (
            <TouchableOpacity 
              style={[styles.memberCard, isSelected && styles.memberCardSelected]}
              onPress={() => toggleSelection(item.id)}
            >
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
              </View>
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Icon name="check" size={14} color="#FFF" />}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Assignments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  capacityText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  list: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  memberCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.md,
  },
  initialsContainer: {
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#475569',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text,
  },
  memberBusiness: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
  },
});
