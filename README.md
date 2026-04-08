# CHRYSA - Personal Color Diagnosis App

## ブランドコンセプト
**CHRYSALIS（さなぎから蝶へ）**
「買い替えではなく、今ある魅力を活かす。」
手持ちのコスメにCHRYSAの単色アイシャドウなどを「+α」することで、より美しい自分へ変容する体験を提供します。

## 使用技術
- **Frontend Framework**: React, Vite
- **AI Integration**: Gemini API (`gemini-2.5-flash`)
- **UI Design System**: Stitch MCP
- **Styling**: Vanilla CSS (based on Custom Design Tokens)
- **Icons**: Lucide React

## 主な機能
- **AI診断 (Alchemist's Analysis)**: 
  手持ちのコスメの写真をアップロードすると、Gemini APIが色合いを解析。ベースカラーを分析し、それに合う「+α」のアドバイスを提案します。
- **商品提案**: 
  診断結果から、CHRYSAのマルチユースクリームカラーなどの商品へ自然に誘導し、買い換えに頼らない新しいメイクアップをサポートします。

## スクリーンショット
*(※ここにポートフォリオ用のUIキャプチャや、アップロード・診断結果のアニメーションGIFなどを配置してください)*

## セットアップ方法
1. リポジトリをクローンまたはダウンロードし、ディレクトリへ移動します。
2. ディレクトリのルートに `.env` ファイルを作成し、ご自身のGemini APIキーを設定してください。
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   または既存方式のまま使う場合は以下でも動作します。
   ```env
   GEMINI_API_KEY_B64=base64_encoded_api_key_here
   ```
   `api/generate.js` 経由でサーバー側から Gemini を呼び出すため、キーはクライアントに埋め込まれません。
3. 依存関係パッケージをインストールします。
   ```bash
   npm install
   ```
4. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```
   コンソールに出力された `http://localhost:5173/` などへアクセスし、動作を確認してください。

## Vercelデプロイ
1. このリポジトリを Vercel に Import します。
2. Framework Preset は `Vite` を選択します。
3. Environment Variables に以下のどちらかを登録します。
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   または
   ```env
   GEMINI_API_KEY_B64=base64_encoded_api_key_here
   ```
4. Build Command は `npm run build`、Output Directory は `dist` のままで公開できます。

## 開発者情報
- デモ・ポートフォリオ用プロジェクト
