parcelRequire = function (e, r, t, n) { var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require; function f(t, n) { if (!r[t]) { if (!e[t]) { var i = "function" == typeof parcelRequire && parcelRequire; if (!n && i) return i(t, !0); if (o) return o(t, !0); if (u && "string" == typeof t) return u(t); var c = new Error("Cannot find module '" + t + "'"); throw c.code = "MODULE_NOT_FOUND", c } p.resolve = function (r) { return e[t][1][r] || r }, p.cache = {}; var l = r[t] = new f.Module(t); e[t][0].call(l.exports, p, l, l.exports, this) } return r[t].exports; function p(e) { return f(p.resolve(e)) } } f.isParcelRequire = !0, f.Module = function (e) { this.id = e, this.bundle = f, this.exports = {} }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) { e[r] = [function (e, r) { r.exports = t }, {}] }; for (var c = 0; c < t.length; c++)try { f(t[c]) } catch (e) { i || (i = e) } if (t.length) { var l = f(t[t.length - 1]); "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () { return l }) : n && (this[n] = l) } if (parcelRequire = f, i) throw i; return f }({
    "CvJj": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.__extends = e, exports.__rest = n, exports.__decorate = o, exports.__param = a, exports.__metadata = i, exports.__awaiter = u, exports.__generator = c, exports.__createBinding = f, exports.__exportStar = l, exports.__values = s, exports.__read = p, exports.__spread = y, exports.__spreadArrays = _, exports.__await = h, exports.__asyncGenerator = v, exports.__asyncDelegator = d, exports.__asyncValues = b, exports.__makeTemplateObject = w, exports.__importStar = x, exports.__importDefault = m, exports.__classPrivateFieldGet = O, exports.__classPrivateFieldSet = g, exports.__assign = void 0; var t = function (e, r) { return (t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, e) { t.__proto__ = e } || function (t, e) { for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]) })(e, r) }; function e(e, r) { function n() { this.constructor = e } t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n) } var r = function () { return exports.__assign = r = Object.assign || function (t) { for (var e, r = 1, n = arguments.length; r < n; r++)for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]); return t }, r.apply(this, arguments) }; function n(t, e) { var r = {}; for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]); if (null != t && "function" == typeof Object.getOwnPropertySymbols) { var o = 0; for (n = Object.getOwnPropertySymbols(t); o < n.length; o++)e.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[o]) && (r[n[o]] = t[n[o]]) } return r } function o(t, e, r, n) { var o, a = arguments.length, i = a < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n; if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, r, n); else for (var u = t.length - 1; u >= 0; u--)(o = t[u]) && (i = (a < 3 ? o(i) : a > 3 ? o(e, r, i) : o(e, r)) || i); return a > 3 && i && Object.defineProperty(e, r, i), i } function a(t, e) { return function (r, n) { e(r, n, t) } } function i(t, e) { if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e) } function u(t, e, r, n) { return new (r || (r = Promise))(function (o, a) { function i(t) { try { c(n.next(t)) } catch (e) { a(e) } } function u(t) { try { c(n.throw(t)) } catch (e) { a(e) } } function c(t) { var e; t.done ? o(t.value) : (e = t.value, e instanceof r ? e : new r(function (t) { t(e) })).then(i, u) } c((n = n.apply(t, e || [])).next()) }) } function c(t, e) { var r, n, o, a, i = { label: 0, sent: function () { if (1 & o[0]) throw o[1]; return o[1] }, trys: [], ops: [] }; return a = { next: u(0), throw: u(1), return: u(2) }, "function" == typeof Symbol && (a[Symbol.iterator] = function () { return this }), a; function u(a) { return function (u) { return function (a) { if (r) throw new TypeError("Generator is already executing."); for (; i;)try { if (r = 1, n && (o = 2 & a[0] ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, a[1])).done) return o; switch (n = 0, o && (a = [2 & a[0], o.value]), a[0]) { case 0: case 1: o = a; break; case 4: return i.label++, { value: a[1], done: !1 }; case 5: i.label++, n = a[1], a = [0]; continue; case 7: a = i.ops.pop(), i.trys.pop(); continue; default: if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === a[0] || 2 === a[0])) { i = 0; continue } if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) { i.label = a[1]; break } if (6 === a[0] && i.label < o[1]) { i.label = o[1], o = a; break } if (o && i.label < o[2]) { i.label = o[2], i.ops.push(a); break } o[2] && i.ops.pop(), i.trys.pop(); continue }a = e.call(t, i) } catch (u) { a = [6, u], n = 0 } finally { r = o = 0 } if (5 & a[0]) throw a[1]; return { value: a[0] ? a[1] : void 0, done: !0 } }([a, u]) } } } function f(t, e, r, n) { void 0 === n && (n = r), t[n] = e[r] } function l(t, e) { for (var r in t) "default" === r || e.hasOwnProperty(r) || (e[r] = t[r]) } function s(t) { var e = "function" == typeof Symbol && Symbol.iterator, r = e && t[e], n = 0; if (r) return r.call(t); if (t && "number" == typeof t.length) return { next: function () { return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t } } }; throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.") } function p(t, e) { var r = "function" == typeof Symbol && t[Symbol.iterator]; if (!r) return t; var n, o, a = r.call(t), i = []; try { for (; (void 0 === e || e-- > 0) && !(n = a.next()).done;)i.push(n.value) } catch (u) { o = { error: u } } finally { try { n && !n.done && (r = a.return) && r.call(a) } finally { if (o) throw o.error } } return i } function y() { for (var t = [], e = 0; e < arguments.length; e++)t = t.concat(p(arguments[e])); return t } function _() { for (var t = 0, e = 0, r = arguments.length; e < r; e++)t += arguments[e].length; var n = Array(t), o = 0; for (e = 0; e < r; e++)for (var a = arguments[e], i = 0, u = a.length; i < u; i++, o++)n[o] = a[i]; return n } function h(t) { return this instanceof h ? (this.v = t, this) : new h(t) } function v(t, e, r) { if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined."); var n, o = r.apply(t, e || []), a = []; return n = {}, i("next"), i("throw"), i("return"), n[Symbol.asyncIterator] = function () { return this }, n; function i(t) { o[t] && (n[t] = function (e) { return new Promise(function (r, n) { a.push([t, e, r, n]) > 1 || u(t, e) }) }) } function u(t, e) { try { (r = o[t](e)).value instanceof h ? Promise.resolve(r.value.v).then(c, f) : l(a[0][2], r) } catch (n) { l(a[0][3], n) } var r } function c(t) { u("next", t) } function f(t) { u("throw", t) } function l(t, e) { t(e), a.shift(), a.length && u(a[0][0], a[0][1]) } } function d(t) { var e, r; return e = {}, n("next"), n("throw", function (t) { throw t }), n("return"), e[Symbol.iterator] = function () { return this }, e; function n(n, o) { e[n] = t[n] ? function (e) { return (r = !r) ? { value: h(t[n](e)), done: "return" === n } : o ? o(e) : e } : o } } function b(t) { if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined."); var e, r = t[Symbol.asyncIterator]; return r ? r.call(t) : (t = "function" == typeof s ? s(t) : t[Symbol.iterator](), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function () { return this }, e); function n(r) { e[r] = t[r] && function (e) { return new Promise(function (n, o) { (function (t, e, r, n) { Promise.resolve(n).then(function (e) { t({ value: e, done: r }) }, e) })(n, o, (e = t[r](e)).done, e.value) }) } } } function w(t, e) { return Object.defineProperty ? Object.defineProperty(t, "raw", { value: e }) : t.raw = e, t } function x(t) { if (t && t.__esModule) return t; var e = {}; if (null != t) for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]); return e.default = t, e } function m(t) { return t && t.__esModule ? t : { default: t } } function O(t, e) { if (!e.has(t)) throw new TypeError("attempted to get private field on non-instance"); return e.get(t) } function g(t, e, r) { if (!e.has(t)) throw new TypeError("attempted to set private field on non-instance"); return e.set(t, r), r } exports.__assign = r;
    }, {}], "gbyz": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.call = exports.init = void 0; const a = {}; let e = !1; function t(t, o) { e || (e = !0, window.addEventListener("message", e => { if (o && e.origin !== o) return; if ("relay" !== e.data.relay) return; if ("reply" === e.data.call) { const t = e.data.params.id; if (a.hasOwnProperty(t)) { const r = a[t]; return delete a[t], void r(e.data.params.payload) } } const n = e.source; if (!n) return; const s = a => { r(n, "reply", { id: e.data.params.id, payload: a }) }; if (e.data.call) { const a = new URL(e.origin).host; t({ host: a, raw: e.origin }, e.data.call, e.data.params.payload, n).then(a => s(a)).catch(a => { s({ error: a.message || "Unknown error" }) }) } })) } function r(a, e, t) { a && a.postMessage({ relay: "relay", call: e, params: t }, "*") } exports.init = t; let o = 0; function n(e, t, n) { return new Promise(s => { const i = ++o; a[i] = s, r(e, t, n ? { id: i, payload: n } : { id: i }) }) } exports.call = n;
    }, {}], "PpGY": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), window._RELAY_ONE_STATE = window._RELAY_ONE_STATE || { buttonFrames: new WeakMap, buttonCallbacks: new WeakMap, modal: void 0, authFrame: void 0, subscribed: !1, iframeQueue: [], frameLoaded: !1 }; const e = window._RELAY_ONE_STATE; exports.default = e;
    }, {}], "Inrg": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.callAuthFrameWithUI = exports.callAuthFrame = exports.makeAuthIframe = exports.setCallbacksForButtonFrame = exports.getCallbacksForButtonFrame = exports.getButtonFrameForElement = void 0; const e = require("tslib"), t = e.__importDefault(require("./state")), a = e.__importStar(require("@relayx/frame-messaging/lib/frameMessaging")), r = () => { }, n = t.default.buttonFrames, o = t.default.buttonCallbacks; function l(e, t) { return new Promise(a => { const r = document.createElement("iframe"); r.onload = a, r.src = t, r.style.border = "none", r.style.width = "150px", r.style.height = "38px", r.style.overflow = "hidden", r.scrolling = "no", n.set(e, r), e.appendChild(r) }) } async function s(e, t) { return n.has(e) || await l(e, t), n.get(e) } function u(e) { return o.has(e) ? o.get(e) : { onError: r, onPayment: r, onLoad: r } } function i(e, t) { o.set(e, t) } function d() { const e = t.default.authFrame, a = e.parentElement; a.style.position = "fixed", a.style.right = "0", a.style.left = "0", a.style.bottom = "0", a.style.top = "0", a.style.zIndex = "9999", a.style.display = "flex", a.style.alignItems = "center", a.style.justifyContent = "center", a.style.backgroundColor = "rgb(0, 0, 0, 0.2)", e.style.width = "340px", e.style.height = "340px" } function m() { const e = t.default.authFrame, a = e.parentElement; e.style.border = "none", a.style.border = "none", a.style.overflow = "hidden", e.scrolling = "no", a.style.position = "static", a.style.display = "none" } function c(e) { return new Promise((a, r) => { if (t.default.authFrame) return void (t.default.frameLoaded ? a() : t.default.iframeQueue.push(a)); const n = document.createElement("div"); t.default.authFrame = document.createElement("iframe"), t.default.authFrame.src = e, n.appendChild(t.default.authFrame), m(), t.default.authFrame.onload = (() => { for (t.default.frameLoaded = !0, a(); t.default.iframeQueue.length;) { t.default.iframeQueue.pop()() } }), document.body.appendChild(n) }) } async function f(e, r, n) { return await c(n), a.call(t.default.authFrame.contentWindow, e, r) } async function p(e, r, n) { await c(n), d(); const o = await a.call(t.default.authFrame.contentWindow, e, r); return m(), o } exports.getButtonFrameForElement = s, exports.getCallbacksForButtonFrame = u, exports.setCallbacksForButtonFrame = i, exports.makeAuthIframe = c, exports.callAuthFrame = f, exports.callAuthFrameWithUI = p;
    }, { "tslib": "CvJj", "./state": "PpGY", "@relayx/frame-messaging/lib/frameMessaging": "gbyz" }], "ZnmC": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.hideModal = exports.showModal = void 0; const e = require("tslib"), t = e.__importDefault(require("./state")); async function l(e) { let l = !1; return t.default.modal || (l = !0, t.default.modal = document.createElement("div")), t.default.modal.style.display = "flex", t.default.modal.style.justifyContent = "center", t.default.modal.style.alignItems = "center", t.default.modal.style.position = "fixed", t.default.modal.style.top = "0", t.default.modal.style.left = "0", t.default.modal.style.right = "0", t.default.modal.style.bottom = "0", t.default.modal.style.backgroundColor = "rgb(0, 0, 0, 0.2)", t.default.modal.style.zIndex = "99999", t.default.modal.innerHTML = "<div>" + e.replace("{HOST_PAGE_URL}", t.default.authRedirect || window.location.href) + "</div>", l && document.body.appendChild(t.default.modal), new Promise((e, l) => { document.querySelectorAll(".relay-one-close").forEach(e => { e.addEventListener("click", () => { d(), l(new Error("Not authorized")) }) }), document.querySelectorAll(".relay-one-download-app").forEach(e => { e.addEventListener("click", () => { window.open("http://go.appurl.cc/79813781441", "_blank", "noopener") }) }), t.default.modal && t.default.modal.addEventListener("click", e => { e.target === e.currentTarget && (d(), l(new Error("Not authorized"))) }) }) } function d() { t.default.modal && document.body.removeChild(t.default.modal), t.default.modal = void 0 } exports.showModal = l, exports.hideModal = d;
    }, { "tslib": "CvJj", "./state": "PpGY" }], "I7Dt": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.call = exports.on = exports.init = void 0; const e = {}, t = {}; let o = !1; function r() { o || (o = !0, window.onRelayApp = (e => { const o = e; if ("relay" === o.relay && "reply" === o.call) { const e = o.params.id; if (t.hasOwnProperty(e)) { const r = t[e]; return delete t[e], void r(o.params.payload) } } })) } function n(t, o) { e[t] = e[t] || [], e[t].push(o) } function s(e, t, o) { e && e.postMessage(JSON.stringify({ relay: "relay", call: t, params: o })) } exports.init = r, exports.on = n; let a = 0; function i(e, o, r) { return new Promise(n => { const i = ++a; t[i] = n, s(e, o, r ? { id: i, payload: r } : { id: i }) }) } exports.call = i;
    }, {}], "Y62v": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.initWebView = void 0; const r = require("tslib"), e = r.__importStar(require("./appMessaging")); function n(n) { async function t(r, t) { return await e.call(n, r, t) } e.init(), e.on("error", async (r, e) => { console.warn("relay one error", e), r() }); const o = new WeakMap; function a(r) { return o.has(r) ? o.get(r) : o.has(r.parentElement) ? o.get(r.parentElement) : null } async function s(e) { const n = a(e.currentTarget), { onError: t, onPayment: o } = n, s = r.__rest(n, ["onError", "onPayment"]); try { const r = await window.relayone.send(Object.assign(Object.assign({}, s), { prompt: !0 })); o && o(r) } catch (e) { t && t(e.message) } } const i = { render: async (e, n) => { const { onLoad: t } = n, i = r.__rest(n, ["onLoad"]); let c = e; a(e) && function (r, e) { o.has(r) ? o.set(r, e) : o.has(r.parentElement) && o.set(r.parentElement, e) }(e, i), "relay-2020" !== e.className && ((c = document.createElement("a")).innerText = "Pay", c.className = "relay-2020", c.style.cursor = "pointer", e.appendChild(c)), c.addEventListener("click", s), o.set(c, i), t(!0) }, send: async e => { const { onError: n, onPayment: o, onLoad: a } = e, s = r.__rest(e, ["onError", "onPayment", "onLoad"]), i = await t("send", s); if (i.error) throw new Error(i.error); return i }, quote: async e => { const { onError: n, onPayment: o, onLoad: a } = e, s = r.__rest(e, ["onError", "onPayment", "onLoad"]), i = await t("quote", s); if (i.error) throw new Error(i.error); return i }, requestIdentity: async () => { throw console.warn("[Relay One]: requestIdentity is deprecated"), new Error("requestIdentity is not available in webview") }, authBeta: async (r = !1) => t("request-auth2", { withAllowance: r }), isLinked: async () => !0, isApp: () => !0, sign: async r => { const e = await t("sign", { message: r }); if (e.error) throw new Error(e.error); return e }, encrypt: async (r, e, n) => { const o = await t("encrypt", { message: r, paymail: e, encoding: n }); if (o.error) throw new Error(o.error); return o }, decrypt: async r => { const e = await t("decrypt", { message: r }); if (e.error) throw new Error(e.error); return e }, getBalance: async () => { const r = await t("getBalance", {}); if (r.error) throw new Error(r.error); return r }, getBalance2: async () => { const r = await t("getBalance2", {}); if (r.error) throw new Error(r.error); return r }, errors: { isLowFunds: r => !!r && "Low funds" === r.message } }; window.relayone = i } exports.initWebView = n;
    }, { "tslib": "CvJj", "./appMessaging": "I7Dt" }], "B9hY": [function (require, module, exports) {
        "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }); const e = require("tslib"), r = e.__importStar(require("@relayx/frame-messaging/lib/frameMessaging")), a = require("./embed/frames"), n = require("./embed/modal"), t = e.__importDefault(require("./embed/state")), o = require("./relayone.webview"), s = e => { "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e() }, i = () => { }; let c = ""; async function d(e, r) { await u.isLinked() || await a.callAuthFrame("onboard", {}, c); const n = await a.callAuthFrame(e, r, c); if (n.error) throw new Error(n.error); return n } async function l(e, r) { const n = await a.callAuthFrame(e, r, c); if (n.error) throw new Error(n.error); return n } const u = { p2p: !0, authRedirectUrl: e => "string" == typeof e && (t.default.authRedirect = e, !0), render: async (n, t) => { const o = await a.getButtonFrameForElement(n, c), { onError: s, onPayment: d, onLoad: l } = t, u = e.__rest(t, ["onError", "onPayment", "onLoad"]); a.setCallbacksForButtonFrame(o.contentWindow, { onError: s || i, onPayment: d || i, onLoad: l || i }), r.call(o.contentWindow, "render", u) }, send: async r => { const { onError: a, onPayment: n, onLoad: t } = r; return d("send", e.__rest(r, ["onError", "onPayment", "onLoad"])) }, quote: async r => { const { onError: a, onPayment: n, onLoad: t } = r; return l("quote", e.__rest(r, ["onError", "onPayment", "onLoad"])) }, requestIdentity: async () => (console.warn("[Relay One]: requestIdentity is deprecated"), d("request-auth", {})), auth: async (e, r) => l("auth", { paymail: e, entropy: r }), getEntropy: async () => d("get-entropy", {}), getNextAddress: async () => d("get-next-address", {}), logout: async () => l("logout", {}), authBeta: async (e = !1) => d("request-auth2", { withAllowance: e }), isLinked: async () => l("is-linked", {}), isLegacy: async () => d("is-legacy", {}), isApp: () => !1, sign: async e => d("sign", { message: e }), encrypt: async (e, r, a) => d("encrypt", { message: e, paymail: r, encoding: a }), decrypt: async e => d("decrypt", { message: e }), getBalance: async () => d("getBalance", {}), getBalance2: async () => d("getBalance2", {}), errors: { isLowFunds: e => !!e && "Low funds" === e.message }, alpha: { dex: { getDexKey: async () => d("dex-key", {}), pay: async e => (console.log("dex pay", e), d("dex-pay", { tx: "string" == typeof e ? e : e.serialize(!0) })), sign: async e => (console.log("dex sign", e), d("dex-sign", { tx: "string" == typeof e ? e : e.serialize(!0) })), broadcast: async e => (console.log("dex broadcast", e), d("dex-broadcast", { tx: "string" == typeof e ? e : e.serialize(!0) })) }, run: { getOwner: async () => d("run-owner", {}), getLegacyOwner: async () => d("run-legacy-owner", {}), pay: async e => (console.log("run pay", e), d("run-pay", { tx: "string" == typeof e ? e : e.serialize(!0) })), sign: async e => (console.log("run sign", e), d("run-sign", { tx: "string" == typeof e ? e : e.serialize(!0) })), broadcast: async e => (console.log("run broadcast", e), d("run-broadcast", { tx: "string" == typeof e ? e : e.serialize(!0) })) } } }; function y(e, i) { if (c && c !== e) throw new Error("overriding frames is not supported"); if (c = e, !t.default.subscribed) { if (t.default.subscribed = !0, window.ReactNativeWebView) return void o.initWebView(window.ReactNativeWebView); s(() => a.makeAuthIframe(e)), r.init(async (r, t, o, s) => { switch (t) { case "error": return void console.warn("relay one error", o); case "payment-error": return void a.getCallbacksForButtonFrame(s).onError(o); case "loaded": return void a.getCallbacksForButtonFrame(s).onLoad(); case "payment": return void a.getCallbacksForButtonFrame(s).onPayment(o); case "hide-modal": return void n.hideModal(); case "show-modal": return void (await n.showModal(o)); case "ask-allowance": return void (await a.callAuthFrameWithUI("allowance", {}, e)); case "ask-authorization": return void (await a.callAuthFrameWithUI("authorize", {}, e)) } }, i) } return u } exports.default = y;
    }, { "tslib": "CvJj", "@relayx/frame-messaging/lib/frameMessaging": "gbyz", "./embed/frames": "Inrg", "./embed/modal": "ZnmC", "./embed/state": "PpGY", "./relayone.webview": "Y62v" }], "g5IB": [function (require, module, exports) {

        var t, e, n = module.exports = {}; function r() { throw new Error("setTimeout has not been defined") } function o() { throw new Error("clearTimeout has not been defined") } function i(e) { if (t === setTimeout) return setTimeout(e, 0); if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0); try { return t(e, 0) } catch (n) { try { return t.call(null, e, 0) } catch (n) { return t.call(this, e, 0) } } } function u(t) { if (e === clearTimeout) return clearTimeout(t); if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t); try { return e(t) } catch (n) { try { return e.call(null, t) } catch (n) { return e.call(this, t) } } } !function () { try { t = "function" == typeof setTimeout ? setTimeout : r } catch (n) { t = r } try { e = "function" == typeof clearTimeout ? clearTimeout : o } catch (n) { e = o } }(); var c, s = [], l = !1, a = -1; function f() { l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h()) } function h() { if (!l) { var t = i(f); l = !0; for (var e = s.length; e;) { for (c = s, s = []; ++a < e;)c && c[a].run(); a = -1, e = s.length } c = null, l = !1, u(t) } } function m(t, e) { this.fun = t, this.array = e } function p() { } n.nextTick = function (t) { var e = new Array(arguments.length - 1); if (arguments.length > 1) for (var n = 1; n < arguments.length; n++)e[n - 1] = arguments[n]; s.push(new m(t, e)), 1 !== s.length || l || i(h) }, m.prototype.run = function () { this.fun.apply(null, this.array) }, n.title = "browser", n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, n.listeners = function (t) { return [] }, n.binding = function (t) { throw new Error("process.binding is not supported") }, n.cwd = function () { return "/" }, n.chdir = function (t) { throw new Error("process.chdir is not supported") }, n.umask = function () { return 0 };
    }, {}], "VUQ0": [function (require, module, exports) {
        var process = require("process");
        var e = require("process"), r = n(require("@relayx/relayone-client/lib/relayone")); function n(e) { return e && e.__esModule ? e : { default: e } } function o() { if (!window.relayone) { var e = (0, r.default)("https://one.relayx.io/?112", "https://one.relayx.io"); e && (window.relayone = e) } } o();
    }, { "@relayx/relayone-client/lib/relayone": "B9hY", "process": "g5IB" }]
}, {}, ["VUQ0"], null)
    //# sourceMappingURL=/relayone.js.map