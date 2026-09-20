import {
  getDefaultResttyRuntimeSession2,
  createResttyRuntime2
} from "./chunk-crd68q3n.js";

// src/surface/panes/context-menu.ts
function createPaneContextMenuController(options) {
  const contextMenuEl = options.doc.createElement("div");
  contextMenuEl.className = "pane-context-menu";
  contextMenuEl.hidden = true;
  options.doc.body.appendChild(contextMenuEl);
  const hide = () => {
    contextMenuEl.hidden = true;
    contextMenuEl.innerHTML = "";
  };
  const addSeparator = () => {
    const separator = options.doc.createElement("div");
    separator.className = "pane-context-menu-separator";
    contextMenuEl.appendChild(separator);
  };
  const render = (items) => {
    contextMenuEl.innerHTML = "";
    for (const item of items) {
      if (item === "separator") {
        addSeparator();
        continue;
      }
      const button = options.doc.createElement("button");
      button.type = "button";
      button.className = "pane-context-menu-item";
      if (item.danger)
        button.classList.add("is-danger");
      if (item.enabled === false)
        button.disabled = true;
      const label = options.doc.createElement("span");
      label.className = "pane-context-menu-label";
      label.textContent = item.label;
      button.appendChild(label);
      if (item.shortcut) {
        const shortcut = options.doc.createElement("span");
        shortcut.className = "pane-context-menu-shortcut";
        shortcut.textContent = item.shortcut;
        button.appendChild(shortcut);
      }
      button.addEventListener("click", () => {
        hide();
        item.action();
      });
      contextMenuEl.appendChild(button);
    }
  };
  const show = (pane, clientX, clientY, manager) => {
    const items = options.contextMenu.getItems(pane, manager);
    render(items);
    contextMenuEl.hidden = false;
    const margin = 8;
    const rect = contextMenuEl.getBoundingClientRect();
    const maxX = Math.max(margin, options.win.innerWidth - rect.width - margin);
    const maxY = Math.max(margin, options.win.innerHeight - rect.height - margin);
    const left = Math.min(Math.max(clientX, margin), maxX);
    const top = Math.min(Math.max(clientY, margin), maxY);
    contextMenuEl.style.left = `${left}px`;
    contextMenuEl.style.top = `${top}px`;
  };
  const destroy = () => {
    hide();
    contextMenuEl.remove();
  };
  return {
    element: contextMenuEl,
    isOpen: () => !contextMenuEl.hidden,
    containsTarget: (target) => target instanceof Node && contextMenuEl.contains(target),
    show,
    hide,
    destroy
  };
}

// src/surface/panes/styles.ts
var RESTTY_PANE_ROOT_CLASS = "restty-pane-root";
var RESTTY_PANE_STYLE_MARKER = "data-restty-pane-styles";
var RESTTY_PANE_STYLE_TEXT = `
.${RESTTY_PANE_ROOT_CLASS} {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.${RESTTY_PANE_ROOT_CLASS} .pane-split {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  gap: 0;
  padding: 0;
  background: var(--restty-pane-split-background, #000);
}

.${RESTTY_PANE_ROOT_CLASS} .pane-split.is-vertical {
  flex-direction: row;
}

.${RESTTY_PANE_ROOT_CLASS} .pane-split.is-horizontal {
  flex-direction: column;
}

.${RESTTY_PANE_ROOT_CLASS} .pane {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  background: var(--restty-pane-background, #000);
  border: 0;
  overflow: hidden;
  opacity: var(--restty-pane-inactive-opacity, 0.9);
  transition: opacity var(--restty-pane-opacity-transition, 140ms) ease-out;
}

.${RESTTY_PANE_ROOT_CLASS} .pane.is-active {
  opacity: var(--restty-pane-active-opacity, 1);
}

.${RESTTY_PANE_ROOT_CLASS} .pane-divider {
  position: relative;
  z-index: 2;
  flex: 0 0 var(--restty-pane-divider-thickness, 1px);
  background: var(--restty-pane-divider-color, #242424);
  touch-action: none;
}

.${RESTTY_PANE_ROOT_CLASS} .pane-divider.is-vertical {
  cursor: col-resize;
}

.${RESTTY_PANE_ROOT_CLASS} .pane-divider.is-horizontal {
  cursor: row-resize;
}

.${RESTTY_PANE_ROOT_CLASS} .pane-divider.is-vertical:hover,
.${RESTTY_PANE_ROOT_CLASS} .pane-divider.is-vertical.is-dragging {
  background:
    radial-gradient(
      100px 46% at 50% 50%,
      rgba(235, 235, 235, 0.92) 0%,
      rgba(200, 200, 200, 0.48) 46%,
      rgba(155, 155, 155, 0.12) 68%,
      rgba(120, 120, 120, 0) 100%
    ),
    rgba(185, 185, 185, 0.24);
}

.${RESTTY_PANE_ROOT_CLASS} .pane-divider.is-horizontal:hover,
.${RESTTY_PANE_ROOT_CLASS} .pane-divider.is-horizontal.is-dragging {
  background:
    radial-gradient(
      46% 100px at 50% 50%,
      rgba(235, 235, 235, 0.92) 0%,
      rgba(200, 200, 200, 0.48) 46%,
      rgba(155, 155, 155, 0.12) 68%,
      rgba(120, 120, 120, 0) 100%
    ),
    rgba(185, 185, 185, 0.24);
}

body.is-resizing-split {
  user-select: none;
}

.${RESTTY_PANE_ROOT_CLASS} .pane-canvas {
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
}

.${RESTTY_PANE_ROOT_CLASS} .pane-ime-input {
  position: fixed;
  left: 0;
  top: 0;
  width: 1em;
  height: 1em;
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: transparent;
  caret-color: transparent;
  overflow: hidden;
  resize: none;
  opacity: 0;
  pointer-events: none;
}

.pane-context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 200px;
  padding: 6px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  background: #161616;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
}

.pane-context-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 9px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #d6d6d6;
  text-align: left;
  cursor: pointer;
}

.pane-context-menu-item:hover {
  background: #252525;
}

.pane-context-menu-item:disabled {
  opacity: 0.4;
  cursor: default;
}

.pane-context-menu-item.is-danger {
  color: #f1a1a1;
}

.pane-context-menu-label {
  font-size: 12px;
}

.pane-context-menu-shortcut {
  font-size: 10px;
  color: #868686;
}

.pane-context-menu-separator {
  height: 1px;
  margin: 6px 4px;
  background: #2a2a2a;
}
`;
var DEFAULT_RESTTY_PANE_STYLE_OPTIONS = {
  splitBackground: "#000",
  paneBackground: "#000",
  inactivePaneOpacity: 0.9,
  activePaneOpacity: 1,
  opacityTransitionMs: 140,
  dividerColor: "#242424",
  dividerThicknessPx: 1
};
function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function normalizeColor(value, fallback) {
  if (typeof value !== "string")
    return fallback;
  const trimmed = value.trim();
  return trimmed ? trimmed : fallback;
}
function normalizePaneStyleOptions(options) {
  const inactivePaneOpacity = Number.isFinite(options.inactivePaneOpacity) ? clampNumber(Number(options.inactivePaneOpacity), 0, 1) : DEFAULT_RESTTY_PANE_STYLE_OPTIONS.inactivePaneOpacity;
  const activePaneOpacity = Number.isFinite(options.activePaneOpacity) ? clampNumber(Number(options.activePaneOpacity), 0, 1) : DEFAULT_RESTTY_PANE_STYLE_OPTIONS.activePaneOpacity;
  const opacityTransitionMs = Number.isFinite(options.opacityTransitionMs) ? clampNumber(Number(options.opacityTransitionMs), 0, 5000) : DEFAULT_RESTTY_PANE_STYLE_OPTIONS.opacityTransitionMs;
  const dividerThicknessPx = Number.isFinite(options.dividerThicknessPx) ? clampNumber(Number(options.dividerThicknessPx), 1, 32) : DEFAULT_RESTTY_PANE_STYLE_OPTIONS.dividerThicknessPx;
  return {
    splitBackground: normalizeColor(options.splitBackground, DEFAULT_RESTTY_PANE_STYLE_OPTIONS.splitBackground),
    paneBackground: normalizeColor(options.paneBackground, DEFAULT_RESTTY_PANE_STYLE_OPTIONS.paneBackground),
    inactivePaneOpacity,
    activePaneOpacity,
    opacityTransitionMs,
    dividerColor: normalizeColor(options.dividerColor, DEFAULT_RESTTY_PANE_STYLE_OPTIONS.dividerColor),
    dividerThicknessPx
  };
}
function ensureResttyPaneStylesDocument(doc) {
  if (doc.querySelector(`style[${RESTTY_PANE_STYLE_MARKER}="1"]`))
    return;
  const style = doc.createElement("style");
  style.setAttribute(RESTTY_PANE_STYLE_MARKER, "1");
  style.textContent = RESTTY_PANE_STYLE_TEXT;
  doc.head.appendChild(style);
}
function applyPaneStyleOptionsToRoot(root, options) {
  root.classList.add(RESTTY_PANE_ROOT_CLASS);
  root.style.setProperty("--restty-pane-split-background", options.splitBackground);
  root.style.setProperty("--restty-pane-background", options.paneBackground);
  root.style.setProperty("--restty-pane-inactive-opacity", options.inactivePaneOpacity.toFixed(3));
  root.style.setProperty("--restty-pane-active-opacity", options.activePaneOpacity.toFixed(3));
  root.style.setProperty("--restty-pane-opacity-transition", `${options.opacityTransitionMs}ms`);
  root.style.setProperty("--restty-pane-divider-color", options.dividerColor);
  root.style.setProperty("--restty-pane-divider-thickness", `${options.dividerThicknessPx}px`);
}
function clearPaneStyleOptionsFromRoot(root) {
  root.classList.remove(RESTTY_PANE_ROOT_CLASS);
  root.style.removeProperty("--restty-pane-split-background");
  root.style.removeProperty("--restty-pane-background");
  root.style.removeProperty("--restty-pane-inactive-opacity");
  root.style.removeProperty("--restty-pane-active-opacity");
  root.style.removeProperty("--restty-pane-opacity-transition");
  root.style.removeProperty("--restty-pane-divider-color");
  root.style.removeProperty("--restty-pane-divider-thickness");
}

