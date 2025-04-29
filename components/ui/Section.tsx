import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { usePortfolio } from '@/context/PortfolioContext';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Section({ title, children, style }: SectionProps) {
  const { portfolioData } = usePortfolio();
  const { theme } = portfolioData;

  return (
    <View style={[styles.section, style]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  const { portfolioData } = usePortfolio();
  const { theme } = portfolioData;

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: theme.cardBackground,
          borderColor: theme.primary + '20',
        },
        style
      ]}>
      {children}
    </View>
  );
}

interface LabelProps {
  text: string;
  style?: TextStyle;
}

export function Label({ text, style }: LabelProps) {
  const { portfolioData } = usePortfolio();
  const { theme } = portfolioData;

  return (
    <Text style={[styles.label, { color: theme.text }, style]}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  content: {
    gap: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
});