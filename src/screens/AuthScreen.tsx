import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setLoading } from '../store/authSlice';
import { theme } from '../theme';
import i18n from '../i18n';
import authService from '../services/auth';

export default function AuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const dispatch = useDispatch();

  const handleSendCode = async () => {
    if (!phoneNumber) {
      Alert.alert(i18n.t('general.error'), i18n.t('auth.enterPhone'));
      return;
    }

    dispatch(setLoading(true));
    const success = await authService.sendVerificationCode(phoneNumber);
    dispatch(setLoading(false));

    if (success) {
      setIsCodeSent(true);
      Alert.alert(i18n.t('general.success'), i18n.t('auth.sendCode'));
    } else {
      Alert.alert(i18n.t('general.error'), 'Failed to send code');
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      Alert.alert(i18n.t('general.error'), i18n.t('auth.enterCode'));
      return;
    }

    dispatch(setLoading(true));
    const result = await authService.verifyCode(phoneNumber, verificationCode);
    dispatch(setLoading(false));

    if (result.success && result.token) {
      dispatch(setToken(result.token));
      const user = await authService.getCurrentUser(result.token);
      if (user) {
        dispatch(setUser(user));
      }
    } else {
      Alert.alert(i18n.t('general.error'), 'Invalid verification code');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('auth.title')}</Text>
        
        {!isCodeSent ? (
          <>
            <Text style={styles.label}>{i18n.t('auth.phoneNumber')}</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('auth.enterPhone')}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>{i18n.t('auth.sendCode')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>{i18n.t('auth.verifyCode')}</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('auth.enterCode')}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
              <Text style={styles.buttonText}>{i18n.t('auth.verify')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsCodeSent(false)}>
              <Text style={styles.linkText}>{i18n.t('general.back')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  label: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});
