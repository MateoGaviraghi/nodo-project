export type ImageSize = 'feedVertical' | 'feedSquare' | 'story';

export type TemplateName =
  | 'single-post'
  | 'carousel-cover'
  | 'carousel-content'
  | 'carousel-cta'
  | 'story-tip'
  | 'story-encuesta'
  | 'reel-thumbnail'
  | 'countdown-post'
  | 'service-spotlight';

export interface Size {
  width: number;
  height: number;
}

// --- Content types per template ---

export interface SinglePostContent {
  template: 'single-post';
  title: string;
  subtitle?: string;
  tag?: string;
  icon?: string;
  accentColor?: string;
}

export interface CarouselCoverContent {
  template: 'carousel-cover';
  title: string;
  subtitle?: string;
  ctaText?: string;
}

export interface CarouselContentContent {
  template: 'carousel-content';
  slideNumber: number;
  title: string;
  body: string;
  extraCard?: string;
  altBackground?: boolean;
}

export interface CarouselCtaContent {
  template: 'carousel-cta';
  title: string;
  body: string;
  buttonText: string;
}

export interface StoryTipContent {
  template: 'story-tip';
  label?: string;
  text: string;
  icon?: string;
}

export interface StoryEncuestaContent {
  template: 'story-encuesta';
  question: string;
  optionA: string;
  optionB: string;
}

export interface ReelThumbnailContent {
  template: 'reel-thumbnail';
  title: string;
  subtitle?: string;
  glowColor?: string;
}

export interface CountdownContent {
  template: 'countdown-post';
  number: string;
  label: string;
  subtitle?: string;
}

export interface ServiceSpotlightContent {
  template: 'service-spotlight';
  serviceName: string;
  icon: string;
  description: string;
  features: string[];
}

export type ContentItem =
  | SinglePostContent
  | CarouselCoverContent
  | CarouselContentContent
  | CarouselCtaContent
  | StoryTipContent
  | StoryEncuestaContent
  | ReelThumbnailContent
  | CountdownContent
  | ServiceSpotlightContent;

export interface ContentFile {
  id: string;
  date?: string;
  category: 'feed' | 'story' | 'reel';
  sizes: ImageSize[];
  slides: ContentItem[];
  caption?: string;
  hashtags?: string;
}
