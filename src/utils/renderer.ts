import marked from 'marked';

const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  breaks: false,
  gfm: false
});

export default marked;
