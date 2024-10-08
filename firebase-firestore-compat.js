! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(require("@firebase/app-compat"), require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app-compat", "@firebase/app"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).firebase, e.firebase.INTERNAL.modularAPIs)
}(this, function(Jg, Xg) {
    "use strict";
    try {
        !(function() {
            function e(e) {
                return e && "object" == typeof e && "default" in e ? e : {
                    default: e
                }
            }
            var l, t = e(Jg);

            function n(t) {
                const n = [];
                let r = 0;
                for (let i = 0; i < t.length; i++) {
                    let e = t.charCodeAt(i);
                    e < 128 ? n[r++] = e : (e < 2048 ? n[r++] = e >> 6 | 192 : (55296 == (64512 & e) && i + 1 < t.length && 56320 == (64512 & t.charCodeAt(i + 1)) ? (e = 65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++i)), n[r++] = e >> 18 | 240, n[r++] = e >> 12 & 63 | 128) : n[r++] = e >> 12 | 224, n[r++] = e >> 6 & 63 | 128), n[r++] = 63 & e | 128)
                }
                return n
            }
            const r = {
                byteToCharMap_: null,
                charToByteMap_: null,
                byteToCharMapWebSafe_: null,
                charToByteMapWebSafe_: null,
                ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                get ENCODED_VALS() {
                    return this.ENCODED_VALS_BASE + "+/="
                },
                get ENCODED_VALS_WEBSAFE() {
                    return this.ENCODED_VALS_BASE + "-_."
                },
                HAS_NATIVE_SUPPORT: "function" == typeof atob,
                encodeByteArray(n, e) {
                    if (!Array.isArray(n)) throw Error("encodeByteArray takes an array as a parameter");
                    this.init_();
                    var r = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
                    const i = [];
                    for (let h = 0; h < n.length; h += 3) {
                        var s = n[h],
                            a = h + 1 < n.length,
                            o = a ? n[h + 1] : 0,
                            u = h + 2 < n.length,
                            c = u ? n[h + 2] : 0;
                        let e = (15 & o) << 2 | c >> 6,
                            t = 63 & c;
                        u || (t = 64, a || (e = 64)), i.push(r[s >> 2], r[(3 & s) << 4 | o >> 4], r[e], r[t])
                    }
                    return i.join("")
                },
                encodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(n(e), t)
                },
                decodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function(e) {
                        const t = [];
                        let n = 0,
                            r = 0;
                        for (; n < e.length;) {
                            var i, s, a = e[n++];
                            a < 128 ? t[r++] = String.fromCharCode(a) : 191 < a && a < 224 ? (i = e[n++], t[r++] = String.fromCharCode((31 & a) << 6 | 63 & i)) : 239 < a && a < 365 ? (s = ((7 & a) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536, t[r++] = String.fromCharCode(55296 + (s >> 10)), t[r++] = String.fromCharCode(56320 + (1023 & s))) : (i = e[n++], s = e[n++], t[r++] = String.fromCharCode((15 & a) << 12 | (63 & i) << 6 | 63 & s))
                        }
                        return t.join("")
                    }(this.decodeStringToByteArray(e, t))
                },
                decodeStringToByteArray(e, t) {
                    this.init_();
                    var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
                    const r = [];
                    for (let u = 0; u < e.length;) {
                        var i = n[e.charAt(u++)],
                            s = u < e.length ? n[e.charAt(u)] : 0;
                        ++u;
                        var a = u < e.length ? n[e.charAt(u)] : 64;
                        ++u;
                        var o = u < e.length ? n[e.charAt(u)] : 64;
                        if (++u, null == i || null == s || null == a || null == o) throw new c;
                        r.push(i << 2 | s >> 4), 64 !== a && (r.push(s << 4 & 240 | a >> 2), 64 !== o && r.push(a << 6 & 192 | o))
                    }
                    return r
                },
                init_() {
                    if (!this.byteToCharMap_) {
                        this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                        for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
                    }
                }
            };
            class c extends Error {
                constructor() {
                    super(...arguments), this.name = "DecodeBase64StringError"
                }
            }
            const o = function(e) {
                return e = e, t = n(e), r.encodeByteArray(t, !0).replace(/\./g, "");
                var t
            };
            const i = () => function() {
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw new Error("Unable to locate global object.")
                }().__FIREBASE_DEFAULTS__,
                s = () => {
                    if ("undefined" != typeof document) {
                        let e;
                        try {
                            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                        } catch (e) {
                            return
                        }
                        var t = e && function(e) {
                            try {
                                return r.decodeString(e, !0)
                            } catch (e) {
                                console.error("base64Decode failed: ", e)
                            }
                            return null
                        }(e[1]);
                        return t && JSON.parse(t)
                    }
                },
                a = () => {
                    try {
                        return i() || (() => {
                            if ("undefined" != typeof process && void 0 !== process.env) {
                                var e = process.env.__FIREBASE_DEFAULTS__;
                                return e ? JSON.parse(e) : void 0
                            }
                        })() || s()
                    } catch (e) {
                        return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
                    }
                };

            function u() {
                return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
            }

            function h() {
                return ! function() {
                    var e = null === (e = a()) || void 0 === e ? void 0 : e.forceEnvironment;
                    if ("node" === e) return 1;
                    if ("browser" !== e) try {
                        return "[object process]" === Object.prototype.toString.call(global.process)
                    } catch (e) {
                        return
                    }
                }() && navigator.userAgent && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")
            }
            class d extends Error {
                constructor(e, t, n) {
                    super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, d.prototype), Error.captureStackTrace && Error.captureStackTrace(this, f.prototype.create)
                }
            }
            class f {
                constructor(e, t, n) {
                    this.service = e, this.serviceName = t, this.errors = n
                }
                create(e, ...t) {
                    var r, n = t[0] || {},
                        i = `${this.service}/${e}`,
                        s = this.errors[e],
                        s = s ? (r = n, s.replace(g, (e, t) => {
                            var n = r[t];
                            return null != n ? String(n) : `<${t}?>`
                        })) : "Error",
                        s = `${this.serviceName}: ${s} (${i}).`;
                    return new d(i, s, n)
                }
            }
            const g = /\{\$([^}]+)}/g;

            function m(e, t) {
                if (e === t) return !0;
                const n = Object.keys(e),
                    r = Object.keys(t);
                for (const a of n) {
                    if (!r.includes(a)) return !1;
                    var i = e[a],
                        s = t[a];
                    if (p(i) && p(s)) {
                        if (!m(i, s)) return !1
                    } else if (i !== s) return !1
                }
                for (const o of r)
                    if (!n.includes(o)) return !1;
                return !0
            }

            function p(e) {
                return null !== e && "object" == typeof e
            }

            function y(e) {
                return e && e._delegate ? e._delegate : e
            }
            class v {
                constructor(e, t, n) {
                    this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
                }
                setInstantiationMode(e) {
                    return this.instantiationMode = e, this
                }
                setMultipleInstances(e) {
                    return this.multipleInstances = e, this
                }
                setServiceProps(e) {
                    return this.serviceProps = e, this
                }
                setInstanceCreatedCallback(e) {
                    return this.onInstanceCreated = e, this
                }
            }(Xd = l = l || {})[Xd.DEBUG = 0] = "DEBUG", Xd[Xd.VERBOSE = 1] = "VERBOSE", Xd[Xd.INFO = 2] = "INFO", Xd[Xd.WARN = 3] = "WARN", Xd[Xd.ERROR = 4] = "ERROR", Xd[Xd.SILENT = 5] = "SILENT";
            const w = {
                    debug: l.DEBUG,
                    verbose: l.VERBOSE,
                    info: l.INFO,
                    warn: l.WARN,
                    error: l.ERROR,
                    silent: l.SILENT
                },
                _ = l.INFO,
                b = {
                    [l.DEBUG]: "log",
                    [l.VERBOSE]: "log",
                    [l.INFO]: "info",
                    [l.WARN]: "warn",
                    [l.ERROR]: "error"
                },
                I = (e, t, ...n) => {
                    if (!(t < e.logLevel)) {
                        var r = (new Date).toISOString(),
                            i = b[t];
                        if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
                        console[i](`[${r}]  ${e.name}:`, ...n)
                    }
                };
            var E, T = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
                S = {},
                x = T || self;

            function C(e) {
                var t = typeof e;
                return "array" == (t = "object" != t ? t : e ? Array.isArray(e) ? "array" : t : "null") || "object" == t && "number" == typeof e.length
            }

            function D(e) {
                var t = typeof e;
                return "object" == t && null != e || "function" == t
            }
            var A = "closure_uid_" + (1e9 * Math.random() >>> 0),
                N = 0;

            function k(e, t, n) {
                return e.call.apply(e.bind, arguments)
            }

            function R(t, n, e) {
                if (!t) throw Error();
                if (2 < arguments.length) {
                    var r = Array.prototype.slice.call(arguments, 2);
                    return function() {
                        var e = Array.prototype.slice.call(arguments);
                        return Array.prototype.unshift.apply(e, r), t.apply(n, e)
                    }
                }
                return function() {
                    return t.apply(n, arguments)
                }
            }

            function M(e, t, n) {
                return (M = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? k : R).apply(null, arguments)
            }

            function O(t) {
                var n = Array.prototype.slice.call(arguments, 1);
                return function() {
                    var e = n.slice();
                    return e.push.apply(e, arguments), t.apply(this, e)
                }
            }

            function L(e, s) {
                function t() {}
                t.prototype = s.prototype, e.$ = s.prototype, e.prototype = new t, (e.prototype.constructor = e).ac = function(e, t, n) {
                    for (var r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
                    return s.prototype[t].apply(e, r)
                }
            }

            function P() {
                this.s = this.s, this.o = this.o
            }
            P.prototype.s = !1, P.prototype.sa = function() {
                var e;
                !this.s && (this.s = !0, this.N(), 0) && (e = this, Object.prototype.hasOwnProperty.call(e, A) && e[A] || (e[A] = ++N))
            }, P.prototype.N = function() {
                if (this.o)
                    for (; this.o.length;) this.o.shift()()
            };
            const F = Array.prototype.indexOf ? function(e, t) {
                return Array.prototype.indexOf.call(e, t, void 0)
            } : function(e, t) {
                if ("string" == typeof e) return "string" != typeof t || 1 != t.length ? -1 : e.indexOf(t, 0);
                for (let n = 0; n < e.length; n++)
                    if (n in e && e[n] === t) return n;
                return -1
            };

            function V(t) {
                var n = t.length;
                if (0 < n) {
                    const r = Array(n);
                    for (let e = 0; e < n; e++) r[e] = t[e];
                    return r
                }
                return []
            }

            function B(t) {
                for (let e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    if (C(n)) {
                        var r = t.length || 0,
                            i = n.length || 0;
                        t.length = r + i;
                        for (let e = 0; e < i; e++) t[r + e] = n[e]
                    } else t.push(n)
                }
            }

            function U(e, t) {
                this.type = e, this.g = this.target = t, this.defaultPrevented = !1
            }
            U.prototype.h = function() {
                this.defaultPrevented = !0
            };
            var q = function() {
                if (!x.addEventListener || !Object.defineProperty) return !1;
                var e = !1,
                    t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                try {
                    var n = () => {};
                    x.addEventListener("test", n, t), x.removeEventListener("test", n, t)
                } catch (e) {}
                return e
            }();

            function j(e) {
                return /^[\s\xa0]*$/.test(e)
            }

            function G() {
                var e = x.navigator;
                return (e = e && e.userAgent) ? e : ""
            }

            function z(e) {
                return -1 != G().indexOf(e)
            }

            function K(e) {
                return K[" "](e), e
            }
            K[" "] = function() {};
            var $, Q = z("Opera"),
                W = z("Trident") || z("MSIE"),
                H = z("Edge"),
                Y = H || W,
                J = z("Gecko") && !(-1 != G().toLowerCase().indexOf("webkit") && !z("Edge")) && !(z("Trident") || z("MSIE")) && !z("Edge"),
                X = -1 != G().toLowerCase().indexOf("webkit") && !z("Edge");

            function Z() {
                var e = x.document;
                return e ? e.documentMode : void 0
            }
            e: {
                var ee = "",
                    te = (te = G(), J ? /rv:([^\);]+)(\)|;)/.exec(te) : H ? /Edge\/([\d\.]+)/.exec(te) : W ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(te) : X ? /WebKit\/(\S+)/.exec(te) : Q ? /(?:Version)[ \/]?(\S+)/.exec(te) : void 0);
                if (te && (ee = te ? te[1] : ""), W) {
                    te = Z();
                    if (null != te && te > parseFloat(ee)) {
                        $ = String(te);
                        break e
                    }
                }
                $ = ee
            }
            var ne = x.document && W && (Z() || parseInt($, 10)) || void 0;

            function re(e, t) {
                if (U.call(this, e ? e.type : ""), this.relatedTarget = this.g = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.state = null, this.pointerId = 0, this.pointerType = "", this.i = null, e) {
                    var n = this.type = e.type,
                        r = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
                    if (this.target = e.target || e.srcElement, this.g = t, t = e.relatedTarget) {
                        if (J) {
                            e: {
                                try {
                                    K(t.nodeName);
                                    var i = !0;
                                    break e
                                } catch (e) {}
                                i = !1
                            }
                            i || (t = null)
                        }
                    } else "mouseover" == n ? t = e.fromElement : "mouseout" == n && (t = e.toElement);
                    this.relatedTarget = t, r ? (this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX, this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY, this.screenX = r.screenX || 0, this.screenY = r.screenY || 0) : (this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX, this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY, this.screenX = e.screenX || 0, this.screenY = e.screenY || 0), this.button = e.button, this.key = e.key || "", this.ctrlKey = e.ctrlKey, this.altKey = e.altKey, this.shiftKey = e.shiftKey, this.metaKey = e.metaKey, this.pointerId = e.pointerId || 0, this.pointerType = "string" == typeof e.pointerType ? e.pointerType : ie[e.pointerType] || "", this.state = e.state, (this.i = e).defaultPrevented && re.$.h.call(this)
                }
            }
            L(re, U);
            var ie = {
                2: "touch",
                3: "pen",
                4: "mouse"
            };
            re.prototype.h = function() {
                re.$.h.call(this);
                var e = this.i;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            };
            var se = "closure_listenable_" + (1e6 * Math.random() | 0),
                ae = 0;

            function oe(e, t, n, r, i) {
                this.listener = e, this.proxy = null, this.src = t, this.type = n, this.capture = !!r, this.la = i, this.key = ++ae, this.fa = this.ia = !1
            }

            function ue(e) {
                e.fa = !0, e.listener = null, e.proxy = null, e.src = null, e.la = null
            }

            function ce(e, t, n) {
                for (const r in e) t.call(n, e[r], r, e)
            }

            function he(e) {
                const t = {};
                for (const n in e) t[n] = e[n];
                return t
            }
            const le = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

            function de(t) {
                let n, r;
                for (let i = 1; i < arguments.length; i++) {
                    for (n in r = arguments[i]) t[n] = r[n];
                    for (let e = 0; e < le.length; e++) n = le[e], Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
                }
            }

            function fe(e) {
                this.src = e, this.g = {}, this.h = 0
            }

            function ge(e, t) {
                var n, r, i, s = t.type;
                s in e.g && (n = e.g[s], (i = 0 <= (r = F(n, t))) && Array.prototype.splice.call(n, r, 1), i && (ue(t), 0 == e.g[s].length && (delete e.g[s], e.h--)))
            }

            function me(e, t, n, r) {
                for (var i = 0; i < e.length; ++i) {
                    var s = e[i];
                    if (!s.fa && s.listener == t && s.capture == !!n && s.la == r) return i
                }
                return -1
            }
            fe.prototype.add = function(e, t, n, r, i) {
                var s = e.toString();
                (e = this.g[s]) || (e = this.g[s] = [], this.h++);
                var a = me(e, t, r, i);
                return -1 < a ? (t = e[a], n || (t.ia = !1)) : ((t = new oe(t, this.src, s, !!r, i)).ia = n, e.push(t)), t
            };
            var pe = "closure_lm_" + (1e6 * Math.random() | 0),
                ye = {};

            function ve(e, t, n, r, i) {
                if (r && r.once) return function e(t, n, r, i, s) {
                    if (Array.isArray(n)) {
                        for (var a = 0; a < n.length; a++) e(t, n[a], r, i, s);
                        return null
                    }
                    r = Se(r);
                    return t && t[se] ? t.P(n, r, D(i) ? !!i.capture : !!i, s) : we(t, n, r, !0, i, s)
                }(e, t, n, r, i);
                if (Array.isArray(t)) {
                    for (var s = 0; s < t.length; s++) ve(e, t[s], n, r, i);
                    return null
                }
                return n = Se(n), e && e[se] ? e.O(t, n, D(r) ? !!r.capture : !!r, i) : we(e, t, n, !1, r, i)
            }

            function we(e, t, n, r, i, s) {
                if (!t) throw Error("Invalid event type");
                var a = D(i) ? !!i.capture : !!i,
                    o = Ee(e);
                if (o || (e[pe] = o = new fe(e)), (n = o.add(t, n, r, a, s)).proxy) return n;
                if (r = function() {
                        const n = Ie;
                        return function e(t) {
                            return n.call(e.src, e.listener, t)
                        }
                    }(), (n.proxy = r).src = e, r.listener = n, e.addEventListener) void 0 === (i = !q ? a : i) && (i = !1), e.addEventListener(t.toString(), r, i);
                else if (e.attachEvent) e.attachEvent(be(t.toString()), r);
                else {
                    if (!e.addListener || !e.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
                    e.addListener(r)
                }
                return n
            }

            function _e(e) {
                var t, n, r;
                "number" != typeof e && e && !e.fa && ((t = e.src) && t[se] ? ge(t.i, e) : (n = e.type, r = e.proxy, t.removeEventListener ? t.removeEventListener(n, r, e.capture) : t.detachEvent ? t.detachEvent(be(n), r) : t.addListener && t.removeListener && t.removeListener(r), (n = Ee(t)) ? (ge(n, e), 0 == n.h && (n.src = null, t[pe] = null)) : ue(e)))
            }

            function be(e) {
                return e in ye ? ye[e] : ye[e] = "on" + e
            }

            function Ie(e, t) {
                var n, r;
                return e = !!e.fa || (t = new re(t, this), n = e.listener, r = e.la || e.src, e.ia && _e(e), n.call(r, t))
            }

            function Ee(e) {
                return (e = e[pe]) instanceof fe ? e : null
            }
            var Te = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);

            function Se(t) {
                return "function" == typeof t ? t : (t[Te] || (t[Te] = function(e) {
                    return t.handleEvent(e)
                }), t[Te])
            }

            function xe() {
                P.call(this), this.i = new fe(this), (this.S = this).J = null
            }

            function Ce(e, t) {
                var n, r = e.J;
                if (r)
                    for (n = []; r; r = r.J) n.push(r);
                if (e = e.S, r = t.type || t, "string" == typeof t ? t = new U(t, e) : t instanceof U ? t.target = t.target || e : (a = t, de(t = new U(r, e), a)), a = !0, n)
                    for (var i = n.length - 1; 0 <= i; i--) var s = t.g = n[i],
                        a = De(s, r, !0, t) && a;
                if (a = De(s = t.g = e, r, !0, t) && a, a = De(s, r, !1, t) && a, n)
                    for (i = 0; i < n.length; i++) a = De(s = t.g = n[i], r, !1, t) && a
            }

            function De(e, t, n, r) {
                if (!(t = e.i.g[String(t)])) return !0;
                t = t.concat();
                for (var i = !0, s = 0; s < t.length; ++s) {
                    var a, o, u = t[s];
                    u && !u.fa && u.capture == n && (a = u.listener, o = u.la || u.src, u.ia && ge(e.i, u), i = !1 !== a.call(o, r) && i)
                }
                return i && !r.defaultPrevented
            }
            L(xe, P), xe.prototype[se] = !0, xe.prototype.removeEventListener = function(e, t, n, r) {
                ! function e(t, n, r, i, s) {
                    if (Array.isArray(n))
                        for (var a = 0; a < n.length; a++) e(t, n[a], r, i, s);
                    else i = D(i) ? !!i.capture : !!i, r = Se(r), t && t[se] ? (t = t.i, (n = String(n).toString()) in t.g && -1 < (r = me(a = t.g[n], r, i, s)) && (ue(a[r]), Array.prototype.splice.call(a, r, 1), 0 == a.length && (delete t.g[n], t.h--))) : (t = t && Ee(t)) && (n = t.g[n.toString()], (r = (t = -1) < (t = n ? me(n, r, i, s) : t) ? n[t] : null) && _e(r))
                }(this, e, t, n, r)
            }, xe.prototype.N = function() {
                if (xe.$.N.call(this), this.i) {
                    var e, t = this.i;
                    for (e in t.g) {
                        for (var n = t.g[e], r = 0; r < n.length; r++) ue(n[r]);
                        delete t.g[e], t.h--
                    }
                }
                this.J = null
            }, xe.prototype.O = function(e, t, n, r) {
                return this.i.add(String(e), t, !1, n, r)
            }, xe.prototype.P = function(e, t, n, r) {
                return this.i.add(String(e), t, !0, n, r)
            };
            var Ae = x.JSON.stringify;
            var Ne = new class {
                constructor(e, t) {
                    this.i = e, this.j = t, this.h = 0, this.g = null
                }
                get() {
                    let e;
                    return 0 < this.h ? (this.h--, e = this.g, this.g = e.next, e.next = null) : e = this.i(), e
                }
            }(() => new ke, e => e.reset());
            class ke {
                constructor() {
                    this.next = this.g = this.h = null
                }
                set(e, t) {
                    this.h = e, this.g = t, this.next = null
                }
                reset() {
                    this.next = this.g = this.h = null
                }
            }
            let Re, Me = !1,
                Oe = new class {
                    constructor() {
                        this.h = this.g = null
                    }
                    add(e, t) {
                        const n = Ne.get();
                        n.set(e, t), this.h ? this.h.next = n : this.g = n, this.h = n
                    }
                },
                Le = () => {
                    const e = x.Promise.resolve(void 0);
                    Re = () => {
                        e.then(Pe)
                    }
                };
            var Pe = () => {
                for (var e; e = function() {
                        var e = Oe;
                        let t = null;
                        return e.g && (t = e.g, e.g = e.g.next, e.g || (e.h = null), t.next = null), t
                    }();) {
                    try {
                        e.h.call(e.g)
                    } catch (e) {
                        ! function(e) {
                            x.setTimeout(() => {
                                throw e
                            }, 0)
                        }(e)
                    }
                    var t = Ne;
                    t.j(e), t.h < 100 && (t.h++, e.next = t.g, t.g = e)
                }
                Me = !1
            };

            function Fe(e, t) {
                xe.call(this), this.h = e || 1, this.g = t || x, this.j = M(this.qb, this), this.l = Date.now()
            }

            function Ve(e) {
                e.ga = !1, e.T && (e.g.clearTimeout(e.T), e.T = null)
            }

            function Be(e, t, n) {
                if ("function" == typeof e) n && (e = M(e, n));
                else {
                    if (!e || "function" != typeof e.handleEvent) throw Error("Invalid listener argument");
                    e = M(e.handleEvent, e)
                }
                return 2147483647 < Number(t) ? -1 : x.setTimeout(e, t || 0)
            }
            L(Fe, xe), (E = Fe.prototype).ga = !1, E.T = null, E.qb = function() {
                var e;
                this.ga && (0 < (e = Date.now() - this.l) && e < .8 * this.h ? this.T = this.g.setTimeout(this.j, this.h - e) : (this.T && (this.g.clearTimeout(this.T), this.T = null), Ce(this, "tick"), this.ga && (Ve(this), this.start())))
            }, E.start = function() {
                this.ga = !0, this.T || (this.T = this.g.setTimeout(this.j, this.h), this.l = Date.now())
            }, E.N = function() {
                Fe.$.N.call(this), Ve(this), delete this.g
            };
            class Ue extends P {
                constructor(e, t) {
                    super(), this.m = e, this.j = t, this.h = null, this.i = !1, this.g = null
                }
                l(e) {
                    this.h = arguments, this.g ? this.i = !0 : function e(t) {
                        t.g = Be(() => {
                            t.g = null, t.i && (t.i = !1, e(t))
                        }, t.j);
                        var n = t.h;
                        t.h = null, t.m.apply(null, n)
                    }(this)
                }
                N() {
                    super.N(), this.g && (x.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null)
                }
            }

            function qe(e) {
                P.call(this), this.h = e, this.g = {}
            }
            L(qe, P);
            var je = [];

            function Ge(e, t, n, r) {
                Array.isArray(n) || (n && (je[0] = n.toString()), n = je);
                for (var i = 0; i < n.length; i++) {
                    var s = ve(t, n[i], r || e.handleEvent, !1, e.h || e);
                    if (!s) break;
                    e.g[s.key] = s
                }
            }

            function ze(e) {
                ce(e.g, function(e, t) {
                    this.g.hasOwnProperty(t) && _e(e)
                }, e), e.g = {}
            }

            function Ke() {
                this.g = !0
            }

            function $e(e, t, n, r) {
                e.info(function() {
                    return "XMLHTTP TEXT (" + t + "): " + function(e, t) {
                        if (!e.g) return t;
                        if (!t) return null;
                        try {
                            var n = JSON.parse(t);
                            if (n)
                                for (e = 0; e < n.length; e++)
                                    if (Array.isArray(n[e])) {
                                        var r = n[e];
                                        if (!(r.length < 2)) {
                                            var i = r[1];
                                            if (Array.isArray(i) && !(i.length < 1)) {
                                                var s = i[0];
                                                if ("noop" != s && "stop" != s && "close" != s)
                                                    for (var a = 1; a < i.length; a++) i[a] = ""
                                            }
                                        }
                                    }
                            return Ae(n)
                        } catch (e) {
                            return t
                        }
                    }(e, n) + (r ? " " + r : "")
                })
            }
            qe.prototype.N = function() {
                qe.$.N.call(this), ze(this)
            }, qe.prototype.handleEvent = function() {
                throw Error("EventHandler.handleEvent not implemented")
            }, Ke.prototype.Ea = function() {
                this.g = !1
            }, Ke.prototype.info = function() {};
            var Qe = {},
                We = null;

            function He() {
                return We = We || new xe
            }

            function Ye(e) {
                U.call(this, Qe.Ta, e)
            }

            function Je() {
                var e = He();
                Ce(e, new Ye(e))
            }

            function Xe(e, t) {
                U.call(this, Qe.STAT_EVENT, e), this.stat = t
            }

            function Ze(e) {
                var t = He();
                Ce(t, new Xe(t, e))
            }

            function et(e, t) {
                U.call(this, Qe.Ua, e), this.size = t
            }

            function tt(e, t) {
                if ("function" != typeof e) throw Error("Fn must not be null and must be a function");
                return x.setTimeout(function() {
                    e()
                }, t)
            }
            Qe.Ta = "serverreachability", L(Ye, U), Qe.STAT_EVENT = "statevent", L(Xe, U), Qe.Ua = "timingevent", L(et, U);
            var nt = {
                    NO_ERROR: 0,
                    rb: 1,
                    Eb: 2,
                    Db: 3,
                    yb: 4,
                    Cb: 5,
                    Fb: 6,
                    Qa: 7,
                    TIMEOUT: 8,
                    Ib: 9
                },
                rt = {
                    wb: "complete",
                    Sb: "success",
                    Ra: "error",
                    Qa: "abort",
                    Kb: "ready",
                    Lb: "readystatechange",
                    TIMEOUT: "timeout",
                    Gb: "incrementaldata",
                    Jb: "progress",
                    zb: "downloadprogress",
                    $b: "uploadprogress"
                };

            function it() {}

            function st(e) {
                return e.h || (e.h = e.i())
            }

            function at() {}
            it.prototype.h = null;
            T = {
                OPEN: "a",
                vb: "b",
                Ra: "c",
                Hb: "d"
            };

            function ot() {
                U.call(this, "d")
            }

            function ut() {
                U.call(this, "c")
            }

            function ct() {}

            function ht(e, t, n, r) {
                this.l = e, this.j = t, this.m = n, this.W = r || 1, this.U = new qe(this), this.P = ft, this.V = new Fe(e = Y ? 125 : void 0), this.I = null, this.i = !1, this.u = this.B = this.A = this.L = this.G = this.Y = this.C = null, this.F = [], this.g = null, this.o = 0, this.s = this.v = null, this.ca = -1, this.J = !1, this.O = 0, this.M = null, this.ba = this.K = this.aa = this.S = !1, this.h = new lt
            }

            function lt() {
                this.i = null, this.g = "", this.h = !1
            }
            L(ot, U), L(ut, U), L(ct, it), ct.prototype.g = function() {
                return new XMLHttpRequest
            }, ct.prototype.i = function() {
                return {}
            };
            var dt = new ct,
                ft = 45e3,
                gt = {},
                mt = {};

            function pt(e, t, n) {
                e.L = 1, e.A = Ot(At(t)), e.u = n, e.S = !0, yt(e, null)
            }

            function yt(e, t) {
                e.G = Date.now(), _t(e), e.B = At(e.A);
                var a, o, u, c, h, l, n = e.B,
                    r = e.W;
                Array.isArray(r) || (r = [String(r)]), Qt(n.i, "t", r), e.o = 0, n = e.l.J, e.h = new lt, e.g = Qn(e.l, n ? t : null, !e.u), 0 < e.O && (e.M = new Ue(M(e.Pa, e, e.g), e.O)), Ge(e.U, e.g, "readystatechange", e.nb), t = e.I ? he(e.I) : {}, e.u ? (e.v || (e.v = "POST"), t["Content-Type"] = "application/x-www-form-urlencoded", e.g.ha(e.B, e.v, e.u, t)) : (e.v = "GET", e.g.ha(e.B, e.v, null, t)), Je(), a = e.j, o = e.v, u = e.B, c = e.m, h = e.W, l = e.u, a.info(function() {
                    if (a.g)
                        if (l)
                            for (var e = "", t = l.split("&"), n = 0; n < t.length; n++) {
                                var r, i, s = t[n].split("=");
                                1 < s.length && (r = s[0], s = s[1], e = 2 <= (i = r.split("_")).length && "type" == i[1] ? e + (r + "=") + s + "&" : e + (r + "=redacted&"))
                            } else e = null;
                        else e = l;
                    return "XMLHTTP REQ (" + c + ") [attempt " + h + "]: " + o + "\n" + u + "\n" + e
                })
            }

            function vt(e) {
                return e.g && ("GET" == e.v && 2 != e.L && e.l.Ha)
            }

            function wt(e, t, n) {
                let r = !0,
                    i;
                for (; !e.J && e.o < n.length;) {
                    if (a = n, u = o = void 0, o = (s = e).o, (i = -1 == (u = a.indexOf("\n", o)) ? mt : (o = Number(a.substring(o, u)), isNaN(o) ? gt : (u += 1) + o > a.length ? mt : (a = a.slice(u, u + o), s.o = u + o, a))) == mt) {
                        4 == t && (e.s = 4, Ze(14), r = !1), $e(e.j, e.m, null, "[Incomplete Response]");
                        break
                    }
                    if (i == gt) {
                        e.s = 4, Ze(15), $e(e.j, e.m, n, "[Invalid Chunk]"), r = !1;
                        break
                    }
                    $e(e.j, e.m, i, null), St(e, i)
                }
                var s, a, o, u;
                vt(e) && 0 != e.o && (e.h.g = e.h.g.slice(e.o), e.o = 0), 4 != t || 0 != n.length || e.h.h || (e.s = 1, Ze(16), r = !1), e.i = e.i && r, r ? 0 < n.length && !e.ba && (e.ba = !0, (t = e.l).g == e && t.ca && !t.M && (t.l.info("Great, no buffering proxy detected. Bytes received: " + n.length), Bn(t), t.M = !0, Ze(11))) : ($e(e.j, e.m, n, "[Invalid Chunked Response]"), Tt(e), Et(e))
            }

            function _t(e) {
                e.Y = Date.now() + e.P, bt(e, e.P)
            }

            function bt(e, t) {
                if (null != e.C) throw Error("WatchDog timer not null");
                e.C = tt(M(e.lb, e), t)
            }

            function It(e) {
                e.C && (x.clearTimeout(e.C), e.C = null)
            }

            function Et(e) {
                0 == e.l.H || e.J || jn(e.l, e)
            }

            function Tt(e) {
                It(e);
                var t = e.M;
                t && "function" == typeof t.sa && t.sa(), e.M = null, Ve(e.V), ze(e.U), e.g && (t = e.g, e.g = null, t.abort(), t.sa())
            }

            function St(e, t) {
                try {
                    var n = e.l;
                    if (0 != n.H && (n.g == e || Zt(n.i, e)))
                        if (!e.K && Zt(n.i, e) && 3 == n.H) {
                            try {
                                var r = n.Ja.g.parse(t)
                            } catch (e) {
                                r = null
                            }
                            if (Array.isArray(r) && 3 == r.length) {
                                var i = r;
                                if (0 == i[0]) {
                                    e: if (!n.u) {
                                        if (n.g) {
                                            if (!(n.g.G + 3e3 < e.G)) break e;
                                            qn(n), kn(n)
                                        }
                                        Vn(n), Ze(18)
                                    }
                                }
                                else n.Fa = i[1], 0 < n.Fa - n.V && i[2] < 37500 && n.G && 0 == n.A && !n.v && (n.v = tt(M(n.ib, n), 6e3));
                                if (Xt(n.i) <= 1 && n.oa) {
                                    try {
                                        n.oa()
                                    } catch (e) {}
                                    n.oa = void 0
                                }
                            } else zn(n, 11)
                        } else if (!e.K && n.g != e || qn(n), !j(t))
                        for (i = n.Ja.g.parse(t), t = 0; t < i.length; t++) {
                            var s = i[t];
                            if (n.V = s[0], s = s[1], 2 == n.H)
                                if ("c" == s[0]) {
                                    n.K = s[1], n.pa = s[2];
                                    var a = s[3];
                                    null != a && (n.ra = a, n.l.info("VER=" + n.ra));
                                    var o = s[4];
                                    null != o && (n.Ga = o, n.l.info("SVER=" + n.Ga));
                                    var u, c, h = s[5];
                                    null != h && "number" == typeof h && 0 < h && (r = 1.5 * h, n.L = r, n.l.info("backChannelRequestTimeoutMs_=" + r)), r = n;
                                    const g = e.g;
                                    if (g) {
                                        const m = g.g ? g.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                                        m && ((u = r.i).g || -1 == m.indexOf("spdy") && -1 == m.indexOf("quic") && -1 == m.indexOf("h2") || (u.j = u.l, u.g = new Set, u.h && (en(u, u.h), u.h = null))), !r.F || (c = g.g ? g.g.getResponseHeader("X-HTTP-Session-Id") : null) && (r.Da = c, Mt(r.I, r.F, c))
                                    }
                                    n.H = 3, n.h && n.h.Ba(), n.ca && (n.S = Date.now() - e.G, n.l.info("Handshake RTT: " + n.S + "ms"));
                                    var l, d, f = e;
                                    (r = n).wa = $n(r, r.J ? r.pa : null, r.Y), f.K ? (tn(r.i, f), l = f, (d = r.L) && l.setTimeout(d), l.C && (It(l), _t(l)), r.g = f) : Fn(r), 0 < n.j.length && Mn(n)
                                } else "stop" != s[0] && "close" != s[0] || zn(n, 7);
                            else 3 == n.H && ("stop" == s[0] || "close" == s[0] ? "stop" == s[0] ? zn(n, 7) : Nn(n) : "noop" != s[0] && n.h && n.h.Aa(s), n.A = 0)
                        }
                    Je()
                } catch (e) {}
            }

            function xt(e, t) {
                if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
                else if (C(e) || "string" == typeof e) Array.prototype.forEach.call(e, t, void 0);
                else
                    for (var n = function(e) {
                            if (e.ta && "function" == typeof e.ta) return e.ta();
                            if (!e.Z || "function" != typeof e.Z) {
                                if ("undefined" != typeof Map && e instanceof Map) return Array.from(e.keys());
                                if (!("undefined" != typeof Set && e instanceof Set)) {
                                    if (C(e) || "string" == typeof e) {
                                        var t = [];
                                        e = e.length;
                                        for (var n = 0; n < e; n++) t.push(n);
                                        return t
                                    }
                                    t = [], n = 0;
                                    for (const r in e) t[n++] = r;
                                    return t
                                }
                            }
                        }(e), r = function(e) {
                            if (e.Z && "function" == typeof e.Z) return e.Z();
                            if ("undefined" != typeof Map && e instanceof Map || "undefined" != typeof Set && e instanceof Set) return Array.from(e.values());
                            if ("string" == typeof e) return e.split("");
                            if (C(e)) {
                                for (var t = [], n = e.length, r = 0; r < n; r++) t.push(e[r]);
                                return t
                            }
                            for (r in t = [], n = 0, e) t[n++] = e[r];
                            return t
                        }(e), i = r.length, s = 0; s < i; s++) t.call(void 0, r[s], n && n[s], e)
            }(E = ht.prototype).setTimeout = function(e) {
                this.P = e
            }, E.nb = function(e) {
                e = e.target;
                const t = this.M;
                t && 3 == Tn(e) ? t.l() : this.Pa(e)
            }, E.Pa = function(e) {
                try {
                    if (e == this.g) e: {
                        var t = Tn(this.g),
                            n = this.g.Ia();this.g.da();
                        if (!(t < 3) && (3 != t || Y || this.g && (this.h.h || this.g.ja() || Sn(this.g)))) {
                            this.J || 4 != t || 7 == n || Je(), It(this);
                            var r = this.g.da();
                            this.ca = r;
                            t: if (vt(this)) {
                                var i = Sn(this.g);
                                e = "";
                                var s = i.length,
                                    a = 4 == Tn(this.g);
                                if (!this.h.i) {
                                    if ("undefined" == typeof TextDecoder) {
                                        Tt(this), Et(this);
                                        var o = "";
                                        break t
                                    }
                                    this.h.i = new x.TextDecoder
                                }
                                for (n = 0; n < s; n++) this.h.h = !0, e += this.h.i.decode(i[n], {
                                    stream: a && n == s - 1
                                });
                                i.length = 0, this.h.g += e, this.o = 0, o = this.h.g
                            } else o = this.g.ja();
                            if (this.i = 200 == r, l = this.j, d = this.v, f = this.B, g = this.m, m = this.W, p = t, y = r, l.info(function() {
                                    return "XMLHTTP RESP (" + g + ") [ attempt " + m + "]: " + d + "\n" + f + "\n" + p + " " + y
                                }), this.i) {
                                if (this.aa && !this.K) {
                                    t: {
                                        if (this.g) {
                                            var u, c = this.g;
                                            if ((u = c.g ? c.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !j(u)) {
                                                var h = u;
                                                break t
                                            }
                                        }
                                        h = null
                                    }
                                    if (!(r = h)) {
                                        this.i = !1, this.s = 3, Ze(12), Tt(this), Et(this);
                                        break e
                                    }
                                    $e(this.j, this.m, r, "Initial handshake response via X-HTTP-Initial-Response"),
                                    this.K = !0,
                                    St(this, r)
                                }
                                this.S ? (wt(this, t, o), Y && this.i && 3 == t && (Ge(this.U, this.V, "tick", this.mb), this.V.start())) : ($e(this.j, this.m, o, null), St(this, o)), 4 == t && Tt(this), this.i && !this.J && (4 == t ? jn(this.l, this) : (this.i = !1, _t(this)))
                            } else(function(e) {
                                const t = {};
                                e = (e.g && 2 <= Tn(e) && e.g.getAllResponseHeaders() || "").split("\r\n");
                                for (let i = 0; i < e.length; i++)
                                    if (!j(e[i])) {
                                        var n = function(e) {
                                                var t = 1;
                                                e = e.split(":");
                                                const n = [];
                                                for (; 0 < t && e.length;) n.push(e.shift()), t--;
                                                return e.length && n.push(e.join(":")), n
                                            }(e[i]),
                                            r = n[0];
                                        if ("string" == typeof(n = n[1])) {
                                            n = n.trim();
                                            const s = t[r] || [];
                                            t[r] = s, s.push(n)
                                        }
                                    }! function(e, t) {
                                    for (const n in e) t.call(void 0, e[n], n, e)
                                }(t, function(e) {
                                    return e.join(", ")
                                })
                            })(this.g), 400 == r && 0 < o.indexOf("Unknown SID") ? (this.s = 3, Ze(12)) : (this.s = 0, Ze(13)), Tt(this), Et(this)
                        }
                    }
                } catch (e) {}
                var l, d, f, g, m, p, y
            }, E.mb = function() {
                var e, t;
                this.g && (e = Tn(this.g), t = this.g.ja(), this.o < t.length && (It(this), wt(this, e, t), this.i && 4 != e && _t(this)))
            }, E.cancel = function() {
                this.J = !0, Tt(this)
            }, E.lb = function() {
                this.C = null;
                var e, t, n = Date.now();
                0 <= n - this.Y ? (e = this.j, t = this.B, e.info(function() {
                    return "TIMEOUT: " + t
                }), 2 != this.L && (Je(), Ze(17)), Tt(this), this.s = 2, Et(this)) : bt(this, this.Y - n)
            };
            var Ct = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

            function Dt(e) {
                var t, n;
                this.g = this.s = this.j = "", this.m = null, this.o = this.l = "", this.h = !1, e instanceof Dt ? (this.h = e.h, Nt(this, e.j), this.s = e.s, this.g = e.g, kt(this, e.m), this.l = e.l, t = e.i, (n = new Gt).i = t.i, t.g && (n.g = new Map(t.g), n.h = t.h), Rt(this, n), this.o = e.o) : e && (t = String(e).match(Ct)) ? (this.h = !1, Nt(this, t[1] || "", !0), this.s = Lt(t[2] || ""), this.g = Lt(t[3] || "", !0), kt(this, t[4]), this.l = Lt(t[5] || "", !0), Rt(this, t[6] || "", !0), this.o = Lt(t[7] || "")) : (this.h = !1, this.i = new Gt(null, this.h))
            }

            function At(e) {
                return new Dt(e)
            }

            function Nt(e, t, n) {
                e.j = n ? Lt(t, !0) : t, e.j && (e.j = e.j.replace(/:$/, ""))
            }

            function kt(e, t) {
                if (t) {
                    if (t = Number(t), isNaN(t) || t < 0) throw Error("Bad port number " + t);
                    e.m = t
                } else e.m = null
            }

            function Rt(e, t, n) {
                var r, i;
                t instanceof Gt ? (e.i = t, r = e.i, (i = e.h) && !r.j && (zt(r), r.i = null, r.g.forEach(function(e, t) {
                    var n = t.toLowerCase();
                    t != n && (Kt(this, t), Qt(this, n, e))
                }, r)), r.j = i) : (n || (t = Pt(t, qt)), e.i = new Gt(t, e.h))
            }

            function Mt(e, t, n) {
                e.i.set(t, n)
            }

            function Ot(e) {
                return Mt(e, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)), e
            }

            function Lt(e, t) {
                return e ? t ? decodeURI(e.replace(/%25/g, "%2525")) : decodeURIComponent(e) : ""
            }

            function Pt(e, t, n) {
                return "string" == typeof e ? (e = encodeURI(e).replace(t, Ft), e = n ? e.replace(/%25([0-9a-fA-F]{2})/g, "%$1") : e) : null
            }

            function Ft(e) {
                return "%" + ((e = e.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & e).toString(16)
            }
            Dt.prototype.toString = function() {
                var e = [],
                    t = this.j;
                t && e.push(Pt(t, Vt, !0), ":");
                var n = this.g;
                return !n && "file" != t || (e.push("//"), (t = this.s) && e.push(Pt(t, Vt, !0), "@"), e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.m) && e.push(":", String(n))), (n = this.l) && (this.g && "/" != n.charAt(0) && e.push("/"), e.push(Pt(n, "/" == n.charAt(0) ? Ut : Bt, !0))), (n = this.i.toString()) && e.push("?", n), (n = this.o) && e.push("#", Pt(n, jt)), e.join("")
            };
            var Vt = /[#\/\?@]/g,
                Bt = /[#\?:]/g,
                Ut = /[#\?]/g,
                qt = /[#\?@]/g,
                jt = /#/g;

            function Gt(e, t) {
                this.h = this.g = null, this.i = e || null, this.j = !!t
            }

            function zt(n) {
                n.g || (n.g = new Map, n.h = 0, n.i && function(e, t) {
                    if (e) {
                        e = e.split("&");
                        for (var n = 0; n < e.length; n++) {
                            var r, i = e[n].indexOf("="),
                                s = null;
                            0 <= i ? (r = e[n].substring(0, i), s = e[n].substring(i + 1)) : r = e[n], t(r, s ? decodeURIComponent(s.replace(/\+/g, " ")) : "")
                        }
                    }
                }(n.i, function(e, t) {
                    n.add(decodeURIComponent(e.replace(/\+/g, " ")), t)
                }))
            }

            function Kt(e, t) {
                zt(e), t = Wt(e, t), e.g.has(t) && (e.i = null, e.h -= e.g.get(t).length, e.g.delete(t))
            }

            function $t(e, t) {
                return zt(e), t = Wt(e, t), e.g.has(t)
            }

            function Qt(e, t, n) {
                Kt(e, t), 0 < n.length && (e.i = null, e.g.set(Wt(e, t), V(n)), e.h += n.length)
            }

            function Wt(e, t) {
                return t = String(t), t = e.j ? t.toLowerCase() : t
            }(E = Gt.prototype).add = function(e, t) {
                zt(this), this.i = null, e = Wt(this, e);
                var n = this.g.get(e);
                return n || this.g.set(e, n = []), n.push(t), this.h += 1, this
            }, E.forEach = function(n, r) {
                zt(this), this.g.forEach(function(e, t) {
                    e.forEach(function(e) {
                        n.call(r, e, t, this)
                    }, this)
                }, this)
            }, E.ta = function() {
                zt(this);
                const t = Array.from(this.g.values()),
                    n = Array.from(this.g.keys()),
                    r = [];
                for (let s = 0; s < n.length; s++) {
                    var i = t[s];
                    for (let e = 0; e < i.length; e++) r.push(n[s])
                }
                return r
            }, E.Z = function(t) {
                zt(this);
                let n = [];
                if ("string" == typeof t) $t(this, t) && (n = n.concat(this.g.get(Wt(this, t))));
                else {
                    t = Array.from(this.g.values());
                    for (let e = 0; e < t.length; e++) n = n.concat(t[e])
                }
                return n
            }, E.set = function(e, t) {
                return zt(this), this.i = null, $t(this, e = Wt(this, e)) && (this.h -= this.g.get(e).length), this.g.set(e, [t]), this.h += 1, this
            }, E.get = function(e, t) {
                return e && 0 < (e = this.Z(e)).length ? String(e[0]) : t
            }, E.toString = function() {
                if (this.i) return this.i;
                if (!this.g) return "";
                const e = [],
                    t = Array.from(this.g.keys());
                for (var n = 0; n < t.length; n++)
                    for (var r = t[n], i = encodeURIComponent(String(r)), s = this.Z(r), r = 0; r < s.length; r++) {
                        var a = i;
                        "" !== s[r] && (a += "=" + encodeURIComponent(String(s[r]))), e.push(a)
                    }
                return this.i = e.join("&")
            };
            var Ht = class {
                constructor(e, t) {
                    this.g = e, this.map = t
                }
            };

            function Yt(e) {
                this.l = e || 10, e = x.PerformanceNavigationTiming ? 0 < (e = x.performance.getEntriesByType("navigation")).length && ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol) : !!(x.g && x.g.Ka && x.g.Ka() && x.g.Ka().dc), this.j = e ? this.l : 1, this.g = null, 1 < this.j && (this.g = new Set), this.h = null, this.i = []
            }

            function Jt(e) {
                return e.h || e.g && e.g.size >= e.j
            }

            function Xt(e) {
                return e.h ? 1 : e.g ? e.g.size : 0
            }

            function Zt(e, t) {
                return e.h ? e.h == t : e.g && e.g.has(t)
            }

            function en(e, t) {
                e.g ? e.g.add(t) : e.h = t
            }

            function tn(e, t) {
                e.h && e.h == t ? e.h = null : e.g && e.g.has(t) && e.g.delete(t)
            }

            function nn(t) {
                if (null != t.h) return t.i.concat(t.h.F);
                if (null == t.g || 0 === t.g.size) return V(t.i); {
                    let e = t.i;
                    for (const n of t.g.values()) e = e.concat(n.F);
                    return e
                }
            }
            Yt.prototype.cancel = function() {
                if (this.i = nn(this), this.h) this.h.cancel(), this.h = null;
                else if (this.g && 0 !== this.g.size) {
                    for (const e of this.g.values()) e.cancel();
                    this.g.clear()
                }
            };
            var rn, sn = class {
                stringify(e) {
                    return x.JSON.stringify(e, void 0)
                }
                parse(e) {
                    return x.JSON.parse(e, void 0)
                }
            };

            function an() {
                this.g = new sn
            }

            function on(e, t, n, r, i) {
                try {
                    t.onload = null, t.onerror = null, t.onabort = null, t.ontimeout = null, i(r)
                } catch (e) {}
            }

            function un(e) {
                this.l = e.ec || null, this.j = e.ob || !1
            }

            function cn(e, t) {
                xe.call(this), this.F = e, this.u = t, this.m = void 0, this.readyState = hn, this.status = 0, this.responseType = this.responseText = this.response = this.statusText = "", this.onreadystatechange = null, this.v = new Headers, this.h = null, this.C = "GET", this.B = "", this.g = !1, this.A = this.j = this.l = null
            }
            L(un, it), un.prototype.g = function() {
                return new cn(this.l, this.j)
            }, un.prototype.i = (rn = {}, function() {
                return rn
            }), L(cn, xe);
            var hn = 0;

            function ln(e) {
                e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e))
            }

            function dn(e) {
                e.readyState = 4, e.l = null, e.j = null, e.A = null, fn(e)
            }

            function fn(e) {
                e.onreadystatechange && e.onreadystatechange.call(e)
            }(E = cn.prototype).open = function(e, t) {
                if (this.readyState != hn) throw this.abort(), Error("Error reopening a connection");
                this.C = e, this.B = t, this.readyState = 1, fn(this)
            }, E.send = function(e) {
                if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
                this.g = !0;
                const t = {
                    headers: this.v,
                    method: this.C,
                    credentials: this.m,
                    cache: void 0
                };
                e && (t.body = e), (this.F || x).fetch(new Request(this.B, t)).then(this.$a.bind(this), this.ka.bind(this))
            }, E.abort = function() {
                this.response = this.responseText = "", this.v = new Headers, this.status = 0, this.j && this.j.cancel("Request was aborted.").catch(() => {}), 1 <= this.readyState && this.g && 4 != this.readyState && (this.g = !1, dn(this)), this.readyState = hn
            }, E.$a = function(e) {
                if (this.g && (this.l = e, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = e.headers, this.readyState = 2, fn(this)), this.g && (this.readyState = 3, fn(this), this.g)))
                    if ("arraybuffer" === this.responseType) e.arrayBuffer().then(this.Ya.bind(this), this.ka.bind(this));
                    else if (void 0 !== x.ReadableStream && "body" in e) {
                    if (this.j = e.body.getReader(), this.u) {
                        if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
                        this.response = []
                    } else this.response = this.responseText = "", this.A = new TextDecoder;
                    ln(this)
                } else e.text().then(this.Za.bind(this), this.ka.bind(this))
            }, E.Xa = function(e) {
                var t;
                this.g && (this.u && e.value ? this.response.push(e.value) : this.u || (t = e.value || new Uint8Array(0), (t = this.A.decode(t, {
                    stream: !e.done
                })) && (this.response = this.responseText += t)), (e.done ? dn : fn)(this), 3 == this.readyState && ln(this))
            }, E.Za = function(e) {
                this.g && (this.response = this.responseText = e, dn(this))
            }, E.Ya = function(e) {
                this.g && (this.response = e, dn(this))
            }, E.ka = function() {
                this.g && dn(this)
            }, E.setRequestHeader = function(e, t) {
                this.v.append(e, t)
            }, E.getResponseHeader = function(e) {
                return this.h && this.h.get(e.toLowerCase()) || ""
            }, E.getAllResponseHeaders = function() {
                if (!this.h) return "";
                const e = [],
                    t = this.h.entries();
                for (var n = t.next(); !n.done;) n = n.value, e.push(n[0] + ": " + n[1]), n = t.next();
                return e.join("\r\n")
            }, Object.defineProperty(cn.prototype, "withCredentials", {
                get: function() {
                    return "include" === this.m
                },
                set: function(e) {
                    this.m = e ? "include" : "same-origin"
                }
            });
            var gn = x.JSON.parse;

            function mn(e) {
                xe.call(this), this.headers = new Map, this.u = e || null, this.h = !1, this.C = this.g = null, this.I = "", this.m = 0, this.j = "", this.l = this.G = this.v = this.F = !1, this.B = 0, this.A = null, this.K = pn, this.L = this.M = !1
            }
            L(mn, xe);
            var pn = "",
                yn = /^https?$/i,
                vn = ["POST", "PUT"];

            function wn(e, t) {
                e.h = !1, e.g && (e.l = !0, e.g.abort(), e.l = !1), e.j = t, e.m = 5, _n(e), In(e)
            }

            function _n(e) {
                e.F || (e.F = !0, Ce(e, "complete"), Ce(e, "error"))
            }

            function bn(e) {
                if (e.h && void 0 !== S && (!e.C[1] || 4 != Tn(e) || 2 != e.da()))
                    if (e.v && 4 == Tn(e)) Be(e.La, 0, e);
                    else if (Ce(e, "readystatechange"), 4 == Tn(e)) {
                    e.h = !1;
                    try {
                        var t, n, r, i = e.da();
                        e: switch (i) {
                            case 200:
                            case 201:
                            case 202:
                            case 204:
                            case 206:
                            case 304:
                            case 1223:
                                var s = !0;
                                break e;
                            default:
                                s = !1
                        }
                        if ((t = s) || ((n = 0 === i) && (!(r = String(e.I).match(Ct)[1] || null) && x.self && x.self.location && (r = x.self.location.protocol.slice(0, -1)), n = !yn.test(r ? r.toLowerCase() : "")), t = n), t) Ce(e, "complete"), Ce(e, "success");
                        else {
                            e.m = 6;
                            try {
                                var a = 2 < Tn(e) ? e.g.statusText : ""
                            } catch (e) {
                                a = ""
                            }
                            e.j = a + " [" + e.da() + "]", _n(e)
                        }
                    } finally {
                        In(e)
                    }
                }
            }

            function In(e, t) {
                if (e.g) {
                    En(e);
                    const n = e.g,
                        r = e.C[0] ? () => {} : null;
                    e.g = null, e.C = null, t || Ce(e, "ready");
                    try {
                        n.onreadystatechange = r
                    } catch (e) {}
                }
            }

            function En(e) {
                e.g && e.L && (e.g.ontimeout = null), e.A && (x.clearTimeout(e.A), e.A = null)
            }

            function Tn(e) {
                return e.g ? e.g.readyState : 0
            }

            function Sn(e) {
                try {
                    if (!e.g) return null;
                    if ("response" in e.g) return e.g.response;
                    switch (e.K) {
                        case pn:
                        case "text":
                            return e.g.responseText;
                        case "arraybuffer":
                            if ("mozResponseArrayBuffer" in e.g) return e.g.mozResponseArrayBuffer
                    }
                    return null
                } catch (e) {
                    return null
                }
            }

            function xn(e) {
                let n = "";
                return ce(e, function(e, t) {
                    n += t, n += ":", n += e, n += "\r\n"
                }), n
            }

            function Cn(e, t, n) {
                e: {
                    for (r in n) {
                        var r = !1;
                        break e
                    }
                    r = !0
                }
                r || (n = xn(n), "string" == typeof e ? null != n && encodeURIComponent(String(n)) : Mt(e, t, n))
            }

            function Dn(e, t, n) {
                return n && n.internalChannelParams && n.internalChannelParams[e] || t
            }

            function An(e) {
                this.Ga = 0, this.j = [], this.l = new Ke, this.pa = this.wa = this.I = this.Y = this.g = this.Da = this.F = this.na = this.o = this.U = this.s = null, this.fb = this.W = 0, this.cb = Dn("failFast", !1, e), this.G = this.v = this.u = this.m = this.h = null, this.aa = !0, this.Fa = this.V = -1, this.ba = this.A = this.C = 0, this.ab = Dn("baseRetryDelayMs", 5e3, e), this.hb = Dn("retryDelaySeedMs", 1e4, e), this.eb = Dn("forwardChannelMaxRetries", 2, e), this.xa = Dn("forwardChannelRequestTimeoutMs", 2e4, e), this.va = e && e.xmlHttpFactory || void 0, this.Ha = e && e.useFetchStreams || !1, this.L = void 0, this.J = e && e.supportsCrossDomainXhr || !1, this.K = "", this.i = new Yt(e && e.concurrentRequestLimit), this.Ja = new an, this.P = e && e.fastHandshake || !1, this.O = e && e.encodeInitMessageHeaders || !1, this.P && this.O && (this.O = !1), this.bb = e && e.bc || !1, e && e.Ea && this.l.Ea(), e && e.forceLongPolling && (this.aa = !1), this.ca = !this.P && this.aa && e && e.detectBufferingProxy || !1, this.qa = void 0, e && e.longPollingTimeout && 0 < e.longPollingTimeout && (this.qa = e.longPollingTimeout), this.oa = void 0, this.S = 0, this.M = !1, this.ma = this.B = null
            }

            function Nn(e) {
                if (Rn(e), 3 == e.H) {
                    var t = e.W++,
                        n = At(e.I);
                    if (Mt(n, "SID", e.K), Mt(n, "RID", t), Mt(n, "TYPE", "terminate"), Ln(e, n), (t = new ht(e, e.l, t)).L = 2, t.A = Ot(At(n)), n = !1, x.navigator && x.navigator.sendBeacon) try {
                        n = x.navigator.sendBeacon(t.A.toString(), "")
                    } catch (e) {}!n && x.Image && ((new Image).src = t.A, n = !0), n || (t.g = Qn(t.l, null), t.g.ha(t.A)), t.G = Date.now(), _t(t)
                }
                Kn(e)
            }

            function kn(e) {
                e.g && (Bn(e), e.g.cancel(), e.g = null)
            }

            function Rn(e) {
                kn(e), e.u && (x.clearTimeout(e.u), e.u = null), qn(e), e.i.cancel(), e.m && ("number" == typeof e.m && x.clearTimeout(e.m), e.m = null)
            }

            function Mn(e) {
                var t;
                Jt(e.i) || e.m || (e.m = !0, t = e.Na, Re || Le(), Me || (Re(), Me = !0), Oe.add(t, e), e.C = 0)
            }

            function On(e, t) {
                var n = t ? t.m : e.W++,
                    r = At(e.I);
                Mt(r, "SID", e.K), Mt(r, "RID", n), Mt(r, "AID", e.V), Ln(e, r), e.o && e.s && Cn(r, e.o, e.s), n = new ht(e, e.l, n, e.C + 1), null === e.o && (n.I = e.s), t && (e.j = t.F.concat(e.j)), t = Pn(e, n, 1e3), n.setTimeout(Math.round(.5 * e.xa) + Math.round(.5 * e.xa * Math.random())), en(e.i, n), pt(n, r, t)
            }

            function Ln(e, n) {
                e.na && ce(e.na, function(e, t) {
                    Mt(n, t, e)
                }), e.h && xt({}, function(e, t) {
                    Mt(n, t, e)
                })
            }

            function Pn(e, t, r) {
                r = Math.min(e.j.length, r);
                var i = e.h ? M(e.h.Va, e.h, e) : null;
                e: {
                    var s = e.j;
                    let n = -1;
                    for (;;) {
                        const u = ["count=" + r]; - 1 == n ? 0 < r ? (n = s[0].g, u.push("ofs=" + n)) : n = 0 : u.push("ofs=" + n);
                        let e = !0;
                        for (let t = 0; t < r; t++) {
                            var a = s[t].g,
                                o = s[t].map;
                            if ((a -= n) < 0) n = Math.max(0, s[t].g - 100), e = !1;
                            else try {
                                ! function(e, r, t) {
                                    const i = t || "";
                                    try {
                                        xt(e, function(e, t) {
                                            let n = e;
                                            D(e) && (n = Ae(e)), r.push(i + t + "=" + encodeURIComponent(n))
                                        })
                                    } catch (e) {
                                        throw r.push(i + "type=" + encodeURIComponent("_badmap")), e
                                    }
                                }(o, u, "req" + a + "_")
                            } catch (e) {
                                i && i(o)
                            }
                        }
                        if (e) {
                            i = u.join("&");
                            break e
                        }
                    }
                }
                return e = e.j.splice(0, r), t.F = e, i
            }

            function Fn(e) {
                var t;
                e.g || e.u || (e.ba = 1, t = e.Ma, Re || Le(), Me || (Re(), Me = !0), Oe.add(t, e), e.A = 0)
            }

            function Vn(e) {
                return !(e.g || e.u || 3 <= e.A) && (e.ba++, e.u = tt(M(e.Ma, e), Gn(e, e.A)), e.A++, 1)
            }

            function Bn(e) {
                null != e.B && (x.clearTimeout(e.B), e.B = null)
            }

            function Un(e) {
                e.g = new ht(e, e.l, "rpc", e.ba), null === e.o && (e.g.I = e.s), e.g.O = 0;
                var t = At(e.wa);
                Mt(t, "RID", "rpc"), Mt(t, "SID", e.K), Mt(t, "AID", e.V), Mt(t, "CI", e.G ? "0" : "1"), !e.G && e.qa && Mt(t, "TO", e.qa), Mt(t, "TYPE", "xmlhttp"), Ln(e, t), e.o && e.s && Cn(t, e.o, e.s), e.L && e.g.setTimeout(e.L);
                var n = e.g;
                e = e.pa, n.L = 1, n.A = Ot(At(t)), n.u = null, n.S = !0, yt(n, e)
            }

            function qn(e) {
                null != e.v && (x.clearTimeout(e.v), e.v = null)
            }

            function jn(e, t) {
                var n, r, i, s = null;
                if (e.g == t) {
                    qn(e), Bn(e), e.g = null;
                    var a = 2
                } else {
                    if (!Zt(e.i, t)) return;
                    s = t.F, tn(e.i, t), a = 1
                }
                if (0 != e.H)
                    if (t.i) 1 == a ? (s = t.u ? t.u.length : 0, t = Date.now() - t.G, n = e.C, Ce(a = He(), new et(a, s)), Mn(e)) : Fn(e);
                    else if (3 == (n = t.s) || 0 == n && 0 < t.ca || (1 != a || (i = t, Xt((r = e).i) >= r.i.j - (r.m ? 1 : 0) || (r.m ? (r.j = i.F.concat(r.j), 0) : 1 == r.H || 2 == r.H || r.C >= (r.cb ? 0 : r.eb) || (r.m = tt(M(r.Na, r, i), Gn(r, r.C)), r.C++, 0)))) && (2 != a || !Vn(e))) switch (s && 0 < s.length && (t = e.i, t.i = t.i.concat(s)), n) {
                    case 1:
                        zn(e, 5);
                        break;
                    case 4:
                        zn(e, 10);
                        break;
                    case 3:
                        zn(e, 6);
                        break;
                    default:
                        zn(e, 2)
                }
            }

            function Gn(e, t) {
                let n = e.ab + Math.floor(Math.random() * e.hb);
                return e.isActive() || (n *= 2), n * t
            }

            function zn(e, t) {
                var n, r;
                e.l.info("Error code " + t), 2 == t ? (n = null, e.h && (n = null), r = M(e.pb, e), n || (n = new Dt("//www.google.com/images/cleardot.gif"), x.location && "http" == x.location.protocol || Nt(n, "https"), Ot(n)), function(e, t) {
                    var n = new Ke;
                    if (x.Image) {
                        const r = new Image;
                        r.onload = O(on, n, r, "TestLoadImage: loaded", !0, t), r.onerror = O(on, n, r, "TestLoadImage: error", !1, t), r.onabort = O(on, n, r, "TestLoadImage: abort", !1, t), r.ontimeout = O(on, n, r, "TestLoadImage: timeout", !1, t), x.setTimeout(function() {
                            r.ontimeout && r.ontimeout()
                        }, 1e4), r.src = e
                    } else t(!1)
                }(n.toString(), r)) : Ze(2), e.H = 0, e.h && e.h.za(t), Kn(e), Rn(e)
            }

            function Kn(e) {
                var t;
                e.H = 0, e.ma = [], e.h && (0 == (t = nn(e.i)).length && 0 == e.j.length || (B(e.ma, t), B(e.ma, e.j), e.i.i.length = 0, V(e.j), e.j.length = 0), e.h.ya())
            }

            function $n(e, t, n) {
                var r, i, s = n instanceof Dt ? At(n) : new Dt(n);
                return "" != s.g ? (t && (s.g = t + "." + s.g), kt(s, s.m)) : (s = (r = x.location).protocol, t = t ? t + "." + r.hostname : r.hostname, r = +r.port, i = new Dt(null), s && Nt(i, s), t && (i.g = t), r && kt(i, r), n && (i.l = n), s = i), n = e.F, t = e.Da, n && t && Mt(s, n, t), Mt(s, "VER", e.ra), Ln(e, s), s
            }

            function Qn(e, t, n) {
                if (t && !e.J) throw Error("Can't create secondary domain capable XhrIo object.");
                return (t = e.Ha && !e.va ? new mn(new un({
                    ob: n
                })) : new mn(e.va)).Oa(e.J), t
            }

            function Wn() {}

            function Hn() {
                if (W && !(10 <= Number(ne))) throw Error("Environmental error: no available transport.")
            }

            function Yn(e, t) {
                xe.call(this), this.g = new An(t), this.l = e, this.h = t && t.messageUrlParams || null, e = t && t.messageHeaders || null, t && t.clientProtocolHeaderRequired && (e ? e["X-Client-Protocol"] = "webchannel" : e = {
                    "X-Client-Protocol": "webchannel"
                }), this.g.s = e, e = t && t.initMessageHeaders || null, t && t.messageContentType && (e ? e["X-WebChannel-Content-Type"] = t.messageContentType : e = {
                    "X-WebChannel-Content-Type": t.messageContentType
                }), t && t.Ca && (e ? e["X-WebChannel-Client-Profile"] = t.Ca : e = {
                    "X-WebChannel-Client-Profile": t.Ca
                }), this.g.U = e, (e = t && t.cc) && !j(e) && (this.g.o = e), this.A = t && t.supportsCrossDomainXhr || !1, this.v = t && t.sendRawJson || !1, (t = t && t.httpSessionIdParam) && !j(t) && (this.g.F = t, null !== (e = this.h) && t in e && (t in (e = this.h) && delete e[t])), this.j = new Zn(this)
            }

            function Jn(e) {
                ot.call(this), e.__headers__ && (this.headers = e.__headers__, this.statusCode = e.__status__, delete e.__headers__, delete e.__status__);
                var t = e.__sm__;
                if (t) {
                    e: {
                        for (const n in t) {
                            e = n;
                            break e
                        }
                        e = void 0
                    }(this.i = e) && (e = this.i, t = null !== t && e in t ? t[e] : void 0),
                    this.data = t
                }
                else this.data = e
            }

            function Xn() {
                ut.call(this), this.status = 1
            }

            function Zn(e) {
                this.g = e
            }

            function er() {
                this.blockSize = -1, this.blockSize = 64, this.g = Array(4), this.m = Array(this.blockSize), this.i = this.h = 0, this.reset()
            }

            function tr(e, t, n) {
                n = n || 0;
                var r = Array(16);
                if ("string" == typeof t)
                    for (var i = 0; i < 16; ++i) r[i] = t.charCodeAt(n++) | t.charCodeAt(n++) << 8 | t.charCodeAt(n++) << 16 | t.charCodeAt(n++) << 24;
                else
                    for (i = 0; i < 16; ++i) r[i] = t[n++] | t[n++] << 8 | t[n++] << 16 | t[n++] << 24;
                t = e.g[0], n = e.g[1];
                var i = e.g[2],
                    s = e.g[3],
                    a = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = n + ((a = t + (s ^ n & (i ^ s)) + r[0] + 3614090360 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[1] + 3905402710 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[2] + 606105819 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[3] + 3250441966 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (s ^ n & (i ^ s)) + r[4] + 4118548399 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[5] + 1200080426 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[6] + 2821735955 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[7] + 4249261313 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (s ^ n & (i ^ s)) + r[8] + 1770035416 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[9] + 2336552879 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[10] + 4294925233 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[11] + 2304563134 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (s ^ n & (i ^ s)) + r[12] + 1804603682 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[13] + 4254626195 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[14] + 2792965006 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[15] + 1236535329 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (i ^ s & (n ^ i)) + r[1] + 4129170786 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[6] + 3225465664 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[11] + 643717713 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[0] + 3921069994 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (i ^ s & (n ^ i)) + r[5] + 3593408605 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[10] + 38016083 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[15] + 3634488961 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[4] + 3889429448 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (i ^ s & (n ^ i)) + r[9] + 568446438 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[14] + 3275163606 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[3] + 4107603335 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[8] + 1163531501 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (i ^ s & (n ^ i)) + r[13] + 2850285829 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[2] + 4243563512 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[7] + 1735328473 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[12] + 2368359562 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (n ^ i ^ s) + r[5] + 4294588738 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[8] + 2272392833 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[11] + 1839030562 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[14] + 4259657740 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (n ^ i ^ s) + r[1] + 2763975236 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[4] + 1272893353 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[7] + 4139469664 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[10] + 3200236656 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (n ^ i ^ s) + r[13] + 681279174 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[0] + 3936430074 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[3] + 3572445317 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[6] + 76029189 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (n ^ i ^ s) + r[9] + 3654602809 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[12] + 3873151461 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[15] + 530742520 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[2] + 3299628645 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (i ^ (n | ~s)) + r[0] + 4096336452 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[7] + 1126891415 & 4294967295) << 10 & 4294967295 | a >>> 22)) + ((a = i + (t ^ (s | ~n)) + r[14] + 2878612391 & 4294967295) << 15 & 4294967295 | a >>> 17)) + ((a = n + (s ^ (i | ~t)) + r[5] + 4237533241 & 4294967295) << 21 & 4294967295 | a >>> 11)) + ((a = t + (i ^ (n | ~s)) + r[12] + 1700485571 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[3] + 2399980690 & 4294967295) << 10 & 4294967295 | a >>> 22)) + ((a = i + (t ^ (s | ~n)) + r[10] + 4293915773 & 4294967295) << 15 & 4294967295 | a >>> 17)) + ((a = n + (s ^ (i | ~t)) + r[1] + 2240044497 & 4294967295) << 21 & 4294967295 | a >>> 11)) + ((a = t + (i ^ (n | ~s)) + r[8] + 1873313359 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[15] + 4264355552 & 4294967295) << 10 & 4294967295 | a >>> 22)) + ((a = i + (t ^ (s | ~n)) + r[6] + 2734768916 & 4294967295) << 15 & 4294967295 | a >>> 17)) + ((a = n + (s ^ (i | ~t)) + r[13] + 1309151649 & 4294967295) << 21 & 4294967295 | a >>> 11)) + ((s = (t = n + ((a = t + (i ^ (n | ~s)) + r[4] + 4149444226 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[11] + 3174756917 & 4294967295) << 10 & 4294967295 | a >>> 22)) ^ ((i = s + ((a = i + (t ^ (s | ~n)) + r[2] + 718787259 & 4294967295) << 15 & 4294967295 | a >>> 17)) | ~t)) + r[9] + 3951481745 & 4294967295;
                e.g[0] = e.g[0] + t & 4294967295, e.g[1] = e.g[1] + (i + (a << 21 & 4294967295 | a >>> 11)) & 4294967295, e.g[2] = e.g[2] + i & 4294967295, e.g[3] = e.g[3] + s & 4294967295
            }

            function nr(e, t) {
                this.h = t;
                for (var n = [], r = !0, i = e.length - 1; 0 <= i; i--) {
                    var s = 0 | e[i];
                    r && s == t || (n[i] = s, r = !1)
                }
                this.g = n
            }(E = mn.prototype).Oa = function(e) {
                this.M = e
            }, E.ha = function(e, t, n, r) {
                if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.I + "; newUri=" + e);
                t = t ? t.toUpperCase() : "GET", this.I = e, this.j = "", this.m = 0, this.F = !1, this.h = !0, this.g = (this.u || dt).g(), this.C = this.u ? st(this.u) : st(dt), this.g.onreadystatechange = M(this.La, this);
                try {
                    this.G = !0, this.g.open(t, String(e), !0), this.G = !1
                } catch (e) {
                    return void wn(this, e)
                }
                if (e = n || "", n = new Map(this.headers), r)
                    if (Object.getPrototypeOf(r) === Object.prototype)
                        for (var i in r) n.set(i, r[i]);
                    else {
                        if ("function" != typeof r.keys || "function" != typeof r.get) throw Error("Unknown input type for opt_headers: " + String(r));
                        for (const u of r.keys()) n.set(u, r.get(u))
                    }
                r = Array.from(n.keys()).find(e => "content-type" == e.toLowerCase()), i = x.FormData && e instanceof x.FormData, 0 <= F(vn, t) && !r && !i && n.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                for (var [s, a] of n) this.g.setRequestHeader(s, a);
                this.K && (this.g.responseType = this.K), "withCredentials" in this.g && this.g.withCredentials !== this.M && (this.g.withCredentials = this.M);
                try {
                    En(this), 0 < this.B && ((this.L = (o = this.g, W && "number" == typeof o.timeout && void 0 !== o.ontimeout)) ? (this.g.timeout = this.B, this.g.ontimeout = M(this.ua, this)) : this.A = Be(this.ua, this.B, this)), this.v = !0, this.g.send(e), this.v = !1
                } catch (e) {
                    wn(this, e)
                }
                var o
            }, E.ua = function() {
                void 0 !== S && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, Ce(this, "timeout"), this.abort(8))
            }, E.abort = function(e) {
                this.g && this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1, this.m = e || 7, Ce(this, "complete"), Ce(this, "abort"), In(this))
            }, E.N = function() {
                this.g && (this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1), In(this, !0)), mn.$.N.call(this)
            }, E.La = function() {
                this.s || (this.G || this.v || this.l ? bn(this) : this.kb())
            }, E.kb = function() {
                bn(this)
            }, E.isActive = function() {
                return !!this.g
            }, E.da = function() {
                try {
                    return 2 < Tn(this) ? this.g.status : -1
                } catch (e) {
                    return -1
                }
            }, E.ja = function() {
                try {
                    return this.g ? this.g.responseText : ""
                } catch (e) {
                    return ""
                }
            }, E.Wa = function(e) {
                if (this.g) {
                    var t = this.g.responseText;
                    return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), gn(t)
                }
            }, E.Ia = function() {
                return this.m
            }, E.Sa = function() {
                return "string" == typeof this.j ? this.j : String(this.j)
            }, (E = An.prototype).ra = 8, E.H = 1, E.Na = function(t) {
                if (this.m)
                    if (this.m = null, 1 == this.H) {
                        if (!t) {
                            this.W = Math.floor(1e5 * Math.random()), t = this.W++;
                            const s = new ht(this, this.l, t);
                            let e = this.s;
                            if (this.U && (e ? (e = he(e), de(e, this.U)) : e = this.U), null !== this.o || this.O || (s.I = e, e = null), this.P) e: {
                                for (var n = 0, r = 0; r < this.j.length; r++) {
                                    var i = this.j[r];
                                    if ("__data__" in i.map && "string" == typeof(i = i.map.__data__) ? i = i.length : i = void 0, void 0 === i) break;
                                    if (4096 < (n += i)) {
                                        n = r;
                                        break e
                                    }
                                    if (4096 === n || r === this.j.length - 1) {
                                        n = r + 1;
                                        break e
                                    }
                                }
                                n = 1e3
                            }
                            else n = 1e3;
                            n = Pn(this, s, n), Mt(r = At(this.I), "RID", t), Mt(r, "CVER", 22), this.F && Mt(r, "X-HTTP-Session-Id", this.F), Ln(this, r), e && (this.O ? n = "headers=" + encodeURIComponent(String(xn(e))) + "&" + n : this.o && Cn(r, this.o, e)), en(this.i, s), this.bb && Mt(r, "TYPE", "init"), this.P ? (Mt(r, "$req", n), Mt(r, "SID", "null"), s.aa = !0, pt(s, r, null)) : pt(s, r, n), this.H = 2
                        }
                    } else 3 == this.H && (t ? On(this, t) : 0 == this.j.length || Jt(this.i) || On(this))
            }, E.Ma = function() {
                var e;
                this.u = null, Un(this), this.ca && !(this.M || null == this.g || this.S <= 0) && (e = 2 * this.S, this.l.info("BP detection timer enabled: " + e), this.B = tt(M(this.jb, this), e))
            }, E.jb = function() {
                this.B && (this.B = null, this.l.info("BP detection timeout reached."), this.l.info("Buffering proxy detected and switch to long-polling!"), this.G = !1, this.M = !0, Ze(10), kn(this), Un(this))
            }, E.ib = function() {
                null != this.v && (this.v = null, kn(this), Vn(this), Ze(19))
            }, E.pb = function(e) {
                e ? (this.l.info("Successfully pinged google.com"), Ze(2)) : (this.l.info("Failed to ping google.com"), Ze(1))
            }, E.isActive = function() {
                return !!this.h && this.h.isActive(this)
            }, (E = Wn.prototype).Ba = function() {}, E.Aa = function() {}, E.za = function() {}, E.ya = function() {}, E.isActive = function() {
                return !0
            }, E.Va = function() {}, Hn.prototype.g = function(e, t) {
                return new Yn(e, t)
            }, L(Yn, xe), Yn.prototype.m = function() {
                this.g.h = this.j, this.A && (this.g.J = !0);
                var e = this.g,
                    t = this.l,
                    n = this.h || void 0;
                Ze(0), e.Y = t, e.na = n || {}, e.G = e.aa, e.I = $n(e, null, e.Y), Mn(e)
            }, Yn.prototype.close = function() {
                Nn(this.g)
            }, Yn.prototype.u = function(e) {
                var t, n = this.g;
                "string" == typeof e ? ((t = {}).__data__ = e, e = t) : this.v && ((t = {}).__data__ = Ae(e), e = t), n.j.push(new Ht(n.fb++, e)), 3 == n.H && Mn(n)
            }, Yn.prototype.N = function() {
                this.g.h = null, delete this.j, Nn(this.g), delete this.g, Yn.$.N.call(this)
            }, L(Jn, ot), L(Xn, ut), L(Zn, Wn), Zn.prototype.Ba = function() {
                Ce(this.g, "a")
            }, Zn.prototype.Aa = function(e) {
                Ce(this.g, new Jn(e))
            }, Zn.prototype.za = function(e) {
                Ce(this.g, new Xn)
            }, Zn.prototype.ya = function() {
                Ce(this.g, "b")
            }, L(er, function() {
                this.blockSize = -1
            }), er.prototype.reset = function() {
                this.g[0] = 1732584193, this.g[1] = 4023233417, this.g[2] = 2562383102, this.g[3] = 271733878, this.i = this.h = 0
            }, er.prototype.j = function(e, t) {
                for (var n = (t = void 0 === t ? e.length : t) - this.blockSize, r = this.m, i = this.h, s = 0; s < t;) {
                    if (0 == i)
                        for (; s <= n;) tr(this, e, s), s += this.blockSize;
                    if ("string" == typeof e) {
                        for (; s < t;)
                            if (r[i++] = e.charCodeAt(s++), i == this.blockSize) {
                                tr(this, r), i = 0;
                                break
                            }
                    } else
                        for (; s < t;)
                            if (r[i++] = e[s++], i == this.blockSize) {
                                tr(this, r), i = 0;
                                break
                            }
                }
                this.h = i, this.i += t
            }, er.prototype.l = function() {
                var e = Array((this.h < 56 ? this.blockSize : 2 * this.blockSize) - this.h);
                e[0] = 128;
                for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
                for (var n = 8 * this.i, t = e.length - 8; t < e.length; ++t) e[t] = 255 & n, n /= 256;
                for (this.j(e), e = Array(16), t = n = 0; t < 4; ++t)
                    for (var r = 0; r < 32; r += 8) e[n++] = this.g[t] >>> r & 255;
                return e
            };
            var rr = {};

            function ir(e) {
                return -128 <= e && e < 128 ? (t = e, n = function(e) {
                    return new nr([0 | e], e < 0 ? -1 : 0)
                }, r = rr, Object.prototype.hasOwnProperty.call(r, t) ? r[t] : r[t] = n(t)) : new nr([0 | e], e < 0 ? -1 : 0);
                var t, n, r
            }

            function sr(e) {
                if (isNaN(e) || !isFinite(e)) return or;
                if (e < 0) return dr(sr(-e));
                for (var t = [], n = 1, r = 0; n <= e; r++) t[r] = e / n | 0, n *= ar;
                return new nr(t, 0)
            }
            var ar = 4294967296,
                or = ir(0),
                ur = ir(1),
                cr = ir(16777216);

            function hr(e) {
                if (0 == e.h) {
                    for (var t = 0; t < e.g.length; t++)
                        if (0 != e.g[t]) return;
                    return 1
                }
            }

            function lr(e) {
                return -1 == e.h
            }

            function dr(e) {
                for (var t = e.g.length, n = [], r = 0; r < t; r++) n[r] = ~e.g[r];
                return new nr(n, ~e.h).add(ur)
            }

            function fr(e, t) {
                return e.add(dr(t))
            }

            function gr(e, t) {
                for (;
                    (65535 & e[t]) != e[t];) e[t + 1] += e[t] >>> 16, e[t] &= 65535, t++
            }

            function mr(e, t) {
                this.g = e, this.h = t
            }

            function pr(e, t) {
                if (hr(t)) throw Error("division by zero");
                if (hr(e)) return new mr(or, or);
                if (lr(e)) return t = pr(dr(e), t), new mr(dr(t.g), dr(t.h));
                if (lr(t)) return t = pr(e, dr(t)), new mr(dr(t.g), t.h);
                if (30 < e.g.length) {
                    if (lr(e) || lr(t)) throw Error("slowDivide_ only works with positive integers.");
                    for (var n = ur, r = t; r.X(e) <= 0;) n = yr(n), r = yr(r);
                    for (var i = vr(n, 1), s = vr(r, 1), r = vr(r, 2), n = vr(n, 2); !hr(r);) {
                        var a = s.add(r);
                        a.X(e) <= 0 && (i = i.add(n), s = a), r = vr(r, 1), n = vr(n, 1)
                    }
                    return t = fr(e, i.R(t)), new mr(i, t)
                }
                for (i = or; 0 <= e.X(t);) {
                    for (n = Math.max(1, Math.floor(e.ea() / t.ea())), r = (r = Math.ceil(Math.log(n) / Math.LN2)) <= 48 ? 1 : Math.pow(2, r - 48), a = (s = sr(n)).R(t); lr(a) || 0 < a.X(e);) a = (s = sr(n -= r)).R(t);
                    hr(s) && (s = ur), i = i.add(s), e = fr(e, a)
                }
                return new mr(i, e)
            }

            function yr(e) {
                for (var t = e.g.length + 1, n = [], r = 0; r < t; r++) n[r] = e.D(r) << 1 | e.D(r - 1) >>> 31;
                return new nr(n, e.h)
            }

            function vr(e, t) {
                var n = t >> 5;
                t %= 32;
                for (var r = e.g.length - n, i = [], s = 0; s < r; s++) i[s] = 0 < t ? e.D(s + n) >>> t | e.D(s + n + 1) << 32 - t : e.D(s + n);
                return new nr(i, e.h)
            }(E = nr.prototype).ea = function() {
                if (lr(this)) return -dr(this).ea();
                for (var e = 0, t = 1, n = 0; n < this.g.length; n++) {
                    var r = this.D(n);
                    e += (0 <= r ? r : ar + r) * t, t *= ar
                }
                return e
            }, E.toString = function(e) {
                if ((e = e || 10) < 2 || 36 < e) throw Error("radix out of range: " + e);
                if (hr(this)) return "0";
                if (lr(this)) return "-" + dr(this).toString(e);
                for (var t = sr(Math.pow(e, 6)), n = this, r = "";;) {
                    var i = pr(n, t).g,
                        s = ((0 < (n = fr(n, i.R(t))).g.length ? n.g[0] : n.h) >>> 0).toString(e);
                    if (hr(n = i)) return s + r;
                    for (; s.length < 6;) s = "0" + s;
                    r = s + r
                }
            }, E.D = function(e) {
                return e < 0 ? 0 : e < this.g.length ? this.g[e] : this.h
            }, E.X = function(e) {
                return lr(e = fr(this, e)) ? -1 : hr(e) ? 0 : 1
            }, E.abs = function() {
                return lr(this) ? dr(this) : this
            }, E.add = function(e) {
                for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0, i = 0; i <= t; i++) {
                    var s = r + (65535 & this.D(i)) + (65535 & e.D(i)),
                        a = (s >>> 16) + (this.D(i) >>> 16) + (e.D(i) >>> 16),
                        r = a >>> 16;
                    s &= 65535, a &= 65535, n[i] = a << 16 | s
                }
                return new nr(n, -2147483648 & n[n.length - 1] ? -1 : 0)
            }, E.R = function(e) {
                if (hr(this) || hr(e)) return or;
                if (lr(this)) return lr(e) ? dr(this).R(dr(e)) : dr(dr(this).R(e));
                if (lr(e)) return dr(this.R(dr(e)));
                if (this.X(cr) < 0 && e.X(cr) < 0) return sr(this.ea() * e.ea());
                for (var t = this.g.length + e.g.length, n = [], r = 0; r < 2 * t; r++) n[r] = 0;
                for (r = 0; r < this.g.length; r++)
                    for (var i = 0; i < e.g.length; i++) {
                        var s = this.D(r) >>> 16,
                            a = 65535 & this.D(r),
                            o = e.D(i) >>> 16,
                            u = 65535 & e.D(i);
                        n[2 * r + 2 * i] += a * u, gr(n, 2 * r + 2 * i), n[2 * r + 2 * i + 1] += s * u, gr(n, 2 * r + 2 * i + 1), n[2 * r + 2 * i + 1] += a * o, gr(n, 2 * r + 2 * i + 1), n[2 * r + 2 * i + 2] += s * o, gr(n, 2 * r + 2 * i + 2)
                    }
                for (r = 0; r < t; r++) n[r] = n[2 * r + 1] << 16 | n[2 * r];
                for (r = t; r < 2 * t; r++) n[r] = 0;
                return new nr(n, 0)
            }, E.gb = function(e) {
                return pr(this, e).h
            }, E.and = function(e) {
                for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.D(r) & e.D(r);
                return new nr(n, this.h & e.h)
            }, E.or = function(e) {
                for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.D(r) | e.D(r);
                return new nr(n, this.h | e.h)
            }, E.xor = function(e) {
                for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.D(r) ^ e.D(r);
                return new nr(n, this.h ^ e.h)
            }, Hn.prototype.createWebChannel = Hn.prototype.g, Yn.prototype.send = Yn.prototype.u, Yn.prototype.open = Yn.prototype.m, nt.NO_ERROR = 0, nt.TIMEOUT = 8, nt.HTTP_ERROR = 6, rt.COMPLETE = "complete", (at.EventType = T).OPEN = "a", T.CLOSE = "b", T.ERROR = "c", T.MESSAGE = "d", xe.prototype.listen = xe.prototype.O, mn.prototype.listenOnce = mn.prototype.P, mn.prototype.getLastError = mn.prototype.Sa, mn.prototype.getLastErrorCode = mn.prototype.Ia, mn.prototype.getStatus = mn.prototype.da, mn.prototype.getResponseJson = mn.prototype.Wa, mn.prototype.getResponseText = mn.prototype.ja, mn.prototype.send = mn.prototype.ha, mn.prototype.setWithCredentials = mn.prototype.Oa, er.prototype.digest = er.prototype.l, er.prototype.update = er.prototype.j, nr.prototype.multiply = nr.prototype.R, nr.prototype.modulo = nr.prototype.gb, nr.prototype.compare = nr.prototype.X, nr.prototype.toNumber = nr.prototype.ea, nr.prototype.getBits = nr.prototype.D, nr.fromNumber = sr, nr.fromString = function e(t, n) {
                if (0 == t.length) throw Error("number format error: empty string");
                if ((n = n || 10) < 2 || 36 < n) throw Error("radix out of range: " + n);
                if ("-" == t.charAt(0)) return dr(e(t.substring(1), n));
                if (0 <= t.indexOf("-")) throw Error('number format error: interior "-" character');
                for (var r = sr(Math.pow(n, 8)), i = or, s = 0; s < t.length; s += 8) var a = Math.min(8, t.length - s),
                    o = parseInt(t.substring(s, s + a), n),
                    i = a < 8 ? (a = sr(Math.pow(n, a)), i.R(a).add(sr(o))) : (i = i.R(r)).add(sr(o));
                return i
            };
            var wr, _r, br, Ir = He,
                Er = nt,
                Tr = rt,
                Sr = Qe,
                xr = 10,
                Cr = 11,
                Dr = at,
                Ar = mn,
                Nr = er,
                kr = nr;
            const Rr = "@firebase/firestore";
            class Mr {
                constructor(e) {
                    this.uid = e
                }
                isAuthenticated() {
                    return null != this.uid
                }
                toKey() {
                    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user"
                }
                isEqual(e) {
                    return e.uid === this.uid
                }
            }
            Mr.UNAUTHENTICATED = new Mr(null), Mr.GOOGLE_CREDENTIALS = new Mr("google-credentials-uid"), Mr.FIRST_PARTY = new Mr("first-party-uid"), Mr.MOCK_USER = new Mr("mock-user");
            let Or = "10.9.0";
            const Lr = new class {
                constructor(e) {
                    this.name = e, this._logLevel = _, this._logHandler = I, this._userLogHandler = null
                }
                get logLevel() {
                    return this._logLevel
                }
                set logLevel(e) {
                    if (!(e in l)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
                    this._logLevel = e
                }
                setLogLevel(e) {
                    this._logLevel = "string" == typeof e ? w[e] : e
                }
                get logHandler() {
                    return this._logHandler
                }
                set logHandler(e) {
                    if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
                    this._logHandler = e
                }
                get userLogHandler() {
                    return this._userLogHandler
                }
                set userLogHandler(e) {
                    this._userLogHandler = e
                }
                debug(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.DEBUG, ...e), this._logHandler(this, l.DEBUG, ...e)
                }
                log(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.VERBOSE, ...e), this._logHandler(this, l.VERBOSE, ...e)
                }
                info(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.INFO, ...e), this._logHandler(this, l.INFO, ...e)
                }
                warn(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.WARN, ...e), this._logHandler(this, l.WARN, ...e)
                }
                error(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.ERROR, ...e), this._logHandler(this, l.ERROR, ...e)
                }
            }("@firebase/firestore");

            function Pr() {
                return Lr.logLevel
            }

            function Fr(e, ...t) {
                var n;
                Lr.logLevel <= l.DEBUG && (n = t.map(Ur), Lr.debug(`Firestore (${Or}): ${e}`, ...n))
            }

            function Vr(e, ...t) {
                var n;
                Lr.logLevel <= l.ERROR && (n = t.map(Ur), Lr.error(`Firestore (${Or}): ${e}`, ...n))
            }

            function Br(e, ...t) {
                var n;
                Lr.logLevel <= l.WARN && (n = t.map(Ur), Lr.warn(`Firestore (${Or}): ${e}`, ...n))
            }

            function Ur(t) {
                if ("string" == typeof t) return t;
                try {
                    return JSON.stringify(t)
                } catch (e) {
                    return t
                }
            }

            function qr(e = "Unexpected state") {
                var t = `FIRESTORE (${Or}) INTERNAL ASSERTION FAILED: ` + e;
                throw Vr(t), new Error(t)
            }

            function jr(e) {
                e || qr()
            }
            const Gr = {
                OK: "ok",
                CANCELLED: "cancelled",
                UNKNOWN: "unknown",
                INVALID_ARGUMENT: "invalid-argument",
                DEADLINE_EXCEEDED: "deadline-exceeded",
                NOT_FOUND: "not-found",
                ALREADY_EXISTS: "already-exists",
                PERMISSION_DENIED: "permission-denied",
                UNAUTHENTICATED: "unauthenticated",
                RESOURCE_EXHAUSTED: "resource-exhausted",
                FAILED_PRECONDITION: "failed-precondition",
                ABORTED: "aborted",
                OUT_OF_RANGE: "out-of-range",
                UNIMPLEMENTED: "unimplemented",
                INTERNAL: "internal",
                UNAVAILABLE: "unavailable",
                DATA_LOSS: "data-loss"
            };
            class zr extends d {
                constructor(e, t) {
                    super(e, t), this.code = e, this.message = t, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`
                }
            }
            class Kr {
                constructor() {
                    this.promise = new Promise((e, t) => {
                        this.resolve = e, this.reject = t
                    })
                }
            }
            class $r {
                constructor(e, t) {
                    this.user = t, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", `Bearer ${e}`)
                }
            }
            class Qr {
                getToken() {
                    return Promise.resolve(null)
                }
                invalidateToken() {}
                start(e, t) {
                    e.enqueueRetryable(() => t(Mr.UNAUTHENTICATED))
                }
                shutdown() {}
            }
            class Wr {
                constructor(e) {
                    this.token = e, this.changeListener = null
                }
                getToken() {
                    return Promise.resolve(this.token)
                }
                invalidateToken() {}
                start(e, t) {
                    this.changeListener = t, e.enqueueRetryable(() => t(this.token.user))
                }
                shutdown() {
                    this.changeListener = null
                }
            }
            class Hr {
                constructor(e) {
                    this.t = e, this.currentUser = Mr.UNAUTHENTICATED, this.i = 0, this.forceRefresh = !1, this.auth = null
                }
                start(t, n) {
                    let r = this.i;
                    const i = e => this.i !== r ? (r = this.i, n(e)) : Promise.resolve();
                    let s = new Kr;
                    this.o = () => {
                        this.i++, this.currentUser = this.u(), s.resolve(), s = new Kr, t.enqueueRetryable(() => i(this.currentUser))
                    };
                    const a = () => {
                            const e = s;
                            t.enqueueRetryable(async () => {
                                await e.promise, await i(this.currentUser)
                            })
                        },
                        o = e => {
                            Fr("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = e, this.auth.addAuthTokenListener(this.o), a()
                        };
                    this.t.onInit(e => o(e)), setTimeout(() => {
                        var e;
                        this.auth || ((e = this.t.getImmediate({
                            optional: !0
                        })) ? o(e) : (Fr("FirebaseAuthCredentialsProvider", "Auth not yet detected"), s.resolve(), s = new Kr))
                    }, 0), a()
                }
                getToken() {
                    const t = this.i,
                        e = this.forceRefresh;
                    return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then(e => this.i !== t ? (Fr("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : e ? (jr("string" == typeof e.accessToken), new $r(e.accessToken, this.currentUser)) : null) : Promise.resolve(null)
                }
                invalidateToken() {
                    this.forceRefresh = !0
                }
                shutdown() {
                    this.auth && this.auth.removeAuthTokenListener(this.o)
                }
                u() {
                    var e = this.auth && this.auth.getUid();
                    return jr(null === e || "string" == typeof e), new Mr(e)
                }
            }
            class Yr {
                constructor(e, t, n) {
                    this.l = e, this.h = t, this.P = n, this.type = "FirstParty", this.user = Mr.FIRST_PARTY, this.I = new Map
                }
                T() {
                    return this.P ? this.P() : null
                }
                get headers() {
                    this.I.set("X-Goog-AuthUser", this.l);
                    var e = this.T();
                    return e && this.I.set("Authorization", e), this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h), this.I
                }
            }
            class Jr {
                constructor(e, t, n) {
                    this.l = e, this.h = t, this.P = n
                }
                getToken() {
                    return Promise.resolve(new Yr(this.l, this.h, this.P))
                }
                start(e, t) {
                    e.enqueueRetryable(() => t(Mr.FIRST_PARTY))
                }
                shutdown() {}
                invalidateToken() {}
            }
            class Xr {
                constructor(e) {
                    this.value = e, this.type = "AppCheck", this.headers = new Map, e && 0 < e.length && this.headers.set("x-firebase-appcheck", this.value)
                }
            }
            class Zr {
                constructor(e) {
                    this.A = e, this.forceRefresh = !1, this.appCheck = null, this.R = null
                }
                start(t, n) {
                    const r = e => {
                        null != e.error && Fr("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);
                        var t = e.token !== this.R;
                        return this.R = e.token, Fr("FirebaseAppCheckTokenProvider", `Received ${t?"new":"existing"} token.`), t ? n(e.token) : Promise.resolve()
                    };
                    this.o = e => {
                        t.enqueueRetryable(() => r(e))
                    };
                    const i = e => {
                        Fr("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = e, this.appCheck.addTokenListener(this.o)
                    };
                    this.A.onInit(e => i(e)), setTimeout(() => {
                        var e;
                        this.appCheck || ((e = this.A.getImmediate({
                            optional: !0
                        })) ? i(e) : Fr("FirebaseAppCheckTokenProvider", "AppCheck not yet detected"))
                    }, 0)
                }
                getToken() {
                    var e = this.forceRefresh;
                    return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then(e => e ? (jr("string" == typeof e.token), this.R = e.token, new Xr(e.token)) : null) : Promise.resolve(null)
                }
                invalidateToken() {
                    this.forceRefresh = !0
                }
                shutdown() {
                    this.appCheck && this.appCheck.removeTokenListener(this.o)
                }
            }
            class ei {
                static newId() {
                    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                        n = Math.floor(256 / t.length) * t.length;
                    let r = "";
                    for (; r.length < 20;) {
                        var i = function(t) {
                            const n = "undefined" != typeof self && (self.crypto || self.msCrypto),
                                r = new Uint8Array(t);
                            if (n && "function" == typeof n.getRandomValues) n.getRandomValues(r);
                            else
                                for (let e = 0; e < t; e++) r[e] = Math.floor(256 * Math.random());
                            return r
                        }(40);
                        for (let e = 0; e < i.length; ++e) r.length < 20 && i[e] < n && (r += t.charAt(i[e] % t.length))
                    }
                    return r
                }
            }

            function ti(e, t) {
                return e < t ? -1 : t < e ? 1 : 0
            }

            function ni(e, n, r) {
                return e.length === n.length && e.every((e, t) => r(e, n[t]))
            }

            function ri(e) {
                return e + "\0"
            }
            class ii {
                constructor(e, t) {
                    if (this.seconds = e, (this.nanoseconds = t) < 0) throw new zr(Gr.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
                    if (1e9 <= t) throw new zr(Gr.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
                    if (e < -62135596800) throw new zr(Gr.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
                    if (253402300800 <= e) throw new zr(Gr.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e)
                }
                static now() {
                    return ii.fromMillis(Date.now())
                }
                static fromDate(e) {
                    return ii.fromMillis(e.getTime())
                }
                static fromMillis(e) {
                    var t = Math.floor(e / 1e3),
                        n = Math.floor(1e6 * (e - 1e3 * t));
                    return new ii(t, n)
                }
                toDate() {
                    return new Date(this.toMillis())
                }
                toMillis() {
                    return 1e3 * this.seconds + this.nanoseconds / 1e6
                }
                _compareTo(e) {
                    return this.seconds === e.seconds ? ti(this.nanoseconds, e.nanoseconds) : ti(this.seconds, e.seconds)
                }
                isEqual(e) {
                    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
                }
                toString() {
                    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")"
                }
                toJSON() {
                    return {
                        seconds: this.seconds,
                        nanoseconds: this.nanoseconds
                    }
                }
                valueOf() {
                    var e = this.seconds - -62135596800;
                    return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0")
                }
            }
            class si {
                constructor(e) {
                    this.timestamp = e
                }
                static fromTimestamp(e) {
                    return new si(e)
                }
                static min() {
                    return new si(new ii(0, 0))
                }
                static max() {
                    return new si(new ii(253402300799, 999999999))
                }
                compareTo(e) {
                    return this.timestamp._compareTo(e.timestamp)
                }
                isEqual(e) {
                    return this.timestamp.isEqual(e.timestamp)
                }
                toMicroseconds() {
                    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
                }
                toString() {
                    return "SnapshotVersion(" + this.timestamp.toString() + ")"
                }
                toTimestamp() {
                    return this.timestamp
                }
            }
            class ai {
                constructor(e, t, n) {
                    void 0 === t ? t = 0 : t > e.length && qr(), void 0 === n ? n = e.length - t : n > e.length - t && qr(), this.segments = e, this.offset = t, this.len = n
                }
                get length() {
                    return this.len
                }
                isEqual(e) {
                    return 0 === ai.comparator(this, e)
                }
                child(e) {
                    const t = this.segments.slice(this.offset, this.limit());
                    return e instanceof ai ? e.forEach(e => {
                        t.push(e)
                    }) : t.push(e), this.construct(t)
                }
                limit() {
                    return this.offset + this.length
                }
                popFirst(e) {
                    return this.construct(this.segments, this.offset + (e = void 0 === e ? 1 : e), this.length - e)
                }
                popLast() {
                    return this.construct(this.segments, this.offset, this.length - 1)
                }
                firstSegment() {
                    return this.segments[this.offset]
                }
                lastSegment() {
                    return this.get(this.length - 1)
                }
                get(e) {
                    return this.segments[this.offset + e]
                }
                isEmpty() {
                    return 0 === this.length
                }
                isPrefixOf(e) {
                    if (e.length < this.length) return !1;
                    for (let t = 0; t < this.length; t++)
                        if (this.get(t) !== e.get(t)) return !1;
                    return !0
                }
                isImmediateParentOf(e) {
                    if (this.length + 1 !== e.length) return !1;
                    for (let t = 0; t < this.length; t++)
                        if (this.get(t) !== e.get(t)) return !1;
                    return !0
                }
                forEach(e) {
                    for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t])
                }
                toArray() {
                    return this.segments.slice(this.offset, this.limit())
                }
                static comparator(e, t) {
                    const n = Math.min(e.length, t.length);
                    for (let r = 0; r < n; r++) {
                        const n = e.get(r),
                            i = t.get(r);
                        if (n < i) return -1;
                        if (n > i) return 1
                    }
                    return e.length < t.length ? -1 : e.length > t.length ? 1 : 0
                }
            }
            class oi extends ai {
                construct(e, t, n) {
                    return new oi(e, t, n)
                }
                canonicalString() {
                    return this.toArray().join("/")
                }
                toString() {
                    return this.canonicalString()
                }
                toUriEncodedString() {
                    return this.toArray().map(encodeURIComponent).join("/")
                }
                static fromString(...e) {
                    const t = [];
                    for (const n of e) {
                        if (0 <= n.indexOf("//")) throw new zr(Gr.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
                        t.push(...n.split("/").filter(e => 0 < e.length))
                    }
                    return new oi(t)
                }
                static emptyPath() {
                    return new oi([])
                }
            }
            const ui = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
            class ci extends ai {
                construct(e, t, n) {
                    return new ci(e, t, n)
                }
                static isValidIdentifier(e) {
                    return ui.test(e)
                }
                canonicalString() {
                    return this.toArray().map(e => (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), e = !ci.isValidIdentifier(e) ? "`" + e + "`" : e)).join(".")
                }
                toString() {
                    return this.canonicalString()
                }
                isKeyField() {
                    return 1 === this.length && "__name__" === this.get(0)
                }
                static keyField() {
                    return new ci(["__name__"])
                }
                static fromServerFormat(e) {
                    const t = [];
                    let n = "",
                        r = 0;
                    var i = () => {
                        if (0 === n.length) throw new zr(Gr.INVALID_ARGUMENT, `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                        t.push(n), n = ""
                    };
                    let s = !1;
                    for (; r < e.length;) {
                        const t = e[r];
                        if ("\\" === t) {
                            if (r + 1 === e.length) throw new zr(Gr.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
                            const t = e[r + 1];
                            if ("\\" !== t && "." !== t && "`" !== t) throw new zr(Gr.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
                            n += t, r += 2
                        } else "`" === t ? s = !s : "." !== t || s ? n += t : i(), r++
                    }
                    if (i(), s) throw new zr(Gr.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
                    return new ci(t)
                }
                static emptyPath() {
                    return new ci([])
                }
            }
            class hi {
                constructor(e) {
                    this.path = e
                }
                static fromPath(e) {
                    return new hi(oi.fromString(e))
                }
                static fromName(e) {
                    return new hi(oi.fromString(e).popFirst(5))
                }
                static empty() {
                    return new hi(oi.emptyPath())
                }
                get collectionGroup() {
                    return this.path.popLast().lastSegment()
                }
                hasCollectionId(e) {
                    return 2 <= this.path.length && this.path.get(this.path.length - 2) === e
                }
                getCollectionGroup() {
                    return this.path.get(this.path.length - 2)
                }
                getCollectionPath() {
                    return this.path.popLast()
                }
                isEqual(e) {
                    return null !== e && 0 === oi.comparator(this.path, e.path)
                }
                toString() {
                    return this.path.toString()
                }
                static comparator(e, t) {
                    return oi.comparator(e.path, t.path)
                }
                static isDocumentKey(e) {
                    return e.length % 2 == 0
                }
                static fromSegments(e) {
                    return new hi(new oi(e.slice()))
                }
            }
            class li {
                constructor(e, t, n, r) {
                    this.indexId = e, this.collectionGroup = t, this.fields = n, this.indexState = r
                }
            }

            function di(e) {
                return e.fields.find(e => 2 === e.kind)
            }

            function fi(e) {
                return e.fields.filter(e => 2 !== e.kind)
            }
            li.UNKNOWN_ID = -1;
            class gi {
                constructor(e, t) {
                    this.fieldPath = e, this.kind = t
                }
            }
            class mi {
                constructor(e, t) {
                    this.sequenceNumber = e, this.offset = t
                }
                static empty() {
                    return new mi(0, vi.min())
                }
            }

            function pi(e, t) {
                var n = e.toTimestamp().seconds,
                    r = e.toTimestamp().nanoseconds + 1,
                    r = si.fromTimestamp(1e9 === r ? new ii(n + 1, 0) : new ii(n, r));
                return new vi(r, hi.empty(), t)
            }

            function yi(e) {
                return new vi(e.readTime, e.key, -1)
            }
            class vi {
                constructor(e, t, n) {
                    this.readTime = e, this.documentKey = t, this.largestBatchId = n
                }
                static min() {
                    return new vi(si.min(), hi.empty(), -1)
                }
                static max() {
                    return new vi(si.max(), hi.empty(), -1)
                }
            }

            function wi(e, t) {
                let n = e.readTime.compareTo(t.readTime);
                return 0 !== n ? n : (n = hi.comparator(e.documentKey, t.documentKey), 0 !== n ? n : ti(e.largestBatchId, t.largestBatchId))
            }
            const _i = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
            class bi {
                constructor() {
                    this.onCommittedListeners = []
                }
                addOnCommittedListener(e) {
                    this.onCommittedListeners.push(e)
                }
                raiseOnCommittedEvent() {
                    this.onCommittedListeners.forEach(e => e())
                }
            }
            async function Ii(e) {
                if (e.code !== Gr.FAILED_PRECONDITION || e.message !== _i) throw e;
                Fr("LocalStore", "Unexpectedly lost primary lease")
            }
            class Ei {
                constructor(e) {
                    this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, e(e => {
                        this.isDone = !0, this.result = e, this.nextCallback && this.nextCallback(e)
                    }, e => {
                        this.isDone = !0, this.error = e, this.catchCallback && this.catchCallback(e)
                    })
                } catch (e) {
                    return this.next(void 0, e)
                }
                next(r, i) {
                    return this.callbackAttached && qr(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(i, this.error) : this.wrapSuccess(r, this.result) : new Ei((t, n) => {
                        this.nextCallback = e => {
                            this.wrapSuccess(r, e).next(t, n)
                        }, this.catchCallback = e => {
                            this.wrapFailure(i, e).next(t, n)
                        }
                    })
                }
                toPromise() {
                    return new Promise((e, t) => {
                        this.next(e, t)
                    })
                }
                wrapUserFunction(e) {
                    try {
                        var t = e();
                        return t instanceof Ei ? t : Ei.resolve(t)
                    } catch (e) {
                        return Ei.reject(e)
                    }
                }
                wrapSuccess(e, t) {
                    return e ? this.wrapUserFunction(() => e(t)) : Ei.resolve(t)
                }
                wrapFailure(e, t) {
                    return e ? this.wrapUserFunction(() => e(t)) : Ei.reject(t)
                }
                static resolve(n) {
                    return new Ei((e, t) => {
                        e(n)
                    })
                }
                static reject(n) {
                    return new Ei((e, t) => {
                        t(n)
                    })
                }
                static waitFor(e) {
                    return new Ei((t, n) => {
                        let r = 0,
                            i = 0,
                            s = !1;
                        e.forEach(e => {
                            ++r, e.next(() => {
                                ++i, s && i === r && t()
                            }, e => n(e))
                        }), s = !0, i === r && t()
                    })
                }
                static or(e) {
                    let t = Ei.resolve(!1);
                    for (const n of e) t = t.next(e => e ? Ei.resolve(e) : n());
                    return t
                }
                static forEach(e, n) {
                    const r = [];
                    return e.forEach((e, t) => {
                        r.push(n.call(this, e, t))
                    }), this.waitFor(r)
                }
                static mapArray(o, u) {
                    return new Ei((t, n) => {
                        const r = o.length,
                            i = new Array(r);
                        let s = 0;
                        for (let e = 0; e < r; e++) {
                            const a = e;
                            u(o[a]).next(e => {
                                i[a] = e, ++s, s === r && t(i)
                            }, e => n(e))
                        }
                    })
                }
                static doWhile(r, i) {
                    return new Ei((e, t) => {
                        const n = () => {
                            !0 === r() ? i().next(() => {
                                n()
                            }, t) : e()
                        };
                        n()
                    })
                }
            }
            class Ti {
                constructor(n, e) {
                    this.action = n, this.transaction = e, this.aborted = !1, this.V = new Kr, this.transaction.oncomplete = () => {
                        this.V.resolve()
                    }, this.transaction.onabort = () => {
                        e.error ? this.V.reject(new Ci(n, e.error)) : this.V.resolve()
                    }, this.transaction.onerror = e => {
                        var t = Ri(e.target.error);
                        this.V.reject(new Ci(n, t))
                    }
                }
                static open(e, t, n, r) {
                    try {
                        return new Ti(t, e.transaction(r, n))
                    } catch (e) {
                        throw new Ci(t, e)
                    }
                }
                get m() {
                    return this.V.promise
                }
                abort(e) {
                    e && this.V.reject(e), this.aborted || (Fr("SimpleDb", "Aborting transaction:", e ? e.message : "Client-initiated abort"), this.aborted = !0, this.transaction.abort())
                }
                g() {
                    const e = this.transaction;
                    this.aborted || "function" != typeof e.commit || e.commit()
                }
                store(e) {
                    var t = this.transaction.objectStore(e);
                    return new Ai(t)
                }
            }
            class Si {
                constructor(e, t, n) {
                    this.name = e, this.version = t, this.p = n, 12.2 === Si.S(u()) && Vr("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")
                }
                static delete(e) {
                    return Fr("SimpleDb", "Removing database:", e), Ni(window.indexedDB.deleteDatabase(e)).toPromise()
                }
                static D() {
                    if (! function() {
                            try {
                                return "object" == typeof indexedDB
                            } catch (e) {
                                return
                            }
                        }()) return !1;
                    if (Si.C()) return !0;
                    const e = u(),
                        t = Si.S(e),
                        n = 0 < t && t < 10,
                        r = Si.v(e),
                        i = 0 < r && r < 4.5;
                    return !(0 < e.indexOf("MSIE ") || 0 < e.indexOf("Trident/") || 0 < e.indexOf("Edge/") || n || i)
                }
                static C() {
                    var e;
                    return "undefined" != typeof process && "YES" === (null === (e = process.__PRIVATE_env) || void 0 === e ? void 0 : e.F)
                }
                static M(e, t) {
                    return e.store(t)
                }
                static S(e) {
                    const t = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
                        n = t ? t[1].split("_").slice(0, 2).join(".") : "-1";
                    return Number(n)
                }
                static v(e) {
                    const t = e.match(/Android ([\d.]+)/i),
                        n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
                    return Number(n)
                }
                async O(s) {
                    return this.db || (Fr("SimpleDb", "Opening database:", this.name), this.db = await new Promise((n, r) => {
                        const i = indexedDB.open(this.name, this.version);
                        i.onsuccess = e => {
                            var t = e.target.result;
                            n(t)
                        }, i.onblocked = () => {
                            r(new Ci(s, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))
                        }, i.onerror = e => {
                            var t = e.target.error;
                            "VersionError" === t.name ? r(new zr(Gr.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : "InvalidStateError" === t.name ? r(new zr(Gr.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + t)) : r(new Ci(s, t))
                        }, i.onupgradeneeded = e => {
                            Fr("SimpleDb", 'Database "' + this.name + '" requires upgrade from version:', e.oldVersion);
                            var t = e.target.result;
                            this.p.N(t, i.transaction, e.oldVersion, this.version).next(() => {
                                Fr("SimpleDb", "Database upgrade to version " + this.version + " complete")
                            })
                        }
                    })), this.L && (this.db.onversionchange = e => this.L(e)), this.db
                }
                B(t) {
                    this.L = t, this.db && (this.db.onversionchange = e => t(e))
                }
                async runTransaction(e, t, n, r) {
                    var i = "readonly" === t;
                    let s = 0;
                    for (;;) {
                        ++s;
                        try {
                            this.db = await this.O(e);
                            const t = Ti.open(this.db, e, i ? "readonly" : "readwrite", n),
                                s = r(t).next(e => (t.g(), e)).catch(e => (t.abort(e), Ei.reject(e))).toPromise();
                            return s.catch(() => {}), await t.m, s
                        } catch (e) {
                            const t = e,
                                n = "FirebaseError" !== t.name && s < 3;
                            if (Fr("SimpleDb", "Transaction failed with error:", t.message, "Retrying:", n), this.close(), !n) return Promise.reject(t)
                        }
                    }
                }
                close() {
                    this.db && this.db.close(), this.db = void 0
                }
            }
            class xi {
                constructor(e) {
                    this.k = e, this.q = !1, this.K = null
                }
                get isDone() {
                    return this.q
                }
                get $() {
                    return this.K
                }
                set cursor(e) {
                    this.k = e
                }
                done() {
                    this.q = !0
                }
                U(e) {
                    this.K = e
                }
                delete() {
                    return Ni(this.k.delete())
                }
            }
            class Ci extends zr {
                constructor(e, t) {
                    super(Gr.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ${t}`), this.name = "IndexedDbTransactionError"
                }
            }

            function Di(e) {
                return "IndexedDbTransactionError" === e.name
            }
            class Ai {
                constructor(e) {
                    this.store = e
                }
                put(e, t) {
                    let n;
                    return n = void 0 !== t ? (Fr("SimpleDb", "PUT", this.store.name, e, t), this.store.put(t, e)) : (Fr("SimpleDb", "PUT", this.store.name, "<auto-key>", e), this.store.put(e)), Ni(n)
                }
                add(e) {
                    return Fr("SimpleDb", "ADD", this.store.name, e, e), Ni(this.store.add(e))
                }
                get(t) {
                    return Ni(this.store.get(t)).next(e => (Fr("SimpleDb", "GET", this.store.name, t, e = void 0 === e ? null : e), e))
                }
                delete(e) {
                    return Fr("SimpleDb", "DELETE", this.store.name, e), Ni(this.store.delete(e))
                }
                count() {
                    return Fr("SimpleDb", "COUNT", this.store.name), Ni(this.store.count())
                }
                W(e, n) {
                    const t = this.options(e, n),
                        r = t.index ? this.store.index(t.index) : this.store;
                    if ("function" == typeof r.getAll) {
                        const e = r.getAll(t.range);
                        return new Ei((t, n) => {
                            e.onerror = e => {
                                n(e.target.error)
                            }, e.onsuccess = e => {
                                t(e.target.result)
                            }
                        })
                    } {
                        const e = this.cursor(t),
                            n = [];
                        return this.G(e, (e, t) => {
                            n.push(t)
                        }).next(() => n)
                    }
                }
                j(e, t) {
                    const r = this.store.getAll(e, null === t ? void 0 : t);
                    return new Ei((t, n) => {
                        r.onerror = e => {
                            n(e.target.error)
                        }, r.onsuccess = e => {
                            t(e.target.result)
                        }
                    })
                }
                H(e, t) {
                    Fr("SimpleDb", "DELETE ALL", this.store.name);
                    const n = this.options(e, t);
                    n.J = !1;
                    var r = this.cursor(n);
                    return this.G(r, (e, t, n) => n.delete())
                }
                Y(e, t) {
                    let n;
                    t ? n = e : (n = {}, t = e);
                    var r = this.cursor(n);
                    return this.G(r, t)
                }
                Z(i) {
                    const e = this.cursor({});
                    return new Ei((n, r) => {
                        e.onerror = e => {
                            var t = Ri(e.target.error);
                            r(t)
                        }, e.onsuccess = e => {
                            const t = e.target.result;
                            t ? i(t.primaryKey, t.value).next(e => {
                                e ? t.continue() : n()
                            }) : n()
                        }
                    })
                }
                G(e, s) {
                    const a = [];
                    return new Ei((i, t) => {
                        e.onerror = e => {
                            t(e.target.error)
                        }, e.onsuccess = e => {
                            const t = e.target.result;
                            if (t) {
                                const n = new xi(t),
                                    r = s(t.primaryKey, t.value, n);
                                if (r instanceof Ei) {
                                    const e = r.catch(e => (n.done(), Ei.reject(e)));
                                    a.push(e)
                                }
                                n.isDone ? i() : null === n.$ ? t.continue() : t.continue(n.$)
                            } else i()
                        }
                    }).next(() => Ei.waitFor(a))
                }
                options(e, t) {
                    let n;
                    return void 0 !== e && ("string" == typeof e ? n = e : t = e), {
                        index: n,
                        range: t
                    }
                }
                cursor(e) {
                    let t = "next";
                    if (e.reverse && (t = "prev"), e.index) {
                        const n = this.store.index(e.index);
                        return e.J ? n.openKeyCursor(e.range, t) : n.openCursor(e.range, t)
                    }
                    return this.store.openCursor(e.range, t)
                }
            }

            function Ni(e) {
                return new Ei((n, r) => {
                    e.onsuccess = e => {
                        var t = e.target.result;
                        n(t)
                    }, e.onerror = e => {
                        var t = Ri(e.target.error);
                        r(t)
                    }
                })
            }
            let ki = !1;

            function Ri(e) {
                const t = Si.S(u());
                if (12.2 <= t && t < 13) {
                    const t = "An internal error was encountered in the Indexed Database server";
                    if (0 <= e.message.indexOf(t)) {
                        const e = new zr("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
                        return ki || (ki = !0, setTimeout(() => {
                            throw e
                        }, 0)), e
                    }
                }
                return e
            }
            class Mi {
                constructor(e, t) {
                    this.asyncQueue = e, this.X = t, this.task = null
                }
                start() {
                    this.ee(15e3)
                }
                stop() {
                    this.task && (this.task.cancel(), this.task = null)
                }
                get started() {
                    return null !== this.task
                }
                ee(e) {
                    Fr("IndexBackfiller", `Scheduled in ${e}ms`), this.task = this.asyncQueue.enqueueAfterDelay("index_backfill", e, async () => {
                        this.task = null;
                        try {
                            Fr("IndexBackfiller", `Documents written: ${await this.X.te()}`)
                        } catch (e) {
                            Di(e) ? Fr("IndexBackfiller", "Ignoring IndexedDB error during index backfill: ", e) : await Ii(e)
                        }
                        await this.ee(6e4)
                    })
                }
            }
            class Oi {
                constructor(e, t) {
                    this.localStore = e, this.persistence = t
                }
                async te(t = 50) {
                    return this.persistence.runTransaction("Backfill Indexes", "readwrite-primary", e => this.ne(e, t))
                }
                ne(e, t) {
                    const n = new Set;
                    let r = t,
                        i = !0;
                    return Ei.doWhile(() => !0 === i && 0 < r, () => this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t => null === t || n.has(t) ? void(i = !1) : (Fr("IndexBackfiller", `Processing collection: ${t}`), this.re(e, t, r).next(e => {
                        r -= e, n.add(t)
                    })))).next(() => t - r)
                }
                re(r, i, e) {
                    return this.localStore.indexManager.getMinOffsetFromCollectionGroup(r, i).next(n => this.localStore.localDocuments.getNextDocuments(r, i, n, e).next(e => {
                        const t = e.changes;
                        return this.localStore.indexManager.updateIndexEntries(r, t).next(() => this.ie(n, e)).next(e => (Fr("IndexBackfiller", `Updating offset: ${e}`), this.localStore.indexManager.updateCollectionGroup(r, i, e))).next(() => t.size)
                    }))
                }
                ie(e, t) {
                    let r = e;
                    return t.changes.forEach((e, t) => {
                        var n = yi(t);
                        0 < wi(n, r) && (r = n)
                    }), new vi(r.readTime, r.documentKey, Math.max(t.batchId, e.largestBatchId))
                }
            }
            class Li {
                constructor(e, t) {
                    this.previousValue = e, t && (t.sequenceNumberHandler = e => this.se(e), this.oe = e => t.writeSequenceNumber(e))
                }
                se(e) {
                    return this.previousValue = Math.max(e, this.previousValue), this.previousValue
                }
                next() {
                    var e = ++this.previousValue;
                    return this.oe && this.oe(e), e
                }
            }

            function Pi(e) {
                return null == e
            }

            function Fi(e) {
                return 0 === e && 1 / e == -1 / 0
            }

            function Vi(e) {
                return "number" == typeof e && Number.isInteger(e) && !Fi(e) && e <= Number.MAX_SAFE_INTEGER && e >= Number.MIN_SAFE_INTEGER
            }

            function Bi(e) {
                let t = "";
                for (let n = 0; n < e.length; n++) 0 < t.length && (t = Ui(t)), t = function(e, t) {
                    let n = t;
                    const r = e.length;
                    for (let i = 0; i < r; i++) {
                        const r = e.charAt(i);
                        switch (r) {
                            case "\0":
                                n += "";
                                break;
                            case "":
                                n += "";
                                break;
                            default:
                                n += r
                        }
                    }
                    return n
                }(e.get(n), t);
                return Ui(t)
            }

            function Ui(e) {
                return e + ""
            }

            function qi(t) {
                const n = t.length;
                if (jr(2 <= n), 2 === n) return jr("" === t.charAt(0) && "" === t.charAt(1)), oi.emptyPath();
                const __PRIVATE_lastReasonableEscapeIndex = n - 2,
                    r = [];
                let i = "";
                for (let a = 0; a < n;) {
                    const n = t.indexOf("", a);
                    switch ((n < 0 || n > __PRIVATE_lastReasonableEscapeIndex) && qr(), t.charAt(n + 1)) {
                        case "":
                            var s = t.substring(a, n);
                            let e;
                            0 === i.length ? e = s : (i += s, e = i, i = ""), r.push(e);
                            break;
                        case "":
                            i += t.substring(a, n), i += "\0";
                            break;
                        case "":
                            i += t.substring(a, n + 1);
                            break;
                        default:
                            qr()
                    }
                    a = n + 2
                }
                return new oi(r)
            }
            Li._e = -1;
            const ji = ["userId", "batchId"];

            function Gi(e, t) {
                return [e, Bi(t)]
            }

            function zi(e, t, n) {
                return [e, Bi(t), n]
            }
            const Ki = {},
                $i = ["prefixPath", "collectionGroup", "readTime", "documentId"],
                Qi = ["prefixPath", "collectionGroup", "documentId"],
                Wi = ["collectionGroup", "readTime", "prefixPath", "documentId"],
                Hi = ["canonicalId", "targetId"],
                Yi = ["targetId", "path"],
                Ji = ["path", "targetId"],
                Xi = ["collectionId", "parent"],
                Zi = ["indexId", "uid"],
                es = ["uid", "sequenceNumber"],
                ts = ["indexId", "uid", "arrayValue", "directionalValue", "orderedDocumentKey", "documentKey"],
                ns = ["indexId", "uid", "orderedDocumentKey"],
                rs = ["userId", "collectionPath", "documentId"],
                is = ["userId", "collectionPath", "largestBatchId"],
                ss = ["userId", "collectionGroup", "largestBatchId"],
                as = ["mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries"],
                os = [...as, "documentOverlays"],
                us = ["mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays"],
                cs = us,
                hs = [...cs, "indexConfiguration", "indexState", "indexEntries"];
            class ls extends bi {
                constructor(e, t) {
                    super(), this.ae = e, this.currentSequenceNumber = t
                }
            }

            function ds(e, t) {
                var n = e;
                return Si.M(n.ae, t)
            }

            function fs(e) {
                let t = 0;
                for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
                return t
            }

            function gs(e, t) {
                for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
            }

            function ms(e) {
                for (const t in e)
                    if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
                return !0
            }
            class ps {
                constructor(e, t) {
                    this.comparator = e, this.root = t || vs.EMPTY
                }
                insert(e, t) {
                    return new ps(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, vs.BLACK, null, null))
                }
                remove(e) {
                    return new ps(this.comparator, this.root.remove(e, this.comparator).copy(null, null, vs.BLACK, null, null))
                }
                get(e) {
                    let t = this.root;
                    for (; !t.isEmpty();) {
                        var n = this.comparator(e, t.key);
                        if (0 === n) return t.value;
                        n < 0 ? t = t.left : 0 < n && (t = t.right)
                    }
                    return null
                }
                indexOf(e) {
                    let t = 0,
                        n = this.root;
                    for (; !n.isEmpty();) {
                        var r = this.comparator(e, n.key);
                        if (0 === r) return t + n.left.size;
                        n = r < 0 ? n.left : (t += n.left.size + 1, n.right)
                    }
                    return -1
                }
                isEmpty() {
                    return this.root.isEmpty()
                }
                get size() {
                    return this.root.size
                }
                minKey() {
                    return this.root.minKey()
                }
                maxKey() {
                    return this.root.maxKey()
                }
                inorderTraversal(e) {
                    return this.root.inorderTraversal(e)
                }
                forEach(n) {
                    this.inorderTraversal((e, t) => (n(e, t), !1))
                }
                toString() {
                    const n = [];
                    return this.inorderTraversal((e, t) => (n.push(`${e}:${t}`), !1)), `{${n.join(", ")}}`
                }
                reverseTraversal(e) {
                    return this.root.reverseTraversal(e)
                }
                getIterator() {
                    return new ys(this.root, null, this.comparator, !1)
                }
                getIteratorFrom(e) {
                    return new ys(this.root, e, this.comparator, !1)
                }
                getReverseIterator() {
                    return new ys(this.root, null, this.comparator, !0)
                }
                getReverseIteratorFrom(e) {
                    return new ys(this.root, e, this.comparator, !0)
                }
            }
            class ys {
                constructor(e, t, n, r) {
                    this.isReverse = r, this.nodeStack = [];
                    let i = 1;
                    for (; !e.isEmpty();)
                        if (i = t ? n(e.key, t) : 1, t && r && (i *= -1), i < 0) e = this.isReverse ? e.left : e.right;
                        else {
                            if (0 === i) {
                                this.nodeStack.push(e);
                                break
                            }
                            this.nodeStack.push(e), e = this.isReverse ? e.right : e.left
                        }
                }
                getNext() {
                    let e = this.nodeStack.pop();
                    var t = {
                        key: e.key,
                        value: e.value
                    };
                    if (this.isReverse)
                        for (e = e.left; !e.isEmpty();) this.nodeStack.push(e), e = e.right;
                    else
                        for (e = e.right; !e.isEmpty();) this.nodeStack.push(e), e = e.left;
                    return t
                }
                hasNext() {
                    return 0 < this.nodeStack.length
                }
                peek() {
                    if (0 === this.nodeStack.length) return null;
                    var e = this.nodeStack[this.nodeStack.length - 1];
                    return {
                        key: e.key,
                        value: e.value
                    }
                }
            }
            class vs {
                constructor(e, t, n, r, i) {
                    this.key = e, this.value = t, this.color = null != n ? n : vs.RED, this.left = null != r ? r : vs.EMPTY, this.right = null != i ? i : vs.EMPTY, this.size = this.left.size + 1 + this.right.size
                }
                copy(e, t, n, r, i) {
                    return new vs(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != r ? r : this.left, null != i ? i : this.right)
                }
                isEmpty() {
                    return !1
                }
                inorderTraversal(e) {
                    return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e)
                }
                reverseTraversal(e) {
                    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
                }
                min() {
                    return this.left.isEmpty() ? this : this.left.min()
                }
                minKey() {
                    return this.min().key
                }
                maxKey() {
                    return this.right.isEmpty() ? this.key : this.right.maxKey()
                }
                insert(e, t, n) {
                    let r = this;
                    var i = n(e, r.key);
                    return r = i < 0 ? r.copy(null, null, null, r.left.insert(e, t, n), null) : 0 === i ? r.copy(null, t, null, null, null) : r.copy(null, null, null, null, r.right.insert(e, t, n)), r.fixUp()
                }
                removeMin() {
                    if (this.left.isEmpty()) return vs.EMPTY;
                    let e = this;
                    return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), e = e.copy(null, null, null, e.left.removeMin(), null), e.fixUp()
                }
                remove(e, t) {
                    let n, r = this;
                    if (t(e, r.key) < 0) r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(e, t), null);
                    else {
                        if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), 0 === t(e, r.key)) {
                            if (r.right.isEmpty()) return vs.EMPTY;
                            n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin())
                        }
                        r = r.copy(null, null, null, null, r.right.remove(e, t))
                    }
                    return r.fixUp()
                }
                isRed() {
                    return this.color
                }
                fixUp() {
                    let e = this;
                    return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e
                }
                moveRedLeft() {
                    let e = this.colorFlip();
                    return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e
                }
                moveRedRight() {
                    let e = this.colorFlip();
                    return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e
                }
                rotateLeft() {
                    var e = this.copy(null, null, vs.RED, null, this.right.left);
                    return this.right.copy(null, null, this.color, e, null)
                }
                rotateRight() {
                    var e = this.copy(null, null, vs.RED, this.left.right, null);
                    return this.left.copy(null, null, this.color, null, e)
                }
                colorFlip() {
                    var e = this.left.copy(null, null, !this.left.color, null, null),
                        t = this.right.copy(null, null, !this.right.color, null, null);
                    return this.copy(null, null, !this.color, e, t)
                }
                checkMaxDepth() {
                    var e = this.check();
                    return Math.pow(2, e) <= this.size + 1
                }
                check() {
                    if (this.isRed() && this.left.isRed()) throw qr();
                    if (this.right.isRed()) throw qr();
                    var e = this.left.check();
                    if (e !== this.right.check()) throw qr();
                    return e + (this.isRed() ? 0 : 1)
                }
            }
            vs.EMPTY = null, vs.RED = !0, vs.BLACK = !1, vs.EMPTY = new class {
                constructor() {
                    this.size = 0
                }
                get key() {
                    throw qr()
                }
                get value() {
                    throw qr()
                }
                get color() {
                    throw qr()
                }
                get left() {
                    throw qr()
                }
                get right() {
                    throw qr()
                }
                copy(e, t, n, r, i) {
                    return this
                }
                insert(e, t, n) {
                    return new vs(e, t)
                }
                remove(e, t) {
                    return this
                }
                isEmpty() {
                    return !0
                }
                inorderTraversal(e) {
                    return !1
                }
                reverseTraversal(e) {
                    return !1
                }
                minKey() {
                    return null
                }
                maxKey() {
                    return null
                }
                isRed() {
                    return !1
                }
                checkMaxDepth() {
                    return !0
                }
                check() {
                    return 0
                }
            };
            class ws {
                constructor(e) {
                    this.comparator = e, this.data = new ps(this.comparator)
                }
                has(e) {
                    return null !== this.data.get(e)
                }
                first() {
                    return this.data.minKey()
                }
                last() {
                    return this.data.maxKey()
                }
                get size() {
                    return this.data.size
                }
                indexOf(e) {
                    return this.data.indexOf(e)
                }
                forEach(n) {
                    this.data.inorderTraversal((e, t) => (n(e), !1))
                }
                forEachInRange(e, t) {
                    const n = this.data.getIteratorFrom(e[0]);
                    for (; n.hasNext();) {
                        var r = n.getNext();
                        if (0 <= this.comparator(r.key, e[1])) return;
                        t(r.key)
                    }
                }
                forEachWhile(e, t) {
                    let n;
                    for (n = void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator(); n.hasNext();)
                        if (!e(n.getNext().key)) return
                }
                firstAfterOrEqual(e) {
                    const t = this.data.getIteratorFrom(e);
                    return t.hasNext() ? t.getNext().key : null
                }
                getIterator() {
                    return new _s(this.data.getIterator())
                }
                getIteratorFrom(e) {
                    return new _s(this.data.getIteratorFrom(e))
                }
                add(e) {
                    return this.copy(this.data.remove(e).insert(e, !0))
                }
                delete(e) {
                    return this.has(e) ? this.copy(this.data.remove(e)) : this
                }
                isEmpty() {
                    return this.data.isEmpty()
                }
                unionWith(e) {
                    let t = this;
                    return t.size < e.size && (t = e, e = this), e.forEach(e => {
                        t = t.add(e)
                    }), t
                }
                isEqual(e) {
                    if (!(e instanceof ws)) return !1;
                    if (this.size !== e.size) return !1;
                    const t = this.data.getIterator(),
                        n = e.data.getIterator();
                    for (; t.hasNext();) {
                        const e = t.getNext().key,
                            r = n.getNext().key;
                        if (0 !== this.comparator(e, r)) return !1
                    }
                    return !0
                }
                toArray() {
                    const t = [];
                    return this.forEach(e => {
                        t.push(e)
                    }), t
                }
                toString() {
                    const t = [];
                    return this.forEach(e => t.push(e)), "SortedSet(" + t.toString() + ")"
                }
                copy(e) {
                    const t = new ws(this.comparator);
                    return t.data = e, t
                }
            }
            class _s {
                constructor(e) {
                    this.iter = e
                }
                getNext() {
                    return this.iter.getNext().key
                }
                hasNext() {
                    return this.iter.hasNext()
                }
            }

            function bs(e) {
                return e.hasNext() ? e.getNext() : void 0
            }
            class Is {
                constructor(e) {
                    (this.fields = e).sort(ci.comparator)
                }
                static empty() {
                    return new Is([])
                }
                unionWith(e) {
                    let t = new ws(ci.comparator);
                    for (const e of this.fields) t = t.add(e);
                    for (const n of e) t = t.add(n);
                    return new Is(t.toArray())
                }
                covers(e) {
                    for (const t of this.fields)
                        if (t.isPrefixOf(e)) return !0;
                    return !1
                }
                isEqual(e) {
                    return ni(this.fields, e.fields, (e, t) => e.isEqual(t))
                }
            }
            class Es extends Error {
                constructor() {
                    super(...arguments), this.name = "Base64DecodeError"
                }
            }
            class Ts {
                constructor(e) {
                    this.binaryString = e
                }
                static fromBase64String(e) {
                    var t = function(e) {
                        try {
                            return atob(e)
                        } catch (e) {
                            throw "undefined" != typeof DOMException && e instanceof DOMException ? new Es("Invalid base64 string: " + e) : e
                        }
                    }(e);
                    return new Ts(t)
                }
                static fromUint8Array(e) {
                    var t = function(e) {
                        let t = "";
                        for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
                        return t
                    }(e);
                    return new Ts(t)
                }[Symbol.iterator]() {
                    let e = 0;
                    return {
                        next: () => e < this.binaryString.length ? {
                            value: this.binaryString.charCodeAt(e++),
                            done: !1
                        } : {
                            value: void 0,
                            done: !0
                        }
                    }
                }
                toBase64() {
                    return e = this.binaryString, btoa(e);
                    var e
                }
                toUint8Array() {
                    return function(e) {
                        const t = new Uint8Array(e.length);
                        for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
                        return t
                    }(this.binaryString)
                }
                approximateByteSize() {
                    return 2 * this.binaryString.length
                }
                compareTo(e) {
                    return ti(this.binaryString, e.binaryString)
                }
                isEqual(e) {
                    return this.binaryString === e.binaryString
                }
            }
            Ts.EMPTY_BYTE_STRING = new Ts("");
            const Ss = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

            function xs(t) {
                if (jr(!!t), "string" != typeof t) return {
                    seconds: Cs(t.seconds),
                    nanos: Cs(t.nanos)
                }; {
                    let e = 0;
                    var n = Ss.exec(t);
                    jr(!!n), n[1] && (n = ((n = n[1]) + "000000000").substr(0, 9), e = Number(n));
                    const r = new Date(t);
                    return {
                        seconds: Math.floor(r.getTime() / 1e3),
                        nanos: e
                    }
                }
            }

            function Cs(e) {
                return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0
            }

            function Ds(e) {
                return "string" == typeof e ? Ts.fromBase64String(e) : Ts.fromUint8Array(e)
            }

            function As(e) {
                var t;
                return "server_timestamp" === (null === (t = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {}).__type__) || void 0 === t ? void 0 : t.stringValue)
            }

            function Ns(e) {
                var t = e.mapValue.fields.__previous_value__;
                return As(t) ? Ns(t) : t
            }

            function ks(e) {
                var t = xs(e.mapValue.fields.__local_write_time__.timestampValue);
                return new ii(t.seconds, t.nanos)
            }
            class Rs {
                constructor(e, t, n, r, i, s, a, o, u) {
                    this.databaseId = e, this.appId = t, this.persistenceKey = n, this.host = r, this.ssl = i, this.forceLongPolling = s, this.autoDetectLongPolling = a, this.longPollingOptions = o, this.useFetchStreams = u
                }
            }
            class Ms {
                constructor(e, t) {
                    this.projectId = e, this.database = t || "(default)"
                }
                static empty() {
                    return new Ms("", "")
                }
                get isDefaultDatabase() {
                    return "(default)" === this.database
                }
                isEqual(e) {
                    return e instanceof Ms && e.projectId === this.projectId && e.database === this.database
                }
            }
            const Os = {
                    mapValue: {
                        fields: {
                            __type__: {
                                stringValue: "__max__"
                            }
                        }
                    }
                },
                Ls = {
                    nullValue: "NULL_VALUE"
                };

            function Ps(e) {
                return "nullValue" in e ? 0 : "booleanValue" in e ? 1 : "integerValue" in e || "doubleValue" in e ? 2 : "timestampValue" in e ? 3 : "stringValue" in e ? 5 : "bytesValue" in e ? 6 : "referenceValue" in e ? 7 : "geoPointValue" in e ? 8 : "arrayValue" in e ? 9 : "mapValue" in e ? As(e) ? 4 : Hs(e) ? 9007199254740991 : 10 : qr()
            }

            function Fs(e, t) {
                if (e === t) return !0;
                var n, r, i = Ps(e);
                if (i !== Ps(t)) return !1;
                switch (i) {
                    case 0:
                    case 9007199254740991:
                        return !0;
                    case 1:
                        return e.booleanValue === t.booleanValue;
                    case 4:
                        return ks(e).isEqual(ks(t));
                    case 3:
                        return function(e, t) {
                            if ("string" == typeof e.timestampValue && "string" == typeof t.timestampValue && e.timestampValue.length === t.timestampValue.length) return e.timestampValue === t.timestampValue;
                            var n = xs(e.timestampValue),
                                r = xs(t.timestampValue);
                            return n.seconds === r.seconds && n.nanos === r.nanos
                        }(e, t);
                    case 5:
                        return e.stringValue === t.stringValue;
                    case 6:
                        return r = t, Ds(e.bytesValue).isEqual(Ds(r.bytesValue));
                    case 7:
                        return e.referenceValue === t.referenceValue;
                    case 8:
                        return n = t, Cs((r = e).geoPointValue.latitude) === Cs(n.geoPointValue.latitude) && Cs(r.geoPointValue.longitude) === Cs(n.geoPointValue.longitude);
                    case 2:
                        return function(e, t) {
                            if ("integerValue" in e && "integerValue" in t) return Cs(e.integerValue) === Cs(t.integerValue);
                            if ("doubleValue" in e && "doubleValue" in t) {
                                var n = Cs(e.doubleValue),
                                    r = Cs(t.doubleValue);
                                return n === r ? Fi(n) === Fi(r) : isNaN(n) && isNaN(r)
                            }
                            return !1
                        }(e, t);
                    case 9:
                        return ni(e.arrayValue.values || [], t.arrayValue.values || [], Fs);
                    case 10:
                        return function(e, t) {
                            const n = e.mapValue.fields || {},
                                r = t.mapValue.fields || {};
                            if (fs(n) !== fs(r)) return !1;
                            for (const e in n)
                                if (n.hasOwnProperty(e) && (void 0 === r[e] || !Fs(n[e], r[e]))) return !1;
                            return !0
                        }(e, t);
                    default:
                        return qr()
                }
            }

            function Vs(e, t) {
                return void 0 !== (e.values || []).find(e => Fs(e, t))
            }

            function Bs(e, t) {
                if (e === t) return 0;
                var n, r, i, s, a = Ps(e),
                    o = Ps(t);
                if (a !== o) return ti(a, o);
                switch (a) {
                    case 0:
                    case 9007199254740991:
                        return 0;
                    case 1:
                        return ti(e.booleanValue, t.booleanValue);
                    case 2:
                        return r = t, i = Cs((n = e).integerValue || n.doubleValue), s = Cs(r.integerValue || r.doubleValue), i < s ? -1 : s < i ? 1 : i === s ? 0 : isNaN(i) ? isNaN(s) ? 0 : -1 : 1;
                    case 3:
                        return Us(e.timestampValue, t.timestampValue);
                    case 4:
                        return Us(ks(e), ks(t));
                    case 5:
                        return ti(e.stringValue, t.stringValue);
                    case 6:
                        return function(e, t) {
                            const n = Ds(e),
                                r = Ds(t);
                            return n.compareTo(r)
                        }(e.bytesValue, t.bytesValue);
                    case 7:
                        return function(e, t) {
                            var n = e.split("/"),
                                r = t.split("/");
                            for (let i = 0; i < n.length && i < r.length; i++) {
                                const t = ti(n[i], r[i]);
                                if (0 !== t) return t
                            }
                            return ti(n.length, r.length)
                        }(e.referenceValue, t.referenceValue);
                    case 8:
                        return n = e.geoPointValue, r = t.geoPointValue, 0 !== (s = ti(Cs(n.latitude), Cs(r.latitude))) ? s : ti(Cs(n.longitude), Cs(r.longitude));
                    case 9:
                        return function(e, t) {
                            var n = e.values || [],
                                r = t.values || [];
                            for (let i = 0; i < n.length && i < r.length; ++i) {
                                const t = Bs(n[i], r[i]);
                                if (t) return t
                            }
                            return ti(n.length, r.length)
                        }(e.arrayValue, t.arrayValue);
                    case 10:
                        return function(e, t) {
                            if (e === Os.mapValue && t === Os.mapValue) return 0;
                            if (e === Os.mapValue) return 1;
                            if (t === Os.mapValue) return -1;
                            const n = e.fields || {},
                                r = Object.keys(n),
                                i = t.fields || {},
                                s = Object.keys(i);
                            r.sort(), s.sort();
                            for (let o = 0; o < r.length && o < s.length; ++o) {
                                const t = ti(r[o], s[o]);
                                if (0 !== t) return t;
                                var a = Bs(n[r[o]], i[s[o]]);
                                if (0 !== a) return a
                            }
                            return ti(r.length, s.length)
                        }(e.mapValue, t.mapValue);
                    default:
                        throw qr()
                }
            }

            function Us(e, t) {
                if ("string" == typeof e && "string" == typeof t && e.length === t.length) return ti(e, t);
                var n = xs(e),
                    r = xs(t),
                    i = ti(n.seconds, r.seconds);
                return 0 !== i ? i : ti(n.nanos, r.nanos)
            }

            function qs(e) {
                return function s(e) {
                    return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function(e) {
                        const t = xs(e);
                        return `time(${t.seconds},${t.nanos})`
                    }(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? function(e) {
                        return Ds(e).toBase64()
                    }(e.bytesValue) : "referenceValue" in e ? function(e) {
                        return hi.fromName(e).toString()
                    }(e.referenceValue) : "geoPointValue" in e ? function(e) {
                        return `geo(${e.latitude},${e.longitude})`
                    }(e.geoPointValue) : "arrayValue" in e ? function(e) {
                        let t = "[",
                            n = !0;
                        for (const r of e.values || []) n ? n = !1 : t += ",", t += s(r);
                        return t + "]"
                    }(e.arrayValue) : "mapValue" in e ? function(e) {
                        const t = Object.keys(e.fields || {}).sort();
                        let n = "{",
                            r = !0;
                        for (const i of t) r ? r = !1 : n += ",", n += `${i}:${s(e.fields[i])}`;
                        return n + "}"
                    }(e.mapValue) : qr()
                }(e)
            }

            function js(e, t) {
                return {
                    referenceValue: `projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`
                }
            }

            function Gs(e) {
                return !!e && "integerValue" in e
            }

            function zs(e) {
                return !!e && "arrayValue" in e
            }

            function Ks(e) {
                return e && "nullValue" in e
            }

            function $s(e) {
                return e && "doubleValue" in e && isNaN(Number(e.doubleValue))
            }

            function Qs(e) {
                return e && "mapValue" in e
            }

            function Ws(t) {
                if (t.geoPointValue) return {
                    geoPointValue: Object.assign({}, t.geoPointValue)
                };
                if (t.timestampValue && "object" == typeof t.timestampValue) return {
                    timestampValue: Object.assign({}, t.timestampValue)
                };
                if (t.mapValue) {
                    const n = {
                        mapValue: {
                            fields: {}
                        }
                    };
                    return gs(t.mapValue.fields, (e, t) => n.mapValue.fields[e] = Ws(t)), n
                }
                if (t.arrayValue) {
                    const r = {
                        arrayValue: {
                            values: []
                        }
                    };
                    for (let e = 0; e < (t.arrayValue.values || []).length; ++e) r.arrayValue.values[e] = Ws(t.arrayValue.values[e]);
                    return r
                }
                return Object.assign({}, t)
            }

            function Hs(e) {
                return "__max__" === (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
            }

            function Ys(e, t) {
                var n = Bs(e.value, t.value);
                return 0 !== n ? n : e.inclusive && !t.inclusive ? -1 : !e.inclusive && t.inclusive ? 1 : 0
            }

            function Js(e, t) {
                var n = Bs(e.value, t.value);
                return 0 !== n ? n : e.inclusive && !t.inclusive ? 1 : !e.inclusive && t.inclusive ? -1 : 0
            }
            class Xs {
                constructor(e) {
                    this.value = e
                }
                static empty() {
                    return new Xs({
                        mapValue: {}
                    })
                }
                field(n) {
                    if (n.isEmpty()) return this.value; {
                        let e = this.value;
                        for (let t = 0; t < n.length - 1; ++t)
                            if (e = (e.mapValue.fields || {})[n.get(t)], !Qs(e)) return null;
                        return e = (e.mapValue.fields || {})[n.lastSegment()], e || null
                    }
                }
                set(e, t) {
                    this.getFieldsMap(e.popLast())[e.lastSegment()] = Ws(t)
                }
                setAll(e) {
                    let n = ci.emptyPath(),
                        r = {},
                        i = [];
                    e.forEach((e, t) => {
                        if (!n.isImmediateParentOf(t)) {
                            const e = this.getFieldsMap(n);
                            this.applyChanges(e, r, i), r = {}, i = [], n = t.popLast()
                        }
                        e ? r[t.lastSegment()] = Ws(e) : i.push(t.lastSegment())
                    });
                    var t = this.getFieldsMap(n);
                    this.applyChanges(t, r, i)
                }
                delete(e) {
                    const t = this.field(e.popLast());
                    Qs(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()]
                }
                isEqual(e) {
                    return Fs(this.value, e.value)
                }
                getFieldsMap(t) {
                    let n = this.value;
                    n.mapValue.fields || (n.mapValue = {
                        fields: {}
                    });
                    for (let r = 0; r < t.length; ++r) {
                        let e = n.mapValue.fields[t.get(r)];
                        Qs(e) && e.mapValue.fields || (e = {
                            mapValue: {
                                fields: {}
                            }
                        }, n.mapValue.fields[t.get(r)] = e), n = e
                    }
                    return n.mapValue.fields
                }
                applyChanges(n, e, t) {
                    gs(e, (e, t) => n[e] = t);
                    for (const e of t) delete n[e]
                }
                clone() {
                    return new Xs(Ws(this.value))
                }
            }
            class Zs {
                constructor(e, t, n, r, i, s, a) {
                    this.key = e, this.documentType = t, this.version = n, this.readTime = r, this.createTime = i, this.data = s, this.documentState = a
                }
                static newInvalidDocument(e) {
                    return new Zs(e, 0, si.min(), si.min(), si.min(), Xs.empty(), 0)
                }
                static newFoundDocument(e, t, n, r) {
                    return new Zs(e, 1, t, si.min(), n, r, 0)
                }
                static newNoDocument(e, t) {
                    return new Zs(e, 2, t, si.min(), si.min(), Xs.empty(), 0)
                }
                static newUnknownDocument(e, t) {
                    return new Zs(e, 3, t, si.min(), si.min(), Xs.empty(), 2)
                }
                convertToFoundDocument(e, t) {
                    return !this.createTime.isEqual(si.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this
                }
                convertToNoDocument(e) {
                    return this.version = e, this.documentType = 2, this.data = Xs.empty(), this.documentState = 0, this
                }
                convertToUnknownDocument(e) {
                    return this.version = e, this.documentType = 3, this.data = Xs.empty(), this.documentState = 2, this
                }
                setHasCommittedMutations() {
                    return this.documentState = 2, this
                }
                setHasLocalMutations() {
                    return this.documentState = 1, this.version = si.min(), this
                }
                setReadTime(e) {
                    return this.readTime = e, this
                }
                get hasLocalMutations() {
                    return 1 === this.documentState
                }
                get hasCommittedMutations() {
                    return 2 === this.documentState
                }
                get hasPendingWrites() {
                    return this.hasLocalMutations || this.hasCommittedMutations
                }
                isValidDocument() {
                    return 0 !== this.documentType
                }
                isFoundDocument() {
                    return 1 === this.documentType
                }
                isNoDocument() {
                    return 2 === this.documentType
                }
                isUnknownDocument() {
                    return 3 === this.documentType
                }
                isEqual(e) {
                    return e instanceof Zs && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data)
                }
                mutableCopy() {
                    return new Zs(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState)
                }
                toString() {
                    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`
                }
            }
            class ea {
                constructor(e, t) {
                    this.position = e, this.inclusive = t
                }
            }

            function ta(e, t, n) {
                let r = 0;
                for (let i = 0; i < e.position.length; i++) {
                    const s = t[i],
                        a = e.position[i];
                    if (r = s.field.isKeyField() ? hi.comparator(hi.fromName(a.referenceValue), n.key) : Bs(a, n.data.field(s.field)), "desc" === s.dir && (r *= -1), 0 !== r) break
                }
                return r
            }

            function na(e, t) {
                if (null === e) return null === t;
                if (null === t) return !1;
                if (e.inclusive !== t.inclusive || e.position.length !== t.position.length) return !1;
                for (let n = 0; n < e.position.length; n++)
                    if (!Fs(e.position[n], t.position[n])) return !1;
                return !0
            }
            class ra {
                constructor(e, t = "asc") {
                    this.field = e, this.dir = t
                }
            }
            class ia {}
            class sa extends ia {
                constructor(e, t, n) {
                    super(), this.field = e, this.op = t, this.value = n
                }
                static create(e, t, n) {
                    return e.isKeyField() ? "in" === t || "not-in" === t ? this.createKeyFieldInFilter(e, t, n) : new fa(e, t, n) : "array-contains" === t ? new ya(e, n) : "in" === t ? new va(e, n) : "not-in" === t ? new wa(e, n) : "array-contains-any" === t ? new _a(e, n) : new sa(e, t, n)
                }
                static createKeyFieldInFilter(e, t, n) {
                    return new("in" === t ? ga : ma)(e, n)
                }
                matches(e) {
                    var t = e.data.field(this.field);
                    return "!=" === this.op ? null !== t && this.matchesComparison(Bs(t, this.value)) : null !== t && Ps(this.value) === Ps(t) && this.matchesComparison(Bs(t, this.value))
                }
                matchesComparison(e) {
                    switch (this.op) {
                        case "<":
                            return e < 0;
                        case "<=":
                            return e <= 0;
                        case "==":
                            return 0 === e;
                        case "!=":
                            return 0 !== e;
                        case ">":
                            return 0 < e;
                        case ">=":
                            return 0 <= e;
                        default:
                            return qr()
                    }
                }
                isInequality() {
                    return 0 <= ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op)
                }
                getFlattenedFilters() {
                    return [this]
                }
                getFilters() {
                    return [this]
                }
            }
            class aa extends ia {
                constructor(e, t) {
                    super(), this.filters = e, this.op = t, this.ue = null
                }
                static create(e, t) {
                    return new aa(e, t)
                }
                matches(t) {
                    return oa(this) ? void 0 === this.filters.find(e => !e.matches(t)) : void 0 !== this.filters.find(e => e.matches(t))
                }
                getFlattenedFilters() {
                    return null !== this.ue || (this.ue = this.filters.reduce((e, t) => e.concat(t.getFlattenedFilters()), [])), this.ue
                }
                getFilters() {
                    return Object.assign([], this.filters)
                }
            }

            function oa(e) {
                return "and" === e.op
            }

            function ua(e) {
                return "or" === e.op
            }

            function ca(e) {
                return ha(e) && oa(e)
            }

            function ha(e) {
                for (const t of e.filters)
                    if (t instanceof aa) return !1;
                return !0
            }

            function la(e, t) {
                var n = e.filters.concat(t);
                return aa.create(n, e.op)
            }

            function da(e) {
                return e instanceof sa ? `${(t=e).field.canonicalString()} ${t.op} ${qs(t.value)}` : e instanceof aa ? (e = e).op.toString() + " {" + e.getFilters().map(da).join(" ,") + "}" : "Filter";
                var t
            }
            class fa extends sa {
                constructor(e, t, n) {
                    super(e, t, n), this.key = hi.fromName(n.referenceValue)
                }
                matches(e) {
                    var t = hi.comparator(e.key, this.key);
                    return this.matchesComparison(t)
                }
            }
            class ga extends sa {
                constructor(e, t) {
                    super(e, "in", t), this.keys = pa(0, t)
                }
                matches(t) {
                    return this.keys.some(e => e.isEqual(t.key))
                }
            }
            class ma extends sa {
                constructor(e, t) {
                    super(e, "not-in", t), this.keys = pa(0, t)
                }
                matches(t) {
                    return !this.keys.some(e => e.isEqual(t.key))
                }
            }

            function pa(e, t) {
                var n;
                return ((null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(e => hi.fromName(e.referenceValue))
            }
            class ya extends sa {
                constructor(e, t) {
                    super(e, "array-contains", t)
                }
                matches(e) {
                    var t = e.data.field(this.field);
                    return zs(t) && Vs(t.arrayValue, this.value)
                }
            }
            class va extends sa {
                constructor(e, t) {
                    super(e, "in", t)
                }
                matches(e) {
                    var t = e.data.field(this.field);
                    return null !== t && Vs(this.value.arrayValue, t)
                }
            }
            class wa extends sa {
                constructor(e, t) {
                    super(e, "not-in", t)
                }
                matches(e) {
                    if (Vs(this.value.arrayValue, {
                            nullValue: "NULL_VALUE"
                        })) return !1;
                    var t = e.data.field(this.field);
                    return null !== t && !Vs(this.value.arrayValue, t)
                }
            }
            class _a extends sa {
                constructor(e, t) {
                    super(e, "array-contains-any", t)
                }
                matches(e) {
                    const t = e.data.field(this.field);
                    return !(!zs(t) || !t.arrayValue.values) && t.arrayValue.values.some(e => Vs(this.value.arrayValue, e))
                }
            }
            class ba {
                constructor(e, t = null, n = [], r = [], i = null, s = null, a = null) {
                    this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = r, this.limit = i, this.startAt = s, this.endAt = a, this.ce = null
                }
            }

            function Ia(e, t = null, n = [], r = [], i = null, s = null, a = null) {
                return new ba(e, t, n, r, i, s, a)
            }

            function Ea(e) {
                const t = e;
                if (null === t.ce) {
                    let e = t.path.canonicalString();
                    null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup), e += "|f:", e += t.filters.map(e => function t(e) {
                        if (e instanceof sa) return e.field.canonicalString() + e.op.toString() + qs(e.value);
                        if (ca(e)) return e.filters.map(e => t(e)).join(",");
                        var n = e.filters.map(e => t(e)).join(",");
                        return `${e.op}(${n})`
                    }(e)).join(","), e += "|ob:", e += t.orderBy.map(e => function(e) {
                        return e.field.canonicalString() + e.dir
                    }(e)).join(","), Pi(t.limit) || (e += "|l:", e += t.limit), t.startAt && (e += "|lb:", e += t.startAt.inclusive ? "b:" : "a:", e += t.startAt.position.map(e => qs(e)).join(",")), t.endAt && (e += "|ub:", e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map(e => qs(e)).join(",")), t.ce = e
                }
                return t.ce
            }

            function Ta(e, t) {
                if (e.limit !== t.limit) return !1;
                if (e.orderBy.length !== t.orderBy.length) return !1;
                for (let i = 0; i < e.orderBy.length; i++)
                    if (n = e.orderBy[i], r = t.orderBy[i], n.dir !== r.dir || !n.field.isEqual(r.field)) return !1;
                var n, r;
                if (e.filters.length !== t.filters.length) return !1;
                for (let s = 0; s < e.filters.length; s++)
                    if (! function r(e, t) {
                            return e instanceof sa ? (n = e, (s = t) instanceof sa && n.op === s.op && n.field.isEqual(s.field) && Fs(n.value, s.value)) : e instanceof aa ? (i = t) instanceof aa && e.op === i.op && e.filters.length === i.filters.length && e.filters.reduce((e, t, n) => e && r(t, i.filters[n]), !0) : void qr();
                            var i, n, s
                        }(e.filters[s], t.filters[s])) return !1;
                return e.collectionGroup === t.collectionGroup && !!e.path.isEqual(t.path) && !!na(e.startAt, t.startAt) && na(e.endAt, t.endAt)
            }

            function Sa(e) {
                return hi.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length
            }

            function xa(e, t) {
                return e.filters.filter(e => e instanceof sa && e.field.isEqual(t))
            }

            function Ca(t, n, r) {
                let i = Ls,
                    s = !0;
                for (const r of xa(t, n)) {
                    let e = Ls,
                        t = !0;
                    switch (r.op) {
                        case "<":
                        case "<=":
                            e = "nullValue" in (a = r.value) ? Ls : "booleanValue" in a ? {
                                booleanValue: !1
                            } : "integerValue" in a || "doubleValue" in a ? {
                                doubleValue: NaN
                            } : "timestampValue" in a ? {
                                timestampValue: {
                                    seconds: Number.MIN_SAFE_INTEGER
                                }
                            } : "stringValue" in a ? {
                                stringValue: ""
                            } : "bytesValue" in a ? {
                                bytesValue: ""
                            } : "referenceValue" in a ? js(Ms.empty(), hi.empty()) : "geoPointValue" in a ? {
                                geoPointValue: {
                                    latitude: -90,
                                    longitude: -180
                                }
                            } : "arrayValue" in a ? {
                                arrayValue: {}
                            } : "mapValue" in a ? {
                                mapValue: {}
                            } : qr();
                            break;
                        case "==":
                        case "in":
                        case ">=":
                            e = r.value;
                            break;
                        case ">":
                            e = r.value, t = !1;
                            break;
                        case "!=":
                        case "not-in":
                            e = Ls
                    }
                    Ys({
                        value: i,
                        inclusive: s
                    }, {
                        value: e,
                        inclusive: t
                    }) < 0 && (i = e, s = t)
                }
                var a;
                if (null !== r)
                    for (let e = 0; e < t.orderBy.length; ++e)
                        if (t.orderBy[e].field.isEqual(n)) {
                            const t = r.position[e];
                            Ys({
                                value: i,
                                inclusive: s
                            }, {
                                value: t,
                                inclusive: r.inclusive
                            }) < 0 && (i = t, s = r.inclusive);
                            break
                        }
                return {
                    value: i,
                    inclusive: s
                }
            }

            function Da(t, n, r) {
                let i = Os,
                    s = !0;
                for (const r of xa(t, n)) {
                    let e = Os,
                        t = !0;
                    switch (r.op) {
                        case ">=":
                        case ">":
                            e = "nullValue" in (a = r.value) ? {
                                booleanValue: !1
                            } : "booleanValue" in a ? {
                                doubleValue: NaN
                            } : "integerValue" in a || "doubleValue" in a ? {
                                timestampValue: {
                                    seconds: Number.MIN_SAFE_INTEGER
                                }
                            } : "timestampValue" in a ? {
                                stringValue: ""
                            } : "stringValue" in a ? {
                                bytesValue: ""
                            } : "bytesValue" in a ? js(Ms.empty(), hi.empty()) : "referenceValue" in a ? {
                                geoPointValue: {
                                    latitude: -90,
                                    longitude: -180
                                }
                            } : "geoPointValue" in a ? {
                                arrayValue: {}
                            } : "arrayValue" in a ? {
                                mapValue: {}
                            } : "mapValue" in a ? Os : qr(), t = !1;
                            break;
                        case "==":
                        case "in":
                        case "<=":
                            e = r.value;
                            break;
                        case "<":
                            e = r.value, t = !1;
                            break;
                        case "!=":
                        case "not-in":
                            e = Os
                    }
                    0 < Js({
                        value: i,
                        inclusive: s
                    }, {
                        value: e,
                        inclusive: t
                    }) && (i = e, s = t)
                }
                var a;
                if (null !== r)
                    for (let e = 0; e < t.orderBy.length; ++e)
                        if (t.orderBy[e].field.isEqual(n)) {
                            const t = r.position[e];
                            0 < Js({
                                value: i,
                                inclusive: s
                            }, {
                                value: t,
                                inclusive: r.inclusive
                            }) && (i = t, s = r.inclusive);
                            break
                        }
                return {
                    value: i,
                    inclusive: s
                }
            }
            class Aa {
                constructor(e, t = null, n = [], r = [], i = null, s = "F", a = null, o = null) {
                    this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.limitType = s, this.startAt = a, this.endAt = o, this.le = null, this.he = null, this.Pe = null, this.startAt, this.endAt
                }
            }

            function Na(e, t, n, r, i, s, a, o) {
                return new Aa(e, t, n, r, i, s, a, o)
            }

            function ka(e) {
                return new Aa(e)
            }

            function Ra(e) {
                return 0 === e.filters.length && null === e.limit && null == e.startAt && null == e.endAt && (0 === e.explicitOrderBy.length || 1 === e.explicitOrderBy.length && e.explicitOrderBy[0].field.isKeyField())
            }

            function Ma(e) {
                return null !== e.collectionGroup
            }

            function Oa(t) {
                const n = t;
                if (null === n.le) {
                    n.le = [];
                    const t = new Set;
                    for (const i of n.explicitOrderBy) n.le.push(i), t.add(i.field.canonicalString());
                    const r = 0 < n.explicitOrderBy.length ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir : "asc",
                        e = function(e) {
                            let t = new ws(ci.comparator);
                            return e.filters.forEach(e => {
                                e.getFlattenedFilters().forEach(e => {
                                    e.isInequality() && (t = t.add(e.field))
                                })
                            }), t
                        }(n);
                    e.forEach(e => {
                        t.has(e.canonicalString()) || e.isKeyField() || n.le.push(new ra(e, r))
                    }), t.has(ci.keyField().canonicalString()) || n.le.push(new ra(ci.keyField(), r))
                }
                return n.le
            }

            function La(e) {
                const t = e;
                return t.he || (t.he = function(e, t) {
                    if ("F" === e.limitType) return Ia(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt); {
                        t = t.map(e => {
                            var t = "desc" === e.dir ? "asc" : "desc";
                            return new ra(e.field, t)
                        });
                        var n = e.endAt ? new ea(e.endAt.position, e.endAt.inclusive) : null,
                            r = e.startAt ? new ea(e.startAt.position, e.startAt.inclusive) : null;
                        return Ia(e.path, e.collectionGroup, t, e.filters, e.limit, n, r)
                    }
                }(t, Oa(e))), t.he
            }

            function Pa(e, t) {
                var n = e.filters.concat([t]);
                return new Aa(e.path, e.collectionGroup, e.explicitOrderBy.slice(), n, e.limit, e.limitType, e.startAt, e.endAt)
            }

            function Fa(e, t, n) {
                return new Aa(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt)
            }

            function Va(e, t) {
                return Ta(La(e), La(t)) && e.limitType === t.limitType
            }

            function Ba(e) {
                return `${Ea(La(e))}|lt:${e.limitType}`
            }

            function Ua(e) {
                return `Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),0<e.filters.length&&(t+=`, filters: [${e.filters.map(e=>da(e)).join(", ")}]`),Pi(e.limit)||(t+=", limit: "+e.limit),0<e.orderBy.length&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>qs(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>qs(e)).join(",")),`Target(${t})`}(La(e))}; limitType=${e.limitType})`
            }

            function qa(e, t) {
                return t.isFoundDocument() && (i = e, a = (s = t).key.path, null !== i.collectionGroup ? s.key.hasCollectionId(i.collectionGroup) && i.path.isPrefixOf(a) : hi.isDocumentKey(i.path) ? i.path.isEqual(a) : i.path.isImmediateParentOf(a)) && function(e, t) {
                    for (const n of Oa(e))
                        if (!n.field.isKeyField() && null === t.data.field(n.field)) return;
                    return 1
                }(e, t) && function(e, t) {
                    for (const n of e.filters)
                        if (!n.matches(t)) return;
                    return 1
                }(e, t) && (i = t, (!(t = e).startAt || (n = t.startAt, e = Oa(t), r = ta(n, e, i), n.inclusive ? r <= 0 : r < 0)) && (!t.endAt || (n = t.endAt, t = Oa(t), r = ta(n, t, i), n.inclusive ? 0 <= r : 0 < r)));
                var n, r, i, s, a
            }

            function ja(e) {
                return e.collectionGroup || (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2))
            }

            function Ga(i) {
                return (e, t) => {
                    let n = !1;
                    for (const r of Oa(i)) {
                        const i = function(e, t, n) {
                            var r = e.field.isKeyField() ? hi.comparator(t.key, n.key) : function(e, t, n) {
                                var r = t.data.field(e),
                                    i = n.data.field(e);
                                return null !== r && null !== i ? Bs(r, i) : qr()
                            }(e.field, t, n);
                            switch (e.dir) {
                                case "asc":
                                    return r;
                                case "desc":
                                    return -1 * r;
                                default:
                                    return qr()
                            }
                        }(r, e, t);
                        if (0 !== i) return i;
                        n = n || r.field.isKeyField()
                    }
                    return 0
                }
            }
            class za {
                constructor(e, t) {
                    this.mapKeyFn = e, this.equalsFn = t, this.inner = {}, this.innerSize = 0
                }
                get(e) {
                    const t = this.mapKeyFn(e),
                        n = this.inner[t];
                    if (void 0 !== n)
                        for (const [t, r] of n)
                            if (this.equalsFn(t, e)) return r
                }
                has(e) {
                    return void 0 !== this.get(e)
                }
                set(e, t) {
                    const n = this.mapKeyFn(e),
                        r = this.inner[n];
                    if (void 0 === r) return this.inner[n] = [
                        [e, t]
                    ], void this.innerSize++;
                    for (let i = 0; i < r.length; i++)
                        if (this.equalsFn(r[i][0], e)) return void(r[i] = [e, t]);
                    r.push([e, t]), this.innerSize++
                }
                delete(e) {
                    const t = this.mapKeyFn(e),
                        n = this.inner[t];
                    if (void 0 === n) return !1;
                    for (let r = 0; r < n.length; r++)
                        if (this.equalsFn(n[r][0], e)) return 1 === n.length ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, !0;
                    return !1
                }
                forEach(r) {
                    gs(this.inner, (e, t) => {
                        for (const [e, n] of t) r(e, n)
                    })
                }
                isEmpty() {
                    return ms(this.inner)
                }
                size() {
                    return this.innerSize
                }
            }
            const Ka = new ps(hi.comparator);
            const $a = new ps(hi.comparator);

            function Qa(...e) {
                let t = $a;
                for (const n of e) t = t.insert(n.key, n);
                return t
            }

            function Wa(e) {
                let n = $a;
                return e.forEach((e, t) => n = n.insert(e, t.overlayedDocument)), n
            }

            function Ha() {
                return new za(e => e.toString(), (e, t) => e.isEqual(t))
            }
            const Ya = new ps(hi.comparator),
                Ja = new ws(hi.comparator);

            function Xa(...e) {
                let t = Ja;
                for (const n of e) t = t.add(n);
                return t
            }
            const Za = new ws(ti);

            function eo(e, t) {
                if (e.useProto3Json) {
                    if (isNaN(t)) return {
                        doubleValue: "NaN"
                    };
                    if (t === 1 / 0) return {
                        doubleValue: "Infinity"
                    };
                    if (t === -1 / 0) return {
                        doubleValue: "-Infinity"
                    }
                }
                return {
                    doubleValue: Fi(t) ? "-0" : t
                }
            }

            function to(e) {
                return {
                    integerValue: "" + e
                }
            }

            function no(e, t) {
                return Vi(t) ? to(t) : eo(e, t)
            }
            class ro {
                constructor() {
                    this._ = void 0
                }
            }

            function io(e, t) {
                return e instanceof ho ? Gs(e = t) || (e = e) && "doubleValue" in e ? t : {
                    integerValue: 0
                } : null
            }
            class so extends ro {}
            class ao extends ro {
                constructor(e) {
                    super(), this.elements = e
                }
            }

            function oo(e, t) {
                const n = fo(t);
                for (const t of e.elements) n.some(e => Fs(e, t)) || n.push(t);
                return {
                    arrayValue: {
                        values: n
                    }
                }
            }
            class uo extends ro {
                constructor(e) {
                    super(), this.elements = e
                }
            }

            function co(e, t) {
                let n = fo(t);
                for (const t of e.elements) n = n.filter(e => !Fs(e, t));
                return {
                    arrayValue: {
                        values: n
                    }
                }
            }
            class ho extends ro {
                constructor(e, t) {
                    super(), this.serializer = e, this.Ie = t
                }
            }

            function lo(e) {
                return Cs(e.integerValue || e.doubleValue)
            }

            function fo(e) {
                return zs(e) && e.arrayValue.values ? e.arrayValue.values.slice() : []
            }
            class go {
                constructor(e, t) {
                    this.field = e, this.transform = t
                }
            }
            class mo {
                constructor(e, t) {
                    this.version = e, this.transformResults = t
                }
            }
            class po {
                constructor(e, t) {
                    this.updateTime = e, this.exists = t
                }
                static none() {
                    return new po
                }
                static exists(e) {
                    return new po(void 0, e)
                }
                static updateTime(e) {
                    return new po(e)
                }
                get isNone() {
                    return void 0 === this.updateTime && void 0 === this.exists
                }
                isEqual(e) {
                    return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime)
                }
            }

            function yo(e, t) {
                return void 0 !== e.updateTime ? t.isFoundDocument() && t.version.isEqual(e.updateTime) : void 0 === e.exists || e.exists === t.isFoundDocument()
            }
            class vo {}

            function wo(e, n) {
                if (!e.hasLocalMutations || n && 0 === n.fields.length) return null;
                if (null === n) return e.isNoDocument() ? new Do(e.key, po.none()) : new Eo(e.key, e.data, po.none()); {
                    const i = e.data,
                        s = Xs.empty();
                    let t = new ws(ci.comparator);
                    for (var r of n.fields)
                        if (!t.has(r)) {
                            let e = i.field(r);
                            null === e && 1 < r.length && (r = r.popLast(), e = i.field(r)), null === e ? s.delete(r) : s.set(r, e), t = t.add(r)
                        }
                    return new To(e.key, s, new Is(t.toArray()), po.none())
                }
            }

            function _o(e, t, n) {
                e instanceof Eo ? function(e, t, n) {
                    const r = e.value.clone(),
                        i = xo(e.fieldTransforms, t, n.transformResults);
                    r.setAll(i), t.convertToFoundDocument(n.version, r).setHasCommittedMutations()
                }(e, t, n) : e instanceof To ? function(e, t, n) {
                    if (!yo(e.precondition, t)) return t.convertToUnknownDocument(n.version);
                    const r = xo(e.fieldTransforms, t, n.transformResults),
                        i = t.data;
                    i.setAll(So(e)), i.setAll(r), t.convertToFoundDocument(n.version, i).setHasCommittedMutations()
                }(e, t, n) : t.convertToNoDocument(n.version).setHasCommittedMutations()
            }

            function bo(e, t, n, r) {
                return e instanceof Eo ? function(e, t, n, r) {
                    if (!yo(e.precondition, t)) return n;
                    const i = e.value.clone(),
                        s = Co(e.fieldTransforms, r, t);
                    return i.setAll(s), t.convertToFoundDocument(t.version, i).setHasLocalMutations(), null
                }(e, t, n, r) : e instanceof To ? function(e, t, n, r) {
                    if (!yo(e.precondition, t)) return n;
                    const i = Co(e.fieldTransforms, r, t),
                        s = t.data;
                    return s.setAll(So(e)), s.setAll(i), t.convertToFoundDocument(t.version, s).setHasLocalMutations(), null === n ? null : n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e => e.field))
                }(e, t, n, r) : (t = t, n = n, yo(e.precondition, t) ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null) : n)
            }

            function Io(e, t) {
                return e.type === t.type && !!e.key.isEqual(t.key) && !!e.precondition.isEqual(t.precondition) && (n = e.fieldTransforms, r = t.fieldTransforms, !!(void 0 === n && void 0 === r || n && r && ni(n, r, (e, t) => function(e, t) {
                    return e.field.isEqual(t.field) && (e = e.transform, t = t.transform, e instanceof ao && t instanceof ao || e instanceof uo && t instanceof uo ? ni(e.elements, t.elements, Fs) : e instanceof ho && t instanceof ho ? Fs(e.Ie, t.Ie) : e instanceof so && t instanceof so)
                }(e, t))) && (0 === e.type ? e.value.isEqual(t.value) : 1 !== e.type || e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)));
                var n, r
            }
            class Eo extends vo {
                constructor(e, t, n, r = []) {
                    super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = r, this.type = 0
                }
                getFieldMask() {
                    return null
                }
            }
            class To extends vo {
                constructor(e, t, n, r, i = []) {
                    super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = r, this.fieldTransforms = i, this.type = 1
                }
                getFieldMask() {
                    return this.fieldMask
                }
            }

            function So(n) {
                const r = new Map;
                return n.fieldMask.fields.forEach(e => {
                    var t;
                    e.isEmpty() || (t = n.data.field(e), r.set(e, t))
                }), r
            }

            function xo(e, t, n) {
                const r = new Map;
                jr(e.length === n.length);
                for (let h = 0; h < n.length; h++) {
                    var i = e[h],
                        s = i.transform,
                        a = t.data.field(i.field);
                    r.set(i.field, (o = s, u = a, c = n[h], o instanceof ao ? oo(o, u) : o instanceof uo ? co(o, u) : c))
                }
                var o, u, c;
                return r
            }

            function Co(e, t, n) {
                const r = new Map;
                for (const c of e) {
                    const e = c.transform,
                        h = n.data.field(c.field);
                    r.set(c.field, (i = e, s = h, a = t, u = o = void 0, i instanceof so ? function(e, t) {
                        const n = {
                            fields: {
                                __type__: {
                                    stringValue: "server_timestamp"
                                },
                                __local_write_time__: {
                                    timestampValue: {
                                        seconds: e.seconds,
                                        nanos: e.nanoseconds
                                    }
                                }
                            }
                        };
                        return (t = t && As(t) ? Ns(t) : t) && (n.fields.__previous_value__ = t), {
                            mapValue: n
                        }
                    }(a, s) : i instanceof ao ? oo(i, s) : i instanceof uo ? co(i, s) : (o = io(i = i, s), u = lo(o) + lo(i.Ie), Gs(o) && Gs(i.Ie) ? to(u) : eo(i.serializer, u))))
                }
                var i, s, a, o, u;
                return r
            }
            class Do extends vo {
                constructor(e, t) {
                    super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = []
                }
                getFieldMask() {
                    return null
                }
            }
            class Ao extends vo {
                constructor(e, t) {
                    super(), this.key = e, this.precondition = t, this.type = 3, this.fieldTransforms = []
                }
                getFieldMask() {
                    return null
                }
            }
            class No {
                constructor(e, t, n, r) {
                    this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = r
                }
                applyToRemoteDocument(e, t) {
                    var n = t.mutationResults;
                    for (let r = 0; r < this.mutations.length; r++) {
                        const i = this.mutations[r];
                        i.key.isEqual(e.key) && _o(i, e, n[r])
                    }
                }
                applyToLocalView(e, t) {
                    for (const n of this.baseMutations) n.key.isEqual(e.key) && (t = bo(n, e, t, this.localWriteTime));
                    for (const r of this.mutations) r.key.isEqual(e.key) && (t = bo(r, e, t, this.localWriteTime));
                    return t
                }
                applyToLocalDocumentSet(s, a) {
                    const o = Ha();
                    return this.mutations.forEach(e => {
                        const t = s.get(e.key),
                            n = t.overlayedDocument;
                        let r = this.applyToLocalView(n, t.mutatedFields);
                        r = a.has(e.key) ? null : r;
                        var i = wo(n, r);
                        null !== i && o.set(e.key, i), n.isValidDocument() || n.convertToNoDocument(si.min())
                    }), o
                }
                keys() {
                    return this.mutations.reduce((e, t) => e.add(t.key), Xa())
                }
                isEqual(e) {
                    return this.batchId === e.batchId && ni(this.mutations, e.mutations, (e, t) => Io(e, t)) && ni(this.baseMutations, e.baseMutations, (e, t) => Io(e, t))
                }
            }
            class ko {
                constructor(e, t, n, r) {
                    this.batch = e, this.commitVersion = t, this.mutationResults = n, this.docVersions = r
                }
                static from(e, t, n) {
                    jr(e.mutations.length === n.length);
                    let r = Ya;
                    var i = e.mutations;
                    for (let s = 0; s < i.length; s++) r = r.insert(i[s].key, n[s].version);
                    return new ko(e, t, n, r)
                }
            }
            class Ro {
                constructor(e, t) {
                    this.largestBatchId = e, this.mutation = t
                }
                getKey() {
                    return this.mutation.key
                }
                isEqual(e) {
                    return null !== e && this.mutation === e.mutation
                }
                toString() {
                    return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`
                }
            }
            class Mo {
                constructor(e, t) {
                    this.count = e, this.unchangedNames = t
                }
            }

            function Oo(e) {
                switch (e) {
                    default: return qr();
                    case Gr.CANCELLED:
                            case Gr.UNKNOWN:
                            case Gr.DEADLINE_EXCEEDED:
                            case Gr.RESOURCE_EXHAUSTED:
                            case Gr.INTERNAL:
                            case Gr.UNAVAILABLE:
                            case Gr.UNAUTHENTICATED:
                            return !1;
                    case Gr.INVALID_ARGUMENT:
                            case Gr.NOT_FOUND:
                            case Gr.ALREADY_EXISTS:
                            case Gr.PERMISSION_DENIED:
                            case Gr.FAILED_PRECONDITION:
                            case Gr.ABORTED:
                            case Gr.OUT_OF_RANGE:
                            case Gr.UNIMPLEMENTED:
                            case Gr.DATA_LOSS:
                            return !0
                }
            }

            function Lo(e) {
                if (void 0 === e) return Vr("GRPC error has no .code"), Gr.UNKNOWN;
                switch (e) {
                    case wr.OK:
                        return Gr.OK;
                    case wr.CANCELLED:
                        return Gr.CANCELLED;
                    case wr.UNKNOWN:
                        return Gr.UNKNOWN;
                    case wr.DEADLINE_EXCEEDED:
                        return Gr.DEADLINE_EXCEEDED;
                    case wr.RESOURCE_EXHAUSTED:
                        return Gr.RESOURCE_EXHAUSTED;
                    case wr.INTERNAL:
                        return Gr.INTERNAL;
                    case wr.UNAVAILABLE:
                        return Gr.UNAVAILABLE;
                    case wr.UNAUTHENTICATED:
                        return Gr.UNAUTHENTICATED;
                    case wr.INVALID_ARGUMENT:
                        return Gr.INVALID_ARGUMENT;
                    case wr.NOT_FOUND:
                        return Gr.NOT_FOUND;
                    case wr.ALREADY_EXISTS:
                        return Gr.ALREADY_EXISTS;
                    case wr.PERMISSION_DENIED:
                        return Gr.PERMISSION_DENIED;
                    case wr.FAILED_PRECONDITION:
                        return Gr.FAILED_PRECONDITION;
                    case wr.ABORTED:
                        return Gr.ABORTED;
                    case wr.OUT_OF_RANGE:
                        return Gr.OUT_OF_RANGE;
                    case wr.UNIMPLEMENTED:
                        return Gr.UNIMPLEMENTED;
                    case wr.DATA_LOSS:
                        return Gr.DATA_LOSS;
                    default:
                        return qr()
                }
            }

            function Po() {
                return new TextEncoder
            }(rt = wr = wr || {})[rt.OK = 0] = "OK", rt[rt.CANCELLED = 1] = "CANCELLED", rt[rt.UNKNOWN = 2] = "UNKNOWN", rt[rt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", rt[rt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", rt[rt.NOT_FOUND = 5] = "NOT_FOUND", rt[rt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", rt[rt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", rt[rt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", rt[rt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", rt[rt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", rt[rt.ABORTED = 10] = "ABORTED", rt[rt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", rt[rt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", rt[rt.INTERNAL = 13] = "INTERNAL", rt[rt.UNAVAILABLE = 14] = "UNAVAILABLE", rt[rt.DATA_LOSS = 15] = "DATA_LOSS";
            const Fo = new kr([4294967295, 4294967295], 0);

            function Vo(e) {
                const t = Po().encode(e),
                    n = new Nr;
                return n.update(t), new Uint8Array(n.digest())
            }

            function Bo(e) {
                const t = new DataView(e.buffer),
                    n = t.getUint32(0, !0),
                    r = t.getUint32(4, !0),
                    i = t.getUint32(8, !0),
                    s = t.getUint32(12, !0);
                return [new kr([n, r], 0), new kr([i, s], 0)]
            }
            class Uo {
                constructor(e, t, n) {
                    if (this.bitmap = e, this.padding = t, this.hashCount = n, t < 0 || 8 <= t) throw new qo(`Invalid padding: ${t}`);
                    if (n < 0) throw new qo(`Invalid hash count: ${n}`);
                    if (0 < e.length && 0 === this.hashCount) throw new qo(`Invalid hash count: ${n}`);
                    if (0 === e.length && 0 !== t) throw new qo(`Invalid padding when bitmap length is 0: ${t}`);
                    this.Te = 8 * e.length - t, this.Ee = kr.fromNumber(this.Te)
                }
                de(e, t, n) {
                    let r = e.add(t.multiply(kr.fromNumber(n)));
                    return 1 === r.compare(Fo) && (r = new kr([r.getBits(0), r.getBits(1)], 0)), r.modulo(this.Ee).toNumber()
                }
                Ae(e) {
                    return 0 != (this.bitmap[Math.floor(e / 8)] & 1 << e % 8)
                }
                mightContain(e) {
                    if (0 === this.Te) return !1;
                    const t = Vo(e),
                        [n, r] = Bo(t);
                    for (let i = 0; i < this.hashCount; i++) {
                        const t = this.de(n, r, i);
                        if (!this.Ae(t)) return !1
                    }
                    return !0
                }
                static create(e, t, n) {
                    const r = e % 8 == 0 ? 0 : 8 - e % 8,
                        i = new Uint8Array(Math.ceil(e / 8)),
                        s = new Uo(i, r, t);
                    return n.forEach(e => s.insert(e)), s
                }
                insert(t) {
                    if (0 !== this.Te) {
                        const n = Vo(t),
                            [r, i] = Bo(n);
                        for (let e = 0; e < this.hashCount; e++) {
                            const n = this.de(r, i, e);
                            this.Re(n)
                        }
                    }
                }
                Re(e) {
                    var t = Math.floor(e / 8);
                    this.bitmap[t] |= 1 << e % 8
                }
            }
            class qo extends Error {
                constructor() {
                    super(...arguments), this.name = "BloomFilterError"
                }
            }
            class jo {
                constructor(e, t, n, r, i) {
                    this.snapshotVersion = e, this.targetChanges = t, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i
                }
                static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
                    const r = new Map;
                    return r.set(e, Go.createSynthesizedTargetChangeForCurrentChange(e, t, n)), new jo(si.min(), r, new ps(ti), Ka, Xa())
                }
            }
            class Go {
                constructor(e, t, n, r, i) {
                    this.resumeToken = e, this.current = t, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i
                }
                static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
                    return new Go(n, t, Xa(), Xa(), Xa())
                }
            }
            class zo {
                constructor(e, t, n, r) {
                    this.Ve = e, this.removedTargetIds = t, this.key = n, this.me = r
                }
            }
            class Ko {
                constructor(e, t) {
                    this.targetId = e, this.fe = t
                }
            }
            class $o {
                constructor(e, t, n = Ts.EMPTY_BYTE_STRING, r = null) {
                    this.state = e, this.targetIds = t, this.resumeToken = n, this.cause = r
                }
            }
            class Qo {
                constructor() {
                    this.ge = 0, this.pe = Yo(), this.ye = Ts.EMPTY_BYTE_STRING, this.we = !1, this.Se = !0
                }
                get current() {
                    return this.we
                }
                get resumeToken() {
                    return this.ye
                }
                get be() {
                    return 0 !== this.ge
                }
                get De() {
                    return this.Se
                }
                Ce(e) {
                    0 < e.approximateByteSize() && (this.Se = !0, this.ye = e)
                }
                ve() {
                    let n = Xa(),
                        r = Xa(),
                        i = Xa();
                    return this.pe.forEach((e, t) => {
                        switch (t) {
                            case 0:
                                n = n.add(e);
                                break;
                            case 2:
                                r = r.add(e);
                                break;
                            case 1:
                                i = i.add(e);
                                break;
                            default:
                                qr()
                        }
                    }), new Go(this.ye, this.we, n, r, i)
                }
                Fe() {
                    this.Se = !1, this.pe = Yo()
                }
                Me(e, t) {
                    this.Se = !0, this.pe = this.pe.insert(e, t)
                }
                xe(e) {
                    this.Se = !0, this.pe = this.pe.remove(e)
                }
                Oe() {
                    this.ge += 1
                }
                Ne() {
                    --this.ge, jr(0 <= this.ge)
                }
                Le() {
                    this.Se = !0, this.we = !0
                }
            }
            class Wo {
                constructor(e) {
                    this.Be = e, this.ke = new Map, this.qe = Ka, this.Qe = Ho(), this.Ke = new ps(ti)
                }
                $e(e) {
                    for (const t of e.Ve) e.me && e.me.isFoundDocument() ? this.Ue(t, e.me) : this.We(t, e.key, e.me);
                    for (const n of e.removedTargetIds) this.We(n, e.key, e.me)
                }
                Ge(n) {
                    this.forEachTarget(n, e => {
                        const t = this.ze(e);
                        switch (n.state) {
                            case 0:
                                this.je(e) && t.Ce(n.resumeToken);
                                break;
                            case 1:
                                t.Ne(), t.be || t.Fe(), t.Ce(n.resumeToken);
                                break;
                            case 2:
                                t.Ne(), t.be || this.removeTarget(e);
                                break;
                            case 3:
                                this.je(e) && (t.Le(), t.Ce(n.resumeToken));
                                break;
                            case 4:
                                this.je(e) && (this.He(e), t.Ce(n.resumeToken));
                                break;
                            default:
                                qr()
                        }
                    })
                }
                forEachTarget(e, n) {
                    0 < e.targetIds.length ? e.targetIds.forEach(n) : this.ke.forEach((e, t) => {
                        this.je(t) && n(t)
                    })
                }
                Je(e) {
                    const t = e.targetId,
                        n = e.fe.count,
                        r = this.Ye(t);
                    if (r) {
                        var i = r.target;
                        if (Sa(i))
                            if (0 === n) {
                                const e = new hi(i.path);
                                this.We(t, e, Zs.newNoDocument(e, si.min()))
                            } else jr(1 === n);
                        else {
                            const r = this.Ze(t);
                            if (r !== n) {
                                const n = this.Xe(e),
                                    s = n ? this.et(n, e, r) : 1;
                                if (0 !== s) {
                                    this.He(t);
                                    const e = 2 === s ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
                                    this.Ke = this.Ke.insert(t, e)
                                }
                            }
                        }
                    }
                }
                Xe(e) {
                    var t = e.fe.unchangedNames;
                    if (!t || !t.bits) return null;
                    var {
                        bits: {
                            bitmap: n = "",
                            padding: r = 0
                        },
                        hashCount: t = 0
                    } = t;
                    let i, s;
                    try {
                        i = Ds(n).toUint8Array()
                    } catch (e) {
                        if (e instanceof Es) return Br("Decoding the base64 bloom filter in existence filter failed (" + e.message + "); ignoring the bloom filter and falling back to full re-query."), null;
                        throw e
                    }
                    try {
                        s = new Uo(i, r, t)
                    } catch (e) {
                        return Br(e instanceof qo ? "BloomFilter error: " : "Applying bloom filter failed: ", e), null
                    }
                    return 0 === s.Te ? null : s
                }
                et(e, t, n) {
                    return t.fe.count === n - this.rt(e, t.targetId) ? 0 : 2
                }
                rt(n, r) {
                    const e = this.Be.getRemoteKeysForTarget(r);
                    let i = 0;
                    return e.forEach(e => {
                        var t = this.Be.nt(),
                            t = `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`;
                        n.mightContain(t) || (this.We(r, e, null), i++)
                    }), i
                }
                it(r) {
                    const i = new Map;
                    this.ke.forEach((e, t) => {
                        var n = this.Ye(t);
                        if (n) {
                            if (e.current && Sa(n.target)) {
                                const i = new hi(n.target.path);
                                null !== this.qe.get(i) || this.st(t, i) || this.We(t, i, Zs.newNoDocument(i, r))
                            }
                            e.De && (i.set(t, e.ve()), e.Fe())
                        }
                    });
                    let s = Xa();
                    this.Qe.forEach((e, t) => {
                        let n = !0;
                        t.forEachWhile(e => {
                            var t = this.Ye(e);
                            return !t || "TargetPurposeLimboResolution" === t.purpose || (n = !1)
                        }), n && (s = s.add(e))
                    }), this.qe.forEach((e, t) => t.setReadTime(r));
                    var e = new jo(r, i, this.Ke, this.qe, s);
                    return this.qe = Ka, this.Qe = Ho(), this.Ke = new ps(ti), e
                }
                Ue(e, t) {
                    var n;
                    this.je(e) && (n = this.st(e, t.key) ? 2 : 0, this.ze(e).Me(t.key, n), this.qe = this.qe.insert(t.key, t), this.Qe = this.Qe.insert(t.key, this.ot(t.key).add(e)))
                }
                We(e, t, n) {
                    if (this.je(e)) {
                        const r = this.ze(e);
                        this.st(e, t) ? r.Me(t, 1) : r.xe(t), this.Qe = this.Qe.insert(t, this.ot(t).delete(e)), n && (this.qe = this.qe.insert(t, n))
                    }
                }
                removeTarget(e) {
                    this.ke.delete(e)
                }
                Ze(e) {
                    var t = this.ze(e).ve();
                    return this.Be.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size
                }
                Oe(e) {
                    this.ze(e).Oe()
                }
                ze(e) {
                    let t = this.ke.get(e);
                    return t || (t = new Qo, this.ke.set(e, t)), t
                }
                ot(e) {
                    let t = this.Qe.get(e);
                    return t || (t = new ws(ti), this.Qe = this.Qe.insert(e, t)), t
                }
                je(e) {
                    var t = null !== this.Ye(e);
                    return t || Fr("WatchChangeAggregator", "Detected inactive target", e), t
                }
                Ye(e) {
                    var t = this.ke.get(e);
                    return t && t.be ? null : this.Be._t(e)
                }
                He(t) {
                    this.ke.set(t, new Qo), this.Be.getRemoteKeysForTarget(t).forEach(e => {
                        this.We(t, e, null)
                    })
                }
                st(e, t) {
                    return this.Be.getRemoteKeysForTarget(e).has(t)
                }
            }

            function Ho() {
                return new ps(hi.comparator)
            }

            function Yo() {
                return new ps(hi.comparator)
            }
            const Jo = {
                    asc: "ASCENDING",
                    desc: "DESCENDING"
                },
                Xo = {
                    "<": "LESS_THAN",
                    "<=": "LESS_THAN_OR_EQUAL",
                    ">": "GREATER_THAN",
                    ">=": "GREATER_THAN_OR_EQUAL",
                    "==": "EQUAL",
                    "!=": "NOT_EQUAL",
                    "array-contains": "ARRAY_CONTAINS",
                    in: "IN",
                    "not-in": "NOT_IN",
                    "array-contains-any": "ARRAY_CONTAINS_ANY"
                },
                Zo = {
                    and: "AND",
                    or: "OR"
                };
            class eu {
                constructor(e, t) {
                    this.databaseId = e, this.useProto3Json = t
                }
            }

            function tu(e, t) {
                return e.useProto3Json || Pi(t) ? t : {
                    value: t
                }
            }

            function nu(e, t) {
                return e.useProto3Json ? `${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z` : {
                    seconds: "" + t.seconds,
                    nanos: t.nanoseconds
                }
            }

            function ru(e, t) {
                return e.useProto3Json ? t.toBase64() : t.toUint8Array()
            }

            function iu(e) {
                return jr(!!e), si.fromTimestamp((t = xs(e), new ii(t.seconds, t.nanos)));
                var t
            }

            function su(e, t) {
                return au(e, t).canonicalString()
            }

            function au(e, t) {
                const n = (e = e, new oi(["projects", e.projectId, "databases", e.database]).child("documents"));
                return void 0 === t ? n : n.child(t)
            }

            function ou(e) {
                var t = oi.fromString(e);
                return jr(Su(t)), t
            }

            function uu(e, t) {
                return su(e.databaseId, t.path)
            }

            function cu(e, t) {
                const n = ou(t);
                if (n.get(1) !== e.databaseId.projectId) throw new zr(Gr.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + e.databaseId.projectId);
                if (n.get(3) !== e.databaseId.database) throw new zr(Gr.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + e.databaseId.database);
                return new hi(fu(n))
            }

            function hu(e, t) {
                return su(e.databaseId, t)
            }

            function lu(e) {
                var t = ou(e);
                return 4 === t.length ? oi.emptyPath() : fu(t)
            }

            function du(e) {
                return new oi(["projects", e.databaseId.projectId, "databases", e.databaseId.database]).canonicalString()
            }

            function fu(e) {
                return jr(4 < e.length && "documents" === e.get(4)), e.popFirst(5)
            }

            function gu(e, t, n) {
                return {
                    name: uu(e, t),
                    fields: n.value.mapValue.fields
                }
            }

            function mu(e, t, n) {
                const r = cu(e, t.name),
                    i = iu(t.updateTime),
                    s = t.createTime ? iu(t.createTime) : si.min(),
                    a = new Xs({
                        mapValue: {
                            fields: t.fields
                        }
                    }),
                    o = Zs.newFoundDocument(r, i, s, a);
                return n && o.setHasCommittedMutations(), n ? o.setHasCommittedMutations() : o
            }

            function pu(e, t) {
                let n;
                if (t instanceof Eo) n = {
                    update: gu(e, t.key, t.value)
                };
                else if (t instanceof Do) n = {
                    delete: uu(e, t.key)
                };
                else if (t instanceof To) n = {
                    update: gu(e, t.key, t.data),
                    updateMask: function(e) {
                        const t = [];
                        return e.fields.forEach(e => t.push(e.canonicalString())), {
                            fieldPaths: t
                        }
                    }(t.fieldMask)
                };
                else {
                    if (!(t instanceof Ao)) return qr();
                    n = {
                        verify: uu(e, t.key)
                    }
                }
                return 0 < t.fieldTransforms.length && (n.updateTransforms = t.fieldTransforms.map(e => function(e) {
                    var t = e.transform;
                    if (t instanceof so) return {
                        fieldPath: e.field.canonicalString(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (t instanceof ao) return {
                        fieldPath: e.field.canonicalString(),
                        appendMissingElements: {
                            values: t.elements
                        }
                    };
                    if (t instanceof uo) return {
                        fieldPath: e.field.canonicalString(),
                        removeAllFromArray: {
                            values: t.elements
                        }
                    };
                    if (t instanceof ho) return {
                        fieldPath: e.field.canonicalString(),
                        increment: t.Ie
                    };
                    throw qr()
                }(e))), t.precondition.isNone || (n.currentDocument = (r = e, void 0 !== (e = t.precondition).updateTime ? {
                    updateTime: (t = e.updateTime, nu(r, t.toTimestamp()))
                } : void 0 !== e.exists ? {
                    exists: e.exists
                } : qr())), n;
                var r
            }

            function yu(t, e) {
                const n = e.currentDocument ? void 0 !== (i = e.currentDocument).updateTime ? po.updateTime(iu(i.updateTime)) : void 0 !== i.exists ? po.exists(i.exists) : po.none() : po.none(),
                    r = e.updateTransforms ? e.updateTransforms.map(e => function(e, t) {
                        let n = null;
                        if ("setToServerValue" in t) jr("REQUEST_TIME" === t.setToServerValue), n = new so;
                        else if ("appendMissingElements" in t) {
                            const e = t.appendMissingElements.values || [];
                            n = new ao(e)
                        } else if ("removeAllFromArray" in t) {
                            const e = t.removeAllFromArray.values || [];
                            n = new uo(e)
                        } else "increment" in t ? n = new ho(e, t.increment) : qr();
                        var r = ci.fromServerFormat(t.fieldPath);
                        return new go(r, n)
                    }(t, e)) : [];
                var i;
                if (e.update) {
                    e.update.name;
                    var s = cu(t, e.update.name),
                        a = new Xs({
                            mapValue: {
                                fields: e.update.fields
                            }
                        });
                    if (e.updateMask) {
                        const t = function(e) {
                            const t = e.fieldPaths || [];
                            return new Is(t.map(e => ci.fromServerFormat(e)))
                        }(e.updateMask);
                        return new To(s, a, t, n, r)
                    }
                    return new Eo(s, a, n, r)
                }
                if (e.delete) {
                    const r = cu(t, e.delete);
                    return new Do(r, n)
                }
                if (e.verify) {
                    const r = cu(t, e.verify);
                    return new Ao(r, n)
                }
                return qr()
            }

            function vu(e, t) {
                return {
                    documents: [hu(e, t.path)]
                }
            }

            function wu(e, t) {
                const n = {
                        structuredQuery: {}
                    },
                    r = t.path;
                let i;
                null !== t.collectionGroup ? (i = r, n.structuredQuery.from = [{
                    collectionId: t.collectionGroup,
                    allDescendants: !0
                }]) : (i = r.popLast(), n.structuredQuery.from = [{
                    collectionId: r.lastSegment()
                }]), n.parent = hu(e, i);
                var s = function(e) {
                    if (0 !== e.length) return function n(e) {
                        return e instanceof sa ? function(e) {
                            if ("==" === e.op) {
                                if ($s(e.value)) return {
                                    unaryFilter: {
                                        field: Eu(e.field),
                                        op: "IS_NAN"
                                    }
                                };
                                if (Ks(e.value)) return {
                                    unaryFilter: {
                                        field: Eu(e.field),
                                        op: "IS_NULL"
                                    }
                                }
                            } else if ("!=" === e.op) {
                                if ($s(e.value)) return {
                                    unaryFilter: {
                                        field: Eu(e.field),
                                        op: "IS_NOT_NAN"
                                    }
                                };
                                if (Ks(e.value)) return {
                                    unaryFilter: {
                                        field: Eu(e.field),
                                        op: "IS_NOT_NULL"
                                    }
                                }
                            }
                            return {
                                fieldFilter: {
                                    field: Eu(e.field),
                                    op: bu(e.op),
                                    value: e.value
                                }
                            }
                        }(e) : e instanceof aa ? function(e) {
                            const t = e.getFilters().map(e => n(e));
                            return 1 === t.length ? t[0] : {
                                compositeFilter: {
                                    op: Iu(e.op),
                                    filters: t
                                }
                            }
                        }(e) : qr()
                    }(aa.create(e, "and"))
                }(t.filters);
                s && (n.structuredQuery.where = s);
                s = function(e) {
                    if (0 !== e.length) return e.map(e => function(e) {
                        return {
                            field: Eu(e.field),
                            direction: (e = e.dir, Jo[e])
                        }
                    }(e))
                }(t.orderBy);
                s && (n.structuredQuery.orderBy = s);
                s = tu(e, t.limit);
                return null !== s && (n.structuredQuery.limit = s), t.startAt && (n.structuredQuery.startAt = {
                    before: (e = t.startAt).inclusive,
                    values: e.position
                }), t.endAt && (n.structuredQuery.endAt = {
                    before: !(t = t.endAt).inclusive,
                    values: t.position
                }), {
                    ut: n,
                    parent: i
                }
            }

            function _u(e) {
                let t = lu(e.parent);
                var n, r, i, s = e.structuredQuery,
                    a = s.from ? s.from.length : 0;
                let o = null;
                if (0 < a) {
                    jr(1 === a);
                    const f = s.from[0];
                    f.allDescendants ? o = f.collectionId : t = t.child(f.collectionId)
                }
                let u = [];
                s.where && (u = function(e) {
                    const t = function t(e) {
                        return void 0 !== e.unaryFilter ? function(e) {
                            switch (e.unaryFilter.op) {
                                case "IS_NAN":
                                    const t = Tu(e.unaryFilter.field);
                                    return sa.create(t, "==", {
                                        doubleValue: NaN
                                    });
                                case "IS_NULL":
                                    const n = Tu(e.unaryFilter.field);
                                    return sa.create(n, "==", {
                                        nullValue: "NULL_VALUE"
                                    });
                                case "IS_NOT_NAN":
                                    const r = Tu(e.unaryFilter.field);
                                    return sa.create(r, "!=", {
                                        doubleValue: NaN
                                    });
                                case "IS_NOT_NULL":
                                    const i = Tu(e.unaryFilter.field);
                                    return sa.create(i, "!=", {
                                        nullValue: "NULL_VALUE"
                                    });
                                default:
                                    return qr()
                            }
                        }(e) : void 0 !== e.fieldFilter ? function(e) {
                            return sa.create(Tu(e.fieldFilter.field), function(e) {
                                switch (e) {
                                    case "EQUAL":
                                        return "==";
                                    case "NOT_EQUAL":
                                        return "!=";
                                    case "GREATER_THAN":
                                        return ">";
                                    case "GREATER_THAN_OR_EQUAL":
                                        return ">=";
                                    case "LESS_THAN":
                                        return "<";
                                    case "LESS_THAN_OR_EQUAL":
                                        return "<=";
                                    case "ARRAY_CONTAINS":
                                        return "array-contains";
                                    case "IN":
                                        return "in";
                                    case "NOT_IN":
                                        return "not-in";
                                    case "ARRAY_CONTAINS_ANY":
                                        return "array-contains-any";
                                    default:
                                        return qr()
                                }
                            }(e.fieldFilter.op), e.fieldFilter.value)
                        }(e) : void 0 !== e.compositeFilter ? function(e) {
                            return aa.create(e.compositeFilter.filters.map(e => t(e)), function(e) {
                                switch (e) {
                                    case "AND":
                                        return "and";
                                    case "OR":
                                        return "or";
                                    default:
                                        return qr()
                                }
                            }(e.compositeFilter.op))
                        }(e) : qr()
                    }(e);
                    return t instanceof aa && ca(t) ? t.getFilters() : [t]
                }(s.where));
                let c = [];
                s.orderBy && (c = s.orderBy.map(e => function(e) {
                    return new ra(Tu(e.field), function(e) {
                        switch (e) {
                            case "ASCENDING":
                                return "asc";
                            case "DESCENDING":
                                return "desc";
                            default:
                                return
                        }
                    }(e.direction))
                }(e)));
                let h = null;
                s.limit && (h = (e = s.limit, Pi(n = "object" == typeof e ? e.value : e) ? null : n));
                let l = null;
                s.startAt && (l = (r = s.startAt, i = !!r.before, n = r.values || [], new ea(n, i)));
                let d = null;
                return s.endAt && (d = (r = s.endAt, i = !r.before, s = r.values || [], new ea(s, i))), Na(t, o, c, u, h, "F", l, d)
            }

            function bu(e) {
                return Xo[e]
            }

            function Iu(e) {
                return Zo[e]
            }

            function Eu(e) {
                return {
                    fieldPath: e.canonicalString()
                }
            }

            function Tu(e) {
                return ci.fromServerFormat(e.fieldPath)
            }

            function Su(e) {
                return 4 <= e.length && "projects" === e.get(0) && "databases" === e.get(2)
            }
            class xu {
                constructor(e, t, n, r, i = si.min(), s = si.min(), a = Ts.EMPTY_BYTE_STRING, o = null) {
                    this.target = e, this.targetId = t, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = s, this.resumeToken = a, this.expectedCount = o
                }
                withSequenceNumber(e) {
                    return new xu(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount)
                }
                withResumeToken(e, t) {
                    return new xu(this.target, this.targetId, this.purpose, this.sequenceNumber, t, this.lastLimboFreeSnapshotVersion, e, null)
                }
                withExpectedCount(e) {
                    return new xu(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, e)
                }
                withLastLimboFreeSnapshotVersion(e) {
                    return new xu(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken, this.expectedCount)
                }
            }
            class Cu {
                constructor(e) {
                    this.ct = e
                }
            }

            function Du(e, t) {
                const n = t.key,
                    r = {
                        prefixPath: n.getCollectionPath().popLast().toArray(),
                        collectionGroup: n.collectionGroup,
                        documentId: n.path.lastSegment(),
                        readTime: Au(t.readTime),
                        hasCommittedMutations: t.hasCommittedMutations
                    };
                if (t.isFoundDocument()) r.document = {
                    name: uu(i = e.ct, (e = t).key),
                    fields: e.data.value.mapValue.fields,
                    updateTime: nu(i, e.version.toTimestamp()),
                    createTime: nu(i, e.createTime.toTimestamp())
                };
                else if (t.isNoDocument()) r.noDocument = {
                    path: n.path.toArray(),
                    readTime: Nu(t.version)
                };
                else {
                    if (!t.isUnknownDocument()) return qr();
                    r.unknownDocument = {
                        path: n.path.toArray(),
                        version: Nu(t.version)
                    }
                }
                var i;
                return r
            }

            function Au(e) {
                var t = e.toTimestamp();
                return [t.seconds, t.nanoseconds]
            }

            function Nu(e) {
                var t = e.toTimestamp();
                return {
                    seconds: t.seconds,
                    nanoseconds: t.nanoseconds
                }
            }

            function ku(e) {
                var t = new ii(e.seconds, e.nanoseconds);
                return si.fromTimestamp(t)
            }

            function Ru(t, e) {
                const n = (e.baseMutations || []).map(e => yu(t.ct, e));
                for (let s = 0; s < e.mutations.length - 1; ++s) {
                    const n = e.mutations[s];
                    if (s + 1 < e.mutations.length && void 0 !== e.mutations[s + 1].transform) {
                        const r = e.mutations[s + 1];
                        n.updateTransforms = r.transform.fieldTransforms, e.mutations.splice(s + 1, 1), ++s
                    }
                }
                const r = e.mutations.map(e => yu(t.ct, e)),
                    i = ii.fromMillis(e.localWriteTimeMs);
                return new No(e.batchId, i, n, r)
            }

            function Mu(e) {
                var t, n = ku(e.readTime),
                    r = void 0 !== e.lastLimboFreeSnapshotVersion ? ku(e.lastLimboFreeSnapshotVersion) : si.min(),
                    i = void 0 !== e.query.documents ? (jr(1 === (t = e.query).documents.length), La(ka(lu(t.documents[0])))) : La(_u(e.query));
                return new xu(i, e.targetId, "TargetPurposeListen", e.lastListenSequenceNumber, n, r, Ts.fromBase64String(e.resumeToken))
            }

            function Ou(e, t) {
                var n = Nu(t.snapshotVersion),
                    r = Nu(t.lastLimboFreeSnapshotVersion),
                    i = Sa(t.target) ? vu(e.ct, t.target) : wu(e.ct, t.target).ut,
                    s = t.resumeToken.toBase64();
                return {
                    targetId: t.targetId,
                    canonicalId: Ea(t.target),
                    readTime: n,
                    resumeToken: s,
                    lastListenSequenceNumber: t.sequenceNumber,
                    lastLimboFreeSnapshotVersion: r,
                    query: i
                }
            }

            function Lu(e) {
                var t = _u({
                    parent: e.parent,
                    structuredQuery: e.structuredQuery
                });
                return "LAST" === e.limitType ? Fa(t, t.limit, "L") : t
            }

            function Pu(e, t) {
                return new Ro(t.largestBatchId, yu(e.ct, t.overlayMutation))
            }

            function Fu(e, t) {
                var n = t.path.lastSegment();
                return [e, Bi(t.path.popLast()), n]
            }

            function Vu(e, t, n, r) {
                return {
                    indexId: e,
                    uid: t,
                    sequenceNumber: n,
                    readTime: Nu(r.readTime),
                    documentKey: Bi(r.documentKey.path),
                    largestBatchId: r.largestBatchId
                }
            }
            class Bu {
                getBundleMetadata(e, t) {
                    return Uu(e).get(t).next(e => {
                        if (e) return {
                            id: (e = e).bundleId,
                            createTime: ku(e.createTime),
                            version: e.version
                        }
                    })
                }
                saveBundleMetadata(e, t) {
                    return Uu(e).put({
                        bundleId: (t = t).id,
                        createTime: Nu(iu(t.createTime)),
                        version: t.version
                    })
                }
                getNamedQuery(e, t) {
                    return qu(e).get(t).next(e => {
                        if (e) return {
                            name: (e = e).name,
                            query: Lu(e.bundledQuery),
                            readTime: ku(e.readTime)
                        }
                    })
                }
                saveNamedQuery(e, t) {
                    return qu(e).put({
                        name: (t = t).name,
                        readTime: Nu(iu(t.readTime)),
                        bundledQuery: t.bundledQuery
                    })
                }
            }

            function Uu(e) {
                return ds(e, "bundles")
            }

            function qu(e) {
                return ds(e, "namedQueries")
            }
            class ju {
                constructor(e, t) {
                    this.serializer = e, this.userId = t
                }
                static lt(e, t) {
                    var n = t.uid || "";
                    return new ju(e, n)
                }
                getOverlay(e, t) {
                    return Gu(e).get(Fu(this.userId, t)).next(e => e ? Pu(this.serializer, e) : null)
                }
                getOverlays(e, t) {
                    const n = Ha();
                    return Ei.forEach(t, t => this.getOverlay(e, t).next(e => {
                        null !== e && n.set(t, e)
                    })).next(() => n)
                }
                saveOverlays(r, i, e) {
                    const s = [];
                    return e.forEach((e, t) => {
                        var n = new Ro(i, t);
                        s.push(this.ht(r, n))
                    }), Ei.waitFor(s)
                }
                removeOverlaysForBatchId(n, e, r) {
                    const t = new Set;
                    e.forEach(e => t.add(Bi(e.getCollectionPath())));
                    const i = [];
                    return t.forEach(e => {
                        var t = IDBKeyRange.bound([this.userId, e, r], [this.userId, e, r + 1], !1, !0);
                        i.push(Gu(n).H("collectionPathOverlayIndex", t))
                    }), Ei.waitFor(i)
                }
                getOverlaysForCollection(e, t, n) {
                    const r = Ha(),
                        i = Bi(t),
                        s = IDBKeyRange.bound([this.userId, i, n], [this.userId, i, Number.POSITIVE_INFINITY], !0);
                    return Gu(e).W("collectionPathOverlayIndex", s).next(e => {
                        for (const t of e) {
                            const e = Pu(this.serializer, t);
                            r.set(e.getKey(), e)
                        }
                        return r
                    })
                }
                getOverlaysForCollectionGroup(e, t, n, i) {
                    const s = Ha();
                    let a;
                    var r = IDBKeyRange.bound([this.userId, t, n], [this.userId, t, Number.POSITIVE_INFINITY], !0);
                    return Gu(e).Y({
                        index: "collectionGroupOverlayIndex",
                        range: r
                    }, (e, t, n) => {
                        const r = Pu(this.serializer, t);
                        s.size() < i || r.largestBatchId === a ? (s.set(r.getKey(), r), a = r.largestBatchId) : n.done()
                    }).next(() => s)
                }
                ht(e, t) {
                    return Gu(e).put(function(e, t, n) {
                        var [, r, i] = Fu(t, n.mutation.key);
                        return {
                            userId: t,
                            collectionPath: r,
                            documentId: i,
                            collectionGroup: n.mutation.key.getCollectionGroup(),
                            largestBatchId: n.largestBatchId,
                            overlayMutation: pu(e.ct, n.mutation)
                        }
                    }(this.serializer, this.userId, t))
                }
            }

            function Gu(e) {
                return ds(e, "documentOverlays")
            }
            class zu {
                constructor() {}
                Pt(e, t) {
                    this.It(e, t), t.Tt()
                }
                It(e, t) {
                    var n, r;
                    "nullValue" in e ? this.Et(t, 5) : "booleanValue" in e ? (this.Et(t, 10), t.dt(e.booleanValue ? 1 : 0)) : "integerValue" in e ? (this.Et(t, 15), t.dt(Cs(e.integerValue))) : "doubleValue" in e ? (n = Cs(e.doubleValue), isNaN(n) ? this.Et(t, 13) : (this.Et(t, 15), Fi(n) ? t.dt(0) : t.dt(n))) : "timestampValue" in e ? (r = e.timestampValue, this.Et(t, 20), "string" == typeof r ? t.At(r) : (t.At(`${r.seconds||""}`), t.dt(r.nanos || 0))) : "stringValue" in e ? (this.Rt(e.stringValue, t), this.Vt(t)) : "bytesValue" in e ? (this.Et(t, 30), t.ft(Ds(e.bytesValue)), this.Vt(t)) : "referenceValue" in e ? this.gt(e.referenceValue, t) : "geoPointValue" in e ? (r = e.geoPointValue, this.Et(t, 45), t.dt(r.latitude || 0), t.dt(r.longitude || 0)) : "mapValue" in e ? Hs(e) ? this.Et(t, Number.MAX_SAFE_INTEGER) : (this.yt(e.mapValue, t), this.Vt(t)) : "arrayValue" in e ? (this.wt(e.arrayValue, t), this.Vt(t)) : qr()
                }
                Rt(e, t) {
                    this.Et(t, 25), this.St(e, t)
                }
                St(e, t) {
                    t.At(e)
                }
                yt(e, t) {
                    var n = e.fields || {};
                    this.Et(t, 55);
                    for (const e of Object.keys(n)) this.Rt(e, t), this.It(n[e], t)
                }
                wt(e, t) {
                    var n = e.values || [];
                    this.Et(t, 50);
                    for (const e of n) this.It(e, t)
                }
                gt(e, t) {
                    this.Et(t, 37), hi.fromName(e).path.forEach(e => {
                        this.Et(t, 60), this.St(e, t)
                    })
                }
                Et(e, t) {
                    e.dt(t)
                }
                Vt(e) {
                    e.dt(2)
                }
            }

            function Ku(e) {
                var t = 64 - function(e) {
                    let t = 0;
                    for (let r = 0; r < 8; ++r) {
                        var n = function(e) {
                            if (0 === e) return 8;
                            let t = 0;
                            return e >> 4 == 0 && (t += 4, e <<= 4), e >> 6 == 0 && (t += 2, e <<= 2), e >> 7 == 0 && (t += 1), t
                        }(255 & e[r]);
                        if (t += n, 8 !== n) break
                    }
                    return t
                }(e);
                return Math.ceil(t / 8)
            }
            zu.bt = new zu;
            class $u {
                constructor() {
                    this.buffer = new Uint8Array(1024), this.position = 0
                }
                Dt(e) {
                    const t = e[Symbol.iterator]();
                    let n = t.next();
                    for (; !n.done;) this.Ct(n.value), n = t.next();
                    this.vt()
                }
                Ft(e) {
                    const t = e[Symbol.iterator]();
                    let n = t.next();
                    for (; !n.done;) this.Mt(n.value), n = t.next();
                    this.xt()
                }
                Ot(e) {
                    for (const t of e) {
                        const e = t.charCodeAt(0);
                        if (e < 128) this.Ct(e);
                        else if (e < 2048) this.Ct(960 | e >>> 6), this.Ct(128 | 63 & e);
                        else if (t < "\ud800" || "\udbff" < t) this.Ct(480 | e >>> 12), this.Ct(128 | 63 & e >>> 6), this.Ct(128 | 63 & e);
                        else {
                            const e = t.codePointAt(0);
                            this.Ct(240 | e >>> 18), this.Ct(128 | 63 & e >>> 12), this.Ct(128 | 63 & e >>> 6), this.Ct(128 | 63 & e)
                        }
                    }
                    this.vt()
                }
                Nt(e) {
                    for (const t of e) {
                        const e = t.charCodeAt(0);
                        if (e < 128) this.Mt(e);
                        else if (e < 2048) this.Mt(960 | e >>> 6), this.Mt(128 | 63 & e);
                        else if (t < "\ud800" || "\udbff" < t) this.Mt(480 | e >>> 12), this.Mt(128 | 63 & e >>> 6), this.Mt(128 | 63 & e);
                        else {
                            const e = t.codePointAt(0);
                            this.Mt(240 | e >>> 18), this.Mt(128 | 63 & e >>> 12), this.Mt(128 | 63 & e >>> 6), this.Mt(128 | 63 & e)
                        }
                    }
                    this.xt()
                }
                Lt(e) {
                    var t = this.Bt(e),
                        n = Ku(t);
                    this.kt(1 + n), this.buffer[this.position++] = 255 & n;
                    for (let r = t.length - n; r < t.length; ++r) this.buffer[this.position++] = 255 & t[r]
                }
                qt(e) {
                    var t = this.Bt(e),
                        n = Ku(t);
                    this.kt(1 + n), this.buffer[this.position++] = ~(255 & n);
                    for (let r = t.length - n; r < t.length; ++r) this.buffer[this.position++] = ~(255 & t[r])
                }
                Qt() {
                    this.Kt(255), this.Kt(255)
                }
                $t() {
                    this.Ut(255), this.Ut(255)
                }
                reset() {
                    this.position = 0
                }
                seed(e) {
                    this.kt(e.length), this.buffer.set(e, this.position), this.position += e.length
                }
                Wt() {
                    return this.buffer.slice(0, this.position)
                }
                Bt(e) {
                    const t = function(e) {
                            const t = new DataView(new ArrayBuffer(8));
                            return t.setFloat64(0, e, !1), new Uint8Array(t.buffer)
                        }(e),
                        n = 0 != (128 & t[0]);
                    t[0] ^= n ? 255 : 128;
                    for (let r = 1; r < t.length; ++r) t[r] ^= n ? 255 : 0;
                    return t
                }
                Ct(e) {
                    var t = 255 & e;
                    0 == t ? (this.Kt(0), this.Kt(255)) : 255 == t ? (this.Kt(255), this.Kt(0)) : this.Kt(t)
                }
                Mt(e) {
                    var t = 255 & e;
                    0 == t ? (this.Ut(0), this.Ut(255)) : 255 == t ? (this.Ut(255), this.Ut(0)) : this.Ut(e)
                }
                vt() {
                    this.Kt(0), this.Kt(1)
                }
                xt() {
                    this.Ut(0), this.Ut(1)
                }
                Kt(e) {
                    this.kt(1), this.buffer[this.position++] = e
                }
                Ut(e) {
                    this.kt(1), this.buffer[this.position++] = ~e
                }
                kt(e) {
                    var t = e + this.position;
                    if (!(t <= this.buffer.length)) {
                        let e = 2 * this.buffer.length;
                        e < t && (e = t);
                        const n = new Uint8Array(e);
                        n.set(this.buffer), this.buffer = n
                    }
                }
            }
            class Qu {
                constructor(e) {
                    this.Gt = e
                }
                ft(e) {
                    this.Gt.Dt(e)
                }
                At(e) {
                    this.Gt.Ot(e)
                }
                dt(e) {
                    this.Gt.Lt(e)
                }
                Tt() {
                    this.Gt.Qt()
                }
            }
            class Wu {
                constructor(e) {
                    this.Gt = e
                }
                ft(e) {
                    this.Gt.Ft(e)
                }
                At(e) {
                    this.Gt.Nt(e)
                }
                dt(e) {
                    this.Gt.qt(e)
                }
                Tt() {
                    this.Gt.$t()
                }
            }
            class Hu {
                constructor() {
                    this.Gt = new $u, this.zt = new Qu(this.Gt), this.jt = new Wu(this.Gt)
                }
                seed(e) {
                    this.Gt.seed(e)
                }
                Ht(e) {
                    return 0 === e ? this.zt : this.jt
                }
                Wt() {
                    return this.Gt.Wt()
                }
                reset() {
                    this.Gt.reset()
                }
            }
            class Yu {
                constructor(e, t, n, r) {
                    this.indexId = e, this.documentKey = t, this.arrayValue = n, this.directionalValue = r
                }
                Jt() {
                    const e = this.directionalValue.length,
                        t = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e,
                        n = new Uint8Array(t);
                    return n.set(this.directionalValue, 0), t !== e ? n.set([0], this.directionalValue.length) : ++n[n.length - 1], new Yu(this.indexId, this.documentKey, this.arrayValue, n)
                }
            }

            function Ju(e, t) {
                let n = e.indexId - t.indexId;
                return 0 !== n ? n : (n = Xu(e.arrayValue, t.arrayValue), 0 !== n ? n : (n = Xu(e.directionalValue, t.directionalValue), 0 !== n ? n : hi.comparator(e.documentKey, t.documentKey)))
            }

            function Xu(e, t) {
                for (let r = 0; r < e.length && r < t.length; ++r) {
                    var n = e[r] - t[r];
                    if (0 != n) return n
                }
                return e.length - t.length
            }
            class Zu {
                constructor(e) {
                    this.Yt = new ws((e, t) => ci.comparator(e.field, t.field)), this.collectionId = null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment(), this.Zt = e.orderBy, this.Xt = [];
                    for (const t of e.filters) {
                        const e = t;
                        e.isInequality() ? this.Yt = this.Yt.add(e) : this.Xt.push(e)
                    }
                }
                get en() {
                    return 1 < this.Yt.size
                }
                tn(e) {
                    if (jr(e.collectionGroup === this.collectionId), this.en) return !1;
                    const t = di(e);
                    if (void 0 !== t && !this.nn(t)) return !1;
                    const n = fi(e);
                    let r = new Set,
                        i = 0,
                        s = 0;
                    for (; i < n.length && this.nn(n[i]); ++i) r = r.add(n[i].fieldPath.canonicalString());
                    if (i === n.length) return !0;
                    if (0 < this.Yt.size) {
                        const e = this.Yt.getIterator().getNext();
                        if (!r.has(e.field.canonicalString())) {
                            const t = n[i];
                            if (!this.rn(e, t) || !this.sn(this.Zt[s++], t)) return !1
                        }++i
                    }
                    for (; i < n.length; ++i) {
                        const e = n[i];
                        if (s >= this.Zt.length || !this.sn(this.Zt[s++], e)) return !1
                    }
                    return !0
                }
                on() {
                    if (this.en) return null;
                    let e = new ws(ci.comparator);
                    const t = [];
                    for (const n of this.Xt) n.field.isKeyField() || ("array-contains" === n.op || "array-contains-any" === n.op ? t.push(new gi(n.field, 2)) : e.has(n.field) || (e = e.add(n.field), t.push(new gi(n.field, 0))));
                    for (const r of this.Zt) r.field.isKeyField() || e.has(r.field) || (e = e.add(r.field), t.push(new gi(r.field, "asc" === r.dir ? 0 : 1)));
                    return new li(li.UNKNOWN_ID, this.collectionId, t, mi.empty())
                }
                nn(e) {
                    for (const t of this.Xt)
                        if (this.rn(t, e)) return !0;
                    return !1
                }
                rn(e, t) {
                    if (void 0 === e || !e.field.isEqual(t.fieldPath)) return !1;
                    var n = "array-contains" === e.op || "array-contains-any" === e.op;
                    return 2 === t.kind == n
                }
                sn(e, t) {
                    return !!e.field.isEqual(t.fieldPath) && (0 === t.kind && "asc" === e.dir || 1 === t.kind && "desc" === e.dir)
                }
            }

            function ec(e) {
                if (0 === e.getFilters().length) return [];
                const t = function t(e) {
                    if (jr(e instanceof sa || e instanceof aa), e instanceof sa) return e;
                    if (1 === e.filters.length) return t(e.filters[0]);
                    const n = e.filters.map(e => t(e));
                    let r = aa.create(n, e.op);
                    return r = ac(r), rc(r) ? r : (jr(r instanceof aa), jr(oa(r)), jr(1 < r.filters.length), r.filters.reduce((e, t) => ic(e, t)))
                }(function t(n) {
                    var e;
                    if (jr(n instanceof sa || n instanceof aa), n instanceof sa) {
                        if (n instanceof va) {
                            const r = (null === (e = null === (e = n.value.arrayValue) || void 0 === e ? void 0 : e.values) || void 0 === e ? void 0 : e.map(e => sa.create(n.field, "==", e))) || [];
                            return aa.create(r, "or")
                        }
                        return n
                    }
                    const r = n.filters.map(e => t(e));
                    return aa.create(r, n.op)
                }(e));
                return jr(rc(t)), tc(t) || nc(t) ? [t] : t.getFilters()
            }

            function tc(e) {
                return e instanceof sa
            }

            function nc(e) {
                return e instanceof aa && ca(e)
            }

            function rc(e) {
                return tc(e) || nc(e) || function(e) {
                    if (e instanceof aa && ua(e)) {
                        for (const t of e.getFilters())
                            if (!tc(t) && !nc(t)) return !1;
                        return !0
                    }
                    return !1
                }(e)
            }

            function ic(e, t) {
                var n, r;
                return jr(e instanceof sa || e instanceof aa), jr(t instanceof sa || t instanceof aa), ac(e instanceof sa ? t instanceof sa ? (n = e, r = t, aa.create([n, r], "and")) : sc(e, t) : t instanceof sa ? sc(t, e) : function(e, t) {
                    if (jr(0 < e.filters.length && 0 < t.filters.length), oa(e) && oa(t)) return la(e, t.getFilters());
                    const n = ua(e) ? e : t,
                        r = ua(e) ? t : e,
                        i = n.filters.map(e => ic(e, r));
                    return aa.create(i, "or")
                }(e, t))
            }

            function sc(t, e) {
                if (oa(e)) return la(e, t.getFilters());
                var n = e.filters.map(e => ic(t, e));
                return aa.create(n, "or")
            }

            function ac(t) {
                if (jr(t instanceof sa || t instanceof aa), t instanceof sa) return t;
                const e = t.getFilters();
                if (1 === e.length) return ac(e[0]);
                if (ha(t)) return t;
                const n = e.map(e => ac(e)),
                    r = [];
                return n.forEach(e => {
                    e instanceof sa ? r.push(e) : e instanceof aa && (e.op === t.op ? r.push(...e.filters) : r.push(e))
                }), 1 === r.length ? r[0] : aa.create(r, t.op)
            }
            class oc {
                constructor() {
                    this._n = new uc
                }
                addToCollectionParentIndex(e, t) {
                    return this._n.add(t), Ei.resolve()
                }
                getCollectionParents(e, t) {
                    return Ei.resolve(this._n.getEntries(t))
                }
                addFieldIndex(e, t) {
                    return Ei.resolve()
                }
                deleteFieldIndex(e, t) {
                    return Ei.resolve()
                }
                deleteAllFieldIndexes(e) {
                    return Ei.resolve()
                }
                createTargetIndexes(e, t) {
                    return Ei.resolve()
                }
                getDocumentsMatchingTarget(e, t) {
                    return Ei.resolve(null)
                }
                getIndexType(e, t) {
                    return Ei.resolve(0)
                }
                getFieldIndexes(e, t) {
                    return Ei.resolve([])
                }
                getNextCollectionGroupToUpdate(e) {
                    return Ei.resolve(null)
                }
                getMinOffset(e, t) {
                    return Ei.resolve(vi.min())
                }
                getMinOffsetFromCollectionGroup(e, t) {
                    return Ei.resolve(vi.min())
                }
                updateCollectionGroup(e, t, n) {
                    return Ei.resolve()
                }
                updateIndexEntries(e, t) {
                    return Ei.resolve()
                }
            }
            class uc {
                constructor() {
                    this.index = {}
                }
                add(e) {
                    const t = e.lastSegment(),
                        n = e.popLast(),
                        r = this.index[t] || new ws(oi.comparator),
                        i = !r.has(n);
                    return this.index[t] = r.add(n), i
                }
                has(e) {
                    const t = e.lastSegment(),
                        n = e.popLast(),
                        r = this.index[t];
                    return r && r.has(n)
                }
                getEntries(e) {
                    return (this.index[e] || new ws(oi.comparator)).toArray()
                }
            }
            const cc = new Uint8Array(0);
            class hc {
                constructor(e, t) {
                    this.databaseId = t, this.an = new uc, this.un = new za(e => Ea(e), (e, t) => Ta(e, t)), this.uid = e.uid || ""
                }
                addToCollectionParentIndex(e, t) {
                    if (this.an.has(t)) return Ei.resolve();
                    var n = t.lastSegment(),
                        r = t.popLast();
                    e.addOnCommittedListener(() => {
                        this.an.add(t)
                    });
                    r = {
                        collectionId: n,
                        parent: Bi(r)
                    };
                    return lc(e).put(r)
                }
                getCollectionParents(e, n) {
                    const r = [],
                        t = IDBKeyRange.bound([n, ""], [ri(n), ""], !1, !0);
                    return lc(e).W(t).next(e => {
                        for (const t of e) {
                            if (t.collectionId !== n) break;
                            r.push(qi(t.parent))
                        }
                        return r
                    })
                }
                addFieldIndex(e, t) {
                    const n = fc(e),
                        r = {
                            indexId: t.indexId,
                            collectionGroup: t.collectionGroup,
                            fields: t.fields.map(e => [e.fieldPath.canonicalString(), e.kind])
                        };
                    delete r.indexId;
                    const i = n.add(r);
                    if (t.indexState) {
                        const n = gc(e);
                        return i.next(e => {
                            n.put(Vu(e, this.uid, t.indexState.sequenceNumber, t.indexState.offset))
                        })
                    }
                    return i.next()
                }
                deleteFieldIndex(e, t) {
                    const n = fc(e),
                        r = gc(e),
                        i = dc(e);
                    return n.delete(t.indexId).next(() => r.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))).next(() => i.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0)))
                }
                deleteAllFieldIndexes(e) {
                    const t = fc(e),
                        n = dc(e),
                        r = gc(e);
                    return t.H().next(() => n.H()).next(() => r.H())
                }
                createTargetIndexes(n, e) {
                    return Ei.forEach(this.cn(e), t => this.getIndexType(n, t).next(e => {
                        if (0 === e || 1 === e) {
                            const e = new Zu(t).on();
                            if (null != e) return this.addFieldIndex(n, e)
                        }
                    }))
                }
                getDocumentsMatchingTarget(e, h) {
                    const l = dc(e);
                    let d = !0;
                    const n = new Map;
                    return Ei.forEach(this.cn(h), t => this.ln(e, t).next(e => {
                        d = d && !!e, n.set(t, e)
                    })).next(() => {
                        if (d) {
                            let c = Xa();
                            const d = [];
                            return Ei.forEach(n, (e, t) => {
                                var n;
                                Fr("IndexedDbIndexManager", `Using index ${n=e,`id=${n.indexId}|cg=${n.collectionGroup}|f=${n.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`} to execute ${Ea(h)}`);
                                var r = function(e, t) {
                                        var n = di(t);
                                        if (void 0 === n) return null;
                                        for (const t of xa(e, n.fieldPath)) switch (t.op) {
                                            case "array-contains-any":
                                                return t.value.arrayValue.values || [];
                                            case "array-contains":
                                                return [t.value]
                                        }
                                        return null
                                    }(t, e),
                                    i = function(e, t) {
                                        const n = new Map;
                                        for (const r of fi(t))
                                            for (const t of xa(e, r.fieldPath)) switch (t.op) {
                                                case "==":
                                                case "in":
                                                    n.set(r.fieldPath.canonicalString(), t.value);
                                                    break;
                                                case "not-in":
                                                case "!=":
                                                    return n.set(r.fieldPath.canonicalString(), t.value), Array.from(n.values())
                                            }
                                        return null
                                    }(t, e),
                                    s = function(e, t) {
                                        const n = [];
                                        let r = !0;
                                        for (const i of fi(t)) {
                                            const t = (0 === i.kind ? Ca : Da)(e, i.fieldPath, e.startAt);
                                            n.push(t.value), r = r && t.inclusive
                                        }
                                        return new ea(n, r)
                                    }(t, e),
                                    a = function(e, t) {
                                        const n = [];
                                        let r = !0;
                                        for (const i of fi(t)) {
                                            const t = (0 === i.kind ? Da : Ca)(e, i.fieldPath, e.endAt);
                                            n.push(t.value), r = r && t.inclusive
                                        }
                                        return new ea(n, r)
                                    }(t, e),
                                    o = this.hn(e, t, s),
                                    u = this.hn(e, t, a),
                                    i = this.Pn(e, t, i),
                                    i = this.In(e.indexId, r, o, s.inclusive, u, a.inclusive, i);
                                return Ei.forEach(i, e => l.j(e, h.limit).next(e => {
                                    e.forEach(e => {
                                        var t = hi.fromSegments(e.documentKey);
                                        c.has(t) || (c = c.add(t), d.push(t))
                                    })
                                }))
                            }).next(() => d)
                        }
                        return Ei.resolve(null)
                    })
                }
                cn(t) {
                    let e = this.un.get(t);
                    return e || (e = 0 === t.filters.length ? [t] : ec(aa.create(t.filters, "and")).map(e => Ia(t.path, t.collectionGroup, t.orderBy, e.getFilters(), t.limit, t.startAt, t.endAt)), this.un.set(t, e), e)
                }
                In(t, e, n, r, i, s, a) {
                    const o = (null != e ? e.length : 1) * Math.max(n.length, i.length),
                        u = o / (null != e ? e.length : 1),
                        c = [];
                    for (let h = 0; h < o; ++h) {
                        const o = e ? this.Tn(e[h / u]) : cc,
                            l = this.En(t, o, n[h % u], r),
                            d = this.dn(t, o, i[h % u], s),
                            f = a.map(e => this.En(t, o, e, !0));
                        c.push(...this.createRange(l, d, f))
                    }
                    return c
                }
                En(e, t, n, r) {
                    const i = new Yu(e, hi.empty(), t, n);
                    return r ? i : i.Jt()
                }
                dn(e, t, n, r) {
                    const i = new Yu(e, hi.empty(), t, n);
                    return r ? i.Jt() : i
                }
                ln(e, t) {
                    const r = new Zu(t),
                        n = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment();
                    return this.getFieldIndexes(e, n).next(e => {
                        let t = null;
                        for (const n of e) r.tn(n) && (!t || n.fields.length > t.fields.length) && (t = n);
                        return t
                    })
                }
                getIndexType(e, t) {
                    let n = 2;
                    const r = this.cn(t);
                    return Ei.forEach(r, t => this.ln(e, t).next(e => {
                        e ? 0 !== n && e.fields.length < function(e) {
                            let t = new ws(ci.comparator),
                                n = !1;
                            for (const r of e.filters)
                                for (const e of r.getFlattenedFilters()) e.field.isKeyField() || ("array-contains" === e.op || "array-contains-any" === e.op ? n = !0 : t = t.add(e.field));
                            for (const n of e.orderBy) n.field.isKeyField() || (t = t.add(n.field));
                            return t.size + (n ? 1 : 0)
                        }(t) && (n = 1) : n = 0
                    })).next(() => function(e) {
                        return null !== e.limit
                    }(t) && 1 < r.length && 2 === n ? 1 : n)
                }
                An(e, t) {
                    const n = new Hu;
                    for (const i of fi(e)) {
                        const e = t.data.field(i.fieldPath);
                        if (null == e) return null;
                        var r = n.Ht(i.kind);
                        zu.bt.Pt(e, r)
                    }
                    return n.Wt()
                }
                Tn(e) {
                    const t = new Hu;
                    return zu.bt.Pt(e, t.Ht(0)), t.Wt()
                }
                Rn(e, t) {
                    const n = new Hu;
                    return zu.bt.Pt(js(this.databaseId, t), n.Ht(0 === (r = fi(e)).length ? 0 : r[r.length - 1].kind)), n.Wt();
                    var r
                }
                Pn(e, t, n) {
                    if (null === n) return [];
                    let r = [];
                    r.push(new Hu);
                    let i = 0;
                    for (const s of fi(e)) {
                        const e = n[i++];
                        for (const n of r)
                            if (this.Vn(t, s.fieldPath) && zs(e)) r = this.mn(r, s, e);
                            else {
                                const t = n.Ht(s.kind);
                                zu.bt.Pt(e, t)
                            }
                    }
                    return this.fn(r)
                }
                hn(e, t, n) {
                    return this.Pn(e, t, n.position)
                }
                fn(e) {
                    const t = [];
                    for (let n = 0; n < e.length; ++n) t[n] = e[n].Wt();
                    return t
                }
                mn(e, t, n) {
                    const r = [...e],
                        i = [];
                    for (const e of n.arrayValue.values || [])
                        for (const n of r) {
                            const r = new Hu;
                            r.seed(n.Wt()), zu.bt.Pt(e, r.Ht(t.kind)), i.push(r)
                        }
                    return i
                }
                Vn(e, t) {
                    return !!e.filters.find(e => e instanceof sa && e.field.isEqual(t) && ("in" === e.op || "not-in" === e.op))
                }
                getFieldIndexes(e, t) {
                    const n = fc(e),
                        r = gc(e);
                    return (t ? n.W("collectionGroupIndex", IDBKeyRange.bound(t, t)) : n.W()).next(e => {
                        const s = [];
                        return Ei.forEach(e, i => r.get([i.indexId, this.uid]).next(e => {
                            var t, n, r;
                            s.push((t = i, n = (e = e) ? new mi(e.sequenceNumber, new vi(ku(e.readTime), new hi(qi(e.documentKey)), e.largestBatchId)) : mi.empty(), r = t.fields.map(([e, t]) => new gi(ci.fromServerFormat(e), t)), new li(t.indexId, t.collectionGroup, r, n)))
                        })).next(() => s)
                    })
                }
                getNextCollectionGroupToUpdate(e) {
                    return this.getFieldIndexes(e).next(e => 0 === e.length ? null : (e.sort((e, t) => {
                        var n = e.indexState.sequenceNumber - t.indexState.sequenceNumber;
                        return 0 != n ? n : ti(e.collectionGroup, t.collectionGroup)
                    }), e[0].collectionGroup))
                }
                updateCollectionGroup(e, n, r) {
                    const i = fc(e),
                        s = gc(e);
                    return this.gn(e).next(t => i.W("collectionGroupIndex", IDBKeyRange.bound(n, n)).next(e => Ei.forEach(e, e => s.put(Vu(e.indexId, this.uid, t, r)))))
                }
                updateIndexEntries(i, e) {
                    const n = new Map;
                    return Ei.forEach(e, (t, r) => {
                        var e = n.get(t.collectionGroup);
                        return (e ? Ei.resolve(e) : this.getFieldIndexes(i, t.collectionGroup)).next(e => (n.set(t.collectionGroup, e), Ei.forEach(e, n => this.pn(i, t, n).next(e => {
                            var t = this.yn(r, n);
                            return e.isEqual(t) ? Ei.resolve() : this.wn(i, r, n, e, t)
                        }))))
                    })
                }
                Sn(e, t, n, r) {
                    return dc(e).put({
                        indexId: r.indexId,
                        uid: this.uid,
                        arrayValue: r.arrayValue,
                        directionalValue: r.directionalValue,
                        orderedDocumentKey: this.Rn(n, t.key),
                        documentKey: t.key.path.toArray()
                    })
                }
                bn(e, t, n, r) {
                    return dc(e).delete([r.indexId, this.uid, r.arrayValue, r.directionalValue, this.Rn(n, t.key), t.key.path.toArray()])
                }
                pn(e, n, r) {
                    const t = dc(e);
                    let i = new ws(Ju);
                    return t.Y({
                        index: "documentKeyIndex",
                        range: IDBKeyRange.only([r.indexId, this.uid, this.Rn(r, n)])
                    }, (e, t) => {
                        i = i.add(new Yu(r.indexId, n, t.arrayValue, t.directionalValue))
                    }).next(() => i)
                }
                yn(e, t) {
                    let n = new ws(Ju);
                    var r = this.An(t, e);
                    if (null == r) return n;
                    const i = di(t);
                    if (null != i) {
                        var s = e.data.field(i.fieldPath);
                        if (zs(s))
                            for (const i of s.arrayValue.values || []) n = n.add(new Yu(t.indexId, e.key, this.Tn(i), r))
                    } else n = n.add(new Yu(t.indexId, e.key, cc, r));
                    return n
                }
                wn(t, n, r, e, i) {
                    Fr("IndexedDbIndexManager", "Updating index entries for document '%s'", n.key);
                    const s = [];
                    return function(e, t, n, r, i) {
                        var s = e.getIterator(),
                            a = t.getIterator();
                        let o = bs(s),
                            u = bs(a);
                        for (; o || u;) {
                            let e = !1,
                                t = !1;
                            if (o && u) {
                                const r = n(o, u);
                                r < 0 ? t = !0 : 0 < r && (e = !0)
                            } else null != o ? t = !0 : e = !0;
                            e ? (r(u), u = bs(a)) : t ? (i(o), o = bs(s)) : (o = bs(s), u = bs(a))
                        }
                    }(e, i, Ju, e => {
                        s.push(this.Sn(t, n, r, e))
                    }, e => {
                        s.push(this.bn(t, n, r, e))
                    }), Ei.waitFor(s)
                }
                gn(e) {
                    let r = 1;
                    return gc(e).Y({
                        index: "sequenceNumberIndex",
                        reverse: !0,
                        range: IDBKeyRange.upperBound([this.uid, Number.MAX_SAFE_INTEGER])
                    }, (e, t, n) => {
                        n.done(), r = t.sequenceNumber + 1
                    }).next(() => r)
                }
                createRange(e, t, n) {
                    n = n.sort((e, t) => Ju(e, t)).filter((e, t, n) => !t || 0 !== Ju(e, n[t - 1]));
                    const r = [];
                    r.push(e);
                    for (const i of n) {
                        const n = Ju(i, e),
                            s = Ju(i, t);
                        if (0 === n) r[0] = e.Jt();
                        else if (0 < n && s < 0) r.push(i), r.push(i.Jt());
                        else if (0 < s) break
                    }
                    r.push(t);
                    const i = [];
                    for (let a = 0; a < r.length; a += 2) {
                        if (this.Dn(r[a], r[a + 1])) return [];
                        const t = [r[a].indexId, this.uid, r[a].arrayValue, r[a].directionalValue, cc, []],
                            n = [r[a + 1].indexId, this.uid, r[a + 1].arrayValue, r[a + 1].directionalValue, cc, []];
                        i.push(IDBKeyRange.bound(t, n))
                    }
                    return i
                }
                Dn(e, t) {
                    return 0 < Ju(e, t)
                }
                getMinOffsetFromCollectionGroup(e, t) {
                    return this.getFieldIndexes(e, t).next(mc)
                }
                getMinOffset(t, e) {
                    return Ei.mapArray(this.cn(e), e => this.ln(t, e).next(e => e || qr())).next(mc)
                }
            }

            function lc(e) {
                return ds(e, "collectionParents")
            }

            function dc(e) {
                return ds(e, "indexEntries")
            }

            function fc(e) {
                return ds(e, "indexConfiguration")
            }

            function gc(e) {
                return ds(e, "indexState")
            }

            function mc(e) {
                jr(0 !== e.length);
                let t = e[0].indexState.offset,
                    n = t.largestBatchId;
                for (let i = 1; i < e.length; i++) {
                    var r = e[i].indexState.offset;
                    wi(r, t) < 0 && (t = r), n < r.largestBatchId && (n = r.largestBatchId)
                }
                return new vi(t.readTime, t.documentKey, n)
            }
            const pc = {
                didRun: !1,
                sequenceNumbersCollected: 0,
                targetsRemoved: 0,
                documentsRemoved: 0
            };
            class yc {
                constructor(e, t, n) {
                    this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n
                }
                static withCacheSize(e) {
                    return new yc(e, yc.DEFAULT_COLLECTION_PERCENTILE, yc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)
                }
            }

            function vc(e, t, n) {
                const r = e.store("mutations"),
                    i = e.store("documentMutations"),
                    s = [],
                    a = IDBKeyRange.only(n.batchId);
                let o = 0;
                const u = r.Y({
                    range: a
                }, (e, t, n) => (o++, n.delete()));
                s.push(u.next(() => {
                    jr(1 === o)
                }));
                const c = [];
                for (const e of n.mutations) {
                    const r = zi(t, e.key.path, n.batchId);
                    s.push(i.delete(r)), c.push(e.key)
                }
                return Ei.waitFor(s).next(() => c)
            }

            function wc(e) {
                if (!e) return 0;
                let t;
                if (e.document) t = e.document;
                else if (e.unknownDocument) t = e.unknownDocument;
                else {
                    if (!e.noDocument) throw qr();
                    t = e.noDocument
                }
                return JSON.stringify(t).length
            }
            yc.DEFAULT_COLLECTION_PERCENTILE = 10, yc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, yc.DEFAULT = new yc(41943040, yc.DEFAULT_COLLECTION_PERCENTILE, yc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), yc.DISABLED = new yc(-1, 0, 0);
            class _c {
                constructor(e, t, n, r) {
                    this.userId = e, this.serializer = t, this.indexManager = n, this.referenceDelegate = r, this.Cn = {}
                }
                static lt(e, t, n, r) {
                    jr("" !== e.uid);
                    var i = e.isAuthenticated() ? e.uid : "";
                    return new _c(i, t, n, r)
                }
                checkEmpty(e) {
                    let r = !0;
                    var t = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
                    return Ic(e).Y({
                        index: "userMutationsIndex",
                        range: t
                    }, (e, t, n) => {
                        r = !1, n.done()
                    }).next(() => r)
                }
                addMutationBatch(h, l, d, f) {
                    const g = Ec(h),
                        m = Ic(h);
                    return m.add({}).next(e => {
                        jr("number" == typeof e);
                        const t = new No(e, l, d, f),
                            n = (i = this.serializer, s = this.userId, a = t, o = a.baseMutations.map(e => pu(i.ct, e)), u = a.mutations.map(e => pu(i.ct, e)), {
                                userId: s,
                                batchId: a.batchId,
                                localWriteTimeMs: a.localWriteTime.toMillis(),
                                baseMutations: o,
                                mutations: u
                            }),
                            r = [];
                        var i, s, a, o, u;
                        let c = new ws((e, t) => ti(e.canonicalString(), t.canonicalString()));
                        for (const h of f) {
                            const l = zi(this.userId, h.key.path, e);
                            c = c.add(h.key.path.popLast()), r.push(m.put(n)), r.push(g.put(l, Ki))
                        }
                        return c.forEach(e => {
                            r.push(this.indexManager.addToCollectionParentIndex(h, e))
                        }), h.addOnCommittedListener(() => {
                            this.Cn[e] = t.keys()
                        }), Ei.waitFor(r).next(() => t)
                    })
                }
                lookupMutationBatch(e, t) {
                    return Ic(e).get(t).next(e => e ? (jr(e.userId === this.userId), Ru(this.serializer, e)) : null)
                }
                vn(e, n) {
                    return this.Cn[n] ? Ei.resolve(this.Cn[n]) : this.lookupMutationBatch(e, n).next(e => {
                        if (e) {
                            var t = e.keys();
                            return this.Cn[n] = t
                        }
                        return null
                    })
                }
                getNextMutationBatchAfterBatchId(e, t) {
                    const r = t + 1,
                        n = IDBKeyRange.lowerBound([this.userId, r]);
                    let i = null;
                    return Ic(e).Y({
                        index: "userMutationsIndex",
                        range: n
                    }, (e, t, n) => {
                        t.userId === this.userId && (jr(t.batchId >= r), i = Ru(this.serializer, t)), n.done()
                    }).next(() => i)
                }
                getHighestUnacknowledgedBatchId(e) {
                    var t = IDBKeyRange.upperBound([this.userId, Number.POSITIVE_INFINITY]);
                    let r = -1;
                    return Ic(e).Y({
                        index: "userMutationsIndex",
                        range: t,
                        reverse: !0
                    }, (e, t, n) => {
                        r = t.batchId, n.done()
                    }).next(() => r)
                }
                getAllMutationBatches(e) {
                    var t = IDBKeyRange.bound([this.userId, -1], [this.userId, Number.POSITIVE_INFINITY]);
                    return Ic(e).W("userMutationsIndex", t).next(e => e.map(e => Ru(this.serializer, e)))
                }
                getAllMutationBatchesAffectingDocumentKey(a, o) {
                    const e = Gi(this.userId, o.path),
                        t = IDBKeyRange.lowerBound(e),
                        u = [];
                    return Ec(a).Y({
                        range: t
                    }, (e, t, n) => {
                        var [r, i, s] = e, i = qi(i);
                        if (r === this.userId && o.path.isEqual(i)) return Ic(a).get(s).next(e => {
                            if (!e) throw qr();
                            jr(e.userId === this.userId), u.push(Ru(this.serializer, e))
                        });
                        n.done()
                    }).next(() => u)
                }
                getAllMutationBatchesAffectingDocumentKeys(t, e) {
                    let o = new ws(ti);
                    const n = [];
                    return e.forEach(a => {
                        var e = Gi(this.userId, a.path),
                            e = IDBKeyRange.lowerBound(e),
                            e = Ec(t).Y({
                                range: e
                            }, (e, t, n) => {
                                var [r, i, s] = e, i = qi(i);
                                r === this.userId && a.path.isEqual(i) ? o = o.add(s) : n.done()
                            });
                        n.push(e)
                    }), Ei.waitFor(n).next(() => this.Fn(t, o))
                }
                getAllMutationBatchesAffectingQuery(e, t) {
                    const a = t.path,
                        o = a.length + 1,
                        n = Gi(this.userId, a),
                        r = IDBKeyRange.lowerBound(n);
                    let u = new ws(ti);
                    return Ec(e).Y({
                        range: r
                    }, (e, t, n) => {
                        var [r, i, s] = e, i = qi(i);
                        r === this.userId && a.isPrefixOf(i) ? i.length === o && (u = u.add(s)) : n.done()
                    }).next(() => this.Fn(e, u))
                }
                Fn(t, e) {
                    const n = [],
                        r = [];
                    return e.forEach(e => {
                        r.push(Ic(t).get(e).next(e => {
                            if (null === e) throw qr();
                            jr(e.userId === this.userId), n.push(Ru(this.serializer, e))
                        }))
                    }), Ei.waitFor(r).next(() => n)
                }
                removeMutationBatch(t, n) {
                    return vc(t.ae, this.userId, n).next(e => (t.addOnCommittedListener(() => {
                        this.Mn(n.batchId)
                    }), Ei.forEach(e, e => this.referenceDelegate.markPotentiallyOrphaned(t, e))))
                }
                Mn(e) {
                    delete this.Cn[e]
                }
                performConsistencyCheck(n) {
                    return this.checkEmpty(n).next(e => {
                        if (!e) return Ei.resolve();
                        const t = IDBKeyRange.lowerBound([this.userId]),
                            r = [];
                        return Ec(n).Y({
                            range: t
                        }, (e, t, n) => {
                            if (e[0] === this.userId) {
                                const t = qi(e[1]);
                                r.push(t)
                            } else n.done()
                        }).next(() => {
                            jr(0 === r.length)
                        })
                    })
                }
                containsKey(e, t) {
                    return bc(e, this.userId, t)
                }
                xn(e) {
                    return Tc(e).get(this.userId).next(e => e || {
                        userId: this.userId,
                        lastAcknowledgedBatchId: -1,
                        lastStreamToken: ""
                    })
                }
            }

            function bc(e, s, t) {
                const n = Gi(s, t.path),
                    a = n[1],
                    r = IDBKeyRange.lowerBound(n);
                let o = !1;
                return Ec(e).Y({
                    range: r,
                    J: !0
                }, (e, t, n) => {
                    var [r, i] = e;
                    r === s && i === a && (o = !0), n.done()
                }).next(() => o)
            }

            function Ic(e) {
                return ds(e, "mutations")
            }

            function Ec(e) {
                return ds(e, "documentMutations")
            }

            function Tc(e) {
                return ds(e, "mutationQueues")
            }
            class Sc {
                constructor(e) {
                    this.On = e
                }
                next() {
                    return this.On += 2, this.On
                }
                static Nn() {
                    return new Sc(0)
                }
                static Ln() {
                    return new Sc(-1)
                }
            }
            class xc {
                constructor(e, t) {
                    this.referenceDelegate = e, this.serializer = t
                }
                allocateTargetId(n) {
                    return this.Bn(n).next(e => {
                        const t = new Sc(e.highestTargetId);
                        return e.highestTargetId = t.next(), this.kn(n, e).next(() => e.highestTargetId)
                    })
                }
                getLastRemoteSnapshotVersion(e) {
                    return this.Bn(e).next(e => si.fromTimestamp(new ii(e.lastRemoteSnapshotVersion.seconds, e.lastRemoteSnapshotVersion.nanoseconds)))
                }
                getHighestSequenceNumber(e) {
                    return this.Bn(e).next(e => e.highestListenSequenceNumber)
                }
                setTargetsMetadata(t, n, r) {
                    return this.Bn(t).next(e => (e.highestListenSequenceNumber = n, r && (e.lastRemoteSnapshotVersion = r.toTimestamp()), n > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = n), this.kn(t, e)))
                }
                addTargetData(t, n) {
                    return this.qn(t, n).next(() => this.Bn(t).next(e => (e.targetCount += 1, this.Qn(n, e), this.kn(t, e))))
                }
                updateTargetData(e, t) {
                    return this.qn(e, t)
                }
                removeTargetData(t, e) {
                    return this.removeMatchingKeysForTargetId(t, e.targetId).next(() => Cc(t).delete(e.targetId)).next(() => this.Bn(t)).next(e => (jr(0 < e.targetCount), --e.targetCount, this.kn(t, e)))
                }
                removeTargets(r, i, s) {
                    let a = 0;
                    const o = [];
                    return Cc(r).Y((e, t) => {
                        var n = Mu(t);
                        n.sequenceNumber <= i && null === s.get(n.targetId) && (a++, o.push(this.removeTargetData(r, n)))
                    }).next(() => Ei.waitFor(o)).next(() => a)
                }
                forEachTarget(e, r) {
                    return Cc(e).Y((e, t) => {
                        var n = Mu(t);
                        r(n)
                    })
                }
                Bn(e) {
                    return Dc(e).get("targetGlobalKey").next(e => (jr(null !== e), e))
                }
                kn(e, t) {
                    return Dc(e).put("targetGlobalKey", t)
                }
                qn(e, t) {
                    return Cc(e).put(Ou(this.serializer, t))
                }
                Qn(e, t) {
                    let n = !1;
                    return e.targetId > t.highestTargetId && (t.highestTargetId = e.targetId, n = !0), e.sequenceNumber > t.highestListenSequenceNumber && (t.highestListenSequenceNumber = e.sequenceNumber, n = !0), n
                }
                getTargetCount(e) {
                    return this.Bn(e).next(e => e.targetCount)
                }
                getTargetData(e, i) {
                    var t = Ea(i),
                        t = IDBKeyRange.bound([t, Number.NEGATIVE_INFINITY], [t, Number.POSITIVE_INFINITY]);
                    let s = null;
                    return Cc(e).Y({
                        range: t,
                        index: "queryTargetsIndex"
                    }, (e, t, n) => {
                        var r = Mu(t);
                        Ta(i, r.target) && (s = r, n.done())
                    }).next(() => s)
                }
                addMatchingKeys(n, e, r) {
                    const i = [],
                        s = Ac(n);
                    return e.forEach(e => {
                        var t = Bi(e.path);
                        i.push(s.put({
                            targetId: r,
                            path: t
                        })), i.push(this.referenceDelegate.addReference(n, r, e))
                    }), Ei.waitFor(i)
                }
                removeMatchingKeys(n, e, r) {
                    const i = Ac(n);
                    return Ei.forEach(e, e => {
                        var t = Bi(e.path);
                        return Ei.waitFor([i.delete([r, t]), this.referenceDelegate.removeReference(n, r, e)])
                    })
                }
                removeMatchingKeysForTargetId(e, t) {
                    const n = Ac(e),
                        r = IDBKeyRange.bound([t], [t + 1], !1, !0);
                    return n.delete(r)
                }
                getMatchingKeysForTargetId(e, t) {
                    const n = IDBKeyRange.bound([t], [t + 1], !1, !0),
                        r = Ac(e);
                    let i = Xa();
                    return r.Y({
                        range: n,
                        J: !0
                    }, (e, t, n) => {
                        var r = qi(e[1]),
                            r = new hi(r);
                        i = i.add(r)
                    }).next(() => i)
                }
                containsKey(e, t) {
                    var n = Bi(t.path),
                        n = IDBKeyRange.bound([n], [ri(n)], !1, !0);
                    let r = 0;
                    return Ac(e).Y({
                        index: "documentTargetsIndex",
                        J: !0,
                        range: n
                    }, ([e], t, n) => {
                        0 !== e && (r++, n.done())
                    }).next(() => 0 < r)
                }
                _t(e, t) {
                    return Cc(e).get(t).next(e => e ? Mu(e) : null)
                }
            }

            function Cc(e) {
                return ds(e, "targets")
            }

            function Dc(e) {
                return ds(e, "targetGlobal")
            }

            function Ac(e) {
                return ds(e, "targetDocuments")
            }

            function Nc([e, t], [n, r]) {
                var i = ti(e, n);
                return 0 === i ? ti(t, r) : i
            }
            class kc {
                constructor(e) {
                    this.Kn = e, this.buffer = new ws(Nc), this.$n = 0
                }
                Un() {
                    return ++this.$n
                }
                Wn(e) {
                    var t = [e, this.Un()];
                    if (this.buffer.size < this.Kn) this.buffer = this.buffer.add(t);
                    else {
                        const e = this.buffer.last();
                        Nc(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t))
                    }
                }
                get maxValue() {
                    return this.buffer.last()[0]
                }
            }
            class Rc {
                constructor(e, t, n) {
                    this.garbageCollector = e, this.asyncQueue = t, this.localStore = n, this.Gn = null
                }
                start() {
                    -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.zn(6e4)
                }
                stop() {
                    this.Gn && (this.Gn.cancel(), this.Gn = null)
                }
                get started() {
                    return null !== this.Gn
                }
                zn(e) {
                    Fr("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`), this.Gn = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection", e, async () => {
                        this.Gn = null;
                        try {
                            await this.localStore.collectGarbage(this.garbageCollector)
                        } catch (e) {
                            Di(e) ? Fr("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", e) : await Ii(e)
                        }
                        await this.zn(3e5)
                    })
                }
            }
            class Mc {
                constructor(e, t) {
                    this.jn = e, this.params = t
                }
                calculateTargetCount(e, t) {
                    return this.jn.Hn(e).next(e => Math.floor(t / 100 * e))
                }
                nthSequenceNumber(e, t) {
                    if (0 === t) return Ei.resolve(Li._e);
                    const n = new kc(t);
                    return this.jn.forEachTarget(e, e => n.Wn(e.sequenceNumber)).next(() => this.jn.Jn(e, e => n.Wn(e))).next(() => n.maxValue)
                }
                removeTargets(e, t, n) {
                    return this.jn.removeTargets(e, t, n)
                }
                removeOrphanedDocuments(e, t) {
                    return this.jn.removeOrphanedDocuments(e, t)
                }
                collect(t, n) {
                    return -1 === this.params.cacheSizeCollectionThreshold ? (Fr("LruGarbageCollector", "Garbage collection skipped; disabled"), Ei.resolve(pc)) : this.getCacheSize(t).next(e => e < this.params.cacheSizeCollectionThreshold ? (Fr("LruGarbageCollector", `Garbage collection skipped; Cache size ${e} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`), pc) : this.Yn(t, n))
                }
                getCacheSize(e) {
                    return this.jn.getCacheSize(e)
                }
                Yn(t, n) {
                    let r, i, s, a, o, u, c;
                    const h = Date.now();
                    return this.calculateTargetCount(t, this.params.percentileToCollect).next(e => (i = e > this.params.maximumSequenceNumbersToCollect ? (Fr("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`), this.params.maximumSequenceNumbersToCollect) : e, a = Date.now(), this.nthSequenceNumber(t, i))).next(e => (r = e, o = Date.now(), this.removeTargets(t, r, n))).next(e => (s = e, u = Date.now(), this.removeOrphanedDocuments(t, r))).next(e => (c = Date.now(), Pr() <= l.DEBUG && Fr("LruGarbageCollector", `LRU Garbage Collection\n\tCounted targets in ${a-h}ms\n\tDetermined least recently used ${i} in ` + (o - a) + "ms\n" + `\tRemoved ${s} targets in ` + (u - o) + "ms\n" + `\tRemoved ${e} documents in ` + (c - u) + "ms\n" + `Total Duration: ${c-h}ms`), Ei.resolve({
                        didRun: !0,
                        sequenceNumbersCollected: i,
                        targetsRemoved: s,
                        documentsRemoved: e
                    })))
                }
            }
            class Oc {
                constructor(e, t) {
                    this.db = e, this.garbageCollector = (e = this, t = t, new Mc(e, t))
                }
                Hn(e) {
                    const n = this.Zn(e);
                    return this.db.getTargetCache().getTargetCount(e).next(t => n.next(e => t + e))
                }
                Zn(e) {
                    let t = 0;
                    return this.Jn(e, e => {
                        t++
                    }).next(() => t)
                }
                forEachTarget(e, t) {
                    return this.db.getTargetCache().forEachTarget(e, t)
                }
                Jn(e, n) {
                    return this.Xn(e, (e, t) => n(t))
                }
                addReference(e, t, n) {
                    return Lc(e, n)
                }
                removeReference(e, t, n) {
                    return Lc(e, n)
                }
                removeTargets(e, t, n) {
                    return this.db.getTargetCache().removeTargets(e, t, n)
                }
                markPotentiallyOrphaned(e, t) {
                    return Lc(e, t)
                }
                er(t, n) {
                    let r = !1;
                    return Tc(t).Z(e => bc(t, e, n).next(e => (e && (r = !0), Ei.resolve(!e)))).next(() => r)
                }
                removeOrphanedDocuments(n, r) {
                    const i = this.db.getRemoteDocumentCache().newChangeBuffer(),
                        s = [];
                    let a = 0;
                    return this.Xn(n, (t, e) => {
                        if (e <= r) {
                            const r = this.er(n, t).next(e => {
                                if (!e) return a++, i.getEntry(n, t).next(() => (i.removeEntry(t, si.min()), Ac(n).delete(function(e) {
                                    return [0, Bi(e.path)]
                                }(t))))
                            });
                            s.push(r)
                        }
                    }).next(() => Ei.waitFor(s)).next(() => i.apply(n)).next(() => a)
                }
                removeTarget(e, t) {
                    var n = t.withSequenceNumber(e.currentSequenceNumber);
                    return this.db.getTargetCache().updateTargetData(e, n)
                }
                updateLimboDocument(e, t) {
                    return Lc(e, t)
                }
                Xn(e, r) {
                    const t = Ac(e);
                    let i, s = Li._e;
                    return t.Y({
                        index: "documentTargetsIndex"
                    }, ([e], {
                        path: t,
                        sequenceNumber: n
                    }) => {
                        0 === e ? (s !== Li._e && r(new hi(qi(i)), s), s = n, i = t) : s = Li._e
                    }).next(() => {
                        s !== Li._e && r(new hi(qi(i)), s)
                    })
                }
                getCacheSize(e) {
                    return this.db.getRemoteDocumentCache().getSize(e)
                }
            }

            function Lc(e, t) {
                return Ac(e).put((e = e.currentSequenceNumber, {
                    targetId: 0,
                    path: Bi(t.path),
                    sequenceNumber: e
                }))
            }
            class Pc {
                constructor() {
                    this.changes = new za(e => e.toString(), (e, t) => e.isEqual(t)), this.changesApplied = !1
                }
                addEntry(e) {
                    this.assertNotApplied(), this.changes.set(e.key, e)
                }
                removeEntry(e, t) {
                    this.assertNotApplied(), this.changes.set(e, Zs.newInvalidDocument(e).setReadTime(t))
                }
                getEntry(e, t) {
                    this.assertNotApplied();
                    var n = this.changes.get(t);
                    return void 0 !== n ? Ei.resolve(n) : this.getFromCache(e, t)
                }
                getEntries(e, t) {
                    return this.getAllFromCache(e, t)
                }
                apply(e) {
                    return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(e)
                }
                assertNotApplied() {}
            }
            class Fc {
                constructor(e) {
                    this.serializer = e
                }
                setIndexManager(e) {
                    this.indexManager = e
                }
                addEntry(e, t, n) {
                    return qc(e).put(n)
                }
                removeEntry(e, t, n) {
                    return qc(e).delete(function(e, t) {
                        const n = e.path.toArray();
                        return [n.slice(0, n.length - 2), n[n.length - 2], Au(t), n[n.length - 1]]
                    }(t, n))
                }
                updateMetadata(t, n) {
                    return this.getMetadata(t).next(e => (e.byteSize += n, this.tr(t, e)))
                }
                getEntry(e, n) {
                    let r = Zs.newInvalidDocument(n);
                    return qc(e).Y({
                        index: "documentKeyIndex",
                        range: IDBKeyRange.only(jc(n))
                    }, (e, t) => {
                        r = this.nr(n, t)
                    }).next(() => r)
                }
                rr(e, n) {
                    let r = {
                        size: 0,
                        document: Zs.newInvalidDocument(n)
                    };
                    return qc(e).Y({
                        index: "documentKeyIndex",
                        range: IDBKeyRange.only(jc(n))
                    }, (e, t) => {
                        r = {
                            document: this.nr(n, t),
                            size: wc(t)
                        }
                    }).next(() => r)
                }
                getEntries(e, t) {
                    let r = Ka;
                    return this.ir(e, t, (e, t) => {
                        var n = this.nr(e, t);
                        r = r.insert(e, n)
                    }).next(() => r)
                }
                sr(e, t) {
                    let r = Ka,
                        i = new ps(hi.comparator);
                    return this.ir(e, t, (e, t) => {
                        var n = this.nr(e, t);
                        r = r.insert(e, n), i = i.insert(e, wc(t))
                    }).next(() => ({
                        documents: r,
                        _r: i
                    }))
                }
                ir(e, t, i) {
                    if (t.isEmpty()) return Ei.resolve();
                    let n = new ws(zc);
                    t.forEach(e => n = n.add(e));
                    const r = IDBKeyRange.bound(jc(n.first()), jc(n.last())),
                        s = n.getIterator();
                    let a = s.getNext();
                    return qc(e).Y({
                        index: "documentKeyIndex",
                        range: r
                    }, (e, t, n) => {
                        for (var r = hi.fromSegments([...t.prefixPath, t.collectionGroup, t.documentId]); a && zc(a, r) < 0;) i(a, null), a = s.getNext();
                        a && a.isEqual(r) && (i(a, t), a = s.hasNext() ? s.getNext() : null), a ? n.U(jc(a)) : n.done()
                    }).next(() => {
                        for (; a;) i(a, null), a = s.hasNext() ? s.getNext() : null
                    })
                }
                getDocumentsMatchingQuery(e, n, t, r, i) {
                    const s = n.path,
                        a = [s.popLast().toArray(), s.lastSegment(), Au(t.readTime), t.documentKey.path.isEmpty() ? "" : t.documentKey.path.lastSegment()],
                        o = [s.popLast().toArray(), s.lastSegment(), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], ""];
                    return qc(e).W(IDBKeyRange.bound(a, o, !0)).next(e => {
                        null == i || i.incrementDocumentReadCount(e.length);
                        let t = Ka;
                        for (const i of e) {
                            const e = this.nr(hi.fromSegments(i.prefixPath.concat(i.collectionGroup, i.documentId)), i);
                            e.isFoundDocument() && (qa(n, e) || r.has(e.key)) && (t = t.insert(e.key, e))
                        }
                        return t
                    })
                }
                getAllFromCollectionGroup(e, t, n, i) {
                    let s = Ka;
                    var r = Gc(t, n),
                        a = Gc(t, vi.max());
                    return qc(e).Y({
                        index: "collectionGroupIndex",
                        range: IDBKeyRange.bound(r, a, !0)
                    }, (e, t, n) => {
                        var r = this.nr(hi.fromSegments(t.prefixPath.concat(t.collectionGroup, t.documentId)), t);
                        s = s.insert(r.key, r), s.size === i && n.done()
                    }).next(() => s)
                }
                newChangeBuffer(e) {
                    return new Bc(this, !!e && e.trackRemovals)
                }
                getSize(e) {
                    return this.getMetadata(e).next(e => e.byteSize)
                }
                getMetadata(e) {
                    return Uc(e).get("remoteDocumentGlobalKey").next(e => (jr(!!e), e))
                }
                tr(e, t) {
                    return Uc(e).put("remoteDocumentGlobalKey", t)
                }
                nr(e, t) {
                    if (t) {
                        const e = function(e, t) {
                            let n;
                            if (t.document) n = mu(e.ct, t.document, !!t.hasCommittedMutations);
                            else if (t.noDocument) {
                                const e = hi.fromSegments(t.noDocument.path),
                                    i = ku(t.noDocument.readTime);
                                n = Zs.newNoDocument(e, i), t.hasCommittedMutations && n.setHasCommittedMutations()
                            } else {
                                if (!t.unknownDocument) return qr(); {
                                    const e = hi.fromSegments(t.unknownDocument.path),
                                        s = ku(t.unknownDocument.version);
                                    n = Zs.newUnknownDocument(e, s)
                                }
                            }
                            return t.readTime && n.setReadTime((t = t.readTime, r = new ii(t[0], t[1]), si.fromTimestamp(r))), n;
                            var r
                        }(this.serializer, t);
                        if (!e.isNoDocument() || !e.version.isEqual(si.min())) return e
                    }
                    return Zs.newInvalidDocument(e)
                }
            }

            function Vc(e) {
                return new Fc(e)
            }
            class Bc extends Pc {
                constructor(e, t) {
                    super(), this.ar = e, this.trackRemovals = t, this.ur = new za(e => e.toString(), (e, t) => e.isEqual(t))
                }
                applyChanges(s) {
                    const a = [];
                    let o = 0,
                        u = new ws((e, t) => ti(e.canonicalString(), t.canonicalString()));
                    return this.changes.forEach((e, t) => {
                        var n = this.ur.get(e);
                        if (a.push(this.ar.removeEntry(s, e, n.readTime)), t.isValidDocument()) {
                            var r = Du(this.ar.serializer, t);
                            u = u.add(e.path.popLast());
                            var i = wc(r);
                            o += i - n.size, a.push(this.ar.addEntry(s, e, r))
                        } else if (o -= n.size, this.trackRemovals) {
                            const o = Du(this.ar.serializer, t.convertToNoDocument(si.min()));
                            a.push(this.ar.addEntry(s, e, o))
                        }
                    }), u.forEach(e => {
                        a.push(this.ar.indexManager.addToCollectionParentIndex(s, e))
                    }), a.push(this.ar.updateMetadata(s, o)), Ei.waitFor(a)
                }
                getFromCache(e, t) {
                    return this.ar.rr(e, t).next(e => (this.ur.set(t, {
                        size: e.size,
                        readTime: e.document.readTime
                    }), e.document))
                }
                getAllFromCache(e, t) {
                    return this.ar.sr(e, t).next(({
                        documents: n,
                        _r: e
                    }) => (e.forEach((e, t) => {
                        this.ur.set(e, {
                            size: t,
                            readTime: n.get(e).readTime
                        })
                    }), n))
                }
            }

            function Uc(e) {
                return ds(e, "remoteDocumentGlobal")
            }

            function qc(e) {
                return ds(e, "remoteDocumentsV14")
            }

            function jc(e) {
                const t = e.path.toArray();
                return [t.slice(0, t.length - 2), t[t.length - 2], t[t.length - 1]]
            }

            function Gc(e, t) {
                const n = t.documentKey.path.toArray();
                return [e, Au(t.readTime), n.slice(0, n.length - 2), 0 < n.length ? n[n.length - 1] : ""]
            }

            function zc(e, t) {
                var n = e.path.toArray(),
                    r = t.path.toArray();
                let i = 0;
                for (let s = 0; s < n.length - 2 && s < r.length - 2; ++s)
                    if (i = ti(n[s], r[s]), i) return i;
                return i = ti(n.length, r.length), i || (i = ti(n[n.length - 2], r[r.length - 2]), i || ti(n[n.length - 1], r[r.length - 1]))
            }
            class Kc {
                constructor(e, t) {
                    this.overlayedDocument = e, this.mutatedFields = t
                }
            }
            class $c {
                constructor(e, t, n, r) {
                    this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = r
                }
                getDocument(t, n) {
                    let r = null;
                    return this.documentOverlayCache.getOverlay(t, n).next(e => (r = e, this.remoteDocumentCache.getEntry(t, n))).next(e => (null !== r && bo(r.mutation, e, Is.empty(), ii.now()), e))
                }
                getDocuments(t, e) {
                    return this.remoteDocumentCache.getEntries(t, e).next(e => this.getLocalViewOfDocuments(t, e, Xa()).next(() => e))
                }
                getLocalViewOfDocuments(e, t, n = Xa()) {
                    const r = Ha();
                    return this.populateOverlays(e, r, t).next(() => this.computeViews(e, t, r, n).next(e => {
                        let n = Qa();
                        return e.forEach((e, t) => {
                            n = n.insert(e, t.overlayedDocument)
                        }), n
                    }))
                }
                getOverlayedDocuments(e, t) {
                    const n = Ha();
                    return this.populateOverlays(e, n, t).next(() => this.computeViews(e, t, n, Xa()))
                }
                populateOverlays(e, n, t) {
                    const r = [];
                    return t.forEach(e => {
                        n.has(e) || r.push(e)
                    }), this.documentOverlayCache.getOverlays(e, r).next(e => {
                        e.forEach((e, t) => {
                            n.set(e, t)
                        })
                    })
                }
                computeViews(e, t, r, i) {
                    let s = Ka;
                    const a = Ha(),
                        o = Ha();
                    return t.forEach((e, t) => {
                        const n = r.get(t.key);
                        i.has(t.key) && (void 0 === n || n.mutation instanceof To) ? s = s.insert(t.key, t) : void 0 !== n ? (a.set(t.key, n.mutation.getFieldMask()), bo(n.mutation, t, n.mutation.getFieldMask(), ii.now())) : a.set(t.key, Is.empty())
                    }), this.recalculateAndSaveOverlays(e, s).next(e => (e.forEach((e, t) => a.set(e, t)), t.forEach((e, t) => {
                        var n;
                        return o.set(e, new Kc(t, null !== (n = a.get(e)) && void 0 !== n ? n : null))
                    }), o))
                }
                recalculateAndSaveOverlays(s, a) {
                    const o = Ha();
                    let u = new ps((e, t) => e - t),
                        c = Xa();
                    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(s, a).next(e => {
                        for (const r of e) r.keys().forEach(e => {
                            var t, n = a.get(e);
                            null !== n && (t = o.get(e) || Is.empty(), t = r.applyToLocalView(n, t), o.set(e, t), t = (u.get(r.batchId) || Xa()).add(e), u = u.insert(r.batchId, t))
                        })
                    }).next(() => {
                        const e = [],
                            t = u.getReverseIterator();
                        for (; t.hasNext();) {
                            const u = t.getNext(),
                                n = u.key,
                                r = u.value,
                                i = Ha();
                            r.forEach(e => {
                                var t;
                                c.has(e) || (null !== (t = wo(a.get(e), o.get(e))) && i.set(e, t), c = c.add(e))
                            }), e.push(this.documentOverlayCache.saveOverlays(s, n, i))
                        }
                        return Ei.waitFor(e)
                    }).next(() => o)
                }
                recalculateAndSaveOverlaysForDocumentKeys(t, e) {
                    return this.remoteDocumentCache.getEntries(t, e).next(e => this.recalculateAndSaveOverlays(t, e))
                }
                getDocumentsMatchingQuery(e, t, n, r) {
                    return i = t, hi.isDocumentKey(i.path) && null === i.collectionGroup && 0 === i.filters.length ? this.getDocumentsMatchingDocumentQuery(e, t.path) : Ma(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r) : this.getDocumentsMatchingCollectionQuery(e, t, n, r);
                    var i
                }
                getNextDocuments(s, t, a, o) {
                    return this.remoteDocumentCache.getAllFromCollectionGroup(s, t, a, o).next(n => {
                        const e = 0 < o - n.size ? this.documentOverlayCache.getOverlaysForCollectionGroup(s, t, a.largestBatchId, o - n.size) : Ei.resolve(Ha());
                        let r = -1,
                            i = n;
                        return e.next(e => Ei.forEach(e, (t, e) => (r < e.largestBatchId && (r = e.largestBatchId), n.get(t) ? Ei.resolve() : this.remoteDocumentCache.getEntry(s, t).next(e => {
                            i = i.insert(t, e)
                        }))).next(() => this.populateOverlays(s, e, n)).next(() => this.computeViews(s, i, e, Xa())).next(e => ({
                            batchId: r,
                            changes: Wa(e)
                        })))
                    })
                }
                getDocumentsMatchingDocumentQuery(e, t) {
                    return this.getDocument(e, new hi(t)).next(e => {
                        let t = Qa();
                        return e.isFoundDocument() && (t = t.insert(e.key, e)), t
                    })
                }
                getDocumentsMatchingCollectionGroupQuery(r, i, s, a) {
                    const o = i.collectionGroup;
                    let u = Qa();
                    return this.indexManager.getCollectionParents(r, o).next(e => Ei.forEach(e, e => {
                        var t, n = (t = i, e = e.child(o), new Aa(e, null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt));
                        return this.getDocumentsMatchingCollectionQuery(r, n, s, a).next(e => {
                            e.forEach((e, t) => {
                                u = u.insert(e, t)
                            })
                        })
                    }).next(() => u))
                }
                getDocumentsMatchingCollectionQuery(t, s, n, r) {
                    let a;
                    return this.documentOverlayCache.getOverlaysForCollection(t, s.path, n.largestBatchId).next(e => (a = e, this.remoteDocumentCache.getDocumentsMatchingQuery(t, s, n, a, r))).next(r => {
                        a.forEach((e, t) => {
                            var n = t.getKey();
                            null === r.get(n) && (r = r.insert(n, Zs.newInvalidDocument(n)))
                        });
                        let i = Qa();
                        return r.forEach((e, t) => {
                            var n = a.get(e);
                            void 0 !== n && bo(n.mutation, t, Is.empty(), ii.now()), qa(s, t) && (i = i.insert(e, t))
                        }), i
                    })
                }
            }
            class Qc {
                constructor(e) {
                    this.serializer = e, this.cr = new Map, this.lr = new Map
                }
                getBundleMetadata(e, t) {
                    return Ei.resolve(this.cr.get(t))
                }
                saveBundleMetadata(e, t) {
                    return this.cr.set(t.id, {
                        id: t.id,
                        version: t.version,
                        createTime: iu(t.createTime)
                    }), Ei.resolve()
                }
                getNamedQuery(e, t) {
                    return Ei.resolve(this.lr.get(t))
                }
                saveNamedQuery(e, t) {
                    return this.lr.set(t.name, {
                        name: (t = t).name,
                        query: Lu(t.bundledQuery),
                        readTime: iu(t.readTime)
                    }), Ei.resolve()
                }
            }
            class Wc {
                constructor() {
                    this.overlays = new ps(hi.comparator), this.hr = new Map
                }
                getOverlay(e, t) {
                    return Ei.resolve(this.overlays.get(t))
                }
                getOverlays(e, t) {
                    const n = Ha();
                    return Ei.forEach(t, t => this.getOverlay(e, t).next(e => {
                        null !== e && n.set(t, e)
                    })).next(() => n)
                }
                saveOverlays(n, r, e) {
                    return e.forEach((e, t) => {
                        this.ht(n, r, t)
                    }), Ei.resolve()
                }
                removeOverlaysForBatchId(e, t, n) {
                    const r = this.hr.get(n);
                    return void 0 !== r && (r.forEach(e => this.overlays = this.overlays.remove(e)), this.hr.delete(n)), Ei.resolve()
                }
                getOverlaysForCollection(e, t, n) {
                    const r = Ha(),
                        i = t.length + 1,
                        s = new hi(t.child("")),
                        a = this.overlays.getIteratorFrom(s);
                    for (; a.hasNext();) {
                        const e = a.getNext().value,
                            s = e.getKey();
                        if (!t.isPrefixOf(s.path)) break;
                        s.path.length === i && e.largestBatchId > n && r.set(e.getKey(), e)
                    }
                    return Ei.resolve(r)
                }
                getOverlaysForCollectionGroup(t, e, n, r) {
                    let i = new ps((e, t) => e - t);
                    const s = this.overlays.getIterator();
                    for (; s.hasNext();) {
                        const t = s.getNext().value;
                        if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
                            let e = i.get(t.largestBatchId);
                            null === e && (e = Ha(), i = i.insert(t.largestBatchId, e)), e.set(t.getKey(), t)
                        }
                    }
                    const a = Ha(),
                        o = i.getIterator();
                    for (; o.hasNext() && (o.getNext().value.forEach((e, t) => a.set(e, t)), !(a.size() >= r)););
                    return Ei.resolve(a)
                }
                ht(e, t, n) {
                    var r = this.overlays.get(n.key);
                    if (null !== r) {
                        const e = this.hr.get(r.largestBatchId).delete(n.key);
                        this.hr.set(r.largestBatchId, e)
                    }
                    this.overlays = this.overlays.insert(n.key, new Ro(t, n));
                    let i = this.hr.get(t);
                    void 0 === i && (i = Xa(), this.hr.set(t, i)), this.hr.set(t, i.add(n.key))
                }
            }
            class Hc {
                constructor() {
                    this.Pr = new ws(Yc.Ir), this.Tr = new ws(Yc.Er)
                }
                isEmpty() {
                    return this.Pr.isEmpty()
                }
                addReference(e, t) {
                    var n = new Yc(e, t);
                    this.Pr = this.Pr.add(n), this.Tr = this.Tr.add(n)
                }
                dr(e, t) {
                    e.forEach(e => this.addReference(e, t))
                }
                removeReference(e, t) {
                    this.Ar(new Yc(e, t))
                }
                Rr(e, t) {
                    e.forEach(e => this.removeReference(e, t))
                }
                Vr(e) {
                    const t = new hi(new oi([])),
                        n = new Yc(t, e),
                        r = new Yc(t, e + 1),
                        i = [];
                    return this.Tr.forEachInRange([n, r], e => {
                        this.Ar(e), i.push(e.key)
                    }), i
                }
                mr() {
                    this.Pr.forEach(e => this.Ar(e))
                }
                Ar(e) {
                    this.Pr = this.Pr.delete(e), this.Tr = this.Tr.delete(e)
                }
                gr(e) {
                    var t = new hi(new oi([])),
                        n = new Yc(t, e),
                        t = new Yc(t, e + 1);
                    let r = Xa();
                    return this.Tr.forEachInRange([n, t], e => {
                        r = r.add(e.key)
                    }), r
                }
                containsKey(e) {
                    var t = new Yc(e, 0),
                        t = this.Pr.firstAfterOrEqual(t);
                    return null !== t && e.isEqual(t.key)
                }
            }
            class Yc {
                constructor(e, t) {
                    this.key = e, this.pr = t
                }
                static Ir(e, t) {
                    return hi.comparator(e.key, t.key) || ti(e.pr, t.pr)
                }
                static Er(e, t) {
                    return ti(e.pr, t.pr) || hi.comparator(e.key, t.key)
                }
            }
            class Jc {
                constructor(e, t) {
                    this.indexManager = e, this.referenceDelegate = t, this.mutationQueue = [], this.yr = 1, this.wr = new ws(Yc.Ir)
                }
                checkEmpty(e) {
                    return Ei.resolve(0 === this.mutationQueue.length)
                }
                addMutationBatch(e, t, n, r) {
                    var i = this.yr;
                    this.yr++, 0 < this.mutationQueue.length && this.mutationQueue[this.mutationQueue.length - 1];
                    var s = new No(i, t, n, r);
                    this.mutationQueue.push(s);
                    for (const t of r) this.wr = this.wr.add(new Yc(t.key, i)), this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast());
                    return Ei.resolve(s)
                }
                lookupMutationBatch(e, t) {
                    return Ei.resolve(this.Sr(t))
                }
                getNextMutationBatchAfterBatchId(e, t) {
                    var n = this.br(t + 1),
                        n = n < 0 ? 0 : n;
                    return Ei.resolve(this.mutationQueue.length > n ? this.mutationQueue[n] : null)
                }
                getHighestUnacknowledgedBatchId() {
                    return Ei.resolve(0 === this.mutationQueue.length ? -1 : this.yr - 1)
                }
                getAllMutationBatches(e) {
                    return Ei.resolve(this.mutationQueue.slice())
                }
                getAllMutationBatchesAffectingDocumentKey(e, t) {
                    const n = new Yc(t, 0),
                        r = new Yc(t, Number.POSITIVE_INFINITY),
                        i = [];
                    return this.wr.forEachInRange([n, r], e => {
                        var t = this.Sr(e.pr);
                        i.push(t)
                    }), Ei.resolve(i)
                }
                getAllMutationBatchesAffectingDocumentKeys(e, t) {
                    let r = new ws(ti);
                    return t.forEach(e => {
                        var t = new Yc(e, 0),
                            n = new Yc(e, Number.POSITIVE_INFINITY);
                        this.wr.forEachInRange([t, n], e => {
                            r = r.add(e.pr)
                        })
                    }), Ei.resolve(this.Dr(r))
                }
                getAllMutationBatchesAffectingQuery(e, t) {
                    const n = t.path,
                        r = n.length + 1;
                    let i = n;
                    hi.isDocumentKey(i) || (i = i.child(""));
                    var s = new Yc(new hi(i), 0);
                    let a = new ws(ti);
                    return this.wr.forEachWhile(e => {
                        var t = e.key.path;
                        return !!n.isPrefixOf(t) && (t.length === r && (a = a.add(e.pr)), !0)
                    }, s), Ei.resolve(this.Dr(a))
                }
                Dr(e) {
                    const n = [];
                    return e.forEach(e => {
                        var t = this.Sr(e);
                        null !== t && n.push(t)
                    }), n
                }
                removeMutationBatch(n, r) {
                    jr(0 === this.Cr(r.batchId, "removed")), this.mutationQueue.shift();
                    let i = this.wr;
                    return Ei.forEach(r.mutations, e => {
                        var t = new Yc(e.key, r.batchId);
                        return i = i.delete(t), this.referenceDelegate.markPotentiallyOrphaned(n, e.key)
                    }).next(() => {
                        this.wr = i
                    })
                }
                Mn(e) {}
                containsKey(e, t) {
                    var n = new Yc(t, 0),
                        n = this.wr.firstAfterOrEqual(n);
                    return Ei.resolve(t.isEqual(n && n.key))
                }
                performConsistencyCheck(e) {
                    return this.mutationQueue.length, Ei.resolve()
                }
                Cr(e, t) {
                    return this.br(e)
                }
                br(e) {
                    return 0 === this.mutationQueue.length ? 0 : e - this.mutationQueue[0].batchId
                }
                Sr(e) {
                    var t = this.br(e);
                    return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t]
                }
            }
            class Xc {
                constructor(e) {
                    this.vr = e, this.docs = new ps(hi.comparator), this.size = 0
                }
                setIndexManager(e) {
                    this.indexManager = e
                }
                addEntry(e, t) {
                    const n = t.key,
                        r = this.docs.get(n),
                        i = r ? r.size : 0,
                        s = this.vr(t);
                    return this.docs = this.docs.insert(n, {
                        document: t.mutableCopy(),
                        size: s
                    }), this.size += s - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
                }
                removeEntry(e) {
                    var t = this.docs.get(e);
                    t && (this.docs = this.docs.remove(e), this.size -= t.size)
                }
                getEntry(e, t) {
                    const n = this.docs.get(t);
                    return Ei.resolve(n ? n.document.mutableCopy() : Zs.newInvalidDocument(t))
                }
                getEntries(e, t) {
                    let n = Ka;
                    return t.forEach(e => {
                        const t = this.docs.get(e);
                        n = n.insert(e, t ? t.document.mutableCopy() : Zs.newInvalidDocument(e))
                    }), Ei.resolve(n)
                }
                getDocumentsMatchingQuery(e, t, n, r) {
                    let i = Ka;
                    const s = t.path,
                        a = new hi(s.child("")),
                        o = this.docs.getIteratorFrom(a);
                    for (; o.hasNext();) {
                        const {
                            key: e,
                            value: {
                                document: a
                            }
                        } = o.getNext();
                        if (!s.isPrefixOf(e.path)) break;
                        e.path.length > s.length + 1 || wi(yi(a), n) <= 0 || (r.has(a.key) || qa(t, a)) && (i = i.insert(a.key, a.mutableCopy()))
                    }
                    return Ei.resolve(i)
                }
                getAllFromCollectionGroup(e, t, n, r) {
                    qr()
                }
                Fr(e, t) {
                    return Ei.forEach(this.docs, e => t(e))
                }
                newChangeBuffer(e) {
                    return new Zc(this)
                }
                getSize(e) {
                    return Ei.resolve(this.size)
                }
            }
            class Zc extends Pc {
                constructor(e) {
                    super(), this.ar = e
                }
                applyChanges(n) {
                    const r = [];
                    return this.changes.forEach((e, t) => {
                        t.isValidDocument() ? r.push(this.ar.addEntry(n, t)) : this.ar.removeEntry(e)
                    }), Ei.waitFor(r)
                }
                getFromCache(e, t) {
                    return this.ar.getEntry(e, t)
                }
                getAllFromCache(e, t) {
                    return this.ar.getEntries(e, t)
                }
            }
            class eh {
                constructor(e) {
                    this.persistence = e, this.Mr = new za(e => Ea(e), Ta), this.lastRemoteSnapshotVersion = si.min(), this.highestTargetId = 0, this.Or = 0, this.Nr = new Hc, this.targetCount = 0, this.Lr = Sc.Nn()
                }
                forEachTarget(e, n) {
                    return this.Mr.forEach((e, t) => n(t)), Ei.resolve()
                }
                getLastRemoteSnapshotVersion(e) {
                    return Ei.resolve(this.lastRemoteSnapshotVersion)
                }
                getHighestSequenceNumber(e) {
                    return Ei.resolve(this.Or)
                }
                allocateTargetId(e) {
                    return this.highestTargetId = this.Lr.next(), Ei.resolve(this.highestTargetId)
                }
                setTargetsMetadata(e, t, n) {
                    return n && (this.lastRemoteSnapshotVersion = n), t > this.Or && (this.Or = t), Ei.resolve()
                }
                qn(e) {
                    this.Mr.set(e.target, e);
                    var t = e.targetId;
                    t > this.highestTargetId && (this.Lr = new Sc(t), this.highestTargetId = t), e.sequenceNumber > this.Or && (this.Or = e.sequenceNumber)
                }
                addTargetData(e, t) {
                    return this.qn(t), this.targetCount += 1, Ei.resolve()
                }
                updateTargetData(e, t) {
                    return this.qn(t), Ei.resolve()
                }
                removeTargetData(e, t) {
                    return this.Mr.delete(t.target), this.Nr.Vr(t.targetId), --this.targetCount, Ei.resolve()
                }
                removeTargets(n, r, i) {
                    let s = 0;
                    const a = [];
                    return this.Mr.forEach((e, t) => {
                        t.sequenceNumber <= r && null === i.get(t.targetId) && (this.Mr.delete(e), a.push(this.removeMatchingKeysForTargetId(n, t.targetId)), s++)
                    }), Ei.waitFor(a).next(() => s)
                }
                getTargetCount(e) {
                    return Ei.resolve(this.targetCount)
                }
                getTargetData(e, t) {
                    var n = this.Mr.get(t) || null;
                    return Ei.resolve(n)
                }
                addMatchingKeys(e, t, n) {
                    return this.Nr.dr(t, n), Ei.resolve()
                }
                removeMatchingKeys(t, e, n) {
                    this.Nr.Rr(e, n);
                    const r = this.persistence.referenceDelegate,
                        i = [];
                    return r && e.forEach(e => {
                        i.push(r.markPotentiallyOrphaned(t, e))
                    }), Ei.waitFor(i)
                }
                removeMatchingKeysForTargetId(e, t) {
                    return this.Nr.Vr(t), Ei.resolve()
                }
                getMatchingKeysForTargetId(e, t) {
                    var n = this.Nr.gr(t);
                    return Ei.resolve(n)
                }
                containsKey(e, t) {
                    return Ei.resolve(this.Nr.containsKey(t))
                }
            }
            class th {
                constructor(e, t) {
                    this.Br = {}, this.overlays = {}, this.kr = new Li(0), this.qr = !1, this.qr = !0, this.referenceDelegate = e(this), this.Qr = new eh(this), this.indexManager = new oc, this.remoteDocumentCache = (e = e => this.referenceDelegate.Kr(e), new Xc(e)), this.serializer = new Cu(t), this.$r = new Qc(this.serializer)
                }
                start() {
                    return Promise.resolve()
                }
                shutdown() {
                    return this.qr = !1, Promise.resolve()
                }
                get started() {
                    return this.qr
                }
                setDatabaseDeletedListener() {}
                setNetworkEnabled() {}
                getIndexManager(e) {
                    return this.indexManager
                }
                getDocumentOverlayCache(e) {
                    let t = this.overlays[e.toKey()];
                    return t || (t = new Wc, this.overlays[e.toKey()] = t), t
                }
                getMutationQueue(e, t) {
                    let n = this.Br[e.toKey()];
                    return n || (n = new Jc(t, this.referenceDelegate), this.Br[e.toKey()] = n), n
                }
                getTargetCache() {
                    return this.Qr
                }
                getRemoteDocumentCache() {
                    return this.remoteDocumentCache
                }
                getBundleCache() {
                    return this.$r
                }
                runTransaction(e, t, n) {
                    Fr("MemoryPersistence", "Starting transaction:", e);
                    const r = new nh(this.kr.next());
                    return this.referenceDelegate.Ur(), n(r).next(e => this.referenceDelegate.Wr(r).next(() => e)).toPromise().then(e => (r.raiseOnCommittedEvent(), e))
                }
                Gr(t, n) {
                    return Ei.or(Object.values(this.Br).map(e => () => e.containsKey(t, n)))
                }
            }
            class nh extends bi {
                constructor(e) {
                    super(), this.currentSequenceNumber = e
                }
            }
            class rh {
                constructor(e) {
                    this.persistence = e, this.zr = new Hc, this.jr = null
                }
                static Hr(e) {
                    return new rh(e)
                }
                get Jr() {
                    if (this.jr) return this.jr;
                    throw qr()
                }
                addReference(e, t, n) {
                    return this.zr.addReference(n, t), this.Jr.delete(n.toString()), Ei.resolve()
                }
                removeReference(e, t, n) {
                    return this.zr.removeReference(n, t), this.Jr.add(n.toString()), Ei.resolve()
                }
                markPotentiallyOrphaned(e, t) {
                    return this.Jr.add(t.toString()), Ei.resolve()
                }
                removeTarget(e, t) {
                    this.zr.Vr(t.targetId).forEach(e => this.Jr.add(e.toString()));
                    const n = this.persistence.getTargetCache();
                    return n.getMatchingKeysForTargetId(e, t.targetId).next(e => {
                        e.forEach(e => this.Jr.add(e.toString()))
                    }).next(() => n.removeTargetData(e, t))
                }
                Ur() {
                    this.jr = new Set
                }
                Wr(n) {
                    const r = this.persistence.getRemoteDocumentCache().newChangeBuffer();
                    return Ei.forEach(this.Jr, e => {
                        const t = hi.fromPath(e);
                        return this.Yr(n, t).next(e => {
                            e || r.removeEntry(t, si.min())
                        })
                    }).next(() => (this.jr = null, r.apply(n)))
                }
                updateLimboDocument(e, t) {
                    return this.Yr(e, t).next(e => {
                        e ? this.Jr.delete(t.toString()) : this.Jr.add(t.toString())
                    })
                }
                Kr(e) {
                    return 0
                }
                Yr(e, t) {
                    return Ei.or([() => Ei.resolve(this.zr.containsKey(t)), () => this.persistence.getTargetCache().containsKey(e, t), () => this.persistence.Gr(e, t)])
                }
            }
            class ih {
                constructor(e) {
                    this.serializer = e
                }
                N(t, e, n, r) {
                    const i = new Ti("createOrUpgrade", e);
                    var s;
                    n < 1 && 1 <= r && (t.createObjectStore("owner"), (s = t).createObjectStore("mutationQueues", {
                        keyPath: "userId"
                    }), s.createObjectStore("mutations", {
                        keyPath: "batchId",
                        autoIncrement: !0
                    }).createIndex("userMutationsIndex", ji, {
                        unique: !0
                    }), s.createObjectStore("documentMutations"), sh(t), t.createObjectStore("remoteDocuments"));
                    let a = Ei.resolve();
                    return n < 3 && 3 <= r && (0 !== n && ((s = t).deleteObjectStore("targetDocuments"), s.deleteObjectStore("targets"), s.deleteObjectStore("targetGlobal"), sh(t)), a = a.next(() => function(e) {
                        const t = e.store("targetGlobal"),
                            n = {
                                highestTargetId: 0,
                                highestListenSequenceNumber: 0,
                                lastRemoteSnapshotVersion: si.min().toTimestamp(),
                                targetCount: 0
                            };
                        return t.put("targetGlobalKey", n)
                    }(i))), n < 4 && 4 <= r && (0 !== n && (a = a.next(() => function(r, i) {
                        return i.store("mutations").W().next(e => {
                            r.deleteObjectStore("mutations"), r.createObjectStore("mutations", {
                                keyPath: "batchId",
                                autoIncrement: !0
                            }).createIndex("userMutationsIndex", ji, {
                                unique: !0
                            });
                            const t = i.store("mutations"),
                                n = e.map(e => t.put(e));
                            return Ei.waitFor(n)
                        })
                    }(t, i))), a = a.next(() => {
                        t.createObjectStore("clientMetadata", {
                            keyPath: "clientId"
                        })
                    })), n < 5 && 5 <= r && (a = a.next(() => this.Xr(i))), n < 6 && 6 <= r && (a = a.next(() => (function(e) {
                        e.createObjectStore("remoteDocumentGlobal")
                    }(t), this.ei(i)))), n < 7 && 7 <= r && (a = a.next(() => this.ti(i))), n < 8 && 8 <= r && (a = a.next(() => this.ni(t, i))), n < 9 && 9 <= r && (a = a.next(() => {
                        var e;
                        (e = t).objectStoreNames.contains("remoteDocumentChanges") && e.deleteObjectStore("remoteDocumentChanges")
                    })), n < 10 && 10 <= r && (a = a.next(() => this.ri(i))), n < 11 && 11 <= r && (a = a.next(() => {
                        t.createObjectStore("bundles", {
                            keyPath: "bundleId"
                        }), t.createObjectStore("namedQueries", {
                            keyPath: "name"
                        })
                    })), n < 12 && 12 <= r && (a = a.next(() => {
                        ! function(e) {
                            const t = e.createObjectStore("documentOverlays", {
                                keyPath: rs
                            });
                            t.createIndex("collectionPathOverlayIndex", is, {
                                unique: !1
                            }), t.createIndex("collectionGroupOverlayIndex", ss, {
                                unique: !1
                            })
                        }(t)
                    })), n < 13 && 13 <= r && (a = a.next(() => function(e) {
                        const t = e.createObjectStore("remoteDocumentsV14", {
                            keyPath: $i
                        });
                        t.createIndex("documentKeyIndex", Qi), t.createIndex("collectionGroupIndex", Wi)
                    }(t)).next(() => this.ii(t, i)).next(() => t.deleteObjectStore("remoteDocuments"))), n < 14 && 14 <= r && (a = a.next(() => this.si(t, i))), n < 15 && 15 <= r && (a = a.next(() => function(e) {
                        e.createObjectStore("indexConfiguration", {
                            keyPath: "indexId",
                            autoIncrement: !0
                        }).createIndex("collectionGroupIndex", "collectionGroup", {
                            unique: !1
                        }), e.createObjectStore("indexState", {
                            keyPath: Zi
                        }).createIndex("sequenceNumberIndex", es, {
                            unique: !1
                        }), e.createObjectStore("indexEntries", {
                            keyPath: ts
                        }).createIndex("documentKeyIndex", ns, {
                            unique: !1
                        })
                    }(t))), a
                }
                ei(t) {
                    let n = 0;
                    return t.store("remoteDocuments").Y((e, t) => {
                        n += wc(t)
                    }).next(() => {
                        var e = {
                            byteSize: n
                        };
                        return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey", e)
                    })
                }
                Xr(r) {
                    const e = r.store("mutationQueues"),
                        t = r.store("mutations");
                    return e.W().next(e => Ei.forEach(e, n => {
                        var e = IDBKeyRange.bound([n.userId, -1], [n.userId, n.lastAcknowledgedBatchId]);
                        return t.W("userMutationsIndex", e).next(e => Ei.forEach(e, e => {
                            jr(e.userId === n.userId);
                            var t = Ru(this.serializer, e);
                            return vc(r, n.userId, t).next(() => {})
                        }))
                    }))
                }
                ti(e) {
                    const a = e.store("targetDocuments"),
                        t = e.store("remoteDocuments");
                    return e.store("targetGlobal").get("targetGlobalKey").next(i => {
                        const s = [];
                        return t.Y((e, t) => {
                            const n = new oi(e),
                                r = [0, Bi(n)];
                            s.push(a.get(r).next(e => e ? Ei.resolve() : (e => a.put({
                                targetId: 0,
                                path: Bi(e),
                                sequenceNumber: i.highestListenSequenceNumber
                            }))(n)))
                        }).next(() => Ei.waitFor(s))
                    })
                }
                ni(e, t) {
                    e.createObjectStore("collectionParents", {
                        keyPath: Xi
                    });
                    const n = t.store("collectionParents"),
                        r = new uc,
                        i = e => {
                            if (r.add(e)) {
                                const t = e.lastSegment(),
                                    r = e.popLast();
                                return n.put({
                                    collectionId: t,
                                    parent: Bi(r)
                                })
                            }
                        };
                    return t.store("remoteDocuments").Y({
                        J: !0
                    }, (e, t) => {
                        const n = new oi(e);
                        return i(n.popLast())
                    }).next(() => t.store("documentMutations").Y({
                        J: !0
                    }, ([, e], t) => {
                        const n = qi(e);
                        return i(n.popLast())
                    }))
                }
                ri(e) {
                    const r = e.store("targets");
                    return r.Y((e, t) => {
                        var n = Mu(t),
                            n = Ou(this.serializer, n);
                        return r.put(n)
                    })
                }
                ii(e, a) {
                    const t = a.store("remoteDocuments"),
                        o = [];
                    return t.Y((e, t) => {
                        const n = a.store("remoteDocumentsV14"),
                            r = ((s = t).document ? new hi(oi.fromString(s.document.name).popFirst(5)) : s.noDocument ? hi.fromSegments(s.noDocument.path) : s.unknownDocument ? hi.fromSegments(s.unknownDocument.path) : qr()).path.toArray(),
                            i = {
                                prefixPath: r.slice(0, r.length - 2),
                                collectionGroup: r[r.length - 2],
                                documentId: r[r.length - 1],
                                readTime: t.readTime || [0, 0],
                                unknownDocument: t.unknownDocument,
                                noDocument: t.noDocument,
                                document: t.document,
                                hasCommittedMutations: !!t.hasCommittedMutations
                            };
                        var s;
                        o.push(n.put(i))
                    }).next(() => Ei.waitFor(o))
                }
                si(e, s) {
                    const t = s.store("mutations"),
                        a = Vc(this.serializer),
                        o = new th(rh.Hr, this.serializer.ct);
                    return t.W().next(e => {
                        const r = new Map;
                        return e.forEach(e => {
                            var t;
                            let n = null !== (t = r.get(e.userId)) && void 0 !== t ? t : Xa();
                            Ru(this.serializer, e).keys().forEach(e => n = n.add(e)), r.set(e.userId, n)
                        }), Ei.forEach(r, (e, t) => {
                            var n = new Mr(t),
                                r = ju.lt(this.serializer, n),
                                i = o.getIndexManager(n),
                                n = _c.lt(n, this.serializer, i, o.referenceDelegate);
                            return new $c(a, n, r, i).recalculateAndSaveOverlaysForDocumentKeys(new ls(s, Li._e), e).next()
                        })
                    })
                }
            }

            function sh(e) {
                e.createObjectStore("targetDocuments", {
                    keyPath: Yi
                }).createIndex("documentTargetsIndex", Ji, {
                    unique: !0
                }), e.createObjectStore("targets", {
                    keyPath: "targetId"
                }).createIndex("queryTargetsIndex", Hi, {
                    unique: !0
                }), e.createObjectStore("targetGlobal")
            }
            const ah = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
            class oh {
                constructor(e, t, n, r, i, s, a, o, u, c, h = 15) {
                    if (this.allowTabSynchronization = e, this.persistenceKey = t, this.clientId = n, this.oi = i, this.window = s, this.document = a, this._i = u, this.ai = c, this.ui = h, this.kr = null, this.qr = !1, this.isPrimary = !1, this.networkEnabled = !0, this.ci = null, this.inForeground = !1, this.li = null, this.hi = null, this.Pi = Number.NEGATIVE_INFINITY, this.Ii = e => Promise.resolve(), !oh.D()) throw new zr(Gr.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
                    this.referenceDelegate = new Oc(this, r), this.Ti = t + "main", this.serializer = new Cu(o), this.Ei = new Si(this.Ti, this.ui, new ih(this.serializer)), this.Qr = new xc(this.referenceDelegate, this.serializer), this.remoteDocumentCache = Vc(this.serializer), this.$r = new Bu, this.window && this.window.localStorage ? this.di = this.window.localStorage : (this.di = null, !1 === c && Vr("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))
                }
                start() {
                    return this.Ai().then(() => {
                        if (!this.isPrimary && !this.allowTabSynchronization) throw new zr(Gr.FAILED_PRECONDITION, ah);
                        return this.Ri(), this.Vi(), this.mi(), this.runTransaction("getHighestListenSequenceNumber", "readonly", e => this.Qr.getHighestSequenceNumber(e))
                    }).then(e => {
                        this.kr = new Li(e, this._i)
                    }).then(() => {
                        this.qr = !0
                    }).catch(e => (this.Ei && this.Ei.close(), Promise.reject(e)))
                }
                fi(t) {
                    return this.Ii = async e => {
                        if (this.started) return t(e)
                    }, t(this.isPrimary)
                }
                setDatabaseDeletedListener(t) {
                    this.Ei.B(async e => {
                        null === e.newVersion && await t()
                    })
                }
                setNetworkEnabled(e) {
                    this.networkEnabled !== e && (this.networkEnabled = e, this.oi.enqueueAndForget(async () => {
                        this.started && await this.Ai()
                    }))
                }
                Ai() {
                    return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", t => ch(t).put({
                        clientId: this.clientId,
                        updateTimeMs: Date.now(),
                        networkEnabled: this.networkEnabled,
                        inForeground: this.inForeground
                    }).next(() => {
                        if (this.isPrimary) return this.gi(t).next(e => {
                            e || (this.isPrimary = !1, this.oi.enqueueRetryable(() => this.Ii(!1)))
                        })
                    }).next(() => this.pi(t)).next(e => this.isPrimary && !e ? this.yi(t).next(() => !1) : !!e && this.wi(t).next(() => !0))).catch(e => {
                        if (Di(e)) return Fr("IndexedDbPersistence", "Failed to extend owner lease: ", e), this.isPrimary;
                        if (!this.allowTabSynchronization) throw e;
                        return Fr("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), !1
                    }).then(e => {
                        this.isPrimary !== e && this.oi.enqueueRetryable(() => this.Ii(e)), this.isPrimary = e
                    })
                }
                gi(e) {
                    return uh(e).get("owner").next(e => Ei.resolve(this.Si(e)))
                }
                bi(e) {
                    return ch(e).delete(this.clientId)
                }
                async Di() {
                    if (this.isPrimary && !this.Ci(this.Pi, 18e5)) {
                        this.Pi = Date.now();
                        var e = await this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", e => {
                            const r = ds(e, "clientMetadata");
                            return r.W().next(e => {
                                const t = this.vi(e, 18e5),
                                    n = e.filter(e => -1 === t.indexOf(e));
                                return Ei.forEach(n, e => r.delete(e.clientId)).next(() => n)
                            })
                        }).catch(() => []);
                        if (this.di)
                            for (const t of e) this.di.removeItem(this.Fi(t.clientId))
                    }
                }
                mi() {
                    this.hi = this.oi.enqueueAfterDelay("client_metadata_refresh", 4e3, () => this.Ai().then(() => this.Di()).then(() => this.mi()))
                }
                Si(e) {
                    return !!e && e.ownerId === this.clientId
                }
                pi(t) {
                    return this.ai ? Ei.resolve(!0) : uh(t).get("owner").next(e => {
                        if (null !== e && this.Ci(e.leaseTimestampMs, 5e3) && !this.Mi(e.ownerId)) {
                            if (this.Si(e) && this.networkEnabled) return !0;
                            if (!this.Si(e)) {
                                if (!e.allowTabSynchronization) throw new zr(Gr.FAILED_PRECONDITION, ah);
                                return !1
                            }
                        }
                        return !(!this.networkEnabled || !this.inForeground) || ch(t).W().next(e => void 0 === this.vi(e, 5e3).find(e => {
                            if (this.clientId !== e.clientId) {
                                var t = !this.networkEnabled && e.networkEnabled,
                                    n = !this.inForeground && e.inForeground,
                                    r = this.networkEnabled === e.networkEnabled;
                                if (t || n && r) return !0
                            }
                            return !1
                        }))
                    }).next(e => (this.isPrimary !== e && Fr("IndexedDbPersistence", `Client ${e?"is":"is not"} eligible for a primary lease.`), e))
                }
                async shutdown() {
                    this.qr = !1, this.xi(), this.hi && (this.hi.cancel(), this.hi = null), this.Oi(), this.Ni(), await this.Ei.runTransaction("shutdown", "readwrite", ["owner", "clientMetadata"], e => {
                        const t = new ls(e, Li._e);
                        return this.yi(t).next(() => this.bi(t))
                    }), this.Ei.close(), this.Li()
                }
                vi(e, t) {
                    return e.filter(e => this.Ci(e.updateTimeMs, t) && !this.Mi(e.clientId))
                }
                Bi() {
                    return this.runTransaction("getActiveClients", "readonly", e => ch(e).W().next(e => this.vi(e, 18e5).map(e => e.clientId)))
                }
                get started() {
                    return this.qr
                }
                getMutationQueue(e, t) {
                    return _c.lt(e, this.serializer, t, this.referenceDelegate)
                }
                getTargetCache() {
                    return this.Qr
                }
                getRemoteDocumentCache() {
                    return this.remoteDocumentCache
                }
                getIndexManager(e) {
                    return new hc(e, this.serializer.ct.databaseId)
                }
                getDocumentOverlayCache(e) {
                    return ju.lt(this.serializer, e)
                }
                getBundleCache() {
                    return this.$r
                }
                runTransaction(t, n, r) {
                    Fr("IndexedDbPersistence", "Starting transaction:", t);
                    var e, i = "readonly" === n ? "readonly" : "readwrite",
                        s = 15 === (e = this.ui) ? hs : 14 === e ? cs : 13 === e ? us : 12 === e ? os : 11 === e ? as : void qr();
                    let a;
                    return this.Ei.runTransaction(t, i, s, e => (a = new ls(e, this.kr ? this.kr.next() : Li._e), "readwrite-primary" === n ? this.gi(a).next(e => !!e || this.pi(a)).next(e => {
                        if (!e) throw Vr(`Failed to obtain primary lease for action '${t}'.`), this.isPrimary = !1, this.oi.enqueueRetryable(() => this.Ii(!1)), new zr(Gr.FAILED_PRECONDITION, _i);
                        return r(a)
                    }).next(e => this.wi(a).next(() => e)) : this.ki(a).next(() => r(a)))).then(e => (a.raiseOnCommittedEvent(), e))
                }
                ki(e) {
                    return uh(e).get("owner").next(e => {
                        if (null !== e && this.Ci(e.leaseTimestampMs, 5e3) && !this.Mi(e.ownerId) && !this.Si(e) && !(this.ai || this.allowTabSynchronization && e.allowTabSynchronization)) throw new zr(Gr.FAILED_PRECONDITION, ah)
                    })
                }
                wi(e) {
                    var t = {
                        ownerId: this.clientId,
                        allowTabSynchronization: this.allowTabSynchronization,
                        leaseTimestampMs: Date.now()
                    };
                    return uh(e).put("owner", t)
                }
                static D() {
                    return Si.D()
                }
                yi(e) {
                    const t = uh(e);
                    return t.get("owner").next(e => this.Si(e) ? (Fr("IndexedDbPersistence", "Releasing primary lease."), t.delete("owner")) : Ei.resolve())
                }
                Ci(e, t) {
                    var n = Date.now();
                    return !(e < n - t || n < e && (Vr(`Detected an update time that is in the future: ${e} > ${n}`), 1))
                }
                Ri() {
                    null !== this.document && "function" == typeof this.document.addEventListener && (this.li = () => {
                        this.oi.enqueueAndForget(() => (this.inForeground = "visible" === this.document.visibilityState, this.Ai()))
                    }, this.document.addEventListener("visibilitychange", this.li), this.inForeground = "visible" === this.document.visibilityState)
                }
                Oi() {
                    this.li && (this.document.removeEventListener("visibilitychange", this.li), this.li = null)
                }
                Vi() {
                    var e;
                    "function" == typeof(null === (e = this.window) || void 0 === e ? void 0 : e.addEventListener) && (this.ci = () => {
                        this.xi();
                        var e = /(?:Version|Mobile)\/1[456]/;
                        h() && (navigator.appVersion.match(e) || navigator.userAgent.match(e)) && this.oi.enterRestrictedMode(!0), this.oi.enqueueAndForget(() => this.shutdown())
                    }, this.window.addEventListener("pagehide", this.ci))
                }
                Ni() {
                    this.ci && (this.window.removeEventListener("pagehide", this.ci), this.ci = null)
                }
                Mi(e) {
                    var t;
                    try {
                        var n = null !== (null === (t = this.di) || void 0 === t ? void 0 : t.getItem(this.Fi(e)));
                        return Fr("IndexedDbPersistence", `Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`), n
                    } catch (e) {
                        return Vr("IndexedDbPersistence", "Failed to get zombied client id.", e), !1
                    }
                }
                xi() {
                    if (this.di) try {
                        this.di.setItem(this.Fi(this.clientId), String(Date.now()))
                    } catch (e) {
                        Vr("Failed to set zombie client id.", e)
                    }
                }
                Li() {
                    if (this.di) try {
                        this.di.removeItem(this.Fi(this.clientId))
                    } catch (e) {}
                }
                Fi(e) {
                    return `firestore_zombie_${this.persistenceKey}_${e}`
                }
            }

            function uh(e) {
                return ds(e, "owner")
            }

            function ch(e) {
                return ds(e, "clientMetadata")
            }

            function hh(e, t) {
                let n = e.projectId;
                return e.isDefaultDatabase || (n += "." + e.database), "firestore/" + t + "/" + n + "/"
            }
            class lh {
                constructor(e, t, n, r) {
                    this.targetId = e, this.fromCache = t, this.qi = n, this.Qi = r
                }
                static Ki(e, t) {
                    let n = Xa(),
                        r = Xa();
                    for (const e of t.docChanges) switch (e.type) {
                        case 0:
                            n = n.add(e.doc.key);
                            break;
                        case 1:
                            r = r.add(e.doc.key)
                    }
                    return new lh(e, t.fromCache, n, r)
                }
            }
            class dh {
                constructor() {
                    this._documentReadCount = 0
                }
                get documentReadCount() {
                    return this._documentReadCount
                }
                incrementDocumentReadCount(e) {
                    this._documentReadCount += e
                }
            }
            class fh {
                constructor() {
                    this.$i = !1, this.Ui = !1, this.Wi = 100, this.Gi = h() ? 8 : 0 < Si.v(u()) ? 6 : 4
                }
                initialize(e, t) {
                    this.zi = e, this.indexManager = t, this.$i = !0
                }
                getDocumentsMatchingQuery(n, r, e, t) {
                    const i = {
                        result: null
                    };
                    return this.ji(n, r).next(e => {
                        i.result = e
                    }).next(() => {
                        if (!i.result) return this.Hi(n, r, t, e).next(e => {
                            i.result = e
                        })
                    }).next(() => {
                        if (!i.result) {
                            const t = new dh;
                            return this.Ji(n, r, t).next(e => {
                                if (i.result = e, this.Ui) return this.Yi(n, r, t, e.size)
                            })
                        }
                    }).next(() => i.result)
                }
                Yi(e, t, n, r) {
                    return n.documentReadCount < this.Wi ? (Pr() <= l.DEBUG && Fr("QueryEngine", "SDK will not create cache indexes for query:", Ua(t), "since it only creates cache indexes for collection contains", "more than or equal to", this.Wi, "documents"), Ei.resolve()) : (Pr() <= l.DEBUG && Fr("QueryEngine", "Query:", Ua(t), "scans", n.documentReadCount, "local documents and returns", r, "documents as results."), n.documentReadCount > this.Gi * r ? (Pr() <= l.DEBUG && Fr("QueryEngine", "The SDK decides to create cache indexes for query:", Ua(t), "as using cache indexes may help improve performance."), this.indexManager.createTargetIndexes(e, La(t))) : Ei.resolve())
                }
                ji(i, s) {
                    if (Ra(s)) return Ei.resolve(null);
                    let t = La(s);
                    return this.indexManager.getIndexType(i, t).next(e => 0 === e ? null : (null !== s.limit && 1 === e && (s = Fa(s, null, "F"), t = La(s)), this.indexManager.getDocumentsMatchingTarget(i, t).next(e => {
                        const r = Xa(...e);
                        return this.zi.getDocuments(i, r).next(n => this.indexManager.getMinOffset(i, t).next(e => {
                            var t = this.Zi(s, n);
                            return this.Xi(s, t, r, e.readTime) ? this.ji(i, Fa(s, null, "F")) : this.es(i, t, s, e)
                        }))
                    })))
                }
                Hi(n, r, i, s) {
                    return Ra(r) || s.isEqual(si.min()) ? Ei.resolve(null) : this.zi.getDocuments(n, i).next(e => {
                        var t = this.Zi(r, e);
                        return this.Xi(r, t, i, s) ? Ei.resolve(null) : (Pr() <= l.DEBUG && Fr("QueryEngine", "Re-using previous result from %s to execute query: %s", s.toString(), Ua(r)), this.es(n, t, r, pi(s, -1)).next(e => e))
                    })
                }
                Zi(n, e) {
                    let r = new ws(Ga(n));
                    return e.forEach((e, t) => {
                        qa(n, t) && (r = r.add(t))
                    }), r
                }
                Xi(e, t, n, r) {
                    if (null === e.limit) return !1;
                    if (n.size !== t.size) return !0;
                    const i = "F" === e.limitType ? t.last() : t.first();
                    return !!i && (i.hasPendingWrites || 0 < i.version.compareTo(r))
                }
                Ji(e, t, n) {
                    return Pr() <= l.DEBUG && Fr("QueryEngine", "Using full collection scan to execute query:", Ua(t)), this.zi.getDocumentsMatchingQuery(e, t, vi.min(), n)
                }
                es(e, n, t, r) {
                    return this.zi.getDocumentsMatchingQuery(e, t, r).next(t => (n.forEach(e => {
                        t = t.insert(e.key, e)
                    }), t))
                }
            }
            class gh {
                constructor(e, t, n, r) {
                    this.persistence = e, this.ts = t, this.serializer = r, this.ns = new ps(ti), this.rs = new za(e => Ea(e), Ta), this.ss = new Map, this.os = e.getRemoteDocumentCache(), this.Qr = e.getTargetCache(), this.$r = e.getBundleCache(), this._s(n)
                }
                _s(e) {
                    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new $c(this.os, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.os.setIndexManager(this.indexManager), this.ts.initialize(this.localDocuments, this.indexManager)
                }
                collectGarbage(t) {
                    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", e => t.collect(e, this.ns))
                }
            }

            function mh(e, t, n, r) {
                return new gh(e, t, n, r)
            }
            async function ph(e, t) {
                const a = e;
                return a.persistence.runTransaction("Handle user change", "readonly", i => {
                    let s;
                    return a.mutationQueue.getAllMutationBatches(i).next(e => (s = e, a._s(t), a.mutationQueue.getAllMutationBatches(i))).next(e => {
                        const t = [],
                            n = [];
                        let r = Xa();
                        for (const i of s) {
                            t.push(i.batchId);
                            for (const e of i.mutations) r = r.add(e.key)
                        }
                        for (const i of e) {
                            n.push(i.batchId);
                            for (const e of i.mutations) r = r.add(e.key)
                        }
                        return a.localDocuments.getDocuments(i, r).next(e => ({
                            us: e,
                            removedBatchIds: t,
                            addedBatchIds: n
                        }))
                    })
                })
            }

            function yh(e) {
                const t = e;
                return t.persistence.runTransaction("Get last remote snapshot version", "readonly", e => t.Qr.getLastRemoteSnapshotVersion(e))
            }

            function vh(e, c) {
                const h = e,
                    l = c.snapshotVersion;
                let d = h.ns;
                return h.persistence.runTransaction("Apply remote event", "readwrite-primary", o => {
                    const e = h.os.newChangeBuffer({
                        trackRemovals: !0
                    });
                    d = h.ns;
                    const u = [];
                    c.targetChanges.forEach((t, n) => {
                        const r = d.get(n);
                        if (r) {
                            u.push(h.Qr.removeMatchingKeys(o, t.removedDocuments, n).next(() => h.Qr.addMatchingKeys(o, t.addedDocuments, n)));
                            let e = r.withSequenceNumber(o.currentSequenceNumber);
                            var i, s, a;
                            null !== c.targetMismatches.get(n) ? e = e.withResumeToken(Ts.EMPTY_BYTE_STRING, si.min()).withLastLimboFreeSnapshotVersion(si.min()) : 0 < t.resumeToken.approximateByteSize() && (e = e.withResumeToken(t.resumeToken, l)), d = d.insert(n, e), i = r, s = e, a = t, 0 !== i.resumeToken.approximateByteSize() && !(3e8 <= s.snapshotVersion.toMicroseconds() - i.snapshotVersion.toMicroseconds() || 0 < a.addedDocuments.size + a.modifiedDocuments.size + a.removedDocuments.size) || u.push(h.Qr.updateTargetData(o, e))
                        }
                    });
                    let t = Ka,
                        n = Xa();
                    if (c.documentUpdates.forEach(e => {
                            c.resolvedLimboDocuments.has(e) && u.push(h.persistence.referenceDelegate.updateLimboDocument(o, e))
                        }), u.push(wh(o, e, c.documentUpdates).next(e => {
                            t = e.cs, n = e.ls
                        })), !l.isEqual(si.min())) {
                        const c = h.Qr.getLastRemoteSnapshotVersion(o).next(e => h.Qr.setTargetsMetadata(o, o.currentSequenceNumber, l));
                        u.push(c)
                    }
                    return Ei.waitFor(u).next(() => e.apply(o)).next(() => h.localDocuments.getLocalViewOfDocuments(o, t, n)).next(() => t)
                }).then(e => (h.ns = d, e))
            }

            function wh(e, s, t) {
                let n = Xa(),
                    a = Xa();
                return t.forEach(e => n = n.add(e)), s.getEntries(e, n).next(r => {
                    let i = Ka;
                    return t.forEach((e, t) => {
                        const n = r.get(e);
                        t.isFoundDocument() !== n.isFoundDocument() && (a = a.add(e)), t.isNoDocument() && t.version.isEqual(si.min()) ? (s.removeEntry(e, t.readTime), i = i.insert(e, t)) : !n.isValidDocument() || 0 < t.version.compareTo(n.version) || 0 === t.version.compareTo(n.version) && n.hasPendingWrites ? (s.addEntry(t), i = i.insert(e, t)) : Fr("LocalStore", "Ignoring outdated watch update for ", e, ". Current version:", n.version, " Watch version:", t.version)
                    }), {
                        cs: i,
                        ls: a
                    }
                })
            }

            function _h(e, r) {
                const i = e;
                return i.persistence.runTransaction("Allocate target", "readwrite", t => {
                    let n;
                    return i.Qr.getTargetData(t, r).next(e => e ? (n = e, Ei.resolve(n)) : i.Qr.allocateTargetId(t).next(e => (n = new xu(r, e, "TargetPurposeListen", t.currentSequenceNumber), i.Qr.addTargetData(t, n).next(() => n))))
                }).then(e => {
                    var t = i.ns.get(e.targetId);
                    return (null === t || 0 < e.snapshotVersion.compareTo(t.snapshotVersion)) && (i.ns = i.ns.insert(e.targetId, e), i.rs.set(r, e.targetId)), e
                })
            }
            async function bh(e, t, n) {
                const r = e,
                    i = r.ns.get(t),
                    s = n ? "readwrite" : "readwrite-primary";
                try {
                    n || await r.persistence.runTransaction("Release target", s, e => r.persistence.referenceDelegate.removeTarget(e, i))
                } catch (e) {
                    if (!Di(e)) throw e;
                    Fr("LocalStore", `Failed to update sequence numbers for target ${t}: ${e}`)
                }
                r.ns = r.ns.remove(t), r.rs.delete(i.target)
            }

            function Ih(e, n, r) {
                const i = e;
                let s = si.min(),
                    a = Xa();
                return i.persistence.runTransaction("Execute query", "readwrite", t => function(e, t, n) {
                    const r = e,
                        i = r.rs.get(n);
                    return void 0 !== i ? Ei.resolve(r.ns.get(i)) : r.Qr.getTargetData(t, n)
                }(i, t, La(n)).next(e => {
                    if (e) return s = e.lastLimboFreeSnapshotVersion, i.Qr.getMatchingKeysForTargetId(t, e.targetId).next(e => {
                        a = e
                    })
                }).next(() => i.ts.getDocumentsMatchingQuery(t, n, r ? s : si.min(), r ? a : Xa())).next(e => (Sh(i, ja(n), e), {
                    documents: e,
                    hs: a
                })))
            }

            function Eh(e, t) {
                const n = e,
                    r = n.Qr,
                    i = n.ns.get(t);
                return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", e => r._t(e, t).next(e => e ? e.target : null))
            }

            function Th(e, t) {
                const n = e,
                    r = n.ss.get(t) || si.min();
                return n.persistence.runTransaction("Get new document changes", "readonly", e => n.os.getAllFromCollectionGroup(e, t, pi(r, -1), Number.MAX_SAFE_INTEGER)).then(e => (Sh(n, t, e), e))
            }

            function Sh(e, t, n) {
                let r = e.ss.get(t) || si.min();
                n.forEach((e, t) => {
                    0 < t.readTime.compareTo(r) && (r = t.readTime)
                }), e.ss.set(t, r)
            }

            function xh(e, t) {
                return `firestore_clients_${e}_${t}`
            }

            function Ch(e, t, n) {
                let r = `firestore_mutations_${e}_${n}`;
                return t.isAuthenticated() && (r += `_${t.uid}`), r
            }

            function Dh(e, t) {
                return `firestore_targets_${e}_${t}`
            }
            class Ah {
                constructor(e, t, n, r) {
                    this.user = e, this.batchId = t, this.state = n, this.error = r
                }
                static Es(e, t, n) {
                    var r = JSON.parse(n);
                    let i, s = "object" == typeof r && -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) && (void 0 === r.error || "object" == typeof r.error);
                    return s && r.error && (s = "string" == typeof r.error.message && "string" == typeof r.error.code, s && (i = new zr(r.error.code, r.error.message))), s ? new Ah(e, t, r.state, i) : (Vr("SharedClientState", `Failed to parse mutation state for ID '${t}': ${n}`), null)
                }
                ds() {
                    const e = {
                        state: this.state,
                        updateTimeMs: Date.now()
                    };
                    return this.error && (e.error = {
                        code: this.error.code,
                        message: this.error.message
                    }), JSON.stringify(e)
                }
            }
            class Nh {
                constructor(e, t, n) {
                    this.targetId = e, this.state = t, this.error = n
                }
                static Es(e, t) {
                    var n = JSON.parse(t);
                    let r, i = "object" == typeof n && -1 !== ["not-current", "current", "rejected"].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error);
                    return i && n.error && (i = "string" == typeof n.error.message && "string" == typeof n.error.code, i && (r = new zr(n.error.code, n.error.message))), i ? new Nh(e, n.state, r) : (Vr("SharedClientState", `Failed to parse target state for ID '${e}': ${t}`), null)
                }
                ds() {
                    const e = {
                        state: this.state,
                        updateTimeMs: Date.now()
                    };
                    return this.error && (e.error = {
                        code: this.error.code,
                        message: this.error.message
                    }), JSON.stringify(e)
                }
            }
            class kh {
                constructor(e, t) {
                    this.clientId = e, this.activeTargetIds = t
                }
                static Es(e, t) {
                    var n = JSON.parse(t);
                    let r = "object" == typeof n && n.activeTargetIds instanceof Array,
                        i = Za;
                    for (let s = 0; r && s < n.activeTargetIds.length; ++s) r = Vi(n.activeTargetIds[s]), i = i.add(n.activeTargetIds[s]);
                    return r ? new kh(e, i) : (Vr("SharedClientState", `Failed to parse client data for instance '${e}': ${t}`), null)
                }
            }
            class Rh {
                constructor(e, t) {
                    this.clientId = e, this.onlineState = t
                }
                static Es(e) {
                    var t = JSON.parse(e);
                    return "object" == typeof t && -1 !== ["Unknown", "Online", "Offline"].indexOf(t.onlineState) && "string" == typeof t.clientId ? new Rh(t.clientId, t.onlineState) : (Vr("SharedClientState", `Failed to parse online state: ${e}`), null)
                }
            }
            class Mh {
                constructor() {
                    this.activeTargetIds = Za
                }
                As(e) {
                    this.activeTargetIds = this.activeTargetIds.add(e)
                }
                Rs(e) {
                    this.activeTargetIds = this.activeTargetIds.delete(e)
                }
                ds() {
                    var e = {
                        activeTargetIds: this.activeTargetIds.toArray(),
                        updateTimeMs: Date.now()
                    };
                    return JSON.stringify(e)
                }
            }
            class Oh {
                constructor(e, t, n, r, i) {
                    this.window = e, this.oi = t, this.persistenceKey = n, this.Vs = r, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.fs = this.gs.bind(this), this.ps = new ps(ti), this.started = !1, this.ys = [];
                    var s = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    this.storage = this.window.localStorage, this.currentUser = i, this.ws = xh(this.persistenceKey, this.Vs), this.Ss = `firestore_sequence_number_${this.persistenceKey}`, this.ps = this.ps.insert(this.Vs, new Mh), this.bs = new RegExp(`^firestore_clients_${s}_([^_]*)$`), this.Ds = new RegExp(`^firestore_mutations_${s}_(\\d+)(?:_(.*))?$`), this.Cs = new RegExp(`^firestore_targets_${s}_(\\d+)$`), this.vs = `firestore_online_state_${this.persistenceKey}`, this.Fs = `firestore_bundle_loaded_v2_${this.persistenceKey}`, this.window.addEventListener("storage", this.fs)
                }
                static D(e) {
                    return !(!e || !e.localStorage)
                }
                async start() {
                    const e = await this.syncEngine.Bi();
                    for (const n of e)
                        if (n !== this.Vs) {
                            const e = this.getItem(xh(this.persistenceKey, n));
                            var t;
                            !e || (t = kh.Es(n, e)) && (this.ps = this.ps.insert(t.clientId, t))
                        }
                    this.Ms();
                    const n = this.storage.getItem(this.vs);
                    if (n) {
                        const e = this.xs(n);
                        e && this.Os(e)
                    }
                    for (const e of this.ys) this.gs(e);
                    this.ys = [], this.window.addEventListener("pagehide", () => this.shutdown()), this.started = !0
                }
                writeSequenceNumber(e) {
                    this.setItem(this.Ss, JSON.stringify(e))
                }
                getAllActiveQueryTargets() {
                    return this.Ns(this.ps)
                }
                isActiveQueryTarget(n) {
                    let r = !1;
                    return this.ps.forEach((e, t) => {
                        t.activeTargetIds.has(n) && (r = !0)
                    }), r
                }
                addPendingMutation(e) {
                    this.Ls(e, "pending")
                }
                updateMutationState(e, t, n) {
                    this.Ls(e, t, n), this.Bs(e)
                }
                addLocalQueryTarget(e) {
                    let t = "not-current";
                    var n;
                    return this.isActiveQueryTarget(e) && (!(n = this.storage.getItem(Dh(this.persistenceKey, e))) || (n = Nh.Es(e, n)) && (t = n.state)), this.ks.As(e), this.Ms(), t
                }
                removeLocalQueryTarget(e) {
                    this.ks.Rs(e), this.Ms()
                }
                isLocalQueryTarget(e) {
                    return this.ks.activeTargetIds.has(e)
                }
                clearQueryState(e) {
                    this.removeItem(Dh(this.persistenceKey, e))
                }
                updateQueryState(e, t, n) {
                    this.qs(e, t, n)
                }
                handleUserChange(e, t, n) {
                    t.forEach(e => {
                        this.Bs(e)
                    }), this.currentUser = e, n.forEach(e => {
                        this.addPendingMutation(e)
                    })
                }
                setOnlineState(e) {
                    this.Qs(e)
                }
                notifyBundleLoaded(e) {
                    this.Ks(e)
                }
                shutdown() {
                    this.started && (this.window.removeEventListener("storage", this.fs), this.removeItem(this.ws), this.started = !1)
                }
                getItem(e) {
                    var t = this.storage.getItem(e);
                    return Fr("SharedClientState", "READ", e, t), t
                }
                setItem(e, t) {
                    Fr("SharedClientState", "SET", e, t), this.storage.setItem(e, t)
                }
                removeItem(e) {
                    Fr("SharedClientState", "REMOVE", e), this.storage.removeItem(e)
                }
                gs(e) {
                    const i = e;
                    i.storageArea === this.storage && (Fr("SharedClientState", "EVENT", i.key, i.newValue), i.key !== this.ws ? this.oi.enqueueRetryable(async () => {
                        if (this.started) {
                            if (null !== i.key)
                                if (this.bs.test(i.key)) {
                                    if (null == i.newValue) {
                                        var e = this.$s(i.key);
                                        return this.Us(e, null)
                                    }
                                    e = this.Ws(i.key, i.newValue);
                                    if (e) return this.Us(e.clientId, e)
                                } else if (this.Ds.test(i.key)) {
                                if (null !== i.newValue) {
                                    var t = this.Gs(i.key, i.newValue);
                                    if (t) return this.zs(t)
                                }
                            } else if (this.Cs.test(i.key)) {
                                if (null !== i.newValue) {
                                    t = this.js(i.key, i.newValue);
                                    if (t) return this.Hs(t)
                                }
                            } else if (i.key === this.vs) {
                                if (null !== i.newValue) {
                                    var n = this.xs(i.newValue);
                                    if (n) return this.Os(n)
                                }
                            } else if (i.key === this.Ss) {
                                n = function(e) {
                                    let t = Li._e;
                                    if (null != e) try {
                                        var n = JSON.parse(e);
                                        jr("number" == typeof n), t = n
                                    } catch (e) {
                                        Vr("SharedClientState", "Failed to read sequence number from WebStorage", e)
                                    }
                                    return t
                                }(i.newValue);
                                n !== Li._e && this.sequenceNumberHandler(n)
                            } else if (i.key === this.Fs) {
                                const r = this.Js(i.newValue);
                                await Promise.all(r.map(e => this.syncEngine.Ys(e)))
                            }
                        } else this.ys.push(i)
                    }) : Vr("Received WebStorage notification for local change. Another client might have garbage-collected our state"))
                }
                get ks() {
                    return this.ps.get(this.Vs)
                }
                Ms() {
                    this.setItem(this.ws, this.ks.ds())
                }
                Ls(e, t, n) {
                    const r = new Ah(this.currentUser, e, t, n),
                        i = Ch(this.persistenceKey, this.currentUser, e);
                    this.setItem(i, r.ds())
                }
                Bs(e) {
                    var t = Ch(this.persistenceKey, this.currentUser, e);
                    this.removeItem(t)
                }
                Qs(e) {
                    var t = {
                        clientId: this.Vs,
                        onlineState: e
                    };
                    this.storage.setItem(this.vs, JSON.stringify(t))
                }
                qs(e, t, n) {
                    const r = Dh(this.persistenceKey, e),
                        i = new Nh(e, t, n);
                    this.setItem(r, i.ds())
                }
                Ks(e) {
                    var t = JSON.stringify(Array.from(e));
                    this.setItem(this.Fs, t)
                }
                $s(e) {
                    var t = this.bs.exec(e);
                    return t ? t[1] : null
                }
                Ws(e, t) {
                    var n = this.$s(e);
                    return kh.Es(n, t)
                }
                Gs(e, t) {
                    var n = this.Ds.exec(e),
                        r = Number(n[1]),
                        n = void 0 !== n[2] ? n[2] : null;
                    return Ah.Es(new Mr(n), r, t)
                }
                js(e, t) {
                    var n = this.Cs.exec(e),
                        n = Number(n[1]);
                    return Nh.Es(n, t)
                }
                xs(e) {
                    return Rh.Es(e)
                }
                Js(e) {
                    return JSON.parse(e)
                }
                async zs(e) {
                    if (e.user.uid === this.currentUser.uid) return this.syncEngine.Zs(e.batchId, e.state, e.error);
                    Fr("SharedClientState", `Ignoring mutation for non-active user ${e.user.uid}`)
                }
                Hs(e) {
                    return this.syncEngine.Xs(e.targetId, e.state, e.error)
                }
                Us(e, t) {
                    const n = t ? this.ps.insert(e, t) : this.ps.remove(e),
                        r = this.Ns(this.ps),
                        i = this.Ns(n),
                        s = [],
                        a = [];
                    return i.forEach(e => {
                        r.has(e) || s.push(e)
                    }), r.forEach(e => {
                        i.has(e) || a.push(e)
                    }), this.syncEngine.eo(s, a).then(() => {
                        this.ps = n
                    })
                }
                Os(e) {
                    this.ps.get(e.clientId) && this.onlineStateHandler(e.onlineState)
                }
                Ns(e) {
                    let n = Za;
                    return e.forEach((e, t) => {
                        n = n.unionWith(t.activeTargetIds)
                    }), n
                }
            }
            class Lh {
                constructor() {
                    this.no = new Mh, this.ro = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null
                }
                addPendingMutation(e) {}
                updateMutationState(e, t, n) {}
                addLocalQueryTarget(e) {
                    return this.no.As(e), this.ro[e] || "not-current"
                }
                updateQueryState(e, t, n) {
                    this.ro[e] = t
                }
                removeLocalQueryTarget(e) {
                    this.no.Rs(e)
                }
                isLocalQueryTarget(e) {
                    return this.no.activeTargetIds.has(e)
                }
                clearQueryState(e) {
                    delete this.ro[e]
                }
                getAllActiveQueryTargets() {
                    return this.no.activeTargetIds
                }
                isActiveQueryTarget(e) {
                    return this.no.activeTargetIds.has(e)
                }
                start() {
                    return this.no = new Mh, Promise.resolve()
                }
                handleUserChange(e, t, n) {}
                setOnlineState(e) {}
                shutdown() {}
                writeSequenceNumber(e) {}
                notifyBundleLoaded(e) {}
            }
            class Ph {
                io(e) {}
                shutdown() {}
            }
            class Fh {
                constructor() {
                    this.so = () => this.oo(), this._o = () => this.ao(), this.uo = [], this.co()
                }
                io(e) {
                    this.uo.push(e)
                }
                shutdown() {
                    window.removeEventListener("online", this.so), window.removeEventListener("offline", this._o)
                }
                co() {
                    window.addEventListener("online", this.so), window.addEventListener("offline", this._o)
                }
                oo() {
                    Fr("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
                    for (const e of this.uo) e(0)
                }
                ao() {
                    Fr("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
                    for (const e of this.uo) e(1)
                }
                static D() {
                    return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener
                }
            }
            let Vh = null;

            function Bh() {
                return null === Vh ? Vh = 268435456 + Math.round(2147483648 * Math.random()) : Vh++, "0x" + Vh.toString(16)
            }
            const Uh = {
                BatchGetDocuments: "batchGet",
                Commit: "commit",
                RunQuery: "runQuery",
                RunAggregationQuery: "runAggregationQuery"
            };
            class qh {
                constructor(e) {
                    this.lo = e.lo, this.ho = e.ho
                }
                Po(e) {
                    this.Io = e
                }
                To(e) {
                    this.Eo = e
                }
                onMessage(e) {
                    this.Ao = e
                }
                close() {
                    this.ho()
                }
                send(e) {
                    this.lo(e)
                }
                Ro() {
                    this.Io()
                }
                Vo(e) {
                    this.Eo(e)
                }
                mo(e) {
                    this.Ao(e)
                }
            }
            const jh = "WebChannelConnection";
            class Gh extends class {
                constructor(e) {
                    this.databaseInfo = e, this.databaseId = e.databaseId;
                    var t = e.ssl ? "https" : "http",
                        n = encodeURIComponent(this.databaseId.projectId),
                        r = encodeURIComponent(this.databaseId.database);
                    this.fo = t + "://" + e.host, this.po = `projects/${n}/databases/${r}`, this.yo = "(default)" === this.databaseId.database ? `project_id=${n}` : `project_id=${n}&database_id=${r}`
                }
                get wo() {
                    return !1
                }
                So(t, e, n, r, i) {
                    const s = Bh(),
                        a = this.bo(t, e.toUriEncodedString());
                    Fr("RestConnection", `Sending RPC '${t}' ${s}:`, a, n);
                    var o = {
                        "google-cloud-resource-prefix": this.po,
                        "x-goog-request-params": this.yo
                    };
                    return this.Do(o, r, i), this.Co(t, a, o, n).then(e => (Fr("RestConnection", `Received RPC '${t}' ${s}: `, e), e), e => {
                        throw Br("RestConnection", `RPC '${t}' ${s} failed with error: `, e, "url: ", a, "request:", n), e
                    })
                }
                vo(e, t, n, r, i, s) {
                    return this.So(e, t, n, r, i)
                }
                Do(n, e, t) {
                    n["X-Goog-Api-Client"] = "gl-js/ fire/" + Or, n["Content-Type"] = "text/plain", this.databaseInfo.appId && (n["X-Firebase-GMPID"] = this.databaseInfo.appId), e && e.headers.forEach((e, t) => n[t] = e), t && t.headers.forEach((e, t) => n[t] = e)
                }
                bo(e, t) {
                    var n = Uh[e];
                    return `${this.fo}/v1/${t}:${n}`
                }
                terminate() {}
            } {
                constructor(e) {
                    super(e), this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions
                }
                Co(u, t, n, r) {
                    const c = Bh();
                    return new Promise((s, a) => {
                        const o = new Ar;
                        o.setWithCredentials(!0), o.listenOnce(Tr.COMPLETE, () => {
                            try {
                                switch (o.getLastErrorCode()) {
                                    case Er.NO_ERROR:
                                        var e = o.getResponseJson();
                                        Fr(jh, `XHR for RPC '${u}' ${c} received:`, JSON.stringify(e)), s(e);
                                        break;
                                    case Er.TIMEOUT:
                                        Fr(jh, `RPC '${u}' ${c} timed out`), a(new zr(Gr.DEADLINE_EXCEEDED, "Request time out"));
                                        break;
                                    case Er.HTTP_ERROR:
                                        var t = o.getStatus();
                                        if (Fr(jh, `RPC '${u}' ${c} failed with status:`, t, "response text:", o.getResponseText()), 0 < t) {
                                            let e = o.getResponseJson();
                                            Array.isArray(e) && (e = e[0]);
                                            var n = null == e ? void 0 : e.error;
                                            if (n && n.status && n.message) {
                                                const u = (r = n.status, i = r.toLowerCase().replace(/_/g, "-"), 0 <= Object.values(Gr).indexOf(i) ? i : Gr.UNKNOWN);
                                                a(new zr(u, n.message))
                                            } else a(new zr(Gr.UNKNOWN, "Server responded with status " + o.getStatus()))
                                        } else a(new zr(Gr.UNAVAILABLE, "Connection failed."));
                                        break;
                                    default:
                                        qr()
                                }
                            } finally {
                                Fr(jh, `RPC '${u}' ${c} completed.`)
                            }
                            var r, i
                        });
                        var e = JSON.stringify(r);
                        Fr(jh, `RPC '${u}' ${c} sending request:`, r), o.send(t, "POST", e, n, 15)
                    })
                }
                Fo(i, e, t) {
                    const s = Bh(),
                        n = [this.fo, "/", "google.firestore.v1.Firestore", "/", i, "/channel"],
                        r = new Hn,
                        a = Ir(),
                        o = {
                            httpSessionIdParam: "gsessionid",
                            initMessageHeaders: {},
                            messageUrlParams: {
                                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
                            },
                            sendRawJson: !0,
                            supportsCrossDomainXhr: !0,
                            internalChannelParams: {
                                forwardChannelRequestTimeoutMs: 6e5
                            },
                            forceLongPolling: this.forceLongPolling,
                            detectBufferingProxy: this.autoDetectLongPolling
                        },
                        u = this.longPollingOptions.timeoutSeconds;
                    void 0 !== u && (o.longPollingTimeout = Math.round(1e3 * u)), this.useFetchStreams && (o.useFetchStreams = !0), this.Do(o.initMessageHeaders, e, t), o.encodeInitMessageHeaders = !0;
                    var c = n.join("");
                    Fr(jh, `Creating RPC '${i}' stream ${s}: ${c}`, o);
                    const h = r.createWebChannel(c, o);
                    let l = !1,
                        d = !1;
                    const f = new qh({
                            lo: e => {
                                d ? Fr(jh, `Not sending because RPC '${i}' stream ${s} is closed:`, e) : (l || (Fr(jh, `Opening RPC '${i}' stream ${s} transport.`), h.open(), l = !0), Fr(jh, `RPC '${i}' stream ${s} sending:`, e), h.send(e))
                            },
                            ho: () => h.close()
                        }),
                        g = (e, t, n) => {
                            e.listen(t, e => {
                                try {
                                    n(e)
                                } catch (e) {
                                    setTimeout(() => {
                                        throw e
                                    }, 0)
                                }
                            })
                        };
                    return g(h, Dr.EventType.OPEN, () => {
                        d || Fr(jh, `RPC '${i}' stream ${s} transport opened.`)
                    }), g(h, Dr.EventType.CLOSE, () => {
                        d || (d = !0, Fr(jh, `RPC '${i}' stream ${s} transport closed`), f.Vo())
                    }), g(h, Dr.EventType.ERROR, e => {
                        d || (d = !0, Br(jh, `RPC '${i}' stream ${s} transport errored:`, e), f.Vo(new zr(Gr.UNAVAILABLE, "The operation could not be completed")))
                    }), g(h, Dr.EventType.MESSAGE, n => {
                        if (!d) {
                            var e = n.data[0];
                            jr(!!e);
                            var r = e.error || (null === (r = e[0]) || void 0 === r ? void 0 : r.error);
                            if (r) {
                                Fr(jh, `RPC '${i}' stream ${s} received error:`, r);
                                const n = r.status;
                                let e = function(e) {
                                        var t = wr[e];
                                        if (void 0 !== t) return Lo(t)
                                    }(n),
                                    t = r.message;
                                void 0 === e && (e = Gr.INTERNAL, t = "Unknown error status: " + n + " with message " + r.message), d = !0, f.Vo(new zr(e, t)), h.close()
                            } else Fr(jh, `RPC '${i}' stream ${s} received:`, e), f.mo(e)
                        }
                    }), g(a, Sr.STAT_EVENT, e => {
                        e.stat === xr ? Fr(jh, `RPC '${i}' stream ${s} detected buffering proxy`) : e.stat === Cr && Fr(jh, `RPC '${i}' stream ${s} detected no buffering proxy`)
                    }), setTimeout(() => {
                        f.Ro()
                    }, 0), f
                }
            }

            function zh() {
                return "undefined" != typeof window ? window : null
            }

            function Kh() {
                return "undefined" != typeof document ? document : null
            }

            function $h(e) {
                return new eu(e, !0)
            }
            class Qh {
                constructor(e, t, n = 1e3, r = 1.5, i = 6e4) {
                    this.oi = e, this.timerId = t, this.Mo = n, this.xo = r, this.Oo = i, this.No = 0, this.Lo = null, this.Bo = Date.now(), this.reset()
                }
                reset() {
                    this.No = 0
                }
                ko() {
                    this.No = this.Oo
                }
                qo(e) {
                    this.cancel();
                    var t = Math.floor(this.No + this.Qo()),
                        n = Math.max(0, Date.now() - this.Bo),
                        r = Math.max(0, t - n);
                    0 < r && Fr("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.No} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.Lo = this.oi.enqueueAfterDelay(this.timerId, r, () => (this.Bo = Date.now(), e())), this.No *= this.xo, this.No < this.Mo && (this.No = this.Mo), this.No > this.Oo && (this.No = this.Oo)
                }
                Ko() {
                    null !== this.Lo && (this.Lo.skipDelay(), this.Lo = null)
                }
                cancel() {
                    null !== this.Lo && (this.Lo.cancel(), this.Lo = null)
                }
                Qo() {
                    return (Math.random() - .5) * this.No
                }
            }
            class Wh {
                constructor(e, t, n, r, i, s, a, o) {
                    this.oi = e, this.$o = n, this.Uo = r, this.connection = i, this.authCredentialsProvider = s, this.appCheckCredentialsProvider = a, this.listener = o, this.state = 0, this.Wo = 0, this.Go = null, this.zo = null, this.stream = null, this.jo = new Qh(e, t)
                }
                Ho() {
                    return 1 === this.state || 5 === this.state || this.Jo()
                }
                Jo() {
                    return 2 === this.state || 3 === this.state
                }
                start() {
                    4 !== this.state ? this.auth() : this.Yo()
                }
                async stop() {
                    this.Ho() && await this.close(0)
                }
                Zo() {
                    this.state = 0, this.jo.reset()
                }
                Xo() {
                    this.Jo() && null === this.Go && (this.Go = this.oi.enqueueAfterDelay(this.$o, 6e4, () => this.e_()))
                }
                t_(e) {
                    this.n_(), this.stream.send(e)
                }
                async e_() {
                    if (this.Jo()) return this.close(0)
                }
                n_() {
                    this.Go && (this.Go.cancel(), this.Go = null)
                }
                r_() {
                    this.zo && (this.zo.cancel(), this.zo = null)
                }
                async close(e, t) {
                    this.n_(), this.r_(), this.jo.cancel(), this.Wo++, 4 !== e ? this.jo.reset() : t && t.code === Gr.RESOURCE_EXHAUSTED ? (Vr(t.toString()), Vr("Using maximum backoff delay to prevent overloading the backend."), this.jo.ko()) : t && t.code === Gr.UNAUTHENTICATED && 3 !== this.state && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), null !== this.stream && (this.i_(), this.stream.close(), this.stream = null), this.state = e, await this.listener.To(t)
                }
                i_() {}
                auth() {
                    this.state = 1;
                    const e = this.s_(this.Wo),
                        n = this.Wo;
                    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([e, t]) => {
                        this.Wo === n && this.o_(e, t)
                    }, t => {
                        e(() => {
                            var e = new zr(Gr.UNKNOWN, "Fetching auth token failed: " + t.message);
                            return this.__(e)
                        })
                    })
                }
                o_(e, t) {
                    const n = this.s_(this.Wo);
                    this.stream = this.a_(e, t), this.stream.Po(() => {
                        n(() => (this.state = 2, this.zo = this.oi.enqueueAfterDelay(this.Uo, 1e4, () => (this.Jo() && (this.state = 3), Promise.resolve())), this.listener.Po()))
                    }), this.stream.To(e => {
                        n(() => this.__(e))
                    }), this.stream.onMessage(e => {
                        n(() => this.onMessage(e))
                    })
                }
                Yo() {
                    this.state = 5, this.jo.qo(async () => {
                        this.state = 0, this.start()
                    })
                }
                __(e) {
                    return Fr("PersistentStream", `close with error: ${e}`), this.stream = null, this.close(4, e)
                }
                s_(t) {
                    return e => {
                        this.oi.enqueueAndForget(() => this.Wo === t ? e() : (Fr("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()))
                    }
                }
            }
            class Hh extends Wh {
                constructor(e, t, n, r, i, s) {
                    super(e, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i
                }
                a_(e, t) {
                    return this.connection.Fo("Listen", e, t)
                }
                onMessage(e) {
                    this.jo.reset();
                    var t = function(e, t) {
                            let n;
                            if ("targetChange" in t) {
                                t.targetChange;
                                var r = "NO_CHANGE" === (f = t.targetChange.targetChangeType || "NO_CHANGE") ? 0 : "ADD" === f ? 1 : "REMOVE" === f ? 2 : "CURRENT" === f ? 3 : "RESET" === f ? 4 : qr(),
                                    i = t.targetChange.targetIds || [],
                                    s = (f = t.targetChange.resumeToken, e.useProto3Json ? (jr(void 0 === f || "string" == typeof f), Ts.fromBase64String(f || "")) : (jr(void 0 === f || f instanceof Uint8Array), Ts.fromUint8Array(f || new Uint8Array))),
                                    a = t.targetChange.cause,
                                    o = a && (o = void 0 === (f = a).code ? Gr.UNKNOWN : Lo(f.code), new zr(o, f.message || ""));
                                n = new $o(r, i, s, o || null)
                            } else if ("documentChange" in t) {
                                t.documentChange;
                                var u = t.documentChange;
                                u.document, u.document.name, u.document.updateTime;
                                var s = cu(e, u.document.name),
                                    o = iu(u.document.updateTime),
                                    c = u.document.createTime ? iu(u.document.createTime) : si.min(),
                                    h = new Xs({
                                        mapValue: {
                                            fields: u.document.fields
                                        }
                                    }),
                                    c = Zs.newFoundDocument(s, o, c, h),
                                    h = u.targetIds || [],
                                    u = u.removedTargetIds || [];
                                n = new zo(h, u, c.key, c)
                            } else if ("documentDelete" in t) {
                                t.documentDelete;
                                h = t.documentDelete;
                                h.document;
                                u = cu(e, h.document), c = h.readTime ? iu(h.readTime) : si.min(), c = Zs.newNoDocument(u, c), h = h.removedTargetIds || [];
                                n = new zo([], h, c.key, c)
                            } else if ("documentRemove" in t) {
                                t.documentRemove;
                                var l = t.documentRemove;
                                l.document;
                                var d = cu(e, l.document),
                                    l = l.removedTargetIds || [];
                                n = new zo([], l, d, null)
                            } else {
                                if (!("filter" in t)) return qr(); {
                                    t.filter;
                                    const e = t.filter;
                                    e.targetId;
                                    var {
                                        count: l = 0,
                                        unchangedNames: d
                                    } = e, l = new Mo(l, d), d = e.targetId;
                                    n = new Ko(d, l)
                                }
                            }
                            var o, f;
                            return n
                        }(this.serializer, e),
                        n = function(e) {
                            if (!("targetChange" in e)) return si.min();
                            var t = e.targetChange;
                            return (!t.targetIds || !t.targetIds.length) && t.readTime ? iu(t.readTime) : si.min()
                        }(e);
                    return this.listener.u_(t, n)
                }
                c_(e) {
                    const t = {};
                    t.database = du(this.serializer), t.addTarget = function(e, t) {
                        let n;
                        const r = t.target;
                        if (n = Sa(r) ? {
                                documents: vu(e, r)
                            } : {
                                query: wu(e, r).ut
                            }, n.targetId = t.targetId, 0 < t.resumeToken.approximateByteSize()) {
                            n.resumeToken = ru(e, t.resumeToken);
                            const r = tu(e, t.expectedCount);
                            null !== r && (n.expectedCount = r)
                        } else if (0 < t.snapshotVersion.compareTo(si.min())) {
                            n.readTime = nu(e, t.snapshotVersion.toTimestamp());
                            const r = tu(e, t.expectedCount);
                            null !== r && (n.expectedCount = r)
                        }
                        return n
                    }(this.serializer, e);
                    var n, n = (this.serializer, e, null == (n = function(e) {
                        switch (e) {
                            case "TargetPurposeListen":
                                return null;
                            case "TargetPurposeExistenceFilterMismatch":
                                return "existence-filter-mismatch";
                            case "TargetPurposeExistenceFilterMismatchBloom":
                                return "existence-filter-mismatch-bloom";
                            case "TargetPurposeLimboResolution":
                                return "limbo-document";
                            default:
                                return qr()
                        }
                    }(e.purpose)) ? null : {
                        "goog-listen-tags": n
                    });
                    n && (t.labels = n), this.t_(t)
                }
                l_(e) {
                    const t = {};
                    t.database = du(this.serializer), t.removeTarget = e, this.t_(t)
                }
            }
            class Yh extends Wh {
                constructor(e, t, n, r, i, s) {
                    super(e, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i, this.h_ = !1
                }
                get P_() {
                    return this.h_
                }
                start() {
                    this.h_ = !1, this.lastStreamToken = void 0, super.start()
                }
                i_() {
                    this.h_ && this.I_([])
                }
                a_(e, t) {
                    return this.connection.Fo("Write", e, t)
                }
                onMessage(e) {
                    if (jr(!!e.streamToken), this.lastStreamToken = e.streamToken, this.h_) {
                        this.jo.reset();
                        var t = (r = e.writeResults, i = e.commitTime, r && 0 < r.length ? (jr(void 0 !== i), r.map(e => function(e, t) {
                                let n = e.updateTime ? iu(e.updateTime) : iu(t);
                                return n.isEqual(si.min()) && (n = iu(t)), new mo(n, e.transformResults || [])
                            }(e, i))) : []),
                            n = iu(e.commitTime);
                        return this.listener.T_(n, t)
                    }
                    var r, i;
                    return jr(!e.writeResults || 0 === e.writeResults.length), this.h_ = !0, this.listener.E_()
                }
                d_() {
                    const e = {};
                    e.database = du(this.serializer), this.t_(e)
                }
                I_(e) {
                    var t = {
                        streamToken: this.lastStreamToken,
                        writes: e.map(e => pu(this.serializer, e))
                    };
                    this.t_(t)
                }
            }
            class Jh extends class {} {
                constructor(e, t, n, r) {
                    super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = r, this.A_ = !1
                }
                R_() {
                    if (this.A_) throw new zr(Gr.FAILED_PRECONDITION, "The client has already been terminated.")
                }
                So(n, r, i, s) {
                    return this.R_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([e, t]) => this.connection.So(n, au(r, i), s, e, t)).catch(e => {
                        throw "FirebaseError" === e.name ? (e.code === Gr.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new zr(Gr.UNKNOWN, e.toString())
                    })
                }
                vo(n, r, i, s, a) {
                    return this.R_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([e, t]) => this.connection.vo(n, au(r, i), s, e, t, a)).catch(e => {
                        throw "FirebaseError" === e.name ? (e.code === Gr.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new zr(Gr.UNKNOWN, e.toString())
                    })
                }
                terminate() {
                    this.A_ = !0, this.connection.terminate()
                }
            }
            class Xh {
                constructor(e, t) {
                    this.asyncQueue = e, this.onlineStateHandler = t, this.state = "Unknown", this.m_ = 0, this.f_ = null, this.g_ = !0
                }
                p_() {
                    0 === this.m_ && (this.y_("Unknown"), this.f_ = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this.f_ = null, this.w_("Backend didn't respond within 10 seconds."), this.y_("Offline"), Promise.resolve())))
                }
                S_(e) {
                    "Online" === this.state ? this.y_("Unknown") : (this.m_++, 1 <= this.m_ && (this.b_(), this.w_(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.y_("Offline")))
                }
                set(e) {
                    this.b_(), this.m_ = 0, "Online" === e && (this.g_ = !1), this.y_(e)
                }
                y_(e) {
                    e !== this.state && (this.state = e, this.onlineStateHandler(e))
                }
                w_(e) {
                    var t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
                    this.g_ ? (Vr(t), this.g_ = !1) : Fr("OnlineStateTracker", t)
                }
                b_() {
                    null !== this.f_ && (this.f_.cancel(), this.f_ = null)
                }
            }
            class Zh {
                constructor(e, t, n, r, i) {
                    this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, this.D_ = [], this.C_ = new Map, this.v_ = new Set, this.F_ = [], this.M_ = i, this.M_.io(e => {
                        n.enqueueAndForget(async () => {
                            ul(this) && (Fr("RemoteStore", "Restarting streams for network reachability change."), await async function(e) {
                                const t = e;
                                t.v_.add(4), await tl(t), t.x_.set("Unknown"), t.v_.delete(4), await el(t)
                            }(this))
                        })
                    }), this.x_ = new Xh(n, r)
                }
            }
            async function el(e) {
                if (ul(e))
                    for (const t of e.F_) await t(!0)
            }
            async function tl(e) {
                for (const t of e.F_) await t(!1)
            }

            function nl(e, t) {
                const n = e;
                n.C_.has(t.targetId) || (n.C_.set(t.targetId, t), ol(n) ? al(n) : vl(n).Jo() && il(n, t))
            }

            function rl(e, t) {
                const n = e,
                    r = vl(n);
                n.C_.delete(t), r.Jo() && sl(n, t), 0 === n.C_.size && (r.Jo() ? r.Xo() : ul(n) && n.x_.set("Unknown"))
            }

            function il(e, t) {
                var n;
                e.O_.Oe(t.targetId), (0 < t.resumeToken.approximateByteSize() || 0 < t.snapshotVersion.compareTo(si.min())) && (n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size, t = t.withExpectedCount(n)), vl(e).c_(t)
            }

            function sl(e, t) {
                e.O_.Oe(t), vl(e).l_(t)
            }

            function al(t) {
                t.O_ = new Wo({
                    getRemoteKeysForTarget: e => t.remoteSyncer.getRemoteKeysForTarget(e),
                    _t: e => t.C_.get(e) || null,
                    nt: () => t.datastore.serializer.databaseId
                }), vl(t).start(), t.x_.p_()
            }

            function ol(e) {
                return ul(e) && !vl(e).Ho() && 0 < e.C_.size
            }

            function ul(e) {
                return 0 === e.v_.size
            }

            function cl(e) {
                e.O_ = void 0
            }
            async function hl(e, t, n) {
                if (!Di(t)) throw t;
                e.v_.add(1), await tl(e), e.x_.set("Offline"), n = n || (() => yh(e.localStore)), e.asyncQueue.enqueueRetryable(async () => {
                    Fr("RemoteStore", "Retrying IndexedDB access"), await n(), e.v_.delete(1), await el(e)
                })
            }

            function ll(t, n) {
                return n().catch(e => hl(t, e, n))
            }
            async function dl(e) {
                const t = e,
                    n = wl(t);
                let r = 0 < t.D_.length ? t.D_[t.D_.length - 1].batchId : -1;
                for (; ul(i = t) && i.D_.length < 10;) try {
                    const e = await
                    function(e, t) {
                        const n = e;
                        return n.persistence.runTransaction("Get next mutation batch", "readonly", e => (void 0 === t && (t = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(e, t)))
                    }(t.localStore, r);
                    if (null === e) {
                        0 === t.D_.length && n.Xo();
                        break
                    }
                    r = e.batchId,
                        function(e, t) {
                            e.D_.push(t);
                            const n = wl(e);
                            n.Jo() && n.P_ && n.I_(t.mutations)
                        }(t, e)
                } catch (e) {
                    await hl(t, e)
                }
                var i;
                fl(t) && gl(t)
            }

            function fl(e) {
                return ul(e) && !wl(e).Ho() && 0 < e.D_.length
            }

            function gl(e) {
                wl(e).start()
            }
            async function ml(e, t) {
                t && wl(e).P_ && await async function(e, t) {
                    if (Oo(n = t.code) && n !== Gr.ABORTED) {
                        const r = e.D_.shift();
                        wl(e).Zo(), await ll(e, () => e.remoteSyncer.rejectFailedWrite(r.batchId, t)), await dl(e)
                    }
                    var n
                }(e, t), fl(e) && gl(e)
            }
            async function pl(e, t) {
                const n = e;
                n.asyncQueue.verifyOperationInProgress(), Fr("RemoteStore", "RemoteStore received new credentials");
                var r = ul(n);
                n.v_.add(3), await tl(n), r && n.x_.set("Unknown"), await n.remoteSyncer.handleCredentialChange(t), n.v_.delete(3), await el(n)
            }
            async function yl(e, t) {
                const n = e;
                t ? (n.v_.delete(2), await el(n)) : (n.v_.add(2), await tl(n), n.x_.set("Unknown"))
            }

            function vl(t) {
                return t.N_ || (t.N_ = function(e, t, n) {
                    const r = e;
                    return r.R_(), new Hh(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
                }(t.datastore, t.asyncQueue, {
                    Po: (async function(n) {
                        n.C_.forEach((e, t) => {
                            il(n, e)
                        })
                    }).bind(null, t),
                    To: (async function(e, t) {
                        cl(e), ol(e) ? (e.x_.S_(t), al(e)) : e.x_.set("Unknown")
                    }).bind(null, t),
                    u_: (async function(e, t, n) {
                        if (e.x_.set("Online"), t instanceof $o && 2 === t.state && t.cause) try {
                            await async function(e, t) {
                                var n = t.cause;
                                for (const r of t.targetIds) e.C_.has(r) && (await e.remoteSyncer.rejectListen(r, n), e.C_.delete(r), e.O_.removeTarget(r))
                            }(e, t)
                        } catch (n) {
                            Fr("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), n), await hl(e, n)
                        } else if (t instanceof zo ? e.O_.$e(t) : t instanceof Ko ? e.O_.Je(t) : e.O_.Ge(t), !n.isEqual(si.min())) try {
                            const t = await yh(e.localStore);
                            0 <= n.compareTo(t) && await
                            function(i, r) {
                                const e = i.O_.it(r);
                                return e.targetChanges.forEach((e, t) => {
                                    if (0 < e.resumeToken.approximateByteSize()) {
                                        const n = i.C_.get(t);
                                        n && i.C_.set(t, n.withResumeToken(e.resumeToken, r))
                                    }
                                }), e.targetMismatches.forEach((e, t) => {
                                    const n = i.C_.get(e);
                                    var r;
                                    n && (i.C_.set(e, n.withResumeToken(Ts.EMPTY_BYTE_STRING, n.snapshotVersion)), sl(i, e), r = new xu(n.target, e, t, n.sequenceNumber), il(i, r))
                                }), i.remoteSyncer.applyRemoteEvent(e)
                            }(e, n)
                        } catch (t) {
                            Fr("RemoteStore", "Failed to raise snapshot:", t), await hl(e, t)
                        }
                    }).bind(null, t)
                }), t.F_.push(async e => {
                    e ? (t.N_.Zo(), ol(t) ? al(t) : t.x_.set("Unknown")) : (await t.N_.stop(), cl(t))
                })), t.N_
            }

            function wl(t) {
                return t.L_ || (t.L_ = function(e, t, n) {
                    const r = e;
                    return r.R_(), new Yh(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
                }(t.datastore, t.asyncQueue, {
                    Po: (async function(e) {
                        wl(e).d_()
                    }).bind(null, t),
                    To: ml.bind(null, t),
                    E_: (async function(e) {
                        const t = wl(e);
                        for (const n of e.D_) t.I_(n.mutations)
                    }).bind(null, t),
                    T_: (async function(e, t, n) {
                        const r = e.D_.shift(),
                            i = ko.from(r, t, n);
                        await ll(e, () => e.remoteSyncer.applySuccessfulWrite(i)), await dl(e)
                    }).bind(null, t)
                }), t.F_.push(async e => {
                    e ? (t.L_.Zo(), await dl(t)) : (await t.L_.stop(), 0 < t.D_.length && (Fr("RemoteStore", `Stopping write stream with ${t.D_.length} pending writes`), t.D_ = []))
                })), t.L_
            }
            class _l {
                constructor(e, t, n, r, i) {
                    this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new Kr, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch(e => {})
                }
                get promise() {
                    return this.deferred.promise
                }
                static createAndSchedule(e, t, n, r, i) {
                    const s = Date.now() + n,
                        a = new _l(e, t, s, r, i);
                    return a.start(n), a
                }
                start(e) {
                    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e)
                }
                skipDelay() {
                    return this.handleDelayElapsed()
                }
                cancel(e) {
                    null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new zr(Gr.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))))
                }
                handleDelayElapsed() {
                    this.asyncQueue.enqueueAndForget(() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then(e => this.deferred.resolve(e))) : Promise.resolve())
                }
                clearTimeout() {
                    null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null)
                }
            }

            function bl(e, t) {
                if (Vr("AsyncQueue", `${t}: ${e}`), Di(e)) return new zr(Gr.UNAVAILABLE, `${t}: ${e}`);
                throw e
            }
            class Il {
                constructor(n) {
                    this.comparator = n ? (e, t) => n(e, t) || hi.comparator(e.key, t.key) : (e, t) => hi.comparator(e.key, t.key), this.keyedMap = Qa(), this.sortedSet = new ps(this.comparator)
                }
                static emptySet(e) {
                    return new Il(e.comparator)
                }
                has(e) {
                    return null != this.keyedMap.get(e)
                }
                get(e) {
                    return this.keyedMap.get(e)
                }
                first() {
                    return this.sortedSet.minKey()
                }
                last() {
                    return this.sortedSet.maxKey()
                }
                isEmpty() {
                    return this.sortedSet.isEmpty()
                }
                indexOf(e) {
                    var t = this.keyedMap.get(e);
                    return t ? this.sortedSet.indexOf(t) : -1
                }
                get size() {
                    return this.sortedSet.size
                }
                forEach(n) {
                    this.sortedSet.inorderTraversal((e, t) => (n(e), !1))
                }
                add(e) {
                    const t = this.delete(e.key);
                    return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null))
                }
                delete(e) {
                    var t = this.get(e);
                    return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this
                }
                isEqual(e) {
                    if (!(e instanceof Il)) return !1;
                    if (this.size !== e.size) return !1;
                    const t = this.sortedSet.getIterator(),
                        n = e.sortedSet.getIterator();
                    for (; t.hasNext();) {
                        const e = t.getNext().key,
                            r = n.getNext().key;
                        if (!e.isEqual(r)) return !1
                    }
                    return !0
                }
                toString() {
                    const t = [];
                    return this.forEach(e => {
                        t.push(e.toString())
                    }), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)"
                }
                copy(e, t) {
                    const n = new Il;
                    return n.comparator = this.comparator, n.keyedMap = e, n.sortedSet = t, n
                }
            }
            class El {
                constructor() {
                    this.B_ = new ps(hi.comparator)
                }
                track(e) {
                    var t = e.doc.key,
                        n = this.B_.get(t);
                    !n || 0 !== e.type && 3 === n.type ? this.B_ = this.B_.insert(t, e) : 3 === e.type && 1 !== n.type ? this.B_ = this.B_.insert(t, {
                        type: n.type,
                        doc: e.doc
                    }) : 2 === e.type && 2 === n.type ? this.B_ = this.B_.insert(t, {
                        type: 2,
                        doc: e.doc
                    }) : 2 === e.type && 0 === n.type ? this.B_ = this.B_.insert(t, {
                        type: 0,
                        doc: e.doc
                    }) : 1 === e.type && 0 === n.type ? this.B_ = this.B_.remove(t) : 1 === e.type && 2 === n.type ? this.B_ = this.B_.insert(t, {
                        type: 1,
                        doc: n.doc
                    }) : 0 === e.type && 1 === n.type ? this.B_ = this.B_.insert(t, {
                        type: 2,
                        doc: e.doc
                    }) : qr()
                }
                k_() {
                    const n = [];
                    return this.B_.inorderTraversal((e, t) => {
                        n.push(t)
                    }), n
                }
            }
            class Tl {
                constructor(e, t, n, r, i, s, a, o, u) {
                    this.query = e, this.docs = t, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = s, this.syncStateChanged = a, this.excludesMetadataChanges = o, this.hasCachedResults = u
                }
                static fromInitialDocuments(e, t, n, r, i) {
                    const s = [];
                    return t.forEach(e => {
                        s.push({
                            type: 0,
                            doc: e
                        })
                    }), new Tl(e, t, Il.emptySet(t), s, n, r, !0, !1, i)
                }
                get hasPendingWrites() {
                    return !this.mutatedKeys.isEmpty()
                }
                isEqual(e) {
                    if (!(this.fromCache === e.fromCache && this.hasCachedResults === e.hasCachedResults && this.syncStateChanged === e.syncStateChanged && this.mutatedKeys.isEqual(e.mutatedKeys) && Va(this.query, e.query) && this.docs.isEqual(e.docs) && this.oldDocs.isEqual(e.oldDocs))) return !1;
                    const t = this.docChanges,
                        n = e.docChanges;
                    if (t.length !== n.length) return !1;
                    for (let r = 0; r < t.length; r++)
                        if (t[r].type !== n[r].type || !t[r].doc.isEqual(n[r].doc)) return !1;
                    return !0
                }
            }
            class Sl {
                constructor() {
                    this.q_ = void 0, this.Q_ = []
                }
                K_() {
                    return this.Q_.some(e => e.U_())
                }
            }
            class xl {
                constructor() {
                    this.queries = new za(e => Ba(e), Va), this.onlineState = "Unknown", this.W_ = new Set
                }
            }
            async function Cl(e, t) {
                const n = e;
                let r = 3;
                var i = t.query;
                let s = n.queries.get(i);
                s ? !s.K_() && t.U_() && (r = 2) : (s = new Sl, r = t.U_() ? 0 : 1);
                try {
                    switch (r) {
                        case 0:
                            s.q_ = await n.onListen(i, !0);
                            break;
                        case 1:
                            s.q_ = await n.onListen(i, !1);
                            break;
                        case 2:
                            await n.onFirstRemoteStoreListen(i)
                    }
                } catch (e) {
                    const n = bl(e, `Initialization of query '${Ua(t.query)}' failed`);
                    return void t.onError(n)
                }
                n.queries.set(i, s), s.Q_.push(t), t.G_(n.onlineState), !s.q_ || t.z_(s.q_) && Al(n)
            }
            async function Dl(e, t) {
                const n = e,
                    r = t.query;
                let i = 3;
                const s = n.queries.get(r);
                if (s) {
                    const e = s.Q_.indexOf(t);
                    0 <= e && (s.Q_.splice(e, 1), 0 === s.Q_.length ? i = t.U_() ? 0 : 1 : !s.K_() && t.U_() && (i = 2))
                }
                switch (i) {
                    case 0:
                        return n.queries.delete(r), n.onUnlisten(r, !0);
                    case 1:
                        return n.queries.delete(r), n.onUnlisten(r, !1);
                    case 2:
                        return n.onLastRemoteStoreUnlisten(r);
                    default:
                        return
                }
            }

            function Al(e) {
                e.W_.forEach(e => {
                    e.next()
                })
            }(_r = _r || {}).j_ = "default", _r.Cache = "cache";
            class Nl {
                constructor(e, t, n) {
                    this.query = e, this.H_ = t, this.J_ = !1, this.Y_ = null, this.onlineState = "Unknown", this.options = n || {}
                }
                z_(e) {
                    if (!this.options.includeMetadataChanges) {
                        const t = [];
                        for (const n of e.docChanges) 3 !== n.type && t.push(n);
                        e = new Tl(e.query, e.docs, e.oldDocs, t, e.mutatedKeys, e.fromCache, e.syncStateChanged, !0, e.hasCachedResults)
                    }
                    let t = !1;
                    return this.J_ ? this.Z_(e) && (this.H_.next(e), t = !0) : this.X_(e, this.onlineState) && (this.ea(e), t = !0), this.Y_ = e, t
                }
                onError(e) {
                    this.H_.error(e)
                }
                G_(e) {
                    this.onlineState = e;
                    let t = !1;
                    return this.Y_ && !this.J_ && this.X_(this.Y_, e) && (this.ea(this.Y_), t = !0), t
                }
                X_(e, t) {
                    return !e.fromCache || (!this.U_() || (!this.options.ta || !("Offline" !== t)) && (!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t))
                }
                Z_(e) {
                    if (0 < e.docChanges.length) return !0;
                    var t = this.Y_ && this.Y_.hasPendingWrites !== e.hasPendingWrites;
                    return !(!e.syncStateChanged && !t) && !0 === this.options.includeMetadataChanges
                }
                ea(e) {
                    e = Tl.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults), this.J_ = !0, this.H_.next(e)
                }
                U_() {
                    return this.options.source !== _r.Cache
                }
            }
            class kl {
                constructor(e, t) {
                    this.na = e, this.byteLength = t
                }
                ra() {
                    return "metadata" in this.na
                }
            }
            class Rl {
                constructor(e) {
                    this.serializer = e
                }
                Ps(e) {
                    return cu(this.serializer, e)
                }
                Is(e) {
                    return e.metadata.exists ? mu(this.serializer, e.document, !1) : Zs.newNoDocument(this.Ps(e.metadata.name), this.Ts(e.metadata.readTime))
                }
                Ts(e) {
                    return iu(e)
                }
            }
            class Ml {
                constructor(e, t, n) {
                    this.ia = e, this.localStore = t, this.serializer = n, this.queries = [], this.documents = [], this.collectionGroups = new Set, this.progress = Ol(e)
                }
                sa(e) {
                    this.progress.bytesLoaded += e.byteLength;
                    let t = this.progress.documentsLoaded;
                    if (e.na.namedQuery) this.queries.push(e.na.namedQuery);
                    else if (e.na.documentMetadata) {
                        this.documents.push({
                            metadata: e.na.documentMetadata
                        }), e.na.documentMetadata.exists || ++t;
                        const n = oi.fromString(e.na.documentMetadata.name);
                        this.collectionGroups.add(n.get(n.length - 2))
                    } else e.na.document && (this.documents[this.documents.length - 1].document = e.na.document, ++t);
                    return t !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = t, Object.assign({}, this.progress)) : null
                }
                oa(e) {
                    const t = new Map,
                        n = new Rl(this.serializer);
                    for (const i of e)
                        if (i.metadata.queries) {
                            const e = n.Ps(i.metadata.name);
                            for (const n of i.metadata.queries) {
                                var r = (t.get(n) || Xa()).add(e);
                                t.set(n, r)
                            }
                        }
                    return t
                }
                async complete() {
                    const e = await async function(e, t, n, r) {
                            const i = e;
                            let s = Xa(),
                                a = Ka;
                            for (const e of n) {
                                const n = t.Ps(e.metadata.name);
                                e.document && (s = s.add(n));
                                const c = t.Is(e);
                                c.setReadTime(t.Ts(e.metadata.readTime)), a = a.insert(n, c)
                            }
                            const o = i.os.newChangeBuffer({
                                    trackRemovals: !0
                                }),
                                u = await _h(i, (r = r, La(ka(oi.fromString(`__bundle__/docs/${r}`)))));
                            return i.persistence.runTransaction("Apply bundle documents", "readwrite", t => wh(t, o, a).next(e => (o.apply(t), e)).next(e => i.Qr.removeMatchingKeysForTargetId(t, u.targetId).next(() => i.Qr.addMatchingKeys(t, s, u.targetId)).next(() => i.localDocuments.getLocalViewOfDocuments(t, e.cs, e.ls)).next(() => e.cs)))
                        }(this.localStore, new Rl(this.serializer), this.documents, this.ia.id),
                        t = this.oa(this.documents);
                    for (const e of this.queries) await async function(e, n, r = Xa()) {
                        const i = await _h(e, La(Lu(n.bundledQuery))),
                            s = e;
                        return s.persistence.runTransaction("Save named query", "readwrite", e => {
                            var t = iu(n.readTime);
                            if (0 <= i.snapshotVersion.compareTo(t)) return s.$r.saveNamedQuery(e, n);
                            t = i.withResumeToken(Ts.EMPTY_BYTE_STRING, t);
                            return s.ns = s.ns.insert(t.targetId, t), s.Qr.updateTargetData(e, t).next(() => s.Qr.removeMatchingKeysForTargetId(e, i.targetId)).next(() => s.Qr.addMatchingKeys(e, r, i.targetId)).next(() => s.$r.saveNamedQuery(e, n))
                        })
                    }(this.localStore, e, t.get(e.name));
                    return this.progress.taskState = "Success", {
                        progress: this.progress,
                        _a: this.collectionGroups,
                        aa: e
                    }
                }
            }

            function Ol(e) {
                return {
                    taskState: "Running",
                    documentsLoaded: 0,
                    bytesLoaded: 0,
                    totalDocuments: e.totalDocuments,
                    totalBytes: e.totalBytes
                }
            }
            class Ll {
                constructor(e) {
                    this.key = e
                }
            }
            class Pl {
                constructor(e) {
                    this.key = e
                }
            }
            class Fl {
                constructor(e, t) {
                    this.query = e, this.ua = t, this.ca = null, this.hasCachedResults = !1, this.current = !1, this.la = Xa(), this.mutatedKeys = Xa(), this.ha = Ga(e), this.Pa = new Il(this.ha)
                }
                get Ia() {
                    return this.ua
                }
                Ta(e, t) {
                    const o = t ? t.Ea : new El,
                        u = (t || this).Pa;
                    let c = (t || this).mutatedKeys,
                        h = u,
                        l = !1;
                    const d = "F" === this.query.limitType && u.size === this.query.limit ? u.last() : null,
                        f = "L" === this.query.limitType && u.size === this.query.limit ? u.first() : null;
                    if (e.inorderTraversal((e, t) => {
                            const n = u.get(e),
                                r = qa(this.query, t) ? t : null,
                                i = !!n && this.mutatedKeys.has(n.key),
                                s = !!r && (r.hasLocalMutations || this.mutatedKeys.has(r.key) && r.hasCommittedMutations);
                            let a = !1;
                            n && r ? n.data.isEqual(r.data) ? i !== s && (o.track({
                                type: 3,
                                doc: r
                            }), a = !0) : this.da(n, r) || (o.track({
                                type: 2,
                                doc: r
                            }), a = !0, (d && 0 < this.ha(r, d) || f && this.ha(r, f) < 0) && (l = !0)) : !n && r ? (o.track({
                                type: 0,
                                doc: r
                            }), a = !0) : n && !r && (o.track({
                                type: 1,
                                doc: n
                            }), a = !0, (d || f) && (l = !0)), a && (c = r ? (h = h.add(r), s ? c.add(e) : c.delete(e)) : (h = h.delete(e), c.delete(e)))
                        }), null !== this.query.limit)
                        for (; h.size > this.query.limit;) {
                            const e = "F" === this.query.limitType ? h.last() : h.first();
                            h = h.delete(e.key), c = c.delete(e.key), o.track({
                                type: 1,
                                doc: e
                            })
                        }
                    return {
                        Pa: h,
                        Ea: o,
                        Xi: l,
                        mutatedKeys: c
                    }
                }
                da(e, t) {
                    return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations
                }
                applyChanges(e, t, n, r) {
                    var i = this.Pa;
                    this.Pa = e.Pa, this.mutatedKeys = e.mutatedKeys;
                    const s = e.Ea.k_();
                    s.sort((e, t) => function(e, t) {
                        var n = e => {
                            switch (e) {
                                case 0:
                                    return 1;
                                case 2:
                                case 3:
                                    return 2;
                                case 1:
                                    return 0;
                                default:
                                    return qr()
                            }
                        };
                        return n(e) - n(t)
                    }(e.type, t.type) || this.ha(e.doc, t.doc)), this.Aa(n), r = null != r && r;
                    var a = t && !r ? this.Ra() : [],
                        o = 0 === this.la.size && this.current && !r ? 1 : 0,
                        u = o !== this.ca;
                    return this.ca = o, 0 !== s.length || u ? {
                        snapshot: new Tl(this.query, e.Pa, i, s, e.mutatedKeys, 0 == o, u, !1, !!n && 0 < n.resumeToken.approximateByteSize()),
                        Va: a
                    } : {
                        Va: a
                    }
                }
                G_(e) {
                    return this.current && "Offline" === e ? (this.current = !1, this.applyChanges({
                        Pa: this.Pa,
                        Ea: new El,
                        mutatedKeys: this.mutatedKeys,
                        Xi: !1
                    }, !1)) : {
                        Va: []
                    }
                }
                ma(e) {
                    return !this.ua.has(e) && !!this.Pa.has(e) && !this.Pa.get(e).hasLocalMutations
                }
                Aa(e) {
                    e && (e.addedDocuments.forEach(e => this.ua = this.ua.add(e)), e.modifiedDocuments.forEach(e => {}), e.removedDocuments.forEach(e => this.ua = this.ua.delete(e)), this.current = e.current)
                }
                Ra() {
                    if (!this.current) return [];
                    const t = this.la;
                    this.la = Xa(), this.Pa.forEach(e => {
                        this.ma(e.key) && (this.la = this.la.add(e.key))
                    });
                    const n = [];
                    return t.forEach(e => {
                        this.la.has(e) || n.push(new Pl(e))
                    }), this.la.forEach(e => {
                        t.has(e) || n.push(new Ll(e))
                    }), n
                }
                fa(e) {
                    this.ua = e.hs, this.la = Xa();
                    var t = this.Ta(e.documents);
                    return this.applyChanges(t, !0)
                }
                ga() {
                    return Tl.fromInitialDocuments(this.query, this.Pa, this.mutatedKeys, 0 === this.ca, this.hasCachedResults)
                }
            }
            class Vl {
                constructor(e, t, n) {
                    this.query = e, this.targetId = t, this.view = n
                }
            }
            class Bl {
                constructor(e) {
                    this.key = e, this.pa = !1
                }
            }
            class Ul {
                constructor(e, t, n, r, i, s) {
                    this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = r, this.currentUser = i, this.maxConcurrentLimboResolutions = s, this.ya = {}, this.wa = new za(e => Ba(e), Va), this.Sa = new Map, this.ba = new Set, this.Da = new ps(hi.comparator), this.Ca = new Map, this.va = new Hc, this.Fa = {}, this.Ma = new Map, this.xa = Sc.Ln(), this.onlineState = "Unknown", this.Oa = void 0
                }
                get isPrimaryClient() {
                    return !0 === this.Oa
                }
            }
            async function ql(e, t, n, r) {
                var i = await _h(e.localStore, La(t)),
                    s = i.targetId,
                    a = n ? e.sharedClientState.addLocalQueryTarget(s) : "not-current";
                let o;
                return r && (o = await jl(e, t, s, "current" === a, i.resumeToken)), e.isPrimaryClient && n && nl(e.remoteStore, i), o
            }
            async function jl(r, e, t, n, i) {
                r.Na = (e, t, n) => async function(e, t, n, r) {
                    let i = t.view.Ta(n);
                    i.Xi && (i = await Ih(e.localStore, t.query, !1).then(({
                        documents: e
                    }) => t.view.Ta(e, i)));
                    var s = r && r.targetChanges.get(t.targetId),
                        a = r && null != r.targetMismatches.get(t.targetId),
                        a = t.view.applyChanges(i, e.isPrimaryClient, s, a);
                    return Jl(e, t.targetId, a.Va), a.snapshot
                }(r, e, t, n);
                const s = await Ih(r.localStore, e, !0),
                    a = new Fl(e, s.hs),
                    o = a.Ta(s.documents),
                    u = Go.createSynthesizedTargetChangeForCurrentChange(t, n && "Offline" !== r.onlineState, i),
                    c = a.applyChanges(o, r.isPrimaryClient, u);
                Jl(r, t, c.Va);
                var h = new Vl(e, t, a);
                return r.wa.set(e, h), r.Sa.has(t) ? r.Sa.get(t).push(e) : r.Sa.set(t, [e]), c.snapshot
            }
            async function Gl(e, t, n) {
                const r = id(e);
                try {
                    const e = await
                    function(e, i) {
                        const s = e,
                            a = ii.now(),
                            o = i.reduce((e, t) => e.add(t.key), Xa());
                        let u, c;
                        return s.persistence.runTransaction("Locally write mutations", "readwrite", n => {
                            let t = Ka,
                                r = Xa();
                            return s.os.getEntries(n, o).next(e => {
                                t = e, t.forEach((e, t) => {
                                    t.isValidDocument() || (r = r.add(e))
                                })
                            }).next(() => s.localDocuments.getOverlayedDocuments(n, t)).next(e => {
                                u = e;
                                const t = [];
                                for (const n of i) {
                                    const i = function(e, t) {
                                        let n = null;
                                        for (const r of e.fieldTransforms) {
                                            const e = t.data.field(r.field),
                                                i = io(r.transform, e || null);
                                            null != i && (null === n && (n = Xs.empty()), n.set(r.field, i))
                                        }
                                        return n || null
                                    }(n, u.get(n.key).overlayedDocument);
                                    null != i && t.push(new To(n.key, i, function r(e) {
                                        const i = [];
                                        return gs(e.fields, (e, t) => {
                                            const n = new ci([e]);
                                            if (Qs(t)) {
                                                const e = r(t.mapValue).fields;
                                                if (0 === e.length) i.push(n);
                                                else
                                                    for (const t of e) i.push(n.child(t))
                                            } else i.push(n)
                                        }), new Is(i)
                                    }(i.value.mapValue), po.exists(!0)))
                                }
                                return s.mutationQueue.addMutationBatch(n, a, t, i)
                            }).next(e => {
                                var t = (c = e).applyToLocalDocumentSet(u, r);
                                return s.documentOverlayCache.saveOverlays(n, e.batchId, t)
                            })
                        }).then(() => ({
                            batchId: c.batchId,
                            changes: Wa(u)
                        }))
                    }(r.localStore, t);
                    r.sharedClientState.addPendingMutation(e.batchId),
                        function(e, t, n) {
                            let r = e.Fa[e.currentUser.toKey()];
                            r = r || new ps(ti), r = r.insert(t, n), e.Fa[e.currentUser.toKey()] = r
                        }(r, e.batchId, n), await Zl(r, e.changes), await dl(r.remoteStore)
                } catch (e) {
                    const t = bl(e, "Failed to persist write");
                    n.reject(t)
                }
            }
            async function zl(e, t) {
                const r = e;
                try {
                    const e = await vh(r.localStore, t);
                    t.targetChanges.forEach((e, t) => {
                        const n = r.Ca.get(t);
                        n && (jr(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1), 0 < e.addedDocuments.size ? n.pa = !0 : 0 < e.modifiedDocuments.size ? jr(n.pa) : 0 < e.removedDocuments.size && (jr(n.pa), n.pa = !1))
                    }), await Zl(r, e, t)
                } catch (e) {
                    await Ii(e)
                }
            }

            function Kl(r, i, e) {
                const t = r;
                if (t.isPrimaryClient && 0 === e || !t.isPrimaryClient && 1 === e) {
                    const r = [];
                    t.wa.forEach((e, t) => {
                            var n = t.view.G_(i);
                            n.snapshot && r.push(n.snapshot)
                        }),
                        function(e, n) {
                            const t = e;
                            t.onlineState = n;
                            let r = !1;
                            t.queries.forEach((e, t) => {
                                for (const e of t.Q_) e.G_(n) && (r = !0)
                            }), r && Al(t)
                        }(t.eventManager, i), r.length && t.ya.u_(r), t.onlineState = i, t.isPrimaryClient && t.sharedClientState.setOnlineState(i)
                }
            }
            async function $l(e, t) {
                const n = e,
                    r = t.batch.batchId;
                try {
                    const e = await
                    function(e, r) {
                        const i = e;
                        return i.persistence.runTransaction("Acknowledge batch", "readwrite-primary", e => {
                            const t = r.batch.keys(),
                                n = i.os.newChangeBuffer({
                                    trackRemovals: !0
                                });
                            return function(e, t, r, i) {
                                const s = r.batch,
                                    n = s.keys();
                                let a = Ei.resolve();
                                return n.forEach(n => {
                                    a = a.next(() => i.getEntry(t, n)).next(e => {
                                        var t = r.docVersions.get(n);
                                        jr(null !== t), e.version.compareTo(t) < 0 && (s.applyToRemoteDocument(e, r), e.isValidDocument() && (e.setReadTime(r.commitVersion), i.addEntry(e)))
                                    })
                                }), a.next(() => e.mutationQueue.removeMutationBatch(t, s))
                            }(i, e, r, n).next(() => n.apply(e)).next(() => i.mutationQueue.performConsistencyCheck(e)).next(() => i.documentOverlayCache.removeOverlaysForBatchId(e, t, r.batch.batchId)).next(() => i.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, function(e) {
                                let t = Xa();
                                for (let n = 0; n < e.mutationResults.length; ++n) 0 < e.mutationResults[n].transformResults.length && (t = t.add(e.batch.mutations[n].key));
                                return t
                            }(r))).next(() => i.localDocuments.getDocuments(e, t))
                        })
                    }(n.localStore, t);
                    Wl(n, r, null), Ql(n, r), n.sharedClientState.updateMutationState(r, "acknowledged"), await Zl(n, e)
                } catch (e) {
                    await Ii(e)
                }
            }

            function Ql(e, t) {
                (e.Ma.get(t) || []).forEach(e => {
                    e.resolve()
                }), e.Ma.delete(t)
            }

            function Wl(e, t, n) {
                const r = e;
                let i = r.Fa[r.currentUser.toKey()];
                if (i) {
                    const e = i.get(t);
                    e && (n ? e.reject(n) : e.resolve(), i = i.remove(t)), r.Fa[r.currentUser.toKey()] = i
                }
            }

            function Hl(t, e, n = null) {
                t.sharedClientState.removeLocalQueryTarget(e);
                for (const r of t.Sa.get(e)) t.wa.delete(r), n && t.ya.La(r, n);
                t.Sa.delete(e), t.isPrimaryClient && t.va.Vr(e).forEach(e => {
                    t.va.containsKey(e) || Yl(t, e)
                })
            }

            function Yl(e, t) {
                e.ba.delete(t.path.canonicalString());
                var n = e.Da.get(t);
                null !== n && (rl(e.remoteStore, n), e.Da = e.Da.remove(t), e.Ca.delete(n), Xl(e))
            }

            function Jl(e, t, n) {
                for (const r of n) r instanceof Ll ? (e.va.addReference(r.key, t), function(e, t) {
                    const n = t.key,
                        r = n.path.canonicalString();
                    e.Da.get(n) || e.ba.has(r) || (Fr("SyncEngine", "New document in limbo: " + n), e.ba.add(r), Xl(e))
                }(e, r)) : r instanceof Pl ? (Fr("SyncEngine", "Document no longer in limbo: " + r.key), e.va.removeReference(r.key, t), e.va.containsKey(r.key) || Yl(e, r.key)) : qr()
            }

            function Xl(e) {
                for (; 0 < e.ba.size && e.Da.size < e.maxConcurrentLimboResolutions;) {
                    var t = e.ba.values().next().value;
                    e.ba.delete(t);
                    var n = new hi(oi.fromString(t)),
                        t = e.xa.next();
                    e.Ca.set(t, new Bl(n)), e.Da = e.Da.insert(n, t), nl(e.remoteStore, new xu(La(ka(n.path)), t, "TargetPurposeLimboResolution", Li._e))
                }
            }
            async function Zl(e, t, r) {
                const i = e,
                    s = [],
                    a = [],
                    o = [];
                i.wa.isEmpty() || (i.wa.forEach((e, n) => {
                    o.push(i.Na(n, t, r).then(e => {
                        var t;
                        (e || r) && i.isPrimaryClient && i.sharedClientState.updateQueryState(n.targetId, null != e && e.fromCache ? "not-current" : "current"), e && (s.push(e), t = lh.Ki(n.targetId, e), a.push(t))
                    }))
                }), await Promise.all(o), i.ya.u_(s), await async function(e, t) {
                    const r = e;
                    try {
                        await r.persistence.runTransaction("notifyLocalViewChanges", "readwrite", n => Ei.forEach(t, t => Ei.forEach(t.qi, e => r.persistence.referenceDelegate.addReference(n, t.targetId, e)).next(() => Ei.forEach(t.Qi, e => r.persistence.referenceDelegate.removeReference(n, t.targetId, e)))))
                    } catch (e) {
                        if (!Di(e)) throw e;
                        Fr("LocalStore", "Failed to update sequence numbers: " + e)
                    }
                    for (const e of t) {
                        const t = e.targetId;
                        if (!e.fromCache) {
                            const e = r.ns.get(t),
                                n = e.snapshotVersion,
                                i = e.withLastLimboFreeSnapshotVersion(n);
                            r.ns = r.ns.insert(t, i)
                        }
                    }
                }(i.localStore, a))
            }
            async function ed(r, e) {
                const i = r;
                if (rd(i), id(i), !0 === e && !0 !== i.Oa) {
                    const r = i.sharedClientState.getAllActiveQueryTargets(),
                        e = await td(i, r.toArray());
                    i.Oa = !0, await yl(i.remoteStore, !0);
                    for (const r of e) nl(i.remoteStore, r)
                } else if (!1 === e && !1 !== i.Oa) {
                    const r = [];
                    let n = Promise.resolve();
                    i.Sa.forEach((e, t) => {
                            i.sharedClientState.isLocalQueryTarget(t) ? r.push(t) : n = n.then(() => (Hl(i, t), bh(i.localStore, t, !0))), rl(i.remoteStore, t)
                        }), await n, await td(i, r),
                        function(e) {
                            const n = e;
                            n.Ca.forEach((e, t) => {
                                rl(n.remoteStore, t)
                            }), n.va.mr(), n.Ca = new Map, n.Da = new ps(hi.comparator)
                        }(i), i.Oa = !1, await yl(i.remoteStore, !1)
                }
            }
            async function td(t, n) {
                const r = t,
                    i = [],
                    s = [];
                for (const t of n) {
                    let e;
                    const h = r.Sa.get(t);
                    if (h && 0 !== h.length) {
                        e = await _h(r.localStore, La(h[0]));
                        for (const t of h) {
                            const n = r.wa.get(t),
                                h = (a = r, o = n, c = u = void 0, c = await Ih((u = a).localStore, o.query, !0), c = o.view.fa(c), u.isPrimaryClient && Jl(u, o.targetId, c.Va), await c);
                            h.snapshot && s.push(h.snapshot)
                        }
                    } else {
                        const h = await Eh(r.localStore, t);
                        e = await _h(r.localStore, h), await jl(r, nd(h), t, !1, e.resumeToken)
                    }
                    i.push(e)
                }
                var a, o, u, c;
                return r.ya.u_(s), i
            }

            function nd(e) {
                return Na(e.path, e.collectionGroup, e.orderBy, e.filters, e.limit, "F", e.startAt, e.endAt)
            }

            function rd(e) {
                const t = e;
                return t.remoteStore.remoteSyncer.applyRemoteEvent = zl.bind(null, t), t.remoteStore.remoteSyncer.getRemoteKeysForTarget = (function(e, t) {
                    const n = e,
                        r = n.Ca.get(t);
                    if (r && r.pa) return Xa().add(r.key); {
                        let e = Xa();
                        const r = n.Sa.get(t);
                        if (!r) return e;
                        for (const t of r) {
                            const r = n.wa.get(t);
                            e = e.unionWith(r.view.Ia)
                        }
                        return e
                    }
                }).bind(null, t), t.remoteStore.remoteSyncer.rejectListen = (async function(e, t, n) {
                    const r = e;
                    r.sharedClientState.updateQueryState(t, "rejected", n);
                    const i = r.Ca.get(t),
                        s = i && i.key;
                    if (s) {
                        let e = new ps(hi.comparator);
                        e = e.insert(s, Zs.newNoDocument(s, si.min()));
                        const n = Xa().add(s),
                            i = new jo(si.min(), new Map, new ps(ti), e, n);
                        await zl(r, i), r.Da = r.Da.remove(s), r.Ca.delete(t), Xl(r)
                    } else await bh(r.localStore, t, !1).then(() => Hl(r, t, n)).catch(Ii)
                }).bind(null, t), t.ya.u_ = (function(e, t) {
                    const n = e;
                    let r = !1;
                    for (const e of t) {
                        const t = e.query,
                            i = n.queries.get(t);
                        if (i) {
                            for (const t of i.Q_) t.z_(e) && (r = !0);
                            i.q_ = e
                        }
                    }
                    r && Al(n)
                }).bind(null, t.eventManager), t.ya.La = (function(e, t, n) {
                    const r = e,
                        i = r.queries.get(t);
                    if (i)
                        for (const e of i.Q_) e.onError(n);
                    r.queries.delete(t)
                }).bind(null, t.eventManager), t
            }

            function id(e) {
                const t = e;
                return t.remoteStore.remoteSyncer.applySuccessfulWrite = $l.bind(null, t), t.remoteStore.remoteSyncer.rejectFailedWrite = (async function(e, t, n) {
                    const r = e;
                    try {
                        const e = await
                        function(e, r) {
                            const i = e;
                            return i.persistence.runTransaction("Reject batch", "readwrite-primary", t => {
                                let n;
                                return i.mutationQueue.lookupMutationBatch(t, r).next(e => (jr(null !== e), n = e.keys(), i.mutationQueue.removeMutationBatch(t, e))).next(() => i.mutationQueue.performConsistencyCheck(t)).next(() => i.documentOverlayCache.removeOverlaysForBatchId(t, n, r)).next(() => i.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, n)).next(() => i.localDocuments.getDocuments(t, n))
                            })
                        }(r.localStore, t);
                        Wl(r, t, n), Ql(r, t), r.sharedClientState.updateMutationState(t, "rejected", n), await Zl(r, e)
                    } catch (n) {
                        await Ii(n)
                    }
                }).bind(null, t), t
            }
            class sd {
                constructor() {
                    this.synchronizeTabs = !1
                }
                async initialize(e) {
                    this.serializer = $h(e.databaseInfo.databaseId), this.sharedClientState = this.createSharedClientState(e), this.persistence = this.createPersistence(e), await this.persistence.start(), this.localStore = this.createLocalStore(e), this.gcScheduler = this.createGarbageCollectionScheduler(e, this.localStore), this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(e, this.localStore)
                }
                createGarbageCollectionScheduler(e, t) {
                    return null
                }
                createIndexBackfillerScheduler(e, t) {
                    return null
                }
                createLocalStore(e) {
                    return mh(this.persistence, new fh, e.initialUser, this.serializer)
                }
                createPersistence(e) {
                    return new th(rh.Hr, this.serializer)
                }
                createSharedClientState(e) {
                    return new Lh
                }
                async terminate() {
                    var e;
                    null === (e = this.gcScheduler) || void 0 === e || e.stop(), null === (e = this.indexBackfillerScheduler) || void 0 === e || e.stop(), this.sharedClientState.shutdown(), await this.persistence.shutdown()
                }
            }
            class ad extends sd {
                constructor(e, t, n) {
                    super(), this.ka = e, this.cacheSizeBytes = t, this.forceOwnership = n, this.synchronizeTabs = !1
                }
                async initialize(e) {
                    await super.initialize(e), await this.ka.initialize(this, e), await id(this.ka.syncEngine), await dl(this.ka.remoteStore), await this.persistence.fi(() => (this.gcScheduler && !this.gcScheduler.started && this.gcScheduler.start(), this.indexBackfillerScheduler && !this.indexBackfillerScheduler.started && this.indexBackfillerScheduler.start(), Promise.resolve()))
                }
                createLocalStore(e) {
                    return mh(this.persistence, new fh, e.initialUser, this.serializer)
                }
                createGarbageCollectionScheduler(e, t) {
                    var n = this.persistence.referenceDelegate.garbageCollector;
                    return new Rc(n, e.asyncQueue, t)
                }
                createIndexBackfillerScheduler(e, t) {
                    var n = new Oi(t, this.persistence);
                    return new Mi(e.asyncQueue, n)
                }
                createPersistence(e) {
                    var t = hh(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey),
                        n = void 0 !== this.cacheSizeBytes ? yc.withCacheSize(this.cacheSizeBytes) : yc.DEFAULT;
                    return new oh(this.synchronizeTabs, t, e.clientId, n, e.asyncQueue, zh(), Kh(), this.serializer, this.sharedClientState, !!this.forceOwnership)
                }
                createSharedClientState(e) {
                    return new Lh
                }
            }
            class od extends ad {
                constructor(e, t) {
                    super(e, t, !1), this.ka = e, this.cacheSizeBytes = t, this.synchronizeTabs = !0
                }
                async initialize(e) {
                    await super.initialize(e);
                    var t = this.ka.syncEngine;
                    this.sharedClientState instanceof Oh && (this.sharedClientState.syncEngine = {
                        Zs: (async function(e, t, n, r) {
                            var i = e,
                                s = await
                            function(e, n) {
                                const r = e,
                                    i = r.mutationQueue;
                                return r.persistence.runTransaction("Lookup mutation documents", "readonly", t => i.vn(t, n).next(e => e ? r.localDocuments.getDocuments(t, e) : Ei.resolve(null)))
                            }(i.localStore, t);
                            null !== s ? ("pending" === n ? await dl(i.remoteStore) : "acknowledged" === n || "rejected" === n ? (Wl(i, t, r || null), Ql(i, t), i.localStore.mutationQueue.Mn(t)) : qr(), await Zl(i, s)) : Fr("SyncEngine", "Cannot apply mutation batch with id: " + t)
                        }).bind(null, t),
                        Xs: (async function(e, t, n, r) {
                            const i = e;
                            if (i.Oa) Fr("SyncEngine", "Ignoring unexpected query state notification.");
                            else {
                                var s = i.Sa.get(t);
                                if (s && 0 < s.length) switch (n) {
                                    case "current":
                                    case "not-current":
                                        {
                                            const e = await Th(i.localStore, ja(s[0])),
                                                r = jo.createSynthesizedRemoteEventForCurrentChange(t, "current" === n, Ts.EMPTY_BYTE_STRING);await Zl(i, e, r);
                                            break
                                        }
                                    case "rejected":
                                        await bh(i.localStore, t, !0), Hl(i, t, r);
                                        break;
                                    default:
                                        qr()
                                }
                            }
                        }).bind(null, t),
                        eo: (async function(e, t, n) {
                            const r = rd(e);
                            if (r.Oa) {
                                for (const e of t)
                                    if (r.Sa.has(e) && r.sharedClientState.isActiveQueryTarget(e)) Fr("SyncEngine", "Adding an already active target " + e);
                                    else {
                                        const t = await Eh(r.localStore, e),
                                            n = await _h(r.localStore, t);
                                        await jl(r, nd(t), n.targetId, !1, n.resumeToken), nl(r.remoteStore, n)
                                    }
                                for (const e of n) r.Sa.has(e) && await bh(r.localStore, e, !1).then(() => {
                                    rl(r.remoteStore, e), Hl(r, e)
                                }).catch(Ii)
                            }
                        }).bind(null, t),
                        Bi: (function(e) {
                            return e.localStore.persistence.Bi()
                        }).bind(null, t),
                        Ys: (async function(e, t) {
                            const n = e;
                            return Th(n.localStore, t).then(e => Zl(n, e))
                        }).bind(null, t)
                    }, await this.sharedClientState.start()), await this.persistence.fi(async e => {
                        await ed(this.ka.syncEngine, e), this.gcScheduler && (e && !this.gcScheduler.started ? this.gcScheduler.start() : e || this.gcScheduler.stop()), this.indexBackfillerScheduler && (e && !this.indexBackfillerScheduler.started ? this.indexBackfillerScheduler.start() : e || this.indexBackfillerScheduler.stop())
                    })
                }
                createSharedClientState(e) {
                    var t = zh();
                    if (!Oh.D(t)) throw new zr(Gr.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
                    var n = hh(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey);
                    return new Oh(t, e.asyncQueue, n, e.clientId, e.initialUser)
                }
            }
            class ud {
                async initialize(e, t) {
                    this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs), this.sharedClientState.onlineStateHandler = e => Kl(this.syncEngine, e, 1), this.remoteStore.remoteSyncer.handleCredentialChange = (async function(e, t) {
                        const n = e;
                        if (!n.currentUser.isEqual(t)) {
                            Fr("SyncEngine", "User change. New user:", t.toKey());
                            const i = await ph(n.localStore, t);
                            n.currentUser = t, e = n, r = "'waitForPendingWrites' promise is rejected due to a user change.", e.Ma.forEach(e => {
                                e.forEach(e => {
                                    e.reject(new zr(Gr.CANCELLED, r))
                                })
                            }), e.Ma.clear(), n.sharedClientState.handleUserChange(t, i.removedBatchIds, i.addedBatchIds), await Zl(n, i.us)
                        }
                        var r
                    }).bind(null, this.syncEngine), await yl(this.remoteStore, this.syncEngine.isPrimaryClient))
                }
                createEventManager(e) {
                    return new xl
                }
                createDatastore(e) {
                    var t, n, r, i = $h(e.databaseInfo.databaseId),
                        s = (r = e.databaseInfo, new Gh(r));
                    return t = e.authCredentials, n = e.appCheckCredentials, r = s, e = i, new Jh(t, n, r, e)
                }
                createRemoteStore(e) {
                    return t = this.localStore, n = this.datastore, r = e.asyncQueue, i = e => Kl(this.syncEngine, e, 0), e = new(Fh.D() ? Fh : Ph), new Zh(t, n, r, i, e);
                    var t, n, r, i
                }
                createSyncEngine(e, t) {
                    return function(e, t, n, r, i, s, a) {
                        const o = new Ul(e, t, n, r, i, s);
                        return a && (o.Oa = !0), o
                    }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t)
                }
                async terminate() {
                    var e;
                    await async function(e) {
                        const t = e;
                        Fr("RemoteStore", "RemoteStore shutting down."), t.v_.add(5), await tl(t), t.M_.shutdown(), t.x_.set("Unknown")
                    }(this.remoteStore), null === (e = this.datastore) || void 0 === e || e.terminate()
                }
            }

            function cd(t, n = 10240) {
                let r = 0;
                return {
                    async read() {
                        if (r < t.byteLength) {
                            var e = {
                                value: t.slice(r, r + n),
                                done: !1
                            };
                            return r += n, e
                        }
                        return {
                            done: !0
                        }
                    },
                    async cancel() {},
                    releaseLock() {},
                    closed: Promise.resolve()
                }
            }
            class hd {
                constructor(e) {
                    this.observer = e, this.muted = !1
                }
                next(e) {
                    this.observer.next && this.qa(this.observer.next, e)
                }
                error(e) {
                    this.observer.error ? this.qa(this.observer.error, e) : Vr("Uncaught Error in snapshot listener:", e.toString())
                }
                Qa() {
                    this.muted = !0
                }
                qa(e, t) {
                    this.muted || setTimeout(() => {
                        this.muted || e(t)
                    }, 0)
                }
            }
            class ld {
                constructor(e, t) {
                    this.Ka = e, this.serializer = t, this.metadata = new Kr, this.buffer = new Uint8Array, this.$a = new TextDecoder("utf-8"), this.Ua().then(e => {
                        e && e.ra() ? this.metadata.resolve(e.na.metadata) : this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null==e?void 0:e.na)}`))
                    }, e => this.metadata.reject(e))
                }
                close() {
                    return this.Ka.cancel()
                }
                async getMetadata() {
                    return this.metadata.promise
                }
                async Ba() {
                    return await this.getMetadata(), this.Ua()
                }
                async Ua() {
                    var e = await this.Wa();
                    if (null === e) return null;
                    var t = this.$a.decode(e),
                        n = Number(t);
                    isNaN(n) && this.Ga(`length string (${t}) is not valid number`);
                    t = await this.za(n);
                    return new kl(JSON.parse(t), e.length + n)
                }
                ja() {
                    return this.buffer.findIndex(e => e === "{".charCodeAt(0))
                }
                async Wa() {
                    for (; this.ja() < 0 && !await this.Ha(););
                    if (0 === this.buffer.length) return null;
                    var e = this.ja();
                    e < 0 && this.Ga("Reached the end of bundle when a length string is expected.");
                    var t = this.buffer.slice(0, e);
                    return this.buffer = this.buffer.slice(e), t
                }
                async za(e) {
                    for (; this.buffer.length < e;) await this.Ha() && this.Ga("Reached the end of bundle when more is expected.");
                    var t = this.$a.decode(this.buffer.slice(0, e));
                    return this.buffer = this.buffer.slice(e), t
                }
                Ga(e) {
                    throw this.Ka.cancel(), new Error(`Invalid bundle format: ${e}`)
                }
                async Ha() {
                    var e = await this.Ka.read();
                    if (!e.done) {
                        const t = new Uint8Array(this.buffer.length + e.value.length);
                        t.set(this.buffer), t.set(e.value, this.buffer.length), this.buffer = t
                    }
                    return e.done
                }
            }
            class dd {
                constructor(e) {
                    this.datastore = e, this.readVersions = new Map, this.mutations = [], this.committed = !1, this.lastTransactionError = null, this.writtenDocs = new Set
                }
                async lookup(e) {
                    if (this.ensureCommitNotCalled(), 0 < this.mutations.length) throw this.lastTransactionError = new zr(Gr.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes."), this.lastTransactionError;
                    const t = await async function(e, t) {
                        const r = e,
                            n = {
                                documents: t.map(e => uu(r.serializer, e))
                            },
                            i = await r.vo("BatchGetDocuments", r.serializer.databaseId, oi.emptyPath(), n, t.length),
                            s = new Map;
                        i.forEach(e => {
                            const t = (n = r.serializer, "found" in (e = e) ? function(e, t) {
                                jr(!!t.found), t.found.name, t.found.updateTime;
                                var n = cu(e, t.found.name),
                                    r = iu(t.found.updateTime),
                                    i = t.found.createTime ? iu(t.found.createTime) : si.min(),
                                    s = new Xs({
                                        mapValue: {
                                            fields: t.found.fields
                                        }
                                    });
                                return Zs.newFoundDocument(n, r, i, s)
                            }(n, e) : "missing" in e ? function(e, t) {
                                jr(!!t.missing), jr(!!t.readTime);
                                var n = cu(e, t.missing),
                                    r = iu(t.readTime);
                                return Zs.newNoDocument(n, r)
                            }(n, e) : qr());
                            var n;
                            s.set(t.key.toString(), t)
                        });
                        const a = [];
                        return t.forEach(e => {
                            var t = s.get(e.toString());
                            jr(!!t), a.push(t)
                        }), a
                    }(this.datastore, e);
                    return t.forEach(e => this.recordVersion(e)), t
                }
                set(e, t) {
                    this.write(t.toMutation(e, this.precondition(e))), this.writtenDocs.add(e.toString())
                }
                update(e, t) {
                    try {
                        this.write(t.toMutation(e, this.preconditionForUpdate(e)))
                    } catch (e) {
                        this.lastTransactionError = e
                    }
                    this.writtenDocs.add(e.toString())
                }
                delete(e) {
                    this.write(new Do(e, this.precondition(e))), this.writtenDocs.add(e.toString())
                }
                async commit() {
                    if (this.ensureCommitNotCalled(), this.lastTransactionError) throw this.lastTransactionError;
                    const t = this.readVersions;
                    this.mutations.forEach(e => {
                        t.delete(e.key.toString())
                    }), t.forEach((e, t) => {
                        var n = hi.fromPath(t);
                        this.mutations.push(new Ao(n, this.precondition(n)))
                    }), await async function(e, t) {
                        const n = e,
                            r = {
                                writes: t.map(e => pu(n.serializer, e))
                            };
                        await n.So("Commit", n.serializer.databaseId, oi.emptyPath(), r)
                    }(this.datastore, this.mutations), this.committed = !0
                }
                recordVersion(e) {
                    let t;
                    if (e.isFoundDocument()) t = e.version;
                    else {
                        if (!e.isNoDocument()) throw qr();
                        t = si.min()
                    }
                    var n = this.readVersions.get(e.key.toString());
                    if (n) {
                        if (!t.isEqual(n)) throw new zr(Gr.ABORTED, "Document version changed between two reads.")
                    } else this.readVersions.set(e.key.toString(), t)
                }
                precondition(e) {
                    const t = this.readVersions.get(e.toString());
                    return !this.writtenDocs.has(e.toString()) && t ? t.isEqual(si.min()) ? po.exists(!1) : po.updateTime(t) : po.none()
                }
                preconditionForUpdate(e) {
                    const t = this.readVersions.get(e.toString());
                    if (this.writtenDocs.has(e.toString()) || !t) return po.exists(!0);
                    if (t.isEqual(si.min())) throw new zr(Gr.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
                    return po.updateTime(t)
                }
                write(e) {
                    this.ensureCommitNotCalled(), this.mutations.push(e)
                }
                ensureCommitNotCalled() {}
            }
            class fd {
                constructor(e, t, n, r, i) {
                    this.asyncQueue = e, this.datastore = t, this.options = n, this.updateFunction = r, this.deferred = i, this.Ja = n.maxAttempts, this.jo = new Qh(this.asyncQueue, "transaction_retry")
                }
                Ya() {
                    --this.Ja, this.Za()
                }
                Za() {
                    this.jo.qo(async () => {
                        const t = new dd(this.datastore),
                            e = this.Xa(t);
                        e && e.then(e => {
                            this.asyncQueue.enqueueAndForget(() => t.commit().then(() => {
                                this.deferred.resolve(e)
                            }).catch(e => {
                                this.eu(e)
                            }))
                        }).catch(e => {
                            this.eu(e)
                        })
                    })
                }
                Xa(e) {
                    try {
                        var t = this.updateFunction(e);
                        return !Pi(t) && t.catch && t.then ? t : (this.deferred.reject(Error("Transaction callback must return a Promise")), null)
                    } catch (e) {
                        return this.deferred.reject(e), null
                    }
                }
                eu(e) {
                    0 < this.Ja && this.tu(e) ? (--this.Ja, this.asyncQueue.enqueueAndForget(() => (this.Za(), Promise.resolve()))) : this.deferred.reject(e)
                }
                tu(e) {
                    if ("FirebaseError" !== e.name) return !1;
                    var t = e.code;
                    return "aborted" === t || "failed-precondition" === t || "already-exists" === t || !Oo(t)
                }
            }
            class gd {
                constructor(e, t, n, r) {
                    this.authCredentials = e, this.appCheckCredentials = t, this.asyncQueue = n, this.databaseInfo = r, this.user = Mr.UNAUTHENTICATED, this.clientId = ei.newId(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, async e => {
                        Fr("FirestoreClient", "Received user=", e.uid), await this.authCredentialListener(e), this.user = e
                    }), this.appCheckCredentials.start(n, e => (Fr("FirestoreClient", "Received new app check token=", e), this.appCheckCredentialListener(e, this.user)))
                }
                get configuration() {
                    return {
                        asyncQueue: this.asyncQueue,
                        databaseInfo: this.databaseInfo,
                        clientId: this.clientId,
                        authCredentials: this.authCredentials,
                        appCheckCredentials: this.appCheckCredentials,
                        initialUser: this.user,
                        maxConcurrentLimboResolutions: 100
                    }
                }
                setCredentialChangeListener(e) {
                    this.authCredentialListener = e
                }
                setAppCheckTokenChangeListener(e) {
                    this.appCheckCredentialListener = e
                }
                verifyNotTerminated() {
                    if (this.asyncQueue.isShuttingDown) throw new zr(Gr.FAILED_PRECONDITION, "The client has already been terminated.")
                }
                terminate() {
                    this.asyncQueue.enterRestrictedMode();
                    const n = new Kr;
                    return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
                        try {
                            this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), n.resolve()
                        } catch (e) {
                            var t = bl(e, "Failed to shutdown persistence");
                            n.reject(t)
                        }
                    }), n.promise
                }
            }
            async function md(e, t) {
                e.asyncQueue.verifyOperationInProgress(), Fr("FirestoreClient", "Initializing OfflineComponentProvider");
                var n = e.configuration;
                await t.initialize(n);
                let r = n.initialUser;
                e.setCredentialChangeListener(async e => {
                    r.isEqual(e) || (await ph(t.localStore, e), r = e)
                }), t.persistence.setDatabaseDeletedListener(() => e.terminate()), e._offlineComponents = t
            }
            async function pd(e, n) {
                e.asyncQueue.verifyOperationInProgress();
                var t = await vd(e);
                Fr("FirestoreClient", "Initializing OnlineComponentProvider"), await n.initialize(t, e.configuration), e.setCredentialChangeListener(e => pl(n.remoteStore, e)), e.setAppCheckTokenChangeListener((e, t) => pl(n.remoteStore, t)), e._onlineComponents = n
            }

            function yd(e) {
                return "FirebaseError" === e.name ? e.code === Gr.FAILED_PRECONDITION || e.code === Gr.UNIMPLEMENTED : !("undefined" != typeof DOMException && e instanceof DOMException) || 22 === e.code || 20 === e.code || 11 === e.code
            }
            async function vd(t) {
                if (!t._offlineComponents)
                    if (t._uninitializedComponentsProvider) {
                        Fr("FirestoreClient", "Using user provided OfflineComponentProvider");
                        try {
                            await md(t, t._uninitializedComponentsProvider._offline)
                        } catch (e) {
                            var n = e;
                            if (!yd(n)) throw n;
                            Br("Error using user provided cache. Falling back to memory cache: " + n), await md(t, new sd)
                        }
                    } else Fr("FirestoreClient", "Using default OfflineComponentProvider"), await md(t, new sd);
                return t._offlineComponents
            }
            async function wd(e) {
                return e._onlineComponents || (e._uninitializedComponentsProvider ? (Fr("FirestoreClient", "Using user provided OnlineComponentProvider"), await pd(e, e._uninitializedComponentsProvider._online)) : (Fr("FirestoreClient", "Using default OnlineComponentProvider"), await pd(e, new ud))), e._onlineComponents
            }

            function _d(e) {
                return vd(e).then(e => e.persistence)
            }

            function bd(e) {
                return vd(e).then(e => e.localStore)
            }

            function Id(e) {
                return wd(e).then(e => e.remoteStore)
            }

            function Ed(e) {
                return wd(e).then(e => e.syncEngine)
            }
            async function Td(e) {
                const t = await wd(e),
                    n = t.eventManager;
                return n.onListen = (async function(e, t, n = !0) {
                    const r = rd(e);
                    let i;
                    const s = r.wa.get(t);
                    return i = s ? (r.sharedClientState.addLocalQueryTarget(s.targetId), s.view.ga()) : await ql(r, t, n, !0), i
                }).bind(null, t.syncEngine), n.onUnlisten = (async function(e, t, n) {
                    const r = e,
                        i = r.wa.get(t),
                        s = r.Sa.get(i.targetId);
                    if (1 < s.length) return r.Sa.set(i.targetId, s.filter(e => !Va(e, t))), void r.wa.delete(t);
                    r.isPrimaryClient ? (r.sharedClientState.removeLocalQueryTarget(i.targetId), r.sharedClientState.isActiveQueryTarget(i.targetId) || await bh(r.localStore, i.targetId, !1).then(() => {
                        r.sharedClientState.clearQueryState(i.targetId), n && rl(r.remoteStore, i.targetId), Hl(r, i.targetId)
                    }).catch(Ii)) : (Hl(r, i.targetId), await bh(r.localStore, i.targetId, !0))
                }).bind(null, t.syncEngine), n.onFirstRemoteStoreListen = (async function(e, t) {
                    await ql(rd(e), t, !0, !1)
                }).bind(null, t.syncEngine), n.onLastRemoteStoreUnlisten = (async function(e, t) {
                    const n = e,
                        r = n.wa.get(t),
                        i = n.Sa.get(r.targetId);
                    n.isPrimaryClient && 1 === i.length && (n.sharedClientState.removeLocalQueryTarget(r.targetId), rl(n.remoteStore, r.targetId))
                }).bind(null, t.syncEngine), n
            }

            function Sd(e, t, n = {}) {
                const r = new Kr;
                return e.asyncQueue.enqueueAndForget(async () => function(n, r, i, s, a) {
                    const e = new hd({
                            next: e => {
                                r.enqueueAndForget(() => Dl(n, o));
                                var t = e.docs.has(i);
                                !t && e.fromCache ? a.reject(new zr(Gr.UNAVAILABLE, "Failed to get document because the client is offline.")) : t && e.fromCache && s && "server" === s.source ? a.reject(new zr(Gr.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : a.resolve(e)
                            },
                            error: e => a.reject(e)
                        }),
                        o = new Nl(ka(i.path), e, {
                            includeMetadataChanges: !0,
                            ta: !0
                        });
                    return Cl(n, o)
                }(await Td(e), e.asyncQueue, t, n, r)), r.promise
            }

            function xd(e, t, n = {}) {
                const r = new Kr;
                return e.asyncQueue.enqueueAndForget(async () => function(t, n, e, r, i) {
                    const s = new hd({
                            next: e => {
                                n.enqueueAndForget(() => Dl(t, a)), e.fromCache && "server" === r.source ? i.reject(new zr(Gr.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(e)
                            },
                            error: e => i.reject(e)
                        }),
                        a = new Nl(e, s, {
                            includeMetadataChanges: !0,
                            ta: !0
                        });
                    return Cl(t, a)
                }(await Td(e), e.asyncQueue, t, n, r)), r.promise
            }

            function Cd(e, t, n, r) {
                const i = (n = n, t = $h(t), s = "string" == typeof n ? Po().encode(n) : n, n = function(e, t) {
                    if (e instanceof Uint8Array) return cd(e, t);
                    if (e instanceof ArrayBuffer) return cd(new Uint8Array(e), t);
                    if (e instanceof ReadableStream) return e.getReader();
                    throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")
                }(s), t = t, new ld(n, t));
                var s;
                e.asyncQueue.enqueueAndForget(async () => {
                    ! function(e, t, n) {
                        const r = e;
                        !async function(t, n, r) {
                            try {
                                var i = await n.getMetadata();
                                if (await
                                    function(e, t) {
                                        const n = e,
                                            r = iu(t.createTime);
                                        return n.persistence.runTransaction("hasNewerBundle", "readonly", e => n.$r.getBundleMetadata(e, t.id)).then(e => !!e && 0 <= e.createTime.compareTo(r))
                                    }(t.localStore, i)) return await n.close(), r._completeWith({
                                    taskState: "Success",
                                    documentsLoaded: i.totalDocuments,
                                    bytesLoaded: i.totalBytes,
                                    totalDocuments: i.totalDocuments,
                                    totalBytes: i.totalBytes
                                }), Promise.resolve(new Set);
                                r._updateProgress(Ol(i));
                                const a = new Ml(i, t.localStore, n.serializer);
                                let e = await n.Ba();
                                for (; e;) {
                                    const t = await a.sa(e);
                                    t && r._updateProgress(t), e = await n.Ba()
                                }
                                var s = await a.complete();
                                return await Zl(t, s.aa, void 0), await
                                function(e, t) {
                                    const n = e;
                                    return n.persistence.runTransaction("Save bundle", "readwrite", e => n.$r.saveBundleMetadata(e, t))
                                }(t.localStore, i), r._completeWith(s.progress), Promise.resolve(s._a)
                            } catch (t) {
                                return Br("SyncEngine", `Loading bundle failed with ${t}`), r._failWith(t), Promise.resolve(new Set)
                            }
                        }(r, t, n).then(e => {
                            r.sharedClientState.notifyBundleLoaded(e)
                        })
                    }(await Ed(e), i, r)
                })
            }

            function Dd(e) {
                const t = {};
                return void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t
            }
            const Ad = new Map;

            function Nd(e, t, n) {
                if (!n) throw new zr(Gr.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`)
            }

            function kd(e, t, n, r) {
                if (!0 === t && !0 === r) throw new zr(Gr.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`)
            }

            function Rd(e) {
                if (!hi.isDocumentKey(e)) throw new zr(Gr.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)
            }

            function Md(e) {
                if (hi.isDocumentKey(e)) throw new zr(Gr.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)
            }

            function Od(e) {
                if (void 0 === e) return "undefined";
                if (null === e) return "null";
                if ("string" == typeof e) return 20 < e.length && (e = `${e.substring(0,20)}...`), JSON.stringify(e);
                if ("number" == typeof e || "boolean" == typeof e) return "" + e;
                if ("object" != typeof e) return "function" == typeof e ? "a function" : qr();
                if (e instanceof Array) return "an array";
                var t = (e = e).constructor ? e.constructor.name : null;
                return t ? `a custom ${t} object` : "an object"
            }

            function Ld(e, t) {
                if ((e = "_delegate" in e ? e._delegate : e) instanceof t) return e;
                if (t.name === e.constructor.name) throw new zr(Gr.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
                var n = Od(e);
                throw new zr(Gr.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`)
            }

            function Pd(e, t) {
                if (t <= 0) throw new zr(Gr.INVALID_ARGUMENT, `Function ${e}() requires a positive number, but it was: ${t}.`)
            }
            class Fd {
                constructor(e) {
                    var t;
                    if (void 0 === e.host) {
                        if (void 0 !== e.ssl) throw new zr(Gr.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
                        this.host = "firestore.googleapis.com", this.ssl = !0
                    } else this.host = e.host, this.ssl = null === (t = e.ssl) || void 0 === t || t;
                    if (this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, void 0 === e.cacheSizeBytes) this.cacheSizeBytes = 41943040;
                    else {
                        if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new zr(Gr.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
                        this.cacheSizeBytes = e.cacheSizeBytes
                    }
                    kd("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : void 0 === e.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = !0 : this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling, this.experimentalLongPollingOptions = Dd(null !== (t = e.experimentalLongPollingOptions) && void 0 !== t ? t : {}),
                        function(e) {
                            if (void 0 !== e.timeoutSeconds) {
                                if (isNaN(e.timeoutSeconds)) throw new zr(Gr.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);
                                if (e.timeoutSeconds < 5) throw new zr(Gr.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);
                                if (30 < e.timeoutSeconds) throw new zr(Gr.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)
                            }
                        }(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams
                }
                isEqual(e) {
                    return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && (t = this.experimentalLongPollingOptions, n = e.experimentalLongPollingOptions, t.timeoutSeconds === n.timeoutSeconds) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams;
                    var t, n
                }
            }
            class Vd {
                constructor(e, t, n, r) {
                    this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Fd({}), this._settingsFrozen = !1
                }
                get app() {
                    if (!this._app) throw new zr(Gr.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
                    return this._app
                }
                get _initialized() {
                    return this._settingsFrozen
                }
                get _terminated() {
                    return void 0 !== this._terminateTask
                }
                _setSettings(e) {
                    if (this._settingsFrozen) throw new zr(Gr.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
                    this._settings = new Fd(e), void 0 !== e.credentials && (this._authCredentials = function(e) {
                        if (!e) return new Qr;
                        switch (e.type) {
                            case "firstParty":
                                return new Jr(e.sessionIndex || "0", e.iamToken || null, e.authTokenFactory || null);
                            case "provider":
                                return e.client;
                            default:
                                throw new zr(Gr.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type")
                        }
                    }(e.credentials))
                }
                _getSettings() {
                    return this._settings
                }
                _freezeSettings() {
                    return this._settingsFrozen = !0, this._settings
                }
                _delete() {
                    return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask
                }
                toJSON() {
                    return {
                        app: this._app,
                        databaseId: this._databaseId,
                        settings: this._settings
                    }
                }
                _terminate() {
                    return function(e) {
                        const t = Ad.get(e);
                        t && (Fr("ComponentProvider", "Removing Datastore"), Ad.delete(e), t.terminate())
                    }(this), Promise.resolve()
                }
            }

            function Bd(n, e, t, r = {}) {
                var i;
                const s = (n = Ld(n, Vd))._getSettings(),
                    a = `${e}:${t}`;
                if ("firestore.googleapis.com" !== s.host && s.host !== a && Br("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."), n._setSettings(Object.assign(Object.assign({}, s), {
                        host: a,
                        ssl: !1
                    })), r.mockUserToken) {
                    let e, t;
                    if ("string" == typeof r.mockUserToken) e = r.mockUserToken, t = Mr.MOCK_USER;
                    else {
                        e = function(e, t) {
                            if (e.uid) throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
                            var n = t || "demo-project",
                                r = e.iat || 0,
                                i = e.sub || e.user_id;
                            if (!i) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
                            return i = Object.assign({
                                iss: `https://securetoken.google.com/${n}`,
                                aud: n,
                                iat: r,
                                exp: r + 3600,
                                auth_time: r,
                                sub: i,
                                user_id: i,
                                firebase: {
                                    sign_in_provider: "custom",
                                    identities: {}
                                }
                            }, e), [o(JSON.stringify({
                                alg: "none",
                                type: "JWT"
                            })), o(JSON.stringify(i)), ""].join(".")
                        }(r.mockUserToken, null === (i = n._app) || void 0 === i ? void 0 : i.options.projectId);
                        const s = r.mockUserToken.sub || r.mockUserToken.user_id;
                        if (!s) throw new zr(Gr.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
                        t = new Mr(s)
                    }
                    n._authCredentials = new Wr(new $r(e, t))
                }
            }
            class Ud {
                constructor(e, t, n) {
                    this.converter = t, this._query = n, this.type = "query", this.firestore = e
                }
                withConverter(e) {
                    return new Ud(this.firestore, e, this._query)
                }
            }
            class qd {
                constructor(e, t, n) {
                    this.converter = t, this._key = n, this.type = "document", this.firestore = e
                }
                get _path() {
                    return this._key.path
                }
                get id() {
                    return this._key.path.lastSegment()
                }
                get path() {
                    return this._key.path.canonicalString()
                }
                get parent() {
                    return new jd(this.firestore, this.converter, this._key.path.popLast())
                }
                withConverter(e) {
                    return new qd(this.firestore, e, this._key)
                }
            }
            class jd extends Ud {
                constructor(e, t, n) {
                    super(e, t, ka(n)), this._path = n, this.type = "collection"
                }
                get id() {
                    return this._query.path.lastSegment()
                }
                get path() {
                    return this._query.path.canonicalString()
                }
                get parent() {
                    const e = this._path.popLast();
                    return e.isEmpty() ? null : new qd(this.firestore, null, new hi(e))
                }
                withConverter(e) {
                    return new jd(this.firestore, e, this._path)
                }
            }

            function Gd(e, t, ...n) {
                if (e = y(e), Nd("collection", "path", t), e instanceof Vd) {
                    var r = oi.fromString(t, ...n);
                    return Md(r), new jd(e, null, r)
                }
                if (!(e instanceof qd || e instanceof jd)) throw new zr(Gr.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
                r = e._path.child(oi.fromString(t, ...n));
                return Md(r), new jd(e.firestore, null, r)
            }

            function zd(e, t, ...n) {
                if (e = y(e), Nd("doc", "path", t = 1 === arguments.length ? ei.newId() : t), e instanceof Vd) {
                    var r = oi.fromString(t, ...n);
                    return Rd(r), new qd(e, null, new hi(r))
                }
                if (!(e instanceof qd || e instanceof jd)) throw new zr(Gr.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
                r = e._path.child(oi.fromString(t, ...n));
                return Rd(r), new qd(e.firestore, e instanceof jd ? e.converter : null, new hi(r))
            }

            function Kd(e, t) {
                return e = y(e), t = y(t), (e instanceof qd || e instanceof jd) && (t instanceof qd || t instanceof jd) && e.firestore === t.firestore && e.path === t.path && e.converter === t.converter
            }

            function $d(e, t) {
                return e = y(e), t = y(t), e instanceof Ud && t instanceof Ud && e.firestore === t.firestore && Va(e._query, t._query) && e.converter === t.converter
            }
            class Qd {
                constructor() {
                    this.nu = Promise.resolve(), this.ru = [], this.iu = !1, this.su = [], this.ou = null, this._u = !1, this.au = !1, this.uu = [], this.jo = new Qh(this, "async_queue_retry"), this.cu = () => {
                        var e = Kh();
                        e && Fr("AsyncQueue", "Visibility state changed to " + e.visibilityState), this.jo.Ko()
                    };
                    const e = Kh();
                    e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.cu)
                }
                get isShuttingDown() {
                    return this.iu
                }
                enqueueAndForget(e) {
                    this.enqueue(e)
                }
                enqueueAndForgetEvenWhileRestricted(e) {
                    this.lu(), this.hu(e)
                }
                enterRestrictedMode(e) {
                    if (!this.iu) {
                        this.iu = !0, this.au = e || !1;
                        const t = Kh();
                        t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.cu)
                    }
                }
                enqueue(e) {
                    if (this.lu(), this.iu) return new Promise(() => {});
                    const t = new Kr;
                    return this.hu(() => this.iu && this.au ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise)).then(() => t.promise)
                }
                enqueueRetryable(e) {
                    this.enqueueAndForget(() => (this.ru.push(e), this.Pu()))
                }
                async Pu() {
                    if (0 !== this.ru.length) {
                        try {
                            await this.ru[0](), this.ru.shift(), this.jo.reset()
                        } catch (e) {
                            if (!Di(e)) throw e;
                            Fr("AsyncQueue", "Operation failed with retryable error: " + e)
                        }
                        0 < this.ru.length && this.jo.qo(() => this.Pu())
                    }
                }
                hu(e) {
                    var t = this.nu.then(() => (this._u = !0, e().catch(e => {
                        throw this.ou = e, this._u = !1, Vr("INTERNAL UNHANDLED ERROR: ", function(e) {
                            let t = e.message || "";
                            return e.stack && (t = e.stack.includes(e.message) ? e.stack : e.message + "\n" + e.stack), t
                        }(e)), e
                    }).then(e => (this._u = !1, e))));
                    return this.nu = t
                }
                enqueueAfterDelay(e, t, n) {
                    this.lu(), -1 < this.uu.indexOf(e) && (t = 0);
                    var r = _l.createAndSchedule(this, e, t, n, e => this.Iu(e));
                    return this.su.push(r), r
                }
                lu() {
                    this.ou && qr()
                }
                verifyOperationInProgress() {}
                async Tu() {
                    for (var e; await (e = this.nu), e !== this.nu;);
                }
                Eu(e) {
                    for (const t of this.su)
                        if (t.timerId === e) return !0;
                    return !1
                }
                du(t) {
                    return this.Tu().then(() => {
                        this.su.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
                        for (const e of this.su)
                            if (e.skipDelay(), "all" !== t && e.timerId === t) break;
                        return this.Tu()
                    })
                }
                Au(e) {
                    this.uu.push(e)
                }
                Iu(e) {
                    var t = this.su.indexOf(e);
                    this.su.splice(t, 1)
                }
            }

            function Wd(e) {
                return function(e, t) {
                    if ("object" == typeof e && null !== e) {
                        var n = e;
                        for (const e of t)
                            if (e in n && "function" == typeof n[e]) return 1
                    }
                }(e, ["next", "error", "complete"])
            }
            class Hd {
                constructor() {
                    this._progressObserver = {}, this._taskCompletionResolver = new Kr, this._lastProgress = {
                        taskState: "Running",
                        totalBytes: 0,
                        totalDocuments: 0,
                        bytesLoaded: 0,
                        documentsLoaded: 0
                    }
                }
                onProgress(e, t, n) {
                    this._progressObserver = {
                        next: e,
                        error: t,
                        complete: n
                    }
                } catch (e) {
                    return this._taskCompletionResolver.promise.catch(e)
                }
                then(e, t) {
                    return this._taskCompletionResolver.promise.then(e, t)
                }
                _completeWith(e) {
                    this._updateProgress(e), this._progressObserver.complete && this._progressObserver.complete(), this._taskCompletionResolver.resolve(e)
                }
                _failWith(e) {
                    this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), this._progressObserver.error && this._progressObserver.error(e), this._taskCompletionResolver.reject(e)
                }
                _updateProgress(e) {
                    this._lastProgress = e, this._progressObserver.next && this._progressObserver.next(e)
                }
            }
            var Yd, Jd, Xd, Zd, ef;
            class tf extends Vd {
                constructor(e, t, n, r) {
                    super(e, t, n, r), this.type = "firestore", this._queue = new Qd, this._persistenceKey = (null == r ? void 0 : r.name) || "[DEFAULT]"
                }
                _terminate() {
                    return this._firestoreClient || rf(this), this._firestoreClient.terminate()
                }
            }

            function nf(e) {
                return e._firestoreClient || rf(e), e._firestoreClient.verifyNotTerminated(), e._firestoreClient
            }

            function rf(e) {
                var t, n, r, i, s, a = e._freezeSettings(),
                    o = (n = e._databaseId, r = (null === (o = e._app) || void 0 === o ? void 0 : o.options.appId) || "", i = e._persistenceKey, s = a, new Rs(n, r, i, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling, Dd(s.experimentalLongPollingOptions), s.useFetchStreams));
                e._firestoreClient = new gd(e._authCredentials, e._appCheckCredentials, e._queue, o), null !== (o = a.localCache) && void 0 !== o && o._offlineComponentProvider && null !== (t = a.localCache) && void 0 !== t && t._onlineComponentProvider && (e._firestoreClient._uninitializedComponentsProvider = {
                    _offlineKind: a.localCache.kind,
                    _offline: a.localCache._offlineComponentProvider,
                    _online: a.localCache._onlineComponentProvider
                })
            }

            function sf(e, t, n) {
                const r = new Kr;
                return e.asyncQueue.enqueue(async () => {
                    try {
                        await md(e, n), await pd(e, t), r.resolve()
                    } catch (e) {
                        const t = e;
                        if (!yd(t)) throw t;
                        Br("Error enabling indexeddb cache. Falling back to memory cache: " + t), r.reject(t)
                    }
                }).then(() => r.promise)
            }

            function af(e) {
                return function(e) {
                    const t = new Kr;
                    return e.asyncQueue.enqueueAndForget(async () => async function(e, t) {
                        const n = e;
                        ul(n.remoteStore) || Fr("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
                        try {
                            const e = await
                            function(e) {
                                const t = e;
                                return t.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", e => t.mutationQueue.getHighestUnacknowledgedBatchId(e))
                            }(n.localStore);
                            if (-1 === e) return void t.resolve();
                            const r = n.Ma.get(e) || [];
                            r.push(t), n.Ma.set(e, r)
                        } catch (e) {
                            const n = bl(e, "Initialization of waitForPendingWrites() operation failed");
                            t.reject(n)
                        }
                    }(await Ed(e), t)), t.promise
                }(nf(e = Ld(e, tf)))
            }

            function of (e) {
                return (n = nf(e = Ld(e, tf))).asyncQueue.enqueue(async () => {
                    const e = await _d(n),
                        t = await Id(n);
                    return e.setNetworkEnabled(!0),
                        function(e) {
                            const t = e;
                            return t.v_.delete(0), el(t)
                        }(t)
                });
                var n
            }

            function uf(e) {
                return (n = nf(e = Ld(e, tf))).asyncQueue.enqueue(async () => {
                    const e = await _d(n),
                        t = await Id(n);
                    return e.setNetworkEnabled(!1), async function(e) {
                        const t = e;
                        t.v_.add(0), await tl(t), t.x_.set("Offline")
                    }(t)
                });
                var n
            }

            function cf(t, e) {
                return n = nf(t = Ld(t, tf)), r = e, n.asyncQueue.enqueue(async () => function(e, t) {
                    const n = e;
                    return n.persistence.runTransaction("Get named query", "readonly", e => n.$r.getNamedQuery(e, t))
                }(await bd(n), r)).then(e => e ? new Ud(t, null, e.query) : null);
                var n, r
            }

            function hf(e) {
                if (e._initialized || e._terminated) throw new zr(Gr.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")
            }
            class lf {
                constructor(e) {
                    this._byteString = e
                }
                static fromBase64String(e) {
                    try {
                        return new lf(Ts.fromBase64String(e))
                    } catch (e) {
                        throw new zr(Gr.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e)
                    }
                }
                static fromUint8Array(e) {
                    return new lf(Ts.fromUint8Array(e))
                }
                toBase64() {
                    return this._byteString.toBase64()
                }
                toUint8Array() {
                    return this._byteString.toUint8Array()
                }
                toString() {
                    return "Bytes(base64: " + this.toBase64() + ")"
                }
                isEqual(e) {
                    return this._byteString.isEqual(e._byteString)
                }
            }
            class df {
                constructor(...e) {
                    for (let t = 0; t < e.length; ++t)
                        if (0 === e[t].length) throw new zr(Gr.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
                    this._internalPath = new ci(e)
                }
                isEqual(e) {
                    return this._internalPath.isEqual(e._internalPath)
                }
            }
            class ff {
                constructor(e) {
                    this._methodName = e
                }
            }
            class gf {
                constructor(e, t) {
                    if (!isFinite(e) || e < -90 || 90 < e) throw new zr(Gr.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
                    if (!isFinite(t) || t < -180 || 180 < t) throw new zr(Gr.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
                    this._lat = e, this._long = t
                }
                get latitude() {
                    return this._lat
                }
                get longitude() {
                    return this._long
                }
                isEqual(e) {
                    return this._lat === e._lat && this._long === e._long
                }
                toJSON() {
                    return {
                        latitude: this._lat,
                        longitude: this._long
                    }
                }
                _compareTo(e) {
                    return ti(this._lat, e._lat) || ti(this._long, e._long)
                }
            }
            const mf = /^__.*__$/;
            class pf {
                constructor(e, t, n) {
                    this.data = e, this.fieldMask = t, this.fieldTransforms = n
                }
                toMutation(e, t) {
                    return null !== this.fieldMask ? new To(e, this.data, this.fieldMask, t, this.fieldTransforms) : new Eo(e, this.data, t, this.fieldTransforms)
                }
            }
            class yf {
                constructor(e, t, n) {
                    this.data = e, this.fieldMask = t, this.fieldTransforms = n
                }
                toMutation(e, t) {
                    return new To(e, this.data, this.fieldMask, t, this.fieldTransforms)
                }
            }

            function vf(e) {
                switch (e) {
                    case 0:
                    case 2:
                    case 1:
                        return 1;
                    case 3:
                    case 4:
                        return;
                    default:
                        throw qr()
                }
            }
            class wf {
                constructor(e, t, n, r, i, s) {
                    this.settings = e, this.databaseId = t, this.serializer = n, this.ignoreUndefinedProperties = r, void 0 === i && this.Ru(), this.fieldTransforms = i || [], this.fieldMask = s || []
                }
                get path() {
                    return this.settings.path
                }
                get Vu() {
                    return this.settings.Vu
                }
                mu(e) {
                    return new wf(Object.assign(Object.assign({}, this.settings), e), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask)
                }
                fu(e) {
                    var t;
                    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
                        r = this.mu({
                            path: n,
                            gu: !1
                        });
                    return r.pu(e), r
                }
                yu(e) {
                    var t;
                    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
                        r = this.mu({
                            path: n,
                            gu: !1
                        });
                    return r.Ru(), r
                }
                wu(e) {
                    return this.mu({
                        path: void 0,
                        gu: !0
                    })
                }
                Su(e) {
                    return Bf(e, this.settings.methodName, this.settings.bu || !1, this.path, this.settings.Du)
                }
                contains(t) {
                    return void 0 !== this.fieldMask.find(e => t.isPrefixOf(e)) || void 0 !== this.fieldTransforms.find(e => t.isPrefixOf(e.field))
                }
                Ru() {
                    if (this.path)
                        for (let e = 0; e < this.path.length; e++) this.pu(this.path.get(e))
                }
                pu(e) {
                    if (0 === e.length) throw this.Su("Document fields must not be empty");
                    if (vf(this.Vu) && mf.test(e)) throw this.Su('Document fields cannot begin and end with "__"')
                }
            }
            class _f {
                constructor(e, t, n) {
                    this.databaseId = e, this.ignoreUndefinedProperties = t, this.serializer = n || $h(e)
                }
                Cu(e, t, n, r = !1) {
                    return new wf({
                        Vu: e,
                        methodName: t,
                        Du: n,
                        path: ci.emptyPath(),
                        gu: !1,
                        bu: r
                    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties)
                }
            }

            function bf(e) {
                var t = e._freezeSettings(),
                    n = $h(e._databaseId);
                return new _f(e._databaseId, !!t.ignoreUndefinedProperties, n)
            }

            function If(e, t, n, r, i, s = {}) {
                const a = e.Cu(s.merge || s.mergeFields ? 2 : 0, t, n, i);
                Lf("Data must be an object, but it was:", a, r);
                var o = Mf(r, a);
                let u, c;
                if (s.merge) u = new Is(a.fieldMask), c = a.fieldTransforms;
                else if (s.mergeFields) {
                    const e = [];
                    for (const r of s.mergeFields) {
                        const i = Pf(t, r, n);
                        if (!a.contains(i)) throw new zr(Gr.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
                        Uf(e, i) || e.push(i)
                    }
                    u = new Is(e), c = a.fieldTransforms.filter(e => u.covers(e.field))
                } else u = null, c = a.fieldTransforms;
                return new pf(new Xs(o), u, c)
            }
            class Ef extends ff {
                _toFieldTransform(e) {
                    if (2 !== e.Vu) throw 1 === e.Vu ? e.Su(`${this._methodName}() can only appear at the top level of your update data`) : e.Su(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
                    return e.fieldMask.push(e.path), null
                }
                isEqual(e) {
                    return e instanceof Ef
                }
            }

            function Tf(e, t, n) {
                return new wf({
                    Vu: 3,
                    Du: t.settings.Du,
                    methodName: e._methodName,
                    gu: n
                }, t.databaseId, t.serializer, t.ignoreUndefinedProperties)
            }
            class Sf extends ff {
                _toFieldTransform(e) {
                    return new go(e.path, new so)
                }
                isEqual(e) {
                    return e instanceof Sf
                }
            }
            class xf extends ff {
                constructor(e, t) {
                    super(e), this.vu = t
                }
                _toFieldTransform(e) {
                    const t = Tf(this, e, !0),
                        n = this.vu.map(e => Rf(e, t)),
                        r = new ao(n);
                    return new go(e.path, r)
                }
                isEqual(e) {
                    return e instanceof xf && m(this.vu, e.vu)
                }
            }
            class Cf extends ff {
                constructor(e, t) {
                    super(e), this.vu = t
                }
                _toFieldTransform(e) {
                    const t = Tf(this, e, !0),
                        n = this.vu.map(e => Rf(e, t)),
                        r = new uo(n);
                    return new go(e.path, r)
                }
                isEqual(e) {
                    return e instanceof Cf && m(this.vu, e.vu)
                }
            }
            class Df extends ff {
                constructor(e, t) {
                    super(e), this.Fu = t
                }
                _toFieldTransform(e) {
                    var t = new ho(e.serializer, no(e.serializer, this.Fu));
                    return new go(e.path, t)
                }
                isEqual(e) {
                    return e instanceof Df && this.Fu === e.Fu
                }
            }

            function Af(e, i, s, t) {
                const a = e.Cu(1, i, s);
                Lf("Data must be an object, but it was:", a, t);
                const o = [],
                    u = Xs.empty();
                gs(t, (e, t) => {
                    var n = Vf(i, e, s);
                    t = y(t);
                    var r = a.yu(n);
                    if (t instanceof Ef) o.push(n);
                    else {
                        const e = Rf(t, r);
                        null != e && (o.push(n), u.set(n, e))
                    }
                });
                var n = new Is(o);
                return new yf(u, n, a.fieldTransforms)
            }

            function Nf(e, t, n, r, i, s) {
                const a = e.Cu(1, t, n),
                    o = [Pf(t, r, n)],
                    u = [i];
                if (s.length % 2 != 0) throw new zr(Gr.INVALID_ARGUMENT, `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);
                for (let f = 0; f < s.length; f += 2) o.push(Pf(t, s[f])), u.push(s[f + 1]);
                const c = [],
                    h = Xs.empty();
                for (let g = o.length - 1; 0 <= g; --g)
                    if (!Uf(c, o[g])) {
                        const t = o[g];
                        var l = y(l = u[g]);
                        const r = a.yu(t);
                        if (l instanceof Ef) c.push(t);
                        else {
                            const e = Rf(l, r);
                            null != e && (c.push(t), h.set(t, e))
                        }
                    }
                var d = new Is(c);
                return new yf(h, d, a.fieldTransforms)
            }

            function kf(e, t, n, r = !1) {
                return Rf(n, e.Cu(r ? 4 : 3, t))
            }

            function Rf(e, t) {
                if (Of(e = y(e))) return Lf("Unsupported field value:", t, e), Mf(e, t);
                if (e instanceof ff) return function(e, t) {
                    if (!vf(t.Vu)) throw t.Su(`${e._methodName}() can only be used with update() and set()`);
                    if (!t.path) throw t.Su(`${e._methodName}() is not currently supported inside arrays`);
                    var n = e._toFieldTransform(t);
                    n && t.fieldTransforms.push(n)
                }(e, t), null;
                if (void 0 === e && t.ignoreUndefinedProperties) return null;
                if (t.path && t.fieldMask.push(t.path), e instanceof Array) {
                    if (t.settings.gu && 4 !== t.Vu) throw t.Su("Nested arrays are not supported");
                    return function(e, t) {
                        const n = [];
                        let r = 0;
                        for (const i of e) {
                            let e = Rf(i, t.wu(r));
                            null == e && (e = {
                                nullValue: "NULL_VALUE"
                            }), n.push(e), r++
                        }
                        return {
                            arrayValue: {
                                values: n
                            }
                        }
                    }(e, t)
                }
                return function(e, t) {
                    if (null === (e = y(e))) return {
                        nullValue: "NULL_VALUE"
                    };
                    if ("number" == typeof e) return no(t.serializer, e);
                    if ("boolean" == typeof e) return {
                        booleanValue: e
                    };
                    if ("string" == typeof e) return {
                        stringValue: e
                    };
                    if (e instanceof Date) {
                        var n = ii.fromDate(e);
                        return {
                            timestampValue: nu(t.serializer, n)
                        }
                    }
                    if (e instanceof ii) {
                        n = new ii(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
                        return {
                            timestampValue: nu(t.serializer, n)
                        }
                    }
                    if (e instanceof gf) return {
                        geoPointValue: {
                            latitude: e.latitude,
                            longitude: e.longitude
                        }
                    };
                    if (e instanceof lf) return {
                        bytesValue: ru(t.serializer, e._byteString)
                    };
                    if (e instanceof qd) {
                        const r = t.databaseId,
                            i = e.firestore._databaseId;
                        if (!i.isEqual(r)) throw t.Su(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${r.projectId}/${r.database}`);
                        return {
                            referenceValue: su(e.firestore._databaseId || t.databaseId, e._key.path)
                        }
                    }
                    throw t.Su(`Unsupported field value: ${Od(e)}`)
                }(e, t)
            }

            function Mf(e, r) {
                const i = {};
                return ms(e) ? r.path && 0 < r.path.length && r.fieldMask.push(r.path) : gs(e, (e, t) => {
                    var n = Rf(t, r.fu(e));
                    null != n && (i[e] = n)
                }), {
                    mapValue: {
                        fields: i
                    }
                }
            }

            function Of(e) {
                return !("object" != typeof e || null === e || e instanceof Array || e instanceof Date || e instanceof ii || e instanceof gf || e instanceof lf || e instanceof qd || e instanceof ff)
            }

            function Lf(e, t, n) {
                if (!Of(n) || ("object" != typeof(i = n) || null === i || Object.getPrototypeOf(i) !== Object.prototype && null !== Object.getPrototypeOf(i))) {
                    var r = Od(n);
                    throw "an object" === r ? t.Su(e + " a custom object") : t.Su(e + " " + r)
                }
                var i
            }

            function Pf(e, t, n) {
                if ((t = y(t)) instanceof df) return t._internalPath;
                if ("string" == typeof t) return Vf(e, t);
                throw Bf("Field path arguments must be of type string or ", e, !1, void 0, n)
            }
            const Ff = new RegExp("[~\\*/\\[\\]]");

            function Vf(t, n, r) {
                if (0 <= n.search(Ff)) throw Bf(`Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`, t, !1, void 0, r);
                try {
                    return new df(...n.split("."))._internalPath
                } catch (e) {
                    throw Bf(`Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, !1, void 0, r)
                }
            }

            function Bf(e, t, n, r, i) {
                var s = r && !r.isEmpty(),
                    a = void 0 !== i;
                let o = `Function ${t}() called with invalid data`;
                n && (o += " (via `toFirestore()`)"), o += ". ";
                let u = "";
                return (s || a) && (u += " (found", s && (u += ` in field ${r}`), a && (u += ` in document ${i}`), u += ")"), new zr(Gr.INVALID_ARGUMENT, o + e + u)
            }

            function Uf(e, t) {
                return e.some(e => e.isEqual(t))
            }
            class qf {
                constructor(e, t, n, r, i) {
                    this._firestore = e, this._userDataWriter = t, this._key = n, this._document = r, this._converter = i
                }
                get id() {
                    return this._key.path.lastSegment()
                }
                get ref() {
                    return new qd(this._firestore, this._converter, this._key)
                }
                exists() {
                    return null !== this._document
                }
                data() {
                    if (this._document) {
                        if (this._converter) {
                            var e = new jf(this._firestore, this._userDataWriter, this._key, this._document, null);
                            return this._converter.fromFirestore(e)
                        }
                        return this._userDataWriter.convertValue(this._document.data.value)
                    }
                }
                get(e) {
                    if (this._document) {
                        var t = this._document.data.field(Gf("DocumentSnapshot.get", e));
                        if (null !== t) return this._userDataWriter.convertValue(t)
                    }
                }
            }
            class jf extends qf {
                data() {
                    return super.data()
                }
            }

            function Gf(e, t) {
                return "string" == typeof t ? Vf(e, t) : (t instanceof df ? t : t._delegate)._internalPath
            }

            function zf(e) {
                if ("L" === e.limitType && 0 === e.explicitOrderBy.length) throw new zr(Gr.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause")
            }
            class Kf {}
            class $f extends Kf {}

            function Qf(e, t, ...n) {
                let r = [];
                t instanceof Kf && r.push(t), r = r.concat(n),
                    function(e) {
                        var t = e.filter(e => e instanceof Hf).length,
                            n = e.filter(e => e instanceof Wf).length;
                        if (1 < t || 0 < t && 0 < n) throw new zr(Gr.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")
                    }(r);
                for (const t of r) e = t._apply(e);
                return e
            }
            class Wf extends $f {
                constructor(e, t, n) {
                    super(), this._field = e, this._op = t, this._value = n, this.type = "where"
                }
                static _create(e, t, n) {
                    return new Wf(e, t, n)
                }
                _apply(e) {
                    var t = this._parse(e);
                    return rg(e._query, t), new Ud(e.firestore, e.converter, Pa(e._query, t))
                }
                _parse(e) {
                    var t = bf(e.firestore);
                    return function(e, t, n, r, i, s, a) {
                        let o;
                        if (i.isKeyField()) {
                            if ("array-contains" === s || "array-contains-any" === s) throw new zr(Gr.INVALID_ARGUMENT, `Invalid Query. You can't perform '${s}' queries on documentId().`);
                            if ("in" === s || "not-in" === s) {
                                ng(a, s);
                                const t = [];
                                for (const n of a) t.push(tg(r, e, n));
                                o = {
                                    arrayValue: {
                                        values: t
                                    }
                                }
                            } else o = tg(r, e, a)
                        } else "in" !== s && "not-in" !== s && "array-contains-any" !== s || ng(a, s), o = kf(n, t, a, "in" === s || "not-in" === s);
                        return sa.create(i, s, o)
                    }(e._query, "where", t, e.firestore._databaseId, this._field, this._op, this._value)
                }
            }
            class Hf extends Kf {
                constructor(e, t) {
                    super(), this.type = e, this._queryConstraints = t
                }
                static _create(e, t) {
                    return new Hf(e, t)
                }
                _parse(t) {
                    var e = this._queryConstraints.map(e => e._parse(t)).filter(e => 0 < e.getFilters().length);
                    return 1 === e.length ? e[0] : aa.create(e, this._getOperator())
                }
                _apply(e) {
                    const t = this._parse(e);
                    return 0 === t.getFilters().length ? e : (function(e, t) {
                        let n = e;
                        for (const e of t.getFlattenedFilters()) rg(n, e), n = Pa(n, e)
                    }(e._query, t), new Ud(e.firestore, e.converter, Pa(e._query, t)))
                }
                _getQueryConstraints() {
                    return this._queryConstraints
                }
                _getOperator() {
                    return "and" === this.type ? "and" : "or"
                }
            }
            class Yf extends $f {
                constructor(e, t) {
                    super(), this._field = e, this._direction = t, this.type = "orderBy"
                }
                static _create(e, t) {
                    return new Yf(e, t)
                }
                _apply(e) {
                    var t = function(e, t, n) {
                        if (null !== e.startAt) throw new zr(Gr.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
                        if (null !== e.endAt) throw new zr(Gr.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
                        return new ra(t, n)
                    }(e._query, this._field, this._direction);
                    return new Ud(e.firestore, e.converter, (e = e._query, t = e.explicitOrderBy.concat([t]), new Aa(e.path, e.collectionGroup, t, e.filters.slice(), e.limit, e.limitType, e.startAt, e.endAt)))
                }
            }
            class Jf extends $f {
                constructor(e, t, n) {
                    super(), this.type = e, this._limit = t, this._limitType = n
                }
                static _create(e, t, n) {
                    return new Jf(e, t, n)
                }
                _apply(e) {
                    return new Ud(e.firestore, e.converter, Fa(e._query, this._limit, this._limitType))
                }
            }
            class Xf extends $f {
                constructor(e, t, n) {
                    super(), this.type = e, this._docOrFields = t, this._inclusive = n
                }
                static _create(e, t, n) {
                    return new Xf(e, t, n)
                }
                _apply(e) {
                    var t, n = eg(e, this.type, this._docOrFields, this._inclusive);
                    return new Ud(e.firestore, e.converter, (t = e._query, e = n, new Aa(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt)))
                }
            }
            class Zf extends $f {
                constructor(e, t, n) {
                    super(), this.type = e, this._docOrFields = t, this._inclusive = n
                }
                static _create(e, t, n) {
                    return new Zf(e, t, n)
                }
                _apply(e) {
                    var t, n = eg(e, this.type, this._docOrFields, this._inclusive);
                    return new Ud(e.firestore, e.converter, (t = e._query, e = n, new Aa(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e)))
                }
            }

            function eg(e, t, n, r) {
                if (n[0] = y(n[0]), n[0] instanceof qf) return function(e, t, n, r, i) {
                    if (!r) throw new zr(Gr.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${n}().`);
                    const s = [];
                    for (const n of Oa(e))
                        if (n.field.isKeyField()) s.push(js(t, r.key));
                        else {
                            const e = r.data.field(n.field);
                            if (As(e)) throw new zr(Gr.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                            if (null === e) {
                                const e = n.field.canonicalString();
                                throw new zr(Gr.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)
                            }
                            s.push(e)
                        }
                    return new ea(s, i)
                }(e._query, e.firestore._databaseId, t, n[0]._document, r);
                var i = bf(e.firestore);
                return function(e, t, n, r, i, s) {
                    const a = e.explicitOrderBy;
                    if (i.length > a.length) throw new zr(Gr.INVALID_ARGUMENT, `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                    const o = [];
                    for (let u = 0; u < i.length; u++) {
                        const c = i[u];
                        if (a[u].field.isKeyField()) {
                            if ("string" != typeof c) throw new zr(Gr.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);
                            if (!Ma(e) && -1 !== c.indexOf("/")) throw new zr(Gr.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);
                            const n = e.path.child(oi.fromString(c));
                            if (!hi.isDocumentKey(n)) throw new zr(Gr.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                            const i = new hi(n);
                            o.push(js(t, i))
                        } else {
                            const e = kf(n, r, c);
                            o.push(e)
                        }
                    }
                    return new ea(o, s)
                }(e._query, e.firestore._databaseId, i, t, n, r)
            }

            function tg(e, t, n) {
                if ("string" == typeof(n = y(n))) {
                    if ("" === n) throw new zr(Gr.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
                    if (!Ma(t) && -1 !== n.indexOf("/")) throw new zr(Gr.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
                    var r = t.path.child(oi.fromString(n));
                    if (!hi.isDocumentKey(r)) throw new zr(Gr.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
                    return js(e, new hi(r))
                }
                if (n instanceof qd) return js(e, n._key);
                throw new zr(Gr.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Od(n)}.`)
            }

            function ng(e, t) {
                if (!Array.isArray(e) || 0 === e.length) throw new zr(Gr.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)
            }

            function rg(e, t) {
                const n = function(e, t) {
                    for (const n of e)
                        for (const e of n.getFlattenedFilters())
                            if (0 <= t.indexOf(e.op)) return e.op;
                    return null
                }(e.filters, function(e) {
                    switch (e) {
                        case "!=":
                            return ["!=", "not-in"];
                        case "array-contains-any":
                        case "in":
                            return ["not-in"];
                        case "not-in":
                            return ["array-contains-any", "in", "not-in", "!="];
                        default:
                            return []
                    }
                }(t.op));
                if (null !== n) throw n === t.op ? new zr(Gr.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`) : new zr(Gr.INVALID_ARGUMENT, `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)
            }
            class ig {
                convertValue(e, t = "none") {
                    switch (Ps(e)) {
                        case 0:
                            return null;
                        case 1:
                            return e.booleanValue;
                        case 2:
                            return Cs(e.integerValue || e.doubleValue);
                        case 3:
                            return this.convertTimestamp(e.timestampValue);
                        case 4:
                            return this.convertServerTimestamp(e, t);
                        case 5:
                            return e.stringValue;
                        case 6:
                            return this.convertBytes(Ds(e.bytesValue));
                        case 7:
                            return this.convertReference(e.referenceValue);
                        case 8:
                            return this.convertGeoPoint(e.geoPointValue);
                        case 9:
                            return this.convertArray(e.arrayValue, t);
                        case 10:
                            return this.convertObject(e.mapValue, t);
                        default:
                            throw qr()
                    }
                }
                convertObject(e, t) {
                    return this.convertObjectMap(e.fields, t)
                }
                convertObjectMap(e, n = "none") {
                    const r = {};
                    return gs(e, (e, t) => {
                        r[e] = this.convertValue(t, n)
                    }), r
                }
                convertGeoPoint(e) {
                    return new gf(Cs(e.latitude), Cs(e.longitude))
                }
                convertArray(e, t) {
                    return (e.values || []).map(e => this.convertValue(e, t))
                }
                convertServerTimestamp(e, t) {
                    switch (t) {
                        case "previous":
                            var n = Ns(e);
                            return null == n ? null : this.convertValue(n, t);
                        case "estimate":
                            return this.convertTimestamp(ks(e));
                        default:
                            return null
                    }
                }
                convertTimestamp(e) {
                    var t = xs(e);
                    return new ii(t.seconds, t.nanos)
                }
                convertDocumentKey(e, t) {
                    const n = oi.fromString(e);
                    jr(Su(n));
                    const r = new Ms(n.get(1), n.get(3)),
                        i = new hi(n.popFirst(5));
                    return r.isEqual(t) || Vr(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`), i
                }
            }

            function sg(e, t, n) {
                return e ? n && (n.merge || n.mergeFields) ? e.toFirestore(t, n) : e.toFirestore(t) : t
            }
            class ag extends ig {
                constructor(e) {
                    super(), this.firestore = e
                }
                convertBytes(e) {
                    return new lf(e)
                }
                convertReference(e) {
                    var t = this.convertDocumentKey(e, this.firestore._databaseId);
                    return new qd(this.firestore, null, t)
                }
            }
            class og {
                constructor(e, t) {
                    this.hasPendingWrites = e, this.fromCache = t
                }
                isEqual(e) {
                    return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache
                }
            }
            class ug extends qf {
                constructor(e, t, n, r, i, s) {
                    super(e, t, n, r, s), this._firestore = e, this._firestoreImpl = e, this.metadata = i
                }
                exists() {
                    return super.exists()
                }
                data(e = {}) {
                    if (this._document) {
                        if (this._converter) {
                            var t = new cg(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
                            return this._converter.fromFirestore(t, e)
                        }
                        return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps)
                    }
                }
                get(e, t = {}) {
                    if (this._document) {
                        var n = this._document.data.field(Gf("DocumentSnapshot.get", e));
                        if (null !== n) return this._userDataWriter.convertValue(n, t.serverTimestamps)
                    }
                }
            }
            class cg extends ug {
                data(e = {}) {
                    return super.data(e)
                }
            }
            class hg {
                constructor(e, t, n, r) {
                    this._firestore = e, this._userDataWriter = t, this._snapshot = r, this.metadata = new og(r.hasPendingWrites, r.fromCache), this.query = n
                }
                get docs() {
                    const t = [];
                    return this.forEach(e => t.push(e)), t
                }
                get size() {
                    return this._snapshot.docs.size
                }
                get empty() {
                    return 0 === this.size
                }
                forEach(t, n) {
                    this._snapshot.docs.forEach(e => {
                        t.call(n, new cg(this._firestore, this._userDataWriter, e.key, e, new og(this._snapshot.mutatedKeys.has(e.key), this._snapshot.fromCache), this.query.converter))
                    })
                }
                docChanges(e = {}) {
                    var t = !!e.includeMetadataChanges;
                    if (t && this._snapshot.excludesMetadataChanges) throw new zr(Gr.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
                    return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t || (this._cachedChanges = function(s, t) {
                        if (s._snapshot.oldDocs.isEmpty()) {
                            let n = 0;
                            return s._snapshot.docChanges.map(e => {
                                var t = new cg(s._firestore, s._userDataWriter, e.doc.key, e.doc, new og(s._snapshot.mutatedKeys.has(e.doc.key), s._snapshot.fromCache), s.query.converter);
                                return e.doc, {
                                    type: "added",
                                    doc: t,
                                    oldIndex: -1,
                                    newIndex: n++
                                }
                            })
                        } {
                            let i = s._snapshot.oldDocs;
                            return s._snapshot.docChanges.filter(e => t || 3 !== e.type).map(e => {
                                var t = new cg(s._firestore, s._userDataWriter, e.doc.key, e.doc, new og(s._snapshot.mutatedKeys.has(e.doc.key), s._snapshot.fromCache), s.query.converter);
                                let n = -1,
                                    r = -1;
                                return 0 !== e.type && (n = i.indexOf(e.doc.key), i = i.delete(e.doc.key)), 1 !== e.type && (i = i.add(e.doc), r = i.indexOf(e.doc.key)), {
                                    type: function(e) {
                                        switch (e) {
                                            case 0:
                                                return "added";
                                            case 2:
                                            case 3:
                                                return "modified";
                                            case 1:
                                                return "removed";
                                            default:
                                                return qr()
                                        }
                                    }(e.type),
                                    doc: t,
                                    oldIndex: n,
                                    newIndex: r
                                }
                            })
                        }
                    }(this, t), this._cachedChangesIncludeMetadataChanges = t), this._cachedChanges
                }
            }

            function lg(e, t) {
                return e instanceof ug && t instanceof ug ? e._firestore === t._firestore && e._key.isEqual(t._key) && (null === e._document ? null === t._document : e._document.isEqual(t._document)) && e._converter === t._converter : e instanceof hg && t instanceof hg && e._firestore === t._firestore && $d(e.query, t.query) && e.metadata.isEqual(t.metadata) && e._snapshot.isEqual(t._snapshot)
            }
            class dg extends ig {
                constructor(e) {
                    super(), this.firestore = e
                }
                convertBytes(e) {
                    return new lf(e)
                }
                convertReference(e) {
                    var t = this.convertDocumentKey(e, this.firestore._databaseId);
                    return new qd(this.firestore, null, t)
                }
            }

            function fg(t) {
                t = Ld(t, qd);
                const n = Ld(t.firestore, tf),
                    e = nf(n),
                    r = new dg(n);
                return function(e, t) {
                    const n = new Kr;
                    return e.asyncQueue.enqueueAndForget(async () => async function(e, t, n) {
                        try {
                            const i = await
                            function(e, t) {
                                const n = e;
                                return n.persistence.runTransaction("read document", "readonly", e => n.localDocuments.getDocument(e, t))
                            }(e, t);
                            i.isFoundDocument() ? n.resolve(i) : i.isNoDocument() ? n.resolve(null) : n.reject(new zr(Gr.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))
                        } catch (e) {
                            var r = bl(e, `Failed to get document '${t} from cache`);
                            n.reject(r)
                        }
                    }(await bd(e), t, n)), n.promise
                }(e, t._key).then(e => new ug(n, r, t._key, e, new og(null !== e && e.hasLocalMutations, !0), t.converter))
            }

            function gg(t) {
                t = Ld(t, Ud);
                const n = Ld(t.firestore, tf),
                    e = nf(n),
                    r = new dg(n);
                return function(e, t) {
                    const n = new Kr;
                    return e.asyncQueue.enqueueAndForget(async () => async function(e, t, n) {
                        try {
                            const i = await Ih(e, t, !0),
                                s = new Fl(t, i.hs),
                                a = s.Ta(i.documents),
                                o = s.applyChanges(a, !1);
                            n.resolve(o.snapshot)
                        } catch (e) {
                            var r = bl(e, `Failed to execute query '${t} against cache`);
                            n.reject(r)
                        }
                    }(await bd(e), t, n)), n.promise
                }(e, t._query).then(e => new hg(n, r, t, e))
            }

            function mg(e, t, n) {
                e = Ld(e, qd);
                var r = Ld(e.firestore, tf),
                    i = sg(e.converter, t, n);
                return wg(r, [If(bf(r), "setDoc", e._key, i, null !== e.converter, n).toMutation(e._key, po.none())])
            }

            function pg(e, t, n, ...r) {
                e = Ld(e, qd);
                var i = Ld(e.firestore, tf),
                    s = bf(i);
                let a;
                return a = "string" == typeof(t = y(t)) || t instanceof df ? Nf(s, "updateDoc", e._key, t, n, r) : Af(s, "updateDoc", e._key, t), wg(i, [a.toMutation(e._key, po.exists(!0))])
            }

            function yg(t, ...n) {
                var e;
                t = y(t);
                let r = {
                        includeMetadataChanges: !1,
                        source: "default"
                    },
                    i = 0;
                "object" != typeof n[i] || Wd(n[i]) || (r = n[i], i++);
                var s = {
                    includeMetadataChanges: r.includeMetadataChanges,
                    source: r.source
                };
                if (Wd(n[i])) {
                    const t = n[i];
                    n[i] = null === (e = t.next) || void 0 === e ? void 0 : e.bind(t), n[i + 1] = null === (e = t.error) || void 0 === e ? void 0 : e.bind(t), n[i + 2] = null === (e = t.complete) || void 0 === e ? void 0 : e.bind(t)
                }
                let a, o, u;
                if (t instanceof qd) o = Ld(t.firestore, tf), u = ka(t._key.path), a = {
                    next: e => {
                        n[i] && n[i](_g(o, t, e))
                    },
                    error: n[i + 1],
                    complete: n[i + 2]
                };
                else {
                    const c = Ld(t, Ud);
                    o = Ld(c.firestore, tf), u = c._query;
                    const h = new dg(o);
                    a = {
                        next: e => {
                            n[i] && n[i](new hg(o, h, c, e))
                        },
                        error: n[i + 1],
                        complete: n[i + 2]
                    }, zf(t._query)
                }
                return function(e, t, n, r) {
                    const i = new hd(r),
                        s = new Nl(t, i, n);
                    return e.asyncQueue.enqueueAndForget(async () => Cl(await Td(e), s)), () => {
                        i.Qa(), e.asyncQueue.enqueueAndForget(async () => Dl(await Td(e), s))
                    }
                }(nf(o), u, s, a)
            }

            function vg(e, t) {
                return function(e, t) {
                    const n = new hd(t);
                    return e.asyncQueue.enqueueAndForget(async () => function(e, t) {
                        e.W_.add(t), t.next()
                    }(await Td(e), n)), () => {
                        n.Qa(), e.asyncQueue.enqueueAndForget(async () => function(e, t) {
                            e.W_.delete(t)
                        }(await Td(e), n))
                    }
                }(nf(e = Ld(e, tf)), Wd(t) ? t : {
                    next: t
                })
            }

            function wg(e, t) {
                return function(e, t) {
                    const n = new Kr;
                    return e.asyncQueue.enqueueAndForget(async () => Gl(await Ed(e), t, n)), n.promise
                }(nf(e), t)
            }

            function _g(e, t, n) {
                var r = n.docs.get(t._key),
                    i = new dg(e);
                return new ug(e, i, t._key, r, new og(n.hasPendingWrites, n.fromCache), t.converter)
            }
            const bg = {
                maxAttempts: 5
            };
            class Ig {
                constructor(e, t) {
                    this._firestore = e, this._commitHandler = t, this._mutations = [], this._committed = !1, this._dataReader = bf(e)
                }
                set(e, t, n) {
                    this._verifyNotCommitted();
                    const r = Eg(e, this._firestore),
                        i = sg(r.converter, t, n),
                        s = If(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
                    return this._mutations.push(s.toMutation(r._key, po.none())), this
                }
                update(e, t, n, ...r) {
                    this._verifyNotCommitted();
                    var i = Eg(e, this._firestore);
                    let s;
                    return s = "string" == typeof(t = y(t)) || t instanceof df ? Nf(this._dataReader, "WriteBatch.update", i._key, t, n, r) : Af(this._dataReader, "WriteBatch.update", i._key, t), this._mutations.push(s.toMutation(i._key, po.exists(!0))), this
                }
                delete(e) {
                    this._verifyNotCommitted();
                    var t = Eg(e, this._firestore);
                    return this._mutations = this._mutations.concat(new Do(t._key, po.none())), this
                }
                commit() {
                    return this._verifyNotCommitted(), this._committed = !0, 0 < this._mutations.length ? this._commitHandler(this._mutations) : Promise.resolve()
                }
                _verifyNotCommitted() {
                    if (this._committed) throw new zr(Gr.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.")
                }
            }

            function Eg(e, t) {
                if ((e = y(e)).firestore !== t) throw new zr(Gr.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
                return e
            }
            class Tg extends class {
                constructor(e, t) {
                    this._firestore = e, this._transaction = t, this._dataReader = bf(e)
                }
                get(e) {
                    const n = Eg(e, this._firestore),
                        r = new ag(this._firestore);
                    return this._transaction.lookup([n._key]).then(e => {
                        if (!e || 1 !== e.length) return qr();
                        const t = e[0];
                        if (t.isFoundDocument()) return new qf(this._firestore, r, t.key, t, n.converter);
                        if (t.isNoDocument()) return new qf(this._firestore, r, n._key, null, n.converter);
                        throw qr()
                    })
                }
                set(e, t, n) {
                    var r = Eg(e, this._firestore),
                        i = sg(r.converter, t, n),
                        i = If(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
                    return this._transaction.set(r._key, i), this
                }
                update(e, t, n, ...r) {
                    var i = Eg(e, this._firestore),
                        s = "string" == typeof(t = y(t)) || t instanceof df ? Nf(this._dataReader, "Transaction.update", i._key, t, n, r) : Af(this._dataReader, "Transaction.update", i._key, t);
                    return this._transaction.update(i._key, s), this
                }
                delete(e) {
                    var t = Eg(e, this._firestore);
                    return this._transaction.delete(t._key), this
                }
            } {
                constructor(e, t) {
                    super(e, t), this._firestore = e
                }
                get(e) {
                    const t = Eg(e, this._firestore),
                        n = new dg(this._firestore);
                    return super.get(e).then(e => new ug(this._firestore, n, t._key, e._document, new og(!1, !1), t.converter))
                }
            }

            function Sg(t, n, e) {
                t = Ld(t, tf);
                var r = Object.assign(Object.assign({}, bg), e);
                return function(e) {
                        if (e.maxAttempts < 1) throw new zr(Gr.INVALID_ARGUMENT, "Max attempts must be at least 1")
                    }(r),
                    function(t, n, r) {
                        const i = new Kr;
                        return t.asyncQueue.enqueueAndForget(async () => {
                            var e = await wd(t).then(e => e.datastore);
                            new fd(t.asyncQueue, e, r, n, i).Ya()
                        }), i.promise
                    }(nf(t), e => n(new Tg(t, e)), r)
            }
            Jd = !0, Xd = Xg.SDK_VERSION, Or = Xd, Xg._registerComponent(new v("firestore", (e, {
                instanceIdentifier: t,
                options: n
            }) => {
                const r = e.getProvider("app").getImmediate(),
                    i = new tf(new Hr(e.getProvider("auth-internal")), new Zr(e.getProvider("app-check-internal")), function(e, t) {
                        if (!Object.prototype.hasOwnProperty.apply(e.options, ["projectId"])) throw new zr(Gr.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
                        return new Ms(e.options.projectId, t)
                    }(r, t), r);
                return n = Object.assign({
                    useFetchStreams: Jd
                }, n), i._setSettings(n), i
            }, "PUBLIC").setMultipleInstances(!0)), Xg.registerVersion(Rr, "4.5.0", Yd), Xg.registerVersion(Rr, "4.5.0", "esm2017");

            function xg(e, t) {
                if (void 0 === t) return {
                    merge: !1
                };
                if (void 0 !== t.mergeFields && void 0 !== t.merge) throw new zr("invalid-argument", `Invalid options passed to function ${e}(): You cannot ` + 'specify both "merge" and "mergeFields".');
                return t
            }

            function Cg() {
                if ("undefined" == typeof Uint8Array) throw new zr("unimplemented", "Uint8Arrays are not available in this environment.")
            }

            function Dg() {
                if ("undefined" == typeof atob) throw new zr("unimplemented", "Blobs are unavailable in Firestore in this environment.")
            }
            class Ag {
                constructor(e) {
                    this._delegate = e
                }
                static fromBase64String(e) {
                    return Dg(), new Ag(lf.fromBase64String(e))
                }
                static fromUint8Array(e) {
                    return Cg(), new Ag(lf.fromUint8Array(e))
                }
                toBase64() {
                    return Dg(), this._delegate.toBase64()
                }
                toUint8Array() {
                    return Cg(), this._delegate.toUint8Array()
                }
                isEqual(e) {
                    return this._delegate.isEqual(e._delegate)
                }
                toString() {
                    return "Blob(base64: " + this.toBase64() + ")"
                }
            }

            function Ng(e) {
                return function(e, t) {
                    if ("object" != typeof e || null === e) return;
                    var n = e;
                    for (const r of t)
                        if (r in n && "function" == typeof n[r]) return 1;
                    return
                }(e, ["next", "error", "complete"])
            }
            class kg {
                enableIndexedDbPersistence(e, t) {
                    return function(e, t) {
                        hf(e = Ld(e, tf));
                        var n = nf(e);
                        if (n._uninitializedComponentsProvider) throw new zr(Gr.FAILED_PRECONDITION, "SDK cache is already specified.");
                        Br("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
                        var r = e._freezeSettings(),
                            i = new ud;
                        return sf(n, i, new ad(i, r.cacheSizeBytes, null == t ? void 0 : t.forceOwnership))
                    }(e._delegate, {
                        forceOwnership: t
                    })
                }
                enableMultiTabIndexedDbPersistence(e) {
                    return function(e) {
                        hf(e = Ld(e, tf));
                        var t = nf(e);
                        if (t._uninitializedComponentsProvider) throw new zr(Gr.FAILED_PRECONDITION, "SDK cache is already specified.");
                        Br("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
                        var n = e._freezeSettings(),
                            r = new ud;
                        return sf(t, r, new od(r, n.cacheSizeBytes))
                    }(e._delegate)
                }
                clearIndexedDbPersistence(e) {
                    return function(e) {
                        if (e._initialized && !e._terminated) throw new zr(Gr.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
                        const t = new Kr;
                        return e._queue.enqueueAndForgetEvenWhileRestricted(async () => {
                            try {
                                await async function(e) {
                                    if (!Si.D()) return Promise.resolve();
                                    var t = e + "main";
                                    await Si.delete(t)
                                }(hh(e._databaseId, e._persistenceKey)), t.resolve()
                            } catch (e) {
                                t.reject(e)
                            }
                        }), t.promise
                    }(e._delegate)
                }
            }
            class Rg {
                constructor(e, t, n) {
                    this._delegate = t, this._persistenceProvider = n, this.INTERNAL = {
                        delete: () => this.terminate()
                    }, e instanceof Ms || (this._appCompat = e)
                }
                get _databaseId() {
                    return this._delegate._databaseId
                }
                settings(e) {
                    var t = this._delegate._getSettings();
                    e.merge || t.host === e.host || Br("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."), e.merge && delete(e = Object.assign(Object.assign({}, t), e)).merge, this._delegate._setSettings(e)
                }
                useEmulator(e, t, n = {}) {
                    Bd(this._delegate, e, t, n)
                }
                enableNetwork() {
                    return of(this._delegate)
                }
                disableNetwork() {
                    return uf(this._delegate)
                }
                enablePersistence(e) {
                    let t = !1,
                        n = !1;
                    return e && (t = !!e.synchronizeTabs, n = !!e.experimentalForceOwningTab, kd("synchronizeTabs", t, "experimentalForceOwningTab", n)), t ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(this) : this._persistenceProvider.enableIndexedDbPersistence(this, n)
                }
                clearPersistence() {
                    return this._persistenceProvider.clearIndexedDbPersistence(this)
                }
                terminate() {
                    return this._appCompat && (this._appCompat._removeServiceInstance("firestore-compat"), this._appCompat._removeServiceInstance("firestore")), this._delegate._delete()
                }
                waitForPendingWrites() {
                    return af(this._delegate)
                }
                onSnapshotsInSync(e) {
                    return vg(this._delegate, e)
                }
                get app() {
                    if (!this._appCompat) throw new zr("failed-precondition", "Firestore was not initialized using the Firebase SDK. 'app' is not available");
                    return this._appCompat
                }
                collection(e) {
                    try {
                        return new $g(this, Gd(this._delegate, e))
                    } catch (e) {
                        throw Vg(e, "collection()", "Firestore.collection()")
                    }
                }
                doc(e) {
                    try {
                        return new Fg(this, zd(this._delegate, e))
                    } catch (e) {
                        throw Vg(e, "doc()", "Firestore.doc()")
                    }
                }
                collectionGroup(e) {
                    try {
                        return new Gg(this, function(e, t) {
                            if (e = Ld(e, Vd), Nd("collectionGroup", "collection id", t), 0 <= t.indexOf("/")) throw new zr(Gr.INVALID_ARGUMENT, `Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
                            return new Ud(e, null, (t = t, new Aa(oi.emptyPath(), t)))
                        }(this._delegate, e))
                    } catch (e) {
                        throw Vg(e, "collectionGroup()", "Firestore.collectionGroup()")
                    }
                }
                runTransaction(t) {
                    return Sg(this._delegate, e => t(new Og(this, e)))
                }
                batch() {
                    return nf(this._delegate), new Lg(new Ig(this._delegate, e => wg(this._delegate, e)))
                }
                loadBundle(e) {
                    return t = this._delegate, e = e, n = nf(t = Ld(t, tf)), r = new Hd, Cd(n, t._databaseId, e, r), r;
                    var t, n, r
                }
                namedQuery(e) {
                    return cf(this._delegate, e).then(e => e ? new Gg(this, e) : null)
                }
            }
            class Mg extends ig {
                constructor(e) {
                    super(), this.firestore = e
                }
                convertBytes(e) {
                    return new Ag(new lf(e))
                }
                convertReference(e) {
                    var t = this.convertDocumentKey(e, this.firestore._databaseId);
                    return Fg.forKey(t, this.firestore, null)
                }
            }
            class Og {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t, this._userDataWriter = new Mg(e)
                }
                get(e) {
                    const t = Qg(e);
                    return this._delegate.get(t).then(e => new qg(this._firestore, new ug(this._firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, t.converter)))
                }
                set(e, t, n) {
                    var r = Qg(e);
                    return n ? (xg("Transaction.set", n), this._delegate.set(r, t, n)) : this._delegate.set(r, t), this
                }
                update(e, t, n, ...r) {
                    var i = Qg(e);
                    return 2 === arguments.length ? this._delegate.update(i, t) : this._delegate.update(i, t, n, ...r), this
                }
                delete(e) {
                    var t = Qg(e);
                    return this._delegate.delete(t), this
                }
            }
            class Lg {
                constructor(e) {
                    this._delegate = e
                }
                set(e, t, n) {
                    var r = Qg(e);
                    return n ? (xg("WriteBatch.set", n), this._delegate.set(r, t, n)) : this._delegate.set(r, t), this
                }
                update(e, t, n, ...r) {
                    var i = Qg(e);
                    return 2 === arguments.length ? this._delegate.update(i, t) : this._delegate.update(i, t, n, ...r), this
                }
                delete(e) {
                    var t = Qg(e);
                    return this._delegate.delete(t), this
                }
                commit() {
                    return this._delegate.commit()
                }
            }
            class Pg {
                constructor(e, t, n) {
                    this._firestore = e, this._userDataWriter = t, this._delegate = n
                }
                fromFirestore(e, t) {
                    var n = new cg(this._firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, null);
                    return this._delegate.fromFirestore(new jg(this._firestore, n), null != t ? t : {})
                }
                toFirestore(e, t) {
                    return t ? this._delegate.toFirestore(e, t) : this._delegate.toFirestore(e)
                }
                static getInstance(e, t) {
                    const n = Pg.INSTANCES;
                    let r = n.get(e);
                    r || (r = new WeakMap, n.set(e, r));
                    let i = r.get(t);
                    return i || (i = new Pg(e, new Mg(e), t), r.set(t, i)), i
                }
            }
            Pg.INSTANCES = new WeakMap;
            class Fg {
                constructor(e, t) {
                    this.firestore = e, this._delegate = t, this._userDataWriter = new Mg(e)
                }
                static forPath(e, t, n) {
                    if (e.length % 2 != 0) throw new zr("invalid-argument", "Invalid document reference. Document references must have an even number of segments, but " + `${e.canonicalString()} has ${e.length}`);
                    return new Fg(t, new qd(t._delegate, n, new hi(e)))
                }
                static forKey(e, t, n) {
                    return new Fg(t, new qd(t._delegate, n, e))
                }
                get id() {
                    return this._delegate.id
                }
                get parent() {
                    return new $g(this.firestore, this._delegate.parent)
                }
                get path() {
                    return this._delegate.path
                }
                collection(e) {
                    try {
                        return new $g(this.firestore, Gd(this._delegate, e))
                    } catch (e) {
                        throw Vg(e, "collection()", "DocumentReference.collection()")
                    }
                }
                isEqual(e) {
                    return (e = y(e)) instanceof qd && Kd(this._delegate, e)
                }
                set(e, t) {
                    t = xg("DocumentReference.set", t);
                    try {
                        return t ? mg(this._delegate, e, t) : mg(this._delegate, e)
                    } catch (e) {
                        throw Vg(e, "setDoc()", "DocumentReference.set()")
                    }
                }
                update(e, t, ...n) {
                    try {
                        return 1 === arguments.length ? pg(this._delegate, e) : pg(this._delegate, e, t, ...n)
                    } catch (e) {
                        throw Vg(e, "updateDoc()", "DocumentReference.update()")
                    }
                }
                delete() {
                    return wg(Ld((e = this._delegate).firestore, tf), [new Do(e._key, po.none())]);
                    var e
                }
                onSnapshot(...e) {
                    var t = Bg(e),
                        n = Ug(e, e => new qg(this.firestore, new ug(this.firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, this._delegate.converter)));
                    return yg(this._delegate, t, n)
                }
                get(e) {
                    let t;
                    return t = ("cache" === (null == e ? void 0 : e.source) ? fg : "server" === (null == e ? void 0 : e.source) ? function(t) {
                        t = Ld(t, qd);
                        const n = Ld(t.firestore, tf);
                        return Sd(nf(n), t._key, {
                            source: "server"
                        }).then(e => _g(n, t, e))
                    } : function(t) {
                        t = Ld(t, qd);
                        const n = Ld(t.firestore, tf);
                        return Sd(nf(n), t._key).then(e => _g(n, t, e))
                    })(this._delegate), t.then(e => new qg(this.firestore, new ug(this.firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, this._delegate.converter)))
                }
                withConverter(e) {
                    return new Fg(this.firestore, e ? this._delegate.withConverter(Pg.getInstance(this.firestore, e)) : this._delegate.withConverter(null))
                }
            }

            function Vg(e, t, n) {
                return e.message = e.message.replace(t, n), e
            }

            function Bg(e) {
                for (const t of e)
                    if ("object" == typeof t && !Ng(t)) return t;
                return {}
            }

            function Ug(e, t) {
                var n;
                let r;
                return r = Ng(e[0]) ? e[0] : Ng(e[1]) ? e[1] : "function" == typeof e[0] ? {
                    next: e[0],
                    error: e[1],
                    complete: e[2]
                } : {
                    next: e[1],
                    error: e[2],
                    complete: e[3]
                }, {
                    next: e => {
                        r.next && r.next(t(e))
                    },
                    error: null === (n = r.error) || void 0 === n ? void 0 : n.bind(r),
                    complete: null === (n = r.complete) || void 0 === n ? void 0 : n.bind(r)
                }
            }
            class qg {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t
                }
                get ref() {
                    return new Fg(this._firestore, this._delegate.ref)
                }
                get id() {
                    return this._delegate.id
                }
                get metadata() {
                    return this._delegate.metadata
                }
                get exists() {
                    return this._delegate.exists()
                }
                data(e) {
                    return this._delegate.data(e)
                }
                get(e, t) {
                    return this._delegate.get(e, t)
                }
                isEqual(e) {
                    return lg(this._delegate, e._delegate)
                }
            }
            class jg extends qg {
                data(e) {
                    var t = this._delegate.data(e);
                    return this._delegate._converter || void 0 !== t || qr(), t
                }
            }
            class Gg {
                constructor(e, t) {
                    this.firestore = e, this._delegate = t, this._userDataWriter = new Mg(e)
                }
                where(e, t, n) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, (r = n, i = t, s = Gf("where", e), Wf._create(s, i, r))))
                    } catch (e) {
                        throw Vg(e, /(orderBy|where)\(\)/, "Query.$1()")
                    }
                    var r, i, s
                }
                orderBy(e, t) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, ([n, r = "asc"] = [e, t], i = r, s = Gf("orderBy", n), Yf._create(s, i))))
                    } catch (e) {
                        throw Vg(e, /(orderBy|where)\(\)/, "Query.$1()")
                    }
                    var n, r, i, s
                }
                limit(e) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, (Pd("limit", t = e), Jf._create("limit", t, "F"))))
                    } catch (e) {
                        throw Vg(e, "limit()", "Query.limit()")
                    }
                    var t
                }
                limitToLast(e) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, (Pd("limitToLast", t = e), Jf._create("limitToLast", t, "L"))))
                    } catch (e) {
                        throw Vg(e, "limitToLast()", "Query.limitToLast()")
                    }
                    var t
                }
                startAt(...e) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, function(...e) {
                            return Xf._create("startAt", e, !0)
                        }(...e)))
                    } catch (e) {
                        throw Vg(e, "startAt()", "Query.startAt()")
                    }
                }
                startAfter(...e) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, function(...e) {
                            return Xf._create("startAfter", e, !1)
                        }(...e)))
                    } catch (e) {
                        throw Vg(e, "startAfter()", "Query.startAfter()")
                    }
                }
                endBefore(...e) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, function(...e) {
                            return Zf._create("endBefore", e, !1)
                        }(...e)))
                    } catch (e) {
                        throw Vg(e, "endBefore()", "Query.endBefore()")
                    }
                }
                endAt(...e) {
                    try {
                        return new Gg(this.firestore, Qf(this._delegate, function(...e) {
                            return Zf._create("endAt", e, !0)
                        }(...e)))
                    } catch (e) {
                        throw Vg(e, "endAt()", "Query.endAt()")
                    }
                }
                isEqual(e) {
                    return $d(this._delegate, e._delegate)
                }
                get(e) {
                    let t;
                    return t = ("cache" === (null == e ? void 0 : e.source) ? gg : "server" === (null == e ? void 0 : e.source) ? function(t) {
                        t = Ld(t, Ud);
                        const n = Ld(t.firestore, tf),
                            e = nf(n),
                            r = new dg(n);
                        return xd(e, t._query, {
                            source: "server"
                        }).then(e => new hg(n, r, t, e))
                    } : function(t) {
                        t = Ld(t, Ud);
                        const n = Ld(t.firestore, tf),
                            e = nf(n),
                            r = new dg(n);
                        return zf(t._query), xd(e, t._query).then(e => new hg(n, r, t, e))
                    })(this._delegate), t.then(e => new Kg(this.firestore, new hg(this.firestore._delegate, this._userDataWriter, this._delegate, e._snapshot)))
                }
                onSnapshot(...e) {
                    var t = Bg(e),
                        n = Ug(e, e => new Kg(this.firestore, new hg(this.firestore._delegate, this._userDataWriter, this._delegate, e._snapshot)));
                    return yg(this._delegate, t, n)
                }
                withConverter(e) {
                    return new Gg(this.firestore, e ? this._delegate.withConverter(Pg.getInstance(this.firestore, e)) : this._delegate.withConverter(null))
                }
            }
            class zg {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t
                }
                get type() {
                    return this._delegate.type
                }
                get doc() {
                    return new jg(this._firestore, this._delegate.doc)
                }
                get oldIndex() {
                    return this._delegate.oldIndex
                }
                get newIndex() {
                    return this._delegate.newIndex
                }
            }
            class Kg {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t
                }
                get query() {
                    return new Gg(this._firestore, this._delegate.query)
                }
                get metadata() {
                    return this._delegate.metadata
                }
                get size() {
                    return this._delegate.size
                }
                get empty() {
                    return this._delegate.empty
                }
                get docs() {
                    return this._delegate.docs.map(e => new jg(this._firestore, e))
                }
                docChanges(e) {
                    return this._delegate.docChanges(e).map(e => new zg(this._firestore, e))
                }
                forEach(t, n) {
                    this._delegate.forEach(e => {
                        t.call(n, new jg(this._firestore, e))
                    })
                }
                isEqual(e) {
                    return lg(this._delegate, e._delegate)
                }
            }
            class $g extends Gg {
                constructor(e, t) {
                    super(e, t), this.firestore = e, this._delegate = t
                }
                get id() {
                    return this._delegate.id
                }
                get path() {
                    return this._delegate.path
                }
                get parent() {
                    var e = this._delegate.parent;
                    return e ? new Fg(this.firestore, e) : null
                }
                doc(e) {
                    try {
                        return void 0 === e ? new Fg(this.firestore, zd(this._delegate)) : new Fg(this.firestore, zd(this._delegate, e))
                    } catch (e) {
                        throw Vg(e, "doc()", "CollectionReference.doc()")
                    }
                }
                add(e) {
                    return function(e, t) {
                        const n = Ld(e.firestore, tf),
                            r = zd(e),
                            i = sg(e.converter, t);
                        return wg(n, [If(bf(e.firestore), "addDoc", r._key, i, null !== e.converter, {}).toMutation(r._key, po.exists(!1))]).then(() => r)
                    }(this._delegate, e).then(e => new Fg(this.firestore, e))
                }
                isEqual(e) {
                    return Kd(this._delegate, e._delegate)
                }
                withConverter(e) {
                    return new $g(this.firestore, e ? this._delegate.withConverter(Pg.getInstance(this.firestore, e)) : this._delegate.withConverter(null))
                }
            }

            function Qg(e) {
                return Ld(e, qd)
            }
            const Wg = {
                Firestore: Rg,
                GeoPoint: gf,
                Timestamp: ii,
                Blob: Ag,
                Transaction: Og,
                WriteBatch: Lg,
                DocumentReference: Fg,
                DocumentSnapshot: qg,
                Query: Gg,
                QueryDocumentSnapshot: jg,
                QuerySnapshot: Kg,
                CollectionReference: $g,
                FieldPath: class Hg {
                    constructor(...e) {
                        this._delegate = new df(...e)
                    }
                    static documentId() {
                        return new Hg(ci.keyField().canonicalString())
                    }
                    isEqual(e) {
                        return (e = y(e)) instanceof df && this._delegate._internalPath.isEqual(e._internalPath)
                    }
                },
                FieldValue: class Yg {
                    constructor(e) {
                        this._delegate = e
                    }
                    static serverTimestamp() {
                        const e = new Sf("serverTimestamp");
                        return e._methodName = "FieldValue.serverTimestamp", new Yg(e)
                    }
                    static delete() {
                        const e = new Ef("deleteField");
                        return e._methodName = "FieldValue.delete", new Yg(e)
                    }
                    static arrayUnion(...e) {
                        const t = function(...e) {
                            return new xf("arrayUnion", e)
                        }(...e);
                        return t._methodName = "FieldValue.arrayUnion", new Yg(t)
                    }
                    static arrayRemove(...e) {
                        const t = function(...e) {
                            return new Cf("arrayRemove", e)
                        }(...e);
                        return t._methodName = "FieldValue.arrayRemove", new Yg(t)
                    }
                    static increment(e) {
                        const t = new Df("increment", e);
                        return t._methodName = "FieldValue.increment", new Yg(t)
                    }
                    isEqual(e) {
                        return this._delegate.isEqual(e._delegate)
                    }
                },
                setLogLevel: function(e) {
                    e = e, Lr.setLogLevel(e)
                },
                CACHE_SIZE_UNLIMITED: -1
            };
            Zd = t.default, ef = (e, t) => new Rg(e, t, new kg), Zd.INTERNAL.registerComponent(new v("firestore-compat", e => {
                var t = e.getProvider("app-compat").getImmediate(),
                    n = e.getProvider("firestore").getImmediate();
                return ef(t, n)
            }, "PUBLIC").setServiceProps(Object.assign({}, Wg))), Zd.registerVersion("@firebase/firestore-compat", "0.3.27")
        }).apply(this, arguments)
    } catch (e) {
        throw console.error(e), new Error("Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first.")
    }
});
//# sourceMappingURL=firebase-firestore-compat.js.map