import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { analyzeSatellite } from "@/services/SatelliteServices"

const { width } = Dimensions.get('window');

const exampleData = {
    vegetation_health: {
        NDVI: 0.72,
        NDWI: 0.35,
        MSAVI: 0.68,
        health_status: "Healthy"
    },
    crop_diseases: [
        {
            disease_name: "Leaf Rust",
            affected_crop: "Wheat",
            severity: "Low",
            confidence_score: 75
        }
    ],
    soil_moisture_analysis: {
        moisture_level: "38%",
        soil_degradation: "No",
        drought_stress: "No"
    },
    pest_infestation: [
        {
            pest_type: "Aphids",
            affected_area_percentage: "12%",
            severity: "Low"
        }
    ],
    crop_yield_prediction: {
        growth_stage: "Flowering",
        estimated_yield: "3600 kg/ha"
    },
    land_use_monitoring: {
        deforestation_detected: "No",
        urban_expansion: "No",
        land_cover_change: "Minor vegetation changes detected"
    }
};

// Helper function to get color based on health/severity
const getSeverityColor = (value) => {
    if (typeof value === 'string') {
        switch (value.toLowerCase()) {
            case 'healthy':
            case 'low':
            case 'no':
                return '#16a34a'; // Our primary green
            case 'moderate':
            case 'stressed':
                return '#fbbf24'; // Amber/warning color
            case 'high':
            case 'dry':
            case 'yes':
                return '#dc2626'; // Red/danger color
            default:
                return '#64748b'; // Default slate
        }
    } else if (typeof value === 'number') {
        if (value >= 0.6) return '#16a34a';
        if (value >= 0.3) return '#fbbf24';
        return '#dc2626';
    }
    return '#64748b';
};



const startAnalysis = async () => {
    setIsLoading(true);

    try {
        const result = await analyzeSatellite();
        setAnalysis(result);
    } catch (err) {
        console.error('Analysis error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setAnalysis(DEFAULT_INVALID_ANALYSIS);
    } finally {
        setIsLoading(false);
    }
};

// Accordion section component
const AccordionSection = ({ title, icon, children }) => {
    const [expanded, setExpanded] = useState(false);
    const rotateZ = useSharedValue(0);

    const toggleAccordion = () => {
        rotateZ.value = withTiming(expanded ? 0 : 1, { duration: 300 });
        setExpanded(!expanded);
    };

    const iconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotateZ: `${interpolate(rotateZ.value, [0, 1], [0, 90], Extrapolate.CLAMP)}deg` }
            ]
        };
    });

    return (
        <View style={styles.accordionContainer}>
            <TouchableOpacity
                style={styles.accordionHeader}
                onPress={toggleAccordion}
                activeOpacity={0.7}
            >
                <View style={styles.accordionTitle}>
                    <MaterialCommunityIcons name={icon} size={24} color="#16a34a" />
                    <Text style={styles.accordionTitleText}>{title}</Text>
                </View>
                <Animated.View style={iconStyle}>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#16a34a" />
                </Animated.View>
            </TouchableOpacity>

            {expanded && (
                <View style={styles.accordionContent}>
                    {children}
                </View>
            )}
        </View>
    );
};

// Metric card for displaying values with visual indicators
const MetricCard = ({ label, value, unit = "", description = null }) => {
    const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
    const color = getSeverityColor(value);

    return (
        <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>{label}</Text>
            <View style={styles.metricValueContainer}>
                <Text style={[styles.metricValue, { color }]}>{displayValue}</Text>
                {unit && <Text style={styles.metricUnit}>{unit}</Text>}
            </View>
            {description && <Text style={styles.metricDescription}>{description}</Text>}
        </View>
    );
};

// Progress bar component for visualization
const ProgressBar = ({ value, maxValue = 1 }) => {
    const percentage = Math.min(Math.max(value / maxValue, 0), 1) * 100;
    const color = getSeverityColor(value);

    return (
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarTrack]}>
                <View
                    style={[
                        styles.progressBarFill,
                        { width: `${percentage}%`, backgroundColor: color }
                    ]}
                />
            </View>
            <Text style={styles.progressBarText}>{percentage.toFixed(0)}%</Text>
        </View>
    );
};

