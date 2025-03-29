export interface EnvironmentalFactor {
  factor: string;
  currentValue: string;
  optimalRange: string;
  status: 'optimal' | 'warning' | 'critical';
}

export interface RealTimeMetrics {
  spreadRisk: {
    level: string;
    value: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  };
  diseaseProgression: {
    stage: string;
    rate: number;
    nextCheckDate: string;
  };
  environmentalConditions: {
    temperature: number;
    humidity: number;
    soilMoisture: number;
    lastUpdated: string;
  };
}

export interface PlantDiseaseAnalysis {
  diseaseName: string;
  cropName: string;
  timeToTreat: string;
  estimatedRecovery: string;
  yieldImpact: string;
  severityLevel: 'mild' | 'medium' | 'severe' | 'N/A';
  symptomDescription?: string;
  environmentalFactors: EnvironmentalFactor[];
  realTimeMetrics: RealTimeMetrics;
  organicTreatments: string[];
  ipmStrategies: string[];
  preventionPlan: string[];
  confidenceLevel: number;
  diagnosisSummary: string;
}

export const DEFAULT_INVALID_ANALYSIS: PlantDiseaseAnalysis = {
  diseaseName: "Not Applicable",
  cropName: "Invalid Input",
  confidenceLevel: 0,
  diagnosisSummary: "This appears to be a non-plant image. Please provide a clear image of a plant for analysis.",
  timeToTreat: "N/A",
  estimatedRecovery: "N/A",
  yieldImpact: "N/A",
  severityLevel: "N/A",
  environmentalFactors: [],
  realTimeMetrics: {
    spreadRisk: {
      level: "N/A",
      value: 0,
      trend: "stable"
    },
    diseaseProgression: {
      stage: "N/A",
      rate: 0,
      nextCheckDate: "N/A"
    },
    environmentalConditions: {
      temperature: 0,
      humidity: 0,
      soilMoisture: 0,
      lastUpdated: "N/A"
    }
  },
  organicTreatments: [],
  ipmStrategies: [],
  preventionPlan: []
}; 