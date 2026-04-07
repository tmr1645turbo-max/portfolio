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

            {/* 中央ロゴ */}
            <a href="#top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap', textDecoration: 'none' }}>
              <ButterflyIcon size={28} theme="light" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '14px', letterSpacing: '0.3em', color: 'var(--gold)' }}>CHRYSA</span>
            </a>

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
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="#" aria-label="Instagram" style={{ textDecoration: 'none', color: 'var(--muted)', transition: 'color 0.3s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" style={{ textDecoration: 'none', color: 'var(--muted)', transition: 'color 0.3s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};