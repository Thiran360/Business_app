import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles, getIndustryStyle } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useAppContext } from '../../context/AppContext';
import { Member } from '../../data/mockData';

export const BusinessesScreen = () => {
  const { members, categories } = useAppContext();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(route.params?.category || 'All');

  useEffect(() => {
    if (route.params?.category) {
      setActiveFilter(route.params.category);
    }
  }, [route.params?.category]);

  // Filter only businesses
  const businesses = members.filter(m => m.type === 'Business');

  let filteredBusinesses = businesses.filter((member) => {
    const matchesSearch = member.company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || member.industry === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Removed the category limiting filter so all businesses are shown
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : '?';
  };

  const renderBusiness = ({ item }: { item: Member }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BusinessProfile', { memberId: item.id })}>
      <Card style={styles.businessCard}>
        <View style={styles.headerRow}>
          <Image source={typeof item.company.logo === 'string' ? { uri: item.company.logo } : item.company.logo} style={styles.logo} />
          <View style={styles.headerInfo}>
            <Text style={styles.companyName}>{item.company.name}</Text>
            <Text style={styles.industryText}>{item.industry}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.company.description}
        </Text>

        <View style={styles.tagContainer}>
          {item.company.services.slice(0, 3).map((srv, idx) => (
            <View key={`srv-${idx}`} style={styles.tag}>
              <Text style={styles.tagText}>{srv}</Text>
            </View>
          ))}
          {item.company.services.length > 3 && (
            <Text style={styles.tagMore}>+{item.company.services.length - 3}</Text>
          )}
        </View>
        
        <View style={styles.footerRow}>
          <View style={styles.founderInfo}>
            <View style={styles.avatarContainerSm}>
              <Text style={styles.avatarTextSm}>{getInitials(item.name)}</Text>
            </View>
            <View>
              <Text style={styles.founderName}>{item.name}</Text>
              <Text style={styles.designation}>{item.designation}</Text>
            </View>
          </View>
          <Icon name="arrow-right-circle" size={24} color={colors.primary} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Header title="Businesses" dark />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses..."
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
        data={filteredBusinesses}
        keyExtractor={(item) => item.id}
        renderItem={renderBusiness}
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
  businessCard: {
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: spacing.md,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  industryText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: '500',
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  tagText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: '600',
  },
  tagMore: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.xs,
  },
  founderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainerSm: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: spacing.sm,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTextSm: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  founderName: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text,
  },
  designation: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
});
