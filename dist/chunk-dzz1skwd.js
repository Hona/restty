import {
  createResttyManagedPaneManager2
} from "./chunk-ksjw84n0.js";
import {
  cloneShaderStages,
  normalizeShaderStage,
  normalizeShaderStages,
  sortShaderStages
} from "./chunk-crd68q3n.js";

// src/surface/plugins/types.ts
var RESTTY_PLUGIN_API_VERSION2 = 1;

// src/surface/restty/pane-handle.ts
class ResttyPaneHandle2 {
  resolvePane;
  searchUiOps;
  constructor(resolvePane, searchUiOps) {
    this.resolvePane = resolvePane;
    this.searchUiOps = searchUiOps;
  }
  get id() {
    return this.resolvePane().id;
  }
  setRenderer(value) {
    this.resolvePane().setRenderer(value);
  }
  setPaused(value) {
    this.resolvePane().setPaused(value);
  }
  togglePause() {
    this.resolvePane().togglePause();
  }
  setFontSize(value) {
    this.resolvePane().setFontSize(value);
  }
  setLigatures(value) {
    this.resolvePane().setLigatures(value);
  }
  setFontHinting(value) {
    this.resolvePane().setFontHinting(value);
  }
  setFontHintTarget(value) {
    this.resolvePane().setFontHintTarget(value);
  }
  setFonts(fonts) {
    return this.resolvePane().setFonts(fonts);
  }
  applyTheme(theme, sourceLabel) {
    this.resolvePane().applyTheme(theme, sourceLabel);
  }
  resetTheme() {
    this.resolvePane().resetTheme();
  }
  sendInput(text, source) {
    this.resolvePane().sendInput(text, source);
  }
  sendKeyInput(text, source) {
    this.resolvePane().sendKeyInput(text, source);
  }
  clearScreen() {
    this.resolvePane().clearScreen();
  }
  setColorScheme(scheme) {
    this.resolvePane().setColorScheme(scheme);
  }
  getMode(mode, ansi) {
    return this.resolvePane().getMode(mode, ansi);
  }
  snapshot() {
    return this.resolvePane().snapshot();
  }
  restore(bytes) {
    return this.resolvePane().restore(bytes);
  }
  connectPty(url = "") {
    this.resolvePane().connectPty(url);
  }
  disconnectPty() {
    this.resolvePane().disconnectPty();
  }
  isPtyConnected() {
    return this.resolvePane().isPtyConnected();
  }
  setMouseMode(value) {
    this.resolvePane().setMouseMode(value);
  }
  getMouseStatus() {
    return this.resolvePane().getMouseStatus();
  }
  copySelectionToClipboard() {
    return this.resolvePane().copySelectionToClipboard();
  }
  pasteFromClipboard() {
    return this.resolvePane().pasteFromClipboard();
  }
  selectWordAtClientPoint(clientX, clientY) {
    return this.resolvePane().selectWordAtClientPoint(clientX, clientY);
  }
  setSearchQuery(query) {
    this.resolvePane().setSearchQuery(query);
  }
  clearSearch() {
    this.resolvePane().clearSearch();
  }
  searchNext() {
    this.resolvePane().searchNext();
  }
  searchPrevious() {
    this.resolvePane().searchPrevious();
  }
  getSearchState() {
    return this.resolvePane().getSearchState();
  }
  openSearch(options) {
    this.searchUiOps.open(this.id, options);
  }
  closeSearch(options) {
    this.searchUiOps.close(this.id, options);
  }
  toggleSearch(options) {
    this.searchUiOps.toggle(this.id, options);
  }
  isSearchOpen() {
    return this.searchUiOps.isOpen(this.id);
  }
  resize(cols, rows) {
    this.resolvePane().resize(cols, rows);
  }
  focus() {
    this.resolvePane().focus();
  }
  blur() {
    this.resolvePane().blur();
  }
  updateSize(force) {
    this.resolvePane().updateSize(force);
  }
  getBackend() {
    return this.resolvePane().getBackend();
  }
  getSearchUiStyleOptions() {
    return this.searchUiOps.getStyleOptions();
  }
  setSearchUiStyleOptions(options) {
    this.searchUiOps.setStyleOptions(options);
  }
  setShaderStages(stages) {
    this.resolvePane().setShaderStages(stages);
  }
  getShaderStages() {
    return this.resolvePane().getShaderStages();
  }
}

// src/surface/restty/active-pane-api.ts
class ResttyActivePaneApi {
  isPtyConnected() {
    return this.requireActivePaneHandle().isPtyConnected();
  }
  setRenderer(value) {
    this.requireActivePaneHandle().setRenderer(value);
  }
  setPaused(value) {
    this.requireActivePaneHandle().setPaused(value);
  }
  togglePause() {
    this.requireActivePaneHandle().togglePause();
  }
  setFontSize(value) {
    this.requireActivePaneHandle().setFontSize(value);
  }
  setLigatures(value) {
    this.requireActivePaneHandle().setLigatures(value);
  }
  setFontHinting(value) {
    this.requireActivePaneHandle().setFontHinting(value);
  }
  setFontHintTarget(value) {
    this.requireActivePaneHandle().setFontHintTarget(value);
  }
  setFonts(fonts) {
    return this.requireActivePaneHandle().setFonts(fonts);
  }
  applyTheme(theme, sourceLabel) {
    this.requireActivePaneHandle().applyTheme(theme, sourceLabel);
  }
  resetTheme() {
    this.requireActivePaneHandle().resetTheme();
  }
  sendInput(text, source) {
    this.requireActivePaneHandle().sendInput(text, source);
  }
  sendKeyInput(text, source) {
    this.requireActivePaneHandle().sendKeyInput(text, source);
  }
  clearScreen() {
    this.requireActivePaneHandle().clearScreen();
  }
  setColorScheme(scheme) {
    this.requireActivePaneHandle().setColorScheme(scheme);
  }
  getMode(mode, ansi) {
    return this.requireActivePaneHandle().getMode(mode, ansi);
  }
  snapshot() {
    return this.requireActivePaneHandle().snapshot();
  }
  restore(bytes) {
    return this.requireActivePaneHandle().restore(bytes);
  }
  connectPty(url = "") {
    this.requireActivePaneHandle().connectPty(url);
  }
  disconnectPty() {
    this.requireActivePaneHandle().disconnectPty();
  }
  setMouseMode(value) {
    this.requireActivePaneHandle().setMouseMode(value);
  }
  getMouseStatus() {
    return this.requireActivePaneHandle().getMouseStatus();
  }
  copySelectionToClipboard() {
    return this.requireActivePaneHandle().copySelectionToClipboard();
  }
  pasteFromClipboard() {
    return this.requireActivePaneHandle().pasteFromClipboard();
  }
  selectWordAtClientPoint(clientX, clientY) {
    return this.requireActivePaneHandle().selectWordAtClientPoint(clientX, clientY);
  }
  setSearchQuery(query) {
    this.requireActivePaneHandle().setSearchQuery(query);
  }
  clearSearch() {
    this.requireActivePaneHandle().clearSearch();
  }
  searchNext() {
    this.requireActivePaneHandle().searchNext();
  }
  searchPrevious() {
    this.requireActivePaneHandle().searchPrevious();
  }
  getSearchState() {
    return this.requireActivePaneHandle().getSearchState();
  }
  openSearch(options) {
    this.requireActivePaneHandle().openSearch(options);
  }
  closeSearch(options) {
    this.requireActivePaneHandle().closeSearch(options);
  }
  toggleSearch(options) {
    this.requireActivePaneHandle().toggleSearch(options);
  }
  isSearchOpen() {
    return this.requireActivePaneHandle().isSearchOpen();
  }
  getSearchUiStyleOptions() {
    return this.requireActivePaneHandle().getSearchUiStyleOptions();
  }
  setSearchUiStyleOptions(options) {
    this.requireActivePaneHandle().setSearchUiStyleOptions(options);
  }
  setShaderStages(stages) {
    this.requireActivePaneHandle().setShaderStages(stages);
  }
  getShaderStages() {
    return this.requireActivePaneHandle().getShaderStages();
  }
  updateSize(force) {
    this.requireActivePaneHandle().updateSize(force);
  }
  getBackend() {
    return this.requireActivePaneHandle().getBackend();
  }
}

