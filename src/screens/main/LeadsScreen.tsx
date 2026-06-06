import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { mockLeads } from '../../data/mockData';

export const LeadsScreen = () => {
  const navigation = useNavigation<any>();

  const handleApply = (leadId: string) => {
    // Open application modal or message screen
  };

  const renderLead = ({ item }: { item: any }) => (
    <Card style={styles.leadCard}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.postedBy}>Posted by: <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{item.postedBy}</Text></Text>
        </View>
        <Badge label={item.status} variant={item.status === 'Open' ? 'accent' : 'default'} />
      </View>
      
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.footerRow}>
        <View style={styles.categoryWrap}>
          <Icon name="tag" size={14} color={colors.textSecondary} />
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <TouchableOpacity style={styles.applyBtn} onPress={() => handleApply(item.id)}>
          <Text style={styles.applyBtnText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <Header title="Business Leads" showBack rightIcon="filter" />
      <View style={styles.headerInfo}>
        <Text style={styles.subtitle}>Find new business opportunities</Text>
        <TouchableOpacity style={styles.postBtn}>
          <Icon name="plus" size={16} color="#FFFFFF" style={{ marginRight: spacing.xs }} />
          <Text style={styles.postBtnText}>Post Request</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockLeads}
        keyExtractor={item => item.id}
        renderItem={renderLead}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  postBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 8,
  },
  postBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: typography.sizes.sm,
  },
  list: {
    padding: spacing.md,
  },
  leadCard: {
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  postedBy: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  categoryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  applyBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
  },
  applyBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: typography.sizes.xs,
  },
});
