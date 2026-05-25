// ===== App Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypingEffect();
    initCountUp();
    initNavScroll();
    initThemeToggle();
    initExplainModule();
    initDebugModule();
    initAlgoModule();
});

// ===== Background Particles =====
function initParticles() {
    const container = document.getElementById('bgParticles');
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 200 + 50;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.animationDuration = (Math.random() * 15 + 15) + 's';
        container.appendChild(p);
    }
}

// ===== Hero Typing Effect =====
function initTypingEffect() {
    const codeLines = [
        '<span style="color:#c678dd">def</span> <span style="color:#61afef">learn_code</span>(student):',
        '    <span style="color:#e5c07b">skills</span> = []',
        '    <span style="color:#c678dd">for</span> topic <span style="color:#c678dd">in</span> [<span style="color:#98c379">"基础"</span>, <span style="color:#98c379">"算法"</span>]:',
        '        skills.<span style="color:#61afef">append</span>(topic)',
        '    <span style="color:#c678dd">return</span> <span style="color:#98c379">"🎉 精通编程！"</span>',
    ];
    const el = document.getElementById('typingCode');
    let lineIdx = 0, charIdx = 0;
    const plainLines = codeLines.map(l => l.replace(/<[^>]*>/g, ''));

    function type() {
        if (lineIdx >= codeLines.length) {
            setTimeout(() => { el.innerHTML = ''; lineIdx = 0; charIdx = 0; type(); }, 3000);
            return;
        }
        const plain = plainLines[lineIdx];
        if (charIdx <= plain.length) {
            // Build display: completed lines + current partial line
            let display = '';
            for (let i = 0; i < lineIdx; i++) display += codeLines[i] + '\n';
            // For current line, show chars up to charIdx using the rich version
            const currentPlain = plain.substring(0, charIdx);
            // Map plain text position to HTML
            let htmlOut = '', pi = 0, hi = 0;
            const html = codeLines[lineIdx];
            while (pi < charIdx && hi < html.length) {
                if (html[hi] === '<') {
                    const closeIdx = html.indexOf('>', hi);
                    htmlOut += html.substring(hi, closeIdx + 1);
                    hi = closeIdx + 1;
                } else {
                    htmlOut += html[hi];
                    hi++; pi++;
                }
            }
            // Close any open tags
            const openTags = htmlOut.match(/<span[^>]*>/g) || [];
            const closeTags = htmlOut.match(/<\/span>/g) || [];
            for (let t = 0; t < openTags.length - closeTags.length; t++) htmlOut += '</span>';
            
            display += htmlOut + '<span style="animation:blink 1s infinite">|</span>';
            el.innerHTML = display;
            charIdx++;
            setTimeout(type, 50 + Math.random() * 40);
        } else {
            lineIdx++; charIdx = 0;
            setTimeout(type, 300);
        }
    }
    // Add blink animation
    const style = document.createElement('style');
    style.textContent = '@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}';
    document.head.appendChild(style);
    type();
}

// ===== Count Up Animation =====
function initCountUp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(el => {
                    const target = parseInt(el.dataset.target);
                    let current = 0;
                    const step = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) { current = target; clearInterval(timer); }
                        el.textContent = current;
                    }, 30);
                });
                observer.disconnect();
            }
        });
    });
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
}

// ===== Nav Scroll & Active Link =====
function initNavScroll() {
    const sections = document.querySelectorAll('section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const h = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + h) {
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    if (l.dataset.section === id) l.classList.add('active');
                });
            }
        });
    });
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ===== Theme Toggle =====
function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    const icon = btn.querySelector('.theme-icon');
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.textContent = '☀️';
    }
    btn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        document.documentElement.setAttribute('data-theme', isLight ? '' : 'light');
        icon.textContent = isLight ? '🌙' : '☀️';
        localStorage.setItem('theme', isLight ? 'dark' : 'light');
    });
}

