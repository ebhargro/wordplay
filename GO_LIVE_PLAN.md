# Wordplay — Go-Live Plan (iOS + Web)

## Project Summary
Wordplay is a creative writing exercise generator. Users pick story parameters (length, POV, setting, tone, pacing) and the app generates a unique writing prompt via OpenAI. The web app is built with Next.js and the mobile app uses React Native / Expo.

---

## Phase 1: Critical Security Fixes
**Priority: URGENT — Do before anything else**

### 1.1 Rotate API Keys
- [ ] Generate a new OpenAI API key and revoke the current one (the existing key is exposed in the repo)
- [ ] Generate a new Supabase anon key if the project allows it
- [ ] Update `.env.local` with new keys

### 1.2 Remove Hardcoded Secrets from Code
- [x] Remove hardcoded `organization` and `project` IDs from `generate-prompt.ts` — use env vars instead
- [x] Add `.env.example` with placeholder values for safe onboarding

### 1.3 Scrub Git History
- [ ] Use `git filter-branch` or BFG Repo Cleaner to remove `.env.local` if it was ever committed
- [ ] Force-push cleaned history (coordinate with any collaborators)

### 1.4 API Security Hardening
- [x] Add input validation and sanitization to `/api/generate-prompt`
- [x] Add rate limiting (in-memory for dev, Redis-backed for production)
- [x] Add HTTP method checking (POST only)
- [x] Add request size limiting

---

## Phase 2: Production Web Configuration

### 2.1 Next.js Config
- [x] Create `next.config.js` with security headers, image optimization, and CORS
- [x] Pin Next.js version in package.json (avoid `latest`)
- [x] Add `name` and `version` fields to package.json

### 2.2 Error Handling & UX
- [x] Add proper error states and user-facing error messages
- [x] Fix prompt display (remove `JSON.stringify` wrapper)
- [x] Add loading timeout / error recovery

### 2.3 SEO & Meta
- [x] Add proper meta tags (description, Open Graph, viewport)
- [x] Add `robots.txt` and basic sitemap

---

## Phase 3: Mobile App Completion (iOS)

### 3.1 Core Functionality
- [x] Wire up prompt generation to the API (currently mobile has no API integration)
- [x] Add loading states and error handling
- [x] Add prompt display screen
- [x] Add view mode flow matching the web (DEFAULT → SELECTION → LOADING → PROMPT)

### 3.2 App Store Preparation
- [x] Configure `app.json` with proper bundle identifier, version, and build number
- [x] Add App Store metadata (description, keywords, category)
- [x] Create EAS Build configuration (`eas.json`)
- [ ] Create app icons and splash screen (requires design assets)
- [ ] Set up Apple Developer account and certificates

### 3.3 iOS-Specific Requirements
- [x] Add `NSAppTransportSecurity` exception or ensure HTTPS-only API calls
- [x] Add privacy manifest (`PrivacyInfo.xcprivacy`) — required by Apple since Spring 2024
- [x] Configure `Info.plist` extras in `app.json`

---

## Phase 4: Authentication (Supabase)

### 4.1 User Auth Flow
- [x] Implement sign-up / sign-in pages using Supabase Auth
- [x] Add auth middleware to protect API routes
- [x] Add session management

### 4.2 Mobile Auth
- [x] Add Supabase client to mobile app
- [x] Implement auth screens for iOS

---

## Phase 5: Legal & Compliance

### 5.1 Required Documents
- [x] Privacy Policy (required for App Store)
- [x] Terms of Service

### 5.2 App Store Compliance
- [x] Content rating questionnaire preparation
- [x] App Review guidelines compliance check
- [x] Data collection disclosure (App Privacy "nutrition labels")

---

## Phase 6: Deployment

### 6.1 Web Deployment (Vercel recommended)
- [x] Add Vercel configuration
- [ ] Set up environment variables in Vercel dashboard
- [ ] Configure custom domain (if desired)
- [ ] Enable Vercel Analytics

### 6.2 iOS Deployment
- [x] Set up EAS Build for iOS
- [ ] Run `eas build --platform ios` to create first build
- [ ] Test on TestFlight
- [ ] Submit to App Store Review

---

## Phase 7: Post-Launch

### 7.1 Monitoring
- [ ] Set up error tracking (Sentry recommended)
- [ ] Monitor OpenAI API usage and costs
- [ ] Set up uptime monitoring

### 7.2 Future Enhancements
- [ ] Save generated prompts to user profile (Supabase)
- [ ] Add prompt history / favorites
- [ ] Add sharing functionality
- [ ] Consider monetization (usage limits for free tier, premium for unlimited)

---

## Manual Steps (You'll Need to Do These)

1. **Rotate your OpenAI API key** at https://platform.openai.com/api-keys
2. **Set up an Apple Developer account** ($99/year) at https://developer.apple.com
3. **Create app icons and splash screen** (1024x1024 for App Store, various sizes for device)
4. **Deploy to Vercel** — connect your GitHub repo at https://vercel.com
5. **Set environment variables** in your hosting dashboard
6. **Run EAS Build** once your Apple Developer account is ready
7. **Submit to App Store** via App Store Connect
