
import data from '../model/userData';
import db from '../migration/database';


/**
 * @class BlogController
 *
 * @description Specifies which method handles a given request for a specific endpoint
 *
 * @exports BlogController
 */

class BlogController {
  static async read(req, res) {
    const { status } = req.query;

    if (typeof status === 'undefined') {
      const { rows } = await db.query('SELECT * FROM blog');
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } else {
      const text = 'SELECT * FROM blog WHERE status=$1';
      const { rows } = await db.query(text, [status]);
      res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  }
  /**
   * creates new Blog
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof BlogController
   */

  static async create(request, response) {
    const result = await data.createBlog(request.body);
    const {
      title,
      image,
      first,
      second,
      quote,
      third,
      fourth,
      registered,
      posteduser,
      status,
    } = result.rows[0];

    return response.status(201).json({
      status: response.statusCode,
      data: {
        title,
        image,
        first,
        second,
        quote,
        third,
        fourth,
        registered,
        posteduser,
        status,
      },
      message: `Blog post was Successful ${posteduser}`
    });
  }
}
export default BlogController;
