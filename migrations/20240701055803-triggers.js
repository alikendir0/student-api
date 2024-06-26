module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_nostudents()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE sections
        SET "noStudents" = "noStudents" + 1
        WHERE "id" = NEW."id";
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER increment_nostudents_trigger
      AFTER INSERT ON studentcourses
      FOR EACH ROW
      EXECUTE FUNCTION update_nostudents();
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION decrement_nostudents()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE sections
        SET "noStudents" = "noStudents" - 1
        WHERE "id" = OLD."id";
        RETURN OLD;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER decrement_nostudents_trigger
      AFTER DELETE ON studentcourses
      FOR EACH ROW
      EXECUTE FUNCTION decrement_nostudents();
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION check_capacity()
      RETURNS TRIGGER AS $$
      BEGIN
        IF (SELECT "noStudents" FROM sections WHERE "id" = NEW."id") >= 
           (SELECT "capacity" FROM sections WHERE "id" = NEW."id") THEN
          RAISE EXCEPTION 'Cannot add student to section, section is at capacity';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER check_capacity_trigger
      BEFORE INSERT ON studentcourses
      FOR EACH ROW
      EXECUTE FUNCTION check_capacity();
    `);
  },

  down: async (queryInterface, Sequelize) => {},
};
