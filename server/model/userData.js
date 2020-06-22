import moment from 'moment';
import help from '../helpers/help';
import db from '../migration/database';


/**
 * @exports User
 * @class User
 */

class User {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  static createUser(data) {
    const queryText = `INSERT INTO users (
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      registered,
      status,
      isAdmin
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;


    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    } = data;
    const hashedPassword = help.hashPassword(password);
    const registered = moment().format();
    const status = 'unverified';
    const isAdmin = true;

    const values = [
      firstName,
      lastName,
      phoneNumber,
      email,
      hashedPassword,
      registered,
      status,
      isAdmin,
    ];

    const response = db.query(queryText, values);

    return response;
  }

  static async createContact(data) {
    const queryText = `INSERT INTO contact (
      Name,
      Message,
      Email,
      Status
    ) VALUES ($1, $2, $3, $4) RETURNING *`;


    const {
      name,
      message,
      email,
      status
    } = data;

    const values = [
      name,
      message,
      email,
      status
    ];

    const response = await db.query(queryText, values);
    return response;
  }
  /**
   * @param {*} email
   * @returns { object } user object
   */

  static searchByEmail(email) {
    const query = 'SELECT * FROM users WHERE Email=$1';
    const result = db.query(query, [email]);

    return result;
  }
  /**
   * @param {*} id
   * @returns { object } user object
   */

  static searchById(id, table) {
    const query = `SELECT * FROM ${table} WHERE id=$1`;

    const response = db.query(query, [id]);

    return response;
  }

  static createBlog(data) {
    const queryText = `INSERT INTO blog (
      title,
      image,
      first,
      second,
      quote,
      third,
      fourth,
      posteduser,
      status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;


    const {
      title,
      image,
      first,
      second,
      quote,
      third,
      fourth,
      posteduser,
      status,
    } = data;
    const values = [
      title,
      image,
      first,
      second,
      quote,
      third,
      fourth,
      posteduser,
      status,
    ];

    const response = db.query(queryText, values);

    return response;
  }
}

export default User;
