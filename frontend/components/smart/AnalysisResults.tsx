// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { FarmingAnalysis } from "../../types/farmingAnalysis"
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// interface AnalysisResultsProps {
//   data: FarmingAnalysis | null;
// }

// // Helper function to render a metric with an icon
// const MetricCard = ({
//   title,
//   value,
//   icon,
//   color = '#3B82F6'
// }: {
//   title: string;
//   value: number;
//   icon: string;
//   color?: string;
// }) => (
//   <View style={styles.metricCard}>
//     <View style={[styles.metricIconContainer, { backgroundColor: `${color}20` }]}>
//       <MaterialCommunityIcons name={icon as any} size={24} color={color} />
//     </View>
//     <Text style={styles.metricTitle}>{title}</Text>
//     <Text style={[styles.metricValue, { color }]}>{value}%</Text>
//   </View>
// );

// // Implementation phase card
// const PhaseCard = ({
//   phase,
//   index
// }: {
//   phase: FarmingAnalysis['implementation']['phases'][0];
//   index: number;
// }) => (
//   <View style={styles.phaseCard}>
//     <View style={styles.phaseDot} />
//     <View style={styles.phaseContent}>
//       <Text style={styles.phaseName}>{phase.name}</Text>
//       <Text style={styles.phaseDuration}>{phase.duration}</Text>
//       <Text style={styles.phaseDescription}>{phase.description}</Text>

//       {phase.keyMilestones.map((milestone, i) => (
//         <View key={i} style={styles.milestoneLine}>
//           <View style={styles.milestoneDot} />
//           <Text style={styles.milestoneText}>{milestone}</Text>
//         </View>
//       ))}
//     </View>
//   </View>
// );

// // Performance metrics chart
// const PerformanceChart = ({ metrics }: { metrics: Record<string, number> }) => {
//   const maxHeight = 100; // Max height for bars

//   return (
//     <View style={styles.chartContainer}>
//       {Object.entries(metrics).map(([key, value], index) => (
//         <View key={index} style={styles.chartColumn}>
//           <View style={[styles.chartBar, { height: (value / 100) * maxHeight }]} />
//           <Text style={styles.chartLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default function AnalysisResults({ data }: AnalysisResultsProps) {
//   if (!data) return null;

//   const { techniqueAnalysis, implementation, metrics } = data;

//   return (
//     <View style={styles.container} className='mb-12'>
//       {/* Overview Card */}
//       <View style={styles.overviewCard}>
//         <Text style={styles.cardTitle}>
//           {techniqueAnalysis.overview.name} Implementation Overview
//         </Text>

//         <View style={styles.statsRow}>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Success Rate</Text>
//             <Text style={styles.statValue}>{techniqueAnalysis.overview.successRate}%</Text>
//           </View>

//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Time to ROI</Text>
//             <Text style={styles.statValue}>{techniqueAnalysis.overview.timeToRoi}</Text>
//           </View>

//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Estimated Cost/ acre</Text>
//             <Text style={styles.statValue}>₹{techniqueAnalysis.overview.estimatedCost.toLocaleString()}</Text>
//           </View>

//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>ROI</Text>
//             <Text style={styles.statValue}>{techniqueAnalysis.overview.roi}%</Text>
//           </View>
//         </View>
//       </View>

//       {/* Implementation Plan */}
//       <View style={styles.sectionCard}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name="list" size={20} color="#6366F1" />
//           <Text style={styles.sectionTitle}>Implementation Plan</Text>
//         </View>

//         {implementation.phases.map((phase, index) => (
//           <PhaseCard key={index} phase={phase} index={index} />
//         ))}
//       </View>

//       {/* Resource Efficiency */}
//       <View style={styles.sectionCard}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name="analytics-outline" size={20} color="#6366F1" />
//           <Text style={styles.sectionTitle}>Resource Efficiency</Text>
//         </View>

//         <View style={styles.metricsGrid}>
//           <MetricCard
//             title="Water"
//             value={metrics.resourceEfficiency.water}
//             icon="water"
//             color="#0EA5E9"
//           />
//           <MetricCard
//             title="Labor"
//             value={metrics.resourceEfficiency.labor}
//             icon="account-group"
//             color="#8B5CF6"
//           />
//           <MetricCard
//             title="Energy"
//             value={metrics.resourceEfficiency.energy}
//             icon="flash"
//             color="#F59E0B"
//           />
//           <MetricCard
//             title="Yield"
//             value={metrics.resourceEfficiency.yield}
//             icon="sprout"
//             color="#10B981"
//           />
//         </View>
//       </View>

//       {/* Environmental Impact */}
//       <View style={styles.sectionCard}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name="earth" size={20} color="#6366F1" />
//           <Text style={styles.sectionTitle}>Environmental Impact</Text>
//         </View>

