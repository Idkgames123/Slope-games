! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(require("@firebase/app-compat"), require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app-compat", "@firebase/app"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).firebase, e.firebase.INTERNAL.modularAPIs)
}(this, function(Si, Ri) {
    "use strict";
    try {
        !(function() {
            function e(e) {
                return e && "object" == typeof e && "default" in e ? e : {
                    default: e
                }
            }
            var i = e(Si);
            const t = {
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
                    for (let d = 0; d < n.length; d += 3) {
                        var s = n[d],
                            a = d + 1 < n.length,
                            o = a ? n[d + 1] : 0,
                            c = d + 2 < n.length,
                            l = c ? n[d + 2] : 0;
                        let e = (15 & o) << 2 | l >> 6,
                            t = 63 & l;
                        c || (t = 64, a || (e = 64)), i.push(r[s >> 2], r[(3 & s) << 4 | o >> 4], r[e], r[t])
                    }
                    return i.join("")
                },
                encodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(function(t) {
                        const n = [];
                        let r = 0;
                        for (let i = 0; i < t.length; i++) {
                            let e = t.charCodeAt(i);
                            e < 128 ? n[r++] = e : (e < 2048 ? n[r++] = e >> 6 | 192 : (55296 == (64512 & e) && i + 1 < t.length && 56320 == (64512 & t.charCodeAt(i + 1)) ? (e = 65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++i)), n[r++] = e >> 18 | 240, n[r++] = e >> 12 & 63 | 128) : n[r++] = e >> 12 | 224, n[r++] = e >> 6 & 63 | 128), n[r++] = 63 & e | 128)
                        }
                        return n
                    }(e), t)
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
                    for (let c = 0; c < e.length;) {
                        var i = n[e.charAt(c++)],
                            s = c < e.length ? n[e.charAt(c)] : 0;
                        ++c;
                        var a = c < e.length ? n[e.charAt(c)] : 64;
                        ++c;
                        var o = c < e.length ? n[e.charAt(c)] : 64;
                        if (++c, null == i || null == s || null == a || null == o) throw new l;
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
            class l extends Error {
                constructor() {
                    super(...arguments), this.name = "DecodeBase64StringError"
                }
            }
            const s = function(e) {
                try {
                    return t.decodeString(e, !0)
                } catch (e) {
                    console.error("base64Decode failed: ", e)
                }
                return null
            };
            const n = () => function() {
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw new Error("Unable to locate global object.")
                }().__FIREBASE_DEFAULTS__,
                r = () => {
                    if ("undefined" != typeof process && void 0 !== process.env) {
                        var e = process.env.__FIREBASE_DEFAULTS__;
                        return e ? JSON.parse(e) : void 0
                    }
                },
                a = () => {
                    if ("undefined" != typeof document) {
                        let e;
                        try {
                            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                        } catch (e) {
                            return
                        }
                        var t = e && s(e[1]);
                        return t && JSON.parse(t)
                    }
                },
                o = () => {
                    try {
                        return n() || r() || a()
                    } catch (e) {
                        return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
                    }
                };
            var c, d;

            function u() {
                return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
            }

            function h() {
                var e = null === (e = o()) || void 0 === e ? void 0 : e.forceEnvironment;
                if ("node" === e) return !0;
                if ("browser" === e) return !1;
                try {
                    return "[object process]" === Object.prototype.toString.call(global.process)
                } catch (e) {
                    return !1
                }
            }

            function p() {
                var e = "object" == typeof chrome ? chrome.runtime : "object" == typeof browser ? browser.runtime : void 0;
                return "object" == typeof e && void 0 !== e.id
            }

            function f() {
                return "object" == typeof navigator && "ReactNative" === navigator.product
            }

            function m() {
                const e = u();
                return 0 <= e.indexOf("MSIE ") || 0 <= e.indexOf("Trident/")
            }

            function v() {
                try {
                    return "object" == typeof indexedDB
                } catch (e) {
                    return !1
                }
            }
            class g extends Error {
                constructor(e, t, n) {
                    super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, g.prototype), Error.captureStackTrace && Error.captureStackTrace(this, _.prototype.create)
                }
            }
            class _ {
                constructor(e, t, n) {
                    this.service = e, this.serviceName = t, this.errors = n
                }
                create(e, ...t) {
                    var r, n = t[0] || {},
                        i = `${this.service}/${e}`,
                        s = this.errors[e],
                        s = s ? (r = n, s.replace(y, (e, t) => {
                            var n = r[t];
                            return null != n ? String(n) : `<${t}?>`
                        })) : "Error",
                        s = `${this.serviceName}: ${s} (${i}).`;
                    return new g(i, s, n)
                }
            }
            const y = /\{\$([^}]+)}/g;

            function I(e) {
                const t = [];
                for (const [n, r] of Object.entries(e)) Array.isArray(r) ? r.forEach(e => {
                    t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e))
                }) : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
                return t.length ? "&" + t.join("&") : ""
            }

            function w(e) {
                const r = {},
                    t = e.replace(/^\?/, "").split("&");
                return t.forEach(e => {
                    var t, n;
                    e && ([t, n] = e.split("="), r[decodeURIComponent(t)] = decodeURIComponent(n))
                }), r
            }

            function T(e) {
                var t = e.indexOf("?");
                if (!t) return "";
                var n = e.indexOf("#", t);
                return e.substring(t, 0 < n ? n : void 0)
            }
            class E {
                constructor(e, t) {
                    this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then(() => {
                        e(this)
                    }).catch(e => {
                        this.error(e)
                    })
                }
                next(t) {
                    this.forEachObserver(e => {
                        e.next(t)
                    })
                }
                error(t) {
                    this.forEachObserver(e => {
                        e.error(t)
                    }), this.close(t)
                }
                complete() {
                    this.forEachObserver(e => {
                        e.complete()
                    }), this.close()
                }
                subscribe(e, t, n) {
                    let r;
                    if (void 0 === e && void 0 === t && void 0 === n) throw new Error("Missing Observer.");
                    r = function(e, t) {
                        if ("object" != typeof e || null === e) return !1;
                        for (const n of t)
                            if (n in e && "function" == typeof e[n]) return !0;
                        return !1
                    }(e, ["next", "error", "complete"]) ? e : {
                        next: e,
                        error: t,
                        complete: n
                    }, void 0 === r.next && (r.next = b), void 0 === r.error && (r.error = b), void 0 === r.complete && (r.complete = b);
                    var i = this.unsubscribeOne.bind(this, this.observers.length);
                    return this.finalized && this.task.then(() => {
                        try {
                            this.finalError ? r.error(this.finalError) : r.complete()
                        } catch (e) {}
                    }), this.observers.push(r), i
                }
                unsubscribeOne(e) {
                    void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], --this.observerCount, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
                }
                forEachObserver(t) {
                    if (!this.finalized)
                        for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t)
                }
                sendOne(e, t) {
                    this.task.then(() => {
                        if (void 0 !== this.observers && void 0 !== this.observers[e]) try {
                            t(this.observers[e])
                        } catch (e) {
                            "undefined" != typeof console && console.error && console.error(e)
                        }
                    })
                }
                close(e) {
                    this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then(() => {
                        this.observers = void 0, this.onNoObservers = void 0
                    }))
                }
            }

            function b() {}

            function k(e) {
                return e && e._delegate ? e._delegate : e
            }(d = c = c || {})[d.DEBUG = 0] = "DEBUG", d[d.VERBOSE = 1] = "VERBOSE", d[d.INFO = 2] = "INFO", d[d.WARN = 3] = "WARN", d[d.ERROR = 4] = "ERROR", d[d.SILENT = 5] = "SILENT";
            const S = {
                    debug: c.DEBUG,
                    verbose: c.VERBOSE,
                    info: c.INFO,
                    warn: c.WARN,
                    error: c.ERROR,
                    silent: c.SILENT
                },
                R = c.INFO,
                A = {
                    [c.DEBUG]: "log",
                    [c.VERBOSE]: "log",
                    [c.INFO]: "info",
                    [c.WARN]: "warn",
                    [c.ERROR]: "error"
                },
                P = (e, t, ...n) => {
                    if (!(t < e.logLevel)) {
                        var r = (new Date).toISOString(),
                            i = A[t];
                        if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
                        console[i](`[${r}]  ${e.name}:`, ...n)
                    }
                };

            function C(e, t) {
                var n = {};
                for (i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                    for (var r = 0, i = Object.getOwnPropertySymbols(e); r < i.length; r++) t.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (n[i[r]] = e[i[r]]);
                return n
            }
            class O {
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
            }
            const N = {
                    FACEBOOK: "facebook.com",
                    GITHUB: "github.com",
                    GOOGLE: "google.com",
                    PASSWORD: "password",
                    PHONE: "phone",
                    TWITTER: "twitter.com"
                },
                L = {
                    EMAIL_SIGNIN: "EMAIL_SIGNIN",
                    PASSWORD_RESET: "PASSWORD_RESET",
                    RECOVER_EMAIL: "RECOVER_EMAIL",
                    REVERT_SECOND_FACTOR_ADDITION: "REVERT_SECOND_FACTOR_ADDITION",
                    VERIFY_AND_CHANGE_EMAIL: "VERIFY_AND_CHANGE_EMAIL",
                    VERIFY_EMAIL: "VERIFY_EMAIL"
                };

            function D() {
                return {
                    "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
                }
            }

            function M() {
                return {
                    "admin-restricted-operation": "This operation is restricted to administrators only.",
                    "argument-error": "",
                    "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
                    "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
                    "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
                    "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
                    "cordova-not-ready": "Cordova framework is not ready.",
                    "cors-unsupported": "This browser is not supported.",
                    "credential-already-in-use": "This credential is already associated with a different user account.",
                    "custom-token-mismatch": "The custom token corresponds to a different audience.",
                    "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
                    "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
                    "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
                    "email-change-needs-verification": "Multi-factor users must always have a verified email.",
                    "email-already-in-use": "The email address is already in use by another account.",
                    "emulator-config-failed": 'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',
                    "expired-action-code": "The action code has expired.",
                    "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
                    "internal-error": "An internal AuthError has occurred.",
                    "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
                    "invalid-app-id": "The mobile app identifier is not registed for the current project.",
                    "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
                    "invalid-auth-event": "An internal AuthError has occurred.",
                    "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
                    "invalid-continue-uri": "The continue URL provided in the request is invalid.",
                    "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
                    "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
                    "invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
                    "invalid-email": "The email address is badly formatted.",
                    "invalid-emulator-scheme": "Emulator URL must start with a valid scheme (http:// or https://).",
                    "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
                    "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
                    "invalid-credential": "The supplied auth credential is incorrect, malformed or has expired.",
                    "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
                    "invalid-multi-factor-session": "The request does not contain a valid proof of first factor successful sign-in.",
                    "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
                    "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
                    "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
                    "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
                    "wrong-password": "The password is invalid or the user does not have a password.",
                    "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
                    "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
                    "invalid-provider-id": "The specified provider ID is invalid.",
                    "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
                    "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
                    "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
                    "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
                    "login-blocked": "Login blocked by user-provided method: {$originalMessage}",
                    "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
                    "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
                    "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
                    "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
                    "missing-continue-uri": "A continue URL must be provided in the request.",
                    "missing-iframe-start": "An internal AuthError has occurred.",
                    "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
                    "missing-or-invalid-nonce": "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
                    "missing-password": "A non-empty password must be provided",
                    "missing-multi-factor-info": "No second factor identifier is provided.",
                    "missing-multi-factor-session": "The request is missing proof of first factor successful sign-in.",
                    "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
                    "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
                    "app-deleted": "This instance of FirebaseApp has been deleted.",
                    "multi-factor-info-not-found": "The user does not have a second factor matching the identifier provided.",
                    "multi-factor-auth-required": "Proof of ownership of a second factor is required to complete sign-in.",
                    "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
                    "network-request-failed": "A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
                    "no-auth-event": "An internal AuthError has occurred.",
                    "no-such-provider": "User was not linked to an account with the given provider.",
                    "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
                    "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
                    "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
                    "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
                    "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
                    "provider-already-linked": "User can only be linked to one identity for the given provider.",
                    "quota-exceeded": "The project's quota for this operation has been exceeded.",
                    "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
                    "redirect-operation-pending": "A redirect sign-in operation is already pending.",
                    "rejected-credential": "The request contains malformed or mismatching credentials.",
                    "second-factor-already-in-use": "The second factor is already enrolled on this account.",
                    "maximum-second-factor-count-exceeded": "The maximum allowed number of second factors on a user has been exceeded.",
                    "tenant-id-mismatch": "The provided tenant ID does not match the Auth instance's tenant ID",
                    timeout: "The operation has timed out.",
                    "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
                    "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
                    "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
                    "unsupported-first-factor": "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
                    "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
                    "unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
                    "unverified-email": "The operation requires a verified email.",
                    "user-cancelled": "The user did not grant your application the permissions it requested.",
                    "user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
                    "user-disabled": "The user account has been disabled by an administrator.",
                    "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
                    "user-signed-out": "",
                    "weak-password": "The password must be 6 characters long or more.",
                    "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled.",
                    "already-initialized": "initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.",
                    "missing-recaptcha-token": "The reCAPTCHA token is missing when sending request to the backend.",
                    "invalid-recaptcha-token": "The reCAPTCHA token is invalid when sending request to the backend.",
                    "invalid-recaptcha-action": "The reCAPTCHA action is invalid when sending request to the backend.",
                    "recaptcha-not-enabled": "reCAPTCHA Enterprise integration is not enabled for this project.",
                    "missing-client-type": "The reCAPTCHA client type is missing when sending request to the backend.",
                    "missing-recaptcha-version": "The reCAPTCHA version is missing when sending request to the backend.",
                    "invalid-req-type": "Invalid request parameters.",
                    "invalid-recaptcha-version": "The reCAPTCHA version is invalid when sending request to the backend.",
                    "unsupported-password-policy-schema-version": "The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.",
                    "password-does-not-meet-requirements": "The password does not meet the requirements."
                }
            }
            const U = D,
                F = new _("auth", "Firebase", D()),
                V = new class {
                    constructor(e) {
                        this.name = e, this._logLevel = R, this._logHandler = P, this._userLogHandler = null
                    }
                    get logLevel() {
                        return this._logLevel
                    }
                    set logLevel(e) {
                        if (!(e in c)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
                        this._logLevel = e
                    }
                    setLogLevel(e) {
                        this._logLevel = "string" == typeof e ? S[e] : e
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
                        this._userLogHandler && this._userLogHandler(this, c.DEBUG, ...e), this._logHandler(this, c.DEBUG, ...e)
                    }
                    log(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.VERBOSE, ...e), this._logHandler(this, c.VERBOSE, ...e)
                    }
                    info(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.INFO, ...e), this._logHandler(this, c.INFO, ...e)
                    }
                    warn(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.WARN, ...e), this._logHandler(this, c.WARN, ...e)
                    }
                    error(...e) {
                        this._userLogHandler && this._userLogHandler(this, c.ERROR, ...e), this._logHandler(this, c.ERROR, ...e)
                    }
                }("@firebase/auth");

            function x(e, ...t) {
                V.logLevel <= c.ERROR && V.error(`Auth (${Ri.SDK_VERSION}): ${e}`, ...t)
            }

            function j(e, ...t) {
                throw z(e, ...t)
            }

            function H(e, ...t) {
                return z(e, ...t)
            }

            function W(e, t, n) {
                var r = Object.assign(Object.assign({}, U()), {
                    [t]: n
                });
                const i = new _("auth", "Firebase", r);
                return i.create(t, {
                    appName: e.name
                })
            }

            function q(e, t, n) {
                if (!(t instanceof n)) throw n.name !== t.constructor.name && j(e, "argument-error"), W(e, "argument-error", `Type of ${t.constructor.name} does not match expected instance.` + "Did you pass a reference from a different Auth SDK?")
            }

            function z(e, ...t) {
                if ("string" == typeof e) return F.create(e, ...t); {
                    var n = t[0];
                    const r = [...t.slice(1)];
                    return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r)
                }
            }

            function B(e, t, ...n) {
                if (!e) throw z(t, ...n)
            }

            function G(e) {
                var t = "INTERNAL ASSERTION FAILED: " + e;
                throw x(t), new Error(t)
            }

            function K(e, t) {
                e || G(t)
            }

            function $() {
                var e;
                return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.href) || ""
            }

            function J() {
                return "http:" === Y() || "https:" === Y()
            }

            function Y() {
                var e;
                return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.protocol) || null
            }
            class X {
                constructor(e, t) {
                    K((this.shortDelay = e) < (this.longDelay = t), "Short delay should be less than long delay!"), this.isMobile = "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(u()) || f()
                }
                get() {
                    return "undefined" != typeof navigator && navigator && "onLine" in navigator && "boolean" == typeof navigator.onLine && (J() || p() || "connection" in navigator) && !navigator.onLine ? Math.min(5e3, this.shortDelay) : this.isMobile ? this.longDelay : this.shortDelay
                }
            }

            function Q(e, t) {
                K(e.emulator, "Emulator should always be set here");
                var n = e.emulator["url"];
                return t ? `${n}${t.startsWith("/")?t.slice(1):t}` : n
            }
            class Z {
                static initialize(e, t, n) {
                    this.fetchImpl = e, t && (this.headersImpl = t), n && (this.responseImpl = n)
                }
                static fetch() {
                    return this.fetchImpl || ("undefined" != typeof self && "fetch" in self ? self.fetch : "undefined" != typeof globalThis && globalThis.fetch ? globalThis.fetch : "undefined" != typeof fetch ? fetch : void G("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"))
                }
                static headers() {
                    return this.headersImpl || ("undefined" != typeof self && "Headers" in self ? self.Headers : "undefined" != typeof globalThis && globalThis.Headers ? globalThis.Headers : "undefined" != typeof Headers ? Headers : void G("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"))
                }
                static response() {
                    return this.responseImpl || ("undefined" != typeof self && "Response" in self ? self.Response : "undefined" != typeof globalThis && globalThis.Response ? globalThis.Response : "undefined" != typeof Response ? Response : void G("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"))
                }
            }
            const ee = {
                    CREDENTIAL_MISMATCH: "custom-token-mismatch",
                    MISSING_CUSTOM_TOKEN: "internal-error",
                    INVALID_IDENTIFIER: "invalid-email",
                    MISSING_CONTINUE_URI: "internal-error",
                    INVALID_PASSWORD: "wrong-password",
                    MISSING_PASSWORD: "missing-password",
                    INVALID_LOGIN_CREDENTIALS: "invalid-credential",
                    EMAIL_EXISTS: "email-already-in-use",
                    PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
                    INVALID_IDP_RESPONSE: "invalid-credential",
                    INVALID_PENDING_TOKEN: "invalid-credential",
                    FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
                    MISSING_REQ_TYPE: "internal-error",
                    EMAIL_NOT_FOUND: "user-not-found",
                    RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
                    EXPIRED_OOB_CODE: "expired-action-code",
                    INVALID_OOB_CODE: "invalid-action-code",
                    MISSING_OOB_CODE: "internal-error",
                    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
                    INVALID_ID_TOKEN: "invalid-user-token",
                    TOKEN_EXPIRED: "user-token-expired",
                    USER_NOT_FOUND: "user-token-expired",
                    TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
                    PASSWORD_DOES_NOT_MEET_REQUIREMENTS: "password-does-not-meet-requirements",
                    INVALID_CODE: "invalid-verification-code",
                    INVALID_SESSION_INFO: "invalid-verification-id",
                    INVALID_TEMPORARY_PROOF: "invalid-credential",
                    MISSING_SESSION_INFO: "missing-verification-id",
                    SESSION_EXPIRED: "code-expired",
                    MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
                    UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
                    INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
                    ADMIN_ONLY_OPERATION: "admin-restricted-operation",
                    INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
                    MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
                    MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
                    MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
                    SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
                    SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
                    BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
                    RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
                    MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
                    INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
                    INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
                    MISSING_CLIENT_TYPE: "missing-client-type",
                    MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
                    INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
                    INVALID_REQ_TYPE: "invalid-req-type"
                },
                te = new X(3e4, 6e4);

            function ne(e, t) {
                return e.tenantId && !t.tenantId ? Object.assign(Object.assign({}, t), {
                    tenantId: e.tenantId
                }) : t
            }
            async function re(i, s, a, o, e = {}) {
                return ie(i, e, async () => {
                    let e = {},
                        t = {};
                    o && ("GET" === s ? t = o : e = {
                        body: JSON.stringify(o)
                    });
                    var n = I(Object.assign({
                        key: i.config.apiKey
                    }, t)).slice(1);
                    const r = await i._getAdditionalHeaders();
                    return r["Content-Type"] = "application/json", i.languageCode && (r["X-Firebase-Locale"] = i.languageCode), Z.fetch()(ae(i, i.config.apiHost, a, n), Object.assign({
                        method: s,
                        headers: r,
                        referrerPolicy: "no-referrer"
                    }, e))
                })
            }
            async function ie(t, e, n) {
                t._canInitEmulator = !1;
                var r = Object.assign(Object.assign({}, ee), e);
                try {
                    const a = new oe(t),
                        o = await Promise.race([n(), a.promise]);
                    a.clearNetworkTimeout();
                    var i = await o.json();
                    if ("needConfirmation" in i) throw ce(t, "account-exists-with-different-credential", i);
                    if (o.ok && !("errorMessage" in i)) return i; {
                        const c = o.ok ? i.errorMessage : i.error.message,
                            [l, d] = c.split(" : ");
                        if ("FEDERATED_USER_ID_ALREADY_LINKED" === l) throw ce(t, "credential-already-in-use", i);
                        if ("EMAIL_EXISTS" === l) throw ce(t, "email-already-in-use", i);
                        if ("USER_DISABLED" === l) throw ce(t, "user-disabled", i);
                        var s = r[l] || l.toLowerCase().replace(/[_\s]+/g, "-");
                        if (d) throw W(t, s, d);
                        j(t, s)
                    }
                } catch (e) {
                    if (e instanceof g) throw e;
                    j(t, "network-request-failed", {
                        message: String(e)
                    })
                }
            }
            async function se(e, t, n, r, i = {}) {
                var s = await re(e, t, n, r, i);
                return "mfaPendingCredential" in s && j(e, "multi-factor-auth-required", {
                    _serverResponse: s
                }), s
            }

            function ae(e, t, n, r) {
                var i = `${t}${n}?${r}`;
                return e.config.emulator ? Q(e.config, i) : `${e.config.apiScheme}://${i}`
            }
            class oe {
                constructor(e) {
                    this.auth = e, this.timer = null, this.promise = new Promise((e, t) => {
                        this.timer = setTimeout(() => t(H(this.auth, "network-request-failed")), te.get())
                    })
                }
                clearNetworkTimeout() {
                    clearTimeout(this.timer)
                }
            }

            function ce(e, t, n) {
                const r = {
                    appName: e.name
                };
                n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
                const i = H(e, t, r);
                return i.customData._tokenResponse = n, i
            }

            function le(e) {
                return void 0 !== e && void 0 !== e.getResponse
            }

            function de(e) {
                return void 0 !== e && void 0 !== e.enterprise
            }
            class ue {
                constructor(e) {
                    if (this.siteKey = "", this.recaptchaEnforcementState = [], void 0 === e.recaptchaKey) throw new Error("recaptchaKey undefined");
                    this.siteKey = e.recaptchaKey.split("/")[3], this.recaptchaEnforcementState = e.recaptchaEnforcementState
                }
                getProviderEnforcementState(e) {
                    if (!this.recaptchaEnforcementState || 0 === this.recaptchaEnforcementState.length) return null;
                    for (const t of this.recaptchaEnforcementState)
                        if (t.provider && t.provider === e) return function(e) {
                            switch (e) {
                                case "ENFORCE":
                                    return "ENFORCE";
                                case "AUDIT":
                                    return "AUDIT";
                                case "OFF":
                                    return "OFF";
                                default:
                                    return "ENFORCEMENT_STATE_UNSPECIFIED"
                            }
                        }(t.enforcementState);
                    return null
                }
                isProviderEnabled(e) {
                    return "ENFORCE" === this.getProviderEnforcementState(e) || "AUDIT" === this.getProviderEnforcementState(e)
                }
            }

            function he(e) {
                if (e) try {
                    const t = new Date(Number(e));
                    if (!isNaN(t.getTime())) return t.toUTCString()
                } catch (e) {}
            }

            function pe(e) {
                return 1e3 * Number(e)
            }

            function fe(e) {
                var [t, n, r] = e.split(".");
                if (void 0 === t || void 0 === n || void 0 === r) return x("JWT malformed, contained fewer than 3 sections"), null;
                try {
                    var i = s(n);
                    return i ? JSON.parse(i) : (x("Failed to decode base64 JWT payload"), null)
                } catch (e) {
                    return x("Caught error parsing JWT payload as JSON", null == e ? void 0 : e.toString()), null
                }
            }
            async function me(t, n, e = !1) {
                if (e) return n;
                try {
                    return n
                } catch (e) {
                    throw e instanceof g && (n = [e["code"]][0], "auth/user-disabled" === n || "auth/user-token-expired" === n) && t.auth.currentUser === t && await t.auth.signOut(), e
                }
            }
            class ve {
                constructor(e) {
                    this.user = e, this.isRunning = !1, this.timerId = null, this.errorBackoff = 3e4
                }
                _start() {
                    this.isRunning || (this.isRunning = !0, this.schedule())
                }
                _stop() {
                    this.isRunning && (this.isRunning = !1, null !== this.timerId && clearTimeout(this.timerId))
                }
                getInterval(e) {
                    if (e) {
                        var t = this.errorBackoff;
                        return this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4), t
                    }
                    this.errorBackoff = 3e4;
                    t = (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t ? t : 0) - Date.now() - 3e5;
                    return Math.max(0, t)
                }
                schedule(e = !1) {
                    var t;
                    this.isRunning && (t = this.getInterval(e), this.timerId = setTimeout(async () => {
                        await this.iteration()
                    }, t))
                }
                async iteration() {
                    try {
                        await this.user.getIdToken(!0)
                    } catch (e) {
                        return void("auth/network-request-failed" === (null == e ? void 0 : e.code) && this.schedule(!0))
                    }
                    this.schedule()
                }
            }
            class ge {
                constructor(e, t) {
                    this.createdAt = e, this.lastLoginAt = t, this._initializeTime()
                }
                _initializeTime() {
                    this.lastSignInTime = he(this.lastLoginAt), this.creationTime = he(this.createdAt)
                }
                _copy(e) {
                    this.createdAt = e.createdAt, this.lastLoginAt = e.lastLoginAt, this._initializeTime()
                }
                toJSON() {
                    return {
                        createdAt: this.createdAt,
                        lastLoginAt: this.lastLoginAt
                    }
                }
            }
            async function _e(e) {
                var t = e.auth,
                    n = await e.getIdToken(),
                    r = await me(e, async function(e, t) {
                        return re(e, "POST", "/v1/accounts:lookup", t)
                    }(t, {
                        idToken: n
                    }));
                B(null == r ? void 0 : r.users.length, t, "internal-error");
                var i = r.users[0];
                e._notifyReloadListener(i);
                var s, a, t = null !== (n = i.providerUserInfo) && void 0 !== n && n.length ? i.providerUserInfo.map(e => {
                        var t = e["providerId"],
                            n = C(e, ["providerId"]);
                        return {
                            providerId: t,
                            uid: n.rawId || "",
                            displayName: n.displayName || null,
                            email: n.email || null,
                            phoneNumber: n.phoneNumber || null,
                            photoURL: n.photoUrl || null
                        }
                    }) : [],
                    r = (s = e.providerData, a = t, [...s.filter(t => !a.some(e => e.providerId === t.providerId)), ...a]),
                    n = e.isAnonymous,
                    t = !(e.email && i.passwordHash || null !== r && r.length),
                    t = !!n && t,
                    t = {
                        uid: i.localId,
                        displayName: i.displayName || null,
                        photoURL: i.photoUrl || null,
                        email: i.email || null,
                        emailVerified: i.emailVerified || !1,
                        phoneNumber: i.phoneNumber || null,
                        tenantId: i.tenantId || null,
                        providerData: r,
                        metadata: new ge(i.createdAt, i.lastLoginAt),
                        isAnonymous: t
                    };
                Object.assign(e, t)
            }
            class ye {
                constructor() {
                    this.refreshToken = null, this.accessToken = null, this.expirationTime = null
                }
                get isExpired() {
                    return !this.expirationTime || Date.now() > this.expirationTime - 3e4
                }
                updateFromServerResponse(e) {
                    B(e.idToken, "internal-error"), B(void 0 !== e.idToken, "internal-error"), B(void 0 !== e.refreshToken, "internal-error");
                    var t, n, n = "expiresIn" in e && void 0 !== e.expiresIn ? Number(e.expiresIn) : (t = e.idToken, B(n = fe(t), "internal-error"), B(void 0 !== n.exp, "internal-error"), B(void 0 !== n.iat, "internal-error"), Number(n.exp) - Number(n.iat));
                    this.updateTokensAndExpiration(e.idToken, e.refreshToken, n)
                }
                async getToken(e, t = !1) {
                    return B(!this.accessToken || this.refreshToken, e, "user-token-expired"), t || !this.accessToken || this.isExpired ? this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null : this.accessToken
                }
                clearRefreshToken() {
                    this.refreshToken = null
                }
                async refresh(e, t) {
                    var i, s, {
                        accessToken: n,
                        refreshToken: r,
                        expiresIn: a
                    } = (s = t, await {
                        accessToken: (a = await ie(i = e, {}, async () => {
                            var e = I({
                                    grant_type: "refresh_token",
                                    refresh_token: s
                                }).slice(1),
                                {
                                    tokenApiHost: t,
                                    apiKey: n
                                } = i.config,
                                n = ae(i, t, "/v1/token", `key=${n}`);
                            const r = await i._getAdditionalHeaders();
                            return r["Content-Type"] = "application/x-www-form-urlencoded", Z.fetch()(n, {
                                method: "POST",
                                headers: r,
                                body: e
                            })
                        })).access_token,
                        expiresIn: a.expires_in,
                        refreshToken: a.refresh_token
                    });
                    this.updateTokensAndExpiration(n, r, Number(a))
                }
                updateTokensAndExpiration(e, t, n) {
                    this.refreshToken = t || null, this.accessToken = e || null, this.expirationTime = Date.now() + 1e3 * n
                }
                static fromJSON(e, t) {
                    var {
                        refreshToken: n,
                        accessToken: r,
                        expirationTime: i
                    } = t;
                    const s = new ye;
                    return n && (B("string" == typeof n, "internal-error", {
                        appName: e
                    }), s.refreshToken = n), r && (B("string" == typeof r, "internal-error", {
                        appName: e
                    }), s.accessToken = r), i && (B("number" == typeof i, "internal-error", {
                        appName: e
                    }), s.expirationTime = i), s
                }
                toJSON() {
                    return {
                        refreshToken: this.refreshToken,
                        accessToken: this.accessToken,
                        expirationTime: this.expirationTime
                    }
                }
                _assign(e) {
                    this.accessToken = e.accessToken, this.refreshToken = e.refreshToken, this.expirationTime = e.expirationTime
                }
                _clone() {
                    return Object.assign(new ye, this.toJSON())
                }
                _performRefresh() {
                    return G("not implemented")
                }
            }

            function Ie(e, t) {
                B("string" == typeof e || void 0 === e, "internal-error", {
                    appName: t
                })
            }
            class we {
                constructor(e) {
                    var {
                        uid: t,
                        auth: n,
                        stsTokenManager: r
                    } = e, i = C(e, ["uid", "auth", "stsTokenManager"]);
                    this.providerId = "firebase", this.proactiveRefresh = new ve(this), this.reloadUserInfo = null, this.reloadListener = null, this.uid = t, this.auth = n, this.stsTokenManager = r, this.accessToken = r.accessToken, this.displayName = i.displayName || null, this.email = i.email || null, this.emailVerified = i.emailVerified || !1, this.phoneNumber = i.phoneNumber || null, this.photoURL = i.photoURL || null, this.isAnonymous = i.isAnonymous || !1, this.tenantId = i.tenantId || null, this.providerData = i.providerData ? [...i.providerData] : [], this.metadata = new ge(i.createdAt || void 0, i.lastLoginAt || void 0)
                }
                async getIdToken(e) {
                    var t = await me(this, this.stsTokenManager.getToken(this.auth, e));
                    return B(t, this.auth, "internal-error"), this.accessToken !== t && (this.accessToken = t, await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)), t
                }
                getIdTokenResult(e) {
                    return async function(e, t = !1) {
                        const n = k(e);
                        var r = await n.getIdToken(t),
                            i = fe(r);
                        B(i && i.exp && i.auth_time && i.iat, n.auth, "internal-error");
                        var s = "object" == typeof i.firebase ? i.firebase : void 0,
                            a = null == s ? void 0 : s.sign_in_provider;
                        return {
                            claims: i,
                            token: r,
                            authTime: he(pe(i.auth_time)),
                            issuedAtTime: he(pe(i.iat)),
                            expirationTime: he(pe(i.exp)),
                            signInProvider: a || null,
                            signInSecondFactor: (null == s ? void 0 : s.sign_in_second_factor) || null
                        }
                    }(this, e)
                }
                reload() {
                    return async function(e) {
                        const t = k(e);
                        await _e(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t)
                    }(this)
                }
                _assign(e) {
                    this !== e && (B(this.uid === e.uid, this.auth, "internal-error"), this.displayName = e.displayName, this.photoURL = e.photoURL, this.email = e.email, this.emailVerified = e.emailVerified, this.phoneNumber = e.phoneNumber, this.isAnonymous = e.isAnonymous, this.tenantId = e.tenantId, this.providerData = e.providerData.map(e => Object.assign({}, e)), this.metadata._copy(e.metadata), this.stsTokenManager._assign(e.stsTokenManager))
                }
                _clone(e) {
                    const t = new we(Object.assign(Object.assign({}, this), {
                        auth: e,
                        stsTokenManager: this.stsTokenManager._clone()
                    }));
                    return t.metadata._copy(this.metadata), t
                }
                _onReload(e) {
                    B(!this.reloadListener, this.auth, "internal-error"), this.reloadListener = e, this.reloadUserInfo && (this._notifyReloadListener(this.reloadUserInfo), this.reloadUserInfo = null)
                }
                _notifyReloadListener(e) {
                    this.reloadListener ? this.reloadListener(e) : this.reloadUserInfo = e
                }
                _startProactiveRefresh() {
                    this.proactiveRefresh._start()
                }
                _stopProactiveRefresh() {
                    this.proactiveRefresh._stop()
                }
                async _updateTokensIfNecessary(e, t = !1) {
                    let n = !1;
                    e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), n = !0), t && await _e(this), await this.auth._persistUserIfCurrent(this), n && this.auth._notifyListenersIfCurrent(this)
                }
                async delete() {
                    var e = await this.getIdToken();
                    return await me(this, async function(e, t) {
                        return re(e, "POST", "/v1/accounts:delete", t)
                    }(this.auth, {
                        idToken: e
                    })), this.stsTokenManager.clearRefreshToken(), this.auth.signOut()
                }
                toJSON() {
                    return Object.assign(Object.assign({
                        uid: this.uid,
                        email: this.email || void 0,
                        emailVerified: this.emailVerified,
                        displayName: this.displayName || void 0,
                        isAnonymous: this.isAnonymous,
                        photoURL: this.photoURL || void 0,
                        phoneNumber: this.phoneNumber || void 0,
                        tenantId: this.tenantId || void 0,
                        providerData: this.providerData.map(e => Object.assign({}, e)),
                        stsTokenManager: this.stsTokenManager.toJSON(),
                        _redirectEventId: this._redirectEventId
                    }, this.metadata.toJSON()), {
                        apiKey: this.auth.config.apiKey,
                        appName: this.auth.name
                    })
                }
                get refreshToken() {
                    return this.stsTokenManager.refreshToken || ""
                }
                static _fromJSON(e, t) {
                    var n = null !== (a = t.displayName) && void 0 !== a ? a : void 0,
                        r = null !== (m = t.email) && void 0 !== m ? m : void 0,
                        i = null !== (o = t.phoneNumber) && void 0 !== o ? o : void 0,
                        s = null !== (l = t.photoURL) && void 0 !== l ? l : void 0,
                        a = null !== (c = t.tenantId) && void 0 !== c ? c : void 0,
                        o = null !== (m = t._redirectEventId) && void 0 !== m ? m : void 0,
                        c = null !== (l = t.createdAt) && void 0 !== l ? l : void 0,
                        l = null !== (m = t.lastLoginAt) && void 0 !== m ? m : void 0;
                    const {
                        uid: d,
                        emailVerified: u,
                        isAnonymous: h,
                        providerData: p,
                        stsTokenManager: f
                    } = t;
                    B(d && f, e, "internal-error");
                    var m = ye.fromJSON(this.name, f);
                    B("string" == typeof d, e, "internal-error"), Ie(n, e.name), Ie(r, e.name), B("boolean" == typeof u, e, "internal-error"), B("boolean" == typeof h, e, "internal-error"), Ie(i, e.name), Ie(s, e.name), Ie(a, e.name), Ie(o, e.name), Ie(c, e.name), Ie(l, e.name);
                    const v = new we({
                        uid: d,
                        auth: e,
                        email: r,
                        emailVerified: u,
                        displayName: n,
                        isAnonymous: h,
                        photoURL: s,
                        phoneNumber: i,
                        tenantId: a,
                        stsTokenManager: m,
                        createdAt: c,
                        lastLoginAt: l
                    });
                    return p && Array.isArray(p) && (v.providerData = p.map(e => Object.assign({}, e))), o && (v._redirectEventId = o), v
                }
                static async _fromIdTokenResponse(e, t, n = !1) {
                    const r = new ye;
                    r.updateFromServerResponse(t);
                    var i = new we({
                        uid: t.localId,
                        auth: e,
                        stsTokenManager: r,
                        isAnonymous: n
                    });
                    return await _e(i), i
                }
            }
            const Te = new Map;

            function Ee(e) {
                K(e instanceof Function, "Expected a class definition");
                let t = Te.get(e);
                return t ? K(t instanceof e, "Instance stored in cache mismatched with class") : (t = new e, Te.set(e, t)), t
            }
            class be {
                constructor() {
                    this.type = "NONE", this.storage = {}
                }
                async _isAvailable() {
                    return !0
                }
                async _set(e, t) {
                    this.storage[e] = t
                }
                async _get(e) {
                    var t = this.storage[e];
                    return void 0 === t ? null : t
                }
                async _remove(e) {
                    delete this.storage[e]
                }
                _addListener(e, t) {}
                _removeListener(e, t) {}
            }
            be.type = "NONE";
            const ke = be;

            function Se(e, t, n) {
                return `firebase:${e}:${t}:${n}`
            }
            class Re {
                constructor(e, t, n) {
                    this.persistence = e, this.auth = t, this.userKey = n;
                    var {
                        config: r,
                        name: i
                    } = this.auth;
                    this.fullUserKey = Se(this.userKey, r.apiKey, i), this.fullPersistenceKey = Se("persistence", r.apiKey, i), this.boundEventHandler = t._onStorageEvent.bind(t), this.persistence._addListener(this.fullUserKey, this.boundEventHandler)
                }
                setCurrentUser(e) {
                    return this.persistence._set(this.fullUserKey, e.toJSON())
                }
                async getCurrentUser() {
                    var e = await this.persistence._get(this.fullUserKey);
                    return e ? we._fromJSON(this.auth, e) : null
                }
                removeCurrentUser() {
                    return this.persistence._remove(this.fullUserKey)
                }
                savePersistenceForRedirect() {
                    return this.persistence._set(this.fullPersistenceKey, this.persistence.type)
                }
                async setPersistence(e) {
                    if (this.persistence !== e) {
                        var t = await this.getCurrentUser();
                        return await this.removeCurrentUser(), this.persistence = e, t ? this.setCurrentUser(t) : void 0
                    }
                }
                delete() {
                    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler)
                }
                static async create(e, t, n = "authUser") {
                    if (!t.length) return new Re(Ee(ke), e, n);
                    const r = (await Promise.all(t.map(async e => {
                        if (await e._isAvailable()) return e
                    }))).filter(e => e);
                    let i = r[0] || Ee(ke);
                    const s = Se(n, e.config.apiKey, e.name);
                    let a = null;
                    for (const d of t) try {
                        var o = await d._get(s);
                        if (o) {
                            var c = we._fromJSON(e, o);
                            d !== i && (a = c), i = d;
                            break
                        }
                    } catch (e) {}
                    var l = r.filter(e => e._shouldAllowMigration);
                    return i._shouldAllowMigration && l.length && (i = l[0], a && await i._set(s, a.toJSON()), await Promise.all(t.map(async e => {
                        if (e !== i) try {
                            await e._remove(s)
                        } catch (e) {}
                    }))), new Re(i, e, n)
                }
            }

            function Ae(e) {
                const t = e.toLowerCase();
                if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/")) return "Opera";
                if (Ne(t)) return "IEMobile";
                if (t.includes("msie") || t.includes("trident/")) return "IE";
                if (t.includes("edge/")) return "Edge";
                if (Pe(t)) return "Firefox";
                if (t.includes("silk/")) return "Silk";
                if (De(t)) return "Blackberry";
                if (Me(t)) return "Webos";
                if (Ce(t)) return "Safari";
                if ((t.includes("chrome/") || Oe(t)) && !t.includes("edge/")) return "Chrome";
                if (Le(t)) return "Android";
                var n = e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
                return 2 === (null == n ? void 0 : n.length) ? n[1] : "Other"
            }

            function Pe(e = u()) {
                return /firefox\//i.test(e)
            }

            function Ce(e = u()) {
                const t = e.toLowerCase();
                return t.includes("safari/") && !t.includes("chrome/") && !t.includes("crios/") && !t.includes("android")
            }

            function Oe(e = u()) {
                return /crios\//i.test(e)
            }

            function Ne(e = u()) {
                return /iemobile/i.test(e)
            }

            function Le(e = u()) {
                return /android/i.test(e)
            }

            function De(e = u()) {
                return /blackberry/i.test(e)
            }

            function Me(e = u()) {
                return /webos/i.test(e)
            }

            function Ue(e = u()) {
                return /iphone|ipad|ipod/i.test(e) || /macintosh/i.test(e) && /mobile/i.test(e)
            }

            function Fe(e = u()) {
                return Ue(e) || Le(e) || Me(e) || De(e) || /windows phone/i.test(e) || Ne(e)
            }

            function Ve(e, t = []) {
                let n;
                switch (e) {
                    case "Browser":
                        n = Ae(u());
                        break;
                    case "Worker":
                        n = `${Ae(u())}-${e}`;
                        break;
                    default:
                        n = e
                }
                var r = t.length ? t.join(",") : "FirebaseCore-web";
                return `${n}/JsCore/${Ri.SDK_VERSION}/${r}`
            }
            class xe {
                constructor(e) {
                    this.auth = e, this.queue = []
                }
                pushCallback(r, e) {
                    var t = n => new Promise((e, t) => {
                        try {
                            e(r(n))
                        } catch (e) {
                            t(e)
                        }
                    });
                    t.onAbort = e, this.queue.push(t);
                    const n = this.queue.length - 1;
                    return () => {
                        this.queue[n] = () => Promise.resolve()
                    }
                }
                async runMiddleware(e) {
                    if (this.auth.currentUser !== e) {
                        const t = [];
                        try {
                            for (const n of this.queue) await n(e), n.onAbort && t.push(n.onAbort)
                        } catch (e) {
                            t.reverse();
                            for (const r of t) try {
                                r()
                            } catch (e) {}
                            throw this.auth._errorFactory.create("login-blocked", {
                                originalMessage: null == e ? void 0 : e.message
                            })
                        }
                    }
                }
            }
            class je {
                constructor(e) {
                    var t, n = e.customStrengthOptions;
                    this.customStrengthOptions = {}, this.customStrengthOptions.minPasswordLength = null !== (t = n.minPasswordLength) && void 0 !== t ? t : 6, n.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = n.maxPasswordLength), void 0 !== n.containsLowercaseCharacter && (this.customStrengthOptions.containsLowercaseLetter = n.containsLowercaseCharacter), void 0 !== n.containsUppercaseCharacter && (this.customStrengthOptions.containsUppercaseLetter = n.containsUppercaseCharacter), void 0 !== n.containsNumericCharacter && (this.customStrengthOptions.containsNumericCharacter = n.containsNumericCharacter), void 0 !== n.containsNonAlphanumericCharacter && (this.customStrengthOptions.containsNonAlphanumericCharacter = n.containsNonAlphanumericCharacter), this.enforcementState = e.enforcementState, "ENFORCEMENT_STATE_UNSPECIFIED" === this.enforcementState && (this.enforcementState = "OFF"), this.allowedNonAlphanumericCharacters = null !== (n = null === (n = e.allowedNonAlphanumericCharacters) || void 0 === n ? void 0 : n.join("")) && void 0 !== n ? n : "", this.forceUpgradeOnSignin = null !== (n = e.forceUpgradeOnSignin) && void 0 !== n && n, this.schemaVersion = e.schemaVersion
                }
                validatePassword(e) {
                    var t, n, r;
                    const i = {
                        isValid: !0,
                        passwordPolicy: this
                    };
                    return this.validatePasswordLengthOptions(e, i), this.validatePasswordCharacterOptions(e, i), i.isValid && (i.isValid = null === (t = i.meetsMinPasswordLength) || void 0 === t || t), i.isValid && (i.isValid = null === (t = i.meetsMaxPasswordLength) || void 0 === t || t), i.isValid && (i.isValid = null === (n = i.containsLowercaseLetter) || void 0 === n || n), i.isValid && (i.isValid = null === (n = i.containsUppercaseLetter) || void 0 === n || n), i.isValid && (i.isValid = null === (r = i.containsNumericCharacter) || void 0 === r || r), i.isValid && (i.isValid = null === (r = i.containsNonAlphanumericCharacter) || void 0 === r || r), i
                }
                validatePasswordLengthOptions(e, t) {
                    var n = this.customStrengthOptions.minPasswordLength,
                        r = this.customStrengthOptions.maxPasswordLength;
                    n && (t.meetsMinPasswordLength = e.length >= n), r && (t.meetsMaxPasswordLength = e.length <= r)
                }
                validatePasswordCharacterOptions(e, t) {
                    var n;
                    this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
                    for (let r = 0; r < e.length; r++) n = e.charAt(r), this.updatePasswordCharacterOptionsStatuses(t, "a" <= n && n <= "z", "A" <= n && n <= "Z", "0" <= n && n <= "9", this.allowedNonAlphanumericCharacters.includes(n))
                }
                updatePasswordCharacterOptionsStatuses(e, t, n, r, i) {
                    this.customStrengthOptions.containsLowercaseLetter && (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)), this.customStrengthOptions.containsUppercaseLetter && (e.containsUppercaseLetter || (e.containsUppercaseLetter = n)), this.customStrengthOptions.containsNumericCharacter && (e.containsNumericCharacter || (e.containsNumericCharacter = r)), this.customStrengthOptions.containsNonAlphanumericCharacter && (e.containsNonAlphanumericCharacter || (e.containsNonAlphanumericCharacter = i))
                }
            }
            class He {
                constructor(e, t, n, r) {
                    this.app = e, this.heartbeatServiceProvider = t, this.appCheckServiceProvider = n, this.config = r, this.currentUser = null, this.emulatorConfig = null, this.operations = Promise.resolve(), this.authStateSubscription = new qe(this), this.idTokenSubscription = new qe(this), this.beforeStateQueue = new xe(this), this.redirectUser = null, this.isProactiveRefreshEnabled = !1, this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1, this._canInitEmulator = !0, this._isInitialized = !1, this._deleted = !1, this._initializationPromise = null, this._popupRedirectResolver = null, this._errorFactory = F, this._agentRecaptchaConfig = null, this._tenantRecaptchaConfigs = {}, this._projectPasswordPolicy = null, this._tenantPasswordPolicies = {}, this.lastNotifiedUid = void 0, this.languageCode = null, this.tenantId = null, this.settings = {
                        appVerificationDisabledForTesting: !1
                    }, this.frameworks = [], this.name = e.name, this.clientVersion = r.sdkClientVersion
                }
                _initializeWithPersistence(t, n) {
                    return n && (this._popupRedirectResolver = Ee(n)), this._initializationPromise = this.queue(async () => {
                        var e;
                        if (!this._deleted && (this.persistenceManager = await Re.create(this, t), !this._deleted)) {
                            if (null !== (e = this._popupRedirectResolver) && void 0 !== e && e._shouldInitProactively) try {
                                await this._popupRedirectResolver._initialize(this)
                            } catch (e) {}
                            await this.initializeCurrentUser(n), this.lastNotifiedUid = (null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) || null, this._deleted || (this._isInitialized = !0)
                        }
                    }), this._initializationPromise
                }
                async _onStorageEvent() {
                    if (!this._deleted) {
                        var e = await this.assertedPersistence.getCurrentUser();
                        if (this.currentUser || e) return this.currentUser && e && this.currentUser.uid === e.uid ? (this._currentUser._assign(e), void await this.currentUser.getIdToken()) : void await this._updateCurrentUser(e, !0)
                    }
                }
                async initializeCurrentUser(e) {
                    var t, n, r, i = await this.assertedPersistence.getCurrentUser();
                    let s = i,
                        a = !1;
                    if (e && this.config.authDomain && (await this.getOrInitRedirectPersistenceManager(), t = null === (r = this.redirectUser) || void 0 === r ? void 0 : r._redirectEventId, n = null === s || void 0 === s ? void 0 : s._redirectEventId, r = await this.tryRedirectSignIn(e), t && t !== n || null == r || !r.user || (s = r.user, a = !0)), !s) return this.directlySetCurrentUser(null);
                    if (s._redirectEventId) return B(this._popupRedirectResolver, this, "argument-error"), await this.getOrInitRedirectPersistenceManager(), this.redirectUser && this.redirectUser._redirectEventId === s._redirectEventId ? this.directlySetCurrentUser(s) : this.reloadAndSetCurrentUserOrClear(s);
                    if (a) try {
                        await this.beforeStateQueue.runMiddleware(s)
                    } catch (e) {
                        s = i, this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e))
                    }
                    return s ? this.reloadAndSetCurrentUserOrClear(s) : this.directlySetCurrentUser(null)
                }
                async tryRedirectSignIn(e) {
                    let t = null;
                    try {
                        t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0)
                    } catch (e) {
                        await this._setRedirectUser(null)
                    }
                    return t
                }
                async reloadAndSetCurrentUserOrClear(e) {
                    try {
                        await _e(e)
                    } catch (e) {
                        if ("auth/network-request-failed" !== (null == e ? void 0 : e.code)) return this.directlySetCurrentUser(null)
                    }
                    return this.directlySetCurrentUser(e)
                }
                useDeviceLanguage() {
                    this.languageCode = function() {
                        if ("undefined" == typeof navigator) return null;
                        var e = navigator;
                        return e.languages && e.languages[0] || e.language || null
                    }()
                }
                async _delete() {
                    this._deleted = !0
                }
                async updateCurrentUser(e) {
                    const t = e ? k(e) : null;
                    return t && B(t.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"), this._updateCurrentUser(t && t._clone(this))
                }
                async _updateCurrentUser(e, t = !1) {
                    if (!this._deleted) return e && B(this.tenantId === e.tenantId, this, "tenant-id-mismatch"), t || await this.beforeStateQueue.runMiddleware(e), this.queue(async () => {
                        await this.directlySetCurrentUser(e), this.notifyAuthListeners()
                    })
                }
                async signOut() {
                    return await this.beforeStateQueue.runMiddleware(null), (this.redirectPersistenceManager || this._popupRedirectResolver) && await this._setRedirectUser(null), this._updateCurrentUser(null, !0)
                }
                setPersistence(e) {
                    return this.queue(async () => {
                        await this.assertedPersistence.setPersistence(Ee(e))
                    })
                }
                _getRecaptchaConfig() {
                    return null == this.tenantId ? this._agentRecaptchaConfig : this._tenantRecaptchaConfigs[this.tenantId]
                }
                async validatePassword(e) {
                    this._getPasswordPolicyInternal() || await this._updatePasswordPolicy();
                    const t = this._getPasswordPolicyInternal();
                    return t.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION ? Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version", {})) : t.validatePassword(e)
                }
                _getPasswordPolicyInternal() {
                    return null === this.tenantId ? this._projectPasswordPolicy : this._tenantPasswordPolicies[this.tenantId]
                }
                async _updatePasswordPolicy() {
                    var e, t = await re(e = this, "GET", "/v2/passwordPolicy", ne(e, {})),
                        t = new je(t);
                    null === this.tenantId ? this._projectPasswordPolicy = t : this._tenantPasswordPolicies[this.tenantId] = t
                }
                _getPersistence() {
                    return this.assertedPersistence.persistence.type
                }
                _updateErrorMap(e) {
                    this._errorFactory = new _("auth", "Firebase", e())
                }
                onAuthStateChanged(e, t, n) {
                    return this.registerStateListener(this.authStateSubscription, e, t, n)
                }
                beforeAuthStateChanged(e, t) {
                    return this.beforeStateQueue.pushCallback(e, t)
                }
                onIdTokenChanged(e, t, n) {
                    return this.registerStateListener(this.idTokenSubscription, e, t, n)
                }
                authStateReady() {
                    return new Promise((e, t) => {
                        if (this.currentUser) e();
                        else {
                            const n = this.onAuthStateChanged(() => {
                                n(), e()
                            }, t)
                        }
                    })
                }
                async revokeAccessToken(e) {
                    if (this.currentUser) {
                        const n = {
                            providerId: "apple.com",
                            tokenType: "ACCESS_TOKEN",
                            token: e,
                            idToken: await this.currentUser.getIdToken()
                        };
                        null != this.tenantId && (n.tenantId = this.tenantId), t = this, e = n, await re(t, "POST", "/v2/accounts:revokeToken", ne(t, e))
                    }
                    var t
                }
                toJSON() {
                    var e;
                    return {
                        apiKey: this.config.apiKey,
                        authDomain: this.config.authDomain,
                        appName: this.name,
                        currentUser: null === (e = this._currentUser) || void 0 === e ? void 0 : e.toJSON()
                    }
                }
                async _setRedirectUser(e, t) {
                    const n = await this.getOrInitRedirectPersistenceManager(t);
                    return null === e ? n.removeCurrentUser() : n.setCurrentUser(e)
                }
                async getOrInitRedirectPersistenceManager(e) {
                    var t;
                    return this.redirectPersistenceManager || (B(t = e && Ee(e) || this._popupRedirectResolver, this, "argument-error"), this.redirectPersistenceManager = await Re.create(this, [Ee(t._redirectPersistence)], "redirectUser"), this.redirectUser = await this.redirectPersistenceManager.getCurrentUser()), this.redirectPersistenceManager
                }
                async _redirectUserForId(e) {
                    var t;
                    return this._isInitialized && await this.queue(async () => {}), (null === (t = this._currentUser) || void 0 === t ? void 0 : t._redirectEventId) === e ? this._currentUser : (null === (t = this.redirectUser) || void 0 === t ? void 0 : t._redirectEventId) === e ? this.redirectUser : null
                }
                async _persistUserIfCurrent(e) {
                    if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e))
                }
                _notifyListenersIfCurrent(e) {
                    e === this.currentUser && this.notifyAuthListeners()
                }
                _key() {
                    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`
                }
                _startProactiveRefresh() {
                    this.isProactiveRefreshEnabled = !0, this.currentUser && this._currentUser._startProactiveRefresh()
                }
                _stopProactiveRefresh() {
                    this.isProactiveRefreshEnabled = !1, this.currentUser && this._currentUser._stopProactiveRefresh()
                }
                get _currentUser() {
                    return this.currentUser
                }
                notifyAuthListeners() {
                    var e;
                    this._isInitialized && (this.idTokenSubscription.next(this.currentUser), e = null !== (e = null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) && void 0 !== e ? e : null, this.lastNotifiedUid !== e && (this.lastNotifiedUid = e, this.authStateSubscription.next(this.currentUser)))
                }
                registerStateListener(e, t, n, r) {
                    if (this._deleted) return () => {};
                    const i = "function" == typeof t ? t : t.next.bind(t);
                    let s = !1;
                    const a = this._isInitialized ? Promise.resolve() : this._initializationPromise;
                    if (B(a, this, "internal-error"), a.then(() => {
                            s || i(this.currentUser)
                        }), "function" == typeof t) {
                        const o = e.addObserver(t, n, r);
                        return () => {
                            s = !0, o()
                        }
                    } {
                        const c = e.addObserver(t);
                        return () => {
                            s = !0, c()
                        }
                    }
                }
                async directlySetCurrentUser(e) {
                    this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(), e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(), (this.currentUser = e) ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser()
                }
                queue(e) {
                    return this.operations = this.operations.then(e, e), this.operations
                }
                get assertedPersistence() {
                    return B(this.persistenceManager, this, "internal-error"), this.persistenceManager
                }
                _logFramework(e) {
                    e && !this.frameworks.includes(e) && (this.frameworks.push(e), this.frameworks.sort(), this.clientVersion = Ve(this.config.clientPlatform, this._getFrameworks()))
                }
                _getFrameworks() {
                    return this.frameworks
                }
                async _getAdditionalHeaders() {
                    const e = {
                        "X-Client-Version": this.clientVersion
                    };
                    this.app.options.appId && (e["X-Firebase-gmpid"] = this.app.options.appId);
                    var t = await (null === (t = this.heartbeatServiceProvider.getImmediate({
                        optional: !0
                    })) || void 0 === t ? void 0 : t.getHeartbeatsHeader());
                    t && (e["X-Firebase-Client"] = t);
                    t = await this._getAppCheckToken();
                    return t && (e["X-Firebase-AppCheck"] = t), e
                }
                async _getAppCheckToken() {
                    var e, t, n = await (null === (n = this.appCheckServiceProvider.getImmediate({
                        optional: !0
                    })) || void 0 === n ? void 0 : n.getToken());
                    return null != n && n.error && (e = `Error while retrieving App Check token: ${n.error}`, t = [], V.logLevel <= c.WARN && V.warn(`Auth (${Ri.SDK_VERSION}): ${e}`, ...t)), null == n ? void 0 : n.token
                }
            }

            function We(e) {
                return k(e)
            }
            class qe {
                constructor(e) {
                    this.auth = e, this.observer = null, this.addObserver = function(e, t) {
                        const n = new E(e, t);
                        return n.subscribe.bind(n)
                    }(e => this.observer = e)
                }
                get next() {
                    return B(this.observer, this.auth, "internal-error"), this.observer.next.bind(this.observer)
                }
            }
            let ze = {
                async loadJS() {
                    throw new Error("Unable to load external scripts")
                },
                recaptchaV2Script: "",
                recaptchaEnterpriseScript: "",
                gapiScript: ""
            };

            function Be(e) {
                return ze.loadJS(e)
            }

            function Ge(e) {
                return `__${e}${Math.floor(1e6*Math.random())}`
            }
            class Ke {
                constructor(e) {
                    this.type = "recaptcha-enterprise", this.auth = We(e)
                }
                async verify(i = "verify", e = !1) {
                    async function t(i) {
                        if (!e) {
                            if (null == i.tenantId && null != i._agentRecaptchaConfig) return i._agentRecaptchaConfig.siteKey;
                            if (null != i.tenantId && void 0 !== i._tenantRecaptchaConfigs[i.tenantId]) return i._tenantRecaptchaConfigs[i.tenantId].siteKey
                        }
                        return new Promise(async (n, r) => {
                            !async function(e, t) {
                                return re(e, "GET", "/v2/recaptchaConfig", ne(e, t))
                            }(i, {
                                clientType: "CLIENT_TYPE_WEB",
                                version: "RECAPTCHA_ENTERPRISE"
                            }).then(e => {
                                if (void 0 !== e.recaptchaKey) {
                                    var t = new ue(e);
                                    return null == i.tenantId ? i._agentRecaptchaConfig = t : i._tenantRecaptchaConfigs[i.tenantId] = t, n(t.siteKey)
                                }
                                r(new Error("recaptcha Enterprise site key undefined"))
                            }).catch(e => {
                                r(e)
                            })
                        })
                    }

                    function s(e, t, n) {
                        const r = window.grecaptcha;
                        de(r) ? r.enterprise.ready(() => {
                            r.enterprise.execute(e, {
                                action: i
                            }).then(e => {
                                t(e)
                            }).catch(() => {
                                t("NO_RECAPTCHA")
                            })
                        }) : n(Error("No reCAPTCHA enterprise script loaded."))
                    }
                    return new Promise((n, r) => {
                        t(this.auth).then(t => {
                            if (!e && de(window.grecaptcha)) s(t, n, r);
                            else if ("undefined" != typeof window) {
                                let e = ze.recaptchaEnterpriseScript;
                                0 !== e.length && (e += t), Be(e).then(() => {
                                    s(t, n, r)
                                }).catch(e => {
                                    r(e)
                                })
                            } else r(new Error("RecaptchaVerifier is only supported in browser"))
                        }).catch(e => {
                            r(e)
                        })
                    })
                }
            }
            async function $e(e, t, n, r = !1) {
                const i = new Ke(e);
                let s;
                try {
                    s = await i.verify(n)
                } catch (e) {
                    s = await i.verify(n, !0)
                }
                var a = Object.assign({}, t);
                return r ? Object.assign(a, {
                    captchaResp: s
                }) : Object.assign(a, {
                    captchaResponse: s
                }), Object.assign(a, {
                    clientType: "CLIENT_TYPE_WEB"
                }), Object.assign(a, {
                    recaptchaVersion: "RECAPTCHA_ENTERPRISE"
                }), a
            }
            async function Je(n, r, i, s) {
                if (null !== (e = n._getRecaptchaConfig()) && void 0 !== e && e.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")) {
                    var e = await $e(n, r, i, "getOobCode" === i);
                    return s(n, e)
                }
                return s(n, r).catch(async e => {
                    if ("auth/missing-recaptcha-token" !== e.code) return Promise.reject(e);
                    console.log(`${i} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);
                    var t = await $e(n, r, i, "getOobCode" === i);
                    return s(n, t)
                })
            }

            function Ye(e, t, n) {
                const r = We(e);
                B(r._canInitEmulator, r, "emulator-config-failed"), B(/^https?:\/\//.test(t), r, "invalid-emulator-scheme");
                var i = !(null == n || !n.disableWarnings);
                const s = Xe(t);
                var {
                    host: a,
                    port: o
                } = function(e) {
                    const t = Xe(e),
                        n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
                    if (!n) return {
                        host: "",
                        port: null
                    };
                    const r = n[2].split("@").pop() || "",
                        i = /^(\[[^\]]+\])(:|$)/.exec(r); {
                        if (i) {
                            var s = i[1];
                            return {
                                host: s,
                                port: Qe(r.substr(s.length + 1))
                            }
                        }
                        var [a, s] = r.split(":");
                        return {
                            host: a,
                            port: Qe(s)
                        }
                    }
                }(t);
                r.config.emulator = {
                    url: `${s}//${a}${null===o?"":`:${o}`}/`
                }, r.settings.appVerificationDisabledForTesting = !0, r.emulatorConfig = Object.freeze({
                    host: a,
                    port: o,
                    protocol: s.replace(":", ""),
                    options: Object.freeze({
                        disableWarnings: i
                    })
                }), i || function() {
                    function e() {
                        const e = document.createElement("p"),
                            t = e.style;
                        e.innerText = "Running in emulator mode. Do not use with production credentials.", t.position = "fixed", t.width = "100%", t.backgroundColor = "#ffffff", t.border = ".1em solid #000000", t.color = "#b50000", t.bottom = "0px", t.left = "0px", t.margin = "0px", t.zIndex = "10000", t.textAlign = "center", e.classList.add("firebase-emulator-warning"), document.body.appendChild(e)
                    }
                    "undefined" != typeof console && "function" == typeof console.info && console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
                    "undefined" != typeof window && "undefined" != typeof document && ("loading" === document.readyState ? window.addEventListener("DOMContentLoaded", e) : e())
                }()
            }

            function Xe(e) {
                var t = e.indexOf(":");
                return t < 0 ? "" : e.substr(0, t + 1)
            }

            function Qe(e) {
                if (!e) return null;
                var t = Number(e);
                return isNaN(t) ? null : t
            }
            class Ze {
                constructor(e, t) {
                    this.providerId = e, this.signInMethod = t
                }
                toJSON() {
                    return G("not implemented")
                }
                _getIdTokenResponse(e) {
                    return G("not implemented")
                }
                _linkToIdToken(e, t) {
                    return G("not implemented")
                }
                _getReauthenticationResolver(e) {
                    return G("not implemented")
                }
            }
            async function et(e, t) {
                return re(e, "POST", "/v1/accounts:resetPassword", ne(e, t))
            }
            async function tt(e, t) {
                return re(e, "POST", "/v1/accounts:signUp", t)
            }
            async function nt(e, t) {
                return se(e, "POST", "/v1/accounts:signInWithPassword", ne(e, t))
            }
            async function rt(e, t) {
                return re(e, "POST", "/v1/accounts:sendOobCode", ne(e, t))
            }
            async function it(e, t) {
                return rt(e, t)
            }
            async function st(e, t) {
                return rt(e, t)
            }
            class at extends Ze {
                constructor(e, t, n, r = null) {
                    super("password", n), this._email = e, this._password = t, this._tenantId = r
                }
                static _fromEmailAndPassword(e, t) {
                    return new at(e, t, "password")
                }
                static _fromEmailAndCode(e, t, n = null) {
                    return new at(e, t, "emailLink", n)
                }
                toJSON() {
                    return {
                        email: this._email,
                        password: this._password,
                        signInMethod: this.signInMethod,
                        tenantId: this._tenantId
                    }
                }
                static fromJSON(e) {
                    var t = "string" == typeof e ? JSON.parse(e) : e;
                    if (null != t && t.email && null != t && t.password) {
                        if ("password" === t.signInMethod) return this._fromEmailAndPassword(t.email, t.password);
                        if ("emailLink" === t.signInMethod) return this._fromEmailAndCode(t.email, t.password, t.tenantId)
                    }
                    return null
                }
                async _getIdTokenResponse(e) {
                    switch (this.signInMethod) {
                        case "password":
                            return Je(e, {
                                returnSecureToken: !0,
                                email: this._email,
                                password: this._password,
                                clientType: "CLIENT_TYPE_WEB"
                            }, "signInWithPassword", nt);
                        case "emailLink":
                            return async function(e, t) {
                                return se(e, "POST", "/v1/accounts:signInWithEmailLink", ne(e, t))
                            }(e, {
                                email: this._email,
                                oobCode: this._password
                            });
                        default:
                            j(e, "internal-error")
                    }
                }
                async _linkToIdToken(e, t) {
                    switch (this.signInMethod) {
                        case "password":
                            return Je(e, {
                                idToken: t,
                                returnSecureToken: !0,
                                email: this._email,
                                password: this._password,
                                clientType: "CLIENT_TYPE_WEB"
                            }, "signUpPassword", tt);
                        case "emailLink":
                            return async function(e, t) {
                                return se(e, "POST", "/v1/accounts:signInWithEmailLink", ne(e, t))
                            }(e, {
                                idToken: t,
                                email: this._email,
                                oobCode: this._password
                            });
                        default:
                            j(e, "internal-error")
                    }
                }
                _getReauthenticationResolver(e) {
                    return this._getIdTokenResponse(e)
                }
            }
            async function ot(e, t) {
                return se(e, "POST", "/v1/accounts:signInWithIdp", ne(e, t))
            }
            class ct extends Ze {
                constructor() {
                    super(...arguments), this.pendingToken = null
                }
                static _fromParams(e) {
                    const t = new ct(e.providerId, e.signInMethod);
                    return e.idToken || e.accessToken ? (e.idToken && (t.idToken = e.idToken), e.accessToken && (t.accessToken = e.accessToken), e.nonce && !e.pendingToken && (t.nonce = e.nonce), e.pendingToken && (t.pendingToken = e.pendingToken)) : e.oauthToken && e.oauthTokenSecret ? (t.accessToken = e.oauthToken, t.secret = e.oauthTokenSecret) : j("argument-error"), t
                }
                toJSON() {
                    return {
                        idToken: this.idToken,
                        accessToken: this.accessToken,
                        secret: this.secret,
                        nonce: this.nonce,
                        pendingToken: this.pendingToken,
                        providerId: this.providerId,
                        signInMethod: this.signInMethod
                    }
                }
                static fromJSON(e) {
                    var t = "string" == typeof e ? JSON.parse(e) : e,
                        {
                            providerId: n,
                            signInMethod: r
                        } = t,
                        t = C(t, ["providerId", "signInMethod"]);
                    if (!n || !r) return null;
                    const i = new ct(n, r);
                    return i.idToken = t.idToken || void 0, i.accessToken = t.accessToken || void 0, i.secret = t.secret, i.nonce = t.nonce, i.pendingToken = t.pendingToken || null, i
                }
                _getIdTokenResponse(e) {
                    return ot(e, this.buildRequest())
                }
                _linkToIdToken(e, t) {
                    const n = this.buildRequest();
                    return n.idToken = t, ot(e, n)
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return t.autoCreate = !1, ot(e, t)
                }
                buildRequest() {
                    const e = {
                        requestUri: "http://localhost",
                        returnSecureToken: !0
                    };
                    if (this.pendingToken) e.pendingToken = this.pendingToken;
                    else {
                        const t = {};
                        this.idToken && (t.id_token = this.idToken), this.accessToken && (t.access_token = this.accessToken), this.secret && (t.oauth_token_secret = this.secret), t.providerId = this.providerId, this.nonce && !this.pendingToken && (t.nonce = this.nonce), e.postBody = I(t)
                    }
                    return e
                }
            }
            const lt = {
                USER_NOT_FOUND: "user-not-found"
            };
            class dt extends Ze {
                constructor(e) {
                    super("phone", "phone"), this.params = e
                }
                static _fromVerification(e, t) {
                    return new dt({
                        verificationId: e,
                        verificationCode: t
                    })
                }
                static _fromTokenResponse(e, t) {
                    return new dt({
                        phoneNumber: e,
                        temporaryProof: t
                    })
                }
                _getIdTokenResponse(e) {
                    return async function(e, t) {
                        return se(e, "POST", "/v1/accounts:signInWithPhoneNumber", ne(e, t))
                    }(e, this._makeVerificationRequest())
                }
                _linkToIdToken(e, t) {
                    return async function(e, t) {
                        var n = await se(e, "POST", "/v1/accounts:signInWithPhoneNumber", ne(e, t));
                        if (n.temporaryProof) throw ce(e, "account-exists-with-different-credential", n);
                        return n
                    }(e, Object.assign({
                        idToken: t
                    }, this._makeVerificationRequest()))
                }
                _getReauthenticationResolver(e) {
                    return async function(e, t) {
                        return se(e, "POST", "/v1/accounts:signInWithPhoneNumber", ne(e, Object.assign(Object.assign({}, t), {
                            operation: "REAUTH"
                        })), lt)
                    }(e, this._makeVerificationRequest())
                }
                _makeVerificationRequest() {
                    var {
                        temporaryProof: e,
                        phoneNumber: t,
                        verificationId: n,
                        verificationCode: r
                    } = this.params;
                    return e && t ? {
                        temporaryProof: e,
                        phoneNumber: t
                    } : {
                        sessionInfo: n,
                        code: r
                    }
                }
                toJSON() {
                    const e = {
                        providerId: this.providerId
                    };
                    return this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber), this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof), this.params.verificationCode && (e.verificationCode = this.params.verificationCode), this.params.verificationId && (e.verificationId = this.params.verificationId), e
                }
                static fromJSON(e) {
                    var {
                        verificationId: t,
                        verificationCode: n,
                        phoneNumber: r,
                        temporaryProof: i
                    } = e = "string" == typeof e ? JSON.parse(e) : e;
                    return n || t || r || i ? new dt({
                        verificationId: t,
                        verificationCode: n,
                        phoneNumber: r,
                        temporaryProof: i
                    }) : null
                }
            }
            class ut {
                constructor(e) {
                    var t = w(T(e)),
                        n = null !== (r = t.apiKey) && void 0 !== r ? r : null,
                        r = null !== (i = t.oobCode) && void 0 !== i ? i : null,
                        i = function(e) {
                            switch (e) {
                                case "recoverEmail":
                                    return "RECOVER_EMAIL";
                                case "resetPassword":
                                    return "PASSWORD_RESET";
                                case "signIn":
                                    return "EMAIL_SIGNIN";
                                case "verifyEmail":
                                    return "VERIFY_EMAIL";
                                case "verifyAndChangeEmail":
                                    return "VERIFY_AND_CHANGE_EMAIL";
                                case "revertSecondFactorAddition":
                                    return "REVERT_SECOND_FACTOR_ADDITION";
                                default:
                                    return null
                            }
                        }(null !== (i = t.mode) && void 0 !== i ? i : null);
                    B(n && r && i, "argument-error"), this.apiKey = n, this.operation = i, this.code = r, this.continueUrl = null !== (r = t.continueUrl) && void 0 !== r ? r : null, this.languageCode = null !== (r = t.languageCode) && void 0 !== r ? r : null, this.tenantId = null !== (t = t.tenantId) && void 0 !== t ? t : null
                }
                static parseLink(e) {
                    var t, n, r, t = (t = w(T(e = e)).link, n = t ? w(T(t)).deep_link_id : null, ((r = w(T(e)).deep_link_id) ? w(T(r)).link : null) || r || n || t || e);
                    try {
                        return new ut(t)
                    } catch (e) {
                        return null
                    }
                }
            }
            class ht {
                constructor() {
                    this.providerId = ht.PROVIDER_ID
                }
                static credential(e, t) {
                    return at._fromEmailAndPassword(e, t)
                }
                static credentialWithLink(e, t) {
                    var n = ut.parseLink(t);
                    return B(n, "argument-error"), at._fromEmailAndCode(e, n.code, n.tenantId)
                }
            }
            ht.PROVIDER_ID = "password", ht.EMAIL_PASSWORD_SIGN_IN_METHOD = "password", ht.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
            class pt {
                constructor(e) {
                    this.providerId = e, this.defaultLanguageCode = null, this.customParameters = {}
                }
                setDefaultLanguage(e) {
                    this.defaultLanguageCode = e
                }
                setCustomParameters(e) {
                    return this.customParameters = e, this
                }
                getCustomParameters() {
                    return this.customParameters
                }
            }
            class ft extends pt {
                constructor() {
                    super(...arguments), this.scopes = []
                }
                addScope(e) {
                    return this.scopes.includes(e) || this.scopes.push(e), this
                }
                getScopes() {
                    return [...this.scopes]
                }
            }
            class mt extends ft {
                static credentialFromJSON(e) {
                    var t = "string" == typeof e ? JSON.parse(e) : e;
                    return B("providerId" in t && "signInMethod" in t, "argument-error"), ct._fromParams(t)
                }
                credential(e) {
                    return this._credential(Object.assign(Object.assign({}, e), {
                        nonce: e.rawNonce
                    }))
                }
                _credential(e) {
                    return B(e.idToken || e.accessToken, "argument-error"), ct._fromParams(Object.assign(Object.assign({}, e), {
                        providerId: this.providerId,
                        signInMethod: this.providerId
                    }))
                }
                static credentialFromResult(e) {
                    return mt.oauthCredentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return mt.oauthCredentialFromTaggedObject(e.customData || {})
                }
                static oauthCredentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        oauthIdToken: t,
                        oauthAccessToken: n,
                        oauthTokenSecret: r,
                        pendingToken: i,
                        nonce: s,
                        providerId: a
                    } = e;
                    if (!(n || r || t || i)) return null;
                    if (!a) return null;
                    try {
                        return new mt(a)._credential({
                            idToken: t,
                            accessToken: n,
                            nonce: s,
                            pendingToken: i
                        })
                    } catch (e) {
                        return null
                    }
                }
            }
            class vt extends ft {
                constructor() {
                    super("facebook.com")
                }
                static credential(e) {
                    return ct._fromParams({
                        providerId: vt.PROVIDER_ID,
                        signInMethod: vt.FACEBOOK_SIGN_IN_METHOD,
                        accessToken: e
                    })
                }
                static credentialFromResult(e) {
                    return vt.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return vt.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!(e && "oauthAccessToken" in e)) return null;
                    if (!e.oauthAccessToken) return null;
                    try {
                        return vt.credential(e.oauthAccessToken)
                    } catch (e) {
                        return null
                    }
                }
            }
            vt.FACEBOOK_SIGN_IN_METHOD = "facebook.com", vt.PROVIDER_ID = "facebook.com";
            class gt extends ft {
                constructor() {
                    super("google.com"), this.addScope("profile")
                }
                static credential(e, t) {
                    return ct._fromParams({
                        providerId: gt.PROVIDER_ID,
                        signInMethod: gt.GOOGLE_SIGN_IN_METHOD,
                        idToken: e,
                        accessToken: t
                    })
                }
                static credentialFromResult(e) {
                    return gt.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return gt.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        oauthIdToken: t,
                        oauthAccessToken: n
                    } = e;
                    if (!t && !n) return null;
                    try {
                        return gt.credential(t, n)
                    } catch (e) {
                        return null
                    }
                }
            }
            gt.GOOGLE_SIGN_IN_METHOD = "google.com", gt.PROVIDER_ID = "google.com";
            class _t extends ft {
                constructor() {
                    super("github.com")
                }
                static credential(e) {
                    return ct._fromParams({
                        providerId: _t.PROVIDER_ID,
                        signInMethod: _t.GITHUB_SIGN_IN_METHOD,
                        accessToken: e
                    })
                }
                static credentialFromResult(e) {
                    return _t.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return _t.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!(e && "oauthAccessToken" in e)) return null;
                    if (!e.oauthAccessToken) return null;
                    try {
                        return _t.credential(e.oauthAccessToken)
                    } catch (e) {
                        return null
                    }
                }
            }
            _t.GITHUB_SIGN_IN_METHOD = "github.com", _t.PROVIDER_ID = "github.com";
            class yt extends Ze {
                constructor(e, t) {
                    super(e, e), this.pendingToken = t
                }
                _getIdTokenResponse(e) {
                    return ot(e, this.buildRequest())
                }
                _linkToIdToken(e, t) {
                    const n = this.buildRequest();
                    return n.idToken = t, ot(e, n)
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return t.autoCreate = !1, ot(e, t)
                }
                toJSON() {
                    return {
                        signInMethod: this.signInMethod,
                        providerId: this.providerId,
                        pendingToken: this.pendingToken
                    }
                }
                static fromJSON(e) {
                    var {
                        providerId: t,
                        signInMethod: n,
                        pendingToken: r
                    } = "string" == typeof e ? JSON.parse(e) : e;
                    return t && n && r && t === n ? new yt(t, r) : null
                }
                static _create(e, t) {
                    return new yt(e, t)
                }
                buildRequest() {
                    return {
                        requestUri: "http://localhost",
                        returnSecureToken: !0,
                        pendingToken: this.pendingToken
                    }
                }
            }
            class It extends pt {
                constructor(e) {
                    B(e.startsWith("saml."), "argument-error"), super(e)
                }
                static credentialFromResult(e) {
                    return It.samlCredentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return It.samlCredentialFromTaggedObject(e.customData || {})
                }
                static credentialFromJSON(e) {
                    var t = yt.fromJSON(e);
                    return B(t, "argument-error"), t
                }
                static samlCredentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        pendingToken: t,
                        providerId: n
                    } = e;
                    if (!t || !n) return null;
                    try {
                        return yt._create(n, t)
                    } catch (e) {
                        return null
                    }
                }
            }
            class wt extends ft {
                constructor() {
                    super("twitter.com")
                }
                static credential(e, t) {
                    return ct._fromParams({
                        providerId: wt.PROVIDER_ID,
                        signInMethod: wt.TWITTER_SIGN_IN_METHOD,
                        oauthToken: e,
                        oauthTokenSecret: t
                    })
                }
                static credentialFromResult(e) {
                    return wt.credentialFromTaggedObject(e)
                }
                static credentialFromError(e) {
                    return wt.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        oauthAccessToken: t,
                        oauthTokenSecret: n
                    } = e;
                    if (!t || !n) return null;
                    try {
                        return wt.credential(t, n)
                    } catch (e) {
                        return null
                    }
                }
            }
            async function Tt(e, t) {
                return se(e, "POST", "/v1/accounts:signUp", ne(e, t))
            }
            wt.TWITTER_SIGN_IN_METHOD = "twitter.com", wt.PROVIDER_ID = "twitter.com";
            class Et {
                constructor(e) {
                    this.user = e.user, this.providerId = e.providerId, this._tokenResponse = e._tokenResponse, this.operationType = e.operationType
                }
                static async _fromIdTokenResponse(e, t, n, r = !1) {
                    var i = await we._fromIdTokenResponse(e, n, r),
                        s = bt(n);
                    return new Et({
                        user: i,
                        providerId: s,
                        _tokenResponse: n,
                        operationType: t
                    })
                }
                static async _forOperation(e, t, n) {
                    await e._updateTokensIfNecessary(n, !0);
                    var r = bt(n);
                    return new Et({
                        user: e,
                        providerId: r,
                        _tokenResponse: n,
                        operationType: t
                    })
                }
            }

            function bt(e) {
                return e.providerId || ("phoneNumber" in e ? "phone" : null)
            }
            class kt extends g {
                constructor(e, t, n, r) {
                    var i;
                    super(t.code, t.message), this.operationType = n, this.user = r, Object.setPrototypeOf(this, kt.prototype), this.customData = {
                        appName: e.name,
                        tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
                        _serverResponse: t.customData._serverResponse,
                        operationType: n
                    }
                }
                static _fromErrorAndOperation(e, t, n, r) {
                    return new kt(e, t, n, r)
                }
            }

            function St(t, n, e, r) {
                const i = "reauthenticate" === n ? e._getReauthenticationResolver(t) : e._getIdTokenResponse(t);
                return i.catch(e => {
                    if ("auth/multi-factor-auth-required" === e.code) throw kt._fromErrorAndOperation(t, e, n, r);
                    throw e
                })
            }

            function Rt(e) {
                return new Set(e.map(({
                    providerId: e
                }) => e).filter(e => !!e))
            }
            async function At(e, t) {
                const n = k(e);
                await Ct(!0, n, t);
                var r = (e = n.auth, t = {
                    idToken: await n.getIdToken(),
                    deleteProvider: [t]
                }, await re(e, "POST", "/v1/accounts:update", t))["providerUserInfo"];
                const i = Rt(r || []);
                return n.providerData = n.providerData.filter(e => i.has(e.providerId)), i.has("phone") || (n.phoneNumber = null), await n.auth._persistUserIfCurrent(n), n
            }
            async function Pt(e, t, n = !1) {
                var r = await me(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
                return Et._forOperation(e, "link", r)
            }
            async function Ct(e, t, n) {
                await _e(t);
                const r = Rt(t.providerData);
                var i = !1 === e ? "provider-already-linked" : "no-such-provider";
                B(r.has(n) === e, t.auth, i)
            }
            async function Ot(e, t, n = !1) {
                var r = e["auth"],
                    i = "reauthenticate";
                try {
                    var s = await me(e, St(r, i, t, e), n);
                    B(s.idToken, r, "internal-error");
                    var a = fe(s.idToken);
                    B(a, r, "internal-error");
                    var o = a["sub"];
                    return B(e.uid === o, r, "user-mismatch"), Et._forOperation(e, i, s)
                } catch (e) {
                    throw "auth/user-not-found" === (null == e ? void 0 : e.code) && j(r, "user-mismatch"), e
                }
            }
            async function Nt(e, t, n = !1) {
                var r = await St(e, "signIn", t),
                    r = await Et._fromIdTokenResponse(e, "signIn", r);
                return n || await e._updateCurrentUser(r.user), r
            }
            async function Lt(e, t) {
                return Nt(We(e), t)
            }
            async function Dt(e, t) {
                var n = k(e);
                return await Ct(!1, n, t.providerId), Pt(n, t)
            }
            async function Mt(e, t) {
                return Ot(k(e), t)
            }
            async function Ut(e, t) {
                const n = We(e);
                var r = await se(n, "POST", "/v1/accounts:signInWithCustomToken", ne(n, {
                        token: t,
                        returnSecureToken: !0
                    })),
                    r = await Et._fromIdTokenResponse(n, "signIn", r);
                return await n._updateCurrentUser(r.user), r
            }
            class Ft {
                constructor(e, t) {
                    this.factorId = e, this.uid = t.mfaEnrollmentId, this.enrollmentTime = new Date(t.enrolledAt).toUTCString(), this.displayName = t.displayName
                }
                static _fromServerResponse(e, t) {
                    return "phoneInfo" in t ? Vt._fromServerResponse(e, t) : "totpInfo" in t ? xt._fromServerResponse(e, t) : j(e, "internal-error")
                }
            }
            class Vt extends Ft {
                constructor(e) {
                    super("phone", e), this.phoneNumber = e.phoneInfo
                }
                static _fromServerResponse(e, t) {
                    return new Vt(t)
                }
            }
            class xt extends Ft {
                constructor(e) {
                    super("totp", e)
                }
                static _fromServerResponse(e, t) {
                    return new xt(t)
                }
            }

            function jt(e, t, n) {
                var r;
                B(0 < (null === (r = n.url) || void 0 === r ? void 0 : r.length), e, "invalid-continue-uri"), B(void 0 === n.dynamicLinkDomain || 0 < n.dynamicLinkDomain.length, e, "invalid-dynamic-link-domain"), t.continueUrl = n.url, t.dynamicLinkDomain = n.dynamicLinkDomain, t.canHandleCodeInApp = n.handleCodeInApp, n.iOS && (B(0 < n.iOS.bundleId.length, e, "missing-ios-bundle-id"), t.iOSBundleId = n.iOS.bundleId), n.android && (B(0 < n.android.packageName.length, e, "missing-android-pkg-name"), t.androidInstallApp = n.android.installApp, t.androidMinimumVersionCode = n.android.minimumVersion, t.androidPackageName = n.android.packageName)
            }
            async function Ht(e) {
                const t = We(e);
                t._getPasswordPolicyInternal() && await t._updatePasswordPolicy()
            }
            async function Wt(e, t) {
                await re(e = k(e), "POST", "/v1/accounts:update", ne(e, {
                    oobCode: t
                }))
            }
            async function qt(e, t) {
                var n = k(e),
                    r = await et(n, {
                        oobCode: t
                    }),
                    i = r.requestType;
                switch (B(i, n, "internal-error"), i) {
                    case "EMAIL_SIGNIN":
                        break;
                    case "VERIFY_AND_CHANGE_EMAIL":
                        B(r.newEmail, n, "internal-error");
                        break;
                    case "REVERT_SECOND_FACTOR_ADDITION":
                        B(r.mfaInfo, n, "internal-error");
                    default:
                        B(r.email, n, "internal-error")
                }
                let s = null;
                return r.mfaInfo && (s = Ft._fromServerResponse(We(n), r.mfaInfo)), {
                    data: {
                        email: ("VERIFY_AND_CHANGE_EMAIL" === r.requestType ? r.newEmail : r.email) || null,
                        previousEmail: ("VERIFY_AND_CHANGE_EMAIL" === r.requestType ? r.email : r.newEmail) || null,
                        multiFactorInfo: s
                    },
                    operation: i
                }
            }
            async function zt(e, t) {
                var n = J() ? $() : "http://localhost",
                    n = (await re(e = k(e), "POST", "/v1/accounts:createAuthUri", ne(e, {
                        identifier: t,
                        continueUri: n
                    })))["signinMethods"];
                return n || []
            }
            async function Bt(e, t) {
                var n = k(e),
                    r = {
                        requestType: "VERIFY_EMAIL",
                        idToken: await e.getIdToken()
                    };
                t && jt(n.auth, r, t);
                var r = (await rt(n.auth, r))["email"];
                r !== e.email && await e.reload()
            }
            async function Gt(e, t, n) {
                var r = k(e),
                    i = {
                        requestType: "VERIFY_AND_CHANGE_EMAIL",
                        idToken: await e.getIdToken(),
                        newEmail: t
                    };
                n && jt(r.auth, i, n);
                var i = (await rt(r.auth, i))["email"];
                i !== e.email && await e.reload()
            }
            async function Kt(e, {
                displayName: t,
                photoURL: n
            }) {
                if (void 0 !== t || void 0 !== n) {
                    const i = k(e);
                    var r = await i.getIdToken(),
                        r = await me(i, async function(e, t) {
                            return re(e, "POST", "/v1/accounts:update", t)
                        }(i.auth, {
                            idToken: r,
                            displayName: t,
                            photoUrl: n,
                            returnSecureToken: !0
                        }));
                    i.displayName = r.displayName || null, i.photoURL = r.photoUrl || null;
                    const s = i.providerData.find(({
                        providerId: e
                    }) => "password" === e);
                    s && (s.displayName = i.displayName, s.photoURL = i.photoURL), await i._updateTokensIfNecessary(r)
                }
            }
            async function $t(e, t, n) {
                var r = e["auth"];
                const i = {
                    idToken: await e.getIdToken(),
                    returnSecureToken: !0
                };
                t && (i.email = t), n && (i.password = n);
                r = await me(e, async function(e, t) {
                    return re(e, "POST", "/v1/accounts:update", t)
                }(r, i));
                await e._updateTokensIfNecessary(r, !0)
            }
            class Jt {
                constructor(e, t, n = {}) {
                    this.isNewUser = e, this.providerId = t, this.profile = n
                }
            }
            class Yt extends Jt {
                constructor(e, t, n, r) {
                    super(e, t, n), this.username = r
                }
            }
            class Xt extends Jt {
                constructor(e, t) {
                    super(e, "facebook.com", t)
                }
            }
            class Qt extends Yt {
                constructor(e, t) {
                    super(e, "github.com", t, "string" == typeof(null == t ? void 0 : t.login) ? null == t ? void 0 : t.login : null)
                }
            }
            class Zt extends Jt {
                constructor(e, t) {
                    super(e, "google.com", t)
                }
            }
            class en extends Yt {
                constructor(e, t, n) {
                    super(e, "twitter.com", t, n)
                }
            }

            function tn(e) {
                var {
                    user: t,
                    _tokenResponse: n
                } = e;
                return t.isAnonymous && !n ? {
                    providerId: null,
                    isNewUser: !1,
                    profile: null
                } : function(e) {
                    if (!e) return null;
                    var t = e["providerId"],
                        n = e.rawUserInfo ? JSON.parse(e.rawUserInfo) : {},
                        r = e.isNewUser || "identitytoolkit#SignupNewUserResponse" === e.kind;
                    if (!t && null != e && e.idToken) {
                        var i = null === (i = null === (i = fe(e.idToken)) || void 0 === i ? void 0 : i.firebase) || void 0 === i ? void 0 : i.sign_in_provider;
                        if (i) {
                            i = "anonymous" !== i && "custom" !== i ? i : null;
                            return new Jt(r, i)
                        }
                    }
                    if (!t) return null;
                    switch (t) {
                        case "facebook.com":
                            return new Xt(r, n);
                        case "github.com":
                            return new Qt(r, n);
                        case "google.com":
                            return new Zt(r, n);
                        case "twitter.com":
                            return new en(r, n, e.screenName || null);
                        case "custom":
                        case "anonymous":
                            return new Jt(r, null);
                        default:
                            return new Jt(r, t, n)
                    }
                }(n)
            }
            class nn {
                constructor(e, t, n) {
                    this.type = e, this.credential = t, this.user = n
                }
                static _fromIdtoken(e, t) {
                    return new nn("enroll", e, t)
                }
                static _fromMfaPendingCredential(e) {
                    return new nn("signin", e)
                }
                toJSON() {
                    return {
                        multiFactorSession: {
                            ["enroll" === this.type ? "idToken" : "pendingCredential"]: this.credential
                        }
                    }
                }
                static fromJSON(e) {
                    var t;
                    if (null != e && e.multiFactorSession) {
                        if (null !== (t = e.multiFactorSession) && void 0 !== t && t.pendingCredential) return nn._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);
                        if (null !== (t = e.multiFactorSession) && void 0 !== t && t.idToken) return nn._fromIdtoken(e.multiFactorSession.idToken)
                    }
                    return null
                }
            }
            class rn {
                constructor(e, t, n) {
                    this.session = e, this.hints = t, this.signInResolver = n
                }
                static _fromError(e, i) {
                    const s = We(e),
                        a = i.customData._serverResponse;
                    var t = (a.mfaInfo || []).map(e => Ft._fromServerResponse(s, e));
                    B(a.mfaPendingCredential, s, "internal-error");
                    const o = nn._fromMfaPendingCredential(a.mfaPendingCredential);
                    return new rn(o, t, async e => {
                        var t = await e._process(s, o);
                        delete a.mfaInfo, delete a.mfaPendingCredential;
                        var n = Object.assign(Object.assign({}, a), {
                            idToken: t.idToken,
                            refreshToken: t.refreshToken
                        });
                        switch (i.operationType) {
                            case "signIn":
                                var r = await Et._fromIdTokenResponse(s, i.operationType, n);
                                return await s._updateCurrentUser(r.user), r;
                            case "reauthenticate":
                                return B(i.user, s, "internal-error"), Et._forOperation(i.user, i.operationType, n);
                            default:
                                j(s, "internal-error")
                        }
                    })
                }
                async resolveSignIn(e) {
                    return this.signInResolver(e)
                }
            }
            class sn {
                constructor(t) {
                    this.user = t, this.enrolledFactors = [], t._onReload(e => {
                        e.mfaInfo && (this.enrolledFactors = e.mfaInfo.map(e => Ft._fromServerResponse(t.auth, e)))
                    })
                }
                static _fromUser(e) {
                    return new sn(e)
                }
                async getSession() {
                    return nn._fromIdtoken(await this.user.getIdToken(), this.user)
                }
                async enroll(e, t) {
                    const n = e;
                    var r = await this.getSession(),
                        r = await me(this.user, n._process(this.user.auth, r, t));
                    return await this.user._updateTokensIfNecessary(r), this.user.reload()
                }
                async unenroll(e) {
                    const t = "string" == typeof e ? e : e.uid;
                    var n, r, i = await this.user.getIdToken();
                    try {
                        var s = await me(this.user, (n = this.user.auth, r = {
                            idToken: i,
                            mfaEnrollmentId: t
                        }, re(n, "POST", "/v2/accounts/mfaEnrollment:withdraw", ne(n, r))));
                        this.enrolledFactors = this.enrolledFactors.filter(({
                            uid: e
                        }) => e !== t), await this.user._updateTokensIfNecessary(s), await this.user.reload()
                    } catch (e) {
                        throw e
                    }
                }
            }
            const an = new WeakMap;
            const on = "__sak";
            class cn {
                constructor(e, t) {
                    this.storageRetriever = e, this.type = t
                }
                _isAvailable() {
                    try {
                        return this.storage ? (this.storage.setItem(on, "1"), this.storage.removeItem(on), Promise.resolve(!0)) : Promise.resolve(!1)
                    } catch (e) {
                        return Promise.resolve(!1)
                    }
                }
                _set(e, t) {
                    return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve()
                }
                _get(e) {
                    var t = this.storage.getItem(e);
                    return Promise.resolve(t ? JSON.parse(t) : null)
                }
                _remove(e) {
                    return this.storage.removeItem(e), Promise.resolve()
                }
                get storage() {
                    return this.storageRetriever()
                }
            }
            class ln extends cn {
                constructor() {
                    var e;
                    super(() => window.localStorage, "LOCAL"), this.boundEventHandler = (e, t) => this.onStorageEvent(e, t), this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.safariLocalStorageNotSynced = (Ce(e = u()) || Ue(e)) && function() {
                        try {
                            return !(!window || window === window.top)
                        } catch (e) {
                            return !1
                        }
                    }(), this.fallbackToPolling = Fe(), this._shouldAllowMigration = !0
                }
                forAllChangedKeys(e) {
                    for (const r of Object.keys(this.listeners)) {
                        var t = this.storage.getItem(r),
                            n = this.localCache[r];
                        t !== n && e(r, n, t)
                    }
                }
                onStorageEvent(e, t = !1) {
                    if (e.key) {
                        const r = e.key;
                        if (t ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced) {
                            const i = this.storage.getItem(r);
                            if (e.newValue !== i) null !== e.newValue ? this.storage.setItem(r, e.newValue) : this.storage.removeItem(r);
                            else if (this.localCache[r] === e.newValue && !t) return
                        }
                        var n = () => {
                            var e = this.storage.getItem(r);
                            !t && this.localCache[r] === e || this.notifyListeners(r, e)
                        };
                        const i = this.storage.getItem(r);
                        m() && 10 === document.documentMode && i !== e.newValue && e.newValue !== e.oldValue ? setTimeout(n, 10) : n()
                    } else this.forAllChangedKeys((e, t, n) => {
                        this.notifyListeners(e, n)
                    })
                }
                notifyListeners(e, t) {
                    this.localCache[e] = t;
                    var n = this.listeners[e];
                    if (n)
                        for (const r of Array.from(n)) r(t && JSON.parse(t))
                }
                startPolling() {
                    this.stopPolling(), this.pollTimer = setInterval(() => {
                        this.forAllChangedKeys((e, t, n) => {
                            this.onStorageEvent(new StorageEvent("storage", {
                                key: e,
                                oldValue: t,
                                newValue: n
                            }), !0)
                        })
                    }, 1e3)
                }
                stopPolling() {
                    this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
                }
                attachListener() {
                    window.addEventListener("storage", this.boundEventHandler)
                }
                detachListener() {
                    window.removeEventListener("storage", this.boundEventHandler)
                }
                _addListener(e, t) {
                    0 === Object.keys(this.listeners).length && (this.fallbackToPolling ? this.startPolling() : this.attachListener()), this.listeners[e] || (this.listeners[e] = new Set, this.localCache[e] = this.storage.getItem(e)), this.listeners[e].add(t)
                }
                _removeListener(e, t) {
                    this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && (this.detachListener(), this.stopPolling())
                }
                async _set(e, t) {
                    await super._set(e, t), this.localCache[e] = JSON.stringify(t)
                }
                async _get(e) {
                    var t = await super._get(e);
                    return this.localCache[e] = JSON.stringify(t), t
                }
                async _remove(e) {
                    await super._remove(e), delete this.localCache[e]
                }
            }
            ln.type = "LOCAL";
            const dn = ln;
            class un extends cn {
                constructor() {
                    super(() => window.sessionStorage, "SESSION")
                }
                _addListener(e, t) {}
                _removeListener(e, t) {}
            }
            un.type = "SESSION";
            const hn = un;
            class pn {
                constructor(e) {
                    this.eventTarget = e, this.handlersMap = {}, this.boundEventHandler = this.handleEvent.bind(this)
                }
                static _getInstance(t) {
                    var e = this.receivers.find(e => e.isListeningto(t));
                    if (e) return e;
                    e = new pn(t);
                    return this.receivers.push(e), e
                }
                isListeningto(e) {
                    return this.eventTarget === e
                }
                async handleEvent(e) {
                    const t = e,
                        {
                            eventId: n,
                            eventType: r,
                            data: i
                        } = t.data;
                    var s = this.handlersMap[r];
                    null != s && s.size && (t.ports[0].postMessage({
                        status: "ack",
                        eventId: n,
                        eventType: r
                    }), s = Array.from(s).map(async e => e(t.origin, i)), s = await Promise.all(s.map(async e => {
                        try {
                            return {
                                fulfilled: !0,
                                value: await e
                            }
                        } catch (e) {
                            return {
                                fulfilled: !1,
                                reason: e
                            }
                        }
                    })), t.ports[0].postMessage({
                        status: "done",
                        eventId: n,
                        eventType: r,
                        response: s
                    }))
                }
                _subscribe(e, t) {
                    0 === Object.keys(this.handlersMap).length && this.eventTarget.addEventListener("message", this.boundEventHandler), this.handlersMap[e] || (this.handlersMap[e] = new Set), this.handlersMap[e].add(t)
                }
                _unsubscribe(e, t) {
                    this.handlersMap[e] && t && this.handlersMap[e].delete(t), t && 0 !== this.handlersMap[e].size || delete this.handlersMap[e], 0 === Object.keys(this.handlersMap).length && this.eventTarget.removeEventListener("message", this.boundEventHandler)
                }
            }

            function fn(e = "", t = 10) {
                let n = "";
                for (let r = 0; r < t; r++) n += Math.floor(10 * Math.random());
                return e + n
            }
            pn.receivers = [];
            class mn {
                constructor(e) {
                    this.target = e, this.handlers = new Set
                }
                removeMessageHandler(e) {
                    e.messageChannel && (e.messageChannel.port1.removeEventListener("message", e.onMessage), e.messageChannel.port1.close()), this.handlers.delete(e)
                }
                async _send(e, t, a = 50) {
                    const o = "undefined" != typeof MessageChannel ? new MessageChannel : null;
                    if (!o) throw new Error("connection_unavailable");
                    let c, l;
                    return new Promise((n, r) => {
                        const i = fn("", 20);
                        o.port1.start();
                        const s = setTimeout(() => {
                            r(new Error("unsupported_event"))
                        }, a);
                        l = {
                            messageChannel: o,
                            onMessage(e) {
                                var t = e;
                                if (t.data.eventId === i) switch (t.data.status) {
                                    case "ack":
                                        clearTimeout(s), c = setTimeout(() => {
                                            r(new Error("timeout"))
                                        }, 3e3);
                                        break;
                                    case "done":
                                        clearTimeout(c), n(t.data.response);
                                        break;
                                    default:
                                        clearTimeout(s), clearTimeout(c), r(new Error("invalid_response"))
                                }
                            }
                        }, this.handlers.add(l), o.port1.addEventListener("message", l.onMessage), this.target.postMessage({
                            eventType: e,
                            eventId: i,
                            data: t
                        }, [o.port2])
                    }).finally(() => {
                        l && this.removeMessageHandler(l)
                    })
                }
            }

            function vn() {
                return window
            }

            function gn() {
                return void 0 !== vn().WorkerGlobalScope && "function" == typeof vn().importScripts
            }
            const _n = "firebaseLocalStorageDb",
                yn = "firebaseLocalStorage",
                In = "fbase_key";
            class wn {
                constructor(e) {
                    this.request = e
                }
                toPromise() {
                    return new Promise((e, t) => {
                        this.request.addEventListener("success", () => {
                            e(this.request.result)
                        }), this.request.addEventListener("error", () => {
                            t(this.request.error)
                        })
                    })
                }
            }

            function Tn(e, t) {
                return e.transaction([yn], t ? "readwrite" : "readonly").objectStore(yn)
            }

            function En() {
                const r = indexedDB.open(_n, 1);
                return new Promise((n, t) => {
                    r.addEventListener("error", () => {
                        t(r.error)
                    }), r.addEventListener("upgradeneeded", () => {
                        const e = r.result;
                        try {
                            e.createObjectStore(yn, {
                                keyPath: In
                            })
                        } catch (e) {
                            t(e)
                        }
                    }), r.addEventListener("success", async () => {
                        const e = r.result;
                        var t;
                        e.objectStoreNames.contains(yn) ? n(e) : (e.close(), t = indexedDB.deleteDatabase(_n), await new wn(t).toPromise(), n(await En()))
                    })
                })
            }
            async function bn(e, t, n) {
                var r = Tn(e, !0).put({
                    fbase_key: t,
                    value: n
                });
                return new wn(r).toPromise()
            }

            function kn(e, t) {
                var n = Tn(e, !0).delete(t);
                return new wn(n).toPromise()
            }
            class Sn {
                constructor() {
                    this.type = "LOCAL", this._shouldAllowMigration = !0, this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.pendingWrites = 0, this.receiver = null, this.sender = null, this.serviceWorkerReceiverAvailable = !1, this.activeServiceWorker = null, this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {})
                }
                async _openDb() {
                    return this.db || (this.db = await En(), this.db)
                }
                async _withRetries(e) {
                    let t = 0;
                    for (;;) try {
                        return e(await this._openDb())
                    } catch (e) {
                        if (3 < t++) throw e;
                        this.db && (this.db.close(), this.db = void 0)
                    }
                }
                async initializeServiceWorkerMessaging() {
                    return gn() ? this.initializeReceiver() : this.initializeSender()
                }
                async initializeReceiver() {
                    this.receiver = pn._getInstance(gn() ? self : null), this.receiver._subscribe("keyChanged", async (e, t) => {
                        const n = await this._poll();
                        return {
                            keyProcessed: n.includes(t.key)
                        }
                    }), this.receiver._subscribe("ping", async (e, t) => ["keyChanged"])
                }
                async initializeSender() {
                    var e, t, n;
                    this.activeServiceWorker = await async function() {
                        if (null === navigator || void 0 === navigator || !navigator.serviceWorker) return null;
                        try {
                            return (await navigator.serviceWorker.ready).active
                        } catch (e) {
                            return null
                        }
                    }(), this.activeServiceWorker && (this.sender = new mn(this.activeServiceWorker), (n = await this.sender._send("ping", {}, 800)) && null !== (e = n[0]) && void 0 !== e && e.fulfilled && null !== (t = n[0]) && void 0 !== t && t.value.includes("keyChanged") && (this.serviceWorkerReceiverAvailable = !0))
                }
                async notifyServiceWorker(e) {
                    var t;
                    if (this.sender && this.activeServiceWorker && ((null === (t = null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker) || void 0 === t ? void 0 : t.controller) || null) === this.activeServiceWorker) try {
                        await this.sender._send("keyChanged", {
                            key: e
                        }, this.serviceWorkerReceiverAvailable ? 800 : 50)
                    } catch (e) {}
                }
                async _isAvailable() {
                    try {
                        if (!indexedDB) return !1;
                        var e = await En();
                        return await bn(e, on, "1"), await kn(e, on), !0
                    } catch (e) {}
                    return !1
                }
                async _withPendingWrite(e) {
                    this.pendingWrites++;
                    try {
                        await e()
                    } finally {
                        this.pendingWrites--
                    }
                }
                async _set(t, n) {
                    return this._withPendingWrite(async () => (await this._withRetries(e => bn(e, t, n)), this.localCache[t] = n, this.notifyServiceWorker(t)))
                }
                async _get(t) {
                    var e = await this._withRetries(e => async function(e, t) {
                        var n = Tn(e, !1).get(t);
                        return void 0 === (n = await new wn(n).toPromise()) ? null : n.value
                    }(e, t));
                    return this.localCache[t] = e
                }
                async _remove(t) {
                    return this._withPendingWrite(async () => (await this._withRetries(e => kn(e, t)), delete this.localCache[t], this.notifyServiceWorker(t)))
                }
                async _poll() {
                    var e = await this._withRetries(e => {
                        var t = Tn(e, !1).getAll();
                        return new wn(t).toPromise()
                    });
                    if (!e) return [];
                    if (0 !== this.pendingWrites) return [];
                    const t = [],
                        n = new Set;
                    if (0 !== e.length)
                        for (var {
                                fbase_key: r,
                                value: i
                            } of e) n.add(r), JSON.stringify(this.localCache[r]) !== JSON.stringify(i) && (this.notifyListeners(r, i), t.push(r));
                    for (const s of Object.keys(this.localCache)) this.localCache[s] && !n.has(s) && (this.notifyListeners(s, null), t.push(s));
                    return t
                }
                notifyListeners(e, t) {
                    this.localCache[e] = t;
                    var n = this.listeners[e];
                    if (n)
                        for (const r of Array.from(n)) r(t)
                }
                startPolling() {
                    this.stopPolling(), this.pollTimer = setInterval(async () => this._poll(), 800)
                }
                stopPolling() {
                    this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
                }
                _addListener(e, t) {
                    0 === Object.keys(this.listeners).length && this.startPolling(), this.listeners[e] || (this.listeners[e] = new Set, this._get(e)), this.listeners[e].add(t)
                }
                _removeListener(e, t) {
                    this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && this.stopPolling()
                }
            }
            Sn.type = "LOCAL";
            const Rn = Sn;
            class An {
                constructor(e) {
                    this.auth = e, this.counter = 1e12, this._widgets = new Map
                }
                render(e, t) {
                    var n = this.counter;
                    return this._widgets.set(n, new Pn(e, this.auth.name, t || {})), this.counter++, n
                }
                reset(e) {
                    var t, n = e || 1e12;
                    null === (t = this._widgets.get(n)) || void 0 === t || t.delete(), this._widgets.delete(n)
                }
                getResponse(e) {
                    var t;
                    return (null === (t = this._widgets.get(e || 1e12)) || void 0 === t ? void 0 : t.getResponse()) || ""
                }
                async execute(e) {
                    var t;
                    return null === (t = this._widgets.get(e || 1e12)) || void 0 === t || t.execute(), ""
                }
            }
            class Pn {
                constructor(e, t, n) {
                    this.params = n, this.timerId = null, this.deleted = !1, this.responseToken = null, this.clickHandler = () => {
                        this.execute()
                    };
                    var r = "string" == typeof e ? document.getElementById(e) : e;
                    B(r, "argument-error", {
                        appName: t
                    }), this.container = r, this.isVisible = "invisible" !== this.params.size, this.isVisible ? this.execute() : this.container.addEventListener("click", this.clickHandler)
                }
                getResponse() {
                    return this.checkIfDeleted(), this.responseToken
                }
                delete() {
                    this.checkIfDeleted(), this.deleted = !0, this.timerId && (clearTimeout(this.timerId), this.timerId = null), this.container.removeEventListener("click", this.clickHandler)
                }
                execute() {
                    this.checkIfDeleted(), this.timerId || (this.timerId = window.setTimeout(() => {
                        this.responseToken = function(e) {
                            const t = [],
                                n = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                            for (let r = 0; r < e; r++) t.push(n.charAt(Math.floor(Math.random() * n.length)));
                            return t.join("")
                        }(50);
                        const {
                            callback: e,
                            "expired-callback": t
                        } = this.params;
                        if (e) try {
                            e(this.responseToken)
                        } catch (e) {}
                        this.timerId = window.setTimeout(() => {
                            if (this.timerId = null, this.responseToken = null, t) try {
                                t()
                            } catch (e) {}
                            this.isVisible && this.execute()
                        }, 6e4)
                    }, 500))
                }
                checkIfDeleted() {
                    if (this.deleted) throw new Error("reCAPTCHA mock was already deleted!")
                }
            }
            const Cn = Ge("rcb"),
                On = new X(3e4, 6e4);
            class Nn {
                constructor() {
                    var e;
                    this.hostLanguage = "", this.counter = 0, this.librarySeparatelyLoaded = !(null === (e = vn().grecaptcha) || void 0 === e || !e.render)
                }
                load(s, a = "") {
                    var e;
                    return B((e = a).length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(e), s, "argument-error"), this.shouldResolveImmediately(a) && le(vn().grecaptcha) ? Promise.resolve(vn().grecaptcha) : new Promise((t, n) => {
                        const i = vn().setTimeout(() => {
                            n(H(s, "network-request-failed"))
                        }, On.get());
                        vn()[Cn] = () => {
                            vn().clearTimeout(i), delete vn()[Cn];
                            const e = vn().grecaptcha;
                            if (e && le(e)) {
                                const r = e.render;
                                e.render = (e, t) => {
                                    var n = r(e, t);
                                    return this.counter++, n
                                }, this.hostLanguage = a, t(e)
                            } else n(H(s, "internal-error"))
                        }, Be(`${ze.recaptchaV2Script}?${I({onload:Cn,render:"explicit",hl:a})}`).catch(() => {
                            clearTimeout(i), n(H(s, "internal-error"))
                        })
                    })
                }
                clearedOneInstance() {
                    this.counter--
                }
                shouldResolveImmediately(e) {
                    var t;
                    return !(null === (t = vn().grecaptcha) || void 0 === t || !t.render) && (e === this.hostLanguage || 0 < this.counter || this.librarySeparatelyLoaded)
                }
            }
            class Ln {
                async load(e) {
                    return new An(e)
                }
                clearedOneInstance() {}
            }
            const Dn = "recaptcha",
                Mn = {
                    theme: "light",
                    type: "image"
                };
            class Un {
                constructor(e, t, n = Object.assign({}, Mn)) {
                    this.parameters = n, this.type = Dn, this.destroyed = !1, this.widgetId = null, this.tokenChangeListeners = new Set, this.renderPromise = null, this.recaptcha = null, this.auth = We(e), this.isInvisible = "invisible" === this.parameters.size, B("undefined" != typeof document, this.auth, "operation-not-supported-in-this-environment");
                    var r = "string" == typeof t ? document.getElementById(t) : t;
                    B(r, this.auth, "argument-error"), this.container = r, this.parameters.callback = this.makeTokenCallback(this.parameters.callback), this._recaptchaLoader = new(this.auth.settings.appVerificationDisabledForTesting ? Ln : Nn), this.validateStartingState()
                }
                async verify() {
                    this.assertNotDestroyed();
                    const e = await this.render(),
                        r = this.getAssertedRecaptcha();
                    var t = r.getResponse(e);
                    return t || new Promise(t => {
                        const n = e => {
                            e && (this.tokenChangeListeners.delete(n), t(e))
                        };
                        this.tokenChangeListeners.add(n), this.isInvisible && r.execute(e)
                    })
                }
                render() {
                    try {
                        this.assertNotDestroyed()
                    } catch (e) {
                        return Promise.reject(e)
                    }
                    return this.renderPromise || (this.renderPromise = this.makeRenderPromise().catch(e => {
                        throw this.renderPromise = null, e
                    }), this.renderPromise)
                }
                _reset() {
                    this.assertNotDestroyed(), null !== this.widgetId && this.getAssertedRecaptcha().reset(this.widgetId)
                }
                clear() {
                    this.assertNotDestroyed(), this.destroyed = !0, this._recaptchaLoader.clearedOneInstance(), this.isInvisible || this.container.childNodes.forEach(e => {
                        this.container.removeChild(e)
                    })
                }
                validateStartingState() {
                    B(!this.parameters.sitekey, this.auth, "argument-error"), B(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error"), B("undefined" != typeof document, this.auth, "operation-not-supported-in-this-environment")
                }
                makeTokenCallback(n) {
                    return t => {
                        if (this.tokenChangeListeners.forEach(e => e(t)), "function" == typeof n) n(t);
                        else if ("string" == typeof n) {
                            const e = vn()[n];
                            "function" == typeof e && e(t)
                        }
                    }
                }
                assertNotDestroyed() {
                    B(!this.destroyed, this.auth, "internal-error")
                }
                async makeRenderPromise() {
                    if (await this.init(), !this.widgetId) {
                        let e = this.container;
                        var t;
                        this.isInvisible || (t = document.createElement("div"), e.appendChild(t), e = t), this.widgetId = this.getAssertedRecaptcha().render(e, this.parameters)
                    }
                    return this.widgetId
                }
                async init() {
                    B(J() && !gn(), this.auth, "internal-error"), await
                    function() {
                        let t = null;
                        return new Promise(e => {
                            "complete" !== document.readyState ? (t = () => e(), window.addEventListener("load", t)) : e()
                        }).catch(e => {
                            throw t && window.removeEventListener("load", t), e
                        })
                    }(), this.recaptcha = await this._recaptchaLoader.load(this.auth, this.auth.languageCode || void 0);
                    var e = await ((await re(this.auth, "GET", "/v1/recaptchaParams")).recaptchaSiteKey || "");
                    B(e, this.auth, "internal-error"), this.parameters.sitekey = e
                }
                getAssertedRecaptcha() {
                    return B(this.recaptcha, this.auth, "internal-error"), this.recaptcha
                }
            }
            class Fn {
                constructor(e, t) {
                    this.verificationId = e, this.onConfirmation = t
                }
                confirm(e) {
                    var t = dt._fromVerification(this.verificationId, e);
                    return this.onConfirmation(t)
                }
            }
            async function Vn(t, n, r) {
                var i, s, a, o, c, l, d = await r.verify();
                try {
                    B("string" == typeof d, t, "argument-error"), B(r.type === Dn, t, "argument-error");
                    let e;
                    if (e = "string" == typeof n ? {
                            phoneNumber: n
                        } : n, "session" in e) {
                        var u = e.session;
                        if ("phoneNumber" in e) return B("enroll" === u.type, t, "internal-error"), (c = t, l = {
                            idToken: u.credential,
                            phoneEnrollmentInfo: {
                                phoneNumber: e.phoneNumber,
                                recaptchaToken: d
                            }
                        }, await re(c, "POST", "/v2/accounts/mfaEnrollment:start", ne(c, l))).phoneSessionInfo.sessionInfo;
                        B("signin" === u.type, t, "internal-error");
                        var h = (null === (i = e.multiFactorHint) || void 0 === i ? void 0 : i.uid) || e.multiFactorUid;
                        return B(h, t, "missing-multi-factor-info"), (o = {
                            mfaPendingCredential: u.credential,
                            mfaEnrollmentId: h,
                            phoneSignInInfo: {
                                recaptchaToken: d
                            }
                        }, await re(t, "POST", "/v2/accounts/mfaSignIn:start", ne(t, o))).phoneResponseInfo.sessionInfo
                    }
                    var p = (s = t, a = {
                        phoneNumber: e.phoneNumber,
                        recaptchaToken: d
                    }, await re(s, "POST", "/v1/accounts:sendVerificationCode", ne(s, a)))["sessionInfo"];
                    return p
                } finally {
                    r._reset()
                }
            }
            class xn {
                constructor(e) {
                    this.providerId = xn.PROVIDER_ID, this.auth = We(e)
                }
                verifyPhoneNumber(e, t) {
                    return Vn(this.auth, e, k(t))
                }
                static credential(e, t) {
                    return dt._fromVerification(e, t)
                }
                static credentialFromResult(e) {
                    var t = e;
                    return xn.credentialFromTaggedObject(t)
                }
                static credentialFromError(e) {
                    return xn.credentialFromTaggedObject(e.customData || {})
                }
                static credentialFromTaggedObject({
                    _tokenResponse: e
                }) {
                    if (!e) return null;
                    var {
                        phoneNumber: t,
                        temporaryProof: n
                    } = e;
                    return t && n ? dt._fromTokenResponse(t, n) : null
                }
            }

            function jn(e, t) {
                return t ? Ee(t) : (B(e._popupRedirectResolver, e, "argument-error"), e._popupRedirectResolver)
            }
            xn.PROVIDER_ID = "phone", xn.PHONE_SIGN_IN_METHOD = "phone";
            class Hn extends Ze {
                constructor(e) {
                    super("custom", "custom"), this.params = e
                }
                _getIdTokenResponse(e) {
                    return ot(e, this._buildIdpRequest())
                }
                _linkToIdToken(e, t) {
                    return ot(e, this._buildIdpRequest(t))
                }
                _getReauthenticationResolver(e) {
                    return ot(e, this._buildIdpRequest())
                }
                _buildIdpRequest(e) {
                    const t = {
                        requestUri: this.params.requestUri,
                        sessionId: this.params.sessionId,
                        postBody: this.params.postBody,
                        tenantId: this.params.tenantId,
                        pendingToken: this.params.pendingToken,
                        returnSecureToken: !0,
                        returnIdpCredential: !0
                    };
                    return e && (t.idToken = e), t
                }
            }

            function Wn(e) {
                return Nt(e.auth, new Hn(e), e.bypassAuthState)
            }

            function qn(e) {
                var {
                    auth: t,
                    user: n
                } = e;
                return B(n, t, "internal-error"), Ot(n, new Hn(e), e.bypassAuthState)
            }
            async function zn(e) {
                var {
                    auth: t,
                    user: n
                } = e;
                return B(n, t, "internal-error"), Pt(n, new Hn(e), e.bypassAuthState)
            }
            class Bn {
                constructor(e, t, n, r, i = !1) {
                    this.auth = e, this.resolver = n, this.user = r, this.bypassAuthState = i, this.pendingPromise = null, this.eventManager = null, this.filter = Array.isArray(t) ? t : [t]
                }
                execute() {
                    return new Promise(async (e, t) => {
                        this.pendingPromise = {
                            resolve: e,
                            reject: t
                        };
                        try {
                            this.eventManager = await this.resolver._initialize(this.auth), await this.onExecution(), this.eventManager.registerConsumer(this)
                        } catch (e) {
                            this.reject(e)
                        }
                    })
                }
                async onAuthEvent(e) {
                    var {
                        urlResponse: t,
                        sessionId: n,
                        postBody: r,
                        tenantId: i,
                        error: s,
                        type: a
                    } = e;
                    if (s) this.reject(s);
                    else {
                        r = {
                            auth: this.auth,
                            requestUri: t,
                            sessionId: n,
                            tenantId: i || void 0,
                            postBody: r || void 0,
                            user: this.user,
                            bypassAuthState: this.bypassAuthState
                        };
                        try {
                            this.resolve(await this.getIdpTask(a)(r))
                        } catch (e) {
                            this.reject(e)
                        }
                    }
                }
                onError(e) {
                    this.reject(e)
                }
                getIdpTask(e) {
                    switch (e) {
                        case "signInViaPopup":
                        case "signInViaRedirect":
                            return Wn;
                        case "linkViaPopup":
                        case "linkViaRedirect":
                            return zn;
                        case "reauthViaPopup":
                        case "reauthViaRedirect":
                            return qn;
                        default:
                            j(this.auth, "internal-error")
                    }
                }
                resolve(e) {
                    K(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.resolve(e), this.unregisterAndCleanUp()
                }
                reject(e) {
                    K(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.reject(e), this.unregisterAndCleanUp()
                }
                unregisterAndCleanUp() {
                    this.eventManager && this.eventManager.unregisterConsumer(this), this.pendingPromise = null, this.cleanUp()
                }
            }
            const Gn = new X(2e3, 1e4);
            class Kn extends Bn {
                constructor(e, t, n, r, i) {
                    super(e, t, r, i), this.provider = n, this.authWindow = null, this.pollId = null, Kn.currentPopupAction && Kn.currentPopupAction.cancel(), Kn.currentPopupAction = this
                }
                async executeNotNull() {
                    var e = await this.execute();
                    return B(e, this.auth, "internal-error"), e
                }
                async onExecution() {
                    K(1 === this.filter.length, "Popup operations only handle one event");
                    var e = fn();
                    this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e), this.authWindow.associatedEvent = e, this.resolver._originValidation(this.auth).catch(e => {
                        this.reject(e)
                    }), this.resolver._isIframeWebStorageSupported(this.auth, e => {
                        e || this.reject(H(this.auth, "web-storage-unsupported"))
                    }), this.pollUserCancellation()
                }
                get eventId() {
                    var e;
                    return (null === (e = this.authWindow) || void 0 === e ? void 0 : e.associatedEvent) || null
                }
                cancel() {
                    this.reject(H(this.auth, "cancelled-popup-request"))
                }
                cleanUp() {
                    this.authWindow && this.authWindow.close(), this.pollId && window.clearTimeout(this.pollId), this.authWindow = null, this.pollId = null, Kn.currentPopupAction = null
                }
                pollUserCancellation() {
                    const t = () => {
                        var e;
                        null !== (e = null === (e = this.authWindow) || void 0 === e ? void 0 : e.window) && void 0 !== e && e.closed ? this.pollId = window.setTimeout(() => {
                            this.pollId = null, this.reject(H(this.auth, "popup-closed-by-user"))
                        }, 8e3) : this.pollId = window.setTimeout(t, Gn.get())
                    };
                    t()
                }
            }
            Kn.currentPopupAction = null;
            const $n = "pendingRedirect",
                Jn = new Map;
            class Yn extends Bn {
                constructor(e, t, n = !1) {
                    super(e, ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"], t, void 0, n), this.eventId = null
                }
                async execute() {
                    let t = Jn.get(this.auth._key());
                    if (!t) {
                        try {
                            const e = await async function(e, t) {
                                const n = er(t),
                                    r = Zn(e);
                                if (!await r._isAvailable()) return !1;
                                var i = "true" === await r._get(n);
                                return await r._remove(n), i
                            }(this.resolver, this.auth) ? await super.execute() : null;
                            t = () => Promise.resolve(e)
                        } catch (e) {
                            t = () => Promise.reject(e)
                        }
                        Jn.set(this.auth._key(), t)
                    }
                    return this.bypassAuthState || Jn.set(this.auth._key(), () => Promise.resolve(null)), t()
                }
                async onAuthEvent(e) {
                    if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
                    if ("unknown" !== e.type) {
                        if (e.eventId) {
                            var t = await this.auth._redirectUserForId(e.eventId);
                            if (t) return this.user = t, super.onAuthEvent(e);
                            this.resolve(null)
                        }
                    } else this.resolve(null)
                }
                async onExecution() {}
                cleanUp() {}
            }
            async function Xn(e, t) {
                return Zn(e)._set(er(t), "true")
            }

            function Qn(e, t) {
                Jn.set(e._key(), t)
            }

            function Zn(e) {
                return Ee(e._redirectPersistence)
            }

            function er(e) {
                return Se($n, e.config.apiKey, e.name)
            }

            function tr(e, t, n) {
                return async function(e, t, n) {
                    var r = We(e);
                    q(e, t, pt), await r._initializationPromise;
                    const i = jn(r, n);
                    return await Xn(i, r), i._openRedirect(r, t, "signInViaRedirect")
                }(e, t, n)
            }

            function nr(e, t, n) {
                return async function(e, t, n) {
                    var r = k(e);
                    q(r.auth, t, pt), await r.auth._initializationPromise;
                    const i = jn(r.auth, n);
                    await Xn(i, r.auth);
                    var s = await sr(r);
                    return i._openRedirect(r.auth, t, "reauthViaRedirect", s)
                }(e, t, n)
            }

            function rr(e, t, n) {
                return async function(e, t, n) {
                    var r = k(e);
                    q(r.auth, t, pt), await r.auth._initializationPromise;
                    const i = jn(r.auth, n);
                    await Ct(!1, r, t.providerId), await Xn(i, r.auth);
                    var s = await sr(r);
                    return i._openRedirect(r.auth, t, "linkViaRedirect", s)
                }(e, t, n)
            }
            async function ir(e, t, n = !1) {
                const r = We(e);
                var i = jn(r, t);
                const s = new Yn(r, i, n),
                    a = await s.execute();
                return a && !n && (delete a.user._redirectEventId, await r._persistUserIfCurrent(a.user), await r._setRedirectUser(null, t)), a
            }
            async function sr(e) {
                var t = fn(`${e.uid}:::`);
                return e._redirectEventId = t, await e.auth._setRedirectUser(e), await e.auth._persistUserIfCurrent(e), t
            }
            class ar {
                constructor(e) {
                    this.auth = e, this.cachedEventUids = new Set, this.consumers = new Set, this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1, this.lastProcessedEventTime = Date.now()
                }
                registerConsumer(e) {
                    this.consumers.add(e), this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, e) && (this.sendToConsumer(this.queuedRedirectEvent, e), this.saveEventToCache(this.queuedRedirectEvent), this.queuedRedirectEvent = null)
                }
                unregisterConsumer(e) {
                    this.consumers.delete(e)
                }
                onEvent(t) {
                    if (this.hasEventBeenHandled(t)) return !1;
                    let n = !1;
                    return this.consumers.forEach(e => {
                        this.isEventForConsumer(t, e) && (n = !0, this.sendToConsumer(t, e), this.saveEventToCache(t))
                    }), this.hasHandledPotentialRedirect || ! function(e) {
                        switch (e.type) {
                            case "signInViaRedirect":
                            case "linkViaRedirect":
                            case "reauthViaRedirect":
                                return !0;
                            case "unknown":
                                return cr(e);
                            default:
                                return !1
                        }
                    }(t) || (this.hasHandledPotentialRedirect = !0, n || (this.queuedRedirectEvent = t, n = !0)), n
                }
                sendToConsumer(e, t) {
                    var n;
                    e.error && !cr(e) ? (n = (null === (n = e.error.code) || void 0 === n ? void 0 : n.split("auth/")[1]) || "internal-error", t.onError(H(this.auth, n))) : t.onAuthEvent(e)
                }
                isEventForConsumer(e, t) {
                    var n = null === t.eventId || !!e.eventId && e.eventId === t.eventId;
                    return t.filter.includes(e.type) && n
                }
                hasEventBeenHandled(e) {
                    return 6e5 <= Date.now() - this.lastProcessedEventTime && this.cachedEventUids.clear(), this.cachedEventUids.has(or(e))
                }
                saveEventToCache(e) {
                    this.cachedEventUids.add(or(e)), this.lastProcessedEventTime = Date.now()
                }
            }

            function or(e) {
                return [e.type, e.eventId, e.sessionId, e.tenantId].filter(e => e).join("-")
            }

            function cr({
                type: e,
                error: t
            }) {
                return "unknown" === e && "auth/no-auth-event" === (null == t ? void 0 : t.code)
            }
            async function lr(e, t = {}) {
                return re(e, "GET", "/v1/projects", t)
            }
            const dr = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                ur = /^https?/;
            async function hr(e) {
                if (!e.config.emulator) {
                    var t = (await lr(e))["authorizedDomains"];
                    for (const n of t) try {
                        if (function(e) {
                                const t = $(),
                                    {
                                        protocol: n,
                                        hostname: r
                                    } = new URL(t);
                                if (e.startsWith("chrome-extension://")) {
                                    var i = new URL(e);
                                    return "" === i.hostname && "" === r ? "chrome-extension:" === n && e.replace("chrome-extension://", "") === t.replace("chrome-extension://", "") : "chrome-extension:" === n && i.hostname === r
                                }
                                if (!ur.test(n)) return !1;
                                if (dr.test(e)) return r === e;
                                const s = e.replace(/\./g, "\\."),
                                    a = new RegExp("^(.+\\." + s + "|" + s + ")$", "i");
                                return a.test(r)
                            }(n)) return
                    } catch (e) {}
                    j(e, "unauthorized-domain")
                }
            }
            const pr = new X(3e4, 6e4);

            function fr() {
                const t = vn().___jsl;
                if (null !== t && void 0 !== t && t.H)
                    for (const n of Object.keys(t.H))
                        if (t.H[n].r = t.H[n].r || [], t.H[n].L = t.H[n].L || [], t.H[n].r = [...t.H[n].L], t.CP)
                            for (let e = 0; e < t.CP.length; e++) t.CP[e] = null
            }

            function mr(i) {
                return new Promise((e, t) => {
                    function n() {
                        fr(), gapi.load("gapi.iframes", {
                            callback: () => {
                                e(gapi.iframes.getContext())
                            },
                            ontimeout: () => {
                                fr(), t(H(i, "network-request-failed"))
                            },
                            timeout: pr.get()
                        })
                    }
                    if (null !== (r = null === (r = vn().gapi) || void 0 === r ? void 0 : r.iframes) && void 0 !== r && r.Iframe) e(gapi.iframes.getContext());
                    else {
                        if (null === (r = vn().gapi) || void 0 === r || !r.load) {
                            var r = Ge("iframefcb");
                            return vn()[r] = () => {
                                gapi.load ? n() : t(H(i, "network-request-failed"))
                            }, Be(`${ze.gapiScript}?onload=${r}`).catch(e => t(e))
                        }
                        n()
                    }
                }).catch(e => {
                    throw vr = null, e
                })
            }
            let vr = null;
            const gr = new X(5e3, 15e3),
                _r = "__/auth/iframe",
                yr = "emulator/auth/iframe",
                Ir = {
                    style: {
                        position: "absolute",
                        top: "-100px",
                        width: "1px",
                        height: "1px"
                    },
                    "aria-hidden": "true",
                    tabindex: "-1"
                },
                wr = new Map([
                    ["identitytoolkit.googleapis.com", "p"],
                    ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
                    ["test-identitytoolkit.sandbox.googleapis.com", "t"]
                ]);
            async function Tr(a) {
                const e = (t = a, vr = vr || mr(t), await vr);
                var t, n = vn().gapi;
                return B(n, a, "internal-error"), e.open({
                    where: document.body,
                    url: function(e) {
                        var t = e.config;
                        B(t.authDomain, e, "auth-domain-config-required");
                        var n = t.emulator ? Q(t, yr) : `https://${e.config.authDomain}/${_r}`;
                        const r = {
                            apiKey: t.apiKey,
                            appName: e.name,
                            v: Ri.SDK_VERSION
                        };
                        (t = wr.get(e.config.apiHost)) && (r.eid = t);
                        const i = e._getFrameworks();
                        return i.length && (r.fw = i.join(",")), `${n}?${I(r).slice(1)}`
                    }(a),
                    messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                    attributes: Ir,
                    dontclear: !0
                }, s => new Promise(async (e, t) => {
                    await s.restyle({
                        setHideOnLeave: !1
                    });
                    const n = H(a, "network-request-failed"),
                        r = vn().setTimeout(() => {
                            t(n)
                        }, gr.get());

                    function i() {
                        vn().clearTimeout(r), e(s)
                    }
                    s.ping(i).then(i, () => {
                        t(n)
                    })
                }))
            }
            const Er = {
                location: "yes",
                resizable: "yes",
                statusbar: "yes",
                toolbar: "no"
            };
            class br {
                constructor(e) {
                    this.window = e, this.associatedEvent = null
                }
                close() {
                    if (this.window) try {
                        this.window.close()
                    } catch (e) {}
                }
            }

            function kr(e, t, n, r = 500, i = 600) {
                var s = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
                    a = Math.max((window.screen.availWidth - r) / 2, 0).toString();
                let o = "";
                const c = Object.assign(Object.assign({}, Er), {
                    width: r.toString(),
                    height: i.toString(),
                    top: s,
                    left: a
                });
                s = u().toLowerCase();
                n && (o = Oe(s) ? "_blank" : n), Pe(s) && (t = t || "http://localhost", c.scrollbars = "yes");
                var l, a = Object.entries(c).reduce((e, [t, n]) => `${e}${t}=${n},`, "");
                if ([n = u()] = [s], Ue(n) && null !== (l = window.navigator) && void 0 !== l && l.standalone && "_self" !== o) return function(e, t) {
                    const n = document.createElement("a");
                    n.href = e, n.target = t;
                    const r = document.createEvent("MouseEvent");
                    r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r)
                }(t || "", o), new br(null);
                const d = window.open(t || "", o, a);
                B(d, e, "popup-blocked");
                try {
                    d.focus()
                } catch (e) {}
                return new br(d)
            }
            const Sr = "__/auth/handler",
                Rr = "emulator/auth/handler",
                Ar = encodeURIComponent("fac");
            async function Pr(e, t, n, r, i, s) {
                B(e.config.authDomain, e, "auth-domain-config-required"), B(e.config.apiKey, e, "invalid-api-key");
                const a = {
                    apiKey: e.config.apiKey,
                    appName: e.name,
                    authType: n,
                    redirectUrl: r,
                    v: Ri.SDK_VERSION,
                    eventId: i
                };
                if (t instanceof pt) {
                    t.setDefaultLanguage(e.languageCode), a.providerId = t.providerId || "",
                        function(e) {
                            for (const t in e)
                                if (Object.prototype.hasOwnProperty.call(e, t)) return;
                            return 1
                        }(t.getCustomParameters()) || (a.customParameters = JSON.stringify(t.getCustomParameters()));
                    for (var [o, c] of Object.entries(s || {})) a[o] = c
                }
                if (t instanceof ft) {
                    const u = t.getScopes().filter(e => "" !== e);
                    0 < u.length && (a.scopes = u.join(","))
                }
                e.tenantId && (a.tid = e.tenantId);
                const l = a;
                for (const h of Object.keys(l)) void 0 === l[h] && delete l[h];
                var d = await e._getAppCheckToken(),
                    d = d ? `#${Ar}=${encodeURIComponent(d)}` : "";
                return `${e=[e["config"]][0],e.emulator?Q(e,Rr):`https://${e.authDomain}/${Sr}`}?${I(l).slice(1)}${d}`
            }
            const Cr = "webStorageSupport";
            const Or = class {
                constructor() {
                    this.eventManagers = {}, this.iframes = {}, this.originValidationPromises = {}, this._redirectPersistence = hn, this._completeRedirectFn = ir, this._overrideRedirectResult = Qn
                }
                async _openPopup(e, t, n, r) {
                    var i;
                    return K(null === (i = this.eventManagers[e._key()]) || void 0 === i ? void 0 : i.manager, "_initialize() not called before _openPopup()"), kr(e, await Pr(e, t, n, $(), r), fn())
                }
                async _openRedirect(e, t, n, r) {
                    await this._originValidation(e);
                    var i = await Pr(e, t, n, $(), r);
                    return vn().location.href = i, new Promise(() => {})
                }
                _initialize(e) {
                    const t = e._key();
                    if (this.eventManagers[t]) {
                        const {
                            manager: r,
                            promise: n
                        } = this.eventManagers[t];
                        return r ? Promise.resolve(r) : (K(n, "If manager is not set, promise should be"), n)
                    }
                    const n = this.initAndGetManager(e);
                    return this.eventManagers[t] = {
                        promise: n
                    }, n.catch(() => {
                        delete this.eventManagers[t]
                    }), n
                }
                async initAndGetManager(t) {
                    const e = await Tr(t),
                        n = new ar(t);
                    return e.register("authEvent", e => {
                        return B(null == e ? void 0 : e.authEvent, t, "invalid-auth-event"), {
                            status: n.onEvent(e.authEvent) ? "ACK" : "ERROR"
                        }
                    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER), this.eventManagers[t._key()] = {
                        manager: n
                    }, this.iframes[t._key()] = e, n
                }
                _isIframeWebStorageSupported(n, r) {
                    const e = this.iframes[n._key()];
                    e.send(Cr, {
                        type: Cr
                    }, e => {
                        var t = null === (t = null == e ? void 0 : e[0]) || void 0 === t ? void 0 : t[Cr];
                        void 0 !== t && r(!!t), j(n, "internal-error")
                    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)
                }
                _originValidation(e) {
                    var t = e._key();
                    return this.originValidationPromises[t] || (this.originValidationPromises[t] = hr(e)), this.originValidationPromises[t]
                }
                get _shouldInitProactively() {
                    return Fe() || Ce() || Ue()
                }
            };
            class Nr extends class {
                constructor(e) {
                    this.factorId = e
                }
                _process(e, t, n) {
                    switch (t.type) {
                        case "enroll":
                            return this._finalizeEnroll(e, t.credential, n);
                        case "signin":
                            return this._finalizeSignIn(e, t.credential);
                        default:
                            return G("unexpected MultiFactorSessionType")
                    }
                }
            } {
                constructor(e) {
                    super("phone"), this.credential = e
                }
                static _fromCredential(e) {
                    return new Nr(e)
                }
                _finalizeEnroll(e, t, n) {
                    return e = e, n = {
                        idToken: t,
                        displayName: n,
                        phoneVerificationInfo: this.credential._makeVerificationRequest()
                    }, re(e, "POST", "/v2/accounts/mfaEnrollment:finalize", ne(e, n))
                }
                _finalizeSignIn(e, t) {
                    return e = e, t = {
                        mfaPendingCredential: t,
                        phoneVerificationInfo: this.credential._makeVerificationRequest()
                    }, re(e, "POST", "/v2/accounts/mfaSignIn:finalize", ne(e, t))
                }
            }
            class Lr {
                constructor() {}
                static assertion(e) {
                    return Nr._fromCredential(e)
                }
            }
            Lr.FACTOR_ID = "phone";
            var Dr = "@firebase/auth";
            class Mr {
                constructor(e) {
                    this.auth = e, this.internalListeners = new Map
                }
                getUid() {
                    var e;
                    return this.assertAuthConfigured(), (null === (e = this.auth.currentUser) || void 0 === e ? void 0 : e.uid) || null
                }
                async getToken(e) {
                    return this.assertAuthConfigured(), await this.auth._initializationPromise, this.auth.currentUser ? {
                        accessToken: await this.auth.currentUser.getIdToken(e)
                    } : null
                }
                addAuthTokenListener(t) {
                    var e;
                    this.assertAuthConfigured(), this.internalListeners.has(t) || (e = this.auth.onIdTokenChanged(e => {
                        t((null == e ? void 0 : e.stsTokenManager.accessToken) || null)
                    }), this.internalListeners.set(t, e), this.updateProactiveRefresh())
                }
                removeAuthTokenListener(e) {
                    this.assertAuthConfigured();
                    const t = this.internalListeners.get(e);
                    t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh())
                }
                assertAuthConfigured() {
                    B(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth")
                }
                updateProactiveRefresh() {
                    0 < this.internalListeners.size ? this.auth._startProactiveRefresh() : this.auth._stopProactiveRefresh()
                }
            }
            var Ur, Fr, Vr;

            function xr() {
                return window
            }
            Ur = "authIdTokenMaxAge", null === (Fr = o()) || void 0 === Fr || Fr[`_${Ur}`], ze = {
                loadJS(i) {
                    return new Promise((e, n) => {
                        const t = document.createElement("script");
                        var r;
                        t.setAttribute("src", i), t.onload = e, t.onerror = e => {
                            const t = H("internal-error");
                            t.customData = e, n(t)
                        }, t.type = "text/javascript", t.charset = "UTF-8", (null !== (r = null === (r = document.getElementsByTagName("head")) || void 0 === r ? void 0 : r[0]) && void 0 !== r ? r : document).appendChild(t)
                    })
                },
                gapiScript: "https://apis.google.com/js/api.js",
                recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
                recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render="
            }, Vr = "Browser", Ri._registerComponent(new O("auth", (e, {
                options: t
            }) => {
                var n = e.getProvider("app").getImmediate(),
                    r = e.getProvider("heartbeat"),
                    i = e.getProvider("app-check-internal");
                const {
                    apiKey: s,
                    authDomain: a
                } = n.options;
                B(s && !s.includes(":"), "invalid-api-key", {
                    appName: n.name
                });
                var o = {
                        apiKey: s,
                        authDomain: a,
                        clientPlatform: Vr,
                        apiHost: "identitytoolkit.googleapis.com",
                        tokenApiHost: "securetoken.googleapis.com",
                        apiScheme: "https",
                        sdkClientVersion: Ve(Vr)
                    },
                    o = new He(n, r, i, o);
                return function(e, t) {
                    const n = (null == t ? void 0 : t.persistence) || [];
                    var r = (Array.isArray(n) ? n : [n]).map(Ee);
                    null != t && t.errorMap && e._updateErrorMap(t.errorMap), e._initializeWithPersistence(r, null == t ? void 0 : t.popupRedirectResolver)
                }(o, t), o
            }, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e, t, n) => {
                const r = e.getProvider("auth-internal");
                r.initialize()
            })), Ri._registerComponent(new O("auth-internal", e => {
                var t = We(e.getProvider("auth").getImmediate());
                return e = t, new Mr(e)
            }, "PRIVATE").setInstantiationMode("EXPLICIT")), Ri.registerVersion(Dr, "1.6.2", function(e) {
                switch (e) {
                    case "Node":
                        return "node";
                    case "ReactNative":
                        return "rn";
                    case "Worker":
                        return "webworker";
                    case "Cordova":
                        return "cordova";
                    case "WebExtension":
                        return "web-extension";
                    default:
                        return
                }
            }(Vr)), Ri.registerVersion(Dr, "1.6.2", "esm2017");
            async function jr(e, t, n) {
                var r = xr()["BuildInfo"];
                K(t.sessionId, "AuthEvent did not contain a session ID");
                var i = await async function(e) {
                    const t = function(e) {
                            if (K(/[0-9a-zA-Z]+/.test(e), "Can only convert alpha-numeric strings"), "undefined" != typeof TextEncoder) return (new TextEncoder).encode(e);
                            const t = new ArrayBuffer(e.length),
                                n = new Uint8Array(t);
                            for (let r = 0; r < e.length; r++) n[r] = e.charCodeAt(r);
                            return n
                        }(e),
                        n = await crypto.subtle.digest("SHA-256", t),
                        r = Array.from(new Uint8Array(n));
                    return r.map(e => e.toString(16).padStart(2, "0")).join("")
                }(t.sessionId);
                const s = {};
                return Ue() ? s.ibi = r.packageName : Le() ? s.apn = r.packageName : j(e, "operation-not-supported-in-this-environment"), r.displayName && (s.appDisplayName = r.displayName), s.sessionId = i, Pr(e, n, t.type, void 0, null !== (i = t.eventId) && void 0 !== i ? i : void 0, s)
            }

            function Hr(r) {
                const i = xr()["cordova"];
                return new Promise(n => {
                    i.plugins.browsertab.isAvailable(e => {
                        let t = null;
                        e ? i.plugins.browsertab.openUrl(r) : t = i.InAppBrowser.open(r, (e = u(), /(iPad|iPhone|iPod).*OS 7_\d/i.test(e) || /(iPad|iPhone|iPod).*OS 8_\d/i.test(e) ? "_blank" : "_system"), "location=yes"), n(t)
                    })
                })
            }
            const Wr = 20;
            class qr extends ar {
                constructor() {
                    super(...arguments), this.passiveListeners = new Set, this.initPromise = new Promise(e => {
                        this.resolveInialized = e
                    })
                }
                addPassiveListener(e) {
                    this.passiveListeners.add(e)
                }
                removePassiveListener(e) {
                    this.passiveListeners.delete(e)
                }
                resetRedirect() {
                    this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1
                }
                onEvent(t) {
                    return this.resolveInialized(), this.passiveListeners.forEach(e => e(t)), super.onEvent(t)
                }
                async initialized() {
                    await this.initPromise
                }
            }

            function zr(e, t, n = null) {
                return {
                    type: t,
                    eventId: n,
                    urlResponse: null,
                    sessionId: function() {
                        const e = [],
                            t = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        for (let r = 0; r < Wr; r++) {
                            var n = Math.floor(Math.random() * t.length);
                            e.push(t.charAt(n))
                        }
                        return e.join("")
                    }(),
                    postBody: null,
                    tenantId: e.tenantId,
                    error: H(e, "no-auth-event")
                }
            }
            async function Br(e) {
                var t = await Kr()._get($r(e));
                return t && await Kr()._remove($r(e)), t
            }

            function Gr(e, t) {
                var n, r, i;
                const s = (n = Jr(t = t), a = n.link ? decodeURIComponent(n.link) : void 0, r = Jr(a).link, i = n.deep_link_id ? decodeURIComponent(n.deep_link_id) : void 0, (n = Jr(i).link) || i || r || a || t);
                if (s.includes("/__/auth/callback")) {
                    var a = Jr(s),
                        a = a.firebaseError ? function(e) {
                            try {
                                return JSON.parse(e)
                            } catch (e) {
                                return null
                            }
                        }(decodeURIComponent(a.firebaseError)) : null,
                        a = null === (a = null === (a = null == a ? void 0 : a.code) || void 0 === a ? void 0 : a.split("auth/")) || void 0 === a ? void 0 : a[1],
                        a = a ? H(a) : null;
                    return a ? {
                        type: e.type,
                        eventId: e.eventId,
                        tenantId: e.tenantId,
                        error: a,
                        urlResponse: null,
                        sessionId: null,
                        postBody: null
                    } : {
                        type: e.type,
                        eventId: e.eventId,
                        tenantId: e.tenantId,
                        sessionId: e.sessionId,
                        urlResponse: s,
                        postBody: null
                    }
                }
                return null
            }

            function Kr() {
                return Ee(dn)
            }

            function $r(e) {
                return Se("authEvent", e.config.apiKey, e.name)
            }

            function Jr(e) {
                if (null == e || !e.includes("?")) return {};
                const [, ...t] = e.split("?");
                return w(t.join("?"))
            }
            const Yr = class {
                constructor() {
                    this._redirectPersistence = hn, this._shouldInitProactively = !0, this.eventManagers = new Map, this.originValidationPromises = {}, this._completeRedirectFn = ir, this._overrideRedirectResult = Qn
                }
                async _initialize(e) {
                    var t = e._key();
                    let n = this.eventManagers.get(t);
                    return n || (n = new qr(e), this.eventManagers.set(t, n), this.attachCallbackListeners(e, n)), n
                }
                _openPopup(e) {
                    j(e, "operation-not-supported-in-this-environment")
                }
                async _openRedirect(e, t, n, r) {
                    var i, s;
                    i = e, o = xr(), B("function" == typeof(null === (s = null == o ? void 0 : o.universalLinks) || void 0 === s ? void 0 : s.subscribe), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-universal-links-plugin-fix"
                    }), B(void 0 !== (null === (s = null == o ? void 0 : o.BuildInfo) || void 0 === s ? void 0 : s.packageName), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-buildInfo"
                    }), B("function" == typeof(null === (s = null === (s = null === (s = null == o ? void 0 : o.cordova) || void 0 === s ? void 0 : s.plugins) || void 0 === s ? void 0 : s.browsertab) || void 0 === s ? void 0 : s.openUrl), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-browsertab"
                    }), B("function" == typeof(null === (s = null === (s = null === (s = null == o ? void 0 : o.cordova) || void 0 === s ? void 0 : s.plugins) || void 0 === s ? void 0 : s.browsertab) || void 0 === s ? void 0 : s.isAvailable), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-browsertab"
                    }), B("function" == typeof(null === (o = null === (o = null == o ? void 0 : o.cordova) || void 0 === o ? void 0 : o.InAppBrowser) || void 0 === o ? void 0 : o.open), i, "invalid-cordova-configuration", {
                        missingPlugin: "cordova-plugin-inappbrowser"
                    });
                    const a = await this._initialize(e);
                    await a.initialized(), a.resetRedirect(), Jn.clear(), await this._originValidation(e);
                    var o = zr(e, n, r);
                    n = e, r = o, await Kr()._set($r(n), r);
                    o = await Hr(await jr(e, o, t));
                    return async function(a, o, c) {
                        const l = xr()["cordova"];
                        let d = () => {};
                        try {
                            await new Promise((n, e) => {
                                let t = null;

                                function r() {
                                    var e;
                                    n();
                                    const t = null === (e = l.plugins.browsertab) || void 0 === e ? void 0 : e.close;
                                    "function" == typeof t && t(), "function" == typeof(null == c ? void 0 : c.close) && c.close()
                                }

                                function i() {
                                    t = t || window.setTimeout(() => {
                                        e(H(a, "redirect-cancelled-by-user"))
                                    }, 2e3)
                                }

                                function s() {
                                    "visible" === (null === document || void 0 === document ? void 0 : document.visibilityState) && i()
                                }
                                o.addPassiveListener(r), document.addEventListener("resume", i, !1), Le() && document.addEventListener("visibilitychange", s, !1), d = () => {
                                    o.removePassiveListener(r), document.removeEventListener("resume", i, !1), document.removeEventListener("visibilitychange", s, !1), t && window.clearTimeout(t)
                                }
                            })
                        } finally {
                            d()
                        }
                    }(e, a, o)
                }
                _isIframeWebStorageSupported(e, t) {
                    throw new Error("Method not implemented.")
                }
                _originValidation(e) {
                    var t = e._key();
                    return this.originValidationPromises[t] || (this.originValidationPromises[t] = async function(e) {
                        var t = xr()["BuildInfo"];
                        const n = {};
                        Ue() ? n.iosBundleId = t.packageName : Le() ? n.androidPackageName = t.packageName : j(e, "operation-not-supported-in-this-environment"), await lr(e, n)
                    }(e)), this.originValidationPromises[t]
                }
                attachCallbackListeners(r, i) {
                    const {
                        universalLinks: e,
                        handleOpenURL: t,
                        BuildInfo: n
                    } = xr(), s = setTimeout(async () => {
                        await Br(r), i.onEvent(Xr())
                    }, 500), a = async e => {
                        clearTimeout(s);
                        var t = await Br(r);
                        let n = null;
                        t && null != e && e.url && (n = Gr(t, e.url)), i.onEvent(n || Xr())
                    };
                    void 0 !== e && "function" == typeof e.subscribe && e.subscribe(null, a);
                    const o = t,
                        c = `${n.packageName.toLowerCase()}://`;
                    xr().handleOpenURL = async e => {
                        if (e.toLowerCase().startsWith(c) && a({
                                url: e
                            }), "function" == typeof o) try {
                            o(e)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
            };

            function Xr() {
                return {
                    type: "unknown",
                    eventId: null,
                    sessionId: null,
                    urlResponse: null,
                    postBody: null,
                    tenantId: null,
                    error: H("no-auth-event")
                }
            }
            var Qr;

            function Zr() {
                var e;
                return (null === (e = null === self || void 0 === self ? void 0 : self.location) || void 0 === e ? void 0 : e.protocol) || null
            }

            function ei(e = u()) {
                return !("file:" !== Zr() && "ionic:" !== Zr() && "capacitor:" !== Zr() || !e.toLowerCase().match(/iphone|ipad|ipod|android/))
            }

            function ti(e = u()) {
                return m() && 11 === (null === document || void 0 === document ? void 0 : document.documentMode) || ([e = u()] = [e], /Edge\/\d+/.test(e))
            }

            function ni() {
                try {
                    const t = self.localStorage;
                    var e = fn();
                    if (t) return t.setItem(e, "1"), t.removeItem(e), !ti() || v()
                } catch (e) {
                    return ri() && v()
                }
                return !1
            }

            function ri() {
                return "undefined" != typeof global && "WorkerGlobalScope" in global && "importScripts" in global
            }

            function ii() {
                return ("http:" === Zr() || "https:" === Zr() || p() || ei()) && !(f() || h()) && ni() && !ri()
            }

            function si() {
                return ei() && "undefined" != typeof document
            }
            const ai = {
                    LOCAL: "local",
                    NONE: "none",
                    SESSION: "session"
                },
                oi = B,
                ci = "persistence";
            async function li(e) {
                await e._initializationPromise;
                const t = di();
                var n = Se(ci, e.config.apiKey, e.name);
                t && t.setItem(n, e._getPersistence())
            }

            function di() {
                var e;
                try {
                    return (null === (e = "undefined" != typeof window ? window : null) ? void 0 : e.sessionStorage) || null
                } catch (e) {
                    return null
                }
            }
            const ui = B;
            class hi {
                constructor() {
                    this.browserResolver = Ee(Or), this.cordovaResolver = Ee(Yr), this.underlyingResolver = null, this._redirectPersistence = hn, this._completeRedirectFn = ir, this._overrideRedirectResult = Qn
                }
                async _initialize(e) {
                    return await this.selectUnderlyingResolver(), this.assertedUnderlyingResolver._initialize(e)
                }
                async _openPopup(e, t, n, r) {
                    return await this.selectUnderlyingResolver(), this.assertedUnderlyingResolver._openPopup(e, t, n, r)
                }
                async _openRedirect(e, t, n, r) {
                    return await this.selectUnderlyingResolver(), this.assertedUnderlyingResolver._openRedirect(e, t, n, r)
                }
                _isIframeWebStorageSupported(e, t) {
                    this.assertedUnderlyingResolver._isIframeWebStorageSupported(e, t)
                }
                _originValidation(e) {
                    return this.assertedUnderlyingResolver._originValidation(e)
                }
                get _shouldInitProactively() {
                    return si() || this.browserResolver._shouldInitProactively
                }
                get assertedUnderlyingResolver() {
                    return ui(this.underlyingResolver, "internal-error"), this.underlyingResolver
                }
                async selectUnderlyingResolver() {
                    var e;
                    this.underlyingResolver || (e = await (!!si() && new Promise(e => {
                        const t = setTimeout(() => {
                            e(!1)
                        }, 1e3);
                        document.addEventListener("deviceready", () => {
                            clearTimeout(t), e(!0)
                        })
                    })), this.underlyingResolver = e ? this.cordovaResolver : this.browserResolver)
                }
            }

            function pi(e) {
                return e.unwrap()
            }

            function fi(e, t) {
                var n, r, i, s = null === (r = t.customData) || void 0 === r ? void 0 : r._tokenResponse;
                if ("auth/multi-factor-auth-required" === (null == t ? void 0 : t.code)) {
                    const o = t;
                    o.resolver = new _i(e, (n = t, i = k(e), B((a = n).customData.operationType, i, "argument-error"), B(null === (r = a.customData._serverResponse) || void 0 === r ? void 0 : r.mfaPendingCredential, i, "argument-error"), rn._fromError(i, a)))
                } else if (s) {
                    var a = mi(t);
                    const c = t;
                    a && (c.credential = a, c.tenantId = s.tenantId || void 0, c.email = s.email || void 0, c.phoneNumber = s.phoneNumber || void 0)
                }
            }

            function mi(e) {
                var t = (e instanceof g ? e.customData : e)["_tokenResponse"];
                if (!t) return null;
                if (!(e instanceof g) && "temporaryProof" in t && "phoneNumber" in t) return xn.credentialFromResult(e);
                const n = t.providerId;
                if (!n || n === N.PASSWORD) return null;
                let r;
                switch (n) {
                    case N.GOOGLE:
                        r = gt;
                        break;
                    case N.FACEBOOK:
                        r = vt;
                        break;
                    case N.GITHUB:
                        r = _t;
                        break;
                    case N.TWITTER:
                        r = wt;
                        break;
                    default:
                        var {
                            oauthIdToken: i,
                            oauthAccessToken: s,
                            oauthTokenSecret: a,
                            pendingToken: o,
                            nonce: c
                        } = t;
                        return s || a || i || o ? o ? n.startsWith("saml.") ? yt._create(n, o) : ct._fromParams({
                            providerId: n,
                            signInMethod: n,
                            pendingToken: o,
                            idToken: i,
                            accessToken: s
                        }) : new mt(n).credential({
                            idToken: i,
                            accessToken: s,
                            rawNonce: c
                        }) : null
                }
                return e instanceof g ? r.credentialFromError(e) : r.credentialFromResult(e)
            }

            function vi(t, e) {
                return e.catch(e => {
                    throw e instanceof g && fi(t, e), e
                }).then(e => {
                    var t = e.operationType,
                        n = e.user;
                    return {
                        operationType: t,
                        credential: mi(e),
                        additionalUserInfo: tn(e),
                        user: yi.getOrCreate(n)
                    }
                })
            }
            async function gi(t, e) {
                const n = await e;
                return {
                    verificationId: n.verificationId,
                    confirm: e => vi(t, n.confirm(e))
                }
            }
            class _i {
                constructor(e, t) {
                    this.resolver = t, this.auth = e.wrapped()
                }
                get session() {
                    return this.resolver.session
                }
                get hints() {
                    return this.resolver.hints
                }
                resolveSignIn(e) {
                    return vi(pi(this.auth), this.resolver.resolveSignIn(e))
                }
            }
            class yi {
                constructor(e) {
                    var t;
                    this._delegate = e, this.multiFactor = (t = k(e), an.has(t) || an.set(t, sn._fromUser(t)), an.get(t))
                }
                static getOrCreate(e) {
                    return yi.USER_MAP.has(e) || yi.USER_MAP.set(e, new yi(e)), yi.USER_MAP.get(e)
                }
                delete() {
                    return this._delegate.delete()
                }
                reload() {
                    return this._delegate.reload()
                }
                toJSON() {
                    return this._delegate.toJSON()
                }
                getIdTokenResult(e) {
                    return this._delegate.getIdTokenResult(e)
                }
                getIdToken(e) {
                    return this._delegate.getIdToken(e)
                }
                linkAndRetrieveDataWithCredential(e) {
                    return this.linkWithCredential(e)
                }
                async linkWithCredential(e) {
                    return vi(this.auth, Dt(this._delegate, e))
                }
                async linkWithPhoneNumber(e, t) {
                    return gi(this.auth, async function(e, t, n) {
                        const r = k(e);
                        await Ct(!1, r, "phone");
                        var i = await Vn(r.auth, t, k(n));
                        return new Fn(i, e => Dt(r, e))
                    }(this._delegate, e, t))
                }
                async linkWithPopup(e) {
                    return vi(this.auth, async function(e, t, n) {
                        var r = k(e);
                        q(r.auth, t, pt);
                        var i = jn(r.auth, n);
                        const s = new Kn(r.auth, "linkViaPopup", t, i, r);
                        return s.executeNotNull()
                    }(this._delegate, e, hi))
                }
                async linkWithRedirect(e) {
                    return await li(We(this.auth)), rr(this._delegate, e, hi)
                }
                reauthenticateAndRetrieveDataWithCredential(e) {
                    return this.reauthenticateWithCredential(e)
                }
                async reauthenticateWithCredential(e) {
                    return vi(this.auth, Mt(this._delegate, e))
                }
                reauthenticateWithPhoneNumber(e, t) {
                    return gi(this.auth, async function(e, t, n) {
                        const r = k(e);
                        var i = await Vn(r.auth, t, k(n));
                        return new Fn(i, e => Mt(r, e))
                    }(this._delegate, e, t))
                }
                reauthenticateWithPopup(e) {
                    return vi(this.auth, async function(e, t, n) {
                        var r = k(e);
                        q(r.auth, t, pt);
                        var i = jn(r.auth, n);
                        const s = new Kn(r.auth, "reauthViaPopup", t, i, r);
                        return s.executeNotNull()
                    }(this._delegate, e, hi))
                }
                async reauthenticateWithRedirect(e) {
                    return await li(We(this.auth)), nr(this._delegate, e, hi)
                }
                sendEmailVerification(e) {
                    return Bt(this._delegate, e)
                }
                async unlink(e) {
                    return await At(this._delegate, e), this
                }
                updateEmail(e) {
                    return $t(k(this._delegate), e, null)
                }
                updatePassword(e) {
                    return $t(k(this._delegate), null, e)
                }
                updatePhoneNumber(e) {
                    return async function(e, t) {
                        await Pt(k(e), t)
                    }(this._delegate, e)
                }
                updateProfile(e) {
                    return Kt(this._delegate, e)
                }
                verifyBeforeUpdateEmail(e, t) {
                    return Gt(this._delegate, e, t)
                }
                get emailVerified() {
                    return this._delegate.emailVerified
                }
                get isAnonymous() {
                    return this._delegate.isAnonymous
                }
                get metadata() {
                    return this._delegate.metadata
                }
                get phoneNumber() {
                    return this._delegate.phoneNumber
                }
                get providerData() {
                    return this._delegate.providerData
                }
                get refreshToken() {
                    return this._delegate.refreshToken
                }
                get tenantId() {
                    return this._delegate.tenantId
                }
                get displayName() {
                    return this._delegate.displayName
                }
                get email() {
                    return this._delegate.email
                }
                get photoURL() {
                    return this._delegate.photoURL
                }
                get providerId() {
                    return this._delegate.providerId
                }
                get uid() {
                    return this._delegate.uid
                }
                get auth() {
                    return this._delegate.auth
                }
            }
            yi.USER_MAP = new WeakMap;
            const Ii = B;
            class wi {
                constructor(e, t) {
                    if (this.app = e, t.isInitialized()) return this._delegate = t.getImmediate(), void this.linkUnderlyingAuth();
                    var n = e.options["apiKey"];
                    Ii(n, "invalid-api-key", {
                        appName: e.name
                    }), Ii(n, "invalid-api-key", {
                        appName: e.name
                    });
                    var r = "undefined" != typeof window ? hi : void 0;
                    this._delegate = t.initialize({
                        options: {
                            persistence: function(e, t) {
                                const n = function(e, t) {
                                    const n = di();
                                    if (!n) return [];
                                    var r = Se(ci, e, t);
                                    switch (n.getItem(r)) {
                                        case ai.NONE:
                                            return [ke];
                                        case ai.LOCAL:
                                            return [Rn, hn];
                                        case ai.SESSION:
                                            return [hn];
                                        default:
                                            return []
                                    }
                                }(e, t);
                                "undefined" == typeof self || n.includes(Rn) || n.push(Rn);
                                if ("undefined" != typeof window)
                                    for (const r of [dn, hn]) n.includes(r) || n.push(r);
                                n.includes(ke) || n.push(ke);
                                return n
                            }(n, e.name),
                            popupRedirectResolver: r
                        }
                    }), this._delegate._updateErrorMap(M), this.linkUnderlyingAuth()
                }
                get emulatorConfig() {
                    return this._delegate.emulatorConfig
                }
                get currentUser() {
                    return this._delegate.currentUser ? yi.getOrCreate(this._delegate.currentUser) : null
                }
                get languageCode() {
                    return this._delegate.languageCode
                }
                set languageCode(e) {
                    this._delegate.languageCode = e
                }
                get settings() {
                    return this._delegate.settings
                }
                get tenantId() {
                    return this._delegate.tenantId
                }
                set tenantId(e) {
                    this._delegate.tenantId = e
                }
                useDeviceLanguage() {
                    this._delegate.useDeviceLanguage()
                }
                signOut() {
                    return this._delegate.signOut()
                }
                useEmulator(e, t) {
                    Ye(this._delegate, e, t)
                }
                applyActionCode(e) {
                    return Wt(this._delegate, e)
                }
                checkActionCode(e) {
                    return qt(this._delegate, e)
                }
                confirmPasswordReset(e, t) {
                    return async function(t, e, n) {
                        await et(k(t), {
                            oobCode: e,
                            newPassword: n
                        }).catch(async e => {
                            throw "auth/password-does-not-meet-requirements" === e.code && Ht(t), e
                        })
                    }(this._delegate, e, t)
                }
                async createUserWithEmailAndPassword(e, t) {
                    return vi(this._delegate, async function(t, e, n) {
                        const r = We(t),
                            i = Je(r, {
                                returnSecureToken: !0,
                                email: e,
                                password: n,
                                clientType: "CLIENT_TYPE_WEB"
                            }, "signUpPassword", Tt);
                        var s = await i.catch(e => {
                                throw "auth/password-does-not-meet-requirements" === e.code && Ht(t), e
                            }),
                            s = await Et._fromIdTokenResponse(r, "signIn", s);
                        return await r._updateCurrentUser(s.user), s
                    }(this._delegate, e, t))
                }
                fetchProvidersForEmail(e) {
                    return this.fetchSignInMethodsForEmail(e)
                }
                fetchSignInMethodsForEmail(e) {
                    return zt(this._delegate, e)
                }
                isSignInWithEmailLink(e) {
                    return this._delegate, e = e, "EMAIL_SIGNIN" === (null == (t = ut.parseLink(e)) ? void 0 : t.operation);
                    var t
                }
                async getRedirectResult() {
                    Ii(ii(), this._delegate, "operation-not-supported-in-this-environment");
                    var e, t, n = (e = this._delegate, t = hi, await We(e)._initializationPromise, await ir(e, t, !1));
                    return n ? vi(this._delegate, Promise.resolve(n)) : {
                        credential: null,
                        user: null
                    }
                }
                addFrameworkForLogging(e) {
                    We(this._delegate)._logFramework(e)
                }
                onAuthStateChanged(e, t, n) {
                    var {
                        next: r,
                        error: i,
                        complete: s
                    } = Ti(e, t, n);
                    return this._delegate.onAuthStateChanged(r, i, s)
                }
                onIdTokenChanged(e, t, n) {
                    var {
                        next: r,
                        error: i,
                        complete: s
                    } = Ti(e, t, n);
                    return this._delegate.onIdTokenChanged(r, i, s)
                }
                sendSignInLinkToEmail(e, t) {
                    return async function(e, t, n) {
                        const r = We(e);
                        var i = {
                            requestType: "EMAIL_SIGNIN",
                            email: t,
                            clientType: "CLIENT_TYPE_WEB"
                        };
                        t = i, B((n = n).handleCodeInApp, r, "argument-error"), n && jt(r, t, n), await Je(r, i, "getOobCode", st)
                    }(this._delegate, e, t)
                }
                sendPasswordResetEmail(e, t) {
                    return async function(e, t, n) {
                        var r = We(e),
                            i = {
                                requestType: "PASSWORD_RESET",
                                email: t,
                                clientType: "CLIENT_TYPE_WEB"
                            };
                        n && jt(r, i, n), await Je(r, i, "getOobCode", it)
                    }(this._delegate, e, t || void 0)
                }
                async setPersistence(e) {
                    var t, n;
                    t = this._delegate, n = e, oi(Object.values(ai).includes(n), t, "invalid-persistence-type"), f() ? oi(n !== ai.SESSION, t, "unsupported-persistence-type") : h() ? oi(n === ai.NONE, t, "unsupported-persistence-type") : ri() ? oi(n === ai.NONE || n === ai.LOCAL && v(), t, "unsupported-persistence-type") : oi(n === ai.NONE || ni(), t, "unsupported-persistence-type");
                    let r;
                    switch (e) {
                        case ai.SESSION:
                            r = hn;
                            break;
                        case ai.LOCAL:
                            var i = await Ee(Rn)._isAvailable();
                            r = i ? Rn : dn;
                            break;
                        case ai.NONE:
                            r = ke;
                            break;
                        default:
                            return j("argument-error", {
                                appName: this._delegate.name
                            })
                    }
                    return this._delegate.setPersistence(r)
                }
                signInAndRetrieveDataWithCredential(e) {
                    return this.signInWithCredential(e)
                }
                signInAnonymously() {
                    return vi(this._delegate, async function(e) {
                        const t = We(e);
                        if (await t._initializationPromise, null !== (n = t.currentUser) && void 0 !== n && n.isAnonymous) return new Et({
                            user: t.currentUser,
                            providerId: null,
                            operationType: "signIn"
                        });
                        var n = await Tt(t, {
                                returnSecureToken: !0
                            }),
                            n = await Et._fromIdTokenResponse(t, "signIn", n, !0);
                        return await t._updateCurrentUser(n.user), n
                    }(this._delegate))
                }
                signInWithCredential(e) {
                    return vi(this._delegate, Lt(this._delegate, e))
                }
                signInWithCustomToken(e) {
                    return vi(this._delegate, Ut(this._delegate, e))
                }
                signInWithEmailAndPassword(e, t) {
                    return vi(this._delegate, (n = this._delegate, e = e, t = t, Lt(k(n), ht.credential(e, t)).catch(async e => {
                        throw "auth/password-does-not-meet-requirements" === e.code && Ht(n), e
                    })));
                    var n
                }
                signInWithEmailLink(e, t) {
                    return vi(this._delegate, async function(e, t, n) {
                        var r = k(e),
                            i = ht.credentialWithLink(t, n || $());
                        return B(i._tenantId === (r.tenantId || null), r, "tenant-id-mismatch"), Lt(r, i)
                    }(this._delegate, e, t))
                }
                signInWithPhoneNumber(e, t) {
                    return gi(this._delegate, async function(e, t, n) {
                        const r = We(e);
                        var i = await Vn(r, t, k(n));
                        return new Fn(i, e => Lt(r, e))
                    }(this._delegate, e, t))
                }
                async signInWithPopup(e) {
                    return Ii(ii(), this._delegate, "operation-not-supported-in-this-environment"), vi(this._delegate, async function(e, t, n) {
                        var r = We(e);
                        q(e, t, pt);
                        var i = jn(r, n);
                        const s = new Kn(r, "signInViaPopup", t, i);
                        return s.executeNotNull()
                    }(this._delegate, e, hi))
                }
                async signInWithRedirect(e) {
                    return Ii(ii(), this._delegate, "operation-not-supported-in-this-environment"), await li(this._delegate), tr(this._delegate, e, hi)
                }
                updateCurrentUser(e) {
                    return this._delegate.updateCurrentUser(e)
                }
                verifyPasswordResetCode(e) {
                    return async function(e, t) {
                        var n = (await qt(k(e), t))["data"];
                        return n.email
                    }(this._delegate, e)
                }
                unwrap() {
                    return this._delegate
                }
                _delete() {
                    return this._delegate._delete()
                }
                linkUnderlyingAuth() {
                    this._delegate.wrapped = () => this
                }
            }

            function Ti(e, t, n) {
                let r = e;
                "function" != typeof e && ({
                    next: r,
                    error: t,
                    complete: n
                } = e);
                const i = r;
                return {
                    next: e => i(e && yi.getOrCreate(e)),
                    error: t,
                    complete: n
                }
            }
            wi.Persistence = ai;
            class Ei {
                constructor() {
                    this.providerId = "phone", this._delegate = new xn(pi(i.default.auth()))
                }
                static credential(e, t) {
                    return xn.credential(e, t)
                }
                verifyPhoneNumber(e, t) {
                    return this._delegate.verifyPhoneNumber(e, t)
                }
                unwrap() {
                    return this._delegate
                }
            }
            Ei.PHONE_SIGN_IN_METHOD = xn.PHONE_SIGN_IN_METHOD, Ei.PROVIDER_ID = xn.PROVIDER_ID;
            const bi = B;
            class ki {
                constructor(e, t, n = i.default.app()) {
                    var r;
                    bi(null === (r = n.options) || void 0 === r ? void 0 : r.apiKey, "invalid-api-key", {
                        appName: n.name
                    }), this._delegate = new Un(n.auth(), e, t), this.type = this._delegate.type
                }
                clear() {
                    this._delegate.clear()
                }
                render() {
                    return this._delegate.render()
                }
                verify() {
                    return this._delegate.verify()
                }
            }(Qr = i.default).INTERNAL.registerComponent(new O("auth-compat", e => {
                var t = e.getProvider("app-compat").getImmediate(),
                    n = e.getProvider("auth");
                return new wi(t, n)
            }, "PUBLIC").setServiceProps({
                ActionCodeInfo: {
                    Operation: {
                        EMAIL_SIGNIN: L.EMAIL_SIGNIN,
                        PASSWORD_RESET: L.PASSWORD_RESET,
                        RECOVER_EMAIL: L.RECOVER_EMAIL,
                        REVERT_SECOND_FACTOR_ADDITION: L.REVERT_SECOND_FACTOR_ADDITION,
                        VERIFY_AND_CHANGE_EMAIL: L.VERIFY_AND_CHANGE_EMAIL,
                        VERIFY_EMAIL: L.VERIFY_EMAIL
                    }
                },
                EmailAuthProvider: ht,
                FacebookAuthProvider: vt,
                GithubAuthProvider: _t,
                GoogleAuthProvider: gt,
                OAuthProvider: mt,
                SAMLAuthProvider: It,
                PhoneAuthProvider: Ei,
                PhoneMultiFactorGenerator: Lr,
                RecaptchaVerifier: ki,
                TwitterAuthProvider: wt,
                Auth: wi,
                AuthCredential: Ze,
                Error: g
            }).setInstantiationMode("LAZY").setMultipleInstances(!1)), Qr.registerVersion("@firebase/auth-compat", "0.5.4")
        }).apply(this, arguments)
    } catch (e) {
        throw console.error(e), new Error("Cannot instantiate firebase-auth-compat.js - be sure to load firebase-app.js first.")
    }
});
//# sourceMappingURL=firebase-auth-compat.js.map