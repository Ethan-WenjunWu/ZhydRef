"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

import { CaptchaOverlay } from "./CaptchaOverlay";
import {
  CloseIcon,
  DownIcon,
  EyeIcon,
  EyeInvisibleIcon,
  GlobalIcon,
  LockIcon,
  MobileIcon,
  WechatIcon,
  WecomIcon,
} from "./icons";
import "./kuaijing-login.css";

const PHONE_PATTERN = /^1[3-9]\d{9}$/;
const CODE_LENGTH = 6;
const COUNTDOWN_SECONDS = 60;

type LoginTab = "code" | "password";
type LoginMethod = "phone" | "wechat";
type MoreLogin = "wechat" | "wecom" | "phone";

const LOGO_SRC = "/sites/kuaijing/images/logo.png";
const BANNER_SRC = "/sites/kuaijing/images/banner.png";
const WECHAT_QR_SRC = "/sites/kuaijing/images/wechat-qr.jpg";
const WECOM_FRAME_SRC = "/sites/kuaijing/images/wecom-login-frame.png";

const SERVICE_AGREEMENT_URL = "/public/system/agreement/use";
const PRIVACY_POLICY_URL = "/public/system/agreement/privacy";
// The ICP mark links to the official MIIT registry, a separate origin.
const ICP_URL = "https://beian.miit.gov.cn/";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function KuaijingLoginPage() {
  const [tab, setTab] = useState<LoginTab>("code");
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreLogin, setMoreLogin] = useState<MoreLogin>("wechat");
  const [wecomOpen, setWecomOpen] = useState(false);
  const [captchaMode, setCaptchaMode] = useState<"login" | "sms" | null>(null);
  const [countdown, setCountdown] = useState(0);

  const langRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const phoneValid = PHONE_PATTERN.test(phone);
  const canSubmit =
    phoneValid &&
    (tab === "code" ? code.length === CODE_LENGTH : password.length > 0);

  // The source focuses the phone field when switching tabs or returning to
  // the phone form (but not on first load).
  const focusPhone = () => {
    requestAnimationFrame(() => phoneInputRef.current?.focus());
  };

  const selectTab = (next: LoginTab) => {
    if (next === tab) return;
    setTab(next);
    focusPhone();
  };

  // “{num} 秒后可重新获取验证码” countdown from the source locale strings.
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(() => {
      setCountdown((value) => value - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (!langOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [langOpen]);

  useEffect(() => {
    if (!wecomOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWecomOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [wecomOpen]);

  const resetPhoneForm = () => {
    setPhone("");
    setCode("");
    setPassword("");
    setRevealPassword(false);
    setTab("code");
    setCountdown(0);
    setCaptchaMode(null);
  };

  const showWechatLogin = () => {
    resetPhoneForm();
    setMethod("wechat");
    setMoreLogin("phone");
  };

  const showPhoneLogin = () => {
    setMethod("phone");
    setMoreLogin("wechat");
    focusPhone();
  };

  const openWecomLogin = () => {
    setMoreLogin("wecom");
    setWecomOpen(true);
  };

  const requestCode = () => {
    if (!phoneValid || countdown > 0) return;
    // The source shows the slider captcha before sending the SMS code.
    setCaptchaMode("sms");
  };

  const handleCaptchaSuccess = () => {
    const mode = captchaMode;
    setCaptchaMode(null);
    if (mode === "sms") {
      setCountdown(COUNTDOWN_SECONDS);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    // Password login opens the slider captcha; the code-tab login posts
    // directly in the source (and has no backend in this clone).
    if (tab === "password") setCaptchaMode("login");
  };

  const getCodeLabel =
    countdown > 0 ? `获取验证码 (${countdown}s)` : "获取验证码";

  return (
    <div className="kuaijing-login">
      <div className="kj-header">
        <img
          className="kj-logo"
          src={LOGO_SRC}
          alt="快鲸"
          width={150}
          height={33}
        />
        <div className="kj-lang" ref={langRef}>
          <button
            type="button"
            className="kj-lang-btn"
            title="简体中文"
            aria-haspopup="menu"
            aria-expanded={langOpen}
            onClick={() => setLangOpen((open) => !open)}
          >
            <span className="kj-icon kj-icon-md">
              <GlobalIcon />
            </span>
            <span className="kj-mlr-5">简体中文</span>
            <span className="kj-icon kj-icon-sm">
              <DownIcon />
            </span>
          </button>
          {langOpen ? (
            <ul className="kj-dropdown" role="menu">
              <li
                className="kj-dropdown-item is-selected"
                role="menuitem"
                onClick={() => setLangOpen(false)}
              >
                简体中文
              </li>
            </ul>
          ) : null}
        </div>
      </div>

      <div className="kj-container">
        <div className="kj-left">
          <div className="kj-hotspot">
            <img
              src={BANNER_SRC}
              alt="资管运营，就用快鲸资管系统"
              width={540}
              height={560}
            />
          </div>
        </div>

        {/* Unstyled flex item: its auto width matches the 476px card. */}
        <div>
          <section className="kj-right">
            <form className="kj-form" noValidate onSubmit={handleSubmit}>
              <div>
                <div className="kj-card-header">
                  <h1 className="kj-title">欢迎使用快鲸资产管理运营系统</h1>
                </div>

                {method === "phone" ? (
                  <div className="kj-tabs" role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={tab === "code"}
                      className={`kj-tab${tab === "code" ? " is-active" : ""}`}
                      onClick={() => selectTab("code")}
                    >
                      验证码登录
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={tab === "password"}
                      className={`kj-tab${
                        tab === "password" ? " is-active" : ""
                      }`}
                      onClick={() => selectTab("password")}
                    >
                      密码登录
                    </button>
                  </div>
                ) : null}

                <div className="kj-card-content">
                  {method === "wechat" ? (
                    <div className="kj-img-box">
                      <img
                        className="kj-qr"
                        src={WECHAT_QR_SRC}
                        alt="微信登录二维码"
                        width={220}
                        height={220}
                      />
                      <div className="kj-tips">请使用微信扫一扫</div>
                    </div>
                  ) : (
                    <>
                      <div className="kj-phone-group">
                        <div className="kj-addon">
                          <div>
                            <span>+</span>86
                          </div>
                        </div>
                        <div className="kj-affix">
                          {tab === "password" ? (
                            <span className="kj-icon kj-prefix">
                              <MobileIcon />
                            </span>
                          ) : null}
                          <input
                            ref={phoneInputRef}
                            type="text"
                            inputMode="numeric"
                            autoComplete="tel"
                            placeholder="请输入您的手机号码"
                            aria-label="请输入您的手机号码"
                            value={phone}
                            onChange={(event) =>
                              setPhone(digitsOnly(event.target.value))
                            }
                          />
                        </div>
                      </div>

                      {tab === "code" ? (
                        <div className="kj-code-row">
                          <input
                            className="kj-code-input"
                            type="text"
                            inputMode="numeric"
                            maxLength={CODE_LENGTH}
                            autoComplete="one-time-code"
                            placeholder="请输入验证码"
                            aria-label="请输入验证码"
                            value={code}
                            onChange={(event) =>
                              setCode(
                                digitsOnly(event.target.value).slice(
                                  0,
                                  CODE_LENGTH,
                                ),
                              )
                            }
                          />
                          <button
                            type="button"
                            className="kj-get-code"
                            disabled={!phoneValid || countdown > 0}
                            onClick={requestCode}
                          >
                            {getCodeLabel}
                          </button>
                        </div>
                      ) : (
                        <div className="kj-affix kj-password">
                          <span className="kj-icon kj-prefix">
                            <LockIcon />
                          </span>
                          <input
                            type={revealPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="请输入密码"
                            aria-label="请输入密码"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="kj-eye"
                            aria-label={
                              revealPassword ? "隐藏密码" : "显示密码"
                            }
                            onClick={() =>
                              setRevealPassword((revealed) => !revealed)
                            }
                          >
                            {revealPassword ? (
                              <EyeIcon />
                            ) : (
                              <EyeInvisibleIcon />
                            )}
                          </button>
                        </div>
                      )}

                      <div className="kj-protocol">
                        <span>登录视为您已阅读并同意</span>
                        <a
                          href={SERVICE_AGREEMENT_URL}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          服务协议
                        </a>
                        <span>和</span>
                        <a
                          href={PRIVACY_POLICY_URL}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          隐私政策
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="kj-submit"
                        disabled={!canSubmit}
                      >
                        登 录
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="kj-card-footer">
                <div className="kj-divider">
                  <span className="kj-divider-text">更多登录方式</span>
                </div>
                <div className="kj-more-login">
                  {method === "phone" ? (
                    <>
                      <button
                        type="button"
                        className={`kj-more-btn${
                          moreLogin === "wechat" ? " is-current" : ""
                        }`}
                        onMouseEnter={() => setMoreLogin("wechat")}
                        onClick={showWechatLogin}
                      >
                        <span className="kj-icon">
                          <WechatIcon />
                        </span>
                        <span className="kj-btn-text">微信登录</span>
                      </button>
                      <button
                        type="button"
                        className={`kj-more-btn${
                          moreLogin === "wecom" ? " is-current" : ""
                        }`}
                        onMouseEnter={() => setMoreLogin("wecom")}
                        onClick={openWecomLogin}
                      >
                        <span className="kj-icon">
                          <WecomIcon />
                        </span>
                        <span className="kj-btn-text">企业微信登录</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={`kj-more-btn${
                          moreLogin === "phone" ? " is-current" : ""
                        }`}
                        onMouseEnter={() => setMoreLogin("phone")}
                        onClick={showPhoneLogin}
                      >
                        <span className="kj-icon">
                          <MobileIcon />
                        </span>
                        <span className="kj-btn-text">手机号登录</span>
                      </button>
                      <button
                        type="button"
                        className={`kj-more-btn${
                          moreLogin === "wecom" ? " is-current" : ""
                        }`}
                        onMouseEnter={() => setMoreLogin("wecom")}
                        onClick={openWecomLogin}
                      >
                        <span className="kj-icon">
                          <WecomIcon />
                        </span>
                        <span className="kj-btn-text">企业微信登录</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>

            {captchaMode ? (
              <CaptchaOverlay
                onSuccess={handleCaptchaSuccess}
                onClose={() => setCaptchaMode(null)}
              />
            ) : null}
          </section>
        </div>
      </div>

      <section className="kj-page-footer">
        <a
          className="kj-registration-link"
          href={ICP_URL}
          target="_blank"
          rel="noreferrer noopener"
        >
          皖ICP备19022900号-9
        </a>
      </section>

      {wecomOpen ? (
        <div className="kj-modal-root">
          <div className="kj-modal-mask" />
          <div
            className="kj-modal-wrap"
            role="dialog"
            aria-modal="true"
            aria-label="企业微信登录"
            onClick={(event) => {
              if (event.target === event.currentTarget) setWecomOpen(false);
            }}
          >
            <div className="kj-modal">
              <button
                type="button"
                className="kj-modal-close"
                aria-label="Close"
                onClick={() => setWecomOpen(false)}
              >
                <span className="kj-icon">
                  <CloseIcon />
                </span>
              </button>
              <div className="kj-modal-header">
                <div className="kj-modal-title">企业微信登录</div>
              </div>
              <div className="kj-modal-body">
                <img
                  src={WECOM_FRAME_SRC}
                  alt="企业微信登录二维码"
                  width={580}
                  height={440}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
