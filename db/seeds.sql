INSERT INTO employee_db.department
    (name)
VALUES
    ("Engineering"), 
    ("Sales"), 
    ("Finance"), 
    ("Legal");

INSERT INTO employee_db.role
    (title, salary, department_id)
VALUES
    ("Engineer", 85000, 2), 
    ("Senior Engineer", 125000, 2), 
    ("CFO", 350000, 4), 
    ("Chief Counsel", 300000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES 
    ('Tim', 'Hortons', 1, 2), 
    ('James', 'Smith', 1, null), 
    ('David', 'Bay', 1, 2), 
    ('Jonny', 'Walker', 2, 2), 
    ('Mary', 'Margrette', 4, null);