//         <View style={styles.metricsGrid}>
//           <MetricCard
//             title="Carbon Footprint"
//             value={metrics.environmentalImpact.carbonFootprint}
//             icon="molecule-co2"
//             color="#EF4444"
//           />
//           <MetricCard
//             title="Water Conservation"
//             value={metrics.environmentalImpact.waterConservation}
//             icon="water-check"
//             color="#0EA5E9"
//           />
//           <MetricCard
//             title="Soil Health"
//             value={metrics.environmentalImpact.soilHealth}
//             icon="seed"
//             color="#65A30D"
//           />
//         </View>
//       </View>

//       {/* Performance Metrics Chart */}
//       <View style={styles.sectionCard}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name="bar-chart" size={20} color="#6366F1" />
//           <Text style={styles.sectionTitle}>Performance Metrics</Text>
//         </View>

//         <PerformanceChart metrics={{
//           water: metrics.resourceEfficiency.water,
//           labor: metrics.resourceEfficiency.labor,
//           energy: metrics.resourceEfficiency.energy,
//           sustainability: metrics.resourceEfficiency.sustainability
//         }} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   overviewCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#1E40AF',
//   },
//   statsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   statItem: {
//     width: '50%',
//     paddingHorizontal: 8,
//     marginBottom: 16,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     marginBottom: 4,
//   },
//   statValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#334155',
//   },
//   sectionCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//     color: '#4338CA',
//   },
//   metricsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   metricCard: {
//     width: '50%',
//     paddingHorizontal: 8,
//     marginBottom: 16,
//   },
//   metricIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   metricTitle: {
//     fontSize: 14,
//     color: '#64748B',
//     marginBottom: 4,
//   },
//   metricValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   phaseCard: {
//     flexDirection: 'row',
//     marginBottom: 24,
//   },
//   phaseDot: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: '#4F46E5',
//     marginRight: 12,
//     marginTop: 2,
//   },
//   phaseContent: {
//     flex: 1,
//   },
//   phaseName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#334155',
//     marginBottom: 4,
//   },
//   phaseDuration: {
//     fontSize: 12,
//     color: '#64748B',
//     marginBottom: 8,
//   },
//   phaseDescription: {
//     fontSize: 14,
//     color: '#334155',
//     marginBottom: 12,
//     lineHeight: 20,
//   },
//   milestoneLine: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   milestoneDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#94A3B8',
//     marginRight: 8,
//   },
//   milestoneText: {
//     fontSize: 14,
//     color: '#64748B',
//     flex: 1,
//   },
//   chartContainer: {
//     height: 150,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//     paddingVertical: 20,
//   },
//   chartColumn: {
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     width: '20%',
//   },
//   chartBar: {
//     width: 20,
//     backgroundColor: '#6366F1',
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   chartLabel: {
//     fontSize: 12,
//     color: '#64748B',
//   },
// }); 

import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeInRight,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';

interface FarmingAnalysis {
  techniqueAnalysis: {
    overview: {
      name: string;
      estimatedCost: number;
      roi: number;
      successRate: number;
      timeToRoi: string;
      sustainabilityScore: number;
    }
  };
  implementation: {
    phases: {
      name: string;
      duration: string;
      description: string;
      keyMilestones: string[];
      estimatedCost: number;
    }[];
  };
  metrics: {
    resourceEfficiency: {
      water: number;
      labor: number;
      energy: number;
      yield: number;
      sustainability: number;
    };
    environmentalImpact: {
      carbonFootprint: number;
      waterConservation: number;
      soilHealth: number;
    };
  };
}

interface AnalysisResultsProps {
  analysis: FarmingAnalysis | null;
  cropType: string;
  isLoading: boolean;
  error: string | null;
}

// Enhanced line chart for resource efficiency metrics using Recharts
const ResourceChart = ({
  data
}: {
  data: {
    water: number;
    labor: number;
    energy: number;
    yield: number;
    sustainability: number;
  }
}) => {
  const screenWidth = Dimensions.get('window').width - 64;

  return (
    <Animated.View
      style={styles.chartContainer}
      entering={FadeIn.delay(300).duration(1000)}
    >
      <LineChart
        data={{
          labels: ['Water', 'Labor', 'Energy', 'Yield', 'Sustainability'],
          datasets: [
            {
              data: [data.water, data.labor, data.energy, data.yield, data.sustainability]
            }
          ]
        }}
        width={screenWidth}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#f7f9fc",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#059669",
          }
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </Animated.View>
  );
};


