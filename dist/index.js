var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// dist/_snowpack/env.js
var env_exports = {};
__export(env_exports, {
  MODE: () => MODE,
  NODE_ENV: () => NODE_ENV,
  SSR: () => SSR
});
var MODE = "production";
var NODE_ENV = "production";
var SSR = false;

// dist/_snowpack/pkg/common/index-c3738bcf.js
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function custom_event(type, detail, {bubbles = false, cancelable = false} = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, {cancelable = false} = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, {cancelable});
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var seen_callbacks = new Set();
var flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = {$$scope: 1};
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const {fragment, on_mount, on_destroy: on_destroy2, after_update} = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy2) {
        on_destroy2.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance3, create_fragment3, not_equal2, props, append_styles2, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal: not_equal2,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance3 ? instance3(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment3 ? create_fragment3($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// dist/_snowpack/pkg/svelte-navigator.js
var isUndefined = (value) => typeof value === "undefined";
var isFunction = (value) => typeof value === "function";
var isNumber = (value) => typeof value === "number";
function shouldNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function createCounter() {
  let i = 0;
  return () => i++;
}
function createGlobalId() {
  return Math.random().toString(36).substring(2);
}
var isSSR = typeof window === "undefined";
function addListener(target, type, handler) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update2, subscribe: subscribe2};
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
var createKey = (ctxName) => `@@svnav-ctx__${ctxName}`;
var LOCATION = createKey("LOCATION");
var ROUTER = createKey("ROUTER");
var ROUTE = createKey("ROUTE");
var ROUTE_PARAMS = createKey("ROUTE_PARAMS");
var FOCUS_ELEM = createKey("FOCUS_ELEM");
var paramRegex = /^:(.+)/;
var startsWith = (string, search) => string.substr(0, search.length) === search;
var isRootSegment = (segment) => segment === "";
var isDynamic = (segment) => paramRegex.test(segment);
var isSplat = (segment) => segment[0] === "*";
var stripSplat = (str) => str.replace(/\*.*$/, "");
var stripSlashes = (str) => str.replace(/(^\/+|\/+$)/g, "");
function segmentize(uri, filterFalsy = false) {
  const segments = stripSlashes(uri).split("/");
  return filterFalsy ? segments.filter(Boolean) : segments;
}
var addQuery = (pathname, query2) => pathname + (query2 ? `?${query2}` : "");
var normalizePath = (path) => `/${stripSlashes(path)}`;
function join(...pathFragments) {
  const joinFragment = (fragment) => segmentize(fragment, true).join("/");
  const joinedSegments = pathFragments.map(joinFragment).join("/");
  return normalizePath(joinedSegments);
}
var LINK_ID = 1;
var ROUTE_ID = 2;
var ROUTER_ID = 3;
var USE_FOCUS_ID = 4;
var USE_LOCATION_ID = 5;
var USE_MATCH_ID = 6;
var USE_NAVIGATE_ID = 7;
var USE_PARAMS_ID = 8;
var USE_RESOLVABLE_ID = 9;
var USE_RESOLVE_ID = 10;
var NAVIGATE_ID = 11;
var labels = {
  [LINK_ID]: "Link",
  [ROUTE_ID]: "Route",
  [ROUTER_ID]: "Router",
  [USE_FOCUS_ID]: "useFocus",
  [USE_LOCATION_ID]: "useLocation",
  [USE_MATCH_ID]: "useMatch",
  [USE_NAVIGATE_ID]: "useNavigate",
  [USE_PARAMS_ID]: "useParams",
  [USE_RESOLVABLE_ID]: "useResolvable",
  [USE_RESOLVE_ID]: "useResolve",
  [NAVIGATE_ID]: "navigate"
};
var createLabel = (labelId) => labels[labelId];
function createIdentifier(labelId, props) {
  let attr2;
  if (labelId === ROUTE_ID) {
    attr2 = props.path ? `path="${props.path}"` : "default";
  } else if (labelId === LINK_ID) {
    attr2 = `to="${props.to}"`;
  } else if (labelId === ROUTER_ID) {
    attr2 = `basepath="${props.basepath || ""}"`;
  }
  return `<${createLabel(labelId)} ${attr2 || ""} />`;
}
function createMessage(labelId, message, props, originId) {
  const origin = props && createIdentifier(originId || labelId, props);
  const originMsg = origin ? `

Occurred in: ${origin}` : "";
  const label = createLabel(labelId);
  const msg = isFunction(message) ? message(label) : message;
  return `<${label}> ${msg}${originMsg}`;
}
var createMessageHandler = (handler) => (...args) => handler(createMessage(...args));
var fail = createMessageHandler((message) => {
  throw new Error(message);
});
var warn = createMessageHandler(console.warn);
var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;
function rankRoute(route, index) {
  const score = route.default ? 0 : segmentize(route.fullPath).reduce((acc, segment) => {
    let nextScore = acc;
    nextScore += SEGMENT_POINTS;
    if (isRootSegment(segment)) {
      nextScore += ROOT_POINTS;
    } else if (isDynamic(segment)) {
      nextScore += DYNAMIC_POINTS;
    } else if (isSplat(segment)) {
      nextScore -= SEGMENT_POINTS + SPLAT_PENALTY;
    } else {
      nextScore += STATIC_POINTS;
    }
    return nextScore;
  }, 0);
  return {route, score, index};
}
function rankRoutes(routes) {
  return routes.map(rankRoute).sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return a.index - b.index;
  });
}
function pick(routes, uri) {
  let bestMatch;
  let defaultMatch;
  const [uriPathname] = uri.split("?");
  const uriSegments = segmentize(uriPathname);
  const isRootUri = uriSegments[0] === "";
  const ranked = rankRoutes(routes);
  for (let i = 0, l = ranked.length; i < l; i++) {
    const {route} = ranked[i];
    let missed = false;
    const params = {};
    const createMatch = (uri2) => ({...route, params, uri: uri2});
    if (route.default) {
      defaultMatch = createMatch(uri);
      continue;
    }
    const routeSegments = segmentize(route.fullPath);
    const max = Math.max(uriSegments.length, routeSegments.length);
    let index = 0;
    for (; index < max; index++) {
      const routeSegment = routeSegments[index];
      const uriSegment = uriSegments[index];
      if (!isUndefined(routeSegment) && isSplat(routeSegment)) {
        const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);
        params[splatName] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }
      if (isUndefined(uriSegment)) {
        missed = true;
        break;
      }
      const dynamicMatch = paramRegex.exec(routeSegment);
      if (dynamicMatch && !isRootUri) {
        const value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        missed = true;
        break;
      }
    }
    if (!missed) {
      bestMatch = createMatch(join(...uriSegments.slice(0, index)));
      break;
    }
  }
  return bestMatch || defaultMatch || null;
}
function match(route, uri) {
  return pick([route], uri);
}
function resolve(to, base) {
  if (startsWith(to, "/")) {
    return to;
  }
  const [toPathname, toQuery] = to.split("?");
  const [basePathname] = base.split("?");
  const toSegments = segmentize(toPathname);
  const baseSegments = segmentize(basePathname);
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }
  if (!startsWith(toSegments[0], ".")) {
    const pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }
  const allSegments = baseSegments.concat(toSegments);
  const segments = [];
  allSegments.forEach((segment) => {
    if (segment === "..") {
      segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return addQuery(`/${segments.join("/")}`, toQuery);
}
function normalizeLocation(location, basepath) {
  const {pathname, hash = "", search = "", state} = location;
  const baseSegments = segmentize(basepath, true);
  const pathSegments = segmentize(pathname, true);
  while (baseSegments.length) {
    if (baseSegments[0] !== pathSegments[0]) {
      fail(ROUTER_ID, `Invalid state: All locations must begin with the basepath "${basepath}", found "${pathname}"`);
    }
    baseSegments.shift();
    pathSegments.shift();
  }
  return {
    pathname: join(...pathSegments),
    hash,
    search,
    state
  };
}
var normalizeUrlFragment = (frag) => frag.length === 1 ? "" : frag;
function createLocation(url) {
  const searchIndex = url.indexOf("?");
  const hashIndex = url.indexOf("#");
  const hasSearchIndex = searchIndex !== -1;
  const hasHashIndex = hashIndex !== -1;
  const hash = hasHashIndex ? normalizeUrlFragment(url.substr(hashIndex)) : "";
  const pathnameAndSearch = hasHashIndex ? url.substr(0, hashIndex) : url;
  const search = hasSearchIndex ? normalizeUrlFragment(pathnameAndSearch.substr(searchIndex)) : "";
  const pathname = hasSearchIndex ? pathnameAndSearch.substr(0, searchIndex) : pathnameAndSearch;
  return {pathname, search, hash};
}
function resolveLink(path, routeBase, appBase) {
  return join(appBase, resolve(path, routeBase));
}
function extractBaseUri(routePath, pathname) {
  const fullPath = normalizePath(stripSplat(routePath));
  const baseSegments = segmentize(fullPath, true);
  const pathSegments = segmentize(pathname, true).slice(0, baseSegments.length);
  const routeMatch = match({fullPath}, join(...pathSegments));
  return routeMatch && routeMatch.uri;
}
var POP = "POP";
var PUSH = "PUSH";
var REPLACE = "REPLACE";
function getLocation(source) {
  return {
    ...source.location,
    pathname: encodeURI(decodeURI(source.location.pathname)),
    state: source.history.state,
    _key: source.history.state && source.history.state._key || "initial"
  };
}
function createHistory(source) {
  let listeners = [];
  let location = getLocation(source);
  let action = POP;
  const notifyListeners = (listenerFns = listeners) => listenerFns.forEach((listener) => listener({location, action}));
  return {
    get location() {
      return location;
    },
    listen(listener) {
      listeners.push(listener);
      const popstateListener = () => {
        location = getLocation(source);
        action = POP;
        notifyListeners([listener]);
      };
      notifyListeners([listener]);
      const unlisten = addListener(source, "popstate", popstateListener);
      return () => {
        unlisten();
        listeners = listeners.filter((fn) => fn !== listener);
      };
    },
    navigate(to, options) {
      const {state = {}, replace = false} = options || {};
      action = replace ? REPLACE : PUSH;
      if (isNumber(to)) {
        if (options) {
          warn(NAVIGATE_ID, "Navigation options (state or replace) are not supported, when passing a number as the first argument to navigate. They are ignored.");
        }
        action = POP;
        source.history.go(to);
      } else {
        const keyedState = {...state, _key: createGlobalId()};
        try {
          source.history[replace ? "replaceState" : "pushState"](keyedState, "", to);
        } catch (e) {
          source.location[replace ? "replace" : "assign"](to);
        }
      }
      location = getLocation(source);
      notifyListeners();
    }
  };
}
function createStackFrame(state, uri) {
  return {...createLocation(uri), state};
}
function createMemorySource(initialPathname = "/") {
  let index = 0;
  let stack = [createStackFrame(null, initialPathname)];
  return {
    get entries() {
      return stack;
    },
    get location() {
      return stack[index];
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    history: {
      get state() {
        return stack[index].state;
      },
      pushState(state, title, uri) {
        index++;
        stack = stack.slice(0, index);
        stack.push(createStackFrame(state, uri));
      },
      replaceState(state, title, uri) {
        stack[index] = createStackFrame(state, uri);
      },
      go(to) {
        const newIndex = index + to;
        if (newIndex < 0 || newIndex > stack.length - 1) {
          return;
        }
        index = newIndex;
      }
    }
  };
}
var canUseDOM = !!(!isSSR && window.document && window.document.createElement);
var isEmbeddedPage = !isSSR && window.location.origin === "null";
var globalHistory = createHistory(canUseDOM && !isEmbeddedPage ? window : createMemorySource());
var focusCandidate = null;
var initialNavigation = true;
function isAbove(routerIdA, routerIdB) {
  const routerMarkers = document.querySelectorAll("[data-svnav-router]");
  for (let i = 0; i < routerMarkers.length; i++) {
    const node = routerMarkers[i];
    const currentId = Number(node.dataset.svnavRouter);
    if (currentId === routerIdA)
      return true;
    if (currentId === routerIdB)
      return false;
  }
  return false;
}
function pushFocusCandidate(item) {
  if (!focusCandidate || item.level > focusCandidate.level || item.level === focusCandidate.level && isAbove(item.routerId, focusCandidate.routerId)) {
    focusCandidate = item;
  }
}
function clearFocusCandidate() {
  focusCandidate = null;
}
function initialNavigationOccurred() {
  initialNavigation = false;
}
function focus(elem) {
  if (!elem)
    return false;
  const TABINDEX = "tabindex";
  try {
    if (!elem.hasAttribute(TABINDEX)) {
      elem.setAttribute(TABINDEX, "-1");
      let unlisten;
      const blurListener = () => {
        elem.removeAttribute(TABINDEX);
        unlisten();
      };
      unlisten = addListener(elem, "blur", blurListener);
    }
    elem.focus();
    return document.activeElement === elem;
  } catch (e) {
    return false;
  }
}
function isEndMarker(elem, id) {
  return Number(elem.dataset.svnavRouteEnd) === id;
}
function isHeading(elem) {
  return /^H[1-6]$/i.test(elem.tagName);
}
function query(selector, parent = document) {
  return parent.querySelector(selector);
}
function queryHeading(id) {
  const marker = query(`[data-svnav-route-start="${id}"]`);
  let current = marker.nextElementSibling;
  while (!isEndMarker(current, id)) {
    if (isHeading(current)) {
      return current;
    }
    const heading = query("h1,h2,h3,h4,h5,h6", current);
    if (heading) {
      return heading;
    }
    current = current.nextElementSibling;
  }
  return null;
}
function handleFocus(route) {
  Promise.resolve(get_store_value(route.focusElement)).then((elem) => {
    const focusElement = elem || queryHeading(route.id);
    if (!focusElement) {
      warn(ROUTER_ID, `Could not find an element to focus. You should always render a header for accessibility reasons, or set a custom focus element via the "useFocus" hook. If you don't want this Route or Router to manage focus, pass "primary={false}" to it.`, route, ROUTE_ID);
    }
    const headingFocused = focus(focusElement);
    if (headingFocused)
      return;
    focus(document.documentElement);
  });
}
var createTriggerFocus = (a11yConfig, announcementText, location) => (manageFocus, announceNavigation) => tick().then(() => {
  if (!focusCandidate || initialNavigation) {
    initialNavigationOccurred();
    return;
  }
  if (manageFocus) {
    handleFocus(focusCandidate.route);
  }
  if (a11yConfig.announcements && announceNavigation) {
    const {path, fullPath, meta, params, uri} = focusCandidate.route;
    const announcementMessage = a11yConfig.createAnnouncement({path, fullPath, meta, params, uri}, get_store_value(location));
    Promise.resolve(announcementMessage).then((message) => {
      announcementText.set(message);
    });
  }
  clearFocusCandidate();
});
var visuallyHiddenStyle = "position:fixed;top:-1px;left:0;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
function create_if_block(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(ctx[0]);
      attr(div, "role", "status");
      attr(div, "aria-atomic", "true");
      attr(div, "aria-live", "polite");
      attr(div, "style", visuallyHiddenStyle);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 1)
        set_data(t, ctx2[0]);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let t0;
  let t1;
  let if_block_anchor;
  let current;
  const default_slot_template = ctx[20].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[19], null);
  let if_block = ctx[2] && ctx[4] && ctx[1].announcements && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      t0 = space();
      if (default_slot)
        default_slot.c();
      t1 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      set_style(div, "display", "none");
      attr(div, "aria-hidden", "true");
      attr(div, "data-svnav-router", ctx[3]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      insert(target, t0, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      insert(target, t1, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & 524288)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[19], !current ? get_all_dirty_from_scope(ctx2[19]) : get_slot_changes(default_slot_template, ctx2[19], dirty, null), null);
        }
      }
      if (ctx2[2] && ctx2[4] && ctx2[1].announcements)
        if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching)
        detach(t0);
      if (default_slot)
        default_slot.d(detaching);
      if (detaching)
        detach(t1);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
