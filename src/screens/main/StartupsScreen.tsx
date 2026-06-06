import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useAppContext } from '../../context/AppContext';

export const StartupsScreen = () => {
  const { members } = useAppContext();
  const navigation = useNavigation<any>();

  const startups = members.filter(m => m.type === 'Startup' && m.startupInfo);

  return (
    <View style={globalStyles.container}>
      <Header title="Startup Corner" />
      <FlatList
        data={startups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('BusinessProfile', { memberId: item.id })}>
            <Card style={styles.card}>
              <View style={styles.headerRow}>
                <Image source={typeof item.company.logo === 'string' ? { uri: item.company.logo } : item.company.logo} style={styles.logo} />
                <View style={styles.headerInfo}>
                  <Text style={styles.companyName}>{item.company.name}</Text>
                  <Text style={styles.founderName}>by {item.name}</Text>
                </View>
                <Badge label={item.startupInfo?.fundingStage || 'Startup'} variant="accent" />
              </View>
              
              <Text style={styles.description} numberOfLines={2}>
                {item.startupInfo?.description}
              </Text>
              
              <View style={styles.footerRow}>
                <View style={styles.categories}>
                  {item.startupInfo?.categories.map((cat, idx) => (
                    <Text key={idx} style={styles.categoryText}>#{cat} </Text>
                  ))}
                </View>
                <Icon name="arrow-right-circle" size={24} color={colors.primary} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.primary,
  },
  founderName: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  categoryText: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: '500',
  },
});
