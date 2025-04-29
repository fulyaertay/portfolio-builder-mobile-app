import React from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps,
  ViewStyle,
  TextStyle,
  Platform
} from 'react-native';
import { usePortfolio } from '@/context/PortfolioContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  ...props
}: InputProps) {
  const { portfolioData } = usePortfolio();
  const { theme } = portfolioData;
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text 
          style={[
            styles.label, 
            { color: theme.text }, 
            labelStyle
          ]}
        >
          {label}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? '#ef4444' : theme.text + '30',
            color: theme.text,
          },
          Platform.OS === 'web' && styles.webInput,
          inputStyle,
        ]}
        placeholderTextColor={theme.text + '70'}
        {...props}
      />
      
      {error && (
        <Text 
          style={[
            styles.error, 
            errorStyle
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

interface TextAreaProps extends InputProps {
  rows?: number;
}

export function TextArea({
  rows = 4,
  containerStyle,
  inputStyle,
  ...props
}: TextAreaProps) {
  return (
    <Input
      multiline
      numberOfLines={rows}
      textAlignVertical="top"
      containerStyle={containerStyle}
      inputStyle={[
        styles.textArea,
        { height: 24 * rows },
        inputStyle,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  webInput: {
    outlineStyle: 'none',
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
});