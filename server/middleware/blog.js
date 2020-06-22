import statusCodes from '../helpers/statuscodes';

/**
 * @class UserValidate
 */
class BlogValidate {
  // eslint-disable-next-line consistent-return
  static validateBlog(request, response, next) {
    const {
      title, image, first, second, quote, third, fourth, posteduser, status
    } = request.body;

    if (!title || title.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Title is required',
      });
    }

    if (!image || image.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Image is required',
      });
    }

    if (!first || first.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'First Paragraph is required',
      });
    }
    if (!second || second.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Second Paragraph is required',
      });
    }
    if (!quote || quote.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Quote is required',
      });
    }

    if (!third || third.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Third Paragraph is required',
      });
    }
    if (!fourth || fourth.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Fourth Paragraph is required',
      });
    }
    if (!posteduser || posteduser.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Posted User is required',
      });
    }
    if (!status || status.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Status is required',
      });
    }
    next();
  }
}

export default BlogValidate;
