import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { usePortfolio } from '@/context/PortfolioContext';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ 
  value, 
  label, 
  showPercentage = true 
}: ProgressBarProps) {
  const { portfolioData } = usePortfolio();
  const { theme } = portfolioData;
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: value,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [value]);
  
  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            {label}
          </Text>
          {showPercentage && (
            <Text style={[styles.percentage, { color: theme.text }]}>
              {value}%
            </Text>
          )}
        </View>
      )}
      
      <View 
        style={[
          styles.trackBar, 
          { backgroundColor: theme.primary + '30' }
        ]}
      >
        <Animated.View 
          style={[
            styles.progressBar,
            { 
              width,
              backgroundColor: theme.primary,
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  trackBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});