// src/surface/restty/manager-options.ts
function createMergedPaneTerminalConfig(deps) {
  return (context) => {
    const paneId = context.id;
    const resolved = typeof deps.terminal === "function" ? deps.terminal(context) : deps.terminal ?? {};
    const paneBaseStages = deps.shaderOps.normalizePaneShaderStages(resolved.shaderStages, paneId);
    deps.shaderOps.setPaneBaseShaderStages(paneId, paneBaseStages);
    const fonts = deps.getFonts();
    return {
      ...resolved,
      ...fonts ? { fonts } : {},
      shaderStages: deps.shaderOps.buildMergedShaderStages(paneBaseStages)
    };
  };
}
function createMergedPaneServicesConfig(deps) {
  return (context) => {
    const paneId = context.id;
    const resolved = typeof deps.services === "function" ? deps.services(context) : deps.services ?? {};
    const resolvedBeforeInput = resolved.beforeInput;
    const resolvedBeforeRenderOutput = resolved.beforeRenderOutput;
    const resolvedCallbacks = resolved.callbacks;
    return {
      ...resolved,
      callbacks: deps.onDesktopNotification || resolvedCallbacks?.onDesktopNotification ? {
        ...resolvedCallbacks,
        onDesktopNotification: (notification) => {
          resolvedCallbacks?.onDesktopNotification?.(notification);
          deps.onDesktopNotification?.({ ...notification, paneId });
        }
      } : resolvedCallbacks,
      beforeInput: ({ text, source }) => {
        const maybeUserText = resolvedBeforeInput?.({ text, source });
        if (maybeUserText === null)
          return null;
        const current = maybeUserText === undefined ? text : maybeUserText;
        return deps.pluginHost.applyInputInterceptors(paneId, current, source);
      },
      beforeRenderOutput: ({ text, source }) => {
        deps.runRenderHooks({
          phase: "before",
          paneId,
          text,
          source,
          dropped: false
        });
        const maybeUserText = resolvedBeforeRenderOutput?.({ text, source });
        if (maybeUserText === null) {
          deps.runRenderHooks({
            phase: "after",
            paneId,
            text,
            source,
            dropped: true
          });
          return null;
        }
        const current = maybeUserText === undefined ? text : maybeUserText;
        const next = deps.pluginHost.applyOutputInterceptors(paneId, current, source);
        deps.runRenderHooks({
          phase: "after",
          paneId,
          text: next === null ? current : next,
          source,
          dropped: next === null
        });
        return next;
      }
    };
  };
}
function createPaneManagerEventHandlers(deps) {
  return {
    onPaneCreated: (pane) => {
      deps.shaderOps.syncPaneShaderStages(pane.id);
      deps.emitPluginEvent("pane:created", { paneId: pane.id });
      deps.onPaneCreated?.(pane);
    },
    onPaneClosed: (pane) => {
      deps.shaderOps.removePaneBaseShaderStages(pane.id);
      deps.emitPluginEvent("pane:closed", { paneId: pane.id });
      deps.onPaneClosed?.(pane);
    },
    onPaneSplit: (sourcePane, createdPane, direction) => {
      deps.emitPluginEvent("pane:split", {
        sourcePaneId: sourcePane.id,
        createdPaneId: createdPane.id,
        direction
      });
      deps.onPaneSplit?.(sourcePane, createdPane, direction);
    },
    onActivePaneChange: (pane) => {
      deps.emitPluginEvent("pane:active-changed", { paneId: pane?.id ?? null });
      deps.onActivePaneChange?.(pane);
    },
    onLayoutChanged: () => {
      deps.emitPluginEvent("layout:changed", {});
      deps.onLayoutChanged?.();
    }
  };
}

// src/surface/restty/pane-manager-assembly.ts
function createResttyPaneManagerAssembly({
  shaderOps,
  controller,
  getFonts,
  terminal,
  services,
  events
}) {
  const controllerHooks = controller.paneManagerHooks;
  const {
    onPaneCreated,
    onPaneClosed,
    onPaneSplit,
    onActivePaneChange,
    onLayoutChanged,
    onDesktopNotification
  } = events ?? {};
  const mergedTerminalConfig = createMergedPaneTerminalConfig({
    terminal,
    getFonts,
    shaderOps
  });
  const mergedServicesConfig = createMergedPaneServicesConfig({
    services,
    onDesktopNotification,
    pluginHost: controller,
    runRenderHooks: controllerHooks.runRenderHooks
  });
  const paneManagerEventHandlers = createPaneManagerEventHandlers({
    shaderOps,
    emitPluginEvent: controllerHooks.emitPluginEvent,
    onPaneCreated,
    onPaneClosed,
    onPaneSplit,
    onActivePaneChange,
    onLayoutChanged
  });
  return {
    mergedTerminalConfig,
    mergedServicesConfig,
    paneManagerEventHandlers
  };
}

