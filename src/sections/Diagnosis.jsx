import React, { useEffect, useId, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ButterflyIcon } from '../components/ButterflyIcon';

export const Diagnosis = () => {
  const inputId = useId();
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください。');
      e.target.value = '';
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError('画像サイズは3MB以下にしてください。');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return URL.createObjectURL(file);
    });
    setResult(null);
    setError(null);
    setStep(1);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setStep(1);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDiagnosis = async () => {
    if (!imageFile) return;

    setStep(2);
    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
      });
      reader.readAsDataURL(imageFile);
      const base64Data = await base64Promise;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: imageFile.type,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || '診断APIの呼び出しに失敗しました。');
      }

      setResult(payload);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(`解析中にエラーが発生しました: ${err?.message ?? err}`);
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
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>AI DIAGNOSIS</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontStyle: 'italic', fontSize: '28px', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.5 }}>
          あなたのコスメを見せて。<br/>+αを教えます。
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, letterSpacing: '0.07em' }}>
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

      {/* ローディング画面 */}
      {step === 2 && isLoading && (
        <section style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          textAlign: 'center',
          background: 'var(--bg)',
        }}>
          {/* 蝶アイコン: 上下浮遊 */}
          <motion.div
            animate={{ y: [0, -18, 0], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginBottom: '44px' }}
          >
            <ButterflyIcon size={80} theme="light" />
          </motion.div>

          {/* ANALYZING 点滅 */}
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontSize: '10px',
              letterSpacing: '0.45em',
              color: 'var(--gold)',
              marginBottom: '24px',
              fontFamily: 'var(--font-display)',
            }}
          >
            ANALYZING
          </motion.div>

          {/* 説明テキスト */}
          <div style={{
            fontSize: '13px',
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            lineHeight: 2.2,
          }}>
            あなたのコスメを解析しています。<br />少々お待ちください。
          </div>
        </section>
      )}

      {step < 3 && !isLoading && (
        <section className="fade-up" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
          {/* UPLOAD ZONE */}
          <label
            htmlFor={inputId}
            style={{
              border: '2px dashed var(--border)', background: 'var(--bg)', height: '180px', borderRadius: '8px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: isLoading ? 'default' : 'pointer', padding: '32px 20px', textAlign: 'center',
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '12px' }}>📷</div>
            <div style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>タップして写真を選ぶ</div>
            <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '8px' }}>または手持ちコスメを直接撑影</div>
            <div style={{ fontSize: '9px', color: 'var(--gold)' }}>JPG / PNG 対応</div>
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            capture="environment"
            disabled={isLoading}
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          />

          {error && <div style={{ color: 'red', fontSize: '13px', marginTop: '16px', textAlign: 'center' }}>{error}</div>}

          {/* ITEM LIST */}
          {previewUrl && !isLoading && (
            <div style={{ marginTop: '24px', background: 'var(--surface)', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Uploaded" />
              </div>
              <div style={{ flex: 1, padding: '0 12px' }}>
                <div style={{ fontSize: '10px', color: 'var(--muted)' }}>コスメ画像</div>
                <div style={{ fontSize: '13px', color: 'var(--text)' }}>色を認識します</div>
              </div>
              <div onClick={removeImage} style={{ fontSize: '16px', color: 'var(--muted)', cursor: 'pointer', padding: '8px' }}>×</div>
            </div>
          )}

          {/* TIPS */}
          <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', padding: '16px', marginTop: '24px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: '12px' }}>TIPS — うまく診断するために</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>❆ 自然光で撑ると色がより正確に</div>
              <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>❆ コスメを開いた状態で撑影</div>
              <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>❆ 複数のコスメを一緒に撑ってもOK</div>
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
            <div style={{ fontSize: '14px', color: '#999' }}>無料· 登録不要</div>
          </div>
        </section>
      )}

      {/* RESULT SCREEN */}
      {step === 3 && result && (
        <section className="fade-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ height: '3px', background: 'linear-gradient(to right, #B8892A, #C49090)', width: '100%' }}></div>
          <div style={{ padding: '32px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '12px' }}>ANALYSIS COMPLETE</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontStyle: 'italic', fontSize: '26px', color: 'var(--text)', marginBottom: '32px' }}>
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
              <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.8, letterSpacing: '0.07em' }}>{result.advice}</p>
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
                    <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>{color.hint}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hint Box */}
            <div style={{ background: 'var(--surface)', padding: '16px', textAlign: 'left', marginBottom: '40px' }}>
              <div style={{ fontSize: '11px', color: 'var(--gold)', marginBottom: '8px' }}>+αの使い方</div>
              <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.9, letterSpacing: '0.07em' }}>{result.productSuggestion}</p>
            </div>
          </div>

          {/* Product CTA */}
          <div style={{ background: 'var(--dark)', padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--surface)', marginBottom: '24px', lineHeight: 1.8 }}>単品¥1,200から。まず1色、試してみて。</p>
            
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
