import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ButterflyCursor from './components/ButterflyCursorEffect'; 
import { Layout } from './components/Layout';
import { Top } from './sections/Top';
import { Story } from './sections/Story';
import { Products } from './sections/Products';
import { Diagnosis } from './sections/Diagnosis';
import { Pricing } from './sections/Pricing';
import { Contact } from './sections/Contact';

const FILTERS = ['ALL', 'NUDE', 'CORAL', 'SHIMMER', 'ROSE', 'GREEN', 'DEEP'];

const COLOR_NAMES = [
  'Milk Veil',
  'Sand Drift',
  'Honey Bare',
  'Beige Ritual',
  'Warm Linen',
  'Apricot Skin',
  'Coral Bloom',
  'Mellow Poppy',
  'Sunset Petal',
  'Peach Flame',
  'Terracotta Dew',
  'Amber Coral',
  'Champagne Dust',
  'Moonlit Pearl',
  'Golden Gleam',
  'Soft Halo',
  'Silk Spark',
  'Amber Shimmer',
  'Rose Whisper',
  'Petal Muse',
  'Dusty Rose',
  'Vintage Blush',
  'Berry Haze',
  'Tea Rose',
  'Olive Vein',
  'Moss Echo',
  'Sage Glass',
  'Forest Veil',
  'Cedar Green',
  'Jade Ink',
  'Plum Depth',
  'Cocoa Dusk',
  'Mahogany Shade',
  'Wine Shadow',
  'Midnight Umber',
  'Espresso Noir',
];

const GROUP_BY_INDEX = [
  'NUDE', 'NUDE', 'NUDE', 'NUDE', 'NUDE', 'NUDE',
  'CORAL', 'CORAL', 'CORAL', 'CORAL', 'CORAL', 'CORAL',
  'SHIMMER', 'SHIMMER', 'SHIMMER', 'SHIMMER', 'SHIMMER', 'SHIMMER',
  'ROSE', 'ROSE', 'ROSE', 'ROSE', 'ROSE', 'ROSE',
  'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN',
  'DEEP', 'DEEP', 'DEEP', 'DEEP', 'DEEP', 'DEEP',
];

const USE_BY_INDEX = ['LIP', 'CHEEK', 'EYE'];

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"%3E%3Crect width="800" height="800" fill="%23E6E1D9"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Inter,sans-serif" font-size="26" fill="%23817162"%3EPAN IMAGE%3C/text%3E%3C/svg%3E';

const colorsData = COLOR_NAMES.map((name, idx) => {
  const id = idx + 1;
  return {
    id,
    name,
    group: GROUP_BY_INDEX[idx],
    imagePath: `${import.meta.env.BASE_URL}assets/images/swatches/pan-${String(id).padStart(3, '0')}.jpeg`,
    use: USE_BY_INDEX[idx % USE_BY_INDEX.length],
  };
});

function ProductsGridSection() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredColors = useMemo(() => {
    if (activeFilter === 'ALL') {
      return colorsData;
    }

    return colorsData.filter((item) => item.group === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="products"
      className="bg-[#F8F5F2] px-5 py-16 text-[#2F353B] md:px-10 lg:px-16"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '24px' }}>
            Products
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontWeight: 300,
              fontSize: 'clamp(1.9rem, 3.2vw, 3rem)',
              letterSpacing: '0.16em',
              lineHeight: 1.2,
              color: '#2F353B',
              marginBottom: '24px',
              whiteSpace: 'nowrap',
            }}
          >
            36 色のカラーパレット
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 2, color: 'rgba(47,53,59,0.65)', maxWidth: '400px', margin: '0 auto 48px', textWrap: 'balance' }}>
            CHRYSAの36色を、質感や気分にあわせて一覧できるプロダクトグリッドです。ヌードからディープまで、今のメイクに足したくなる+αカラーを見つけてください。
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-[#2F353B]/10 pb-4 md:gap-x-8">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="group relative pb-2 text-xs tracking-[0.2em] text-[#2F353B]/80 transition-colors hover:text-[#2F353B]"
                aria-pressed={isActive}
              >
                {filter}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#C9A96E] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <motion.div layout className="products-color-grid">
          <AnimatePresence mode="popLayout">
            {filteredColors.map((color) => (
              <motion.article
                layout
                key={color.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative overflow-hidden bg-[#EEE8E1]"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={color.imagePath}
                    alt={`${color.name} pan`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-center backdrop-blur-0 transition-all duration-500 group-hover:bg-black/20 group-hover:backdrop-blur-[2px]">
                  <div className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p
                      className="text-[11px] uppercase tracking-[0.18em] text-white"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {color.name}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.24em] text-[#C9A96E]">{color.use}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function App() {
  return (
    <Layout>
      <ButterflyCursor />

      <Top />
      <Story />
      <ProductsGridSection />
      <Products />
      <Diagnosis />
      <Pricing />
      <Contact />
    </Layout>
  );
}

export default App;
