import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface StudyMaterial {
  id: string;
  title: string;
  type: 'lecture' | 'research' | 'capture' | 'assignment' | 'quiz';
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  progress: number;
  date: string;
  tags: string[];
}

const computerScienceMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    type: 'lecture',
    duration: '45 min',
    difficulty: 'Beginner',
    description: 'Fundamental concepts of arrays, linked lists, stacks, and queues',
    progress: 85,
    date: '2024-01-15',
    tags: ['Data Structures', 'Fundamentals', 'Arrays']
  },
  {
    id: '2',
    title: 'Algorithm Complexity Analysis',
    type: 'research',
    difficulty: 'Intermediate',
    description: 'Big O notation, time and space complexity analysis',
    progress: 60,
    date: '2024-01-18',
    tags: ['Algorithms', 'Big O', 'Complexity']
  },
  {
    id: '3',
    title: 'Binary Search Trees - Live Session',
    type: 'capture',
    duration: '1h 20min',
    difficulty: 'Intermediate',
    description: 'Recorded live coding session on BST implementation',
    progress: 100,
    date: '2024-01-20',
    tags: ['Trees', 'BST', 'Implementation']
  },
  {
    id: '4',
    title: 'Object-Oriented Programming Principles',
    type: 'lecture',
    duration: '55 min',
    difficulty: 'Beginner',
    description: 'Encapsulation, inheritance, polymorphism, and abstraction',
    progress: 90,
    date: '2024-01-22',
    tags: ['OOP', 'Design Patterns', 'Principles']
  },
  {
    id: '5',
    title: 'Machine Learning Fundamentals Research',
    type: 'research',
    difficulty: 'Advanced',
    description: 'Latest research papers on supervised and unsupervised learning',
    progress: 30,
    date: '2024-01-25',
    tags: ['ML', 'AI', 'Research', 'Algorithms']
  },
  {
    id: '6',
    title: 'Database Design Assignment',
    type: 'assignment',
    difficulty: 'Intermediate',
    description: 'Design a normalized database schema for an e-commerce system',
    progress: 0,
    date: '2024-01-28',
    tags: ['Database', 'SQL', 'Design', 'Normalization']
  },
  {
    id: '7',
    title: 'Network Protocols Deep Dive',
    type: 'lecture',
    duration: '1h 10min',
    difficulty: 'Advanced',
    description: 'TCP/IP, HTTP/HTTPS, DNS, and modern web protocols',
    progress: 45,
    date: '2024-01-30',
    tags: ['Networking', 'Protocols', 'Web', 'Security']
  },
  {
    id: '8',
    title: 'Sorting Algorithms Quiz',
    type: 'quiz',
    duration: '30 min',
    difficulty: 'Intermediate',
    description: 'Test your knowledge on bubble sort, merge sort, and quicksort',
    progress: 0,
    date: '2024-02-02',
    tags: ['Algorithms', 'Sorting', 'Assessment']
  }
];

