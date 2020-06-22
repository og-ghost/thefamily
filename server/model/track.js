import db from '../migration/database';


/**
 * @exports User
 * @class User
 */

class Track {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  static createTrack(data) {
    const queryText = `INSERT INTO track (
      userid,
      log,
      lat,
      address,
      email,
      status
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;


    const {
      userid,
      log,
      lat,
      address,
      email,
      status,
    } = data;
    const values = [
      userid,
      log,
      lat,
      address,
      email,
      status,
    ];

    const response = db.query(queryText, values);

    return response;
  }
  /**
   * @param {*} email
   * @returns { object } user object
   */

  static searchByEmail(email) {
    const query = 'SELECT * FROM track WHERE Email=$1';
    const result = db.query(query, [email]);

    return result;
  }
}

export default Track;