// src/surface/panes/layout.ts
var getSplitBranches = (split) => {
  const branches = [];
  for (const child of Array.from(split.children)) {
    if (!(child instanceof HTMLElement))
      continue;
    if (child.classList.contains("pane-divider"))
      continue;
    branches.push(child);
  }
  return branches;
};
var getRectEdgeDistanceSquared = (sourceRect, targetRect) => {
  const dx = Math.max(targetRect.left - sourceRect.right, sourceRect.left - targetRect.right, 0);
  const dy = Math.max(targetRect.top - sourceRect.bottom, sourceRect.top - targetRect.bottom, 0);
  return dx ** 2 + dy ** 2;
};
var getRectCenterDistanceSquared = (sourceRect, targetRect) => {
  const sourceCenterX = sourceRect.left + sourceRect.width * 0.5;
  const sourceCenterY = sourceRect.top + sourceRect.height * 0.5;
  const targetCenterX = targetRect.left + targetRect.width * 0.5;
  const targetCenterY = targetRect.top + targetRect.height * 0.5;
  const dx = targetCenterX - sourceCenterX;
  const dy = targetCenterY - sourceCenterY;
  return dx ** 2 + dy ** 2;
};
function findClosestPaneToRect(sourceRect, panes) {
  if (!sourceRect)
    return null;
  let closestPane = null;
  let closestEdgeDistance = Number.POSITIVE_INFINITY;
  let closestCenterDistance = Number.POSITIVE_INFINITY;
  for (const candidate of panes) {
    const targetRect = candidate.container.getBoundingClientRect();
    const edgeDistance = getRectEdgeDistanceSquared(sourceRect, targetRect);
    const centerDistance = getRectCenterDistanceSquared(sourceRect, targetRect);
    if (edgeDistance < closestEdgeDistance || edgeDistance === closestEdgeDistance && centerDistance < closestCenterDistance) {
      closestPane = candidate;
      closestEdgeDistance = edgeDistance;
      closestCenterDistance = centerDistance;
    }
  }
  return closestPane;
}
function collapseSplitAncestors(start) {
  let current = start;
  while (current && current.classList.contains("pane-split")) {
    const branches = getSplitBranches(current);
    if (branches.length > 1)
      return;
    const onlyChild = branches[0];
    const parent = current.parentElement;
    if (!parent || !onlyChild)
      return;
    const inheritedFlex = current.style.flex;
    if (inheritedFlex) {
      onlyChild.style.flex = inheritedFlex;
    } else {
      onlyChild.style.flex = "";
    }
    parent.replaceChild(onlyChild, current);
    current = parent;
  }
}
function createSplitDividerFactory(options) {
  let splitResizeState = null;
  const createSplitDivider = (direction) => {
    const divider = document.createElement("div");
    divider.className = `pane-divider ${direction === "vertical" ? "is-vertical" : "is-horizontal"}`;
    divider.setAttribute("role", "separator");
    divider.setAttribute("aria-orientation", direction === "vertical" ? "vertical" : "horizontal");
    const onPointerMove = (event) => {
      const state = splitResizeState;
      if (!state || event.pointerId !== state.pointerId)
        return;
      event.preventDefault();
      const coord = state.axis === "x" ? event.clientX : event.clientY;
      const delta = coord - state.startCoord;
      const maxFirst = Math.max(options.minPaneSize, state.total - options.minPaneSize);
      const nextFirst = Math.min(maxFirst, Math.max(options.minPaneSize, state.startFirst + delta));
      const nextSecond = Math.max(options.minPaneSize, state.total - nextFirst);
      const firstPercent = nextFirst / (nextFirst + nextSecond) * 100;
      const secondPercent = 100 - firstPercent;
      state.first.style.flex = `0 0 ${firstPercent.toFixed(5)}%`;
      state.second.style.flex = `0 0 ${secondPercent.toFixed(5)}%`;
      options.requestLayoutSync();
    };
    const endResize = () => {
      if (!splitResizeState)
        return;
      splitResizeState.divider.classList.remove("is-dragging");
      document.body.classList.remove("is-resizing-split");
      splitResizeState = null;
    };
    const onPointerEnd = (event) => {
      if (!splitResizeState || event.pointerId !== splitResizeState.pointerId)
        return;
      try {
        divider.releasePointerCapture(splitResizeState.pointerId);
      } catch {}
      divider.removeEventListener("pointermove", onPointerMove);
      divider.removeEventListener("pointerup", onPointerEnd);
      divider.removeEventListener("pointercancel", onPointerEnd);
      endResize();
    };
    divider.addEventListener("pointerdown", (event) => {
      if (event.button !== 0)
        return;
      const first = divider.previousElementSibling;
      const second = divider.nextElementSibling;
      const split = divider.parentElement;
      if (!first || !second || !split)
        return;
      const splitRect = split.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const axis = direction === "vertical" ? "x" : "y";
      const total = axis === "x" ? splitRect.width : splitRect.height;
      if (total <= 0)
        return;
      endResize();
      event.preventDefault();
      event.stopPropagation();
      splitResizeState = {
        pointerId: event.pointerId,
        axis,
        divider,
        first,
        second,
        startCoord: axis === "x" ? event.clientX : event.clientY,
        startFirst: axis === "x" ? firstRect.width : firstRect.height,
        total
      };
      divider.classList.add("is-dragging");
      document.body.classList.add("is-resizing-split");
      divider.setPointerCapture(event.pointerId);
      divider.addEventListener("pointermove", onPointerMove);
      divider.addEventListener("pointerup", onPointerEnd);
      divider.addEventListener("pointercancel", onPointerEnd);
    });
    return divider;
  };
  return { createSplitDivider };
}

