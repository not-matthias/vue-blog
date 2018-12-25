import marked from 'marked';
import highlight from 'highlight.js';

const renderer = new marked.Renderer();

renderer.code = (code: string, language: string, isEscaped: boolean) => {
  const highlighted = highlight.highlight('css', code);

  // return `<pre v-highlightjs><code class="${escape(language)}">${code}</code></pre>`;
  return `<pre v-highlightjs><code class="${escape(language)}">${highlighted.value}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export default marked;
