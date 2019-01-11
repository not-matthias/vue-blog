import marked from 'marked';
import hljs from 'highlight.js';

const renderer = new marked.Renderer();

renderer.code = (code: string, language: string, isEscaped: boolean) => {
  let highlighted;

  // Use auto formatting if no language defined
  if (hljs.getLanguage(language)) highlighted = hljs.highlight(language, code);
  else highlighted = hljs.highlightAuto(code);

  // TODO: use custom directive
  // return `<pre v-highlightjs><code class="${escape(language)}">${code}</code></pre>`;

  return `<pre><code class="lang-${escape(language)}">${highlighted.value}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export default marked;