var createId = createCounter();
var defaultBasepath = "/";
function instance($$self, $$props, $$invalidate) {
  let $location;
  let $activeRoute;
  let $prevLocation;
  let $routes;
  let $announcementText;
  let {$$slots: slots = {}, $$scope} = $$props;
  let {basepath = defaultBasepath} = $$props;
  let {url = null} = $$props;
  let {history = globalHistory} = $$props;
  let {primary = true} = $$props;
  let {a11y = {}} = $$props;
  const a11yConfig = {
    createAnnouncement: (route) => `Navigated to ${route.uri}`,
    announcements: true,
    ...a11y
  };
  const initialBasepath = basepath;
  const normalizedBasepath = normalizePath(basepath);
  const locationContext = getContext(LOCATION);
  const routerContext = getContext(ROUTER);
  const isTopLevelRouter = !locationContext;
  const routerId = createId();
  const manageFocus = primary && !(routerContext && !routerContext.manageFocus);
  const announcementText = writable("");
  component_subscribe($$self, announcementText, (value) => $$invalidate(0, $announcementText = value));
  const routes = writable([]);
  component_subscribe($$self, routes, (value) => $$invalidate(18, $routes = value));
  const activeRoute = writable(null);
  component_subscribe($$self, activeRoute, (value) => $$invalidate(16, $activeRoute = value));
  let hasActiveRoute = false;
  const level = isTopLevelRouter ? 0 : routerContext.level + 1;
  const getInitialLocation = () => normalizeLocation(isSSR ? createLocation(url) : history.location, normalizedBasepath);
  const location = isTopLevelRouter ? writable(getInitialLocation()) : locationContext;
  component_subscribe($$self, location, (value) => $$invalidate(15, $location = value));
  const prevLocation = writable($location);
  component_subscribe($$self, prevLocation, (value) => $$invalidate(17, $prevLocation = value));
  const triggerFocus = createTriggerFocus(a11yConfig, announcementText, location);
  const createRouteFilter = (routeId) => (routeList) => routeList.filter((routeItem) => routeItem.id !== routeId);
  function registerRoute(route) {
    if (isSSR) {
      if (hasActiveRoute) {
        return;
      }
      const matchingRoute = match(route, $location.pathname);
      if (matchingRoute) {
        hasActiveRoute = true;
        return matchingRoute;
      }
    } else {
      routes.update((prevRoutes) => {
        const nextRoutes = createRouteFilter(route.id)(prevRoutes);
        nextRoutes.push(route);
        return nextRoutes;
      });
    }
  }
  function unregisterRoute(routeId) {
    routes.update(createRouteFilter(routeId));
  }
  if (!isTopLevelRouter && basepath !== defaultBasepath) {
    warn(ROUTER_ID, 'Only top-level Routers can have a "basepath" prop. It is ignored.', {basepath});
  }
  if (isTopLevelRouter) {
    onMount(() => {
      const unlisten = history.listen((changedHistory) => {
        const normalizedLocation = normalizeLocation(changedHistory.location, normalizedBasepath);
        prevLocation.set($location);
        location.set(normalizedLocation);
      });
      return unlisten;
    });
    setContext(LOCATION, location);
  }
  setContext(ROUTER, {
    activeRoute,
    registerRoute,
    unregisterRoute,
    manageFocus,
    level,
    id: routerId,
    history: isTopLevelRouter ? history : routerContext.history,
    basepath: isTopLevelRouter ? normalizedBasepath : routerContext.basepath
  });
  $$self.$$set = ($$props2) => {
    if ("basepath" in $$props2)
      $$invalidate(10, basepath = $$props2.basepath);
    if ("url" in $$props2)
      $$invalidate(11, url = $$props2.url);
    if ("history" in $$props2)
      $$invalidate(12, history = $$props2.history);
    if ("primary" in $$props2)
      $$invalidate(13, primary = $$props2.primary);
    if ("a11y" in $$props2)
      $$invalidate(14, a11y = $$props2.a11y);
    if ("$$scope" in $$props2)
      $$invalidate(19, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 1024) {
      if (basepath !== initialBasepath) {
        warn(ROUTER_ID, 'You cannot change the "basepath" prop. It is ignored.');
      }
    }
    if ($$self.$$.dirty[0] & 294912) {
      {
        const bestMatch = pick($routes, $location.pathname);
        activeRoute.set(bestMatch);
      }
    }
    if ($$self.$$.dirty[0] & 163840) {
      {
        if (isTopLevelRouter) {
          const hasHash = !!$location.hash;
          const shouldManageFocus = !hasHash && manageFocus;
          const announceNavigation = !hasHash || $location.pathname !== $prevLocation.pathname;
          triggerFocus(shouldManageFocus, announceNavigation);
        }
      }
    }
    if ($$self.$$.dirty[0] & 65536) {
      if (manageFocus && $activeRoute && $activeRoute.primary) {
        pushFocusCandidate({level, routerId, route: $activeRoute});
      }
    }
  };
  return [
    $announcementText,
    a11yConfig,
    isTopLevelRouter,
    routerId,
    manageFocus,
    announcementText,
    routes,
    activeRoute,
    location,
    prevLocation,
    basepath,
    url,
    history,
    primary,
    a11y,
    $location,
    $activeRoute,
    $prevLocation,
    $routes,
    $$scope,
    slots
  ];
}
var Router = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      basepath: 10,
      url: 11,
      history: 12,
      primary: 13,
      a11y: 14
    }, null, [-1, -1]);
  }
};
function usePreflightCheck(componentId, props, ctxKey = ROUTER, ctxProviderId = ROUTER_ID) {
  const ctx = getContext(ctxKey);
  if (!ctx) {
    fail(componentId, (label) => `You cannot use ${label} outside of a ${createLabel(ctxProviderId)}.`, props);
  }
}
var toReadonly = (ctx) => {
  const {subscribe: subscribe2} = getContext(ctx);
  return {subscribe: subscribe2};
};
function useLocation() {
  usePreflightCheck(USE_LOCATION_ID);
  return toReadonly(LOCATION);
}
function useHistory() {
  const {history} = getContext(ROUTER);
  return history;
}
function useRouteBase() {
  const route = getContext(ROUTE);
  return route ? derived(route, (_route) => _route.base) : writable("/");
}
function useResolve() {
  usePreflightCheck(USE_RESOLVE_ID);
  const routeBase = useRouteBase();
  const {basepath: appBase} = getContext(ROUTER);
  const resolve2 = (path) => resolveLink(path, get_store_value(routeBase), appBase);
  return resolve2;
}
function useNavigate() {
  usePreflightCheck(USE_NAVIGATE_ID);
  const resolve2 = useResolve();
  const {navigate} = useHistory();
  const navigateRelative = (to, options) => {
    const target = isNumber(to) ? to : resolve2(to);
    return navigate(target, options);
  };
  return navigateRelative;
}
var get_default_slot_changes = (dirty) => ({
  params: dirty & 16,
  location: dirty & 8
});
var get_default_slot_context = (ctx) => ({
  params: isSSR ? get_store_value(ctx[9]) : ctx[4],
  location: ctx[3],
  navigate: ctx[10]
});
function create_if_block$1(ctx) {
  let router;
  let current;
  router = new Router({
    props: {
      primary: ctx[1],
      $$slots: {default: [create_default_slot]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(router.$$.fragment);
    },
    m(target, anchor) {
      mount_component(router, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const router_changes = {};
      if (dirty & 2)
        router_changes.primary = ctx2[1];
      if (dirty & 264217) {
        router_changes.$$scope = {dirty, ctx: ctx2};
      }
      router.$set(router_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(router.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(router.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(router, detaching);
    }
  };
}
function create_else_block(ctx) {
  let current;
  const default_slot_template = ctx[17].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[18], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 262168)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[18], !current ? get_all_dirty_from_scope(ctx2[18]) : get_slot_changes(default_slot_template, ctx2[18], dirty, get_default_slot_changes), get_default_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    {location: ctx[3]},
    {navigate: ctx[10]},
    isSSR ? get_store_value(ctx[9]) : ctx[4],
    ctx[11]
  ];
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {props: switch_instance_props};
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 3608 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 8 && {location: ctx2[3]},
        dirty & 1024 && {navigate: ctx2[10]},
        dirty & 528 && get_spread_object(isSSR ? get_store_value(ctx2[9]) : ctx2[4]),
        dirty & 2048 && get_spread_object(ctx2[11])
      ]) : {};
      if (switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0] !== null)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment$1(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  let current;
  let if_block = ctx[2] && create_if_block$1(ctx);
  return {
    c() {
      div0 = element("div");
      t0 = space();
      if (if_block)
        if_block.c();
      t1 = space();
      div1 = element("div");
      set_style(div0, "display", "none");
      attr(div0, "aria-hidden", "true");
      attr(div0, "data-svnav-route-start", ctx[5]);
      set_style(div1, "display", "none");
      attr(div1, "aria-hidden", "true");
      attr(div1, "data-svnav-route-end", ctx[5]);
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      insert(target, t0, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t1.parentNode, t1);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t0);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
var createId$1 = createCounter();
function instance$1($$self, $$props, $$invalidate) {
  let isActive;
  const omit_props_names = ["path", "component", "meta", "primary"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $activeRoute;
  let $location;
  let $parentBase;
  let $params;
  let {$$slots: slots = {}, $$scope} = $$props;
  let {path = ""} = $$props;
  let {component = null} = $$props;
  let {meta = {}} = $$props;
  let {primary = true} = $$props;
  usePreflightCheck(ROUTE_ID, $$props);
  const id = createId$1();
  const {registerRoute, unregisterRoute, activeRoute} = getContext(ROUTER);
  component_subscribe($$self, activeRoute, (value) => $$invalidate(15, $activeRoute = value));
  const parentBase = useRouteBase();
  component_subscribe($$self, parentBase, (value) => $$invalidate(16, $parentBase = value));
  const location = useLocation();
  component_subscribe($$self, location, (value) => $$invalidate(3, $location = value));
  const focusElement = writable(null);
  let ssrMatch;
  const route = writable();
  const params = writable({});
  component_subscribe($$self, params, (value) => $$invalidate(4, $params = value));
  setContext(ROUTE, route);
  setContext(ROUTE_PARAMS, params);
  setContext(FOCUS_ELEM, focusElement);
  const navigate = useNavigate();
  if (!isSSR) {
    onDestroy(() => unregisterRoute(id));
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(23, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    $$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("path" in $$new_props)
      $$invalidate(12, path = $$new_props.path);
    if ("component" in $$new_props)
      $$invalidate(0, component = $$new_props.component);
    if ("meta" in $$new_props)
      $$invalidate(13, meta = $$new_props.meta);
    if ("primary" in $$new_props)
      $$invalidate(1, primary = $$new_props.primary);
    if ("$$scope" in $$new_props)
      $$invalidate(18, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 77834) {
      {
        const isDefault = path === "";
        const rawBase = join($parentBase, path);
        const updatedRoute = {
          id,
          path,
          meta,
          default: isDefault,
          fullPath: isDefault ? "" : rawBase,
          base: isDefault ? $parentBase : extractBaseUri(rawBase, $location.pathname),
          primary,
          focusElement
        };
        route.set(updatedRoute);
        $$invalidate(14, ssrMatch = registerRoute(updatedRoute));
      }
    }
    if ($$self.$$.dirty & 49152) {
      $$invalidate(2, isActive = !!(ssrMatch || $activeRoute && $activeRoute.id === id));
    }
    if ($$self.$$.dirty & 49156) {
      if (isActive) {
        const {params: activeParams} = ssrMatch || $activeRoute;
        params.set(activeParams);
      }
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    component,
    primary,
    isActive,
    $location,
    $params,
    id,
    activeRoute,
    parentBase,
    location,
    params,
    navigate,
    $$restProps,
    path,
    meta,
    ssrMatch,
    $activeRoute,
    $parentBase,
    slots,
    $$scope
  ];
}
var Route = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      path: 12,
      component: 0,
      meta: 13,
      primary: 1
    });
  }
};
function create_fragment$2(ctx) {
  let a;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[13].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], null);
  let a_levels = [{href: ctx[0]}, ctx[2], ctx[1]];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if (default_slot)
        default_slot.c();
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (default_slot) {
        default_slot.m(a, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(a, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4096)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[12], !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(default_slot_template, ctx2[12], dirty, null), null);
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        (!current || dirty & 1) && {href: ctx2[0]},
        dirty & 4 && ctx2[2],
        dirty & 2 && ctx2[1]
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let href;
  let isPartiallyCurrent;
  let isCurrent;
  let ariaCurrent;
  let props;
  const omit_props_names = ["to", "replace", "state", "getProps"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $location;
  let {$$slots: slots = {}, $$scope} = $$props;
  let {to} = $$props;
  let {replace = false} = $$props;
  let {state = {}} = $$props;
  let {getProps = null} = $$props;
  usePreflightCheck(LINK_ID, $$props);
  const location = useLocation();
  component_subscribe($$self, location, (value) => $$invalidate(11, $location = value));
  const dispatch = createEventDispatcher();
  const resolve2 = useResolve();
  const {navigate} = useHistory();
  function onClick(event) {
    dispatch("click", event);
    if (shouldNavigate(event)) {
      event.preventDefault();
      const shouldReplace = isCurrent || replace;
      navigate(href, {state, replace: shouldReplace});
    }
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    $$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("to" in $$new_props)
      $$invalidate(5, to = $$new_props.to);
    if ("replace" in $$new_props)
      $$invalidate(6, replace = $$new_props.replace);
    if ("state" in $$new_props)
      $$invalidate(7, state = $$new_props.state);
    if ("getProps" in $$new_props)
      $$invalidate(8, getProps = $$new_props.getProps);
    if ("$$scope" in $$new_props)
      $$invalidate(12, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2080) {
      $$invalidate(0, href = resolve2(to, $location));
    }
    if ($$self.$$.dirty & 2049) {
      $$invalidate(10, isPartiallyCurrent = startsWith($location.pathname, href));
    }
    if ($$self.$$.dirty & 2049) {
      $$invalidate(9, isCurrent = href === $location.pathname);
    }
    if ($$self.$$.dirty & 512) {
      $$invalidate(2, ariaCurrent = isCurrent ? {"aria-current": "page"} : {});
    }
    $$invalidate(1, props = (() => {
      if (isFunction(getProps)) {
        const dynamicProps = getProps({
          location: $location,
          href,
          isPartiallyCurrent,
          isCurrent
        });
        return {...$$restProps, ...dynamicProps};
      }
      return $$restProps;
    })());
  };
  $$props = exclude_internal_props($$props);
  return [
    href,
    props,
    ariaCurrent,
    location,
    onClick,
    to,
    replace,
    state,
    getProps,
    isCurrent,
    isPartiallyCurrent,
    $location,
    $$scope,
    slots
  ];
}
var Link = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {to: 5, replace: 6, state: 7, getProps: 8});
  }
};

