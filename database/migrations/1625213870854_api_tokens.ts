import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ApiTokens extends BaseSchema {
  protected tableName = "api_tokens";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("user_id");
      table.string("name");
      table.string("token");
      table.string("type");
      table.timestamp("created_at").defaultTo(this.now());
      table.dateTime("expires_at").defaultTo(null);
      table
        .timestamp("updated_at")
        .defaultTo(this.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
