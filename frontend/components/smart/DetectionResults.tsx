import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { PlantDiseaseAnalysis } from '../../types/plantDisease';

interface DetectionResultsProps {
  analysis: PlantDiseaseAnalysis;
  imageUri: string | null;
  isVisible: boolean;
}

export default function DetectionResults({ analysis, imageUri, isVisible }: DetectionResultsProps) {
  if (!isVisible) return null;

  // Function to determine severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return '#FBBF24';
      case 'medium':
        return '#FB923C';
      case 'severe':
        return '#EF4444';
      default:
        return '#94A3B8';
    }
  };

  // Function to format confidence level
  const formatConfidence = (confidence: number) => {
    return `${confidence.toFixed(2)}%`;
  };

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      style={styles.container}
    >
      <Text style={styles.sectionTitle}>Detection Results</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.leftColumn}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Disease</Text>
            <Text style={styles.resultValue}>{analysis.diseaseName}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Name of Crop</Text>
            <Text style={styles.resultValue}>{analysis.cropName}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Confidence</Text>
            <Text style={[styles.resultValue, styles.confidenceValue]}>
              {formatConfidence(analysis.confidenceLevel)}
            </Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Severity</Text>
            <View style={[
              styles.severityBadge, 
              { backgroundColor: getSeverityColor(analysis.severityLevel) + '20' }
            ]}>
              <Text style={[
                styles.severityText, 
                { color: getSeverityColor(analysis.severityLevel) }
              ]}>
                {analysis.severityLevel.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        
        {imageUri && (
          <Animated.View 
            entering={FadeInRight.duration(600).delay(300)}
            style={styles.rightColumn}
          >
            <Image 
              source={{ uri: imageUri }} 
              style={styles.resultImage} 
              resizeMode="cover"
            />
          </Animated.View>
        )}
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
  contentContainer: {
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    marginRight: 16,
  },
  rightColumn: {
    width: '45%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  resultRow: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  confidenceValue: {
    color: '#059669',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  severityText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 