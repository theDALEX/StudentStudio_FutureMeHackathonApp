import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { chatService, ChatMessage } from '@/services/chatService';

export default function MetyAIScreen() {
  const colors = Colors.light; // Always use light theme
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: "Hi! I'm Mety, your personal AI study assistant! 🤖 How can I help you with your studies today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickPrompts = [
    "Help me understand calculus derivatives",
    "Create a study schedule for finals",
    "Explain quantum physics basics",
    "Generate practice questions for biology"
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      message: userMessage,
      time: currentTime
    };

    // Add loading message
    const loadingMessage: ChatMessage = {
      id: Date.now() + 1,
      type: 'ai',
      message: 'Thinking...',
      time: currentTime,
      isLoading: true
    };

    setChatMessages(prev => [...prev, newUserMessage, loadingMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Get AI response - the service returns a string directly
      const aiResponse = await chatService.sendMessage(userMessage, chatMessages);
      
      // Replace loading message with actual response
      setChatMessages(prev => {
        const newMessages = [...prev];
        const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = {
            id: Date.now() + 2,
            type: 'ai',
            message: aiResponse,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isLoading: false
          };
        }
        return newMessages;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Replace loading message with error message
      setChatMessages(prev => {
        const newMessages = [...prev];
        const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = {
            id: Date.now() + 2,
            type: 'ai',
            message: "I'm having trouble connecting right now. Please try again later! 🤖",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isLoading: false
          };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const showAPIKeyInfo = () => {
    Alert.alert(
      "OpenAI API Setup",
      "To enable real AI chat, you need to:\n\n1. Get an OpenAI API key from openai.com\n2. Add it to services/chatService.ts\n3. Replace 'your-openai-api-key-here' with your actual key\n\nFor now, I'll use demo responses!",
      [{ text: "Got it!" }]
    );
  };

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
          <TouchableOpacity 
            style={[styles.statusIndicator, { backgroundColor: colors.secondary }]}
            onPress={showAPIKeyInfo}
          >
            <ThemedText style={[styles.statusText, { color: 'white' }]}>Setup</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.quickActionsSection}>
        <ThemedText style={styles.sectionTitle}>Quick Help</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.secondary }]}>
            <IconSymbol name="questionmark.circle.fill" size={24} color="white" />
            <ThemedText style={[styles.quickActionText, { color: 'white' }]}>Ask Question</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.accent }]}>
            <IconSymbol name="calendar" size={24} color="white" />
            <ThemedText style={[styles.quickActionText, { color: 'white' }]}>Study Plan</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.warning }]}>
            <IconSymbol name="doc.text" size={24} color="white" />
            <ThemedText style={[styles.quickActionText, { color: 'white' }]}>Summarize</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.primary }]}>
            <IconSymbol name="lightbulb.fill" size={24} color="white" />
            <ThemedText style={[styles.quickActionText, { color: 'white' }]}>Explain</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatContent}
      >
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
                { color: msg.type === 'user' ? 'white' : colors.text },
                msg.isLoading && { fontStyle: 'italic', opacity: 0.7 }
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

      {/* Quick Prompts */}
      <ThemedView style={styles.promptsSection}>
        <ThemedText style={[styles.promptsTitle, { color: colors.icon }]}>Try asking:</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickPrompts.map((prompt, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.promptCard, { backgroundColor: colors.lightAccent, borderColor: colors.border }]}
              onPress={() => handleQuickPrompt(prompt)}
            >
              <ThemedText style={[styles.promptText, { color: colors.text }]}>{prompt}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

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
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              { 
                backgroundColor: message.trim() && !isLoading ? colors.primary : colors.icon,
                opacity: message.trim() && !isLoading ? 1 : 0.5
              }
            ]}
            onPress={sendMessage}
            disabled={!message.trim() || isLoading}
          >
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
  chatContent: {
    paddingBottom: 20,
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
