/* ============================================================
   BASE BUTTON + HOVER ANIMATION
   ============================================================ */

export const baseButton: React.CSSProperties = {
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

export const hoverEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.transform = "translateY(-4px)";
  e.currentTarget.style.boxShadow = "0 10px 22px rgba(0,0,0,0.55)";
};

export const hoverLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.45)";
};

/* ============================================================
   COLOR VARIANTS (10+ BUTTON COLORS)
   ============================================================ */

export const btnBlue = {
  ...baseButton,
  backgroundColor: "#0aa0ff",
  color: "white",
};

export const btnOrange = {
  ...baseButton,
  backgroundColor: "#fe8940",
  color: "black",
};

export const btnYellow = {
  ...baseButton,
  backgroundColor: "#fbdd59",
  color: "#0b1e39",
};

export const btnGreen = {
  ...baseButton,
  backgroundColor: "#1a8d03",
  color: "white",
};

export const btnPink = {
  ...baseButton,
  backgroundColor: "#e625e6",
  color: "white",
};

export const btnLime = {
  ...baseButton,
  backgroundColor: "#a3f362",
  color: "#0b1e39",
};

export const btnGold = {
  ...baseButton,
  backgroundColor: "#fad83f",
  color: "#0b1e39",
};

export const btnOrangeRed = {
  ...baseButton,
  backgroundColor: "#f58f3c",
  color: "white",
};

export const btnRed = {
  ...baseButton,
  backgroundColor: "#f55d16",
  color: "white",
};

export const btnTeal = {
  ...baseButton,
  backgroundColor: "#0cc9b8",
  color: "white",
};

export const btnNavy = {
  ...baseButton,
  backgroundColor: "#102544",
  color: "#fbdd59",
};

export const btnGrey = {
  ...baseButton,
  backgroundColor: "#3a3a3a",
  color: "white",
};

export const btnWhiteOutline = {
  ...baseButton,
  backgroundColor: "transparent",
  color: "white",
  border: "2px solid white",
};