// src/surface/panes/pane-interactions.ts
function createPaneInteractions(options) {
  const paneCleanupFns = new Map;
  const bindPaneInteractions = (pane) => {
    const cleanupFns = [];
    const { id, container } = pane;
    const onPointerDown = () => {
      options.markPaneFocused(id);
    };
    container.addEventListener("pointerdown", onPointerDown);
    cleanupFns.push(() => {
      container.removeEventListener("pointerdown", onPointerDown);
    });
    const focusTarget = pane.focusTarget;
    if (focusTarget) {
      const onFocus = () => {
        options.markPaneFocused(id);
      };
      focusTarget.addEventListener("focus", onFocus);
      cleanupFns.push(() => {
        focusTarget.removeEventListener("focus", onFocus);
      });
    }
    if (options.contextMenu) {
      const onContextMenu = (event) => {
        if (event.defaultPrevented)
          return;
        if (options.contextMenu?.canOpen && !options.contextMenu.canOpen(event, pane)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        options.markPaneFocused(id);
        options.contextMenuController?.show(pane, event.clientX, event.clientY, options.getManager());
      };
      container.addEventListener("contextmenu", onContextMenu);
      cleanupFns.push(() => {
        container.removeEventListener("contextmenu", onContextMenu);
      });
    }
    paneCleanupFns.set(id, cleanupFns);
  };
  const cleanupPaneInteractions = (id) => {
    const cleanupFns = paneCleanupFns.get(id) ?? [];
    paneCleanupFns.delete(id);
    for (const cleanup of cleanupFns) {
      cleanup();
    }
  };
  return {
    bindPaneInteractions,
    cleanupPaneInteractions
  };
}

// src/surface/panes/window-events.ts
function attachPaneManagerWindowEvents(options) {
  const onWindowPointerDown = (event) => {
    if (!options.contextMenuController?.isOpen())
      return;
    if (options.contextMenuController.containsTarget(event.target))
      return;
    options.hideContextMenu();
  };
  const onWindowBlur = () => {
    options.hideContextMenu();
  };
  const onWindowKeyDown = (event) => {
    if (options.contextMenuController?.isOpen() && event.key === "Escape") {
      options.hideContextMenu();
      return;
    }
    if (options.shortcutOptions.enabled === false)
      return;
    if (options.shortcutOptions.canHandleEvent && !options.shortcutOptions.canHandleEvent(event)) {
      return;
    }
    const target = event.target;
    if (target && ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName)) {
      const allowed = options.shortcutOptions.isAllowedInputTarget?.(target) ?? false;
      if (!allowed)
        return;
    }
    const isMac = typeof navigator !== "undefined" && /mac/i.test(navigator.platform);
    const hasCommandModifier = isMac ? event.metaKey : event.ctrlKey;
    if (!hasCommandModifier || event.altKey || event.code !== "KeyD" || event.repeat) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    options.splitActivePane(event.shiftKey ? "horizontal" : "vertical");
  };
  window.addEventListener("pointerdown", onWindowPointerDown);
  window.addEventListener("blur", onWindowBlur);
  window.addEventListener("keydown", onWindowKeyDown, { capture: true });
  return () => {
    window.removeEventListener("pointerdown", onWindowPointerDown);
    window.removeEventListener("blur", onWindowBlur);
    window.removeEventListener("keydown", onWindowKeyDown, { capture: true });
  };
}

// src/surface/panes/manager.ts
function createResttyPaneManager2(options) {
  const { root, createPane } = options;
  const isElementLike = typeof HTMLElement !== "undefined" ? root instanceof HTMLElement : !!root && typeof root.ownerDocument !== "undefined";
  if (!isElementLike) {
    throw new Error("createResttyPaneManager requires a root HTMLElement");
  }
  const panes = new Map;
  const minPaneSize = Number.isFinite(options.minPaneSize) ? Math.max(24, Number(options.minPaneSize)) : 96;
  const shortcutOptions = typeof options.shortcuts === "object" ? options.shortcuts : { enabled: options.shortcuts !== false };
  const stylesInput = typeof options.styles === "object" && options.styles ? options.styles : undefined;
  const stylesEnabled = options.styles === false ? false : stylesInput?.enabled ?? true;
  let styleOptions = normalizePaneStyleOptions({
    ...DEFAULT_RESTTY_PANE_STYLE_OPTIONS,
    ...stylesInput
  });
  if (stylesEnabled) {
    const doc = root.ownerDocument ?? document;
    ensureResttyPaneStylesDocument(doc);
    applyPaneStyleOptionsToRoot(root, styleOptions);
  }
  let nextPaneId = 1;
  let activePaneId = null;
  let focusedPaneId = null;
  let resizeRaf = 0;
  const ownerDoc = root.ownerDocument ?? document;
  const ownerWin = ownerDoc.defaultView ?? window;
  const contextMenuController = options.contextMenu ? createPaneContextMenuController({
    contextMenu: options.contextMenu,
    doc: ownerDoc,
    win: ownerWin
  }) : null;
  const requestLayoutSync = () => {
    if (resizeRaf)
      return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      options.onLayoutChanged?.();
    });
  };
  const { createSplitDivider } = createSplitDividerFactory({ minPaneSize, requestLayoutSync });
  const getStyleOptions = () => ({
    ...styleOptions
  });
  const setStyleOptions = (next) => {
    styleOptions = normalizePaneStyleOptions({
      ...styleOptions,
      ...next
    });
    if (!stylesEnabled)
      return;
    applyPaneStyleOptionsToRoot(root, styleOptions);
  };
  const getPanes = () => Array.from(panes.values());
  const getPaneById = (id) => panes.get(id) ?? null;
  const findPaneByElement = (element) => {
    if (!(element instanceof HTMLElement))
      return null;
    const host = element.closest(".pane");
    if (!host)
      return null;
    const id = Number(host.dataset.paneId ?? "");
    if (!Number.isFinite(id))
      return null;
    return panes.get(id) ?? null;
  };
  const getActivePane = () => activePaneId === null ? null : panes.get(activePaneId) ?? null;
  const getFocusedPane = () => {
    if (focusedPaneId !== null) {
      const focused = panes.get(focusedPaneId);
      if (focused)
        return focused;
    }
    if (typeof document === "undefined")
      return null;
    return findPaneByElement(document.activeElement);
  };
  const setActivePane = (id, config) => {
    const pane = panes.get(id);
    if (!pane)
      return;
    activePaneId = id;
    for (const current of panes.values()) {
      current.container.classList.toggle("is-active", current.id === id);
    }
    options.onActivePaneChange?.(pane);
    if (config?.focus) {
      const target = pane.focusTarget ?? pane.container;
      if (target instanceof HTMLElement) {
        target.focus({ preventScroll: true });
      }
    }
  };
  const markPaneFocused = (id, config) => {
    focusedPaneId = id;
    setActivePane(id, config);
  };
  const hideContextMenu = () => contextMenuController?.hide();
  let api;
  const paneInteractions = createPaneInteractions({
    contextMenu: options.contextMenu,
    contextMenuController,
    getManager: () => api,
    markPaneFocused
  });
  const createPaneInternal = (sourcePane) => {
    const id = nextPaneId;
    nextPaneId += 1;
    const pane = createPane({ id, sourcePane, manager: api });
    if (pane.id !== id) {
      throw new Error(`createResttyPaneManager expected pane.id=${id}, received ${pane.id}`);
    }
    if (!(pane.container instanceof HTMLDivElement)) {
      throw new Error("createResttyPaneManager createPane() must return { container: HTMLDivElement }");
    }
    pane.container.classList.add("pane");
    pane.container.dataset.paneId = `${id}`;
    panes.set(id, pane);
    paneInteractions.bindPaneInteractions(pane);
    options.onPaneCreated?.(pane);
    return pane;
  };
  const splitPane = (id, direction) => {
    const target = panes.get(id);
    if (!target)
      return null;
    const parent = target.container.parentElement;
    if (!parent)
      return null;
    const split = document.createElement("div");
    split.className = `pane-split ${direction === "vertical" ? "is-vertical" : "is-horizontal"}`;
    const inheritedFlex = target.container.style.flex;
    if (inheritedFlex) {
      split.style.flex = inheritedFlex;
    }
    parent.replaceChild(split, target.container);
    target.container.style.flex = "0 0 50%";
    split.appendChild(target.container);
    split.appendChild(createSplitDivider(direction));
    const created = createPaneInternal(target);
    created.container.style.flex = "0 0 50%";
    split.appendChild(created.container);
    markPaneFocused(created.id, { focus: true });
    requestLayoutSync();
    options.onPaneSplit?.(target, created, direction);
    return created;
  };
  const splitActivePane = (direction) => {
    const target = getFocusedPane() ?? getActivePane();
    if (!target)
      return null;
    return splitPane(target.id, direction);
  };
  const closePane = (id) => {
    if (panes.size <= 1)
      return false;
    const pane = panes.get(id);
    if (!pane)
      return false;
    const closingRect = pane.container.getBoundingClientRect();
    paneInteractions.cleanupPaneInteractions(id);
    options.destroyPane?.(pane);
    panes.delete(id);
    if (activePaneId === id)
      activePaneId = null;
    if (focusedPaneId === id)
      focusedPaneId = null;
    const parent = pane.container.parentElement;
    pane.container.remove();
    collapseSplitAncestors(parent);
    const fallback = getActivePane() ?? findClosestPaneToRect(closingRect, panes.values()) ?? getPanes()[0] ?? null;
    if (fallback) {
      markPaneFocused(fallback.id, { focus: true });
    } else {
      options.onActivePaneChange?.(null);
    }
    options.onPaneClosed?.(pane);
    requestLayoutSync();
    return true;
  };
  const createInitialPane = (config) => {
    if (panes.size) {
      return getPanes()[0];
    }
    const first = createPaneInternal(null);
    root.appendChild(first.container);
    markPaneFocused(first.id, { focus: config?.focus !== false });
    requestLayoutSync();
    return first;
  };
  const removeWindowEvents = attachPaneManagerWindowEvents({
    contextMenuController,
    hideContextMenu,
    shortcutOptions,
    splitActivePane
  });
  const destroy = () => {
    removeWindowEvents();
    if (resizeRaf) {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = 0;
    }
    for (const pane of getPanes()) {
      paneInteractions.cleanupPaneInteractions(pane.id);
      options.destroyPane?.(pane);
    }
    panes.clear();
    activePaneId = null;
    focusedPaneId = null;
    root.replaceChildren();
    hideContextMenu();
    contextMenuController?.destroy();
    if (stylesEnabled) {
      clearPaneStyleOptionsFromRoot(root);
    }
  };
  api = {
    getPanes,
    getPaneById,
    getActivePane,
    getFocusedPane,
    createInitialPane,
    setActivePane,
    markPaneFocused,
    splitPane,
    splitActivePane,
    closePane,
    getStyleOptions,
    setStyleOptions,
    requestLayoutSync,
    hideContextMenu,
    destroy
  };
  return api;
}

