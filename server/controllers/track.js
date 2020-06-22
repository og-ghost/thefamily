
import data from '../model/track';
import statusCodes from '../helpers/statuscodes';
import db from '../migration/database';


/**
 * @class TrackController
 *
 * @description Specifies which method handles a given request for a specific endpoint
 *
 * @exports BlogController
 */

class TrackController {
  static async read(req, res) {
    const { status } = req.query;

    if (typeof status === 'undefined') {
      const { rows } = await db.query('SELECT * FROM track');
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } else {
      const text = 'SELECT * FROM track WHERE status=$1';
      const { rows } = await db.query(text, [status]);
      res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  }
  /**
   * creates new Track
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof TrackController
   */

  static async create(request, response) {
    const foundUser = await data.searchByEmail(request.body.email);
    if (foundUser.rowCount > 0) {
      return response.status(409).json({
        status: statusCodes.badRequest,
        error: 'Email is already taken',
      });
    }
    const result = await data.createTrack(request.body);
    const {
      userid,
      log,
      lat,
      address,
      email,
      status,
    } = result.rows[0];

    return response.status(201).json({
      status: response.statusCode,
      data: {
        userid,
        log,
        lat,
        address,
        email,
        status,
      },
      message: 'tracker was created'
    });
  }
}
export default TrackController;