// src/surface/plugins/runtime.ts
function registerPluginInterceptor(bucket, pluginId, interceptor, options, seq) {
  const entry = {
    id: seq.nextId,
    pluginId,
    priority: Number.isFinite(options?.priority) ? Number(options?.priority) : 0,
    order: seq.nextOrder,
    interceptor
  };
  bucket.push(entry);
  bucket.sort((a, b) => {
    if (a.priority !== b.priority)
      return a.priority - b.priority;
    return a.order - b.order;
  });
  return {
    nextId: seq.nextId + 1,
    nextOrder: seq.nextOrder + 1,
    dispose: () => {
      const index = bucket.findIndex((current) => current.id === entry.id);
      if (index >= 0) {
        bucket.splice(index, 1);
      }
    }
  };
}
function applyPluginInterceptors(bucket, kind, payload) {
  let currentText = payload.text;
  for (let i = 0;i < bucket.length; i += 1) {
    const entry = bucket[i];
    try {
      const result = entry.interceptor({ ...payload, text: currentText });
      if (result === null)
        return null;
      if (typeof result === "string")
        currentText = result;
    } catch (error) {
      console.error(`[restty plugin] ${kind} interceptor error (${entry.pluginId}):`, error);
    }
  }
  return currentText;
}
function runPluginHooks(bucket, kind, payload) {
  for (let i = 0;i < bucket.length; i += 1) {
    const entry = bucket[i];
    try {
      entry.interceptor(payload);
    } catch (error) {
      console.error(`[restty plugin] ${kind} hook error (${entry.pluginId}):`, error);
    }
  }
}
function attachRuntimeDisposer(runtime, kind, dispose) {
  const entry = {
    kind,
    active: true,
    dispose: () => {
      if (!entry.active)
        return;
      entry.active = false;
      dispose();
    }
  };
  runtime.disposers.push(entry);
  return entry.dispose;
}
function teardownPluginRuntime(runtime) {
  for (let i = 0;i < runtime.disposers.length; i += 1) {
    try {
      runtime.disposers[i].dispose();
    } catch {}
  }
  runtime.disposers.length = 0;
  const cleanup = runtime.cleanup;
  runtime.cleanup = null;
  if (!cleanup)
    return;
  try {
    cleanup();
  } catch (error) {
    console.error(`[restty plugin] cleanup error (${runtime.plugin.id}):`, error);
  }
}
function setPluginLoadError(pluginDiagnostics, pluginId, message) {
  pluginDiagnostics.set(pluginId, {
    id: pluginId,
    version: null,
    apiVersion: null,
    requires: null,
    active: false,
    activatedAt: null,
    lastError: message
  });
}
function patchPluginDiagnostic(pluginDiagnostics, pluginId, patch) {
  const current = pluginDiagnostics.get(pluginId);
  if (!current)
    return;
  pluginDiagnostics.set(pluginId, {
    ...current,
    ...patch
  });
}
function countActiveDisposers(runtime, kind) {
  if (!runtime)
    return 0;
  let count = 0;
  for (let i = 0;i < runtime.disposers.length; i += 1) {
    const entry = runtime.disposers[i];
    if (entry.active && entry.kind === kind)
      count += 1;
  }
  return count;
}
function buildPluginInfo(pluginId, pluginDiagnostics, pluginRuntimes) {
  const diagnostic = pluginDiagnostics.get(pluginId) ?? null;
  const runtime = pluginRuntimes.get(pluginId) ?? null;
  if (!diagnostic && !runtime)
    return null;
  const plugin = runtime?.plugin;
  return {
    id: pluginId,
    version: plugin?.version?.trim?.() || diagnostic?.version || null,
    apiVersion: plugin?.apiVersion ?? (Number.isFinite(diagnostic?.apiVersion) ? diagnostic?.apiVersion : null),
    requires: plugin?.requires ?? diagnostic?.requires ?? null,
    active: runtime ? true : diagnostic?.active ?? false,
    activatedAt: runtime?.activatedAt ?? diagnostic?.activatedAt ?? null,
    lastError: diagnostic?.lastError ?? null,
    listeners: countActiveDisposers(runtime, "event"),
    inputInterceptors: countActiveDisposers(runtime, "input-interceptor"),
    outputInterceptors: countActiveDisposers(runtime, "output-interceptor"),
    lifecycleHooks: countActiveDisposers(runtime, "lifecycle-hook"),
    renderHooks: countActiveDisposers(runtime, "render-hook"),
    renderStages: countActiveDisposers(runtime, "render-stage")
  };
}
function onPluginEvent(pluginListeners, event, listener) {
  let listeners = pluginListeners.get(event);
  if (!listeners) {
    listeners = new Set;
    pluginListeners.set(event, listeners);
  }
  const wrapped = listener;
  listeners.add(wrapped);
  return () => {
    const current = pluginListeners.get(event);
    if (!current)
      return;
    current.delete(wrapped);
    if (current.size === 0) {
      pluginListeners.delete(event);
    }
  };
}
function emitPluginEvent(pluginListeners, event, payload) {
  const listeners = pluginListeners.get(event);
  if (!listeners || listeners.size === 0)
    return;
  const snapshot = Array.from(listeners);
  for (let i = 0;i < snapshot.length; i += 1) {
    try {
      snapshot[i](payload);
    } catch (error) {
      console.error(`[restty plugin] listener error (${String(event)}):`, error);
    }
  }
}

// src/surface/plugins/utils.ts
function errorToMessage(error) {
  if (error instanceof Error)
    return error.message || error.name || "Unknown error";
  return String(error);
}
function normalizePluginMetadata(plugin, pluginId) {
  return {
    ...plugin,
    id: pluginId,
    version: plugin.version?.trim?.() || undefined,
    apiVersion: Number.isFinite(plugin.apiVersion) ? Math.trunc(Number(plugin.apiVersion)) : undefined,
    requires: plugin.requires ?? undefined
  };
}
function assertPluginCompatibility(pluginId, plugin, pluginApiVersion) {
  const version = plugin.version?.trim?.();
  if (version !== undefined && !version) {
    throw new Error(`Restty plugin ${pluginId} has an empty version`);
  }
  if (plugin.apiVersion !== undefined) {
    if (!Number.isInteger(plugin.apiVersion) || plugin.apiVersion < 1) {
      throw new Error(`Restty plugin ${pluginId} has invalid apiVersion ${String(plugin.apiVersion)}`);
    }
    if (plugin.apiVersion !== pluginApiVersion) {
      throw new Error(`Restty plugin ${pluginId} requires apiVersion ${plugin.apiVersion}, current is ${pluginApiVersion}`);
    }
  }
  const requirement = plugin.requires?.pluginApi;
  if (requirement === undefined)
    return;
  if (typeof requirement === "number") {
    if (!Number.isInteger(requirement) || requirement < 1) {
      throw new Error(`Restty plugin ${pluginId} has invalid requires.pluginApi value`);
    }
    if (requirement !== pluginApiVersion) {
      throw new Error(`Restty plugin ${pluginId} requires pluginApi ${requirement}, current is ${pluginApiVersion}`);
    }
    return;
  }
  const min = requirement.min;
  const max = requirement.max;
  if (!Number.isInteger(min) || min < 1) {
    throw new Error(`Restty plugin ${pluginId} has invalid requires.pluginApi.min`);
  }
  if (max !== undefined && (!Number.isInteger(max) || max < min)) {
    throw new Error(`Restty plugin ${pluginId} has invalid requires.pluginApi.max`);
  }
  if (pluginApiVersion < min || max !== undefined && pluginApiVersion > max) {
    const range = max === undefined ? `>=${min}` : `${min}-${max}`;
    throw new Error(`Restty plugin ${pluginId} requires pluginApi range ${range}, current is ${pluginApiVersion}`);
  }
}
function lookupPluginRegistryEntry(registry, pluginId) {
  if (registry instanceof Map) {
    return registry.get(pluginId) ?? null;
  }
  if (Object.prototype.hasOwnProperty.call(registry, pluginId)) {
    return registry[pluginId];
  }
  return null;
}
async function resolvePluginRegistryEntry(entry) {
  if (typeof entry === "function") {
    return await entry();
  }
  return entry;
}
function normalizePluginCleanup(cleanup) {
  if (!cleanup)
    return null;
  if (typeof cleanup === "function")
    return cleanup;
  if (typeof cleanup === "object" && typeof cleanup.dispose === "function") {
    return () => cleanup.dispose();
  }
  return null;
}

