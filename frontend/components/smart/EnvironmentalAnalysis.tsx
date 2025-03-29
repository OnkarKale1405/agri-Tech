import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { EnvironmentalFactor } from '../../types/plantDisease';

interface EnvironmentalAnalysisProps {
  factors: EnvironmentalFactor[];
  isVisible: boolean;
}

export default function EnvironmentalAnalysis({ factors, isVisible }: EnvironmentalAnalysisProps) {
  if (!isVisible || factors.length === 0) return null;

  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return '#10B981';
      case 'warning':
        return '#FBBF24';
      case 'critical':
        return '#EF4444';
      default:
        return '#94A3B8';
    }
  };

  // Function to determine status badge text
  const getStatusText = (status: string) => {
    return status.toUpperCase();
  };

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      style={styles.container}
    >
      <Text style={styles.sectionTitle}>Environmental Analysis</Text>
      
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.factorColumn]}>Factor</Text>
        <Text style={[styles.headerCell, styles.valueColumn]}>Current Value</Text>
        <Text style={[styles.headerCell, styles.rangeColumn]}>Optimal Range</Text>
        <Text style={[styles.headerCell, styles.statusColumn]}>Status</Text>
      </View>
      
      {factors.map((factor, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.cell, styles.factorColumn]}>{factor.factor}</Text>
          <Text style={[styles.cell, styles.valueColumn]}>{factor.currentValue}</Text>
          <Text style={[styles.cell, styles.rangeColumn]}>{factor.optimalRange}</Text>
          <View style={styles.statusColumn}>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor(factor.status) + '20' }
            ]}>
              <Text style={[
                styles.statusText, 
                { color: getStatusColor(factor.status) }
              ]}>
                {getStatusText(factor.status)}
              </Text>
            </View>
          </View>
        </View>
      ))}
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
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cell: {
    fontSize: 15,
    color: '#111827',
  },
  factorColumn: {
    width: '25%',
  },
  valueColumn: {
    width: '25%',
  },
  rangeColumn: {
    width: '30%',
  },
  statusColumn: {
    width: '20%',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 