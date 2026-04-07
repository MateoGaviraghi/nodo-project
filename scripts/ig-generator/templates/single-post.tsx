import { BRAND } from '../config';
import { getLogoDataUri } from './shared/Logo';
import type { SinglePostContent, Size } from '../types';

export function renderSinglePost(content: SinglePostContent, size: Size) {
  const isStory = size.height > 1500;
  const titleSize = isStory ? 110 : 100;
  const subtitleSize = isStory ? 34 : 32;
  const logoSize = isStory ? 400 : 360;
  const brandNameSize = isStory ? 40 : 36;
  const tagSize = isStory ? 20 : 18;

  const lines = content.title.split('\n');
  const firstLine = lines[0] || '';
  const secondLine = lines[1] || '';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: size.width,
        height: size.height,
        background: BRAND.colors.black,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.white,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient line — bright center, fades to edges */}
      <div style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
        background: 'linear-gradient(90deg, transparent 5%, #8b2fef 25%, #5863f2 40%, #2785fe 50%, #00c1f4 60%, #5863f2 75%, transparent 95%)',
      }} />
      {/* Glow under the line */}
      <div style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: '20%',
        width: '60%',
        height: 20,
        background: 'radial-gradient(ellipse at top, rgba(88,99,242,0.3) 0%, transparent 100%)',
      }} />

      {/* Subtle top ambient glow */}
      <div style={{
        display: 'flex',
        position: 'absolute',
        width: 900,
        height: 500,
        borderRadius: 450,
        background: 'radial-gradient(circle, rgba(139,47,239,0.05) 0%, transparent 60%)',
        top: -250,
        left: '50%',
        transform: 'translateX(-50%)',
      }} />

      {/* Logo N — top */}
      <div style={{
        display: 'flex',
        marginTop: isStory ? 100 : 70,
      }}>
        <img
          src={getLogoDataUri()}
          width={logoSize}
          height={logoSize}
          style={{ opacity: 1 }}
        />
      </div>

      {/* Center: title block */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: '0 40px',
      }}>
        {/* First line — white */}
        <div style={{
          display: 'flex',
          fontSize: titleSize,
          fontWeight: 400,
          fontFamily: 'Codec Pro',
          color: BRAND.colors.white,
          lineHeight: 1.1,
          justifyContent: 'center',
        }}>
          {firstLine}
        </div>

        {/* Second line — gradient italic */}
        {secondLine && (
          <div style={{
            display: 'flex',
            fontSize: titleSize,
            fontWeight: 400,
            fontFamily: 'Codec Pro',
            fontStyle: 'italic',
            lineHeight: 1.1,
            justifyContent: 'center',
            backgroundImage: BRAND.gradient.full,
            backgroundClip: 'text',
            color: 'transparent',
            marginTop: 4,
          }}>
            {secondLine}
          </div>
        )}

        {/* Short gradient line */}
        <div style={{
          display: 'flex',
          width: 50,
          height: 3,
          background: BRAND.gradient.full,
          borderRadius: 3,
          marginTop: 48,
          marginBottom: 48,
        }} />

        {/* Subtitle */}
        {content.subtitle && (
          <div style={{
            display: 'flex',
            fontSize: subtitleSize,
            color: BRAND.colors.gray300,
            fontFamily: 'Codec Pro',
            letterSpacing: 0.5,
            justifyContent: 'center',
          }}>
            {content.subtitle}
          </div>
        )}
      </div>

      {/* Bottom: tag + NODO */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: isStory ? 70 : 50,
        gap: 20,
      }}>
        {content.tag && (
          <div style={{
            display: 'flex',
            fontSize: tagSize,
            color: BRAND.colors.cyan,
            fontFamily: 'Codec Pro',
            letterSpacing: 10,
          }}>
            {content.tag}
          </div>
        )}
        <div style={{
          display: 'flex',
          fontSize: brandNameSize,
          fontFamily: 'Codec Pro',
          color: BRAND.colors.white,
          letterSpacing: 14,
        }}>
          NODO
        </div>
      </div>
    </div>
  );
}
