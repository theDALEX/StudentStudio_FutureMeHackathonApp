import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const colors = Colors.light; // Always use light theme

  const profileStats = [
    { label: 'Study Hours', value: '127h', icon: 'timer' as const },
    { label: 'Courses', value: '12', icon: 'book.fill' as const },
    { label: 'Friends', value: '48', icon: 'person.3.fill' as const },
    { label: 'Achievements', value: '23', icon: 'star.fill' as const },
  ];

  const hobbies = [
    { name: 'Photography', icon: 'camera.fill' as const, color: colors.primary },
    { name: 'Gaming', icon: 'gamecontroller.fill' as const, color: colors.secondary },
    { name: 'Music', icon: 'music.note' as const, color: colors.accent },
    { name: 'Sports', icon: 'figure.run' as const, color: colors.warning },
    { name: 'Reading', icon: 'book.fill' as const, color: colors.primary },
    { name: 'Travel', icon: 'airplane' as const, color: colors.secondary },
  ];

  const menuItems = [
    { title: 'Academic Progress', subtitle: 'View your grades and performance', icon: 'timer' as const, color: colors.primary },
    { title: 'Study Statistics', subtitle: 'Track your learning journey', icon: 'timer' as const, color: colors.secondary },
    { title: 'Achievements', subtitle: 'Your academic milestones', icon: 'star.fill' as const, color: colors.accent },
    { title: 'Settings', subtitle: 'App preferences and account', icon: 'gear' as const, color: colors.warning },
    { title: 'Notifications', subtitle: 'Manage your alerts', icon: 'bell' as const, color: colors.primary },
    { title: 'Privacy & Security', subtitle: 'Account security settings', icon: 'questionmark.circle' as const, color: colors.secondary },
    { title: 'Help & Support', subtitle: 'Get help and contact us', icon: 'questionmark.circle' as const, color: colors.accent },
    { title: 'About', subtitle: 'App version and information', icon: 'questionmark.circle' as const, color: colors.warning },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatarContainer}>
            <View style={[styles.profileAvatar, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <ThemedText style={[styles.avatarText, { color: 'white' }]}>JD</ThemedText>
            </View>
            <View style={[styles.onlineIndicator, { backgroundColor: '#10b981' }]} />
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={[styles.profileName, { color: 'white' }]}>John Doe</ThemedText>
            <ThemedText style={[styles.profileEmail, { color: 'rgba(255,255,255,0.9)' }]}>john.doe@university.edu</ThemedText>
            <ThemedText style={[styles.profileDegree, { color: 'rgba(255,255,255,0.8)' }]}>Computer Science • Year 3</ThemedText>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <IconSymbol name="gear" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Stats Section */}
      <ThemedView style={styles.statsSection}>
        <View style={styles.statsGrid}>
          {profileStats.map((stat, index) => (
            <TouchableOpacity key={index} style={[styles.statCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <View style={[styles.statIcon, { backgroundColor: colors.lightAccent }]}>
                <IconSymbol name={stat.icon} size={24} color={colors.primary} />
              </View>
              <ThemedText style={[styles.statValue, { color: colors.text }]}>{stat.value}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: colors.icon }]}>{stat.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Hobbies Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Hobbies & Interests</ThemedText>
        <View style={styles.hobbiesContainer}>
          {hobbies.map((hobby, index) => (
            <TouchableOpacity key={index} style={[styles.hobbyChip, { backgroundColor: colors.lightAccent, borderColor: colors.border }]}>
              <View style={[styles.hobbyIcon, { backgroundColor: hobby.color }]}>
                <IconSymbol name={hobby.icon} size={16} color="white" />
              </View>
              <ThemedText style={[styles.hobbyText, { color: colors.text }]}>{hobby.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.primary }]}>
            <IconSymbol name="star.fill" size={24} color="white" />
            <ThemedText style={[styles.quickActionText, { color: 'white' }]}>Rate App</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.secondary }]}>
            <IconSymbol name="square.and.arrow.up" size={24} color="white" />
            <ThemedText style={[styles.quickActionText, { color: 'white' }]}>Share App</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.accent }]}>
            <IconSymbol name="questionmark.circle.fill" size={24} color="white" />
            <ThemedText style={[styles.quickActionText, { color: 'white' }]}>Feedback</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Menu Items */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account & Settings</ThemedText>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.menuItem, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
              <IconSymbol name={item.icon} size={20} color={item.color} />
            </View>
            <View style={styles.menuContent}>
              <ThemedText style={[styles.menuTitle, { color: colors.text }]}>{item.title}</ThemedText>
              <ThemedText style={[styles.menuSubtitle, { color: colors.icon }]}>{item.subtitle}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={colors.icon} />
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Logout Section */}
      <ThemedView style={styles.section}>
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#fee2e2', borderColor: '#fecaca' }]}>
          <IconSymbol name="house.fill" size={20} color="#dc2626" />
          <ThemedText style={[styles.logoutText, { color: '#dc2626' }]}>Sign Out</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* App Version */}
      <ThemedView style={styles.versionSection}>
        <ThemedText style={[styles.versionText, { color: colors.icon }]}>Student Studio v1.0.0</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  profileDegree: {
    fontSize: 12,
  },
  editButton: {
    padding: 8,
  },
  statsSection: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    marginBottom: 8,
  },
  hobbyIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hobbyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 12,
  },
});