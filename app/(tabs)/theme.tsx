import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { usePortfolio } from '@/context/PortfolioContext';
import { Section, Card } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ThemeColors } from '@/types/portfolio';

const PRESET_THEMES = [
  {
    name: 'Indigo',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#f8fafc',
      text: '#0f172a',
      cardBackground: '#ffffff',
    }
  },
  {
    name: 'Emerald',
    colors: {
      primary: '#10b981',
      secondary: '#14b8a6',
      accent: '#f59e0b',
      background: '#f8fafc',
      text: '#0f172a',
      cardBackground: '#ffffff',
    }
  },
  {
    name: 'Rose',
    colors: {
      primary: '#f43f5e',
      secondary: '#e11d48',
      accent: '#6366f1',
      background: '#f8fafc',
      text: '#0f172a',
      cardBackground: '#ffffff',
    }
  },
  {
    name: 'Dark Indigo',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#0f172a',
      text: '#f8fafc',
      cardBackground: '#1e293b',
    }
  },
  {
    name: 'Dark Emerald',
    colors: {
      primary: '#10b981',
      secondary: '#14b8a6',
      accent: '#f59e0b',
      background: '#0f172a',
      text: '#f8fafc',
      cardBackground: '#1e293b',
    }
  },
  {
    name: 'Dark Rose',
    colors: {
      primary: '#f43f5e',
      secondary: '#e11d48',
      accent: '#6366f1',
      background: '#0f172a',
      text: '#f8fafc',
      cardBackground: '#1e293b',
    }
  },
];

