import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { usePortfolio } from '@/context/PortfolioContext';
import { Section, Card } from '@/components/ui/Section';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react-native';

export default function ProfileScreen() {
  const { portfolioData, updatePersonalInfo } = usePortfolio();
  const { personalInfo, theme } = portfolioData;
  
  const [formData, setFormData] = useState(personalInfo);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  
  const handleSave = () => {
    updatePersonalInfo(formData);
    setIsEditing(false);
  };
  
  const renderViewMode = () => (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: personalInfo.profileImage }} 
            style={styles.profileImage}
          />
          <View style={styles.nameContainer}>
            <Text style={[styles.name, { color: theme.text }]}>{personalInfo.name}</Text>
            <Text style={[styles.title, { color: theme.secondary }]}>{personalInfo.title}</Text>
          </View>
        </View>
        
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Mail size={18} color={theme.primary} />
            <Text style={[styles.contactText, { color: theme.text }]}>{personalInfo.email}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <Phone size={18} color={theme.primary} />
            <Text style={[styles.contactText, { color: theme.text }]}>{personalInfo.phone}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <MapPin size={18} color={theme.primary} />
            <Text style={[styles.contactText, { color: theme.text }]}>{personalInfo.location}</Text>
          </View>
        </View>
        
        <View style={styles.socialLinks}>
          {personalInfo.socialLinks.linkedin && (
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => Linking.openURL(personalInfo.socialLinks.linkedin)}
            >
              <Linkedin size={22} color={theme.primary} />
            </TouchableOpacity>
          )}
          {personalInfo.socialLinks.github && (
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => Linking.openURL(personalInfo.socialLinks.github)}
            >
              <Github size={22} color={theme.primary} />
            </TouchableOpacity>
          )}
          {personalInfo.socialLinks.twitter && (
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => Linking.openURL(personalInfo.socialLinks.twitter)}
            >
              <Twitter size={22} color={theme.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.bioContainer}>
          <Text style={[styles.bioText, { color: theme.text }]}>{personalInfo.bio}</Text>
        </View>
      </Card>
      
      <Button 
        title="Edit Profile Information" 
        onPress={() => setIsEditing(true)}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
  
  const renderEditMode = () => (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Section title="Personal Information">
        <Card>
          <Input
            label="Profile Image URL"
            value={formData.profileImage}
            onChangeText={(value) => handleChange('profileImage', value)}
            placeholder="https://example.com/profile.jpg"
          />
          
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            placeholder="John Doe"
          />
          
          <Input
            label="Professional Title"
            value={formData.title}
            onChangeText={(value) => handleChange('title', value)}
            placeholder="Full Stack Developer"
          />
          
          <TextArea
            label="Bio"
            value={formData.bio}
            onChangeText={(value) => handleChange('bio', value)}
            placeholder="Write a brief description about yourself..."
            rows={4}
          />
        </Card>
      </Section>
      
      <Section title="Contact Information">
        <Card>
          <Input
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="john.doe@example.com"
            keyboardType="email-address"
          />
          
          <Input
            label="Phone"
            value={formData.phone}
            onChangeText={(value) => handleChange('phone', value)}
            placeholder="+1 (123) 456-7890"
            keyboardType="phone-pad"
          />
          
          <Input
            label="Location"
            value={formData.location}
            onChangeText={(value) => handleChange('location', value)}
            placeholder="San Francisco, CA"
          />
        </Card>
      </Section>
      
      <Section title="Social Links">
        <Card>
          <Input
            label="LinkedIn"
            value={formData.socialLinks.linkedin}
            onChangeText={(value) => handleChange('socialLinks.linkedin', value)}
            placeholder="https://linkedin.com/in/johndoe"
          />
          
          <Input
            label="GitHub"
            value={formData.socialLinks.github}
            onChangeText={(value) => handleChange('socialLinks.github', value)}
            placeholder="https://github.com/johndoe"
          />
          
          <Input
            label="Twitter"
            value={formData.socialLinks.twitter}
            onChangeText={(value) => handleChange('socialLinks.twitter', value)}
            placeholder="https://twitter.com/johndoe"
          />
        </Card>
      </Section>
      
      <View style={styles.buttonGroup}>
        <Button 
          title="Cancel" 
          variant="outline"
          onPress={() => {
            setFormData(personalInfo);
            setIsEditing(false);
          }}
          style={{ flex: 1, marginRight: 8 }}
        />
        
        <Button 
          title="Save Changes" 
          onPress={handleSave}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </ScrollView>
  );
  
  return isEditing ? renderEditMode() : renderViewMode();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
  },
  socialLinks: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bioContainer: {
    marginTop: 8,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 24,
  },
});