// src/surface/plugins/dispatcher.ts
class ResttyPluginDispatcher {
  deps;
  pluginListeners = new Map;
  inputInterceptors = [];
  outputInterceptors = [];
  lifecycleHooks = [];
  renderHooks = [];
  nextInterceptorId = 1;
  nextInterceptorOrder = 1;
  constructor(deps) {
    this.deps = deps;
  }
  createPluginContext(runtime) {
    return {
      restty: this.deps.restty,
      options: runtime.options,
      on: (event, listener) => {
        return {
          dispose: this.attachRuntimeDisposer(runtime, "event", this.onPluginEvent(event, listener))
        };
      },
      addInputInterceptor: (interceptor, options) => {
        return {
          dispose: this.attachRuntimeDisposer(runtime, "input-interceptor", this.addInputInterceptor(runtime.plugin.id, interceptor, options))
        };
      },
      addOutputInterceptor: (interceptor, options) => {
        return {
          dispose: this.attachRuntimeDisposer(runtime, "output-interceptor", this.addOutputInterceptor(runtime.plugin.id, interceptor, options))
        };
      },
      addLifecycleHook: (hook, options) => {
        return {
          dispose: this.attachRuntimeDisposer(runtime, "lifecycle-hook", this.addLifecycleHook(runtime.plugin.id, hook, options))
        };
      },
      addRenderHook: (hook, options) => {
        return {
          dispose: this.attachRuntimeDisposer(runtime, "render-hook", this.addRenderHook(runtime.plugin.id, hook, options))
        };
      },
      addRenderStage: (stage) => {
        const rawId = stage?.id?.trim?.() ?? "";
        if (!rawId) {
          throw new Error(`Restty plugin ${runtime.plugin.id} render stage id is required`);
        }
        const stageId = `${runtime.plugin.id}:${rawId}`;
        const normalized = normalizeShaderStage({ ...stage, id: stageId });
        const handle = this.deps.addRenderStage(normalized, runtime.plugin.id);
        return {
          ...handle,
          dispose: this.attachRuntimeDisposer(runtime, "render-stage", handle.dispose)
        };
      }
    };
  }
  applyInputInterceptors(paneId, text, source) {
    return this.applyInterceptors(this.inputInterceptors, "input", { paneId, text, source });
  }
  applyOutputInterceptors(paneId, text, source) {
    return this.applyInterceptors(this.outputInterceptors, "output", { paneId, text, source });
  }
  runLifecycleHooks(payload) {
    this.runHooks(this.lifecycleHooks, "lifecycle", payload);
  }
  runRenderHooks(payload) {
    this.runHooks(this.renderHooks, "render", payload);
  }
  emitPluginEvent(event, payload) {
    emitPluginEvent(this.pluginListeners, event, payload);
  }
  attachRuntimeDisposer(runtime, kind, dispose) {
    return attachRuntimeDisposer(runtime, kind, dispose);
  }
  addInputInterceptor(pluginId, interceptor, options) {
    return this.registerInterceptor(this.inputInterceptors, pluginId, interceptor, options);
  }
  addOutputInterceptor(pluginId, interceptor, options) {
    return this.registerInterceptor(this.outputInterceptors, pluginId, interceptor, options);
  }
  addLifecycleHook(pluginId, hook, options) {
    return this.registerInterceptor(this.lifecycleHooks, pluginId, hook, options);
  }
  addRenderHook(pluginId, hook, options) {
    return this.registerInterceptor(this.renderHooks, pluginId, hook, options);
  }
  registerInterceptor(bucket, pluginId, interceptor, options) {
    const result = registerPluginInterceptor(bucket, pluginId, interceptor, options, {
      nextId: this.nextInterceptorId,
      nextOrder: this.nextInterceptorOrder
    });
    this.nextInterceptorId = result.nextId;
    this.nextInterceptorOrder = result.nextOrder;
    return result.dispose;
  }
  applyInterceptors(bucket, kind, payload) {
    return applyPluginInterceptors(bucket, kind, payload);
  }
  runHooks(bucket, kind, payload) {
    runPluginHooks(bucket, kind, payload);
  }
  onPluginEvent(event, listener) {
    return onPluginEvent(this.pluginListeners, event, listener);
  }
}

