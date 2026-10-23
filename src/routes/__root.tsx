import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "اتحاد طلاب مصر القديمة | طالب عالمي متجذر";
const APP_DESCRIPTION =
  "الموقع الرسمي لاتحاد طلاب إدارة مصر القديمة التعليمية: أخبار الاتحاد، أنشطته، الفعاليات، اللوائح، ومشاركة الطلاب للعام الدراسي 2026/2027.";
const SITE_URL = "https://athad-tlap-masr-el-qadmai.vercel.app/";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_DESCRIPTION },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      {
        name: "google-site-verification",
        content: "4Kndr7ABSrdnZMbDyw_7HeVK7bt2PqpbbNyHML42f5o",
      },
      { name: "theme-color", content: "#c8102e" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_EG" },
      { property: "og:site_name", content: "اتحاد طلاب مصر القديمة" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: APP_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}og.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: APP_DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
