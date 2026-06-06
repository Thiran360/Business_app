import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing, typography, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';
import { useAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export const AdminCategoriesScreen = () => {
  const { categories, addCategory, removeCategory, login } = useAppContext();
  const navigation = useNavigation<any>();
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory.trim())) {
      Alert.alert('Exists', 'This category already exists.');
      return;
    }
    addCategory(newCategory);
    setNewCategory('');
  };

  const handleRemove = (category: string) => {
    Alert.alert(
      'Remove Category',
      `Are you sure you want to remove "${category}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeCategory(category) }
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <Header title="BSN Admin Portal" dark showBack onBackPress={() => login('user')} />
      <AdminTopNav />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Manage Categories</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newCategory}
            onChangeText={setNewCategory}
            placeholder="Add new category (e.g. Finance)"
            placeholderTextColor="#666666"
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Icon name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <View style={styles.categoryInfo}>
                <Icon name="tag" size={20} color={colors.primary} style={{ marginRight: spacing.md }} />
                <Text style={styles.categoryText}>{item}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemove(item)} style={styles.deleteBtn}>
                <Icon name="trash-2" size={20} color={colors.error || 'red'} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No categories found. Add one above.</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  headerRow: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  addBtn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: '500',
  },
  deleteBtn: {
    padding: spacing.xs,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
  },
});
