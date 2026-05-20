# Cherry-Pick Guide - Gloria Ondah & Associates

## How to Selectively Keep Commits

This guide helps you revert to commit `1530d44` and then selectively apply only the commits you want to keep.

---

## Step-by-Step Process

### Step 1: Backup Current State (Optional but Recommended)
```bash
# Create a backup branch of current state
git branch backup-before-revert

# Or create a tag
git tag backup-may-16-2026
```

### Step 2: Revert to Base Commit
```bash
# Hard reset to the base commit
git reset --hard 1530d44657095be6d83bdf8fba70e5e8f3ca7ca9

# Verify you're at the right commit
git log --oneline -1
```

### Step 3: Cherry-Pick Selected Commits
```bash
# Cherry-pick commits one by one
git cherry-pick <commit-hash>

# If conflicts occur, resolve them and continue
git add .
git cherry-pick --continue

# To abort a cherry-pick
git cherry-pick --abort
```

---

## Commit Selection Guide

Below are all 15 commits with detailed information to help you decide which to keep.

---

## COMMIT 1: Conversion Optimization Features
**Hash:** `0ffeb26`  
**Date:** May 14, 2026  
**Message:** "feat: comprehensive website improvements for conversion optimization"

### What It Adds:
- ✅ **3 New Components:**
  - `HowItWorks.tsx` - 5-step process visualization
  - `PricingTable.tsx` - Transparent pricing with FREE consultation
  - `TrustSignals.tsx` - Firm history, stats, affiliations

- ✅ **Major Updates:**
  - FREE initial consultation (was ₦15,000)
  - Updated all CTAs to emphasize "Free Consultation"
  - Added firm history to footer
  - Enhanced WhatsApp FAB with response time tooltip
  - Added middle CTA section on homepage

### Files Changed: 9 files
- New: `HowItWorks.tsx`, `PricingTable.tsx`, `TrustSignals.tsx`, `WEBSITE_IMPROVEMENTS_SUMMARY.md`
- Modified: `Home.tsx`, `Booking.tsx`, `CTABand.tsx`, `Footer.tsx`, `WhatsAppFAB.tsx`

### Dependencies: None

### Conflicts Risk: LOW
- Standalone new components
- Clean additions to existing pages

### Recommendation: ⭐⭐⭐⭐⭐ **HIGHLY RECOMMENDED**
**Why:** Major conversion optimization, builds trust, reduces friction

### Cherry-Pick Command:
```bash
git cherry-pick 0ffeb26
```

---

## COMMIT 2: Critical Website Fixes
**Hash:** `d2ffdbe`  
**Date:** May 15, 2026  
**Message:** "fix: critical website fixes for consistency and UX"

### What It Fixes:
- ✅ Founding year: 2017 → 2015 (About page)
- ✅ Hero CTA button: Gold → Dark red (consistency)
- ✅ Hero height on mobile: 100vh → 85vh (better UX)
- ✅ Scroll indicator: Brown → Navy/red (brand consistency)
- ✅ Added social media links to footer (LinkedIn, Instagram, X)
- ✅ Improved client logos section layout

### Files Changed: 4 files
- New: `WEBSITE_FIXES_SUMMARY.md`
- Modified: `About.tsx`, `Home.tsx`, `Footer.tsx`

### Dependencies: None

### Conflicts Risk: LOW
- Simple fixes and additions

### Recommendation: ⭐⭐⭐⭐⭐ **HIGHLY RECOMMENDED**
**Why:** Fixes critical branding inconsistencies, improves mobile UX

### Cherry-Pick Command:
```bash
git cherry-pick d2ffdbe
```

---

## COMMIT 3: Client Logo Integration
**Hash:** `ed1b7e0`  
**Date:** May 15, 2026  
**Message:** "feat: integrate actual client logo images"

### What It Adds:
- ✅ **4 Client Logo Images:**
  - `cidp.png` - CIDP logo
  - `stelog.png` - Stelog logo
  - `mirak.jpeg` - Mirak logo
  - `zainglobal.jpg` - Zain Global logo

- ✅ Replaced text-only client names with actual images
- ✅ Grayscale filter with hover effect
- ✅ Lazy loading for performance

### Files Changed: 5 files
- New: 4 image files
- Modified: `Home.tsx`

