import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { usePortfolio } from '@/context/PortfolioContext';
import { Section, Card } from '@/components/ui/Section';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Project } from '@/types/portfolio';
import { Plus, ExternalLink, CreditCard as Edit2, Trash2 } from 'lucide-react-native';

export default function ProjectsScreen() {
  const { portfolioData, addProject, updateProject, removeProject } = usePortfolio();
  const { projects, theme } = portfolioData;
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    image: '',
    link: '',
    technologies: [],
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [editTechInput, setEditTechInput] = useState('');
  
  const handleAddProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      addProject(newProject);
      setNewProject({
        title: '',
        description: '',
        image: '',
        link: '',
        technologies: [],
      });
      setTechInput('');
      setShowAddForm(false);
    }
  };
  
  const handleUpdateProject = () => {
    if (editingProject && editingProject.title.trim() && editingProject.description.trim()) {
      updateProject(editingProject);
      setEditingProject(null);
      setEditTechInput('');
    }
  };
  
  const handleDeleteProject = (id: string) => {
    removeProject(id);
  };
  
  const addTechnology = () => {
    if (techInput.trim()) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };
  
  const removeTechnology = (index: number) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };
  
  const addEditTechnology = () => {
    if (editingProject && editTechInput.trim()) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, editTechInput.trim()],
      });
      setEditTechInput('');
    }
  };
  
  const removeEditTechnology = (index: number) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: editingProject.technologies.filter((_, i) => i !== index),
      });
    }
  };
  
  const renderProjectItem = (project: Project) => {
    if (editingProject && editingProject.id === project.id) {
      return (
        <Card key={project.id} style={styles.editCard}>
          <Text style={[styles.formTitle, { color: theme.text }]}>
            Edit Project
          </Text>
          
          <Input
            label="Project Title"
            value={editingProject.title}
            onChangeText={(value) => 
              setEditingProject({ ...editingProject, title: value })
            }
            placeholder="My Awesome Project"
          />
          
          <TextArea
            label="Project Description"
            value={editingProject.description}
            onChangeText={(value) => 
              setEditingProject({ ...editingProject, description: value })
            }
            placeholder="Describe your project..."
            rows={3}
          />
          
          <Input
            label="Project Image URL"
            value={editingProject.image}
            onChangeText={(value) => 
              setEditingProject({ ...editingProject, image: value })
            }
            placeholder="https://example.com/project-image.jpg"
          />
          
          <Input
            label="Project Link"
            value={editingProject.link}
            onChangeText={(value) => 
              setEditingProject({ ...editingProject, link: value })
            }
            placeholder="https://myproject.com"
          />
          
          <View style={styles.technologiesSection}>
            <Text style={[styles.techTitle, { color: theme.text }]}>
              Technologies Used
            </Text>
            
            <View style={styles.techInputContainer}>
              <Input
                value={editTechInput}
                onChangeText={setEditTechInput}
                placeholder="Add a technology"
                containerStyle={{ flex: 1, marginBottom: 0 }}
              />
              <Button
                title="Add"
                size="small"
                onPress={addEditTechnology}
                disabled={!editTechInput.trim()}
                style={{ marginLeft: 8 }}
              />
            </View>
            
            <View style={styles.techList}>
              {editingProject.technologies.map((tech, index) => (
                <View key={index} style={styles.techItem}>
                  <Text style={[styles.techText, { color: theme.text }]}>
                    {tech}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeEditTechnology(index)}
                    style={styles.removeTech}
                  >
                    <Text style={styles.removeTechText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.editActions}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => setEditingProject(null)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              title="Save Changes"
              onPress={handleUpdateProject}
              disabled={!editingProject.title.trim() || !editingProject.description.trim()}
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </Card>
      );
    }
    
    return (
      <Card key={project.id} style={styles.projectCard}>
        <View style={styles.projectHeader}>
          <View style={styles.projectContent}>
            <Text style={[styles.projectTitle, { color: theme.text }]}>
              {project.title}
            </Text>
            
            <View style={styles.projectActions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setEditingProject(project)}
              >
                <Edit2 size={18} color={theme.secondary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteProject(project.id)}
              >
                <Trash2 size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
          
          {project.image && (
            <Image 
              source={{ uri: project.image }} 
              style={styles.projectImage}
              resizeMode="cover"
            />
          )}
          
          <Text style={[styles.projectDescription, { color: theme.text }]}>
            {project.description}
          </Text>
          
          {project.technologies.length > 0 && (
            <View style={styles.technologies}>
              {project.technologies.map((tech, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.techBadge, 
                    { backgroundColor: theme.primary + '20' }
                  ]}
                >
                  <Text style={[styles.techBadgeText, { color: theme.primary }]}>
                    {tech}
                  </Text>
                </View>
              ))}
            </View>
          )}
          
          {project.link && (
            <TouchableOpacity 
              style={[
                styles.linkButton,
                { borderColor: theme.primary }
              ]}
            >
              <ExternalLink size={16} color={theme.primary} />
              <Text style={[styles.linkText, { color: theme.primary }]}>
                View Project
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    );
  };
  
  const renderAddForm = () => (
    <Card style={styles.addCard}>
      <Text style={[styles.formTitle, { color: theme.text }]}>
        Add New Project
      </Text>
      
      <Input
        label="Project Title"
        value={newProject.title}
        onChangeText={(value) => 
          setNewProject({ ...newProject, title: value })
        }
        placeholder="My Awesome Project"
      />
      
      <TextArea
        label="Project Description"
        value={newProject.description}
        onChangeText={(value) => 
          setNewProject({ ...newProject, description: value })
        }
        placeholder="Describe your project..."
        rows={3}
      />
      
      <Input
        label="Project Image URL"
        value={newProject.image}
        onChangeText={(value) => 
          setNewProject({ ...newProject, image: value })
        }
        placeholder="https://example.com/project-image.jpg"
      />
      
      <Input
        label="Project Link"
        value={newProject.link}
        onChangeText={(value) => 
          setNewProject({ ...newProject, link: value })
        }
        placeholder="https://myproject.com"
      />
      
      <View style={styles.technologiesSection}>
        <Text style={[styles.techTitle, { color: theme.text }]}>
          Technologies Used
        </Text>
        
        <View style={styles.techInputContainer}>
          <Input
            value={techInput}
            onChangeText={setTechInput}
            placeholder="Add a technology"
            containerStyle={{ flex: 1, marginBottom: 0 }}
          />
          <Button
            title="Add"
            size="small"
            onPress={addTechnology}
            disabled={!techInput.trim()}
            style={{ marginLeft: 8 }}
          />
        </View>
        
        <View style={styles.techList}>
          {newProject.technologies.map((tech, index) => (
            <View key={index} style={styles.techItem}>
              <Text style={[styles.techText, { color: theme.text }]}>
                {tech}
              </Text>
              <TouchableOpacity
                onPress={() => removeTechnology(index)}
                style={styles.removeTech}
              >
                <Text style={styles.removeTechText}>×</Text>
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
          title="Add Project"
          onPress={handleAddProject}
          disabled={!newProject.title.trim() || !newProject.description.trim()}
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
      <Section title="Projects">
        {projects.length === 0 ? (
          <Card>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No projects added yet. Add your first project!
            </Text>
          </Card>
        ) : (
          projects.map(renderProjectItem)
        )}
      </Section>
      
      {showAddForm ? (
        renderAddForm()
      ) : (
        <Button
          title="Add New Project"
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
  projectCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  projectHeader: {
    gap: 12,
  },
  projectContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  projectActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  projectImage: {
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
  },
  projectDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  techBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  techBadgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  linkText: {
    marginLeft: 8,
    fontWeight: '500',
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
  technologiesSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  techInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  techText: {
    fontSize: 14,
  },
  removeTech: {
    marginLeft: 6,
  },
  removeTechText: {
    fontSize: 16,
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