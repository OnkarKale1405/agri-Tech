// import React, { useState } from 'react';
// import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
// import FarmingForm from "@/components/smart/FarmingForm"
// import AnalysisResults from '@/components/smart/AnalysisResults';
// import { generateFarmingAnalysis, FarmingAnalysisParams } from "@/services/geminiService"
// import { FarmingAnalysis } from '@/types/farmingAnalysis';

// export default function SmartFarming() {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [analysisData, setAnalysisData] = useState<FarmingAnalysis | null>(null);

//     const handleSubmit = async (data: FarmingAnalysisParams) => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             const result = await generateFarmingAnalysis(data);
//             setAnalysisData(result);
//         } catch (err: any) {
//             console.error('Error generating analysis:', err);
//             setError(err?.message || 'Failed to generate farming analysis. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <ScrollView
//             className="flex-1 bg-green-100"
//             contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
//             showsVerticalScrollIndicator={true}
//             bounces={true}
//         >
//             <View className="bg-emerald-600 rounded-b-3xl p-4">
//                 <FarmingForm onSubmit={handleSubmit} isLoading={isLoading} />
//             </View>

//             {isLoading && (
//                 <View className="p-5 items-center">
//                     <ActivityIndicator size="large" color="#10B981" />
//                     <Text className="mt-3 text-base text-gray-600 text-center">
//                         Generating AI-powered farming analysis...
//                     </Text>
//                 </View>
//             )}

//             {error && (
//                 <View className="p-5 bg-red-100 rounded-lg m-4">
//                     <Text className="text-red-500 text-base">{error}</Text>
//                 </View>
//             )}

//             {!isLoading && !error && analysisData && (
//                 <AnalysisResults data={analysisData} />
//             )}

//             <View className="inline-flex gap-2 items-center px-4 py-2 rounded-full border border-emerald-100 bg-white/50 flex-row mb-5 self-center">
//                 <Text className="text-sm text-gray-600">
//                     Powered by Agricultural Ministry of India APIs
//                 </Text>
//             </View>
//         </ScrollView>
//     );
// }

import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import FarmingForm from "@/components/smart/FarmingForm";
import AnalysisResults from "@/components/smart/AnalysisResults";
import { generateFarmingAnalysis } from '../services/geminiService';

// Define FarmingAnalysis type
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

export default function SmartFarming() {
    // State for form values
    const [farmSize, setFarmSize] = useState('');
    const [cropType, setCropType] = useState('Rice');
    const [budget, setBudget] = useState('₹50,000 - ₹1,00,000');
    const [selectedTechnique, setSelectedTechnique] = useState('Organic Farming');

    // State for analysis results
    const [analysis, setAnalysis] = useState<FarmingAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to handle form submission
    const handleGenerateAnalysis = async () => {
        if (!farmSize) {
            setError('Please enter your farm size to generate analysis');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await generateFarmingAnalysis({
                farmingTechnique: selectedTechnique,
                farmSize: parseFloat(farmSize) || 1, // Convert to number, default to 1 if NaN
                budget,
                cropType
            });

            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate analysis. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={true}
        >
            <View style={styles.formSection}>
                <FarmingForm
                    farmSize={farmSize}
                    setFarmSize={setFarmSize}
                    cropType={cropType}
                    setCropType={setCropType}
                    budget={budget}
                    setBudget={setBudget}
                    selectedTechnique={selectedTechnique}
                    setSelectedTechnique={setSelectedTechnique}
                    onSubmit={handleGenerateAnalysis}
                />
            </View>

            <View style={styles.resultsSection}>
                <AnalysisResults
                    analysis={analysis}
                    cropType={cropType}
                    isLoading={isLoading}
                    error={error}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#F8FAFC',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#F8FAFC',
    },
    formSection: {
        backgroundColor: '#F8FAFC',
    },
    resultsSection: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    }
});