// src/surface/plugins/host.ts
class ResttyPluginHost {
  pluginRuntimes = new Map;
  pluginDiagnostics = new Map;
  dispatcher;
  constructor(deps) {
    this.dispatcher = new ResttyPluginDispatcher(deps);
  }
  async use(plugin, options) {
    if (!plugin || typeof plugin !== "object") {
      throw new Error("Restty plugin must be an object");
    }
    const pluginId = plugin.id?.trim?.() ?? "";
    if (!pluginId) {
      throw new Error("Restty plugin id is required");
    }
    if (typeof plugin.activate !== "function") {
      throw new Error(`Restty plugin ${pluginId} must define activate(context)`);
    }
    if (this.pluginRuntimes.has(pluginId))
      return;
    try {
      assertPluginCompatibility(pluginId, plugin, RESTTY_PLUGIN_API_VERSION2);
    } catch (error) {
      this.pluginDiagnostics.set(pluginId, {
        id: pluginId,
        version: plugin.version?.trim?.() || null,
        apiVersion: Number.isFinite(plugin.apiVersion) ? Number(plugin.apiVersion) : null,
        requires: plugin.requires ?? null,
        active: false,
        activatedAt: null,
        lastError: errorToMessage(error)
      });
      throw error;
    }
    const runtime = {
      plugin: normalizePluginMetadata(plugin, pluginId),
      cleanup: null,
      activatedAt: Date.now(),
      options,
      disposers: []
    };
    this.pluginDiagnostics.set(pluginId, {
      id: pluginId,
      version: runtime.plugin.version?.trim?.() || null,
      apiVersion: Number.isFinite(runtime.plugin.apiVersion) ? Number(runtime.plugin.apiVersion) : null,
      requires: runtime.plugin.requires ?? null,
      active: false,
      activatedAt: null,
      lastError: null
    });
    this.pluginRuntimes.set(pluginId, runtime);
    try {
      const cleanup = await runtime.plugin.activate(this.dispatcher.createPluginContext(runtime), runtime.options);
      runtime.cleanup = normalizePluginCleanup(cleanup);
      runtime.activatedAt = Date.now();
      this.updatePluginDiagnostic(pluginId, {
        active: true,
        activatedAt: runtime.activatedAt,
        lastError: null
      });
      this.emitPluginEvent("plugin:activated", { pluginId });
    } catch (error) {
      this.teardownPluginRuntime(runtime);
      this.pluginRuntimes.delete(pluginId);
      this.updatePluginDiagnostic(pluginId, {
        active: false,
        activatedAt: null,
        lastError: errorToMessage(error)
      });
      throw error;
    }
  }
  async loadPlugins(manifest, registry) {
    const results = [];
    for (let i = 0;i < manifest.length; i += 1) {
      const item = manifest[i];
      const pluginId = item.id?.trim?.() ?? "";
      if (!pluginId) {
        results.push({
          id: "",
          status: "failed",
          error: "Restty plugin manifest entry is missing id"
        });
        continue;
      }
      if (item.enabled === false) {
        results.push({ id: pluginId, status: "skipped", error: null });
        continue;
      }
      const entry = lookupPluginRegistryEntry(registry, pluginId);
      if (!entry) {
        const message = `Restty plugin ${pluginId} was not found in registry`;
        this.setPluginLoadError(pluginId, message);
        results.push({ id: pluginId, status: "missing", error: message });
        continue;
      }
      let plugin;
      try {
        plugin = await resolvePluginRegistryEntry(entry);
      } catch (error) {
        const message = errorToMessage(error);
        this.setPluginLoadError(pluginId, message);
        results.push({ id: pluginId, status: "failed", error: message });
        continue;
      }
      const resolvedId = plugin.id?.trim?.() ?? "";
      if (resolvedId !== pluginId) {
        const message = `Restty plugin registry entry ${pluginId} resolved to id ${resolvedId || "(empty)"}`;
        this.setPluginLoadError(pluginId, message);
        results.push({ id: pluginId, status: "failed", error: message });
        continue;
      }
      try {
        await this.use(plugin, item.options);
        results.push({ id: pluginId, status: "loaded", error: null });
      } catch (error) {
        results.push({
          id: pluginId,
          status: "failed",
          error: errorToMessage(error)
        });
      }
    }
    return results;
  }
  unuse(pluginId) {
    const key = pluginId?.trim?.() ?? "";
    if (!key)
      return false;
    const runtime = this.pluginRuntimes.get(key);
    if (!runtime)
      return false;
    this.pluginRuntimes.delete(key);
    this.teardownPluginRuntime(runtime);
    this.updatePluginDiagnostic(key, {
      active: false,
      activatedAt: null
    });
    this.emitPluginEvent("plugin:deactivated", { pluginId: key });
    return true;
  }
  plugins() {
    return Array.from(this.pluginRuntimes.keys());
  }
  pluginInfo(pluginId) {
    if (typeof pluginId === "string") {
      const key = pluginId.trim();
      if (!key)
        return null;
      return this.buildPluginInfo(key);
    }
    const keys = new Set;
    for (const key of this.pluginDiagnostics.keys())
      keys.add(key);
    for (const key of this.pluginRuntimes.keys())
      keys.add(key);
    return Array.from(keys).sort((a, b) => a.localeCompare(b)).map((key) => this.buildPluginInfo(key)).filter((entry) => entry !== null);
  }
  destroy() {
    const pluginIds = this.plugins();
    for (let i = 0;i < pluginIds.length; i += 1) {
      this.unuse(pluginIds[i]);
    }
  }
  applyInputInterceptors(paneId, text, source) {
    return this.dispatcher.applyInputInterceptors(paneId, text, source);
  }
  applyOutputInterceptors(paneId, text, source) {
    return this.dispatcher.applyOutputInterceptors(paneId, text, source);
  }
  runLifecycleHooks(payload) {
    this.dispatcher.runLifecycleHooks(payload);
  }
  runRenderHooks(payload) {
    this.dispatcher.runRenderHooks(payload);
  }
  emitPluginEvent(event, payload) {
    this.dispatcher.emitPluginEvent(event, payload);
  }
  setPluginLoadError(pluginId, message) {
    setPluginLoadError(this.pluginDiagnostics, pluginId, message);
  }
  updatePluginDiagnostic(pluginId, patch) {
    patchPluginDiagnostic(this.pluginDiagnostics, pluginId, patch);
  }
  buildPluginInfo(pluginId) {
    return buildPluginInfo(pluginId, this.pluginDiagnostics, this.pluginRuntimes);
  }
  teardownPluginRuntime(runtime) {
    teardownPluginRuntime(runtime);
  }
}

// src/surface/restty/controller.ts
var resttyPluginSurfacePassthroughKeys = [
  "panes",
  "pane",
  "activePane",
  "focusedPane",
  "forEachPane",
  "isPtyConnected",
  "setRenderer",
  "setPaused",
  "togglePause",
  "setFontSize",
  "setLigatures",
  "setFontHinting",
  "setFontHintTarget",
  "setFonts",
  "applyTheme",
  "resetTheme",
  "sendInput",
  "sendKeyInput",
  "clearScreen",
  "setColorScheme",
  "getMode",
  "snapshot",
  "restore",
  "connectPty",
  "disconnectPty",
  "setMouseMode",
  "getMouseStatus",
  "copySelectionToClipboard",
  "pasteFromClipboard",
  "selectWordAtClientPoint",
  "setSearchQuery",
  "clearSearch",
  "searchNext",
  "searchPrevious",
  "getSearchState",
  "openSearch",
  "closeSearch",
  "toggleSearch",
  "isSearchOpen",
  "resize",
  "focus",
  "blur",
  "updateSize",
  "getBackend",
  "setShaderStages",
  "getShaderStages",
  "addShaderStage",
  "removeShaderStage",
  "closePane",
  "getPaneStyleOptions",
  "setPaneStyleOptions",
  "getSearchUiStyleOptions",
  "setSearchUiStyleOptions",
  "setActivePane",
  "markPaneFocused",
  "requestLayoutSync",
  "hideContextMenu"
];
function createResttyPluginSurfacePassthroughApi(source) {
  const passthrough = {};
  for (const key of resttyPluginSurfacePassthroughKeys) {
    passthrough[key] = source[key].bind(source);
  }
  return passthrough;
}
function createResttyPluginSurfaceApi(source) {
  const surfaceApi = createResttyPluginSurfacePassthroughApi(source);
  const requirePaneHandle = (id) => {
    const handle = surfaceApi.pane(id);
    if (!handle) {
      throw new Error(`Restty plugin surface could not resolve pane ${id}`);
    }
    return handle;
  };
  return {
    ...surfaceApi,
    createInitialPane: (options) => {
      const pane = source.createInitialPane(options);
      return requirePaneHandle(pane.id);
    },
    splitActivePane: (direction) => {
      const pane = source.splitActivePane(direction);
      return pane ? requirePaneHandle(pane.id) : null;
    },
    splitPane: (id, direction) => {
      const pane = source.splitPane(id, direction);
      return pane ? requirePaneHandle(pane.id) : null;
    }
  };
}

