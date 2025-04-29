(function () {
  const DEFAULT_DURATION = 2200;
  const DEFAULT_ANIMATION_DURATION = 500;
  const activeMessages = new Set();

  function getContainer(direction) {
    const id = `toastx-${direction}-container`;
    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement('div');
      container.id = id;
      container.className = [
        'fixed', 'inset-x-0', 'flex', 'justify-center', 'pointer-events-none', 'z-50',
        direction === 'top' ? 'top-8' : 'bottom-8'
      ].join(' ');
      document.body.appendChild(container);
    }
    return container;
  }

  const typeClasses = {
    success: {
      bg: 'bg-green-100',
      borderColor: 'border-green',
      text: 'text-green',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M9 12l2 2l4 -4"/></svg>'
    },
    error: {
      bg: 'bg-red-100',
      borderColor: 'border-red',
      text: 'text-red',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 9v4"/><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"/><path d="M12 16h.01"/></svg>'
    },
    warning: {
      bg: 'bg-amber-100',
      borderColor: 'border-amber-600',
      text: 'text-amber-600',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path stroke="none" d="M0 0h24v24H0z"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
    }
  };

  function clearToasts() {
    document.querySelectorAll('[id^="toastx-"][id$="-container"]').forEach(container => {
      container.querySelectorAll('div').forEach(toast => toast.remove());
    });
    activeMessages.clear();
  }

  function toastx({ message = '', toastType = 'success', direction = 'top', duration = DEFAULT_DURATION } = {}) {
    clearToasts();

    const key = `${toastType}::${message}`;
    activeMessages.add(key);

    const { bg, borderColor, text, icon } = typeClasses[toastType] || typeClasses.success;
    const container = getContainer(direction);
    const offsetClass = direction === 'top' ? '-translate-y-6' : 'translate-y-6';

    const toastEl = document.createElement('div');
    toastEl.className = [
      'border', 'w-fit', 'max-w-xs', 'text-xs', 'font-semibold', 'p-3', 'rounded-xl',
      'flex', 'items-center', 'gap-2', bg, borderColor, text,
      'transform', 'opacity-0',
      'transition', 'duration-500', 'ease-in-out',
      offsetClass, 'pointer-events-auto'
    ].join(' ');
    toastEl.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toastEl);

    requestAnimationFrame(() => {
      toastEl.classList.remove('opacity-0', offsetClass);
      toastEl.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toastEl.classList.remove('translate-y-0', 'opacity-100');
      toastEl.classList.add(offsetClass, 'opacity-0');

      setTimeout(() => {
        container.removeChild(toastEl);
        activeMessages.delete(key);
      }, DEFAULT_ANIMATION_DURATION);
    }, duration);
  }

  window.toastx = toastx;
})();
