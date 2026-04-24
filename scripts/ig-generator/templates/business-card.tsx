import { BRAND } from '../config';
import { getLogoDataUri } from './shared/Logo';

const CARD = { width: 1063, height: 591 };

export function renderBusinessCardFront() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: CARD.width,
        height: CARD.height,
        background: BRAND.colors.black,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.white,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient line */}
      <div style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        background: 'linear-gradient(90deg, transparent 10%, #8b2fef 30%, #5863f2 45%, #2785fe 55%, #00c1f4 70%, transparent 90%)',
      }} />

      {/* Logo */}
      <img
        src={getLogoDataUri()}
        width={340}
        height={340}
        style={{ opacity: 1 }}
      />

      <div style={{ display: 'flex', height: 24 }} />

      {/* NODO */}
      <div style={{
        display: 'flex',
        fontSize: 52,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.white,
        letterSpacing: 18,
      }}>
        NODO
      </div>

      <div style={{ display: 'flex', height: 20 }} />

      {/* Website */}
      <div style={{
        display: 'flex',
        fontSize: 22,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.cyan,
        letterSpacing: 4,
      }}>
        nodotech.dev
      </div>
    </div>
  );
}

export function renderBusinessCardBack() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: CARD.width,
        height: CARD.height,
        background: BRAND.colors.black,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.white,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bottom gradient line */}
      <div style={{
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 3,
        background: 'linear-gradient(90deg, transparent 10%, #8b2fef 30%, #5863f2 45%, #2785fe 55%, #00c1f4 70%, transparent 90%)',
      }} />

      {/* Logo */}
      <img
        src={getLogoDataUri()}
        width={140}
        height={140}
        style={{ opacity: 1 }}
      />

      <div style={{ display: 'flex', height: 36 }} />

      {/* Mateo */}
      <div style={{
        display: 'flex',
        fontSize: 22,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.white,
        letterSpacing: 3,
      }}>
        Mateo Gaviraghi
      </div>
      <div style={{
        display: 'flex',
        fontSize: 18,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.gray400,
        letterSpacing: 1,
        marginTop: 6,
      }}>
        +54 9 3425 16-2081
      </div>

      <div style={{ display: 'flex', height: 20 }} />

      {/* Justo */}
      <div style={{
        display: 'flex',
        fontSize: 22,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.white,
        letterSpacing: 3,
      }}>
        Justo Gonzalez Viescas
      </div>
      <div style={{
        display: 'flex',
        fontSize: 18,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.gray400,
        letterSpacing: 1,
        marginTop: 6,
      }}>
        +54 9 3425 26-7005
      </div>

      <div style={{ display: 'flex', height: 28 }} />

      {/* Gradient line separator */}
      <div style={{
        display: 'flex',
        width: 50,
        height: 2,
        background: BRAND.gradient.full,
        borderRadius: 2,
      }} />

      <div style={{ display: 'flex', height: 28 }} />

      {/* Email */}
      <div style={{
        display: 'flex',
        fontSize: 20,
        fontFamily: 'Codec Pro',
        color: BRAND.colors.cyan,
        letterSpacing: 2,
      }}>
        nodotech.dev@gmail.com
      </div>
    </div>
  );
}

export const CARD_SIZE = CARD;
