import React, { useState, useEffect } from 'react';
import { ButterflyIcon } from '../components/ButterflyIcon';

export const Contact = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [topic, setTopic] = useState('商品について');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'お名前を入力してください';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = '有効なメールアドレスを入力してください';
    if (!message.trim()) newErrors.message = 'メッセージを入力してください';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setTopic('商品について');
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setIsSubmitted(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };  return (
    <div id="contact" style={{ background: 'var(--surface)', paddingBottom: '80px' }}>
      
      {/* ========================================
          HERO
      ======================================== */}
      {!isSubmitted && (
        <section className="fade-up" style={{ 
          background: 'var(--surface)', 
          padding: isMobile ? '48px 20px' : '48px 40px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>
            CONTACT
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 300, 
            fontStyle: 'italic', 
            fontSize: isMobile ? '26px' : '32px', 
            color: 'var(--text)', 
            marginBottom: '16px' 
          }}>
            あなたの声を、聞かせてください。
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, letterSpacing: '0.07em' }}>
            ご質問・ご意見・ご要望など、お気軽にどうぞ。
          </p>
        </section>
      )}

      {/* ========================================
          MAIN FORM SPLIT
      ======================================== */}
      {!isSubmitted ? (
        <section className="fade-up" style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          padding: isMobile ? '40px 20px' : '80px 40px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '48px' : '0'
        }}>
          
          {/* GET IN TOUCH */}
          <div style={{ 
            flex: '0 0 36%', 
            paddingRight: isMobile ? '0' : '48px',
            borderRight: isMobile ? 'none' : '0.5px solid var(--border)' 
          }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>
              GET IN TOUCH
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, letterSpacing: '0.07em', marginBottom: '32px' }}>
              3営業日以内にご返信いたします。<br />
              お気軽にお問い合わせください。
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
              {[
                { label: 'EMAIL', text: 'hello@chrysa.jp' },
                { label: 'HOURS', text: '平日 10:00 – 18:00' },
                { label: 'RESPONSE', text: '3営業日以内' }
              ].map(info => (
                <div key={info.label} style={{
                  height: '52px',
                  background: 'var(--bg)',
                  border: '0.5px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }}>{info.label}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text)' }}>{info.text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" aria-label="Instagram" style={{
                width: '36px', height: '36px',
                border: '0.5px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s'
              }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" style={{
                width: '36px', height: '36px',
                border: '0.5px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s'
              }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* MESSAGE FORM */}
          <div style={{ 
            flex: '1', 
            paddingLeft: isMobile ? '0' : '48px' 
          }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '24px' }}>
              MESSAGE
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Topic */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>
                  お問い合わせ内容
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['商品について', 'AI診断について', 'ご注文・お届け', 'その他'].map(t => (
                    <div 
                      key={t}
                      onClick={() => setTopic(t)}
                      style={{
                        height: '32px',
                        padding: '0 16px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '12px',
                        cursor: 'pointer',
                        border: topic === t ? 'none' : '0.5px solid var(--border)',
                        background: topic === t ? 'var(--text)' : 'transparent',
                        color: topic === t ? 'var(--gold)' : 'var(--muted)',
                        borderRadius: '16px'
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="お名前 *"
                  style={{
                    width: '100%',
                    height: '52px',
                    border: 'none',
                    borderBottom: errors.name ? '1px solid #C4607A' : '1px solid var(--border)',
                    background: 'transparent',
                    fontSize: '14px',
                    color: 'var(--text)',
                    padding: '12px 0',
                    outline: 'none',
                    transition: 'border-bottom 0.3s'
                  }}
                  onFocus={e => e.target.style.borderBottom = '1px solid var(--gold)'}
                  onBlur={e => e.target.style.borderBottom = errors.name ? '1px solid #C4607A' : '1px solid var(--border)'}
                />
                {errors.name && <div style={{ fontSize: '11px', color: '#C4607A', position: 'absolute', bottom: '-20px' }}>{errors.name}</div>}
              </div>

              {/* Email */}
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="メールアドレス *"
                  style={{
                    width: '100%',
                    height: '52px',
                    border: 'none',
                    borderBottom: errors.email ? '1px solid #C4607A' : '1px solid var(--border)',
                    background: 'transparent',
                    fontSize: '14px',
                    color: 'var(--text)',
                    padding: '12px 0',
                    outline: 'none',
                    transition: 'border-bottom 0.3s'
                  }}
                  onFocus={e => e.target.style.borderBottom = '1px solid var(--gold)'}
                  onBlur={e => e.target.style.borderBottom = errors.email ? '1px solid #C4607A' : '1px solid var(--border)'}
                />
                {errors.email && <div style={{ fontSize: '11px', color: '#C4607A', position: 'absolute', bottom: '-20px' }}>{errors.email}</div>}
              </div>

              {/* Message */}
              <div style={{ position: 'relative' }}>
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="メッセージ *"
                  style={{
                    width: '100%',
                    height: '140px',
                    resize: 'vertical',
                    border: 'none',
                    borderBottom: errors.message ? '1px solid #C4607A' : '1px solid var(--border)',
                    background: 'transparent',
                    fontSize: '14px',
                    color: 'var(--text)',
                    padding: '12px 0',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-bottom 0.3s'
                  }}
                  onFocus={e => e.target.style.borderBottom = '1px solid var(--gold)'}
                  onBlur={e => e.target.style.borderBottom = errors.message ? '1px solid #C4607A' : '1px solid var(--border)'}
                ></textarea>
                {errors.message && <div style={{ fontSize: '11px', color: '#C4607A', position: 'absolute', bottom: '-20px' }}>{errors.message}</div>}
              </div>

              <button type="submit" className="btn-cta" style={{
                background: 'var(--text)',
                color: 'var(--gold)',
                height: '52px',
                width: '100%',
                border: 'none',
                marginTop: '16px',
                fontSize: '12px',
                letterSpacing: '0.1em'
              }}>
                メッセージを送る →
              </button>

            </form>
          </div>
        </section>
      ) : (
        /* SUCCESS SCREEN */
        <section className="fade-up" style={{ 
          padding: '80px 20px', 
          textAlign: 'center',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ButterflyIcon size={56} theme="light" />
          <div style={{ fontSize: '10px', letterSpacing: '0.4em', color: 'var(--gold)', margin: '24px 0 16px' }}>
            THANK YOU
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 300, 
            fontStyle: 'italic', 
            fontSize: '26px', 
            color: 'var(--text)',
            marginBottom: '16px'
          }}>
            メッセージをお受けしました。
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '48px', lineHeight: 1.9, letterSpacing: '0.07em' }}>
            3営業日以内にご返信いたします。
          </p>
          
          <div style={{ display: 'flex', gap: '16px', flexDirection: isMobile ? 'column' : 'row' }}>
            <button className="btn-cta" onClick={resetForm} style={{
              background: 'transparent',
              border: '0.5px solid var(--border)',
              color: 'var(--muted)',
              height: '44px',
              padding: '0 24px',
              fontSize: '11px',
              width: isMobile ? '100%' : 'auto'
            }}>
              新しいお問い合わせ
            </button>
            <button className="btn-cta" onClick={scrollToTop} style={{
              background: 'transparent',
              border: '0.5px solid var(--gold)',
              color: 'var(--gold)',
              height: '44px',
              padding: '0 24px',
              fontSize: '11px',
              width: isMobile ? '100%' : 'auto'
            }}>
              トップへ戻る
            </button>
          </div>
        </section>
      )}

    </div>
  );
};
