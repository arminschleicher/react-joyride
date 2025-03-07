'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var treeChanges = _interopDefault(require('tree-changes'));
var is = _interopDefault(require('is-lite'));
var ReactDOM = require('react-dom');
var ReactDOM__default = _interopDefault(ReactDOM);
var ExecutionEnvironment = _interopDefault(require('exenv'));
var scroll = _interopDefault(require('scroll'));
var scrollDoc = _interopDefault(require('scroll-doc'));
var scrollParent = _interopDefault(require('scrollparent'));
var reactIs = require('react-is');
var deepmerge = _interopDefault(require('deepmerge'));
var Floater = _interopDefault(require('react-floater'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var ACTIONS = {
  INIT: 'init',
  START: 'start',
  STOP: 'stop',
  RESET: 'reset',
  PREV: 'prev',
  NEXT: 'next',
  GO: 'go',
  CLOSE: 'close',
  SKIP: 'skip',
  UPDATE: 'update'
};

var EVENTS = {
  TOUR_START: 'tour:start',
  STEP_BEFORE: 'step:before',
  BEACON: 'beacon',
  TOOLTIP: 'tooltip',
  STEP_AFTER: 'step:after',
  TOUR_END: 'tour:end',
  TOUR_STATUS: 'tour:status',
  TARGET_NOT_FOUND: 'error:target_not_found',
  ERROR: 'error'
};

var LIFECYCLE = {
  INIT: 'init',
  READY: 'ready',
  BEACON: 'beacon',
  TOOLTIP: 'tooltip',
  COMPLETE: 'complete',
  ERROR: 'error'
};

var STATUS = {
  IDLE: 'idle',
  READY: 'ready',
  WAITING: 'waiting',
  RUNNING: 'running',
  PAUSED: 'paused',
  SKIPPED: 'skipped',
  FINISHED: 'finished',
  ERROR: 'error'
};

var canUseDOM = ExecutionEnvironment.canUseDOM;
var isReact16 = ReactDOM.createPortal !== undefined;
/**
 * Get the current browser
 *
 * @param {string} userAgent
 *
 * @returns {String}
 */

function getBrowser() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  var browser = userAgent;

  if (typeof window === 'undefined') {
    browser = 'node';
  } else if (document.documentMode) {
    browser = 'ie';
  } else if (/Edge/.test(userAgent)) {
    browser = 'edge';
  } // Opera 8.0+
  else if (Boolean(window.opera) || userAgent.indexOf(' OPR/') >= 0) {
      browser = 'opera';
    } // Firefox 1.0+
    else if (typeof window.InstallTrigger !== 'undefined') {
        browser = 'firefox';
      } // Chrome 1+
      else if (window.chrome) {
          browser = 'chrome';
        } // Safari (and Chrome iOS, Firefox iOS)
        else if (/(Version\/([0-9._]+).*Safari|CriOS|FxiOS| Mobile\/)/.test(userAgent)) {
            browser = 'safari';
          }

  return browser;
}
/**
 * Get the toString Object type
 * @param {*} value
 * @returns {string}
 */

function getObjectType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
/**
 * Get text from React components
 *
 * @param {*} root
 *
 * @returns {string}
 */

function getText(root) {
  var content = [];

  var recurse = function recurse(child) {
    /* istanbul ignore else */
    if (typeof child === 'string' || typeof child === 'number') {
      content.push(child);
    } else if (Array.isArray(child)) {
      child.forEach(function (c) {
        return recurse(c);
      });
    } else if (child && child.props) {
      var children = child.props.children;

      if (Array.isArray(children)) {
        children.forEach(function (c) {
          return recurse(c);
        });
      } else {
        recurse(children);
      }
    }
  };

  recurse(root);
  return content.join(' ').trim();
}
function hasOwnProperty(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}
function hasValidKeys(value, keys) {
  if (!is.plainObject(value) || !is.array(keys)) {
    return false;
  }

  return Object.keys(value).every(function (d) {
    return keys.includes(d);
  });
}
/**
 * Convert hex to RGB
 *
 * @param {string} hex
 * @returns {Array}
 */

function hexToRGB(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var properHex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(properHex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [];
}
/**
 * Decide if the step shouldn't skip the beacon
 * @param {Object} step
 *
 * @returns {boolean}
 */

function hideBeacon(step) {
  return step.disableBeacon || step.placement === 'center';
}
/**
 * Compare if two variables are equal
 *
 * @param {*} left
 * @param {*} right
 *
 * @returns {boolean}
 */

function isEqual(left, right) {
  var type;
  var hasReactElement = React.isValidElement(left) || React.isValidElement(right);
  var hasUndefined = is.undefined(left) || is.undefined(right);

  if (getObjectType(left) !== getObjectType(right) || hasReactElement || hasUndefined) {
    return false;
  }

  if (is.domElement(left)) {
    return left.isSameNode(right);
  }

  if (is.number(left)) {
    return left === right;
  }

  if (is.function(left)) {
    return left.toString() === right.toString();
  }

  for (var key in left) {
    /* istanbul ignore else */
    if (hasOwnProperty(left, key)) {
      if (typeof left[key] === 'undefined' || typeof right[key] === 'undefined') {
        return false;
      }

      type = getObjectType(left[key]);

      if (['object', 'array'].includes(type) && isEqual(left[key], right[key])) {
        continue;
      }

      if (type === 'function' && isEqual(left[key], right[key])) {
        continue;
      }

      if (left[key] !== right[key]) {
        return false;
      }
    }
  }

  for (var p in right) {
    /* istanbul ignore else */
    if (hasOwnProperty(right, p)) {
      if (typeof left[p] === 'undefined') {
        return false;
      }
    }
  }

  return true;
}
/**
 * Detect legacy browsers
 *
 * @returns {boolean}
 */

function isLegacy() {
  return !['chrome', 'safari', 'firefox', 'opera'].includes(getBrowser());
}
/**
 * Log method calls if debug is enabled
 *
 * @private
 * @param {Object}       arg
 * @param {string}       arg.title    - The title the logger was called from
 * @param {Object|Array} [arg.data]   - The data to be logged
 * @param {boolean}      [arg.warn]  - If true, the message will be a warning
 * @param {boolean}      [arg.debug] - Nothing will be logged unless debug is true
 */

function log(_ref) {
  var title = _ref.title,
      data = _ref.data,
      _ref$warn = _ref.warn,
      warn = _ref$warn === void 0 ? false : _ref$warn,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug;

  /* eslint-disable no-console */
  var logFn = warn ? console.warn || console.error : console.log;

  if (debug) {
    if (title && data) {
      console.groupCollapsed("%creact-joyride: ".concat(title), 'color: #ff0044; font-weight: bold; font-size: 12px;');

      if (Array.isArray(data)) {
        data.forEach(function (d) {
          if (is.plainObject(d) && d.key) {
            logFn.apply(console, [d.key, d.value]);
          } else {
            logFn.apply(console, [d]);
          }
        });
      } else {
        logFn.apply(console, [data]);
      }

      console.groupEnd();
    } else {
      console.error('Missing title or data props');
    }
  }
  /* eslint-enable */

}

var defaultState = {
  action: '',
  controlled: false,
  index: 0,
  lifecycle: LIFECYCLE.INIT,
  size: 0,
  status: STATUS.IDLE
};
var validKeys = ['action', 'index', 'lifecycle', 'status'];
function createStore(props) {
  var store = new Map();
  var data = new Map();

  var Store =
  /*#__PURE__*/
  function () {
    function Store() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$continuous = _ref.continuous,
          continuous = _ref$continuous === void 0 ? false : _ref$continuous,
          stepIndex = _ref.stepIndex,
          _ref$steps = _ref.steps,
          _steps = _ref$steps === void 0 ? [] : _ref$steps;

      _classCallCheck(this, Store);

      _defineProperty(this, "listener", void 0);

      _defineProperty(this, "setSteps", function (steps) {
        var _this$getState = _this.getState(),
            size = _this$getState.size,
            status = _this$getState.status;

        var state = {
          size: steps.length,
          status: status
        };
        data.set('steps', steps);

        if (status === STATUS.WAITING && !size && steps.length) {
          state.status = STATUS.RUNNING;
        }

        _this.setState(state);
      });

      _defineProperty(this, "addListener", function (listener) {
        _this.listener = listener;
      });

      _defineProperty(this, "update", function (state) {
        if (!hasValidKeys(state, validKeys)) {
          throw new Error("State is not valid. Valid keys: ".concat(validKeys.join(', ')));
        }

        _this.setState(_objectSpread({}, _this.getNextState(_objectSpread({}, _this.getState(), state, {
          action: state.action || ACTIONS.UPDATE
        }), true)));
      });

      _defineProperty(this, "start", function (nextIndex) {
        var _this$getState2 = _this.getState(),
            index = _this$getState2.index,
            size = _this$getState2.size;

        _this.setState(_objectSpread({}, _this.getNextState({
          action: ACTIONS.START,
          index: is.number(nextIndex) ? nextIndex : index
        }, true), {
          status: size ? STATUS.RUNNING : STATUS.WAITING
        }));
      });

      _defineProperty(this, "stop", function () {
        var advance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var _this$getState3 = _this.getState(),
            index = _this$getState3.index,
            status = _this$getState3.status;

        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) return;

        _this.setState(_objectSpread({}, _this.getNextState({
          action: ACTIONS.STOP,
          index: index + (advance ? 1 : 0)
        }), {
          status: STATUS.PAUSED
        }));
      });

      _defineProperty(this, "prev", function () {
        var _this$getState4 = _this.getState(),
            index = _this$getState4.index,
            status = _this$getState4.status;

        if (status !== STATUS.RUNNING) return;

        _this.setState(_objectSpread({}, _this.getNextState({
          action: ACTIONS.PREV,
          index: index - 1
        })));
      });

      _defineProperty(this, "next", function () {
        var _this$getState5 = _this.getState(),
            index = _this$getState5.index,
            status = _this$getState5.status;

        if (status !== STATUS.RUNNING) return;

        _this.setState(_this.getNextState({
          action: ACTIONS.NEXT,
          index: index + 1
        }));
      });

      _defineProperty(this, "go", function (nextIndex) {
        var _this$getState6 = _this.getState(),
            controlled = _this$getState6.controlled,
            status = _this$getState6.status;

        if (controlled || status !== STATUS.RUNNING) return;

        var step = _this.getSteps()[nextIndex];

        _this.setState(_objectSpread({}, _this.getNextState({
          action: ACTIONS.GO,
          index: nextIndex
        }), {
          status: step ? status : STATUS.FINISHED
        }));
      });

      _defineProperty(this, "close", function () {
        var _this$getState7 = _this.getState(),
            index = _this$getState7.index,
            status = _this$getState7.status;

        if (status !== STATUS.RUNNING) return;

        _this.setState(_objectSpread({}, _this.getNextState({
          action: ACTIONS.CLOSE,
          index: index + 1
        })));
      });

      _defineProperty(this, "skip", function () {
        var _this$getState8 = _this.getState(),
            status = _this$getState8.status;

        if (status !== STATUS.RUNNING) return;

        _this.setState({
          action: ACTIONS.SKIP,
          lifecycle: LIFECYCLE.INIT,
          status: STATUS.SKIPPED
        });
      });

      _defineProperty(this, "reset", function () {
        var restart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var _this$getState9 = _this.getState(),
            controlled = _this$getState9.controlled;

        if (controlled) return;

        _this.setState(_objectSpread({}, _this.getNextState({
          action: ACTIONS.RESET,
          index: 0
        }), {
          status: restart ? STATUS.RUNNING : STATUS.READY
        }));
      });

      _defineProperty(this, "info", function () {
        return _this.getState();
      });

      this.setState({
        action: ACTIONS.INIT,
        controlled: is.number(stepIndex),
        continuous: continuous,
        index: is.number(stepIndex) ? stepIndex : 0,
        lifecycle: LIFECYCLE.INIT,
        status: _steps.length ? STATUS.READY : STATUS.IDLE
      }, true);
      this.setSteps(_steps);
    }

    _createClass(Store, [{
      key: "setState",
      value: function setState(nextState) {
        var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var state = this.getState();

        var _state$nextState = _objectSpread({}, state, nextState),
            action = _state$nextState.action,
            index = _state$nextState.index,
            lifecycle = _state$nextState.lifecycle,
            size = _state$nextState.size,
            status = _state$nextState.status;

        store.set('action', action);
        store.set('index', index);
        store.set('lifecycle', lifecycle);
        store.set('size', size);
        store.set('status', status);

        if (initial) {
          store.set('controlled', nextState.controlled);
          store.set('continuous', nextState.continuous);
        }
        /* istanbul ignore else */


        if (this.listener && this.hasUpdatedState(state)) {
          // console.log('▶ ▶ ▶ NEW STATE', this.getState());
          this.listener(this.getState());
        }
      }
    }, {
      key: "getState",
      value: function getState() {
        if (!store.size) {
          return _objectSpread({}, defaultState);
        }

        return {
          action: store.get('action') || '',
          controlled: store.get('controlled') || false,
          index: parseInt(store.get('index'), 10),
          lifecycle: store.get('lifecycle') || '',
          size: store.get('size') || 0,
          status: store.get('status') || ''
        };
      }
    }, {
      key: "getNextState",
      value: function getNextState(state) {
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var _this$getState10 = this.getState(),
            action = _this$getState10.action,
            controlled = _this$getState10.controlled,
            index = _this$getState10.index,
            size = _this$getState10.size,
            status = _this$getState10.status;

        var newIndex = is.number(state.index) ? state.index : index;
        var nextIndex = controlled && !force ? index : Math.min(Math.max(newIndex, 0), size);
        return {
          action: state.action || action,
          controlled: controlled,
          index: nextIndex,
          lifecycle: state.lifecycle || LIFECYCLE.INIT,
          size: state.size || size,
          status: nextIndex === size ? STATUS.FINISHED : state.status || status
        };
      }
    }, {
      key: "hasUpdatedState",
      value: function hasUpdatedState(oldState) {
        var before = JSON.stringify(oldState);
        var after = JSON.stringify(this.getState());
        return before !== after;
      }
    }, {
      key: "getSteps",
      value: function getSteps() {
        var steps = data.get('steps');
        return Array.isArray(steps) ? steps : [];
      }
    }, {
      key: "getHelpers",
      value: function getHelpers() {
        return {
          prev: this.prev,
          next: this.next,
          go: this.go,
          close: this.close,
          skip: this.skip,
          reset: this.reset,
          info: this.info
        };
      }
    }]);

    return Store;
  }();

  return new Store(props);
}

