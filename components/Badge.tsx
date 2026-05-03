import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'muted';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <View style={[styles.badge, getBadgeStyle(variant)]}>
      <Text style={[styles.text, getTextStyle(variant)]}>{label}</Text>
    </View>
  );
}

function getBadgeStyle(variant: BadgeVariant) {
  switch (variant) {
    case 'success':
      return styles.successBadge;
    case 'warning':
      return styles.warningBadge;
    case 'danger':
      return styles.dangerBadge;
    case 'info':
      return styles.infoBadge;
    case 'muted':
      return styles.mutedBadge;
    case 'default':
    default:
      return styles.defaultBadge;
  }
}

function getTextStyle(variant: BadgeVariant) {
  switch (variant) {
    case 'success':
    case 'warning':
    case 'info':
    case 'default':
      return styles.darkText;
    case 'danger':
    case 'muted':
    default:
      return styles.lightText;
  }
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: colors.sunshine,
  },
  successBadge: {
    backgroundColor: colors.seafoam,
  },
  warningBadge: {
    backgroundColor: colors.sunshine,
  },
  dangerBadge: {
    backgroundColor: colors.coral,
  },
  infoBadge: {
    backgroundColor: '#9fdcff',
  },
  mutedBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  darkText: {
    color: colors.oceanDark,
  },
  lightText: {
    color: colors.text,
  },
});