// List item component for array data
const ListItem = ({ item }) => {
    return (
        <View style={styles.listItem}>
            {Object.entries(item).map(([key, value], index) => {
                // Convert camelCase or snake_case to Title Case
                const formattedKey = key
                    .replace(/_/g, ' ')
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());

                // Format the value display
                let displayValue = value;
                if (key.includes('percentage') || key.includes('score')) {
                    displayValue = typeof value === 'string' ? value : `${value}%`;
                }

                return (
                    <View key={index} style={styles.listItemRow}>
                        <Text style={styles.listItemLabel}>{formattedKey}:</Text>
                        <Text
                            style={[
                                styles.listItemValue,
                                key.includes('severity') && { color: getSeverityColor(value) }
                            ]}
                        >
                            {displayValue}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const SatelliteAnalysis = ({ data = exampleData }) => {

    const [analysis, setAnalysis] = useState(null);

    const {
        vegetation_health,
        crop_diseases,
        soil_moisture_analysis,
        pest_infestation,
        crop_yield_prediction,
        land_use_monitoring
    } = data;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="satellite-variant" size={32} color="#16a34a" />
                <Text style={styles.headerTitle}>Satellite Analysis</Text>
            </View>

            <View style={styles.satImageCont}>
                <Image source={require("../assets/images/img1.jpeg")} style={styles.image} />
                <Image source={require("../assets/images/img2.jpeg")} style={styles.image} />
                <Image source={require("../assets/images/img3.jpeg")} style={styles.image} />
                <Image source={require("../assets/images/img4.jpeg")} style={styles.image} />
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                    <MaterialCommunityIcons name="leaf" size={24} color="#16a34a" />
                    <Text style={styles.summaryLabel}>Health</Text>
                    <Text style={[
                        styles.summaryValue,
                        { color: getSeverityColor(vegetation_health.health_status) }
                    ]}>
                        {vegetation_health.health_status}
                    </Text>
                </View>

                <View style={styles.summaryItem}>
                    <MaterialCommunityIcons name="water-percent" size={24} color="#16a34a" />
                    <Text style={styles.summaryLabel}>Moisture</Text>
                    <Text style={styles.summaryValue}>{soil_moisture_analysis.moisture_level}</Text>
                </View>

                <View style={styles.summaryItem}>
                    <MaterialCommunityIcons name="sprout" size={24} color="#16a34a" />
                    <Text style={styles.summaryLabel}>Growth</Text>
                    <Text style={styles.summaryValue}>{crop_yield_prediction.growth_stage}</Text>
                </View>
            </View>

            {/* Vegetation Health Section */}
            <AccordionSection title="Vegetation Health" icon="leaf-maple">
                <View style={styles.sectionContent}>
                    <Text style={styles.sectionDescription}>
                        Analysis of plant health based on various vegetation indices
                    </Text>

                    <View style={styles.metricsContainer}>
                        <MetricCard
                            label="NDVI"
                            value={vegetation_health.NDVI}
                            description="Normalized Difference Vegetation Index"
                        />
                        <MetricCard
                            label="NDWI"
                            value={vegetation_health.NDWI}
                            description="Normalized Difference Water Index"
                        />
                        <MetricCard
                            label="MSAVI"
                            value={vegetation_health.MSAVI}
                            description="Modified Soil-Adjusted Vegetation Index"
                        />
                    </View>

                    <View style={styles.statusCard}>
                        <Text style={styles.statusLabel}>Overall Health Status</Text>
                        <Text style={[
                            styles.statusValue,
                            { color: getSeverityColor(vegetation_health.health_status) }
                        ]}>
                            {vegetation_health.health_status.toUpperCase()}
                        </Text>
                    </View>
                </View>
            </AccordionSection>

            {/* Crop Diseases Section */}
            <AccordionSection title="Crop Diseases" icon="bug-outline">
                <View style={styles.sectionContent}>
                    {crop_diseases.length > 0 ? (
                        crop_diseases.map((disease, index) => (
                            <View key={index} style={styles.diseaseCard}>
                                <View style={styles.diseaseHeader}>
                                    <Text style={styles.diseaseName}>{disease.disease_name}</Text>
                                    <View style={[
                                        styles.severityBadge,
                                        { backgroundColor: getSeverityColor(disease.severity) + '20' }
                                    ]}>
                                        <Text style={[
                                            styles.severityText,
                                            { color: getSeverityColor(disease.severity) }
                                        ]}>
                                            {disease.severity}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.diseaseDetail}>Affected Crop: {disease.affected_crop}</Text>
                                <Text style={styles.diseaseDetail}>Confidence: {disease.confidence_score}%</Text>
                                <ProgressBar value={parseInt(disease.confidence_score, 10)} maxValue={100} />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyStateText}>No crop diseases detected</Text>
                    )}
                </View>
            </AccordionSection>

            {/* Soil Analysis Section */}
            <AccordionSection title="Soil Analysis" icon="terrain">
                <View style={styles.sectionContent}>
                    <MetricCard
                        label="Moisture Level"
                        value={soil_moisture_analysis.moisture_level}
                    />

                    <View style={styles.soilIndicatorsContainer}>
                        <View style={styles.indicatorItem}>
                            <Text style={styles.indicatorLabel}>Soil Degradation</Text>
                            <View style={[
                                styles.indicatorDot,
                                { backgroundColor: getSeverityColor(soil_moisture_analysis.soil_degradation) }
                            ]} />
                            <Text style={styles.indicatorValue}>
                                {soil_moisture_analysis.soil_degradation}
                            </Text>
                        </View>

                        <View style={styles.indicatorItem}>
                            <Text style={styles.indicatorLabel}>Drought Stress</Text>
                            <View style={[
                                styles.indicatorDot,
                                { backgroundColor: getSeverityColor(soil_moisture_analysis.drought_stress) }
                            ]} />
                            <Text style={styles.indicatorValue}>
                                {soil_moisture_analysis.drought_stress}
                            </Text>
                        </View>
                    </View>
                </View>
            </AccordionSection>

            {/* Pest Infestation Section */}
            <AccordionSection title="Pest Infestation" icon="bug">
                <View style={styles.sectionContent}>
                    {pest_infestation.length > 0 ? (
                        pest_infestation.map((pest, index) => (
                            <ListItem key={index} item={pest} />
                        ))
                    ) : (
                        <Text style={styles.emptyStateText}>No pest infestation detected</Text>
                    )}
                </View>
            </AccordionSection>

            {/* Crop Yield Prediction */}
            <AccordionSection title="Yield Prediction" icon="sprout">
                <View style={styles.sectionContent}>
                    <View style={styles.yieldContainer}>
                        <View style={styles.yieldInfo}>
                            <Text style={styles.yieldLabel}>Growth Stage</Text>
                            <Text style={styles.yieldValue}>{crop_yield_prediction.growth_stage}</Text>
                        </View>

                        <View style={styles.yieldInfo}>
                            <Text style={styles.yieldLabel}>Estimated Yield</Text>
                            <Text style={styles.yieldValue}>{crop_yield_prediction.estimated_yield}</Text>
                        </View>
                    </View>
                </View>
            </AccordionSection>

            {/* Land Use Monitoring */}
            <AccordionSection title="Land Use Changes" icon="map-outline">
                <View style={styles.sectionContent}>
                    <View style={styles.landUseContainer}>
                        <View style={styles.landUseRow}>
                            <Text style={styles.landUseLabel}>Deforestation</Text>
                            <View style={[
                                styles.landUseIndicator,
                                { backgroundColor: getSeverityColor(land_use_monitoring.deforestation_detected) + '20' }
                            ]}>
                                <Text style={[
                                    styles.landUseValue,
                                    { color: getSeverityColor(land_use_monitoring.deforestation_detected) }
                                ]}>
                                    {land_use_monitoring.deforestation_detected}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.landUseRow}>
                            <Text style={styles.landUseLabel}>Urban Expansion</Text>
                            <View style={[
                                styles.landUseIndicator,
                                { backgroundColor: getSeverityColor(land_use_monitoring.urban_expansion) + '20' }
                            ]}>
                                <Text style={[
                                    styles.landUseValue,
                                    { color: getSeverityColor(land_use_monitoring.urban_expansion) }
                                ]}>
                                    {land_use_monitoring.urban_expansion}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.landUseChanges}>
                            {land_use_monitoring.land_cover_change}
                        </Text>
                    </View>
                </View>
            </AccordionSection>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    satImageCont: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
    },
    image: {
        width: "48%",
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    contentContainer: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#16a34a',
        marginLeft: 12,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        backgroundColor: '#dcfce7',
        borderRadius: 12,
        padding: 16,
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 12,
        color: '#374151',
        marginTop: 4,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    accordionContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    accordionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accordionTitleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#16a34a',
        marginLeft: 12,
    },
    accordionContent: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    sectionContent: {
        gap: 16,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 8,
    },
    metricsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    metricCard: {
        backgroundColor: '#dcfce7',
        borderRadius: 8,
        padding: 12,
        width: '48%',
        flex: 1,
        minWidth: 140,
    },
    metricLabel: {
        fontSize: 12,
        color: '#374151',
        marginBottom: 4,
    },
    metricValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    metricValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    metricUnit: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 4,
    },
    metricDescription: {
        fontSize: 10,
        color: '#64748b',
        marginTop: 4,
    },
    statusCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 8,
    },
    statusValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    diseaseCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 12,
    },
    diseaseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    diseaseName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    severityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#fef3c7',
    },
    severityText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#16a34a',
    },
    diseaseDetail: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 4,
    },
    progressBarContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    progressBarTrack: {
        height: 8,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        flex: 1,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#16a34a',
    },
    progressBarText: {
        fontSize: 12,
        color: '#64748b',
        width: 40,
        textAlign: 'right',
    },
    soilIndicatorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    indicatorItem: {
        alignItems: 'center',
        padding: 12,
    },
    indicatorLabel: {
        fontSize: 12,
        color: '#64748b',
        marginBottom: 8,
    },
    indicatorDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#16a34a',
        marginBottom: 8,
    },
    indicatorValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    emptyStateText: {
        fontSize: 14,
        color: '#64748b',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 12,
    },
    listItem: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 12,
    },
    listItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    listItemLabel: {
        fontSize: 14,
        color: '#64748b',
    },
    listItemValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#334155',
    },
    yieldContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    yieldInfo: {
        backgroundColor: '#dcfce7',
        borderRadius: 8,
        padding: 16,
        flex: 1,
        minWidth: 140,
    },
    yieldLabel: {
        fontSize: 12,
        color: '#374151',
        marginBottom: 4,
    },
    yieldValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    landUseContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    landUseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    landUseLabel: {
        fontSize: 14,
        color: '#64748b',
    },
    landUseIndicator: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        backgroundColor: '#dcfce7',
    },
    landUseValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#16a34a',
    },
    landUseChanges: {
        fontSize: 14,
        color: '#334155',
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 12,
    },
});

export default SatelliteAnalysis;