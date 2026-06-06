import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles, getIndustryStyle } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useAppContext } from '../../context/AppContext';
import { Member } from '../../data/mockData';

export const DirectoryScreen = () => {
  const { members, categories } = useAppContext();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  let filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || member.industry === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categoryCounts: Record<string, number> = {};
  filteredMembers = filteredMembers.filter(member => {
    const count = categoryCounts[member.industry] || 0;
    if (count < 3) {
      categoryCounts[member.industry] = count + 1;
      return true;
    }
    return false;
  });

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : '?';
  };

  const renderMember = ({ item }: { item: Member }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BusinessProfile', { memberId: item.id })} activeOpacity={0.9}>
      <Card style={styles.memberCard}>
        <View style={styles.memberTop}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.designation}>{item.designation}</Text>
            <Text style={styles.company}>{item.company.name}</Text>
            <View style={styles.badges}>
              <Badge label={item.type} variant={item.type === 'Startup' ? 'accent' : 'default'} />
              <Badge label={item.industry} />
            </View>
          </View>
        </View>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactBtn}>
            <Icon name="phone" size={14} color={colors.primary} />
            <Text style={styles.contactText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactBtn, styles.whatsappBtn]}>
            <Icon name="message-circle" size={14} color="#25D366" />
            <Text style={[styles.contactText, { color: '#25D366' }]}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Header title="Experts" dark />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search members or companies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['All', ...categories]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const styleInfo = getIndustryStyle(item);
            const isActive = activeFilter === item;
            return (
              <TouchableOpacity
                style={[
                  styles.filterChip, 
                  isActive && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setActiveFilter(item)}
              >
                <Icon 
                  name={styleInfo.icon} 
                  size={14} 
                  color={isActive ? colors.accent : colors.textSecondary} 
                  style={{ marginRight: 6 }} 
                />
                <Text style={[
                  styles.filterText, 
                  isActive && { color: colors.accent, fontWeight: 'bold' }
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={renderMember}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: typography.sizes.md,
  },
  filterContainer: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginLeft: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: colors.surface,
  },
  list: {
    padding: spacing.md,
  },
  memberCard: {
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  memberTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: spacing.lg,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '20',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  designation: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  company: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  badges: {
    flexDirection: 'row',
    marginTop: 2,
    flexWrap: 'wrap',
  },
  contactRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary + '08',
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  whatsappBtn: {
    backgroundColor: '#25D366' + '15',
    marginRight: 0,
    marginLeft: spacing.sm,
  },
  contactText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});