/**
 * Find the bounding client rect
 *
 * @private
 * @param {HTMLElement} element - The target element
 * @returns {Object}
 */

function getClientRect(element) {
  if (!element) {
    return {};
  }

  return element.getBoundingClientRect();
}
/**
 * Helper function to get the browser-normalized "document height"
 * @returns {Number}
 */

function getDocumentHeight() {
  var _document = document,
      body = _document.body,
      html = _document.documentElement;

  if (!body || !html) {
    return 0;
  }

  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}
/**
 * Find and return the target DOM element based on a step's 'target'.
 *
 * @private
 * @param {string|HTMLElement} element
 *
 * @returns {HTMLElement|null}
 */

function getElement(element) {
  if (typeof element === 'string') {
    return element ? document.querySelector(element) : null;
  }

  return element;
}
/**
 *  Get computed style property
 *
 * @param {HTMLElement} el
 *
 * @returns {Object}
 */

function getStyleComputedProperty(el) {
  if (!el || el.nodeType !== 1) {
    return {};
  }

  return getComputedStyle(el);
}
/**
 * Get scroll parent with fix
 *
 * @param {HTMLElement} element
 * @param {boolean} skipFix
 *
 * @returns {*}
 */

function getScrollParent(element, skipFix) {
  var parent = scrollParent(element);

  if (parent.isSameNode(scrollDoc())) {
    return scrollDoc();
  }

  var hasScrolling = parent.scrollHeight > parent.offsetHeight;

  if (!hasScrolling && !skipFix) {
    if (parent.style.overflow !== 'scroll') {
      parent.style.overflow = 'initial';
    }

    return scrollDoc();
  }

  return parent;
}
/**
 * Check if the element has custom scroll parent
 *
 * @param {HTMLElement} element
 * @param {boolean} skipFix
 *
 * @returns {boolean}
 */

function hasCustomScrollParent(element, skipFix) {
  if (!element) return false;
  var parent = getScrollParent(element, skipFix);
  return !parent.isSameNode(scrollDoc());
}
/**
 * Check if the element has custom offset parent
 *
 * @param {HTMLElement} element
 *
 * @returns {boolean}
 */

function hasCustomOffsetParent(element) {
  return element.offsetParent !== document.body;
}
/**
 * Check if the element is visible
 *
 * @param {HTMLElement} element
 *
 * @returns {boolean}
 */

function isElementVisible(element) {
  if (!element) return false;
  var parentElement = element;

  while (parentElement) {
    if (parentElement === document.body) break;

    if (parentElement instanceof HTMLElement) {
      var _getComputedStyle = getComputedStyle(parentElement),
          display = _getComputedStyle.display,
          visibility = _getComputedStyle.visibility;

      if (display === 'none' || visibility === 'hidden') {
        return false;
      }
    }

    parentElement = parentElement.parentNode;
  }

  return true;
}
/**
 * Check if the element is fixed
 * @param {HTMLElement} el
 * @returns {boolean}
 */

function isFixed(el) {
  if (!el || !(el instanceof HTMLElement)) {
    return false;
  }

  var nodeName = el.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(el).position === 'fixed') {
    return true;
  }

  return isFixed(el.parentNode);
}
/**
 * Find and return the target DOM element based on a step's 'target'.
 *
 * @private
 * @param {string|HTMLElement} element
 * @param {number} offset
 * @param {boolean} skipFix
 *
 * @returns {HTMLElement|undefined}
 */

