import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { mockMarketplaceItems } from '../../data/mockData';

export const MarketplaceScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'All' | 'Product' | 'Service' | 'Equipment'>('All');

  const filteredItems = activeTab === 'All' 
    ? mockMarketplaceItems 
    : mockMarketplaceItems.filter(item => item.type === activeTab);

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.marketCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.itemType}>{item.type}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.sellerRow}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="briefcase" size={14} color={colors.textSecondary} />
            <Text style={styles.sellerName} numberOfLines={1}>{item.sellerName}</Text>
          </View>
          <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.navigate('BusinessProfile', { memberId: item.sellerId })}>
            <Text style={styles.contactBtnText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <Header title="B2B Marketplace" showBack />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, services..."
          />
        </View>
      </View>

      <View style={styles.tabsRow}>
        {['All', 'Product', 'Service', 'Equipment'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: spacing.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeTabBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.surface,
  },
  list: {
    padding: spacing.md,
  },
  marketCard: {
    padding: 0,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#eee',
  },
  itemInfo: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  itemType: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemPrice: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.accent,
  },
  itemName: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  sellerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  sellerName: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  contactBtn: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  contactBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: typography.sizes.xs,
  },
});
