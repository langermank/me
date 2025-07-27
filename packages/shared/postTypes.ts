export interface PostType {
  id: string;
  label: string;
}

export const POST_TYPES: PostType[] = [
  {
    id: 'visual-polish',
    label: 'Visual polish',
  },
  {
    id: 'component-api',
    label: 'Component API',
  },
  {
    id: 'design-tokens',
    label: 'Design tokens',
  },
  {
    id: 'talk',
    label: 'Talk',
  },
  {
    id: 'article',
    label: 'Article',
  },
];

export function getPostType(id: string): PostType | undefined {
  return POST_TYPES.find((type) => type.id === id || type.label === id);
}

export function getPostTypeById(id: string): PostType | undefined {
  return POST_TYPES.find((type) => type.id === id);
}

export function getPostTypeByLabel(label: string): PostType | undefined {
  return POST_TYPES.find((type) => type.label === label);
}