### Dependencies: None

### Conflicts Risk: LOW
- Only adds images and updates Home.tsx

### Recommendation: ⭐⭐⭐⭐ **RECOMMENDED**
**Why:** Professional appearance, builds credibility

### Cherry-Pick Command:
```bash
git cherry-pick ed1b7e0
```

---

## COMMIT 4: Comprehensive UI/UX Refactor
**Hash:** `9934b85`  
**Date:** May 15, 2026  
**Message:** "refactor: comprehensive UI/UX improvements for modern law firm standards"

### What It Improves:
- ✅ **Typography:**
  - Base font: 16px → 18px
  - Line height: 1.7 → 1.6
  - Max line length: 70ch

- ✅ **Icons:**
  - Core Values: 20px → 28px
  - Contact cards: 24px → 32px
  - Practice areas: 40px → 48px

- ✅ **New CSS Utilities:**
  - `.card-enhanced` - Card depth with shadows
  - `.icon-enhanced` - Consistent icon sizing
  - `.stepper-circle` - Enhanced progress indicators
  - `.btn-ghost-light` - Ghost button for dark backgrounds
  - `.section-spacing` - Standardized spacing
  - `.prose-constrained` - Readable line length

- ✅ **Accessibility:**
  - WCAG 2.1 Level AA compliance
  - Better form input visibility
  - Improved contrast ratios

### Files Changed: 7 files
- New: `UI_UX_REFACTOR_DOCUMENTATION.md`
- Modified: `index.css`, `About.tsx`, `Contact.tsx`, `PracticeAreas.tsx`, `Booking.tsx`, `CTABand.tsx`

### Dependencies: None

### Conflicts Risk: MEDIUM
- Extensive CSS changes
- Multiple component updates

### Recommendation: ⭐⭐⭐⭐⭐ **HIGHLY RECOMMENDED**
**Why:** Significantly improves readability, accessibility, and professional appearance

### Cherry-Pick Command:
```bash
git cherry-pick 9934b85
```

---

## COMMIT 5: Mobile Responsive Breakpoints
**Hash:** `39c5979`  
**Date:** May 15, 2026  
**Message:** "fix: add mobile responsive breakpoints to UI/UX improvements"

### What It Adds:
- ✅ Responsive typography (16px mobile, 18px desktop)
- ✅ Responsive icons (32-40px mobile, 40-48px desktop)
- ✅ Responsive stepper (40px mobile, 48px desktop)
- ✅ Touch targets: 44x44px minimum (WCAG AAA)
- ✅ Responsive section spacing

### Files Changed: 2 files
- Modified: `index.css`, `UI_UX_REFACTOR_DOCUMENTATION.md`

### Dependencies: Requires COMMIT 4 (9934b85)

### Conflicts Risk: LOW
- Extends previous UI/UX commit

### Recommendation: ⭐⭐⭐⭐⭐ **HIGHLY RECOMMENDED** (if keeping Commit 4)
**Why:** Essential for mobile UX, completes UI/UX refactor

### Cherry-Pick Command:
```bash
# Only if you cherry-picked commit 9934b85
git cherry-pick 39c5979
```

---

## COMMIT 6: JSX Syntax Fix
**Hash:** `525fbdd`  
**Date:** May 15, 2026  
**Message:** "Fix JSX syntax error in Contact.tsx"

### What It Fixes:
- ✅ Minor JSX syntax error in Contact.tsx

### Files Changed: 1 file
- Modified: `Contact.tsx`

### Dependencies: None

### Conflicts Risk: LOW

### Recommendation: ⭐⭐⭐ **OPTIONAL**
**Why:** Minor fix, may not be needed if you don't have the error

### Cherry-Pick Command:
```bash
git cherry-pick 525fbdd
```

---

## COMMIT 7: Minimalist Design & Booking Fixes
**Hash:** `d02367e`  
**Date:** May 16, 2026  
**Message:** "feat: implement minimalist design, fix booking flow, automate calendar invites"

### What It Improves:
- ✅ Refined hero section with minimalist charcoal background
- ✅ Improved gradient overlays
- ✅ Enhanced responsive breakpoints
- ✅ Fixed booking flow issues
- ✅ **Calendar invite automation** (.ics file generation)
- ✅ Improved email templates with calendar attachments

