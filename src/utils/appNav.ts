// utils/appNav.ts
export const APP_NAV_EVENT = "app:navigate-away" as const;

export type AppNavDetail = {
  cb: () => void;
};

export function attemptAppNav(cb: () => void) {
  const ev = new CustomEvent<AppNavDetail>(APP_NAV_EVENT, { detail: { cb } });
  window.dispatchEvent(ev);
}
