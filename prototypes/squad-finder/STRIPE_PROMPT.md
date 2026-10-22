Wire up Stripe payments for Squad Finder™ using MY OWN Stripe account. Do NOT use Lovable's built-in "Enable payments" / Lovable-managed payments flow. The secret STRIPE_SECRET_KEY is already stored in project secrets; read it only in server-side functions, never in the browser.

PRODUCTS (create them through the Stripe API from a one-time, idempotent setup function: look each product up by metadata.app = "squad_finder" and metadata.sku before creating, so running it twice never duplicates anything. Store the resulting price IDs in a stripe_prices table keyed by sku.)
1. sku "squad_pass_monthly" — "Squad Pass", recurring $2.99 USD per month. Description: "Unlimited posts, pinned sessions, Squad Pass badge, custom vibe tags."
2. sku "founder_lifetime" — "Founder Lifetime", one-time $9.99 USD. Description: "Lifetime Squad Pass and Founder badge. First 500 only."

CHECKOUT
- Server function create-checkout(sku): requires a signed-in user; creates or reuses a Stripe Customer for the user (store stripe_customer_id on a billing_customers table, not editable from the client); creates a Checkout Session (mode "subscription" for squad_pass_monthly, mode "payment" for founder_lifetime) with client_reference_id = user id and metadata { user_id, sku }; success_url = <published url>/pass?status=success, cancel_url = <published url>/pass?status=cancelled. Return the URL; the browser redirects to it.
- Before creating a founder_lifetime session, check server-side that fewer than 500 founders exist; if sold out, return a friendly error. Block founder checkout for users who are already founders, and block Squad Pass checkout for users with an active Squad Pass or Founder status.
- Wire the Subscribe and Buy buttons on the pricing page to this (replace "Payments coming soon").

WEBHOOK
- Server function stripe-webhook, public endpoint, verifies the Stripe-Signature header with STRIPE_WEBHOOK_SECRET using the raw request body; reject anything that fails verification with 400.
- Idempotent: insert event.id into a stripe_events table (unique on id) first; if it already exists, return 200 and do nothing.
- Handle:
  - checkout.session.completed — founder_lifetime: set is_founder = true and plan = 'pass' with no expiry. squad_pass_monthly: store stripe_subscription_id and set plan = 'pass'.
  - customer.subscription.created / updated — set plan = 'pass' while status is active or trialing, set plan_expires_at = current_period_end; on past_due keep access until current_period_end.
  - customer.subscription.deleted — set plan = 'free' unless the user is a founder.
  - invoice.payment_failed — log it to a billing_events table; no access change until the subscription status changes.
- Record every handled event in a billing_events ledger (user_id, type, amount, currency, stripe ids, created_at). Admins can read it; users can read their own rows.
- After the function is deployed, register the webhook endpoint in Stripe via the API, pointed at the PUBLISHED URL of the function, subscribed to exactly the events above. Then open the secure secret form for STRIPE_WEBHOOK_SECRET so I can paste the whsec_ value.

CUSTOMER PORTAL
- Server function create-portal-session: requires sign-in and an existing stripe_customer_id; returns a Billing Portal URL with return_url = <published url>/me.
- Add a "Manage subscription" button on the profile page and the pricing page for Squad Pass subscribers.

ADMIN
- On /admin show: active Squad Pass subscribers, founders sold / 500, revenue this month (sum from billing_events), and the latest 20 billing events.

TEST
- After STRIPE_WEBHOOK_SECRET is saved, test end to end in test mode with card 4242 4242 4242 4242 (any future date, any CVC): buy Squad Pass, confirm the plan flips to pass and posts are unlimited and pinned; open Manage subscription and cancel, confirm it reverts at period end (or immediately if cancelled now); buy Founder Lifetime with a second test user, confirm the Founder badge and the "X of 500 left" count drop by one. Replay one webhook event and confirm nothing is applied twice. Report exactly what passed and what failed, fix failures, and republish.
