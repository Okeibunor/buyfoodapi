import BaseSchema from "@ioc:Adonis/Lucid/Schema";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("email", 255).unique().notNullable();
      table.string("password", 180).notNullable();
      table.string("remember_me_token", 255);
      table.timestamp("created_at").defaultTo(this.now());
      table.timestamp("updated_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
