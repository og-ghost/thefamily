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
    const queryText = `INSERT INTO property (
      name,
      city,
      state,
      firstimage,
      secondimage,
      thirdimage,
      fourthimage,
      video,
      description,
      type,
      feature,
      amount, 
      bedrooms,
      age,
      bathrooms,
      size,
      carpark,
      status,
      posteduser
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`;


    const {
      name,
      city,
      state,
      firstimage,
      secondimage,
      thirdimage,
      fourthimage,
      video,
      description,
      type,
      feature,
      amount,
      bedrooms,
      age,
      bathrooms,
      size,
      carpark,
      status,
      posteduser,
    } = data;
    const values = [
      name,
      city,
      state,
      firstimage,
      secondimage,
      thirdimage,
      fourthimage,
      video,
      description,
      type,
      feature,
      amount,
      bedrooms,
      age,
      bathrooms,
      size,
      carpark,
      status,
      posteduser,
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