### Files Changed: 6 files
- Modified: `Home.tsx`, `Booking.tsx`, `CTABand.tsx`, `index.css`, `calendar.js`, `email.js`

### Dependencies: None

### Conflicts Risk: MEDIUM
- Updates multiple files that may have been changed in previous commits

### Recommendation: ⭐⭐⭐⭐ **RECOMMENDED**
**Why:** Calendar automation is valuable, design refinements improve UX

### Cherry-Pick Command:
```bash
git cherry-pick d02367e
```

---

## COMMIT 8: Routing Migration to React Router DOM
**Hash:** `c7a97af`  
**Date:** May 16, 2026  
**Message:** "chore: migrate to react-router-dom for SEO"

### What It Changes:
- ⚠️ **BREAKING CHANGE:** Wouter → React Router DOM
- ✅ Better SEO support
- ✅ More features and community support
- ✅ Industry standard routing

### Changes:
- All `<Link href="">` → `<Link to="">`
- All `import { Link } from 'wouter'` → `import { Link } from 'react-router-dom'`
- Route definitions updated
- 16 files affected

### Files Changed: 16 files
- New: `fix-links.mjs`
- Modified: `package.json`, `App.tsx`, `routes.ts`, all navigation components

### Dependencies: Adds `react-router-dom` package

### Conflicts Risk: **VERY HIGH**
- Changes navigation across entire app
- Will conflict with any commits that modify navigation

### Recommendation: ⭐⭐⭐ **CONSIDER CAREFULLY**
**Why:** Better for SEO but requires significant migration effort

**Decision Points:**
- ✅ Keep if: You want better SEO and don't mind migration
- ❌ Skip if: You're happy with Wouter and want to avoid conflicts

### Cherry-Pick Command:
```bash
# Only if you want to migrate routing
git cherry-pick c7a97af

# You'll likely need to resolve conflicts
```

---

## COMMIT 9: Deployment Fix - Start Script
**Hash:** `e1a9a09`  
**Date:** May 16, 2026  
**Message:** "fix: resolve render deployment issue by updating start script syntax"

### What It Fixes:
- ✅ Updated start script for Render deployment

### Files Changed: 1 file
- Modified: `package.json`

### Dependencies: None

### Conflicts Risk: LOW

### Recommendation: ⭐⭐ **OPTIONAL**
**Why:** Only needed if deploying to Render

### Cherry-Pick Command:
```bash
git cherry-pick e1a9a09
```

---

## COMMIT 10: Improve Startup Error Logging
**Hash:** `81f43b3`  
**Date:** May 16, 2026  
**Message:** "chore: improve startup error logging"

### What It Adds:
- ✅ Better error logging on server startup
- ✅ Improved error messages
- ✅ Better debugging information

### Files Changed: 1 file
- Modified: `server/index.js`

### Dependencies: None

### Conflicts Risk: LOW

### Recommendation: ⭐⭐⭐ **RECOMMENDED**
**Why:** Helpful for debugging, no downside

### Cherry-Pick Command:
```bash
git cherry-pick 81f43b3
```

---

## COMMIT 11: Fix Linux Shell Compatibility
**Hash:** `2729501`  
**Date:** May 16, 2026  
**Message:** "fix: remove NODE_ENV inline variable to fix linux shell crash"

### What It Fixes:
- ✅ Removed inline NODE_ENV variable
- ✅ Fixed Linux/Unix shell compatibility

### Files Changed: 1 file
- Modified: `package.json`

### Dependencies: None

### Conflicts Risk: LOW

### Recommendation: ⭐⭐⭐ **RECOMMENDED**
**Why:** Better cross-platform compatibility

### Cherry-Pick Command:
```bash
git cherry-pick 2729501
```

---

## COMMIT 12: Express 5 Wildcard Syntax Fix
**Hash:** `9dd72ea`  
**Date:** May 16, 2026  
**Message:** "fix: revert to Express 5 wildcard syntax for SPA fallback"

### What It Fixes:
- ✅ Fixed SPA routing fallback for Express 5

### Files Changed: 1 file
- Modified: `server/index.js`

### Dependencies: None

### Conflicts Risk: LOW

### Recommendation: ⭐⭐⭐ **RECOMMENDED**
**Why:** Fixes routing issues

