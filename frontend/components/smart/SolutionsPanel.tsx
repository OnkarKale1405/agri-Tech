import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

interface SolutionsPanelProps {
  organicTreatments: string[];
  ipmStrategies: string[];
  preventionMeasures: string[];
  isVisible: boolean;
}

export default function SolutionsPanel({
  organicTreatments,
  ipmStrategies,
  preventionMeasures,
  isVisible
}: SolutionsPanelProps) {
  if (!isVisible ||
    (organicTreatments.length === 0 &&
      ipmStrategies.length === 0 &&
      preventionMeasures.length === 0)) return null;

  return (
    <View style={styles.solutionsWrapper}>
      {/* Chemical Solutions */}
      {ipmStrategies.length > 0 && (
        <Animated.View
          entering={FadeIn.duration(600).delay(100)}
          style={styles.solutionCard}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="flask-outline" size={24} color="#3B82F6" />
          </View>
          <Text style={styles.solutionTitle}>Chemical Solutions</Text>

          {ipmStrategies.map((item, index) => (
            <View key={index} style={styles.solutionItem}>
              <Ionicons name="checkmark" size={18} color="#10B981" style={styles.checkIcon} />
              <Text style={styles.solutionText}>{item}</Text>
            </View>
          ))}
        </Animated.View>
      )}

      {/* Organic Solutions */}
      {organicTreatments.length > 0 && (
        <Animated.View
          entering={FadeIn.duration(600).delay(200)}
          style={styles.solutionCard}
        >
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <MaterialCommunityIcons name="leaf" size={24} color="#10B981" />
          </View>
          <Text style={styles.solutionTitle}>Organic Solutions</Text>

          {organicTreatments.map((item, index) => (
            <View key={index} style={styles.solutionItem}>
              <Ionicons name="checkmark" size={18} color="#10B981" style={styles.checkIcon} />
              <Text style={styles.solutionText}>{item}</Text>
            </View>
          ))}
        </Animated.View>
      )}

      {/* Preventive Measures */}
      {preventionMeasures.length > 0 && (
        <Animated.View
          entering={FadeIn.duration(600).delay(300)}
          style={styles.solutionCard}
        >
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(139, 92, 246, 0.1)' }]}>
            <MaterialCommunityIcons name="shield-outline" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.solutionTitle}>Preventive Measures</Text>

          {preventionMeasures.map((item, index) => (
            <View key={index} style={styles.solutionItem}>
              <Ionicons name="checkmark" size={18} color="#10B981" style={styles.checkIcon} />
              <Text style={styles.solutionText}>{item}</Text>
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  solutionsWrapper: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  solutionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  solutionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  checkIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  solutionText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
}); 