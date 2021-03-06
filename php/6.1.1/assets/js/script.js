/*! zanata-assets - v0.1.0 - 2015-02-26
 * https://github.com/lukebrooker/zanata-proto
 * Copyright (c) 2015 Red Hat; Licensed MIT */
function FastClick(t) {
  "use strict";
  var e, n = this;
  if (this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.layer = t, !t || !t.nodeType) throw new TypeError("Layer must be a document node");
  this.onClick = function() {
    return FastClick.prototype.onClick.apply(n, arguments)
  }, this.onMouse = function() {
    return FastClick.prototype.onMouse.apply(n, arguments)
  }, this.onTouchStart = function() {
    return FastClick.prototype.onTouchStart.apply(n, arguments)
  }, this.onTouchEnd = function() {
    return FastClick.prototype.onTouchEnd.apply(n, arguments)
  }, this.onTouchCancel = function() {
    return FastClick.prototype.onTouchCancel.apply(n, arguments)
  }, FastClick.notNeeded(t) || (this.deviceIsAndroid && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, i) {
    var o = Node.prototype.removeEventListener;
    "click" === e ? o.call(t, e, n.hijacked || n, i) : o.call(t, e, n, i)
  }, t.addEventListener = function(e, n, i) {
    var o = Node.prototype.addEventListener;
    "click" === e ? o.call(t, e, n.hijacked || (n.hijacked = function(t) {
      t.propagationStopped || n(t)
    }), i) : o.call(t, e, n, i)
  }), "function" == typeof t.onclick && (e = t.onclick, t.addEventListener("click", function(t) {
    e(t)
  }, !1), t.onclick = null))
}
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), FastClick.prototype.needsClick = function(t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
      case "button":
      case "select":
      case "textarea":
        if (t.disabled) return !0;
        break;
      case "input":
        if (this.deviceIsIOS && "file" === t.type || t.disabled) return !0;
        break;
      case "label":
      case "video":
        return !0
    }
    return /\bneedsclick\b/.test(t.className)
  }, FastClick.prototype.needsFocus = function(t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
      case "textarea":
      case "select":
        return !0;
      case "input":
        switch (t.type) {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return !1
        }
        return !t.disabled && !t.readOnly;
      default:
        return /\bneedsfocus\b/.test(t.className)
    }
  }, FastClick.prototype.sendClick = function(t, e) {
    "use strict";
    var n, i;
    document.activeElement && document.activeElement !== t && document.activeElement.blur(), i = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent("click", !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
  }, FastClick.prototype.focus = function(t) {
    "use strict";
    var e;
    this.deviceIsIOS && t.setSelectionRange ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
  }, FastClick.prototype.updateScrollParent = function(t) {
    "use strict";
    var e, n;
    if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
      n = t;
      do {
        if (n.scrollHeight > n.offsetHeight) {
          e = n, t.fastClickScrollParent = n;
          break
        }
        n = n.parentElement
      } while (n)
    }
    e && (e.fastClickLastScrollTop = e.scrollTop)
  }, FastClick.prototype.getTargetElementFromEventTarget = function(t) {
    "use strict";
    return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
  }, FastClick.prototype.onTouchStart = function(t) {
    "use strict";
    var e, n, i;
    if (t.targetTouches.length > 1) return !0;
    if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], this.deviceIsIOS) {
      if (i = window.getSelection(), i.rangeCount && !i.isCollapsed) return !0;
      if (!this.deviceIsIOS4) {
        if (n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
        this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
      }
    }
    return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, 200 > t.timeStamp - this.lastClickTime && t.preventDefault(), !0
  }, FastClick.prototype.touchHasMoved = function(t) {
    "use strict";
    var e = t.changedTouches[0];
    return Math.abs(e.pageX - this.touchStartX) > 10 || Math.abs(e.pageY - this.touchStartY) > 10 ? !0 : !1
  }, FastClick.prototype.findControl = function(t) {
    "use strict";
    return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
  }, FastClick.prototype.onTouchEnd = function(t) {
    "use strict";
    var e, n, i, o, a, s = this.targetElement;
    if (this.touchHasMoved(t) && (this.trackingClick = !1, this.targetElement = null), !this.trackingClick) return !0;
    if (200 > t.timeStamp - this.lastClickTime) return this.cancelNextClick = !0, !0;
    if (this.lastClickTime = t.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, this.deviceIsIOSWithBadTarget && (a = t.changedTouches[0], s = document.elementFromPoint(a.pageX - window.pageXOffset, a.pageY - window.pageYOffset)), i = s.tagName.toLowerCase(), "label" === i) {
      if (e = this.findControl(s)) {
        if (this.focus(s), this.deviceIsAndroid) return !1;
        s = e
      }
    } else if (this.needsFocus(s)) return t.timeStamp - n > 100 || this.deviceIsIOS && window.top !== window && "input" === i ? (this.targetElement = null, !1) : (this.focus(s), this.deviceIsIOS4 && "select" === i || (this.targetElement = null, t.preventDefault()), !1);
    return this.deviceIsIOS && !this.deviceIsIOS4 && (o = s.fastClickScrollParent, o && o.fastClickLastScrollTop !== o.scrollTop) ? !0 : (this.needsClick(s) || (t.preventDefault(), this.sendClick(s, t)), !1)
  }, FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1, this.targetElement = null
  }, FastClick.prototype.onMouse = function(t) {
    "use strict";
    return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0 : !0
  }, FastClick.prototype.onClick = function(t) {
    "use strict";
    var e;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
  }, FastClick.prototype.destroy = function() {
    "use strict";
    var t = this.layer;
    this.deviceIsAndroid && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
  }, FastClick.notNeeded = function(t) {
    "use strict";
    var e;
    if (window.ontouchstart === void 0) return !0;
    if (/Chrome\/[0-9]+/.test(navigator.userAgent)) {
      if (!FastClick.prototype.deviceIsAndroid) return !0;
      if (e = document.querySelector("meta[name=viewport]"), e && -1 !== e.content.indexOf("user-scalable=no")) return !0
    }
    return "none" === t.style.msTouchAction ? !0 : !1
  }, FastClick.attach = function(t) {
    "use strict";
    return new FastClick(t)
  }, "undefined" != typeof define && define.amd ? define(function() {
    "use strict";
    return FastClick
  }) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick, window.Modernizr = function(t, e, n) {
    function i(t) {
      y.cssText = t
    }

    function o(t, e) {
      return typeof t === e
    }

    function a(t, e) {
      return !!~("" + t).indexOf(e)
    }

    function s(t, e) {
      for (var i in t) {
        var o = t[i];
        if (!a(o, "-") && y[o] !== n) return "pfx" == e ? o : !0
      }
      return !1
    }

    function r(t, e, i) {
      for (var a in t) {
        var s = e[t[a]];
        if (s !== n) return i === !1 ? t[a] : o(s, "function") ? s.bind(i || e) : s
      }
      return !1
    }

    function c(t, e, n) {
      var i = t.charAt(0).toUpperCase() + t.slice(1),
        a = (t + " " + k.join(i + " ") + i).split(" ");
      return o(e, "string") || o(e, "undefined") ? s(a, e) : (a = (t + " " + b.join(i + " ") + i).split(" "), r(a, e, n))
    }
    var l, u, d, p = "2.6.2",
      f = {},
      h = !0,
      m = e.documentElement,
      v = "modernizr",
      g = e.createElement(v),
      y = g.style,
      _ = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
      C = "Webkit Moz O ms",
      k = C.split(" "),
      b = C.toLowerCase().split(" "),
      j = {
        svg: "http://www.w3.org/2000/svg"
      },
      w = {},
      x = [],
      E = x.slice,
      T = function(t, n, i, o) {
        var a, s, r, c, l = e.createElement("div"),
          u = e.body,
          d = u || e.createElement("body");
        if (parseInt(i, 10))
          for (; i--;) r = e.createElement("div"), r.id = o ? o[i] : v + (i + 1), l.appendChild(r);
        return a = ["&#173;", '<style id="s', v, '">', t, "</style>"].join(""), l.id = v, (u ? l : d).innerHTML += a, d.appendChild(l), u || (d.style.background = "", d.style.overflow = "hidden", c = m.style.overflow, m.style.overflow = "hidden", m.appendChild(d)), s = n(l, t), u ? l.parentNode.removeChild(l) : (d.parentNode.removeChild(d), m.style.overflow = c), !!s
      },
      S = {}.hasOwnProperty;
    d = o(S, "undefined") || o(S.call, "undefined") ? function(t, e) {
      return e in t && o(t.constructor.prototype[e], "undefined")
    } : function(t, e) {
      return S.call(t, e)
    }, Function.prototype.bind || (Function.prototype.bind = function(t) {
      var e = this;
      if ("function" != typeof e) throw new TypeError;
      var n = E.call(arguments, 1),
        i = function() {
          if (this instanceof i) {
            var o = function() {};
            o.prototype = e.prototype;
            var a = new o,
              s = e.apply(a, n.concat(E.call(arguments)));
            return Object(s) === s ? s : a
          }
          return e.apply(t, n.concat(E.call(arguments)))
        };
      return i
    }), w.touch = function() {
      var n;
      return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? n = !0 : T(["@media (", _.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(t) {
        n = 9 === t.offsetTop
      }), n
    }, w.csstransforms3d = function() {
      var t = !!c("perspective");
      return t && "webkitPerspective" in m.style && T("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(e) {
        t = 9 === e.offsetLeft && 3 === e.offsetHeight
      }), t
    }, w.fontface = function() {
      var t;
      return T('@font-face {font-family:"font";src:url("https://")}', function(n, i) {
        var o = e.getElementById("smodernizr"),
          a = o.sheet || o.styleSheet,
          s = a ? a.cssRules && a.cssRules[0] ? a.cssRules[0].cssText : a.cssText || "" : "";
        t = /src/i.test(s) && 0 === s.indexOf(i.split(" ")[0])
      }), t
    }, w.svg = function() {
      return !!e.createElementNS && !!e.createElementNS(j.svg, "svg").createSVGRect
    };
    for (var F in w) d(w, F) && (u = F.toLowerCase(), f[u] = w[F](), x.push((f[u] ? "" : "no-") + u));
    return f.addTest = function(t, e) {
        if ("object" == typeof t)
          for (var i in t) d(t, i) && f.addTest(i, t[i]);
        else {
          if (t = t.toLowerCase(), f[t] !== n) return f;
          e = "function" == typeof e ? e() : e, h !== n && h && (m.className += " " + (e ? "" : "no-") + t), f[t] = e
        }
        return f
      }, i(""), g = l = null,
      function(t, e) {
        function i(t, e) {
          var n = t.createElement("p"),
            i = t.getElementsByTagName("head")[0] || t.documentElement;
          return n.innerHTML = "x<style>" + e + "</style>", i.insertBefore(n.lastChild, i.firstChild)
        }

        function o() {
          var t = y.elements;
          return "string" == typeof t ? t.split(" ") : t
        }

        function a(t) {
          var e = g[t[m]];
          return e || (e = {}, v++, t[m] = v, g[v] = e), e
        }

        function s(t, n, i) {
          if (n || (n = e), d) return n.createElement(t);
          i || (i = a(n));
          var o;
          return o = i.cache[t] ? i.cache[t].cloneNode() : h.test(t) ? (i.cache[t] = i.createElem(t)).cloneNode() : i.createElem(t), o.canHaveChildren && !f.test(t) ? i.frag.appendChild(o) : o
        }

        function r(t, n) {
          if (t || (t = e), d) return t.createDocumentFragment();
          n = n || a(t);
          for (var i = n.frag.cloneNode(), s = 0, r = o(), c = r.length; c > s; s++) i.createElement(r[s]);
          return i
        }

        function c(t, e) {
          e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(n) {
            return y.shivMethods ? s(n, t, e) : e.createElem(n)
          }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + o().join().replace(/\w+/g, function(t) {
            return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
          }) + ");return n}")(y, e.frag)
        }

        function l(t) {
          t || (t = e);
          var n = a(t);
          return !y.shivCSS || u || n.hasCSS || (n.hasCSS = !!i(t, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), d || c(t, n), t
        }
        var u, d, p = t.html5 || {},
          f = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
          h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
          m = "_html5shiv",
          v = 0,
          g = {};
        (function() {
          try {
            var t = e.createElement("a");
            t.innerHTML = "<xyz></xyz>", u = "hidden" in t, d = 1 == t.childNodes.length || function() {
              e.createElement("a");
              var t = e.createDocumentFragment();
              return t.cloneNode === n || t.createDocumentFragment === n || t.createElement === n
            }()
          } catch (i) {
            u = !0, d = !0
          }
        })();
        var y = {
          elements: p.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
          shivCSS: p.shivCSS !== !1,
          supportsUnknownElements: d,
          shivMethods: p.shivMethods !== !1,
          type: "default",
          shivDocument: l,
          createElement: s,
          createDocumentFragment: r
        };
        t.html5 = y, l(e)
      }(this, e), f._version = p, f._prefixes = _, f._domPrefixes = b, f._cssomPrefixes = k, f.testProp = function(t) {
        return s([t])
      }, f.testAllProps = c, f.testStyles = T, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + x.join(" ") : ""), f
  }(this, this.document),
  function(t, e, n) {
    function i(t) {
      return "[object Function]" == v.call(t)
    }

    function o(t) {
      return "string" == typeof t
    }

    function a() {}

    function s(t) {
      return !t || "loaded" == t || "complete" == t || "uninitialized" == t
    }

    function r() {
      var t = g.shift();
      y = 1, t ? t.t ? h(function() {
        ("c" == t.t ? p.injectCss : p.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
      }, 0) : (t(), r()) : y = 0
    }

    function c(t, n, i, o, a, c, l) {
      function u(e) {
        if (!f && s(d.readyState) && (_.r = f = 1, !y && r(), d.onload = d.onreadystatechange = null, e)) {
          "img" != t && h(function() {
            k.removeChild(d)
          }, 50);
          for (var i in E[n]) E[n].hasOwnProperty(i) && E[n][i].onload()
        }
      }
      var l = l || p.errorTimeout,
        d = e.createElement(t),
        f = 0,
        v = 0,
        _ = {
          t: i,
          s: n,
          e: a,
          a: c,
          x: l
        };
      1 === E[n] && (v = 1, E[n] = []), "object" == t ? d.data = n : (d.src = n, d.type = t), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function() {
        u.call(this, v)
      }, g.splice(o, 0, _), "img" != t && (v || 2 === E[n] ? (k.insertBefore(d, C ? null : m), h(u, l)) : E[n].push(d))
    }

    function l(t, e, n, i, a) {
      return y = 0, e = e || "j", o(t) ? c("c" == e ? j : b, t, e, this.i++, n, i, a) : (g.splice(this.i++, 0, t), 1 == g.length && r()), this
    }

    function u() {
      var t = p;
      return t.loader = {
        load: l,
        i: 0
      }, t
    }
    var d, p, f = e.documentElement,
      h = t.setTimeout,
      m = e.getElementsByTagName("script")[0],
      v = {}.toString,
      g = [],
      y = 0,
      _ = "MozAppearance" in f.style,
      C = _ && !!e.createRange().compareNode,
      k = C ? f : m.parentNode,
      f = t.opera && "[object Opera]" == v.call(t.opera),
      f = !!e.attachEvent && !f,
      b = _ ? "object" : f ? "script" : "img",
      j = f ? "script" : b,
      w = Array.isArray || function(t) {
        return "[object Array]" == v.call(t)
      },
      x = [],
      E = {},
      T = {
        timeout: function(t, e) {
          return e.length && (t.timeout = e[0]), t
        }
      };
    p = function(t) {
      function e(t) {
        var e, n, i, t = t.split("!"),
          o = x.length,
          a = t.pop(),
          s = t.length,
          a = {
            url: a,
            origUrl: a,
            prefixes: t
          };
        for (n = 0; s > n; n++) i = t[n].split("="), (e = T[i.shift()]) && (a = e(a, i));
        for (n = 0; o > n; n++) a = x[n](a);
        return a
      }

      function s(t, o, a, s, r) {
        var c = e(t),
          l = c.autoCallback;
        c.url.split(".").pop().split("?").shift(), c.bypass || (o && (o = i(o) ? o : o[t] || o[s] || o[t.split("/").pop().split("?")[0]]), c.instead ? c.instead(t, o, a, s, r) : (E[c.url] ? c.noexec = !0 : E[c.url] = 1, a.load(c.url, c.forceCSS || !c.forceJS && "css" == c.url.split(".").pop().split("?").shift() ? "c" : n, c.noexec, c.attrs, c.timeout), (i(o) || i(l)) && a.load(function() {
          u(), o && o(c.origUrl, r, s), l && l(c.origUrl, r, s), E[c.url] = 2
        })))
      }

      function r(t, e) {
        function n(t, n) {
          if (t) {
            if (o(t)) n || (d = function() {
              var t = [].slice.call(arguments);
              p.apply(this, t), f()
            }), s(t, d, e, 0, l);
            else if (Object(t) === t)
              for (c in r = function() {
                  var e, n = 0;
                  for (e in t) t.hasOwnProperty(e) && n++;
                  return n
                }(), t) t.hasOwnProperty(c) && (!n && !--r && (i(d) ? d = function() {
                var t = [].slice.call(arguments);
                p.apply(this, t), f()
              } : d[c] = function(t) {
                return function() {
                  var e = [].slice.call(arguments);
                  t && t.apply(this, e), f()
                }
              }(p[c])), s(t[c], d, e, c, l))
          } else !n && f()
        }
        var r, c, l = !!t.test,
          u = t.load || t.both,
          d = t.callback || a,
          p = d,
          f = t.complete || a;
        n(l ? t.yep : t.nope, !!u), u && n(u)
      }
      var c, l, d = this.yepnope.loader;
      if (o(t)) s(t, 0, d, 0);
      else if (w(t))
        for (c = 0; t.length > c; c++) l = t[c], o(l) ? s(l, 0, d, 0) : w(l) ? p(l) : Object(l) === l && r(l, d);
      else Object(t) === t && r(t, d)
    }, p.addPrefix = function(t, e) {
      T[t] = e
    }, p.addFilter = function(t) {
      x.push(t)
    }, p.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", d = function() {
      e.removeEventListener("DOMContentLoaded", d, 0), e.readyState = "complete"
    }, 0)), t.yepnope = u(), t.yepnope.executeStack = r, t.yepnope.injectJs = function(t, n, i, o, c, l) {
      var u, d, f = e.createElement("script"),
        o = o || p.errorTimeout;
      f.src = t;
      for (d in i) f.setAttribute(d, i[d]);
      n = l ? r : n || a, f.onreadystatechange = f.onload = function() {
        !u && s(f.readyState) && (u = 1, n(), f.onload = f.onreadystatechange = null)
      }, h(function() {
        u || (u = 1, n(1))
      }, o), c ? f.onload() : m.parentNode.insertBefore(f, m)
    }, t.yepnope.injectCss = function(t, n, i, o, s, c) {
      var l, o = e.createElement("link"),
        n = c ? r : n || a;
      o.href = t, o.rel = "stylesheet", o.type = "text/css";
      for (l in i) o.setAttribute(l, i[l]);
      s || (m.parentNode.insertBefore(o, m), h(n, 0))
    }
  }(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
  },
  function(t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Spinner = e()
  }(this, function() {
    "use strict";

    function t(t, e) {
      var n, i = document.createElement(t || "div");
      for (n in e) i[n] = e[n];
      return i
    }

    function e(t) {
      for (var e = 1, n = arguments.length; n > e; e++) t.appendChild(arguments[e]);
      return t
    }

    function n(t, e, n, i) {
      var o = ["opacity", e, ~~(100 * t), n, i].join("-"),
        a = .01 + 100 * (n / i),
        s = Math.max(1 - (1 - t) / e * (100 - a), t),
        r = l.substring(0, l.indexOf("Animation")).toLowerCase(),
        c = r && "-" + r + "-" || "";
      return d[o] || (p.insertRule("@" + c + "keyframes " + o + "{" + "0%{opacity:" + s + "}" + a + "%{opacity:" + t + "}" + (a + .01) + "%{opacity:1}" + (a + e) % 100 + "%{opacity:" + t + "}" + "100%{opacity:" + s + "}" + "}", p.cssRules.length), d[o] = 1), o
    }

    function i(t, e) {
      var n, i, o = t.style;
      if (void 0 !== o[e]) return e;
      for (e = e.charAt(0).toUpperCase() + e.slice(1), i = 0; u.length > i; i++)
        if (n = u[i] + e, void 0 !== o[n]) return n
    }

    function o(t, e) {
      for (var n in e) t.style[i(t, n) || n] = e[n];
      return t
    }

    function a(t) {
      for (var e = 1; arguments.length > e; e++) {
        var n = arguments[e];
        for (var i in n) void 0 === t[i] && (t[i] = n[i])
      }
      return t
    }

    function s(t) {
      for (var e = {
          x: t.offsetLeft,
          y: t.offsetTop
        }; t = t.offsetParent;) e.x += t.offsetLeft, e.y += t.offsetTop;
      return e
    }

    function r(t) {
      return this === void 0 ? new r(t) : (this.opts = a(t || {}, r.defaults, f), void 0)
    }

    function c() {
      function n(e, n) {
        return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n)
      }
      p.addRule(".spin-vml", "behavior:url(#default#VML)"), r.prototype.lines = function(t, i) {
        function a() {
          return o(n("group", {
            coordsize: l + " " + l,
            coordorigin: -c + " " + -c
          }), {
            width: l,
            height: l
          })
        }

        function s(t, s, r) {
          e(d, e(o(a(), {
            rotation: 360 / i.lines * t + "deg",
            left: ~~s
          }), e(o(n("roundrect", {
            arcsize: i.corners
          }), {
            width: c,
            height: i.width,
            left: i.radius,
            top: -i.width >> 1,
            filter: r
          }), n("fill", {
            color: i.color,
            opacity: i.opacity
          }), n("stroke", {
            opacity: 0
          }))))
        }
        var r, c = i.length + i.width,
          l = 2 * c,
          u = 2 * -(i.width + i.length) + "px",
          d = o(a(), {
            position: "absolute",
            top: u,
            left: u
          });
        if (i.shadow)
          for (r = 1; i.lines >= r; r++) s(r, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
        for (r = 1; i.lines >= r; r++) s(r);
        return e(t, d)
      }, r.prototype.opacity = function(t, e, n, i) {
        var o = t.firstChild;
        i = i.shadow && i.lines || 0, o && o.childNodes.length > e + i && (o = o.childNodes[e + i], o = o && o.firstChild, o = o && o.firstChild, o && (o.opacity = n))
      }
    }
    var l, u = ["webkit", "Moz", "ms", "O"],
      d = {},
      p = function() {
        var n = t("style", {
          type: "text/css"
        });
        return e(document.getElementsByTagName("head")[0], n), n.sheet || n.styleSheet
      }(),
      f = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "auto",
        left: "auto",
        position: "relative"
      };
    r.defaults = {}, a(r.prototype, {
      spin: function(e) {
        this.stop();
        var n, i, a = this,
          r = a.opts,
          c = a.el = o(t(0, {
            className: r.className
          }), {
            position: r.position,
            width: 0,
            zIndex: r.zIndex
          }),
          u = r.radius + r.length + r.width;
        if (e && (e.insertBefore(c, e.firstChild || null), i = s(e), n = s(c), o(c, {
            left: ("auto" == r.left ? i.x - n.x + (e.offsetWidth >> 1) : parseInt(r.left, 10) + u) + "px",
            top: ("auto" == r.top ? i.y - n.y + (e.offsetHeight >> 1) : parseInt(r.top, 10) + u) + "px"
          })), c.setAttribute("role", "progressbar"), a.lines(c, a.opts), !l) {
          var d, p = 0,
            f = (r.lines - 1) * (1 - r.direction) / 2,
            h = r.fps,
            m = h / r.speed,
            v = (1 - r.opacity) / (m * r.trail / 100),
            g = m / r.lines;
          (function y() {
            p++;
            for (var t = 0; r.lines > t; t++) d = Math.max(1 - (p + (r.lines - t) * g) % m * v, r.opacity), a.opacity(c, t * r.direction + f, d, r);
            a.timeout = a.el && setTimeout(y, ~~(1e3 / h))
          })()
        }
        return a
      },
      stop: function() {
        var t = this.el;
        return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0), this
      },
      lines: function(i, a) {
        function s(e, n) {
          return o(t(), {
            position: "absolute",
            width: a.length + a.width + "px",
            height: a.width + "px",
            background: e,
            boxShadow: n,
            transformOrigin: "left",
            transform: "rotate(" + ~~(360 / a.lines * c + a.rotate) + "deg) translate(" + a.radius + "px" + ",0)",
            borderRadius: (a.corners * a.width >> 1) + "px"
          })
        }
        for (var r, c = 0, u = (a.lines - 1) * (1 - a.direction) / 2; a.lines > c; c++) r = o(t(), {
          position: "absolute",
          top: 1 + ~(a.width / 2) + "px",
          transform: a.hwaccel ? "translate3d(0,0,0)" : "",
          opacity: a.opacity,
          animation: l && n(a.opacity, a.trail, u + c * a.direction, a.lines) + " " + 1 / a.speed + "s linear infinite"
        }), a.shadow && e(r, o(s("#000", "0 0 4px #000"), {
          top: "2px"
        })), e(i, e(r, s(a.color, "0 0 1px rgba(0,0,0,.1)")));
        return i
      },
      opacity: function(t, e, n) {
        t.childNodes.length > e && (t.childNodes[e].style.opacity = n)
      }
    });
    var h = o(t("group"), {
      behavior: "url(#default#VML)"
    });
    return !i(h, "transform") && h.adj ? c() : l = i(h, "animation"), r
  }), + function(t) {
    "use strict";
    var e = function(t, e) {
      this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    e.DEFAULTS = {
      animation: !0,
      placement: "top",
      selector: !1,
      template: '<div class="tooltip"><div class="tooltip__arrow"></div><div class="tooltip__inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      container: !1
    }, e.prototype.init = function(e, n, i) {
      this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i);
      for (var o = this.options.trigger.split(" "), a = o.length; a--;) {
        var s = o[a];
        if ("click" == s) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
        else if ("manual" != s) {
          var r = "hover" == s ? "mouseenter" : "focus",
            c = "hover" == s ? "mouseleave" : "blur";
          this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(c + "." + this.type, this.options.selector, t.proxy(this.leave, this))
        }
      }
      this.options.selector ? this._options = t.extend({}, this.options, {
        trigger: "manual",
        selector: ""
      }) : this.fixTitle()
    }, e.prototype.getDefaults = function() {
      return e.DEFAULTS
    }, e.prototype.getOptions = function(e) {
      return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
        show: e.delay,
        hide: e.delay
      }), e
    }, e.prototype.getDelegateOptions = function() {
      var e = {},
        n = this.getDefaults();
      return this._options && t.each(this._options, function(t, i) {
        n[t] != i && (e[t] = i)
      }), e
    }, e.prototype.enter = function(e) {
      var n = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
      return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? (n.timeout = setTimeout(function() {
        "in" == n.hoverState && n.show()
      }, n.options.delay.show), void 0) : n.show()
    }, e.prototype.leave = function(e) {
      var n = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
      return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? (n.timeout = setTimeout(function() {
        "out" == n.hoverState && n.hide()
      }, n.options.delay.hide), void 0) : n.hide()
    }, e.prototype.show = function() {
      var e = t.Event("show.bs." + this.type);
      if (this.hasContent() && this.enabled) {
        if (this.$element.trigger(e), e.isDefaultPrevented()) return;
        var n = this.tip();
        this.setContent(), this.options.animation && n.addClass("fade");
        var i = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
          o = /\s?auto?\s?/i,
          a = o.test(i);
        a && (i = i.replace(o, "") || "top"), n.detach().css({
          top: 0,
          left: 0,
          display: "block"
        }).addClass(i), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
        var s = this.getPosition(),
          r = n[0].offsetWidth,
          c = n[0].offsetHeight;
        if (a) {
          var l = this.$element.parent(),
            u = i,
            d = document.documentElement.scrollTop || document.body.scrollTop,
            p = "body" == this.options.container ? window.innerWidth : l.outerWidth(),
            f = "body" == this.options.container ? window.innerHeight : l.outerHeight(),
            h = "body" == this.options.container ? 0 : l.offset().left;
          i = "bottom" == i && s.top + s.height + c - d > f ? "top" : "top" == i && 0 > s.top - d - c ? "bottom" : "right" == i && s.right + r > p ? "left" : "left" == i && h > s.left - r ? "right" : i, n.removeClass(u).addClass(i)
        }
        var m = this.getCalculatedOffset(i, s, r, c);
        this.applyPlacement(m, i), this.$element.trigger("shown.bs." + this.type)
      }
    }, e.prototype.applyPlacement = function(t, e) {
      var n, i = this.tip(),
        o = i[0].offsetWidth,
        a = i[0].offsetHeight,
        s = parseInt(i.css("margin-top"), 10),
        r = parseInt(i.css("margin-left"), 10);
      isNaN(s) && (s = 0), isNaN(r) && (r = 0), t.top = t.top + s, t.left = t.left + r, i.offset(t).addClass("in");
      var c = i[0].offsetWidth,
        l = i[0].offsetHeight;
      if ("top" == e && l != a && (n = !0, t.top = t.top + a - l), /bottom|top/.test(e)) {
        var u = 0;
        0 > t.left && (u = -2 * t.left, t.left = 0, i.offset(t), c = i[0].offsetWidth, l = i[0].offsetHeight), this.replaceArrow(u - o + c, c, "left")
      } else this.replaceArrow(l - a, l, "top");
      n && i.offset(t)
    }, e.prototype.replaceArrow = function(t, e, n) {
      this.arrow().css(n, t ? 50 * (1 - t / e) + "%" : "")
    }, e.prototype.setContent = function() {
      var t = this.tip(),
        e = this.getTitle();
      t.find(".tooltip__inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function() {
      function e() {
        "in" != n.hoverState && i.detach()
      }
      var n = this,
        i = this.tip(),
        o = t.Event("hide.bs." + this.type);
      return this.$element.trigger(o), o.isDefaultPrevented() ? void 0 : (i.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? i.one(t.support.transition.end, e).emulateTransitionEnd(150) : e(), this.$element.trigger("hidden.bs." + this.type), this)
    }, e.prototype.fixTitle = function() {
      var t = this.$element;
      (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function() {
      return this.getTitle()
    }, e.prototype.getPosition = function() {
      var e = this.$element[0];
      return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
        width: e.offsetWidth,
        height: e.offsetHeight
      }, this.$element.offset())
    }, e.prototype.getCalculatedOffset = function(t, e, n, i) {
      return "bottom" == t ? {
        top: e.top + e.height,
        left: e.left + e.width / 2 - n / 2
      } : "top" == t ? {
        top: e.top - i,
        left: e.left + e.width / 2 - n / 2
      } : "left" == t ? {
        top: e.top + e.height / 2 - i / 2,
        left: e.left - n
      } : {
        top: e.top + e.height / 2 - i / 2,
        left: e.left + e.width
      }
    }, e.prototype.getTitle = function() {
      var t, e = this.$element,
        n = this.options;
      return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
    }, e.prototype.tip = function() {
      return this.$tip = this.$tip || t(this.options.template)
    }, e.prototype.arrow = function() {
      return this.$arrow = this.$arrow || this.tip().find(".tooltip__arrow")
    }, e.prototype.validate = function() {
      this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, e.prototype.enable = function() {
      this.enabled = !0
    }, e.prototype.disable = function() {
      this.enabled = !1
    }, e.prototype.toggleEnabled = function() {
      this.enabled = !this.enabled
    }, e.prototype.toggle = function(e) {
      var n = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
      n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, e.prototype.destroy = function() {
      this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = function(n) {
      return this.each(function() {
        var i = t(this),
          o = i.data("bs.tooltip"),
          a = "object" == typeof n && n;
        o || i.data("bs.tooltip", o = new e(this, a)), "string" == typeof n && o[n]()
      })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
      return t.fn.tooltip = n, this
    }
  }(jQuery);
var zanata = zanata || {};
zanata.createNS = function(t) {
    var e = t.split("."),
      n = zanata;
    "zanata" === e[0] && (e = e.slice(1));
    for (var i = 0; e.length > i; i++) {
      var o = e[i];
      n[o] === void 0 && (n[o] = {}), n = n[o]
    }
    return n
  }, jQuery(function() {
    zanata.tooltip.init("[title]"), FastClick.attach(document.body)
  }), jQuery(function() {
    "use strict";
    var t, e;
    t = function() {
      jQuery(".js-dropdown.is-active .js-dropdown__toggle").click()
    }, e = function(t) {
      t.preventDefault(), jQuery(this).blur();
      var e = jQuery(this).parents(".js-dropdown");
      jQuery(".js-dropdown.is-active").not(e).removeClass("is-active").parents(".js-dropdown__container").removeClass("is-active"), e.toggleClass("is-active").parents(".js-dropdown__container").toggleClass("is-active"), t.stopPropagation()
    }, jQuery(".js-dropdown__toggle a").bind("click", function(t) {
      t.stopPropagation()
    }), jQuery(document).bind("click", t), jQuery(document).on("click", ".js-dropdown__toggle", e)
  }), jQuery(function() {
    "use strict";
    jQuery(document).on("click", ".js-example__setter", function() {
      var t = jQuery(this).attr("data-example");
      jQuery(this).parents(".js-example").find(".js-example__target").attr("class", "js-example__target").addClass(t)
    })
  }), zanata.createNS("zanata.form"), zanata.form = function(t) {
    function e(t) {
      var e = t.find(".js-form__checkbox__input,.js-form__radio__input");
      e.is(":checked") ? "checkbox" === e.attr("type") && e.prop("checked", !1).change() : e.prop("checked", !0).change()
    }

    function n(t) {
      var e = t.find(".js-form__checkbox__input,.js-form__radio__input"),
        n = t.find(".js-form__checkbox__item, .js-form__radio__item");
      setTimeout(function() {
        e.is(":checked") ? (t.addClass("is-checked"), n.addClass("is-checked")) : (t.removeClass("is-checked"), n.removeClass("is-checked"))
      }, 0)
    }

    function i(t) {
      var e = t.find(".js-form__radio__input"),
        n = t.find(".js-form__checkbox__item, .js-form__radio__item"),
        i = jQuery("[name=" + e.attr("name") + "]").parents(".js-form__radio"),
        o = i.find(".js-form__radio__item");
      setTimeout(function() {
        i.removeClass("is-checked"), o.removeClass("is-checked"), e.is(":checked") && (t.addClass("is-checked"), n.addClass("is-checked"))
      }, 0)
    }

    function o(e) {
      var n = t(e.target);
      a = n.parents(".js-form--search").length > 0 || n.hasClass("js-form--search"), a || s || t(".js-form--search__input").blur()
    }
    var a = !1,
      s = !1,
      r = function(e, i) {
        var o;
        e = e || "body", o = t(e).find(".js-form__checkbox"), t.each(o, function() {
          var e = t(this);
          e.find(".form__checkbox__item").length || (e.append('<span class="form__checkbox__item js-form__checkbox__item"/>'), n(e))
        }), "function" == typeof i && i()
      },
      c = function(e, i) {
        var o;
        e = e || "body", o = t(e).find(".js-form__radio"), t.each(o, function() {
          var e = t(this);
          e.find(".form__radio__item").length || (e.append('<span class="form__radio__item js-form__radio__item"/>'), n(e))
        }), "function" == typeof i && i()
      },
      p = function() {
        t(".js-form__input--clear").addClass("form__input--clear").parent().addClass("form__clear js-form__clear").append('<button class="button--link form__button--clear js-form__button--clear is-hidden"><i class="i i--remove"></i></button>'), f()
      },
      f = function() {
        t(".js-form__button--clear").on("click", function(e) {
          e.preventDefault(), t(this).prev(".js-form__input--clear").val("").focus(), t(this).addClass("is-hidden")
        }), t(".js-form__input--clear").on("keyup", function() {
          var e = t(this),
            n = e.val(),
            i = e.next(".js-form__button--clear");
          "" !== n ? i.removeClass("is-hidden") : i.addClass("is-hidden")
        })
      },
      h = function(o) {
        o = o || "body", t(o).on("click", ".js-form__radio", function(n) {
          e(t(this)), n.preventDefault()
        }), t(o).on("change", ".js-form__radio__input", function() {
          var e = t(this).parents(".js-form__radio");
          i(e), n(e)
        })
      },
      m = function(i) {
        i = i || "body", t(i).on("click", ".js-form__checkbox", function(n) {
          n.preventDefault(), e(t(this))
        }), t(i).on("change", ".js-form__checkbox__input", function() {
          var e = t(this).parents(".js-form__checkbox");
          n(e)
        })
      },
      v = function(e) {
        e = e || "body", r(e, m(e)), c(e, h(e)), p(e), t(".js-form-password-parent").on("click", ".js-form-password-toggle", function(e) {
          var n = t(this).parents(".js-form-password-parent").find(".js-form-password-input");
          e.preventDefault(), "password" === n.attr("type") ? (n.attr({
            type: "text",
            autocapitalize: "off",
            autocomplete: "off",
            autocorrect: "off",
            spellcheck: "false"
          }), t(this).text("Hide")) : (n.attr("type", "password"), t(this).text("Show")), n.focus()
        }), t(".js-form--search__input, .js-form--search__button").on("click", function(t) {
          t.stopPropagation()
        }), t(".js-form--search__input, .js-form--search__button").on("focus", function() {
          t(this).parents(".js-form--search").addClass("is-active")
        }), t(".js-form--search__input, .js-form--search__button").on("blur", function() {
          a || t(this).parents(".js-form--search").removeClass("is-active")
        }), t(".js-form--search").on("mousedown", function(e) {
          s = t(e.target).hasClass("js-form--search__input"), o(e)
        }), t(document).on("mouseup", function(t) {
          o(t), s = !1
        }), t(".js-form__input--copyable").on("mouseup", function() {
          var e = t(this),
            n = e[0];
          n.selectionStart === n.selectionEnd && e.select()
        })
      };
    return {
      init: v,
      appendCheckboxes: r,
      appendRadios: c,
      checkboxBindings: m,
      radioBindings: h
    }
  }(jQuery), jQuery(function() {
    zanata.form.init()
  }), zanata.createNS("zanata.loader"), zanata.loader = function(t) {
    var e = function(e) {
        var n = t(e),
          i = n.find(".loader__label");
        i.length > 0 ? i.append('<span class="loader__spinner"><span></span><span></span><span></span></span>') : n.append('<span class="loader__spinner"><span></span><span></span><span></span></span>'), n.addClass("is-active")
      },
      n = function(e) {
        var n = t(e);
        n.find(".loader__spinner").remove(), n.removeClass("is-active")
      },
      i = function() {
        t(document).on("click", ".js-loader, .loader", function(n) {
          n.preventDefault(), t(this).hasClass("is-active") || e(this)
        })
      };
    return {
      init: i,
      activate: e,
      deactivate: n
    }
  }(jQuery), jQuery(function() {
    zanata.loader.init()
  }), zanata.createNS("zanata.messages"), zanata.messages = function(t) {
    var e = function(e, n) {
        var i = t(e);
        n && n.preventDefault(), i.hasClass("is-active") ? (i.removeClass("is-active"), setTimeout(function() {
          i.remove()
        }, 300)) : (i.addClass("is-removed"), setTimeout(function() {
          i.remove()
        }, 300))
      },
      n = function(e) {
        t(e).addClass("is-active"), o(e)
      },
      i = function(e) {
        t(e).removeClass("is-active")
      },
      o = function(e, n) {
        var i = t(e),
          o = "";
        if (n !== void 0) o = n;
        else {
          if (!(i.length > 0)) return;
          o = i.offset().top
        }
        0 > o && (o = 0), t(window).scrollTop() > o ? i.addClass("is-fixed") : i.removeClass("is-fixed")
      },
      a = function() {
        if (t(".message--global").length > 0) var n = t(".message--global").offset().top;
        t(document).on("click", ".js-message-remove", function(n) {
          var i = t(this).parents(".message--removable");
          e(i, n)
        }), t(window).scroll(function() {
          o(".message--global", n)
        })
      };
    return {
      init: a,
      hide: e,
      activate: n,
      deactivate: i,
      updatePosition: o
    }
  }(jQuery), jQuery(function() {
    zanata.messages.init()
  }), zanata.createNS("zanata.modal"), zanata.modal = function(t) {
    var e = function(e) {
        var n = t(e);
        n.parent().is("body") ? t(e).addClass("is-active") : (n.before('<div id="' + n.attr("id") + '-placeholder"/>'), n.appendTo("body"), setTimeout(function() {
          n.addClass("is-active is-moved")
        }, 0)), t("body").addClass("is-modal")
      },
      n = function(e) {
        var n = t(e);
        if (n.removeClass("is-active"), n.hasClass("is-moved")) {
          var i = "#" + n.attr("id") + "-placeholder";
          setTimeout(function() {
            n.appendTo(i).unwrap().removeClass("is-moved")
          }, 300)
        }
        t("body").removeClass("is-modal")
      },
      i = function() {
        t(document).on("click", '[data-toggle="modal"]', function() {
          var e = t(this).attr("data-target");
          t(e).trigger("show.zanata.modal")
        }), t(document).on("click", ".is-modal", function(e) {
          t(e.target).not(".modal__dialog") && !t(e.target).parents(".modal__dialog").length && t(".modal.is-active").trigger("hide.zanata.modal")
        }), t(document).on("keyup", function(e) {
          27 === e.keyCode && (e.stopPropagation(), t(".modal.is-active").trigger("hide.zanata.modal"))
        }), t(document).on("click", '[data-dismiss="modal"]', function() {
          t(this).parents(".modal.is-active").trigger("hide.zanata.modal")
        }), t(document).on("hide.zanata.modal", function(t) {
          n(t.target)
        }), t(document).on("show.zanata.modal", function(t) {
          e(t.target)
        })
      };
    return {
      init: i,
      show: e,
      hide: n
    }
  }(jQuery), jQuery(function() {
    zanata.modal.init()
  }),
  function(t) {
    "use strict";
    t(document).on("click", ".js-reveal__show", function() {
      var e = t(t(this).attr("data-target")),
        n = e.find(".js-reveal__target__input"),
        i = t(this).parents(".js-reveal");
      t(this).addClass("is-hidden"), i.addClass("is-active"), e.toggleClass("is-active"), setTimeout(function() {
        n.focus()
      }, 100)
    }), t(document).on("click", ".js-reveal__toggle", function(e) {
      var n = t(t(this).attr("data-target")),
        i = n.find(".js-reveal__target__input"),
        o = t(this).parents(".js-reveal"),
        a = t(this).find(".js-reveal__toggle__text"),
        s = a.text(),
        r = a.attr("data-toggle-value"),
        c = t(this).attr("title") || t(this).attr("data-original-title"),
        l = t(this).attr("data-toggle-title");
      t(e.target).is("label") || e.preventDefault(), t(this).toggleClass("is-active"), o.toggleClass("is-active"), n.toggleClass("is-active is-hidden"), l && c && (t(this).attr("data-toggle-title", c), zanata.tooltip.refresh(t(this), l)), s && r && (a.text(r), a.attr("data-toggle-value", s)), setTimeout(function() {
        i.focus()
      }, 100)
    }), t(document).on("click", ".js-reveal__reset", function() {
      var e = t(t(this).attr("data-target")),
        n = e.find(".js-reveal__target__input");
      n.val("").focus(), t(this).addClass("is-hidden")
    }), t(document).on("click", ".js-reveal__cancel", function() {
      var e = t(t(this).attr("data-target")),
        n = e.find(".js-reveal__target__input"),
        i = t(this).parents(".js-reveal");
      e.removeClass("is-active"), n.blur(), n.val(""), i.find(".js-reveal__reset").addClass("is-hidden"), i.find(".js-reveal__show").removeClass("is-hidden").focus()
    }), t(document).on("keyup", ".js-reveal__target__input", function(e) {
      var n = t(this).parents(".js-reveal"),
        i = n.find(".js-reveal__reset"),
        o = n.find(".js-reveal__cancel");
      "" !== t(this).val() ? i.removeClass("is-hidden") : i.addClass("is-hidden"), 27 === e.keyCode && o.click()
    })
  }(jQuery), jQuery(function() {
    "use strict";
    var t = window.location.pathname;
    jQuery("#nav-user a, #nav-main a, #nav-main-side a, #nav-footer a").each(function() {
      var e = jQuery(this).attr("href").replace(/\//g, "").replace(/\./g, "");
      t.toLowerCase().indexOf(e) >= 0 && jQuery(this).addClass("is-active")
    })
  }), zanata.createNS("zanata.tabs"), zanata.tabs = function(t) {
    var e = function(e) {
        var n = t(e),
          i = n.attr("href"),
          o = (i.replace("#", ""), n.closest(".js-tabs"));
        n.is("[data-content]") && (i = n.attr("data-content")), n.parent().hasClass("is-active") || (console.log(n), o.find("> .js-tabs-content > li, > .js-tabs-nav > li > a").removeClass("is-active"), n.blur().addClass("is-active"), t(i).addClass("is-active"))
      },
      n = function() {
        t(".js-tabs").on("click", ".js-tabs-nav > li > a", function(t) {
          t.preventDefault(), e(this)
        })
      };
    return {
      init: n,
      activate: e
    }
  }(jQuery), jQuery(function() {
    zanata.tabs.init()
  }), zanata.createNS("zanata.tooltip"), zanata.tooltip = function(t) {
    var e = function(e) {
        t(e).tooltip({
          placement: "auto bottom",
          container: "body",
          delay: {
            show: "500",
            hide: "100"
          }
        })
      },
      n = function(e, n) {
        t(e).tooltip("hide").attr("data-original-title", n).tooltip("fixTitle").tooltip("show")
      };
    return {
      init: e,
      refresh: n
    }
  }(jQuery);
