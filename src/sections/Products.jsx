import React, { useState } from 'react';
import { productGroups } from '../data/colors';
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
    overlay: 'right',
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
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedColor, setSelectedColor] = useState(null);

  const navigateTo = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const tabs = ['ALL', ...productGroups.map(g => g.name)];

  const displayedColors = activeTab === 'ALL'
    ? productGroups.flatMap(g => g.colors.map(c => ({ ...c, groupName: g.name })))
    : productGroups.find(g => g.name === activeTab)?.colors.map(c => ({ ...c, groupName: activeTab })) || [];

  return (
    <div id="products">
      {/* HERO */}
      <section className="fade-up" style={{ background: 'var(--surface)', textAlign: 'center', padding: '60px 20px', paddingTop: '100px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>CHRYSA マルチクリームカラー</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '36px', color: 'var(--text)', letterSpacing: '0.1em', marginBottom: '16px' }}>
          一つで、三役。
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.8 }}>
          リップでも、チークでも、アイでも。<br />指でそのまま。重ねるだけ。
        </p>
      </section>

      {/* 実写パン（提供画像） */}
      <section className="fade-up" style={{ background: 'var(--surface)', padding: '0 20px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <img
            src={publicAssets.productPansFlatLay}
            alt="CHRYSA cream color pans"
            style={{ width: '100%', height: 'auto', display: 'block', border: '0.5px solid var(--border)' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* HOW TO USE */}
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
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: 4 }}>{slide.label}</div>
                <div style={{ fontSize: '11px', color: 'var(--text)', lineHeight: 1.5 }}>{slide.hint}</div>
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
                <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>{slide.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULA */}
      <section className="section-padding fade-up" style={{ background: 'var(--dark)' }}>
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', textAlign: 'center', marginBottom: '16px' }}>FORMULA</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '20px', color: 'var(--surface)', textAlign: 'center', marginBottom: '32px' }}>
          肌に優しく、でも発色は本気。
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '600px', margin: '0 auto' }}>
          {[
            { title: 'お湯でオフできる', desc: 'クレンジング不要。肌への負担を最小限に。' },
            { title: '体温で溶けるクリーム処方', desc: '指でのせた瞬間、肌になじむ。' },
            { title: '薄づきじゃない発色', desc: '重ねるほど深みが増す。自由自在。' },
            { title: 'リップ・チーク・アイ全対応', desc: '一つで三役。+αはこれだけでいい。' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#2A2420',
                borderBottom: '0.5px solid rgba(184,137,42,0.2)',
                minHeight: '64px',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ color: 'var(--gold)', fontSize: '16px', flexShrink: 0, lineHeight: 1 }}>✦</div>
              <div style={{ minWidth: 0, padding: '12px 0' }}>
                <div style={{ color: 'var(--surface)', fontSize: '13px', marginBottom: '2px' }}>{item.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '11px', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
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

      {/* 36 COLORS GRID */}
      <section className="section-padding fade-up" style={{ background: 'var(--bg)' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px', scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 16px', fontSize: '10px', letterSpacing: '0.1em', cursor: 'pointer', flexShrink: 0,
              background: activeTab === tab ? 'var(--text)' : 'transparent',
              color: activeTab === tab ? '#fff' : 'var(--text)',
              border: activeTab === tab ? 'none' : '0.5px solid var(--border)'
            }}>
              {tab}
            </button>
          ))}
        </div>

        <div className="products-color-grid">
          {displayedColors.map((color) => (
            <div key={color.id} style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="products-swatch-btn"
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <img
                  src={publicAssets.swatch(color.id)}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </button>
              <div style={{ fontSize: '10px', color: 'var(--text)' }}>{color.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section-padding fade-up" style={{ background: 'var(--surface)' }}>
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', textAlign: 'center', marginBottom: '24px' }}>PRICING</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.1em' }}>SINGLE</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-heading)' }}>¥1,200</div>
          </div>
          <div style={{ background: 'var(--bg)', border: '1.5px solid var(--gold)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: 'bold' }}>SET OF 4</div>
            <div style={{ fontSize: '18px', fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>¥4,200</div>
          </div>
          <div style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.1em' }}>SET OF 6</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-heading)' }}>¥5,980</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button className="btn-cta" style={{
            background: 'var(--text)', color: 'var(--gold)', height: '48px', padding: '0 32px', border: 'none', margin: '0 auto'
          }}>
            色を選んでカートへ →
          </button>
        </div>
      </section>

      {/* COLOR MODAL */}
      {selectedColor && (
        <div className="products-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(30,26,22,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelectedColor(null)}>
          <div className="products-modal-panel" style={{ background: 'var(--bg)', padding: '40px 20px', width: '100%', maxWidth: '400px', textAlign: 'center', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '24px', cursor: 'pointer', color: 'var(--muted)' }} onClick={() => setSelectedColor(null)}>×</div>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: selectedColor.hex, margin: '0 auto 24px', border: '1px solid var(--border)' }} />
            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>{selectedColor.name}</h3>
            <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '16px' }}>{selectedColor.groupName}</div>

            <img
              src={publicAssets.modal(selectedColor.name)}
              alt=""
              style={{
                width: '100%',
                maxHeight: '220px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginBottom: '24px',
                border: '0.5px solid var(--border)',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
              {['LIP', 'CHEEK', 'EYE'].map(t => (
                <span key={t} style={{ fontSize: '9px', padding: '4px 12px', background: 'var(--surface)', border: '1px solid var(--border)' }}>{t}</span>
              ))}
            </div>

            <button className="btn-cta" onClick={() => { setSelectedColor(null); navigateTo('diagnosis'); }} style={{ background: 'transparent', color: 'var(--text)', width: '100%', height: '48px', border: '1px solid var(--text)', marginBottom: '12px' }}>
              AIで私のコスメとの相性を確認する →
            </button>
            <button className="btn-cta" style={{ background: 'var(--text)', color: 'var(--gold)', width: '100%', height: '48px', border: 'none' }}>
              カートに追加 — ¥1,200
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
