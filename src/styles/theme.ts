// 앱 전역에 사용되는 theme 객체
export const theme = {
  colors: {
    // Primary Color
    primary: "#4368FF",
    secondary: "#4CE5A7",
    accentGradient:
      "linear-gradient(270deg, #476AFC 0%, #8896FF 25%, #C5D6FF 50%, #81DECE 75%, #4CE5A7 100%)",

    // Grayscale
    gray800: "#2C2F36",
    gray700: "#41434D",
    gray600: "#676A76",
    gray500: "#7D818E",
    gray400: "#9A9FAC",
    gray300: "#C1C6D1",
    gray200: "#E1E5F1",
    gray100: "#EEF1F9",
    gray50: "#F4F7FF",

    // Sub Colors
    error: "#E22B40",
    black: "#1A1A1A",
    white: "#FFFFFF",
    bgWhite: "#F7F8FF",

    // Borders
    borderAccent:
      "linear-gradient(270deg, #476AFC 0%, #8896FF 25%, #C5D6FF 50%, #81DECE 75%, #4CE5A7 100%)",
    borderPrimary: "#4368FF",
    borderSecondary: "#4CE5A7",
  },

  fonts: {
    heading: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
    body: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "20px",
  },
} as const;

export type Theme = typeof theme;
