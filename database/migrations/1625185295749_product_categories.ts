import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ProductCategories extends BaseSchema {
  protected tableName = "product_categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.boolean("status").defaultTo(false);
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
