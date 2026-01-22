import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { chatService } from '@/services/chatService';

const { width } = Dimensions.get('window');

interface StudyNote {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

interface StudyResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'code';
  url?: string;
  description: string;
}

export default function SpecificModuleExampleScreen() {
  const colors = Colors.light;
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'notes' | 'resources'>('overview');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample content based on the material type
  const sampleContent = {
    lecture: `
# Introduction to Data Structures

## Learning Objectives
- Understand fundamental data structures
- Learn when to use different data structures
- Implement basic operations for each structure

## Key Concepts

### Arrays
Arrays are the most basic data structure, storing elements in contiguous memory locations.

**Advantages:**
- Fast access by index O(1)
- Memory efficient
- Cache friendly

**Disadvantages:**
- Fixed size (in most languages)
- Insertion/deletion can be expensive O(n)

### Linked Lists
A linear data structure where elements are stored in nodes, each containing data and a reference to the next node.

**Types:**
1. Singly Linked List
2. Doubly Linked List
3. Circular Linked List

**Time Complexity:**
- Access: O(n)
- Search: O(n)
- Insertion: O(1) at head, O(n) at arbitrary position
- Deletion: O(1) at head, O(n) at arbitrary position

### Stacks
LIFO (Last In, First Out) data structure.

**Operations:**
- Push: Add element to top
- Pop: Remove element from top
- Peek/Top: View top element
- isEmpty: Check if stack is empty

**Applications:**
- Function call management
- Expression evaluation
- Undo operations
- Browser history

### Queues
FIFO (First In, First Out) data structure.

**Operations:**
- Enqueue: Add element to rear
- Dequeue: Remove element from front
- Front: View front element
- isEmpty: Check if queue is empty

**Applications:**
- Process scheduling
- Breadth-first search
- Handling requests in web servers
    `,
    research: `
# Algorithm Complexity Analysis Research

## Abstract
This research explores the fundamental concepts of algorithm complexity analysis, focusing on Big O notation and its practical applications in software development.

## Introduction
Algorithm complexity analysis is crucial for understanding the efficiency of algorithms and making informed decisions about which algorithms to use in different scenarios.

## Big O Notation
Big O notation describes the upper bound of an algorithm's time or space complexity in terms of the input size.

### Common Complexities
1. **O(1) - Constant Time**
   - Hash table lookups
   - Array access by index

2. **O(log n) - Logarithmic Time**
   - Binary search
   - Balanced tree operations

3. **O(n) - Linear Time**
   - Linear search
   - Single loop through array

4. **O(n log n) - Linearithmic Time**
   - Merge sort
   - Heap sort
   - Quick sort (average case)

5. **O(n²) - Quadratic Time**
   - Bubble sort
   - Selection sort
   - Nested loops

## Space Complexity
Space complexity measures the amount of memory an algorithm uses relative to the input size.

### Types of Space Usage
- **Input Space**: Memory used to store the input
- **Auxiliary Space**: Extra memory used by the algorithm
- **Output Space**: Memory used to store the output

## Practical Examples

### Example 1: Finding Maximum Element
\`\`\`python
def find_max(arr):
    max_val = arr[0]  # O(1) space
    for num in arr:   # O(n) time
        if num > max_val:
            max_val = num
    return max_val
\`\`\`
Time: O(n), Space: O(1)

### Example 2: Recursive Fibonacci
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`
Time: O(2^n), Space: O(n) due to call stack

## Conclusion
Understanding algorithm complexity is essential for writing efficient code and making optimal design decisions in software development.
    `,
    capture: `
# Binary Search Trees - Live Session Notes

## Session Overview
**Date**: January 20, 2024
**Duration**: 1 hour 20 minutes
**Instructor**: Prof. Johnson

## Key Topics Covered

### 1. BST Definition and Properties
- Binary tree where left subtree contains nodes with values less than parent
- Right subtree contains nodes with values greater than parent
- No duplicate values allowed (in this implementation)

### 2. BST Operations

#### Insertion
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def insert(root, val):
    if not root:
        return TreeNode(val)
    
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    
    return root
\`\`\`

#### Search
\`\`\`python
def search(root, val):
    if not root or root.val == val:
        return root
    
    if val < root.val:
        return search(root.left, val)
    else:
        return search(root.right, val)
\`\`\`

#### Deletion (Most Complex)
Three cases:
1. Node has no children (leaf) - simply remove
2. Node has one child - replace with child
3. Node has two children - replace with inorder successor

### 3. Tree Traversals
- **Inorder**: Left → Root → Right (gives sorted order)
- **Preorder**: Root → Left → Right
- **Postorder**: Left → Right → Root

### 4. Time Complexities
- **Average Case**: O(log n) for all operations
- **Worst Case**: O(n) when tree becomes skewed
- **Best Case**: O(log n) for balanced tree

### 5. Live Coding Highlights
- Implemented complete BST class
- Demonstrated insertion of values: [50, 30, 70, 20, 40, 60, 80]
- Showed tree visualization
- Discussed balancing strategies (AVL, Red-Black trees)

## Questions from Session
1. **Q**: How to handle duplicate values?
   **A**: Either ignore, store count, or use different comparison logic

2. **Q**: When does BST degrade to O(n)?
   **A**: When inserting sorted data, creating a skewed tree

3. **Q**: How to check if a tree is a valid BST?
   **A**: Use inorder traversal or recursive validation with bounds

## Homework Assignment
Implement BST deletion method and create visualization tool.

## Additional Resources
- Visualizer: https://visualgo.net/en/bst
- Practice problems: LeetCode BST section
    `
  };

  const studyResources: StudyResource[] = [
    {
      id: '1',
      title: 'Data Structures Visualization',
      type: 'link',
      url: 'https://visualgo.net',
      description: 'Interactive visualizations of data structures and algorithms'
    },
    {
      id: '2',
      title: 'Implementation Examples',
      type: 'code',
      description: 'Complete code examples in Python, Java, and C++'
    },
    {
      id: '3',
      title: 'Lecture Slides PDF',
      type: 'pdf',
      description: 'Comprehensive slides covering all topics from the lecture'
    },
    {
      id: '4',
      title: 'Practice Problems Video',
      type: 'video',
      description: 'Step-by-step solutions to common data structure problems'
    }
  ];

  useEffect(() => {
    // Initialize with sample notes
    setStudyNotes([
      {
        id: '1',
        title: 'Key Takeaways',
        content: 'Arrays provide O(1) access but O(n) insertion. Linked lists are opposite - O(n) access but O(1) insertion at head.',
        timestamp: '2024-01-15 14:30'
      },
      {
        id: '2',
        title: 'Important Formula',
        content: 'Stack operations: Push O(1), Pop O(1), Peek O(1). Remember LIFO principle!',
        timestamp: '2024-01-15 14:45'
      }
    ]);
  }, []);

  const generateAISummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const content = sampleContent[params.type as keyof typeof sampleContent] || sampleContent.lecture;
      const prompt = `Please provide a concise summary of this study material in bullet points, highlighting the most important concepts and key takeaways:\n\n${content}`;
      
      const summary = await chatService.sendMessage(prompt);
      setAiSummary(summary);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate AI summary. Please try again.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const addStudyNote = () => {
    Alert.prompt(
      'Add Study Note',
      'Enter your note title:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Next',
          onPress: (title?: string) => {
            if (title) {
              Alert.prompt(
                'Add Study Note',
                'Enter your note content:',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Save',
                    onPress: (content?: string) => {
                      if (content) {
                        const newNote: StudyNote = {
                          id: Date.now().toString(),
                          title,
                          content,
                          timestamp: new Date().toLocaleString()
                        };
                        setStudyNotes([...studyNotes, newNote]);
                      }
                    }
                  }
                ]
              );
            }
          }
        }
      ]
    );
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'doc.fill';
      case 'video': return 'play.rectangle.fill';
      case 'link': return 'link';
      case 'code': return 'chevron.left.forwardslash.chevron.right';
      default: return 'doc.fill';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            <ThemedText style={styles.sectionTitle}>Material Overview</ThemedText>
            <View style={[styles.overviewCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <ThemedText style={styles.overviewTitle}>{params.title}</ThemedText>
              <ThemedText style={[styles.overviewDescription, { color: colors.icon }]}>
                {params.description}
              </ThemedText>
              <View style={styles.overviewMeta}>
                <View style={[styles.difficultyBadge, { backgroundColor: colors.secondary }]}>
                  <ThemedText style={[styles.difficultyText, { color: 'white' }]}>
                    {params.difficulty}
                  </ThemedText>
                </View>
                <View style={styles.tagsContainer}>
                  {JSON.parse(params.tags as string || '[]').map((tag: string, index: number) => (
                    <View key={index} style={[styles.tag, { backgroundColor: colors.lightAccent }]}>
                      <ThemedText style={[styles.tagText, { color: colors.primary }]}>
                        {tag}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* AI Summary Section */}
            <View style={styles.aiSummarySection}>
              <View style={styles.aiSummaryHeader}>
                <ThemedText style={styles.sectionTitle}>AI Summary</ThemedText>
                <TouchableOpacity
                  style={[styles.summaryButton, { backgroundColor: colors.primary }]}
                  onPress={generateAISummary}
                  disabled={isGeneratingSummary}
                >
                  {isGeneratingSummary ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <>
                      <IconSymbol name="sparkles" size={16} color="white" />
                      <ThemedText style={[styles.summaryButtonText, { color: 'white' }]}>
                        Generate Summary
                      </ThemedText>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              
              {aiSummary ? (
                <View style={[styles.summaryCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                  <ThemedText style={styles.summaryText}>{aiSummary}</ThemedText>
                </View>
              ) : (
                <View style={[styles.summaryPlaceholder, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                  <IconSymbol name="sparkles" size={32} color={colors.icon} />
                  <ThemedText style={[styles.summaryPlaceholderText, { color: colors.icon }]}>
                    Generate an AI summary to get key insights and takeaways from this material
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        );

      case 'content':
        return (
          <View style={styles.tabContent}>
            <ThemedText style={styles.sectionTitle}>Study Content</ThemedText>
            <View style={[styles.contentCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <ScrollView style={styles.contentScroll}>
                <ThemedText style={styles.contentText}>
                  {sampleContent[params.type as keyof typeof sampleContent] || sampleContent.lecture}
                </ThemedText>
              </ScrollView>
            </View>
          </View>
        );

      case 'notes':
        return (
          <View style={styles.tabContent}>
            <View style={styles.notesHeader}>
              <ThemedText style={styles.sectionTitle}>Study Notes</ThemedText>
              <TouchableOpacity
                style={[styles.addNoteButton, { backgroundColor: colors.primary }]}
                onPress={addStudyNote}
              >
                <IconSymbol name="plus" size={16} color="white" />
                <ThemedText style={[styles.addNoteText, { color: 'white' }]}>Add Note</ThemedText>
              </TouchableOpacity>
            </View>
            
            {studyNotes.map((note) => (
              <View key={note.id} style={[styles.noteCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                <ThemedText style={styles.noteTitle}>{note.title}</ThemedText>
                <ThemedText style={[styles.noteContent, { color: colors.icon }]}>{note.content}</ThemedText>
                <ThemedText style={[styles.noteTimestamp, { color: colors.icon }]}>{note.timestamp}</ThemedText>
              </View>
            ))}
          </View>
        );

      case 'resources':
        return (
          <View style={styles.tabContent}>
            <ThemedText style={styles.sectionTitle}>Additional Resources</ThemedText>
            {studyResources.map((resource) => (
              <TouchableOpacity
                key={resource.id}
                style={[styles.resourceCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
              >
                <View style={[styles.resourceIcon, { backgroundColor: colors.lightAccent }]}>
                  <IconSymbol name={getResourceIcon(resource.type)} size={20} color={colors.primary} />
                </View>
                <View style={styles.resourceInfo}>
                  <ThemedText style={styles.resourceTitle}>{resource.title}</ThemedText>
                  <ThemedText style={[styles.resourceDescription, { color: colors.icon }]}>
                    {resource.description}
                  </ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.icon} />
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <IconSymbol 
              name={isBookmarked ? "bookmark.fill" : "bookmark"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
        <ThemedText style={[styles.headerTitle, { color: 'white' }]} numberOfLines={2}>
          {params.title}
        </ThemedText>
      </ThemedView>

      {/* Tab Navigation */}
      <View style={[styles.tabNavigation, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        {[
          { key: 'overview', label: 'Overview', icon: 'info.circle' },
          { key: 'content', label: 'Content', icon: 'doc.text' },
          { key: 'notes', label: 'Notes', icon: 'note.text' },
          { key: 'resources', label: 'Resources', icon: 'folder' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabItem,
              activeTab === tab.key && { borderBottomColor: colors.primary }
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <IconSymbol 
              name={tab.icon as any} 
              size={16} 
              color={activeTab === tab.key ? colors.primary : colors.icon} 
            />
            <ThemedText style={[
              styles.tabLabel,
              { color: activeTab === tab.key ? colors.primary : colors.icon }
            ]}>
              {tab.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.contentContainer}>
        {renderTabContent()}
      </ScrollView>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  tabNavigation: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overviewCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  overviewDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  overviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  aiSummarySection: {
    marginBottom: 20,
  },
  aiSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  summaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
  },
  summaryPlaceholder: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  summaryPlaceholderText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  contentCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    height: 400,
  },
  contentScroll: {
    padding: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  addNoteText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noteCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  noteTimestamp: {
    fontSize: 11,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
});