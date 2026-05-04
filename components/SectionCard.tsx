import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type SectionCardProps = PropsWithChildren<{
  tone?: 'solid' | 'glass';
  style?: StyleProp<ViewStyle>;
}>;

export function SectionCard({ children, tone = 'solid', style }: SectionCardProps) {
  return (
    <View style={[styles.card, tone === 'glass' && styles.glassCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#13293d',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  glassCard: {
    backgroundColor: 'rgba(19, 41, 61, 0.72)',
  },
});
