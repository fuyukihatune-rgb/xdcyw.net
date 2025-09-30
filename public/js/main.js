document.addEventListener('DOMContentLoaded', () => {
  const quoteTextEl = document.getElementById('home-quote-text');
  const quoteAuthorEl = document.getElementById('home-quote-author');

  if (quoteTextEl && quoteAuthorEl) {
    const quotes = [
      { text: '生まれて、すみません。', author: '太宰治' },
      { text: '人間は恋と革命のために生れて来たのだ。', author: '太宰治「斜陽」' },
      { text: '恥の多い生涯を送って来ました。', author: '太宰治「人間失格」' },
      { text: '笑われて、笑われて、つよくなる。', author: '太宰治「斜陽」' },
      { text: 'メロスは激怒した。', author: '太宰治「走れメロス」' },
      { text: '神に問う。信頼は罪なりや。', author: '太宰治「走れメロス」' },
      { text: 'ただ、一さいは過ぎて行きます。', author: '太宰治「人間失格」' },
      { text: '幸福感というものは、悲哀の川の底に、静かに光っている砂金のようなものではなかろうか。', author: '太宰治' },
      { text: '世間とは、個人じゃないか。', author: '太宰治「人間失格」' }
    ];

    const { text, author } = quotes[Math.floor(Math.random() * quotes.length)];
    quoteTextEl.textContent = `“${text}”`;
    quoteAuthorEl.textContent = `— ${author}`;
  }

  document.querySelectorAll('.article-share__button--copy').forEach(button => {
    button.addEventListener('click', async event => {
      const target = event.currentTarget;
      const url = target.getAttribute('data-share-url');
      if (!url) {
        return;
      }

      try {
        await navigator.clipboard.writeText(url);
        target.classList.add('article-share__button--copied');
        target.textContent = 'Copied!';
        setTimeout(() => {
          target.classList.remove('article-share__button--copied');
          target.textContent = 'Copy Link';
        }, 2000);
      } catch (error) {
        console.error('Failed to copy', error);
      }
    });
  });

  document.querySelectorAll('.article-share__button--native').forEach(button => {
    button.addEventListener('click', async event => {
      const target = event.currentTarget;
      const url = target.getAttribute('data-share-url');
      const title = target.getAttribute('data-share-title') || document.title;
      if (!url) {
        return;
      }

      if (navigator.share) {
        try {
          await navigator.share({ title: title, text: title, url: url });
          target.classList.add('article-share__button--shared');
          target.textContent = 'Shared!';
          setTimeout(() => {
            target.classList.remove('article-share__button--shared');
            target.textContent = 'Share';
          }, 2000);
        } catch (error) {
          console.error('Share cancelled or failed', error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(url);
          target.classList.add('article-share__button--copied');
          target.textContent = 'Copied!';
          setTimeout(() => {
            target.classList.remove('article-share__button--copied');
            target.textContent = 'Share';
          }, 2000);
        } catch (error) {
          console.error('Fallback copy failed', error);
        }
      }
    });
  });
});
