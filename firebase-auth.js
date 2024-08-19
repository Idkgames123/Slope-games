import {
    _getProvider,
    _registerComponent as e,
    registerVersion as t,
    getApp as r,
    SDK_VERSION as n
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
const i = {
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
    encodeByteArray(e, t) {
        if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const r = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
            n = [];
        for (let t = 0; t < e.length; t += 3) {
            const i = e[t],
                s = t + 1 < e.length,
                o = s ? e[t + 1] : 0,
                a = t + 2 < e.length,
                c = a ? e[t + 2] : 0,
                d = i >> 2,
                u = (3 & i) << 4 | o >> 4;
            let l = (15 & o) << 2 | c >> 6,
                h = 63 & c;
            a || (h = 64, s || (l = 64)), n.push(r[d], r[u], r[l], r[h])
        }
        return n.join("")
    },
    encodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(function(e) {
            const t = [];
            let r = 0;
            for (let n = 0; n < e.length; n++) {
                let i = e.charCodeAt(n);
                i < 128 ? t[r++] = i : i < 2048 ? (t[r++] = i >> 6 | 192, t[r++] = 63 & i | 128) : 55296 == (64512 & i) && n + 1 < e.length && 56320 == (64512 & e.charCodeAt(n + 1)) ? (i = 65536 + ((1023 & i) << 10) + (1023 & e.charCodeAt(++n)), t[r++] = i >> 18 | 240, t[r++] = i >> 12 & 63 | 128, t[r++] = i >> 6 & 63 | 128, t[r++] = 63 & i | 128) : (t[r++] = i >> 12 | 224, t[r++] = i >> 6 & 63 | 128, t[r++] = 63 & i | 128)
            }
            return t
        }(e), t)
    },
    decodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function(e) {
            const t = [];
            let r = 0,
                n = 0;
            for (; r < e.length;) {
                const i = e[r++];
                if (i < 128) t[n++] = String.fromCharCode(i);
                else if (i > 191 && i < 224) {
                    const s = e[r++];
                    t[n++] = String.fromCharCode((31 & i) << 6 | 63 & s)
                } else if (i > 239 && i < 365) {
                    const s = ((7 & i) << 18 | (63 & e[r++]) << 12 | (63 & e[r++]) << 6 | 63 & e[r++]) - 65536;
                    t[n++] = String.fromCharCode(55296 + (s >> 10)), t[n++] = String.fromCharCode(56320 + (1023 & s))
                } else {
                    const s = e[r++],
                        o = e[r++];
                    t[n++] = String.fromCharCode((15 & i) << 12 | (63 & s) << 6 | 63 & o)
                }
            }
            return t.join("")
        }(this.decodeStringToByteArray(e, t))
    },
    decodeStringToByteArray(e, t) {
        this.init_();
        const r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
            n = [];
        for (let t = 0; t < e.length;) {
            const i = r[e.charAt(t++)],
                s = t < e.length ? r[e.charAt(t)] : 0;
            ++t;
            const o = t < e.length ? r[e.charAt(t)] : 64;
            ++t;
            const a = t < e.length ? r[e.charAt(t)] : 64;
            if (++t, null == i || null == s || null == o || null == a) throw new DecodeBase64StringError;
            const c = i << 2 | s >> 4;
            if (n.push(c), 64 !== o) {
                const e = s << 4 & 240 | o >> 2;
                if (n.push(e), 64 !== a) {
                    const e = o << 6 & 192 | a;
                    n.push(e)
                }
            }
        }
        return n
    },
    init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
            for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
        }
    }
};
class DecodeBase64StringError extends Error {
    constructor() {
        super(...arguments), this.name = "DecodeBase64StringError"
    }
}
const base64Decode = function(e) {
    try {
        return i.decodeString(e, !0)
    } catch (e) {
        console.error("base64Decode failed: ", e)
    }
    return null
};
const getDefaultsFromGlobal = () => function getGlobal() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("Unable to locate global object.")
    }().__FIREBASE_DEFAULTS__,
    getDefaults = () => {
        try {
            return getDefaultsFromGlobal() || (() => {
                if ("undefined" == typeof process || void 0 === process.env) return;
                const e = process.env.__FIREBASE_DEFAULTS__;
                return e ? JSON.parse(e) : void 0
            })() || (() => {
                if ("undefined" == typeof document) return;
                let e;
                try {
                    e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                } catch (e) {
                    return
                }
                const t = e && base64Decode(e[1]);
                return t && JSON.parse(t)
            })()
        } catch (e) {
            return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
        }
    },
    getExperimentalSetting = e => {
        var t;
        return null === (t = getDefaults()) || void 0 === t ? void 0 : t[`_${e}`]
    };

function getUA() {
    return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
}
class FirebaseError extends Error {
    constructor(e, t, r) {
        super(t), this.code = e, this.customData = r, this.name = "FirebaseError", Object.setPrototypeOf(this, FirebaseError.prototype), Error.captureStackTrace && Error.captureStackTrace(this, ErrorFactory.prototype.create)
    }
}
class ErrorFactory {
    constructor(e, t, r) {
        this.service = e, this.serviceName = t, this.errors = r
    }
    create(e, ...t) {
        const r = t[0] || {},
            n = `${this.service}/${e}`,
            i = this.errors[e],
            o = i ? function replaceTemplate(e, t) {
                return e.replace(s, ((e, r) => {
                    const n = t[r];
                    return null != n ? String(n) : `<${r}?>`
                }))
            }(i, r) : "Error",
            a = `${this.serviceName}: ${o} (${n}).`;
        return new FirebaseError(n, a, r)
    }
}
const s = /\{\$([^}]+)}/g;

function deepEqual(e, t) {
    if (e === t) return !0;
    const r = Object.keys(e),
        n = Object.keys(t);
    for (const i of r) {
        if (!n.includes(i)) return !1;
        const r = e[i],
            s = t[i];
        if (isObject(r) && isObject(s)) {
            if (!deepEqual(r, s)) return !1
        } else if (r !== s) return !1
    }
    for (const e of n)
        if (!r.includes(e)) return !1;
    return !0
}

function isObject(e) {
    return null !== e && "object" == typeof e
}

function querystring(e) {
    const t = [];
    for (const [r, n] of Object.entries(e)) Array.isArray(n) ? n.forEach((e => {
        t.push(encodeURIComponent(r) + "=" + encodeURIComponent(e))
    })) : t.push(encodeURIComponent(r) + "=" + encodeURIComponent(n));
    return t.length ? "&" + t.join("&") : ""
}

function querystringDecode(e) {
    const t = {};
    return e.replace(/^\?/, "").split("&").forEach((e => {
        if (e) {
            const [r, n] = e.split("=");
            t[decodeURIComponent(r)] = decodeURIComponent(n)
        }
    })), t
}

function extractQuerystring(e) {
    const t = e.indexOf("?");
    if (!t) return "";
    const r = e.indexOf("#", t);
    return e.substring(t, r > 0 ? r : void 0)
}
class ObserverProxy {
    constructor(e, t) {
        this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then((() => {
            e(this)
        })).catch((e => {
            this.error(e)
        }))
    }
    next(e) {
        this.forEachObserver((t => {
            t.next(e)
        }))
    }
    error(e) {
        this.forEachObserver((t => {
            t.error(e)
        })), this.close(e)
    }
    complete() {
        this.forEachObserver((e => {
            e.complete()
        })), this.close()
    }
    subscribe(e, t, r) {
        let n;
        if (void 0 === e && void 0 === t && void 0 === r) throw new Error("Missing Observer.");
        n = function implementsAnyMethods(e, t) {
            if ("object" != typeof e || null === e) return !1;
            for (const r of t)
                if (r in e && "function" == typeof e[r]) return !0;
            return !1
        }(e, ["next", "error", "complete"]) ? e : {
            next: e,
            error: t,
            complete: r
        }, void 0 === n.next && (n.next = noop), void 0 === n.error && (n.error = noop), void 0 === n.complete && (n.complete = noop);
        const i = this.unsubscribeOne.bind(this, this.observers.length);
        return this.finalized && this.task.then((() => {
            try {
                this.finalError ? n.error(this.finalError) : n.complete()
            } catch (e) {}
        })), this.observers.push(n), i
    }
    unsubscribeOne(e) {
        void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
    }
    forEachObserver(e) {
        if (!this.finalized)
            for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e)
    }
    sendOne(e, t) {
        this.task.then((() => {
            if (void 0 !== this.observers && void 0 !== this.observers[e]) try {
                t(this.observers[e])
            } catch (e) {
                "undefined" != typeof console && console.error && console.error(e)
            }
        }))
    }
    close(e) {
        this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then((() => {
            this.observers = void 0, this.onNoObservers = void 0
        })))
    }
}

function noop() {}

function getModularInstance(e) {
    return e && e._delegate ? e._delegate : e
}
var o;
! function(e) {
    e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT"
}(o || (o = {}));
const a = {
        debug: o.DEBUG,
        verbose: o.VERBOSE,
        info: o.INFO,
        warn: o.WARN,
        error: o.ERROR,
        silent: o.SILENT
    },
    c = o.INFO,
    d = {
        [o.DEBUG]: "log",
        [o.VERBOSE]: "log",
        [o.INFO]: "info",
        [o.WARN]: "warn",
        [o.ERROR]: "error"
    },
    defaultLogHandler = (e, t, ...r) => {
        if (t < e.logLevel) return;
        const n = (new Date).toISOString(),
            i = d[t];
        if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
        console[i](`[${n}]  ${e.name}:`, ...r)
    };

