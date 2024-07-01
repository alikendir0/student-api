-- DROP TABLE courses

-- CREATE TABLE Users(
-- 	idNo varchar(11) primary key,
-- 	firstName varchar NOT NULL,
-- 	lastName varchar NOT NULL,
-- 	createdAt date NOT NULL,
-- 	updatedAt date NOT NULL
-- )

-- CREATE TABLE Students(
-- 	studentNo varchar(11) NOT NULL,
-- 	PRIMARY KEY(studentNo)
-- ) inherits(users)


-- CREATE TABLE Instructors(
-- 	instructorNo varchar(11) NOT NULL,
-- 	PRIMARY KEY(instructorNo)
-- ) inherits(users)

-- CREATE TABLE Faculties(
-- 	facultyID SERIAL primary key,
-- 	name varchar NOT NULL
-- )

-- INSERT INTO Faculties(name) values('Fen Edebiyat Fakultesi')
-- INSERT INTO Instructors values('48028060750','Ali','Kendir','2024-06-02','2024-06-02','123456')
-- INSERT INTO Courses(code, facultyid) values('HIST102', 1)
-- INSERT INTO Sections(coursecode, day, hour, place, instructorno, capacity, nostudents) values('HIST102', 'Tuesday', '12.00', 'D108', '123456', 42,41)
-- INSERT INTO Students values(33467246162, 'Alaz', 'Yildirim','2024-06-02','2024-06-02','654321')
-- INSERT INTO studentCourses values('654321', 1,1)


CREATE TABLE Sections(
	sectionID SERIAL primary key,
	coursecode varchar NOT NULL,
	day varchar NOT NULL,
	hour varchar NOT NULL,
	place varchar NOT NULL,
	instructorno varchar(6),
	capacity integer NOT NULL,
	nostudents integer,
	CONSTRAINT fk_instructor
      	FOREIGN KEY(instructorno)
        	REFERENCES instructors(instructorno)
			ON DELETE SET NULL,
	CONSTRAINT fk_course
      	FOREIGN KEY(coursecode)
        	REFERENCES courses(code)
			ON DELETE CASCADE
)

CREATE TABLE Courses(
	courseID SERIAL primary key,
	code varchar UNIQUE NOT NULL,
	facultyID integer NOT NULL,
	CONSTRAINT fk_faculty
      FOREIGN KEY(facultyID) 
        REFERENCES faculties(facultyID)
		ON DELETE CASCADE
)

	CREATE TABLE studentCourses(
		studentno varchar(11) NOT NULL,
		sectionID integer NOT NULL,
		courseID INTEGER NOT NULL,
		CONSTRAINT fk_student
	      	FOREIGN KEY(studentno) 
	        	REFERENCES students(studentno)
				ON DELETE CASCADE,
		CONSTRAINT fk_section
	      	FOREIGN KEY(sectionid)
	        	REFERENCES sections(sectionid)
				ON DELETE CASCADE,
		CONSTRAINT fk_coursecode
        	FOREIGN KEY (courseID)
        		REFERENCES courses(courseID)
        		ON DELETE CASCADE,
    	CONSTRAINT unique_student_course
        	UNIQUE (studentno, courseID)
	)


--Increments nostudents
CREATE OR REPLACE FUNCTION update_nostudents()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE Sections
  SET nostudents = nostudents + 1
  WHERE sectionID = NEW.sectionID;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_nostudents_trigger
AFTER INSERT ON studentCourses
FOR EACH ROW
EXECUTE FUNCTION update_nostudents();

--Decrement nostudents
CREATE OR REPLACE FUNCTION decrement_nostudents()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE Sections
  SET nostudents = nostudents - 1
  WHERE sectionID = OLD.sectionID;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_nostudents_trigger
AFTER DELETE ON studentCourses
FOR EACH ROW
EXECUTE FUNCTION decrement_nostudents();


--Capacity Checker
CREATE OR REPLACE FUNCTION check_capacity()
RETURNS TRIGGER AS $$
BEGIN

  IF (SELECT nostudents FROM Sections WHERE sectionID = NEW.sectionID) >= 
     (SELECT capacity FROM Sections WHERE sectionID = NEW.sectionID) THEN
    RAISE EXCEPTION 'Cannot add student to section, section is at capacity';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_capacity_trigger
BEFORE INSERT ON studentCourses
FOR EACH ROW
EXECUTE FUNCTION check_capacity();

DELETE FROM studentCourses WHERE studentNo='654321'