function getElementPosition(element, offset, skipFix) {
  var elementRect = getClientRect(element);
  var parent = getScrollParent(element, skipFix);
  var hasScrollParent = hasCustomScrollParent(element, skipFix);
  var top = elementRect.top + (!hasScrollParent && !isFixed(element) ? parent.scrollTop : 0);
  return Math.floor(top - offset);
}
/**
 * Get the scrollTop position
 *
 * @param {HTMLElement} element
 * @param {number} offset
 * @param {boolean} skipFix
 *
 * @returns {number}
 */

function getScrollTo(element, offset, skipFix) {
  if (!element) {
    return 0;
  }

  var parent = scrollParent(element);
  var top = element.offsetTop;

  if (hasCustomScrollParent(element, skipFix) && !hasCustomOffsetParent(element)) {
    top -= parent.offsetTop;
  }

  return Math.floor(top - offset);
}
/**
 * Scroll to position
 * @param {number} value
 * @param {HTMLElement} element
 * @returns {Promise<*>}
 */

function scrollTo(value) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scrollDoc();
  return new Promise(function (resolve, reject) {
    var scrollTop = element.scrollTop;
    var limit = value > scrollTop ? value - scrollTop : scrollTop - value;
    scroll.top(element, value, {
      duration: limit < 100 ? 50 : 300
    }, function (error) {
      if (error && error.message !== 'Element already at target scroll position') {
        return reject(error);
      }

      return resolve();
    });
  });
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;
    /* istanbul ignore else */

    if (props[propName] == null) {
      if (isRequired) {
        return new Error("Required ".concat(location, " `").concat(propFullNameSafe, "` was not specified in `").concat(componentNameSafe, "`."));
      }

      return null;
    }

    for (var _len = arguments.length, args = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(void 0, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

var componentTypeWithRefs = createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  var Component = propValue;

  if (!React__default.isValidElement(propValue) && reactIs.isValidElementType(propValue)) {
    var ownProps = {
      ref: function ref() {},
      step: {}
    };
    Component = React__default.createElement(Component, ownProps);
  }

  if (is.string(propValue) || is.number(propValue) || !reactIs.isValidElementType(propValue) || ![reactIs.Element, reactIs.ForwardRef].includes(reactIs.typeOf(Component))) {
    return new Error("Invalid ".concat(location, " `").concat(propFullName, "` supplied to `").concat(componentName, "`. Expected a React class or forwardRef."));
  }

  return undefined;
});

var defaultOptions = {
  arrowColor: '#fff',
  backgroundColor: '#fff',
  beaconSize: 36,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  primaryColor: '#f04',
  spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
  textColor: '#333',
  zIndex: 100
};
var buttonBase = {
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: 0,
  color: '#555',
  cursor: 'pointer',
  fontSize: 14,
  lineHeight: 1,
  padding: 8,
  WebkitAppearance: 'none'
};
var spotlight = {
  borderRadius: 4,
  position: 'absolute'
};
function getStyles() {
  var stepStyles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = deepmerge(defaultOptions, stepStyles.options || {});
  var width = 290;

  if (window.innerWidth > 480) {
    width = 380;
  }

  if (options.width) {
    if (window.innerWidth < options.width) {
      width = window.innerWidth - 30;
    } else {
      width = options.width; //eslint-disable-line prefer-destructuring
    }
  }

  var overlay = {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: options.zIndex
  };
  var defaultStyles = {
    beacon: _objectSpread({}, buttonBase, {
      display: 'inline-block',
      height: options.beaconSize,
      position: 'relative',
      width: options.beaconSize,
      zIndex: options.zIndex
    }),
    beaconInner: {
      animation: 'joyride-beacon-inner 1.2s infinite ease-in-out',
      backgroundColor: options.primaryColor,
      borderRadius: '50%',
      display: 'block',
      height: '50%',
      left: '50%',
      opacity: 0.7,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%'
    },
    beaconOuter: {
      animation: 'joyride-beacon-outer 1.2s infinite ease-in-out',
      backgroundColor: "rgba(".concat(hexToRGB(options.primaryColor).join(','), ", 0.2)"),
      border: "2px solid ".concat(options.primaryColor),
      borderRadius: '50%',
      boxSizing: 'border-box',
      display: 'block',
      height: '100%',
      left: 0,
      opacity: 0.9,
      position: 'absolute',
      top: 0,
      transformOrigin: 'center',
      width: '100%'
    },
    tooltip: {
      backgroundColor: options.backgroundColor,
      borderRadius: 5,
      boxSizing: 'border-box',
      color: options.textColor,
      fontSize: 14,
      maxWidth: '100%',
      padding: 15,
      position: 'relative',
      width: width
    },
    tooltipContainer: {
      lineHeight: 1.4,
      textAlign: 'center'
    },
    tooltipTitle: {
      fontSize: 16,
      margin: '0 auto',
      maxWidth: '80%'
    },
    tooltipContent: {
      padding: '20px 10px'
    },
    tooltipFooter: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 15
    },
    tooltipFooterSpacer: {
      flex: 1
    },
    buttonNext: _objectSpread({}, buttonBase, {
      backgroundColor: options.primaryColor,
      borderRadius: 4,
      color: '#fff'
    }),
    buttonBack: _objectSpread({}, buttonBase, {
      color: options.primaryColor,
      marginLeft: 'auto',
      marginRight: 5
    }),
    buttonClose: _objectSpread({}, buttonBase, {
      color: options.textColor,
      height: 10,
      padding: 15,
      paddingTop: 20,
      position: 'absolute',
      right: 0,
      top: 0,
      width: 10
    }),
    buttonSkip: _objectSpread({}, buttonBase, {
      color: options.textColor,
      fontSize: 14
    }),
    overlay: _objectSpread({}, overlay, {
      backgroundColor: options.overlayColor,
      mixBlendMode: 'hard-light'
    }),
    overlayLegacy: _objectSpread({}, overlay),
    overlayLegacyCenter: _objectSpread({}, overlay, {
      backgroundColor: options.overlayColor
    }),
    spotlight: _objectSpread({}, spotlight, {
      backgroundColor: 'gray'
    }),
    spotlightLegacy: _objectSpread({}, spotlight, {
      boxShadow: "0 0 0 9999px ".concat(options.overlayColor, ", ").concat(options.spotlightShadow)
    }),
    floaterStyles: {
      arrow: {
        color: options.arrowColor
      },
      options: {
        zIndex: options.zIndex
      }
    },
    options: options
  };
  return deepmerge(defaultStyles, stepStyles);
}

var DEFAULTS = {
  floaterProps: {
    options: {
      preventOverflow: {
        boundariesElement: 'scrollParent'
      }
    },
    wrapperOptions: {
      offset: -18,
      position: true
    }
  },
  locale: {
    back: 'Back',
    close: 'Close',
    last: 'Last',
    next: 'Next',
    open: 'Open the dialog',
    skip: 'Skip'
  },
  step: {
    event: 'click',
    placement: 'top',
    offset: 10
  }
};

function getTourProps(props) {
  var sharedTourProps = ['beaconComponent', 'disableCloseOnEsc', 'disableOverlay', 'disableOverlayClose', 'disableScrolling', 'disableScrollParentFix', 'floaterProps', 'hideBackButton', 'locale', 'showProgress', 'showSkipButton', 'spotlightClicks', 'spotlightPadding', 'styles', 'tooltipComponent'];
  return Object.keys(props).filter(function (d) {
    return sharedTourProps.includes(d);
  }).reduce(function (acc, i) {
    acc[i] = props[i]; //eslint-disable-line react/destructuring-assignment

    return acc;
  }, {});
}

function getMergedStep(step, props) {
  if (!step) return null;
  var mergedStep = deepmerge.all([getTourProps(props), DEFAULTS.step, step], {
    isMergeableObject: is.plainObject
  });
  var mergedStyles = getStyles(deepmerge(props.styles || {}, step.styles || {}));
  var scrollParent$$1 = hasCustomScrollParent(getElement(step.target), mergedStep.disableScrollParentFix);
  var floaterProps = deepmerge.all([props.floaterProps || {}, DEFAULTS.floaterProps, mergedStep.floaterProps || {}]); // Set react-floater props

  floaterProps.offset = mergedStep.offset;
  floaterProps.styles = deepmerge(floaterProps.styles || {}, mergedStyles.floaterStyles || {});
  delete mergedStyles.floaterStyles;

  if (!mergedStep.disableScrolling) {
    floaterProps.offset += props.spotlightPadding || step.spotlightPadding || 0;
  }

  if (step.placementBeacon) {
    floaterProps.wrapperOptions.placement = step.placementBeacon;
  }

  if (scrollParent$$1) {
    floaterProps.options.preventOverflow.boundariesElement = 'window';
  }

  return _objectSpread({}, mergedStep, {
    locale: deepmerge.all([DEFAULTS.locale, props.locale || {}, mergedStep.locale || {}]),
    floaterProps: floaterProps,
    styles: mergedStyles
  });
}
/**
 * Validate if a step is valid
 *
 * @param {Object} step - A step object
 * @param {boolean} debug
 *
 * @returns {boolean} - True if the step is valid, false otherwise
 */