// dist/@password-generator/core/src/lib/generate-random-number.js
var generateRandomNumber = ({
  min,
  max
}) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// dist/@password-generator/core/src/generate-random-password.js
var generatePassword = ({
  length = 20
}) => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const symbols = [
    "[",
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "]"
  ];
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  let password = [];
  const random = [symbols, numbers, alphabet];
  for (let i = 0; length >= i; i++) {
    const randomCharArray = random[generateRandomNumber({
      min: 0,
      max: random.length - 1
    })];
    const randomChar = randomCharArray[generateRandomNumber({
      min: 0,
      max: randomCharArray.length - 1
    })];
    const charIsFromAlphabet = alphabet.includes(randomChar);
    if (charIsFromAlphabet) {
      const RNG = generateRandomNumber({
        min: 0,
        max: 1
      });
      if (!!RNG) {
        password.push(randomChar.toUpperCase());
      } else {
        password.push(randomChar.toLowerCase());
      }
    } else {
      password.push(randomChar);
    }
  }
  return password.join("");
};

// dist/dist/app.svelte.js
function create_default_slot_6(ctx) {
  let t;
  return {
    c() {
      t = text("Home");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("About");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("Blog");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<p>hello home</p>`;
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_default_slot_2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<p>hello blog</p>`;
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_default_slot_1(ctx) {
  let route;
  let current;
  route = new Route({
    props: {
      path: "/",
      $$slots: {default: [create_default_slot_2]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(route.$$.fragment);
    },
    m(target, anchor) {
      mount_component(route, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const route_changes = {};
      if (dirty & 1) {
        route_changes.$$scope = {dirty, ctx: ctx2};
      }
      route.$set(route_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(route.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(route.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(route, detaching);
    }
  };
}
function create_default_slot2(ctx) {
  let nav;
  let link0;
  let t0;
  let link1;
  let t1;
  let link2;
  let t2;
  let div;
  let route0;
  let t3;
  let route1;
  let current;
  link0 = new Link({
    props: {
      to: "/",
      $$slots: {default: [create_default_slot_6]},
      $$scope: {ctx}
    }
  });
  link1 = new Link({
    props: {
      to: "about",
      $$slots: {default: [create_default_slot_5]},
      $$scope: {ctx}
    }
  });
  link2 = new Link({
    props: {
      to: "blog",
      $$slots: {default: [create_default_slot_4]},
      $$scope: {ctx}
    }
  });
  route0 = new Route({
    props: {
      path: "/",
      $$slots: {default: [create_default_slot_3]},
      $$scope: {ctx}
    }
  });
  route1 = new Route({
    props: {
      path: "blog/*",
      $$slots: {default: [create_default_slot_1]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      nav = element("nav");
      create_component(link0.$$.fragment);
      t0 = space();
      create_component(link1.$$.fragment);
      t1 = space();
      create_component(link2.$$.fragment);
      t2 = space();
      div = element("div");
      create_component(route0.$$.fragment);
      t3 = space();
      create_component(route1.$$.fragment);
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      mount_component(link0, nav, null);
      append(nav, t0);
      mount_component(link1, nav, null);
      append(nav, t1);
      mount_component(link2, nav, null);
      insert(target, t2, anchor);
      insert(target, div, anchor);
      mount_component(route0, div, null);
      append(div, t3);
      mount_component(route1, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const link0_changes = {};
      if (dirty & 1) {
        link0_changes.$$scope = {dirty, ctx: ctx2};
      }
      link0.$set(link0_changes);
      const link1_changes = {};
      if (dirty & 1) {
        link1_changes.$$scope = {dirty, ctx: ctx2};
      }
      link1.$set(link1_changes);
      const link2_changes = {};
      if (dirty & 1) {
        link2_changes.$$scope = {dirty, ctx: ctx2};
      }
      link2.$set(link2_changes);
      const route0_changes = {};
      if (dirty & 1) {
        route0_changes.$$scope = {dirty, ctx: ctx2};
      }
      route0.$set(route0_changes);
      const route1_changes = {};
      if (dirty & 1) {
        route1_changes.$$scope = {dirty, ctx: ctx2};
      }
      route1.$set(route1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(link0.$$.fragment, local);
      transition_in(link1.$$.fragment, local);
      transition_in(link2.$$.fragment, local);
      transition_in(route0.$$.fragment, local);
      transition_in(route1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(link0.$$.fragment, local);
      transition_out(link1.$$.fragment, local);
      transition_out(link2.$$.fragment, local);
      transition_out(route0.$$.fragment, local);
      transition_out(route1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(nav);
      destroy_component(link0);
      destroy_component(link1);
      destroy_component(link2);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div);
      destroy_component(route0);
      destroy_component(route1);
    }
  };
}
function create_fragment2(ctx) {
  let router;
  let current;
  router = new Router({
    props: {
      $$slots: {default: [create_default_slot2]},
      $$scope: {ctx}
    }
  });
  return {
    c() {
      create_component(router.$$.fragment);
    },
    m(target, anchor) {
      mount_component(router, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const router_changes = {};
      if (dirty & 1) {
        router_changes.$$scope = {dirty, ctx: ctx2};
      }
      router.$set(router_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(router.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(router.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(router, detaching);
    }
  };
}
function instance2($$self) {
  console.log(generatePassword({length: 20}));
  return [];
}
var App = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, {});
  }
};
var app_svelte_default = App;

// dist/dist/index.js
import.meta.env = env_exports;
var app = new app_svelte_default({
  target: document.body
});
var dist_default = app;
if (void 0) {
  (void 0).accept();
  (void 0).dispose(() => {
    app.$destroy();
  });
}
export {
  dist_default as default
};
//# sourceMappingURL=index.js.map