### Cherry-Pick Command:
```bash
git cherry-pick 9dd72ea
```

---

## COMMIT 13: Add NMFB Logo
**Hash:** `3b04e38`  
**Date:** May 16, 2026  
**Message:** "feat: add new NMFB logo to client section"

### What It Adds:
- ✅ NMFB (Nigerian Mortgage Finance Bank) to client logos

### Files Changed: 1 file
- Modified: `Home.tsx`

### Dependencies: Requires COMMIT 14 (f1b9b7e) for the image file

### Conflicts Risk: LOW

### Recommendation: ⭐⭐⭐ **RECOMMENDED** (if you have NMFB as client)
**Why:** Adds another client logo

### Cherry-Pick Command:
```bash
git cherry-pick 3b04e38
```

---

## COMMIT 14: Add NMFB Logo Image
**Hash:** `f1b9b7e`  
**Date:** May 16, 2026  
**Message:** "fix"

### What It Adds:
- ✅ `nmfb-logo-new.png` image file

### Files Changed: 1 file
- New: `public/images/nmfb-logo-new.png`

### Dependencies: None (but needed for COMMIT 13)

### Conflicts Risk: NONE

### Recommendation: ⭐⭐⭐ **RECOMMENDED** (if keeping Commit 13)
**Why:** Required for NMFB logo to display

### Cherry-Pick Command:
```bash
git cherry-pick f1b9b7e
```

---

## COMMIT 15: Scale NMFB Logo
**Hash:** `38da463`  
**Date:** May 16, 2026  
**Message:** "style: scale up NMFB logo to match other clients"

### What It Fixes:
- ✅ Adjusted NMFB logo sizing

### Files Changed: 1 file
- Modified: `Home.tsx`

### Dependencies: Requires COMMIT 13 and 14

### Conflicts Risk: LOW

### Recommendation: ⭐⭐⭐ **RECOMMENDED** (if keeping Commits 13 & 14)
**Why:** Ensures consistent logo sizing

### Cherry-Pick Command:
```bash
git cherry-pick 38da463
```

---

## COMMIT 16: Fix Missing Link Imports
**Hash:** `bc5394f`  
**Date:** May 16, 2026  
**Message:** "fix: import missing Link component in Contact and Faq pages"

### What It Fixes:
- ✅ Added missing `Link` imports for React Router DOM

### Files Changed: 2 files
- Modified: `Contact.tsx`, `Faq.tsx`

### Dependencies: Requires COMMIT 8 (c7a97af) - React Router migration

### Conflicts Risk: LOW (if you kept Commit 8)

### Recommendation: ⭐⭐⭐⭐⭐ **REQUIRED** (if you kept Commit 8)
**Why:** Fixes broken imports from routing migration

### Cherry-Pick Command:
```bash
# Only if you cherry-picked commit c7a97af
git cherry-pick bc5394f
```

---

## Recommended Cherry-Pick Sequences

### Option A: Maximum Value (No Routing Migration)
**Best for:** Keeping valuable features without breaking changes

```bash
# Reset to base
git reset --hard 1530d44657095be6d83bdf8fba70e5e8f3ca7ca9

# Apply commits in order
git cherry-pick 0ffeb26  # Conversion optimization ⭐⭐⭐⭐⭐
git cherry-pick d2ffdbe  # Critical fixes ⭐⭐⭐⭐⭐
git cherry-pick ed1b7e0  # Client logos ⭐⭐⭐⭐
git cherry-pick 9934b85  # UI/UX refactor ⭐⭐⭐⭐⭐
git cherry-pick 39c5979  # Mobile responsive ⭐⭐⭐⭐⭐
git cherry-pick d02367e  # Minimalist design + calendar ⭐⭐⭐⭐
git cherry-pick 81f43b3  # Error logging ⭐⭐⭐
git cherry-pick 2729501  # Linux compatibility ⭐⭐⭐
git cherry-pick 9dd72ea  # Express fix ⭐⭐⭐
git cherry-pick f1b9b7e  # NMFB image ⭐⭐⭐
git cherry-pick 3b04e38  # NMFB logo ⭐⭐⭐
git cherry-pick 38da463  # NMFB sizing ⭐⭐⭐
```

**Result:** All major features + fixes, no routing migration

---

