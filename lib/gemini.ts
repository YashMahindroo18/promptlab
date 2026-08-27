// lib/gemini.ts
import axios from 'axios';
import { GEMINI_CONFIG } from './config';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function callGemini(prompt: string): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not set');
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: GEMINI_CONFIG.maxOutputTokens,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.content[0]?.text || '';
    return text;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}