export default function ModuleExampleScreen() {
  const colors = Colors.light;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'lecture' | 'research' | 'capture' | 'assignment' | 'quiz'>('all');

  const filteredMaterials = computerScienceMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || material.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture': return 'play.circle.fill';
      case 'research': return 'doc.text.magnifyingglass';
      case 'capture': return 'video.fill';
      case 'assignment': return 'pencil.and.outline';
      case 'quiz': return 'questionmark.circle.fill';
      default: return 'doc.fill';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return colors.primary;
      case 'research': return colors.secondary;
      case 'capture': return colors.accent;
      case 'assignment': return colors.warning;
      case 'quiz': return '#9C27B0';
      default: return colors.icon;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return colors.icon;
    }
  };

  const handleMaterialPress = (material: StudyMaterial) => {
    router.push({
      pathname: '/specificmoduleExample',
      params: { 
        materialId: material.id,
        title: material.title,
        type: material.type,
        description: material.description,
        difficulty: material.difficulty,
        tags: JSON.stringify(material.tags)
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText style={[styles.headerTitle, { color: 'white' }]}>Computer Science</ThemedText>
          <TouchableOpacity>
            <IconSymbol name="ellipsis" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ThemedText style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.9)' }]}>
          Study Materials & Resources
        </ThemedText>
        
        {/* Progress Overview */}
        <View style={styles.progressOverview}>
          <View style={styles.progressItem}>
            <ThemedText style={[styles.progressNumber, { color: 'white' }]}>8</ThemedText>
            <ThemedText style={[styles.progressLabel, { color: 'rgba(255,255,255,0.8)' }]}>Materials</ThemedText>
          </View>
          <View style={styles.progressItem}>
            <ThemedText style={[styles.progressNumber, { color: 'white' }]}>65%</ThemedText>
            <ThemedText style={[styles.progressLabel, { color: 'rgba(255,255,255,0.8)' }]}>Completed</ThemedText>
          </View>
          <View style={styles.progressItem}>
            <ThemedText style={[styles.progressNumber, { color: 'white' }]}>12h</ThemedText>
            <ThemedText style={[styles.progressLabel, { color: 'rgba(255,255,255,0.8)' }]}>Study Time</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Search and Filters */}
      <ThemedView style={styles.searchSection}>
        <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search materials..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {['all', 'lecture', 'research', 'capture', 'assignment', 'quiz'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                { 
                  backgroundColor: selectedFilter === filter ? colors.primary : colors.cardBackground,
                  borderColor: colors.border
                }
              ]}
              onPress={() => setSelectedFilter(filter as any)}
            >
              <ThemedText style={[
                styles.filterText,
                { color: selectedFilter === filter ? 'white' : colors.text }
              ]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Materials List */}
      <ThemedView style={styles.materialsSection}>
        {filteredMaterials.map((material) => (
          <TouchableOpacity
            key={material.id}
            style={[styles.materialCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            onPress={() => handleMaterialPress(material)}
          >
            <View style={styles.materialHeader}>
              <View style={[styles.typeIcon, { backgroundColor: getTypeColor(material.type) }]}>
                <IconSymbol name={getTypeIcon(material.type)} size={20} color="white" />
              </View>
              <View style={styles.materialInfo}>
                <ThemedText style={styles.materialTitle}>{material.title}</ThemedText>
                <ThemedText style={[styles.materialDescription, { color: colors.icon }]}>
                  {material.description}
                </ThemedText>
              </View>
              <View style={styles.materialMeta}>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(material.difficulty) }]}>
                  <ThemedText style={[styles.difficultyText, { color: 'white' }]}>
                    {material.difficulty}
                  </ThemedText>
                </View>
                {material.duration && (
                  <ThemedText style={[styles.duration, { color: colors.icon }]}>
                    {material.duration}
                  </ThemedText>
                )}
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: getTypeColor(material.type),
                      width: `${material.progress}%`
                    }
                  ]} 
                />
              </View>
              <ThemedText style={[styles.progressText, { color: colors.icon }]}>
                {material.progress}%
              </ThemedText>
            </View>
            
            {/* Tags */}
            <View style={styles.tagsContainer}>
              {material.tags.slice(0, 3).map((tag, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: colors.lightAccent }]}>
                  <ThemedText style={[styles.tagText, { color: colors.primary }]}>
                    {tag}
                  </ThemedText>
                </View>
              ))}
              {material.tags.length > 3 && (
                <ThemedText style={[styles.moreTagsText, { color: colors.icon }]}>
                  +{material.tags.length - 3} more
                </ThemedText>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  progressOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  searchSection: {
    padding: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  materialsSection: {
    padding: 20,
    paddingTop: 10,
  },
  materialCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  materialInfo: {
    flex: 1,
    marginRight: 12,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  materialDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  materialMeta: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    minWidth: 35,
    textAlign: 'right',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: 10,
    fontStyle: 'italic',
  },
});