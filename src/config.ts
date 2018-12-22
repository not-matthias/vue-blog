export interface ICategory {
  name: string;
  description: string;
}

export const Config = {
  title: 'Blog',
  categories: [
    {
      name: 'General',
      description: 'No description.'
    },
    {
      name: 'Coding',
      description: 'No description.'
    }
  ]
};