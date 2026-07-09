/*
  nav.js
  Shared navigation logic for Vertex AI pages.

  Handles:
  - Sidebar open/close with overlay
  - Active page highlighting for bottom nav
  - Future notifications & profile placeholders

  Future integration points:
  - Notifications unread badge data
  - User profile data (avatar/name)
  - Workspace switching
  - Auth-driven logout
*/

(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const getCurrentPath = () => {
    try {
      return window.location.pathname.split('/').pop() || '';
    } catch {
      return '';
    }
  };

  const getActiveKey = () => {
    const file = getCurrentPath();
    if (file === 'dashboard.html') return 'dashboard';
    if (file === 'workspace.html') return 'workspace';
    if (file === 'app.html') return 'chat';
    if (file === 'profile.html') return 'profile';
    if (file === 'settings.html') return 'settings';
    return '';
  };

  const openSidebar = () => {
    const sidebar = $('#vxSidebar');
    const overlay = $('#vxOverlay');
    if (!sidebar || !overlay) return;

    overlay.hidden = false;
    sidebar.classList.add('is-open');
    sidebar.setAttribute('aria-hidden', 'false');
  };

  const closeSidebar = () => {
    const sidebar = $('#vxSidebar');
    const overlay = $('#vxOverlay');
    if (!sidebar || !overlay) return;

    overlay.hidden = true;
    sidebar.classList.remove('is-open');
    sidebar.setAttribute('aria-hidden', 'true');
  };

  const highlightNavigation = () => {
    const active = getActiveKey();

    // Bottom nav
    $$('[data-bottom]').forEach((el) => {
      const key = el.getAttribute('data-bottom');
      el.classList.toggle('is-active', key === active);
    });

    // Sidebar
    $$('[data-nav]').forEach((el) => {
      const key = el.getAttribute('data-nav');
      el.classList.toggle('is-active', key === active);
    });

    // Top header title
    const title = $('.vx-topbar-title');
    if (title) {
      const map = {
        dashboard: 'Dashboard',
        workspace: 'Workspace',
        chat: 'AI Chat',
        profile: 'Profile',
        settings: 'Settings',
      };
      title.textContent = map[active] || title.textContent;
    }
  };

  const initSidebar = () => {
    const menuBtn = $('#vxMenuBtn');
    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
      // Future: ensure auth state
      // openSidebar only after workspace/session loaded
      openSidebar();
    });

    $('#vxOverlay')?.addEventListener('click', closeSidebar);

    // Close on sidebar link click
    $$('[data-nav]').forEach((link) => {
      link.addEventListener('click', () => {
        // Smooth transition placeholder
        closeSidebar();
      });
    });

    // Escape closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });
  };

  const initBottomNav = () => {
    // Placeholder: show active indicator already handled by highlightNavigation
    // Future: route transitions
  };

  const initNotificationPlaceholder = () => {
    // Future: fetch unread notifications count
    // const bell = $('#vxNotifyBtn');
    // bell && set badge text
  };

  const initProfilePlaceholder = () => {
    // Future: load avatar and user name
  };

  const init = () => {
    // Default state
    $('#vxOverlay')?.setAttribute('hidden', '');

    highlightNavigation();
    initSidebar();
    initBottomNav();
    initNotificationPlaceholder();
    initProfilePlaceholder();

    // Make sure lucide icons are ready if present
    lucide?.createIcons?.();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