// src/surface/panes/default-context-menu-items.ts
function getResttyShortcutModifierLabel2() {
  const isMac = typeof navigator !== "undefined" && /mac/i.test(navigator.platform);
  return isMac ? "Cmd" : "Ctrl";
}
function createDefaultResttyPaneContextMenuItems2(options) {
  const { pane, manager, getPtyUrl } = options;
  const mod = options.modKeyLabel ?? getResttyShortcutModifierLabel2();
  const closeEnabled = manager.getPanes().length > 1;
  const pauseLabel = typeof pane.paused === "boolean" ? pane.paused ? "Resume Renderer" : "Pause Renderer" : "Toggle Renderer Pause";
  return [
    {
      label: "Copy",
      shortcut: `${mod}+C`,
      action: async () => {
        await pane.copySelectionToClipboard();
      }
    },
    {
      label: "Paste",
      shortcut: `${mod}+V`,
      action: async () => {
        await pane.pasteFromClipboard();
      }
    },
    "separator",
    {
      label: "Split Right",
      shortcut: `${mod}+D`,
      action: () => {
        manager.splitPane(pane.id, "vertical");
      }
    },
    {
      label: "Split Down",
      shortcut: `${mod}+Shift+D`,
      action: () => {
        manager.splitPane(pane.id, "horizontal");
      }
    },
    {
      label: "Close Pane",
      enabled: closeEnabled,
      danger: true,
      action: () => {
        manager.closePane(pane.id);
      }
    },
    "separator",
    {
      label: "Clear Screen",
      action: () => {
        pane.clearScreen();
      }
    },
    {
      label: pane.isPtyConnected() ? "Disconnect PTY" : "Connect PTY",
      action: () => {
        if (pane.isPtyConnected()) {
          pane.disconnectPty();
          return;
        }
        const url = (getPtyUrl?.() ?? "").trim();
        pane.connectPty(url);
      }
    },
    {
      label: pauseLabel,
      action: () => {
        if (typeof pane.setPaused === "function") {
          pane.setPaused(!(pane.paused ?? false));
          return;
        }
        pane.togglePause();
      }
    }
  ];
}

// src/surface/panes/managed-pane-dom.ts
function createImeInput(className, doc = document) {
  const imeInput = doc.createElement("textarea");
  imeInput.className = className;
  imeInput.tabIndex = -1;
  imeInput.autocapitalize = "off";
  imeInput.autocomplete = "off";
  imeInput.autocorrect = "off";
  imeInput.spellcheck = false;
  imeInput.style.position = "fixed";
  imeInput.style.left = "0";
  imeInput.style.top = "0";
  imeInput.style.width = "1em";
  imeInput.style.height = "1em";
  imeInput.style.padding = "0";
  imeInput.style.margin = "0";
  imeInput.style.border = "0";
  imeInput.style.outline = "none";
  imeInput.style.background = "transparent";
  imeInput.style.color = "transparent";
  imeInput.style.caretColor = "transparent";
  imeInput.style.overflow = "hidden";
  imeInput.style.resize = "none";
  imeInput.style.opacity = "0";
  imeInput.style.pointerEvents = "none";
  return imeInput;
}
function createManagedPaneDom(options) {
  const doc = options.doc ?? document;
  const container = doc.createElement("div");
  container.className = options.paneClassName;
  const canvas = doc.createElement("canvas");
  canvas.className = options.canvasClassName;
  canvas.tabIndex = 0;
  const imeInput = createImeInput(options.imeInputClassName, doc);
  container.append(canvas, imeInput);
  return {
    container,
    canvas,
    imeInput
  };
}

// src/surface/panes/managed-pane-runtime-config.ts
function createManagedPaneRuntimeConfig(options) {
  const { context, session, onSearchState } = options;
  const baseTerminal = typeof options.terminal === "function" ? options.terminal(context) : options.terminal ?? {};
  const baseServices = typeof options.services === "function" ? options.services(context) : options.services ?? {};
  const mergedCallbacks = {
    ...baseServices.callbacks,
    onSearchState: (state) => {
      baseServices.callbacks?.onSearchState?.(state);
      onSearchState?.(state);
    }
  };
  return {
    mount: {
      canvas: context.canvas,
      imeInput: context.imeInput,
      session
    },
    terminal: baseTerminal,
    services: {
      ...baseServices,
      callbacks: mergedCallbacks
    }
  };
}

