// app/api/optimize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  intentDetectionAgent,
  contextAnalysisAgent,
  optimizationAgent,
  evaluationAgent,
  variationsGenerator,
} from '@/lib/agents';

const prisma = new PrismaClient();

// app/api/optimize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  intentDetectionAgent,
  contextAnalysisAgent,
  optimizationAgent,
  evaluationAgent,
  variationsGenerator,
} from '@/lib/agents';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { prompt, title } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('Starting optimization pipeline...');

    // Agent 1: Detect Intent
    console.log('1. Detecting intent...');
    const category = await intentDetectionAgent(prompt);

    // Agent 2: Analyze Context
    console.log('2. Analyzing context...');
    const analysis = await contextAnalysisAgent(prompt);

    // Agent 3: Optimize Prompt
    console.log('3. Optimizing prompt...');
    const optimization = await optimizationAgent(prompt);

    // Agent 4: Evaluate
    console.log('4. Evaluating...');
    const evaluation = await evaluationAgent(prompt, optimization.optimizedPrompt);

    // Generate Variations
    console.log('5. Generating variations...');
    const variations = await variationsGenerator(optimization.optimizedPrompt);

    // Generate ID independent of database
    const responseId = uuidv4();

    // Save to Database (optional - may fail on Vercel)
    console.log('6. Saving to database...');
    try {
      await prisma.prompt.create({
        data: {
          id: responseId,
          title: title || 'Untitled Prompt',
          category: category || 'Other',
          originalPrompt: prompt,
          optimizedPrompt: optimization.optimizedPrompt,
          score: evaluation.score,
          clarity: evaluation.clarity,
          specificity: evaluation.specificity,
          context: evaluation.context,
          format: evaluation.format,
          improvements: JSON.stringify(optimization.improvements),
          variations: JSON.stringify(variations),
        },
      });
      console.log('Database save successful');
    } catch (dbError) {
      console.log('Database save skipped (expected on Vercel):', dbError);
    }

    // Return successful response regardless of database save
    return NextResponse.json(
      {
        success: true,
        id: responseId,
        category,
        originalPrompt: prompt,
        optimizedPrompt: optimization.optimizedPrompt,
        analysis: {
          clarity: analysis.clarityScore,
          specificity: analysis.specificityScore,
          context: analysis.contextScore,
          format: analysis.formatScore,
          overall: analysis.overallScore,
          missingElements: analysis.missingElements,
        },
        evaluation: {
          score: evaluation.score,
          clarity: evaluation.clarity,
          specificity: evaluation.specificity,
          context: evaluation.context,
          format: evaluation.format,
          explanation: evaluation.explanation,
        },
        improvements: optimization.improvements,
        variations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in optimize route:', error);
    return NextResponse.json(
      { error: 'Failed to optimize prompt', details: String(error) },
      { status: 500 }
    );
  }
}