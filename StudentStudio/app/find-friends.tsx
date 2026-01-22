import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

interface Friend {
  id: number;
  name: string;
  degree: string;
  interests: string;
  avatar: string;
  isOnline: boolean;
  mutualFriends?: number;
}

export default function FindFriendsScreen() {
  const colors = Colors.light;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All Courses');
  const [selectedHobbyFilter, setSelectedHobbyFilter] = useState('All Hobbies');

  const suggestedFriends: Friend[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      degree: 'Bsc. Computer Science',
      interests: 'Hiking, Photography...',
      avatar: 'SM',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Alex Rivers',
      degree: 'Msc. Business Admin...',
      interests: 'Gaming, Music • 8 M...',
      avatar: 'AR',
      isOnline: true,
    },
    {
      id: 3,
      name: 'Emma Chen',
      degree: 'Bsc. Psychology',
      interests: 'Gaming, Cooking • 3...',
      avatar: 'EC',
      isOnline: true,
    },
    {
      id: 4,
      name: 'Marcus Johnson',
      degree: 'Msc. Mechanical Eng...',
      interests: 'Sports, Reading • 21 ...',
      avatar: 'MJ',
      isOnline: true,
    },
    {
      id: 5,
      name: 'Lily Zhang',
      degree: 'Bsc. Graphic Design',
      interests: 'Art, Travel • 5 Mutual...',
      avatar: 'LZ',
      isOnline: true,
    },
  ];

  const getAvatarColor = (index: number) => {
    const avatarColors = [colors.primary, colors.secondary, colors.accent, colors.warning, '#10b981'];
    return avatarColors[index % avatarColors.length];
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color="white" />
        </TouchableOpacity>
        
        <ThemedText style={[styles.headerTitle, { color: 'white' }]}>Find Friends</ThemedText>
        
        <TouchableOpacity style={styles.moreButton}>
          <IconSymbol name="ellipsis" size={24} color="white" />
        </TouchableOpacity>
      </ThemedView>

      {/* Search Bar */}
      <ThemedView style={[styles.searchSection, { backgroundColor: colors.background }]}>
        <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search By Name"
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </ThemedView>

      {/* Filters */}
      <ThemedView style={[styles.filtersSection, { backgroundColor: colors.background }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText style={[styles.filterText, { color: colors.text }]}>Filter By Course</ThemedText>
            <IconSymbol name="chevron.down" size={16} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText style={[styles.filterText, { color: colors.text }]}>Filter By Hobby</ThemedText>
            <IconSymbol name="chevron.down" size={16} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText style={[styles.filterText, { color: colors.text }]}>All Suggested</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>

      {/* Suggested Friends */}
      <ScrollView style={styles.friendsList} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.friendsSection}>
          <ThemedText style={[styles.sectionTitle, { color: colors.icon }]}>Suggested Friends</ThemedText>
          
          {suggestedFriends.map((friend, index) => (
            <View key={friend.id} style={[styles.friendCard, { backgroundColor: colors.background }]}>
              <View style={styles.friendInfo}>
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatar, { backgroundColor: getAvatarColor(index) }]}>
                    <ThemedText style={[styles.avatarText, { color: 'white' }]}>
                      {friend.avatar}
                    </ThemedText>
                  </View>
                  {friend.isOnline && (
                    <View style={[styles.onlineIndicator, { backgroundColor: '#10b981' }]} />
                  )}
                </View>
                
                <View style={styles.friendDetails}>
                  <ThemedText style={[styles.friendName, { color: colors.text }]}>
                    {friend.name}
                  </ThemedText>
                  <ThemedText style={[styles.friendDegree, { color: colors.text }]}>
                    {friend.degree}
                  </ThemedText>
                  <ThemedText style={[styles.friendInterests, { color: colors.icon }]}>
                    {friend.interests}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.friendActions}>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: '#fbbf24' }]}>
                  <IconSymbol name="person.badge.plus" size={16} color="white" />
                  <ThemedText style={[styles.addButtonText, { color: 'white' }]}>Add</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.dismissButton}>
                  <IconSymbol name="xmark" size={20} color={colors.icon} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  moreButton: {
    padding: 8,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 12,
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  friendsList: {
    flex: 1,
  },
  friendsSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  friendDegree: {
    fontSize: 14,
    marginBottom: 2,
  },
  friendInterests: {
    fontSize: 12,
  },
  friendActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dismissButton: {
    padding: 8,
  },
});