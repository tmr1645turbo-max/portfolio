import React, { useState, useEffect } from 'react';
import { publicAssets } from '../constants/publicAssets';

export const Story = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div id="story">
      {/* ========================================
          HERO
      ======================================== */}
      <section style={{
        height: '60vh',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img
          src={publicAssets.storyHero}
          alt=""
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = publicAssets.heroPlaceholder;
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(249,246,242,0.95) 0%, transparent 60%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '40px'
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>
            BRAND STORY
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: isMobile ? '28px' : '36px',
            color: 'var(--text)',
            letterSpacing: '0.04em'
          }}>
            さなぎから、蝶へ。
          </h1>
        </div>
      </section>

      {/* ========================================
          THE BEGINNING
      ======================================== */}
      <section style={{
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1 1 50%', padding: isMobile ? '60px 20px' : '80px 60px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '24px' }}>
            THE BEGINNING
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '26px',
            color: 'var(--text)',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            誰かになるんじゃない。<br />
            新しい私を「ひらく」だけ。
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--text)',
            lineHeight: 2,
            letterSpacing: '0.07em',
            marginBottom: '40px',
            maxWidth: '480px'
          }}>
            CHRYSA（クリサ）は、コスメを愛しているのに<br />
            使いこなせないと感じる女性のために生まれました。<br />
            CHRYSAが届けるのは、あなたの中にすでにある<br />
            「まだ見ぬ魅力」に光を当てる体験です。
          </p>
          <button
            className="btn-cta"
            onClick={() => navigateTo('diagnosis')}
            style={{
              background: 'transparent',
              color: 'var(--text)',
              height: '44px',
              padding: '0 32px',
              border: '1px solid var(--text)',
              fontSize: '12px',
              letterSpacing: '0.1em'
            }}
          >
            AI診断をはじめる →
          </button>
        </div>
        <div style={{ flex: '1 1 50%', width: '100%', height: isMobile ? '400px' : 'auto', alignSelf: 'stretch' }}>
          <img
            src={publicAssets.storyVisual}
            alt=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = publicAssets.heroPlaceholder;
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* ========================================
          変容の三段階
      ======================================== */}
      <section style={{
        background: 'var(--text)',
        padding: isMobile ? '60px 20px' : '80px 40px'
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '40px', textAlign: 'center' }}>
          変容の三段階
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { tag: 'I', title: '卵', color: 'var(--gold)', border: 'rgba(184,137,42,0.2)', desc: 'すべての変容はここから始まる。今あるコスメが、可能性の種。' },
            { tag: 'II', title: 'さなぎ', color: 'var(--sub)', border: 'rgba(184,137,42,0.3)', desc: '+αを見つける瞬間。AIが、あなたに合う色を教えてくれる。' },
            { tag: 'III', title: '蝶', color: 'var(--surface)', border: 'rgba(184,137,42,0.4)', desc: '+αひとつで、今日が変わる。それがCHRYSAの約束。' }
          ].map((item) => (
            <div key={item.tag} style={{
              background: 'rgba(255,255,255,0.05)',
              border: `0.5px solid ${item.border}`,
              padding: '40px 32px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                color: item.color,
                marginBottom: '24px',
                letterSpacing: '0.1em'
              }}>
                {item.tag}. {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, letterSpacing: '0.07em' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          OUR VALUES
      ======================================== */}
      <section style={{
        background: 'var(--surface)',
        padding: isMobile ? '60px 20px' : '80px 40px'
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px', textAlign: 'center' }}>
          OUR VALUES
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: '28px',
          color: 'var(--text)',
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          私たちが大切にしていること。
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '16px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { title: 'RESPECT', desc: 'あなたが持つコスメを尊重する。' },
            { title: 'TRANSFORM', desc: '+αで、変容を支える。' },
            { title: 'SCIENCE', desc: '体温で溶ける処方。科学と美の融合。' },
            { title: 'LUXURY', desc: '¥1,200から始まる、ラグジュアリー体験。' }
          ].map((val, idx) => (
            <div key={idx} style={{
              background: 'var(--bg)',
              border: '0.5px solid var(--border)',
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                letterSpacing: '0.2em',
                color: 'var(--text)',
                marginBottom: '16px'
              }}>
                {val.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, letterSpacing: '0.07em' }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          MANIFESTO
      ======================================== */}
      <section style={{
        background: 'var(--text)',
        padding: isMobile ? '60px 20px' : '80px 40px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '32px' }}>
          CHRYSA MANIFESTO
        </div>
        <q style={{
          display: 'block',
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: isMobile ? '20px' : '24px',
          color: 'var(--surface)',
          lineHeight: 1.8,
          maxWidth: '600px',
          margin: '0 auto',
          borderLeft: '2px solid var(--gold)',
          borderRight: '2px solid var(--gold)',
          padding: '0 24px'
        }}>
          「新しいものを買いなさい」ではなく、<br />
          「今持っているものを活かす」。<br />
          +αひとつで、さなぎから蝶へ。
        </q>
      </section>

      {/* ========================================
          BOTTOM CTA
      ======================================== */}
      <section style={{
        background: 'var(--bg)',
        padding: isMobile ? '60px 20px' : '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: '28px',
          color: 'var(--text)',
          marginBottom: '16px'
        }}>
          さあ、あなただけのグラデーションで、新しい羽を広げよう。
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '40px', lineHeight: 1.9, letterSpacing: '0.07em' }}>
          あなたの+αは、もうここにある。
        </p>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <button
            className="btn-cta"
            onClick={() => navigateTo('diagnosis')}
            style={{
              background: 'var(--text)',
              color: 'var(--gold)',
              height: '52px',
              width: isMobile ? '100%' : '220px',
              border: 'none',
              fontSize: '12px',
              letterSpacing: '0.1em'
            }}
          >
            AI診断をはじめる →
          </button>
          <button
            className="btn-cta"
            onClick={() => navigateTo('products')}
            style={{
              background: 'transparent',
              color: 'var(--text)',
              height: '52px',
              width: isMobile ? '100%' : '160px',
              border: '1px solid var(--text)',
              fontSize: '12px',
              letterSpacing: '0.1em'
            }}
          >
            商品を見る
          </button>
        </div>
      </section>

    </div>
  );
};
