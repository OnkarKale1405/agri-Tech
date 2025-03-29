import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { analyzePlantDisease } from "@/services/plantDiseaseService";
import { PlantDiseaseAnalysis, DEFAULT_INVALID_ANALYSIS } from '@/types/plantDisease';

// Import child components
import StatusIndicator from "@/components/smart/StatusIndicator";
import ImageUpload from '@/components/smart/ImageUpload';
import ProgressIndicator from '@/components/smart/ProgressIndicator';
import DetectionResults from '@/components/smart/DetectionResults';
import EnvironmentalAnalysis from '@/components/smart/EnvironmentalAnalysis';
import TreatmentTimeline from '@/components/smart/TreatmentTimeline';
import SolutionsPanel from '@/components/smart/SolutionsPanel';
import RealTimeMonitoring from '@/components/smart/RealTimeMonitoring';

// Define ProgressStep type
type ProgressStep = {
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
};

// Steps for the progress indicator
const ANALYSIS_STEPS: ProgressStep[] = [
    { title: 'Initializing image processing pipeline...', status: 'pending' },
    { title: 'Performing initial image analysis...', status: 'pending' },
    { title: 'Detecting plant features...', status: 'pending' },
    { title: 'Analyzing disease patterns...', status: 'pending' },
    { title: 'Running AI model predictions...', status: 'pending' },
    { title: 'Generating treatment recommendations...', status: 'pending' },
    { title: 'Finalizing analysis report...', status: 'pending' },
];

export default function PlantDiseaseDetection() {
    // State variables
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [steps, setSteps] = useState<ProgressStep[]>(ANALYSIS_STEPS);
    const [analysis, setAnalysis] = useState<PlantDiseaseAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Handle image selection
    const handleImageSelected = (uri: string) => {
        setImageUri(uri);
        setAnalysis(null);
        setError(null);
        startAnalysis(uri);
    };

    // Start the analysis process
    const startAnalysis = async (uri: string) => {
        setIsLoading(true);
        setProgress(0);
        setSteps(ANALYSIS_STEPS.map(step => ({ ...step, status: 'pending' })));

        try {
            // Simulate the progress steps
            await simulateProgressSteps();

            // Perform the actual analysis using Gemini API
            const result = await analyzePlantDisease(uri);
            setAnalysis(result);
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            setAnalysis(DEFAULT_INVALID_ANALYSIS);
        } finally {
            setIsLoading(false);
        }
    };

    // Simulate progress steps for UI feedback
    const simulateProgressSteps = async () => {
        const totalSteps = ANALYSIS_STEPS.length;
        const stepTime = 800; // milliseconds per step

        for (let i = 0; i < totalSteps; i++) {
            // Update progress percentage
            const newProgress = Math.round(((i + 1) / totalSteps) * 100);
            setProgress(newProgress);

            // Update step status
            const updatedSteps = [...ANALYSIS_STEPS] as ProgressStep[];
            for (let j = 0; j <= i; j++) {
                updatedSteps[j] = {
                    ...updatedSteps[j],
                    status: j === i ? 'in-progress' : 'completed'
                };
            }
            setSteps(updatedSteps);

            // Wait for the step time
            await new Promise(resolve => setTimeout(resolve, stepTime));
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Plant Disease Detection Dashboard</Text>
                <Text style={styles.subtitle}>Upload and analyze plant images for disease detection</Text>
            </View>

            {/* Status Indicators */}
            <View style={styles.statusContainer}>
                <StatusIndicator
                    title="Model Loaded"
                    status="Operational"
                />
                <StatusIndicator
                    title="Processing Ready"
                    status="Operational"
                />
            </View>

            {/* Image Upload */}
            <ImageUpload
                onImageSelected={handleImageSelected}
                isLoading={isLoading}
            />

            {/* Analysis Progress */}
            <ProgressIndicator
                progress={progress}
                steps={steps}
                isVisible={isLoading}
            />

            {/* Detection Results */}
            {analysis && (
                <>
                    <DetectionResults
                        analysis={analysis}
                        imageUri={imageUri}
                        isVisible={!isLoading && analysis !== null}
                    />

                    <EnvironmentalAnalysis
                        factors={analysis.environmentalFactors}
                        isVisible={!isLoading && analysis !== null}
                    />

                    <TreatmentTimeline
                        timeToTreat={analysis.timeToTreat}
                        estimatedRecovery={analysis.estimatedRecovery}
                        yieldImpact={analysis.yieldImpact}
                        isVisible={!isLoading && analysis !== null}
                    />

                    <SolutionsPanel
                        organicTreatments={analysis.organicTreatments}
                        ipmStrategies={analysis.ipmStrategies}
                        preventionMeasures={analysis.preventionPlan}
                        isVisible={!isLoading && analysis !== null}
                    />

                    <RealTimeMonitoring
                        metrics={analysis.realTimeMetrics}
                        isVisible={!isLoading && analysis !== null}
                    />
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    statusContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
}); 