// ===== Module 1: Code Explanation =====
function initExplainModule() {
    const langSelect = document.getElementById('languageSelect');
    const exampleSelect = document.getElementById('exampleSelect');
    const codeInput = document.getElementById('codeInput');
    const explainBtn = document.getElementById('explainBtn');
    const explainOutput = document.getElementById('explainOutput');

    function updateExamples() {
        const lang = langSelect.value;
        const examples = CODE_EXAMPLES[lang] || [];
        exampleSelect.innerHTML = '<option value="">-- 选择示例或自行粘贴 --</option>';
        examples.forEach((ex, i) => {
            exampleSelect.innerHTML += `<option value="${i}">${ex.name}</option>`;
        });
    }

    langSelect.addEventListener('change', () => {
        updateExamples();
        codeInput.value = '';
        explainOutput.innerHTML = '<div class="placeholder-msg"><div class="placeholder-icon">🔍</div><p>选择或粘贴代码，然后点击"开始解释"</p></div>';
    });

    exampleSelect.addEventListener('change', () => {
        const lang = langSelect.value;
        const idx = exampleSelect.value;
        if (idx !== '') {
            codeInput.value = CODE_EXAMPLES[lang][idx].code;
        }
    });

    explainBtn.addEventListener('click', () => {
        const lang = langSelect.value;
        const idx = exampleSelect.value;
        const code = codeInput.value.trim();
        if (!code) { alert('请先输入或选择代码！'); return; }

        const lines = code.split('\n');
        let explanations = null;
        // If user selected an example, use its explanations
        if (idx !== '' && CODE_EXAMPLES[lang] && CODE_EXAMPLES[lang][idx]) {
            explanations = CODE_EXAMPLES[lang][idx].explanations;
        }

        explainOutput.innerHTML = '';
        lines.forEach((line, i) => {
            const div = document.createElement('div');
            div.className = 'explain-line';
            div.style.animationDelay = (i * 0.08) + 's';
            const explanation = explanations && explanations[i]
                ? explanations[i]
                : getGenericExplanation(line, lang);
            div.innerHTML = `
                <span class="line-num">${i + 1}</span>
                <div class="line-content">
                    <div class="line-code">${escapeHtml(line)}</div>
                    <div class="line-explanation">${explanation}</div>
                </div>
            `;
            explainOutput.appendChild(div);
        });
    });

    updateExamples();
}

function escapeHtml(text) {
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function getGenericExplanation(line, lang) {
    const trimmed = line.trim();
    if (!trimmed) return '空行，用于代码分隔，提高可读性';
    if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('/*'))
        return '注释：' + trimmed.replace(/^[#/\*]+\s*/, '');
    if (/^(def |function |public |private |void )/.test(trimmed)) return '函数/方法定义';
    if (/^(class )/.test(trimmed)) return '类定义';
    if (/^(if |else|elif )/.test(trimmed)) return '条件判断语句';
    if (/^(for |while )/.test(trimmed)) return '循环语句';
    if (/^(return )/.test(trimmed)) return '返回语句，将结果返回给调用者';
    if (/^(import |from |#include|require)/.test(trimmed)) return '导入/引入外部模块或库';
    if (/^(try|catch|except|finally)/.test(trimmed)) return '异常处理语句';
    if (/=/.test(trimmed) && !/==/.test(trimmed)) return '变量赋值操作';
    if (/\.(append|push|add|pop|remove|insert)/.test(trimmed)) return '数据结构操作（增删元素）';
    if (/print|console\.log|System\.out/.test(trimmed)) return '输出/打印语句';
    return '程序逻辑语句';
}

// ===== Module 2: Debug Challenges =====
function initDebugModule() {
    const categoriesEl = document.getElementById('debugCategories');
    const titleEl = document.getElementById('challengeTitle');
    const descEl = document.getElementById('challengeDesc');
    const codeEl = document.getElementById('challengeCode');
    const diffEl = document.getElementById('challengeDifficulty');
    const hintBtn = document.getElementById('showHintBtn');
    const answerBtn = document.getElementById('showAnswerBtn');
    const hintEl = document.getElementById('challengeHint');
    const answerEl = document.getElementById('challengeAnswer');

    let currentItems = [];
    let currentIdx = 0;

    DEBUG_DATA.forEach((cat, ci) => {
        const btn = document.createElement('button');
        btn.className = 'debug-cat-btn';
        btn.innerHTML = `${cat.icon} ${cat.category.replace(/^. /, '')}`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.debug-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentItems = cat.items;
            currentIdx = 0;
            showChallenge(0);
        });
        categoriesEl.appendChild(btn);
    });

    function showChallenge(idx) {
        const item = currentItems[idx];
        if (!item) return;
        titleEl.textContent = item.title;
        descEl.innerHTML = `<p>${item.title}</p><p style="margin-top:8px;font-size:0.85rem;color:var(--text-muted)">题目 ${idx + 1} / ${currentItems.length}</p>`;
        codeEl.innerHTML = `<code>${escapeHtml(item.code)}</code>`;
        diffEl.textContent = item.difficulty;
        diffEl.style.background = item.difficulty === '简单' ? 'rgba(0,206,201,0.12)' :
            item.difficulty === '中等' ? 'rgba(254,188,46,0.12)' : 'rgba(255,95,87,0.12)';
        diffEl.style.color = item.difficulty === '简单' ? 'var(--accent-3)' :
            item.difficulty === '中等' ? '#febc2e' : '#ff5f57';
        hintEl.classList.add('hidden');
        answerEl.classList.add('hidden');
        hintBtn.disabled = false;
        answerBtn.disabled = false;

        hintBtn.onclick = () => {
            hintEl.classList.toggle('hidden');
            hintEl.innerHTML = `💡 <strong>提示：</strong>${item.hint}`;
        };
        answerBtn.onclick = () => {
            answerEl.classList.toggle('hidden');
            answerEl.innerHTML = `
                <p>✅ <strong>错误分析：</strong>${item.answer}</p>
                <div class="fixed-code"><strong>修复后的代码：</strong>\n\n${escapeHtml(item.fixedCode)}</div>
                ${currentIdx < currentItems.length - 1 ?
                    `<button class="btn btn-primary btn-sm" style="margin-top:16px" id="nextChallengeBtn">下一题 →</button>` : 
                    `<p style="margin-top:16px;color:var(--accent-3)">🎉 本类别的所有题目已完成！</p>`}
            `;
            const nextBtn = document.getElementById('nextChallengeBtn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIdx++;
                    showChallenge(currentIdx);
                });
            }
        };
    }
}

