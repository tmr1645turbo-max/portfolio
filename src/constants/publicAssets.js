/**
 * 静的メディアはプロジェクト直下の public/assets/ に置くと
 * ビルド後もそのまま配信されます（Vite）。
 *
 * 配置例:
 *   public/assets/video/chrysa_butterfly_36colors.mp4
 *   public/assets/images/hero_butterfly.jpg
 *   public/assets/images/howto_lip.jpg
 *   public/assets/images/story_hero.png
 *   public/assets/images/story_visual.jpeg
 *   public/assets/images/swatches/n01.jpg
 */

const rawBase = import.meta.env.BASE_URL ?? '/';
const root = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const base = `${root}assets/`;

export const publicAssets = {
  /** 画像未配置時でもヒーローに何か表示する */
  heroPlaceholder: `${base}images/hero_placeholder.svg`,

  heroVideoPrimary: `${base}video/chrysa_butterfly_36colors.mp4`,
  heroVideoFallback: `${base}video/kv_video.mp4`,
  heroImage: `${base}images/hero_butterfly.jpg`,

  storyHero: `${base}images/story_hero.png`,
  storyVisual: `${base}images/story_visual.jpeg`,

  howtoLip: `${base}images/howto_lip.jpg`,
  howtoCheek: `${base}images/howto_cheek.jpg`,
  howtoEye: `${base}images/howto_eye.jpg`,
  productPansFlatLay: `${base}images/Cream_color_pans_flat_lay_68350d4409.jpeg`,

  swatch: (colorId) => `${base}images/swatches/${colorId}.jpg`,
  modal: (colorName) =>
    `${base}images/modal_${colorName.replace(/\s+/g, '_')}.jpg`,
};
