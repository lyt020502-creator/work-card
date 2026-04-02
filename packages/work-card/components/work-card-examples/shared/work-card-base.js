/* ═══════════════════════════════════════════════════════════════
   工作卡公共交互逻辑
   提供 Select 下拉组件的展开/收起/选中交互
   所有案例 HTML 共用此文件
   ═══════════════════════════════════════════════════════════════ */

function getSelectParts(wrapperId) {
  var wrapper = document.getElementById(wrapperId);
  if (!wrapper) return null;

  return {
    wrapper: wrapper,
    trigger: wrapper.querySelector('.wc-select-trigger'),
    textEl: wrapper.querySelector('.wc-select-trigger__text'),
    options: wrapper.querySelectorAll('.wc-select-option')
  };
}

function closeSelect(wrapper) {
  if (!wrapper) return;

  wrapper.classList.remove('is-open');

  var trigger = wrapper.querySelector('.wc-select-trigger');
  if (trigger) {
    trigger.classList.remove('is-open');
  }
}

function toggleSelect(wrapperId) {
  var parts = getSelectParts(wrapperId);
  if (!parts || !parts.trigger) return;

  parts.wrapper.classList.toggle('is-open');
  parts.trigger.classList.toggle('is-open');
}

function selectOption(wrapperId, value) {
  var parts = getSelectParts(wrapperId);
  if (!parts || !parts.trigger || !parts.textEl) return;

  parts.options.forEach(function(option) {
    option.classList.remove('is-selected');

    if (option.textContent.trim() === value) {
      option.classList.add('is-selected');
    }
  });

  parts.textEl.textContent = value;
  parts.textEl.classList.remove('is-placeholder');
  closeSelect(parts.wrapper);
}

// 点击外部关闭下拉
document.addEventListener('click', function(e) {
  var currentWrapper = e.target instanceof Element
    ? e.target.closest('.wc-select-wrapper')
    : null;

  document.querySelectorAll('.wc-select-wrapper').forEach(function(wrapper) {
    if (wrapper !== currentWrapper) {
      closeSelect(wrapper);
    }
  });
});
