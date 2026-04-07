import React from 'react';
import { publicAssets } from '../constants/publicAssets';

const howtoSlides = [
  {
    key: 'lip',
    src: publicAssets.howtoLip,
    label: 'LIP',
    hint: '指でポンと押さえる。自然なグラデに。',
    overlay: 'left',
  },
  {
    key: 'cheek',
    src: publicAssets.howtoCheek,
    label: 'CHEEK',
    hint: '頬に指でなじませる。血色感がふわっと。',
    overlay: 'left',
  },
  {
    key: 'eye',
    src: publicAssets.howtoEye,
    label: 'EYE',
    hint: 'まぶたに指でぼかす。深みのある目元に。',
    overlay: 'left',
  },
];

export const Products = () => {
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
    <div>
      {/* HERO */}
      <section className="fade-up" style={{ background: 'var(--surface)', textAlign: 'center', padding: '60px 20px', paddingTop: '100px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>CHRYSA マルチクリームカラー</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '36px', color: 'var(--text)', letterSpacing: '0.1em', marginBottom: '16px' }}>
          一つで、三役。
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, letterSpacing: '0.07em' }}>
          リップでも、チークでも、アイでも。<br />指でそのまま。重ねるだけ。
        </p>
      </section>

      {/* HOW TO USE — 指示書: 縦3枚 280px / 横3列 400px、LIP・EYE左下・CHEEK右下、padding 8px 12px */}
      <section className="fade-up" style={{ padding: 0, background: 'var(--bg)' }}>
        <div style={{ padding: '40px 20px', textAlign: 'center', fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)' }}>
          HOW TO USE — Soft Coral
        </div>

        <div className="products-howto-stack mobile-only-flex">
          {howtoSlides.map((slide) => (
            <div key={slide.key} className="products-howto-card">
              <img src={slide.src} alt="" />
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: slide.overlay === 'left' ? 16 : undefined,
                  right: slide.overlay === 'right' ? 16 : undefined,
                  background: 'rgba(249,246,242,0.95)',
                  padding: '8px 12px',
                  maxWidth: 'min(280px, calc(100% - 32px))',
                  textAlign: slide.overlay === 'right' ? 'right' : 'left',
                }}
              >
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: 4 }}>{slide.label}</div>
                <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>{slide.hint}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="products-howto-row desktop-only-flex">
          {howtoSlides.map((slide) => (
            <div key={slide.key} className="products-howto-card">
              <img src={slide.src} alt="" />
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: slide.overlay === 'left' ? 16 : undefined,
                  right: slide.overlay === 'right' ? 16 : undefined,
                  background: 'rgba(249,246,242,0.95)',
                  padding: '8px 12px',
                  maxWidth: 'calc(100% - 32px)',
                  textAlign: slide.overlay === 'right' ? 'right' : 'left',
                }}
              >
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: 8 }}>{slide.label}</div>
                <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>{slide.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULA */}
      <section style={{ background: 'var(--dark)', padding: '80px 20px' }}>
        {/* ヘッダー */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '20px' }}>FORMULA</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '24px', color: 'var(--surface)', lineHeight: 1.7, marginBottom: '24px' }}>
            「肌への思いやり」も<br />「妥協のない発色」も、もう諦めない。
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto', opacity: 0.5 }} />
        </div>

        {/* 4カードグリッド */}
        <div className="formula-grid" style={{
          display: 'grid',
          gap: '1px',
          maxWidth: '880px',
          margin: '0 auto',
          background: 'rgba(184,137,42,0.18)',
        }}>
          {[
            {
              num: '01',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C12 2 5 10 5 14a7 7 0 0 0 14 0c0-4-7-12-7-12z" />
                </svg>
              ),
              title: 'するんと、お湯オフ。',
              desc: '忙しい夜の、私を救うフリー設計。',
              delay: '0.05s',
            },
            {
              num: '02',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c4.97 0 9-3.58 9-8 0-3-2-5.5-5-7-0 2-2 4-2 6 0 1.1-.9 2-2 2s-2-.9-2-2c0-2-2-4-5-6.5C2 8.5 3 22 12 22z" />
                </svg>
              ),
              title: '体温でとろけて、素肌と一体化。',
              desc: 'じゅわっと滲むような「抜け感」を。',
              delay: '0.15s',
            },
            {
              num: '03',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <rect x="3" y="5" width="18" height="3" rx="1" />
                  <rect x="3" y="11" width="13" height="3" rx="1" opacity="0.65" />
                  <rect x="3" y="17" width="8" height="3" rx="1" opacity="0.35" />
                </svg>
              ),
              title: 'ひと塗りでシアー、重ねてディープ。',
              desc: '印象を自在に操るコントロール発色。',
              delay: '0.25s',
            },
            {
              num: '04',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                  <circle cx="8" cy="12" r="3.8" />
                  <circle cx="16" cy="8" r="3.8" />
                  <circle cx="16" cy="16" r="3.8" />
                </svg>
              ),
              title: 'リップ、チーク、アイ。',
              desc: 'これひとつで、洗練の「ワントーン・メイク」が完成。',
              delay: '0.35s',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--dark)',
                padding: '40px 32px',
                opacity: 0,
                animation: 'fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards',
                animationDelay: item.delay,
                transition: 'background 0.35s',
                cursor: 'default',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#2e2420'}
              onMouseOut={e => e.currentTarget.style.background = 'var(--dark)'}
            >
              {/* アイコン + 番号 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ color: 'var(--gold)', opacity: 0.9 }}>{item.icon}</div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(184,137,42,0.5)' }}>{item.num}</span>
              </div>
              {/* タイトル */}
              <div style={{ fontSize: '15px', color: 'var(--surface)', marginBottom: '10px', lineHeight: 1.55, letterSpacing: '0.04em', fontWeight: 300 }}>{item.title}</div>
              {/* 区切り線 */}
              <div style={{ width: '24px', height: '1px', background: 'rgba(184,137,42,0.4)', marginBottom: '12px' }} />
              {/* 説明 */}
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.9, letterSpacing: '0.06em' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI BANNER */}
      <section className="section-padding fade-up" style={{ background: 'var(--surface)', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '24px', lineHeight: 1.8 }}>
          どの色が+αになるか、<br />迷ったらAIに聞いてみて。
        </p>
        <button className="btn-cta" onClick={() => navigateTo('diagnosis')} style={{
          background: 'var(--text)', color: 'var(--gold)', height: '48px', padding: '0 32px', border: 'none', margin: '0 auto'
        }}>
          あなたの+αを診断する →
        </button>
      </section>

      {/* PRICING */}
      <section className="section-padding fade-up" style={{ background: 'var(--surface)' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', textAlign: 'center', marginBottom: '16px' }}>PRICING</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '26px', color: 'var(--text)', textAlign: 'center', marginBottom: '48px', letterSpacing: '0.05em' }}>
          あなたにあった、はじめかたを。
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>

          {/* SINGLE */}
          <div style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ height: '220px', overflow: 'hidden' }}>
              <img
                src={publicAssets.pricingSingle}
                alt="SINGLE"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                onError={e => { e.currentTarget.src = publicAssets.heroPlaceholder; }}
              />
            </div>
            <div style={{ padding: '28px 24px 32px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--muted)', marginBottom: '12px' }}>SINGLE</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--text)', marginBottom: '8px', lineHeight: 1, fontVariantNumeric: 'lining-nums' }}>
                <span style={{ fontSize: '55%' }}>¥</span>1,200
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, letterSpacing: '0.05em', marginBottom: '24px' }}>
                まず1色、試してみる。<br />気になる色から始めよう。
              </p>
              <button className="btn-cta" style={{ border: '0.5px solid var(--text)', color: 'var(--text)', background: 'transparent', height: '44px', width: '100%' }}>
                1色を選ぶ →
              </button>
            </div>
          </div>

          {/* SET OF 4 — featured */}
          <div style={{ background: 'var(--dark)', border: '1.5px solid var(--gold)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 1, background: 'var(--gold)', color: 'var(--dark)', fontSize: '8px', letterSpacing: '0.15em', padding: '4px 10px' }}>
              BEST VALUE
            </div>
            <div style={{ height: '220px', overflow: 'hidden' }}>
              <img
                src={publicAssets.pricingSet4}
                alt="SET OF 4"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                onError={e => { e.currentTarget.src = publicAssets.heroPlaceholder; }}
              />
            </div>
            <div style={{ padding: '28px 24px 32px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '12px' }}>SET OF 4</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--gold)', marginBottom: '8px', lineHeight: 1, fontVariantNumeric: 'lining-nums' }}>
                <span style={{ fontSize: '55%' }}>¥</span>4,200
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, letterSpacing: '0.05em', marginBottom: '24px' }}>
                4色でコーディネート。<br />季節やシーンに合わせて使い分け。
              </p>
              <button className="btn-cta" style={{ background: 'var(--gold)', border: 'none', color: 'var(--dark)', height: '48px', width: '100%' }}>
                4色セットを選ぶ →
              </button>
            </div>
          </div>

          {/* SET OF 6 */}
          <div style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ height: '220px', overflow: 'hidden' }}>
              <img
                src={publicAssets.pricingSet6}
                alt="SET OF 6"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                onError={e => { e.currentTarget.src = publicAssets.heroPlaceholder; }}
              />
            </div>
            <div style={{ padding: '28px 24px 32px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--muted)', marginBottom: '12px' }}>SET OF 6</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--text)', marginBottom: '8px', lineHeight: 1, fontVariantNumeric: 'lining-nums' }}>
                <span style={{ fontSize: '55%' }}>¥</span>5,980
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, letterSpacing: '0.05em', marginBottom: '24px' }}>
                すべてのシーンを網羅。<br />CHRYSAの全体験を一度に。
              </p>
              <button className="btn-cta" style={{ border: '0.5px solid var(--text)', color: 'var(--text)', background: 'transparent', height: '44px', width: '100%' }}>
                6色セットを選ぶ →
              </button>
            </div>
          </div>

        </div>
      </section>


    </div>
  );
};
