
Curea is a calm, minimalistic health application focused on medical-report summarization, conversational AI, skincare analysis, symptom & fitness tracking, volunteer listening, and emergency support. The UI should feel reassuring, accessible, and gently playful using soft color transitions (soft blue → soft green → soft lavender → soft pink → soft blue) and small friendly helper-bots.

Animated Log-in page with 3D floating modules and subtle parallax.
Interactive Sign-up with progressive disclosure and inline validation.
Loading animation page with repeating color transition and central element changing per color.
AI Medical Report Summarizer & Advisor (text + voice) supporting English (default), Hindi, Telugu.
AI Chatbot: multi-lingual text/voice chat; also answer questions about uploaded medical reports.
Skincare Scanner: face scan, skin issue detection (hyperpigmentation, acne, dry/oily, etc.), remedies & diet plan.
Symptom Tracker: daily inputs, pattern detection, alerts & possible condition suggestions.
Personalized Fitness Tracker: custom routines, calendar sync, progress analytics.
Volunteer Listener: match to online volunteers, scheduled or instant voice/text sessions.
Emergency Dialing: quick-access Indian helplines (ambulance, suicide hotline, teen helpline), configurable.
Settings & Profile: language, theme, accessibility, emergency contacts, data export.
Onboarding Tutorial: interactive walkthrough showing main flows.
Data Storage & Privacy: per-user encrypted storage, consent-first medical data handling.
Tone: calm, empathetic, reassuring, non-clinical but professional.
Layout: minimal with lots of whitespace, soft rounded containers (16-24px radius), 2xl rounded corners for cards.
Typography: clean sans-serif (e.g., Inter or Poppins). Headline sizes: xl for headings, base for body.
Icons: simple line icons with soft fills for emphasis. Helper-bots should be simple chibi mascots.
Micro-interactions: small bounces, fades, soft scale-ups. Avoid abrupt motion.
Modes: Light & Dark — keep color transitions readable in both.
Primary gradient cycle (repeatable):

Soft Blue: #A8D8FF
Soft Green: #C7F0D4
Soft Lavender: #E3D6FF
Soft Pink: #FFDDE6
Supporting neutrals:

Warm White: #FBFCFE
Mid Gray: #9AA4B2
Deep Gray (text): #22303F
Dark mode equivalents (toned down):

Soft Blue (dark): #234F78
Soft Green (dark): #235E46
Soft Lavender (dark): #4B3670
Soft Pink (dark): #6A3B4A
Surface dark: #0F1720
Accessibility notes: ensure 4.5:1 contrast for body text vs. background; use color overlays and brightening for readability during gradients.

Goal: friendly, memorable entrance without slowing access.

Layout:

Left side (or center on mobile): Credential form (email / phone + password) and social sign-in.
Right side (or top on mobile): 3D floating modules (cards, pills, heart icon, chat bubble) with slow rotation and parallax responsive to cursor/touch.
Animation details:

3D modules: subtle floating (translateY ±6px), slow rotation (±6°), soft shadow (blur 20px), hover/tap causes small scale (1.04) and shadow increase.
Parallax: module positions shift slightly based on cursor, limited to 8–12px.
Entrance: fade + slide on mount (duration 600ms, easing cubic-bezier(0.22,1,0.36,1)).
Performance: CSS transforms + GPU-accelerated; limit number of elements to 6 for low-power devices.

Progressive fields: name → DOB → contact → medical preferences → consent forms.
Inline validation with friendly microcopy (e.g., "That looks good!" or gentle hints for errors).
Optional: quick onboarding questions to personalize (skin goals, fitness level, preferred languages).
Offer social sign-up and OTP-based phone sign-up (India-friendly).
Structure: full-screen animated gradient background that transitions through the 4 palette colors in a loop. Center element (the hero) cycles through shapes/components per color.

Sequence:

Soft Blue: center shows a pulse heart > summary icon
Soft Green: center shows a leaf / fitness icon
Soft Lavender: center shows a chat bubble with dots
Soft Pink: center shows a smiling helper-bot face
Timing: each color segment: 1800ms color transition + 600ms hold; crossfade easing: ease-in-out.

Implementation tip: use CSS variables + keyframes OR WebGL shader for smoother transitions on high-end devices. Keep a CSS fallback for low-end.

Upload PDF, image, or paste text. Show progress and OCR confidence.
Output: short summary (1–3 lines), key findings, suggested questions to ask the doctor, suggested next steps.
Action buttons: "Ask about this report" (opens chatbot with context), "Save summary", "Share PDF".
Modes: Text chat & Voice chat.
Languages: English (default), Hindi, Telugu. Allow toggling mid-conversation.
Flow: If user uploads report, pre-fill context to chatbot so it can answer targeted questions.
Safety: add medical disclaimer and encourage contacting healthcare professionals for diagnosis. Provide confidence meter for advice.
Capture: camera face-scan with guidelines (neutral expression, 3 angles optional).
Analysis: detect pigmentation, acne, dryness, texture, redness. Present certainty/confidence for each.
Recommendations: home remedies, dermatologist referral suggestions, diet & supplement suggestions, product-agnostic tips.
Privacy: all face data processed locally where possible; ask explicit consent for cloud processing.
Symptom Tracker:

