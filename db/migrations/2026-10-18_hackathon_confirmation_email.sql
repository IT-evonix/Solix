-- Round 1 "Registration Confirmed" email tracking on hackathon registrations.
-- Additive and re-runnable. Rollback: 2026-10-18_hackathon_confirmation_email.down.sql

BEGIN;

-- confirmation_email_status: NULL not attempted, sending (claimed), sent, failed
ALTER TABLE hackathon_registration
  ADD COLUMN IF NOT EXISTS confirmation_email_status character varying(10),
  ADD COLUMN IF NOT EXISTS confirmation_email_claimed_at timestamp without time zone,
  ADD COLUMN IF NOT EXISTS confirmation_email_sent_at timestamp without time zone,
  ADD COLUMN IF NOT EXISTS confirmation_email_error text,
  ADD COLUMN IF NOT EXISTS confirmation_email_message_id character varying(64);

ALTER TABLE hackathon_registration DROP CONSTRAINT IF EXISTS hackathon_registration_confirmation_email_status_check;
ALTER TABLE hackathon_registration ADD CONSTRAINT hackathon_registration_confirmation_email_status_check
  CHECK (confirmation_email_status IS NULL OR confirmation_email_status IN ('sending', 'sent', 'failed'));

COMMIT;