// src/surface/panes/managed-pane-runtime.ts
function createManagedPaneRuntime(options) {
  const { autoInit } = options;
  const runtime = createResttyRuntime2(createManagedPaneRuntimeConfig(options));
  if (autoInit) {
    runtime.lifecycle.init();
  }
  return runtime;
}

// src/surface/panes/managed-pane-create.ts
function createManagedPane(options) {
  const { container, canvas, imeInput } = createManagedPaneDom(options.dom);
  const context = {
    id: options.id,
    sourcePane: options.sourcePane,
    canvas,
    imeInput
  };
  const runtime = createManagedPaneRuntime({
    context,
    terminal: options.terminal,
    services: options.services,
    session: options.session,
    autoInit: options.autoInit,
    onSearchState: options.onSearchState
  });
  return {
    id: options.id,
    container,
    focusTarget: canvas,
    runtime,
    setRenderer: (value) => runtime.terminal.setRenderer(value),
    setPaused: (value) => runtime.terminal.setPaused(value),
    setFontSize: (value) => runtime.terminal.setFontSize(value),
    setLigatures: (value) => runtime.terminal.setLigatures(value),
    setFontHinting: (value) => runtime.terminal.setFontHinting(value),
    setFontHintTarget: (value) => runtime.terminal.setFontHintTarget(value),
    setFonts: (fonts) => runtime.terminal.setFonts(fonts),
    applyTheme: (theme, sourceLabel) => runtime.terminal.applyTheme(theme, sourceLabel),
    resetTheme: () => runtime.terminal.resetTheme(),
    sendInput: (text, source) => runtime.io.sendInput(text, source),
    sendKeyInput: (text, source) => runtime.io.sendKeyInput(text, source),
    copySelectionToClipboard: () => runtime.interaction.copySelectionToClipboard(),
    pasteFromClipboard: () => runtime.interaction.pasteFromClipboard(),
    clearScreen: () => runtime.terminal.clearScreen(),
    setColorScheme: (scheme) => runtime.terminal.setColorScheme(scheme),
    getMode: (mode, ansi) => runtime.terminal.getMode(mode, ansi),
    snapshot: () => runtime.terminal.snapshot(),
    restore: (bytes) => runtime.terminal.restore(bytes),
    connectPty: (url = "") => runtime.io.connectPty(url),
    disconnectPty: () => runtime.io.disconnectPty(),
    isPtyConnected: () => runtime.io.isPtyConnected(),
    togglePause: () => runtime.terminal.togglePause(),
    setMouseMode: (value) => runtime.interaction.setMouseMode(value),
    getMouseStatus: () => runtime.interaction.getMouseStatus(),
    selectWordAtClientPoint: (clientX, clientY) => runtime.interaction.selectWordAtClientPoint(clientX, clientY),
    initRuntime: () => runtime.lifecycle.init(),
    destroyRuntime: () => runtime.lifecycle.destroy(),
    setSearchQuery: (query) => runtime.search.setQuery(query),
    clearSearch: () => runtime.search.clear(),
    searchNext: () => runtime.search.next(),
    searchPrevious: () => runtime.search.previous(),
    getSearchState: () => runtime.search.getState(),
    resize: (cols, rows) => runtime.interaction.resize(cols, rows),
    focus: () => runtime.interaction.focus(),
    blur: () => runtime.interaction.blur(),
    updateSize: (force) => runtime.interaction.updateSize(force),
    getBackend: () => runtime.render.getBackend(),
    setShaderStages: (stages) => runtime.render.setShaderStages(stages),
    getShaderStages: () => runtime.render.getShaderStages(),
    canvas,
    imeInput
  };
}

// src/surface/panes/managed-pane-options.ts
function defaultManagedPaneInputTargetPredicate(target) {
  return target.classList.contains("pane-ime-input") || target.classList.contains("restty-pane-ime-input");
}
function resolveManagedPaneContextMenu(options) {
  let contextMenu = options.contextMenu ?? null;
  if (!contextMenu) {
    const defaultMenuConfig = options.defaultContextMenu;
    const enabled = defaultMenuConfig === undefined ? true : typeof defaultMenuConfig === "boolean" ? defaultMenuConfig : defaultMenuConfig.enabled ?? true;
    if (enabled) {
      const config = typeof defaultMenuConfig === "object" && defaultMenuConfig ? defaultMenuConfig : undefined;
      contextMenu = {
        canOpen: config?.canOpen,
        getItems: (pane, manager) => createDefaultResttyPaneContextMenuItems2({
          pane,
          manager,
          modKeyLabel: config?.modKeyLabel,
          getPtyUrl: config?.getPtyUrl
        })
      };
    }
  }
  return contextMenu;
}
function resolveManagedPaneShortcuts(shortcuts) {
  if (shortcuts === undefined || shortcuts === true) {
    return {
      enabled: true,
      isAllowedInputTarget: defaultManagedPaneInputTargetPredicate
    };
  }
  if (typeof shortcuts === "object" && !shortcuts.isAllowedInputTarget) {
    return {
      ...shortcuts,
      isAllowedInputTarget: defaultManagedPaneInputTargetPredicate
    };
  }
  return shortcuts;
}