class ResttyController {
  pluginHost;
  lifecycleHooks;
  lifecycleAndPluginHooks;
  paneManagerHooks;
  constructor(deps) {
    this.pluginHost = new ResttyPluginHost(deps);
    this.lifecycleHooks = {
      runLifecycleHooks: (payload) => this.runLifecycleHooks(payload)
    };
    this.lifecycleAndPluginHooks = {
      runLifecycleHooks: (payload) => this.runLifecycleHooks(payload),
      emitPluginEvent: (event, payload) => this.emitPluginEvent(event, payload)
    };
    this.paneManagerHooks = {
      runRenderHooks: (payload) => this.runRenderHooks(payload),
      emitPluginEvent: (event, payload) => this.emitPluginEvent(event, payload)
    };
  }
  async use(plugin, options) {
    await this.pluginHost.use(plugin, options);
  }
  async loadPlugins(manifest, registry) {
    return this.pluginHost.loadPlugins(manifest, registry);
  }
  unuse(pluginId) {
    return this.pluginHost.unuse(pluginId);
  }
  plugins() {
    return this.pluginHost.plugins();
  }
  pluginInfo(pluginId) {
    if (typeof pluginId === "string")
      return this.pluginHost.pluginInfo(pluginId);
    return this.pluginHost.pluginInfo();
  }
  applyInputInterceptors(paneId, text, source) {
    return this.pluginHost.applyInputInterceptors(paneId, text, source);
  }
  applyOutputInterceptors(paneId, text, source) {
    return this.pluginHost.applyOutputInterceptors(paneId, text, source);
  }
  runLifecycleHooks(payload) {
    this.pluginHost.runLifecycleHooks(payload);
  }
  runRenderHooks(payload) {
    this.pluginHost.runRenderHooks(payload);
  }
  emitPluginEvent(event, payload) {
    this.pluginHost.emitPluginEvent(event, payload);
  }
  destroy() {
    this.pluginHost.destroy();
  }
}

// src/surface/restty/plugin-surface.ts
function createResttyPluginSurfaceBridge(restty) {
  return createResttyPluginSurfaceApi(restty);
}

// src/surface/restty/shader-ops.ts
class ResttyShaderOps {
  paneBaseShaderStages = new Map;
  globalShaderStages = new Map;
  nextShaderStageOrder = 1;
  deps;
  constructor(deps, shaderStages) {
    this.deps = deps;
    if (shaderStages?.length) {
      const normalized = sortShaderStages(normalizeShaderStages(shaderStages));
      for (let i = 0;i < normalized.length; i += 1) {
        const stage = normalized[i];
        this.globalShaderStages.set(stage.id, {
          id: stage.id,
          stage,
          order: this.nextShaderStageOrder++,
          ownerPluginId: null
        });
      }
    }
  }
  setShaderStages(stages) {
    this.globalShaderStages.clear();
    const normalized = sortShaderStages(normalizeShaderStages(stages ?? []));
    for (let i = 0;i < normalized.length; i += 1) {
      const stage = normalized[i];
      this.globalShaderStages.set(stage.id, {
        id: stage.id,
        stage,
        order: this.nextShaderStageOrder++,
        ownerPluginId: null
      });
    }
    this.syncPaneShaderStages();
  }
  getShaderStages() {
    return cloneShaderStages(this.listGlobalShaderStages().map((entry) => entry.stage));
  }
  addShaderStage(stage) {
    const normalized = normalizeShaderStage(stage);
    return this.addManagedShaderStage(normalized, null);
  }
  addManagedShaderStage(stage, ownerPluginId) {
    const normalized = normalizeShaderStage(stage);
    this.globalShaderStages.set(normalized.id, {
      id: normalized.id,
      stage: normalized,
      order: this.nextShaderStageOrder++,
      ownerPluginId
    });
    this.syncPaneShaderStages();
    return {
      id: normalized.id,
      setUniforms: (uniforms) => {
        const current = this.globalShaderStages.get(normalized.id);
        if (!current)
          return;
        const next = normalizeShaderStage({
          ...current.stage,
          uniforms
        });
        this.globalShaderStages.set(normalized.id, {
          ...current,
          stage: next
        });
        this.syncPaneShaderStages();
      },
      setEnabled: (value) => {
        const current = this.globalShaderStages.get(normalized.id);
        if (!current)
          return;
        const next = normalizeShaderStage({
          ...current.stage,
          enabled: Boolean(value)
        });
        this.globalShaderStages.set(normalized.id, {
          ...current,
          stage: next
        });
        this.syncPaneShaderStages();
      },
      dispose: () => {
        this.removeShaderStage(normalized.id);
      }
    };
  }
  removeShaderStage(id) {
    const stageId = id?.trim?.() ?? "";
    if (!stageId)
      return false;
    const removed = this.globalShaderStages.delete(stageId);
    if (removed) {
      this.syncPaneShaderStages();
    }
    return removed;
  }
  normalizePaneShaderStages(stages, paneId) {
    if (!stages?.length)
      return [];
    try {
      return sortShaderStages(normalizeShaderStages(stages));
    } catch (error) {
      console.warn(`[restty shader-stage] invalid pane stage config for pane ${paneId}:`, error);
      return [];
    }
  }
  setPaneBaseShaderStages(paneId, stages) {
    this.paneBaseShaderStages.set(paneId, stages);
  }
  removePaneBaseShaderStages(paneId) {
    this.paneBaseShaderStages.delete(paneId);
  }
  buildMergedShaderStages(baseStages) {
    const merged = new Map;
    for (let i = 0;i < baseStages.length; i += 1) {
      const stage = baseStages[i];
      merged.set(stage.id, stage);
    }
    const globals = this.listGlobalShaderStages();
    for (let i = 0;i < globals.length; i += 1) {
      const stage = globals[i].stage;
      if (merged.has(stage.id))
        merged.delete(stage.id);
      merged.set(stage.id, stage);
    }
    return sortShaderStages(Array.from(merged.values()));
  }
  syncPaneShaderStages(paneId) {
    const panes = [];
    if (paneId === undefined) {
      this.deps.forEachPane((pane) => {
        panes.push(pane);
      });
    } else {
      const pane = this.deps.getPaneHandleById(paneId);
      if (pane)
        panes.push(pane);
    }
    for (let i = 0;i < panes.length; i += 1) {
      const pane = panes[i];
      const base = this.paneBaseShaderStages.get(pane.id) ?? [];
      pane.setShaderStages(this.buildMergedShaderStages(base));
    }
  }
  clear() {
    this.globalShaderStages.clear();
    this.paneBaseShaderStages.clear();
  }
  listGlobalShaderStages() {
    return Array.from(this.globalShaderStages.values()).sort((a, b) => a.order - b.order);
  }
}

// src/surface/restty/assembly.ts
function createResttySurfaceAssembly({
  restty,
  forEachPane,
  getPaneHandleById,
  getFonts,
  terminal,
  services,
  events
}) {
  const shaderOps = new ResttyShaderOps({
    forEachPane,
    getPaneHandleById
  });
  const controller = new ResttyController({
    restty: createResttyPluginSurfaceBridge(restty),
    addRenderStage: (stage, ownerPluginId) => shaderOps.addManagedShaderStage(stage, ownerPluginId)
  });
  const paneManagerAssembly = createResttyPaneManagerAssembly({
    shaderOps,
    controller,
    getFonts,
    terminal,
    services,
    events
  });
  return {
    shaderOps,
    controller,
    ...paneManagerAssembly
  };
}