// ===== Module 3: Algorithm Problems =====
function initAlgoModule() {
    const tagsEl = document.getElementById('algoTags');
    const listEl = document.getElementById('algoList');
    const detailEl = document.getElementById('algoDetail');
    const searchInput = document.getElementById('algoSearch');

    // Collect all tags
    const allTags = new Set();
    ALGO_DATA.forEach(a => a.tags.forEach(t => allTags.add(t)));

    // Render tag filters
    const allTagBtn = document.createElement('span');
    allTagBtn.className = 'algo-tag active';
    allTagBtn.textContent = '全部';
    allTagBtn.addEventListener('click', () => {
        document.querySelectorAll('.algo-tag').forEach(t => t.classList.remove('active'));
        allTagBtn.classList.add('active');
        renderList(ALGO_DATA);
    });
    tagsEl.appendChild(allTagBtn);

    allTags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'algo-tag';
        span.textContent = tag;
        span.addEventListener('click', () => {
            document.querySelectorAll('.algo-tag').forEach(t => t.classList.remove('active'));
            span.classList.add('active');
            renderList(ALGO_DATA.filter(a => a.tags.includes(tag)));
        });
        tagsEl.appendChild(span);
    });

    function renderList(data) {
        listEl.innerHTML = '';
        data.forEach((algo, i) => {
            const div = document.createElement('div');
            div.className = 'algo-item';
            const diffClass = algo.difficulty === 'easy' ? 'diff-easy' :
                algo.difficulty === 'medium' ? 'diff-medium' : 'diff-hard';
            const diffText = algo.difficulty === 'easy' ? '简单' :
                algo.difficulty === 'medium' ? '中等' : '困难';
            div.innerHTML = `
                <span class="algo-item-title">${algo.title}</span>
                <span class="algo-item-diff ${diffClass}">${diffText}</span>
            `;
            div.addEventListener('click', () => {
                document.querySelectorAll('.algo-item').forEach(el => el.classList.remove('active'));
                div.classList.add('active');
                showAlgoDetail(algo);
            });
            listEl.appendChild(div);
        });
    }

    function showAlgoDetail(algo) {
        const diffText = algo.difficulty === 'easy' ? '简单' :
            algo.difficulty === 'medium' ? '中等' : '困难';
        let stepsHtml = algo.steps.map((step, i) => `
            <div class="algo-step" data-step="${i + 1}">
                <h4>${step.title}</h4>
                <p>${step.content}</p>
                ${step.code ? `<pre>${escapeHtml(step.code)}</pre>` : ''}
            </div>
        `).join('');

        detailEl.innerHTML = `
            <h3>${algo.title}</h3>
            <div class="algo-meta">
                难度：${diffText} &nbsp;|&nbsp; 标签：${algo.tags.join(', ')}
            </div>
            <p style="margin-bottom:28px;color:var(--text-secondary)">${algo.desc}</p>
            ${stepsHtml}
            <div class="algo-complexity">
                <h4>复杂度分析</h4>
                <p>⏱ 时间复杂度：${algo.complexity.time}</p>
                <p>💾 空间复杂度：${algo.complexity.space}</p>
            </div>
        `;
    }

    // Search
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) { renderList(ALGO_DATA); return; }
        renderList(ALGO_DATA.filter(a =>
            a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))
        ));
    });

    renderList(ALGO_DATA);
}
