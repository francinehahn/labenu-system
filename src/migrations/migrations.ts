import {connection} from "./connection"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTable = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS LabeSystem_Class (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(80) NOT NULL UNIQUE,
        module ENUM("0", "1", "2", "3", "4", "5", "6") NOT NULL
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Instructors (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        birth_date DATE NOT NULL,
        class_id VARCHAR(80) NOT NULL,
        FOREIGN KEY (class_id) REFERENCES LabeSystem_Class(id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Students (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        birth_date DATE NOT NULL,
        class_id VARCHAR(80) NOT NULL,
        FOREIGN KEY (class_id) REFERENCES LabeSystem_Class(id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Expertise (
        id VARCHAR(80) PRIMARY KEY,
        expertise_name ENUM("React", "Redux", "CSS", "Testes Unitários", "TypeScript", "Programação Orientada a Objetos", "Backend") NOT NULL
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Hobbies (
        id VARCHAR(80) PRIMARY KEY,
        hobby_name VARCHAR(180) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Instructors_Expertise (
        id VARCHAR(80) PRIMARY KEY,
        instructor_id VARCHAR(80) NOT NULL,
        expertise_id VARCHAR(80) NOT NULL,
        FOREIGN KEY (instructor_id) REFERENCES LabeSystem_Instructors(id),
        FOREIGN KEY (expertise_id) REFERENCES LabeSystem_Expertise(id)
    );
    
    CREATE TABLE IF NOT EXISTS LabeSystem_Students_Hobbies (
        id VARCHAR(80) PRIMARY KEY,
        student_id VARCHAR(80) NOT NULL,
        hobby_id VARCHAR(80) NOT NULL,
        FOREIGN KEY (student_id) REFERENCES LabeSystem_Students(id),
        FOREIGN KEY (hobby_id) REFERENCES LabeSystem_Hobbies(id)
    );
    
`).then(() => {
    console.log('Tabelas criadas.')
    connection.destroy()
}).catch(printError)
    

createTable()