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
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { WorkExperience } from '@/types/portfolio';
import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react-native';

export default function ExperienceScreen() {
  const { portfolioData, addWorkExperience, updateWorkExperience, removeWorkExperience } = usePortfolio();
  const { workExperience, theme } = portfolioData;
  
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);
  const [newExperience, setNewExperience] = useState<Omit<WorkExperience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: [],
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [achievementInput, setAchievementInput] = useState('');
  const [editAchievementInput, setEditAchievementInput] = useState('');
  
  const handleAddExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      addWorkExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: [],
      });
      setAchievementInput('');
      setShowAddForm(false);
    }
  };
  
  const handleUpdateExperience = () => {
    if (editingExperience && editingExperience.company.trim() && editingExperience.position.trim()) {
      updateWorkExperience(editingExperience);
      setEditingExperience(null);
      setEditAchievementInput('');
    }
  };
  
  const handleDeleteExperience = (id: string) => {
    removeWorkExperience(id);
  };
  
  const addAchievement = () => {
    if (achievementInput.trim()) {
      setNewExperience(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput('');
    }
  };
  
  const removeAchievement = (index: number) => {
    setNewExperience(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };
  
  const addEditAchievement = () => {
    if (editingExperience && editAchievementInput.trim()) {
      setEditingExperience({
        ...editingExperience,
        achievements: [...editingExperience.achievements, editAchievementInput.trim()],
      });
      setEditAchievementInput('');
    }
  };
  
  const removeEditAchievement = (index: number) => {
    if (editingExperience) {
      setEditingExperience({
        ...editingExperience,
        achievements: editingExperience.achievements.filter((_, i) => i !== index),
      });
    }
  };
  
  const renderExperienceItem = (experience: WorkExperience) => {
    if (editingExperience && editingExperience.id === experience.id) {
      return (
        <Card key={experience.id} style={styles.editCard}>
          <Text style={[styles.formTitle, { color: theme.text }]}>
            Edit Work Experience
          </Text>
          
          <Input
            label="Company Name"
            value={editingExperience.company}
            onChangeText={(value) => 
              setEditingExperience({ ...editingExperience, company: value })
            }
            placeholder="Company, Inc."
          />
          
          <Input
            label="Position"
            value={editingExperience.position}
            onChangeText={(value) => 
              setEditingExperience({ ...editingExperience, position: value })
            }
            placeholder="Senior Developer"
          />
          
          <View style={styles.dateContainer}>
            <Input
              label="Start Date"
              value={editingExperience.startDate}
              onChangeText={(value) => 
                setEditingExperience({ ...editingExperience, startDate: value })
              }
              placeholder="Jan 2020"
              containerStyle={styles.dateInput}
            />
            
            <Input
              label="End Date"
              value={editingExperience.endDate}
              onChangeText={(value) => 
                setEditingExperience({ ...editingExperience, endDate: value })
              }
              placeholder="Present"
              containerStyle={styles.dateInput}
            />
          </View>
          
          <TextArea
            label="Job Description"
            value={editingExperience.description}
            onChangeText={(value) => 
              setEditingExperience({ ...editingExperience, description: value })
            }
            placeholder="Describe your responsibilities..."
            rows={3}
          />
          
          <View style={styles.achievementsSection}>
            <Text style={[styles.achievementsTitle, { color: theme.text }]}>
              Key Achievements
            </Text>
            
            <View style={styles.achievementInputContainer}>
              <Input
                value={editAchievementInput}
                onChangeText={setEditAchievementInput}
                placeholder="Add an achievement"
                containerStyle={{ flex: 1, marginBottom: 0 }}
              />
              <Button
                title="Add"
                size="small"
                onPress={addEditAchievement}
                disabled={!editAchievementInput.trim()}
                style={{ marginLeft: 8 }}
              />
            </View>
            
            <View style={styles.achievementsList}>
              {editingExperience.achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementItem}>
                  <Text style={[styles.achievementText, { color: theme.text }]}>
                    • {achievement}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeEditAchievement(index)}
                    style={styles.removeAchievement}
                  >
                    <Text style={styles.removeAchievementText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.editActions}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => setEditingExperience(null)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              title="Save Changes"
              onPress={handleUpdateExperience}
              disabled={!editingExperience.company.trim() || !editingExperience.position.trim()}
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </Card>
      );
    }
    
    return (
      <Card key={experience.id} style={styles.experienceCard}>
        <View style={styles.experienceHeader}>
          <View>
            <Text style={[styles.companyName, { color: theme.text }]}>
              {experience.company}
            </Text>
            <Text style={[styles.position, { color: theme.secondary }]}>
              {experience.position}
            </Text>
            <View style={styles.dateRange}>
              <Text style={[styles.date, { color: theme.text + '80' }]}>
                {experience.startDate} - {experience.endDate}
              </Text>
            </View>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setEditingExperience(experience)}
            >
              <Edit2 size={18} color={theme.secondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDeleteExperience(experience.id)}
            >
              <Trash2 size={18} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={[styles.description, { color: theme.text }]}>
          {experience.description}
        </Text>
        
        {experience.achievements.length > 0 && (
          <View style={styles.achievements}>
            <Text style={[styles.achievementsHeader, { color: theme.text }]}>
              Key Achievements:
            </Text>
            {experience.achievements.map((achievement, index) => (
              <Text key={index} style={[styles.achievement, { color: theme.text }]}>
                • {achievement}
              </Text>
            ))}
          </View>
        )}
      </Card>
    );
  };
  
  const renderAddForm = () => (
    <Card style={styles.addCard}>
      <Text style={[styles.formTitle, { color: theme.text }]}>
        Add New Work Experience
      </Text>
      
      <Input
        label="Company Name"
        value={newExperience.company}
        onChangeText={(value) => 
          setNewExperience({ ...newExperience, company: value })
        }
        placeholder="Company, Inc."
      />
      
      <Input
        label="Position"
        value={newExperience.position}
        onChangeText={(value) => 
          setNewExperience({ ...newExperience, position: value })
        }
        placeholder="Senior Developer"
      />
      
      <View style={styles.dateContainer}>
        <Input
          label="Start Date"
          value={newExperience.startDate}
          onChangeText={(value) => 
            setNewExperience({ ...newExperience, startDate: value })
          }
          placeholder="Jan 2020"
          containerStyle={styles.dateInput}
        />
        
        <Input
          label="End Date"
          value={newExperience.endDate}
          onChangeText={(value) => 
            setNewExperience({ ...newExperience, endDate: value })
          }
          placeholder="Present"
          containerStyle={styles.dateInput}
        />
      </View>
      
      <TextArea
        label="Job Description"
        value={newExperience.description}
        onChangeText={(value) => 
          setNewExperience({ ...newExperience, description: value })
        }
        placeholder="Describe your responsibilities..."
        rows={3}
      />
      
      <View style={styles.achievementsSection}>
        <Text style={[styles.achievementsTitle, { color: theme.text }]}>
          Key Achievements
        </Text>
        
        <View style={styles.achievementInputContainer}>
          <Input
            value={achievementInput}
            onChangeText={setAchievementInput}
            placeholder="Add an achievement"
            containerStyle={{ flex: 1, marginBottom: 0 }}
          />
          <Button
            title="Add"
            size="small"
            onPress={addAchievement}
            disabled={!achievementInput.trim()}
            style={{ marginLeft: 8 }}
          />
        </View>
        
        <View style={styles.achievementsList}>
          {newExperience.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Text style={[styles.achievementText, { color: theme.text }]}>
                • {achievement}
              </Text>
              <TouchableOpacity
                onPress={() => removeAchievement(index)}
                style={styles.removeAchievement}
              >
                <Text style={styles.removeAchievementText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.buttonGroup}>
        <Button
          title="Cancel"
          variant="outline"
          onPress={() => setShowAddForm(false)}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button
          title="Add Experience"
          onPress={handleAddExperience}
          disabled={!newExperience.company.trim() || !newExperience.position.trim()}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </Card>
  );
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Section title="Work Experience">
        {workExperience.length === 0 ? (
          <Card>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No work experience added yet. Add your first job!
            </Text>
          </Card>
        ) : (
          workExperience.map(renderExperienceItem)
        )}
      </Section>
      
      {showAddForm ? (
        renderAddForm()
      ) : (
        <Button
          title="Add New Experience"
          icon={<Plus size={18} color="#fff" />}
          onPress={() => setShowAddForm(true)}
          style={styles.addButton}
        />
      )}
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
  experienceCard: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
  },
  position: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  dateRange: {
    marginTop: 6,
  },
  date: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  achievements: {
    marginTop: 8,
  },
  achievementsHeader: {
    fontWeight: '600',
    marginBottom: 8,
  },
  achievement: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
    paddingLeft: 8,
  },
  editCard: {
    marginBottom: 16,
  },
  addCard: {
    marginTop: 16,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateInput: {
    flex: 1,
  },
  achievementsSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  achievementInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementsList: {
    gap: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
  },
  achievementText: {
    fontSize: 15,
    flex: 1,
  },
  removeAchievement: {
    padding: 4,
  },
  removeAchievementText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748b',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  editActions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  addButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 16,
  },
});