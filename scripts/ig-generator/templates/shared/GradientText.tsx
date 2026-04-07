import { BRAND } from '../../config';

export function GradientText({
  children,
  fontSize = 200,
  fontWeight = 400,
}: {
  children: string;
  fontSize?: number;
  fontWeight?: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        fontSize,
        fontWeight,
        fontFamily: 'Codec Pro',
        backgroundImage: BRAND.gradient.full,
        backgroundClip: 'text',
        color: 'transparent',
        lineHeight: 1,
      }}
    >
      {children}
    </div>
  );
}
