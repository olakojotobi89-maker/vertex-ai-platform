/*
  workspace.js
  Vertex AI - Workspace page interactions

  Production-ready, modular, mobile-first.
  Future backend integration points are clearly marked.
*/

(() => {
  'use strict';

  // ----------------------------
  // Utilities
  // ----------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const setHidden = (el, hidden) => {
    if (!el) return;
    el.hidden = Boolean(hidden);
  };

  const nowIso = () => new Date().toISOString();

  const smoothScrollIntoView = (el) => {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ----------------------------
  // Business Health animation
  // ----------------------------
  const setHealthProgress = (percent) => {
    const ring = $('.ring-fg');
    if (!ring) return;

    const pct = Math.max(0, Math.min(100, Number(percent) || 0));
    const r = 48;
    const c = 2 * Math.PI * r;
    const offset = c * (1 - pct / 100);

    ring.style.strokeDasharray = `${c}`;
    ring.style.strokeDashoffset = `${offset}`;

    const scoreText = $('#healthScoreText');
    const statusText = $('#healthStatusText');
    const chip = $('#healthStatusChip');

    if (scoreText) scoreText.textContent = `${pct}%`;

    const status =
      pct >= 85
        ? { label: 'Healthy', sub: 'Healthy Business' }
        : pct >= 65
          ? { label: 'Good', sub: 'Business is stable' }
          : { label: 'At Risk', sub: 'Needs attention' };

    if (statusText) statusText.textContent = status.sub;
    if (chip) chip.textContent = status.label;
  };

  // ----------------------------
  // Navigation
  // ----------------------------
  const initNavigation = () => {
    $('#backBtn')?.addEventListener('click', () => window.history.back());

    // Keep bottom nav compatible with existing pages.
    $('#settingsBtn')?.addEventListener('click', () => {
      window.location.href = 'settings.html';
    });

    $('#notifyBtn')?.addEventListener('click', () => {
      // Future: open notifications panel/page
    });

    $('#navAIChat')?.addEventListener('click', (e) => {
      e.preventDefault();
      // Future: window.location.href = 'chat.html';
    });

    $('#navDocuments')?.addEventListener('click', (e) => {
      e.preventDefault();
      // Future: window.location.href = 'documents.html';
    });
  };

  // ----------------------------
  // Modal
  // ----------------------------
  const initModal = () => {
    const backdrop = $('#workspaceModalBackdrop');
    const modal = $('#workspaceModal');
    const openBtn = $('#openWorkspaceModal');
    const closeBtn = $('#closeWorkspaceModal');
    const cancelBtn = $('#cancelWorkspace');
    const form = $('#workspaceForm');

    if (!backdrop || !modal) return;

    const open = () => {
      setHidden(backdrop, false);
      setHidden(modal, false);
      document.body.style.overflow = 'hidden';
      $('input[name="workspaceName"]', form)?.focus();
    };

    const close = () => {
      setHidden(backdrop, true);
      setHidden(modal, true);
      document.body.style.overflow = '';
    };

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    cancelBtn?.addEventListener('click', close);

    backdrop.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) close();
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      payload.createdAt = nowIso();

      // --- Future backend integration ---
      // Node.js + Supabase example:
      // await fetch('/api/workspaces', {
      //   method: 'POST',
      //   headers: {'Content-Type':'application/json'},
      //   body: JSON.stringify(payload)
      // });
      // ----------------------------------

      close();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      form.reset();
    });
  };

  // ----------------------------
  // Tasks
  // ----------------------------
  const escapeHtml = (str) =>
    String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '<')
      .replaceAll('>', '>')
      .replaceAll('"', '"')
      .replaceAll("'", '&#039;');

  const renderTasks = () => {
    const today = [
      { id: 't1', title: 'Update Business Plan milestones', desc: 'Vertex AI refreshed your targets.', done: false },
      { id: 't2', title: 'Review marketing budget allocation', desc: 'Optimized for conversion.', done: false },
    ];

    const pending = [
      { id: 't3', title: 'Upload Q3 Sales Forecast', desc: 'Prepare data for recurring revenue model.', done: false },
      { id: 't4', title: 'Draft outreach email sequence', desc: 'AI will personalize segments.', done: false },
    ];

    const completed = [
      { id: 't5', title: 'Finalize revenue forecast model', desc: 'Version locked for stakeholder review.', done: true },
    ];

    const groups = [
      { el: $('#todayTasks'), items: today },
      { el: $('#pendingTasks'), items: pending },
      { el: $('#completedTasks'), items: completed },
    ];

    const renderGroup = (ul, items) => {
      if (!ul) return;
      ul.innerHTML = '';

      items.forEach((it) => {
        const li = document.createElement('li');
        li.className = `check-item${it.done ? ' is-done' : ''}`;

        const inputId = `task_${it.id}`;

        li.innerHTML = `
          <input aria-label="Toggle task" id="${inputId}" type="checkbox" ${it.done ? 'checked' : ''} />
          <span class="check-mark" aria-hidden="true"></span>
          <div class="check-text">
            <div class="check-title">${escapeHtml(it.title)}</div>
            <div class="check-desc">${escapeHtml(it.desc)}</div>
          </div>
        `;

        const input = $('input', li);
        input?.addEventListener('change', () => {
          li.classList.toggle('is-done', input.checked);

          // --- Future backend integration ---
          // PATCH /api/workspaces/:id/tasks/:taskId { done: input.checked }
          // await fetch(...)
          // ----------------------------------
        });

        ul.appendChild(li);
      });
    };

    groups.forEach((g) => renderGroup(g.el, g.items));
  };

  // ----------------------------
  // Metrics counters
  // ----------------------------
  const animateCounter = (el, target) => {
    const duration = 900;
    const start = 0;
    const end = Number(target) || 0;

    const type = el.getAttribute('data-animate');

    const formatValue = (v) => {
      if (type === 'number') return Math.round(v).toLocaleString();
      if (type === 'percent') return `${Math.round(v)}%`;

      // currency formatting for $k
      const abs = Math.abs(v);
      if (abs >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
      if (abs >= 1000) return `$${(v / 1000).toFixed(1)}k`;
      return `$${v.toFixed(0)}`;
    };

    const startTs = performance.now();
    const step = (ts) => {
      const t = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = start + (end - start) * eased;
      el.textContent = formatValue(value);

      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const initCounters = () => {
    const grid = $('#metricsGrid');
    if (!grid) return;

    const counterEls = $$('[data-animate][data-target]', grid);
    if (!counterEls.length) return;

    const startAll = () => {
      counterEls.forEach((el) => animateCounter(el, el.getAttribute('data-target')));
    };

    if (!('IntersectionObserver' in window)) return startAll();

    const section = grid.closest('.metrics');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          startAll();
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });

    if (section) io.observe(section);
  };

  // ----------------------------
  // Activity refresh
  // ----------------------------
  const initActivity = () => {
    $('#refreshActivity')?.addEventListener('click', () => {
      const list = $('#activityTimeline');
      if (!list) return;
      const items = $$('li', list);
      if (items.length < 2) return;
      const last = items[items.length - 1];
      list.insertBefore(last, items[0]);

      // Future: fetch activity from backend
      // await fetch(`/api/workspaces/${workspaceId}/activity`)
    });
  };

  // ----------------------------
  // Quick actions
  // ----------------------------
  const initQuickActions = () => {
    $('#quickActionsGrid')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');

      // Future: window.location.href = routeByAction[action]
      if (action === 'tasks') smoothScrollIntoView($('.tasks'));
      if (action === 'documents') smoothScrollIntoView($('.documents'));
      if (action === 'team') smoothScrollIntoView($('.team'));
    });
  };

  // ----------------------------
  // Floating AI button + Continue with AI
  // ----------------------------
  const initAIButtons = () => {
    $('#floatingAI')?.addEventListener('click', () => {
      // Future: open AI chat later
      // window.location.href = 'chat.html';
    });

    $('#continueWithAI')?.addEventListener('click', () => {
      // Future: open AI chat with recommendation context
    });
  };

  // ----------------------------
  // Document upload (local preview)
  // ----------------------------
  const formatBytes = (bytes) => {
    const b = Number(bytes) || 0;
    if (b < 1024) return `${b}B`;
    const kb = b / 1024;
    if (kb < 1024) return `${kb.toFixed(1)}KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)}MB`;
  };

  const initDocumentUpload = () => {
    const input = $('#fileUpload');
    if (!input) return;

    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) return;

      // --- Future backend integration ---
      // 1) Upload to Supabase Storage
      // 2) Save metadata in Supabase
      // ----------------------------------

      const firstCard = $('#documentGrid .file-card');
      if (firstCard) {
        const nameEl = $('.file-name', firstCard);
        const metaEl = $('.file-meta', firstCard);
        if (nameEl) nameEl.textContent = file.name;
        if (metaEl) metaEl.textContent = `${file.type || 'File'} • ${formatBytes(file.size)}`;
      }

      input.value = '';
    });

    $$('.file-open').forEach((btn) => {
      btn.addEventListener('click', () => {
        // Future: open viewer
      });
    });
  };

  // ----------------------------
  // Team invite
  // ----------------------------
  const initTeamInvite = () => {
    $('#inviteMemberBtn')?.addEventListener('click', () => {
      // Future: open invite modal and call backend
    });
  };

  // ----------------------------
  // Ripple touch helper (optional)
  // ----------------------------
  const initRipple = () => {
    lucide?.createIcons?.();
    $$('.ripple').forEach((el) => {
      el.addEventListener('pointerdown', () => {
        // Restart pseudo-ripple
        el.classList.remove('ripple-active');
        void el.offsetHeight;
        el.classList.add('ripple-active');
      }, { passive: true });
    });
  };

  // ----------------------------
  // Init
  // ----------------------------
  const init = () => {
    initRipple();
    initNavigation();
    initModal();
    initQuickActions();
    initAIButtons();
    initActivity();
    renderTasks();
    initCounters();
    initDocumentUpload();
    initTeamInvite();

    // Future: set from backend analytics
    setHealthProgress(92);

    const updatedAt = $('#metricsUpdatedAt');
    if (updatedAt) updatedAt.textContent = 'Updated just now';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

