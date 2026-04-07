import { renderSinglePost } from './single-post';
import type { ContentItem, Size } from '../types';

type RenderFn = (content: any, size: Size) => React.ReactElement;

const TEMPLATES: Record<string, RenderFn> = {
  'single-post': renderSinglePost,
};

export function getTemplate(name: string): RenderFn {
  const fn = TEMPLATES[name];
  if (!fn) throw new Error(`Template "${name}" not found. Available: ${Object.keys(TEMPLATES).join(', ')}`);
  return fn;
}

export function listTemplates(): string[] {
  return Object.keys(TEMPLATES);
}
