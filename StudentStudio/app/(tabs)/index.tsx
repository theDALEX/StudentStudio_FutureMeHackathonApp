import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function StudyHubScreen() {
  const colors = Colors.light; // Always use light theme

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={[styles.headerTitle, { color: 'white' }]}>Study Hub</ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.9)' }]}>
          Your academic success center
        </ThemedText>
        
        {/* Study Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: 'white' }]}>12</ThemedText>
            <ThemedText style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Courses</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: 'white' }]}>8.5h</ThemedText>
            <ThemedText style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>This Week</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: 'white' }]}>94%</ThemedText>
            <ThemedText style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Avg Grade</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Study Tools</ThemedText>
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.secondary }]}>
            <IconSymbol name="timer" size={28} color="white" />
            <ThemedText style={[styles.actionText, { color: 'white' }]}>Pomodoro</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.accent }]}>
            <IconSymbol name="note.text" size={28} color="white" />
            <ThemedText style={[styles.actionText, { color: 'white' }]}>Notes</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.warning }]}>
            <IconSymbol name="calendar.badge.plus" size={28} color="white" />
            <ThemedText style={[styles.actionText, { color: 'white' }]}>Schedule</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Current Courses */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Your Courses</ThemedText>
        
        <TouchableOpacity style={[styles.courseCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.courseHeader}>
            <View style={[styles.courseIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="laptopcomputer" size={24} color="white" />
            </View>
            <View style={styles.courseInfo}>
              <ThemedText style={styles.courseName}>Computer Science 301</ThemedText>
              <ThemedText style={[styles.courseInstructor, { color: colors.icon }]}>Prof. Johnson • MWF 10:00 AM</ThemedText>
            </View>
            <View style={[styles.progressBadge, { backgroundColor: colors.secondary }]}>
              <ThemedText style={[styles.progressText, { color: 'white' }]}>85%</ThemedText>
            </View>
          </View>
          <View style={styles.courseActions}>
            <TouchableOpacity style={[styles.courseActionBtn, { backgroundColor: colors.lightAccent }]}>
              <IconSymbol name="book.fill" size={16} color={colors.primary} />
              <ThemedText style={[styles.courseActionText, { color: colors.primary }]}>Materials</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.courseActionBtn, { backgroundColor: colors.lightAccent }]}>
              <IconSymbol name="checkmark.circle" size={16} color={colors.secondary} />
              <ThemedText style={[styles.courseActionText, { color: colors.secondary }]}>Assignments</ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.courseCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.courseHeader}>
            <View style={[styles.courseIcon, { backgroundColor: colors.secondary }]}>
              <IconSymbol name="function" size={24} color="white" />
            </View>
            <View style={styles.courseInfo}>
              <ThemedText style={styles.courseName}>Calculus II</ThemedText>
              <ThemedText style={[styles.courseInstructor, { color: colors.icon }]}>Prof. Smith • TTh 2:00 PM</ThemedText>
            </View>
            <View style={[styles.progressBadge, { backgroundColor: colors.accent }]}>
              <ThemedText style={[styles.progressText, { color: 'white' }]}>92%</ThemedText>
            </View>
          </View>
          <View style={styles.courseActions}>
            <TouchableOpacity style={[styles.courseActionBtn, { backgroundColor: colors.lightAccent }]}>
              <IconSymbol name="book.fill" size={16} color={colors.primary} />
              <ThemedText style={[styles.courseActionText, { color: colors.primary }]}>Materials</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.courseActionBtn, { backgroundColor: colors.lightAccent }]}>
              <IconSymbol name="checkmark.circle" size={16} color={colors.secondary} />
              <ThemedText style={[styles.courseActionText, { color: colors.secondary }]}>Assignments</ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.courseCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.courseHeader}>
            <View style={[styles.courseIcon, { backgroundColor: colors.accent }]}>
              <IconSymbol name="atom" size={24} color="white" />
            </View>
            <View style={styles.courseInfo}>
              <ThemedText style={styles.courseName}>Physics 201</ThemedText>
              <ThemedText style={[styles.courseInstructor, { color: colors.icon }]}>Prof. Davis • MWF 1:00 PM</ThemedText>
            </View>
            <View style={[styles.progressBadge, { backgroundColor: colors.warning }]}>
              <ThemedText style={[styles.progressText, { color: 'white' }]}>78%</ThemedText>
            </View>
          </View>
          <View style={styles.courseActions}>
            <TouchableOpacity style={[styles.courseActionBtn, { backgroundColor: colors.lightAccent }]}>
              <IconSymbol name="book.fill" size={16} color={colors.primary} />
              <ThemedText style={[styles.courseActionText, { color: colors.primary }]}>Materials</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.courseActionBtn, { backgroundColor: colors.lightAccent }]}>
              <IconSymbol name="checkmark.circle" size={16} color={colors.secondary} />
              <ThemedText style={[styles.courseActionText, { color: colors.secondary }]}>Assignments</ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ThemedView>

      {/* Study Resources */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Study Resources</ThemedText>
        <View style={styles.resourceGrid}>
          <TouchableOpacity style={[styles.resourceCard, { backgroundColor: colors.primary }]}>
            <IconSymbol name="doc.text.fill" size={32} color="white" />
            <ThemedText style={[styles.resourceTitle, { color: 'white' }]}>Flashcards</ThemedText>
            <ThemedText style={[styles.resourceSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>124 sets</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.resourceCard, { backgroundColor: colors.secondary }]}>
            <IconSymbol name="play.circle.fill" size={32} color="white" />
            <ThemedText style={[styles.resourceTitle, { color: 'white' }]}>Video Lectures</ThemedText>
            <ThemedText style={[styles.resourceSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>45 videos</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.resourceCard, { backgroundColor: colors.accent }]}>
            <IconSymbol name="questionmark.circle.fill" size={32} color="white" />
            <ThemedText style={[styles.resourceTitle, { color: 'white' }]}>Practice Tests</ThemedText>
            <ThemedText style={[styles.resourceSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>12 available</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.resourceCard, { backgroundColor: colors.warning }]}>
            <IconSymbol name="person.2.fill" size={32} color="white" />
            <ThemedText style={[styles.resourceTitle, { color: 'white' }]}>Study Groups</ThemedText>
            <ThemedText style={[styles.resourceSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>8 active</ThemedText>
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  courseCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
  },
  courseInstructor: {
    fontSize: 12,
    marginTop: 2,
  },
  progressBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseActions: {
    flexDirection: 'row',
    gap: 8,
  },
  courseActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  courseActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resourceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resourceCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  resourceSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
});
