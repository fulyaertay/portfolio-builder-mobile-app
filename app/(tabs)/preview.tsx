import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { usePortfolio } from '@/context/PortfolioContext';
import { Section, Card } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { WebView } from 'react-native-webview';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react-native';

export default function PreviewScreen() {
  const { portfolioData } = usePortfolio();
  const { personalInfo, skills, projects, workExperience, theme } = portfolioData;
  
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const generateHtml = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${personalInfo.name} - Portfolio</title>
        <style>
          :root {
            --primary: ${theme.primary};
            --secondary: ${theme.secondary};
            --accent: ${theme.accent};
            --background: ${theme.background};
            --text: ${theme.text};
            --card-bg: ${theme.cardBackground};
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--background);
            color: var(--text);
            line-height: 1.6;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
          }
          header {
            background-color: var(--card-bg);
            padding: 40px 20px;
            margin-bottom: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .profile {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 30px;
          }
          .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 60px;
            object-fit: cover;
          }
          .profile-info {
            flex: 1;
          }
          .name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .title {
            font-size: 18px;
            font-weight: 500;
            color: var(--secondary);
            margin-bottom: 10px;
          }
          .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 15px;
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .social-links {
            display: flex;
            gap: 15px;
            margin-top: 15px;
          }
          .social-link {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            background-color: rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
          }
          .bio {
            margin-top: 20px;
            max-width: 800px;
          }
          .section {
            margin-bottom: 40px;
          }
          .section-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
            color: var(--text);
          }
          .card {
            background-color: var(--card-bg);
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
          .skill-item {
            margin-bottom: 15px;
          }
          .skill-name {
            font-weight: 600;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
          }
          .skill-percentage {
            color: var(--text);
            opacity: 0.8;
          }
          .progress-bar {
            height: 8px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            overflow: hidden;
          }
          .progress {
            height: 100%;
            background-color: var(--primary);
            border-radius: 4px;
          }
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
          }
          .project-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .project-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
          }
          .project-content {
            padding: 20px;
          }
          .project-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .project-description {
            margin-bottom: 15px;
          }
          .technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
          }
          .tech-badge {
            padding: 5px 12px;
            background-color: rgba(99, 102, 241, 0.1);
            color: var(--primary);
            border-radius: 16px;
            font-size: 14px;
            font-weight: 500;
          }
          .project-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--primary);
            font-weight: 500;
            text-decoration: none;
            margin-top: 10px;
          }
          .experience-card {
            margin-bottom: 25px;
          }
          .company-name {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 5px;
          }
          .position {
            font-size: 16px;
            font-weight: 500;
            color: var(--secondary);
            margin-bottom: 5px;
          }
          .date-range {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 15px;
          }
          .achievements {
            margin-top: 15px;
          }
          .achievements-header {
            font-weight: 600;
            margin-bottom: 8px;
          }
          .achievement {
            padding-left: 15px;
            position: relative;
            margin-bottom: 5px;
          }
          .achievement:before {
            content: "•";
            position: absolute;
            left: 0;
          }
          footer {
            text-align: center;
            margin-top: 50px;
            padding: 20px;
            opacity: 0.7;
            font-size: 14px;
          }
          
          @media (max-width: 768px) {
            .profile {
              flex-direction: column;
              align-items: flex-start;
            }
            .projects-grid {
              grid-template-columns: 1fr;
            }
            .skills-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="profile">
              ${personalInfo.profileImage ? `<img src="${personalInfo.profileImage}" alt="${personalInfo.name}" class="profile-image">` : ''}
              <div class="profile-info">
                <h1 class="name">${personalInfo.name}</h1>
                <div class="title">${personalInfo.title}</div>
                <div class="contact-info">
                  <div class="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>${personalInfo.phone}</span>
                  </div>
                  <div class="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>${personalInfo.email}</span>
                  </div>
                  <div class="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${personalInfo.location}</span>
                  </div>
                </div>
                <div class="social-links">
                  ${personalInfo.socialLinks.linkedin ? `
                    <a href="${personalInfo.socialLinks.linkedin}" class="social-link" target="_blank">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  ` : ''}
                  ${personalInfo.socialLinks.github ? `
                    <a href="${personalInfo.socialLinks.github}" class="social-link" target="_blank">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  ` : ''}
                  ${personalInfo.socialLinks.twitter ? `
                    <a href="${personalInfo.socialLinks.twitter}" class="social-link" target="_blank">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
            <div class="bio">${personalInfo.bio}</div>
          </header>
          
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="card">
              <div class="skills-grid">
                ${skills.map(skill => `
                  <div class="skill-item">
                    <div class="skill-name">
                      <span>${skill.name}</span>
                      <span class="skill-percentage">${skill.proficiency}%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress" style="width: ${skill.proficiency}%"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Projects</h2>
            <div class="projects-grid">
              ${projects.map(project => `
                <div class="project-card">
                  ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
                  <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    ${project.technologies.length > 0 ? `
                      <div class="technologies">
                        ${project.technologies.map(tech => `
                          <span class="tech-badge">${tech}</span>
                        `).join('')}
                      </div>
                    ` : ''}
                    ${project.link ? `
                      <a href="${project.link}" class="project-link" target="_blank">
                        View Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Work Experience</h2>
            ${workExperience.map(experience => `
              <div class="card experience-card">
                <h3 class="company-name">${experience.company}</h3>
                <div class="position">${experience.position}</div>
                <div class="date-range">${experience.startDate} - ${experience.endDate}</div>
                <p>${experience.description}</p>
                ${experience.achievements.length > 0 ? `
                  <div class="achievements">
                    <div class="achievements-header">Key Achievements:</div>
                    ${experience.achievements.map(achievement => `
                      <div class="achievement">${achievement}</div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          
          <footer>
            &copy; ${new Date().getFullYear()} ${personalInfo.name}. All rights reserved.
          </footer>
        </div>
      </body>
      </html>
    `;
  };
  
  const downloadHtml = () => {
    // In a real mobile app, this would use file system API to save the HTML file
    // For web, we can use the Blob and create an anchor element
    if (Platform.OS === 'web') {
      const html = generateHtml();
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personalInfo.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  // This is a simplified mobile view - a condensed version of the portfolio
  const renderMobilePreview = () => (
    <ScrollView style={styles.previewContainer}>
      <View style={[styles.previewHeader, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: personalInfo.profileImage }} 
            style={styles.previewImage}
          />
          <View style={styles.previewInfo}>
            <Text style={[styles.previewName, { color: theme.text }]}>
              {personalInfo.name}
            </Text>
            <Text style={[styles.previewTitle, { color: theme.secondary }]}>
              {personalInfo.title}
            </Text>
          </View>
        </View>
        
        <View style={styles.previewContactInfo}>
          <View style={styles.previewContactItem}>
            <Mail size={16} color={theme.primary} />
            <Text style={[styles.previewContactText, { color: theme.text }]}>
              {personalInfo.email}
            </Text>
          </View>
          
          <View style={styles.previewContactItem}>
            <Phone size={16} color={theme.primary} />
            <Text style={[styles.previewContactText, { color: theme.text }]}>
              {personalInfo.phone}
            </Text>
          </View>
          
          <View style={styles.previewContactItem}>
            <MapPin size={16} color={theme.primary} />
            <Text style={[styles.previewContactText, { color: theme.text }]}>
              {personalInfo.location}
            </Text>
          </View>
        </View>
        
        <View style={styles.previewSocialLinks}>
          {personalInfo.socialLinks.linkedin && (
            <TouchableOpacity style={styles.previewSocialButton}>
              <Linkedin size={20} color={theme.primary} />
            </TouchableOpacity>
          )}
          
          {personalInfo.socialLinks.github && (
            <TouchableOpacity style={styles.previewSocialButton}>
              <Github size={20} color={theme.primary} />
            </TouchableOpacity>
          )}
          
          {personalInfo.socialLinks.twitter && (
            <TouchableOpacity style={styles.previewSocialButton}>
              <Twitter size={20} color={theme.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={[styles.previewBio, { color: theme.text }]}>
          {personalInfo.bio}
        </Text>
      </View>
      
      <View style={styles.previewSection}>
        <Text style={[styles.previewSectionTitle, { color: theme.text }]}>
          Skills
        </Text>
        <View style={[styles.previewCard, { backgroundColor: theme.cardBackground }]}>
          {skills.map((skill) => (
            <View key={skill.id} style={styles.previewSkillItem}>
              <ProgressBar 
                value={skill.proficiency} 
                label={skill.name}
                showPercentage={true}
              />
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.previewSection}>
        <Text style={[styles.previewSectionTitle, { color: theme.text }]}>
          Projects
        </Text>
        {projects.map((project) => (
          <View 
            key={project.id} 
            style={[
              styles.previewCard, 
              { backgroundColor: theme.cardBackground }
            ]}
          >
            {project.image && (
              <Image 
                source={{ uri: project.image }} 
                style={styles.previewProjectImage}
                resizeMode="cover"
              />
            )}
            <Text style={[styles.previewProjectTitle, { color: theme.text }]}>
              {project.title}
            </Text>
            <Text style={[styles.previewProjectDescription, { color: theme.text }]}>
              {project.description}
            </Text>
            
            {project.technologies.length > 0 && (
              <View style={styles.previewTechnologies}>
                {project.technologies.map((tech, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.previewTechBadge, 
                      { backgroundColor: theme.primary + '20' }
                    ]}
                  >
                    <Text style={[styles.previewTechText, { color: theme.primary }]}>
                      {tech}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            
            {project.link && (
              <TouchableOpacity 
                style={[
                  styles.previewProjectLink,
                  { borderColor: theme.primary }
                ]}
              >
                <ExternalLink size={16} color={theme.primary} />
                <Text style={[styles.previewLinkText, { color: theme.primary }]}>
                  View Project
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.previewSection}>
        <Text style={[styles.previewSectionTitle, { color: theme.text }]}>
          Work Experience
        </Text>
        {workExperience.map((experience) => (
          <View 
            key={experience.id} 
            style={[
              styles.previewCard, 
              { backgroundColor: theme.cardBackground }
            ]}
          >
            <Text style={[styles.previewCompanyName, { color: theme.text }]}>
              {experience.company}
            </Text>
            <Text style={[styles.previewPosition, { color: theme.secondary }]}>
              {experience.position}
            </Text>
            <Text style={[styles.previewDateRange, { color: theme.text + '80' }]}>
              {experience.startDate} - {experience.endDate}
            </Text>
            <Text style={[styles.previewExperienceDescription, { color: theme.text }]}>
              {experience.description}
            </Text>
            
            {experience.achievements.length > 0 && (
              <View style={styles.previewAchievements}>
                <Text style={[styles.previewAchievementsHeader, { color: theme.text }]}>
                  Key Achievements:
                </Text>
                {experience.achievements.map((achievement, index) => (
                  <Text 
                    key={index} 
                    style={[styles.previewAchievement, { color: theme.text }]}
                  >
                    • {achievement}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.previewFooter}>
        <Text style={[styles.previewFooterText, { color: theme.text + '70' }]}>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
  
  // For desktop view, we use WebView to show HTML rendered version
  const renderDesktopPreview = () => (
    <View style={styles.webViewContainer}>
      <WebView
        originWhitelist={['*']}
        source={{ html: generateHtml() }}
        style={styles.webView}
      />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.previewModeToggle}>
        <TouchableOpacity
          style={[
            styles.previewModeButton,
            previewMode === 'mobile' && [
              styles.activePreviewMode,
              { borderBottomColor: theme.primary }
            ]
          ]}
          onPress={() => setPreviewMode('mobile')}
        >
          <Text 
            style={[
              styles.previewModeText,
              { color: previewMode === 'mobile' ? theme.primary : theme.text }
            ]}
          >
            Mobile View
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.previewModeButton,
            previewMode === 'desktop' && [
              styles.activePreviewMode,
              { borderBottomColor: theme.primary }
            ]
          ]}
          onPress={() => setPreviewMode('desktop')}
        >
          <Text 
            style={[
              styles.previewModeText,
              { color: previewMode === 'desktop' ? theme.primary : theme.text }
            ]}
          >
            Desktop View
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.previewContent}>
        {previewMode === 'mobile' ? renderMobilePreview() : renderDesktopPreview()}
      </View>
      
      <View style={styles.exportSection}>
        <Button
          title="Export Portfolio"
          onPress={() => setShowExportOptions(true)}
          style={{ marginBottom: 16 }}
        />
        
        {showExportOptions && (
          <Card>
            <Text style={[styles.exportTitle, { color: theme.text }]}>
              Export Options
            </Text>
            
            <Text style={[styles.exportDescription, { color: theme.text }]}>
              Download your portfolio as an HTML file to host anywhere.
            </Text>
            
            <View style={styles.exportActions}>
              <Button
                title="Download HTML"
                onPress={downloadHtml}
                variant="outline"
              />
              <Button
                title="Cancel"
                onPress={() => setShowExportOptions(false)}
                variant="secondary"
                style={{ marginTop: 8 }}
              />
            </View>
          </Card>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewModeToggle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  previewModeButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activePreviewMode: {
    borderBottomWidth: 2,
  },
  previewModeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  previewContent: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    margin: 16,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    padding: 16,
  },
  previewHeader: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  previewInfo: {
    flex: 1,
  },
  previewName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  previewContactInfo: {
    marginBottom: 16,
  },
  previewContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewContactText: {
    marginLeft: 8,
  },
  previewSocialLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  previewSocialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  previewBio: {
    fontSize: 15,
    lineHeight: 22,
  },
  previewSection: {
    marginBottom: 24,
  },
  previewSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  previewCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  previewSkillItem: {
    marginBottom: 8,
  },
  previewProjectImage: {
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  previewProjectTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  previewProjectDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  previewTechnologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  previewTechBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  previewTechText: {
    fontSize: 14,
    fontWeight: '500',
  },
  previewProjectLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  previewLinkText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  previewCompanyName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewPosition: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  previewDateRange: {
    fontSize: 14,
    marginBottom: 12,
  },
  previewExperienceDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  previewAchievements: {
    marginTop: 8,
  },
  previewAchievementsHeader: {
    fontWeight: '600',
    marginBottom: 8,
  },
  previewAchievement: {
    paddingLeft: 8,
    marginBottom: 4,
  },
  previewFooter: {
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  previewFooterText: {
    fontSize: 14,
  },
  exportSection: {
    padding: 16,
  },
  exportTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  exportDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  exportActions: {
    gap: 8,
  },
});