-- Rollback for 2026-10-17_pass_email.sql

BEGIN;

ALTER TABLE registration DROP CONSTRAINT IF EXISTS registration_pass_email_status_check;
ALTER TABLE registration
  DROP COLUMN IF EXISTS pass_email_message_id,
  DROP COLUMN IF EXISTS pass_email_error,
  DROP COLUMN IF EXISTS pass_email_sent_at,
  DROP COLUMN IF EXISTS pass_email_claimed_at,
  DROP COLUMN IF EXISTS pass_email_status;

COMMIT;
