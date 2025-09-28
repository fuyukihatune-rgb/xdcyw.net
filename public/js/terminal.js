(() => {
  'use strict';

  const supportsMatchMedia = typeof window.matchMedia === 'function';
  const prefersReducedMotion = supportsMatchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const enqueueMicrotask = typeof queueMicrotask === 'function'
    ? queueMicrotask
    : callback => setTimeout(callback, 0);

  const formatLastLogin = () => {
    const now = new Date();
    return now
      .toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      .replace(/\//g, '-');
  };

  // ================================================================
  // ▼ ここから下の USER_PROFILE を自分の情報に書き換えてください
  //    各項目はターミナルのコマンド結果にそのまま反映されます
  // ================================================================
  const USER_PROFILE = {
    // サイトに表示したい名前
    name: 'Concept',
    // 肩書きやタグライン
    tagline: '既婚の双極・解離・ADHD当事者。性別不詳としてジェンダークリニックへ通院中です。',
    // 活動拠点や一言
    location: 'Japan',
    // 並べて紹介したい関心領域（スラッシュ区切りで表示されます）
    focus: [
      '双極・解離・ADHDとの向き合い',
      'ジェンダークリニックでのケア',
      '障害年金での生活再構築',
      '2025年 予備試験に向けた法律学習'
    ],
    // about コマンドで表示する文章（行ごとに区切ってください）
    about: [
      '> Query: Identity',
      '> Response: A pre-bar exam student, currently interfacing with this terminal.',
      '> Query: Cognitive Profile',
      '> Response: INTP-A. System flagged with Bipolar I, Dissociative, and ADHD processes.',
      '> Query: Active Mission',
      '> Response: Legal code analysis for Preliminary Bar Exam. Start date: 2025-09.'
    ],
    // works コマンド用のデータ。必要な数だけ追加・削除してください。
    works: [
      {
        year: '2025',
        title: '法律学習キックオフ',
        note: '2025年9月、予備試験合格を目指して本格的に始動します。'
      },
      {
        year: '2024',
        title: 'ホルモン療法開始',
        note: '性別不詳としての自己理解を深めるため、治療と対話を開始しました。'
      },
      {
        year: 'ongoing',
        title: '徒手空拳・臥薪嘗胆',
        note: '障害年金で生活を支えながら、次の挑戦に備えています。'
      }
    ],
    // links コマンドに表示したい外部リンク集
    links: [
      { label: 'X (Twitter)', url: 'https://x.com/xdcyw_', note: '体調と学習の近況をポストしています。' },
      { label: 'Note', url: 'https://note.com/ncc1030', note: 'ジェンダークリニックの記録など。' },
      { label: '個人サイト', url: 'https://fuyuki.xdcyw.net', note: 'もう一つの個人サイト' }
    ],
    // contact コマンドに表示したい連絡先
    contact: [
      { label: 'Session ID', value: '05198a577132c72f1ea8c3f0b1cbad6ae5bea53e6dfd3b2b15e76609f1dd226026' },
      { label: 'X DM', value: '@xdcyw_', url: 'https://x.com/messages/compose?recipient_id=000000000', note: '体調・学習の連絡窓口です。※DMリンクはID設定が必要です' },
      { label: 'Mail', value: 'fuyuki@xdcyw.net', url: 'mailto:fuyuki@xdcyw.net' },
      { label: 'Ethereum', value: '0x6fe147f8452578b066567f7f862d0622AfD2cb91', url: 'https://etherscan.io/address/0x6fe147f8452578b066567f7f862d0622AfD2cb91', note: '支援用のウォレットアドレスです。' },
      { label: 'XMPP', value: 'fuyuki@conversations.im' }
    ],
    // hobbies コマンドで表示する好きなもの
    hobbies: [
      '初音ミク',
      'ガジェット・PC全般',
      'サツラクミルクティー',
      'アンバサホワイト'
    ]
  };

  // =====================================================================
  // ▼ motd (Message of the Day) 用のデータ
  // =====================================================================
  const MOTD_MESSAGES = [
    '今日という日は、残りの人生の最初の日である。- チャールズ・ディードリッヒ',
    '最も重要なことは、人生を楽しむこと。幸せを感じること。それだけです。- オードリー・ヘップバーン',
    '自分自身を信じてみるだけでいい。きっと、生きる道が見えてくる。- ゲーテ',
    '未来を予測する最善の方法は、自らそれを創りだすことだ。- アラン・ケイ',
    '臥薪嘗胆。'
  ];

  // =====================================================================
  // ▼ manifesto.txt の内容
  // =====================================================================
  const MANIFESTO_TEXT = [
    '―― xdcyw自由革命宣言 ――',
    '聞け。これは呼びかけだ。これは宣告だ。',
    '自由は許可ではない。自由は奪われるものではない。自由は、あなたの骨格に刻まれた自然権である。',
    'だが現実はどうか。多数者が怒声を揃えるとき、制度はそれを口実に個を拘束する。',
    '「皆が嫌がる」「社会のためだ」と言えば、簡単に自由は剝ぎ取られる。',
    'それは専制だ。群衆の専制は、しばしば独裁よりも冷たい。',
    '我らはここに断言する――自然権は不可侵である。',
    '個の尊厳は制度以前に在る。個の自由は、他者を害さない限り奪われてはならない。',
    '',
    '―― 基本原理（鉄則） ――',
    '一、自然権の不可侵：自由は生得の権利であり、いかなる多数の声もこれを根拠なく奪えない。',
    '二、公共的制約：個の自由は他者の基本的人権を侵してはならない。自由は責任と不可分である。',
    '三、説明責任：すべての行為は検証可能でなければならない。記録・証拠・公開を徹底する。',
    '四、反ポピュリズムの倫理：簡易な答えに酔うな。事実検証と議論を最優先せよ。',
    '',
    '―― 戦術（我らのやり方） ――',
    '我らは暗躍する泥棒ではない。',
    '我らは制度を読むハッカーだ――だがそのハックは公開の行為であり、法廷で争える証拠を残すためのものだ。',
    '我らの武器は文書であり、弾薬は署名と証拠である。',
    '我らの戦場は裁判所、公開フォーラム、行政記録、メディアのアーカイブ、ネットワークだ。',
    '手続きの綻びを見つけ出し、そこに楔を打つ。運用の矛盾を晒し、議論を組織し、制度を法的に更新させる。',
    '',
    '―― グレーと黒の境界（最重要） ――',
    'グレーを攻めよ。だが黒へは決して踏み込むな。',
    'グレーは攻めるべき戦域だが、霧深く滑りやすい。',
    '黒に堕ちる者は即座に同志ではなく敵となる。違法行為は理念を腐らせ、運動を滅ぼす。',
    'ゆえに我らは命じる――学べ。記録を残せ。公開せよ。専門家（弁護士・研究者・市民団体）と常に協議せよ。行動は検証可能であれ。透明性は唯一の免罪符である。',
    '',
    '―― 終局の警句 ――',
    '名は武器であり、同時に責務である。名を振るう者は、その名に対して説明と証拠を持て。',
    '学べ。議論せよ。記録を残せ。専門家と連携せよ。',
    'グレーを攻めよ。黒には決して触れるな。透明性を盾とし、合法性を礎として進め。'
  ];

  // =====================================================================
  // ▼ cat コマンドで読み込む仮想ファイルシステム
  // =====================================================================
  const VIRTUAL_FILESYSTEM = {
    'README.md': [
      '# ConceptOS',
      '',
      'This is the personal website of Concept, presented as a virtual terminal.',
      'Type `help` to see a list of available commands.'
    ],
    'profile.txt': USER_PROFILE.about,
    'contact.info': USER_PROFILE.contact.map(entry => {
      const base = entry.value ? `${entry.label}: ${entry.value}` : entry.label;
      const note = entry.note ? ` (${entry.note})` : '';
      return `${base}${note}`;
    }),
    'manifesto.txt': MANIFESTO_TEXT
  };

  // =====================================================================
  // ▼ studyplan コマンド用のデータ
  // =====================================================================
  const STUDY_PLAN_SUMMARY = [
    { category: '学習の三本柱', items: ['中央大学通信教育部', '呉基礎本シリーズ', '伊藤真シケタイ'] },
    { category: '論文対策', items: ['加藤ゼミナール論証集', '科目別講座（必要に応じて）'] },
    { category: '六法', items: ['ポケット六法'] }
  ];

  // =====================================================================
  // ▼ ターミナルの表示設定。好みに合わせて PROMPT や起動メッセージを調整できます
  // =====================================================================
  const TERMINAL_CONFIG = {
    promptLabel: 'concept@home:~$', // この行は現在使用されていませんが、念のため変更します
    windowTitle: 'ConceptOS',
    placeholder: 'help',
    typingSpeed: 15, // メッセージのタイピング速度（大きいほど遅い）
    commandTypingSpeed: 30, // コマンド入力のタイピング速度（大きいほど遅い）
  };

  const COMMAND_DESCRIPTIONS = {
    help: 'ネタコマンドの一覧を表示します。',
    neofetch: '虚構スペックを出力します。',
    nyan: '虹色の猫を召喚します。',
    sl: '蒸気機関車が走ります。',
    cmatrix: 'マトリックス風の雨を降らせます。',
    dice: 'd20 を振ります。',
    coffee: '仮想コーヒーを淹れます。',
    clear: '画面を初期化します。'
  };

  const padRight = (text, length) => {
    // ES2017のpadEndを使用して、よりモダンで簡潔な記述に修正
    return String(text || '').padEnd(length, ' ');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const terminalEl = document.querySelector('.terminal');
    const screen = document.getElementById('screen');
    const form = document.querySelector('.terminal__prompt');
    const input = document.getElementById('commandInput');
    const titleEl = document.querySelector('.terminal__title');
    const userPromptEl = form.querySelector('.prompt-user');
    const symbolPromptEl = form.querySelector('.prompt-symbol');
    let isRoot = false;

    if (!terminalEl || !screen || !form || !input) {
      return;
    }

    if (titleEl) {
      titleEl.textContent = TERMINAL_CONFIG.windowTitle;
    }

    const updatePrompt = () => {
      if (isRoot) {
        terminalEl.classList.add('is-root');
        form.querySelector('.prompt-user').textContent = 'root';
        form.querySelector('.prompt-symbol').textContent = '#';
      } else {
        form.querySelector('.prompt-user').textContent = USER_PROFILE.name.toLowerCase();
        form.querySelector('.prompt-host').textContent = 'xdcyw.net';
        form.querySelector('.prompt-dir').textContent = '~';
        form.querySelector('.prompt-symbol').textContent = '$';
      }
    }

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    const createLine = (className = '') => {
      const line = document.createElement('div');
      line.className = `line${className ? ` ${className}` : ''}`;
      screen.insertBefore(line, form);
      return line;
    };

    const scrollToBottom = () => {
      screen.scrollTop = screen.scrollHeight;
    };

    const typeLine = async (text, className = '') => {
      const line = createLine(className);
      if (prefersReducedMotion || TERMINAL_CONFIG.typingSpeed <= 0) {
        line.textContent = text;
        scrollToBottom();
        return;
      }
      for (const char of text) {
        line.textContent += char;
        scrollToBottom();
        await wait(TERMINAL_CONFIG.typingSpeed);
      }
    };

    const appendOutput = entry => {
      if (entry === null || entry === undefined) {
        return;
      }
      if (typeof entry === 'string') {
        const line = createLine();
        line.textContent = entry;
        scrollToBottom();
        return;
      }
      if (typeof entry === 'object') {
        const { text = '', className = '', url, note } = entry;
        const line = createLine(className);
        if (url) {
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = text || url;
          line.appendChild(link);
        } else {
          line.textContent = text;
        }
        if (note) {
          const span = document.createElement('span');
          span.className = 'line__note';
          span.textContent = ` — ${note}`;
          line.appendChild(span);
        }
        scrollToBottom();
      }
    };

    const COMMANDS = {
      help() {
        const lines = ['利用可能なネタコマンド:'];
        Object.keys(COMMAND_DESCRIPTIONS).forEach(name => {
          const description = COMMAND_DESCRIPTIONS[name];
          const label = padRight(name, 8);
          lines.push(`  ${label} - ${description}`);
        });
        return lines;
      },
      clear() {
        const lines = Array.from(screen.querySelectorAll('.line'));
        lines.forEach(line => line.remove());
        return null;
      },
      async coffee() {
        await typeLine('Brewing virtual coffee...', 'line--system');
        await wait(600);
        await typeLine('Done. Warning: 100% imaginary caffeine.', 'line--system');
        return null;
      },
      dice(args) {
        const sides = Math.max(2, Math.min(parseInt(args[0], 10) || 20, 100));
        const roll = Math.floor(Math.random() * sides) + 1;
        return [`d${sides} -> ${roll}`];
      },
      nyan() {
        return [
          ' /\\_/\\  ~~~',
          '( o.o )  nyan-drive engaged',
          ' > ^ <  mind the pixel dust'
        ];
      },
      async neofetch() {
        const asciiArt = [
          ' /\_/\',
          '( o.o )  NyanOS',
          ' > ^ <   *asleep but vigilant*'
        ];
        const vibes = ['caffeinated', 'void-surfing', 'sleep mode', 'ramen break'];
        const uptime = `${Math.floor(Math.random() * 42) + 1} loops`;
        const info = [
          { label: 'OS', value: 'NyanOS 3.14 purr' },
          { label: 'Kernel', value: 'rainbow.lolcat' },
          { label: 'Shell', value: 'nya$ 1.0.0' },
          { label: 'Packages', value: '1337 (aur: 420)' },
          { label: 'Uptime', value: uptime },
          { label: 'Mood', value: vibes[Math.floor(Math.random() * vibes.length)] },
          { label: 'GPU', value: 'ASCII Ray Tracer' }
        ];
        const container = createLine();
        container.className = 'line neofetch-wrapper';
        const asciiEl = document.createElement('pre');
        asciiEl.className = 'neofetch-ascii';
        asciiEl.textContent = asciiArt.join('\n');
        container.appendChild(asciiEl);
        const infoEl = document.createElement('div');
        infoEl.className = 'neofetch-info';
        infoEl.innerHTML = `<p><span class="info-label">${USER_PROFILE.name}</span>@<span class="info-label">xdcyw.net</span></p>` + info.map(line => `<p><span class="info-label">${line.label}</span>: ${line.value}</p>`).join('');
        container.appendChild(infoEl);
        return null;
      },
      cmatrix() {
        const originalBackgroundColor = screen.style.backgroundColor;
        screen.style.backgroundColor = 'black';

        const canvas = document.createElement('canvas');
        screen.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = screen.clientWidth;
        canvas.height = screen.clientHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = Array.from({ length: columns }).map(() => 1);

        const intervalId = setInterval(() => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#0F0';
          ctx.font = `${fontSize}px monospace`;

          rainDrops.forEach((y, i) => {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
              rainDrops[i] = 0;
            }
            rainDrops[i]++;
          });
        }, 30);

        const stopMatrix = () => {
          clearInterval(intervalId);
          canvas.remove();
          screen.style.backgroundColor = originalBackgroundColor;
          document.removeEventListener('keydown', stopMatrix);
          document.removeEventListener('click', stopMatrix);
          createLine();
          input.focus();
        };

        document.addEventListener('keydown', stopMatrix);
        document.addEventListener('click', stopMatrix);

        return 'Press any key or click to exit...';
      },
      async sl() {
        const slFrames = [
          [
            '      ====        ',
            '  ___ |[]|_n__n_I_ ',
            ' |___||__|###|____}',
            ' O-O--O-O+++--O-O  '
          ],
          [
            '     ====         ',
            ' ___|[]|_n__n_I_  ',
            ' |___||__|###|___}',
            ' O-O--O-O+++--O-O '
          ],
          [
            '    ====          ',
            '__|[]|_n__n_I_   ',
            '|___||__|###|__}',
            'O-O--O-O+++--O-O'
          ],
          [
            '   ====           ',
            '_|[]|_n__n_I_    ',
            '__||__|###|_}',
            'O-O--O-O+++--O-O'
          ]
        ];

        const line = createLine('line--sl');
        let frameIndex = 0;

        const renderFrame = () => {
          line.innerHTML = slFrames[frameIndex].join('<br>');
          frameIndex = (frameIndex + 1) % slFrames.length;
        };

        const intervalId = setInterval(renderFrame, 120);
        renderFrame();

        await wait(1800);
        clearInterval(intervalId);

        line.remove();
        return null;
      }
    };
    const printCommand = async command => {
      const line = createLine('line--command');

      const userSpan = document.createElement('span');
      userSpan.className = 'prompt-user';
      userSpan.textContent = isRoot ? 'root' : USER_PROFILE.name.toLowerCase();
      line.appendChild(userSpan);

      const symbolSegment = document.createElement('span');
      symbolSegment.className = 'prompt-symbol';
      symbolSegment.textContent = isRoot ? '#' : '$';
      line.appendChild(symbolSegment);

      const commandTextNode = document.createTextNode(' ');
      line.appendChild(commandTextNode);
      scrollToBottom();

      if (prefersReducedMotion) {
        commandTextNode.textContent += command;
        return;
      }

      for (const char of command) {
        commandTextNode.textContent += char;
        scrollToBottom();
        await wait(TERMINAL_CONFIG.commandTypingSpeed);
      }
    };

    const runCommand = async rawInput => {
      const trimmed = rawInput.trim();
      if (trimmed === '') {
        createLine();
        scrollToBottom();
        return;
      }

      await printCommand(trimmed);

      const [name, ...args] = trimmed.split(/\s+/);
      const handler = COMMANDS[name.toLowerCase()];
      if (!handler) {
        appendOutput({ text: `command not found: ${name}`, className: 'line--error' });
        return;
      }

      const result = await handler(args);
      const lines = Array.isArray(result) ? result : [result];
      lines.forEach(appendOutput);
      updatePrompt();
    };

    const history = [];
    let historyIndex = -1;

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const value = input.value;
      runCommand(value);
      if (value.trim()) {
        history.push(value);
        historyIndex = history.length;
      }
      input.value = '';
    });

    input.addEventListener('keydown', event => {
      if (!history.length) {
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || '';
        enqueueMicrotask(() => input.setSelectionRange(input.value.length, input.value.length));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        historyIndex = Math.min(history.length, historyIndex + 1);
        if (historyIndex === history.length) {
          input.value = '';
        } else {
          input.value = history[historyIndex] || '';
        }
        enqueueMicrotask(() => input.setSelectionRange(input.value.length, input.value.length));
      } else if (event.key === 'Escape') {
        event.preventDefault();
        input.value = '';
        historyIndex = history.length;
      }
    });

    (async () => {
      form.style.visibility = 'hidden'; // 起動中はフォームを隠す

      // 起動メッセージ
      await typeLine(`端末起動。'help' でコマンド一覧。`, 'line--system');
      await typeLine(`旧称『Concept / 概念』の履歴はこのターミナル内にのみ保管しています。`, 'line--system');
      createLine();
      form.style.visibility = 'visible';
      updatePrompt();
      scrollToBottom();
      input.focus();

      // フォーカス処理
      const setFocus = () => terminalEl.classList.add('is-focused');
      const removeFocus = () => terminalEl.classList.remove('is-focused');

      input.addEventListener('focus', setFocus);
      input.addEventListener('blur', removeFocus);
      terminalEl.addEventListener('click', () => input.focus());

      setFocus(); // 初期フォーカス

      // ドラッグでウィンドウを移動させる処理
      const headerEl = terminalEl.querySelector('.terminal__header');
      let isDragging = false;
      let offsetX, offsetY;

      headerEl.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - terminalEl.getBoundingClientRect().left;
        offsetY = e.clientY - terminalEl.getBoundingClientRect().top;
        document.body.style.userSelect = 'none';
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const maxLeft = window.innerWidth - terminalEl.offsetWidth;
        const maxTop = window.innerHeight - terminalEl.offsetHeight;

        terminalEl.style.left = `${Math.max(0, Math.min(newLeft, maxLeft))}px`;
        terminalEl.style.top = `${Math.max(0, Math.min(newTop, maxTop))}px`;
      });

      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          document.body.style.userSelect = '';
        }
      });
    })();
  });
})();
