export interface Article {
  title: string;
  description: string;
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
  source: string;
  authorName: string;
  authorImage: string;
  authorLink: string;
  slug: string;
  markdown: string;
}

export interface Toc {
  anchor: string;
  text: string;
}
