import axios from 'axios';

const cohereApi = axios.create({
  baseURL: 'https://api.cohere.com/v2',
  headers: { 'Content-Type': 'application/json' },
});

export async function generateRoast(prompt: string): Promise<string> {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) throw new Error('COHERE_API_KEY is not configured');

  const { data } = await cohereApi.post(
    '/chat',
    {
      model: 'command-r-plus-08-2024',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.0,
      stream: false,
    },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  return data.message.content[0].text as string;
}
