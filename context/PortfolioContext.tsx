import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  PortfolioData, 
  PersonalInfo, 
  Skill, 
  Project, 
  WorkExperience, 
  ThemeColors 
} from '../types/portfolio';

// Default data
const defaultPersonalInfo: PersonalInfo = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  email: 'john.doe@example.com',
  phone: '+1 (123) 456-7890',
  location: 'San Francisco, CA',
  bio: 'Passionate developer with experience in building web and mobile applications.',
  profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
  },
};

const defaultSkills: Skill[] = [
  { id: '1', name: 'React', proficiency: 90 },
  { id: '2', name: 'JavaScript', proficiency: 85 },
  { id: '3', name: 'CSS', proficiency: 80 },
  { id: '4', name: 'Node.js', proficiency: 75 },
];

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: 'https://example.com/project1',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A productivity app for managing tasks and projects',
    image: 'https://images.pexels.com/photos/6956353/pexels-photo-6956353.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: 'https://example.com/project2',
    technologies: ['React Native', 'Firebase'],
  },
];

const defaultWorkExperience: WorkExperience[] = [
  {
    id: '1',
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer',
    startDate: 'Jan 2021',
    endDate: 'Present',
    description: 'Leading development of web and mobile applications',
    achievements: [
      'Implemented CI/CD pipeline, reducing deployment time by 40%',
      'Led a team of 5 developers on multiple client projects',
    ],
  },
  {
    id: '2',
    company: 'Digital Innovations',
    position: 'Full Stack Developer',
    startDate: 'Jun 2018',
    endDate: 'Dec 2020',
    description: 'Worked on various web and mobile applications',
    achievements: [
      'Developed a real-time analytics dashboard for clients',
      'Optimized database queries, improving performance by 30%',
    ],
  },
];

const defaultTheme: ThemeColors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#ec4899',
  background: '#f8fafc',
  text: '#0f172a',
  cardBackground: '#ffffff',
};

const defaultPortfolioData: PortfolioData = {
  personalInfo: defaultPersonalInfo,
  skills: defaultSkills,
  projects: defaultProjects,
  workExperience: defaultWorkExperience,
  theme: defaultTheme,
};

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  removeProject: (id: string) => void;
  addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (experience: WorkExperience) => void;
  removeWorkExperience: (id: string) => void;
  updateTheme: (theme: ThemeColors) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  
  // Load data from storage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('portfolioData');
        if (savedData) {
          setPortfolioData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Save data to storage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      } catch (error) {
        console.error('Error saving portfolio data:', error);
      }
    };
    
    saveData();
  }, [portfolioData]);
  
  const updatePersonalInfo = (info: PersonalInfo) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: info,
    }));
  };
  
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = {
      ...skill,
      id: Date.now().toString(),
    };
    
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };
  
  const updateSkill = (skill: Skill) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === skill.id ? skill : s),
    }));
  };
  
  const removeSkill = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  };
  
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };
  
  const updateProject = (project: Project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === project.id ? project : p),
    }));
  };
  
  const removeProject = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };
  
  const addWorkExperience = (experience: Omit<WorkExperience, 'id'>) => {
    const newExperience = {
      ...experience,
      id: Date.now().toString(),
    };
    
    setPortfolioData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
    }));
  };
  
  const updateWorkExperience = (experience: WorkExperience) => {
    setPortfolioData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(e => e.id === experience.id ? experience : e),
    }));
  };
  
  const removeWorkExperience = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(e => e.id !== id),
    }));
  };
  
  const updateTheme = (theme: ThemeColors) => {
    setPortfolioData(prev => ({
      ...prev,
      theme,
    }));
  };
  
  const value = {
    portfolioData,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    updateTheme,
  };
  
  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};