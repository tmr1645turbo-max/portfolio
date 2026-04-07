import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ButterflyIcon } from '../components/ButterflyIcon';
import { publicAssets } from '../constants/publicAssets';

function DiagnosisTeaser({ isMobile, navigateTo }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section
      ref={ref}
      style={{ background: 'var(--surface)', padding: isMobile ? '60px 24px' : '100px 40px', textAlign: 'center' }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '20px' }}
        >
          AI DIAGNOSIS
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: isMobile ? '28px' : '42px',
            color: 'var(--text)',
            lineHeight: 1.4,
            marginBottom: '48px',
            letterSpacing: '0.02em',
          }}
        >
          あなたのコスメを見せて。<br />AIが+αを教えます。
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '40px', textAlign: 'left' }}>
          {[
            { step: '01', text: '手持ちコスメの写真を撮る' },
            { step: '02', text: 'AIが色を解析' },
            { step: '03', text: '+αカラーを提案してもらう' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
              style={{
                background: 'var(--bg)',
                borderTop: '0.5px solid var(--border)',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: isMobile ? '18px' : '22px',
                color: 'var(--gold)',
                fontWeight: 300,
                flexShrink: 0,
                letterSpacing: '0.05em',
                minWidth: '36px',
              }}>
                {s.step}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text)', letterSpacing: '0.05em' }}>
                {s.text}
              </div>
            </motion.div>
          ))}
          <div style={{ borderBottom: '0.5px solid var(--border)' }} />
        </div>

        <motion.button
          className="btn-cta"
          onClick={() => navigateTo('diagnosis')}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'var(--text)',
            color: 'var(--gold)',
            height: '52px',
            width: isMobile ? '100%' : '320px',
            border: 'none',
            fontSize: '12px',
            letterSpacing: '0.15em',
            cursor: 'pointer',
            margin: '0 auto',
          }}
        >
          今すぐ診断する（無料）→
        </motion.button>
      </div>
    </section>
  );
}

function ConceptSection({ isMobile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section
      ref={ref}
      style={{ background: 'var(--bg)', padding: isMobile ? '80px 24px' : '120px 40px', textAlign: 'center' }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '20px' }}
        >
          CONCEPT
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: isMobile ? '32px' : '52px',
            color: 'var(--text)',
            lineHeight: 1.4,
            marginBottom: '56px',
            letterSpacing: '0.02em',
          }}
        >
          いつものメイクにひとつ、<br />新しい色を添えてみる。
        </motion.h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '12px' : '20px',
          margin: '0 0 36px',
        }}>
          {[
            { label: ['あなたの', 'コスメ'], bg: 'var(--surface)', border: '0.5px solid var(--border)', color: 'var(--muted)', sym: null },
            { label: null, sym: '+' },
            { label: ['CHRYSA', '+α'], bg: 'var(--surface)', border: '1px solid var(--gold)', color: 'var(--gold)', sym: null },
            { label: null, sym: '=' },
            { label: ['新しい', '私へ'], bg: 'var(--text)', border: 'none', color: 'var(--gold)', sym: null },
          ].map((item, i) => {
            if (item.sym) {
              return (
                <motion.div
                  key={item.sym + i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease: 'backOut' }}
                  style={{ color: 'var(--gold)', fontSize: isMobile ? '24px' : '32px', fontWeight: 300, lineHeight: 1 }}
                >
                  {item.sym}
                </motion.div>
              );
            }
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                style={{
                  width: isMobile ? '80px' : '100px',
                  height: isMobile ? '80px' : '100px',
                  background: item.bg,
                  border: item.border,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '10px' : '11px',
                  color: item.color,
                  lineHeight: 1.7,
                  letterSpacing: '0.05em',
                }}
              >
                {item.label.map((l, j) => <div key={j}>{l}</div>)}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
          style={{
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.9,
            maxWidth: '320px',
            margin: '0 auto',
          }}
        >
          今持っているコスメに、CHRYSAの+αを一つ。<br />
          それだけで、メイクが変わる。
        </motion.p>
      </div>
    </section>
  );
}

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
        height: isMobile ? '100svh' : '100vh',
        minHeight: isMobile ? '680px' : '600px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'stretch',
        padding: isMobile ? '96px 20px 28px' : 0,
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
            position: 'relative',
            width: '100%',
            zIndex: 2,
            maxWidth: '420px',
            margin: '0 auto',
            background: 'rgba(249,246,242,0.94)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '24px 20px',
            border: '1px solid rgba(216,208,196,0.85)',
            boxShadow: '0 18px 40px rgba(30,26,22,0.08)',
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
              fontSize: '14px',
              color: 'var(--muted)',
              marginBottom: '24px',
              lineHeight: 1.8,
            }}>
              魅力をひらく、"アップデート"カラー。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
              <button
                className="btn-cta"
                onClick={() => navigateTo('products')}
                style={{
                  background: 'transparent',
                  color: 'var(--text)',
                  height: '48px',
                  width: '100%',
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
              fontSize: '14px',
              color: 'var(--muted)',
              marginBottom: '28px',
              lineHeight: 1.8,
              letterSpacing: '0.07em',
            }}>
              魅力をひらく、"アップデート"カラー。
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
      <DiagnosisTeaser isMobile={isMobile} navigateTo={navigateTo} />

      {/* ========================================
          SECTION C: +αコンセプト
      ======================================== */}
      <ConceptSection isMobile={isMobile} />

      {/* ========================================
          SECTION A: 商品チラ見せ
      ======================================== */}
      <section
        className="section-padding fade-up"
        style={{ background: 'var(--surface)' }}
      >
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '12px' }}>
          PRODUCTS
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: isMobile ? '24px' : '28px',
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
          fontSize: '10px',
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
          fontSize: isMobile ? '26px' : '30px',
          color: 'var(--surface)',
          letterSpacing: '0.08em',
          marginBottom: '16px',
        }}>
          さなぎから、蝶へ。
        </h2>
        <p style={{
          fontSize: '14px',
          color: 'var(--muted)',
          lineHeight: 1.9,
          marginBottom: '32px',
          maxWidth: '280px',
          letterSpacing: '0.07em',
        }}>
          惹かれる色は、変わりたいサイン。<br />さあ、新しい羽を広げよう。
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