import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ProgressStep {
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface ProgressIndicatorProps {
  progress: number;
  steps: ProgressStep[];
  isVisible: boolean;
}

export default function ProgressIndicator({ progress, steps, isVisible }: ProgressIndicatorProps) {
  if (!isVisible) return null;

  const formattedProgress = progress.toFixed(1);

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Ionicons name="sync-outline" size={20} color="#10B981" style={styles.rotatingIcon} />
        <Text style={styles.header}>Analysis in Progress</Text>
        <Text style={styles.progressText}>{formattedProgress}% Complete</Text>
      </View>
      
      <ScrollView style={styles.stepsContainer} showsVerticalScrollIndicator={false}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            {step.status === 'completed' && (
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            )}
            {step.status === 'in-progress' && (
              <Ionicons name="ellipsis-horizontal-circle" size={18} color="#10B981" />
            )}
            {step.status === 'pending' && (
              <Ionicons name="ellipse-outline" size={18} color="#94A3B8" />
            )}
            <Text
              style={[
                styles.stepText,
                step.status === 'completed' && styles.completedText,
                step.status === 'in-progress' && styles.activeText,
                step.status === 'pending' && styles.pendingText,
              ]}
            >
              {step.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
    marginRight: 'auto',
  },
  progressText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  rotatingIcon: {
    // Animation would be added in a real implementation
  },
  stepsContainer: {
    maxHeight: 160,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  stepText: {
    marginLeft: 8,
    fontSize: 15,
  },
  completedText: {
    color: '#111827',
  },
  activeText: {
    color: '#10B981',
    fontWeight: '500',
  },
  pendingText: {
    color: '#94A3B8',
  },
}); 