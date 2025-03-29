import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

interface StatusIndicatorProps {
  title: string;
  status: 'Operational' | 'Warning' | 'Error';
}

export default function StatusIndicator({ title, status }: StatusIndicatorProps) {
  // Determine the color and icon based on status
  const getStatusConfig = () => {
    switch (status) {
      case 'Warning':
        return {
          backgroundColor: 'rgba(250, 204, 21, 0.1)',
          borderColor: 'rgba(250, 204, 21, 0.3)',
          iconColor: '#FACC15',
          icon: 'warning-outline'
        };
      case 'Error':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          iconColor: '#EF4444',
          icon: 'close-circle-outline'
        };
      case 'Operational':
      default:
        return {
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderColor: 'rgba(34, 197, 94, 0.3)',
          iconColor: '#22C55E',
          icon: 'checkmark-circle-outline'
        };
    }
  };

  const { backgroundColor, borderColor, iconColor, icon } = getStatusConfig();

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      style={[styles.container, { backgroundColor, borderColor }]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 10,
  },
  iconContainer: {
    marginRight: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  status: {
    fontSize: 14,
    color: '#64748B',
  },
}); 