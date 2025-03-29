import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { RealTimeMetrics } from '../../types/plantDisease';

interface RealTimeMonitoringProps {
  metrics: RealTimeMetrics;
  isVisible: boolean;
}

export default function RealTimeMonitoring({ metrics, isVisible }: RealTimeMonitoringProps) {
  if (!isVisible) return null;
  
  // Get trend icon for spread risk
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <Ionicons name="trending-up" size={16} color="#EF4444" />;
      case 'decreasing':
        return <Ionicons name="trending-down" size={16} color="#10B981" />;
      default:
        return <Ionicons name="remove-outline" size={16} color="#9CA3AF" />;
    }
  };

  // Format date as MM-DD-YYYY
  const formatDate = (dateString: string) => {
    if (dateString === 'N/A') return dateString;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Real-time Monitoring</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveIcon} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>
      
      <View style={styles.metricsContainer}>
        {/* Spread Risk */}
        <View style={styles.metricColumn}>
          <Text style={styles.metricTitle}>Spread Risk</Text>
          <View style={styles.metricContent}>
            <Text style={styles.metricValue}>
              {metrics.spreadRisk.level}
              <Text style={styles.metricUnit}> ({metrics.spreadRisk.value.toFixed(1)}%)</Text>
            </Text>
            <View style={styles.trendRow}>
              {getTrendIcon(metrics.spreadRisk.trend)}
              <Text style={styles.trendText}>
                Trend: {metrics.spreadRisk.trend.charAt(0).toUpperCase() + metrics.spreadRisk.trend.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Disease Progression */}
        <View style={styles.metricColumn}>
          <Text style={styles.metricTitle}>Disease Progression</Text>
          <View style={styles.metricContent}>
            <Text style={styles.metricValue}>
              {metrics.diseaseProgression.stage}
            </Text>
            <Text style={styles.metricDetail}>
              {metrics.diseaseProgression.rate.toFixed(1)}% / day
            </Text>
            {/* <Text style={styles.nextCheckText}>
              Next Check: {formatDate(metrics.diseaseProgression.nextCheckDate)}
            </Text> */}
          </View>
        </View>
        
        {/* Environmental Conditions */}
        <View style={styles.metricColumn}>
          <Text style={styles.metricTitle}>Environmental Conditions</Text>
          <View style={styles.metricContent}>
            <View style={styles.environmentalRow}>
              <Text style={styles.environmentalLabel}>Temperature</Text>
              <Text style={styles.environmentalValue}>{metrics.environmentalConditions.temperature}°C</Text>
            </View>
            <View style={styles.environmentalRow}>
              <Text style={styles.environmentalLabel}>Humidity</Text>
              <Text style={styles.environmentalValue}>{metrics.environmentalConditions.humidity}%</Text>
            </View>
            <View style={styles.environmentalRow}>
              <Text style={styles.environmentalLabel}>Soil Moisture</Text>
              <Text style={styles.environmentalValue}>{metrics.environmentalConditions.soilMoisture}%</Text>
            </View>
            {/* <Text style={styles.lastUpdatedText}>
              Last Updated: {formatDate(metrics.environmentalConditions.lastUpdated)}
            </Text> */}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  liveText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  metricsContainer: {
    flexDirection: 'row',
  },
  metricColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  metricTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  metricContent: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  metricUnit: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: 'normal',
  },
  metricDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  nextCheckText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  environmentalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  environmentalLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  environmentalValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'right',
  },
}); 