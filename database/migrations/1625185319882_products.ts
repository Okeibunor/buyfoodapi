import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Products extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("user_id", 10).notNullable();
      table.integer("product_category_id", 10).notNullable();
      table.integer("product_sub_category_id", 10).notNullable();
      table.string("title", 250).notNullable();
      table.string("description", 255).notNullable();
      table.integer("price").notNullable();
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
