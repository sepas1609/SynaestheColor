import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Using algorithmic synaesthetic fallback generator.');
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Translation / Enhancement endpoint for multi-language prompts
app.post('/api/translate-prompt', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const ai = getGenAI();
  if (!ai) {
    return res.json({ translatedPrompt: prompt, sourceLanguage: 'en' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Translate and refine this emotional scene description into vivid English for synaesthetic color analysis if it is not already in English. Keep the artistic mood intact. Return only JSON with "translatedPrompt" and "detectedLanguage".
Prompt: "${prompt}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translatedPrompt: { type: Type.STRING, description: 'Refined English prompt description' },
            detectedLanguage: { type: Type.STRING, description: 'Detected language name or code' }
          },
          required: ['translatedPrompt', 'detectedLanguage']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Translation error:', err);
    return res.json({ translatedPrompt: prompt, detectedLanguage: 'unknown' });
  }
});

// Palette Generation endpoint using Gemini API with Strict Schema
app.post('/api/generate-palette', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { prompt, harmony = 'freeform', temperature = 0.7, language = 'auto' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const ai = getGenAI();

  if (!ai) {
    // Return gracefully formatted fallback
    return res.json({
      fallback: true,
      message: 'GEMINI_API_KEY is not configured. Falling back to local synaesthetic engine.',
      latencyMs: Date.now() - startTime
    });
  }

  try {
    const systemInstruction = `You are SynaestheColor, an expert synaesthesia sensory color scientist, psychological colorist, and WCAG accessibility designer.
Your task is to translate evocative emotional or scene-based descriptions into exactly FIVE distinct color roles:
1. "primary" (dominant brand/action color, visually vibrant)
2. "secondary" (supporting balance tone, harmonious)
3. "accent" (high-contrast highlight or callout shade)
4. "background" (deep or light foundation canvas, comfortable on eyes)
5. "surface" (cards, modals, and container surfaces, distinct from background)

Requirements:
- Output valid 6-digit hex codes (e.g., #00F0FF, #1E293B).
- Provide an evocative, poetic name for each color.
- Provide a brief psychological and synaesthetic rationale explaining why that exact shade was triggered by the sensory elements of the prompt (touch, sound, mood, light).
- If a harmony type is specified (${harmony}), respect the color relationship (e.g. complementary, analogous, triadic, monochromatic, split-complementary).
- Ensure background and surface provide good contrast for text and primary elements.
- Formulate a creative title, mood summary, synaesthetic sensory triggers (e.g., "Sight (Neon) + Temperature (Cold Rain)"), and relevant tags.`;

    const promptText = `Generate a 5-role synaesthetic color palette for the following description:
"${prompt}"

Harmony constraint: ${harmony}
Creativity temperature: ${temperature}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: Math.max(0.1, Math.min(1.2, Number(temperature) || 0.7)),
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Evocative title of the palette' },
            mood: { type: Type.STRING, description: 'Emotional mood description' },
            synaestheticSense: { type: Type.STRING, description: 'Sensory cross-modal trigger description' },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 to 5 categorical tags'
            },
            colors: {
              type: Type.OBJECT,
              properties: {
                primary: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: 'Evocative name of the primary color' },
                    hex: { type: Type.STRING, description: '6-digit Hex code starting with #' },
                    rationale: { type: Type.STRING, description: 'Psychological and synaesthetic rationale' }
                  },
                  required: ['name', 'hex', 'rationale']
                },
                secondary: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: 'Evocative name of the secondary color' },
                    hex: { type: Type.STRING, description: '6-digit Hex code starting with #' },
                    rationale: { type: Type.STRING, description: 'Psychological and synaesthetic rationale' }
                  },
                  required: ['name', 'hex', 'rationale']
                },
                accent: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: 'Evocative name of the accent color' },
                    hex: { type: Type.STRING, description: '6-digit Hex code starting with #' },
                    rationale: { type: Type.STRING, description: 'Psychological and synaesthetic rationale' }
                  },
                  required: ['name', 'hex', 'rationale']
                },
                background: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: 'Evocative name of the background color' },
                    hex: { type: Type.STRING, description: '6-digit Hex code starting with #' },
                    rationale: { type: Type.STRING, description: 'Psychological and synaesthetic rationale' }
                  },
                  required: ['name', 'hex', 'rationale']
                },
                surface: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: 'Evocative name of the surface color' },
                    hex: { type: Type.STRING, description: '6-digit Hex code starting with #' },
                    rationale: { type: Type.STRING, description: 'Psychological and synaesthetic rationale' }
                  },
                  required: ['name', 'hex', 'rationale']
                }
              },
              required: ['primary', 'secondary', 'accent', 'background', 'surface']
            }
          },
          required: ['title', 'mood', 'synaestheticSense', 'tags', 'colors']
        }
      }
    });

    const latencyMs = Date.now() - startTime;
    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);

    // Approximate token count based on input + output length
    const tokensUsed = Math.round((promptText.length + rawText.length) / 3.8);

    return res.json({
      success: true,
      data: parsedData,
      latencyMs,
      tokensUsed
    });
  } catch (err: any) {
    console.error('Gemini API palette generation error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate palette with Gemini API',
      fallback: true,
      latencyMs: Date.now() - startTime
    });
  }
});

// Vite & Static middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SynaestheColor server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
