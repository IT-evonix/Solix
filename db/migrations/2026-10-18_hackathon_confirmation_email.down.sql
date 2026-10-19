-- Rollback for 2026-10-18_hackathon_confirmation_email.sql

BEGIN;

ALTER TABLE hackathon_registration DROP CONSTRAINT IF EXISTS hackathon_registration_confirmation_email_status_check;
ALTER TABLE hackathon_registration
  DROP COLUMN IF EXISTS confirmation_email_message_id,
  DROP COLUMN IF EXISTS confirmation_email_error,
  DROP COLUMN IF EXISTS confirmation_email_sent_at,
  DROP COLUMN IF EXISTS confirmation_email_claimed_at,
  DROP COLUMN IF EXISTS confirmation_email_status;

COMMIT;