export default function ThemeScreen() {
  const { portfolioData, updateTheme } = usePortfolio();
  const { theme } = portfolioData;
  
  const [customTheme, setCustomTheme] = useState<ThemeColors>(theme);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  
  const handleSelectPreset = (presetTheme: ThemeColors) => {
    updateTheme(presetTheme);
    setCustomTheme(presetTheme);
  };
  
  const handleSaveCustomTheme = () => {
    updateTheme(customTheme);
  };
  
  const renderColorPicker = (
    colorName: keyof ThemeColors, 
    label: string,
    description: string,
  ) => {
    const colorOptions = [
      // Primary colors
      '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#ef4444', 
      '#f59e0b', '#10b981', '#14b8a6', '#0284c7', '#7c3aed',
      // Background/text colors
      '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0',
      '#1e293b', '#0f172a', '#020617', '#000000',
    ];
    
    return (
      <View style={styles.colorPickerContainer}>
        <View style={styles.colorPickerHeader}>
          <Text style={[styles.colorPickerLabel, { color: theme.text }]}>
            {label}
          </Text>
          <Text style={[styles.colorPickerValue, { color: theme.text }]}>
            {customTheme[colorName]}
          </Text>
        </View>
        
        <Text style={[styles.colorPickerDescription, { color: theme.text + '80' }]}>
          {description}
        </Text>
        
        <View style={styles.colorOptions}>
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                customTheme[colorName] === color && styles.selectedColorOption,
              ]}
              onPress={() => setCustomTheme(prev => ({ ...prev, [colorName]: color }))}
            />
          ))}
        </View>
      </View>
    );
  };
  
  const renderPresetThemes = () => (
    <View style={styles.presetContainer}>
      {PRESET_THEMES.map((presetTheme, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.presetCard,
            {
              backgroundColor: presetTheme.colors.cardBackground,
              borderColor: 
                JSON.stringify(theme) === JSON.stringify(presetTheme.colors) 
                  ? presetTheme.colors.primary 
                  : presetTheme.colors.cardBackground,
            }
          ]}
          onPress={() => handleSelectPreset(presetTheme.colors)}
        >
          <Text style={[
            styles.presetName, 
            { color: presetTheme.colors.text }
          ]}>
            {presetTheme.name}
          </Text>
          
          <View style={styles.colorPreview}>
            <View 
              style={[
                styles.colorDot, 
                { backgroundColor: presetTheme.colors.primary }
              ]} 
            />
            <View 
              style={[
                styles.colorDot, 
                { backgroundColor: presetTheme.colors.secondary }
              ]}
            />
            <View 
              style={[
                styles.colorDot, 
                { backgroundColor: presetTheme.colors.accent }
              ]} 
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  const renderCustomTheme = () => (
    <View style={styles.customContainer}>
      {renderColorPicker(
        'primary', 
        'Primary Color', 
        'Used for buttons, links, and primary UI elements'
      )}
      
      {renderColorPicker(
        'secondary', 
        'Secondary Color', 
        'Used for highlights, accents, and secondary UI elements'
      )}
      
      {renderColorPicker(
        'accent', 
        'Accent Color', 
        'Used for special highlights and call-to-action elements'
      )}
      
      {renderColorPicker(
        'background', 
        'Background Color', 
        'The main background color of your portfolio'
      )}
      
      {renderColorPicker(
        'text', 
        'Text Color', 
        'The primary color for text throughout your portfolio'
      )}
      
      {renderColorPicker(
        'cardBackground', 
        'Card Background', 
        'Background color for cards and content containers'
      )}
      
      <Button 
        title="Apply Custom Theme" 
        onPress={handleSaveCustomTheme}
        style={{ marginTop: 16 }}
      />
    </View>
  );
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Section title="Theme Customization">
        <View style={styles.themeTabsContainer}>
          <TouchableOpacity
            style={[
              styles.themeTab,
              activeTab === 'presets' && [
                styles.activeThemeTab,
                { borderBottomColor: theme.primary }
              ]
            ]}
            onPress={() => setActiveTab('presets')}
          >
            <Text 
              style={[
                styles.themeTabText,
                { color: activeTab === 'presets' ? theme.primary : theme.text }
              ]}
            >
              Preset Themes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.themeTab,
              activeTab === 'custom' && [
                styles.activeThemeTab,
                { borderBottomColor: theme.primary }
              ]
            ]}
            onPress={() => setActiveTab('custom')}
          >
            <Text 
              style={[
                styles.themeTabText,
                { color: activeTab === 'custom' ? theme.primary : theme.text }
              ]}
            >
              Custom Theme
            </Text>
          </TouchableOpacity>
        </View>
        
        <Card>
          {activeTab === 'presets' ? renderPresetThemes() : renderCustomTheme()}
        </Card>
      </Section>
      
      <Section title="Current Theme Preview">
        <Card>
          <Text style={[styles.previewTitle, { color: theme.text }]}>
            Theme Preview
          </Text>
          
          <View style={styles.previewSection}>
            <Text style={[styles.previewSectionTitle, { color: theme.text }]}>
              Text & Typography
            </Text>
            <Text style={[styles.previewHeading, { color: theme.text }]}>
              Heading Example
            </Text>
            <Text style={[styles.previewBody, { color: theme.text }]}>
              This is an example of body text in your selected theme. The text color adapts based on your theme selection to ensure readability.
            </Text>
            <TouchableOpacity
              style={[
                styles.previewLink,
              ]}
            >
              <Text style={{ color: theme.primary }}>
                This is a link
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.previewSection}>
            <Text style={[styles.previewSectionTitle, { color: theme.text }]}>
              UI Elements
            </Text>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.previewButton,
                  { backgroundColor: theme.primary }
                ]}
              >
                <Text style={styles.previewButtonText}>
                  Primary Button
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.previewButton,
                  { backgroundColor: theme.secondary }
                ]}
              >
                <Text style={styles.previewButtonText}>
                  Secondary Button
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.previewOutlineButton,
                  { borderColor: theme.primary }
                ]}
              >
                <Text style={{ color: theme.primary }}>
                  Outline Button
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.previewAccentButton,
                  { backgroundColor: theme.accent }
                ]}
              >
                <Text style={styles.previewButtonText}>
                  Accent Button
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.colorGrid}>
            <View style={[styles.colorBox, { backgroundColor: theme.primary }]}>
              <Text style={styles.colorBoxText}>Primary</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: theme.secondary }]}>
              <Text style={styles.colorBoxText}>Secondary</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: theme.accent }]}>
              <Text style={styles.colorBoxText}>Accent</Text>
            </View>
          </View>
        </Card>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  themeTabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  themeTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeThemeTab: {
    borderBottomWidth: 2,
  },
  themeTabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  presetCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  presetName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 8,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  customContainer: {
    gap: 24,
  },
  colorPickerContainer: {
    marginBottom: 8,
  },
  colorPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorPickerLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  colorPickerValue: {
    fontSize: 14,
  },
  colorPickerDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#000',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  previewSection: {
    marginBottom: 24,
  },
  previewSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  previewHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  previewBody: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  previewLink: {
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  previewButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  previewOutlineButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
  },
  previewAccentButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  colorGrid: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  colorBox: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorBoxText: {
    color: '#fff',
    fontWeight: '600',
  },
});