function validateStep(step) {
  var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!is.plainObject(step)) {
    log({
      title: 'validateStep',
      data: 'step must be an object',
      warn: true,
      debug: debug
    });
    return false;
  }

  if (!step.target) {
    log({
      title: 'validateStep',
      data: 'target is missing from the step',
      warn: true,
      debug: debug
    });
    return false;
  }

  return true;
}
/**
 * Validate if steps is valid
 *
 * @param {Array} steps - A steps array
 * @param {boolean} debug
 *
 * @returns {boolean} - True if the steps are valid, false otherwise
 */

function validateSteps(steps) {
  var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!is.array(steps)) {
    log({
      title: 'validateSteps',
      data: 'steps must be an array',
      warn: true,
      debug: debug
    });
    return false;
  }

  return steps.every(function (d) {
    return validateStep(d, debug);
  });
}

var Scope = function Scope(_element) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Scope);

  _defineProperty(this, "element", void 0);

  _defineProperty(this, "options", void 0);

  _defineProperty(this, "canBeTabbed", function (element) {
    var tabIndex = element.tabIndex;
    if (tabIndex === null || tabIndex < 0) tabIndex = undefined;
    var isTabIndexNaN = isNaN(tabIndex);
    return !isTabIndexNaN && _this.canHaveFocus(element, true);
  });

  _defineProperty(this, "canHaveFocus", function (element, isTabIndexNotNaN) {
    var validTabNodes = /input|select|textarea|button|object/;
    var nodeName = element.nodeName.toLowerCase();
    var res = validTabNodes.test(nodeName) && !element.getAttribute('disabled') || (nodeName === 'a' ? element.getAttribute('href') || isTabIndexNotNaN : isTabIndexNotNaN);
    return res && _this.isVisible(element);
  });

  _defineProperty(this, "findValidTabElements", function () {
    return [].slice.call(_this.element.querySelectorAll('*'), 0).filter(_this.canBeTabbed);
  });

  _defineProperty(this, "handleKeyDown", function (e) {
    var _this$options$keyCode = _this.options.keyCode,
        keyCode = _this$options$keyCode === void 0 ? 9 : _this$options$keyCode;
    /* istanbul ignore else */

    if (e.keyCode === keyCode) {
      _this.interceptTab(e);
    }
  });

  _defineProperty(this, "interceptTab", function (event) {
    event.preventDefault();

    var elements = _this.findValidTabElements();

    var shiftKey = event.shiftKey;

    if (!elements.length) {
      return;
    }

    var x = elements.indexOf(document.activeElement);

    if (x === -1 || !shiftKey && x + 1 === elements.length) {
      x = 0;
    } else if (shiftKey && x === 0) {
      x = elements.length - 1;
    } else {
      x += shiftKey ? -1 : 1;
    }

    elements[x].focus();
  });

  _defineProperty(this, "isHidden", function (element) {
    var noSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;
    var style = window.getComputedStyle(element);
    if (noSize && !element.innerHTML) return true;
    return noSize && style.getPropertyValue('overflow') !== 'visible' || style.getPropertyValue('display') === 'none';
  });

  _defineProperty(this, "isVisible", function (element) {
    var parentElement = element;

    while (parentElement) {
      /* istanbul ignore else */
      if (parentElement instanceof HTMLElement) {
        if (parentElement === document.body) break;
        /* istanbul ignore else */

        if (_this.isHidden(parentElement)) return false;
        parentElement = parentElement.parentNode;
      }
    }

    return true;
  });

  _defineProperty(this, "removeScope", function () {
    window.removeEventListener('keydown', _this.handleKeyDown);
  });

  _defineProperty(this, "setFocus", function () {
    var selector = _this.options.selector;
    if (!selector) return;

    var target = _this.element.querySelector(selector);
    /* istanbul ignore else */


    if (target) {
      target.focus();
    }
  });

  if (!(_element instanceof HTMLElement)) {
    throw new TypeError('Invalid parameter: element must be an HTMLElement');
  }

  this.element = _element;
  this.options = options;
  window.addEventListener('keydown', this.handleKeyDown, false);
  this.setFocus();
};

var JoyrideBeacon =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JoyrideBeacon, _React$Component);

  function JoyrideBeacon(props) {
    var _this;

    _classCallCheck(this, JoyrideBeacon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JoyrideBeacon).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setBeaconRef", function (c) {
      _this.beacon = c;
    });

    if (!props.beaconComponent) {
      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      var css = "\n        @keyframes joyride-beacon-inner {\n          20% {\n            opacity: 0.9;\n          }\n        \n          90% {\n            opacity: 0.7;\n          }\n        }\n        \n        @keyframes joyride-beacon-outer {\n          0% {\n            transform: scale(1);\n          }\n        \n          45% {\n            opacity: 0.7;\n            transform: scale(0.75);\n          }\n        \n          100% {\n            opacity: 0.9;\n            transform: scale(1);\n          }\n        }\n      ";
      style.type = 'text/css';
      style.id = 'joyride-beacon-animation';
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }

    return _this;
  }

  _createClass(JoyrideBeacon, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (process.env.NODE_ENV !== 'production') {
        if (!is.domElement(this.beacon)) {
          console.warn('beacon is not a valid DOM element'); //eslint-disable-line no-console
        }
      }

      setTimeout(function () {
        if (is.domElement(_this2.beacon)) {
          _this2.beacon.focus();
        }
      }, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var style = document.getElementById('joyride-beacon-animation');

      if (style) {
        style.parentNode.removeChild(style);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          beaconComponent = _this$props.beaconComponent,
          locale = _this$props.locale,
          onClickOrHover = _this$props.onClickOrHover,
          styles = _this$props.styles;
      var props = {
        'aria-label': locale.open,
        onClick: onClickOrHover,
        onMouseEnter: onClickOrHover,
        ref: this.setBeaconRef,
        title: locale.open
      };
      var component;

      if (beaconComponent) {
        var BeaconComponent = beaconComponent;
        component = React__default.createElement(BeaconComponent, props);
      } else {
        component = React__default.createElement("button", _extends({
          key: "JoyrideBeacon",
          className: "react-joyride__beacon",
          style: styles.beacon,
          type: "button",
          "data-test-id": "button-beacon"
        }, props), React__default.createElement("span", {
          style: styles.beaconInner
        }), React__default.createElement("span", {
          style: styles.beaconOuter
        }));
      }

      return component;
    }
  }]);

  return JoyrideBeacon;
}(React__default.Component);

_defineProperty(JoyrideBeacon, "propTypes", {
  beaconComponent: componentTypeWithRefs,
  locale: PropTypes.object.isRequired,
  onClickOrHover: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
});

var JoyrideSpotlight = function JoyrideSpotlight(_ref) {
  var styles = _ref.styles;
  return React__default.createElement("div", {
    key: "JoyrideSpotlight",
    className: "react-joyride__spotlight",
    style: styles
  });
};

JoyrideSpotlight.propTypes = {
  styles: PropTypes.object.isRequired
};

