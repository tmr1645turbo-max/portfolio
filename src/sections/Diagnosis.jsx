import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const Diagnosis = () => {
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setStep(1);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setStep(1);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDiagnosis = async () => {
    if (!genAI) {
      setError('Gemini APIキーが設定されていません。環境変数をご確認ください。');
      return;
    }
    if (!imageFile) return;

    setStep(2);
    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
      });
      reader.readAsDataURL(imageFile);
      const base64Data = await base64Promise;

      const prompt = `あなたはプロのメイクアップアーティストです。ユーザーがアップロードした「手持ちのコスメの写真」の色を解析し、それを活かすための「+α」のアドバイスを行ってください。
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

      const aiResult = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: imageFile.type
          }
        }
      ]);

      const text = aiResult.response.text();
      const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      
      setResult(parsed);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError('解析中にエラーが発生しました。もう一度お試しください。');
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    removeImage();
    setStep(1);
    window.scrollTo(0, 0);
  };

  const navigateTo = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="diagnosis" style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* HERO */}
      <section className="fade-up" style={{ background: 'var(--surface)', textAlign: 'center', padding: '60px 20px', paddingTop: '100px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>AI DIAGNOSIS</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontStyle: 'italic', fontSize: '22px', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.5 }}>
          あなたのコスメを見せて。<br/>+αを教えます。
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8 }}>
          今持っているコスメの写真を撮るだけ。<br />
          AIが色を解析して、<br />あなただけの+αカラーを提案します。
        </p>
      </section>

      {/* STEP INDICATOR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', gap: '8px' }}>
        {[
          { num: 1, label: '① 写真を選ぶ' },
          { num: 2, label: '② 解析中' },
          { num: 3, label: '③ +α提案' },
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div style={{ 
              fontSize: '10px', padding: '8px 12px', borderRadius: '4px',
              background: step === s.num ? 'var(--text)' : (step > s.num ? 'var(--gold)' : 'var(--border)'),
              color: step === s.num ? 'var(--gold)' : (step > s.num ? '#fff' : 'rgba(0,0,0,0.4)'),
              opacity: step >= s.num ? 1 : 0.4
            }}>
              {s.label}
            </div>
            {idx < 2 && <div style={{ width: '20px', height: '1px', background: 'var(--border)' }}></div>}
          </React.Fragment>
        ))}
      </div>

      {step < 3 && (
        <section className="fade-up" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
          {/* UPLOAD ZONE */}
          <div 
            onClick={() => !isLoading && fileInputRef.current?.click()}
            style={{
              border: '2px dashed var(--border)', background: 'var(--bg)', height: '180px', borderRadius: '8px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: isLoading ? 'default' : 'pointer', padding: '32px 20px', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '12px' }}>📷</div>
            <div style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>タップして写真を選ぶ</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>または手持ちコスメを直接撮影</div>
            <div style={{ fontSize: '9px', color: 'var(--gold)' }}>JPG / PNG 対応</div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {error && <div style={{ color: 'red', fontSize: '11px', marginTop: '16px', textAlign: 'center' }}>{error}</div>}

          {/* ITEM LIST */}
          {previewUrl && !isLoading && (
            <div style={{ marginTop: '24px', background: 'var(--surface)', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Uploaded" />
              </div>
              <div style={{ flex: 1, padding: '0 12px' }}>
                <div style={{ fontSize: '10px', color: 'var(--muted)' }}>コスメ画像</div>
                <div style={{ fontSize: '12px', color: 'var(--text)' }}>色を認識します</div>
              </div>
              <div onClick={removeImage} style={{ fontSize: '16px', color: 'var(--muted)', cursor: 'pointer', padding: '8px' }}>×</div>
            </div>
          )}

          {/* TIPS */}
          <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', padding: '16px', marginTop: '24px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: '12px' }}>TIPS — うまく診断するために</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text)' }}>✦ 自然光で撮ると色がより正確に</div>
              <div style={{ fontSize: '11px', color: 'var(--text)' }}>✦ コスメを開いた状態で撮影</div>
              <div style={{ fontSize: '11px', color: 'var(--text)' }}>✦ 複数のコスメを一緒に撮ってもOK</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button 
              className="btn-cta"
              onClick={handleDiagnosis}
              disabled={!imageFile || isLoading}
              style={{
                background: (!imageFile || isLoading) ? 'var(--border)' : 'var(--text)', 
                color: (!imageFile || isLoading) ? 'rgba(0,0,0,0.3)' : 'var(--gold)', 
                height: '52px', width: '100%', border: 'none', marginBottom: '8px'
              }}
            >
              {isLoading ? '解析中...' : '+αを診断する（1件）→'}
            </button>
            <div style={{ fontSize: '12px', color: '#999' }}>無料 · 登録不要</div>
          </div>
        </section>
      )}

      {/* RESULT SCREEN */}
      {step === 3 && result && (
        <section className="fade-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ height: '3px', background: 'linear-gradient(to right, #B8892A, #C49090)', width: '100%' }}></div>
          <div style={{ padding: '32px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '12px' }}>ANALYSIS COMPLETE</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontStyle: 'italic', fontSize: '22px', color: 'var(--text)', marginBottom: '32px' }}>
              あなたの+αが見つかりました。
            </h2>

            {/* Diagram */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
               <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: result.analyzedHex, border: '1px solid var(--border)', margin: '0 auto 8px' }}></div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>あなたのコスメ</div>
               </div>
               <div style={{ fontSize: '24px', color: 'var(--gold)', fontWeight: 300 }}>+</div>
               <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', border: '1px dashed var(--gold)', background: 'var(--surface)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '10px' }}>
                    CHRYSA<br/>+α
                  </div>
               </div>
            </div>

            {/* Advice */}
            <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '12px', textAlign: 'left', marginBottom: '40px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.8 }}>{result.advice}</p>
            </div>

            {/* Proposals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {result.compatibleColors?.map((color, i) => (
                <div key={i} style={{ border: i === 0 ? '2px solid var(--gold)' : '1px solid var(--border)', background: 'var(--surface)', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: color.hex, border: '1px solid var(--border)', flexShrink: 0 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ fontSize: '14px', fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>{color.colorName}</div>
                      <div style={{ fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em' }}>{color.groupName}</div>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text)', lineHeight: 1.5 }}>{color.hint}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hint Box */}
            <div style={{ background: 'var(--surface)', padding: '16px', textAlign: 'left', marginBottom: '40px' }}>
              <div style={{ fontSize: '11px', color: 'var(--gold)', marginBottom: '8px' }}>+αの使い方</div>
              <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>{result.productSuggestion}</p>
            </div>
          </div>

          {/* Product CTA */}
          <div style={{ background: 'var(--dark)', padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--surface)', marginBottom: '24px' }}>単品¥1,200から。まず1色、試してみて。</p>
            
            {result.compatibleColors && result.compatibleColors[0] && (
              <button className="btn-cta" style={{ background: 'var(--gold)', color: 'var(--dark)', height: '52px', width: '100%', border: 'none', marginBottom: '16px' }}>
                {result.compatibleColors[0].colorName}をカートに追加 →
              </button>
            )}
            
            <button className="btn-cta" onClick={() => navigateTo('products')} style={{ background: 'transparent', color: 'var(--surface)', height: '48px', width: '100%', border: '1px solid rgba(184,137,42,0.4)', marginBottom: '32px' }}>
              全36色を見る →
            </button>
            
            <div onClick={resetAll} style={{ fontSize: '11px', color: 'var(--gold)', textDecoration: 'underline', cursor: 'pointer', marginBottom: '32px' }}>
              別のコスメで診断する
            </div>
            
            <div style={{ fontSize: '9px', color: 'var(--muted)' }}>PRO版で詳細な診断・保存機能が使えます</div>
          </div>
        </section>
      )}
    </div>
  );
};
