((scope) => {
  async function getRawContent() {
    const target = this;
    if (! target.getAttribute('data-loaded')) {
      const url = target.getAttribute('data-raw-url');
      let text;
      try { text = await (await fetch(url)).text(); }
      catch { return window.open(url); }
      const dest = scope.document.querySelector(`div.code-expandable[data-raw-url="${url}"]`);
      const pre = scope.document.createElement('pre');
      pre.className = 'bg-light code';
      pre.innerHTML = `<code>${text}</code>`;
      scope.hljs.highlightBlock(pre);
      dest.appendChild(pre);
      target.setAttribute('data-loaded', 'true');
    }
  };
  scope.getRawContent = getRawContent;

  const baseURL = scope.document.querySelector("a#mock-base-url");
  baseURL.setAttribute('href', location.href);
  baseURL.innerText = location.href;
})(window);