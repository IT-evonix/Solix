-- Rollback for 2026-10-17_registration_forms.sql
-- Drops hackathon data and the new conference columns.

BEGIN;

DROP TABLE IF EXISTS hackathon_registration;
DROP TABLE IF EXISTS hackathon_declaration;
DROP TABLE IF EXISTS hackathon_discipline;
DROP SEQUENCE IF EXISTS hackathon_code_seq;

ALTER TABLE registration_payment DROP COLUMN IF EXISTS payer_name;

ALTER TABLE registration
  DROP COLUMN IF EXISTS attendee_photo_path,
  DROP COLUMN IF EXISTS category_other,
  DROP COLUMN IF EXISTS dietary_preference;

DELETE FROM category
WHERE name = 'Student'
  AND NOT EXISTS (SELECT 1 FROM registration r WHERE r.participant_category = category.id);

ALTER TABLE category DROP COLUMN IF EXISTS sort_order;

COMMIT;
