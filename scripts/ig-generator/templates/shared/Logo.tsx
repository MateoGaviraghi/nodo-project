import { readFileSync } from 'fs';
import { BRAND } from '../../config';

let logoDataUri: string | null = null;

export function getLogoDataUri(): string {
  if (logoDataUri) return logoDataUri;
  const buffer = readFileSync(BRAND.logo);
  logoDataUri = `data:image/png;base64,${buffer.toString('base64')}`;
  return logoDataUri;
}

export function Logo({ size = 64, opacity = 0.15 }: { size?: number; opacity?: number }) {
  return (
    <img
      src={getLogoDataUri()}
      width={size}
      height={size}
      style={{ opacity }}
    />
  );
}