### Option B: Essential Only
**Best for:** Minimal changes, maximum impact

```bash
# Reset to base
git reset --hard 1530d44657095be6d83bdf8fba70e5e8f3ca7ca9

# Apply essential commits
git cherry-pick 0ffeb26  # Conversion optimization ⭐⭐⭐⭐⭐
git cherry-pick d2ffdbe  # Critical fixes ⭐⭐⭐⭐⭐
git cherry-pick 9934b85  # UI/UX refactor ⭐⭐⭐⭐⭐
git cherry-pick 39c5979  # Mobile responsive ⭐⭐⭐⭐⭐
```

**Result:** Core improvements only

---

### Option C: Everything Including Routing
**Best for:** Want all features + better SEO

```bash
# Reset to base
git reset --hard 1530d44657095be6d83bdf8fba70e5e8f3ca7ca9

# Apply all commits in order
git cherry-pick 0ffeb26
git cherry-pick d2ffdbe
git cherry-pick ed1b7e0
git cherry-pick 9934b85
git cherry-pick 39c5979
git cherry-pick 525fbdd
git cherry-pick d02367e
git cherry-pick c7a97af  # ⚠️ Routing migration - may have conflicts
git cherry-pick e1a9a09
git cherry-pick 81f43b3
git cherry-pick 2729501
git cherry-pick 9dd72ea
git cherry-pick 3b04e38
git cherry-pick f1b9b7e
git cherry-pick 38da463
git cherry-pick bc5394f  # Fixes routing imports
```

**Result:** All changes, including routing migration

---

## Handling Conflicts

If you encounter conflicts during cherry-pick:

```bash
# View conflicted files
git status

# Edit files to resolve conflicts
# Look for <<<<<<< HEAD markers

# After resolving
git add .
git cherry-pick --continue

# To abort and skip this commit
git cherry-pick --abort
```

---

## Verification After Cherry-Picking

```bash
# Check what commits you have
git log --oneline

# Test the application
npm install  # Install any new dependencies
npm run dev  # Test frontend
npm run api  # Test backend

# Check for errors
npm run typecheck
```

---

## Quick Reference Table

| Commit | Hash | Priority | Dependencies | Conflicts Risk |
|--------|------|----------|--------------|----------------|
| Conversion Optimization | 0ffeb26 | ⭐⭐⭐⭐⭐ | None | LOW |
| Critical Fixes | d2ffdbe | ⭐⭐⭐⭐⭐ | None | LOW |
| Client Logos | ed1b7e0 | ⭐⭐⭐⭐ | None | LOW |
| UI/UX Refactor | 9934b85 | ⭐⭐⭐⭐⭐ | None | MEDIUM |
| Mobile Responsive | 39c5979 | ⭐⭐⭐⭐⭐ | 9934b85 | LOW |
| JSX Fix | 525fbdd | ⭐⭐⭐ | None | LOW |
| Minimalist Design | d02367e | ⭐⭐⭐⭐ | None | MEDIUM |
| Routing Migration | c7a97af | ⭐⭐⭐ | None | VERY HIGH |
| Render Deploy Fix | e1a9a09 | ⭐⭐ | None | LOW |
| Error Logging | 81f43b3 | ⭐⭐⭐ | None | LOW |
| Linux Compatibility | 2729501 | ⭐⭐⭐ | None | LOW |
| Express Fix | 9dd72ea | ⭐⭐⭐ | None | LOW |
| NMFB Logo | 3b04e38 | ⭐⭐⭐ | f1b9b7e | LOW |
| NMFB Image | f1b9b7e | ⭐⭐⭐ | None | NONE |
| NMFB Sizing | 38da463 | ⭐⭐⭐ | 3b04e38 | LOW |
| Fix Link Imports | bc5394f | ⭐⭐⭐⭐⭐ | c7a97af | LOW |

---

## My Recommendation

**Go with Option A: Maximum Value (No Routing Migration)**

This gives you:
- ✅ All conversion optimization features
- ✅ All UI/UX improvements
- ✅ All bug fixes
- ✅ Client logos
- ✅ Calendar automation
- ❌ No routing migration (avoids conflicts)

**Total: 12 commits, ~90% of value, minimal conflicts**

---

**Ready to proceed? Let me know which option you prefer or if you want a custom selection!**
