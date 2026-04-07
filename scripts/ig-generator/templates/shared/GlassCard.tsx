import { BRAND } from '../../config';

export function GlassCard({
  children,
  padding = 24,
}: {
  children: React.ReactNode;
  padding?: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: BRAND.colors.gray800,
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding,
      }}
    >
      {children}
    </div>
  );
}
