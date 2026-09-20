/* ============================================================
   IMPORT TYPES
   ============================================================ */
import type { CSSProperties, MouseEvent } from "react";

/* ============================================================
   BASE BUTTON + HOVER ANIMATION
   ============================================================ */

export const baseButton: CSSProperties = {
  display: "inline-block",
  padding: "16px 32px",
  borderRadius: "12px",
  fontSize: "20px",
  fontWeight: "700",
  textDecoration: "none",
  marginRight: "16px",
  marginBottom: "16px",
  transition: "all 0.25s ease",
  boxShadow: "0 6px 16px rgba(0,0,0,0.45)",
};

export const hoverEnter = (e: MouseEvent<HTMLElement>) => {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = "translateY(-4px)";
  el.style.boxShadow = "0 10px 22px rgba(0,0,0,0.55)";
};

export const hoverLeave = (e: MouseEvent<HTMLElement>) => {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = "translateY(0)";
  el.style.boxShadow = "0 6px 16px rgba(0,0,0,0.45)";
};

/* ============================================================
   COLOR VARIANTS (14 BUTTON COLORS)
   ============================================================ */

export const btnBlue: CSSProperties = {
  ...baseButton,
  backgroundColor: "#0aa0ff",
  color: "white",
};

export const btnOrange: CSSProperties = {
  ...baseButton,
  backgroundColor: "#fe8940",
  color: "black",
};

export const btnYellow: CSSProperties = {
  ...baseButton,
  backgroundColor: "#fbdd59",
  color: "#0b1e39",
};

export const btnGreen: CSSProperties = {
  ...baseButton,
  backgroundColor: "#1a8d03",
  color: "white",
};

export const btnPink: CSSProperties = {
  ...baseButton,
  backgroundColor: "#e625e6",
  color: "white",
};

export const btnLime: CSSProperties = {
  ...baseButton,
  backgroundColor: "#a3f362",
  color: "#0b1e39",
};

export const btnGold: CSSProperties = {
  ...baseButton,
  backgroundColor: "#fad83f",
  color: "#0b1e39",
};

export const btnOrangeRed: CSSProperties = {
  ...baseButton,
  backgroundColor: "#f58f3c",
  color: "white",
};

export const btnRed: CSSProperties = {
  ...baseButton,
  backgroundColor: "#f55d16",
  color: "white",
};

export const btnTeal: CSSProperties = {
  ...baseButton,
  backgroundColor: "#0cc9b8",
  color: "white",
};

export const btnNavy: CSSProperties = {
  ...baseButton,
  backgroundColor: "#102544",
  color: "#fbdd59",
};

export const btnGrey: CSSProperties = {
  ...baseButton,
  backgroundColor: "#3a3a3a",
  color: "white",
};

export const btnWhiteOutline: CSSProperties = {
  ...baseButton,
  backgroundColor: "transparent",
  color: "white",
  border: "2px solid white",
};
