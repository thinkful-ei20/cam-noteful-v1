DROP TABLE IF EXISTS notes;

-- SELECT CURRENT_DATE;

CREATE TABLE notes(id serial PRIMARY KEY, title text NOT NULL, content text, created timestamp DEFAULT current_timestamp);

-- BONUS
-- Alter sequence table so id's start at 1000
ALTER SEQUENCE notes_id_seq RESTART with 1000;

INSERT INTO notes(title, content) 
VALUES ('aHey', 'Some content'), 
('bHi', 'Some content 2'), 
('cHello', 'Some content 3'),
('dHelloooo4', 'Some content 4'),
('eHellooooo5', 'Some content 5'),
('fHelloooooo6', 'Some content 6'),
('gHelloooooooo7', 'Some content 7'),
('hHellooooooooo8', 'Some content 8'),
('iHelloooooooooo9', 'Some content 9'),
('jHellooooooooooo10', 'Some content 10');