// src/surface/restty/bootstrap.ts
function bootstrapResttySurface({
  restty,
  forEachPane,
  getPaneHandleById,
  getFonts,
  options
}) {
  const { root, session, surface, terminal, services } = options;
  const {
    paneDom,
    autoInit,
    minPaneSize,
    paneStyles,
    searchUi,
    shortcuts,
    contextMenu,
    defaultContextMenu,
    createInitialPane = true,
    events
  } = surface ?? {};
  const {
    shaderOps,
    controller,
    mergedTerminalConfig,
    mergedServicesConfig,
    paneManagerEventHandlers
  } = createResttySurfaceAssembly({
    restty,
    forEachPane,
    getPaneHandleById,
    getFonts,
    terminal,
    services,
    events
  });
  const paneManager = createResttyManagedPaneManager2({
    root,
    session,
    paneDom,
    autoInit,
    minPaneSize,
    paneStyles,
    searchUi,
    shortcuts,
    contextMenu,
    defaultContextMenu,
    terminal: mergedTerminalConfig,
    services: mergedServicesConfig,
    ...paneManagerEventHandlers
  });
  return {
    shaderOps,
    controller,
    paneManager,
    createInitialPane
  };
}

// src/surface/restty/pane-lookup.ts
function createResttyPaneLookup(options) {
  return {
    getPanes: () => options.getPanes(),
    getPaneById: (id) => options.getPaneById(id),
    getActivePane: () => options.getActivePane(),
    getFocusedPane: () => options.getFocusedPane(),
    openPaneSearch: (id, searchOptions) => {
      options.paneManager.openPaneSearch(id, searchOptions);
    },
    closePaneSearch: (id, searchOptions) => {
      options.paneManager.closePaneSearch(id, searchOptions);
    },
    togglePaneSearch: (id, searchOptions) => {
      options.paneManager.togglePaneSearch(id, searchOptions);
    },
    isPaneSearchOpen: (id) => options.paneManager.isPaneSearchOpen(id),
    getSearchUiStyleOptions: () => options.paneManager.getSearchUiStyleOptions(),
    setSearchUiStyleOptions: (searchOptions) => {
      options.paneManager.setSearchUiStyleOptions(searchOptions);
    }
  };
}

// src/surface/restty/pane-handle-ops.ts
function requirePaneById(getPaneById, id) {
  const pane = getPaneById(id);
  if (!pane)
    throw new Error(`Restty pane ${id} does not exist`);
  return pane;
}
function makePaneHandle(lookup, id) {
  return new ResttyPaneHandle2(() => requirePaneById(lookup.getPaneById, id), {
    open: (paneId, options) => {
      lookup.openPaneSearch(paneId, options);
    },
    close: (paneId, options) => {
      lookup.closePaneSearch(paneId, options);
    },
    toggle: (paneId, options) => {
      lookup.togglePaneSearch(paneId, options);
    },
    isOpen: (paneId) => lookup.isPaneSearchOpen(paneId),
    getStyleOptions: () => lookup.getSearchUiStyleOptions(),
    setStyleOptions: (options) => {
      lookup.setSearchUiStyleOptions(options);
    }
  });
}
function requireActivePaneHandle(lookup) {
  const pane = lookup.getActivePane();
  if (!pane) {
    throw new Error("Restty has no active pane. Create or focus a pane first.");
  }
  return makePaneHandle(lookup, pane.id);
}
function panes(lookup) {
  return lookup.getPanes().map((pane) => makePaneHandle(lookup, pane.id));
}
function pane(lookup, id) {
  if (!lookup.getPaneById(id))
    return null;
  return makePaneHandle(lookup, id);
}
function activePane(lookup) {
  const active = lookup.getActivePane();
  if (!active)
    return null;
  return makePaneHandle(lookup, active.id);
}
function focusedPane(lookup) {
  const focused = lookup.getFocusedPane();
  if (!focused)
    return null;
  return makePaneHandle(lookup, focused.id);
}
function forEachPane(lookup, visitor) {
  const all = lookup.getPanes();
  for (let i = 0;i < all.length; i += 1) {
    visitor(makePaneHandle(lookup, all[i].id));
  }
}

