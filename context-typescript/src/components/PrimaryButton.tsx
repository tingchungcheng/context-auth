import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {colors} from '../theme/colors';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  style,
}: Props) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        isPrimary
          ? styles.primary
          : isOutline
            ? styles.outline
            : styles.ghost,
        pressed &&
          (isPrimary
            ? styles.primaryPressed
            : isOutline
              ? styles.outlinePressed
              : styles.ghostPressed),
        style,
      ]}>
      <Text
        style={[
          styles.label,
          isPrimary
            ? styles.primaryLabel
            : isOutline
              ? styles.outlineLabel
              : styles.ghostLabel,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryPressed: {
    backgroundColor: colors.primaryPressed,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.text,
  },
  ghostPressed: {
    backgroundColor: '#E2E8F0',
  },
  outlinePressed: {
    backgroundColor: '#F1F5F9',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#FFFFFF',
  },
  ghostLabel: {
    color: colors.text,
  },
  outlineLabel: {
    color: colors.text,
  },
});
