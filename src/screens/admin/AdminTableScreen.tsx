import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, FlatList } from 'react-native';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';

export const AdminTableScreen = () => {
  const { tables, addTable, login } = useAppContext();
  const navigation = useNavigation<any>();
  
  const [tableName, setTableName] = useState('');
  const [capacity, setCapacity] = useState('15');
  const [location, setLocation] = useState('');

  const handleCreate = () => {
    if (!tableName || !location) {
      Alert.alert('Error', 'Please enter a Table Name and Location.');
      return;
    }

    const newId = Math.random().toString(36).substring(2, 10);
    const newTable = {
      id: newId,
      tableName,
      capacity: parseInt(capacity) || 15,
      location,
      assignedMembers: [],
    };

    addTable(newTable);
    Alert.alert('Success', 'Table created successfully!', [
      { text: 'OK', onPress: () => {
          setTableName('');
          setCapacity('15');
          setLocation('');
      } }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Header title="BSN Admin Portal" dark showBack onBackPress={() => login('user')} />
      <AdminTopNav />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.instruction}>
            Create a new networking table for discussions or meetings.
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Table Name</Text>
            <TextInput style={styles.input} value={tableName} onChangeText={setTableName} placeholder="e.g. HealthTech Investors" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Table Capacity</Text>
            <TextInput style={styles.input} value={capacity} onChangeText={setCapacity} placeholder="e.g. 15" keyboardType="numeric" placeholderTextColor="#666666" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g. Main Hall" placeholderTextColor="#666666" />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleCreate}>
            <Text style={styles.submitBtnText}>Create Table</Text>
          </TouchableOpacity>

          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>Created Tables</Text>
            {tables.length === 0 ? (
              <Text style={styles.emptyText}>No tables created yet.</Text>
            ) : (
              tables.map((item) => (
                <Card key={item.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.headerText}>
                      <Text style={styles.title}>{item.tableName}</Text>
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.assignedMembers.length} / {item.capacity} seats</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.assignBtn} 
                    onPress={() => navigation.navigate('AdminAssignMembers', { tableId: item.id })}
                  >
                    <Text style={styles.assignBtnText}>Assign Members</Text>
                  </TouchableOpacity>
                </Card>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
  instruction: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 50,
    fontSize: typography.sizes.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
  },
  listSection: {
    marginTop: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontStyle: 'italic',
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  locationText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  badge: {
    backgroundColor: colors.accent + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: 'bold',
  },
  assignBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  assignBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: typography.sizes.sm,
  },
});