var JoyrideOverlay =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JoyrideOverlay, _React$Component);

  function JoyrideOverlay(props) {
    var _this;

    _classCallCheck(this, JoyrideOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JoyrideOverlay).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseMove", function (e) {
      var mouseOverSpotlight = _this.state.mouseOverSpotlight;
      var _this$stylesSpotlight = _this.stylesSpotlight,
          height = _this$stylesSpotlight.height,
          left = _this$stylesSpotlight.left,
          position = _this$stylesSpotlight.position,
          top = _this$stylesSpotlight.top,
          width = _this$stylesSpotlight.width;
      var offsetY = position === 'fixed' ? e.clientY : e.pageY;
      var offsetX = position === 'fixed' ? e.clientX : e.pageX;
      var inSpotlightHeight = offsetY >= top && offsetY <= top + height;
      var inSpotlightWidth = offsetX >= left && offsetX <= left + width;
      var inSpotlight = inSpotlightWidth && inSpotlightHeight;

      if (inSpotlight !== mouseOverSpotlight) {
        _this.setState({
          mouseOverSpotlight: inSpotlight
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScroll", function () {
      var isScrolling = _this.state.isScrolling;

      if (!isScrolling) {
        _this.setState({
          isScrolling: true,
          showSpotlight: false
        });
      }

      clearTimeout(_this.scrollTimeout);
      _this.scrollTimeout = setTimeout(function () {
        _this.setState({
          isScrolling: false,
          showSpotlight: true
        });

        _this.scrollParent.removeEventListener('scroll', _this.handleScroll);
      }, 50);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResize", function () {
      clearTimeout(_this.resizeTimeout);
      _this.resizeTimeout = setTimeout(function () {
        clearTimeout(_this.resizeTimeout);

        _this.forceUpdate();
      }, 100);
    });

    _this.state = {
      mouseOverSpotlight: false,
      isScrolling: false,
      showSpotlight: props.disableScrolling
    };
    return _this;
  }

  _createClass(JoyrideOverlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          debug = _this$props.debug,
          disableScrolling = _this$props.disableScrolling,
          disableScrollParentFix = _this$props.disableScrollParentFix,
          target = _this$props.target;
      /* istanbul ignore else */

      if (!disableScrolling) {
        var element = getElement(target);
        this.scrollParent = getScrollParent(element, disableScrollParentFix);
        /* istanbul ignore else */

        if (hasCustomScrollParent(element, true)) {
          log({
            title: 'step has a custom scroll parent and can cause trouble with scrolling',
            data: [{
              key: 'parent',
              value: this.scrollParent
            }],
            debug: debug
          });
        }
      }

      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var _this$props2 = this.props,
          disableScrolling = _this$props2.disableScrolling,
          lifecycle = _this$props2.lifecycle,
          spotlightClicks = _this$props2.spotlightClicks;

      var _treeChanges = treeChanges(prevProps, this.props),
          changed = _treeChanges.changed,
          changedTo = _treeChanges.changedTo;
      /* istanbul ignore else */


      if (!disableScrolling) {
        if (changedTo('lifecycle', LIFECYCLE.TOOLTIP)) {
          this.scrollParent.addEventListener('scroll', this.handleScroll, {
            passive: true
          });
          setTimeout(function () {
            var isScrolling = _this2.state.isScrolling;

            if (!isScrolling) {
              _this2.setState({
                showSpotlight: true
              });

              _this2.scrollParent.removeEventListener('scroll', _this2.handleScroll);
            }
          }, 100);
        }
      }

      if (changed('spotlightClicks') || changed('disableOverlay') || changed('lifecycle')) {
        if (spotlightClicks && lifecycle === LIFECYCLE.TOOLTIP) {
          window.addEventListener('mousemove', this.handleMouseMove, false);
        } else if (lifecycle !== LIFECYCLE.TOOLTIP) {
          window.removeEventListener('mousemove', this.handleMouseMove);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var disableScrolling = this.props.disableScrolling;
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('resize', this.handleResize);
      /* istanbul ignore else */

      if (!disableScrolling) {
        clearTimeout(this.scrollTimeout);
        this.scrollParent.removeEventListener('scroll', this.handleScroll);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          mouseOverSpotlight = _this$state.mouseOverSpotlight,
          showSpotlight = _this$state.showSpotlight;
      var _this$props3 = this.props,
          disableOverlay = _this$props3.disableOverlay,
          lifecycle = _this$props3.lifecycle,
          onClickOverlay = _this$props3.onClickOverlay,
          placement = _this$props3.placement,
          styles = _this$props3.styles;

      if (disableOverlay || lifecycle !== LIFECYCLE.TOOLTIP) {
        return null;
      }

      var baseStyles = styles.overlay;
      /* istanbul ignore else */

      if (isLegacy()) {
        baseStyles = placement === 'center' ? styles.overlayLegacyCenter : styles.overlayLegacy;
      }

      var stylesOverlay = _objectSpread({
        cursor: 'pointer',
        height: getDocumentHeight(),
        pointerEvents: mouseOverSpotlight ? 'none' : 'auto'
      }, baseStyles);

      var spotlight = placement !== 'center' && showSpotlight && React__default.createElement(JoyrideSpotlight, {
        styles: this.stylesSpotlight
      }); // Hack for Safari bug with mix-blend-mode with z-index

      if (getBrowser() === 'safari') {
        var mixBlendMode = stylesOverlay.mixBlendMode,
            zIndex = stylesOverlay.zIndex,
            safarOverlay = _objectWithoutProperties(stylesOverlay, ["mixBlendMode", "zIndex"]);

        spotlight = React__default.createElement("div", {
          style: _objectSpread({}, safarOverlay)
        }, spotlight);
        delete stylesOverlay.backgroundColor;
      }

      return React__default.createElement("div", {
        className: "react-joyride__overlay",
        style: stylesOverlay,
        onClick: onClickOverlay
      }, spotlight);
    }
  }, {
    key: "stylesSpotlight",
    get: function get() {
      var showSpotlight = this.state.showSpotlight;
      var _this$props4 = this.props,
          disableScrollParentFix = _this$props4.disableScrollParentFix,
          spotlightClicks = _this$props4.spotlightClicks,
          spotlightPadding = _this$props4.spotlightPadding,
          styles = _this$props4.styles,
          target = _this$props4.target;
      var element = getElement(target);
      var elementRect = getClientRect(element);
      var isFixedTarget = isFixed(element);
      var top = getElementPosition(element, spotlightPadding, disableScrollParentFix);
      return _objectSpread({}, isLegacy() ? styles.spotlightLegacy : styles.spotlight, {
        height: Math.round(elementRect.height + spotlightPadding * 2),
        left: Math.round(elementRect.left - spotlightPadding),
        opacity: showSpotlight ? 1 : 0,
        pointerEvents: spotlightClicks ? 'none' : 'auto',
        position: isFixedTarget ? 'fixed' : 'absolute',
        top: top,
        transition: 'opacity 0.2s',
        width: Math.round(elementRect.width + spotlightPadding * 2)
      });
    }
  }]);

  return JoyrideOverlay;
}(React__default.Component);

_defineProperty(JoyrideOverlay, "propTypes", {
  debug: PropTypes.bool.isRequired,
  disableOverlay: PropTypes.bool.isRequired,
  disableScrolling: PropTypes.bool.isRequired,
  disableScrollParentFix: PropTypes.bool.isRequired,
  lifecycle: PropTypes.string.isRequired,
  onClickOverlay: PropTypes.func.isRequired,
  placement: PropTypes.string.isRequired,
  spotlightClicks: PropTypes.bool.isRequired,
  spotlightPadding: PropTypes.number,
  styles: PropTypes.object.isRequired,
  target: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
});

var JoyrideTooltipCloseBtn = function JoyrideTooltipCloseBtn(_ref) {
  var styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  var color = styles.color,
      height = styles.height,
      width = styles.width,
      style = _objectWithoutProperties(styles, ["color", "height", "width"]);

  return React__default.createElement("button", _extends({
    style: style,
    type: "button"
  }, props), React__default.createElement("svg", {
    width: typeof width === 'number' ? "".concat(width, "px") : width,
    height: typeof height === 'number' ? "".concat(height, "px") : height,
    viewBox: "0 0 18 18",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    preserveAspectRatio: "xMidYMid"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z",
    fill: color
  }))));
};

JoyrideTooltipCloseBtn.propTypes = {
  styles: PropTypes.object.isRequired
};

var JoyrideTooltipContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JoyrideTooltipContainer, _React$Component);

  function JoyrideTooltipContainer() {
    _classCallCheck(this, JoyrideTooltipContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(JoyrideTooltipContainer).apply(this, arguments));
  }

  _createClass(JoyrideTooltipContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          backProps = _this$props.backProps,
          closeProps = _this$props.closeProps,
          continuous = _this$props.continuous,
          index = _this$props.index,
          isLastStep = _this$props.isLastStep,
          primaryProps = _this$props.primaryProps,
          size = _this$props.size,
          skipProps = _this$props.skipProps,
          step = _this$props.step,
          tooltipProps = _this$props.tooltipProps;
      var content = step.content,
          hideBackButton = step.hideBackButton,
          hideCloseButton = step.hideCloseButton,
          hideFooter = step.hideFooter,
          showProgress = step.showProgress,
          showSkipButton = step.showSkipButton,
          title = step.title,
          styles = step.styles;
      var _step$locale = step.locale,
          back = _step$locale.back,
          close = _step$locale.close,
          last = _step$locale.last,
          next = _step$locale.next,
          skip = _step$locale.skip;
      var output = {
        primary: close
      };

      if (continuous) {
        output.primary = isLastStep ? last : next;

        if (showProgress) {
          output.primary = React__default.createElement("span", null, output.primary, " (", index + 1, "/", size, ")");
        }
      }

      if (showSkipButton && !isLastStep) {
        output.skip = React__default.createElement("button", _extends({
          style: styles.buttonSkip,
          type: "button",
          "data-test-id": "button-skip",
          "aria-live": "off"
        }, skipProps), skip);
      }

      if (!hideBackButton && index > 0) {
        output.back = React__default.createElement("button", _extends({
          style: styles.buttonBack,
          type: "button",
          "data-test-id": "button-back"
        }, backProps), back);
      }

      output.close = !hideCloseButton && React__default.createElement(JoyrideTooltipCloseBtn, _extends({
        styles: styles.buttonClose,
        "data-test-id": "button-close"
      }, closeProps));
      return React__default.createElement("div", _extends({
        key: "JoyrideTooltip",
        className: "react-joyride__tooltip",
        style: styles.tooltip
      }, tooltipProps), React__default.createElement("div", {
        style: styles.tooltipContainer
      }, title && React__default.createElement("h4", {
        style: styles.tooltipTitle,
        "aria-label": title
      }, title), React__default.createElement("div", {
        style: styles.tooltipContent
      }, content)), !hideFooter && React__default.createElement("div", {
        style: styles.tooltipFooter
      }, React__default.createElement("div", {
        style: styles.tooltipFooterSpacer
      }, output.skip), output.back, React__default.createElement("button", _extends({
        style: styles.buttonNext,
        type: "button",
        "data-test-id": "button-primary"
      }, primaryProps), output.primary)), output.close);
    }
  }]);

  return JoyrideTooltipContainer;
}(React__default.Component);

