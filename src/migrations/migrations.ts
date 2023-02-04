import {connection} from "./connection"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTable = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS LabeSystem_Class (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(80) NOT NULL UNIQUE,
        module ENUM("0", "1", "2", "3", "4", "5", "6") NOT NULL
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Instructors (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        birth_date DATE NOT NULL,
        class_id CHAR(36) NOT NULL,
        FOREIGN KEY (class_id) REFERENCES LabeSystem_Class(id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Students (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        birth_date DATE NOT NULL,
        class_id CHAR(36) NOT NULL,
        FOREIGN KEY (class_id) REFERENCES LabeSystem_Class(id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Expertise (
        id INT PRIMARY KEY,
        expertise_name ENUM("React", "Redux", "CSS", "Testes Unitários", "TypeScript", "Programação Orientada a Objetos", "Backend") NOT NULL
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Hobbies (
        id CHAR(36) PRIMARY KEY,
        hobby_name VARCHAR(80) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Instructors_Expertise (
        id CHAR(36) PRIMARY KEY,
        instructor_id CHAR(36) NOT NULL,
        expertise_id INT NOT NULL,
        FOREIGN KEY (instructor_id) REFERENCES LabeSystem_Instructors(id),
        FOREIGN KEY (expertise_id) REFERENCES LabeSystem_Expertise(id)
    );
    
    CREATE TABLE IF NOT EXISTS LabeSystem_Students_Hobbies (
        id CHAR(36) PRIMARY KEY,
        student_id CHAR(36) NOT NULL,
        hobby_id CHAR(36) NOT NULL,
        FOREIGN KEY (student_id) REFERENCES LabeSystem_Students(id),
        FOREIGN KEY (hobby_id) REFERENCES LabeSystem_Hobbies(id)
    );
    
`).then(() => console.log('Tabelas criadas.')).catch(printError)
    
const insertIntoTable = () => connection.raw(`
    INSERT INTO LabeSystem_Class VALUES ("00undefined00", "Undefined", "0");

    INSERT INTO LabeSystem_Expertise VALUES (1, "React");
    INSERT INTO LabeSystem_Expertise VALUES (2, "Redux");
    INSERT INTO LabeSystem_Expertise VALUES (3, "CSS");
    INSERT INTO LabeSystem_Expertise VALUES (4, "Testes unitários");
    INSERT INTO LabeSystem_Expertise VALUES (5, "TypeScript");
    INSERT INTO LabeSystem_Expertise VALUES (6, "Programação Orientada a Objetos");
    INSERT INTO LabeSystem_Expertise VALUES (7, "Backend");

`).then(() => {
    console.log("Valores inseridos.")
    connection.destroy()
}).catch(printError)

createTable().then(insertIntoTable)