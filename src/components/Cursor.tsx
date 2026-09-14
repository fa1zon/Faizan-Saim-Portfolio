"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The reference replaces the OS pointer with a small glass square that trails
 * the real cursor, grows over interactive elements, and dips on press.
 * Pointer-coarse devices keep their native behaviour.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);
    document.body.dataset.customCursor = "true";

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        if (dot.current) dot.current.style.opacity = "1";
      }
      setHovering(Boolean((e.target as Element | null)?.closest?.("a,button,[data-cursor='link'],input,textarea")));
    };

    const loop = () => {
      // Critically damped follow — fast enough to feel attached, slow enough to trail.
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => dot.current && (dot.current.style.opacity = "0");
    const enter = () => dot.current && (dot.current.style.opacity = "1");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      delete document.body.dataset.customCursor;
    };
  }, []);

  if (!enabled) return null;

  const size = pressed ? 12 : hovering ? 22 : 16;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
      style={{ transition: "opacity 250ms cubic-bezier(0.44,0,0.22,1)" }}
    >
      <div
        className="rounded-[3px] border border-line"
        style={{
          width: size,
          height: size,
          background: "rgba(12,14,15,0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition: "width 350ms cubic-bezier(0.44,0,0.22,1), height 350ms cubic-bezier(0.44,0,0.22,1)",
        }}
      />
    </div>
  );
}