// src/surface/restty/pane-command-ops.ts
function createInitialPane(paneManager, hooks, options) {
  hooks.runLifecycleHooks({ phase: "before", action: "create-initial-pane" });
  const pane = paneManager.createInitialPane(options);
  hooks.runLifecycleHooks({
    phase: "after",
    action: "create-initial-pane",
    paneId: pane.id,
    ok: true
  });
  return pane;
}
function splitActivePane(paneManager, lookup, hooks, direction) {
  const sourcePaneId = lookup.getActivePane()?.id ?? null;
  hooks.runLifecycleHooks({
    phase: "before",
    action: "split-active-pane",
    paneId: sourcePaneId,
    direction
  });
  const pane = paneManager.splitActivePane(direction);
  hooks.runLifecycleHooks({
    phase: "after",
    action: "split-active-pane",
    sourcePaneId: sourcePaneId ?? undefined,
    createdPaneId: pane?.id ?? null,
    direction,
    ok: !!pane
  });
  return pane;
}
function splitPane(paneManager, hooks, id, direction) {
  hooks.runLifecycleHooks({
    phase: "before",
    action: "split-pane",
    paneId: id,
    direction
  });
  const pane = paneManager.splitPane(id, direction);
  hooks.runLifecycleHooks({
    phase: "after",
    action: "split-pane",
    sourcePaneId: id,
    createdPaneId: pane?.id ?? null,
    direction,
    ok: !!pane
  });
  return pane;
}
function closePane(paneManager, hooks, id) {
  hooks.runLifecycleHooks({ phase: "before", action: "close-pane", paneId: id });
  const ok = paneManager.closePane(id);
  hooks.runLifecycleHooks({
    phase: "after",
    action: "close-pane",
    paneId: id,
    ok
  });
  return ok;
}
function setActivePane(paneManager, lookup, hooks, id, options) {
  hooks.runLifecycleHooks({
    phase: "before",
    action: "set-active-pane",
    paneId: id
  });
  paneManager.setActivePane(id, options);
  const activePaneId = lookup.getActivePane()?.id ?? null;
  hooks.runLifecycleHooks({
    phase: "after",
    action: "set-active-pane",
    paneId: activePaneId,
    ok: activePaneId === id
  });
}
function markPaneFocused(paneManager, lookup, hooks, id, options) {
  hooks.runLifecycleHooks({
    phase: "before",
    action: "mark-pane-focused",
    paneId: id
  });
  paneManager.markPaneFocused(id, options);
  const focusedPaneId = lookup.getFocusedPane()?.id ?? null;
  hooks.runLifecycleHooks({
    phase: "after",
    action: "mark-pane-focused",
    paneId: focusedPaneId,
    ok: focusedPaneId === id
  });
}
function connectPty(lookup, hooks, url = "") {
  const pane = requireActivePaneHandle(lookup);
  hooks.runLifecycleHooks({
    phase: "before",
    action: "connect-pty",
    paneId: pane.id
  });
  pane.connectPty(url);
  hooks.runLifecycleHooks({
    phase: "after",
    action: "connect-pty",
    paneId: pane.id,
    ok: true
  });
}
function disconnectPty(lookup, hooks) {
  const pane = requireActivePaneHandle(lookup);
  hooks.runLifecycleHooks({
    phase: "before",
    action: "disconnect-pty",
    paneId: pane.id
  });
  pane.disconnectPty();
  hooks.runLifecycleHooks({
    phase: "after",
    action: "disconnect-pty",
    paneId: pane.id,
    ok: true
  });
}
function resize(lookup, hooks, cols, rows) {
  const pane = requireActivePaneHandle(lookup);
  hooks.runLifecycleHooks({
    phase: "before",
    action: "resize",
    paneId: pane.id,
    cols,
    rows
  });
  pane.resize(cols, rows);
  hooks.runLifecycleHooks({
    phase: "after",
    action: "resize",
    paneId: pane.id,
    cols,
    rows,
    ok: true
  });
  hooks.emitPluginEvent("pane:resized", { paneId: pane.id, cols, rows });
}
function focus(lookup, hooks) {
  const pane = requireActivePaneHandle(lookup);
  hooks.runLifecycleHooks({
    phase: "before",
    action: "focus",
    paneId: pane.id
  });
  pane.focus();
  hooks.runLifecycleHooks({
    phase: "after",
    action: "focus",
    paneId: pane.id,
    ok: true
  });
  hooks.emitPluginEvent("pane:focused", { paneId: pane.id });
}
function blur(lookup, hooks) {
  const pane = requireActivePaneHandle(lookup);
  hooks.runLifecycleHooks({
    phase: "before",
    action: "blur",
    paneId: pane.id
  });
  pane.blur();
  hooks.runLifecycleHooks({
    phase: "after",
    action: "blur",
    paneId: pane.id,
    ok: true
  });
  hooks.emitPluginEvent("pane:blurred", { paneId: pane.id });
}
// src/surface/restty/pane-style-ops.ts
function getPaneStyleOptions(paneManager) {
  return paneManager.getStyleOptions();
}
function setPaneStyleOptions(paneManager, options) {
  paneManager.setStyleOptions(options);
}
function getSearchUiStyleOptions(paneManager) {
  return paneManager.getSearchUiStyleOptions();
}
function setSearchUiStyleOptions(paneManager, options) {
  paneManager.setSearchUiStyleOptions(options);
}
// src/surface/restty.ts
class Restty2 extends ResttyActivePaneApi {
  paneManager;
  fonts;
  shaderOps;
  controller;
  paneLookupOps;
  constructor(options) {
    super();
    this.fonts = undefined;
    const { shaderOps, controller, paneManager, createInitialPane } = bootstrapResttySurface({
      restty: this,
      forEachPane: (visitor) => {
        this.forEachPane(visitor);
      },
      getPaneHandleById: (id) => this.pane(id),
      getFonts: () => this.fonts,
      options
    });
    this.shaderOps = shaderOps;
    this.controller = controller;
    this.paneManager = paneManager;
    this.paneLookupOps = createResttyPaneLookup({
      paneManager: this.paneManager,
      getPanes: () => this.getPanes(),
      getPaneById: (id) => this.getPaneById(id),
      getActivePane: () => this.getActivePane(),
      getFocusedPane: () => this.getFocusedPane()
    });
    if (createInitialPane) {
      const focus = typeof createInitialPane === "object" ? createInitialPane.focus ?? true : true;
      this.createInitialPane({ focus });
    }
  }
  getPanes() {
    return this.paneManager.getPanes();
  }
  getPaneById(id) {
    return this.paneManager.getPaneById(id);
  }
  getActivePane() {
    return this.paneManager.getActivePane();
  }
  getFocusedPane() {
    return this.paneManager.getFocusedPane();
  }
  panes() {
    return panes(this.paneLookupOps);
  }
  pane(id) {
    return pane(this.paneLookupOps, id);
  }
  activePane() {
    return activePane(this.paneLookupOps);
  }
  focusedPane() {
    return focusedPane(this.paneLookupOps);
  }
  forEachPane(visitor) {
    forEachPane(this.paneLookupOps, visitor);
  }
  async setFonts(fonts) {
    this.fonts = [...fonts];
    const updates = [];
    this.forEachPane((pane) => {
      updates.push(pane.setFonts(this.fonts ?? []));
    });
    await Promise.all(updates);
  }
  setShaderStages(stages) {
    this.shaderOps.setShaderStages(stages);
  }
  getShaderStages() {
    return this.shaderOps.getShaderStages();
  }
  addShaderStage(stage) {
    return this.shaderOps.addShaderStage(stage);
  }
  removeShaderStage(id) {
    return this.shaderOps.removeShaderStage(id);
  }
  createInitialPane(options) {
    return createInitialPane(this.paneManager, this.controller.lifecycleHooks, options);
  }
  splitActivePane(direction) {
    return splitActivePane(this.paneManager, this.paneLookupOps, this.controller.lifecycleHooks, direction);
  }
  splitPane(id, direction) {
    return splitPane(this.paneManager, this.controller.lifecycleHooks, id, direction);
  }
  closePane(id) {
    return closePane(this.paneManager, this.controller.lifecycleHooks, id);
  }
  getPaneStyleOptions() {
    return getPaneStyleOptions(this.paneManager);
  }
  setPaneStyleOptions(options) {
    setPaneStyleOptions(this.paneManager, options);
  }
  getSearchUiStyleOptions() {
    return getSearchUiStyleOptions(this.paneManager);
  }
  setSearchUiStyleOptions(options) {
    setSearchUiStyleOptions(this.paneManager, options);
  }
  setActivePane(id, options) {
    setActivePane(this.paneManager, this.paneLookupOps, this.controller.lifecycleHooks, id, options);
  }
  markPaneFocused(id, options) {
    markPaneFocused(this.paneManager, this.paneLookupOps, this.controller.lifecycleHooks, id, options);
  }
  requestLayoutSync() {
    this.paneManager.requestLayoutSync();
  }
  hideContextMenu() {
    this.paneManager.hideContextMenu();
  }
  async use(plugin, options) {
    await this.controller.use(plugin, options);
  }
  async loadPlugins(manifest, registry) {
    return this.controller.loadPlugins(manifest, registry);
  }
  unuse(pluginId) {
    return this.controller.unuse(pluginId);
  }
  plugins() {
    return this.controller.plugins();
  }
  pluginInfo(pluginId) {
    if (typeof pluginId === "string")
      return this.controller.pluginInfo(pluginId);
    return this.controller.pluginInfo();
  }
  destroy() {
    this.controller.destroy();
    this.shaderOps.clear();
    this.paneManager.destroy();
  }
  connectPty(url = "") {
    connectPty(this.paneLookupOps, this.controller.lifecycleHooks, url);
  }
  disconnectPty() {
    disconnectPty(this.paneLookupOps, this.controller.lifecycleHooks);
  }
  resize(cols, rows) {
    resize(this.paneLookupOps, this.controller.lifecycleAndPluginHooks, cols, rows);
  }
  focus() {
    focus(this.paneLookupOps, this.controller.lifecycleAndPluginHooks);
  }
  blur() {
    blur(this.paneLookupOps, this.controller.lifecycleAndPluginHooks);
  }
  requireActivePaneHandle() {
    return requireActivePaneHandle(this.paneLookupOps);
  }
}
function createRestty2(options) {
  return new Restty2(options);
}

export { RESTTY_PLUGIN_API_VERSION2, ResttyPaneHandle2, Restty2, createRestty2 };
