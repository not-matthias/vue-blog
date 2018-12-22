export interface ICategory {
  name: string;
  description: string;
}

export default {
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
  ],
  username: 'not-matthias',
  repo: 'vue-blog-posts',
  branch: 'master',
  folder: 'blog-posts'
};
