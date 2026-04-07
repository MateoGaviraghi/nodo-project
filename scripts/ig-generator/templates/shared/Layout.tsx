import { BRAND } from '../../config';
import { Logo } from './Logo';
import type { Size } from '../../types';

export function Layout({
  children,
  size,
  altBg = false,
  showHandle = true,
  showLogo = true,
  showGlow = false,
  glowColor = BRAND.colors.cyan,
  showGrid = false,
  logoSize = 96,
  logoOpacity = 0.25,
}: {
  children: React.ReactNode;
  size: Size;
  altBg?: boolean;
  showHandle?: boolean;
  showLogo?: boolean;
  showGlow?: boolean;
  glowColor?: string;
  showGrid?: boolean;
  logoSize?: number;
  logoOpacity?: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: size.width,
        height: size.height,
        background: altBg ? BRAND.colors.gray900 : BRAND.colors.black,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.white,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Tech grid lines */}
      {showGrid && (
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {/* Horizontal lines */}
          {[0.15, 0.35, 0.65, 0.85].map((pos, i) => (
            <div
              key={`h${i}`}
              style={{
                display: 'flex',
                position: 'absolute',
                top: `${pos * 100}%`,
                left: 0,
                width: '100%',
                height: 1,
                background: 'rgba(255,255,255,0.025)',
              }}
            />
          ))}
          {/* Vertical lines */}
          {[0.2, 0.5, 0.8].map((pos, i) => (
            <div
              key={`v${i}`}
              style={{
                display: 'flex',
                position: 'absolute',
                left: `${pos * 100}%`,
                top: 0,
                width: 1,
                height: '100%',
                background: 'rgba(255,255,255,0.025)',
              }}
            />
          ))}
          {/* Corner accent - top left */}
          <div style={{
            display: 'flex',
            position: 'absolute',
            top: 40,
            left: 40,
            width: 60,
            height: 60,
            borderTop: '2px solid rgba(0,193,244,0.15)',
            borderLeft: '2px solid rgba(0,193,244,0.15)',
          }} />
          {/* Corner accent - bottom right */}
          <div style={{
            display: 'flex',
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 60,
            height: 60,
            borderBottom: '2px solid rgba(139,47,239,0.15)',
            borderRight: '2px solid rgba(139,47,239,0.15)',
          }} />
        </div>
      )}

      {/* Glow effect */}
      {showGlow && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: 250,
            background: `radial-gradient(circle, ${glowColor}20 0%, ${glowColor}08 40%, transparent 70%)`,
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: 80,
          width: '100%',
        }}
      >
        {children}
      </div>

      {/* Footer: handle + logo */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 48px 48px 48px',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        {showHandle ? (
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: BRAND.colors.gray400,
              fontFamily: 'Codec Pro',
              letterSpacing: 1,
            }}
          >
            {BRAND.handle}
          </div>
        ) : (
          <div style={{ display: 'flex' }} />
        )}
        {showLogo && <Logo size={logoSize} opacity={logoOpacity} />}
      </div>
    </div>
  );
}
