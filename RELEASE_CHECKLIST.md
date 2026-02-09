# Release Checklist 🚀

Use this checklist before, during, and after every deployment to production.

## 1. Pre-Deployment (Staging/Local)

- [ ] **Code Quality**
  - [ ] `npm run typecheck` passes without errors.
  - [ ] `npm run lint` passes.
  - [ ] `npm test` passes (Unit & Integration).
- [ ] **Database**
  - [ ] Check for pending migrations: `npx prisma migrate status`.
  - [ ] Verify if new indexes or schema changes are non-breaking.
  - [ ] Backup production database (if applicable/automated).
- [ ] **Environment Variables**
  - [ ] Verify all new `.env` variables are added to Vercel/Production dashboard.
  - [ ] Check `STRIPE_SECRET_KEY` and other sensitive keys.

## 2. Deployment

- [ ] **Database Migration**
  - [ ] Run migrations: `npx prisma migrate deploy` (usually automated in build).
- [ ] **Deploy**
  - [ ] Trigger deployment (Push to main / Promote to Production).

## 3. Post-Deployment (Smoke Tests) 💨

- [ ] **Health Check**
  - [ ] Access `/api/health` -> Should return `200 OK`.
  - [ ] Access `/api/diagnose?secret=...` (if authorized) -> Check DB connection status.
- [ ] **Critical Flows (Smoke Test)**
  - [ ] **Home Page**: Loads fast, no broken images.
  - [ ] **Auth**: Login works? (Test with a test account).
  - [ ] **Cart**: Add a product to cart.
  - [ ] **Checkout**: Reach the payment screen (do not need to pay, just render Stripe Elements).
  - [ ] **Appointment**: Open the booking form, check if services load.
- [ ] **Integrations**
  - [ ] **Stripe**: Verify Webhook endpoint is reachable (check Stripe Dashboard logs).
  - [ ] **Emails**: Trigger a password reset or confirmation email (check delivery).

## 4. Monitoring & Logs 📊

- [ ] **Vercel/Server Logs**: Check for immediate 500 errors or "CrashLoopBackOff".
- [ ] **Database Connections**: Ensure connection pool isn't exhausted.

## 5. Rollback Plan ↩️

If critical issues arise:

1.  **Revert Code**: Revert the merge commit on GitHub (`git revert`).
2.  **Redeploy**: Push the reversion immediately.
3.  **Database**:
    - If migration was additive (added tables/cols): Code revert is usually enough.
    - If migration was destructive (renamed/deleted): Restore from Pre-Deployment Backup.
