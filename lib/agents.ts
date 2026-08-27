// lib/agents.ts - MOCK VERSION

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

export async function intentDetectionAgent(prompt: string): Promise<string> {
  await new Promise(r => setTimeout(r, 300));
  const categories = ['Coding', 'Writing', 'Image Generation', 'Marketing', 'Education', 'Business'];
  return categories[Math.floor(Math.random() * categories.length)];
}

export async function contextAnalysisAgent(prompt: string): Promise<AnalysisResult> {
  await new Promise(r => setTimeout(r, 300));
  return {
    clarityScore: 68,
    specificityScore: 62,
    contextScore: 55,
    formatScore: 70,
    overallScore: 64,
    missingElements: ['Specific use case', 'Target audience', 'Expected output format'],
  };
}

export async function optimizationAgent(prompt: string): Promise<OptimizationResult> {
  await new Promise(r => setTimeout(r, 300));
  return {
    optimizedPrompt: `You are an expert assistant specializing in helping users. Your task is to: ${prompt}\n\nPlease provide a comprehensive, well-structured response that addresses all aspects of this request. Consider edge cases and provide examples where relevant.`,
    improvements: [
      {
        type: 'Added Expert Role',
        description: 'Defined AI as a subject matter expert',
        reason: 'Helps the AI understand the context and provide authoritative responses',
      },
      {
        type: 'Added Constraints',
        description: 'Requested comprehensive and structured response',
        reason: 'Ensures organized, detailed output that covers all aspects',
      },
      {
        type: 'Added Context Hints',
        description: 'Mentioned edge cases and examples',
        reason: 'Prompts the AI to think deeper and provide richer responses',
      },
    ],
  };
}

export async function evaluationAgent(
  originalPrompt: string,
  optimizedPrompt: string
): Promise<EvaluationResult> {
  await new Promise(r => setTimeout(r, 300));
  return {
    score: 84,
    clarity: 87,
    specificity: 82,
    context: 85,
    format: 83,
    explanation: 'The optimized prompt significantly improves clarity by defining the AI role, adding specific constraints, and requesting structured output.',
  };
}

export async function variationsGenerator(optimizedPrompt: string): Promise<Variation[]> {
  await new Promise(r => setTimeout(r, 300));
  return [
    {
      type: 'Professional',
      prompt: `[Professional Tone] ${optimizedPrompt.substring(0, 80)}... Please respond in a formal, business-appropriate manner.`,
    },
    {
      type: 'Creative',
      prompt: `[Creative Approach] ${optimizedPrompt.substring(0, 80)}... Think innovatively and propose unconventional solutions.`,
    },
    {
      type: 'Concise',
      prompt: `[Brief & Direct] ${optimizedPrompt.substring(0, 80)}... Provide a concise response in minimal words.`,
    },
  ];
}