"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

import {
  CaptchaCloseIcon,
  CaptchaRefreshIcon,
  DragArrowIcon,
} from "./icons";

const IMAGE_WIDTH = 350;
const TILE_SIZE = 64;
const TILE_TOP = 73;
const BAR_WIDTH = 350;
const BLOCK_WIDTH = 82;
const MAX_DRAG = BAR_WIDTH - BLOCK_WIDTH;
// Source mapping: thumbLeft = dragLeft * (imageWidth - thumbWidth) /
// (barWidth - blockWidth).
const DRAG_RATIO = (IMAGE_WIDTH - TILE_SIZE) / MAX_DRAG;
// Captured challenge: the puzzle gap sits at x = 209.
const TARGET_X = 209;
const TOLERANCE = 5;
const REFRESH_DELAY_MS = 400;

const BACKGROUND_SRC = "/sites/kuaijing/images/captcha-bg.jpg";
const TILE_SRC = "/sites/kuaijing/images/captcha-tile.png";

type CaptchaOverlayProps = {
  onSuccess: () => void;
  onClose: () => void;
};

export function CaptchaOverlay({ onSuccess, onClose }: CaptchaOverlayProps) {
  const [blockLeft, setBlockLeft] = useState(0);
  const [tileLeft, setTileLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  const dragStart = useRef<{ x: number; left: number; moved: boolean } | null>(
    null,
  );
  const blockLeftRef = useRef(0);
  const refreshTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (refreshTimer.current) window.clearTimeout(refreshTimer.current);
    };
  }, []);

  const setPosition = (left: number) => {
    const clamped = Math.min(Math.max(left, 0), MAX_DRAG);
    blockLeftRef.current = clamped;
    setBlockLeft(clamped);
    setTileLeft(clamped * DRAG_RATIO);
  };

  const resetPosition = () => setPosition(0);

  const refresh = () => {
    if (loading) return;
    setLoading(true);
    resetPosition();
    if (refreshTimer.current) window.clearTimeout(refreshTimer.current);
    // The source requests a new challenge; the local clone reuses the
    // captured challenge after showing the same loading state.
    refreshTimer.current = window.setTimeout(
      () => setLoading(false),
      REFRESH_DELAY_MS,
    );
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (loading) return;
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic events have no active pointer; real pointers capture fine.
    }
    dragStart.current = {
      x: event.clientX,
      left: blockLeftRef.current,
      moved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start) return;
    const delta = event.clientX - start.x;
    if (Math.abs(delta) > 1) start.moved = true;
    setPosition(start.left + delta);
  };

  const handlePointerUp = () => {
    const start = dragStart.current;
    dragStart.current = null;
    if (!start || !start.moved) return;
    const finalTileLeft = blockLeftRef.current * DRAG_RATIO;
    if (Math.abs(finalTileLeft - TARGET_X) <= TOLERANCE) {
      onSuccess();
    } else {
      resetPosition();
    }
  };

  const handlePointerCancel = () => {
    dragStart.current = null;
    resetPosition();
  };

  return (
    <div className="kj-captcha-overlay">
      <div
        className="kj-captcha-content"
        role="dialog"
        aria-modal="true"
        aria-label="拖动滑块完成验证"
      >
        <div className="go-captcha gc-wrapper gc-theme">
          <div className="gc-header">
            <span>拖动滑块完成验证</span>
            <div className="gc-icon-block">
              <button
                type="button"
                className="kj-gc-icon-btn"
                aria-label="关闭"
                onClick={onClose}
              >
                <CaptchaCloseIcon />
              </button>
              <button
                type="button"
                className="kj-gc-icon-btn"
                aria-label="刷新验证"
                onClick={refresh}
              >
                <CaptchaRefreshIcon />
              </button>
            </div>
          </div>

          <div className="gc-body">
            {loading ? (
              <div className="gc-loading">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                  width="84"
                  height="84"
                  aria-hidden
                  focusable="false"
                >
                  <circle cx="50" cy="36.8101" r="10">
                    <animate
                      attributeName="cy"
                      dur="1s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
                      keyTimes="0;0.5;1"
                      values="23;77;23"
                    />
                  </circle>
                </svg>
              </div>
            ) : (
              <>
                <img
                  className="gc-picture"
                  src={BACKGROUND_SRC}
                  alt=""
                  width={350}
                  height={200}
                  draggable={false}
                />
                <div
                  className="gc-tile"
                  style={{ top: TILE_TOP, left: tileLeft }}
                >
                  <img
                    src={TILE_SRC}
                    alt=""
                    width={64}
                    height={64}
                    draggable={false}
                  />
                </div>
              </>
            )}
          </div>

          <div className="gc-footer">
            <div className="gc-drag-slide-bar">
              <div className="gc-drag-line" />
              <div
                className="gc-drag-block"
                style={{ left: blockLeft }}
                role="slider"
                tabIndex={0}
                aria-label="拖动滑块完成验证"
                aria-valuemin={0}
                aria-valuemax={MAX_DRAG}
                aria-valuenow={Math.round(blockLeft)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
              >
                <div className="gc-drag-block-inline">
                  <DragArrowIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
