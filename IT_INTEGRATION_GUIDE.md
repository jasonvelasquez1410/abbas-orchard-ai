# 🌿 The Abba's Orchard School — IT & Web Integration Guide
### 24/7 AI Admissions Digital Employee & Embedded Chat Widget

**Target Website:** `theabbasorchard.edu.ph`  
**Widget Version:** 1.0.0  
**Hosted Script:** `https://abbas-orchard-ai.vercel.app/abbas-widget-embed.js`  
**Backend API:** `https://abbas-orchard-ai.vercel.app/api/chat`  
**Weight / Impact:** ~10 KB gzipped, zero external CSS/JS dependencies, non-blocking asynchronous load.

---

## ⚡ 1. Quick Start: 1-Line Embed

Paste this single `<script>` tag immediately before the closing `</body>` tag on any page or template where you want the admissions assistant to appear:

```html
<!-- The Abba's Orchard 24/7 AI Admissions Assistant Widget -->
<script src="https://abbas-orchard-ai.vercel.app/abbas-widget-embed.js" defer></script>
```

> **Zero Configuration Needed:** The script automatically detects its host origin and connects directly to the production admissions cloud endpoint.

---

## 🏗️ 2. Platform-Specific Integration

### A. Laravel / Blade Layout (Recommended for `theabbasorchard.edu.ph`)
In your main master layout blade file (e.g., `resources/views/layouts/app.blade.php` or `resources/views/master.blade.php`):

```html
    ...
    <!-- The Abba's Orchard AI Admissions Widget -->
    <script src="https://abbas-orchard-ai.vercel.app/abbas-widget-embed.js" defer></script>
</body>
</html>
```

### B. WordPress / Headless CMS
1. Navigate to **Appearance → Theme File Editor → `footer.php`**.
2. Paste the `<script>` tag right before `<?php wp_footer(); ?> </body>`.
3. *Alternative:* Insert via **Google Tag Manager** (Custom HTML Tag triggered on "All Pages").

### C. Plain HTML / Static Webpages
Paste before `</body>` in `index.html`.

---

## ⚙️ 3. Optional Configuration Attributes

You can customize widget placement and behavior by appending HTML attributes directly to the script tag:

| Attribute | Accepted Values | Default | Description |
|---|---|---|---|
| `data-position` | `"bottom-right"`, `"bottom-left"` | `"bottom-right"` | Screen corner where the floating 🌱 launcher bubble appears. |
| `data-default-open` | `"true"`, `"false"` | `"false"` | If `"true"`, automatically opens the chat window upon page load. |
| `data-server` | Any HTTPS URL | Origin of script | Override backend API destination (useful for custom staging domains). |

#### Example with Custom Options:
```html
<script 
  src="https://abbas-orchard-ai.vercel.app/abbas-widget-embed.js"
  data-position="bottom-right"
  data-default-open="false"
  defer>
</script>
```

---

## 🛡️ 4. Content Security Policy (CSP) & CORS Guidelines

If your server or Cloudflare setup enforces a strict `Content-Security-Policy` header, whitelist the following domain:

```http
Content-Security-Policy: 
  script-src 'self' https://abbas-orchard-ai.vercel.app;
  connect-src 'self' https://abbas-orchard-ai.vercel.app;
  style-src 'self' 'unsafe-inline';
```

- **CORS Allowed:** The backend endpoint at `https://abbas-orchard-ai.vercel.app` is pre-configured with `Access-Control-Allow-Origin: *` to accept cross-origin requests from `theabbasorchard.edu.ph`.
- **Ad Blocker Resilience:** The widget avoids trigger terms (`ad`, `banner`, `tracker`, `pixel`, etc.) and isolates all DOM elements under namespace `#abbas-ai-*`.

---

## 🧪 5. 30-Second Verification Checklist

Once the script tag is added:
1. Open `https://www.theabbasorchard.edu.ph` in Google Chrome or Safari.
2. Look for the floating emerald green bubble with 🌱 at the bottom right.
3. Click the bubble to open the admissions drawer.
4. Click any quick-action chip (e.g., **"📍 CDO Alwana"** or **"📅 Book Tour"**).
5. Verify the AI generates a warm Montessori response and routes the inquiry to the appropriate Campus Admissions & Development Officer (CADO).

---

## 📞 6. Technical Support & Inquiries

For technical questions, staging domain whitelisting, or custom CSS styling:
- **Developer:** Jason Velasquez (Sethcon Technologies)
- **Email:** `jason.velasquez1410@gmail.com`
- **Cloud Status:** [https://abbas-orchard-ai.vercel.app/health](https://abbas-orchard-ai.vercel.app/health)
