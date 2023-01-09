import knex from "knex"
import dotenv from "dotenv"

dotenv.config()

export abstract class BaseDatabase {
   static connection = knex({
      client: "mysql",
      connection: {
         host: process.env.DB_HOST,
         port: 3306,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_DATABASE,
         multipleStatements: true
      }
   });

   abstract TABLE_NAME: string;
   
   public async create(item: any) {
      await BaseDatabase.connection(this.TABLE_NAME).insert(item)
   }

   public async getAll() {
      const result = await BaseDatabase.connection(this.TABLE_NAME).select()
      return result
   }

   public async searchFor(column:string, like:string, value:string) {
      const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(column, like, value)
      return result
   }

   public async updateInfo(id: string, column: string, newValue: string) {
      await BaseDatabase.connection(this.TABLE_NAME).where({id}).update(column, newValue)
   }

   public async getZodiacSigns(firstMonth: string, secondMonth: string, firstDay: string, secondDay: string, thirdDay: string, fourthDay: string) {
      const result = await BaseDatabase.connection.raw(`
            SELECT name, birth_date FROM ${this.TABLE_NAME} WHERE Month(birth_date) = ${firstMonth}
            AND Day(birth_date) BETWEEN ${firstDay} AND ${secondDay}
            UNION
            SELECT name, birth_date FROM ${this.TABLE_NAME} WHERE Month(birth_date) = ${secondMonth}
            AND Day(birth_date) BETWEEN ${thirdDay} AND ${fourthDay};
        `)
        return result[0]
   }

   public async getUsers(tableClassId: string, classId: string) {
      const result = await BaseDatabase.connection("LabeSystem_Class").select("*")
      .join(this.TABLE_NAME, `${tableClassId}`, "=", "LabeSystem_Class.id")
      .whereLike(`${tableClassId}`, `${classId}`)
      return result
   }
}