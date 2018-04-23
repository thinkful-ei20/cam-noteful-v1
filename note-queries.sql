-- Select notes and sort them in various ways
SELECT * FROM notes;
SELECT * FROM notes LIMIT 5;
SELECT * FROM notes ORDER BY id ASC;
SELECT * FROM notes ORDER BY id DESC;
SELECT * FROM notes ORDER BY title ASC;
SELECT * FROM notes ORDER BY title DESC;
SELECT * FROM notes ORDER BY created ASC;
SELECT * FROM notes ORDER BY created DESC;

-- Select notes where title matches a string exactly
SELECT * FROM notes WHERE title LIKE 'Hello%';

-- Update the title and content of a specific note(LINTER IS BEING FUNNY)
UPDATE notes SET (title, content) = ('New Title', 'New content') WHERE id = '1';
SELECT * FROM notes WHERE id = '1';


-- insert a new note, try providing incomplete data
-- title is required, no error
INSERT INTO notes (title) VALUES ('No content');
-- content is not required, but with no title, flags an error
INSERT INTO notes (content) VALUES ('No title');

-- Delete a note by id
DELETE FROM notes WHERE id = '1';

-- BONUS
-- Alter sequence table so id's start at 1000
ALTER SEQUENCE notes INCREMENT 1 RESTART with 1000;