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
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Skill } from '@/types/portfolio';
import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react-native';

export default function SkillsScreen() {
  const { portfolioData, addSkill, updateSkill, removeSkill } = usePortfolio();
  const { skills, theme } = portfolioData;
  
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState({
    name: '',
    proficiency: 75,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({
        name: '',
        proficiency: 75,
      });
      setShowAddForm(false);
    }
  };
  
  const handleUpdateSkill = () => {
    if (editingSkill && editingSkill.name.trim()) {
      updateSkill(editingSkill);
      setEditingSkill(null);
    }
  };
  
  const handleDeleteSkill = (id: string) => {
    removeSkill(id);
  };
  
  const renderSkillItem = (skill: Skill) => {
    if (editingSkill && editingSkill.id === skill.id) {
      return (
        <Card key={skill.id} style={styles.editCard}>
          <Input
            label="Skill Name"
            value={editingSkill.name}
            onChangeText={(value) => 
              setEditingSkill({ ...editingSkill, name: value })
            }
            placeholder="e.g. React, JavaScript, UI Design"
          />
          
          <View style={styles.sliderContainer}>
            <Text style={[styles.sliderLabel, { color: theme.text }]}>
              Proficiency: {editingSkill.proficiency}%
            </Text>
            <Input
              value={editingSkill.proficiency.toString()}
              onChangeText={(value) => {
                const num = parseInt(value);
                if (!isNaN(num) && num >= 0 && num <= 100) {
                  setEditingSkill({ ...editingSkill, proficiency: num });
                }
              }}
              keyboardType="numeric"
              placeholder="75"
            />
          </View>
          
          <View style={styles.editActions}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => setEditingSkill(null)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              title="Save"
              onPress={handleUpdateSkill}
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </Card>
      );
    }
    
    return (
      <Card key={skill.id} style={styles.skillCard}>
        <View style={styles.skillHeader}>
          <Text style={[styles.skillName, { color: theme.text }]}>
            {skill.name}
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setEditingSkill(skill)}
            >
              <Edit2 size={18} color={theme.secondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDeleteSkill(skill.id)}
            >
              <Trash2 size={18} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
        
        <ProgressBar value={skill.proficiency} />
      </Card>
    );
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Section title="Skills">
        {skills.length === 0 ? (
          <Card>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No skills added yet. Add your first skill!
            </Text>
          </Card>
        ) : (
          skills.map(renderSkillItem)
        )}
      </Section>
      
      {showAddForm ? (
        <Card style={styles.addCard}>
          <Text style={[styles.formTitle, { color: theme.text }]}>
            Add New Skill
          </Text>
          
          <Input
            label="Skill Name"
            value={newSkill.name}
            onChangeText={(value) => 
              setNewSkill({ ...newSkill, name: value })
            }
            placeholder="e.g. React, JavaScript, UI Design"
          />
          
          <View style={styles.sliderContainer}>
            <Text style={[styles.sliderLabel, { color: theme.text }]}>
              Proficiency: {newSkill.proficiency}%
            </Text>
            <Input
              value={newSkill.proficiency.toString()}
              onChangeText={(value) => {
                const num = parseInt(value);
                if (!isNaN(num) && num >= 0 && num <= 100) {
                  setNewSkill({ ...newSkill, proficiency: num });
                }
              }}
              keyboardType="numeric"
              placeholder="75"
            />
          </View>
          
          <View style={styles.buttonGroup}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => setShowAddForm(false)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              title="Add Skill"
              onPress={handleAddSkill}
              disabled={!newSkill.name.trim()}
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </Card>
      ) : (
        <Button
          title="Add New Skill"
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
  skillCard: {
    marginBottom: 16,
  },
  editCard: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
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
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 8,
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