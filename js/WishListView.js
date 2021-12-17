(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/mobx/dist/mobx.esm.js
  var niceErrors = {
    0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
    1: function _(annotationType, key) {
      return "Cannot apply '" + annotationType + "' to '" + key.toString() + "': Field not found.";
    },
    5: "'keys()' can only be used on observable objects, arrays, sets and maps",
    6: "'values()' can only be used on observable objects, arrays, sets and maps",
    7: "'entries()' can only be used on observable objects, arrays and maps",
    8: "'set()' can only be used on observable objects, arrays and maps",
    9: "'remove()' can only be used on observable objects, arrays and maps",
    10: "'has()' can only be used on observable objects, arrays and maps",
    11: "'get()' can only be used on observable objects, arrays and maps",
    12: "Invalid annotation",
    13: "Dynamic observable objects cannot be frozen",
    14: "Intercept handlers should return nothing or a change object",
    15: "Observable arrays cannot be frozen",
    16: "Modification exception: the internal structure of an observable array was changed.",
    17: function _2(index, length) {
      return "[mobx.array] Index out of bounds, " + index + " is larger than " + length;
    },
    18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
    19: function _3(other) {
      return "Cannot initialize from classes that inherit from Map: " + other.constructor.name;
    },
    20: function _4(other) {
      return "Cannot initialize map from " + other;
    },
    21: function _5(dataStructure) {
      return "Cannot convert to map from '" + dataStructure + "'";
    },
    22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
    23: "It is not possible to get index atoms from arrays",
    24: function _6(thing) {
      return "Cannot obtain administration from " + thing;
    },
    25: function _7(property, name) {
      return "the entry '" + property + "' does not exist in the observable map '" + name + "'";
    },
    26: "please specify a property",
    27: function _8(property, name) {
      return "no observable property '" + property.toString() + "' found on the observable object '" + name + "'";
    },
    28: function _9(thing) {
      return "Cannot obtain atom from " + thing;
    },
    29: "Expecting some object",
    30: "invalid action stack. did you forget to finish an action?",
    31: "missing option for computed: get",
    32: function _10(name, derivation) {
      return "Cycle detected in computation " + name + ": " + derivation;
    },
    33: function _11(name) {
      return "The setter of computed value '" + name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
    },
    34: function _12(name) {
      return "[ComputedValue '" + name + "'] It is not possible to assign a new value to a computed value.";
    },
    35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
    36: "isolateGlobalState should be called before MobX is running any reactions",
    37: function _13(method) {
      return "[mobx] `observableArray." + method + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + method + "()` instead";
    },
    38: "'ownKeys()' can only be used on observable objects",
    39: "'defineProperty()' can only be used on observable objects"
  };
  var errors = true ? niceErrors : {};
  function die(error) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (true) {
      var e5 = typeof error === "string" ? error : errors[error];
      if (typeof e5 === "function")
        e5 = e5.apply(null, args);
      throw new Error("[MobX] " + e5);
    }
    throw new Error(typeof error === "number" ? "[MobX] minified error nr: " + error + (args.length ? " " + args.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + error);
  }
  var mockGlobal = {};
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    return mockGlobal;
  }
  var assign = Object.assign;
  var getDescriptor = Object.getOwnPropertyDescriptor;
  var defineProperty = Object.defineProperty;
  var objectPrototype = Object.prototype;
  var EMPTY_ARRAY = [];
  Object.freeze(EMPTY_ARRAY);
  var EMPTY_OBJECT = {};
  Object.freeze(EMPTY_OBJECT);
  var hasProxy = typeof Proxy !== "undefined";
  var plainObjectString = /* @__PURE__ */ Object.toString();
  function assertProxies() {
    if (!hasProxy) {
      die(true ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
    }
  }
  function warnAboutProxyRequirement(msg) {
    if (globalState.verifyProxies) {
      die("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + msg);
    }
  }
  function getNextId() {
    return ++globalState.mobxGuid;
  }
  function once(func) {
    var invoked = false;
    return function() {
      if (invoked)
        return;
      invoked = true;
      return func.apply(this, arguments);
    };
  }
  var noop = function noop2() {
  };
  function isFunction(fn) {
    return typeof fn === "function";
  }
  function isStringish(value) {
    var t3 = typeof value;
    switch (t3) {
      case "string":
      case "symbol":
      case "number":
        return true;
    }
    return false;
  }
  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  function isPlainObject(value) {
    if (!isObject(value))
      return false;
    var proto = Object.getPrototypeOf(value);
    if (proto == null)
      return true;
    var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString;
  }
  function isGenerator(obj) {
    var constructor = obj == null ? void 0 : obj.constructor;
    if (!constructor)
      return false;
    if (constructor.name === "GeneratorFunction" || constructor.displayName === "GeneratorFunction")
      return true;
    return false;
  }
  function addHiddenProp(object2, propName, value) {
    defineProperty(object2, propName, {
      enumerable: false,
      writable: true,
      configurable: true,
      value
    });
  }
  function addHiddenFinalProp(object2, propName, value) {
    defineProperty(object2, propName, {
      enumerable: false,
      writable: false,
      configurable: true,
      value
    });
  }
  function createInstanceofPredicate(name, theClass) {
    var propName = "isMobX" + name;
    theClass.prototype[propName] = true;
    return function(x2) {
      return isObject(x2) && x2[propName] === true;
    };
  }
  function isES6Map(thing) {
    return thing instanceof Map;
  }
  function isES6Set(thing) {
    return thing instanceof Set;
  }
  var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
  function getPlainObjectKeys(object2) {
    var keys = Object.keys(object2);
    if (!hasGetOwnPropertySymbols)
      return keys;
    var symbols = Object.getOwnPropertySymbols(object2);
    if (!symbols.length)
      return keys;
    return [].concat(keys, symbols.filter(function(s5) {
      return objectPrototype.propertyIsEnumerable.call(object2, s5);
    }));
  }
  var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function(obj) {
    return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
  } : Object.getOwnPropertyNames;
  function stringifyKey(key) {
    if (typeof key === "string")
      return key;
    if (typeof key === "symbol")
      return key.toString();
    return new String(key).toString();
  }
  function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
  }
  function hasProp(target, prop) {
    return objectPrototype.hasOwnProperty.call(target, prop);
  }
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(target) {
    var res = {};
    ownKeys(target).forEach(function(key) {
      res[key] = getDescriptor(target, key);
    });
    return res;
  };
  function _defineProperties(target, props) {
    for (var i3 = 0; i3 < props.length; i3++) {
      var descriptor = props[i3];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i3 = 1; i3 < arguments.length; i3++) {
        var source = arguments[i3];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o6, p2) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o7, p3) {
      o7.__proto__ = p3;
      return o7;
    };
    return _setPrototypeOf(o6, p2);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _unsupportedIterableToArray(o6, minLen) {
    if (!o6)
      return;
    if (typeof o6 === "string")
      return _arrayLikeToArray(o6, minLen);
    var n6 = Object.prototype.toString.call(o6).slice(8, -1);
    if (n6 === "Object" && o6.constructor)
      n6 = o6.constructor.name;
    if (n6 === "Map" || n6 === "Set")
      return Array.from(o6);
    if (n6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n6))
      return _arrayLikeToArray(o6, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
      arr2[i3] = arr[i3];
    return arr2;
  }
  function _createForOfIteratorHelperLoose(o6, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o6[Symbol.iterator] || o6["@@iterator"];
    if (it)
      return (it = it.call(o6)).next.bind(it);
    if (Array.isArray(o6) || (it = _unsupportedIterableToArray(o6)) || allowArrayLike && o6 && typeof o6.length === "number") {
      if (it)
        o6 = it;
      var i3 = 0;
      return function() {
        if (i3 >= o6.length)
          return {
            done: true
          };
        return {
          done: false,
          value: o6[i3++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var storedAnnotationsSymbol = /* @__PURE__ */ Symbol("mobx-stored-annotations");
  function createDecoratorAnnotation(annotation) {
    function decorator(target, property) {
      storeAnnotation(target, property, annotation);
    }
    return Object.assign(decorator, annotation);
  }
  function storeAnnotation(prototype, key, annotation) {
    if (!hasProp(prototype, storedAnnotationsSymbol)) {
      addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
    }
    if (isOverride(annotation) && !hasProp(prototype[storedAnnotationsSymbol], key)) {
      var fieldName = prototype.constructor.name + ".prototype." + key.toString();
      die("'" + fieldName + "' is decorated with 'override', but no such decorated member was found on prototype.");
    }
    assertNotDecorated(prototype, annotation, key);
    if (!isOverride(annotation)) {
      prototype[storedAnnotationsSymbol][key] = annotation;
    }
  }
  function assertNotDecorated(prototype, annotation, key) {
    if (!isOverride(annotation) && hasProp(prototype[storedAnnotationsSymbol], key)) {
      var fieldName = prototype.constructor.name + ".prototype." + key.toString();
      var currentAnnotationType = prototype[storedAnnotationsSymbol][key].annotationType_;
      var requestedAnnotationType = annotation.annotationType_;
      die("Cannot apply '@" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already decorated with '@" + currentAnnotationType + "'.") + "\nRe-decorating fields is not allowed.\nUse '@override' decorator for methods overriden by subclass.");
    }
  }
  var $mobx = /* @__PURE__ */ Symbol("mobx administration");
  var Atom = /* @__PURE__ */ function() {
    function Atom2(name_) {
      if (name_ === void 0) {
        name_ = true ? "Atom@" + getNextId() : "Atom";
      }
      this.name_ = void 0;
      this.isPendingUnobservation_ = false;
      this.isBeingObserved_ = false;
      this.observers_ = /* @__PURE__ */ new Set();
      this.diffValue_ = 0;
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      this.name_ = name_;
    }
    var _proto = Atom2.prototype;
    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.reportObserved = function reportObserved$1() {
      return reportObserved(this);
    };
    _proto.reportChanged = function reportChanged() {
      startBatch();
      propagateChanged(this);
      endBatch();
    };
    _proto.toString = function toString2() {
      return this.name_;
    };
    return Atom2;
  }();
  var isAtom = /* @__PURE__ */ createInstanceofPredicate("Atom", Atom);
  function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) {
      onBecomeObservedHandler = noop;
    }
    if (onBecomeUnobservedHandler === void 0) {
      onBecomeUnobservedHandler = noop;
    }
    var atom = new Atom(name);
    if (onBecomeObservedHandler !== noop) {
      onBecomeObserved(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop) {
      onBecomeUnobserved(atom, onBecomeUnobservedHandler);
    }
    return atom;
  }
  function identityComparer(a3, b2) {
    return a3 === b2;
  }
  function structuralComparer(a3, b2) {
    return deepEqual(a3, b2);
  }
  function shallowComparer(a3, b2) {
    return deepEqual(a3, b2, 1);
  }
  function defaultComparer(a3, b2) {
    if (Object.is)
      return Object.is(a3, b2);
    return a3 === b2 ? a3 !== 0 || 1 / a3 === 1 / b2 : a3 !== a3 && b2 !== b2;
  }
  var comparer = {
    identity: identityComparer,
    structural: structuralComparer,
    "default": defaultComparer,
    shallow: shallowComparer
  };
  function deepEnhancer(v2, _15, name) {
    if (isObservable(v2))
      return v2;
    if (Array.isArray(v2))
      return observable.array(v2, {
        name
      });
    if (isPlainObject(v2))
      return observable.object(v2, void 0, {
        name
      });
    if (isES6Map(v2))
      return observable.map(v2, {
        name
      });
    if (isES6Set(v2))
      return observable.set(v2, {
        name
      });
    if (typeof v2 === "function" && !isAction(v2) && !isFlow(v2)) {
      if (isGenerator(v2)) {
        return flow(v2);
      } else {
        return autoAction(name, v2);
      }
    }
    return v2;
  }
  function shallowEnhancer(v2, _15, name) {
    if (v2 === void 0 || v2 === null)
      return v2;
    if (isObservableObject(v2) || isObservableArray(v2) || isObservableMap(v2) || isObservableSet(v2))
      return v2;
    if (Array.isArray(v2))
      return observable.array(v2, {
        name,
        deep: false
      });
    if (isPlainObject(v2))
      return observable.object(v2, void 0, {
        name,
        deep: false
      });
    if (isES6Map(v2))
      return observable.map(v2, {
        name,
        deep: false
      });
    if (isES6Set(v2))
      return observable.set(v2, {
        name,
        deep: false
      });
    if (true)
      die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
  }
  function referenceEnhancer(newValue) {
    return newValue;
  }
  function refStructEnhancer(v2, oldValue) {
    if (isObservable(v2))
      die("observable.struct should not be used with observable values");
    if (deepEqual(v2, oldValue))
      return oldValue;
    return v2;
  }
  var OVERRIDE = "override";
  function isOverride(annotation) {
    return annotation.annotationType_ === OVERRIDE;
  }
  function createActionAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$1,
      extend_: extend_$1
    };
  }
  function make_$1(adm, key, descriptor, source) {
    var _this$options_;
    if ((_this$options_ = this.options_) != null && _this$options_.bound) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
    }
    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
    }
    if (isAction(descriptor.value)) {
      return 1;
    }
    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
    defineProperty(source, key, actionDescriptor);
    return 2;
  }
  function extend_$1(adm, key, descriptor, proxyTrap) {
    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
    return adm.defineProperty_(key, actionDescriptor, proxyTrap);
  }
  function assertActionDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var value = _ref2.value;
    if (!isFunction(value)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a function value."));
    }
  }
  function createActionDescriptor(adm, annotation, key, descriptor, safeDescriptors) {
    var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;
    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }
    assertActionDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;
    if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
      var _adm$proxy_;
      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }
    return {
      value: createAction((_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(), value, (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false, (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : void 0),
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      enumerable: false,
      writable: safeDescriptors ? false : true
    };
  }
  function createFlowAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$2,
      extend_: extend_$2
    };
  }
  function make_$2(adm, key, descriptor, source) {
    var _this$options_;
    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
    }
    if ((_this$options_ = this.options_) != null && _this$options_.bound && !isFlow(adm.target_[key])) {
      if (this.extend_(adm, key, descriptor, false) === null)
        return 0;
    }
    if (isFlow(descriptor.value)) {
      return 1;
    }
    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
    defineProperty(source, key, flowDescriptor);
    return 2;
  }
  function extend_$2(adm, key, descriptor, proxyTrap) {
    var _this$options_2;
    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
    return adm.defineProperty_(key, flowDescriptor, proxyTrap);
  }
  function assertFlowDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var value = _ref2.value;
    if (!isFunction(value)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a generator function value."));
    }
  }
  function createFlowDescriptor(adm, annotation, key, descriptor, bound, safeDescriptors) {
    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }
    assertFlowDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;
    if (bound) {
      var _adm$proxy_;
      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }
    return {
      value: flow(value),
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      enumerable: false,
      writable: safeDescriptors ? false : true
    };
  }
  function createComputedAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$3,
      extend_: extend_$3
    };
  }
  function make_$3(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  function extend_$3(adm, key, descriptor, proxyTrap) {
    assertComputedDescriptor(adm, this, key, descriptor);
    return adm.defineComputedProperty_(key, _extends({}, this.options_, {
      get: descriptor.get,
      set: descriptor.set
    }), proxyTrap);
  }
  function assertComputedDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var get3 = _ref2.get;
    if (!get3) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on getter(+setter) properties."));
    }
  }
  function createObservableAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$4,
      extend_: extend_$4
    };
  }
  function make_$4(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  function extend_$4(adm, key, descriptor, proxyTrap) {
    var _this$options_$enhanc, _this$options_;
    assertObservableDescriptor(adm, this, key, descriptor);
    return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
  }
  function assertObservableDescriptor(adm, _ref, key, descriptor) {
    var annotationType_ = _ref.annotationType_;
    if (!("value" in descriptor)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' cannot be used on getter/setter properties"));
    }
  }
  var AUTO = "true";
  var autoAnnotation = /* @__PURE__ */ createAutoAnnotation();
  function createAutoAnnotation(options) {
    return {
      annotationType_: AUTO,
      options_: options,
      make_: make_$5,
      extend_: extend_$5
    };
  }
  function make_$5(adm, key, descriptor, source) {
    var _this$options_3, _this$options_4;
    if (descriptor.get) {
      return computed.make_(adm, key, descriptor, source);
    }
    if (descriptor.set) {
      var set4 = createAction(key.toString(), descriptor.set);
      if (source === adm.target_) {
        return adm.defineProperty_(key, {
          configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
          set: set4
        }) === null ? 0 : 2;
      }
      defineProperty(source, key, {
        configurable: true,
        set: set4
      });
      return 2;
    }
    if (source !== adm.target_ && typeof descriptor.value === "function") {
      var _this$options_2;
      if (isGenerator(descriptor.value)) {
        var _this$options_;
        var flowAnnotation2 = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
        return flowAnnotation2.make_(adm, key, descriptor, source);
      }
      var actionAnnotation2 = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
      return actionAnnotation2.make_(adm, key, descriptor, source);
    }
    var observableAnnotation2 = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable;
    if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
      var _adm$proxy_;
      descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }
    return observableAnnotation2.make_(adm, key, descriptor, source);
  }
  function extend_$5(adm, key, descriptor, proxyTrap) {
    var _this$options_5, _this$options_6;
    if (descriptor.get) {
      return computed.extend_(adm, key, descriptor, proxyTrap);
    }
    if (descriptor.set) {
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set: createAction(key.toString(), descriptor.set)
      }, proxyTrap);
    }
    if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
      var _adm$proxy_2;
      descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
    }
    var observableAnnotation2 = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
    return observableAnnotation2.extend_(adm, key, descriptor, proxyTrap);
  }
  var OBSERVABLE = "observable";
  var OBSERVABLE_REF = "observable.ref";
  var OBSERVABLE_SHALLOW = "observable.shallow";
  var OBSERVABLE_STRUCT = "observable.struct";
  var defaultCreateObservableOptions = {
    deep: true,
    name: void 0,
    defaultDecorator: void 0,
    proxy: true
  };
  Object.freeze(defaultCreateObservableOptions);
  function asCreateObservableOptions(thing) {
    return thing || defaultCreateObservableOptions;
  }
  var observableAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE);
  var observableRefAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_REF, {
    enhancer: referenceEnhancer
  });
  var observableShallowAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_SHALLOW, {
    enhancer: shallowEnhancer
  });
  var observableStructAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_STRUCT, {
    enhancer: refStructEnhancer
  });
  var observableDecoratorAnnotation = /* @__PURE__ */ createDecoratorAnnotation(observableAnnotation);
  function getEnhancerFromOptions(options) {
    return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
  }
  function getAnnotationFromOptions(options) {
    var _options$defaultDecor;
    return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : void 0;
  }
  function getEnhancerFromAnnotation(annotation) {
    var _annotation$options_$, _annotation$options_;
    return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
  }
  function createObservable(v2, arg2, arg3) {
    if (isStringish(arg2)) {
      storeAnnotation(v2, arg2, observableAnnotation);
      return;
    }
    if (isObservable(v2))
      return v2;
    if (isPlainObject(v2))
      return observable.object(v2, arg2, arg3);
    if (Array.isArray(v2))
      return observable.array(v2, arg2);
    if (isES6Map(v2))
      return observable.map(v2, arg2);
    if (isES6Set(v2))
      return observable.set(v2, arg2);
    if (typeof v2 === "object" && v2 !== null)
      return v2;
    return observable.box(v2, arg2);
  }
  Object.assign(createObservable, observableDecoratorAnnotation);
  var observableFactories = {
    box: function box(value, options) {
      var o6 = asCreateObservableOptions(options);
      return new ObservableValue(value, getEnhancerFromOptions(o6), o6.name, true, o6.equals);
    },
    array: function array(initialValues, options) {
      var o6 = asCreateObservableOptions(options);
      return (globalState.useProxies === false || o6.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o6), o6.name);
    },
    map: function map(initialValues, options) {
      var o6 = asCreateObservableOptions(options);
      return new ObservableMap(initialValues, getEnhancerFromOptions(o6), o6.name);
    },
    set: function set(initialValues, options) {
      var o6 = asCreateObservableOptions(options);
      return new ObservableSet(initialValues, getEnhancerFromOptions(o6), o6.name);
    },
    object: function object(props, decorators, options) {
      return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
    },
    ref: /* @__PURE__ */ createDecoratorAnnotation(observableRefAnnotation),
    shallow: /* @__PURE__ */ createDecoratorAnnotation(observableShallowAnnotation),
    deep: observableDecoratorAnnotation,
    struct: /* @__PURE__ */ createDecoratorAnnotation(observableStructAnnotation)
  };
  var observable = /* @__PURE__ */ assign(createObservable, observableFactories);
  var COMPUTED = "computed";
  var COMPUTED_STRUCT = "computed.struct";
  var computedAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED);
  var computedStructAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED_STRUCT, {
    equals: comparer.structural
  });
  var computed = function computed2(arg1, arg2) {
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, computedAnnotation);
    }
    if (isPlainObject(arg1)) {
      return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
    }
    if (true) {
      if (!isFunction(arg1))
        die("First argument to `computed` should be an expression.");
      if (isFunction(arg2))
        die("A setter as second argument is no longer supported, use `{ set: fn }` option instead");
    }
    var opts = isPlainObject(arg2) ? arg2 : {};
    opts.get = arg1;
    opts.name || (opts.name = arg1.name || "");
    return new ComputedValue(opts);
  };
  Object.assign(computed, computedAnnotation);
  computed.struct = /* @__PURE__ */ createDecoratorAnnotation(computedStructAnnotation);
  var _getDescriptor$config;
  var _getDescriptor;
  var currentActionId = 0;
  var nextActionId = 1;
  var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = /* @__PURE__ */ getDescriptor(function() {
  }, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
  var tmpNameDescriptor = {
    value: "action",
    configurable: true,
    writable: false,
    enumerable: false
  };
  function createAction(actionName, fn, autoAction2, ref) {
    if (autoAction2 === void 0) {
      autoAction2 = false;
    }
    if (true) {
      if (!isFunction(fn))
        die("`action` can only be invoked on functions");
      if (typeof actionName !== "string" || !actionName)
        die("actions should have valid names, got: '" + actionName + "'");
    }
    function res() {
      return executeAction(actionName, autoAction2, fn, ref || this, arguments);
    }
    res.isMobxAction = true;
    if (isFunctionNameConfigurable) {
      tmpNameDescriptor.value = actionName;
      Object.defineProperty(res, "name", tmpNameDescriptor);
    }
    return res;
  }
  function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
    var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);
    try {
      return fn.apply(scope, args);
    } catch (err) {
      runInfo.error_ = err;
      throw err;
    } finally {
      _endAction(runInfo);
    }
  }
  function _startAction(actionName, canRunAsDerivation, scope, args) {
    var notifySpy_ = isSpyEnabled() && !!actionName;
    var startTime_ = 0;
    if (notifySpy_) {
      startTime_ = Date.now();
      var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
      spyReportStart({
        type: ACTION,
        name: actionName,
        object: scope,
        arguments: flattenedArgs
      });
    }
    var prevDerivation_ = globalState.trackingDerivation;
    var runAsAction = !canRunAsDerivation || !prevDerivation_;
    startBatch();
    var prevAllowStateChanges_ = globalState.allowStateChanges;
    if (runAsAction) {
      untrackedStart();
      prevAllowStateChanges_ = allowStateChangesStart(true);
    }
    var prevAllowStateReads_ = allowStateReadsStart(true);
    var runInfo = {
      runAsAction_: runAsAction,
      prevDerivation_,
      prevAllowStateChanges_,
      prevAllowStateReads_,
      notifySpy_,
      startTime_,
      actionId_: nextActionId++,
      parentActionId_: currentActionId
    };
    currentActionId = runInfo.actionId_;
    return runInfo;
  }
  function _endAction(runInfo) {
    if (currentActionId !== runInfo.actionId_) {
      die(30);
    }
    currentActionId = runInfo.parentActionId_;
    if (runInfo.error_ !== void 0) {
      globalState.suppressReactionErrors = true;
    }
    allowStateChangesEnd(runInfo.prevAllowStateChanges_);
    allowStateReadsEnd(runInfo.prevAllowStateReads_);
    endBatch();
    if (runInfo.runAsAction_)
      untrackedEnd(runInfo.prevDerivation_);
    if (runInfo.notifySpy_) {
      spyReportEnd({
        time: Date.now() - runInfo.startTime_
      });
    }
    globalState.suppressReactionErrors = false;
  }
  function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
  }
  function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
  }
  var _Symbol$toPrimitive;
  var CREATE = "create";
  _Symbol$toPrimitive = Symbol.toPrimitive;
  var ObservableValue = /* @__PURE__ */ function(_Atom, _Symbol$toPrimitive2) {
    _inheritsLoose(ObservableValue2, _Atom);
    function ObservableValue2(value, enhancer, name_, notifySpy, equals) {
      var _this;
      if (name_ === void 0) {
        name_ = true ? "ObservableValue@" + getNextId() : "ObservableValue";
      }
      if (notifySpy === void 0) {
        notifySpy = true;
      }
      if (equals === void 0) {
        equals = comparer["default"];
      }
      _this = _Atom.call(this, name_) || this;
      _this.enhancer = void 0;
      _this.name_ = void 0;
      _this.equals = void 0;
      _this.hasUnreportedChange_ = false;
      _this.interceptors_ = void 0;
      _this.changeListeners_ = void 0;
      _this.value_ = void 0;
      _this.dehancer = void 0;
      _this.enhancer = enhancer;
      _this.name_ = name_;
      _this.equals = equals;
      _this.value_ = enhancer(value, void 0, name_);
      if (notifySpy && isSpyEnabled()) {
        spyReport({
          type: CREATE,
          object: _assertThisInitialized(_this),
          observableKind: "value",
          debugObjectName: _this.name_,
          newValue: "" + _this.value_
        });
      }
      return _this;
    }
    var _proto = ObservableValue2.prototype;
    _proto.dehanceValue = function dehanceValue(value) {
      if (this.dehancer !== void 0)
        return this.dehancer(value);
      return value;
    };
    _proto.set = function set4(newValue) {
      var oldValue = this.value_;
      newValue = this.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();
        if (notifySpy) {
          spyReportStart({
            type: UPDATE,
            object: this,
            observableKind: "value",
            debugObjectName: this.name_,
            newValue,
            oldValue
          });
        }
        this.setNewValue_(newValue);
        if (notifySpy)
          spyReportEnd();
      }
    };
    _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
      checkIfStateModificationsAreAllowed(this);
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this,
          type: UPDATE,
          newValue
        });
        if (!change)
          return globalState.UNCHANGED;
        newValue = change.newValue;
      }
      newValue = this.enhancer(newValue, this.value_, this.name_);
      return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
    };
    _proto.setNewValue_ = function setNewValue_(newValue) {
      var oldValue = this.value_;
      this.value_ = newValue;
      this.reportChanged();
      if (hasListeners(this)) {
        notifyListeners(this, {
          type: UPDATE,
          object: this,
          newValue,
          oldValue
        });
      }
    };
    _proto.get = function get3() {
      this.reportObserved();
      return this.dehanceValue(this.value_);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately)
        listener({
          observableKind: "value",
          debugObjectName: this.name_,
          object: this,
          type: UPDATE,
          newValue: this.value_,
          oldValue: void 0
        });
      return registerListener(this, listener);
    };
    _proto.raw = function raw() {
      return this.value_;
    };
    _proto.toJSON = function toJSON2() {
      return this.get();
    };
    _proto.toString = function toString2() {
      return this.name_ + "[" + this.value_ + "]";
    };
    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };
    _proto[_Symbol$toPrimitive2] = function() {
      return this.valueOf();
    };
    return ObservableValue2;
  }(Atom, _Symbol$toPrimitive);
  var _Symbol$toPrimitive$1;
  _Symbol$toPrimitive$1 = Symbol.toPrimitive;
  var ComputedValue = /* @__PURE__ */ function(_Symbol$toPrimitive2) {
    function ComputedValue2(options) {
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.observing_ = [];
      this.newObserving_ = null;
      this.isBeingObserved_ = false;
      this.isPendingUnobservation_ = false;
      this.observers_ = /* @__PURE__ */ new Set();
      this.diffValue_ = 0;
      this.runId_ = 0;
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      this.unboundDepsCount_ = 0;
      this.value_ = new CaughtException(null);
      this.name_ = void 0;
      this.triggeredBy_ = void 0;
      this.isComputing_ = false;
      this.isRunningSetter_ = false;
      this.derivation = void 0;
      this.setter_ = void 0;
      this.isTracing_ = TraceMode.NONE;
      this.scope_ = void 0;
      this.equals_ = void 0;
      this.requiresReaction_ = void 0;
      this.keepAlive_ = void 0;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      if (!options.get)
        die(31);
      this.derivation = options.get;
      this.name_ = options.name || (true ? "ComputedValue@" + getNextId() : "ComputedValue");
      if (options.set) {
        this.setter_ = createAction(true ? this.name_ + "-setter" : "ComputedValue-setter", options.set);
      }
      this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
      this.scope_ = options.context;
      this.requiresReaction_ = options.requiresReaction;
      this.keepAlive_ = !!options.keepAlive;
    }
    var _proto = ComputedValue2.prototype;
    _proto.onBecomeStale_ = function onBecomeStale_() {
      propagateMaybeChanged(this);
    };
    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.get = function get3() {
      if (this.isComputing_)
        die(32, this.name_, this.derivation);
      if (globalState.inBatch === 0 && this.observers_.size === 0 && !this.keepAlive_) {
        if (shouldCompute(this)) {
          this.warnAboutUntrackedRead_();
          startBatch();
          this.value_ = this.computeValue_(false);
          endBatch();
        }
      } else {
        reportObserved(this);
        if (shouldCompute(this)) {
          var prevTrackingContext = globalState.trackingContext;
          if (this.keepAlive_ && !prevTrackingContext)
            globalState.trackingContext = this;
          if (this.trackAndCompute())
            propagateChangeConfirmed(this);
          globalState.trackingContext = prevTrackingContext;
        }
      }
      var result = this.value_;
      if (isCaughtException(result))
        throw result.cause;
      return result;
    };
    _proto.set = function set4(value) {
      if (this.setter_) {
        if (this.isRunningSetter_)
          die(33, this.name_);
        this.isRunningSetter_ = true;
        try {
          this.setter_.call(this.scope_, value);
        } finally {
          this.isRunningSetter_ = false;
        }
      } else
        die(34, this.name_);
    };
    _proto.trackAndCompute = function trackAndCompute() {
      var oldValue = this.value_;
      var wasSuspended = this.dependenciesState_ === IDerivationState_.NOT_TRACKING_;
      var newValue = this.computeValue_(true);
      var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);
      if (changed) {
        this.value_ = newValue;
        if (isSpyEnabled()) {
          spyReport({
            observableKind: "computed",
            debugObjectName: this.name_,
            object: this.scope_,
            type: "update",
            oldValue,
            newValue
          });
        }
      }
      return changed;
    };
    _proto.computeValue_ = function computeValue_(track) {
      this.isComputing_ = true;
      var prev = allowStateChangesStart(false);
      var res;
      if (track) {
        res = trackDerivedFunction(this, this.derivation, this.scope_);
      } else {
        if (globalState.disableErrorBoundaries === true) {
          res = this.derivation.call(this.scope_);
        } else {
          try {
            res = this.derivation.call(this.scope_);
          } catch (e5) {
            res = new CaughtException(e5);
          }
        }
      }
      allowStateChangesEnd(prev);
      this.isComputing_ = false;
      return res;
    };
    _proto.suspend_ = function suspend_() {
      if (!this.keepAlive_) {
        clearObserving(this);
        this.value_ = void 0;
        if (this.isTracing_ !== TraceMode.NONE) {
          console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access.");
        }
      }
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      var _this = this;
      var firstTime = true;
      var prevValue = void 0;
      return autorun(function() {
        var newValue = _this.get();
        if (!firstTime || fireImmediately) {
          var prevU = untrackedStart();
          listener({
            observableKind: "computed",
            debugObjectName: _this.name_,
            type: UPDATE,
            object: _this,
            newValue,
            oldValue: prevValue
          });
          untrackedEnd(prevU);
        }
        firstTime = false;
        prevValue = newValue;
      });
    };
    _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
      if (false)
        return;
      if (this.isTracing_ !== TraceMode.NONE) {
        console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
      }
      if (typeof this.requiresReaction_ === "boolean" ? this.requiresReaction_ : globalState.computedRequiresReaction) {
        console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
      }
    };
    _proto.toString = function toString2() {
      return this.name_ + "[" + this.derivation.toString() + "]";
    };
    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };
    _proto[_Symbol$toPrimitive2] = function() {
      return this.valueOf();
    };
    return ComputedValue2;
  }(_Symbol$toPrimitive$1);
  var isComputedValue = /* @__PURE__ */ createInstanceofPredicate("ComputedValue", ComputedValue);
  var IDerivationState_;
  (function(IDerivationState_2) {
    IDerivationState_2[IDerivationState_2["NOT_TRACKING_"] = -1] = "NOT_TRACKING_";
    IDerivationState_2[IDerivationState_2["UP_TO_DATE_"] = 0] = "UP_TO_DATE_";
    IDerivationState_2[IDerivationState_2["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_";
    IDerivationState_2[IDerivationState_2["STALE_"] = 2] = "STALE_";
  })(IDerivationState_ || (IDerivationState_ = {}));
  var TraceMode;
  (function(TraceMode2) {
    TraceMode2[TraceMode2["NONE"] = 0] = "NONE";
    TraceMode2[TraceMode2["LOG"] = 1] = "LOG";
    TraceMode2[TraceMode2["BREAK"] = 2] = "BREAK";
  })(TraceMode || (TraceMode = {}));
  var CaughtException = function CaughtException2(cause) {
    this.cause = void 0;
    this.cause = cause;
  };
  function isCaughtException(e5) {
    return e5 instanceof CaughtException;
  }
  function shouldCompute(derivation) {
    switch (derivation.dependenciesState_) {
      case IDerivationState_.UP_TO_DATE_:
        return false;
      case IDerivationState_.NOT_TRACKING_:
      case IDerivationState_.STALE_:
        return true;
      case IDerivationState_.POSSIBLY_STALE_: {
        var prevAllowStateReads = allowStateReadsStart(true);
        var prevUntracked = untrackedStart();
        var obs = derivation.observing_, l4 = obs.length;
        for (var i3 = 0; i3 < l4; i3++) {
          var obj = obs[i3];
          if (isComputedValue(obj)) {
            if (globalState.disableErrorBoundaries) {
              obj.get();
            } else {
              try {
                obj.get();
              } catch (e5) {
                untrackedEnd(prevUntracked);
                allowStateReadsEnd(prevAllowStateReads);
                return true;
              }
            }
            if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
        }
        changeDependenciesStateTo0(derivation);
        untrackedEnd(prevUntracked);
        allowStateReadsEnd(prevAllowStateReads);
        return false;
      }
    }
  }
  function checkIfStateModificationsAreAllowed(atom) {
    if (false) {
      return;
    }
    var hasObservers = atom.observers_.size > 0;
    if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always"))
      console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
  }
  function checkIfStateReadsAreAllowed(observable2) {
    if (!globalState.allowStateReads && globalState.observableRequiresReaction) {
      console.warn("[mobx] Observable '" + observable2.name_ + "' being read outside a reactive context.");
    }
  }
  function trackDerivedFunction(derivation, f2, context) {
    var prevAllowStateReads = allowStateReadsStart(true);
    changeDependenciesStateTo0(derivation);
    derivation.newObserving_ = new Array(derivation.observing_.length + 100);
    derivation.unboundDepsCount_ = 0;
    derivation.runId_ = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    globalState.inBatch++;
    var result;
    if (globalState.disableErrorBoundaries === true) {
      result = f2.call(context);
    } else {
      try {
        result = f2.call(context);
      } catch (e5) {
        result = new CaughtException(e5);
      }
    }
    globalState.inBatch--;
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    warnAboutDerivationWithoutDependencies(derivation);
    allowStateReadsEnd(prevAllowStateReads);
    return result;
  }
  function warnAboutDerivationWithoutDependencies(derivation) {
    if (false)
      return;
    if (derivation.observing_.length !== 0)
      return;
    if (globalState.reactionRequiresObservable || derivation.requiresObservable_) {
      console.warn("[mobx] Derivation '" + derivation.name_ + "' is created/updated without reading any observable value.");
    }
  }
  function bindDependencies(derivation) {
    var prevObserving = derivation.observing_;
    var observing = derivation.observing_ = derivation.newObserving_;
    var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_;
    var i0 = 0, l4 = derivation.unboundDepsCount_;
    for (var i3 = 0; i3 < l4; i3++) {
      var dep = observing[i3];
      if (dep.diffValue_ === 0) {
        dep.diffValue_ = 1;
        if (i0 !== i3)
          observing[i0] = dep;
        i0++;
      }
      if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
        lowestNewObservingDerivationState = dep.dependenciesState_;
      }
    }
    observing.length = i0;
    derivation.newObserving_ = null;
    l4 = prevObserving.length;
    while (l4--) {
      var _dep = prevObserving[l4];
      if (_dep.diffValue_ === 0) {
        removeObserver(_dep, derivation);
      }
      _dep.diffValue_ = 0;
    }
    while (i0--) {
      var _dep2 = observing[i0];
      if (_dep2.diffValue_ === 1) {
        _dep2.diffValue_ = 0;
        addObserver(_dep2, derivation);
      }
    }
    if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
      derivation.dependenciesState_ = lowestNewObservingDerivationState;
      derivation.onBecomeStale_();
    }
  }
  function clearObserving(derivation) {
    var obs = derivation.observing_;
    derivation.observing_ = [];
    var i3 = obs.length;
    while (i3--) {
      removeObserver(obs[i3], derivation);
    }
    derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
  }
  function untracked(action2) {
    var prev = untrackedStart();
    try {
      return action2();
    } finally {
      untrackedEnd(prev);
    }
  }
  function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
  }
  function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
  }
  function allowStateReadsStart(allowStateReads) {
    var prev = globalState.allowStateReads;
    globalState.allowStateReads = allowStateReads;
    return prev;
  }
  function allowStateReadsEnd(prev) {
    globalState.allowStateReads = prev;
  }
  function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_)
      return;
    derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
    var obs = derivation.observing_;
    var i3 = obs.length;
    while (i3--) {
      obs[i3].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  }
  var MobXGlobals = function MobXGlobals2() {
    this.version = 6;
    this.UNCHANGED = {};
    this.trackingDerivation = null;
    this.trackingContext = null;
    this.runId = 0;
    this.mobxGuid = 0;
    this.inBatch = 0;
    this.pendingUnobservations = [];
    this.pendingReactions = [];
    this.isRunningReactions = false;
    this.allowStateChanges = false;
    this.allowStateReads = true;
    this.enforceActions = true;
    this.spyListeners = [];
    this.globalReactionErrorHandlers = [];
    this.computedRequiresReaction = false;
    this.reactionRequiresObservable = false;
    this.observableRequiresReaction = false;
    this.disableErrorBoundaries = false;
    this.suppressReactionErrors = false;
    this.useProxies = true;
    this.verifyProxies = false;
    this.safeDescriptors = true;
  };
  var canMergeGlobalState = true;
  var isolateCalled = false;
  var globalState = /* @__PURE__ */ function() {
    var global2 = /* @__PURE__ */ getGlobal();
    if (global2.__mobxInstanceCount > 0 && !global2.__mobxGlobals)
      canMergeGlobalState = false;
    if (global2.__mobxGlobals && global2.__mobxGlobals.version !== new MobXGlobals().version)
      canMergeGlobalState = false;
    if (!canMergeGlobalState) {
      setTimeout(function() {
        if (!isolateCalled) {
          die(35);
        }
      }, 1);
      return new MobXGlobals();
    } else if (global2.__mobxGlobals) {
      global2.__mobxInstanceCount += 1;
      if (!global2.__mobxGlobals.UNCHANGED)
        global2.__mobxGlobals.UNCHANGED = {};
      return global2.__mobxGlobals;
    } else {
      global2.__mobxInstanceCount = 1;
      return global2.__mobxGlobals = /* @__PURE__ */ new MobXGlobals();
    }
  }();
  function addObserver(observable2, node) {
    observable2.observers_.add(node);
    if (observable2.lowestObserverState_ > node.dependenciesState_)
      observable2.lowestObserverState_ = node.dependenciesState_;
  }
  function removeObserver(observable2, node) {
    observable2.observers_["delete"](node);
    if (observable2.observers_.size === 0) {
      queueForUnobservation(observable2);
    }
  }
  function queueForUnobservation(observable2) {
    if (observable2.isPendingUnobservation_ === false) {
      observable2.isPendingUnobservation_ = true;
      globalState.pendingUnobservations.push(observable2);
    }
  }
  function startBatch() {
    globalState.inBatch++;
  }
  function endBatch() {
    if (--globalState.inBatch === 0) {
      runReactions();
      var list = globalState.pendingUnobservations;
      for (var i3 = 0; i3 < list.length; i3++) {
        var observable2 = list[i3];
        observable2.isPendingUnobservation_ = false;
        if (observable2.observers_.size === 0) {
          if (observable2.isBeingObserved_) {
            observable2.isBeingObserved_ = false;
            observable2.onBUO();
          }
          if (observable2 instanceof ComputedValue) {
            observable2.suspend_();
          }
        }
      }
      globalState.pendingUnobservations = [];
    }
  }
  function reportObserved(observable2) {
    checkIfStateReadsAreAllowed(observable2);
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
      if (derivation.runId_ !== observable2.lastAccessedBy_) {
        observable2.lastAccessedBy_ = derivation.runId_;
        derivation.newObserving_[derivation.unboundDepsCount_++] = observable2;
        if (!observable2.isBeingObserved_ && globalState.trackingContext) {
          observable2.isBeingObserved_ = true;
          observable2.onBO();
        }
      }
      return true;
    } else if (observable2.observers_.size === 0 && globalState.inBatch > 0) {
      queueForUnobservation(observable2);
    }
    return false;
  }
  function propagateChanged(observable2) {
    if (observable2.lowestObserverState_ === IDerivationState_.STALE_)
      return;
    observable2.lowestObserverState_ = IDerivationState_.STALE_;
    observable2.observers_.forEach(function(d2) {
      if (d2.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        if (d2.isTracing_ !== TraceMode.NONE) {
          logTraceInfo(d2, observable2);
        }
        d2.onBecomeStale_();
      }
      d2.dependenciesState_ = IDerivationState_.STALE_;
    });
  }
  function propagateChangeConfirmed(observable2) {
    if (observable2.lowestObserverState_ === IDerivationState_.STALE_)
      return;
    observable2.lowestObserverState_ = IDerivationState_.STALE_;
    observable2.observers_.forEach(function(d2) {
      if (d2.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
        d2.dependenciesState_ = IDerivationState_.STALE_;
        if (d2.isTracing_ !== TraceMode.NONE) {
          logTraceInfo(d2, observable2);
        }
      } else if (d2.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        observable2.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      }
    });
  }
  function propagateMaybeChanged(observable2) {
    if (observable2.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_)
      return;
    observable2.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
    observable2.observers_.forEach(function(d2) {
      if (d2.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        d2.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
        d2.onBecomeStale_();
      }
    });
  }
  function logTraceInfo(derivation, observable2) {
    console.log("[mobx.trace] '" + derivation.name_ + "' is invalidated due to a change in: '" + observable2.name_ + "'");
    if (derivation.isTracing_ === TraceMode.BREAK) {
      var lines = [];
      printDepTree(getDependencyTree(derivation), lines, 1);
      new Function("debugger;\n/*\nTracing '" + derivation.name_ + "'\n\nYou are entering this break point because derivation '" + derivation.name_ + "' is being traced and '" + observable2.name_ + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
    }
  }
  function printDepTree(tree, lines, depth) {
    if (lines.length >= 1e3) {
      lines.push("(and many more)");
      return;
    }
    lines.push("" + "	".repeat(depth - 1) + tree.name);
    if (tree.dependencies)
      tree.dependencies.forEach(function(child) {
        return printDepTree(child, lines, depth + 1);
      });
  }
  var Reaction = /* @__PURE__ */ function() {
    function Reaction2(name_, onInvalidate_, errorHandler_, requiresObservable_) {
      if (name_ === void 0) {
        name_ = true ? "Reaction@" + getNextId() : "Reaction";
      }
      if (requiresObservable_ === void 0) {
        requiresObservable_ = false;
      }
      this.name_ = void 0;
      this.onInvalidate_ = void 0;
      this.errorHandler_ = void 0;
      this.requiresObservable_ = void 0;
      this.observing_ = [];
      this.newObserving_ = [];
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.diffValue_ = 0;
      this.runId_ = 0;
      this.unboundDepsCount_ = 0;
      this.isDisposed_ = false;
      this.isScheduled_ = false;
      this.isTrackPending_ = false;
      this.isRunning_ = false;
      this.isTracing_ = TraceMode.NONE;
      this.name_ = name_;
      this.onInvalidate_ = onInvalidate_;
      this.errorHandler_ = errorHandler_;
      this.requiresObservable_ = requiresObservable_;
    }
    var _proto = Reaction2.prototype;
    _proto.onBecomeStale_ = function onBecomeStale_() {
      this.schedule_();
    };
    _proto.schedule_ = function schedule_() {
      if (!this.isScheduled_) {
        this.isScheduled_ = true;
        globalState.pendingReactions.push(this);
        runReactions();
      }
    };
    _proto.isScheduled = function isScheduled() {
      return this.isScheduled_;
    };
    _proto.runReaction_ = function runReaction_() {
      if (!this.isDisposed_) {
        startBatch();
        this.isScheduled_ = false;
        var prev = globalState.trackingContext;
        globalState.trackingContext = this;
        if (shouldCompute(this)) {
          this.isTrackPending_ = true;
          try {
            this.onInvalidate_();
            if (this.isTrackPending_ && isSpyEnabled()) {
              spyReport({
                name: this.name_,
                type: "scheduled-reaction"
              });
            }
          } catch (e5) {
            this.reportExceptionInDerivation_(e5);
          }
        }
        globalState.trackingContext = prev;
        endBatch();
      }
    };
    _proto.track = function track(fn) {
      if (this.isDisposed_) {
        return;
      }
      startBatch();
      var notify = isSpyEnabled();
      var startTime;
      if (notify) {
        startTime = Date.now();
        spyReportStart({
          name: this.name_,
          type: "reaction"
        });
      }
      this.isRunning_ = true;
      var prevReaction = globalState.trackingContext;
      globalState.trackingContext = this;
      var result = trackDerivedFunction(this, fn, void 0);
      globalState.trackingContext = prevReaction;
      this.isRunning_ = false;
      this.isTrackPending_ = false;
      if (this.isDisposed_) {
        clearObserving(this);
      }
      if (isCaughtException(result))
        this.reportExceptionInDerivation_(result.cause);
      if (notify) {
        spyReportEnd({
          time: Date.now() - startTime
        });
      }
      endBatch();
    };
    _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
      var _this = this;
      if (this.errorHandler_) {
        this.errorHandler_(error, this);
        return;
      }
      if (globalState.disableErrorBoundaries)
        throw error;
      var message = true ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
      if (!globalState.suppressReactionErrors) {
        console.error(message, error);
      } else if (true)
        console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)");
      if (isSpyEnabled()) {
        spyReport({
          type: "error",
          name: this.name_,
          message,
          error: "" + error
        });
      }
      globalState.globalReactionErrorHandlers.forEach(function(f2) {
        return f2(error, _this);
      });
    };
    _proto.dispose = function dispose() {
      if (!this.isDisposed_) {
        this.isDisposed_ = true;
        if (!this.isRunning_) {
          startBatch();
          clearObserving(this);
          endBatch();
        }
      }
    };
    _proto.getDisposer_ = function getDisposer_() {
      var r4 = this.dispose.bind(this);
      r4[$mobx] = this;
      return r4;
    };
    _proto.toString = function toString2() {
      return "Reaction[" + this.name_ + "]";
    };
    _proto.trace = function trace$1(enterBreakPoint) {
      if (enterBreakPoint === void 0) {
        enterBreakPoint = false;
      }
      trace(this, enterBreakPoint);
    };
    return Reaction2;
  }();
  var MAX_REACTION_ITERATIONS = 100;
  var reactionScheduler = function reactionScheduler2(f2) {
    return f2();
  };
  function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
      return;
    reactionScheduler(runReactionsHelper);
  }
  function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
      if (++iterations === MAX_REACTION_ITERATIONS) {
        console.error(true ? "Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]) : "[mobx] cycle in reaction: " + allReactions[0]);
        allReactions.splice(0);
      }
      var remainingReactions = allReactions.splice(0);
      for (var i3 = 0, l4 = remainingReactions.length; i3 < l4; i3++) {
        remainingReactions[i3].runReaction_();
      }
    }
    globalState.isRunningReactions = false;
  }
  var isReaction = /* @__PURE__ */ createInstanceofPredicate("Reaction", Reaction);
  function isSpyEnabled() {
    return !!globalState.spyListeners.length;
  }
  function spyReport(event) {
    if (false)
      return;
    if (!globalState.spyListeners.length)
      return;
    var listeners = globalState.spyListeners;
    for (var i3 = 0, l4 = listeners.length; i3 < l4; i3++) {
      listeners[i3](event);
    }
  }
  function spyReportStart(event) {
    if (false)
      return;
    var change = _extends({}, event, {
      spyReportStart: true
    });
    spyReport(change);
  }
  var END_EVENT = {
    type: "report-end",
    spyReportEnd: true
  };
  function spyReportEnd(change) {
    if (false)
      return;
    if (change)
      spyReport(_extends({}, change, {
        type: "report-end",
        spyReportEnd: true
      }));
    else
      spyReport(END_EVENT);
  }
  function spy(listener) {
    if (false) {
      console.warn("[mobx.spy] Is a no-op in production builds");
      return function() {
      };
    } else {
      globalState.spyListeners.push(listener);
      return once(function() {
        globalState.spyListeners = globalState.spyListeners.filter(function(l4) {
          return l4 !== listener;
        });
      });
    }
  }
  var ACTION = "action";
  var ACTION_BOUND = "action.bound";
  var AUTOACTION = "autoAction";
  var AUTOACTION_BOUND = "autoAction.bound";
  var DEFAULT_ACTION_NAME = "<unnamed action>";
  var actionAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION);
  var actionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION_BOUND, {
    bound: true
  });
  var autoActionAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION, {
    autoAction: true
  });
  var autoActionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION_BOUND, {
    autoAction: true,
    bound: true
  });
  function createActionFactory(autoAction2) {
    var res = function action2(arg1, arg2) {
      if (isFunction(arg1))
        return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction2);
      if (isFunction(arg2))
        return createAction(arg1, arg2, autoAction2);
      if (isStringish(arg2)) {
        return storeAnnotation(arg1, arg2, autoAction2 ? autoActionAnnotation : actionAnnotation);
      }
      if (isStringish(arg1)) {
        return createDecoratorAnnotation(createActionAnnotation(autoAction2 ? AUTOACTION : ACTION, {
          name: arg1,
          autoAction: autoAction2
        }));
      }
      if (true)
        die("Invalid arguments for `action`");
    };
    return res;
  }
  var action = /* @__PURE__ */ createActionFactory(false);
  Object.assign(action, actionAnnotation);
  var autoAction = /* @__PURE__ */ createActionFactory(true);
  Object.assign(autoAction, autoActionAnnotation);
  action.bound = /* @__PURE__ */ createDecoratorAnnotation(actionBoundAnnotation);
  autoAction.bound = /* @__PURE__ */ createDecoratorAnnotation(autoActionBoundAnnotation);
  function isAction(thing) {
    return isFunction(thing) && thing.isMobxAction === true;
  }
  function autorun(view, opts) {
    var _opts$name, _opts;
    if (opts === void 0) {
      opts = EMPTY_OBJECT;
    }
    if (true) {
      if (!isFunction(view))
        die("Autorun expects a function as first argument");
      if (isAction(view))
        die("Autorun does not accept actions since actions are untrackable");
    }
    var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : true ? view.name || "Autorun@" + getNextId() : "Autorun";
    var runSync = !opts.scheduler && !opts.delay;
    var reaction2;
    if (runSync) {
      reaction2 = new Reaction(name, function() {
        this.track(reactionRunner);
      }, opts.onError, opts.requiresObservable);
    } else {
      var scheduler = createSchedulerFromOptions(opts);
      var isScheduled = false;
      reaction2 = new Reaction(name, function() {
        if (!isScheduled) {
          isScheduled = true;
          scheduler(function() {
            isScheduled = false;
            if (!reaction2.isDisposed_)
              reaction2.track(reactionRunner);
          });
        }
      }, opts.onError, opts.requiresObservable);
    }
    function reactionRunner() {
      view(reaction2);
    }
    reaction2.schedule_();
    return reaction2.getDisposer_();
  }
  var run = function run2(f2) {
    return f2();
  };
  function createSchedulerFromOptions(opts) {
    return opts.scheduler ? opts.scheduler : opts.delay ? function(f2) {
      return setTimeout(f2, opts.delay);
    } : run;
  }
  var ON_BECOME_OBSERVED = "onBO";
  var ON_BECOME_UNOBSERVED = "onBUO";
  function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
  }
  function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
  }
  function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
    var cb = isFunction(arg3) ? arg3 : arg2;
    var listenersKey = hook + "L";
    if (atom[listenersKey]) {
      atom[listenersKey].add(cb);
    } else {
      atom[listenersKey] = /* @__PURE__ */ new Set([cb]);
    }
    return function() {
      var hookListeners = atom[listenersKey];
      if (hookListeners) {
        hookListeners["delete"](cb);
        if (hookListeners.size === 0) {
          delete atom[listenersKey];
        }
      }
    };
  }
  function extendObservable(target, properties, annotations, options) {
    if (true) {
      if (arguments.length > 4)
        die("'extendObservable' expected 2-4 arguments");
      if (typeof target !== "object")
        die("'extendObservable' expects an object as first argument");
      if (isObservableMap(target))
        die("'extendObservable' should not be used on maps, use map.merge instead");
      if (!isPlainObject(properties))
        die("'extendObservable' only accepts plain objects as second argument");
      if (isObservable(properties) || isObservable(annotations))
        die("Extending an object with another observable (object) is not supported");
    }
    var descriptors = getOwnPropertyDescriptors(properties);
    var adm = asObservableObject(target, options)[$mobx];
    startBatch();
    try {
      ownKeys(descriptors).forEach(function(key) {
        adm.extend_(key, descriptors[key], !annotations ? true : key in annotations ? annotations[key] : true);
      });
    } finally {
      endBatch();
    }
    return target;
  }
  function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
  }
  function nodeToDependencyTree(node) {
    var result = {
      name: node.name_
    };
    if (node.observing_ && node.observing_.length > 0)
      result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
    return result;
  }
  function unique(list) {
    return Array.from(new Set(list));
  }
  var generatorId = 0;
  function FlowCancellationError() {
    this.message = "FLOW_CANCELLED";
  }
  FlowCancellationError.prototype = /* @__PURE__ */ Object.create(Error.prototype);
  var flowAnnotation = /* @__PURE__ */ createFlowAnnotation("flow");
  var flowBoundAnnotation = /* @__PURE__ */ createFlowAnnotation("flow.bound", {
    bound: true
  });
  var flow = /* @__PURE__ */ Object.assign(function flow2(arg1, arg2) {
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, flowAnnotation);
    }
    if (arguments.length !== 1)
      die("Flow expects single argument with generator function");
    var generator = arg1;
    var name = generator.name || "<unnamed flow>";
    var res = function res2() {
      var ctx = this;
      var args = arguments;
      var runId = ++generatorId;
      var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
      var rejector;
      var pendingPromise = void 0;
      var promise = new Promise(function(resolve, reject) {
        var stepId = 0;
        rejector = reject;
        function onFulfilled(res3) {
          pendingPromise = void 0;
          var ret;
          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res3);
          } catch (e5) {
            return reject(e5);
          }
          next(ret);
        }
        function onRejected(err) {
          pendingPromise = void 0;
          var ret;
          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
          } catch (e5) {
            return reject(e5);
          }
          next(ret);
        }
        function next(ret) {
          if (isFunction(ret == null ? void 0 : ret.then)) {
            ret.then(next, reject);
            return;
          }
          if (ret.done)
            return resolve(ret.value);
          pendingPromise = Promise.resolve(ret.value);
          return pendingPromise.then(onFulfilled, onRejected);
        }
        onFulfilled(void 0);
      });
      promise.cancel = action(name + " - runid: " + runId + " - cancel", function() {
        try {
          if (pendingPromise)
            cancelPromise(pendingPromise);
          var _res = gen["return"](void 0);
          var yieldedPromise = Promise.resolve(_res.value);
          yieldedPromise.then(noop, noop);
          cancelPromise(yieldedPromise);
          rejector(new FlowCancellationError());
        } catch (e5) {
          rejector(e5);
        }
      });
      return promise;
    };
    res.isMobXFlow = true;
    return res;
  }, flowAnnotation);
  flow.bound = /* @__PURE__ */ createDecoratorAnnotation(flowBoundAnnotation);
  function cancelPromise(promise) {
    if (isFunction(promise.cancel))
      promise.cancel();
  }
  function isFlow(fn) {
    return (fn == null ? void 0 : fn.isMobXFlow) === true;
  }
  function _isObservable(value, property) {
    if (!value)
      return false;
    if (property !== void 0) {
      if (isObservableMap(value) || isObservableArray(value))
        return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
      if (isObservableObject(value)) {
        return value[$mobx].values_.has(property);
      }
      return false;
    }
    return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
  }
  function isObservable(value) {
    if (arguments.length !== 1)
      die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isObservable(value);
  }
  function trace() {
    if (false)
      die("trace() is not available in production builds");
    var enterBreakPoint = false;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[args.length - 1] === "boolean")
      enterBreakPoint = args.pop();
    var derivation = getAtomFromArgs(args);
    if (!derivation) {
      return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }
    if (derivation.isTracing_ === TraceMode.NONE) {
      console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
    }
    derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
  }
  function getAtomFromArgs(args) {
    switch (args.length) {
      case 0:
        return globalState.trackingDerivation;
      case 1:
        return getAtom(args[0]);
      case 2:
        return getAtom(args[0], args[1]);
    }
  }
  function transaction(action2, thisArg) {
    if (thisArg === void 0) {
      thisArg = void 0;
    }
    startBatch();
    try {
      return action2.apply(thisArg);
    } finally {
      endBatch();
    }
  }
  function getAdm(target) {
    return target[$mobx];
  }
  var objectProxyTraps = {
    has: function has(target, name) {
      if (globalState.trackingDerivation)
        warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
      return getAdm(target).has_(name);
    },
    get: function get(target, name) {
      return getAdm(target).get_(name);
    },
    set: function set2(target, name, value) {
      var _getAdm$set_;
      if (!isStringish(name))
        return false;
      if (!getAdm(target).values_.has(name)) {
        warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
      }
      return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
    },
    deleteProperty: function deleteProperty(target, name) {
      var _getAdm$delete_;
      if (true) {
        warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
      }
      if (!isStringish(name))
        return false;
      return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
    },
    defineProperty: function defineProperty2(target, name, descriptor) {
      var _getAdm$definePropert;
      if (true) {
        warnAboutProxyRequirement("define property on an observable object. Use 'defineProperty' from 'mobx' instead.");
      }
      return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
    },
    ownKeys: function ownKeys2(target) {
      if (globalState.trackingDerivation)
        warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead.");
      return getAdm(target).ownKeys_();
    },
    preventExtensions: function preventExtensions(target) {
      die(13);
    }
  };
  function asDynamicObservableObject(target, options) {
    var _target$$mobx, _target$$mobx$proxy_;
    assertProxies();
    target = asObservableObject(target, options);
    return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
  }
  function hasInterceptors(interceptable) {
    return interceptable.interceptors_ !== void 0 && interceptable.interceptors_.length > 0;
  }
  function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
    interceptors.push(handler);
    return once(function() {
      var idx = interceptors.indexOf(handler);
      if (idx !== -1)
        interceptors.splice(idx, 1);
    });
  }
  function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
      var interceptors = [].concat(interceptable.interceptors_ || []);
      for (var i3 = 0, l4 = interceptors.length; i3 < l4; i3++) {
        change = interceptors[i3](change);
        if (change && !change.type)
          die(14);
        if (!change)
          break;
      }
      return change;
    } finally {
      untrackedEnd(prevU);
    }
  }
  function hasListeners(listenable) {
    return listenable.changeListeners_ !== void 0 && listenable.changeListeners_.length > 0;
  }
  function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
    listeners.push(handler);
    return once(function() {
      var idx = listeners.indexOf(handler);
      if (idx !== -1)
        listeners.splice(idx, 1);
    });
  }
  function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners_;
    if (!listeners)
      return;
    listeners = listeners.slice();
    for (var i3 = 0, l4 = listeners.length; i3 < l4; i3++) {
      listeners[i3](change);
    }
    untrackedEnd(prevU);
  }
  var SPLICE = "splice";
  var UPDATE = "update";
  var MAX_SPLICE_SIZE = 1e4;
  var arrayTraps = {
    get: function get2(target, name) {
      var adm = target[$mobx];
      if (name === $mobx)
        return adm;
      if (name === "length")
        return adm.getArrayLength_();
      if (typeof name === "string" && !isNaN(name)) {
        return adm.get_(parseInt(name));
      }
      if (hasProp(arrayExtensions, name)) {
        return arrayExtensions[name];
      }
      return target[name];
    },
    set: function set3(target, name, value) {
      var adm = target[$mobx];
      if (name === "length") {
        adm.setArrayLength_(value);
      }
      if (typeof name === "symbol" || isNaN(name)) {
        target[name] = value;
      } else {
        adm.set_(parseInt(name), value);
      }
      return true;
    },
    preventExtensions: function preventExtensions2() {
      die(15);
    }
  };
  var ObservableArrayAdministration = /* @__PURE__ */ function() {
    function ObservableArrayAdministration2(name, enhancer, owned_, legacyMode_) {
      if (name === void 0) {
        name = true ? "ObservableArray@" + getNextId() : "ObservableArray";
      }
      this.owned_ = void 0;
      this.legacyMode_ = void 0;
      this.atom_ = void 0;
      this.values_ = [];
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.enhancer_ = void 0;
      this.dehancer = void 0;
      this.proxy_ = void 0;
      this.lastKnownLength_ = 0;
      this.owned_ = owned_;
      this.legacyMode_ = legacyMode_;
      this.atom_ = new Atom(name);
      this.enhancer_ = function(newV, oldV) {
        return enhancer(newV, oldV, true ? name + "[..]" : "ObservableArray[..]");
      };
    }
    var _proto = ObservableArrayAdministration2.prototype;
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0)
        return this.dehancer(value);
      return value;
    };
    _proto.dehanceValues_ = function dehanceValues_(values) {
      if (this.dehancer !== void 0 && values.length > 0)
        return values.map(this.dehancer);
      return values;
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === void 0) {
        fireImmediately = false;
      }
      if (fireImmediately) {
        listener({
          observableKind: "array",
          object: this.proxy_,
          debugObjectName: this.atom_.name_,
          type: "splice",
          index: 0,
          added: this.values_.slice(),
          addedCount: this.values_.length,
          removed: [],
          removedCount: 0
        });
      }
      return registerListener(this, listener);
    };
    _proto.getArrayLength_ = function getArrayLength_() {
      this.atom_.reportObserved();
      return this.values_.length;
    };
    _proto.setArrayLength_ = function setArrayLength_(newLength) {
      if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0)
        die("Out of range: " + newLength);
      var currentLength = this.values_.length;
      if (newLength === currentLength)
        return;
      else if (newLength > currentLength) {
        var newItems = new Array(newLength - currentLength);
        for (var i3 = 0; i3 < newLength - currentLength; i3++) {
          newItems[i3] = void 0;
        }
        this.spliceWithArray_(currentLength, 0, newItems);
      } else
        this.spliceWithArray_(newLength, currentLength - newLength);
    };
    _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
      if (oldLength !== this.lastKnownLength_)
        die(16);
      this.lastKnownLength_ += delta;
      if (this.legacyMode_ && delta > 0)
        reserveArrayBuffer(oldLength + delta + 1);
    };
    _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
      var _this = this;
      checkIfStateModificationsAreAllowed(this.atom_);
      var length = this.values_.length;
      if (index === void 0)
        index = 0;
      else if (index > length)
        index = length;
      else if (index < 0)
        index = Math.max(0, length + index);
      if (arguments.length === 1)
        deleteCount = length - index;
      else if (deleteCount === void 0 || deleteCount === null)
        deleteCount = 0;
      else
        deleteCount = Math.max(0, Math.min(deleteCount, length - index));
      if (newItems === void 0)
        newItems = EMPTY_ARRAY;
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_,
          type: SPLICE,
          index,
          removedCount: deleteCount,
          added: newItems
        });
        if (!change)
          return EMPTY_ARRAY;
        deleteCount = change.removedCount;
        newItems = change.added;
      }
      newItems = newItems.length === 0 ? newItems : newItems.map(function(v2) {
        return _this.enhancer_(v2, void 0);
      });
      if (this.legacyMode_ || true) {
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength_(length, lengthDelta);
      }
      var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
      if (deleteCount !== 0 || newItems.length !== 0)
        this.notifyArraySplice_(index, newItems, res);
      return this.dehanceValues_(res);
    };
    _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
      if (newItems.length < MAX_SPLICE_SIZE) {
        var _this$values_;
        return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
      } else {
        var res = this.values_.slice(index, index + deleteCount);
        var oldItems = this.values_.slice(index + deleteCount);
        this.values_.length += newItems.length - deleteCount;
        for (var i3 = 0; i3 < newItems.length; i3++) {
          this.values_[index + i3] = newItems[i3];
        }
        for (var _i = 0; _i < oldItems.length; _i++) {
          this.values_[index + newItems.length + _i] = oldItems[_i];
        }
        return res;
      }
    };
    _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        type: UPDATE,
        debugObjectName: this.atom_.name_,
        index,
        newValue,
        oldValue
      } : null;
      if (notifySpy)
        spyReportStart(change);
      this.atom_.reportChanged();
      if (notify)
        notifyListeners(this, change);
      if (notifySpy)
        spyReportEnd();
    };
    _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: SPLICE,
        index,
        removed,
        added,
        removedCount: removed.length,
        addedCount: added.length
      } : null;
      if (notifySpy)
        spyReportStart(change);
      this.atom_.reportChanged();
      if (notify)
        notifyListeners(this, change);
      if (notifySpy)
        spyReportEnd();
    };
    _proto.get_ = function get_(index) {
      if (index < this.values_.length) {
        this.atom_.reportObserved();
        return this.dehanceValue_(this.values_[index]);
      }
      console.warn(true ? "[mobx] Out of bounds read: " + index : "[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
    };
    _proto.set_ = function set_(index, newValue) {
      var values = this.values_;
      if (index < values.length) {
        checkIfStateModificationsAreAllowed(this.atom_);
        var oldValue = values[index];
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: UPDATE,
            object: this.proxy_,
            index,
            newValue
          });
          if (!change)
            return;
          newValue = change.newValue;
        }
        newValue = this.enhancer_(newValue, oldValue);
        var changed = newValue !== oldValue;
        if (changed) {
          values[index] = newValue;
          this.notifyArrayChildUpdate_(index, newValue, oldValue);
        }
      } else if (index === values.length) {
        this.spliceWithArray_(index, 0, [newValue]);
      } else {
        die(17, index, values.length);
      }
    };
    return ObservableArrayAdministration2;
  }();
  function createObservableArray(initialValues, enhancer, name, owned) {
    if (name === void 0) {
      name = true ? "ObservableArray@" + getNextId() : "ObservableArray";
    }
    if (owned === void 0) {
      owned = false;
    }
    assertProxies();
    var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
    addHiddenFinalProp(adm.values_, $mobx, adm);
    var proxy = new Proxy(adm.values_, arrayTraps);
    adm.proxy_ = proxy;
    if (initialValues && initialValues.length) {
      var prev = allowStateChangesStart(true);
      adm.spliceWithArray_(0, 0, initialValues);
      allowStateChangesEnd(prev);
    }
    return proxy;
  }
  var arrayExtensions = {
    clear: function clear() {
      return this.splice(0);
    },
    replace: function replace(newItems) {
      var adm = this[$mobx];
      return adm.spliceWithArray_(0, adm.values_.length, newItems);
    },
    toJSON: function toJSON() {
      return this.slice();
    },
    splice: function splice(index, deleteCount) {
      for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        newItems[_key - 2] = arguments[_key];
      }
      var adm = this[$mobx];
      switch (arguments.length) {
        case 0:
          return [];
        case 1:
          return adm.spliceWithArray_(index);
        case 2:
          return adm.spliceWithArray_(index, deleteCount);
      }
      return adm.spliceWithArray_(index, deleteCount, newItems);
    },
    spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
      return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
    },
    push: function push() {
      var adm = this[$mobx];
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }
      adm.spliceWithArray_(adm.values_.length, 0, items);
      return adm.values_.length;
    },
    pop: function pop() {
      return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
    },
    shift: function shift() {
      return this.splice(0, 1)[0];
    },
    unshift: function unshift() {
      var adm = this[$mobx];
      for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }
      adm.spliceWithArray_(0, 0, items);
      return adm.values_.length;
    },
    reverse: function reverse() {
      if (globalState.trackingDerivation) {
        die(37, "reverse");
      }
      this.replace(this.slice().reverse());
      return this;
    },
    sort: function sort() {
      if (globalState.trackingDerivation) {
        die(37, "sort");
      }
      var copy = this.slice();
      copy.sort.apply(copy, arguments);
      this.replace(copy);
      return this;
    },
    remove: function remove(value) {
      var adm = this[$mobx];
      var idx = adm.dehanceValues_(adm.values_).indexOf(value);
      if (idx > -1) {
        this.splice(idx, 1);
        return true;
      }
      return false;
    }
  };
  addArrayExtension("concat", simpleFunc);
  addArrayExtension("flat", simpleFunc);
  addArrayExtension("includes", simpleFunc);
  addArrayExtension("indexOf", simpleFunc);
  addArrayExtension("join", simpleFunc);
  addArrayExtension("lastIndexOf", simpleFunc);
  addArrayExtension("slice", simpleFunc);
  addArrayExtension("toString", simpleFunc);
  addArrayExtension("toLocaleString", simpleFunc);
  addArrayExtension("every", mapLikeFunc);
  addArrayExtension("filter", mapLikeFunc);
  addArrayExtension("find", mapLikeFunc);
  addArrayExtension("findIndex", mapLikeFunc);
  addArrayExtension("flatMap", mapLikeFunc);
  addArrayExtension("forEach", mapLikeFunc);
  addArrayExtension("map", mapLikeFunc);
  addArrayExtension("some", mapLikeFunc);
  addArrayExtension("reduce", reduceLikeFunc);
  addArrayExtension("reduceRight", reduceLikeFunc);
  function addArrayExtension(funcName, funcFactory) {
    if (typeof Array.prototype[funcName] === "function") {
      arrayExtensions[funcName] = funcFactory(funcName);
    }
  }
  function simpleFunc(funcName) {
    return function() {
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }
  function mapLikeFunc(funcName) {
    return function(callback, thisArg) {
      var _this2 = this;
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName](function(element, index) {
        return callback.call(thisArg, element, index, _this2);
      });
    };
  }
  function reduceLikeFunc(funcName) {
    return function() {
      var _this3 = this;
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      var callback = arguments[0];
      arguments[0] = function(accumulator, currentValue, index) {
        return callback(accumulator, currentValue, index, _this3);
      };
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }
  var isObservableArrayAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
  function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
  }
  var _Symbol$iterator;
  var _Symbol$toStringTag;
  var ObservableMapMarker = {};
  var ADD = "add";
  var DELETE = "delete";
  _Symbol$iterator = Symbol.iterator;
  _Symbol$toStringTag = Symbol.toStringTag;
  var ObservableMap = /* @__PURE__ */ function(_Symbol$iterator2, _Symbol$toStringTag2) {
    function ObservableMap2(initialData, enhancer_, name_) {
      if (enhancer_ === void 0) {
        enhancer_ = deepEnhancer;
      }
      if (name_ === void 0) {
        name_ = true ? "ObservableMap@" + getNextId() : "ObservableMap";
      }
      this.enhancer_ = void 0;
      this.name_ = void 0;
      this[$mobx] = ObservableMapMarker;
      this.data_ = void 0;
      this.hasMap_ = void 0;
      this.keysAtom_ = void 0;
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = enhancer_;
      this.name_ = name_;
      if (!isFunction(Map)) {
        die(18);
      }
      this.keysAtom_ = createAtom(true ? this.name_ + ".keys()" : "ObservableMap.keys()");
      this.data_ = /* @__PURE__ */ new Map();
      this.hasMap_ = /* @__PURE__ */ new Map();
      this.merge(initialData);
    }
    var _proto = ObservableMap2.prototype;
    _proto.has_ = function has_(key) {
      return this.data_.has(key);
    };
    _proto.has = function has2(key) {
      var _this = this;
      if (!globalState.trackingDerivation)
        return this.has_(key);
      var entry = this.hasMap_.get(key);
      if (!entry) {
        var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, true ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableMap.key?", false);
        this.hasMap_.set(key, newEntry);
        onBecomeUnobserved(newEntry, function() {
          return _this.hasMap_["delete"](key);
        });
      }
      return entry.get();
    };
    _proto.set = function set4(key, value) {
      var hasKey = this.has_(key);
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: hasKey ? UPDATE : ADD,
          object: this,
          newValue: value,
          name: key
        });
        if (!change)
          return this;
        value = change.newValue;
      }
      if (hasKey) {
        this.updateValue_(key, value);
      } else {
        this.addValue_(key, value);
      }
      return this;
    };
    _proto["delete"] = function _delete(key) {
      var _this2 = this;
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          name: key
        });
        if (!change)
          return false;
      }
      if (this.has_(key)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var _change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: this.data_.get(key).value_,
          name: key
        } : null;
        if (notifySpy)
          spyReportStart(_change);
        transaction(function() {
          var _this2$hasMap_$get;
          _this2.keysAtom_.reportChanged();
          (_this2$hasMap_$get = _this2.hasMap_.get(key)) == null ? void 0 : _this2$hasMap_$get.setNewValue_(false);
          var observable2 = _this2.data_.get(key);
          observable2.setNewValue_(void 0);
          _this2.data_["delete"](key);
        });
        if (notify)
          notifyListeners(this, _change);
        if (notifySpy)
          spyReportEnd();
        return true;
      }
      return false;
    };
    _proto.updateValue_ = function updateValue_(key, newValue) {
      var observable2 = this.data_.get(key);
      newValue = observable2.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: UPDATE,
          object: this,
          oldValue: observable2.value_,
          name: key,
          newValue
        } : null;
        if (notifySpy)
          spyReportStart(change);
        observable2.setNewValue_(newValue);
        if (notify)
          notifyListeners(this, change);
        if (notifySpy)
          spyReportEnd();
      }
    };
    _proto.addValue_ = function addValue_(key, newValue) {
      var _this3 = this;
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      transaction(function() {
        var _this3$hasMap_$get;
        var observable2 = new ObservableValue(newValue, _this3.enhancer_, true ? _this3.name_ + "." + stringifyKey(key) : "ObservableMap.key", false);
        _this3.data_.set(key, observable2);
        newValue = observable2.value_;
        (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null ? void 0 : _this3$hasMap_$get.setNewValue_(true);
        _this3.keysAtom_.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        name: key,
        newValue
      } : null;
      if (notifySpy)
        spyReportStart(change);
      if (notify)
        notifyListeners(this, change);
      if (notifySpy)
        spyReportEnd();
    };
    _proto.get = function get3(key) {
      if (this.has(key))
        return this.dehanceValue_(this.data_.get(key).get());
      return this.dehanceValue_(void 0);
    };
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.keys = function keys() {
      this.keysAtom_.reportObserved();
      return this.data_.keys();
    };
    _proto.values = function values() {
      var self2 = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next = keys.next(), done = _keys$next.done, value = _keys$next.value;
          return {
            done,
            value: done ? void 0 : self2.get(value)
          };
        }
      });
    };
    _proto.entries = function entries() {
      var self2 = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next2 = keys.next(), done = _keys$next2.done, value = _keys$next2.value;
          return {
            done,
            value: done ? void 0 : [value, self2.get(value)]
          };
        }
      });
    };
    _proto[_Symbol$iterator2] = function() {
      return this.entries();
    };
    _proto.forEach = function forEach(callback, thisArg) {
      for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done; ) {
        var _step$value = _step.value, key = _step$value[0], value = _step$value[1];
        callback.call(thisArg, value, key, this);
      }
    };
    _proto.merge = function merge(other) {
      var _this4 = this;
      if (isObservableMap(other)) {
        other = new Map(other);
      }
      transaction(function() {
        if (isPlainObject(other))
          getPlainObjectKeys(other).forEach(function(key) {
            return _this4.set(key, other[key]);
          });
        else if (Array.isArray(other))
          other.forEach(function(_ref) {
            var key = _ref[0], value = _ref[1];
            return _this4.set(key, value);
          });
        else if (isES6Map(other)) {
          if (other.constructor !== Map)
            die(19, other);
          other.forEach(function(value, key) {
            return _this4.set(key, value);
          });
        } else if (other !== null && other !== void 0)
          die(20, other);
      });
      return this;
    };
    _proto.clear = function clear2() {
      var _this5 = this;
      transaction(function() {
        untracked(function() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(_this5.keys()), _step2; !(_step2 = _iterator2()).done; ) {
            var key = _step2.value;
            _this5["delete"](key);
          }
        });
      });
    };
    _proto.replace = function replace2(values) {
      var _this6 = this;
      transaction(function() {
        var replacementMap = convertToMap(values);
        var orderedData = /* @__PURE__ */ new Map();
        var keysReportChangedCalled = false;
        for (var _iterator3 = _createForOfIteratorHelperLoose(_this6.data_.keys()), _step3; !(_step3 = _iterator3()).done; ) {
          var key = _step3.value;
          if (!replacementMap.has(key)) {
            var deleted = _this6["delete"](key);
            if (deleted) {
              keysReportChangedCalled = true;
            } else {
              var value = _this6.data_.get(key);
              orderedData.set(key, value);
            }
          }
        }
        for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done; ) {
          var _step4$value = _step4.value, _key = _step4$value[0], _value = _step4$value[1];
          var keyExisted = _this6.data_.has(_key);
          _this6.set(_key, _value);
          if (_this6.data_.has(_key)) {
            var _value2 = _this6.data_.get(_key);
            orderedData.set(_key, _value2);
            if (!keyExisted) {
              keysReportChangedCalled = true;
            }
          }
        }
        if (!keysReportChangedCalled) {
          if (_this6.data_.size !== orderedData.size) {
            _this6.keysAtom_.reportChanged();
          } else {
            var iter1 = _this6.data_.keys();
            var iter2 = orderedData.keys();
            var next1 = iter1.next();
            var next2 = iter2.next();
            while (!next1.done) {
              if (next1.value !== next2.value) {
                _this6.keysAtom_.reportChanged();
                break;
              }
              next1 = iter1.next();
              next2 = iter2.next();
            }
          }
        }
        _this6.data_ = orderedData;
      });
      return this;
    };
    _proto.toString = function toString2() {
      return "[object ObservableMap]";
    };
    _proto.toJSON = function toJSON2() {
      return Array.from(this);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === true)
        die("`observe` doesn't support fireImmediately=true in combination with maps.");
      return registerListener(this, listener);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _createClass(ObservableMap2, [{
      key: "size",
      get: function get3() {
        this.keysAtom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag2,
      get: function get3() {
        return "Map";
      }
    }]);
    return ObservableMap2;
  }(_Symbol$iterator, _Symbol$toStringTag);
  var isObservableMap = /* @__PURE__ */ createInstanceofPredicate("ObservableMap", ObservableMap);
  function convertToMap(dataStructure) {
    if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
      return dataStructure;
    } else if (Array.isArray(dataStructure)) {
      return new Map(dataStructure);
    } else if (isPlainObject(dataStructure)) {
      var map2 = /* @__PURE__ */ new Map();
      for (var key in dataStructure) {
        map2.set(key, dataStructure[key]);
      }
      return map2;
    } else {
      return die(21, dataStructure);
    }
  }
  var _Symbol$iterator$1;
  var _Symbol$toStringTag$1;
  var ObservableSetMarker = {};
  _Symbol$iterator$1 = Symbol.iterator;
  _Symbol$toStringTag$1 = Symbol.toStringTag;
  var ObservableSet = /* @__PURE__ */ function(_Symbol$iterator2, _Symbol$toStringTag2) {
    function ObservableSet2(initialData, enhancer, name_) {
      if (enhancer === void 0) {
        enhancer = deepEnhancer;
      }
      if (name_ === void 0) {
        name_ = true ? "ObservableSet@" + getNextId() : "ObservableSet";
      }
      this.name_ = void 0;
      this[$mobx] = ObservableSetMarker;
      this.data_ = /* @__PURE__ */ new Set();
      this.atom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = void 0;
      this.name_ = name_;
      if (!isFunction(Set)) {
        die(22);
      }
      this.atom_ = createAtom(this.name_);
      this.enhancer_ = function(newV, oldV) {
        return enhancer(newV, oldV, name_);
      };
      if (initialData) {
        this.replace(initialData);
      }
    }
    var _proto = ObservableSet2.prototype;
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.clear = function clear2() {
      var _this = this;
      transaction(function() {
        untracked(function() {
          for (var _iterator = _createForOfIteratorHelperLoose(_this.data_.values()), _step; !(_step = _iterator()).done; ) {
            var value = _step.value;
            _this["delete"](value);
          }
        });
      });
    };
    _proto.forEach = function forEach(callbackFn, thisArg) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done; ) {
        var value = _step2.value;
        callbackFn.call(thisArg, value, value, this);
      }
    };
    _proto.add = function add(value) {
      var _this2 = this;
      checkIfStateModificationsAreAllowed(this.atom_);
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: ADD,
          object: this,
          newValue: value
        });
        if (!change)
          return this;
      }
      if (!this.has(value)) {
        transaction(function() {
          _this2.data_.add(_this2.enhancer_(value, void 0));
          _this2.atom_.reportChanged();
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var _change = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: ADD,
          object: this,
          newValue: value
        } : null;
        if (notifySpy && true)
          spyReportStart(_change);
        if (notify)
          notifyListeners(this, _change);
        if (notifySpy && true)
          spyReportEnd();
      }
      return this;
    };
    _proto["delete"] = function _delete(value) {
      var _this3 = this;
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          oldValue: value
        });
        if (!change)
          return false;
      }
      if (this.has(value)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var _change2 = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: value
        } : null;
        if (notifySpy && true)
          spyReportStart(_change2);
        transaction(function() {
          _this3.atom_.reportChanged();
          _this3.data_["delete"](value);
        });
        if (notify)
          notifyListeners(this, _change2);
        if (notifySpy && true)
          spyReportEnd();
        return true;
      }
      return false;
    };
    _proto.has = function has2(value) {
      this.atom_.reportObserved();
      return this.data_.has(this.dehanceValue_(value));
    };
    _proto.entries = function entries() {
      var nextIndex = 0;
      var keys = Array.from(this.keys());
      var values = Array.from(this.values());
      return makeIterable({
        next: function next() {
          var index = nextIndex;
          nextIndex += 1;
          return index < values.length ? {
            value: [keys[index], values[index]],
            done: false
          } : {
            done: true
          };
        }
      });
    };
    _proto.keys = function keys() {
      return this.values();
    };
    _proto.values = function values() {
      this.atom_.reportObserved();
      var self2 = this;
      var nextIndex = 0;
      var observableValues = Array.from(this.data_.values());
      return makeIterable({
        next: function next() {
          return nextIndex < observableValues.length ? {
            value: self2.dehanceValue_(observableValues[nextIndex++]),
            done: false
          } : {
            done: true
          };
        }
      });
    };
    _proto.replace = function replace2(other) {
      var _this4 = this;
      if (isObservableSet(other)) {
        other = new Set(other);
      }
      transaction(function() {
        if (Array.isArray(other)) {
          _this4.clear();
          other.forEach(function(value) {
            return _this4.add(value);
          });
        } else if (isES6Set(other)) {
          _this4.clear();
          other.forEach(function(value) {
            return _this4.add(value);
          });
        } else if (other !== null && other !== void 0) {
          die("Cannot initialize set from " + other);
        }
      });
      return this;
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === true)
        die("`observe` doesn't support fireImmediately=true in combination with sets.");
      return registerListener(this, listener);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.toJSON = function toJSON2() {
      return Array.from(this);
    };
    _proto.toString = function toString2() {
      return "[object ObservableSet]";
    };
    _proto[_Symbol$iterator2] = function() {
      return this.values();
    };
    _createClass(ObservableSet2, [{
      key: "size",
      get: function get3() {
        this.atom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag2,
      get: function get3() {
        return "Set";
      }
    }]);
    return ObservableSet2;
  }(_Symbol$iterator$1, _Symbol$toStringTag$1);
  var isObservableSet = /* @__PURE__ */ createInstanceofPredicate("ObservableSet", ObservableSet);
  var descriptorCache = /* @__PURE__ */ Object.create(null);
  var REMOVE = "remove";
  var ObservableObjectAdministration = /* @__PURE__ */ function() {
    function ObservableObjectAdministration2(target_, values_, name_, defaultAnnotation_) {
      if (values_ === void 0) {
        values_ = /* @__PURE__ */ new Map();
      }
      if (defaultAnnotation_ === void 0) {
        defaultAnnotation_ = autoAnnotation;
      }
      this.target_ = void 0;
      this.values_ = void 0;
      this.name_ = void 0;
      this.defaultAnnotation_ = void 0;
      this.keysAtom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.proxy_ = void 0;
      this.isPlainObject_ = void 0;
      this.appliedAnnotations_ = void 0;
      this.pendingKeys_ = void 0;
      this.target_ = target_;
      this.values_ = values_;
      this.name_ = name_;
      this.defaultAnnotation_ = defaultAnnotation_;
      this.keysAtom_ = new Atom(true ? this.name_ + ".keys" : "ObservableObject.keys");
      this.isPlainObject_ = isPlainObject(this.target_);
      if (!isAnnotation(this.defaultAnnotation_)) {
        die("defaultAnnotation must be valid annotation");
      }
      if (true) {
        this.appliedAnnotations_ = {};
      }
    }
    var _proto = ObservableObjectAdministration2.prototype;
    _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
      return this.values_.get(key).get();
    };
    _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
      var observable2 = this.values_.get(key);
      if (observable2 instanceof ComputedValue) {
        observable2.set(newValue);
        return true;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_ || this.target_,
          name: key,
          newValue
        });
        if (!change)
          return null;
        newValue = change.newValue;
      }
      newValue = observable2.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notify = hasListeners(this);
        var notifySpy = isSpyEnabled();
        var _change = notify || notifySpy ? {
          type: UPDATE,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          oldValue: observable2.value_,
          name: key,
          newValue
        } : null;
        if (notifySpy)
          spyReportStart(_change);
        observable2.setNewValue_(newValue);
        if (notify)
          notifyListeners(this, _change);
        if (notifySpy)
          spyReportEnd();
      }
      return true;
    };
    _proto.get_ = function get_(key) {
      if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
        this.has_(key);
      }
      return this.target_[key];
    };
    _proto.set_ = function set_(key, value, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      if (hasProp(this.target_, key)) {
        if (this.values_.has(key)) {
          return this.setObservablePropValue_(key, value);
        } else if (proxyTrap) {
          return Reflect.set(this.target_, key, value);
        } else {
          this.target_[key] = value;
          return true;
        }
      } else {
        return this.extend_(key, {
          value,
          enumerable: true,
          writable: true,
          configurable: true
        }, this.defaultAnnotation_, proxyTrap);
      }
    };
    _proto.has_ = function has_(key) {
      if (!globalState.trackingDerivation) {
        return key in this.target_;
      }
      this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
      var entry = this.pendingKeys_.get(key);
      if (!entry) {
        entry = new ObservableValue(key in this.target_, referenceEnhancer, true ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableObject.key?", false);
        this.pendingKeys_.set(key, entry);
      }
      return entry.get();
    };
    _proto.make_ = function make_(key, annotation) {
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }
      if (annotation === false) {
        return;
      }
      assertAnnotable(this, annotation, key);
      if (!(key in this.target_)) {
        var _this$target_$storedA;
        if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
          return;
        } else {
          die(1, annotation.annotationType_, this.name_ + "." + key.toString());
        }
      }
      var source = this.target_;
      while (source && source !== objectPrototype) {
        var descriptor = getDescriptor(source, key);
        if (descriptor) {
          var outcome = annotation.make_(this, key, descriptor, source);
          if (outcome === 0)
            return;
          if (outcome === 1)
            break;
        }
        source = Object.getPrototypeOf(source);
      }
      recordAnnotationApplied(this, annotation, key);
    };
    _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }
      if (annotation === false) {
        return this.defineProperty_(key, descriptor, proxyTrap);
      }
      assertAnnotable(this, annotation, key);
      var outcome = annotation.extend_(this, key, descriptor, proxyTrap);
      if (outcome) {
        recordAnnotationApplied(this, annotation, key);
      }
      return outcome;
    };
    _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: descriptor.value
          });
          if (!change)
            return null;
          var newValue = change.newValue;
          if (descriptor.value !== newValue) {
            descriptor = _extends({}, descriptor, {
              value: newValue
            });
          }
        }
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        this.notifyPropertyAddition_(key, descriptor.value);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: value
          });
          if (!change)
            return null;
          value = change.newValue;
        }
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: true,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        var observable2 = new ObservableValue(value, enhancer, true ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
        this.values_.set(key, observable2);
        this.notifyPropertyAddition_(key, observable2.value_);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: void 0
          });
          if (!change)
            return null;
        }
        options.name || (options.name = true ? this.name_ + "." + key.toString() : "ObservableObject.key");
        options.context = this.proxy_ || this.target_;
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: false,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        this.values_.set(key, new ComputedValue(options));
        this.notifyPropertyAddition_(key, void 0);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.delete_ = function delete_(key, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      if (!hasProp(this.target_, key)) {
        return true;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: REMOVE
        });
        if (!change)
          return null;
      }
      try {
        var _this$pendingKeys_, _this$pendingKeys_$ge;
        startBatch();
        var notify = hasListeners(this);
        var notifySpy = isSpyEnabled();
        var observable2 = this.values_.get(key);
        var value = void 0;
        if (!observable2 && (notify || notifySpy)) {
          var _getDescriptor2;
          value = (_getDescriptor2 = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor2.value;
        }
        if (proxyTrap) {
          if (!Reflect.deleteProperty(this.target_, key)) {
            return false;
          }
        } else {
          delete this.target_[key];
        }
        if (true) {
          delete this.appliedAnnotations_[key];
        }
        if (observable2) {
          this.values_["delete"](key);
          if (observable2 instanceof ObservableValue) {
            value = observable2.value_;
          }
          propagateChanged(observable2);
        }
        this.keysAtom_.reportChanged();
        (_this$pendingKeys_ = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null ? void 0 : _this$pendingKeys_$ge.set(key in this.target_);
        if (notify || notifySpy) {
          var _change2 = {
            type: REMOVE,
            observableKind: "object",
            object: this.proxy_ || this.target_,
            debugObjectName: this.name_,
            oldValue: value,
            name: key
          };
          if (notifySpy)
            spyReportStart(_change2);
          if (notify)
            notifyListeners(this, _change2);
          if (notifySpy)
            spyReportEnd();
        }
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.observe_ = function observe_(callback, fireImmediately) {
      if (fireImmediately === true)
        die("`observe` doesn't support the fire immediately property for observable objects.");
      return registerListener(this, callback);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
      var _this$pendingKeys_2, _this$pendingKeys_2$g;
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      if (notify || notifySpy) {
        var change = notify || notifySpy ? {
          type: ADD,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: value
        } : null;
        if (notifySpy)
          spyReportStart(change);
        if (notify)
          notifyListeners(this, change);
        if (notifySpy)
          spyReportEnd();
      }
      (_this$pendingKeys_2 = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null ? void 0 : _this$pendingKeys_2$g.set(true);
      this.keysAtom_.reportChanged();
    };
    _proto.ownKeys_ = function ownKeys_() {
      this.keysAtom_.reportObserved();
      return ownKeys(this.target_);
    };
    _proto.keys_ = function keys_() {
      this.keysAtom_.reportObserved();
      return Object.keys(this.target_);
    };
    return ObservableObjectAdministration2;
  }();
  function asObservableObject(target, options) {
    var _options$name;
    if (options && isObservableObject(target)) {
      die("Options can't be provided for already observable objects.");
    }
    if (hasProp(target, $mobx)) {
      if (!(getAdministration(target) instanceof ObservableObjectAdministration)) {
        die("Cannot convert '" + getDebugName(target) + "' into observable object:\nThe target is already observable of different type.\nExtending builtins is not supported.");
      }
      return target;
    }
    if (!Object.isExtensible(target))
      die("Cannot make the designated object observable; it is not extensible");
    var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : true ? (isPlainObject(target) ? "ObservableObject" : target.constructor.name) + "@" + getNextId() : "ObservableObject";
    var adm = new ObservableObjectAdministration(target, /* @__PURE__ */ new Map(), String(name), getAnnotationFromOptions(options));
    addHiddenProp(target, $mobx, adm);
    return target;
  }
  var isObservableObjectAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
  function getCachedObservablePropDescriptor(key) {
    return descriptorCache[key] || (descriptorCache[key] = {
      get: function get3() {
        return this[$mobx].getObservablePropValue_(key);
      },
      set: function set4(value) {
        return this[$mobx].setObservablePropValue_(key, value);
      }
    });
  }
  function isObservableObject(thing) {
    if (isObject(thing)) {
      return isObservableObjectAdministration(thing[$mobx]);
    }
    return false;
  }
  function recordAnnotationApplied(adm, annotation, key) {
    var _adm$target_$storedAn;
    if (true) {
      adm.appliedAnnotations_[key] = annotation;
    }
    (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null ? true : delete _adm$target_$storedAn[key];
  }
  function assertAnnotable(adm, annotation, key) {
    if (!isAnnotation(annotation)) {
      die("Cannot annotate '" + adm.name_ + "." + key.toString() + "': Invalid annotation.");
    }
    if (!isOverride(annotation) && hasProp(adm.appliedAnnotations_, key)) {
      var fieldName = adm.name_ + "." + key.toString();
      var currentAnnotationType = adm.appliedAnnotations_[key].annotationType_;
      var requestedAnnotationType = annotation.annotationType_;
      die("Cannot apply '" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already annotated with '" + currentAnnotationType + "'.") + "\nRe-annotating fields is not allowed.\nUse 'override' annotation for methods overriden by subclass.");
    }
  }
  var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
  var StubArray = function StubArray2() {
  };
  function inherit(ctor, proto) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ctor.prototype, proto);
    } else if (ctor.prototype.__proto__ !== void 0) {
      ctor.prototype.__proto__ = proto;
    } else {
      ctor.prototype = proto;
    }
  }
  inherit(StubArray, Array.prototype);
  var LegacyObservableArray = /* @__PURE__ */ function(_StubArray, _Symbol$toStringTag2, _Symbol$iterator2) {
    _inheritsLoose(LegacyObservableArray2, _StubArray);
    function LegacyObservableArray2(initialValues, enhancer, name, owned) {
      var _this;
      if (name === void 0) {
        name = true ? "ObservableArray@" + getNextId() : "ObservableArray";
      }
      if (owned === void 0) {
        owned = false;
      }
      _this = _StubArray.call(this) || this;
      var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
      adm.proxy_ = _assertThisInitialized(_this);
      addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);
      if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart(true);
        _this.spliceWithArray(0, 0, initialValues);
        allowStateChangesEnd(prev);
      }
      return _this;
    }
    var _proto = LegacyObservableArray2.prototype;
    _proto.concat = function concat() {
      this[$mobx].atom_.reportObserved();
      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }
      return Array.prototype.concat.apply(this.slice(), arrays.map(function(a3) {
        return isObservableArray(a3) ? a3.slice() : a3;
      }));
    };
    _proto[_Symbol$iterator2] = function() {
      var self2 = this;
      var nextIndex = 0;
      return makeIterable({
        next: function next() {
          return nextIndex < self2.length ? {
            value: self2[nextIndex++],
            done: false
          } : {
            done: true,
            value: void 0
          };
        }
      });
    };
    _createClass(LegacyObservableArray2, [{
      key: "length",
      get: function get3() {
        return this[$mobx].getArrayLength_();
      },
      set: function set4(newLength) {
        this[$mobx].setArrayLength_(newLength);
      }
    }, {
      key: _Symbol$toStringTag2,
      get: function get3() {
        return "Array";
      }
    }]);
    return LegacyObservableArray2;
  }(StubArray, Symbol.toStringTag, Symbol.iterator);
  Object.entries(arrayExtensions).forEach(function(_ref) {
    var prop = _ref[0], fn = _ref[1];
    if (prop !== "concat")
      addHiddenProp(LegacyObservableArray.prototype, prop, fn);
  });
  function createArrayEntryDescriptor(index) {
    return {
      enumerable: false,
      configurable: true,
      get: function get3() {
        return this[$mobx].get_(index);
      },
      set: function set4(value) {
        this[$mobx].set_(index, value);
      }
    };
  }
  function createArrayBufferItem(index) {
    defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
  }
  function reserveArrayBuffer(max) {
    if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
      for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
        createArrayBufferItem(index);
      }
      OBSERVABLE_ARRAY_BUFFER_SIZE = max;
    }
  }
  reserveArrayBuffer(1e3);
  function createLegacyArray(initialValues, enhancer, name) {
    return new LegacyObservableArray(initialValues, enhancer, name);
  }
  function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
      if (isObservableArray(thing)) {
        if (property !== void 0)
          die(23);
        return thing[$mobx].atom_;
      }
      if (isObservableSet(thing)) {
        return thing[$mobx];
      }
      if (isObservableMap(thing)) {
        if (property === void 0)
          return thing.keysAtom_;
        var observable2 = thing.data_.get(property) || thing.hasMap_.get(property);
        if (!observable2)
          die(25, property, getDebugName(thing));
        return observable2;
      }
      if (isObservableObject(thing)) {
        if (!property)
          return die(26);
        var _observable = thing[$mobx].values_.get(property);
        if (!_observable)
          die(27, property, getDebugName(thing));
        return _observable;
      }
      if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
        return thing;
      }
    } else if (isFunction(thing)) {
      if (isReaction(thing[$mobx])) {
        return thing[$mobx];
      }
    }
    die(28);
  }
  function getAdministration(thing, property) {
    if (!thing)
      die(29);
    if (property !== void 0)
      return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
      return thing;
    if (isObservableMap(thing) || isObservableSet(thing))
      return thing;
    if (thing[$mobx])
      return thing[$mobx];
    die(24, thing);
  }
  function getDebugName(thing, property) {
    var named;
    if (property !== void 0) {
      named = getAtom(thing, property);
    } else if (isAction(thing)) {
      return thing.name;
    } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
      named = getAdministration(thing);
    } else {
      named = getAtom(thing);
    }
    return named.name_;
  }
  var toString = objectPrototype.toString;
  function deepEqual(a3, b2, depth) {
    if (depth === void 0) {
      depth = -1;
    }
    return eq(a3, b2, depth);
  }
  function eq(a3, b2, depth, aStack, bStack) {
    if (a3 === b2)
      return a3 !== 0 || 1 / a3 === 1 / b2;
    if (a3 == null || b2 == null)
      return false;
    if (a3 !== a3)
      return b2 !== b2;
    var type = typeof a3;
    if (!isFunction(type) && type !== "object" && typeof b2 != "object")
      return false;
    var className = toString.call(a3);
    if (className !== toString.call(b2))
      return false;
    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a3 === "" + b2;
      case "[object Number]":
        if (+a3 !== +a3)
          return +b2 !== +b2;
        return +a3 === 0 ? 1 / +a3 === 1 / b2 : +a3 === +b2;
      case "[object Date]":
      case "[object Boolean]":
        return +a3 === +b2;
      case "[object Symbol]":
        return typeof Symbol !== "undefined" && Symbol.valueOf.call(a3) === Symbol.valueOf.call(b2);
      case "[object Map]":
      case "[object Set]":
        if (depth >= 0) {
          depth++;
        }
        break;
    }
    a3 = unwrap(a3);
    b2 = unwrap(b2);
    var areArrays = className === "[object Array]";
    if (!areArrays) {
      if (typeof a3 != "object" || typeof b2 != "object")
        return false;
      var aCtor = a3.constructor, bCtor = b2.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a3 && "constructor" in b2) {
        return false;
      }
    }
    if (depth === 0) {
      return false;
    } else if (depth < 0) {
      depth = -1;
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      if (aStack[length] === a3)
        return bStack[length] === b2;
    }
    aStack.push(a3);
    bStack.push(b2);
    if (areArrays) {
      length = a3.length;
      if (length !== b2.length)
        return false;
      while (length--) {
        if (!eq(a3[length], b2[length], depth - 1, aStack, bStack))
          return false;
      }
    } else {
      var keys = Object.keys(a3);
      var key;
      length = keys.length;
      if (Object.keys(b2).length !== length)
        return false;
      while (length--) {
        key = keys[length];
        if (!(hasProp(b2, key) && eq(a3[key], b2[key], depth - 1, aStack, bStack)))
          return false;
      }
    }
    aStack.pop();
    bStack.pop();
    return true;
  }
  function unwrap(a3) {
    if (isObservableArray(a3))
      return a3.slice();
    if (isES6Map(a3) || isObservableMap(a3))
      return Array.from(a3.entries());
    if (isES6Set(a3) || isObservableSet(a3))
      return Array.from(a3.entries());
    return a3;
  }
  function makeIterable(iterator) {
    iterator[Symbol.iterator] = getSelf;
    return iterator;
  }
  function getSelf() {
    return this;
  }
  function isAnnotation(thing) {
    return thing instanceof Object && typeof thing.annotationType_ === "string" && isFunction(thing.make_) && isFunction(thing.extend_);
  }
  ["Symbol", "Map", "Set"].forEach(function(m2) {
    var g2 = getGlobal();
    if (typeof g2[m2] === "undefined") {
      die("MobX requires global '" + m2 + "' to be available or polyfilled");
    }
  });
  if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
      spy,
      extras: {
        getDebugName
      },
      $mobx
    });
  }

  // node_modules/@adobe/lit-mobx/lib/mixin.js
  var reaction = Symbol("LitMobxRenderReaction");
  var cachedRequestUpdate = Symbol("LitMobxRequestUpdate");
  function MobxReactionUpdate(constructor) {
    var _a, _b;
    return _b = class MobxReactingElement extends constructor {
      constructor() {
        super(...arguments);
        this[_a] = () => {
          this.requestUpdate();
        };
      }
      connectedCallback() {
        super.connectedCallback();
        const name = this.constructor.name || this.nodeName;
        this[reaction] = new Reaction(`${name}.update()`, this[cachedRequestUpdate]);
        if (this.hasUpdated)
          this.requestUpdate();
      }
      disconnectedCallback() {
        super.disconnectedCallback();
        if (this[reaction]) {
          this[reaction].dispose();
          this[reaction] = void 0;
        }
      }
      update(changedProperties) {
        if (this[reaction]) {
          this[reaction].track(super.update.bind(this, changedProperties));
        } else {
          super.update(changedProperties);
        }
      }
    }, _a = cachedRequestUpdate, _b;
  }

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e = Symbol();
  var n = /* @__PURE__ */ new Map();
  var s = class {
    constructor(t3, n6) {
      if (this._$cssResult$ = true, n6 !== e)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3;
    }
    get styleSheet() {
      let e5 = n.get(this.cssText);
      return t && e5 === void 0 && (n.set(this.cssText, e5 = new CSSStyleSheet()), e5.replaceSync(this.cssText)), e5;
    }
    toString() {
      return this.cssText;
    }
  };
  var o = (t3) => new s(typeof t3 == "string" ? t3 : t3 + "", e);
  var i = (e5, n6) => {
    t ? e5.adoptedStyleSheets = n6.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n6.forEach((t3) => {
      const n7 = document.createElement("style"), s5 = window.litNonce;
      s5 !== void 0 && n7.setAttribute("nonce", s5), n7.textContent = t3.cssText, e5.appendChild(n7);
    });
  };
  var S = t ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e5 = "";
    for (const n6 of t4.cssRules)
      e5 += n6.cssText;
    return o(e5);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window.trustedTypes;
  var r2 = e2 ? e2.emptyScript : "";
  var h = window.reactiveElementPolyfillSupport;
  var o2 = { toAttribute(t3, i3) {
    switch (i3) {
      case Boolean:
        t3 = t3 ? r2 : null;
        break;
      case Object:
      case Array:
        t3 = t3 == null ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i3) {
    let s5 = t3;
    switch (i3) {
      case Boolean:
        s5 = t3 !== null;
        break;
      case Number:
        s5 = t3 === null ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t3);
        } catch (t4) {
          s5 = null;
        }
    }
    return s5;
  } };
  var n2 = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
  var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
  var a = class extends HTMLElement {
    constructor() {
      super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
    }
    static addInitializer(t3) {
      var i3;
      (i3 = this.l) !== null && i3 !== void 0 || (this.l = []), this.l.push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i3, s5) => {
        const e5 = this._$Eh(s5, i3);
        e5 !== void 0 && (this._$Eu.set(e5, s5), t3.push(e5));
      }), t3;
    }
    static createProperty(t3, i3 = l) {
      if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e5 = this.getPropertyDescriptor(t3, s5, i3);
        e5 !== void 0 && Object.defineProperty(this.prototype, t3, e5);
      }
    }
    static getPropertyDescriptor(t3, i3, s5) {
      return { get() {
        return this[i3];
      }, set(e5) {
        const r4 = this[t3];
        this[i3] = e5, this.requestUpdate(t3, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t3 = Object.getPrototypeOf(this);
      if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i3)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i3) {
      const s5 = [];
      if (Array.isArray(i3)) {
        const e5 = new Set(i3.flat(1 / 0).reverse());
        for (const i4 of e5)
          s5.unshift(S(i4));
      } else
        i3 !== void 0 && s5.push(S(i3));
      return s5;
    }
    static _$Eh(t3, i3) {
      const s5 = i3.attribute;
      return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
    }
    o() {
      var t3;
      this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t3 = this.constructor.l) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i3, s5;
      ((i3 = this._$Eg) !== null && i3 !== void 0 ? i3 : this._$Eg = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s5 = t3.hostConnected) === null || s5 === void 0 || s5.call(t3));
    }
    removeController(t3) {
      var i3;
      (i3 = this._$Eg) === null || i3 === void 0 || i3.splice(this._$Eg.indexOf(t3) >>> 0, 1);
    }
    _$Em() {
      this.constructor.elementProperties.forEach((t3, i3) => {
        this.hasOwnProperty(i3) && (this._$Et.set(i3, this[i3]), delete this[i3]);
      });
    }
    createRenderRoot() {
      var t3;
      const s5 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
      return i(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t3;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostConnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostDisconnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
      });
    }
    attributeChangedCallback(t3, i3, s5) {
      this._$AK(t3, s5);
    }
    _$ES(t3, i3, s5 = l) {
      var e5, r4;
      const h3 = this.constructor._$Eh(t3, s5);
      if (h3 !== void 0 && s5.reflect === true) {
        const n6 = ((r4 = (e5 = s5.converter) === null || e5 === void 0 ? void 0 : e5.toAttribute) !== null && r4 !== void 0 ? r4 : o2.toAttribute)(i3, s5.type);
        this._$Ei = t3, n6 == null ? this.removeAttribute(h3) : this.setAttribute(h3, n6), this._$Ei = null;
      }
    }
    _$AK(t3, i3) {
      var s5, e5, r4;
      const h3 = this.constructor, n6 = h3._$Eu.get(t3);
      if (n6 !== void 0 && this._$Ei !== n6) {
        const t4 = h3.getPropertyOptions(n6), l4 = t4.converter, a3 = (r4 = (e5 = (s5 = l4) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e5 !== void 0 ? e5 : typeof l4 == "function" ? l4 : null) !== null && r4 !== void 0 ? r4 : o2.fromAttribute;
        this._$Ei = n6, this[n6] = a3(i3, t4.type), this._$Ei = null;
      }
    }
    requestUpdate(t3, i3, s5) {
      let e5 = true;
      t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n2)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), s5.reflect === true && this._$Ei !== t3 && (this._$E_ === void 0 && (this._$E_ = /* @__PURE__ */ new Map()), this._$E_.set(t3, s5))) : e5 = false), !this.isUpdatePending && e5 && (this._$Ep = this._$EC());
    }
    async _$EC() {
      this.isUpdatePending = true;
      try {
        await this._$Ep;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return t3 != null && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t3;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Et && (this._$Et.forEach((t4, i4) => this[i4] = t4), this._$Et = void 0);
      let i3 = false;
      const s5 = this._$AL;
      try {
        i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
          var i4;
          return (i4 = t4.hostUpdate) === null || i4 === void 0 ? void 0 : i4.call(t4);
        }), this.update(s5)) : this._$EU();
      } catch (t4) {
        throw i3 = false, this._$EU(), t4;
      }
      i3 && this._$AE(s5);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var i3;
      (i3 = this._$Eg) === null || i3 === void 0 || i3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostUpdated) === null || i4 === void 0 ? void 0 : i4.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$Ep;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this._$E_ !== void 0 && (this._$E_.forEach((t4, i3) => this._$ES(i3, this[i3], t4)), this._$E_ = void 0), this._$EU();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, h == null || h({ ReactiveElement: a }), ((s2 = globalThis.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : globalThis.reactiveElementVersions = []).push("1.0.2");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = globalThis.trustedTypes;
  var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var e3 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + e3;
  var n3 = `<${o3}>`;
  var l2 = document;
  var h2 = (t3 = "") => l2.createComment(t3);
  var r3 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
  var d = Array.isArray;
  var u = (t3) => {
    var i3;
    return d(t3) || typeof ((i3 = t3) === null || i3 === void 0 ? void 0 : i3[Symbol.iterator]) == "function";
  };
  var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var a2 = />/g;
  var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
  var _14 = /'/g;
  var m = /"/g;
  var g = /^(?:script|style|textarea)$/i;
  var $ = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
  var p = $(1);
  var y = $(2);
  var b = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var x = /* @__PURE__ */ new WeakMap();
  var w = (t3, i3, s5) => {
    var e5, o6;
    const n6 = (e5 = s5 == null ? void 0 : s5.renderBefore) !== null && e5 !== void 0 ? e5 : i3;
    let l4 = n6._$litPart$;
    if (l4 === void 0) {
      const t4 = (o6 = s5 == null ? void 0 : s5.renderBefore) !== null && o6 !== void 0 ? o6 : null;
      n6._$litPart$ = l4 = new N(i3.insertBefore(h2(), t4), t4, void 0, s5 != null ? s5 : {});
    }
    return l4._$AI(t3), l4;
  };
  var A = l2.createTreeWalker(l2, 129, null, false);
  var C = (t3, i3) => {
    const o6 = t3.length - 1, l4 = [];
    let h3, r4 = i3 === 2 ? "<svg>" : "", d2 = c;
    for (let i4 = 0; i4 < o6; i4++) {
      const s5 = t3[i4];
      let o7, u3, $2 = -1, p2 = 0;
      for (; p2 < s5.length && (d2.lastIndex = p2, u3 = d2.exec(s5), u3 !== null); )
        p2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a2 : u3[2] !== void 0 ? (g.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h3 != null ? h3 : c, $2 = -1) : u3[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u3[2].length, o7 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _14) : d2 === m || d2 === _14 ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
      const y2 = d2 === f && t3[i4 + 1].startsWith("/>") ? " " : "";
      r4 += d2 === c ? s5 + n3 : $2 >= 0 ? (l4.push(o7), s5.slice(0, $2) + "$lit$" + s5.slice($2) + e3 + y2) : s5 + e3 + ($2 === -2 ? (l4.push(void 0), i4) : y2);
    }
    const u2 = r4 + (t3[o6] || "<?>") + (i3 === 2 ? "</svg>" : "");
    return [s3 !== void 0 ? s3.createHTML(u2) : u2, l4];
  };
  var P = class {
    constructor({ strings: t3, _$litType$: s5 }, n6) {
      let l4;
      this.parts = [];
      let r4 = 0, d2 = 0;
      const u2 = t3.length - 1, c2 = this.parts, [v2, a3] = C(t3, s5);
      if (this.el = P.createElement(v2, n6), A.currentNode = this.el.content, s5 === 2) {
        const t4 = this.el.content, i3 = t4.firstChild;
        i3.remove(), t4.append(...i3.childNodes);
      }
      for (; (l4 = A.nextNode()) !== null && c2.length < u2; ) {
        if (l4.nodeType === 1) {
          if (l4.hasAttributes()) {
            const t4 = [];
            for (const i3 of l4.getAttributeNames())
              if (i3.endsWith("$lit$") || i3.startsWith(e3)) {
                const s6 = a3[d2++];
                if (t4.push(i3), s6 !== void 0) {
                  const t5 = l4.getAttribute(s6.toLowerCase() + "$lit$").split(e3), i4 = /([.?@])?(.*)/.exec(s6);
                  c2.push({ type: 1, index: r4, name: i4[2], strings: t5, ctor: i4[1] === "." ? M : i4[1] === "?" ? H : i4[1] === "@" ? I : S2 });
                } else
                  c2.push({ type: 6, index: r4 });
              }
            for (const i3 of t4)
              l4.removeAttribute(i3);
          }
          if (g.test(l4.tagName)) {
            const t4 = l4.textContent.split(e3), s6 = t4.length - 1;
            if (s6 > 0) {
              l4.textContent = i2 ? i2.emptyScript : "";
              for (let i3 = 0; i3 < s6; i3++)
                l4.append(t4[i3], h2()), A.nextNode(), c2.push({ type: 2, index: ++r4 });
              l4.append(t4[s6], h2());
            }
          }
        } else if (l4.nodeType === 8)
          if (l4.data === o3)
            c2.push({ type: 2, index: r4 });
          else {
            let t4 = -1;
            for (; (t4 = l4.data.indexOf(e3, t4 + 1)) !== -1; )
              c2.push({ type: 7, index: r4 }), t4 += e3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t3, i3) {
      const s5 = l2.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function V(t3, i3, s5 = t3, e5) {
    var o6, n6, l4, h3;
    if (i3 === b)
      return i3;
    let d2 = e5 !== void 0 ? (o6 = s5._$Cl) === null || o6 === void 0 ? void 0 : o6[e5] : s5._$Cu;
    const u2 = r3(i3) ? void 0 : i3._$litDirective$;
    return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n6 = d2 == null ? void 0 : d2._$AO) === null || n6 === void 0 || n6.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t3), d2._$AT(t3, s5, e5)), e5 !== void 0 ? ((l4 = (h3 = s5)._$Cl) !== null && l4 !== void 0 ? l4 : h3._$Cl = [])[e5] = d2 : s5._$Cu = d2), d2 !== void 0 && (i3 = V(t3, d2._$AS(t3, i3.values), d2, e5)), i3;
  }
  var E = class {
    constructor(t3, i3) {
      this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    p(t3) {
      var i3;
      const { el: { content: s5 }, parts: e5 } = this._$AD, o6 = ((i3 = t3 == null ? void 0 : t3.creationScope) !== null && i3 !== void 0 ? i3 : l2).importNode(s5, true);
      A.currentNode = o6;
      let n6 = A.nextNode(), h3 = 0, r4 = 0, d2 = e5[0];
      for (; d2 !== void 0; ) {
        if (h3 === d2.index) {
          let i4;
          d2.type === 2 ? i4 = new N(n6, n6.nextSibling, this, t3) : d2.type === 1 ? i4 = new d2.ctor(n6, d2.name, d2.strings, this, t3) : d2.type === 6 && (i4 = new L(n6, this, t3)), this.v.push(i4), d2 = e5[++r4];
        }
        h3 !== (d2 == null ? void 0 : d2.index) && (n6 = A.nextNode(), h3++);
      }
      return o6;
    }
    m(t3) {
      let i3 = 0;
      for (const s5 of this.v)
        s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
    }
  };
  var N = class {
    constructor(t3, i3, s5, e5) {
      var o6;
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e5, this._$Cg = (o6 = e5 == null ? void 0 : e5.isConnected) === null || o6 === void 0 || o6;
    }
    get _$AU() {
      var t3, i3;
      return (i3 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i3 !== void 0 ? i3 : this._$Cg;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i3 = this._$AM;
      return i3 !== void 0 && t3.nodeType === 11 && (t3 = i3.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i3 = this) {
      t3 = V(this, t3, i3), r3(t3) ? t3 === T || t3 == null || t3 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t3 !== this._$AH && t3 !== b && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.S(t3) : u(t3) ? this.M(t3) : this.$(t3);
    }
    A(t3, i3 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t3, i3);
    }
    S(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
    }
    $(t3) {
      this._$AH !== T && r3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.S(l2.createTextNode(t3)), this._$AH = t3;
    }
    T(t3) {
      var i3;
      const { values: s5, _$litType$: e5 } = t3, o6 = typeof e5 == "number" ? this._$AC(t3) : (e5.el === void 0 && (e5.el = P.createElement(e5.h, this.options)), e5);
      if (((i3 = this._$AH) === null || i3 === void 0 ? void 0 : i3._$AD) === o6)
        this._$AH.m(s5);
      else {
        const t4 = new E(o6, this), i4 = t4.p(this.options);
        t4.m(s5), this.S(i4), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i3 = x.get(t3.strings);
      return i3 === void 0 && x.set(t3.strings, i3 = new P(t3)), i3;
    }
    M(t3) {
      d(this._$AH) || (this._$AH = [], this._$AR());
      const i3 = this._$AH;
      let s5, e5 = 0;
      for (const o6 of t3)
        e5 === i3.length ? i3.push(s5 = new N(this.A(h2()), this.A(h2()), this, this.options)) : s5 = i3[e5], s5._$AI(o6), e5++;
      e5 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e5), i3.length = e5);
    }
    _$AR(t3 = this._$AA.nextSibling, i3) {
      var s5;
      for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
        const i4 = t3.nextSibling;
        t3.remove(), t3 = i4;
      }
    }
    setConnected(t3) {
      var i3;
      this._$AM === void 0 && (this._$Cg = t3, (i3 = this._$AP) === null || i3 === void 0 || i3.call(this, t3));
    }
  };
  var S2 = class {
    constructor(t3, i3, s5, e5, o6) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e5, this.options = o6, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = T;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3, i3 = this, s5, e5) {
      const o6 = this.strings;
      let n6 = false;
      if (o6 === void 0)
        t3 = V(this, t3, i3, 0), n6 = !r3(t3) || t3 !== this._$AH && t3 !== b, n6 && (this._$AH = t3);
      else {
        const e6 = t3;
        let l4, h3;
        for (t3 = o6[0], l4 = 0; l4 < o6.length - 1; l4++)
          h3 = V(this, e6[s5 + l4], i3, l4), h3 === b && (h3 = this._$AH[l4]), n6 || (n6 = !r3(h3) || h3 !== this._$AH[l4]), h3 === T ? t3 = T : t3 !== T && (t3 += (h3 != null ? h3 : "") + o6[l4 + 1]), this._$AH[l4] = h3;
      }
      n6 && !e5 && this.k(t3);
    }
    k(t3) {
      t3 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    k(t3) {
      this.element[this.name] = t3 === T ? void 0 : t3;
    }
  };
  var k = i2 ? i2.emptyScript : "";
  var H = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    k(t3) {
      t3 && t3 !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
  };
  var I = class extends S2 {
    constructor(t3, i3, s5, e5, o6) {
      super(t3, i3, s5, e5, o6), this.type = 5;
    }
    _$AI(t3, i3 = this) {
      var s5;
      if ((t3 = (s5 = V(this, t3, i3, 0)) !== null && s5 !== void 0 ? s5 : T) === b)
        return;
      const e5 = this._$AH, o6 = t3 === T && e5 !== T || t3.capture !== e5.capture || t3.once !== e5.once || t3.passive !== e5.passive, n6 = t3 !== T && (e5 === T || o6);
      o6 && this.element.removeEventListener(this.name, this, e5), n6 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i3, s5;
      typeof this._$AH == "function" ? this._$AH.call((s5 = (i3 = this.options) === null || i3 === void 0 ? void 0 : i3.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var L = class {
    constructor(t3, i3, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      V(this, t3);
    }
  };
  var z = window.litHtmlPolyfillSupport;
  z == null || z(P, N), ((t2 = globalThis.litHtmlVersions) !== null && t2 !== void 0 ? t2 : globalThis.litHtmlVersions = []).push("2.0.2");

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends a {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
    }
    createRenderRoot() {
      var t3, e5;
      const i3 = super.createRenderRoot();
      return (t3 = (e5 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e5.renderBefore = i3.firstChild), i3;
    }
    update(t3) {
      const i3 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = w(i3, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t3;
      super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
    }
    disconnectedCallback() {
      var t3;
      super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
    }
    render() {
      return b;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  n4 == null || n4({ LitElement: s4 });
  ((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.0.2");

  // node_modules/@adobe/lit-mobx/lit-mobx.js
  var MobxLitElement = class extends MobxReactionUpdate(s4) {
  };

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var n5 = (n6) => (e5) => typeof e5 == "function" ? ((n7, e6) => (window.customElements.define(n7, e6), e6))(n6, e5) : ((n7, e6) => {
    const { kind: t3, elements: i3 } = e6;
    return { kind: t3, elements: i3, finisher(e7) {
      window.customElements.define(n7, e7);
    } };
  })(n6, e5);

  // src/WishListView.ts
  var WishListView = class extends MobxLitElement {
    render = () => p`
            <div style="background-color: lightblue; padding: 2%;">
            <h1>Mobx-Lit page rendered!</h1> 
            <h3>Wish List View</h3>
            </div>
        `;
  };
  WishListView = __decorateClass([
    n5("wish-list-view")
  ], WishListView);
})();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=WishListView.js.map