function __rest(e, t) {
    var r = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (n = Object.getOwnPropertySymbols(e); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]])
    }
    return r
}
class Component {
    constructor(e, t, r) {
        this.name = e, this.instanceFactory = t, this.type = r, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
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
const u = {
        PHONE: "phone",
        TOTP: "totp"
    },
    l = {
        FACEBOOK: "facebook.com",
        GITHUB: "github.com",
        GOOGLE: "google.com",
        PASSWORD: "password",
        PHONE: "phone",
        TWITTER: "twitter.com"
    },
    h = {
        EMAIL_LINK: "emailLink",
        EMAIL_PASSWORD: "password",
        FACEBOOK: "facebook.com",
        GITHUB: "github.com",
        GOOGLE: "google.com",
        PHONE: "phone",
        TWITTER: "twitter.com"
    },
    p = {
        LINK: "link",
        REAUTHENTICATE: "reauthenticate",
        SIGN_IN: "signIn"
    },
    f = {
        EMAIL_SIGNIN: "EMAIL_SIGNIN",
        PASSWORD_RESET: "PASSWORD_RESET",
        RECOVER_EMAIL: "RECOVER_EMAIL",
        REVERT_SECOND_FACTOR_ADDITION: "REVERT_SECOND_FACTOR_ADDITION",
        VERIFY_AND_CHANGE_EMAIL: "VERIFY_AND_CHANGE_EMAIL",
        VERIFY_EMAIL: "VERIFY_EMAIL"
    };

function _prodErrorMap() {
    return {
        "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
    }
}
const m = function _debugErrorMap() {
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
    },
    g = _prodErrorMap,
    _ = new ErrorFactory("auth", "Firebase", {
        "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
    }),
    I = {
        ADMIN_ONLY_OPERATION: "auth/admin-restricted-operation",
        ARGUMENT_ERROR: "auth/argument-error",
        APP_NOT_AUTHORIZED: "auth/app-not-authorized",
        APP_NOT_INSTALLED: "auth/app-not-installed",
        CAPTCHA_CHECK_FAILED: "auth/captcha-check-failed",
        CODE_EXPIRED: "auth/code-expired",
        CORDOVA_NOT_READY: "auth/cordova-not-ready",
        CORS_UNSUPPORTED: "auth/cors-unsupported",
        CREDENTIAL_ALREADY_IN_USE: "auth/credential-already-in-use",
        CREDENTIAL_MISMATCH: "auth/custom-token-mismatch",
        CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "auth/requires-recent-login",
        DEPENDENT_SDK_INIT_BEFORE_AUTH: "auth/dependent-sdk-initialized-before-auth",
        DYNAMIC_LINK_NOT_ACTIVATED: "auth/dynamic-link-not-activated",
        EMAIL_CHANGE_NEEDS_VERIFICATION: "auth/email-change-needs-verification",
        EMAIL_EXISTS: "auth/email-already-in-use",
        EMULATOR_CONFIG_FAILED: "auth/emulator-config-failed",
        EXPIRED_OOB_CODE: "auth/expired-action-code",
        EXPIRED_POPUP_REQUEST: "auth/cancelled-popup-request",
        INTERNAL_ERROR: "auth/internal-error",
        INVALID_API_KEY: "auth/invalid-api-key",
        INVALID_APP_CREDENTIAL: "auth/invalid-app-credential",
        INVALID_APP_ID: "auth/invalid-app-id",
        INVALID_AUTH: "auth/invalid-user-token",
        INVALID_AUTH_EVENT: "auth/invalid-auth-event",
        INVALID_CERT_HASH: "auth/invalid-cert-hash",
        INVALID_CODE: "auth/invalid-verification-code",
        INVALID_CONTINUE_URI: "auth/invalid-continue-uri",
        INVALID_CORDOVA_CONFIGURATION: "auth/invalid-cordova-configuration",
        INVALID_CUSTOM_TOKEN: "auth/invalid-custom-token",
        INVALID_DYNAMIC_LINK_DOMAIN: "auth/invalid-dynamic-link-domain",
        INVALID_EMAIL: "auth/invalid-email",
        INVALID_EMULATOR_SCHEME: "auth/invalid-emulator-scheme",
        INVALID_IDP_RESPONSE: "auth/invalid-credential",
        INVALID_LOGIN_CREDENTIALS: "auth/invalid-credential",
        INVALID_MESSAGE_PAYLOAD: "auth/invalid-message-payload",
        INVALID_MFA_SESSION: "auth/invalid-multi-factor-session",
        INVALID_OAUTH_CLIENT_ID: "auth/invalid-oauth-client-id",
        INVALID_OAUTH_PROVIDER: "auth/invalid-oauth-provider",
        INVALID_OOB_CODE: "auth/invalid-action-code",
        INVALID_ORIGIN: "auth/unauthorized-domain",
        INVALID_PASSWORD: "auth/wrong-password",
        INVALID_PERSISTENCE: "auth/invalid-persistence-type",
        INVALID_PHONE_NUMBER: "auth/invalid-phone-number",
        INVALID_PROVIDER_ID: "auth/invalid-provider-id",
        INVALID_RECIPIENT_EMAIL: "auth/invalid-recipient-email",
        INVALID_SENDER: "auth/invalid-sender",
        INVALID_SESSION_INFO: "auth/invalid-verification-id",
        INVALID_TENANT_ID: "auth/invalid-tenant-id",
        MFA_INFO_NOT_FOUND: "auth/multi-factor-info-not-found",
        MFA_REQUIRED: "auth/multi-factor-auth-required",
        MISSING_ANDROID_PACKAGE_NAME: "auth/missing-android-pkg-name",
        MISSING_APP_CREDENTIAL: "auth/missing-app-credential",
        MISSING_AUTH_DOMAIN: "auth/auth-domain-config-required",
        MISSING_CODE: "auth/missing-verification-code",
        MISSING_CONTINUE_URI: "auth/missing-continue-uri",
        MISSING_IFRAME_START: "auth/missing-iframe-start",
        MISSING_IOS_BUNDLE_ID: "auth/missing-ios-bundle-id",
        MISSING_OR_INVALID_NONCE: "auth/missing-or-invalid-nonce",
        MISSING_MFA_INFO: "auth/missing-multi-factor-info",
        MISSING_MFA_SESSION: "auth/missing-multi-factor-session",
        MISSING_PHONE_NUMBER: "auth/missing-phone-number",
        MISSING_SESSION_INFO: "auth/missing-verification-id",
        MODULE_DESTROYED: "auth/app-deleted",
        NEED_CONFIRMATION: "auth/account-exists-with-different-credential",
        NETWORK_REQUEST_FAILED: "auth/network-request-failed",
        NULL_USER: "auth/null-user",
        NO_AUTH_EVENT: "auth/no-auth-event",
        NO_SUCH_PROVIDER: "auth/no-such-provider",
        OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
        OPERATION_NOT_SUPPORTED: "auth/operation-not-supported-in-this-environment",
        POPUP_BLOCKED: "auth/popup-blocked",
        POPUP_CLOSED_BY_USER: "auth/popup-closed-by-user",
        PROVIDER_ALREADY_LINKED: "auth/provider-already-linked",
        QUOTA_EXCEEDED: "auth/quota-exceeded",
        REDIRECT_CANCELLED_BY_USER: "auth/redirect-cancelled-by-user",
        REDIRECT_OPERATION_PENDING: "auth/redirect-operation-pending",
        REJECTED_CREDENTIAL: "auth/rejected-credential",
        SECOND_FACTOR_ALREADY_ENROLLED: "auth/second-factor-already-in-use",
        SECOND_FACTOR_LIMIT_EXCEEDED: "auth/maximum-second-factor-count-exceeded",
        TENANT_ID_MISMATCH: "auth/tenant-id-mismatch",
        TIMEOUT: "auth/timeout",
        TOKEN_EXPIRED: "auth/user-token-expired",
        TOO_MANY_ATTEMPTS_TRY_LATER: "auth/too-many-requests",
        UNAUTHORIZED_DOMAIN: "auth/unauthorized-continue-uri",
        UNSUPPORTED_FIRST_FACTOR: "auth/unsupported-first-factor",
        UNSUPPORTED_PERSISTENCE: "auth/unsupported-persistence-type",
        UNSUPPORTED_TENANT_OPERATION: "auth/unsupported-tenant-operation",
        UNVERIFIED_EMAIL: "auth/unverified-email",
        USER_CANCELLED: "auth/user-cancelled",
        USER_DELETED: "auth/user-not-found",
        USER_DISABLED: "auth/user-disabled",
        USER_MISMATCH: "auth/user-mismatch",
        USER_SIGNED_OUT: "auth/user-signed-out",
        WEAK_PASSWORD: "auth/weak-password",
        WEB_STORAGE_UNSUPPORTED: "auth/web-storage-unsupported",
        ALREADY_INITIALIZED: "auth/already-initialized",
        RECAPTCHA_NOT_ENABLED: "auth/recaptcha-not-enabled",
        MISSING_RECAPTCHA_TOKEN: "auth/missing-recaptcha-token",
        INVALID_RECAPTCHA_TOKEN: "auth/invalid-recaptcha-token",
        INVALID_RECAPTCHA_ACTION: "auth/invalid-recaptcha-action",
        MISSING_CLIENT_TYPE: "auth/missing-client-type",
        MISSING_RECAPTCHA_VERSION: "auth/missing-recaptcha-version",
        INVALID_RECAPTCHA_VERSION: "auth/invalid-recaptcha-version",
        INVALID_REQ_TYPE: "auth/invalid-req-type"
    },
    v = new class Logger {
        constructor(e) {
            this.name = e, this._logLevel = c, this._logHandler = defaultLogHandler, this._userLogHandler = null
        }
        get logLevel() {
            return this._logLevel
        }
        set logLevel(e) {
            if (!(e in o)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
            this._logLevel = e
        }
        setLogLevel(e) {
            this._logLevel = "string" == typeof e ? a[e] : e
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
            this._userLogHandler && this._userLogHandler(this, o.DEBUG, ...e), this._logHandler(this, o.DEBUG, ...e)
        }
        log(...e) {
            this._userLogHandler && this._userLogHandler(this, o.VERBOSE, ...e), this._logHandler(this, o.VERBOSE, ...e)
        }
        info(...e) {
            this._userLogHandler && this._userLogHandler(this, o.INFO, ...e), this._logHandler(this, o.INFO, ...e)
        }
        warn(...e) {
            this._userLogHandler && this._userLogHandler(this, o.WARN, ...e), this._logHandler(this, o.WARN, ...e)
        }
        error(...e) {
            this._userLogHandler && this._userLogHandler(this, o.ERROR, ...e), this._logHandler(this, o.ERROR, ...e)
        }
    }("@firebase/auth");

function _logError(e, ...t) {
    v.logLevel <= o.ERROR && v.error(`Auth (${n}): ${e}`, ...t)
}

function _fail(e, ...t) {
    throw createErrorInternal(e, ...t)
}

function _createError(e, ...t) {
    return createErrorInternal(e, ...t)
}

function _errorWithCustomMessage(e, t, r) {
    const n = Object.assign(Object.assign({}, g()), {
        [t]: r
    });
    return new ErrorFactory("auth", "Firebase", n).create(t, {
        appName: e.name
    })
}

function _assertInstanceOf(e, t, r) {
    if (!(t instanceof r)) throw r.name !== t.constructor.name && _fail(e, "argument-error"), _errorWithCustomMessage(e, "argument-error", `Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)
}

function createErrorInternal(e, ...t) {
    if ("string" != typeof e) {
        const r = t[0],
            n = [...t.slice(1)];
        return n[0] && (n[0].appName = e.name), e._errorFactory.create(r, ...n)
    }
    return _.create(e, ...t)
}

function _assert(e, t, ...r) {
    if (!e) throw createErrorInternal(t, ...r)
}

function debugFail(e) {
    const t = "INTERNAL ASSERTION FAILED: " + e;
    throw _logError(t), new Error(t)
}

function debugAssert(e, t) {
    e || debugFail(t)
}

function _getCurrentUrl() {
    var e;
    return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.href) || ""
}

function _isHttpOrHttps() {
    return "http:" === _getCurrentScheme() || "https:" === _getCurrentScheme()
}

function _getCurrentScheme() {
    var e;
    return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.protocol) || null
}

function _isOnline() {
    return !("undefined" != typeof navigator && navigator && "onLine" in navigator && "boolean" == typeof navigator.onLine && (_isHttpOrHttps() || function isBrowserExtension() {
        const e = "object" == typeof chrome ? chrome.runtime : "object" == typeof browser ? browser.runtime : void 0;
        return "object" == typeof e && void 0 !== e.id
    }() || "connection" in navigator)) || navigator.onLine
}
class Delay {
    constructor(e, t) {
        this.shortDelay = e, this.longDelay = t, debugAssert(t > e, "Short delay should be less than long delay!"), this.isMobile = function isMobileCordova() {
            return "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA())
        }() || function isReactNative() {
            return "object" == typeof navigator && "ReactNative" === navigator.product
        }()
    }
    get() {
        return _isOnline() ? this.isMobile ? this.longDelay : this.shortDelay : Math.min(5e3, this.shortDelay)
    }
}

function _emulatorUrl(e, t) {
    debugAssert(e.emulator, "Emulator should always be set here");
    const {
        url: r
    } = e.emulator;
    return t ? `${r}${t.startsWith("/")?t.slice(1):t}` : r
}
class FetchProvider {
    static initialize(e, t, r) {
        this.fetchImpl = e, t && (this.headersImpl = t), r && (this.responseImpl = r)
    }
    static fetch() {
        return this.fetchImpl ? this.fetchImpl : "undefined" != typeof self && "fetch" in self ? self.fetch : "undefined" != typeof globalThis && globalThis.fetch ? globalThis.fetch : "undefined" != typeof fetch ? fetch : void debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
    }
    static headers() {
        return this.headersImpl ? this.headersImpl : "undefined" != typeof self && "Headers" in self ? self.Headers : "undefined" != typeof globalThis && globalThis.Headers ? globalThis.Headers : "undefined" != typeof Headers ? Headers : void debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
    }
    static response() {
        return this.responseImpl ? this.responseImpl : "undefined" != typeof self && "Response" in self ? self.Response : "undefined" != typeof globalThis && globalThis.Response ? globalThis.Response : "undefined" != typeof Response ? Response : void debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
    }
}
const T = {
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
    E = new Delay(3e4, 6e4);

function _addTidIfNecessary(e, t) {
    return e.tenantId && !t.tenantId ? Object.assign(Object.assign({}, t), {
        tenantId: e.tenantId
    }) : t
}
async function _performApiRequest(e, t, r, n, i = {}) {
    return _performFetchWithErrorHandling(e, i, (async () => {
        let i = {},
            s = {};
        n && ("GET" === t ? s = n : i = {
            body: JSON.stringify(n)
        });
        const o = querystring(Object.assign({
                key: e.config.apiKey
            }, s)).slice(1),
            a = await e._getAdditionalHeaders();
        return a["Content-Type"] = "application/json", e.languageCode && (a["X-Firebase-Locale"] = e.languageCode), FetchProvider.fetch()(_getFinalTarget(e, e.config.apiHost, r, o), Object.assign({
            method: t,
            headers: a,
            referrerPolicy: "no-referrer"
        }, i))
    }))
}
async function _performFetchWithErrorHandling(e, t, r) {
    e._canInitEmulator = !1;
    const n = Object.assign(Object.assign({}, T), t);
    try {
        const t = new NetworkTimeout(e),
            i = await Promise.race([r(), t.promise]);
        t.clearNetworkTimeout();
        const s = await i.json();
        if ("needConfirmation" in s) throw _makeTaggedError(e, "account-exists-with-different-credential", s);
        if (i.ok && !("errorMessage" in s)) return s; {
            const t = i.ok ? s.errorMessage : s.error.message,
                [r, o] = t.split(" : ");
            if ("FEDERATED_USER_ID_ALREADY_LINKED" === r) throw _makeTaggedError(e, "credential-already-in-use", s);
            if ("EMAIL_EXISTS" === r) throw _makeTaggedError(e, "email-already-in-use", s);
            if ("USER_DISABLED" === r) throw _makeTaggedError(e, "user-disabled", s);
            const a = n[r] || r.toLowerCase().replace(/[_\s]+/g, "-");
            if (o) throw _errorWithCustomMessage(e, a, o);
            _fail(e, a)
        }
    } catch (t) {
        if (t instanceof FirebaseError) throw t;
        _fail(e, "network-request-failed", {
            message: String(t)
        })
    }
}
async function _performSignInRequest(e, t, r, n, i = {}) {
    const s = await _performApiRequest(e, t, r, n, i);
    return "mfaPendingCredential" in s && _fail(e, "multi-factor-auth-required", {
        _serverResponse: s
    }), s
}

function _getFinalTarget(e, t, r, n) {
    const i = `${t}${r}?${n}`;
    return e.config.emulator ? _emulatorUrl(e.config, i) : `${e.config.apiScheme}://${i}`
}

function _parseEnforcementState(e) {
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
}
class NetworkTimeout {
    constructor(e) {
        this.auth = e, this.timer = null, this.promise = new Promise(((e, t) => {
            this.timer = setTimeout((() => t(_createError(this.auth, "network-request-failed"))), E.get())
        }))
    }
    clearNetworkTimeout() {
        clearTimeout(this.timer)
    }
}

function _makeTaggedError(e, t, r) {
    const n = {
        appName: e.name
    };
    r.email && (n.email = r.email), r.phoneNumber && (n.phoneNumber = r.phoneNumber);
    const i = _createError(e, t, n);
    return i.customData._tokenResponse = r, i
}

function isV2(e) {
    return void 0 !== e && void 0 !== e.getResponse
}

function isEnterprise(e) {
    return void 0 !== e && void 0 !== e.enterprise
}
class RecaptchaConfig {
    constructor(e) {
        if (this.siteKey = "", this.recaptchaEnforcementState = [], void 0 === e.recaptchaKey) throw new Error("recaptchaKey undefined");
        this.siteKey = e.recaptchaKey.split("/")[3], this.recaptchaEnforcementState = e.recaptchaEnforcementState
    }
    getProviderEnforcementState(e) {
        if (!this.recaptchaEnforcementState || 0 === this.recaptchaEnforcementState.length) return null;
        for (const t of this.recaptchaEnforcementState)
            if (t.provider && t.provider === e) return _parseEnforcementState(t.enforcementState);
        return null
    }
    isProviderEnabled(e) {
        return "ENFORCE" === this.getProviderEnforcementState(e) || "AUDIT" === this.getProviderEnforcementState(e)
    }
}
async function getRecaptchaConfig(e, t) {
    return _performApiRequest(e, "GET", "/v2/recaptchaConfig", _addTidIfNecessary(e, t))
}

function utcTimestampToDateString(e) {
    if (e) try {
        const t = new Date(Number(e));
        if (!isNaN(t.getTime())) return t.toUTCString()
    } catch (e) {}
}

function getIdToken(e, t = !1) {
    return getModularInstance(e).getIdToken(t)
}
async function getIdTokenResult(e, t = !1) {
    const r = getModularInstance(e),
        n = await r.getIdToken(t),
        i = _parseToken(n);
    _assert(i && i.exp && i.auth_time && i.iat, r.auth, "internal-error");
    const s = "object" == typeof i.firebase ? i.firebase : void 0,
        o = null == s ? void 0 : s.sign_in_provider;
    return {
        claims: i,
        token: n,
        authTime: utcTimestampToDateString(secondsStringToMilliseconds(i.auth_time)),
        issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(i.iat)),
        expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(i.exp)),
        signInProvider: o || null,
        signInSecondFactor: (null == s ? void 0 : s.sign_in_second_factor) || null
    }
}

function secondsStringToMilliseconds(e) {
    return 1e3 * Number(e)
}

function _parseToken(e) {
    const [t, r, n] = e.split(".");
    if (void 0 === t || void 0 === r || void 0 === n) return _logError("JWT malformed, contained fewer than 3 sections"), null;
    try {
        const e = base64Decode(r);
        return e ? JSON.parse(e) : (_logError("Failed to decode base64 JWT payload"), null)
    } catch (e) {
        return _logError("Caught error parsing JWT payload as JSON", null == e ? void 0 : e.toString()), null
    }
}
async function _logoutIfInvalidated(e, t, r = !1) {
    if (r) return t;
    try {
        return await t
    } catch (t) {
        throw t instanceof FirebaseError && function isUserInvalidated({
            code: e
        }) {
            return "auth/user-disabled" === e || "auth/user-token-expired" === e
        }(t) && e.auth.currentUser === e && await e.auth.signOut(), t
    }
}
class ProactiveRefresh {
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
        var t;
        if (e) {
            const e = this.errorBackoff;
            return this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4), e
        } {
            this.errorBackoff = 3e4;
            const e = (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t ? t : 0) - Date.now() - 3e5;
            return Math.max(0, e)
        }
    }
    schedule(e = !1) {
        if (!this.isRunning) return;
        const t = this.getInterval(e);
        this.timerId = setTimeout((async () => {
            await this.iteration()
        }), t)
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
class UserMetadata {
    constructor(e, t) {
        this.createdAt = e, this.lastLoginAt = t, this._initializeTime()
    }
    _initializeTime() {
        this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt), this.creationTime = utcTimestampToDateString(this.createdAt)
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
async function _reloadWithoutSaving(e) {
    var t;
    const r = e.auth,
        n = await e.getIdToken(),
        i = await _logoutIfInvalidated(e, async function getAccountInfo(e, t) {
            return _performApiRequest(e, "POST", "/v1/accounts:lookup", t)
        }(r, {
            idToken: n
        }));
    _assert(null == i ? void 0 : i.users.length, r, "internal-error");
    const s = i.users[0];
    e._notifyReloadListener(s);
    const o = (null === (t = s.providerUserInfo) || void 0 === t ? void 0 : t.length) ? function extractProviderData(e) {
            return e.map((e => {
                var {
                    providerId: t
                } = e, r = __rest(e, ["providerId"]);
                return {
                    providerId: t,
                    uid: r.rawId || "",
                    displayName: r.displayName || null,
                    email: r.email || null,
                    phoneNumber: r.phoneNumber || null,
                    photoURL: r.photoUrl || null
                }
            }))
        }(s.providerUserInfo) : [],
        a = function mergeProviderData(e, t) {
            return [...e.filter((e => !t.some((t => t.providerId === e.providerId)))), ...t]
        }(e.providerData, o),
        c = e.isAnonymous,
        d = !(e.email && s.passwordHash || (null == a ? void 0 : a.length)),
        u = !!c && d,
        l = {
            uid: s.localId,
            displayName: s.displayName || null,
            photoURL: s.photoUrl || null,
            email: s.email || null,
            emailVerified: s.emailVerified || !1,
            phoneNumber: s.phoneNumber || null,
            tenantId: s.tenantId || null,
            providerData: a,
            metadata: new UserMetadata(s.createdAt, s.lastLoginAt),
            isAnonymous: u
        };
    Object.assign(e, l)
}
async function reload(e) {
    const t = getModularInstance(e);
    await _reloadWithoutSaving(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t)
}
class StsTokenManager {
    constructor() {
        this.refreshToken = null, this.accessToken = null, this.expirationTime = null
    }
    get isExpired() {
        return !this.expirationTime || Date.now() > this.expirationTime - 3e4
    }
    updateFromServerResponse(e) {
        _assert(e.idToken, "internal-error"), _assert(void 0 !== e.idToken, "internal-error"), _assert(void 0 !== e.refreshToken, "internal-error");
        const t = "expiresIn" in e && void 0 !== e.expiresIn ? Number(e.expiresIn) : function _tokenExpiresIn(e) {
            const t = _parseToken(e);
            return _assert(t, "internal-error"), _assert(void 0 !== t.exp, "internal-error"), _assert(void 0 !== t.iat, "internal-error"), Number(t.exp) - Number(t.iat)
        }(e.idToken);
        this.updateTokensAndExpiration(e.idToken, e.refreshToken, t)
    }
    async getToken(e, t = !1) {
        return _assert(!this.accessToken || this.refreshToken, e, "user-token-expired"), t || !this.accessToken || this.isExpired ? this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null : this.accessToken
    }
    clearRefreshToken() {
        this.refreshToken = null
    }
    async refresh(e, t) {
        const {
            accessToken: r,
            refreshToken: n,
            expiresIn: i
        } = await async function requestStsToken(e, t) {
            const r = await _performFetchWithErrorHandling(e, {}, (async () => {
                const r = querystring({
                        grant_type: "refresh_token",
                        refresh_token: t
                    }).slice(1),
                    {
                        tokenApiHost: n,
                        apiKey: i
                    } = e.config,
                    s = _getFinalTarget(e, n, "/v1/token", `key=${i}`),
                    o = await e._getAdditionalHeaders();
                return o["Content-Type"] = "application/x-www-form-urlencoded", FetchProvider.fetch()(s, {
                    method: "POST",
                    headers: o,
                    body: r
                })
            }));
            return {
                accessToken: r.access_token,
                expiresIn: r.expires_in,
                refreshToken: r.refresh_token
            }
        }(e, t);
        this.updateTokensAndExpiration(r, n, Number(i))
    }
    updateTokensAndExpiration(e, t, r) {
        this.refreshToken = t || null, this.accessToken = e || null, this.expirationTime = Date.now() + 1e3 * r
    }
    static fromJSON(e, t) {
        const {
            refreshToken: r,
            accessToken: n,
            expirationTime: i
        } = t, s = new StsTokenManager;
        return r && (_assert("string" == typeof r, "internal-error", {
            appName: e
        }), s.refreshToken = r), n && (_assert("string" == typeof n, "internal-error", {
            appName: e
        }), s.accessToken = n), i && (_assert("number" == typeof i, "internal-error", {
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
        return Object.assign(new StsTokenManager, this.toJSON())
    }
    _performRefresh() {
        return debugFail("not implemented")
    }
}

function assertStringOrUndefined(e, t) {
    _assert("string" == typeof e || void 0 === e, "internal-error", {
        appName: t
    })
}
class UserImpl {
    constructor(e) {
        var {
            uid: t,
            auth: r,
            stsTokenManager: n
        } = e, i = __rest(e, ["uid", "auth", "stsTokenManager"]);
        this.providerId = "firebase", this.proactiveRefresh = new ProactiveRefresh(this), this.reloadUserInfo = null, this.reloadListener = null, this.uid = t, this.auth = r, this.stsTokenManager = n, this.accessToken = n.accessToken, this.displayName = i.displayName || null, this.email = i.email || null, this.emailVerified = i.emailVerified || !1, this.phoneNumber = i.phoneNumber || null, this.photoURL = i.photoURL || null, this.isAnonymous = i.isAnonymous || !1, this.tenantId = i.tenantId || null, this.providerData = i.providerData ? [...i.providerData] : [], this.metadata = new UserMetadata(i.createdAt || void 0, i.lastLoginAt || void 0)
    }
    async getIdToken(e) {
        const t = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, e));
        return _assert(t, this.auth, "internal-error"), this.accessToken !== t && (this.accessToken = t, await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)), t
    }
    getIdTokenResult(e) {
        return getIdTokenResult(this, e)
    }
    reload() {
        return reload(this)
    }
    _assign(e) {
        this !== e && (_assert(this.uid === e.uid, this.auth, "internal-error"), this.displayName = e.displayName, this.photoURL = e.photoURL, this.email = e.email, this.emailVerified = e.emailVerified, this.phoneNumber = e.phoneNumber, this.isAnonymous = e.isAnonymous, this.tenantId = e.tenantId, this.providerData = e.providerData.map((e => Object.assign({}, e))), this.metadata._copy(e.metadata), this.stsTokenManager._assign(e.stsTokenManager))
    }
    _clone(e) {
        const t = new UserImpl(Object.assign(Object.assign({}, this), {
            auth: e,
            stsTokenManager: this.stsTokenManager._clone()
        }));
        return t.metadata._copy(this.metadata), t
    }
    _onReload(e) {
        _assert(!this.reloadListener, this.auth, "internal-error"), this.reloadListener = e, this.reloadUserInfo && (this._notifyReloadListener(this.reloadUserInfo), this.reloadUserInfo = null)
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
        let r = !1;
        e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), r = !0), t && await _reloadWithoutSaving(this), await this.auth._persistUserIfCurrent(this), r && this.auth._notifyListenersIfCurrent(this)
    }
    async delete() {
        const e = await this.getIdToken();
        return await _logoutIfInvalidated(this, async function deleteAccount(e, t) {
            return _performApiRequest(e, "POST", "/v1/accounts:delete", t)
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
            providerData: this.providerData.map((e => Object.assign({}, e))),
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
        var r, n, i, s, o, a, c, d;
        const u = null !== (r = t.displayName) && void 0 !== r ? r : void 0,
            l = null !== (n = t.email) && void 0 !== n ? n : void 0,
            h = null !== (i = t.phoneNumber) && void 0 !== i ? i : void 0,
            p = null !== (s = t.photoURL) && void 0 !== s ? s : void 0,
            f = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
            m = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
            g = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
            _ = null !== (d = t.lastLoginAt) && void 0 !== d ? d : void 0,
            {
                uid: I,
                emailVerified: v,
                isAnonymous: T,
                providerData: E,
                stsTokenManager: y
            } = t;
        _assert(I && y, e, "internal-error");
        const A = StsTokenManager.fromJSON(this.name, y);
        _assert("string" == typeof I, e, "internal-error"), assertStringOrUndefined(u, e.name), assertStringOrUndefined(l, e.name), _assert("boolean" == typeof v, e, "internal-error"), _assert("boolean" == typeof T, e, "internal-error"), assertStringOrUndefined(h, e.name), assertStringOrUndefined(p, e.name), assertStringOrUndefined(f, e.name), assertStringOrUndefined(m, e.name), assertStringOrUndefined(g, e.name), assertStringOrUndefined(_, e.name);
        const w = new UserImpl({
            uid: I,
            auth: e,
            email: l,
            emailVerified: v,
            displayName: u,
            isAnonymous: T,
            photoURL: p,
            phoneNumber: h,
            tenantId: f,
            stsTokenManager: A,
            createdAt: g,
            lastLoginAt: _
        });
        return E && Array.isArray(E) && (w.providerData = E.map((e => Object.assign({}, e)))), m && (w._redirectEventId = m), w
    }
    static async _fromIdTokenResponse(e, t, r = !1) {
        const n = new StsTokenManager;
        n.updateFromServerResponse(t);
        const i = new UserImpl({
            uid: t.localId,
            auth: e,
            stsTokenManager: n,
            isAnonymous: r
        });
        return await _reloadWithoutSaving(i), i
    }
}
const y = new Map;

function _getInstance(e) {
    debugAssert(e instanceof Function, "Expected a class definition");
    let t = y.get(e);
    return t ? (debugAssert(t instanceof e, "Instance stored in cache mismatched with class"), t) : (t = new e, y.set(e, t), t)
}
class InMemoryPersistence {
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
        const t = this.storage[e];
        return void 0 === t ? null : t
    }
    async _remove(e) {
        delete this.storage[e]
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
}
InMemoryPersistence.type = "NONE";
const A = InMemoryPersistence;

function _persistenceKeyName(e, t, r) {
    return `firebase:${e}:${t}:${r}`
}
class PersistenceUserManager {
    constructor(e, t, r) {
        this.persistence = e, this.auth = t, this.userKey = r;
        const {
            config: n,
            name: i
        } = this.auth;
        this.fullUserKey = _persistenceKeyName(this.userKey, n.apiKey, i), this.fullPersistenceKey = _persistenceKeyName("persistence", n.apiKey, i), this.boundEventHandler = t._onStorageEvent.bind(t), this.persistence._addListener(this.fullUserKey, this.boundEventHandler)
    }
    setCurrentUser(e) {
        return this.persistence._set(this.fullUserKey, e.toJSON())
    }
    async getCurrentUser() {
        const e = await this.persistence._get(this.fullUserKey);
        return e ? UserImpl._fromJSON(this.auth, e) : null
    }
    removeCurrentUser() {
        return this.persistence._remove(this.fullUserKey)
    }
    savePersistenceForRedirect() {
        return this.persistence._set(this.fullPersistenceKey, this.persistence.type)
    }
    async setPersistence(e) {
        if (this.persistence === e) return;
        const t = await this.getCurrentUser();
        return await this.removeCurrentUser(), this.persistence = e, t ? this.setCurrentUser(t) : void 0
    }
    delete() {
        this.persistence._removeListener(this.fullUserKey, this.boundEventHandler)
    }
    static async create(e, t, r = "authUser") {
        if (!t.length) return new PersistenceUserManager(_getInstance(A), e, r);
        const n = (await Promise.all(t.map((async e => {
            if (await e._isAvailable()) return e
        })))).filter((e => e));
        let i = n[0] || _getInstance(A);
        const s = _persistenceKeyName(r, e.config.apiKey, e.name);
        let o = null;
        for (const r of t) try {
            const t = await r._get(s);
            if (t) {
                const n = UserImpl._fromJSON(e, t);
                r !== i && (o = n), i = r;
                break
            }
        } catch (e) {}
        const a = n.filter((e => e._shouldAllowMigration));
        return i._shouldAllowMigration && a.length ? (i = a[0], o && await i._set(s, o.toJSON()), await Promise.all(t.map((async e => {
            if (e !== i) try {
                await e._remove(s)
            } catch (e) {}
        }))), new PersistenceUserManager(i, e, r)) : new PersistenceUserManager(i, e, r)
    }
}

function _getBrowserName(e) {
    const t = e.toLowerCase();
    if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/")) return "Opera";
    if (_isIEMobile(t)) return "IEMobile";
    if (t.includes("msie") || t.includes("trident/")) return "IE";
    if (t.includes("edge/")) return "Edge";
    if (_isFirefox(t)) return "Firefox";
    if (t.includes("silk/")) return "Silk";
    if (_isBlackBerry(t)) return "Blackberry";
    if (_isWebOS(t)) return "Webos";
    if (_isSafari(t)) return "Safari";
    if ((t.includes("chrome/") || _isChromeIOS(t)) && !t.includes("edge/")) return "Chrome";
    if (_isAndroid(t)) return "Android"; {
        const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
            r = e.match(t);
        if (2 === (null == r ? void 0 : r.length)) return r[1]
    }
    return "Other"
}

function _isFirefox(e = getUA()) {
    return /firefox\//i.test(e)
}

function _isSafari(e = getUA()) {
    const t = e.toLowerCase();
    return t.includes("safari/") && !t.includes("chrome/") && !t.includes("crios/") && !t.includes("android")
}

function _isChromeIOS(e = getUA()) {
    return /crios\//i.test(e)
}

function _isIEMobile(e = getUA()) {
    return /iemobile/i.test(e)
}

function _isAndroid(e = getUA()) {
    return /android/i.test(e)
}

function _isBlackBerry(e = getUA()) {
    return /blackberry/i.test(e)
}

function _isWebOS(e = getUA()) {
    return /webos/i.test(e)
}

function _isIOS(e = getUA()) {
    return /iphone|ipad|ipod/i.test(e) || /macintosh/i.test(e) && /mobile/i.test(e)
}

function _isIE10() {
    return function isIE() {
        const e = getUA();
        return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0
    }() && 10 === document.documentMode
}

function _isMobileBrowser(e = getUA()) {
    return _isIOS(e) || _isAndroid(e) || _isWebOS(e) || _isBlackBerry(e) || /windows phone/i.test(e) || _isIEMobile(e)
}

function _getClientVersion(e, t = []) {
    let r;
    switch (e) {
        case "Browser":
            r = _getBrowserName(getUA());
            break;
        case "Worker":
            r = `${_getBrowserName(getUA())}-${e}`;
            break;
        default:
            r = e
    }
    const i = t.length ? t.join(",") : "FirebaseCore-web";
    return `${r}/JsCore/${n}/${i}`
}
class AuthMiddlewareQueue {
    constructor(e) {
        this.auth = e, this.queue = []
    }
    pushCallback(e, t) {
        const wrappedCallback = t => new Promise(((r, n) => {
            try {
                r(e(t))
            } catch (e) {
                n(e)
            }
        }));
        wrappedCallback.onAbort = t, this.queue.push(wrappedCallback);
        const r = this.queue.length - 1;
        return () => {
            this.queue[r] = () => Promise.resolve()
        }
    }
    async runMiddleware(e) {
        if (this.auth.currentUser === e) return;
        const t = [];
        try {
            for (const r of this.queue) await r(e), r.onAbort && t.push(r.onAbort)
        } catch (e) {
            t.reverse();
            for (const e of t) try {
                e()
            } catch (e) {}
            throw this.auth._errorFactory.create("login-blocked", {
                originalMessage: null == e ? void 0 : e.message
            })
        }
    }
}
class PasswordPolicyImpl {
    constructor(e) {
        var t, r, n, i;
        const s = e.customStrengthOptions;
        this.customStrengthOptions = {}, this.customStrengthOptions.minPasswordLength = null !== (t = s.minPasswordLength) && void 0 !== t ? t : 6, s.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = s.maxPasswordLength), void 0 !== s.containsLowercaseCharacter && (this.customStrengthOptions.containsLowercaseLetter = s.containsLowercaseCharacter), void 0 !== s.containsUppercaseCharacter && (this.customStrengthOptions.containsUppercaseLetter = s.containsUppercaseCharacter), void 0 !== s.containsNumericCharacter && (this.customStrengthOptions.containsNumericCharacter = s.containsNumericCharacter), void 0 !== s.containsNonAlphanumericCharacter && (this.customStrengthOptions.containsNonAlphanumericCharacter = s.containsNonAlphanumericCharacter), this.enforcementState = e.enforcementState, "ENFORCEMENT_STATE_UNSPECIFIED" === this.enforcementState && (this.enforcementState = "OFF"), this.allowedNonAlphanumericCharacters = null !== (n = null === (r = e.allowedNonAlphanumericCharacters) || void 0 === r ? void 0 : r.join("")) && void 0 !== n ? n : "", this.forceUpgradeOnSignin = null !== (i = e.forceUpgradeOnSignin) && void 0 !== i && i, this.schemaVersion = e.schemaVersion
    }
    validatePassword(e) {
        var t, r, n, i, s, o;
        const a = {
            isValid: !0,
            passwordPolicy: this
        };
        return this.validatePasswordLengthOptions(e, a), this.validatePasswordCharacterOptions(e, a), a.isValid && (a.isValid = null === (t = a.meetsMinPasswordLength) || void 0 === t || t), a.isValid && (a.isValid = null === (r = a.meetsMaxPasswordLength) || void 0 === r || r), a.isValid && (a.isValid = null === (n = a.containsLowercaseLetter) || void 0 === n || n), a.isValid && (a.isValid = null === (i = a.containsUppercaseLetter) || void 0 === i || i), a.isValid && (a.isValid = null === (s = a.containsNumericCharacter) || void 0 === s || s), a.isValid && (a.isValid = null === (o = a.containsNonAlphanumericCharacter) || void 0 === o || o), a
    }
    validatePasswordLengthOptions(e, t) {
        const r = this.customStrengthOptions.minPasswordLength,
            n = this.customStrengthOptions.maxPasswordLength;
        r && (t.meetsMinPasswordLength = e.length >= r), n && (t.meetsMaxPasswordLength = e.length <= n)
    }
    validatePasswordCharacterOptions(e, t) {
        let r;
        this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
        for (let n = 0; n < e.length; n++) r = e.charAt(n), this.updatePasswordCharacterOptionsStatuses(t, r >= "a" && r <= "z", r >= "A" && r <= "Z", r >= "0" && r <= "9", this.allowedNonAlphanumericCharacters.includes(r))
    }
    updatePasswordCharacterOptionsStatuses(e, t, r, n, i) {
        this.customStrengthOptions.containsLowercaseLetter && (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)), this.customStrengthOptions.containsUppercaseLetter && (e.containsUppercaseLetter || (e.containsUppercaseLetter = r)), this.customStrengthOptions.containsNumericCharacter && (e.containsNumericCharacter || (e.containsNumericCharacter = n)), this.customStrengthOptions.containsNonAlphanumericCharacter && (e.containsNonAlphanumericCharacter || (e.containsNonAlphanumericCharacter = i))
    }
}
class AuthImpl {
    constructor(e, t, r, n) {
        this.app = e, this.heartbeatServiceProvider = t, this.appCheckServiceProvider = r, this.config = n, this.currentUser = null, this.emulatorConfig = null, this.operations = Promise.resolve(), this.authStateSubscription = new Subscription(this), this.idTokenSubscription = new Subscription(this), this.beforeStateQueue = new AuthMiddlewareQueue(this), this.redirectUser = null, this.isProactiveRefreshEnabled = !1, this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1, this._canInitEmulator = !0, this._isInitialized = !1, this._deleted = !1, this._initializationPromise = null, this._popupRedirectResolver = null, this._errorFactory = _, this._agentRecaptchaConfig = null, this._tenantRecaptchaConfigs = {}, this._projectPasswordPolicy = null, this._tenantPasswordPolicies = {}, this.lastNotifiedUid = void 0, this.languageCode = null, this.tenantId = null, this.settings = {
            appVerificationDisabledForTesting: !1
        }, this.frameworks = [], this.name = e.name, this.clientVersion = n.sdkClientVersion
    }
    _initializeWithPersistence(e, t) {
        return t && (this._popupRedirectResolver = _getInstance(t)), this._initializationPromise = this.queue((async () => {
            var r, n;
            if (!this._deleted && (this.persistenceManager = await PersistenceUserManager.create(this, e), !this._deleted)) {
                if (null === (r = this._popupRedirectResolver) || void 0 === r ? void 0 : r._shouldInitProactively) try {
                    await this._popupRedirectResolver._initialize(this)
                } catch (e) {}
                await this.initializeCurrentUser(t), this.lastNotifiedUid = (null === (n = this.currentUser) || void 0 === n ? void 0 : n.uid) || null, this._deleted || (this._isInitialized = !0)
            }
        })), this._initializationPromise
    }
    async _onStorageEvent() {
        if (this._deleted) return;
        const e = await this.assertedPersistence.getCurrentUser();
        return this.currentUser || e ? this.currentUser && e && this.currentUser.uid === e.uid ? (this._currentUser._assign(e), void await this.currentUser.getIdToken()) : void await this._updateCurrentUser(e, !0) : void 0
    }
    async initializeCurrentUser(e) {
        var t;
        const r = await this.assertedPersistence.getCurrentUser();
        let n = r,
            i = !1;
        if (e && this.config.authDomain) {
            await this.getOrInitRedirectPersistenceManager();
            const r = null === (t = this.redirectUser) || void 0 === t ? void 0 : t._redirectEventId,
                s = null == n ? void 0 : n._redirectEventId,
                o = await this.tryRedirectSignIn(e);
            r && r !== s || !(null == o ? void 0 : o.user) || (n = o.user, i = !0)
        }
        if (!n) return this.directlySetCurrentUser(null);
        if (!n._redirectEventId) {
            if (i) try {
                await this.beforeStateQueue.runMiddleware(n)
            } catch (e) {
                n = r, this._popupRedirectResolver._overrideRedirectResult(this, (() => Promise.reject(e)))
            }
            return n ? this.reloadAndSetCurrentUserOrClear(n) : this.directlySetCurrentUser(null)
        }
        return _assert(this._popupRedirectResolver, this, "argument-error"), await this.getOrInitRedirectPersistenceManager(), this.redirectUser && this.redirectUser._redirectEventId === n._redirectEventId ? this.directlySetCurrentUser(n) : this.reloadAndSetCurrentUserOrClear(n)
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
            await _reloadWithoutSaving(e)
        } catch (e) {
            if ("auth/network-request-failed" !== (null == e ? void 0 : e.code)) return this.directlySetCurrentUser(null)
        }
        return this.directlySetCurrentUser(e)
    }
    useDeviceLanguage() {
        this.languageCode = function _getUserLanguage() {
            if ("undefined" == typeof navigator) return null;
            const e = navigator;
            return e.languages && e.languages[0] || e.language || null
        }()
    }
    async _delete() {
        this._deleted = !0
    }
    async updateCurrentUser(e) {
        const t = e ? getModularInstance(e) : null;
        return t && _assert(t.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"), this._updateCurrentUser(t && t._clone(this))
    }
    async _updateCurrentUser(e, t = !1) {
        if (!this._deleted) return e && _assert(this.tenantId === e.tenantId, this, "tenant-id-mismatch"), t || await this.beforeStateQueue.runMiddleware(e), this.queue((async () => {
            await this.directlySetCurrentUser(e), this.notifyAuthListeners()
        }))
    }
    async signOut() {
        return await this.beforeStateQueue.runMiddleware(null), (this.redirectPersistenceManager || this._popupRedirectResolver) && await this._setRedirectUser(null), this._updateCurrentUser(null, !0)
    }
    setPersistence(e) {
        return this.queue((async () => {
            await this.assertedPersistence.setPersistence(_getInstance(e))
        }))
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
        const e = await async function _getPasswordPolicy(e, t = {}) {
                return _performApiRequest(e, "GET", "/v2/passwordPolicy", _addTidIfNecessary(e, t))
            }(this),
            t = new PasswordPolicyImpl(e);
        null === this.tenantId ? this._projectPasswordPolicy = t : this._tenantPasswordPolicies[this.tenantId] = t
    }
    _getPersistence() {
        return this.assertedPersistence.persistence.type
    }
    _updateErrorMap(e) {
        this._errorFactory = new ErrorFactory("auth", "Firebase", e())
    }
    onAuthStateChanged(e, t, r) {
        return this.registerStateListener(this.authStateSubscription, e, t, r)
    }
    beforeAuthStateChanged(e, t) {
        return this.beforeStateQueue.pushCallback(e, t)
    }
    onIdTokenChanged(e, t, r) {
        return this.registerStateListener(this.idTokenSubscription, e, t, r)
    }
    authStateReady() {
        return new Promise(((e, t) => {
            if (this.currentUser) e();
            else {
                const r = this.onAuthStateChanged((() => {
                    r(), e()
                }), t)
            }
        }))
    }
    async revokeAccessToken(e) {
        if (this.currentUser) {
            const t = {
                providerId: "apple.com",
                tokenType: "ACCESS_TOKEN",
                token: e,
                idToken: await this.currentUser.getIdToken()
            };
            null != this.tenantId && (t.tenantId = this.tenantId), await async function revokeToken(e, t) {
                return _performApiRequest(e, "POST", "/v2/accounts:revokeToken", _addTidIfNecessary(e, t))
            }(this, t)
        }
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
        const r = await this.getOrInitRedirectPersistenceManager(t);
        return null === e ? r.removeCurrentUser() : r.setCurrentUser(e)
    }
    async getOrInitRedirectPersistenceManager(e) {
        if (!this.redirectPersistenceManager) {
            const t = e && _getInstance(e) || this._popupRedirectResolver;
            _assert(t, this, "argument-error"), this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(t._redirectPersistence)], "redirectUser"), this.redirectUser = await this.redirectPersistenceManager.getCurrentUser()
        }
        return this.redirectPersistenceManager
    }
    async _redirectUserForId(e) {
        var t, r;
        return this._isInitialized && await this.queue((async () => {})), (null === (t = this._currentUser) || void 0 === t ? void 0 : t._redirectEventId) === e ? this._currentUser : (null === (r = this.redirectUser) || void 0 === r ? void 0 : r._redirectEventId) === e ? this.redirectUser : null
    }
    async _persistUserIfCurrent(e) {
        if (e === this.currentUser) return this.queue((async () => this.directlySetCurrentUser(e)))
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
        var e, t;
        if (!this._isInitialized) return;
        this.idTokenSubscription.next(this.currentUser);
        const r = null !== (t = null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) && void 0 !== t ? t : null;
        this.lastNotifiedUid !== r && (this.lastNotifiedUid = r, this.authStateSubscription.next(this.currentUser))
    }
    registerStateListener(e, t, r, n) {
        if (this._deleted) return () => {};
        const i = "function" == typeof t ? t : t.next.bind(t);
        let s = !1;
        const o = this._isInitialized ? Promise.resolve() : this._initializationPromise;
        if (_assert(o, this, "internal-error"), o.then((() => {
                s || i(this.currentUser)
            })), "function" == typeof t) {
            const i = e.addObserver(t, r, n);
            return () => {
                s = !0, i()
            }
        } {
            const r = e.addObserver(t);
            return () => {
                s = !0, r()
            }
        }
    }
    async directlySetCurrentUser(e) {
        this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(), e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(), this.currentUser = e, e ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser()
    }
    queue(e) {
        return this.operations = this.operations.then(e, e), this.operations
    }
    get assertedPersistence() {
        return _assert(this.persistenceManager, this, "internal-error"), this.persistenceManager
    }
    _logFramework(e) {
        e && !this.frameworks.includes(e) && (this.frameworks.push(e), this.frameworks.sort(), this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks()))
    }
    _getFrameworks() {
        return this.frameworks
    }
    async _getAdditionalHeaders() {
        var e;
        const t = {
            "X-Client-Version": this.clientVersion
        };
        this.app.options.appId && (t["X-Firebase-gmpid"] = this.app.options.appId);
        const r = await (null === (e = this.heartbeatServiceProvider.getImmediate({
            optional: !0
        })) || void 0 === e ? void 0 : e.getHeartbeatsHeader());
        r && (t["X-Firebase-Client"] = r);
        const n = await this._getAppCheckToken();
        return n && (t["X-Firebase-AppCheck"] = n), t
    }
    async _getAppCheckToken() {
        var e;
        const t = await (null === (e = this.appCheckServiceProvider.getImmediate({
            optional: !0
        })) || void 0 === e ? void 0 : e.getToken());
        return (null == t ? void 0 : t.error) && function _logWarn(e, ...t) {
            v.logLevel <= o.WARN && v.warn(`Auth (${n}): ${e}`, ...t)
        }(`Error while retrieving App Check token: ${t.error}`), null == t ? void 0 : t.token
    }
}