// src/surface/search-ui/styles.ts
var ROOT_CLASS = "restty-search-ui-root";
var STYLE_MARKER = "data-restty-pane-search-ui-styles";
var STYLE_TEXT = `
.${ROOT_CLASS} .restty-pane-search {
  position: absolute;
  top: var(--restty-search-ui-top, 10px);
  right: var(--restty-search-ui-right, 10px);
  z-index: var(--restty-search-ui-z-index, 8);
  width: min(var(--restty-search-ui-max-width, 332px), calc(100% - 20px));
  min-width: var(--restty-search-ui-min-width, 232px);
  display: none;
  align-items: center;
  padding: 6px;
  border: 1px solid var(--restty-search-ui-border, #2a2a2a);
  border-radius: var(--restty-search-ui-radius, 8px);
  background: var(--restty-search-ui-background, #161616);
  color: var(--restty-search-ui-text, #d6d6d6);
  backdrop-filter: blur(var(--restty-search-ui-blur, 8px));
  box-shadow: var(--restty-search-ui-shadow, 0 14px 40px rgba(0, 0, 0, 0.45));
}

.${ROOT_CLASS} .restty-pane-search[data-open="1"] {
  display: flex;
}

.${ROOT_CLASS} .restty-pane-search-row {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) auto auto auto auto auto;
  gap: 4px;
  align-items: center;
}

.${ROOT_CLASS} .restty-pane-search-input,
.${ROOT_CLASS} .restty-pane-search-button {
  min-width: 0;
  height: 28px;
  border: 1px solid transparent;
  border-radius: 6px;
  transition:
    background-color 120ms ease-out,
    border-color 120ms ease-out,
    color 120ms ease-out,
    transform 120ms ease-out;
}

.${ROOT_CLASS} .restty-pane-search-input {
  padding: 0 10px;
  background: var(--restty-search-ui-input-background, #252525);
  color: var(--restty-search-ui-input-text, #d6d6d6);
  outline: none;
  font-size: 11px;
  letter-spacing: 0.01em;
}

.${ROOT_CLASS} .restty-pane-search-input::placeholder {
  color: var(--restty-search-ui-input-placeholder, #868686);
}

.${ROOT_CLASS} .restty-pane-search-input:focus {
  border-color: #3a3a3a;
}

.${ROOT_CLASS} .restty-pane-search-button {
  padding: 0 8px;
  background: var(--restty-search-ui-button-background, transparent);
  color: var(--restty-search-ui-button-text, #d6d6d6);
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.${ROOT_CLASS} .restty-pane-search-button:hover:not(:disabled) {
  background: var(--restty-search-ui-button-hover, #252525);
}

.${ROOT_CLASS} .restty-pane-search-button:disabled {
  cursor: default;
  opacity: var(--restty-search-ui-button-disabled-opacity, 0.42);
}

.${ROOT_CLASS} .restty-pane-search-button:focus-visible {
  outline: none;
  border-color: #3a3a3a;
}

.${ROOT_CLASS} .restty-pane-search-status {
  min-width: 0;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: 6px;
  background: #252525;
  border: 1px solid #2a2a2a;
  font-size: 10px;
  line-height: 1;
  color: var(--restty-search-ui-status, #868686);
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.${ROOT_CLASS} .restty-pane-search-status[data-empty="1"] {
  display: none;
}

.${ROOT_CLASS} .restty-pane-search-status[data-active="1"] {
  color: var(--restty-search-ui-status-active, #d6d6d6);
}

.${ROOT_CLASS} .restty-pane-search-status[data-complete="1"] {
  color: var(--restty-search-ui-status-complete, #868686);
}
`;
var DEFAULT_STYLE_OPTIONS = {
  offsetTopPx: 10,
  offsetRightPx: 10,
  minWidthPx: 232,
  maxWidthPx: 332,
  zIndex: 8,
  borderRadiusPx: 8,
  backdropBlurPx: 8,
  panelBackground: "#161616",
  panelBorderColor: "#2a2a2a",
  panelTextColor: "#d6d6d6",
  panelShadow: "0 14px 40px rgba(0, 0, 0, 0.45)",
  inputBackground: "#252525",
  inputTextColor: "#d6d6d6",
  inputPlaceholderColor: "#868686",
  buttonBackground: "transparent",
  buttonTextColor: "#d6d6d6",
  buttonHoverBackground: "#252525",
  buttonDisabledOpacity: 0.42,
  statusTextColor: "#868686",
  statusActiveTextColor: "#d6d6d6",
  statusCompleteTextColor: "#868686"
};
function clampNumber2(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function normalizeColor2(value, fallback) {
  if (typeof value !== "string")
    return fallback;
  const trimmed = value.trim();
  return trimmed ? trimmed : fallback;
}
function normalizeSearchUiStyleOptions(options) {
  return {
    offsetTopPx: Number.isFinite(options?.offsetTopPx) ? clampNumber2(Number(options?.offsetTopPx), 0, 256) : DEFAULT_STYLE_OPTIONS.offsetTopPx,
    offsetRightPx: Number.isFinite(options?.offsetRightPx) ? clampNumber2(Number(options?.offsetRightPx), 0, 256) : DEFAULT_STYLE_OPTIONS.offsetRightPx,
    minWidthPx: Number.isFinite(options?.minWidthPx) ? clampNumber2(Number(options?.minWidthPx), 160, 800) : DEFAULT_STYLE_OPTIONS.minWidthPx,
    maxWidthPx: Number.isFinite(options?.maxWidthPx) ? clampNumber2(Number(options?.maxWidthPx), 180, 960) : DEFAULT_STYLE_OPTIONS.maxWidthPx,
    zIndex: Number.isFinite(options?.zIndex) ? clampNumber2(Number(options?.zIndex), 1, 9999) : DEFAULT_STYLE_OPTIONS.zIndex,
    borderRadiusPx: Number.isFinite(options?.borderRadiusPx) ? clampNumber2(Number(options?.borderRadiusPx), 0, 48) : DEFAULT_STYLE_OPTIONS.borderRadiusPx,
    backdropBlurPx: Number.isFinite(options?.backdropBlurPx) ? clampNumber2(Number(options?.backdropBlurPx), 0, 48) : DEFAULT_STYLE_OPTIONS.backdropBlurPx,
    panelBackground: normalizeColor2(options?.panelBackground, DEFAULT_STYLE_OPTIONS.panelBackground),
    panelBorderColor: normalizeColor2(options?.panelBorderColor, DEFAULT_STYLE_OPTIONS.panelBorderColor),
    panelTextColor: normalizeColor2(options?.panelTextColor, DEFAULT_STYLE_OPTIONS.panelTextColor),
    panelShadow: normalizeColor2(options?.panelShadow, DEFAULT_STYLE_OPTIONS.panelShadow),
    inputBackground: normalizeColor2(options?.inputBackground, DEFAULT_STYLE_OPTIONS.inputBackground),
    inputTextColor: normalizeColor2(options?.inputTextColor, DEFAULT_STYLE_OPTIONS.inputTextColor),
    inputPlaceholderColor: normalizeColor2(options?.inputPlaceholderColor, DEFAULT_STYLE_OPTIONS.inputPlaceholderColor),
    buttonBackground: normalizeColor2(options?.buttonBackground, DEFAULT_STYLE_OPTIONS.buttonBackground),
    buttonTextColor: normalizeColor2(options?.buttonTextColor, DEFAULT_STYLE_OPTIONS.buttonTextColor),
    buttonHoverBackground: normalizeColor2(options?.buttonHoverBackground, DEFAULT_STYLE_OPTIONS.buttonHoverBackground),
    buttonDisabledOpacity: Number.isFinite(options?.buttonDisabledOpacity) ? clampNumber2(Number(options?.buttonDisabledOpacity), 0, 1) : DEFAULT_STYLE_OPTIONS.buttonDisabledOpacity,
    statusTextColor: normalizeColor2(options?.statusTextColor, DEFAULT_STYLE_OPTIONS.statusTextColor),
    statusActiveTextColor: normalizeColor2(options?.statusActiveTextColor, DEFAULT_STYLE_OPTIONS.statusActiveTextColor),
    statusCompleteTextColor: normalizeColor2(options?.statusCompleteTextColor, DEFAULT_STYLE_OPTIONS.statusCompleteTextColor)
  };
}
function ensurePaneSearchUiStyles(doc) {
  if (doc.querySelector(`style[${STYLE_MARKER}="1"]`))
    return;
  const style = doc.createElement("style");
  style.setAttribute(STYLE_MARKER, "1");
  style.textContent = STYLE_TEXT;
  doc.head.appendChild(style);
}
function applySearchUiStyleOptions(root, options) {
  root.classList.add(ROOT_CLASS);
  root.style.setProperty("--restty-search-ui-top", `${options.offsetTopPx}px`);
  root.style.setProperty("--restty-search-ui-right", `${options.offsetRightPx}px`);
  root.style.setProperty("--restty-search-ui-min-width", `${options.minWidthPx}px`);
  root.style.setProperty("--restty-search-ui-max-width", `${options.maxWidthPx}px`);
  root.style.setProperty("--restty-search-ui-z-index", `${options.zIndex}`);
  root.style.setProperty("--restty-search-ui-radius", `${options.borderRadiusPx}px`);
  root.style.setProperty("--restty-search-ui-blur", `${options.backdropBlurPx}px`);
  root.style.setProperty("--restty-search-ui-background", options.panelBackground);
  root.style.setProperty("--restty-search-ui-border", options.panelBorderColor);
  root.style.setProperty("--restty-search-ui-text", options.panelTextColor);
  root.style.setProperty("--restty-search-ui-shadow", options.panelShadow);
  root.style.setProperty("--restty-search-ui-input-background", options.inputBackground);
  root.style.setProperty("--restty-search-ui-input-text", options.inputTextColor);
  root.style.setProperty("--restty-search-ui-input-placeholder", options.inputPlaceholderColor);
  root.style.setProperty("--restty-search-ui-button-background", options.buttonBackground);
  root.style.setProperty("--restty-search-ui-button-text", options.buttonTextColor);
  root.style.setProperty("--restty-search-ui-button-hover", options.buttonHoverBackground);
  root.style.setProperty("--restty-search-ui-button-disabled-opacity", options.buttonDisabledOpacity.toFixed(3));
  root.style.setProperty("--restty-search-ui-status", options.statusTextColor);
  root.style.setProperty("--restty-search-ui-status-active", options.statusActiveTextColor);
  root.style.setProperty("--restty-search-ui-status-complete", options.statusCompleteTextColor);
}
function clearSearchUiStyleOptions(root) {
  root.classList.remove(ROOT_CLASS);
  root.style.removeProperty("--restty-search-ui-top");
  root.style.removeProperty("--restty-search-ui-right");
  root.style.removeProperty("--restty-search-ui-min-width");
  root.style.removeProperty("--restty-search-ui-max-width");
  root.style.removeProperty("--restty-search-ui-z-index");
  root.style.removeProperty("--restty-search-ui-radius");
  root.style.removeProperty("--restty-search-ui-blur");
  root.style.removeProperty("--restty-search-ui-background");
  root.style.removeProperty("--restty-search-ui-border");
  root.style.removeProperty("--restty-search-ui-text");
  root.style.removeProperty("--restty-search-ui-shadow");
  root.style.removeProperty("--restty-search-ui-input-background");
  root.style.removeProperty("--restty-search-ui-input-text");
  root.style.removeProperty("--restty-search-ui-input-placeholder");
  root.style.removeProperty("--restty-search-ui-button-background");
  root.style.removeProperty("--restty-search-ui-button-text");
  root.style.removeProperty("--restty-search-ui-button-hover");
  root.style.removeProperty("--restty-search-ui-button-disabled-opacity");
  root.style.removeProperty("--restty-search-ui-status");
  root.style.removeProperty("--restty-search-ui-status-active");
  root.style.removeProperty("--restty-search-ui-status-complete");
}

// src/surface/search-ui/controller.ts
function defaultStatusFormatter(state) {
  if (!state.query)
    return "";
  if (state.pending)
    return "…";
  if (state.total <= 0)
    return "0";
  if (state.selectedIndex !== null) {
    return `${state.selectedIndex + 1}/${state.total}`;
  }
  return `${state.total}`;
}
function isNodeWithinRoot(root, target) {
  return target instanceof Node && root.contains(target);
}
function createPaneSearchUiController(options) {
  const enabled = options.enabled ?? true;
  const paneStates = new Map;
  const ownerDoc = options.root.ownerDocument ?? document;
  const ownerWin = ownerDoc.defaultView ?? window;
  let styleOptions = normalizeSearchUiStyleOptions(options.styles);
  const shortcutOptions = typeof options.shortcut === "object" ? options.shortcut : { enabled: options.shortcut !== false };
  const statusFormatter = options.statusFormatter ?? defaultStatusFormatter;
  const placeholder = options.placeholder ?? "Find in scrollback";
  const previousButtonText = options.previousButtonText ?? "↑";
  const nextButtonText = options.nextButtonText ?? "↓";
  const clearButtonText = options.clearButtonText ?? "Clear";
  const closeButtonText = options.closeButtonText ?? "×";
  if (enabled) {
    ensurePaneSearchUiStyles(ownerDoc);
    applySearchUiStyleOptions(options.root, styleOptions);
  }
  function getOpenPaneId() {
    for (const [paneId, state] of paneStates) {
      if (state.open)
        return paneId;
    }
    return null;
  }
  function syncPaneUi(paneState) {
    const { input, prevButton, nextButton, clearButton, root, status, state } = paneState;
    if (ownerDoc.activeElement !== input) {
      input.value = state.query;
    }
    const hasMatches = state.active && state.total > 0;
    prevButton.disabled = !hasMatches;
    nextButton.disabled = !hasMatches;
    clearButton.disabled = !state.query;
    root.dataset.open = paneState.open ? "1" : "0";
    status.textContent = statusFormatter(state);
    status.dataset.active = state.active ? "1" : "0";
    status.dataset.complete = state.complete ? "1" : "0";
    status.dataset.empty = status.textContent ? "0" : "1";
  }
  function restoreFocus(paneState) {
    const target = paneState?.pane.focusTarget ?? paneState?.pane.container ?? null;
    if (target instanceof HTMLElement) {
      target.focus({ preventScroll: true });
    }
  }
  function closeAllExcept(paneId) {
    for (const [id, paneState] of paneStates) {
      if (id === paneId || !paneState.open)
        continue;
      paneState.open = false;
      syncPaneUi(paneState);
    }
  }
  function focusSearchInput(paneState, selectAll = false) {
    paneState.input.focus({ preventScroll: true });
    if (selectAll)
      paneState.input.select();
  }
  function open(paneId, config = {}) {
    if (!enabled)
      return;
    const paneState = paneStates.get(paneId);
    if (!paneState)
      return;
    closeAllExcept(paneId);
    paneState.open = true;
    paneState.state = { ...paneState.pane.getSearchState() };
    syncPaneUi(paneState);
    focusSearchInput(paneState, config.selectAll ?? true);
  }
  function close(paneId, config = {}) {
    const paneState = paneStates.get(paneId);
    if (!paneState || !paneState.open)
      return;
    paneState.open = false;
    syncPaneUi(paneState);
    if (config.restoreFocus !== false) {
      restoreFocus(paneState);
    }
  }
  function toggle(paneId, config = {}) {
    if (paneStates.get(paneId)?.open) {
      close(paneId, config);
      return;
    }
    open(paneId, config);
  }
  function registerPane(pane) {
    if (!enabled)
      return;
    const root = ownerDoc.createElement("div");
    root.className = "restty-pane-search";
    root.dataset.open = "0";
    root.setAttribute("role", "search");
    root.setAttribute("aria-label", "Search terminal scrollback");
    const row = ownerDoc.createElement("div");
    row.className = "restty-pane-search-row";
    const input = ownerDoc.createElement("input");
    input.className = "restty-pane-search-input";
    input.type = "text";
    input.placeholder = placeholder;
    input.spellcheck = false;
    input.autocapitalize = "off";
    input.autocomplete = "off";
    input.autocorrect = "off";
    const prevButton = ownerDoc.createElement("button");
    prevButton.className = "restty-pane-search-button";
    prevButton.type = "button";
    prevButton.textContent = previousButtonText;
    prevButton.title = "Match above";
    const nextButton = ownerDoc.createElement("button");
    nextButton.className = "restty-pane-search-button";
    nextButton.type = "button";
    nextButton.textContent = nextButtonText;
    nextButton.title = "Match below";
    const clearButton = ownerDoc.createElement("button");
    clearButton.className = "restty-pane-search-button";
    clearButton.type = "button";
    clearButton.textContent = clearButtonText;
    const closeButton = ownerDoc.createElement("button");
    closeButton.className = "restty-pane-search-button";
    closeButton.type = "button";
    closeButton.textContent = closeButtonText;
    closeButton.title = "Close search";
    closeButton.setAttribute("aria-label", "Close search");
    const status = ownerDoc.createElement("div");
    status.className = "restty-pane-search-status";
    row.append(input, status, prevButton, nextButton, clearButton, closeButton);
    root.append(row);
    if (!pane.container.style.position) {
      pane.container.style.position = "relative";
    }
    pane.container.appendChild(root);
    const paneState = {
      pane,
      root,
      input,
      prevButton,
      nextButton,
      clearButton,
      closeButton,
      status,
      cleanupFns: [],
      state: { ...pane.getSearchState() },
      open: false
    };
    const onInput = () => {
      pane.setSearchQuery(input.value);
    };
    input.addEventListener("input", onInput);
    paneState.cleanupFns.push(() => {
      input.removeEventListener("input", onInput);
    });
    const onInputKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (event.shiftKey) {
          pane.searchNext();
        } else {
          pane.searchPrevious();
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        close(pane.id);
      }
    };
    input.addEventListener("keydown", onInputKeyDown);
    paneState.cleanupFns.push(() => {
      input.removeEventListener("keydown", onInputKeyDown);
    });
    const onPrev = () => {
      pane.searchNext();
      focusSearchInput(paneState);
    };
    prevButton.addEventListener("click", onPrev);
    paneState.cleanupFns.push(() => {
      prevButton.removeEventListener("click", onPrev);
    });
    const onNext = () => {
      pane.searchPrevious();
      focusSearchInput(paneState);
    };
    nextButton.addEventListener("click", onNext);
    paneState.cleanupFns.push(() => {
      nextButton.removeEventListener("click", onNext);
    });
    const onClear = () => {
      pane.clearSearch();
      paneState.state = { ...pane.getSearchState() };
      syncPaneUi(paneState);
      focusSearchInput(paneState);
    };
    clearButton.addEventListener("click", onClear);
    paneState.cleanupFns.push(() => {
      clearButton.removeEventListener("click", onClear);
    });
    const onClose = () => {
      close(pane.id);
    };
    closeButton.addEventListener("click", onClose);
    paneState.cleanupFns.push(() => {
      closeButton.removeEventListener("click", onClose);
    });
    paneStates.set(pane.id, paneState);
    syncPaneUi(paneState);
  }
  function unregisterPane(paneId) {
    const paneState = paneStates.get(paneId);
    if (!paneState)
      return;
    for (const cleanup of paneState.cleanupFns) {
      cleanup();
    }
    paneState.root.remove();
    paneStates.delete(paneId);
  }
  function handleSearchState(paneId, state) {
    const paneState = paneStates.get(paneId);
    if (!paneState)
      return;
    paneState.state = { ...state };
    syncPaneUi(paneState);
  }
  function handleActivePaneChange(paneId) {
    const openPaneId = getOpenPaneId();
    if (openPaneId !== null && openPaneId !== paneId) {
      close(openPaneId, { restoreFocus: false });
    }
  }
  function isOpen(paneId) {
    return paneStates.get(paneId)?.open ?? false;
  }
  const onWindowKeyDown = (event) => {
    if (!enabled)
      return;
    if (shortcutOptions.enabled === false)
      return;
    const isMac = typeof navigator !== "undefined" && /mac/i.test(navigator.platform);
    const primaryModifier = isMac ? event.metaKey : event.ctrlKey;
    if (!primaryModifier || event.altKey || event.repeat || event.key.toLowerCase() !== "f") {
      return;
    }
    if (!isNodeWithinRoot(options.root, event.target) && !isNodeWithinRoot(options.root, ownerDoc.activeElement)) {
      return;
    }
    const pane = options.getFocusedPane() ?? options.getActivePane();
    if (!pane)
      return;
    if (shortcutOptions.canOpen && !shortcutOptions.canOpen(event, pane.id)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    open(pane.id, { selectAll: true });
  };
  ownerWin.addEventListener("keydown", onWindowKeyDown, { capture: true });
  return {
    registerPane,
    unregisterPane,
    handleSearchState,
    handleActivePaneChange,
    open,
    close,
    toggle,
    isOpen,
    getStyleOptions: () => ({ ...styleOptions }),
    setStyleOptions: (next) => {
      styleOptions = normalizeSearchUiStyleOptions({
        ...styleOptions,
        ...next
      });
      if (enabled) {
        applySearchUiStyleOptions(options.root, styleOptions);
      }
    },
    destroy: () => {
      ownerWin.removeEventListener("keydown", onWindowKeyDown, { capture: true });
      for (const paneId of Array.from(paneStates.keys())) {
        unregisterPane(paneId);
      }
      if (enabled) {
        clearSearchUiStyleOptions(options.root);
      }
    }
  };
}
// src/surface/panes/managed-pane-search-ui.ts
function createManagedPaneSearchUiController(options) {
  const searchUiConfig = typeof options.searchUi === "object" && options.searchUi ? options.searchUi : undefined;
  return createPaneSearchUiController({
    root: options.root,
    enabled: options.searchUi === false ? false : searchUiConfig?.enabled ?? true,
    placeholder: searchUiConfig?.placeholder,
    previousButtonText: searchUiConfig?.previousButtonText,
    nextButtonText: searchUiConfig?.nextButtonText,
    clearButtonText: searchUiConfig?.clearButtonText,
    closeButtonText: searchUiConfig?.closeButtonText,
    statusFormatter: searchUiConfig?.statusFormatter,
    shortcut: searchUiConfig?.shortcut,
    styles: searchUiConfig?.styles,
    getActivePane: options.getActivePane,
    getFocusedPane: options.getFocusedPane
  });
}

// src/surface/panes/managed-pane-manager.ts
function createResttyManagedPaneManager2(options) {
  const session = options.session ?? getDefaultResttyRuntimeSession2();
  const autoInit = options.autoInit ?? true;
  const paneClassName = options.paneDom?.paneClassName ?? "pane";
  const canvasClassName = options.paneDom?.canvasClassName ?? "pane-canvas";
  const imeInputClassName = options.paneDom?.imeInputClassName ?? "pane-ime-input restty-pane-ime-input";
  const contextMenu = resolveManagedPaneContextMenu(options);
  const shortcuts = resolveManagedPaneShortcuts(options.shortcuts);
  let manager;
  const searchUiController = createManagedPaneSearchUiController({
    root: options.root,
    searchUi: options.searchUi,
    getActivePane: () => manager.getActivePane(),
    getFocusedPane: () => manager.getFocusedPane()
  });
  manager = createResttyPaneManager2({
    root: options.root,
    minPaneSize: options.minPaneSize,
    styles: options.paneStyles,
    shortcuts,
    contextMenu,
    createPane: ({ id, sourcePane }) => {
      const pane = createManagedPane({
        id,
        sourcePane,
        dom: {
          paneClassName,
          canvasClassName,
          imeInputClassName
        },
        terminal: options.terminal,
        services: options.services,
        session,
        autoInit,
        onSearchState: (state) => {
          searchUiController.handleSearchState(id, state);
        }
      });
      searchUiController.registerPane(pane);
      return pane;
    },
    destroyPane: (pane) => {
      searchUiController.unregisterPane(pane.id);
      pane.destroyRuntime();
    },
    onPaneCreated: options.onPaneCreated,
    onPaneClosed: options.onPaneClosed,
    onPaneSplit: options.onPaneSplit,
    onActivePaneChange: (pane) => {
      searchUiController.handleActivePaneChange(pane?.id ?? null);
      options.onActivePaneChange?.(pane);
    },
    onLayoutChanged: () => {
      options.onLayoutChanged?.();
    }
  });
  const destroy = () => {
    searchUiController.destroy();
    manager.destroy();
  };
  return {
    ...manager,
    openPaneSearch: (id, config) => {
      searchUiController.open(id, config);
    },
    closePaneSearch: (id, config) => {
      searchUiController.close(id, config);
    },
    togglePaneSearch: (id, config) => {
      searchUiController.toggle(id, config);
    },
    isPaneSearchOpen: (id) => searchUiController.isOpen(id),
    getSearchUiStyleOptions: () => searchUiController.getStyleOptions(),
    setSearchUiStyleOptions: (next) => {
      searchUiController.setStyleOptions(next);
    },
    destroy
  };
}

export { createResttyPaneManager2, getResttyShortcutModifierLabel2, createDefaultResttyPaneContextMenuItems2, createResttyManagedPaneManager2 };
