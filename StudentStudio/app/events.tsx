import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'social' | 'sports' | 'career' | 'cultural';
  attendees: number;
  maxAttendees?: number;
  organizer: string;
  isAttending: boolean;
  image?: string;
}

const campusEvents: Event[] = [
  {
    id: '1',
    title: 'Computer Science Career Fair',
    description: 'Meet with top tech companies and explore internship and full-time opportunities. Companies include Google, Microsoft, Apple, and many startups.',
    date: '2024-02-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Student Union Building',
    category: 'career',
    attendees: 245,
    maxAttendees: 500,
    organizer: 'Career Services',
    isAttending: true
  },
  {
    id: '2',
    title: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop covering neural networks, deep learning, and practical applications. Bring your laptop!',
    date: '2024-02-18',
    time: '2:00 PM - 5:00 PM',
    location: 'Engineering Building Room 205',
    category: 'academic',
    attendees: 67,
    maxAttendees: 80,
    organizer: 'CS Department',
    isAttending: false
  },
  {
    id: '3',
    title: 'Spring Semester Welcome Party',
    description: 'Join us for food, music, and games to kick off the new semester. Free pizza and refreshments!',
    date: '2024-02-20',
    time: '6:00 PM - 9:00 PM',
    location: 'Campus Quad',
    category: 'social',
    attendees: 189,
    organizer: 'Student Government',
    isAttending: true
  },
  {
    id: '4',
    title: 'Basketball vs State University',
    description: 'Cheer on our team in this exciting rivalry game! Student tickets are free with ID.',
    date: '2024-02-22',
    time: '7:00 PM - 9:00 PM',
    location: 'University Arena',
    category: 'sports',
    attendees: 1250,
    maxAttendees: 2000,
    organizer: 'Athletics Department',
    isAttending: false
  },
  {
    id: '5',
    title: 'International Food Festival',
    description: 'Taste authentic cuisines from around the world prepared by international student organizations.',
    date: '2024-02-25',
    time: '11:00 AM - 3:00 PM',
    location: 'Student Center Plaza',
    category: 'cultural',
    attendees: 156,
    organizer: 'International Student Association',
    isAttending: false
  },
  {
    id: '6',
    title: 'Study Skills Seminar',
    description: 'Learn effective study techniques, time management, and exam preparation strategies from academic success coaches.',
    date: '2024-02-28',
    time: '3:00 PM - 4:30 PM',
    location: 'Library Conference Room A',
    category: 'academic',
    attendees: 43,
    maxAttendees: 60,
    organizer: 'Academic Success Center',
    isAttending: true
  },
  {
    id: '7',
    title: 'Open Mic Night',
    description: 'Showcase your talents! Sign up to perform music, poetry, comedy, or any other creative expression.',
    date: '2024-03-02',
    time: '7:00 PM - 10:00 PM',
    location: 'Campus Coffee House',
    category: 'cultural',
    attendees: 78,
    organizer: 'Arts & Culture Club',
    isAttending: false
  },
  {
    id: '8',
    title: 'Startup Pitch Competition',
    description: 'Present your business ideas to a panel of investors and entrepreneurs. $10,000 prize for the winner!',
    date: '2024-03-05',
    time: '1:00 PM - 6:00 PM',
    location: 'Business School Auditorium',
    category: 'career',
    attendees: 92,
    maxAttendees: 200,
    organizer: 'Entrepreneurship Center',
    isAttending: false
  }
];

