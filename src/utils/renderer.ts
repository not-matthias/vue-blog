import marked from 'marked';
import hljs from 'highlight.js';

const renderer = new marked.Renderer();

renderer.code = (code: string, language: string, isEscaped: boolean) => {
  let highlighted;

  // Use auto formatting if no language defined
  if (hljs.getLanguage(language)) highlighted = hljs.highlight(language, code);
  else highlighted = hljs.highlightAuto(code);

  // Working:
  return `<pre>${highlighted.value}</pre>`;
  // return `<pre class="${escape(language)}>${highlighted.value}</pre>`;

  // Strange highlighting (from the docs):
  // return `<pre ><code class="${escape(language)}">${highlighted.value}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export default marked;
