import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { mockNetworkGroups } from '../../data/mockData';

export const NetworkGroupsScreen = () => {
  const navigation = useNavigation<any>();

  const handleJoin = (groupId: string) => {
    // Join group logic
  };

  const renderGroup = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.groupCard} activeOpacity={0.8}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardBg} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupDesc} numberOfLines={2}>{item.description}</Text>
          </View>
          
          <View style={styles.footerRow}>
            <View style={styles.memberCount}>
              <Icon name="users" size={14} color={colors.accent} />
              <Text style={styles.memberCountText}>{item.memberCount} Members</Text>
            </View>
            <TouchableOpacity style={styles.joinBtn} onPress={() => handleJoin(item.id)}>
              <Text style={styles.joinBtnText}>Join Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Header title="Network Groups" showBack />
      
      <View style={styles.infoBanner}>
        <Icon name="message-square" size={24} color={colors.primary} style={{ marginRight: spacing.sm }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Join Industry Clusters</Text>
          <Text style={styles.bannerDesc}>Connect with peers, share knowledge, and discuss industry-specific trends.</Text>
        </View>
      </View>

      <FlatList
        data={mockNetworkGroups}
        keyExtractor={item => item.id}
        renderItem={renderGroup}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bannerTitle: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  bannerDesc: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  list: {
    padding: spacing.md,
  },
  groupCard: {
    height: 200,
    marginBottom: spacing.md,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardBg: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 25, 40, 0.65)',
    borderRadius: 16,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  groupName: {
    color: '#FFF',
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  groupDesc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCountText: {
    color: '#FFF',
    fontSize: typography.sizes.sm,
    marginLeft: 6,
    fontWeight: '600',
  },
  joinBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: typography.sizes.sm,
  },
});
