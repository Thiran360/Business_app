import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { useAppContext } from '../../context/AppContext';

export const MessagesScreen = () => {
  const navigation = useNavigation();
  const { announcements } = useAppContext();

  const renderAnnouncement = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Icon name="bell" size={20} color={colors.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.announcementImage} />
      )}
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Header title="Messages" showBack />
      
      <FlatList
        data={announcements}
        keyExtractor={item => item.id}
        renderItem={renderAnnouncement}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="message-circle" size={48} color={colors.textSecondary} style={{ marginBottom: spacing.md, opacity: 0.5 }} />
            <Text style={styles.emptyText}>No messages yet.</Text>
            <Text style={styles.emptySubtext}>Announcements from the admin will appear here.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: typography.sizes.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  content: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  announcementImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: spacing.md,
    resizeMode: 'cover',
  },
});
