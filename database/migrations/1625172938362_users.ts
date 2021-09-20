import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { UserType } from "Contracts/enum";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("username", 255).unique().notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("password", 180).notNullable();
      table.string("remember_me_token", 255);
      table
        .enum("type", Object.values(UserType))
        .defaultTo(UserType.ADMIN)
        .nullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("gender", 255);
      table.string("contact_number", 255);
      table.string("address", 255);
      table.timestamp("created_at").defaultTo(this.now());
      table
        .timestamp("updated_at")
        .defaultTo(this.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