_defineProperty(JoyrideTooltipContainer, "propTypes", {
  backProps: PropTypes.object.isRequired,
  closeProps: PropTypes.object.isRequired,
  continuous: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  primaryProps: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  skipProps: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
  tooltipProps: PropTypes.object.isRequired
});

var JoyrideTooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JoyrideTooltip, _React$Component);

  function JoyrideTooltip() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, JoyrideTooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(JoyrideTooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickBack", function (e) {
      e.preventDefault();
      var helpers = _this.props.helpers;
      helpers.prev();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSeen", function () {
      var _this$props = _this.props,
          isLastStep = _this$props.isLastStep,
          id = _this$props.id;
      var storage = localStorage;
      var storeId = "".concat(id, "-seen");

      if (isLastStep && !storage.getItem(storeId)) {
        setTimeout(function () {
          storage.setItem(storeId, true);
        }, 500);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickClose", function (e) {
      e.preventDefault();
      var helpers = _this.props.helpers;

      _this.handleSeen();

      helpers.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickPrimary", function (e) {
      e.preventDefault();
      var _this$props2 = _this.props,
          continuous = _this$props2.continuous,
          helpers = _this$props2.helpers,
          isLastStep = _this$props2.isLastStep;

      if (isLastStep) {
        _this.handleSeen();
      }

      if (!continuous) {
        helpers.close();
        return;
      }

      helpers.next();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickSkip", function (e) {
      e.preventDefault();
      var helpers = _this.props.helpers;
      helpers.skip();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getElementsProps", function () {
      var _this$props3 = _this.props,
          continuous = _this$props3.continuous,
          isLastStep = _this$props3.isLastStep,
          setTooltipRef = _this$props3.setTooltipRef,
          step = _this$props3.step;
      var back = getText(step.locale.back);
      var close = getText(step.locale.close);
      var last = getText(step.locale.last);
      var next = getText(step.locale.next);
      var skip = getText(step.locale.skip);
      var primaryText = continuous ? next : close;

      if (isLastStep) {
        primaryText = last;
      }

      return {
        backProps: {
          'aria-label': back,
          'data-action': 'back',
          onClick: _this.handleClickBack,
          role: 'button',
          title: back
        },
        closeProps: {
          'aria-label': close,
          'data-action': 'close',
          onClick: _this.handleClickClose,
          role: 'button',
          title: close
        },
        primaryProps: {
          'aria-label': primaryText,
          'data-action': 'primary',
          onClick: _this.handleClickPrimary,
          role: 'button',
          title: primaryText
        },
        skipProps: {
          'aria-label': skip,
          'data-action': 'skip',
          onClick: _this.handleClickSkip,
          role: 'button',
          title: skip
        },
        tooltipProps: {
          'aria-modal': true,
          ref: setTooltipRef,
          role: 'alertdialog'
        }
      };
    });

    return _this;
  }

  _createClass(JoyrideTooltip, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          continuous = _this$props4.continuous,
          index = _this$props4.index,
          isLastStep = _this$props4.isLastStep,
          size = _this$props4.size,
          step = _this$props4.step,
          id = _this$props4.id;

      var beaconComponent = step.beaconComponent,
          tooltipComponent = step.tooltipComponent,
          cleanStep = _objectWithoutProperties(step, ["beaconComponent", "tooltipComponent"]);

      var component;

      if (tooltipComponent) {
        var renderProps = _objectSpread({}, this.getElementsProps(), {
          continuous: continuous,
          index: index,
          isLastStep: isLastStep,
          size: size,
          step: cleanStep
        });

        var TooltipComponent = tooltipComponent;
        component = React__default.createElement(TooltipComponent, renderProps);
      } else {
        component = React__default.createElement(JoyrideTooltipContainer, _extends({}, this.getElementsProps(), {
          continuous: continuous,
          index: index,
          isLastStep: isLastStep,
          size: size,
          step: step
        }));
      }

      return component;
    }
  }]);

  return JoyrideTooltip;
}(React__default.Component);

_defineProperty(JoyrideTooltip, "propTypes", {
  continuous: PropTypes.bool.isRequired,
  helpers: PropTypes.object.isRequired,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  setTooltipRef: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired
});

var JoyridePortal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JoyridePortal, _React$Component);

  function JoyridePortal(props) {
    var _this;

    _classCallCheck(this, JoyridePortal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JoyridePortal).call(this, props));
    if (!canUseDOM) return _possibleConstructorReturn(_this);
    _this.node = document.createElement('div');
    /* istanbul ignore else */

    if (props.id) {
      _this.node.id = props.id;
    }

    document.body.appendChild(_this.node);
    return _this;
  }

  _createClass(JoyridePortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!canUseDOM) return;

      if (!isReact16) {
        this.renderReact15();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!canUseDOM) return;

      if (!isReact16) {
        this.renderReact15();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!canUseDOM || !this.node) return;

      if (!isReact16) {
        ReactDOM__default.unmountComponentAtNode(this.node);
      }

      document.body.removeChild(this.node);
    }
  }, {
    key: "renderReact15",
    value: function renderReact15() {
      if (!canUseDOM) return null;
      var children = this.props.children;
      ReactDOM__default.unstable_renderSubtreeIntoContainer(this, children, this.node);
      return null;
    }
  }, {
    key: "renderReact16",
    value: function renderReact16() {
      if (!canUseDOM || !isReact16) return null;
      var children = this.props.children;
      return ReactDOM__default.createPortal(children, this.node);
    }
  }, {
    key: "render",
    value: function render() {
      if (!isReact16) {
        return null;
      }

      return this.renderReact16();
    }
  }]);

  return JoyridePortal;
}(React__default.Component);

