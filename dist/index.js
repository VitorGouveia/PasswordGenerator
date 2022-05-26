var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// dist/dist/pages/home.svelte.js
var require_home_svelte = __commonJS((exports) => {
  __markAsModule(exports);
  __export(exports, {
    default: () => home_svelte_default
  });
  function create_fragment10(ctx) {
    let h1;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "brujh";
      },
      m(target, anchor) {
        insert(target, h1, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(h1);
      }
    };
  }
  var Home = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment10, safe_not_equal, {});
    }
  };
  var home_svelte_default = Home;
});

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

// dist/_snowpack/pkg/common/index-5c6d6680.js
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
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
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
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
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
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
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
function init(component, options, instance7, create_fragment10, not_equal2, props, append_styles2, dirty = [-1]) {
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
  $$.ctx = instance7 ? instance7(component, options.props || {}, (i, ret, ...rest) => {
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
  $$.fragment = create_fragment10 ? create_fragment10($$.ctx) : false;
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

// dist/_snowpack/pkg/common/wrap-a3479a19.js
function wrap(args) {
  if (!args) {
    throw Error("Parameter args is required");
  }
  if (!args.component == !args.asyncComponent) {
    throw Error("One and only one of component and asyncComponent is required");
  }
  if (args.component) {
    args.asyncComponent = () => Promise.resolve(args.component);
  }
  if (typeof args.asyncComponent != "function") {
    throw Error("Parameter asyncComponent must be a function");
  }
  if (args.conditions) {
    if (!Array.isArray(args.conditions)) {
      args.conditions = [args.conditions];
    }
    for (let i = 0; i < args.conditions.length; i++) {
      if (!args.conditions[i] || typeof args.conditions[i] != "function") {
        throw Error("Invalid parameter conditions[" + i + "]");
      }
    }
  }
  if (args.loadingComponent) {
    args.asyncComponent.loading = args.loadingComponent;
    args.asyncComponent.loadingParams = args.loadingParams || void 0;
  }
  const obj = {
    component: args.asyncComponent,
    userData: args.userData,
    conditions: args.conditions && args.conditions.length ? args.conditions : void 0,
    props: args.props && Object.keys(args.props).length ? args.props : {},
    _sveltesparouter: true
  };
  return obj;
}

// dist/_snowpack/pkg/svelte-spa-router.js
var subscriber_queue = [];
function readable(value, start2) {
  return {
    subscribe: writable(value, start2).subscribe
  };
}
function writable(value, start2 = noop) {
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
      stop = start2(set) || noop;
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
function parse(str, loose) {
  if (str instanceof RegExp)
    return {keys: false, pattern: str};
  var c, o, tmp, ext, keys = [], pattern = "", arr = str.split("/");
  arr[0] || arr.shift();
  while (tmp = arr.shift()) {
    c = tmp[0];
    if (c === "*") {
      keys.push("wild");
      pattern += "/(.*)";
    } else if (c === ":") {
      o = tmp.indexOf("?", 1);
      ext = tmp.indexOf(".", 1);
      keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
      pattern += !!~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
      if (!!~ext)
        pattern += (!!~o ? "?" : "") + "\\" + tmp.substring(ext);
    } else {
      pattern += "/" + tmp;
    }
  }
  return {
    keys,
    pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
  };
}
function create_else_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[2]];
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
    switch_instance.$on("routeEvent", ctx[7]);
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
      const switch_instance_changes = dirty & 4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[2])]) : {};
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
          switch_instance.$on("routeEvent", ctx2[7]);
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
function create_if_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [{params: ctx[1]}, ctx[2]];
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
    switch_instance.$on("routeEvent", ctx[6]);
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
      const switch_instance_changes = dirty & 6 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 2 && {params: ctx2[1]},
        dirty & 4 && get_spread_object(ctx2[2])
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
          switch_instance.$on("routeEvent", ctx2[6]);
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
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[1])
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
    p(ctx2, [dirty]) {
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
function getLocation() {
  const hashPosition = window.location.href.indexOf("#/");
  let location2 = hashPosition > -1 ? window.location.href.substr(hashPosition + 1) : "/";
  const qsPosition = location2.indexOf("?");
  let querystring2 = "";
  if (qsPosition > -1) {
    querystring2 = location2.substr(qsPosition + 1);
    location2 = location2.substr(0, qsPosition);
  }
  return {location: location2, querystring: querystring2};
}
var loc = readable(null, function start(set) {
  set(getLocation());
  const update2 = () => {
    set(getLocation());
  };
  window.addEventListener("hashchange", update2, false);
  return function stop() {
    window.removeEventListener("hashchange", update2, false);
  };
});
var location = derived(loc, ($loc) => $loc.location);
var querystring = derived(loc, ($loc) => $loc.querystring);
var params = writable(void 0);
function instance($$self, $$props, $$invalidate) {
  let {routes = {}} = $$props;
  let {prefix = ""} = $$props;
  let {restoreScrollState = false} = $$props;
  class RouteItem {
    constructor(path, component2) {
      if (!component2 || typeof component2 != "function" && (typeof component2 != "object" || component2._sveltesparouter !== true)) {
        throw Error("Invalid component object");
      }
      if (!path || typeof path == "string" && (path.length < 1 || path.charAt(0) != "/" && path.charAt(0) != "*") || typeof path == "object" && !(path instanceof RegExp)) {
        throw Error('Invalid value for "path" argument - strings must start with / or *');
      }
      const {pattern, keys} = parse(path);
      this.path = path;
      if (typeof component2 == "object" && component2._sveltesparouter === true) {
        this.component = component2.component;
        this.conditions = component2.conditions || [];
        this.userData = component2.userData;
        this.props = component2.props || {};
      } else {
        this.component = () => Promise.resolve(component2);
        this.conditions = [];
        this.props = {};
      }
      this._pattern = pattern;
      this._keys = keys;
    }
    match(path) {
      if (prefix) {
        if (typeof prefix == "string") {
          if (path.startsWith(prefix)) {
            path = path.substr(prefix.length) || "/";
          } else {
            return null;
          }
        } else if (prefix instanceof RegExp) {
          const match = path.match(prefix);
          if (match && match[0]) {
            path = path.substr(match[0].length) || "/";
          } else {
            return null;
          }
        }
      }
      const matches = this._pattern.exec(path);
      if (matches === null) {
        return null;
      }
      if (this._keys === false) {
        return matches;
      }
      const out = {};
      let i = 0;
      while (i < this._keys.length) {
        try {
          out[this._keys[i]] = decodeURIComponent(matches[i + 1] || "") || null;
        } catch (e) {
          out[this._keys[i]] = null;
        }
        i++;
      }
      return out;
    }
    async checkConditions(detail) {
      for (let i = 0; i < this.conditions.length; i++) {
        if (!await this.conditions[i](detail)) {
          return false;
        }
      }
      return true;
    }
  }
  const routesList = [];
  if (routes instanceof Map) {
    routes.forEach((route, path) => {
      routesList.push(new RouteItem(path, route));
    });
  } else {
    Object.keys(routes).forEach((path) => {
      routesList.push(new RouteItem(path, routes[path]));
    });
  }
  let component = null;
  let componentParams = null;
  let props = {};
  const dispatch = createEventDispatcher();
  async function dispatchNextTick(name, detail) {
    await tick();
    dispatch(name, detail);
  }
  let previousScrollState = null;
  let popStateChanged = null;
  if (restoreScrollState) {
    popStateChanged = (event) => {
      if (event.state && event.state.__svelte_spa_router_scrollY) {
        previousScrollState = event.state;
      } else {
        previousScrollState = null;
      }
    };
    window.addEventListener("popstate", popStateChanged);
    afterUpdate(() => {
      if (previousScrollState) {
        window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
      } else {
        window.scrollTo(0, 0);
      }
    });
  }
  let lastLoc = null;
  let componentObj = null;
  const unsubscribeLoc = loc.subscribe(async (newLoc) => {
    lastLoc = newLoc;
    let i = 0;
    while (i < routesList.length) {
      const match = routesList[i].match(newLoc.location);
      if (!match) {
        i++;
        continue;
      }
      const detail = {
        route: routesList[i].path,
        location: newLoc.location,
        querystring: newLoc.querystring,
        userData: routesList[i].userData,
        params: match && typeof match == "object" && Object.keys(match).length ? match : null
      };
      if (!await routesList[i].checkConditions(detail)) {
        $$invalidate(0, component = null);
        componentObj = null;
        dispatchNextTick("conditionsFailed", detail);
        return;
      }
      dispatchNextTick("routeLoading", Object.assign({}, detail));
      const obj = routesList[i].component;
      if (componentObj != obj) {
        if (obj.loading) {
          $$invalidate(0, component = obj.loading);
          componentObj = obj;
          $$invalidate(1, componentParams = obj.loadingParams);
          $$invalidate(2, props = {});
          dispatchNextTick("routeLoaded", Object.assign({}, detail, {
            component,
            name: component.name,
            params: componentParams
          }));
        } else {
          $$invalidate(0, component = null);
          componentObj = null;
        }
        const loaded = await obj();
        if (newLoc != lastLoc) {
          return;
        }
        $$invalidate(0, component = loaded && loaded.default || loaded);
        componentObj = obj;
      }
      if (match && typeof match == "object" && Object.keys(match).length) {
        $$invalidate(1, componentParams = match);
      } else {
        $$invalidate(1, componentParams = null);
      }
      $$invalidate(2, props = routesList[i].props);
      dispatchNextTick("routeLoaded", Object.assign({}, detail, {
        component,
        name: component.name,
        params: componentParams
      })).then(() => {
        params.set(componentParams);
      });
      return;
    }
    $$invalidate(0, component = null);
    componentObj = null;
    params.set(void 0);
  });
  onDestroy(() => {
    unsubscribeLoc();
    popStateChanged && window.removeEventListener("popstate", popStateChanged);
  });
  function routeEvent_handler(event) {
    bubble.call(this, $$self, event);
  }
  function routeEvent_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("routes" in $$props2)
      $$invalidate(3, routes = $$props2.routes);
    if ("prefix" in $$props2)
      $$invalidate(4, prefix = $$props2.prefix);
    if ("restoreScrollState" in $$props2)
      $$invalidate(5, restoreScrollState = $$props2.restoreScrollState);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 32) {
      history.scrollRestoration = restoreScrollState ? "manual" : "auto";
    }
  };
  return [
    component,
    componentParams,
    props,
    routes,
    prefix,
    restoreScrollState,
    routeEvent_handler,
    routeEvent_handler_1
  ];
}
var Router = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      routes: 3,
      prefix: 4,
      restoreScrollState: 5
    });
  }
};
var svelte_spa_router_default = Router;

