((scope) => {
  async function getRawContent() {
    const target = this;
    if (! target.getAttribute('data-loaded')) {
      const url = target.getAttribute('data-raw-url');
      const text = await (await fetch(url)).text();
      target.innerHTML = `<pre class="bg-light code"><code>${text}</code></pre>`;
      target.setAttribute('data-loaded', 'true');
    }
  };
  scope.getRawContent = getRawContent;
})(window);