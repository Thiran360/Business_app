import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles, getIndustryStyle } from '../../theme';
import { Header } from '../../components/Header';
import { AdminTopNav } from '../../components/AdminTopNav';
import { Card } from '../../components/Card';
import { useAppContext } from '../../context/AppContext';
import { Member } from '../../data/mockData';

export const AdminBusinessesScreen = () => {
  const { members, login, removeMember } = useAppContext();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter only businesses
  const businesses = members.filter(m => m.type === 'Business');

  const filteredBusinesses = businesses.filter((member) => {
    return member.company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           member.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : '?';
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Business',
      `Are you sure you want to delete ${name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => removeMember(id) },
      ]
    );
  };

  const renderBusiness = ({ item }: { item: Member }) => (
    <Card style={styles.businessCard}>
      <View style={styles.headerRow}>
        {item.company.logo ? (
          <Image source={typeof item.company.logo === 'string' ? { uri: item.company.logo } : item.company.logo} style={styles.logo} />
        ) : (
          <View style={[styles.logoPlaceholder, { backgroundColor: getIndustryStyle(item.industry).bg }]}>
            <Text style={[styles.logoInitials, { color: getIndustryStyle(item.industry).color }]}>
              {getInitials(item.company.name)}
            </Text>
          </View>
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>{item.company.name}</Text>
          <Text style={styles.industryText}>{item.industry}</Text>
        </View>
      </View>
      <View style={styles.ownerInfo}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.ownerAvatar} />
        ) : (
          <View style={[styles.ownerAvatar, styles.initialsContainer]}>
            <Text style={styles.initialsText}>{getInitials(item.name)}</Text>
          </View>
        )}
        <View>
          <Text style={styles.ownerName}>{item.name}</Text>
          <Text style={styles.ownerTitle}>{item.designation}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('AdminEditMember', { member: item })}
          >
            <Icon name="edit-2" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={() => handleDelete(item.id, item.company.name)}
          >
            <Icon name="trash-2" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <Header title="BSN Admin Portal" dark showBack onBackPress={() => login('user')} />
      <AdminTopNav />
      
      <View style={styles.content}>
        <View style={styles.listHeader}>
          <Text style={styles.pageTitle}>Business Directory</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => navigation.navigate('AdminAddMember')}
          >
            <Icon name="plus" size={16} color="#FFF" />
            <Text style={styles.addButtonText}>Add Business</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses..."
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredBusinesses}
          keyExtractor={item => item.id}
          renderItem={renderBusiness}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="briefcase" size={48} color={colors.border} />
              <Text style={styles.emptyText}>No businesses found</Text>
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
    backgroundColor: '#F8FAFC',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  pageTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '800',
    color: '#0F172A',
  },
  addButton: {
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: typography.sizes.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: 0,
    paddingBottom: spacing.xxl * 2,
  },
  businessCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  logoInitials: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  industryText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  ownerName: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: '#334155',
  },
  initialsContainer: {
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#475569',
  },
  ownerTitle: {
    fontSize: typography.sizes.xs,
    color: '#64748B',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.sm,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
});