// dist/dist/components/colors.svelte.js
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}
function create_each_block_1(ctx) {
  let li;
  let li_style_value;
  return {
    c() {
      li = element("li");
      attr(li, "style", li_style_value = `background: ${ctx[6]};`);
      attr(li, "class", "svelte-1kxjcm0");
    },
    m(target, anchor) {
      insert(target, li, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_each_block(ctx) {
  let ul;
  let t;
  let each_value_1 = ctx[3];
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      attr(ul, "class", "color-div svelte-1kxjcm0");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
      append(ul, t);
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        each_value_1 = ctx2[3];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, t);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment2(ctx) {
  let div;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "section-content svelte-1kxjcm0");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance2($$self) {
  "use strict";
  const base = {step: 9, base: 6};
  const colors = {
    gray: Object.assign({hue: 260, saturation: 8}, base),
    red: Object.assign({hue: 360, saturation: 46}, base),
    yellow: Object.assign({hue: 60, saturation: 46}, base),
    green: Object.assign({hue: 120, saturation: 46}, base),
    blue: Object.assign({hue: 220, saturation: 46}, base),
    primary: Object.assign({hue: 260, saturation: 46}, base)
  };
  const colorElements = [];
  for (let colorName in colors) {
    const color = colors[colorName];
    const colorMap = [];
    for (let i = 0; i <= 8; i++) {
      colorMap.push(`hsl(${color.hue}, ${color.saturation}%, ${color.base + i * color.step}%)`);
    }
    colorElements.push(colorMap);
  }
  return [colorElements];
}
var Colors = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, {});
  }
};
var colors_svelte_default = Colors;

// dist/dist/components/fonts.svelte.js
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function create_dynamic_element(ctx) {
  let svelte_element;
  let svelte_element_levels = [];
  let svelte_element_data = {};
  for (let i = 0; i < svelte_element_levels.length; i += 1) {
    svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
  }
  return {
    c() {
      svelte_element = element(ctx[1].tag);
      svelte_element.textContent = `${placeholder} 
    `;
      set_attributes(svelte_element, svelte_element_data);
    },
    m(target, anchor) {
      insert(target, svelte_element, anchor);
    },
    p(ctx2, dirty) {
      set_attributes(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, []));
    },
    d(detaching) {
      if (detaching)
        detach(svelte_element);
    }
  };
}
function create_each_block2(ctx) {
  let previous_tag = ctx[1].tag;
  let svelte_element_anchor;
  let svelte_element = ctx[1].tag && create_dynamic_element(ctx);
  return {
    c() {
      if (svelte_element)
        svelte_element.c();
      svelte_element_anchor = empty();
    },
    m(target, anchor) {
      if (svelte_element)
        svelte_element.m(target, anchor);
      insert(target, svelte_element_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (ctx2[1].tag) {
        if (!previous_tag) {
          svelte_element = create_dynamic_element(ctx2);
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else if (safe_not_equal(previous_tag, ctx2[1].tag)) {
          svelte_element.d(1);
          svelte_element = create_dynamic_element(ctx2);
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else {
          svelte_element.p(ctx2, dirty);
        }
      } else if (previous_tag) {
        svelte_element.d(1);
        svelte_element = null;
      }
      previous_tag = ctx2[1].tag;
    },
    d(detaching) {
      if (detaching)
        detach(svelte_element_anchor);
      if (svelte_element)
        svelte_element.d(detaching);
    }
  };
}
function create_fragment3(ctx) {
  let div;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "section-content svelte-on9thr");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
var placeholder = "Lorem Ipsum";
function instance3($$self) {
  "use strict";
  const font = {
    base: 14,
    step: 6,
    weights: [200, 400, 700]
  };
  const tags = ["small", "p", "h6", "h5", "h4", "h3", "h2", "h1"];
  const fonts = [];
  for (let i = 0; i <= 7; i++) {
    fonts.push({
      size: `${font.base + font.step * i}px`,
      tag: tags[i]
    });
  }
  return [fonts, font];
}
var Fonts = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance3, create_fragment3, safe_not_equal, {});
  }
};
var fonts_svelte_default = Fonts;

