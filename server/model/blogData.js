import db from '../migration/database';


/**
 * @exports User
 * @class User
 */

class Blog {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  static createBlog(data) {
    const queryText = `INSERT INTO blog (
      title,
      image,
      first,
      second,
      quote,
      third,
      fourth,
      status,
      postedUser,
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;


    const {
      title,
      image,
      first,
      second,
      quote,
      third,
      fourth,
      postedUser,
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
      postedUser,
      status,
    ];

    const response = db.query(queryText, values);

    return response;
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
}

export default Blog;
