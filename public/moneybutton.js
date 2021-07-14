/**
 * Copyright 2019 Fermatted Drives Limited
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var moneyButton = function (t) { "use strict"; function n(t, n) { return n.encode ? n.strict ? encodeURIComponent(t).replace(/[!'()*]/g, t => "%".concat(t.charCodeAt(0).toString(16).toUpperCase())) : encodeURIComponent(t) : t } var e = (t, e) => { if (!t) return ""; const o = function (t) { switch (t.arrayFormat) { case "index": return e => (o, s) => { const i = o.length; return void 0 === s || t.skipNull && null === s ? o : null === s ? [...o, [n(e, t), "[", i, "]"].join("")] : [...o, [n(e, t), "[", n(i, t), "]=", n(s, t)].join("")] }; case "bracket": return e => (o, s) => void 0 === s || t.skipNull && null === s ? o : null === s ? [...o, [n(e, t), "[]"].join("")] : [...o, [n(e, t), "[]=", n(s, t)].join("")]; case "comma": return e => (o, s) => null == s || 0 === s.length ? o : 0 === o.length ? [[n(e, t), "=", n(s, t)].join("")] : [[o, n(s, t)].join(",")]; default: return e => (o, s) => void 0 === s || t.skipNull && null === s ? o : null === s ? [...o, n(e, t)] : [...o, [n(e, t), "=", n(s, t)].join("")] } }(e = Object.assign({ encode: !0, strict: !0, arrayFormat: "none" }, e)), s = Object.assign({}, t); if (e.skipNull) for (const t of Object.keys(s)) void 0 !== s[t] && null !== s[t] || delete s[t]; const i = Object.keys(s); return !1 !== e.sort && i.sort(e.sort), i.map(s => { const i = t[s]; return void 0 === i ? "" : null === i ? n(s, e) : Array.isArray(i) ? i.reduce(o(s), []).join("&") : n(s, e) + "=" + n(i, e) }).filter(t => t.length > 0).join("&") }; function o(t, n, e) { return n in t ? Object.defineProperty(t, n, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = e, t } function s(t, n) { var e = Object.keys(t); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(t); n && (o = o.filter((function (n) { return Object.getOwnPropertyDescriptor(t, n).enumerable }))), e.push.apply(e, o) } return e } function i(t) { for (var n = 1; n < arguments.length; n++) { var e = null != arguments[n] ? arguments[n] : {}; n % 2 ? s(Object(e), !0).forEach((function (n) { o(t, n, e[n]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : s(Object(e)).forEach((function (n) { Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n)) })) } return t } function r(t, n) { if (null == t) return {}; var e, o, s = function (t, n) { if (null == t) return {}; var e, o, s = {}, i = Object.keys(t); for (o = 0; o < i.length; o++)e = i[o], n.indexOf(e) >= 0 || (s[e] = t[e]); return s }(t, n); if (Object.getOwnPropertySymbols) { var i = Object.getOwnPropertySymbols(t); for (o = 0; o < i.length; o++)e = i[o], n.indexOf(e) >= 0 || Object.prototype.propertyIsEnumerable.call(t, e) && (s[e] = t[e]) } return s } function a(t) { var n = function (t, n) { if ("object" != typeof t || null === t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var o = e.call(t, n || "default"); if ("object" != typeof o) return o; throw new TypeError("@@toPrimitive must return a primitive value.") } return ("string" === n ? String : Number)(t) }(t, "string"); return "symbol" == typeof n ? n : String(n) } class c { constructor(t) { o(this, "start", () => { window.addEventListener("message", this._onMessageReceived, !1) }), o(this, "enableDeliver", () => { this._deliverMessages = !0, this._pendingMessages.forEach(t => this.targetWindow.postMessage(t, "*")), this._pendingMessages = [] }), o(this, "finalize", () => { window.removeEventListener("message", this._onMessageReceived, !1) }), o(this, "subscribe", (t, n) => { this.handlers[t] = n }), o(this, "unsuscribe", t => { delete this.handlers[t] }), o(this, "_onMessageReceived", async t => { if (t.source !== this.targetWindow) return; if (!t.data || !t.data.v1) return; const n = t.data.v1; if (n.repliesTo && this._replayQueue[n.repliesTo]) { const t = this._replayQueue, e = n.repliesTo, { [e]: { resolve: o, reject: s } } = t, i = r(t, [e].map(a)); return this._replayQueue = i, void (n.errorResponse ? await s(n.payload, n.topic, n.messageId) : await o(n.payload, n.topic, n.messageId)) } const e = this.handlers[n.topic]; if (e) try { const t = await e(n.payload, n.topic, n.messageId); n.reply && this.send("".concat(n.topic, ":reply"), t, { repliesTo: n.messageId, errorResponse: !1 }) } catch (t) { console.error(t), n.reply && this.send("".concat(n.topic, ":reply"), { message: t.message }, { repliesTo: n.messageId, errorResponse: !0 }) } }), o(this, "send", (t, n, e = {}) => { const o = { v1: i({ topic: t, payload: n, messageId: Math.floor(1e17 * Math.random()).toString() }, e) }; return this._deliverMessages ? this.targetWindow.postMessage(o, "*") : this._pendingMessages = [...this._pendingMessages, o], o }), o(this, "sendWithReply", async (t, n) => new Promise((e, o) => { const { v1: { messageId: s } } = this.send(t, n, { reply: !0 }); this._replayQueue = i({}, this._replayQueue, { [s]: { resolve: e, reject: o } }) })), o(this, "sendInsufficientBalanceError", t => { const n = { error: "insufficient balance", popup: { title: "Low balance", message: "Your balance is too low to make this payment.", buttonText: "Add Money", buttonUrl: "".concat(t, "/money") } }; this.send("error.insufficient-balance", n) }), o(this, "sendUnexpectedError", t => { const n = { error: "unexpected error", popup: { title: "Unexpected Error", message: t.message } }; this.send("error.unexpected-error", n) }), o(this, "sendStyledError", t => { this.send("error.styled-mb-error", t) }), o(this, "sendCryptoOperationsError", t => { const n = { error: "crypto operations error", popup: { title: "Crypto Operations error", message: t.message } }; this.send("error.crypto-operations-error", n) }), o(this, "sendPaymentSuccess", t => { const n = { payment: t }; this.send("payment-success", n) }), o(this, "sendCryptoOperationsSuccess", t => { const n = { cryptoOperations: t }; this.send("crypto-operations-success", n) }), o(this, "sendNotLoggedInError", t => { const n = { error: "not logged in", popup: { title: "Money Button", message: "Money Button is a simple payment system. Join Money Button to make this payment.", buttonText: "Sign up", buttonUrl: "".concat(t, "/register"), buttonText2: "Log in", buttonUrl2: "".concat(t, "/login") } }; this.send("error.not-logged-in", n) }), o(this, "sendCompatibilityIssue", t => { const n = { error: "compatibility", message: t.message, popup: { title: "Compatibility", message: t.message } }; this.send("error.compatibility", n) }), o(this, "sendSafaryIssueHint", () => { this.send("error.safari-compatibility", { error: "safari privacy", popup: { title: "Money Button", message: "Money Button is a simple payment system. Enable Money Button on Safari and log in to make this payment.", buttonUrl: "https://blog.moneybutton.com/2018/09/24/how-to-enable-money-button-on-safari-and-ios/", buttonText: "Enable" } }) }), this.handlers = {}, this.targetWindow = t, this._pendingMessages = [], this._deliverMessages = !1, this._replayQueue = {} } } const l = "https://www.moneybutton.com"; let u = null; const p = (t, n) => '\n    <div class="close__moneybutton">\n      <div class="hint__moneybutton">\n        <div class="content__moneybutton">\n          <div class="header__moneybutton">\n            <img class="header-logo__moneybutton" src="'.concat(l, '/static/img/white-iso.svg" alt="">\n            <img class="header-close__moneybutton" src="').concat(l, '/static/img/icons/close-icon-popup.svg" alt="Close modal">\n          </div>\n          <span class="title__moneybutton">').concat(t, '</span>\n          <span class="text__moneybutton">').concat(n, "</span>\n          <div class=\"buttonsWrapper__moneybutton\"></div>\n        </div>\n        <style>\n          .hint__moneybutton .button__moneybutton,\n          .hint__moneybutton .title__moneybutton{\n            font-weight:700\n          }\n          .hint__moneybutton .button__moneybutton,\n          .hint__moneybutton .content__moneybutton{\n            color:#fff;\n            box-sizing:border-box;\n            display:flex;\n            font-family: 'IBM Plex Sans', sans-serif;\n          }\n          .hint__moneybutton .content__moneybutton .header__moneybutton {\n            width: 100%;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            margin-bottom: 20px;\n          }\n          .hint__moneybutton .content__moneybutton .header__moneybutton img.header-logo__moneybutton {\n            width: 30px;\n          }\n          .hint__moneybutton .content__moneybutton .header__moneybutton img.header-close__moneybutton {\n            width: 20px;\n            cursor: pointer;\n          }\n          .hint__moneybutton a{\n            text-decoration:none;\n          }\n          .hint__moneybutton {\n            min-width: 254px;\n            max-width: 378px;\n            width: 90%;\n            z-index: 1002;\n            bottom: 40px;\n            text-align: left;\n            position: fixed;\n          }\n          .hint__moneybutton .content__moneybutton{\n            top:0;\n            left:0;\n            right:0;\n            bottom:0;\n            z-index:1\n          }\n          .hint__moneybutton .content__moneybutton{\n              background-color:#191927;\n              padding:30px;\n              border-radius:10px;\n              bottom:19px;\n              left:0;\n              right:0;\n              flex-direction:column;\n              align-content:center;\n              align-items:flex-start;\n              min-width: 260px;\n          }\n          .hint__moneybutton .title__moneybutton{\n              font-size:20px;\n              margin-bottom:10px\n          }\n          .hint__moneybutton .text__moneybutton{\n              font-size:14px;\n              margin-bottom:20px\n          }\n          .hint__moneybutton .buttonsWrapper__moneybutton{\n              width:100%;\n              display:flex;\n              justify-content:space-between;\n              position:relative;\n              z-index:2;\n          }\n          .hint__moneybutton .button__moneybutton{\n              text-align: center;\n              font-size: 12px;\n              width: calc(50% - 10px);\n              height: 35px;\n              padding: 0 10px;\n              border-radius: 20px;\n              align-items: center;\n              justify-content: center;\n              transition: all 250ms ease-out;\n              cursor: pointer;\n              border: none;\n          }\n          .hint__moneybutton .button__moneybutton.add__moneybutton {\n              width: auto;\n          }\n          .hint__moneybutton .button__moneybutton.red__moneybutton{\n              background-color:#e54d3f\n          }\n          .hint__moneybutton .button__moneybutton.red__moneybutton:hover{\n              background-color:#ce4134\n          }\n          .hint__moneybutton .button__moneybutton.nofill__moneybutton{\n              border:1px solid #fff\n          }\n          .hint__moneybutton .button__moneybutton.nofill__moneybutton:hover{\n              color:#191927;\n              background-color:#fff\n          }\n          .close__moneybutton {\n            background-color: rgba(255, 255, 255, 0.6);\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100vw;\n            height: 100vh;\n            z-index: 999;\n            display: flex;\n            justify-content: center;\n            align-items: flex-end;\n          }\n          @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap');\n        </style>\n      </div>\n    </div>\n  "); function m() { u && (u.parentNode.removeChild(u), u = null) } function d(t, n) { m(); let e = document.getElementsByClassName("popup__moneybutton").item(0); u = document.createElement("div"), u.setAttribute("style", "display: flex; justify-content: center; font-family: sans-serif;"), null === e && (e = function () { const t = document.createElement("div"); return t.className = "popup__moneybutton", t.style.position = "relative", t.style.display = "flex", t.style.justifyContent = "center", t }(), document.body.appendChild(e)), e.appendChild(u), u.innerHTML = n; document.getElementsByClassName("hint__moneybutton").item(0).addEventListener("click", t => t.stopPropagation()); document.getElementsByClassName("close__moneybutton").item(0).addEventListener("click", m); document.getElementsByClassName("header-close__moneybutton").item(0).addEventListener("click", m); const o = document.getElementsByClassName("buttonsWrapper__moneybutton").item(0); t.forEach(t => o.appendChild(t)) } function y({ title: t, message: n, buttonText: e, buttonOnclick: o }) { const s = document.createElement("button"); s.classList = ["button__moneybutton red__moneybutton"], s.innerText = e, s.onclick = () => { o(), m() }, d([s], p(t, n)) } function b(t, n, e) { const o = document.createElement("a"); return o.href = n, o.innerText = t, o.classList.add(...e), o.target = "_blank", o.rel = "noopener noreferrer", o } function h({ title: t, message: n, buttonText: e, buttonUrl: o, buttonText2: s, buttonUrl2: i }) { const r = []; if (e && o) { const t = b(e, o, ["button__moneybutton", "red__moneybutton"]); r.push(t) } if (s && i) { const t = b(s, i, ["button__moneybutton", "nofill__moneybutton"]); r.push(t) } d(r, p(t, n)) } function f() { d([], '\n    <div class="close__moneybutton">\n      <div class="hint__moneybutton">\n        <div class="content__moneybutton">\n          <div class="header__moneybutton">\n            <img class="header-logo__moneybutton" src="'.concat(l, '/static/img/confirmation-error.jpg" alt="">\n            <img class="header-close__moneybutton" src="').concat(l, '/static/img/icons/close-icon-popup-blue.svg" alt="Close modal">\n          </div>\n          <span class="title__moneybutton">\n            Oops! Something went wrong.\n          </span>\n          <span class="text__moneybutton">\n            <span class=\'italic\'>The transaction has failed and the asset has not been sent to the receiver.</span>  Remember to make sure you have a stable internet connection and enough funds in your account.\n          </span>\n        </div>\n        <style>\n          .close__moneybutton {\n            top: 0%;\n            left: 0%;\n            position: fixed;\n\n            z-index: 999;\n            width: 100vw;\n            height: 100vh;\n\n            background-color: rgba(255, 255, 255, 0.4);\n          }\n\n          .hint__moneybutton {\n            position: fixed;\n            top: 50%;\n            left: 50%;\n            transform: translate(-60%, -60%);\n\n            display: flex;\n            align-items: center;\n            justify-content: center;\n\n            width: 320px;\n            height: 290px;\n            z-index: 1000;\n\n            text-align: left;\n            padding-top: 30px;\n            padding-left: 20px;\n            padding-right: 20px;\n\n            border-radius: 20px;\n            background-color: #FFFFFF;\n            box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.165336);\n          }\n\n          .hint__moneybutton .content__moneybutton {\n            z-index: 1001;\n            padding-left: 20px;\n            padding-right: 20px;\n\n            display: flex;\n            align-items: center;\n            flex-direction: column;\n\n            box-sizing: border-box;\n          }\n\n          .hint__moneybutton .content__moneybutton .header__moneybutton {\n            display: flex;\n            flex-direction: row;\n            justify-content: space-between;\n\n            z-index: 1002;\n            margin-bottom: 40px;\n          }\n\n          .hint__moneybutton .content__moneybutton .header__moneybutton img.header-logo__moneybutton {\n            top: 40px;\n            left: 30px;\n\n            width: 155px;\n            height: 125px;\n            position: absolute;\n          }\n\n          .hint__moneybutton .content__moneybutton .header__moneybutton img.header-close__moneybutton {\n            top: 30px;\n            right: 30px;\n\n            width: 20px;\n            cursor: pointer;\n            position: absolute;\n          }\n\n          .hint__moneybutton .title__moneybutton {\n            margin-top: 70px;\n\n            line-height: 22px;\n            letter-spacing: -0.4px;\n\n            color: #434343;\n            font-size: 20px;\n            font-weight: bold;\n            font-style: normal;\n            font-family: IBM Plex Sans;\n          }\n\n          .hint__moneybutton .text__moneybutton{\n            margin-top: 15px;\n            line-height: 16px;\n\n            color: #434343;\n            font-size: 14px;\n            font-weight: 400;\n            font-style: normal;\n            font-family: IBM Plex Sans;\n          }\n\n          span.italic {\n            color: #434343;\n            font-weight: 600;\n            font-style: italic;\n          }\n\n          @media(max-width: 374px) {\n            .hint__moneybutton {\n              top: 10%;\n              left: 5%;\n              padding-left: 10px;\n              padding-right: 10px;\n\n              transform: translate(-0%, -0%);\n\n              width: 300px;\n              height: 450px;\n            }\n\n            .hint__moneybutton .content__moneybutton .header__moneybutton img.header-logo__moneybutton {\n              top: 55px;\n              width: 165px;\n              height: 130px;\n            }\n\n            .hint__moneybutton .title__moneybutton {\n              margin-top: 35px;\n            }\n          }\n\n          @import url(\'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap\');\n        </style>\n      </div>\n    </div>\n  ')) } const g = "".concat("https://www.moneybutton.com", "/iframe"); class _ { constructor(t) { this.iframe = document.createElement("iframe"), this.iframe.src = "".concat(g, "/").concat(t) } styleIframe(t) { Object.assign(this.iframe.style, t) } attach(t) { t.appendChild(this.iframe), this.iframe.contentWindow.onunload = () => { null !== this.iframe.contentWindow && this.iframe.contentWindow.location.href !== g || (t.innerHTML = "") }, this._pmClient = new c(this.iframe.contentWindow) } postMessageClient() { return this._pmClient } } class w { constructor(t) { this.storage = t, this.iframe = new _("onboard-new-user"), this.iframe.styleIframe({ border: "none", width: "100%", minHeight: "100vh" }) } async start() { return new Promise((t, n) => { const e = document.createElement("div"); e.style.position = "fixed", e.style.top = "0px", e.style.left = "0px", e.style.width = "100vw", e.style.height = "100vh", e.style.zIndex = "1001", document.body.appendChild(e), this.iframe.attach(e); const o = this.iframe.postMessageClient(); o.subscribe("onboard-new-user:finished", () => { this._teardown(e), t() }), o.subscribe("create-account:canceled", () => { this._teardown(e), n(new Error("user_decision")) }), o.enableDeliver(), o.start() }) } _teardown(t) { this.iframe.postMessageClient().finalize(), document.body.removeChild(t) } } function x(t, n, e) { return n in t ? Object.defineProperty(t, n, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = e, t } function v(t, n) { var e = Object.keys(t); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(t); n && (o = o.filter((function (n) { return Object.getOwnPropertyDescriptor(t, n).enumerable }))), e.push.apply(e, o) } return e } function O(t) { for (var n = 1; n < arguments.length; n++) { var e = null != arguments[n] ? arguments[n] : {}; n % 2 ? v(Object(e), !0).forEach((function (n) { x(t, n, e[n]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : v(Object(e)).forEach((function (n) { Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n)) })) } return t } function P(t) { return "function" == typeof t } function C(t, n) { return n.reduce((n, e) => (t.hasOwnProperty(e) && (n[e] = t[e]), n), {}) } function k() { const t = function () { const t = document.createElement("iframe"); return t.style.border = "none", t.style.width = "1px", t.style.height = "1px", t.scrolling = "no", t.style.position = "fixed", t.style.bottom = "-1px", t.style.left = "-1px", t.src = "".concat("https://www.moneybutton.com", "/iframe/imb-payments"), t }(); return document.body.appendChild(t), t } const E = ["amount", "to", "currency", "opReturn", "outputs", "cryptoOperations", "buttonId", "buttonData", "preserveOrder"], j = ["amount", "asset", "currency", "to", "address", "userId", "script", "paymail"], M = ["name", "method", "data", "dataEncoding", "value", "valueEncoding", "key", "algorithm", "publicKey", "paymail", "verified", "signature"], I = t => { const n = C(t, E); return n.outputs && (n.outputs = n.outputs.map(t => C(t, j))), n.cryptoOperations && (n.cryptoOperations = n.cryptoOperations.map(t => C(t, M))), JSON.parse(JSON.stringify(n)) }; class z { constructor(t) { this.token = t, this.pmClient = null, this.iframe = null, this.resetConnection() } async swipe(t) { return document.body.contains(this.iframe) || await this.resetConnection(), this.pmClient.sendWithReply("imb.start-payment", { authToken: this.token, attributes: I(t) }) } async amountLeft() { document.body.contains(this.iframe) || await this.resetConnection(); return await this.pmClient.sendWithReply("imb.amount-left", { authToken: this.token }) } async resetConnection() { return new Promise(t => { this.pmClient && this.pmClient.finalize(), this.iframe = k(), this.pmClient = new c(this.iframe.contentWindow), this.pmClient.subscribe("error.insufficient-balance", t => h(t.popup)), this.pmClient.subscribe("error.too-long-mempool-chain", t => h(t.popup)), this.pmClient.subscribe("error.unexpected-error", t => h(t.popup)), this.pmClient.start(), this.pmClient.subscribe("ready", () => { this.pmClient.enableDeliver() }) }) } } const S = "".concat("https://www.moneybutton.com", "/iframe"); function L(t, n) { const e = function (t) { const n = document.createElement("iframe"); return n.style.border = "none", n.style.width = "100%", n.style.minHeight = "100vh", n.src = "".concat(S, "/").concat(t), n }(n); return t.appendChild(e), e.contentWindow.onunload = () => { null !== e.contentWindow && e.contentWindow.location.href !== S || (t.innerHTML = "") }, e } function T(t, n) { P(t.onCryptoOperations) && t.onCryptoOperations(n.cryptoOperations), P(t.onPayment) && t.onPayment(n.payment) } const B = ["permission", "suggestedAmount", "minimumAmount", "clientIdentifier", "onNewPermissionGranted"]; const D = ["to", "asset", "amount", "currency", "label", "successMessage", "opReturn", "outputs", "cryptoOperations", "clientIdentifier", "buttonId", "buttonData", "type", "onPayment", "onError", "onLoad", "devMode", "editable", "disabled", "preserveOrder"], N = new Map; function W(t, n = {}) { N.has(t) ? function (t, n) { const e = N.get(t); e.send("attributes-updated", U(n)), A(e, n) }(t, n) : function (t, n) { !function (t, n) { if (!(t instanceof Element)) throw new Error("The first argument must be of type Element."); if (!(t instanceof Object) || 0 === Object.keys(n).length) throw new Error("Please, specify the button's attributes."); if (void 0 !== n.buttonData && "string" != typeof n.buttonData) throw new Error('"buttonData" should be a string.') }(t, n); const e = function (t = {}) { const n = document.createElement("iframe"); return n.style.border = "none", n.style.width = "280px", n.style.height = "50px", n.scrolling = "no", n.src = F(), n }(n); t.appendChild(e), t.style.position = "relative", t.style.display = "inline-block", t.style.width = "280px", t.style.height = "50px", e.contentWindow.onunload = () => { null !== e.contentWindow && e.contentWindow.location.href !== F() || (N.delete(t), t.innerHTML = "") }; const o = new c(e.contentWindow); o.send("initial-attributes", U(n), {}), A(o, n), o.start(), N.set(t, o) }(t, n) } function A(t, n) { const e = t; e.subscribe("ready", () => { e.enableDeliver(), n.onLoad && "function" == typeof n.onLoad && n.onLoad() }), e.subscribe("resend-attributes", () => { e.enableDeliver(), e.send("attributes-updated", U(n)) }), e.subscribe("connect-local-storage", t => { y({ title: "Authorize this app", message: "Please link your Money Button account with this app", buttonText: "Link account", buttonOnclick: () => { e.send("bounceback:start-flow", {}) } }) }), e.subscribe("payment-success", t => function (t, n) { const { payment: e } = t; e && "function" == typeof n.onPayment && n.onPayment.call(window, e) }(t, n)), e.subscribe("crypto-operations-success", t => function (t, n) { const { cryptoOperations: e } = t; e && "function" == typeof n.onCryptoOperations && n.onCryptoOperations.call(window, e) }(t, n)), e.subscribe("error.insufficient-balance", t => R(t, n)), e.subscribe("error.unexpected-error", t => R(t, n)), e.subscribe("error.crypto-operations-error", t => R(t, n)), e.subscribe("start-new-onboarding", () => { (new w).start().catch(console.error) }), e.subscribe("error.not-logged-in", t => { R(t, n) }), e.subscribe("error.compatibility", t => R(t, n)), e.subscribe("error.safari-compatibility", t => R(t, n)), e.subscribe("error.too-long-mempool-chain", t => R(t, n)), e.subscribe("error", t => R(t, n)), e.subscribe("error.styled-mb-error", t => { f() }) } function U(t) { return { to: t.to, ast: t.asset, amt: t.amount, edt: t.editable, ccy: t.currency, lbl: t.label, scsmsg: t.successMessage, opd: t.opReturn, os: JSON.stringify(t.outputs), cid: t.clientIdentifier, bid: t.buttonId, bdt: t.buttonData, t: t.type, dev: t.devMode, dsbd: t.disabled, crop: JSON.stringify(t.cryptoOperations), pord: t.preserveOrder } } function F() { return "".concat("https://www.moneybutton.com", "/iframe/v2?").concat(e({ format: "postmessage" })) } function R(t, n) { const { error: e, popup: o } = t; o && h(o), e && "function" == typeof n.onError && n.onError.call(window, new Error(e)) } function H(t) { const n = {}; for (const e in t) { const o = t[e]; if (D.includes(e)) switch (e) { case "outputs": let t; try { t = JSON.parse(o) } catch (n) { t = null } t instanceof Array ? n[e] = t : console.warn("The value provided for ".concat(e, " is not a valid JSON array.")); break; case "cryptoOperations": let s; try { s = JSON.parse(o) } catch (t) { s = [] } s instanceof Array ? n[e] = s : console.warn("cryptoOperations should be an array"); break; case "devMode": n[e] = "true" === o; break; case "onPayment": case "onError": case "onLoad": "function" == typeof window[o] ? n[e] = window[o] : console.warn("The value provided for ".concat(e, " is not a function in the global scope.")); break; default: n[e] = o } else console.warn("Unexpected data attribute: ".concat(e, ".")) } return n } return document.addEventListener("DOMContentLoaded", (function () { if (window.moneyButton.alreadyLoaded) return; window.moneyButton.alreadyLoaded = !0; const t = document.getElementsByClassName("money-button"); for (let n = 0; n < t.length; ++n) { const e = t.item(n); try { const t = H(e.dataset); Object.keys(t).length > 0 && W(e, t), console.log("Money Button: added button.") } catch (t) { console.error("Money Button: adding button failed.", t) } } })), t.IMB = class { constructor(t) { this.config = C(t, B), t.permission ? this.paymentProcessor = new z(t.permission) : this.paymentProcessor = null } async swipe(t) { null === this.paymentProcessor && await this.askForPermission(); try { const n = await this.paymentProcessor.swipe(t); return T(t, n), n } catch (n) { if (P(t.onError) && t.onError(n), "Not enough authorized amount." === n.message) { await this.renewPermission(); const n = await this.paymentProcessor.swipe(t); return T(t, n), n } if ("invalid token" === n.message) return this.paymentProcessor = null, this.swipe(t); throw n } } async getPermission() { return null === this.paymentProcessor && await this.askForPermission(), this.paymentProcessor.token } async amountLeft(t) { if (null === this.paymentProcessor) throw new Error("No active permission."); return this.paymentProcessor.amountLeft(t) } async askForPermission(t = {}) { const n = C(this.config, ["clientIdentifier", "suggestedAmount", "minimumAmount"]); t.amount && t.currency && (n.suggestedAmount = { amount: t.amount, currency: t.currency }), t = C(n, ["clientIdentifier", "suggestedAmount", "minimumAmount"]); const e = O(O(O({}, { suggestedAmount: { amount: "5", currency: "USD" }, minimumAmount: { amount: "0.25", currency: "USD" } }), n), t), o = document.createElement("div"); o.style.position = "fixed", o.style.top = "0px", o.style.left = "0px", o.style.width = "100%", o.style.height = "auto", o.style.zIndex = "1001", document.body.appendChild(o); const s = L(o, "imb-permission-grant"); return this._askIframeForPermition(e, o, s) } async renewPermission(t) { const n = C(this.config, ["clientIdentifier", "suggestedAmount", "minimumAmount"]), e = O(O({}, { suggestedAmount: { amount: "5", currency: "USD" }, minimumAmount: { amount: "0.25", currency: "USD" } }), n), o = document.createElement("div"); o.style.position = "fixed", o.style.width = "100%", o.style.height = "350px", o.style.bottom = "20px", o.style.left = "0", o.style.display = "flex", o.style.justifyContent = "center", o.style.pointerEvents = "none", o.style.zIndex = "1001", document.body.appendChild(o); const s = L(o, "imb-renew-permission"); return s.style.maxWidth = "550px", s.style.width = "90%", s.style.pointerEvents = "auto", this._askIframeForPermition(e, o, s) } async _askIframeForPermition(t, n, e) { return new Promise((o, s) => { const i = new c(e.contentWindow); i.subscribe("ready", () => { i.enableDeliver(), i.send("imb.request-swipe-permission", O({}, t)) }), i.subscribe("imb.permission-granted", t => { if (this.paymentProcessor = new z(t.token), P(this.config.onNewPermissionGranted)) try { this.config.onNewPermissionGranted(t.token) } catch (t) { console.error("There was a problem when attempting to save the permission code:", t.message), console.error(t) } i.finalize(), document.body.removeChild(n), function (t) { const n = document.createElement("div"); n.style.position = "fixed", n.style.bottom = "20px", n.style.left = "0", n.style.width = "100%", n.innerHTML = "\n  <div class='alert__moneybutton' role='alert'>\n    <h3 class='imb-success-popup_title__moneybutton'>Permission granted</h3>\n    <span class='imb-success-popup_text__moneybutton'>\n      You can remove, change or renew your <i>".concat(t, "</i> permission\n      from the settings page inside your\n      <a rel='noopener noreferrer' target='_blank' class='imb-success-popup_link__moneybutton' href='").concat(l, "/settings/apps#yourPermissions'>Money Button wallet</a>\n    </span>\n  </div>\n  <style>\n  .alert__moneybutton {\n    background-color: #4772F6;\n    padding: 45px 40px 40px 40px;\n    width: 90%;\n    max-width: 400px;\n    margin-right: auto;\n    margin-left: auto;\n    box-sizing: border-box;\n    border-radius: 20px 20px 0 20px;\n  }\n  .imb-success-popup_text__moneybutton, .imb-success-popup_title__moneybutton {\n    font-size: 12px;\n    font-family: 'IBM Plex Sans', sans-serif;\n    color: white;\n  }\n\n  .imb-success-popup_text__moneybutton {\n    font-weight: 500;\n  }\n\n  .imb-success-popup_title__moneybutton {\n    font-size: 18px;\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  .imb-success-popup_link__moneybutton {\n    color: white;\n    text-decoration: none;\n    font-weight: bold;\n  }\n  </style>\n  "), document.body.appendChild(n); const e = setTimeout(() => { document.body.removeChild(n), document.body.removeEventListener("click", o) }, 6e3), o = t => { n.parentNode.removeChild(n), clearTimeout(e), t.currentTarget.removeEventListener(t.type, o) }; document.body.addEventListener("click", o) }(t.app.name), o(this) }), i.subscribe("imb.permission-dennied", t => { i.finalize(), document.body.removeChild(n), s(t) }), i.subscribe("error.compatibility", t => { h(t.popup), i.finalize(), document.body.removeChild(n), s(new Error("incompatibility")) }), i.subscribe("connect-local-storage", () => new Promise(t => { i.subscribe("sync-localstorage-finish", () => { n.style.zIndex = 1001, n.style.width = "100vw", n.style.height = "100vh", n.style.top = "0", n.style.left = "0", i.unsuscribe("sync-localstorage-finish"), t({}) }), n.style.zIndex = 0, n.style.width = "1px", n.style.height = "1px", n.style.top = "-2px", n.style.left = "-2px", y({ title: "Authorize this app", message: "Please link your money button account with this app", buttonText: "Link account", buttonOnclick: () => { i.send("bounceback:start-flow", {}), i.enableDeliver() } }) })), i.subscribe("error.not-logged-in", t => { h(t.popup), i.finalize(), document.body.removeChild(n), s(new Error("no-user-logged-in")) }), i.subscribe("onboard-new-user", async () => { n.style.zIndex = 0, n.style.width = "1px", n.style.height = "1px", n.style.top = "-2px", n.style.left = "-2px", await new w(window.localStorage).start().catch(t => { i.finalize(), document.body.removeChild(n), s(t) }), i.enableDeliver(), i.send("onboard-new-user:completed"), n.style.zIndex = 1001, n.style.width = "100vw", n.style.height = "100vh", n.style.top = "0", n.style.left = "0" }), i.subscribe("error.insufficient-balance", t => { h(t.popup) }), i.subscribe("error.safari-compatibility", t => { h(t.popup) }), i.subscribe("error.styled-mb-error", t => { f(t.popup) }), i.start() }) } }, t.render = W, t }({});
 //# sourceMappingURL=moneybutton.js.map