import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type SectionCardProps = PropsWithChildren<{
  tone?: 'solid' | 'glass';
}>;

export function SectionCard({ children, tone = 'solid' }: SectionCardProps) {
  return (
    <View style={[styles.card, tone === 'glass' && styles.glassCard]}>
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