function _castAuth(e) {
    return getModularInstance(e)
}
class Subscription {
    constructor(e) {
        this.auth = e, this.observer = null, this.addObserver = function createSubscribe(e, t) {
            const r = new ObserverProxy(e, t);
            return r.subscribe.bind(r)
        }((e => this.observer = e))
    }
    get next() {
        return _assert(this.observer, this.auth, "internal-error"), this.observer.next.bind(this.observer)
    }
}
let w = {
    async loadJS() {
        throw new Error("Unable to load external scripts")
    },
    recaptchaV2Script: "",
    recaptchaEnterpriseScript: "",
    gapiScript: ""
};

function _loadJS(e) {
    return w.loadJS(e)
}

function _generateCallbackName(e) {
    return `__${e}${Math.floor(1e6*Math.random())}`
}
class RecaptchaEnterpriseVerifier {
    constructor(e) {
        this.type = "recaptcha-enterprise", this.auth = _castAuth(e)
    }
    async verify(e = "verify", t = !1) {
        function retrieveRecaptchaToken(t, r, n) {
            const i = window.grecaptcha;
            isEnterprise(i) ? i.enterprise.ready((() => {
                i.enterprise.execute(t, {
                    action: e
                }).then((e => {
                    r(e)
                })).catch((() => {
                    r("NO_RECAPTCHA")
                }))
            })) : n(Error("No reCAPTCHA enterprise script loaded."))
        }
        return new Promise(((e, r) => {
            (async function retrieveSiteKey(e) {
                if (!t) {
                    if (null == e.tenantId && null != e._agentRecaptchaConfig) return e._agentRecaptchaConfig.siteKey;
                    if (null != e.tenantId && void 0 !== e._tenantRecaptchaConfigs[e.tenantId]) return e._tenantRecaptchaConfigs[e.tenantId].siteKey
                }
                return new Promise((async (t, r) => {
                    getRecaptchaConfig(e, {
                        clientType: "CLIENT_TYPE_WEB",
                        version: "RECAPTCHA_ENTERPRISE"
                    }).then((n => {
                        if (void 0 !== n.recaptchaKey) {
                            const r = new RecaptchaConfig(n);
                            return null == e.tenantId ? e._agentRecaptchaConfig = r : e._tenantRecaptchaConfigs[e.tenantId] = r, t(r.siteKey)
                        }
                        r(new Error("recaptcha Enterprise site key undefined"))
                    })).catch((e => {
                        r(e)
                    }))
                }))
            })(this.auth).then((n => {
                if (!t && isEnterprise(window.grecaptcha)) retrieveRecaptchaToken(n, e, r);
                else {
                    if ("undefined" == typeof window) return void r(new Error("RecaptchaVerifier is only supported in browser"));
                    let t = function _recaptchaEnterpriseScriptUrl() {
                        return w.recaptchaEnterpriseScript
                    }();
                    0 !== t.length && (t += n), _loadJS(t).then((() => {
                        retrieveRecaptchaToken(n, e, r)
                    })).catch((e => {
                        r(e)
                    }))
                }
            })).catch((e => {
                r(e)
            }))
        }))
    }
}
async function injectRecaptchaFields(e, t, r, n = !1) {
    const i = new RecaptchaEnterpriseVerifier(e);
    let s;
    try {
        s = await i.verify(r)
    } catch (e) {
        s = await i.verify(r, !0)
    }
    const o = Object.assign({}, t);
    return n ? Object.assign(o, {
        captchaResp: s
    }) : Object.assign(o, {
        captchaResponse: s
    }), Object.assign(o, {
        clientType: "CLIENT_TYPE_WEB"
    }), Object.assign(o, {
        recaptchaVersion: "RECAPTCHA_ENTERPRISE"
    }), o
}
async function handleRecaptchaFlow(e, t, r, n) {
    var i;
    if (null === (i = e._getRecaptchaConfig()) || void 0 === i ? void 0 : i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")) {
        const i = await injectRecaptchaFields(e, t, r, "getOobCode" === r);
        return n(e, i)
    }
    return n(e, t).catch((async i => {
        if ("auth/missing-recaptcha-token" === i.code) {
            console.log(`${r} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);
            const i = await injectRecaptchaFields(e, t, r, "getOobCode" === r);
            return n(e, i)
        }
        return Promise.reject(i)
    }))
}

function initializeAuth(e, t) {
    const r = _getProvider(e, "auth");
    if (r.isInitialized()) {
        const e = r.getImmediate();
        if (deepEqual(r.getOptions(), null != t ? t : {})) return e;
        _fail(e, "already-initialized")
    }
    return r.initialize({
        options: t
    })
}

function connectAuthEmulator(e, t, r) {
    const n = _castAuth(e);
    _assert(n._canInitEmulator, n, "emulator-config-failed"), _assert(/^https?:\/\//.test(t), n, "invalid-emulator-scheme");
    const i = !!(null == r ? void 0 : r.disableWarnings),
        s = extractProtocol(t),
        {
            host: o,
            port: a
        } = function extractHostAndPort(e) {
            const t = extractProtocol(e),
                r = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
            if (!r) return {
                host: "",
                port: null
            };
            const n = r[2].split("@").pop() || "",
                i = /^(\[[^\]]+\])(:|$)/.exec(n);
            if (i) {
                const e = i[1];
                return {
                    host: e,
                    port: parsePort(n.substr(e.length + 1))
                }
            } {
                const [e, t] = n.split(":");
                return {
                    host: e,
                    port: parsePort(t)
                }
            }
        }(t),
        c = null === a ? "" : `:${a}`;
    n.config.emulator = {
        url: `${s}//${o}${c}/`
    }, n.settings.appVerificationDisabledForTesting = !0, n.emulatorConfig = Object.freeze({
        host: o,
        port: a,
        protocol: s.replace(":", ""),
        options: Object.freeze({
            disableWarnings: i
        })
    }), i || function emitEmulatorWarning() {
        function attachBanner() {
            const e = document.createElement("p"),
                t = e.style;
            e.innerText = "Running in emulator mode. Do not use with production credentials.", t.position = "fixed", t.width = "100%", t.backgroundColor = "#ffffff", t.border = ".1em solid #000000", t.color = "#b50000", t.bottom = "0px", t.left = "0px", t.margin = "0px", t.zIndex = "10000", t.textAlign = "center", e.classList.add("firebase-emulator-warning"), document.body.appendChild(e)
        }
        "undefined" != typeof console && "function" == typeof console.info && console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
        "undefined" != typeof window && "undefined" != typeof document && ("loading" === document.readyState ? window.addEventListener("DOMContentLoaded", attachBanner) : attachBanner())
    }()
}

function extractProtocol(e) {
    const t = e.indexOf(":");
    return t < 0 ? "" : e.substr(0, t + 1)
}

function parsePort(e) {
    if (!e) return null;
    const t = Number(e);
    return isNaN(t) ? null : t
}
class AuthCredential {
    constructor(e, t) {
        this.providerId = e, this.signInMethod = t
    }
    toJSON() {
        return debugFail("not implemented")
    }
    _getIdTokenResponse(e) {
        return debugFail("not implemented")
    }
    _linkToIdToken(e, t) {
        return debugFail("not implemented")
    }
    _getReauthenticationResolver(e) {
        return debugFail("not implemented")
    }
}
async function resetPassword(e, t) {
    return _performApiRequest(e, "POST", "/v1/accounts:resetPassword", _addTidIfNecessary(e, t))
}
async function linkEmailPassword(e, t) {
    return _performApiRequest(e, "POST", "/v1/accounts:signUp", t)
}
async function signInWithPassword(e, t) {
    return _performSignInRequest(e, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(e, t))
}
async function sendOobCode(e, t) {
    return _performApiRequest(e, "POST", "/v1/accounts:sendOobCode", _addTidIfNecessary(e, t))
}
async function sendPasswordResetEmail$1(e, t) {
    return sendOobCode(e, t)
}
async function sendSignInLinkToEmail$1(e, t) {
    return sendOobCode(e, t)
}
class EmailAuthCredential extends AuthCredential {
    constructor(e, t, r, n = null) {
        super("password", r), this._email = e, this._password = t, this._tenantId = n
    }
    static _fromEmailAndPassword(e, t) {
        return new EmailAuthCredential(e, t, "password")
    }
    static _fromEmailAndCode(e, t, r = null) {
        return new EmailAuthCredential(e, t, "emailLink", r)
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
        const t = "string" == typeof e ? JSON.parse(e) : e;
        if ((null == t ? void 0 : t.email) && (null == t ? void 0 : t.password)) {
            if ("password" === t.signInMethod) return this._fromEmailAndPassword(t.email, t.password);
            if ("emailLink" === t.signInMethod) return this._fromEmailAndCode(t.email, t.password, t.tenantId)
        }
        return null
    }
    async _getIdTokenResponse(e) {
        switch (this.signInMethod) {
            case "password":
                return handleRecaptchaFlow(e, {
                    returnSecureToken: !0,
                    email: this._email,
                    password: this._password,
                    clientType: "CLIENT_TYPE_WEB"
                }, "signInWithPassword", signInWithPassword);
            case "emailLink":
                return async function signInWithEmailLink$1(e, t) {
                    return _performSignInRequest(e, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(e, t))
                }(e, {
                    email: this._email,
                    oobCode: this._password
                });
            default:
                _fail(e, "internal-error")
        }
    }
    async _linkToIdToken(e, t) {
        switch (this.signInMethod) {
            case "password":
                return handleRecaptchaFlow(e, {
                    idToken: t,
                    returnSecureToken: !0,
                    email: this._email,
                    password: this._password,
                    clientType: "CLIENT_TYPE_WEB"
                }, "signUpPassword", linkEmailPassword);
            case "emailLink":
                return async function signInWithEmailLinkForLinking(e, t) {
                    return _performSignInRequest(e, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(e, t))
                }(e, {
                    idToken: t,
                    email: this._email,
                    oobCode: this._password
                });
            default:
                _fail(e, "internal-error")
        }
    }
    _getReauthenticationResolver(e) {
        return this._getIdTokenResponse(e)
    }
}
async function signInWithIdp(e, t) {
    return _performSignInRequest(e, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(e, t))
}
class OAuthCredential extends AuthCredential {
    constructor() {
        super(...arguments), this.pendingToken = null
    }
    static _fromParams(e) {
        const t = new OAuthCredential(e.providerId, e.signInMethod);
        return e.idToken || e.accessToken ? (e.idToken && (t.idToken = e.idToken), e.accessToken && (t.accessToken = e.accessToken), e.nonce && !e.pendingToken && (t.nonce = e.nonce), e.pendingToken && (t.pendingToken = e.pendingToken)) : e.oauthToken && e.oauthTokenSecret ? (t.accessToken = e.oauthToken, t.secret = e.oauthTokenSecret) : _fail("argument-error"), t
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
        const t = "string" == typeof e ? JSON.parse(e) : e,
            {
                providerId: r,
                signInMethod: n
            } = t,
            i = __rest(t, ["providerId", "signInMethod"]);
        if (!r || !n) return null;
        const s = new OAuthCredential(r, n);
        return s.idToken = i.idToken || void 0, s.accessToken = i.accessToken || void 0, s.secret = i.secret, s.nonce = i.nonce, s.pendingToken = i.pendingToken || null, s
    }
    _getIdTokenResponse(e) {
        return signInWithIdp(e, this.buildRequest())
    }
    _linkToIdToken(e, t) {
        const r = this.buildRequest();
        return r.idToken = t, signInWithIdp(e, r)
    }
    _getReauthenticationResolver(e) {
        const t = this.buildRequest();
        return t.autoCreate = !1, signInWithIdp(e, t)
    }
    buildRequest() {
        const e = {
            requestUri: "http://localhost",
            returnSecureToken: !0
        };
        if (this.pendingToken) e.pendingToken = this.pendingToken;
        else {
            const t = {};
            this.idToken && (t.id_token = this.idToken), this.accessToken && (t.access_token = this.accessToken), this.secret && (t.oauth_token_secret = this.secret), t.providerId = this.providerId, this.nonce && !this.pendingToken && (t.nonce = this.nonce), e.postBody = querystring(t)
        }
        return e
    }
}
const S = {
    USER_NOT_FOUND: "user-not-found"
};
class PhoneAuthCredential extends AuthCredential {
    constructor(e) {
        super("phone", "phone"), this.params = e
    }
    static _fromVerification(e, t) {
        return new PhoneAuthCredential({
            verificationId: e,
            verificationCode: t
        })
    }
    static _fromTokenResponse(e, t) {
        return new PhoneAuthCredential({
            phoneNumber: e,
            temporaryProof: t
        })
    }
    _getIdTokenResponse(e) {
        return async function signInWithPhoneNumber$1(e, t) {
            return _performSignInRequest(e, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(e, t))
        }(e, this._makeVerificationRequest())
    }
    _linkToIdToken(e, t) {
        return async function linkWithPhoneNumber$1(e, t) {
            const r = await _performSignInRequest(e, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(e, t));
            if (r.temporaryProof) throw _makeTaggedError(e, "account-exists-with-different-credential", r);
            return r
        }(e, Object.assign({
            idToken: t
        }, this._makeVerificationRequest()))
    }
    _getReauthenticationResolver(e) {
        return async function verifyPhoneNumberForExisting(e, t) {
            return _performSignInRequest(e, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(e, Object.assign(Object.assign({}, t), {
                operation: "REAUTH"
            })), S)
        }(e, this._makeVerificationRequest())
    }
    _makeVerificationRequest() {
        const {
            temporaryProof: e,
            phoneNumber: t,
            verificationId: r,
            verificationCode: n
        } = this.params;
        return e && t ? {
            temporaryProof: e,
            phoneNumber: t
        } : {
            sessionInfo: r,
            code: n
        }
    }
    toJSON() {
        const e = {
            providerId: this.providerId
        };
        return this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber), this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof), this.params.verificationCode && (e.verificationCode = this.params.verificationCode), this.params.verificationId && (e.verificationId = this.params.verificationId), e
    }
    static fromJSON(e) {
        "string" == typeof e && (e = JSON.parse(e));
        const {
            verificationId: t,
            verificationCode: r,
            phoneNumber: n,
            temporaryProof: i
        } = e;
        return r || t || n || i ? new PhoneAuthCredential({
            verificationId: t,
            verificationCode: r,
            phoneNumber: n,
            temporaryProof: i
        }) : null
    }
}
class ActionCodeURL {
    constructor(e) {
        var t, r, n, i, s, o;
        const a = querystringDecode(extractQuerystring(e)),
            c = null !== (t = a.apiKey) && void 0 !== t ? t : null,
            d = null !== (r = a.oobCode) && void 0 !== r ? r : null,
            u = function parseMode(e) {
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
            }(null !== (n = a.mode) && void 0 !== n ? n : null);
        _assert(c && d && u, "argument-error"), this.apiKey = c, this.operation = u, this.code = d, this.continueUrl = null !== (i = a.continueUrl) && void 0 !== i ? i : null, this.languageCode = null !== (s = a.languageCode) && void 0 !== s ? s : null, this.tenantId = null !== (o = a.tenantId) && void 0 !== o ? o : null
    }
    static parseLink(e) {
        const t = function parseDeepLink(e) {
            const t = querystringDecode(extractQuerystring(e)).link,
                r = t ? querystringDecode(extractQuerystring(t)).deep_link_id : null,
                n = querystringDecode(extractQuerystring(e)).deep_link_id;
            return (n ? querystringDecode(extractQuerystring(n)).link : null) || n || r || t || e
        }(e);
        try {
            return new ActionCodeURL(t)
        } catch (e) {
            return null
        }
    }
}

function parseActionCodeURL(e) {
    return ActionCodeURL.parseLink(e)
}
class EmailAuthProvider {
    constructor() {
        this.providerId = EmailAuthProvider.PROVIDER_ID
    }
    static credential(e, t) {
        return EmailAuthCredential._fromEmailAndPassword(e, t)
    }
    static credentialWithLink(e, t) {
        const r = ActionCodeURL.parseLink(t);
        return _assert(r, "argument-error"), EmailAuthCredential._fromEmailAndCode(e, r.code, r.tenantId)
    }
}
EmailAuthProvider.PROVIDER_ID = "password", EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password", EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
class FederatedAuthProvider {
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
class BaseOAuthProvider extends FederatedAuthProvider {
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
class OAuthProvider extends BaseOAuthProvider {
    static credentialFromJSON(e) {
        const t = "string" == typeof e ? JSON.parse(e) : e;
        return _assert("providerId" in t && "signInMethod" in t, "argument-error"), OAuthCredential._fromParams(t)
    }
    credential(e) {
        return this._credential(Object.assign(Object.assign({}, e), {
            nonce: e.rawNonce
        }))
    }
    _credential(e) {
        return _assert(e.idToken || e.accessToken, "argument-error"), OAuthCredential._fromParams(Object.assign(Object.assign({}, e), {
            providerId: this.providerId,
            signInMethod: this.providerId
        }))
    }
    static credentialFromResult(e) {
        return OAuthProvider.oauthCredentialFromTaggedObject(e)
    }
    static credentialFromError(e) {
        return OAuthProvider.oauthCredentialFromTaggedObject(e.customData || {})
    }
    static oauthCredentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e) return null;
        const {
            oauthIdToken: t,
            oauthAccessToken: r,
            oauthTokenSecret: n,
            pendingToken: i,
            nonce: s,
            providerId: o
        } = e;
        if (!(r || n || t || i)) return null;
        if (!o) return null;
        try {
            return new OAuthProvider(o)._credential({
                idToken: t,
                accessToken: r,
                nonce: s,
                pendingToken: i
            })
        } catch (e) {
            return null
        }
    }
}
class FacebookAuthProvider extends BaseOAuthProvider {
    constructor() {
        super("facebook.com")
    }
    static credential(e) {
        return OAuthCredential._fromParams({
            providerId: FacebookAuthProvider.PROVIDER_ID,
            signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
            accessToken: e
        })
    }
    static credentialFromResult(e) {
        return FacebookAuthProvider.credentialFromTaggedObject(e)
    }
    static credentialFromError(e) {
        return FacebookAuthProvider.credentialFromTaggedObject(e.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e || !("oauthAccessToken" in e)) return null;
        if (!e.oauthAccessToken) return null;
        try {
            return FacebookAuthProvider.credential(e.oauthAccessToken)
        } catch (e) {
            return null
        }
    }
}
FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com", FacebookAuthProvider.PROVIDER_ID = "facebook.com";
class GoogleAuthProvider extends BaseOAuthProvider {
    constructor() {
        super("google.com"), this.addScope("profile")
    }
    static credential(e, t) {
        return OAuthCredential._fromParams({
            providerId: GoogleAuthProvider.PROVIDER_ID,
            signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
            idToken: e,
            accessToken: t
        })
    }
    static credentialFromResult(e) {
        return GoogleAuthProvider.credentialFromTaggedObject(e)
    }
    static credentialFromError(e) {
        return GoogleAuthProvider.credentialFromTaggedObject(e.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e) return null;
        const {
            oauthIdToken: t,
            oauthAccessToken: r
        } = e;
        if (!t && !r) return null;
        try {
            return GoogleAuthProvider.credential(t, r)
        } catch (e) {
            return null
        }
    }
}
GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com", GoogleAuthProvider.PROVIDER_ID = "google.com";
class GithubAuthProvider extends BaseOAuthProvider {
    constructor() {
        super("github.com")
    }
    static credential(e) {
        return OAuthCredential._fromParams({
            providerId: GithubAuthProvider.PROVIDER_ID,
            signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
            accessToken: e
        })
    }
    static credentialFromResult(e) {
        return GithubAuthProvider.credentialFromTaggedObject(e)
    }
    static credentialFromError(e) {
        return GithubAuthProvider.credentialFromTaggedObject(e.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e || !("oauthAccessToken" in e)) return null;
        if (!e.oauthAccessToken) return null;
        try {
            return GithubAuthProvider.credential(e.oauthAccessToken)
        } catch (e) {
            return null
        }
    }
}
GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com", GithubAuthProvider.PROVIDER_ID = "github.com";
class SAMLAuthCredential extends AuthCredential {
    constructor(e, t) {
        super(e, e), this.pendingToken = t
    }
    _getIdTokenResponse(e) {
        return signInWithIdp(e, this.buildRequest())
    }
    _linkToIdToken(e, t) {
        const r = this.buildRequest();
        return r.idToken = t, signInWithIdp(e, r)
    }
    _getReauthenticationResolver(e) {
        const t = this.buildRequest();
        return t.autoCreate = !1, signInWithIdp(e, t)
    }
    toJSON() {
        return {
            signInMethod: this.signInMethod,
            providerId: this.providerId,
            pendingToken: this.pendingToken
        }
    }
    static fromJSON(e) {
        const t = "string" == typeof e ? JSON.parse(e) : e,
            {
                providerId: r,
                signInMethod: n,
                pendingToken: i
            } = t;
        return r && n && i && r === n ? new SAMLAuthCredential(r, i) : null
    }
    static _create(e, t) {
        return new SAMLAuthCredential(e, t)
    }
    buildRequest() {
        return {
            requestUri: "http://localhost",
            returnSecureToken: !0,
            pendingToken: this.pendingToken
        }
    }
}
class SAMLAuthProvider extends FederatedAuthProvider {
    constructor(e) {
        _assert(e.startsWith("saml."), "argument-error"), super(e)
    }
    static credentialFromResult(e) {
        return SAMLAuthProvider.samlCredentialFromTaggedObject(e)
    }
    static credentialFromError(e) {
        return SAMLAuthProvider.samlCredentialFromTaggedObject(e.customData || {})
    }
    static credentialFromJSON(e) {
        const t = SAMLAuthCredential.fromJSON(e);
        return _assert(t, "argument-error"), t
    }
    static samlCredentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e) return null;
        const {
            pendingToken: t,
            providerId: r
        } = e;
        if (!t || !r) return null;
        try {
            return SAMLAuthCredential._create(r, t)
        } catch (e) {
            return null
        }
    }
}
class TwitterAuthProvider extends BaseOAuthProvider {
    constructor() {
        super("twitter.com")
    }
    static credential(e, t) {
        return OAuthCredential._fromParams({
            providerId: TwitterAuthProvider.PROVIDER_ID,
            signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
            oauthToken: e,
            oauthTokenSecret: t
        })
    }
    static credentialFromResult(e) {
        return TwitterAuthProvider.credentialFromTaggedObject(e)
    }
    static credentialFromError(e) {
        return TwitterAuthProvider.credentialFromTaggedObject(e.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e) return null;
        const {
            oauthAccessToken: t,
            oauthTokenSecret: r
        } = e;
        if (!t || !r) return null;
        try {
            return TwitterAuthProvider.credential(t, r)
        } catch (e) {
            return null
        }
    }
}
async function signUp(e, t) {
    return _performSignInRequest(e, "POST", "/v1/accounts:signUp", _addTidIfNecessary(e, t))
}
TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com", TwitterAuthProvider.PROVIDER_ID = "twitter.com";
class UserCredentialImpl {
    constructor(e) {
        this.user = e.user, this.providerId = e.providerId, this._tokenResponse = e._tokenResponse, this.operationType = e.operationType
    }
    static async _fromIdTokenResponse(e, t, r, n = !1) {
        const i = await UserImpl._fromIdTokenResponse(e, r, n),
            s = providerIdForResponse(r);
        return new UserCredentialImpl({
            user: i,
            providerId: s,
            _tokenResponse: r,
            operationType: t
        })
    }
    static async _forOperation(e, t, r) {
        await e._updateTokensIfNecessary(r, !0);
        const n = providerIdForResponse(r);
        return new UserCredentialImpl({
            user: e,
            providerId: n,
            _tokenResponse: r,
            operationType: t
        })
    }
}