Daily quick-check inputs (pain scale, temperature, mood, meds taken).
Visual timeline & pattern detection (weekly/monthly). Alerts when patterns match possible concern (e.g., recurring fever).
Notification rules and escalation (e.g., "If X pattern observed, recommend doctor" + emergency suggestions).
Fitness Tracker:

Personalized plans from onboarding preferences + AI coach.
Short videos/animated guides for exercises.
Sync basics with Google Fit / Apple Health for steps and activity.
Volunteer pool with availability status.
Quick-match: instant connect to available volunteer (voice or text).
Privacy: volunteer profile shows basic info only; no medical advice allowed — listeners are for emotional support.
Safety escalation: if user expresses suicidal intent, show emergency contacts and optionally connect to helpline.
Configurable quick-dial hub in the app header/footer and lock-screen widget.
Pre-populated Indian numbers (ambulance, local police, suicide prevention, teen helpline). Admin panel to update numbers.
When triggered, show confirmation, location access prompt (for ambulance), and one-tap call.
Language selector (English default, Hindi, Telugu)
Theme (Light / Dark / System)
Accessibility options: large type, high-contrast mode, voice guidance, screen reader labels
Data & privacy: export data, delete account, consent logs
Emergency contacts list & local emergency preferences
WCAG 2.1 AA compliance as baseline.
Voice UI for core flows, keyboard navigation, focus states.
Captions for tutorial videos; multi-language support in text and voice.
Medical data classified as sensitive: encrypt at rest (AES-256) and TLS for transfer.
User-controlled consent for each data type (reports, face scans).
Option for local-only processing for face scan/skin analysis (on-device models) where feasible.
Audit logs for any AI model access to PHI.
Compliance considerations: where operating in India, map to applicable data localization rules and privacy norms.
Frontend: React (Next.js) or React Native for cross-platform, Tailwind for styling. Animations: Framer Motion for complex micro-interactions; Three.js / React Three Fiber for 3D floating modules. AI/Inference: Backend inference via a secure API. On-device for skin detection (TensorFlow Lite / CoreML) where possible. Backend: Node.js / Python (FastAPI) with PostgreSQL. File store: encrypted S3-compatible bucket. Auth & Payments: Firebase Auth / Auth0 for OTP and social logins. For payments (if needed), Razorpay. Notifications: FCM (Android), APNs (iOS).

Landing / Log-in (animated)
Sign-up / Onboarding
Home dashboard (summary cards)
Reports: upload / view / summarize
Chatbot / Voice UI
Skin scanner & results
Symptom tracker (timeline)
Fitness planner
Volunteer listener
Emergency hub
Settings & Profile
Tutorial / Help
Mobile: 360–420px (iPhone/Android)
Small tablet: 600–768px
Desktop: 1024–1440px
Large screens: 1600px+
Use a fluid layout with CSS grid and stacks. On small screens, convert the animated 3D module into a simple animated hero to save resources.

Welcome card: "Hi — I’m Cureva, your health companion." Quick language selection.
Quick tour: show icons and what they open (Reports, Chat, Skin Scan, Trackers, Emergency).
Try it: sample report loaded and summarized in-app.
Skin-scan demo mode (simulated) to show expected steps.
Finish: set emergency contact and preferred language.
Empty state: "Looks like you haven’t added any reports yet — tap + to upload one."
Loading: "Cureva is preparing your summary..."
Skin scan hint: "Hold your phone at eye level, good lighting, neutral expression."
Volunteer: "Need to talk? A listener is available — connect now."
Chibi helper-bots (three expressive poses)
3D modules: report-card, heart, chat-bubble, leaf, microscope
Small animated stickers for achievements
Prominent medical disclaimer on AI-generated advice.
Consent modal before any upload or face-scanning.
Toggle for storing sensitive inputs (e.g., "This report will be stored — allow? Yes / No").
Create Figma file with screens and interactive prototypes.
Build a minimal prototype: animated login + loading screen + sample report summarizer flow.
Implement basic auth, file upload, and a stubbed chatbot for testing.
Login floating elements: animation: float 6s ease-in-out infinite with transform: translateY(-6px) alternation.
Loading gradient keyframes: @keyframes colorCycle { 0% { --bg: #A8D8FF } 25% { --bg: #C7F0D4 } 50% { --bg: #E3D6FF } 75% { --bg: #FFDDE6 } 100% { --bg: #A8D8FF } } and animate background: linear-gradient(var(--bg), ...);
