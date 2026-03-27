import React, { useState, useEffect } from 'react';
import { ButterflyIcon } from './ButterflyIcon';

export const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobile, isMenuOpen]);

  const navLinks = [
    { label: 'STORY', href: '#story' },
    { label: 'PRODUCTS', href: '#products' },
    { label: 'AI診断', href: '#diagnosis' },
    { label: '料金プラン', href: '#pricing' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        background: 'rgba(249,246,242,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)'
      }}>

        {/* Mobile Nav */}
        {isMobile && (
          <div style={{
            position: 'relative',
            zIndex: 1,
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            paddingLeft: 'max(16px, env(safe-area-inset-left))',
            paddingRight: 'max(16px, env(safe-area-inset-right))',
            background: 'rgba(249,246,242,0.98)',
            borderBottom: isMenuOpen ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ButterflyIcon size={32} theme="light" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '14px', letterSpacing: '0.3em', color: 'var(--gold)' }}>
                CHRYSA
              </span>
            </div>
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              style={{
                fontSize: '20px',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: '8px',
                border: 'none',
                background: 'transparent',
                lineHeight: 1,
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        )}

        {/* Desktop Nav — max-width container so links stay grouped, not at viewport edges */}
        {!isMobile && (
          <div style={{
            maxWidth: '1120px',
            margin: '0 auto',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '64px',
            padding: '0 32px',
            gap: '24px',
          }}>

            {/* 左 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px', fontSize: '14px', letterSpacing: '0.1em' }}>
              <a href="#story" style={{ textDecoration: 'none', color: 'var(--text)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}>STORY</a>
              <span style={{ color: 'var(--border)' }}>／</span>
              <a href="#products" style={{ textDecoration: 'none', color: 'var(--text)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}>PRODUCTS</a>
            </div>

            {/* 中央ロゴ（リンクなしのため pointer-events 無効化し、ドロップダウンへの移動を邪魔しない） */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
              <ButterflyIcon size={28} theme="light" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '14px', letterSpacing: '0.3em', color: 'var(--gold)' }}>CHRYSA</span>
            </div>

            {/* 右 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', fontSize: '14px', letterSpacing: '0.1em' }}>

              {/* AI診断ドロップダウン — paddingTop でリンクとパネルの間をホバー領域に含める（margin だと隙間で閉じる） */}
              <div style={{ position: 'relative', zIndex: 2 }} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <a href="#diagnosis" style={{ textDecoration: 'none', color: 'var(--text)', transition: 'color 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}>
                  AI診断
                </a>
                {isDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, left: 'auto', paddingTop: '10px', zIndex: 1010 }}>
                    <div style={{ background: '#F9F6F2', border: '0.5px solid var(--border)', display: 'flex', flexDirection: 'column', minWidth: '160px', boxShadow: '0 8px 24px rgba(30,26,22,0.08)' }}>
                      <a href="#diagnosis" onClick={() => setIsDropdownOpen(false)} style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '12px', letterSpacing: '0.1em', padding: '14px 20px', borderBottom: '0.5px solid var(--border)', whiteSpace: 'nowrap', display: 'block', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}>
                        診断する
                      </a>
                      <a href="#pricing" onClick={() => setIsDropdownOpen(false)} style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '12px', letterSpacing: '0.1em', padding: '14px 20px', whiteSpace: 'nowrap', display: 'block', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}>
                        料金プラン
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <span style={{ color: 'var(--border)' }}>／</span>
              <a href="#contact" style={{ textDecoration: 'none', color: 'var(--text)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}>CONTACT</a>
            </div>

          </div>
        )}
      </nav>

      {/* Mobile drawer outside nav: avoids fixed-position bugs inside backdrop-filter / sticky ancestors */}
      {isMobile && isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="サイトメニュー"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: '52px',
            bottom: 0,
            zIndex: 1001,
            background: '#F9F6F2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
          }}
        >
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '8px 0 24px' }}>
            {navLinks.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 300,
                  fontSize: '17px',
                  letterSpacing: '0.2em',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '18px 24px',
                  borderBottom: i < navLinks.length - 1 ? '0.5px solid var(--border)' : 'none',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <main>{children}</main>

      {/* Footer */}
      <footer style={{ background: 'var(--dark)', padding: isMobile ? '40px 20px' : '48px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? '24px' : '0', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ButterflyIcon size={32} theme="dark" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '13px', letterSpacing: '0.3em', color: 'var(--surface)' }}>CHRYSA</span>
            </div>
            <div style={{ display: 'flex', gap: isMobile ? '16px' : '32px', fontSize: '11px', letterSpacing: '0.1em', flexWrap: 'wrap', justifyContent: 'center' }}>
              {navLinks.map(item => (
                <a key={item.label} href={item.href} style={{ textDecoration: 'none', color: 'var(--muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>{item.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '0.5px solid rgba(184,137,42,0.15)', marginBottom: '32px' }} />
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? '16px' : '0' }}>
            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>&copy; 2025 CHRYSA. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '10px' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'var(--muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--surface)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>INSTAGRAM</a>
              <a href="#" style={{ textDecoration: 'none', color: 'var(--muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--surface)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>TWITTER</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};