function providerIdForResponse(e) {
    return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null
}
async function signInAnonymously(e) {
    var t;
    const r = _castAuth(e);
    if (await r._initializationPromise, null === (t = r.currentUser) || void 0 === t ? void 0 : t.isAnonymous) return new UserCredentialImpl({
        user: r.currentUser,
        providerId: null,
        operationType: "signIn"
    });
    const n = await signUp(r, {
            returnSecureToken: !0
        }),
        i = await UserCredentialImpl._fromIdTokenResponse(r, "signIn", n, !0);
    return await r._updateCurrentUser(i.user), i
}
class MultiFactorError extends FirebaseError {
    constructor(e, t, r, n) {
        var i;
        super(t.code, t.message), this.operationType = r, this.user = n, Object.setPrototypeOf(this, MultiFactorError.prototype), this.customData = {
            appName: e.name,
            tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
            _serverResponse: t.customData._serverResponse,
            operationType: r
        }
    }
    static _fromErrorAndOperation(e, t, r, n) {
        return new MultiFactorError(e, t, r, n)
    }
}

function _processCredentialSavingMfaContextIfNecessary(e, t, r, n) {
    return ("reauthenticate" === t ? r._getReauthenticationResolver(e) : r._getIdTokenResponse(e)).catch((r => {
        if ("auth/multi-factor-auth-required" === r.code) throw MultiFactorError._fromErrorAndOperation(e, r, t, n);
        throw r
    }))
}

