-- Rename the second hackathon consent point shown in the registration form.
BEGIN;

UPDATE hackathon_declaration
SET name = 'I agree to the “Tech Conclave Hackathon” Terms & conditions'
WHERE kind = 'consent'
  AND name = 'I agree to the Hackathon Terms & Conditions.';

COMMIT;
