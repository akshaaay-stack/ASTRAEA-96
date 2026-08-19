/**
 * ASTRAEA AI Academic Intelligence Copilot
 * Context-aware intelligent copilot tuned to JAIN University Work-Integrated BCA
 */

class AstraeaAI {
  constructor() {
    this.messages = [
      {
        sender: 'ai',
        text: 'Greetings. I am ASTRAEA AI, your academic & career intelligence copilot for JAIN University Kochi Work-Integrated BCA. How can I guide your trajectory today?',
        time: 'Just now',
        suggestions: [
          'I have 40 minutes tonight. What should I study?',
          'Explain Context Engineering and its knowledge connections',
          'Give me a 3-question mastery check on Python decorators',
          'Suggest a 4-World cross-specialisation project'
        ]
      }
    ];
  }

  init() {
    this.bindEvents();
    this.renderMessages();
  }

  bindEvents() {
    const inputEl = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');

    if (sendBtn && inputEl) {
      sendBtn.addEventListener('click', () => this.handleUserSend());
      inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUserSend();
      });
    }
  }

  handleUserSend() {
    const inputEl = document.getElementById('ai-chat-input');
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    this.sendMessage(text);
  }

  askPreset(queryText) {
    this.sendMessage(queryText);
  }

  sendMessage(userText) {
    // Add user message
    this.messages.push({
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.renderMessages();

    if (window.cosmicAudio) {
      window.cosmicAudio.playClick();
    }

    // Generate Context-Aware Response
    setTimeout(() => {
      const response = this.generateContextualResponse(userText);
      this.messages.push({
        sender: 'ai',
        text: response.text,
        cards: response.cards || null,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions || null
      });
      this.renderMessages();
      if (window.cosmicAudio) {
        window.cosmicAudio.playChime('info');
      }
    }, 650);
  }

  generateContextualResponse(query) {
    const student = window.astraeaAuth?.currentUser || {
      fullName: 'Student',
      specialisation: 'aether',
      semester: 1
    };

    const spec = ASTRAEA_DATA.specialisations[student.specialisation || 'aether'];
    const lower = query.toLowerCase();

    if (lower.includes('40 minute') || lower.includes('what should i study') || lower.includes('tonight') || lower.includes('minutes')) {
      return {
        text: `Based on your **${spec.name} (${spec.fullName})** DNA and upcoming assessments, here is your high-yield 40-minute study flight path:`,
        cards: [
          {
            title: 'Study Context Engineering — 20 min',
            subtitle: 'Priority Focus: Long-Context Attention & Token Budgeting',
            tag: 'Mastery currently 72%',
            color: 'border-indigo-500/40 bg-indigo-500/10'
          },
          {
            title: 'Complete Python Practice — 10 min',
            subtitle: 'Mission: Write 3 Asyncio Task gather() examples',
            tag: 'Mastery currently 68%',
            color: 'border-purple-500/40 bg-purple-500/10'
          },
          {
            title: 'Review Statistics — 10 min',
            subtitle: 'Weak Area: Bayes Conditional Probability formula',
            tag: 'Mastery currently 58%',
            color: 'border-rose-500/40 bg-rose-500/10'
          }
        ],
        suggestions: ['Launch Next Move Micro-Missions', 'Open Context Engineering Star System', 'Take Bayes Rule Quiz']
      };
    }

    if (lower.includes('context engineering') || lower.includes('connection')) {
      return {
        text: `✦ **Context Engineering Knowledge Topology:**\n\nIn the JAIN Work-Integrated BCA curriculum, **Context Engineering** is the operational bridge between raw LLM intelligence and enterprise reliability:\n\n1. **Semantic Foundation:** Vector embeddings & Cosine chunk distances.\n2. **Orchestration Layer:** Dynamic system prompt injection & Token budgeting.\n3. **Memory Retainers:** Hierarchical summarization and Redis vector caching.\n4. **Downstream Application:** Powers multi-agent consensus loops for production deployment.\n\n*Mastery Recommendation: Focus on cache invalidation strategies.*`,
        suggestions: ['Show High-Yield Exam Questions', 'How does this connect to NOVA (Full Stack)?']
      };
    }

    if (lower.includes('quiz') || lower.includes('python') || lower.includes('mastery check')) {
      return {
        text: `✦ **Interactive Python Mastery Check (3 Quick Questions):**\n\n**Q1:** What is the primary difference between \`asyncio.gather()\` and \`asyncio.wait()\` in async Python?\n*Answer: gather() preserves result ordering and raises exceptions immediately by default, while wait() returns sets of (done, pending) tasks with custom FIRST_COMPLETED timeouts.*\n\n**Q2:** When should you prefer a generator over a list comprehension?\n*Answer: When handling large datasets or streaming tokens to keep memory footprint O(1).*\n\n**Q3:** Write the decorator signature that preserves docstrings.\n*Answer: \`@functools.wraps(func)\`.*`,
        suggestions: ['Give me 3 more questions', 'Open Task Shrink for Python']
      };
    }

    if (lower.includes('4-world') || lower.includes('project') || lower.includes('hackathon') || lower.includes('kerala')) {
      return {
        text: `✦ **Four-World Synergy Blueprint: "Autonomous Campus Memory Engine"**\n\nHere is how your 4 Work-Integrated BCA specialisations synthesize into a winning project for the Kerala AI Nexus Hackathon:\n\n• **🪻 AETHER (You):** RAG Context Pipeline, Agent Prompting & Guardrails\n• **🟣 NOVA (Full Stack):** Next.js 15 App Router, FastAPI WebSockets & Docker\n• **🔵 QUANTA (Data Analytics):** Polars Embeddings Pipeline & Confidence Scoring\n• **🌸 LUMINA (Design Tech):** Glassmorphic Cosmic UI & Streaming Visualizer\n\n*Match compatibility score: 98% synergy.*`,
        suggestions: ['Assemble Team in Constellations', 'View Opportunity Radar']
      };
    }

    // Default intelligent response
    return {
      text: `Understood. Analyzing academic vector for **${student.fullName}** in **${spec.name} (${spec.fullName})**...\n\nYour current semester focus includes 6 core subjects with an average mastery of **74.5%**. Would you like me to generate a personalized micro-mission, triage an upcoming exam, or scan for cross-specialisation hackathon teammates?`,
      suggestions: [
        'I have 35 minutes right now',
        'Check Opportunity Radar',
        'Activate Exam Rescue Mode'
      ]
    };
  }

  renderMessages() {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;

    container.innerHTML = this.messages.map(msg => {
      const isAI = msg.sender === 'ai';
      return `
        <div class="flex gap-3 mb-4 ${isAI ? '' : 'justify-end'}">
          ${isAI ? `
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex-shrink-0">
              ✦
            </div>
          ` : ''}
          
          <div class="max-w-[85%] ${isAI ? 'glass-panel p-4 rounded-2xl border-indigo-500/20 text-slate-200' : 'bg-indigo-600 text-white p-3.5 rounded-2xl shadow-md'} text-xs leading-relaxed">
            <div class="whitespace-pre-line">${msg.text}</div>

            ${msg.cards ? `
              <div class="mt-3 space-y-2">
                ${msg.cards.map(c => `
                  <div class="p-2.5 rounded-xl border ${c.color}">
                    <div class="flex items-center justify-between font-semibold text-white">
                      <span>${c.title}</span>
                      <span class="text-[10px] text-slate-300 font-normal">${c.tag}</span>
                    </div>
                    <div class="text-[11px] text-slate-400 mt-0.5">${c.subtitle}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${msg.suggestions ? `
              <div class="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                ${msg.suggestions.map(s => `
                  <button class="text-[10px] px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-200 border border-indigo-400/30 transition-colors" onclick="window.astraeaAI.askPreset('${s.replace(/'/g, "\\'")}')">
                    ${s} ➔
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <div class="text-[9px] text-slate-400 mt-2 text-right">${msg.time}</div>
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
  }
}

window.astraeaAI = new AstraeaAI();
