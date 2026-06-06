import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing, globalStyles } from '../theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  dark?: boolean; // dark mode for headers with dark background
}

export const Header = ({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
  dark = true,
}: HeaderProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const textColor = dark ? colors.accent : colors.text;
  const bgColor = dark ? colors.primary : colors.surface;

  return (
    <View style={[styles.container, { backgroundColor: bgColor, paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress ? onBackPress : () => navigation.goBack()} style={styles.iconButton}>
              <Icon name="arrow-left" size={24} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <Text style={[styles.title, { color: dark ? colors.accent : colors.primary }]} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.right}>
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
              <Icon name={rightIcon} size={24} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    ...globalStyles.shadow,
    elevation: 2,
    zIndex: 10,
  },
  inner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 3,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: spacing.xs,
  },
});
