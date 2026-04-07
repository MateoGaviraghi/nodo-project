import { BRAND } from '../../config';

export function GradientLine({
  width = 120,
  height = 3,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        width,
        height,
        background: BRAND.gradient.full,
        borderRadius: height,
        marginTop: 16,
        marginBottom: 16,
      }}
    />
  );
}
