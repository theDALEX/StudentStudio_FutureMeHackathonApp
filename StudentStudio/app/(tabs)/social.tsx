import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function SocialScreen() {
  const colors = Colors.light; // Always use light theme

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={[styles.headerTitle, { color: 'white' }]}>Campus Social</ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.9)' }]}>
          Connect with your university community
        </ThemedText>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.secondary }]}>
            <IconSymbol name="plus.circle.fill" size={24} color="white" />
            <ThemedText style={[styles.actionText, { color: 'white' }]}>New Post</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.accent }]}>
            <IconSymbol name="person.badge.plus" size={24} color="white" />
            <ThemedText style={[styles.actionText, { color: 'white' }]}>Find Friends</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.warning }]}>
            <IconSymbol name="calendar" size={24} color="white" />
            <ThemedText style={[styles.actionText, { color: 'white' }]}>Events</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* University Feed */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>University Feed</ThemedText>
        
        {/* Sample Posts */}
        <View style={[styles.postCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.postHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>JS</ThemedText>
            </View>
            <View style={styles.postInfo}>
              <ThemedText style={styles.postAuthor}>John Smith</ThemedText>
              <ThemedText style={[styles.postTime, { color: colors.icon }]}>Computer Science • 2h ago</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.postContent}>
            Just finished my final project for CS 301! Anyone else excited for winter break? 🎉
          </ThemedText>
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="heart" size={20} color={colors.icon} />
              <ThemedText style={[styles.actionCount, { color: colors.icon }]}>24</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="message" size={20} color={colors.icon} />
              <ThemedText style={[styles.actionCount, { color: colors.icon }]}>8</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.postCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.postHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
              <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>EM</ThemedText>
            </View>
            <View style={styles.postInfo}>
              <ThemedText style={styles.postAuthor}>Emma Martinez</ThemedText>
              <ThemedText style={[styles.postTime, { color: colors.icon }]}>Biology • 4h ago</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.postContent}>
            Study group for Bio 205 tomorrow at 3PM in the library! DM me if you want to join 📚
          </ThemedText>
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="heart.fill" size={20} color={colors.secondary} />
              <ThemedText style={[styles.actionCount, { color: colors.icon }]}>15</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="message" size={20} color={colors.icon} />
              <ThemedText style={[styles.actionCount, { color: colors.icon }]}>12</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>

      {/* Campus Groups */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Your Campus Groups</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupsContainer}>
          <TouchableOpacity style={[styles.groupCard, { backgroundColor: colors.primary }]}>
            <IconSymbol name="laptopcomputer" size={32} color="white" />
            <ThemedText style={[styles.groupName, { color: 'white' }]}>CS Club</ThemedText>
            <ThemedText style={[styles.groupMembers, { color: 'rgba(255,255,255,0.8)' }]}>234 members</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.groupCard, { backgroundColor: colors.secondary }]}>
            <IconSymbol name="figure.run" size={32} color="white" />
            <ThemedText style={[styles.groupName, { color: 'white' }]}>Running Club</ThemedText>
            <ThemedText style={[styles.groupMembers, { color: 'rgba(255,255,255,0.8)' }]}>89 members</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.groupCard, { backgroundColor: colors.accent }]}>
            <IconSymbol name="music.note" size={32} color="white" />
            <ThemedText style={[styles.groupName, { color: 'white' }]}>Music Society</ThemedText>
            <ThemedText style={[styles.groupMembers, { color: 'rgba(255,255,255,0.8)' }]}>156 members</ThemedText>
          </TouchableOpacity>
        </ScrollView>
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
    opacity: 0.9,
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
  postCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 12,
    marginTop: 2,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionCount: {
    fontSize: 14,
  },
  groupsContainer: {
    marginTop: 8,
  },
  groupCard: {
    width: 120,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 12,
    gap: 8,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  groupMembers: {
    fontSize: 12,
    textAlign: 'center',
  },
});