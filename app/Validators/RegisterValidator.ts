import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    first_name: schema.string({ trim: true }, [rules.required()]),
    last_name: schema.string({ trim: true }, [rules.required()]),
    address: schema.string.optional({ trim: true }, [rules.required()]),
    username: schema.string({ trim: true }, [
      rules.unique({ table: "users", column: "username" }),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    gender: schema.string({ trim: true }, [rules.required()]),
    contact_number: schema.string({ trim: true }, [rules.required()]),
    password: schema.string({ trim: true }, [rules.required()]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    "*": (field, rule) => {
      return `${rule} validation error on ${field}`;
    },
    required: "The {{ field }} is required to register",
    "email.email": "Email must be a valid email format",
    "email.unique": "Email must be unique",
    "username.unique": "Username must be unique",
  };
}