function providerDataAsNames(e) {
    return new Set(e.map((({
        providerId: e
    }) => e)).filter((e => !!e)))
}
async function unlink(e, t) {
    const r = getModularInstance(e);
    await _assertLinkedStatus(!0, r, t);
    const {
        providerUserInfo: n
    } = await async function deleteLinkedAccounts(e, t) {
        return _performApiRequest(e, "POST", "/v1/accounts:update", t)
    }(r.auth, {
        idToken: await r.getIdToken(),
        deleteProvider: [t]
    }), i = providerDataAsNames(n || []);
    return r.providerData = r.providerData.filter((e => i.has(e.providerId))), i.has("phone") || (r.phoneNumber = null), await r.auth._persistUserIfCurrent(r), r
}
async function _link$1(e, t, r = !1) {
    const n = await _logoutIfInvalidated(e, t._linkToIdToken(e.auth, await e.getIdToken()), r);
    return UserCredentialImpl._forOperation(e, "link", n)
}
async function _assertLinkedStatus(e, t, r) {
    await _reloadWithoutSaving(t);
    const n = !1 === e ? "provider-already-linked" : "no-such-provider";
    _assert(providerDataAsNames(t.providerData).has(r) === e, t.auth, n)
}
async function _reauthenticate(e, t, r = !1) {
    const {
        auth: n
    } = e, i = "reauthenticate";
    try {
        const s = await _logoutIfInvalidated(e, _processCredentialSavingMfaContextIfNecessary(n, i, t, e), r);
        _assert(s.idToken, n, "internal-error");
        const o = _parseToken(s.idToken);
        _assert(o, n, "internal-error");
        const {
            sub: a
        } = o;
        return _assert(e.uid === a, n, "user-mismatch"), UserCredentialImpl._forOperation(e, i, s)
    } catch (e) {
        throw "auth/user-not-found" === (null == e ? void 0 : e.code) && _fail(n, "user-mismatch"), e
    }
}
async function _signInWithCredential(e, t, r = !1) {
    const n = "signIn",
        i = await _processCredentialSavingMfaContextIfNecessary(e, n, t),
        s = await UserCredentialImpl._fromIdTokenResponse(e, n, i);
    return r || await e._updateCurrentUser(s.user), s
}
async function signInWithCredential(e, t) {
    return _signInWithCredential(_castAuth(e), t)
}
async function linkWithCredential(e, t) {
    const r = getModularInstance(e);
    return await _assertLinkedStatus(!1, r, t.providerId), _link$1(r, t)
}
async function reauthenticateWithCredential(e, t) {
    return _reauthenticate(getModularInstance(e), t)
}
async function signInWithCustomToken(e, t) {
    const r = _castAuth(e),
        n = await async function signInWithCustomToken$1(e, t) {
            return _performSignInRequest(e, "POST", "/v1/accounts:signInWithCustomToken", _addTidIfNecessary(e, t))
        }(r, {
            token: t,
            returnSecureToken: !0
        }),
        i = await UserCredentialImpl._fromIdTokenResponse(r, "signIn", n);
    return await r._updateCurrentUser(i.user), i
}
class MultiFactorInfoImpl {
    constructor(e, t) {
        this.factorId = e, this.uid = t.mfaEnrollmentId, this.enrollmentTime = new Date(t.enrolledAt).toUTCString(), this.displayName = t.displayName
    }
    static _fromServerResponse(e, t) {
        return "phoneInfo" in t ? PhoneMultiFactorInfoImpl._fromServerResponse(e, t) : "totpInfo" in t ? TotpMultiFactorInfoImpl._fromServerResponse(e, t) : _fail(e, "internal-error")
    }
}
class PhoneMultiFactorInfoImpl extends MultiFactorInfoImpl {
    constructor(e) {
        super("phone", e), this.phoneNumber = e.phoneInfo
    }
    static _fromServerResponse(e, t) {
        return new PhoneMultiFactorInfoImpl(t)
    }
}
class TotpMultiFactorInfoImpl extends MultiFactorInfoImpl {
    constructor(e) {
        super("totp", e)
    }
    static _fromServerResponse(e, t) {
        return new TotpMultiFactorInfoImpl(t)
    }
}

function _setActionCodeSettingsOnRequest(e, t, r) {
    var n;
    _assert((null === (n = r.url) || void 0 === n ? void 0 : n.length) > 0, e, "invalid-continue-uri"), _assert(void 0 === r.dynamicLinkDomain || r.dynamicLinkDomain.length > 0, e, "invalid-dynamic-link-domain"), t.continueUrl = r.url, t.dynamicLinkDomain = r.dynamicLinkDomain, t.canHandleCodeInApp = r.handleCodeInApp, r.iOS && (_assert(r.iOS.bundleId.length > 0, e, "missing-ios-bundle-id"), t.iOSBundleId = r.iOS.bundleId), r.android && (_assert(r.android.packageName.length > 0, e, "missing-android-pkg-name"), t.androidInstallApp = r.android.installApp, t.androidMinimumVersionCode = r.android.minimumVersion, t.androidPackageName = r.android.packageName)
}
async function recachePasswordPolicy(e) {
    const t = _castAuth(e);
    t._getPasswordPolicyInternal() && await t._updatePasswordPolicy()
}
async function sendPasswordResetEmail(e, t, r) {
    const n = _castAuth(e),
        i = {
            requestType: "PASSWORD_RESET",
            email: t,
            clientType: "CLIENT_TYPE_WEB"
        };
    r && _setActionCodeSettingsOnRequest(n, i, r), await handleRecaptchaFlow(n, i, "getOobCode", sendPasswordResetEmail$1)
}
async function confirmPasswordReset(e, t, r) {
    await resetPassword(getModularInstance(e), {
        oobCode: t,
        newPassword: r
    }).catch((async t => {
        throw "auth/password-does-not-meet-requirements" === t.code && recachePasswordPolicy(e), t
    }))
}
async function applyActionCode(e, t) {
    await async function applyActionCode$1(e, t) {
        return _performApiRequest(e, "POST", "/v1/accounts:update", _addTidIfNecessary(e, t))
    }(getModularInstance(e), {
        oobCode: t
    })
}
async function checkActionCode(e, t) {
    const r = getModularInstance(e),
        n = await resetPassword(r, {
            oobCode: t
        }),
        i = n.requestType;
    switch (_assert(i, r, "internal-error"), i) {
        case "EMAIL_SIGNIN":
            break;
        case "VERIFY_AND_CHANGE_EMAIL":
            _assert(n.newEmail, r, "internal-error");
            break;
        case "REVERT_SECOND_FACTOR_ADDITION":
            _assert(n.mfaInfo, r, "internal-error");
        default:
            _assert(n.email, r, "internal-error")
    }
    let s = null;
    return n.mfaInfo && (s = MultiFactorInfoImpl._fromServerResponse(_castAuth(r), n.mfaInfo)), {
        data: {
            email: ("VERIFY_AND_CHANGE_EMAIL" === n.requestType ? n.newEmail : n.email) || null,
            previousEmail: ("VERIFY_AND_CHANGE_EMAIL" === n.requestType ? n.email : n.newEmail) || null,
            multiFactorInfo: s
        },
        operation: i
    }
}
async function verifyPasswordResetCode(e, t) {
    const {
        data: r
    } = await checkActionCode(getModularInstance(e), t);
    return r.email
}
async function createUserWithEmailAndPassword(e, t, r) {
    const n = _castAuth(e),
        i = handleRecaptchaFlow(n, {
            returnSecureToken: !0,
            email: t,
            password: r,
            clientType: "CLIENT_TYPE_WEB"
        }, "signUpPassword", signUp),
        s = await i.catch((t => {
            throw "auth/password-does-not-meet-requirements" === t.code && recachePasswordPolicy(e), t
        })),
        o = await UserCredentialImpl._fromIdTokenResponse(n, "signIn", s);
    return await n._updateCurrentUser(o.user), o
}

function signInWithEmailAndPassword(e, t, r) {
    return signInWithCredential(getModularInstance(e), EmailAuthProvider.credential(t, r)).catch((async t => {
        throw "auth/password-does-not-meet-requirements" === t.code && recachePasswordPolicy(e), t
    }))
}
async function sendSignInLinkToEmail(e, t, r) {
    const n = _castAuth(e),
        i = {
            requestType: "EMAIL_SIGNIN",
            email: t,
            clientType: "CLIENT_TYPE_WEB"
        };
    ! function setActionCodeSettings(e, t) {
        _assert(t.handleCodeInApp, n, "argument-error"), t && _setActionCodeSettingsOnRequest(n, e, t)
    }(i, r), await handleRecaptchaFlow(n, i, "getOobCode", sendSignInLinkToEmail$1)
}

function isSignInWithEmailLink(e, t) {
    const r = ActionCodeURL.parseLink(t);
    return "EMAIL_SIGNIN" === (null == r ? void 0 : r.operation)
}
async function signInWithEmailLink(e, t, r) {
    const n = getModularInstance(e),
        i = EmailAuthProvider.credentialWithLink(t, r || _getCurrentUrl());
    return _assert(i._tenantId === (n.tenantId || null), n, "tenant-id-mismatch"), signInWithCredential(n, i)
}
async function fetchSignInMethodsForEmail(e, t) {
    const r = {
            identifier: t,
            continueUri: _isHttpOrHttps() ? _getCurrentUrl() : "http://localhost"
        },
        {
            signinMethods: n
        } = await async function createAuthUri(e, t) {
            return _performApiRequest(e, "POST", "/v1/accounts:createAuthUri", _addTidIfNecessary(e, t))
        }(getModularInstance(e), r);
    return n || []
}
async function sendEmailVerification(e, t) {
    const r = getModularInstance(e),
        n = {
            requestType: "VERIFY_EMAIL",
            idToken: await e.getIdToken()
        };
    t && _setActionCodeSettingsOnRequest(r.auth, n, t);
    const {
        email: i
    } = await async function sendEmailVerification$1(e, t) {
        return sendOobCode(e, t)
    }(r.auth, n);
    i !== e.email && await e.reload()
}
async function verifyBeforeUpdateEmail(e, t, r) {
    const n = getModularInstance(e),
        i = {
            requestType: "VERIFY_AND_CHANGE_EMAIL",
            idToken: await e.getIdToken(),
            newEmail: t
        };
    r && _setActionCodeSettingsOnRequest(n.auth, i, r);
    const {
        email: s
    } = await async function verifyAndChangeEmail(e, t) {
        return sendOobCode(e, t)
    }(n.auth, i);
    s !== e.email && await e.reload()
}
async function updateProfile(e, {
    displayName: t,
    photoURL: r
}) {
    if (void 0 === t && void 0 === r) return;
    const n = getModularInstance(e),
        i = {
            idToken: await n.getIdToken(),
            displayName: t,
            photoUrl: r,
            returnSecureToken: !0
        },
        s = await _logoutIfInvalidated(n, async function updateProfile$1(e, t) {
            return _performApiRequest(e, "POST", "/v1/accounts:update", t)
        }(n.auth, i));
    n.displayName = s.displayName || null, n.photoURL = s.photoUrl || null;
    const o = n.providerData.find((({
        providerId: e
    }) => "password" === e));
    o && (o.displayName = n.displayName, o.photoURL = n.photoURL), await n._updateTokensIfNecessary(s)
}

function updateEmail(e, t) {
    return updateEmailOrPassword(getModularInstance(e), t, null)
}

function updatePassword(e, t) {
    return updateEmailOrPassword(getModularInstance(e), null, t)
}
async function updateEmailOrPassword(e, t, r) {
    const {
        auth: n
    } = e, i = {
        idToken: await e.getIdToken(),
        returnSecureToken: !0
    };
    t && (i.email = t), r && (i.password = r);
    const s = await _logoutIfInvalidated(e, async function updateEmailPassword(e, t) {
        return _performApiRequest(e, "POST", "/v1/accounts:update", t)
    }(n, i));
    await e._updateTokensIfNecessary(s, !0)
}
class GenericAdditionalUserInfo {
    constructor(e, t, r = {}) {
        this.isNewUser = e, this.providerId = t, this.profile = r
    }
}
class FederatedAdditionalUserInfoWithUsername extends GenericAdditionalUserInfo {
    constructor(e, t, r, n) {
        super(e, t, r), this.username = n
    }
}
class FacebookAdditionalUserInfo extends GenericAdditionalUserInfo {
    constructor(e, t) {
        super(e, "facebook.com", t)
    }
}
class GithubAdditionalUserInfo extends FederatedAdditionalUserInfoWithUsername {
    constructor(e, t) {
        super(e, "github.com", t, "string" == typeof(null == t ? void 0 : t.login) ? null == t ? void 0 : t.login : null)
    }
}
class GoogleAdditionalUserInfo extends GenericAdditionalUserInfo {
    constructor(e, t) {
        super(e, "google.com", t)
    }
}
class TwitterAdditionalUserInfo extends FederatedAdditionalUserInfoWithUsername {
    constructor(e, t, r) {
        super(e, "twitter.com", t, r)
    }
}

