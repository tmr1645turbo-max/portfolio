import { GoogleGenerativeAI } from '@google/generative-ai';

const PROMPT = `あなたはプロのメイクアップアーティストです。ユーザーがアップロードした「手持ちのコスメの写真」の色を解析し、それを活かすための「+α」のアドバイスを行ってください。
コンセプトは「買い替えではなく、手持ちのコスメにCHRYSAの単色クリームカラーなどを足すことで、より美しい自分へ変容する」です。
必ず以下のJSON形式で回答してください。JSON以外の不要な文章は含めないでください。
{
  "analyzedColor": "解析したコスメの主な色合い（例：温かみのあるコーラルピンク）",
  "analyzedHex": "解析したコスメの主な色のHexコード(例: #FA8072)",
  "category": "カテゴリ / 色系統 (例: リップ / ピンク系)",
  "advice": "具体的な使い方とメイクアドバイスを日本語で",
  "compatibleColors": [
    {
      "colorName": "提案する+αカラーの色名 (例: Soft Coral)",
      "groupName": "グループ名 (例: CORAL)",
      "hex": "Hexコード (例: #FF9C8A)",
      "hint": "その色をどう使うかの1行ヒント"
    }
  ],
  "productSuggestion": "CHRYSAのコスメ（単色¥1,200〜）をどのように組み合わせればよいかの具体的な提案（日本語）"
}`;

const resolveServerApiKey = () => {
  const plainApiKey = process.env.GEMINI_API_KEY?.trim() || process.env.VITE_GEMINI_API_KEY?.trim();
  if (plainApiKey) {
    return plainApiKey;
  }

  const encodedApiKey = process.env.GEMINI_API_KEY_B64?.trim() || process.env.VITE_GEMINI_API_KEY_B64?.trim();
  if (!encodedApiKey) {
    return null;
  }

  try {
    return Buffer.from(encodedApiKey, 'base64').toString('utf8');
  } catch {
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = resolveServerApiKey();
  if (!apiKey) {
    return res.status(500).json({
      error: 'サーバー側のGemini APIキーが設定されていません。Vercel の Environment Variables を確認してください。',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});
    const { imageBase64, mimeType } = body;

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({ error: '画像データが不足しています。' });
    }

    if (!mimeType.startsWith('image/')) {
      return res.status(400).json({ error: '画像ファイルを選択してください。' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const aiResult = await model.generateContent([
      PROMPT,
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
    ]);

    const text = aiResult.response.text();
    const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(jsonStr);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Gemini generate API error:', error);
    return res.status(500).json({
      error: `解析中にエラーが発生しました: ${error?.message ?? error}`,
    });
  }
}