// dist/dist/components/weights.svelte.js
function create_fragment4(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<h1 class="weight-700">Lorem Ipsum</h1> 
  <h1 class="weight-400">Lorem Ipsum</h1> 
  <h1 class="weight-200">Lorem Ipsum</h1>`;
      attr(div, "class", "section-content");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
var Weights = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment4, safe_not_equal, {});
  }
};
var weights_svelte_default = Weights;

// dist/dist/components/sizes.svelte.js
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[2] = list[i];
  return child_ctx;
}
function create_each_block3(ctx) {
  let div;
  let div_style_value;
  return {
    c() {
      div = element("div");
      attr(div, "style", div_style_value = `background: ${ctx[2].color}; width: ${ctx[2].size}px; height: 32px`);
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
function create_fragment5(ctx) {
  let div;
  let div_style_value;
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "section-content");
      attr(div, "style", div_style_value = `display: flex; flex-direction: ${ctx[0]}`);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & 1 && div_style_value !== (div_style_value = `display: flex; flex-direction: ${ctx2[0]}`)) {
        attr(div, "style", div_style_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let {orientation} = $$props;
  console.log({orientation});
  const size = {step: 9, base: 6};
  const sizes = [];
  for (let i = 0; i <= 8; i++) {
    sizes.push({
      color: `var(--color-gray-${(i + 1) * 100})`,
      size: size.base + size.step * i
    });
  }
  $$self.$$set = ($$props2) => {
    if ("orientation" in $$props2)
      $$invalidate(0, orientation = $$props2.orientation);
  };
  return [orientation, sizes, size];
}
var Sizes = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance4, create_fragment5, safe_not_equal, {orientation: 0});
  }
};
var sizes_svelte_default = Sizes;

// dist/dist/components/breakpoint.svelte.js
function create_fragment6(ctx) {
  let div;
  let div_style_value;
  return {
    c() {
      div = element("div");
      attr(div, "style", div_style_value = `width: ${ctx[0]}px; height: 450px; background: var(--color-gray-900);`);
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && div_style_value !== (div_style_value = `width: ${ctx2[0]}px; height: 450px; background: var(--color-gray-900);`)) {
        attr(div, "style", div_style_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function instance5($$self, $$props, $$invalidate) {
  let {width} = $$props;
  $$self.$$set = ($$props2) => {
    if ("width" in $$props2)
      $$invalidate(0, width = $$props2.width);
  };
  return [width];
}
var Breakpoint = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, create_fragment6, safe_not_equal, {width: 0});
  }
};
var breakpoint_svelte_default = Breakpoint;

// dist/dist/pages/style-guide.svelte.js
function create_fragment7(ctx) {
  let main;
  let div1;
  let section0;
  let h10;
  let t1;
  let colors;
  let t2;
  let section1;
  let h11;
  let t4;
  let fonts;
  let t5;
  let section2;
  let h12;
  let t7;
  let weights;
  let t8;
  let section3;
  let h13;
  let t10;
  let sizes0;
  let t11;
  let sizes1;
  let t12;
  let section4;
  let h14;
  let t14;
  let div0;
  let breakpoint0;
  let t15;
  let breakpoint1;
  let t16;
  let breakpoint2;
  let current;
  colors = new colors_svelte_default({});
  fonts = new fonts_svelte_default({});
  weights = new weights_svelte_default({});
  sizes0 = new sizes_svelte_default({props: {orientation: "row"}});
  sizes1 = new sizes_svelte_default({props: {orientation: "column"}});
  breakpoint0 = new breakpoint_svelte_default({props: {width: 428}});
  breakpoint1 = new breakpoint_svelte_default({props: {width: 744}});
  breakpoint2 = new breakpoint_svelte_default({props: {width: 1440}});
  return {
    c() {
      main = element("main");
      div1 = element("div");
      section0 = element("section");
      h10 = element("h1");
      h10.textContent = "Colors";
      t1 = space();
      create_component(colors.$$.fragment);
      t2 = space();
      section1 = element("section");
      h11 = element("h1");
      h11.textContent = "Fonts";
      t4 = space();
      create_component(fonts.$$.fragment);
      t5 = space();
      section2 = element("section");
      h12 = element("h1");
      h12.textContent = "Weights";
      t7 = space();
      create_component(weights.$$.fragment);
      t8 = space();
      section3 = element("section");
      h13 = element("h1");
      h13.textContent = "Sizes";
      t10 = space();
      create_component(sizes0.$$.fragment);
      t11 = space();
      create_component(sizes1.$$.fragment);
      t12 = space();
      section4 = element("section");
      h14 = element("h1");
      h14.textContent = "Breakpoints";
      t14 = space();
      div0 = element("div");
      create_component(breakpoint0.$$.fragment);
      t15 = space();
      create_component(breakpoint1.$$.fragment);
      t16 = space();
      create_component(breakpoint2.$$.fragment);
      attr(section0, "class", "svelte-aasygx");
      attr(section1, "class", "svelte-aasygx");
      attr(section2, "class", "svelte-aasygx");
      attr(section3, "class", "svelte-aasygx");
      attr(div0, "class", "breakpoints-container svelte-aasygx");
      attr(section4, "class", "svelte-aasygx");
      attr(div1, "class", "content svelte-aasygx");
      attr(main, "class", "svelte-aasygx");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      append(main, div1);
      append(div1, section0);
      append(section0, h10);
      append(section0, t1);
      mount_component(colors, section0, null);
      append(div1, t2);
      append(div1, section1);
      append(section1, h11);
      append(section1, t4);
      mount_component(fonts, section1, null);
      append(div1, t5);
      append(div1, section2);
      append(section2, h12);
      append(section2, t7);
      mount_component(weights, section2, null);
      append(div1, t8);
      append(div1, section3);
      append(section3, h13);
      append(section3, t10);
      mount_component(sizes0, section3, null);
      append(section3, t11);
      mount_component(sizes1, section3, null);
      append(div1, t12);
      append(div1, section4);
      append(section4, h14);
      append(section4, t14);
      append(section4, div0);
      mount_component(breakpoint0, div0, null);
      append(div0, t15);
      mount_component(breakpoint1, div0, null);
      append(div0, t16);
      mount_component(breakpoint2, div0, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(colors.$$.fragment, local);
      transition_in(fonts.$$.fragment, local);
      transition_in(weights.$$.fragment, local);
      transition_in(sizes0.$$.fragment, local);
      transition_in(sizes1.$$.fragment, local);
      transition_in(breakpoint0.$$.fragment, local);
      transition_in(breakpoint1.$$.fragment, local);
      transition_in(breakpoint2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(colors.$$.fragment, local);
      transition_out(fonts.$$.fragment, local);
      transition_out(weights.$$.fragment, local);
      transition_out(sizes0.$$.fragment, local);
      transition_out(sizes1.$$.fragment, local);
      transition_out(breakpoint0.$$.fragment, local);
      transition_out(breakpoint1.$$.fragment, local);
      transition_out(breakpoint2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
      destroy_component(colors);
      destroy_component(fonts);
      destroy_component(weights);
      destroy_component(sizes0);
      destroy_component(sizes1);
      destroy_component(breakpoint0);
      destroy_component(breakpoint1);
      destroy_component(breakpoint2);
    }
  };
}
var Style_guide = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment7, safe_not_equal, {});
  }
};
var style_guide_svelte_default = Style_guide;

// dist/dist/pages/not-found.svelte.js
function create_fragment8(ctx) {
  let h1;
  return {
    c() {
      h1 = element("h1");
      h1.textContent = "burh";
    },
    m(target, anchor) {
      insert(target, h1, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
    }
  };
}
var Not_found = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment8, safe_not_equal, {});
  }
};
var not_found_svelte_default = Not_found;

// dist/dist/app.svelte.js
function create_fragment9(ctx) {
  let router;
  let current;
  router = new svelte_spa_router_default({
    props: {
      restoreScrollState: true,
      routes: ctx[0]
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
    p: noop,
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
function instance6($$self) {
  const routes = {
    "/": wrap({
      asyncComponent: () => Promise.resolve().then(() => require_home_svelte())
    }),
    "/style-guide": style_guide_svelte_default,
    "*": not_found_svelte_default
  };
  return [routes];
}
var App = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment9, safe_not_equal, {});
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
