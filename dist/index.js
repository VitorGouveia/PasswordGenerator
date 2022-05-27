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

// dist/_snowpack/pkg/common/index-f5651d34.js
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
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
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

// dist/_snowpack/pkg/svelte-router-spa.js
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set2(new_value) {
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
    set2(fn(value));
  }
  function subscribe22(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2) || noop;
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
  return {set: set2, update: update2, subscribe: subscribe22};
}
var {set, subscribe: subscribe2} = writable({});
var remove = () => {
  set({});
};
var activeRoute = {
  subscribe: subscribe2,
  set,
  remove
};
var UrlParser = (urlString, namedUrl = "") => {
  const urlBase = new URL(urlString);
  function hash() {
    return urlBase.hash;
  }
  function host() {
    return urlBase.host;
  }
  function hostname() {
    return urlBase.hostname;
  }
  function namedParams() {
    const allPathName = pathNames();
    const allNamedParamsKeys = namedParamsWithIndex();
    return allNamedParamsKeys.reduce((values, paramKey) => {
      values[paramKey.value] = allPathName[paramKey.index];
      return values;
    }, {});
  }
  function namedParamsKeys() {
    const allNamedParamsKeys = namedParamsWithIndex();
    return allNamedParamsKeys.reduce((values, paramKey) => {
      values.push(paramKey.value);
      return values;
    }, []);
  }
  function namedParamsValues() {
    const allPathName = pathNames();
    const allNamedParamsKeys = namedParamsWithIndex();
    return allNamedParamsKeys.reduce((values, paramKey) => {
      values.push(allPathName[paramKey.index]);
      return values;
    }, []);
  }
  function namedParamsWithIndex() {
    const namedUrlParams = getPathNames2(namedUrl);
    return namedUrlParams.reduce((validParams, param, index) => {
      if (param[0] === ":") {
        validParams.push({value: param.slice(1), index});
      }
      return validParams;
    }, []);
  }
  function port() {
    return urlBase.port;
  }
  function pathname() {
    return urlBase.pathname;
  }
  function protocol() {
    return urlBase.protocol;
  }
  function search() {
    return urlBase.search;
  }
  function queryParams() {
    const params = {};
    urlBase.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }
  function queryParamsKeys() {
    const params = [];
    urlBase.searchParams.forEach((_value, key) => {
      params.push(key);
    });
    return params;
  }
  function queryParamsValues() {
    const params = [];
    urlBase.searchParams.forEach((value) => {
      params.push(value);
    });
    return params;
  }
  function pathNames() {
    return getPathNames2(urlBase.pathname);
  }
  function getPathNames2(pathName) {
    if (pathName === "/" || pathName.trim().length === 0)
      return [pathName];
    if (pathName.slice(-1) === "/") {
      pathName = pathName.slice(0, -1);
    }
    if (pathName[0] === "/") {
      pathName = pathName.slice(1);
    }
    return pathName.split("/");
  }
  return Object.freeze({
    hash: hash(),
    host: host(),
    hostname: hostname(),
    namedParams: namedParams(),
    namedParamsKeys: namedParamsKeys(),
    namedParamsValues: namedParamsValues(),
    pathNames: pathNames(),
    port: port(),
    pathname: pathname(),
    protocol: protocol(),
    search: search(),
    queryParams: queryParams(),
    queryParamsKeys: queryParamsKeys(),
    queryParamsValues: queryParamsValues()
  });
};
var anyEmptyNestedRoutes = (routeObject) => {
  let result = false;
  if (Object.keys(routeObject).length === 0) {
    return true;
  }
  if (routeObject.childRoute && Object.keys(routeObject.childRoute).length === 0) {
    result = true;
  } else if (routeObject.childRoute) {
    result = anyEmptyNestedRoutes(routeObject.childRoute);
  }
  return result;
};
var compareRoutes = (pathName, routeName) => {
  routeName = removeSlash(routeName);
  if (routeName.includes(":")) {
    return routeName.includes(pathName);
  } else {
    return routeName.startsWith(pathName);
  }
};
var findLocalisedRoute = (pathName, route, language) => {
  let exists = false;
  if (language) {
    return {exists: route.lang && route.lang[language] && route.lang[language].includes(pathName), language};
  }
  exists = compareRoutes(pathName, route.name);
  if (!exists && route.lang && typeof route.lang === "object") {
    for (const [key, value] of Object.entries(route.lang)) {
      if (compareRoutes(pathName, value)) {
        exists = true;
        language = key;
      }
    }
  }
  return {exists, language};
};
var getNamedParams = (pathName = "") => {
  if (pathName.trim().length === 0)
    return [];
  const namedUrlParams = getPathNames(pathName);
  return namedUrlParams.reduce((validParams, param) => {
    if (param[0] === ":") {
      validParams.push(param.slice(1));
    }
    return validParams;
  }, []);
};
var getPathNames = (pathName) => {
  if (pathName === "/" || pathName.trim().length === 0)
    return [pathName];
  pathName = removeSlash(pathName, "both");
  return pathName.split("/");
};
var nameToPath = (name = "") => {
  let routeName;
  if (name === "/" || name.trim().length === 0)
    return name;
  name = removeSlash(name, "lead");
  routeName = name.split(":")[0];
  routeName = removeSlash(routeName, "trail");
  return routeName.toLowerCase();
};
var pathWithoutQueryParams = (currentRoute) => {
  const path = currentRoute.path.split("?");
  return path[0];
};
var pathWithQueryParams = (currentRoute) => {
  let queryParams = [];
  if (currentRoute.queryParams) {
    for (let [key, value] of Object.entries(currentRoute.queryParams)) {
      queryParams.push(`${key}=${value}`);
    }
  }
  const hash = currentRoute.hash ? currentRoute.hash : "";
  if (queryParams.length > 0) {
    return `${currentRoute.path}?${queryParams.join("&")}${hash}`;
  } else {
    return currentRoute.path + hash;
  }
};
var removeExtraPaths = (pathNames, basePathNames) => {
  const names = basePathNames.split("/");
  if (names.length > 1) {
    names.forEach(function(name, index) {
      if (name.length > 0 && index > 0) {
        pathNames.shift();
      }
    });
  }
  return pathNames;
};
var removeSlash = (pathName, position = "lead") => {
  if (position === "trail" || position === "both") {
    pathName = pathName.replace(/\/$/, "");
  }
  if (position === "lead" || position === "both") {
    pathName = pathName.replace(/^\//, "");
  }
  return pathName;
};
var routeNameLocalised = (route, language = null) => {
  if (!language || !route.lang || !route.lang[language]) {
    return route.name;
  } else {
    return route.lang[language];
  }
};
var startsWithNamedParam = (currentRoute) => {
  const routeName = removeSlash(currentRoute);
  return routeName.startsWith(":");
};
var updateRoutePath = (basePath, pathNames, route, language, convert = false) => {
  if (basePath === "/" || basePath.trim().length === 0)
    return {result: basePath, language: null};
  let basePathResult = basePath;
  let routeName = route.name;
  let currentLanguage = language;
  if (convert) {
    currentLanguage = "";
  }
  routeName = removeSlash(routeName);
  basePathResult = removeSlash(basePathResult);
  if (!route.childRoute) {
    let localisedRoute = findLocalisedRoute(basePathResult, route, currentLanguage);
    if (localisedRoute.exists && convert) {
      basePathResult = routeNameLocalised(route, language);
    }
    let routeNames = routeName.split(":")[0];
    routeNames = removeSlash(routeNames, "trail");
    routeNames = routeNames.split("/");
    routeNames.shift();
    routeNames.forEach(() => {
      const currentPathName = pathNames[0];
      localisedRoute = findLocalisedRoute(`${basePathResult}/${currentPathName}`, route, currentLanguage);
      if (currentPathName && localisedRoute.exists) {
        if (convert) {
          basePathResult = routeNameLocalised(route, language);
        } else {
          basePathResult = `${basePathResult}/${currentPathName}`;
        }
        pathNames.shift();
      } else {
        return {result: basePathResult, language: localisedRoute.language};
      }
    });
    return {result: basePathResult, language: localisedRoute.language};
  } else {
    return {result: basePath, language: currentLanguage};
  }
};
var RouterCurrent = (trackPage) => {
  const trackPageview = trackPage || false;
  let activeRoute2 = "";
  const setActive = (newRoute, updateBrowserHistory) => {
    activeRoute2 = newRoute.path;
    pushActiveRoute(newRoute, updateBrowserHistory);
  };
  const active = () => {
    return activeRoute2;
  };
  const isActive = (queryPath, includePath = false) => {
    if (queryPath[0] !== "/") {
      queryPath = "/" + queryPath;
    }
    let pathName = UrlParser(`http://fake.com${queryPath}`).pathname;
    let activeRoutePath = UrlParser(`http://fake.com${activeRoute2}`).pathname;
    pathName = removeSlash(pathName, "trail");
    activeRoutePath = removeSlash(activeRoutePath, "trail");
    if (includePath) {
      return activeRoutePath.includes(pathName);
    } else {
      return activeRoutePath === pathName;
    }
  };
  const pushActiveRoute = (newRoute, updateBrowserHistory) => {
    if (typeof window !== "undefined") {
      const pathAndSearch = pathWithQueryParams(newRoute);
      if (updateBrowserHistory) {
        window.history.pushState({page: pathAndSearch}, "", pathAndSearch);
      }
      if (trackPageview) {
        gaTracking(pathAndSearch);
      }
    }
  };
  const gaTracking = (newPage) => {
    if (typeof ga !== "undefined") {
      ga("set", "page", newPage);
      ga("send", "pageview");
    }
  };
  return Object.freeze({active, isActive, setActive});
};
var RouterGuard = (onlyIf) => {
  const guardInfo = onlyIf;
  const valid = () => {
    return guardInfo && guardInfo.guard && typeof guardInfo.guard === "function";
  };
  const redirect = () => {
    return !guardInfo.guard();
  };
  const redirectPath = () => {
    let destinationUrl = "/";
    if (guardInfo.redirect && guardInfo.redirect.length > 0) {
      destinationUrl = guardInfo.redirect;
    }
    return destinationUrl;
  };
  return Object.freeze({valid, redirect, redirectPath});
};
var RouterRedirect = (route, currentPath) => {
  const guard = RouterGuard(route.onlyIf);
  const path = () => {
    let redirectTo = currentPath;
    if (route.redirectTo && route.redirectTo.length > 0) {
      redirectTo = route.redirectTo;
    }
    if (guard.valid() && guard.redirect()) {
      redirectTo = guard.redirectPath();
    }
    return redirectTo;
  };
  return Object.freeze({path});
};
function RouterRoute({routeInfo, path, routeNamedParams, urlParser, namedPath, language}) {
  const namedParams = () => {
    const parsedParams = UrlParser(`https://fake.com${urlParser.pathname}`, namedPath).namedParams;
    return {...routeNamedParams, ...parsedParams};
  };
  const get = () => {
    return {
      name: path,
      component: routeInfo.component,
      hash: urlParser.hash,
      layout: routeInfo.layout,
      queryParams: urlParser.queryParams,
      namedParams: namedParams(),
      path,
      language
    };
  };
  return Object.freeze({get, namedParams});
}
function RouterPath({basePath, basePathName, pathNames, convert, currentLanguage}) {
  let updatedPathRoute;
  let route;
  let routePathLanguage = currentLanguage;
  function updatedPath(currentRoute) {
    route = currentRoute;
    updatedPathRoute = updateRoutePath(basePathName, pathNames, route, routePathLanguage, convert);
    routePathLanguage = convert ? currentLanguage : updatedPathRoute.language;
    return updatedPathRoute;
  }
  function localisedPathName() {
    return routeNameLocalised(route, routePathLanguage);
  }
  function localisedRouteWithoutNamedParams() {
    return nameToPath(localisedPathName());
  }
  function basePathNameWithoutNamedParams() {
    return nameToPath(updatedPathRoute.result);
  }
  function namedPath() {
    let localisedPath = localisedPathName();
    if (localisedPath && !localisedPath.startsWith("/")) {
      localisedPath = "/" + localisedPath;
    }
    return basePath ? `${basePath}${localisedPath}` : localisedPath;
  }
  function routePath() {
    let routePathValue = `${basePath}/${basePathNameWithoutNamedParams()}`;
    if (routePathValue === "//") {
      routePathValue = "/";
    }
    if (routePathLanguage) {
      pathNames = removeExtraPaths(pathNames, localisedRouteWithoutNamedParams());
    }
    const namedParams = getNamedParams(localisedPathName());
    if (namedParams && namedParams.length > 0) {
      namedParams.forEach(function() {
        if (pathNames.length > 0) {
          routePathValue += `/${pathNames.shift()}`;
        }
      });
    }
    return routePathValue;
  }
  function routeLanguage() {
    return routePathLanguage;
  }
  function basePathSameAsLocalised() {
    return basePathNameWithoutNamedParams() === localisedRouteWithoutNamedParams();
  }
  return Object.freeze({
    basePathSameAsLocalised,
    updatedPath,
    basePathNameWithoutNamedParams,
    localisedPathName,
    localisedRouteWithoutNamedParams,
    namedPath,
    pathNames,
    routeLanguage,
    routePath
  });
}
var NotFoundPage = "/404.html";
function RouterFinder({routes, currentUrl, routerOptions: routerOptions2, convert}) {
  const defaultLanguage = routerOptions2.defaultLanguage;
  const sitePrefix = routerOptions2.prefix ? routerOptions2.prefix.toLowerCase() : "";
  const urlParser = parseCurrentUrl(currentUrl, sitePrefix);
  let redirectTo = "";
  let routeNamedParams = {};
  let staticParamMatch = false;
  function findActiveRoute() {
    let searchActiveRoute = searchActiveRoutes(routes, "", urlParser.pathNames, routerOptions2.lang, convert);
    if (!searchActiveRoute || !Object.keys(searchActiveRoute).length || anyEmptyNestedRoutes(searchActiveRoute)) {
      if (typeof window !== "undefined") {
        searchActiveRoute = routeNotFound(routerOptions2.lang);
      }
    } else {
      searchActiveRoute.path = pathWithoutQueryParams(searchActiveRoute);
      if (sitePrefix) {
        searchActiveRoute.path = `/${sitePrefix}${searchActiveRoute.path}`;
      }
    }
    return searchActiveRoute;
  }
  function searchActiveRoutes(routes2, basePath, pathNames, currentLanguage, convert2) {
    let currentRoute = {};
    let basePathName = pathNames.shift().toLowerCase();
    const routerPath = RouterPath({basePath, basePathName, pathNames, convert: convert2, currentLanguage});
    staticParamMatch = false;
    routes2.forEach(function(route) {
      routerPath.updatedPath(route);
      if (matchRoute(routerPath, route.name)) {
        let routePath = routerPath.routePath();
        redirectTo = RouterRedirect(route, redirectTo).path();
        if (currentRoute.name !== routePath) {
          currentRoute = setCurrentRoute({
            route,
            routePath,
            routeLanguage: routerPath.routeLanguage(),
            urlParser,
            namedPath: routerPath.namedPath()
          });
        }
        if (route.nestedRoutes && route.nestedRoutes.length > 0 && routerPath.pathNames.length > 0) {
          currentRoute.childRoute = searchActiveRoutes(route.nestedRoutes, routePath, routerPath.pathNames, routerPath.routeLanguage(), convert2);
          currentRoute.path = currentRoute.childRoute.path;
          currentRoute.language = currentRoute.childRoute.language;
        } else if (nestedRoutesAndNoPath(route, routerPath.pathNames)) {
          const indexRoute = searchActiveRoutes(route.nestedRoutes, routePath, ["index"], routerPath.routeLanguage(), convert2);
          if (indexRoute && Object.keys(indexRoute).length > 0) {
            currentRoute.childRoute = indexRoute;
            currentRoute.language = currentRoute.childRoute.language;
          }
        }
      }
    });
    if (redirectTo) {
      currentRoute.redirectTo = redirectTo;
    }
    return currentRoute;
  }
  function matchRoute(routerPath, routeName) {
    const basePathSameAsLocalised = routerPath.basePathSameAsLocalised();
    if (basePathSameAsLocalised) {
      staticParamMatch = true;
    }
    return basePathSameAsLocalised || !staticParamMatch && startsWithNamedParam(routeName);
  }
  function nestedRoutesAndNoPath(route, pathNames) {
    return route.nestedRoutes && route.nestedRoutes.length > 0 && pathNames.length === 0;
  }
  function parseCurrentUrl(currentUrl2, sitePrefix2) {
    if (sitePrefix2 && sitePrefix2.trim().length > 0) {
      const replacePattern = currentUrl2.endsWith(sitePrefix2) ? sitePrefix2 : sitePrefix2 + "/";
      const noPrefixUrl = currentUrl2.replace(replacePattern, "");
      return UrlParser(noPrefixUrl);
    } else {
      return UrlParser(currentUrl2);
    }
  }
  function setCurrentRoute({route, routePath, routeLanguage, urlParser: urlParser2, namedPath}) {
    const routerRoute = RouterRoute({
      routeInfo: route,
      urlParser: urlParser2,
      path: routePath,
      routeNamedParams,
      namedPath,
      language: routeLanguage || defaultLanguage
    });
    routeNamedParams = routerRoute.namedParams();
    return routerRoute.get();
  }
  const routeNotFound = (customLanguage) => {
    const custom404Page = routes.find((route) => route.name == "404");
    const language = customLanguage || defaultLanguage || "";
    if (custom404Page) {
      return {...custom404Page, language, path: "404"};
    } else {
      return {name: "404", component: "", path: "404", redirectTo: NotFoundPage};
    }
  };
  return Object.freeze({findActiveRoute});
}
var NotFoundPage$1 = "/404.html";
var userDefinedRoutes = [];
var routerOptions = {};
var routerCurrent;
var SpaRouter = (routes, currentUrl, options = {}) => {
  routerOptions = {...options};
  if (typeof currentUrl === "undefined" || currentUrl === "") {
    currentUrl = document.location.href;
  }
  routerCurrent = RouterCurrent(routerOptions.gaPageviews);
  currentUrl = removeSlash(currentUrl, "trail");
  userDefinedRoutes = routes;
  const findActiveRoute = () => {
    let convert = false;
    if (routerOptions.langConvertTo) {
      routerOptions.lang = routerOptions.langConvertTo;
      convert = true;
    }
    return RouterFinder({routes, currentUrl, routerOptions, convert}).findActiveRoute();
  };
  const navigateNow = (destinationUrl, updateBrowserHistory) => {
    if (typeof window !== "undefined") {
      if (destinationUrl === NotFoundPage$1) {
        routerCurrent.setActive({path: NotFoundPage$1}, updateBrowserHistory);
      } else {
        navigateTo(destinationUrl);
      }
    }
    return destinationUrl;
  };
  const setActiveRoute = (updateBrowserHistory = true) => {
    const currentRoute = findActiveRoute();
    if (currentRoute.redirectTo) {
      return navigateNow(currentRoute.redirectTo, updateBrowserHistory);
    }
    routerCurrent.setActive(currentRoute, updateBrowserHistory);
    activeRoute.set(currentRoute);
    return currentRoute;
  };
  return Object.freeze({
    setActiveRoute,
    findActiveRoute
  });
};
var navigateTo = (pathName, language = null, updateBrowserHistory = true) => {
  pathName = removeSlash(pathName, "lead");
  if (language) {
    routerOptions.langConvertTo = language;
  }
  return SpaRouter(userDefinedRoutes, "http://fake.com/" + pathName, routerOptions).setActiveRoute(updateBrowserHistory);
};
if (typeof window !== "undefined") {
  window.addEventListener("click", (event) => {
    if (event.target.localName.toLowerCase() !== "a")
      return;
    if (event.metaKey || event.ctrlKey || event.shiftKey)
      return;
    const sitePrefix = routerOptions.prefix ? `/${routerOptions.prefix.toLowerCase()}` : "";
    const targetHostNameInternal = event.target.pathname && event.target.host === window.location.host;
    const prefixMatchPath = sitePrefix.length > 1 ? event.target.pathname.startsWith(sitePrefix) : true;
    if (targetHostNameInternal && prefixMatchPath) {
      event.preventDefault();
      let navigatePathname = event.target.pathname + event.target.search;
      const destinationUrl = navigatePathname + event.target.search + event.target.hash;
      if (event.target.target === "_blank") {
        window.open(destinationUrl, "newTab");
      } else {
        navigateTo(destinationUrl);
      }
    }
  });
  window.onpopstate = function(_event) {
    let navigatePathname = window.location.pathname + window.location.search + window.location.hash;
    navigateTo(navigatePathname, null, false);
  };
}
function create_if_block_2(ctx) {
  let route;
  let current;
  route = new Route({
    props: {
      currentRoute: ctx[0].childRoute,
      params: ctx[1]
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
      if (dirty & 1)
        route_changes.currentRoute = ctx2[0].childRoute;
      if (dirty & 2)
        route_changes.params = ctx2[1];
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
function create_if_block_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0].component;
  function switch_props(ctx2) {
    return {
      props: {
        currentRoute: {
          ...ctx2[0],
          component: ""
        },
        params: ctx2[1]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
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
      const switch_instance_changes = {};
      if (dirty & 1)
        switch_instance_changes.currentRoute = {
          ...ctx2[0],
          component: ""
        };
      if (dirty & 2)
        switch_instance_changes.params = ctx2[1];
      if (switch_value !== (switch_value = ctx2[0].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
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
  var switch_value = ctx[0].layout;
  function switch_props(ctx2) {
    return {
      props: {
        currentRoute: {...ctx2[0], layout: ""},
        params: ctx2[1]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
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
      const switch_instance_changes = {};
      if (dirty & 1)
        switch_instance_changes.currentRoute = {...ctx2[0], layout: ""};
      if (dirty & 2)
        switch_instance_changes.params = ctx2[1];
      if (switch_value !== (switch_value = ctx2[0].layout)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
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
  const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0].layout)
      return 0;
    if (ctx2[0].component)
      return 1;
    if (ctx2[0].childRoute)
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
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
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let {currentRoute = {}} = $$props;
  let {params = {}} = $$props;
  $$self.$$set = ($$props2) => {
    if ("currentRoute" in $$props2)
      $$invalidate(0, currentRoute = $$props2.currentRoute);
    if ("params" in $$props2)
      $$invalidate(1, params = $$props2.params);
  };
  return [currentRoute, params];
}
var Route = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {currentRoute: 0, params: 1});
  }
};
function create_fragment$1(ctx) {
  let route;
  let current;
  route = new Route({
    props: {currentRoute: ctx[0]}
  });
  return {
    c() {
      create_component(route.$$.fragment);
    },
    m(target, anchor) {
      mount_component(route, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const route_changes = {};
      if (dirty & 1)
        route_changes.currentRoute = ctx2[0];
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
function instance$1($$self, $$props, $$invalidate) {
  let $activeRoute;
  component_subscribe($$self, activeRoute, ($$value) => $$invalidate(0, $activeRoute = $$value));
  let {routes = []} = $$props;
  let {options = {}} = $$props;
  onMount(() => {
    SpaRouter(routes, document.location.href, options).setActiveRoute();
  });
  $$self.$$set = ($$props2) => {
    if ("routes" in $$props2)
      $$invalidate(1, routes = $$props2.routes);
    if ("options" in $$props2)
      $$invalidate(2, options = $$props2.options);
  };
  return [$activeRoute, routes, options];
}
var Router = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {routes: 1, options: 2});
  }
};

// dist/dist/pages/home.svelte.js
function create_fragment2(ctx) {
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
    init(this, options, null, create_fragment2, safe_not_equal, {});
  }
};
var home_svelte_default = Home;

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
function create_fragment3(ctx) {
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
    init(this, options, instance2, create_fragment3, safe_not_equal, {});
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
function create_fragment4(ctx) {
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
    init(this, options, instance3, create_fragment4, safe_not_equal, {});
  }
};
var fonts_svelte_default = Fonts;

// dist/dist/components/weights.svelte.js
function create_fragment5(ctx) {
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
    init(this, options, null, create_fragment5, safe_not_equal, {});
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
function create_fragment6(ctx) {
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
    init(this, options, instance4, create_fragment6, safe_not_equal, {orientation: 0});
  }
};
var sizes_svelte_default = Sizes;

// dist/dist/components/breakpoint.svelte.js
function create_fragment7(ctx) {
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
    init(this, options, instance5, create_fragment7, safe_not_equal, {width: 0});
  }
};
var breakpoint_svelte_default = Breakpoint;

// dist/dist/pages/style-guide.svelte.js
function create_fragment8(ctx) {
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
    init(this, options, null, create_fragment8, safe_not_equal, {});
  }
};
var style_guide_svelte_default = Style_guide;

// dist/dist/app.svelte.js
function create_fragment9(ctx) {
  let router;
  let t0;
  let a;
  let current;
  router = new Router({props: {routes: ctx[0]}});
  return {
    c() {
      create_component(router.$$.fragment);
      t0 = space();
      a = element("a");
      a.textContent = "bruh";
      attr(a, "href", "/style-guide");
    },
    m(target, anchor) {
      mount_component(router, target, anchor);
      insert(target, t0, anchor);
      insert(target, a, anchor);
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
      if (detaching)
        detach(t0);
      if (detaching)
        detach(a);
    }
  };
}
function instance6($$self) {
  const routes = [
    {name: "/", component: home_svelte_default},
    {
      name: "/style-guide",
      component: style_guide_svelte_default
    }
  ];
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
