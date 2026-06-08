export const PUBLIC_API = "https://functions.poehali.dev/e00c26c7-cc73-4c4d-9327-a727f2c13766";
export const ADMIN_API = "https://functions.poehali.dev/88252a0d-1b4c-4850-a460-7bcb94f113d5";

export function trackClick(source: string) {
  try {
    fetch(PUBLIC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "click", source }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}
