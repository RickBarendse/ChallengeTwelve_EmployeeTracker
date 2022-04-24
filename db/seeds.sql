INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Finance'),
  ('Sales'),
  ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Engineering Manager', '140000.00', 1),
    ('Finance Manager', '160000.00', 2),
    ('Sales Mananger', '160000.00', 3),
    ('Legal Manager', '220000.00', 4),
    ('Engingeer II', '120000.00', 1),
    ('Financial Analyst', '120000.00', 2),
    ('Salesperson', '80000.00', 3),
    ('Attorney', '160000.00', 4),
    ('Engineer I', '100000.00', 1),
    ('Account Manager', '120000.00', 2),
    ('Sales Assistant', '60000.00',3),
    ('Legal Assistanct', '80000.00', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, NULL),
  ('Robert', 'Bruce', 3, NULL),
  ('Peter', 'Greenaway', 4, NULL),
  ('Derek', 'Jarman', 5, 1),
  ('Paolo', 'Pasolini', 6, 2),
  ('Heathcote', 'Williams', 7, 3),
  ('Sandy', 'Powell', 8, 4),
  ('Emil', 'Zola', 9, 1),
  ('Sissy', 'Coalpits', 10, 2),
  ('Antoinette', 'Capet', 11,3),
  ('Samuel', 'Delany', 12, 4),
  ('Tony', 'Duvert', 5, 1),
  ('Dennis', 'Cooper', 6, 2),
  ('Monica', 'Bellucci', 7, 3),
  ('Samuel', 'Johnson', 8, 4),
  ('John', 'Dryden', 9, 1),
  ('Alexander', 'Smith', 10, 2),
  ('Lionel', 'Johnson', 11, 3),
  ('Aubrey', 'Beardsley', 12, 4),
  ('Tulse', 'Luper', 9, 1),
  ('William', 'Morris', 10, 2),
  ('George', 'Shaw', 11, 3),
  ('Arnold', 'Bennett', 12, 4);

