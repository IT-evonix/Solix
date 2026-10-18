-- Delegate Pass email tracking on conference registrations.
-- Additive and re-runnable. Rollback: 2026-10-17_pass_email.down.sql

BEGIN;

-- pass_email_status: NULL not attempted, sending (claimed), sent, failed
ALTER TABLE registration
  ADD COLUMN IF NOT EXISTS pass_email_status character varying(10),
  ADD COLUMN IF NOT EXISTS pass_email_claimed_at timestamp without time zone,
  ADD COLUMN IF NOT EXISTS pass_email_sent_at timestamp without time zone,
  ADD COLUMN IF NOT EXISTS pass_email_error text,
  ADD COLUMN IF NOT EXISTS pass_email_message_id character varying(64);

ALTER TABLE registration DROP CONSTRAINT IF EXISTS registration_pass_email_status_check;
ALTER TABLE registration ADD CONSTRAINT registration_pass_email_status_check
  CHECK (pass_email_status IS NULL OR pass_email_status IN ('sending', 'sent', 'failed'));

COMMIT;
