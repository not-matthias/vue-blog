import marked from 'marked';

const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export default marked;
