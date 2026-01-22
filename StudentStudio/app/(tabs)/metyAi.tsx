import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function MetyAIScreen() {
  const colors = Colors.light; // Always use light theme
  const [message, setMessage] = useState('');

  const quickPrompts = [
    "Help me understand calculus derivatives",
    "Create a study schedule for finals",
    "Explain quantum physics basics",
    "Generate practice questions for biology"
  ];

  const chatMessages = [
    {
      id: 1,
      type: 'ai',
      message: "Hi! I'm Mety, your personal AI study assistant! 🤖 How can I help you with your studies today?",
      time: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      message: "Can you help me understand photosynthesis?",
      time: '10:32 AM'
    },
    {
      id: 3,
      type: 'ai',
      message: "Absolutely! Photosynthesis is the process plants use to convert sunlight into energy. It happens in two main stages:\n\n1. Light-dependent reactions (in thylakoids)\n2. Light-independent reactions (Calvin cycle)\n\nWould you like me to explain each stage in detail? 🌱",
      time: '10:32 AM'
    }
  ];

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={[styles.metyAvatar, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <IconSymbol name="brain.head.profile" size={32} color="white" />
          </View>
          <View style={styles.headerText}>
            <ThemedText style={[styles.headerTitle, { color: 'white' }]}>Mety AI</ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.9)' }]}>
              Your personal study assistant
            </ThemedText>
          </View>
          <View style={[styles.statusIndicator, { backgroundColor: colors.secondary }]}>
            <ThemedText style={[styles.statusText, { color: 'white' }]}>Online</ThemedText>
          </View>
        </View>
      </ThemedView>


      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        {chatMessages.map((msg) => (
          <View key={msg.id} style={[
            styles.messageContainer,
            msg.type === 'user' ? styles.userMessage : styles.aiMessage
          ]}>
            {msg.type === 'ai' && (
              <View style={[styles.messageAvatar, { backgroundColor: colors.primary }]}>
                <IconSymbol name="brain.head.profile" size={16} color="white" />
              </View>
            )}
            <View style={[
              styles.messageBubble,
              msg.type === 'user' 
                ? { backgroundColor: colors.primary } 
                : { backgroundColor: colors.cardBackground, borderColor: colors.border, borderWidth: 1 }
            ]}>
              <ThemedText style={[
                styles.messageText,
                { color: msg.type === 'user' ? 'white' : colors.text }
              ]}>
                {msg.message}
              </ThemedText>
              <ThemedText style={[
                styles.messageTime,
                { color: msg.type === 'user' ? 'rgba(255,255,255,0.7)' : colors.icon }
              ]}>
                {msg.time}
              </ThemedText>
            </View>
            {msg.type === 'user' && (
              <View style={[styles.messageAvatar, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="person.fill" size={16} color="white" />
              </View>
            )}
          </View>
        ))}
      </ScrollView>


      {/* Input Area */}
      <ThemedView style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            placeholder="Ask Mety anything about your studies..."
            placeholderTextColor={colors.icon}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.primary }]}>
            <IconSymbol name="paperplane.fill" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActionsSection: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickActions: {
    marginTop: 8,
  },
  quickActionCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  promptsSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  promptsTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  promptCard: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    maxWidth: 200,
  },
  promptText: {
    fontSize: 13,
  },
  inputContainer: {
    padding: 20,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
