import { DateTime } from "luxon";
import {
  BaseModel,
  beforeSave,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash";
import Product from "./Product";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public remember_me_token: string | null;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public gender: string;

  @column()
  public contact_number: string | null;

  @column()
  public address: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasOne(() => Product, {
    localKey: "id",
    foreignKey: "user_id",
  })
  public product: HasOne<typeof Product>;
}
