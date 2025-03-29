export interface FarmingAnalysis {
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
    phases: Array<{
      name: string;
      duration: string;
      description: string;
      keyMilestones: string[];
      estimatedCost: number;
    }>;
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