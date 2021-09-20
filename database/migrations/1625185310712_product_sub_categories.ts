import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ProductSubCategories extends BaseSchema {
  protected tableName = "product_sub_categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.integer("product_category_id").notNullable();
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