function getAdditionalUserInfo(e) {
    const {
        user: t,
        _tokenResponse: r
    } = e;
    return t.isAnonymous && !r ? {
        providerId: null,
        isNewUser: !1,
        profile: null
    } : function _fromIdTokenResponse(e) {
        var t, r;
        if (!e) return null;
        const {
            providerId: n
        } = e, i = e.rawUserInfo ? JSON.parse(e.rawUserInfo) : {}, s = e.isNewUser || "identitytoolkit#SignupNewUserResponse" === e.kind;
        if (!n && (null == e ? void 0 : e.idToken)) {
            const n = null === (r = null === (t = _parseToken(e.idToken)) || void 0 === t ? void 0 : t.firebase) || void 0 === r ? void 0 : r.sign_in_provider;
            if (n) return new GenericAdditionalUserInfo(s, "anonymous" !== n && "custom" !== n ? n : null)
        }
        if (!n) return null;
        switch (n) {
            case "facebook.com":
                return new FacebookAdditionalUserInfo(s, i);
            case "github.com":
                return new GithubAdditionalUserInfo(s, i);
            case "google.com":
                return new GoogleAdditionalUserInfo(s, i);
            case "twitter.com":
                return new TwitterAdditionalUserInfo(s, i, e.screenName || null);
            case "custom":
            case "anonymous":
                return new GenericAdditionalUserInfo(s, null);
            default:
                return new GenericAdditionalUserInfo(s, n, i)
        }
    }(r)
}

function setPersistence(e, t) {
    return getModularInstance(e).setPersistence(t)
}

function initializeRecaptchaConfig(e) {
    return async function _initializeRecaptchaConfig(e) {
        const t = _castAuth(e),
            r = await getRecaptchaConfig(t, {
                clientType: "CLIENT_TYPE_WEB",
                version: "RECAPTCHA_ENTERPRISE"
            }),
            n = new RecaptchaConfig(r);
        null == t.tenantId ? t._agentRecaptchaConfig = n : t._tenantRecaptchaConfigs[t.tenantId] = n, n.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") && new RecaptchaEnterpriseVerifier(t).verify()
    }(e)
}
async function validatePassword(e, t) {
    return _castAuth(e).validatePassword(t)
}

function onIdTokenChanged(e, t, r, n) {
    return getModularInstance(e).onIdTokenChanged(t, r, n)
}

function beforeAuthStateChanged(e, t, r) {
    return getModularInstance(e).beforeAuthStateChanged(t, r)
}

function onAuthStateChanged(e, t, r, n) {
    return getModularInstance(e).onAuthStateChanged(t, r, n)
}

function useDeviceLanguage(e) {
    getModularInstance(e).useDeviceLanguage()
}

function updateCurrentUser(e, t) {
    return getModularInstance(e).updateCurrentUser(t)
}

function signOut(e) {
    return getModularInstance(e).signOut()
}

function revokeAccessToken(e, t) {
    return _castAuth(e).revokeAccessToken(t)
}
async function deleteUser(e) {
    return getModularInstance(e).delete()
}
class MultiFactorSessionImpl {
    constructor(e, t, r) {
        this.type = e, this.credential = t, this.user = r
    }
    static _fromIdtoken(e, t) {
        return new MultiFactorSessionImpl("enroll", e, t)
    }
    static _fromMfaPendingCredential(e) {
        return new MultiFactorSessionImpl("signin", e)
    }
    toJSON() {
        return {
            multiFactorSession: {
                ["enroll" === this.type ? "idToken" : "pendingCredential"]: this.credential
            }
        }
    }
    static fromJSON(e) {
        var t, r;
        if (null == e ? void 0 : e.multiFactorSession) {
            if (null === (t = e.multiFactorSession) || void 0 === t ? void 0 : t.pendingCredential) return MultiFactorSessionImpl._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);
            if (null === (r = e.multiFactorSession) || void 0 === r ? void 0 : r.idToken) return MultiFactorSessionImpl._fromIdtoken(e.multiFactorSession.idToken)
        }
        return null
    }
}
class MultiFactorResolverImpl {
    constructor(e, t, r) {
        this.session = e, this.hints = t, this.signInResolver = r
    }
    static _fromError(e, t) {
        const r = _castAuth(e),
            n = t.customData._serverResponse,
            i = (n.mfaInfo || []).map((e => MultiFactorInfoImpl._fromServerResponse(r, e)));
        _assert(n.mfaPendingCredential, r, "internal-error");
        const s = MultiFactorSessionImpl._fromMfaPendingCredential(n.mfaPendingCredential);
        return new MultiFactorResolverImpl(s, i, (async e => {
            const i = await e._process(r, s);
            delete n.mfaInfo, delete n.mfaPendingCredential;
            const o = Object.assign(Object.assign({}, n), {
                idToken: i.idToken,
                refreshToken: i.refreshToken
            });
            switch (t.operationType) {
                case "signIn":
                    const e = await UserCredentialImpl._fromIdTokenResponse(r, t.operationType, o);
                    return await r._updateCurrentUser(e.user), e;
                case "reauthenticate":
                    return _assert(t.user, r, "internal-error"), UserCredentialImpl._forOperation(t.user, t.operationType, o);
                default:
                    _fail(r, "internal-error")
            }
        }))
    }
    async resolveSignIn(e) {
        const t = e;
        return this.signInResolver(t)
    }
}

function getMultiFactorResolver(e, t) {
    var r;
    const n = getModularInstance(e),
        i = t;
    return _assert(t.customData.operationType, n, "argument-error"), _assert(null === (r = i.customData._serverResponse) || void 0 === r ? void 0 : r.mfaPendingCredential, n, "argument-error"), MultiFactorResolverImpl._fromError(n, i)
}
class MultiFactorUserImpl {
    constructor(e) {
        this.user = e, this.enrolledFactors = [], e._onReload((t => {
            t.mfaInfo && (this.enrolledFactors = t.mfaInfo.map((t => MultiFactorInfoImpl._fromServerResponse(e.auth, t))))
        }))
    }
    static _fromUser(e) {
        return new MultiFactorUserImpl(e)
    }
    async getSession() {
        return MultiFactorSessionImpl._fromIdtoken(await this.user.getIdToken(), this.user)
    }
    async enroll(e, t) {
        const r = e,
            n = await this.getSession(),
            i = await _logoutIfInvalidated(this.user, r._process(this.user.auth, n, t));
        return await this.user._updateTokensIfNecessary(i), this.user.reload()
    }
    async unenroll(e) {
        const t = "string" == typeof e ? e : e.uid,
            r = await this.user.getIdToken();
        try {
            const e = await _logoutIfInvalidated(this.user, function withdrawMfa(e, t) {
                return _performApiRequest(e, "POST", "/v2/accounts/mfaEnrollment:withdraw", _addTidIfNecessary(e, t))
            }(this.user.auth, {
                idToken: r,
                mfaEnrollmentId: t
            }));
            this.enrolledFactors = this.enrolledFactors.filter((({
                uid: e
            }) => e !== t)), await this.user._updateTokensIfNecessary(e), await this.user.reload()
        } catch (e) {
            throw e
        }
    }
}
const R = new WeakMap;

