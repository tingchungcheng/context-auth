import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../theme/colors';

type Props = TextInputProps & {
  label: string;
  error?: boolean;
  showPasswordToggle?: boolean;
};

export function AuthTextField({
  label,
  error,
  showPasswordToggle,
  secureTextEntry,
  ...inputProps
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isSecure = showPasswordToggle
    ? !passwordVisible
    : secureTextEntry;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          {...inputProps}
          secureTextEntry={isSecure}
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            showPasswordToggle ? styles.inputWithToggle : undefined,
            error ? styles.inputError : undefined,
          ]}
        />
        {showPasswordToggle ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            hitSlop={8}
            onPress={() => setPasswordVisible(v => !v)}
            style={styles.toggle}>
            <Feather
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputRow: {
    position: 'relative',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputWithToggle: {
    paddingRight: 48,
  },
  inputError: {
    borderColor: colors.error,
  },
  toggle: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    width: 28,
    alignItems: 'center',
  },
});
