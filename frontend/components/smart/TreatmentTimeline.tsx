import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface TreatmentTimelineProps {
  timeToTreat: string;
  estimatedRecovery: string;
  yieldImpact: string;
  isVisible: boolean;
}

export default function TreatmentTimeline({
  timeToTreat,
  estimatedRecovery,
  yieldImpact,
  isVisible
}: TreatmentTimelineProps) {
  if (!isVisible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      style={styles.container}
    >
      <Text style={styles.sectionTitle}>Treatment Timeline</Text>

      <View style={styles.timelineContainer}>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>Time to Treat</Text>
          <Text style={styles.timelineValue}>
            {timeToTreat === 'Immediately' ? (
              <Text style={{ color: '#10B981', fontWeight: 'bold' }}>{timeToTreat}</Text>
            ) : timeToTreat}
          </Text>
        </View>

        <View style={styles.timelineDivider} />

        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>Estimated Recovery</Text>
          <Text style={styles.timelineValue}>{estimatedRecovery}</Text>
        </View>

        <View style={styles.timelineDivider} />

        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>Yield Impact</Text>
          <Text style={[
            styles.timelineValue,
            { color: yieldImpact.includes('severe') ? '#EF4444' : '#FB923C' }
          ]}>
            {yieldImpact}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  timelineItem: {
    flex: 1,
    padding: 12,
  },
  timelineLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  timelineValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  timelineDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
}); 