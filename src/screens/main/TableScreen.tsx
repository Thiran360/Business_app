import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, globalStyles, typography, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { useAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export const TableScreen = () => {
  const { tables, members } = useAppContext();
  const navigation = useNavigation<any>();

  return (
    <View style={globalStyles.container}>
      <Header title="Networking Tables" />
      {tables.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="coffee" size={48} color={colors.border} />
          <Text style={styles.emptyText}>No tables available right now.</Text>
        </View>
      ) : (
        <FlatList
          data={tables}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const assigned = members.filter(m => item.assignedMembers?.includes(m.id));
            const displayMembers = assigned.slice(0, 4);

            return (
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('TableDetails', { tableId: item.id })}>
                <Card style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.iconBox}>
                      <Icon name="users" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.headerText}>
                      <Text style={styles.title}>{item.tableName}</Text>
                      <Text style={styles.timeText}>{item.location}</Text>
                    </View>
                  </View>
                  
                  {assigned.length > 0 && (
                    <View style={styles.avatarsContainer}>
                      <View style={styles.overlapAvatars}>
                        {displayMembers.map((m, index) => (
                          m.photo ? (
                            <Image 
                              key={m.id} 
                              source={{ uri: m.photo }} 
                              style={[styles.avatar, index > 0 && styles.overlap]} 
                            />
                          ) : (
                            <View key={m.id} style={[styles.avatar, styles.initialsContainer, index > 0 && styles.overlap]}>
                              <Text style={styles.initialsText}>
                                {m.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                              </Text>
                            </View>
                          )
                        ))}
                      </View>
                      <Text style={styles.avatarsText}>
                        {assigned.length} member{assigned.length !== 1 ? 's' : ''} assigned
                      </Text>
                    </View>
                  )}

                  <View style={styles.cardFooter}>
                    <Text style={styles.capacityText}>Capacity: {item.capacity} seats</Text>
                    <Icon name="chevron-right" size={20} color={colors.textSecondary} />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.accent + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  timeText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  capacityText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  emptyText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  overlapAvatars: {
    flexDirection: 'row',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  initialsContainer: {
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  overlap: {
    marginLeft: -10,
  },
  avatarsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});
