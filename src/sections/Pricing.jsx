import React, { useState, useEffect } from 'react';

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const faqs = [
    {
      q: "無料プランでもAI診断は使えますか？",
      a: "はい、月3回まで無料でご利用いただけます。診断ごとに手持ちコスメの色解析と+α提案を受け取れます。"
    },
    {
      q: "PRO版にアップグレードするにはどうすればいいですか？",
      a: "プランカードの「14日間無料で試す」からご登録ください。クレジットカード情報の入力が必要ですが、14日間は無料でご利用いただけます。"
    },
    {
      q: "解約はいつでもできますか？",
      a: "はい、いつでも解約可能です。解約後は次の更新日まで引き続きご利用いただけます。"
    },
    {
      q: "GIFTプランはどんな人に向いていますか？",
      a: "大切な方へのプレゼントにぴったりです。3ヶ月間PRO機能をお使いいただけるギフトカードをメールでお送りします。"
    },
    {
      q: "診断結果はどこで確認できますか？",
      a: "PROプランでは診断履歴が保存され、いつでも見返すことができます。無料プランでは診断後の画面のみご確認いただけます。"
    },
    {
      q: "どんなコスメでも診断できますか？",
      a: "はい、ブランドや種類を問わず診断可能です。リップ・チーク・アイシャドウなど、色が見えるコスメであれば対応しています。"
    }
  ];

  const checkIcon = <span style={{ color: 'inherit' }}>✓</span>;
  const crossIcon = <span style={{ color: 'var(--border)' }}>✗</span>;

  return (
    <div id="pricing" style={{ paddingBottom: '80px', background: 'var(--bg)' }}>
      {/* ========================================
          HERO
      ======================================== */}
      <section className="fade-up" style={{ 
        background: 'var(--dark)', 
        padding: isMobile ? '60px 20px' : '80px 40px', 
        textAlign: 'center' 
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '16px' }}>
          AI DIAGNOSIS PLAN
        </div>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontWeight: 300, 
          fontSize: isMobile ? '28px' : '36px', 
          color: 'var(--surface)', 
          marginBottom: '16px' 
        }}>
          あなたの+αを、もっと深く。
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '40px' }}>
          無料から始めて、使い心地を確かめてください。
        </p>

        {/* Toggle */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '16px' 
        }}>
          <span style={{ fontSize: '11px', color: !isAnnual ? 'var(--gold)' : 'var(--muted)', letterSpacing: '0.1em' }}>MONTHLY</span>
          <div 
            onClick={() => setIsAnnual(!isAnnual)}
            style={{ 
              width: '56px', 
              height: '28px', 
              borderRadius: '14px', 
              background: 'var(--surface)', 
              position: 'relative', 
              cursor: 'pointer' 
            }}
          >
            <div style={{
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              background: 'var(--gold)', 
              position: 'absolute', 
              top: '2px', 
              left: isAnnual ? '30px' : '2px', 
              transition: 'left 0.3s'
            }}></div>
          </div>
          <span style={{ fontSize: '11px', color: isAnnual ? 'var(--gold)' : 'var(--muted)', letterSpacing: '0.1em' }}>ANNUAL</span>
        </div>
        <div style={{ fontSize: '10px', color: 'var(--gold)', marginTop: '8px' }}>
          年払いで2ヶ月分お得
        </div>
      </section>

      {/* ========================================
          PLAN CARDS
      ======================================== */}
      <section style={{ 
        background: 'var(--surface)', 
        padding: isMobile ? '40px 20px' : '80px 40px' 
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* FREE */}
          <div className="fade-up" style={{ 
            background: 'var(--bg)', 
            border: '0.5px solid var(--border)', 
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>無料プラン</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text)', marginBottom: '16px' }}>FREE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '36px', color: 'var(--text)' }}>¥0</span>
            </div>
            
            <button className="btn-cta" style={{ 
              background: 'transparent', 
              border: '1px solid var(--text)', 
              color: 'var(--text)', 
              height: '44px', 
              width: '100%', 
              marginBottom: '32px' 
            }}>
              無料で始める
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
              <div style={{ color: 'var(--text)' }}>✓ AI診断 月3回</div>
              <div style={{ color: 'var(--text)' }}>✓ コスメ登録 3件</div>
              <div style={{ color: 'var(--border)' }}>— 診断結果保存</div>
              <div style={{ color: 'var(--border)' }}>— 詳細アドバイス</div>
            </div>
          </div>

          {/* PRO */}
          <div className="fade-up" style={{ 
            background: 'var(--dark)', 
            border: '1.5px solid var(--gold)', 
            padding: '40px 32px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            transform: isMobile ? 'none' : 'scale(1.05)',
            zIndex: 1
          }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, left: 0, right: 0, 
              height: '2px', 
              background: 'var(--gold)' 
            }}></div>
            <div style={{ 
              position: 'absolute', 
              top: '16px', right: '16px', 
              border: '1px solid rgba(184,137,42,0.4)', 
              color: 'var(--gold)', 
              fontSize: '9px', 
              padding: '4px 8px',
              letterSpacing: '0.1em'
            }}>
              MOST POPULAR
            </div>

            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>プロプラン</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--gold)', marginBottom: '16px' }}>PRO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '36px', color: 'var(--gold)' }}>{isAnnual ? '¥4,800' : '¥480'}</span>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: '4px' }}>/{isAnnual ? '年' : '月'}</span>
            </div>
            
            <button className="btn-cta" style={{ 
              background: 'var(--gold)', 
              border: 'none', 
              color: 'var(--dark)', 
              height: '48px', 
              width: '100%', 
              marginBottom: '32px' 
            }}>
              14日間無料で試す
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: 'var(--surface)' }}>
              <div>✓ AI診断 無制限</div>
              <div>✓ コスメ登録 無制限</div>
              <div>✓ 診断結果保存</div>
              <div>✓ 詳細アドバイス</div>
            </div>
          </div>

          {/* GIFT */}
          <div className="fade-up" style={{ 
            background: 'var(--bg)', 
            border: '0.5px solid var(--border)', 
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>ギフトプラン</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text)', marginBottom: '16px' }}>GIFT</div>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '36px', color: 'var(--text)' }}>¥1,200</span>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: '4px' }}>/3ヶ月</span>
            </div>
            
            <button className="btn-cta" style={{ 
              background: 'transparent', 
              border: '1px solid var(--text)', 
              color: 'var(--text)', 
              height: '44px', 
              width: '100%', 
              marginBottom: '32px' 
            }}>
              ギフトを贈る
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
              <div style={{ color: 'var(--text)' }}>✓ PRO全機能 3ヶ月</div>
              <div style={{ color: 'var(--text)' }}>✓ ギフトカード</div>
              <div style={{ color: 'var(--text)' }}>✓ 日時指定</div>
              <div style={{ visibility: 'hidden' }}>— spacing placeholder</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          TABLE
      ======================================== */}
      <section className="fade-up" style={{ 
        background: 'var(--bg)', 
        padding: isMobile ? '60px 20px' : '60px 40px',
        overflowX: 'auto'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '20px', 
            color: 'var(--text)', 
            textAlign: 'center',
            marginBottom: '32px',
            letterSpacing: '0.1em'
          }}>
            プラン比較
          </h2>
          <table style={{ 
            width: '100%', 
            minWidth: '600px',
            borderCollapse: 'collapse', 
            fontSize: '13px',
            textAlign: 'center'
          }}>
            <thead>
              <tr style={{ background: 'var(--dark)' }}>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--surface)', fontWeight: 'normal' }}>機能名</th>
                <th style={{ padding: '16px', color: 'var(--surface)', fontWeight: 'normal' }}>FREE</th>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 500 }}>PRO</th>
                <th style={{ padding: '16px', color: 'var(--surface)', fontWeight: 'normal' }}>GIFT</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["AI診断回数", "月3回", "無制限", "無制限"],
                ["コスメ登録", "3件", "無制限", "無制限"],
                ["診断結果保存", "✗", "✓", "✓"],
                ["詳細アドバイス", "✗", "✓", "✓"],
                ["+α提案カラー数", "1色", "3色", "3色"],
                ["履歴確認", "✗", "✓", "✓"],
                ["ギフト機能", "✗", "✗", "✓"],
                ["日時指定", "✗", "✗", "✓"],
                ["ギフトカード", "✗", "✗", "✓"],
                ["サポート", "—", "メール", "メール"]
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--surface)' }}>
                  <td style={{ padding: '16px', textAlign: 'left', borderBottom: '0.5px solid var(--border)' }}>{row[0]}</td>
                  <td style={{ padding: '16px', borderBottom: '0.5px solid var(--border)' }}>{row[1] === "✓" ? checkIcon : row[1] === "✗" ? crossIcon : row[1]}</td>
                  <td style={{ padding: '16px', borderBottom: '0.5px solid var(--border)', color: 'var(--gold)', fontWeight: 500 }}>{row[2] === "✓" ? checkIcon : row[2] === "✗" ? crossIcon : row[2]}</td>
                  <td style={{ padding: '16px', borderBottom: '0.5px solid var(--border)' }}>{row[3] === "✓" ? checkIcon : row[3] === "✗" ? crossIcon : row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================
          FAQ
      ======================================== */}
      <section className="fade-up" style={{ 
        background: 'var(--surface)', 
        padding: isMobile ? '60px 20px' : '60px 40px' 
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '20px', 
            color: 'var(--text)', 
            textAlign: 'center',
            marginBottom: '32px',
            letterSpacing: '0.1em'
          }}>
            よくある質問
          </h2>
          <div>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ 
                  background: 'var(--bg)', 
                  borderBottom: '0.5px solid var(--border)', 
                  padding: '0 24px',
                  cursor: 'pointer'
                }} onClick={() => setOpenFaq(isOpen ? null : i)}>
                  <div style={{ 
                    height: '60px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <span style={{ fontSize: '13px', color: 'var(--text)' }}>
                      {faq.q}
                    </span>
                    <span style={{ fontSize: '18px', color: 'var(--gold)' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <div style={{ paddingBottom: '24px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
