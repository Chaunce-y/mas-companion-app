import AsyncStorage from '@react-native-async-storage/async-storage';

export type AccountPreferences = {
  dailyReminders: boolean;
  diningAlerts: boolean;
  offlineMode: boolean;
};

const ACCOUNT_PREFERENCES_KEY = 'accountPreferences';

export const defaultAccountPreferences: AccountPreferences = {
  dailyReminders: true,
  diningAlerts: false,
  offlineMode: true,
};

export async function getAccountPreferences(): Promise<AccountPreferences> {
  const saved = await AsyncStorage.getItem(ACCOUNT_PREFERENCES_KEY);

  if (!saved) {
    return defaultAccountPreferences;
  }

  try {
    const parsed = JSON.parse(saved);

    return {
      dailyReminders:
        typeof parsed.dailyReminders === 'boolean'
          ? parsed.dailyReminders
          : defaultAccountPreferences.dailyReminders,
      diningAlerts:
        typeof parsed.diningAlerts === 'boolean'
          ? parsed.diningAlerts
          : defaultAccountPreferences.diningAlerts,
      offlineMode:
        typeof parsed.offlineMode === 'boolean'
          ? parsed.offlineMode
          : defaultAccountPreferences.offlineMode,
    };
  } catch {
    return defaultAccountPreferences;
  }
}

export async function saveAccountPreferences(
  preferences: AccountPreferences
): Promise<void> {
  await AsyncStorage.setItem(ACCOUNT_PREFERENCES_KEY, JSON.stringify(preferences));
}
