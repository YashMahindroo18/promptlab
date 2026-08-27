// lib/agents.ts - MOCK VERSION (temporary)

export interface AnalysisResult {
  category: string;
  clarityScore: number;
  specificityScore: number;
  contextScore: number;
  formatScore: number;
  overallScore: number;
  missingElements: string[];
}

export interface OptimizationResult {
  optimizedPrompt: string;
  improvements: Array<{
    type: string;
    description: string;
    reason: string;
  }>;
}

export interface EvaluationResult {
  score: number;
  clarity: number;
  specificity: number;
  context: number;
  format: number;
  explanation: string;
}

export interface Variation {
  type: string;
  prompt: string;
}

// Mock versions - replace with real Gemini calls later
export async function intentDetectionAgent(prompt: string): Promise<string> {
  await new Promise(r => setTimeout(r, 500));
  const categories = ['Coding', 'Writing', 'Image Generation', 'Marketing', 'Education', 'Business'];
  return categories[Math.floor(Math.random() * categories.length)];
}

export async function contextAnalysisAgent(prompt: string): Promise<AnalysisResult> {
  await new Promise(r => setTimeout(r, 500));
  return {
    clarityScore: 65,
    specificityScore: 55,
    contextScore: 50,
    formatScore: 60,
    overallScore: 58,
    missingElements: ['Target audience', 'Expected output format', 'Specific constraints'],
  };
}

export async function optimizationAgent(prompt: string): Promise<OptimizationResult> {
  await new Promise(r => setTimeout(r, 500));
  return {
    optimizedPrompt: `You are an expert assistant. ${prompt} Please provide a clear, structured response following best practices.`,
    improvements: [
      {
        type: 'Added Role',
        description: 'Defined expertise level for the AI',
        reason: 'Helps AI understand the context and respond appropriately',
      },
      {
        type: 'Added Constraints',
        description: 'Specified output should be structured',
        reason: 'Ensures consistent and organized responses',
      },
      {
        type: 'Added Format',
        description: 'Requested clear, best-practice response',
        reason: 'Improves readability and usefulness of output',
      },
    ],
  };
}

export async function evaluationAgent(
  originalPrompt: string,
  optimizedPrompt: string
): Promise<EvaluationResult> {
  await new Promise(r => setTimeout(r, 500));
  return {
    score: 82,
    clarity: 85,
    specificity: 80,
    context: 80,
    format: 82,
    explanation: 'The optimized prompt is significantly clearer with defined role, context, and output format.',
  };
}

export async function variationsGenerator(optimizedPrompt: string): Promise<Variation[]> {
  await new Promise(r => setTimeout(r, 500));
  return [
    {
      type: 'Professional',
      prompt: `[Professional tone] ${optimizedPrompt}`,
    },
    {
      type: 'Creative',
      prompt: `[Creative and innovative approach] ${optimizedPrompt}`,
    },
    {
      type: 'Concise',
      prompt: `[Brief and direct] ${optimizedPrompt}`,
    },
  ];
}