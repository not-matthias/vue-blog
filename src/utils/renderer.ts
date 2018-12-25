import marked from 'marked';
import highlight from 'highlight.js';

const renderer = new marked.Renderer();

renderer.code = (code: string, language: string, isEscaped: boolean) => {
  let highlighted;

  // Use auto formatting if no language defined
  if (highlight.getLanguage(language)) highlighted = highlight.highlight(language, code);
  else highlighted = highlight.highlightAuto(code);

  return `<pre><code class="lang-${escape(language)}">${highlighted.value}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export default marked;