function multiFactor(e) {
    const t = getModularInstance(e);
    return R.has(t) || R.set(t, MultiFactorUserImpl._fromUser(t)), R.get(t)
}
class BrowserPersistenceClass {
    constructor(e, t) {
        this.storageRetriever = e, this.type = t
    }
    _isAvailable() {
        try {
            return this.storage ? (this.storage.setItem("__sak", "1"), this.storage.removeItem("__sak"), Promise.resolve(!0)) : Promise.resolve(!1)
        } catch (e) {
            return Promise.resolve(!1)
        }
    }
    _set(e, t) {
        return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve()
    }
    _get(e) {
        const t = this.storage.getItem(e);
        return Promise.resolve(t ? JSON.parse(t) : null)
    }
    _remove(e) {
        return this.storage.removeItem(e), Promise.resolve()
    }
    get storage() {
        return this.storageRetriever()
    }
}
class BrowserLocalPersistence extends BrowserPersistenceClass {
    constructor() {
        super((() => window.localStorage), "LOCAL"), this.boundEventHandler = (e, t) => this.onStorageEvent(e, t), this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.safariLocalStorageNotSynced = function _iframeCannotSyncWebStorage() {
            const e = getUA();
            return _isSafari(e) || _isIOS(e)
        }() && function _isIframe() {
            try {
                return !(!window || window === window.top)
            } catch (e) {
                return !1
            }
        }(), this.fallbackToPolling = _isMobileBrowser(), this._shouldAllowMigration = !0
    }
    forAllChangedKeys(e) {
        for (const t of Object.keys(this.listeners)) {
            const r = this.storage.getItem(t),
                n = this.localCache[t];
            r !== n && e(t, n, r)
        }
    }
    onStorageEvent(e, t = !1) {
        if (!e.key) return void this.forAllChangedKeys(((e, t, r) => {
            this.notifyListeners(e, r)
        }));
        const r = e.key;
        if (t ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced) {
            const n = this.storage.getItem(r);
            if (e.newValue !== n) null !== e.newValue ? this.storage.setItem(r, e.newValue) : this.storage.removeItem(r);
            else if (this.localCache[r] === e.newValue && !t) return
        }
        const triggerListeners = () => {
                const e = this.storage.getItem(r);
                (t || this.localCache[r] !== e) && this.notifyListeners(r, e)
            },
            n = this.storage.getItem(r);
        _isIE10() && n !== e.newValue && e.newValue !== e.oldValue ? setTimeout(triggerListeners, 10) : triggerListeners()
    }
    notifyListeners(e, t) {
        this.localCache[e] = t;
        const r = this.listeners[e];
        if (r)
            for (const e of Array.from(r)) e(t ? JSON.parse(t) : t)
    }
    startPolling() {
        this.stopPolling(), this.pollTimer = setInterval((() => {
            this.forAllChangedKeys(((e, t, r) => {
                this.onStorageEvent(new StorageEvent("storage", {
                    key: e,
                    oldValue: t,
                    newValue: r
                }), !0)
            }))
        }), 1e3)
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
        const t = await super._get(e);
        return this.localCache[e] = JSON.stringify(t), t
    }
    async _remove(e) {
        await super._remove(e), delete this.localCache[e]
    }
}
BrowserLocalPersistence.type = "LOCAL";
const P = BrowserLocalPersistence;
class BrowserSessionPersistence extends BrowserPersistenceClass {
    constructor() {
        super((() => window.sessionStorage), "SESSION")
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
}
BrowserSessionPersistence.type = "SESSION";
const k = BrowserSessionPersistence;
class Receiver {
    constructor(e) {
        this.eventTarget = e, this.handlersMap = {}, this.boundEventHandler = this.handleEvent.bind(this)
    }
    static _getInstance(e) {
        const t = this.receivers.find((t => t.isListeningto(e)));
        if (t) return t;
        const r = new Receiver(e);
        return this.receivers.push(r), r
    }
    isListeningto(e) {
        return this.eventTarget === e
    }
    async handleEvent(e) {
        const t = e,
            {
                eventId: r,
                eventType: n,
                data: i
            } = t.data,
            s = this.handlersMap[n];
        if (!(null == s ? void 0 : s.size)) return;
        t.ports[0].postMessage({
            status: "ack",
            eventId: r,
            eventType: n
        });
        const o = Array.from(s).map((async e => e(t.origin, i))),
            a = await
        function _allSettled(e) {
            return Promise.all(e.map((async e => {
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
            })))
        }(o);
        t.ports[0].postMessage({
            status: "done",
            eventId: r,
            eventType: n,
            response: a
        })
    }
    _subscribe(e, t) {
        0 === Object.keys(this.handlersMap).length && this.eventTarget.addEventListener("message", this.boundEventHandler), this.handlersMap[e] || (this.handlersMap[e] = new Set), this.handlersMap[e].add(t)
    }
    _unsubscribe(e, t) {
        this.handlersMap[e] && t && this.handlersMap[e].delete(t), t && 0 !== this.handlersMap[e].size || delete this.handlersMap[e], 0 === Object.keys(this.handlersMap).length && this.eventTarget.removeEventListener("message", this.boundEventHandler)
    }
}

function _generateEventId(e = "", t = 10) {
    let r = "";
    for (let e = 0; e < t; e++) r += Math.floor(10 * Math.random());
    return e + r
}
Receiver.receivers = [];
class Sender {
    constructor(e) {
        this.target = e, this.handlers = new Set
    }
    removeMessageHandler(e) {
        e.messageChannel && (e.messageChannel.port1.removeEventListener("message", e.onMessage), e.messageChannel.port1.close()), this.handlers.delete(e)
    }
    async _send(e, t, r = 50) {
        const n = "undefined" != typeof MessageChannel ? new MessageChannel : null;
        if (!n) throw new Error("connection_unavailable");
        let i, s;
        return new Promise(((o, a) => {
            const c = _generateEventId("", 20);
            n.port1.start();
            const d = setTimeout((() => {
                a(new Error("unsupported_event"))
            }), r);
            s = {
                messageChannel: n,
                onMessage(e) {
                    const t = e;
                    if (t.data.eventId === c) switch (t.data.status) {
                        case "ack":
                            clearTimeout(d), i = setTimeout((() => {
                                a(new Error("timeout"))
                            }), 3e3);
                            break;
                        case "done":
                            clearTimeout(i), o(t.data.response);
                            break;
                        default:
                            clearTimeout(d), clearTimeout(i), a(new Error("invalid_response"))
                    }
                }
            }, this.handlers.add(s), n.port1.addEventListener("message", s.onMessage), this.target.postMessage({
                eventType: e,
                eventId: c,
                data: t
            }, [n.port2])
        })).finally((() => {
            s && this.removeMessageHandler(s)
        }))
    }
}

function _window() {
    return window
}

function _isWorker() {
    return void 0 !== _window().WorkerGlobalScope && "function" == typeof _window().importScripts
}
const b = "firebaseLocalStorageDb";
class DBPromise {
    constructor(e) {
        this.request = e
    }
    toPromise() {
        return new Promise(((e, t) => {
            this.request.addEventListener("success", (() => {
                e(this.request.result)
            })), this.request.addEventListener("error", (() => {
                t(this.request.error)
            }))
        }))
    }
}

function getObjectStore(e, t) {
    return e.transaction(["firebaseLocalStorage"], t ? "readwrite" : "readonly").objectStore("firebaseLocalStorage")
}

function _openDatabase() {
    const e = indexedDB.open(b, 1);
    return new Promise(((t, r) => {
        e.addEventListener("error", (() => {
            r(e.error)
        })), e.addEventListener("upgradeneeded", (() => {
            const t = e.result;
            try {
                t.createObjectStore("firebaseLocalStorage", {
                    keyPath: "fbase_key"
                })
            } catch (e) {
                r(e)
            }
        })), e.addEventListener("success", (async () => {
            const r = e.result;
            r.objectStoreNames.contains("firebaseLocalStorage") ? t(r) : (r.close(), await
                function _deleteDatabase() {
                    const e = indexedDB.deleteDatabase(b);
                    return new DBPromise(e).toPromise()
                }(), t(await _openDatabase()))
        }))
    }))
}
async function _putObject(e, t, r) {
    const n = getObjectStore(e, !0).put({
        fbase_key: t,
        value: r
    });
    return new DBPromise(n).toPromise()
}

function _deleteObject(e, t) {
    const r = getObjectStore(e, !0).delete(t);
    return new DBPromise(r).toPromise()
}
class IndexedDBLocalPersistence {
    constructor() {
        this.type = "LOCAL", this._shouldAllowMigration = !0, this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.pendingWrites = 0, this.receiver = null, this.sender = null, this.serviceWorkerReceiverAvailable = !1, this.activeServiceWorker = null, this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then((() => {}), (() => {}))
    }
    async _openDb() {
        return this.db || (this.db = await _openDatabase()), this.db
    }
    async _withRetries(e) {
        let t = 0;
        for (;;) try {
            const t = await this._openDb();
            return await e(t)
        } catch (e) {
            if (t++ > 3) throw e;
            this.db && (this.db.close(), this.db = void 0)
        }
    }
    async initializeServiceWorkerMessaging() {
        return _isWorker() ? this.initializeReceiver() : this.initializeSender()
    }
    async initializeReceiver() {
        this.receiver = Receiver._getInstance(function _getWorkerGlobalScope() {
            return _isWorker() ? self : null
        }()), this.receiver._subscribe("keyChanged", (async (e, t) => ({
            keyProcessed: (await this._poll()).includes(t.key)
        }))), this.receiver._subscribe("ping", (async (e, t) => ["keyChanged"]))
    }
    async initializeSender() {
        var e, t;
        if (this.activeServiceWorker = await async function _getActiveServiceWorker() {
                if (!(null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker)) return null;
                try {
                    return (await navigator.serviceWorker.ready).active
                } catch (e) {
                    return null
                }
            }(), !this.activeServiceWorker) return;
        this.sender = new Sender(this.activeServiceWorker);
        const r = await this.sender._send("ping", {}, 800);
        r && (null === (e = r[0]) || void 0 === e ? void 0 : e.fulfilled) && (null === (t = r[0]) || void 0 === t ? void 0 : t.value.includes("keyChanged")) && (this.serviceWorkerReceiverAvailable = !0)
    }
    async notifyServiceWorker(e) {
        if (this.sender && this.activeServiceWorker && function _getServiceWorkerController() {
                var e;
                return (null === (e = null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker) || void 0 === e ? void 0 : e.controller) || null
            }() === this.activeServiceWorker) try {
            await this.sender._send("keyChanged", {
                key: e
            }, this.serviceWorkerReceiverAvailable ? 800 : 50)
        } catch (e) {}
    }
    async _isAvailable() {
        try {
            if (!indexedDB) return !1;
            const e = await _openDatabase();
            return await _putObject(e, "__sak", "1"), await _deleteObject(e, "__sak"), !0
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
    async _set(e, t) {
        return this._withPendingWrite((async () => (await this._withRetries((r => _putObject(r, e, t))), this.localCache[e] = t, this.notifyServiceWorker(e))))
    }
    async _get(e) {
        const t = await this._withRetries((t => async function getObject(e, t) {
            const r = getObjectStore(e, !1).get(t),
                n = await new DBPromise(r).toPromise();
            return void 0 === n ? null : n.value
        }(t, e)));
        return this.localCache[e] = t, t
    }
    async _remove(e) {
        return this._withPendingWrite((async () => (await this._withRetries((t => _deleteObject(t, e))), delete this.localCache[e], this.notifyServiceWorker(e))))
    }
    async _poll() {
        const e = await this._withRetries((e => {
            const t = getObjectStore(e, !1).getAll();
            return new DBPromise(t).toPromise()
        }));
        if (!e) return [];
        if (0 !== this.pendingWrites) return [];
        const t = [],
            r = new Set;
        if (0 !== e.length)
            for (const {
                    fbase_key: n,
                    value: i
                } of e) r.add(n), JSON.stringify(this.localCache[n]) !== JSON.stringify(i) && (this.notifyListeners(n, i), t.push(n));
        for (const e of Object.keys(this.localCache)) this.localCache[e] && !r.has(e) && (this.notifyListeners(e, null), t.push(e));
        return t
    }
    notifyListeners(e, t) {
        this.localCache[e] = t;
        const r = this.listeners[e];
        if (r)
            for (const e of Array.from(r)) e(t)
    }
    startPolling() {
        this.stopPolling(), this.pollTimer = setInterval((async () => this._poll()), 800)
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
IndexedDBLocalPersistence.type = "LOCAL";
const C = IndexedDBLocalPersistence;
class MockReCaptcha {
    constructor(e) {
        this.auth = e, this.counter = 1e12, this._widgets = new Map
    }
    render(e, t) {
        const r = this.counter;
        return this._widgets.set(r, new MockWidget(e, this.auth.name, t || {})), this.counter++, r
    }
    reset(e) {
        var t;
        const r = e || 1e12;
        null === (t = this._widgets.get(r)) || void 0 === t || t.delete(), this._widgets.delete(r)
    }
    getResponse(e) {
        var t;
        const r = e || 1e12;
        return (null === (t = this._widgets.get(r)) || void 0 === t ? void 0 : t.getResponse()) || ""
    }
    async execute(e) {
        var t;
        const r = e || 1e12;
        return null === (t = this._widgets.get(r)) || void 0 === t || t.execute(), ""
    }
}
class MockWidget {
    constructor(e, t, r) {
        this.params = r, this.timerId = null, this.deleted = !1, this.responseToken = null, this.clickHandler = () => {
            this.execute()
        };
        const n = "string" == typeof e ? document.getElementById(e) : e;
        _assert(n, "argument-error", {
            appName: t
        }), this.container = n, this.isVisible = "invisible" !== this.params.size, this.isVisible ? this.execute() : this.container.addEventListener("click", this.clickHandler)
    }
    getResponse() {
        return this.checkIfDeleted(), this.responseToken
    }
    delete() {
        this.checkIfDeleted(), this.deleted = !0, this.timerId && (clearTimeout(this.timerId), this.timerId = null), this.container.removeEventListener("click", this.clickHandler)
    }
    execute() {
        this.checkIfDeleted(), this.timerId || (this.timerId = window.setTimeout((() => {
            this.responseToken = function generateRandomAlphaNumericString(e) {
                const t = [],
                    r = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                for (let n = 0; n < e; n++) t.push(r.charAt(Math.floor(Math.random() * r.length)));
                return t.join("")
            }(50);
            const {
                callback: e,
                "expired-callback": t
            } = this.params;
            if (e) try {
                e(this.responseToken)
            } catch (e) {}
            this.timerId = window.setTimeout((() => {
                if (this.timerId = null, this.responseToken = null, t) try {
                    t()
                } catch (e) {}
                this.isVisible && this.execute()
            }), 6e4)
        }), 500))
    }
    checkIfDeleted() {
        if (this.deleted) throw new Error("reCAPTCHA mock was already deleted!")
    }
}
const O = _generateCallbackName("rcb"),
    N = new Delay(3e4, 6e4);
class ReCaptchaLoaderImpl {
    constructor() {
        var e;
        this.hostLanguage = "", this.counter = 0, this.librarySeparatelyLoaded = !!(null === (e = _window().grecaptcha) || void 0 === e ? void 0 : e.render)
    }
    load(e, t = "") {
        return _assert(function isHostLanguageValid(e) {
            return e.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(e)
        }(t), e, "argument-error"), this.shouldResolveImmediately(t) && isV2(_window().grecaptcha) ? Promise.resolve(_window().grecaptcha) : new Promise(((r, n) => {
            const i = _window().setTimeout((() => {
                n(_createError(e, "network-request-failed"))
            }), N.get());
            _window()[O] = () => {
                _window().clearTimeout(i), delete _window()[O];
                const s = _window().grecaptcha;
                if (!s || !isV2(s)) return void n(_createError(e, "internal-error"));
                const o = s.render;
                s.render = (e, t) => {
                    const r = o(e, t);
                    return this.counter++, r
                }, this.hostLanguage = t, r(s)
            };
            _loadJS(`${function _recaptchaV2ScriptUrl(){return w.recaptchaV2Script}()}?${querystring({onload:O,render:"explicit",hl:t})}`).catch((() => {
                clearTimeout(i), n(_createError(e, "internal-error"))
            }))
        }))
    }
    clearedOneInstance() {
        this.counter--
    }
    shouldResolveImmediately(e) {
        var t;
        return !!(null === (t = _window().grecaptcha) || void 0 === t ? void 0 : t.render) && (e === this.hostLanguage || this.counter > 0 || this.librarySeparatelyLoaded)
    }
}
class MockReCaptchaLoaderImpl {
    async load(e) {
        return new MockReCaptcha(e)
    }
    clearedOneInstance() {}
}
const L = {
    theme: "light",
    type: "image"
};
class RecaptchaVerifier {
    constructor(e, t, r = Object.assign({}, L)) {
        this.parameters = r, this.type = "recaptcha", this.destroyed = !1, this.widgetId = null, this.tokenChangeListeners = new Set, this.renderPromise = null, this.recaptcha = null, this.auth = _castAuth(e), this.isInvisible = "invisible" === this.parameters.size, _assert("undefined" != typeof document, this.auth, "operation-not-supported-in-this-environment");
        const n = "string" == typeof t ? document.getElementById(t) : t;
        _assert(n, this.auth, "argument-error"), this.container = n, this.parameters.callback = this.makeTokenCallback(this.parameters.callback), this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting ? new MockReCaptchaLoaderImpl : new ReCaptchaLoaderImpl, this.validateStartingState()
    }
    async verify() {
        this.assertNotDestroyed();
        const e = await this.render(),
            t = this.getAssertedRecaptcha(),
            r = t.getResponse(e);
        return r || new Promise((r => {
            const tokenChange = e => {
                e && (this.tokenChangeListeners.delete(tokenChange), r(e))
            };
            this.tokenChangeListeners.add(tokenChange), this.isInvisible && t.execute(e)
        }))
    }
    render() {
        try {
            this.assertNotDestroyed()
        } catch (e) {
            return Promise.reject(e)
        }
        return this.renderPromise || (this.renderPromise = this.makeRenderPromise().catch((e => {
            throw this.renderPromise = null, e
        }))), this.renderPromise
    }
    _reset() {
        this.assertNotDestroyed(), null !== this.widgetId && this.getAssertedRecaptcha().reset(this.widgetId)
    }
    clear() {
        this.assertNotDestroyed(), this.destroyed = !0, this._recaptchaLoader.clearedOneInstance(), this.isInvisible || this.container.childNodes.forEach((e => {
            this.container.removeChild(e)
        }))
    }
    validateStartingState() {
        _assert(!this.parameters.sitekey, this.auth, "argument-error"), _assert(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error"), _assert("undefined" != typeof document, this.auth, "operation-not-supported-in-this-environment")
    }
    makeTokenCallback(e) {
        return t => {
            if (this.tokenChangeListeners.forEach((e => e(t))), "function" == typeof e) e(t);
            else if ("string" == typeof e) {
                const r = _window()[e];
                "function" == typeof r && r(t)
            }
        }
    }
    assertNotDestroyed() {
        _assert(!this.destroyed, this.auth, "internal-error")
    }
    async makeRenderPromise() {
        if (await this.init(), !this.widgetId) {
            let e = this.container;
            if (!this.isInvisible) {
                const t = document.createElement("div");
                e.appendChild(t), e = t
            }
            this.widgetId = this.getAssertedRecaptcha().render(e, this.parameters)
        }
        return this.widgetId
    }
    async init() {
        _assert(_isHttpOrHttps() && !_isWorker(), this.auth, "internal-error"), await
        function domReady() {
            let e = null;
            return new Promise((t => {
                "complete" !== document.readyState ? (e = () => t(), window.addEventListener("load", e)) : t()
            })).catch((t => {
                throw e && window.removeEventListener("load", e), t
            }))
        }(), this.recaptcha = await this._recaptchaLoader.load(this.auth, this.auth.languageCode || void 0);
        const e = await async function getRecaptchaParams(e) {
            return (await _performApiRequest(e, "GET", "/v1/recaptchaParams")).recaptchaSiteKey || ""
        }(this.auth);
        _assert(e, this.auth, "internal-error"), this.parameters.sitekey = e
    }
    getAssertedRecaptcha() {
        return _assert(this.recaptcha, this.auth, "internal-error"), this.recaptcha
    }
}
class ConfirmationResultImpl {
    constructor(e, t) {
        this.verificationId = e, this.onConfirmation = t
    }
    confirm(e) {
        const t = PhoneAuthCredential._fromVerification(this.verificationId, e);
        return this.onConfirmation(t)
    }
}
async function signInWithPhoneNumber(e, t, r) {
    const n = _castAuth(e),
        i = await _verifyPhoneNumber(n, t, getModularInstance(r));
    return new ConfirmationResultImpl(i, (e => signInWithCredential(n, e)))
}
async function linkWithPhoneNumber(e, t, r) {
    const n = getModularInstance(e);
    await _assertLinkedStatus(!1, n, "phone");
    const i = await _verifyPhoneNumber(n.auth, t, getModularInstance(r));
    return new ConfirmationResultImpl(i, (e => linkWithCredential(n, e)))
}
async function reauthenticateWithPhoneNumber(e, t, r) {
    const n = getModularInstance(e),
        i = await _verifyPhoneNumber(n.auth, t, getModularInstance(r));
    return new ConfirmationResultImpl(i, (e => reauthenticateWithCredential(n, e)))
}
async function _verifyPhoneNumber(e, t, r) {
    var n;
    const i = await r.verify();
    try {
        let s;
        if (_assert("string" == typeof i, e, "argument-error"), _assert("recaptcha" === r.type, e, "argument-error"), s = "string" == typeof t ? {
                phoneNumber: t
            } : t, "session" in s) {
            const t = s.session;
            if ("phoneNumber" in s) {
                _assert("enroll" === t.type, e, "internal-error");
                const r = await
                function startEnrollPhoneMfa(e, t) {
                    return _performApiRequest(e, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(e, t))
                }(e, {
                    idToken: t.credential,
                    phoneEnrollmentInfo: {
                        phoneNumber: s.phoneNumber,
                        recaptchaToken: i
                    }
                });
                return r.phoneSessionInfo.sessionInfo
            } {
                _assert("signin" === t.type, e, "internal-error");
                const r = (null === (n = s.multiFactorHint) || void 0 === n ? void 0 : n.uid) || s.multiFactorUid;
                _assert(r, e, "missing-multi-factor-info");
                const o = await
                function startSignInPhoneMfa(e, t) {
                    return _performApiRequest(e, "POST", "/v2/accounts/mfaSignIn:start", _addTidIfNecessary(e, t))
                }(e, {
                    mfaPendingCredential: t.credential,
                    mfaEnrollmentId: r,
                    phoneSignInInfo: {
                        recaptchaToken: i
                    }
                });
                return o.phoneResponseInfo.sessionInfo
            }
        } {
            const {
                sessionInfo: t
            } = await async function sendPhoneVerificationCode(e, t) {
                return _performApiRequest(e, "POST", "/v1/accounts:sendVerificationCode", _addTidIfNecessary(e, t))
            }(e, {
                phoneNumber: s.phoneNumber,
                recaptchaToken: i
            });
            return t
        }
    } finally {
        r._reset()
    }
}
async function updatePhoneNumber(e, t) {
    await _link$1(getModularInstance(e), t)
}
class PhoneAuthProvider {
    constructor(e) {
        this.providerId = PhoneAuthProvider.PROVIDER_ID, this.auth = _castAuth(e)
    }
    verifyPhoneNumber(e, t) {
        return _verifyPhoneNumber(this.auth, e, getModularInstance(t))
    }
    static credential(e, t) {
        return PhoneAuthCredential._fromVerification(e, t)
    }
    static credentialFromResult(e) {
        const t = e;
        return PhoneAuthProvider.credentialFromTaggedObject(t)
    }
    static credentialFromError(e) {
        return PhoneAuthProvider.credentialFromTaggedObject(e.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e) return null;
        const {
            phoneNumber: t,
            temporaryProof: r
        } = e;
        return t && r ? PhoneAuthCredential._fromTokenResponse(t, r) : null
    }
}

function _withDefaultResolver(e, t) {
    return t ? _getInstance(t) : (_assert(e._popupRedirectResolver, e, "argument-error"), e._popupRedirectResolver)
}
PhoneAuthProvider.PROVIDER_ID = "phone", PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone";
class IdpCredential extends AuthCredential {
    constructor(e) {
        super("custom", "custom"), this.params = e
    }
    _getIdTokenResponse(e) {
        return signInWithIdp(e, this._buildIdpRequest())
    }
    _linkToIdToken(e, t) {
        return signInWithIdp(e, this._buildIdpRequest(t))
    }
    _getReauthenticationResolver(e) {
        return signInWithIdp(e, this._buildIdpRequest())
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

function _signIn(e) {
    return _signInWithCredential(e.auth, new IdpCredential(e), e.bypassAuthState)
}

function _reauth(e) {
    const {
        auth: t,
        user: r
    } = e;
    return _assert(r, t, "internal-error"), _reauthenticate(r, new IdpCredential(e), e.bypassAuthState)
}
async function _link(e) {
    const {
        auth: t,
        user: r
    } = e;
    return _assert(r, t, "internal-error"), _link$1(r, new IdpCredential(e), e.bypassAuthState)
}
class AbstractPopupRedirectOperation {
    constructor(e, t, r, n, i = !1) {
        this.auth = e, this.resolver = r, this.user = n, this.bypassAuthState = i, this.pendingPromise = null, this.eventManager = null, this.filter = Array.isArray(t) ? t : [t]
    }
    execute() {
        return new Promise((async (e, t) => {
            this.pendingPromise = {
                resolve: e,
                reject: t
            };
            try {
                this.eventManager = await this.resolver._initialize(this.auth), await this.onExecution(), this.eventManager.registerConsumer(this)
            } catch (e) {
                this.reject(e)
            }
        }))
    }
    async onAuthEvent(e) {
        const {
            urlResponse: t,
            sessionId: r,
            postBody: n,
            tenantId: i,
            error: s,
            type: o
        } = e;
        if (s) return void this.reject(s);
        const a = {
            auth: this.auth,
            requestUri: t,
            sessionId: r,
            tenantId: i || void 0,
            postBody: n || void 0,
            user: this.user,
            bypassAuthState: this.bypassAuthState
        };
        try {
            this.resolve(await this.getIdpTask(o)(a))
        } catch (e) {
            this.reject(e)
        }
    }
    onError(e) {
        this.reject(e)
    }
    getIdpTask(e) {
        switch (e) {
            case "signInViaPopup":
            case "signInViaRedirect":
                return _signIn;
            case "linkViaPopup":
            case "linkViaRedirect":
                return _link;
            case "reauthViaPopup":
            case "reauthViaRedirect":
                return _reauth;
            default:
                _fail(this.auth, "internal-error")
        }
    }
    resolve(e) {
        debugAssert(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.resolve(e), this.unregisterAndCleanUp()
    }
    reject(e) {
        debugAssert(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.reject(e), this.unregisterAndCleanUp()
    }
    unregisterAndCleanUp() {
        this.eventManager && this.eventManager.unregisterConsumer(this), this.pendingPromise = null, this.cleanUp()
    }
}
const D = new Delay(2e3, 1e4);
async function signInWithPopup(e, t, r) {
    const n = _castAuth(e);
    _assertInstanceOf(e, t, FederatedAuthProvider);
    const i = _withDefaultResolver(n, r);
    return new PopupOperation(n, "signInViaPopup", t, i).executeNotNull()
}
async function reauthenticateWithPopup(e, t, r) {
    const n = getModularInstance(e);
    _assertInstanceOf(n.auth, t, FederatedAuthProvider);
    const i = _withDefaultResolver(n.auth, r);
    return new PopupOperation(n.auth, "reauthViaPopup", t, i, n).executeNotNull()
}
async function linkWithPopup(e, t, r) {
    const n = getModularInstance(e);
    _assertInstanceOf(n.auth, t, FederatedAuthProvider);
    const i = _withDefaultResolver(n.auth, r);
    return new PopupOperation(n.auth, "linkViaPopup", t, i, n).executeNotNull()
}
class PopupOperation extends AbstractPopupRedirectOperation {
    constructor(e, t, r, n, i) {
        super(e, t, n, i), this.provider = r, this.authWindow = null, this.pollId = null, PopupOperation.currentPopupAction && PopupOperation.currentPopupAction.cancel(), PopupOperation.currentPopupAction = this
    }
    async executeNotNull() {
        const e = await this.execute();
        return _assert(e, this.auth, "internal-error"), e
    }
    async onExecution() {
        debugAssert(1 === this.filter.length, "Popup operations only handle one event");
        const e = _generateEventId();
        this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e), this.authWindow.associatedEvent = e, this.resolver._originValidation(this.auth).catch((e => {
            this.reject(e)
        })), this.resolver._isIframeWebStorageSupported(this.auth, (e => {
            e || this.reject(_createError(this.auth, "web-storage-unsupported"))
        })), this.pollUserCancellation()
    }
    get eventId() {
        var e;
        return (null === (e = this.authWindow) || void 0 === e ? void 0 : e.associatedEvent) || null
    }
    cancel() {
        this.reject(_createError(this.auth, "cancelled-popup-request"))
    }
    cleanUp() {
        this.authWindow && this.authWindow.close(), this.pollId && window.clearTimeout(this.pollId), this.authWindow = null, this.pollId = null, PopupOperation.currentPopupAction = null
    }
    pollUserCancellation() {
        const poll = () => {
            var e, t;
            (null === (t = null === (e = this.authWindow) || void 0 === e ? void 0 : e.window) || void 0 === t ? void 0 : t.closed) ? this.pollId = window.setTimeout((() => {
                this.pollId = null, this.reject(_createError(this.auth, "popup-closed-by-user"))
            }), 8e3): this.pollId = window.setTimeout(poll, D.get())
        };
        poll()
    }
}
PopupOperation.currentPopupAction = null;
const M = new Map;
class RedirectAction extends AbstractPopupRedirectOperation {
    constructor(e, t, r = !1) {
        super(e, ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"], t, void 0, r), this.eventId = null
    }
    async execute() {
        let e = M.get(this.auth._key());
        if (!e) {
            try {
                const t = await async function _getAndClearPendingRedirectStatus(e, t) {
                    const r = pendingRedirectKey(t),
                        n = resolverPersistence(e);
                    if (!await n._isAvailable()) return !1;
                    const i = "true" === await n._get(r);
                    return await n._remove(r), i
                }(this.resolver, this.auth) ? await super.execute() : null;
                e = () => Promise.resolve(t)
            } catch (t) {
                e = () => Promise.reject(t)
            }
            M.set(this.auth._key(), e)
        }
        return this.bypassAuthState || M.set(this.auth._key(), (() => Promise.resolve(null))), e()
    }
    async onAuthEvent(e) {
        if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
        if ("unknown" !== e.type) {
            if (e.eventId) {
                const t = await this.auth._redirectUserForId(e.eventId);
                if (t) return this.user = t, super.onAuthEvent(e);
                this.resolve(null)
            }
        } else this.resolve(null)
    }
    async onExecution() {}
    cleanUp() {}
}
async function _setPendingRedirectStatus(e, t) {
    return resolverPersistence(e)._set(pendingRedirectKey(t), "true")
}

function _overrideRedirectResult(e, t) {
    M.set(e._key(), t)
}

function resolverPersistence(e) {
    return _getInstance(e._redirectPersistence)
}

function pendingRedirectKey(e) {
    return _persistenceKeyName("pendingRedirect", e.config.apiKey, e.name)
}

function signInWithRedirect(e, t, r) {
    return async function _signInWithRedirect(e, t, r) {
        const n = _castAuth(e);
        _assertInstanceOf(e, t, FederatedAuthProvider), await n._initializationPromise;
        const i = _withDefaultResolver(n, r);
        return await _setPendingRedirectStatus(i, n), i._openRedirect(n, t, "signInViaRedirect")
    }(e, t, r)
}

function reauthenticateWithRedirect(e, t, r) {
    return async function _reauthenticateWithRedirect(e, t, r) {
        const n = getModularInstance(e);
        _assertInstanceOf(n.auth, t, FederatedAuthProvider), await n.auth._initializationPromise;
        const i = _withDefaultResolver(n.auth, r);
        await _setPendingRedirectStatus(i, n.auth);
        const s = await prepareUserForRedirect(n);
        return i._openRedirect(n.auth, t, "reauthViaRedirect", s)
    }(e, t, r)
}

function linkWithRedirect(e, t, r) {
    return async function _linkWithRedirect(e, t, r) {
        const n = getModularInstance(e);
        _assertInstanceOf(n.auth, t, FederatedAuthProvider), await n.auth._initializationPromise;
        const i = _withDefaultResolver(n.auth, r);
        await _assertLinkedStatus(!1, n, t.providerId), await _setPendingRedirectStatus(i, n.auth);
        const s = await prepareUserForRedirect(n);
        return i._openRedirect(n.auth, t, "linkViaRedirect", s)
    }(e, t, r)
}
async function getRedirectResult(e, t) {
    return await _castAuth(e)._initializationPromise, _getRedirectResult(e, t, !1)
}
async function _getRedirectResult(e, t, r = !1) {
    const n = _castAuth(e),
        i = _withDefaultResolver(n, t),
        s = new RedirectAction(n, i, r),
        o = await s.execute();
    return o && !r && (delete o.user._redirectEventId, await n._persistUserIfCurrent(o.user), await n._setRedirectUser(null, t)), o
}
async function prepareUserForRedirect(e) {
    const t = _generateEventId(`${e.uid}:::`);
    return e._redirectEventId = t, await e.auth._setRedirectUser(e), await e.auth._persistUserIfCurrent(e), t
}
class AuthEventManager {
    constructor(e) {
        this.auth = e, this.cachedEventUids = new Set, this.consumers = new Set, this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1, this.lastProcessedEventTime = Date.now()
    }
    registerConsumer(e) {
        this.consumers.add(e), this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, e) && (this.sendToConsumer(this.queuedRedirectEvent, e), this.saveEventToCache(this.queuedRedirectEvent), this.queuedRedirectEvent = null)
    }
    unregisterConsumer(e) {
        this.consumers.delete(e)
    }
    onEvent(e) {
        if (this.hasEventBeenHandled(e)) return !1;
        let t = !1;
        return this.consumers.forEach((r => {
            this.isEventForConsumer(e, r) && (t = !0, this.sendToConsumer(e, r), this.saveEventToCache(e))
        })), this.hasHandledPotentialRedirect || ! function isRedirectEvent(e) {
            switch (e.type) {
                case "signInViaRedirect":
                case "linkViaRedirect":
                case "reauthViaRedirect":
                    return !0;
                case "unknown":
                    return isNullRedirectEvent(e);
                default:
                    return !1
            }
        }(e) || (this.hasHandledPotentialRedirect = !0, t || (this.queuedRedirectEvent = e, t = !0)), t
    }
    sendToConsumer(e, t) {
        var r;
        if (e.error && !isNullRedirectEvent(e)) {
            const n = (null === (r = e.error.code) || void 0 === r ? void 0 : r.split("auth/")[1]) || "internal-error";
            t.onError(_createError(this.auth, n))
        } else t.onAuthEvent(e)
    }
    isEventForConsumer(e, t) {
        const r = null === t.eventId || !!e.eventId && e.eventId === t.eventId;
        return t.filter.includes(e.type) && r
    }
    hasEventBeenHandled(e) {
        return Date.now() - this.lastProcessedEventTime >= 6e5 && this.cachedEventUids.clear(), this.cachedEventUids.has(eventUid(e))
    }
    saveEventToCache(e) {
        this.cachedEventUids.add(eventUid(e)), this.lastProcessedEventTime = Date.now()
    }
}

function eventUid(e) {
    return [e.type, e.eventId, e.sessionId, e.tenantId].filter((e => e)).join("-")
}

function isNullRedirectEvent({
    type: e,
    error: t
}) {
    return "unknown" === e && "auth/no-auth-event" === (null == t ? void 0 : t.code)
}
const U = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    F = /^https?/;
async function _validateOrigin(e) {
    if (e.config.emulator) return;
    const {
        authorizedDomains: t
    } = await async function _getProjectConfig(e, t = {}) {
        return _performApiRequest(e, "GET", "/v1/projects", t)
    }(e);
    for (const e of t) try {
        if (matchDomain(e)) return
    } catch (e) {}
    _fail(e, "unauthorized-domain")
}

function matchDomain(e) {
    const t = _getCurrentUrl(),
        {
            protocol: r,
            hostname: n
        } = new URL(t);
    if (e.startsWith("chrome-extension://")) {
        const i = new URL(e);
        return "" === i.hostname && "" === n ? "chrome-extension:" === r && e.replace("chrome-extension://", "") === t.replace("chrome-extension://", "") : "chrome-extension:" === r && i.hostname === n
    }
    if (!F.test(r)) return !1;
    if (U.test(e)) return n === e;
    const i = e.replace(/\./g, "\\.");
    return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(n)
}
const V = new Delay(3e4, 6e4);

function resetUnloadedGapiModules() {
    const e = _window().___jsl;
    if (null == e ? void 0 : e.H)
        for (const t of Object.keys(e.H))
            if (e.H[t].r = e.H[t].r || [], e.H[t].L = e.H[t].L || [], e.H[t].r = [...e.H[t].L], e.CP)
                for (let t = 0; t < e.CP.length; t++) e.CP[t] = null
}

function loadGapi(e) {
    return new Promise(((t, r) => {
        var n, i, s;

        function loadGapiIframe() {
            resetUnloadedGapiModules(), gapi.load("gapi.iframes", {
                callback: () => {
                    t(gapi.iframes.getContext())
                },
                ontimeout: () => {
                    resetUnloadedGapiModules(), r(_createError(e, "network-request-failed"))
                },
                timeout: V.get()
            })
        }
        if (null === (i = null === (n = _window().gapi) || void 0 === n ? void 0 : n.iframes) || void 0 === i ? void 0 : i.Iframe) t(gapi.iframes.getContext());
        else {
            if (!(null === (s = _window().gapi) || void 0 === s ? void 0 : s.load)) {
                const t = _generateCallbackName("iframefcb");
                return _window()[t] = () => {
                    gapi.load ? loadGapiIframe() : r(_createError(e, "network-request-failed"))
                }, _loadJS(`${function _gapiScriptUrl(){return w.gapiScript}()}?onload=${t}`).catch((e => r(e)))
            }
            loadGapiIframe()
        }
    })).catch((e => {
        throw W = null, e
    }))
}
let W = null;
const x = new Delay(5e3, 15e3),
    H = {
        style: {
            position: "absolute",
            top: "-100px",
            width: "1px",
            height: "1px"
        },
        "aria-hidden": "true",
        tabindex: "-1"
    },
    q = new Map([
        ["identitytoolkit.googleapis.com", "p"],
        ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
        ["test-identitytoolkit.sandbox.googleapis.com", "t"]
    ]);

function getIframeUrl(e) {
    const t = e.config;
    _assert(t.authDomain, e, "auth-domain-config-required");
    const r = t.emulator ? _emulatorUrl(t, "emulator/auth/iframe") : `https://${e.config.authDomain}/__/auth/iframe`,
        i = {
            apiKey: t.apiKey,
            appName: e.name,
            v: n
        },
        s = q.get(e.config.apiHost);
    s && (i.eid = s);
    const o = e._getFrameworks();
    return o.length && (i.fw = o.join(",")), `${r}?${querystring(i).slice(1)}`
}
async function _openIframe(e) {
    const t = await
    function _loadGapi(e) {
        return W = W || loadGapi(e), W
    }(e), r = _window().gapi;
    return _assert(r, e, "internal-error"), t.open({
        where: document.body,
        url: getIframeUrl(e),
        messageHandlersFilter: r.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        attributes: H,
        dontclear: !0
    }, (t => new Promise((async (r, n) => {
        await t.restyle({
            setHideOnLeave: !1
        });
        const i = _createError(e, "network-request-failed"),
            s = _window().setTimeout((() => {
                n(i)
            }), x.get());

        function clearTimerAndResolve() {
            _window().clearTimeout(s), r(t)
        }
        t.ping(clearTimerAndResolve).then(clearTimerAndResolve, (() => {
            n(i)
        }))
    }))))
}
const j = {
    location: "yes",
    resizable: "yes",
    statusbar: "yes",
    toolbar: "no"
};
class AuthPopup {
    constructor(e) {
        this.window = e, this.associatedEvent = null
    }
    close() {
        if (this.window) try {
            this.window.close()
        } catch (e) {}
    }
}

function _open(e, t, r, n = 500, i = 600) {
    const s = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
        o = Math.max((window.screen.availWidth - n) / 2, 0).toString();
    let a = "";
    const c = Object.assign(Object.assign({}, j), {
            width: n.toString(),
            height: i.toString(),
            top: s,
            left: o
        }),
        d = getUA().toLowerCase();
    r && (a = _isChromeIOS(d) ? "_blank" : r), _isFirefox(d) && (t = t || "http://localhost", c.scrollbars = "yes");
    const u = Object.entries(c).reduce(((e, [t, r]) => `${e}${t}=${r},`), "");
    if (function _isIOSStandalone(e = getUA()) {
            var t;
            return _isIOS(e) && !!(null === (t = window.navigator) || void 0 === t ? void 0 : t.standalone)
        }(d) && "_self" !== a) return function openAsNewWindowIOS(e, t) {
        const r = document.createElement("a");
        r.href = e, r.target = t;
        const n = document.createEvent("MouseEvent");
        n.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), r.dispatchEvent(n)
    }(t || "", a), new AuthPopup(null);
    const l = window.open(t || "", a, u);
    _assert(l, e, "popup-blocked");
    try {
        l.focus()
    } catch (e) {}
    return new AuthPopup(l)
}
const G = encodeURIComponent("fac");
async function _getRedirectUrl(e, t, r, i, s, o) {
    _assert(e.config.authDomain, e, "auth-domain-config-required"), _assert(e.config.apiKey, e, "invalid-api-key");
    const a = {
        apiKey: e.config.apiKey,
        appName: e.name,
        authType: r,
        redirectUrl: i,
        v: n,
        eventId: s
    };
    if (t instanceof FederatedAuthProvider) {
        t.setDefaultLanguage(e.languageCode), a.providerId = t.providerId || "",
            function isEmpty(e) {
                for (const t in e)
                    if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
                return !0
            }(t.getCustomParameters()) || (a.customParameters = JSON.stringify(t.getCustomParameters()));
        for (const [e, t] of Object.entries(o || {})) a[e] = t
    }
    if (t instanceof BaseOAuthProvider) {
        const e = t.getScopes().filter((e => "" !== e));
        e.length > 0 && (a.scopes = e.join(","))
    }
    e.tenantId && (a.tid = e.tenantId);
    const c = a;
    for (const e of Object.keys(c)) void 0 === c[e] && delete c[e];
    const d = await e._getAppCheckToken(),
        u = d ? `#${G}=${encodeURIComponent(d)}` : "";
    return `${function getHandlerBase({config:e}){if(!e.emulator)return`
    https: //${e.authDomain}/__/auth/handler`;return _emulatorUrl(e,"emulator/auth/handler")}(e)}?${querystring(c).slice(1)}${u}`}const B=class BrowserPopupRedirectResolver{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=k,this._completeRedirectFn=_getRedirectResult,this._overrideRedirectResult=_overrideRedirectResult}async _openPopup(e,t,r,n){var i;debugAssert(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return _open(e,await _getRedirectUrl(e,t,r,_getCurrentUrl(),n),_generateEventId())}async _openRedirect(e,t,r,n){await this._originValidation(e);return function _setWindowLocation(e){_window().location.href=e}(await _getRedirectUrl(e,t,r,_getCurrentUrl(),n)),new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:r}=this.eventManagers[t];return e?Promise.resolve(e):(debugAssert(r,"If manager is not set, promise should be"),r)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch((()=>{delete this.eventManagers[t]})),r}async initAndGetManager(e){const t=await _openIframe(e),r=new AuthEventManager(e);return t.register("authEvent",(t=>{_assert(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:r.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send("webStorageSupport",{type:"webStorageSupport"},(r=>{var n;const i=null===(n=null==r?void 0:r[0])||void 0===n?void 0:n.webStorageSupport;void 0!==i&&t(!!i),_fail(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=_validateOrigin(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _isMobileBrowser()||_isSafari()||_isIOS()}};class MultiFactorAssertionImpl{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return debugFail("unexpected MultiFactorSessionType")}}}class PhoneMultiFactorAssertionImpl extends MultiFactorAssertionImpl{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new PhoneMultiFactorAssertionImpl(e)}_finalizeEnroll(e,t,r){return function finalizeEnrollPhoneMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaEnrollment:finalize",_addTidIfNecessary(e,t))}(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return function finalizeSignInPhoneMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaSignIn:finalize",_addTidIfNecessary(e,t))}(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class PhoneMultiFactorGenerator{constructor(){}static assertion(e){return PhoneMultiFactorAssertionImpl._fromCredential(e)}}PhoneMultiFactorGenerator.FACTOR_ID="phone";class TotpMultiFactorGenerator{static assertionForEnrollment(e,t){return TotpMultiFactorAssertionImpl._fromSecret(e,t)}static assertionForSignIn(e,t){return TotpMultiFactorAssertionImpl._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const r=e;_assert(void 0!==(null===(t=r.user)||void 0===t?void 0:t.auth),"internal-error");const n=await function startEnrollTotpMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaEnrollment:start",_addTidIfNecessary(e,t))}(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return TotpSecret._fromStartTotpMfaEnrollmentResponse(n,r.user.auth)}}TotpMultiFactorGenerator.FACTOR_ID="totp";class TotpMultiFactorAssertionImpl extends MultiFactorAssertionImpl{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new TotpMultiFactorAssertionImpl(t,void 0,e)}static _fromEnrollmentId(e,t){return new TotpMultiFactorAssertionImpl(t,e)}async _finalizeEnroll(e,t,r){return _assert(void 0!==this.secret,e,"argument-error"),function finalizeEnrollTotpMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaEnrollment:finalize",_addTidIfNecessary(e,t))}(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){_assert(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const r={verificationCode:this.otp};return function finalizeSignInTotpMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaSignIn:finalize",_addTidIfNecessary(e,t))}(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class TotpSecret{constructor(e,t,r,n,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=n,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new TotpSecret(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let n=!1;return(_isEmptyString(e)||_isEmptyString(t))&&(n=!0),n&&(_isEmptyString(e)&&(e=(null===(r=this.auth.currentUser)||void 0===r?void 0:r.email)||"unknownuser"),_isEmptyString(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function _isEmptyString(e){return void 0===e||0===(null==e?void 0:e.length)}var z="@firebase/auth";class AuthInterop{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){_assert(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}const K=getExperimentalSetting("authIdTokenMaxAge")||300;let $=null;function getAuth(e=r()){const t=_getProvider(e,"auth");if(t.isInitialized())return t.getImmediate();const n=initializeAuth(e,{popupRedirectResolver:B,persistence:[C,P,k]}),i=getExperimentalSetting("authTokenSyncURL");if(i&&i.match(/^\/[^\/].*/)){const e=(s=i,async e=>{const t=e&&await e.getIdTokenResult(),r=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>K)return;const n=null==t?void 0:t.token;$!==n&&($=n,await fetch(s,{method:n?"POST":"DELETE",headers:n?{Authorization:`Bearer ${n}`}:{}}))});beforeAuthStateChanged(n,e,(()=>e(n.currentUser))),onIdTokenChanged(n,(t=>e(t)))}var s;const o=(a="auth",null===(d=null===(c=getDefaults())||void 0===c?void 0:c.emulatorHosts)||void 0===d?void 0:d[a]);var a,c,d;return o&&connectAuthEmulator(n,`http://${o}`),n}!function _setExternalJSProvider(e){w=e}({loadJS:e=>new Promise(((t,r)=>{const n=document.createElement("script");n.setAttribute("src",e),n.onload=t,n.onerror=e=>{const t=_createError("internal-error");t.customData=e,r(t)},n.type="text/javascript",n.charset="UTF-8",function getScriptParentElement(){var e,t;return null!==(t=null===(e=document.getElementsByTagName("head"))||void 0===e?void 0:e[0])&&void 0!==t?t:document}().appendChild(n)})),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),function registerAuth(r){e(new Component("auth",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=n.options;_assert(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:o,authDomain:a,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_getClientVersion(r)},d=new AuthImpl(n,i,s,c);return function _initializeAuthInstance(e,t){const r=(null==t?void 0:t.persistence)||[],n=(Array.isArray(r)?r:[r]).map(_getInstance);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(n,null==t?void 0:t.popupRedirectResolver)}(d,t),d}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,r)=>{e.getProvider("auth-internal").initialize()}))),e(new Component("auth-internal",(e=>(e=>new AuthInterop(e))(_castAuth(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),t(z,"1.6.2",function getVersionForPlatform(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(r)),t(z,"1.6.2","esm2017")}("Browser");export{f as ActionCodeOperation,ActionCodeURL,AuthCredential,I as AuthErrorCodes,EmailAuthCredential,EmailAuthProvider,FacebookAuthProvider,u as FactorId,GithubAuthProvider,GoogleAuthProvider,OAuthCredential,OAuthProvider,p as OperationType,PhoneAuthCredential,PhoneAuthProvider,PhoneMultiFactorGenerator,l as ProviderId,RecaptchaVerifier,SAMLAuthProvider,h as SignInMethod,TotpMultiFactorGenerator,TotpSecret,TwitterAuthProvider,applyActionCode,beforeAuthStateChanged,P as browserLocalPersistence,B as browserPopupRedirectResolver,k as browserSessionPersistence,checkActionCode,confirmPasswordReset,connectAuthEmulator,createUserWithEmailAndPassword,m as debugErrorMap,deleteUser,fetchSignInMethodsForEmail,getAdditionalUserInfo,getAuth,getIdToken,getIdTokenResult,getMultiFactorResolver,getRedirectResult,A as inMemoryPersistence,C as indexedDBLocalPersistence,initializeAuth,initializeRecaptchaConfig,isSignInWithEmailLink,linkWithCredential,linkWithPhoneNumber,linkWithPopup,linkWithRedirect,multiFactor,onAuthStateChanged,onIdTokenChanged,parseActionCodeURL,g as prodErrorMap,reauthenticateWithCredential,reauthenticateWithPhoneNumber,reauthenticateWithPopup,reauthenticateWithRedirect,reload,revokeAccessToken,sendEmailVerification,sendPasswordResetEmail,sendSignInLinkToEmail,setPersistence,signInAnonymously,signInWithCredential,signInWithCustomToken,signInWithEmailAndPassword,signInWithEmailLink,signInWithPhoneNumber,signInWithPopup,signInWithRedirect,signOut,unlink,updateCurrentUser,updateEmail,updatePassword,updatePhoneNumber,updateProfile,useDeviceLanguage,validatePassword,verifyBeforeUpdateEmail,verifyPasswordResetCode};

    //# sourceMappingURL=firebase-auth.js.map