export default function EventsScreen() {
  const colors = Colors.light;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'social' | 'sports' | 'career' | 'cultural'>('all');
  const [events, setEvents] = useState(campusEvents);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return 'book.fill';
      case 'social': return 'person.3.fill';
      case 'sports': return 'figure.run';
      case 'career': return 'briefcase.fill';
      case 'cultural': return 'theatermasks.fill';
      default: return 'calendar';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return colors.primary;
      case 'social': return colors.secondary;
      case 'sports': return '#FF5722';
      case 'career': return '#9C27B0';
      case 'cultural': return '#FF9800';
      default: return colors.icon;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const toggleAttendance = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isAttending: !event.isAttending,
            attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
  };

  const upcomingEventsCount = events.filter(event => new Date(event.date) >= new Date()).length;
  const attendingEventsCount = events.filter(event => event.isAttending).length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText style={[styles.headerTitle, { color: 'white' }]}>Campus Events</ThemedText>
          <TouchableOpacity>
            <IconSymbol name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ThemedText style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.9)' }]}>
          Discover and join campus activities
        </ThemedText>
        
        {/* Event Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: 'white' }]}>{upcomingEventsCount}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Upcoming</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: 'white' }]}>{attendingEventsCount}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Attending</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: 'white' }]}>5</ThemedText>
            <ThemedText style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Categories</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Search and Filters */}
      <ThemedView style={styles.searchSection}>
        <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search events..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {['all', 'academic', 'social', 'sports', 'career', 'cultural'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                { 
                  backgroundColor: selectedCategory === category ? colors.primary : colors.cardBackground,
                  borderColor: colors.border
                }
              ]}
              onPress={() => setSelectedCategory(category as any)}
            >
              <IconSymbol 
                name={getCategoryIcon(category)} 
                size={14} 
                color={selectedCategory === category ? 'white' : colors.icon} 
              />
              <ThemedText style={[
                styles.filterText,
                { color: selectedCategory === category ? 'white' : colors.text }
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Events List */}
      <ThemedView style={styles.eventsSection}>
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={[styles.eventCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
          >
            <View style={styles.eventHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(event.category) }]}>
                <IconSymbol name={getCategoryIcon(event.category)} size={20} color="white" />
              </View>
              <View style={styles.eventInfo}>
                <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                <ThemedText style={[styles.eventOrganizer, { color: colors.icon }]}>
                  by {event.organizer}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={[
                  styles.attendButton,
                  { 
                    backgroundColor: event.isAttending ? colors.secondary : colors.cardBackground,
                    borderColor: event.isAttending ? colors.secondary : colors.border
                  }
                ]}
                onPress={() => toggleAttendance(event.id)}
              >
                <IconSymbol 
                  name={event.isAttending ? "checkmark" : "plus"} 
                  size={16} 
                  color={event.isAttending ? 'white' : colors.primary} 
                />
              </TouchableOpacity>
            </View>
            
            <ThemedText style={[styles.eventDescription, { color: colors.icon }]} numberOfLines={2}>
              {event.description}
            </ThemedText>
            
            <View style={styles.eventDetails}>
              <View style={styles.eventDetailItem}>
                <IconSymbol name="calendar" size={14} color={colors.icon} />
                <ThemedText style={[styles.eventDetailText, { color: colors.icon }]}>
                  {formatDate(event.date)}
                </ThemedText>
              </View>
              <View style={styles.eventDetailItem}>
                <IconSymbol name="clock" size={14} color={colors.icon} />
                <ThemedText style={[styles.eventDetailText, { color: colors.icon }]}>
                  {event.time}
                </ThemedText>
              </View>
              <View style={styles.eventDetailItem}>
                <IconSymbol name="location" size={14} color={colors.icon} />
                <ThemedText style={[styles.eventDetailText, { color: colors.icon }]} numberOfLines={1}>
                  {event.location}
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.eventFooter}>
              <View style={styles.attendeesInfo}>
                <IconSymbol name="person.2.fill" size={14} color={colors.icon} />
                <ThemedText style={[styles.attendeesText, { color: colors.icon }]}>
                  {event.attendees} attending
                  {event.maxAttendees && ` • ${event.maxAttendees - event.attendees} spots left`}
                </ThemedText>
              </View>
              {event.maxAttendees && (
                <View style={styles.capacityBar}>
                  <View 
                    style={[
                      styles.capacityFill,
                      { 
                        backgroundColor: getCategoryColor(event.category),
                        width: `${(event.attendees / event.maxAttendees) * 100}%`
                      }
                    ]}
                  />
                </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    gap: 4,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  eventsSection: {
    padding: 20,
    paddingTop: 10,
  },
  eventCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventOrganizer: {
    fontSize: 12,
  },
  attendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 12,
    gap: 6,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventDetailText: {
    fontSize: 12,
    flex: 1,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attendeesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  attendeesText: {
    fontSize: 12,
  },
  capacityBar: {
    width: 60,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 2,
  },
});