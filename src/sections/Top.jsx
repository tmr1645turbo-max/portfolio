import React, { useState, useEffect, useRef } from 'react';
import { ButterflyIcon } from '../components/ButterflyIcon';
import { publicAssets } from '../constants/publicAssets';

export const Top = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  /** 動画ファイルが無い・読込失敗時は静止画へ（真っ黒ヒーローを防ぐ） */
  const [heroUseVideo, setHeroUseVideo] = useState(true);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* 動画 URL が404でも onError が来ない環境向け: 読み込みできなければ静止画へ */
  useEffect(() => {
    if (!heroUseVideo) return undefined;
    const t = window.setTimeout(() => {
      const v = heroVideoRef.current;
      if (!v) return;
      if (v.readyState === 0 && v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        setHeroUseVideo(false);
      }
    }, 2000);
    return () => window.clearTimeout(t);
  }, [heroUseVideo]);

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
    <div id="top">

      {/* ========================================
          HERO: First View
          動画BG + コピーオーバーレイ
      ======================================== */}
      <section style={{
        height: '100vh',
        minHeight: '600px',
        position: 'relative',
        overflow: 'hidden',
      }} className="fade-up">

        {/* 背景: 動画 → 失敗時は静止画 → 失敗時は SVG プレースホルダー */}
        {heroUseVideo ? (
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={publicAssets.heroPlaceholder}
            onError={() => setHeroUseVideo(false)}
            onAbort={() => setHeroUseVideo(false)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              backgroundColor: 'var(--surface)',
            }}
          >
            <source src={publicAssets.heroVideoPrimary} type="video/mp4" />
            <source src={publicAssets.heroVideoFallback} type="video/mp4" />
          </video>
        ) : (
          <img
            src={publicAssets.heroImage}
            alt=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = publicAssets.heroPlaceholder;
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              backgroundColor: 'var(--surface)',
            }}
          />
        )}

        {/* グラデーションオーバーレイ（下から白へ） */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(249,246,242,0.6) 65%, rgba(249,246,242,0.97) 100%)',
          zIndex: 1,
        }} />

        {/* ========== モバイル: コピーオーバーレイ ========== */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: '0 20px 32px',
          }}>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'var(--gold)',
              marginBottom: '10px',
            }}>
              CHRYSA LUXURY COSMETICS
            </div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              fontSize: '28px',
              color: 'var(--text)',
              lineHeight: 1.4,
              letterSpacing: '0.04em',
              marginBottom: '10px',
            }}>
              +αひとつで、<br />今日が変わる。
            </h1>
            <p style={{
              fontSize: '12px',
              color: 'var(--muted)',
              marginBottom: '24px',
              lineHeight: 1.7,
            }}>
              いつだって、+αで美しくなれる。
            </p>
            <button
              className="btn-cta"
              onClick={() => navigateTo('diagnosis')}
              style={{
                background: 'var(--text)',
                color: 'var(--gold)',
                height: '52px',
                width: '100%',
                border: 'none',
                fontSize: '12px',
                letterSpacing: '0.15em',
                cursor: 'pointer',
              }}
            >
              あなたの+αを診断する →
            </button>
          </div>
        )}

        {/* ========== デスクトップ: コピーオーバーレイ（左寄せ） ========== */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '60px',
            maxWidth: '480px',
            background: 'rgba(249,246,242,0.94)',
            padding: '40px',
            zIndex: 2,
          }}>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'var(--gold)',
              marginBottom: '14px',
            }}>
              CHRYSA LUXURY COSMETICS
            </div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              fontSize: '36px',
              color: 'var(--text)',
              lineHeight: 1.35,
              letterSpacing: '0.04em',
              marginBottom: '12px',
            }}>
              +αひとつで、<br />今日が変わる。
            </h1>
            <p style={{
              fontSize: '13px',
              color: 'var(--muted)',
              marginBottom: '28px',
              lineHeight: 1.8,
            }}>
              いつだって、+αで美しくなれる。
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn-cta"
                onClick={() => navigateTo('diagnosis')}
                style={{
                  background: 'var(--text)',
                  color: 'var(--gold)',
                  height: '52px',
                  width: '220px',
                  border: 'none',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                }}
              >
                あなたの+αを診断する →
              </button>
              <button
                className="btn-cta"
                onClick={() => navigateTo('products')}
                style={{
                  background: 'transparent',
                  color: 'var(--text)',
                  height: '52px',
                  width: '140px',
                  border: '1px solid var(--text)',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                }}
              >
                商品を見る
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================
          SECTION B: AI診断（主役）
      ======================================== */}
      <section
        className="section-padding fade-up"
        style={{ background: 'var(--surface)' }}
      >
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '12px' }}>
          AI DIAGNOSIS
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: isMobile ? '20px' : '24px',
          color: 'var(--text)',
          lineHeight: 1.5,
          marginBottom: '24px',
        }}>
          あなたのコスメを見せて。<br />AIが+αを教えます。
        </h2>

        {/* ステップリスト */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
          {[
            { step: '1', text: '手持ちコスメの写真を撮る' },
            { step: '2', text: 'AIが色を解析' },
            { step: '3', text: '+αカラーを提案してもらう' },
          ].map((s) => (
            <div
              key={s.step}
              style={{
                background: 'var(--bg)',
                border: '0.5px solid var(--border)',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '14px',
              }}
            >
              {/* 丸番号：デザイン指示通り #1E1A16 背景 */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--text)',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                flexShrink: 0,
              }}>
                {s.step}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text)' }}>
                {s.text}
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-cta"
          onClick={() => navigateTo('diagnosis')}
          style={{
            background: 'var(--text)',
            color: 'var(--gold)',
            height: '52px',
            width: '100%',
            border: 'none',
            fontSize: '12px',
            letterSpacing: '0.15em',
            cursor: 'pointer',
          }}
        >
          今すぐ診断する（無料）→
        </button>
      </section>

      {/* ========================================
          SECTION C: +αコンセプト
      ======================================== */}
      <section
        className="section-padding fade-up"
        style={{ background: 'var(--bg)', textAlign: 'center' }}
      >
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '12px' }}>
          CONCEPT
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: isMobile ? '20px' : '24px',
          color: 'var(--text)',
          lineHeight: 1.5,
          marginBottom: '28px',
        }}>
          買い替えなくていい。<br />足すだけでいい。
        </h2>

        {/* 図解: あなたのコスメ + CHRYSA = 新しい私 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          margin: '0 0 24px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--surface)',
            border: '0.5px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'var(--muted)',
            lineHeight: 1.5,
          }}>
            <div>あなたの</div><div>コスメ</div>
          </div>
          <div style={{ color: 'var(--gold)', fontSize: '22px', fontWeight: 300, lineHeight: 1 }}>+</div>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--surface)',
            border: '1px solid var(--gold)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'var(--gold)',
            lineHeight: 1.5,
          }}>
            <div>CHRYSA</div><div>+α</div>
          </div>
          <div style={{ color: 'var(--gold)', fontSize: '22px', fontWeight: 300, lineHeight: 1 }}>=</div>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'var(--gold)',
            lineHeight: 1.5,
          }}>
            <div>新しい</div><div>私へ</div>
          </div>
        </div>

        <p style={{
          fontSize: '13px',
          color: 'var(--muted)',
          lineHeight: 1.9,
          maxWidth: '320px',
          margin: '0 auto',
        }}>
          今持っているコスメに、CHRYSAの+αを一つ。<br />
          それだけで、メイクが変わる。
        </p>
      </section>

      {/* ========================================
          SECTION A: 商品チラ見せ
      ======================================== */}
      <section
        className="section-padding fade-up"
        style={{ background: 'var(--surface)' }}
      >
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '12px' }}>
          PRODUCTS
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: isMobile ? '20px' : '24px',
          color: 'var(--text)',
          lineHeight: 1.5,
          marginBottom: '28px',
          fontFeatureSettings: '"lnum" 1',
          verticalAlign: 'baseline',
        }}>
          36色から、<br />あなたの+αを選ぶ。
        </h2>

        {/* カラースウォッチ（横スクロール） */}
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'flex-start',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '28px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {[
            { name: 'NUDE', color: '#F2E0CC' },
            { name: 'CORAL', color: '#F08070' },
            { name: 'SHIMMER', color: '#F0E0A0' },
            { name: 'ROSE', color: '#E0A8A8' },
            { name: 'GREEN', color: '#A8B890' },
            { name: 'DEEP', color: '#585858' },
          ].map(group => (
            <div key={group.name} style={{ textAlign: 'center', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: group.color,
                border: '1px solid var(--border)',
                marginBottom: '8px',
              }} />
              <div style={{
                fontSize: '9px',
                color: 'var(--text)',
                letterSpacing: '0.12em',
              }}>
                {group.name}
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-cta"
          onClick={() => navigateTo('products')}
          style={{
            margin: '0 auto',
            padding: '0 40px',
            background: 'transparent',
            color: 'var(--text)',
            height: '48px',
            width: 'fit-content',
            border: '1px solid var(--text)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          全36色を見る →
        </button>
      </section>

      {/* ========================================
          SECTION D: ブランド世界観（余韻）
      ======================================== */}
      <section
        className="fade-up"
        style={{
          background: 'var(--dark)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: isMobile ? '64px 20px' : '80px 40px',
        }}
      >
        <ButterflyIcon size={isMobile ? 48 : 56} theme="dark" />
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.4em',
          color: 'var(--gold)',
          margin: '20px 0 10px',
        }}>
          CHRYSA
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: isMobile ? '22px' : '28px',
          color: 'var(--surface)',
          letterSpacing: '0.08em',
          marginBottom: '16px',
        }}>
          さなぎから、蝶へ。
        </h2>
        <p style={{
          fontSize: '12px',
          color: 'var(--muted)',
          lineHeight: 1.9,
          marginBottom: '32px',
          maxWidth: '280px',
        }}>
          今持っているコスメを活かして、<br />より美しい自分へ変容する。
        </p>
        <button
          className="btn-cta"
          onClick={() => navigateTo('story')}
          style={{
            background: 'transparent',
            color: 'var(--gold)',
            height: '44px',
            width: '160px',
            border: '1px solid rgba(184,137,42,0.4)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            cursor: 'pointer',
          }}
        >
          BRAND STORY →
        </button>
      </section>

    </div>
  );
};