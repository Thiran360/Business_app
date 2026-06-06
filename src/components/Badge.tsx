import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'accent';
}

export const Badge = ({ label, variant = 'default' }: BadgeProps) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success': return colors.success;
      case 'error': return colors.error;
      case 'accent': return colors.accent;
      case 'warning': return '#FFC107';
      default: return colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.surface,
    fontSize: typography.sizes.xs,
    fontWeight: '600',
  },
});
