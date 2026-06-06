import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing, globalStyles } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'flat' | 'outlined';
}

export const Card = ({ children, style, variant = 'elevated' }: CardProps) => {
  return (
    <View style={[
      styles.card, 
      variant === 'elevated' && styles.elevated,
      variant === 'flat' && styles.flat,
      variant === 'outlined' && styles.outlined,
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
  },
  flat: {
    backgroundColor: colors.background,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});
