import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../../theme';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useAppContext } from '../../context/AppContext';

export const EventsScreen = () => {
  const { events } = useAppContext();

  return (
    <View style={globalStyles.container}>
      <Header title="Events" />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Card style={styles.card}>
              <View>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.badgeOverlay}>
                  <Badge label={item.type} variant="accent" />
                </View>
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                
                <View style={styles.metaContainer}>
                  <View style={styles.metaRow}>
                    <Icon name="calendar" size={14} color={colors.primary} />
                    <Text style={styles.metaText}>{item.date}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Icon name="map-pin" size={14} color={colors.primary} />
                    <Text style={styles.metaText}>{item.location}</Text>
                  </View>
                </View>

                <View style={styles.actionContainer}>
                  <View style={styles.attendeesContainer}>
                    <View style={styles.overlapAvatars}>
                      <Image source={{uri: 'https://i.pravatar.cc/150?u=11'}} style={styles.avatar} />
                      <Image source={{uri: 'https://i.pravatar.cc/150?u=12'}} style={[styles.avatar, styles.overlap]} />
                      <Image source={{uri: 'https://i.pravatar.cc/150?u=13'}} style={[styles.avatar, styles.overlap]} />
                    </View>
                    <Text style={styles.attendeesText}>+45 attending</Text>
                  </View>
                  <TouchableOpacity style={styles.rsvpBtn} onPress={() => {}}>
                    <Text style={styles.rsvpBtnText}>RSVP</Text>
                  </TouchableOpacity>
                </View>
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
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    height: 180,
  },
  badgeOverlay: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  metaText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  overlap: {
    marginLeft: -10,
  },
  attendeesText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  rsvpBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rsvpBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: typography.sizes.sm,
  },
});