_defineProperty(JoyridePortal, "propTypes", {
  children: PropTypes.element,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

var JoyrideStep =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JoyrideStep, _React$Component);

  function JoyrideStep() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, JoyrideStep);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(JoyrideStep)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scope", {
      removeScope: function removeScope() {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickHoverBeacon", function (e) {
      var _this$props = _this.props,
          step = _this$props.step,
          update = _this$props.update;

      if (e.type === 'mouseenter' && step.event !== 'hover') {
        return;
      }

      update({
        lifecycle: LIFECYCLE.TOOLTIP
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickOverlay", function () {
      var _this$props2 = _this.props,
          helpers = _this$props2.helpers,
          step = _this$props2.step;

      if (!step.disableOverlayClose) {
        helpers.close();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setTooltipRef", function (c) {
      _this.tooltip = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPopper", function (popper, type) {
      var _this$props3 = _this.props,
          action = _this$props3.action,
          setPopper = _this$props3.setPopper,
          update = _this$props3.update;

      if (type === 'wrapper') {
        _this.beaconPopper = popper;
      } else {
        _this.tooltipPopper = popper;
      }

      setPopper(popper, type);

      if (_this.beaconPopper && _this.tooltipPopper) {
        update({
          action: action === ACTIONS.CLOSE ? ACTIONS.CLOSE : action,
          lifecycle: LIFECYCLE.READY
        });
      }
    });

    return _this;
  }

  _createClass(JoyrideStep, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props4 = this.props,
          debug = _this$props4.debug,
          index = _this$props4.index;
      log({
        title: "step:".concat(index),
        data: [{
          key: 'props',
          value: this.props
        }],
        debug: debug
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props5 = this.props,
          action = _this$props5.action,
          callback = _this$props5.callback,
          continuous = _this$props5.continuous,
          controlled = _this$props5.controlled,
          debug = _this$props5.debug,
          index = _this$props5.index,
          lifecycle = _this$props5.lifecycle,
          size = _this$props5.size,
          status = _this$props5.status,
          step = _this$props5.step,
          update = _this$props5.update;

      var _treeChanges = treeChanges(prevProps, this.props),
          changed = _treeChanges.changed,
          changedTo = _treeChanges.changedTo,
          changedFrom = _treeChanges.changedFrom;

      var state = {
        action: action,
        controlled: controlled,
        index: index,
        lifecycle: lifecycle,
        size: size,
        status: status
      };
      var skipBeacon = continuous && action !== ACTIONS.CLOSE && (index > 0 || action === ACTIONS.PREV);
      var hasStoreChanged = changed('action') || changed('index') || changed('lifecycle') || changed('status');
      var hasStarted = changedFrom('lifecycle', [LIFECYCLE.TOOLTIP, LIFECYCLE.INIT], LIFECYCLE.INIT);
      var isAfterAction = changedTo('action', [ACTIONS.NEXT, ACTIONS.PREV, ACTIONS.SKIP, ACTIONS.CLOSE]);

      if (isAfterAction && (hasStarted || controlled)) {
        callback(_objectSpread({}, state, {
          index: prevProps.index,
          lifecycle: LIFECYCLE.COMPLETE,
          step: prevProps.step,
          type: EVENTS.STEP_AFTER
        }));
      } // There's a step to use, but there's no target in the DOM


      if (hasStoreChanged && step) {
        var element = getElement(step.target);
        var hasRenderedTarget = !!element && isElementVisible(element);

        if (hasRenderedTarget) {
          if (changedFrom('status', STATUS.READY, STATUS.RUNNING) || changedFrom('lifecycle', LIFECYCLE.INIT, LIFECYCLE.READY)) {
            callback(_objectSpread({}, state, {
              step: step,
              type: EVENTS.STEP_BEFORE
            }));
          }
        } else {
          console.warn('Target not mounted', step); //eslint-disable-line no-console

          callback(_objectSpread({}, state, {
            type: EVENTS.TARGET_NOT_FOUND,
            step: step
          }));

          if (!controlled) {
            update({
              index: index + ([ACTIONS.PREV].includes(action) ? -1 : 1)
            });
          }
        }
      }

      if (changedFrom('lifecycle', LIFECYCLE.INIT, LIFECYCLE.READY)) {
        update({
          lifecycle: hideBeacon(step) || skipBeacon ? LIFECYCLE.TOOLTIP : LIFECYCLE.BEACON
        });
      }

      if (changed('index')) {
        log({
          title: "step:".concat(lifecycle),
          data: [{
            key: 'props',
            value: this.props
          }],
          debug: debug
        });
      }
      /* istanbul ignore else */


      if (changedTo('lifecycle', LIFECYCLE.BEACON)) {
        callback(_objectSpread({}, state, {
          step: step,
          type: EVENTS.BEACON
        }));
      }

      if (changedTo('lifecycle', LIFECYCLE.TOOLTIP)) {
        callback(_objectSpread({}, state, {
          step: step,
          type: EVENTS.TOOLTIP
        }));

        try {
          this.scope = new Scope(this.tooltip, {
            selector: '[data-action=primary]'
          });
          this.scope.setFocus();
        } catch (e) {
          console.log('Caught error', e);
          return;
        }
      }

      if (changedFrom('lifecycle', [LIFECYCLE.TOOLTIP, LIFECYCLE.INIT], LIFECYCLE.INIT)) {
        this.scope.removeScope();
        delete this.beaconPopper;
        delete this.tooltipPopper;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.scope.removeScope();
    }
    /**
     * Beacon click/hover event listener
     *
     * @param {Event} e
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          continuous = _this$props6.continuous,
          debug = _this$props6.debug,
          helpers = _this$props6.helpers,
          index = _this$props6.index,
          lifecycle = _this$props6.lifecycle,
          size = _this$props6.size,
          step = _this$props6.step,
          id = _this$props6.id;
      var target = getElement(step.target);

      if (!validateStep(step) || !is.domElement(target)) {
        return null;
      }

      return React__default.createElement("div", {
        key: "JoyrideStep-".concat(index),
        className: "react-joyride__step"
      }, React__default.createElement(JoyridePortal, {
        id: "react-joyride-portal"
      }, React__default.createElement(JoyrideOverlay, _extends({}, step, {
        debug: debug,
        lifecycle: lifecycle,
        onClickOverlay: this.handleClickOverlay
      }))), React__default.createElement(Floater, _extends({
        component: React__default.createElement(JoyrideTooltip, {
          continuous: continuous,
          helpers: helpers,
          id: id,
          index: index,
          isLastStep: index + 1 === size,
          setTooltipRef: this.setTooltipRef,
          size: size,
          step: step
        }),
        debug: debug,
        getPopper: this.setPopper,
        id: "react-joyride-step-".concat(index),
        isPositioned: step.isFixed || isFixed(target),
        open: this.open,
        placement: step.placement,
        target: step.target
      }, step.floaterProps), React__default.createElement(JoyrideBeacon, {
        beaconComponent: step.beaconComponent,
        locale: step.locale,
        onClickOrHover: this.handleClickHoverBeacon,
        styles: step.styles
      })));
    }
  }, {
    key: "open",
    get: function get() {
      var _this$props7 = this.props,
          step = _this$props7.step,
          lifecycle = _this$props7.lifecycle;
      return !!(hideBeacon(step) || lifecycle === LIFECYCLE.TOOLTIP);
    }
  }]);

  return JoyrideStep;
}(React__default.Component);

_defineProperty(JoyrideStep, "propTypes", {
  action: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  continuous: PropTypes.bool.isRequired,
  controlled: PropTypes.bool.isRequired,
  debug: PropTypes.bool.isRequired,
  helpers: PropTypes.object.isRequired,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  lifecycle: PropTypes.string.isRequired,
  setPopper: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  step: PropTypes.shape({
    beaconComponent: componentTypeWithRefs,
    content: PropTypes.node.isRequired,
    disableBeacon: PropTypes.bool,
    disableOverlay: PropTypes.bool,
    disableOverlayClose: PropTypes.bool,
    disableScrolling: PropTypes.bool,
    disableScrollParentFix: PropTypes.bool,
    event: PropTypes.string,
    floaterProps: PropTypes.shape({
      options: PropTypes.object,
      styles: PropTypes.object,
      wrapperOptions: PropTypes.object
    }),
    hideBackButton: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    hideFooter: PropTypes.bool,
    isFixed: PropTypes.bool,
    locale: PropTypes.object,
    offset: PropTypes.number.isRequired,
    placement: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'auto', 'center']),
    spotlightClicks: PropTypes.bool,
    spotlightPadding: PropTypes.number,
    styles: PropTypes.object,
    target: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    title: PropTypes.node,
    tooltipComponent: componentTypeWithRefs
  }).isRequired,
  update: PropTypes.func.isRequired
});

var Joyride =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Joyride, _React$Component);

  function Joyride(props) {
    var _this;

    _classCallCheck(this, Joyride);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Joyride).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initStore", function () {
      var _this$props = _this.props,
          debug = _this$props.debug,
          getHelpers = _this$props.getHelpers,
          run = _this$props.run,
          stepIndex = _this$props.stepIndex;
      _this.store = new createStore(_objectSpread({}, _this.props, {
        controlled: run && is.number(stepIndex)
      }));
      _this.helpers = _this.store.getHelpers();
      var addListener = _this.store.addListener;
      log({
        title: 'init',
        data: [{
          key: 'props',
          value: _this.props
        }, {
          key: 'state',
          value: _this.state
        }],
        debug: debug
      }); // Sync the store to this component's state.

      addListener(_this.syncState);
      getHelpers(_this.helpers);
      return _this.store.getState();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "callback", function (data) {
      var callback = _this.props.callback;
      /* istanbul ignore else */

      if (is.function(callback)) {
        callback(data);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyboard", function (e) {
      var _this$state = _this.state,
          index = _this$state.index,
          lifecycle = _this$state.lifecycle;
      var steps = _this.props.steps;
      var step = steps[index];
      var intKey = window.Event ? e.which : e.keyCode;

      if (lifecycle === LIFECYCLE.TOOLTIP) {
        if (intKey === 27 && step && !step.disableCloseOnEsc) {
          _this.store.close();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "syncState", function (state) {
      _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPopper", function (popper, type) {
      if (type === 'wrapper') {
        _this.beaconPopper = popper;
      } else {
        _this.tooltipPopper = popper;
      }
    });

    _this.state = _this.initStore();
    return _this;
  }

  _createClass(Joyride, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          disableCloseOnEsc = _this$props2.disableCloseOnEsc,
          debug = _this$props2.debug,
          run = _this$props2.run,
          steps = _this$props2.steps,
          id = _this$props2.id,
          mount = _this$props2.mount;
      if (!canUseDOM || !mount) return;
      var storage = localStorage;
      var start = this.store.start;

      if (validateSteps(steps, debug) && run) {
        start();
      }
      /* istanbul ignore else */


      if (!disableCloseOnEsc) {
        document.body.addEventListener('keydown', this.handleKeyboard, {
          passive: true
        });
      }

      if (!(storage && storage.getItem("".concat(id, "-seen")))) {
        setTimeout(function () {
          _this2.store.update({
            lifecycle: LIFECYCLE.TOOLTIP
          });
        }, 3000);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!canUseDOM) return;
      var _this$state2 = this.state,
          action = _this$state2.action,
          controlled = _this$state2.controlled,
          index = _this$state2.index,
          lifecycle = _this$state2.lifecycle,
          status = _this$state2.status;
      var _this$props3 = this.props,
          debug = _this$props3.debug,
          run = _this$props3.run,
          stepIndex = _this$props3.stepIndex,
          steps = _this$props3.steps,
          mount = _this$props3.mount;
      if (!mount) return;
      var prevSteps = prevProps.steps,
          prevStepIndex = prevProps.stepIndex;
      var _this$store = this.store,
          setSteps = _this$store.setSteps,
          reset = _this$store.reset,
          start = _this$store.start,
          stop = _this$store.stop,
          update = _this$store.update;

      var _treeChanges = treeChanges(prevProps, this.props),
          changedProps = _treeChanges.changed;

      var _treeChanges2 = treeChanges(prevState, this.state),
          changed = _treeChanges2.changed,
          changedFrom = _treeChanges2.changedFrom,
          changedTo = _treeChanges2.changedTo;

      var step = getMergedStep(steps[index], this.props);
      var stepsChanged = !isEqual(prevSteps, steps);
      var stepIndexChanged = is.number(stepIndex) && changedProps('stepIndex');

      if (stepsChanged) {
        if (validateSteps(steps, debug)) {
          setSteps(steps);
        } else {
          console.warn('Steps are not valid', steps); //eslint-disable-line no-console
        }
      }
      /* istanbul ignore else */


      if (changedProps('run')) {
        if (run) {
          start(stepIndex);
        } else {
          stop();
        }
      }
      /* istanbul ignore else */


      if (stepIndexChanged) {
        var nextAction = prevStepIndex < stepIndex ? ACTIONS.NEXT : ACTIONS.PREV;

        if (action === ACTIONS.STOP) {
          nextAction = ACTIONS.START;
        }

        if (![STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
          update({
            action: action === ACTIONS.CLOSE ? ACTIONS.CLOSE : nextAction,
            index: stepIndex,
            lifecycle: LIFECYCLE.INIT
          });
        }
      }

      var callbackData = _objectSpread({}, this.state, {
        index: index,
        step: step
      });

      var isAfterAction = changedTo('action', [ACTIONS.NEXT, ACTIONS.PREV, ACTIONS.SKIP, ACTIONS.CLOSE]);

      if (isAfterAction && changedTo('status', STATUS.PAUSED)) {
        var prevStep = getMergedStep(steps[prevState.index], this.props);
        this.callback(_objectSpread({}, callbackData, {
          index: prevState.index,
          lifecycle: LIFECYCLE.COMPLETE,
          step: prevStep,
          type: EVENTS.STEP_AFTER
        }));
      }

      if (changedTo('status', [STATUS.FINISHED, STATUS.SKIPPED])) {
        var _prevStep = getMergedStep(steps[prevState.index], this.props);

        if (!controlled) {
          this.callback(_objectSpread({}, callbackData, {
            index: prevState.index,
            lifecycle: LIFECYCLE.COMPLETE,
            step: _prevStep,
            type: EVENTS.STEP_AFTER
          }));
        }

        this.callback(_objectSpread({}, callbackData, {
          type: EVENTS.TOUR_END,
          // Return the last step when the tour is finished
          step: _prevStep,
          index: prevState.index
        }));
        reset();
      } else if (changedFrom('status', [STATUS.IDLE, STATUS.READY], STATUS.RUNNING)) {
        this.callback(_objectSpread({}, callbackData, {
          type: EVENTS.TOUR_START
        }));
      } else if (changed('status')) {
        this.callback(_objectSpread({}, callbackData, {
          type: EVENTS.TOUR_STATUS
        }));
      } else if (changedTo('action', ACTIONS.RESET)) {
        this.callback(_objectSpread({}, callbackData, {
          type: EVENTS.TOUR_STATUS
        }));
      }

      if (step) {
        this.scrollToStep(prevState);

        if (step.placement === 'center' && status === STATUS.RUNNING && lifecycle === LIFECYCLE.INIT) {
          this.store.update({
            lifecycle: LIFECYCLE.READY
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var disableCloseOnEsc = this.props.disableCloseOnEsc;
      /* istanbul ignore else */

      if (!disableCloseOnEsc) {
        document.body.removeEventListener('keydown', this.handleKeyboard);
      }
    }
  }, {
    key: "scrollToStep",
    value: function scrollToStep(prevState) {
      var _this$state3 = this.state,
          index = _this$state3.index,
          lifecycle = _this$state3.lifecycle,
          status = _this$state3.status;
      var _this$props4 = this.props,
          debug = _this$props4.debug,
          disableScrolling = _this$props4.disableScrolling,
          disableScrollParentFix = _this$props4.disableScrollParentFix,
          scrollToFirstStep = _this$props4.scrollToFirstStep,
          scrollOffset = _this$props4.scrollOffset,
          steps = _this$props4.steps;
      var step = getMergedStep(steps[index], this.props);
      /* istanbul ignore else */

      if (step) {
        var target = getElement(step.target);
        var shouldScroll = !disableScrolling && step.placement !== 'center' && (!step.isFixed || !isFixed(target)) && // fixed steps don't need to scroll
        prevState.lifecycle !== lifecycle && [LIFECYCLE.BEACON, LIFECYCLE.TOOLTIP].includes(lifecycle) && (scrollToFirstStep || prevState.index !== index);

        if (status === STATUS.RUNNING && shouldScroll) {
          var hasCustomScroll = hasCustomScrollParent(target, disableScrollParentFix);
          var scrollParent$$1 = getScrollParent(target, disableScrollParentFix);
          var scrollY = Math.floor(getScrollTo(target, scrollOffset, disableScrollParentFix)) || 0;
          log({
            title: 'scrollToStep',
            data: [{
              key: 'index',
              value: index
            }, {
              key: 'lifecycle',
              value: lifecycle
            }, {
              key: 'status',
              value: status
            }],
            debug: debug
          });
          /* istanbul ignore else */

          if (lifecycle === LIFECYCLE.BEACON && this.beaconPopper) {
            var _this$beaconPopper = this.beaconPopper,
                placement = _this$beaconPopper.placement,
                popper = _this$beaconPopper.popper;
            /* istanbul ignore else */

            if (!['bottom'].includes(placement) && !hasCustomScroll) {
              scrollY = Math.floor(popper.top - scrollOffset);
            }
          } else if (lifecycle === LIFECYCLE.TOOLTIP && this.tooltipPopper) {
            var _this$tooltipPopper = this.tooltipPopper,
                flipped = _this$tooltipPopper.flipped,
                _placement = _this$tooltipPopper.placement,
                _popper = _this$tooltipPopper.popper;

            if (['top', 'right', 'left'].includes(_placement) && !flipped && !hasCustomScroll) {
              scrollY = Math.floor(_popper.top - scrollOffset);
            } else {
              scrollY -= step.spotlightPadding;
            }
          }

          scrollY = scrollY >= 0 ? scrollY : 0;
          /* istanbul ignore else */

          if (status === STATUS.RUNNING) {
            scrollTo(scrollY, scrollParent$$1);
          }
        }
      }
    }
    /**
     * Trigger the callback.
     *
     * @private
     * @param {Object} data
     */

  }, {
    key: "render",
    value: function render() {
      if (!canUseDOM) return null;
      var _this$props5 = this.props,
          continuous = _this$props5.continuous,
          debug = _this$props5.debug,
          steps = _this$props5.steps,
          id = _this$props5.id,
          mount = _this$props5.mount,
          showOnceOnly = _this$props5.showOnceOnly;
      if (!mount) return null;
      var storage = localStorage;

      if (showOnceOnly && storage.getItem("".concat(id, "-seen"))) {
        return null;
      }

      var _this$state4 = this.state,
          index = _this$state4.index,
          status = _this$state4.status;
      var step = getMergedStep(steps[index], this.props);
      var output;

      if (status === STATUS.RUNNING && step) {
        output = React__default.createElement(JoyrideStep, _extends({
          id: id
        }, this.state, {
          callback: this.callback,
          continuous: continuous,
          debug: debug,
          setPopper: this.setPopper,
          helpers: this.helpers,
          step: step,
          update: this.store.update
        }));
      }

      return React__default.createElement("div", {
        className: "react-joyride"
      }, output);
    }
  }]);

  return Joyride;
}(React__default.Component);

_defineProperty(Joyride, "propTypes", {
  beaconComponent: componentTypeWithRefs,
  callback: PropTypes.func,
  continuous: PropTypes.bool,
  debug: PropTypes.bool,
  disableCloseOnEsc: PropTypes.bool,
  disableOverlay: PropTypes.bool,
  disableOverlayClose: PropTypes.bool,
  disableScrolling: PropTypes.bool,
  disableScrollParentFix: PropTypes.bool,
  floaterProps: PropTypes.shape({
    options: PropTypes.object,
    styles: PropTypes.object,
    wrapperOptions: PropTypes.object
  }),
  getHelpers: PropTypes.func,
  hideBackButton: PropTypes.bool,
  id: PropTypes.string,
  locale: PropTypes.object,
  mount: PropTypes.bool,
  run: PropTypes.bool,
  scrollOffset: PropTypes.number,
  scrollToFirstStep: PropTypes.bool,
  showOnceOnly: PropTypes.bool,
  showProgress: PropTypes.bool,
  showSkipButton: PropTypes.bool,
  spotlightClicks: PropTypes.bool,
  spotlightPadding: PropTypes.number,
  stepIndex: PropTypes.number,
  steps: PropTypes.array,
  styles: PropTypes.object,
  tooltipComponent: componentTypeWithRefs
});

_defineProperty(Joyride, "defaultProps", {
  continuous: false,
  debug: false,
  disableCloseOnEsc: false,
  disableOverlay: false,
  disableOverlayClose: false,
  disableScrolling: false,
  disableScrollParentFix: false,
  getHelpers: function getHelpers() {},
  hideBackButton: false,
  id: 'joyride',
  run: true,
  mount: true,
  showOnceOnly: true,
  scrollOffset: 20,
  scrollToFirstStep: false,
  showSkipButton: false,
  showProgress: false,
  spotlightClicks: false,
  spotlightPadding: 10,
  steps: []
});

exports.default = Joyride;
exports.ACTIONS = ACTIONS;
exports.EVENTS = EVENTS;
exports.LIFECYCLE = LIFECYCLE;
exports.STATUS = STATUS;
