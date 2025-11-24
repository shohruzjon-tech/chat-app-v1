import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';
import i18n, { setLanguage } from '../i18n';

interface SettingsScreenProps {
  navigation: any;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const languages = [
    { code: 'uz' as const, name: 'Oʻzbek' },
    { code: 'en' as const, name: 'English' },
    { code: 'ru' as const, name: 'Русский' },
  ];

  const handleLanguageChange = (languageCode: 'uz' | 'en' | 'ru') => {
    setLanguage(languageCode);
    // Force re-render by navigating back and forth
    navigation.replace('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t('settings.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('settings.language')}</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.languageItem}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <Text style={styles.languageText}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('settings.notifications')}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              {i18n.t('settings.notifications')} - Coming soon
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('settings.privacy')}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{i18n.t('settings.privacy')} - Coming soon</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('settings.security')}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              {i18n.t('settings.endToEndEncryption')} - ✓ Enabled (Placeholder)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: theme.fontSize.xxl,
    color: theme.colors.textInverse,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textInverse,
  },
  placeholder: {
    width: 30,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  languageItem: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  languageText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  infoBox: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  infoText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
});