// Card component with animations
const Card = ({
  style,
  icon,
  title,
  subtitle,
  children,
  delay = 0,
  onPress
}: {
  style?: any;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
  onPress?: () => void;
}) => {
  // Animation for card scale on press
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withTiming(0.98, { duration: 200 });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withTiming(1, { duration: 200 });
      onPress();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View>
        <Animated.View
          style={[styles.card, style, animatedStyle]}
          entering={FadeInRight.delay(delay).duration(800)}
        >
          <View style={styles.cardHeader}>
            {icon}
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>{title}</Text>
              {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          <View style={styles.cardContent}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default function AnalysisResults({ analysis, cropType, isLoading, error }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <Animated.View
        style={styles.loadingContainer}
        entering={FadeIn.duration(500)}
      >
        <Ionicons name="hourglass-outline" size={48} color="#16a34a" />
        <Text style={styles.loadingText}>Analyzing farm data...</Text>
        <Text style={styles.processingText}>This may take a moment as our AI evaluates multiple factors</Text>
      </Animated.View>
    );
  }

  if (error) {
    return (
      <Animated.View
        style={styles.errorContainer}
        entering={FadeIn.duration(500)}
      >
        <Ionicons name="alert-circle-outline" size={48} color="#DC2626" />
        <Text style={styles.errorTitle}>Analysis Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorHelp}>Please try again or contact support if the issue persists.</Text>
      </Animated.View>
    );
  }

  // If analysis is null or undefined, return empty state
  if (!analysis) {
    return (
      <Animated.View
        style={styles.emptyContainer}
        entering={FadeIn.duration(500)}
      >
        <MaterialCommunityIcons name="chart-bell-curve" size={48} color="#64748B" />
        <Text style={styles.emptyText}>Generate an analysis to see detailed insights</Text>
      </Animated.View>
    );
  }

  const { techniqueAnalysis, implementation, metrics } = analysis;

  // Format currency to Indian Rupees
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
    >
      {/* TECHNIQUE OVERVIEW CARD */}
      <Card
        style={styles.overviewCard}
        icon={<MaterialCommunityIcons name="chart-line" size={24} color="#FFFFFF" />}
        title={`${techniqueAnalysis.overview.name} on ${cropType}`}
        subtitle="Implementation Overview"
        delay={0}
      >
        <Animated.View
          style={styles.statsGrid}
          entering={FadeInDown.delay(200).duration(800)}
        >
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Success Rate</Text>
            <Text style={styles.statValue}>{techniqueAnalysis.overview.successRate}%</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Time to ROI</Text>
            <Text style={styles.statValue}>{techniqueAnalysis.overview.timeToRoi}</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Estimated Cost</Text>
            <Text style={styles.statValue}>{formatCurrency(techniqueAnalysis.overview.estimatedCost)}</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>ROI</Text>
            <Text style={styles.statValue}>{techniqueAnalysis.overview.roi}%</Text>
          </View>
        </Animated.View>
      </Card>

      {/* IMPLEMENTATION PLAN CARD */}
      <Card
        style={styles.implementationCard}
        icon={<Ionicons name="list" size={24} color="#FFFFFF" />}
        title="Implementation Plan"
        delay={200}
      >
        {implementation.phases.slice(0, 5).map((phase, index) => (
          <Animated.View
            key={index}
            style={styles.phaseContainer}
            entering={FadeInDown.delay(300 + (index * 100)).duration(800)}
          >
            <View style={styles.phaseHeader}>
              <View style={styles.phaseDot} />
              <View style={styles.phaseTextContainer}>
                <Text style={styles.phaseName}>{phase.name}</Text>
                <Text style={styles.phaseDuration}>{phase.duration}</Text>
              </View>
            </View>
            <Text style={styles.phaseDescription}>{phase.description}</Text>
          </Animated.View>
        ))}
      </Card>

      {/* PERFORMANCE METRICS CARD */}
      <Card
        style={styles.metricsCard}
        icon={<Ionicons name="analytics" size={24} color="#FFFFFF" />}
        title="Performance Metrics"
        delay={400}
      >
        <ResourceChart data={metrics.resourceEfficiency} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#F8FAFC',
  },
  // Modify the existing container style
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overviewCard: {
    backgroundColor: '#dcfce7',
  },
  implementationCard: {
    backgroundColor: '#dcfce7',
  },
  metricsCard: {
    backgroundColor: '#dcfce7',
    marginBottom: 68
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#16a34a',
  },
  cardHeaderText: {
    marginLeft: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  cardContent: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  statBox: {
    width: '48%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  phaseContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#059669',
    marginRight: 8,
  },
  phaseTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
  },
  phaseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  phaseDuration: {
    fontSize: 14,
    color: '#64748B',
  },
  phaseDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginLeft: 20,
  },
  // Chart styles
  chartContainer: {
    marginBottom: 8,
  },
  rechartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  // Loading state
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 16,
    marginBottom: 8,
  },
  processingText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  // Error state
  errorContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorHelp: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  // Empty state
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
  },
}); 