const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});
/**
 * @class UserController
 *
 * @description Specifies which method handles a given request for a specific endpoint
 *
 * @exports UserController
 */

class FileController {
  /**
   * creates new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */
  static async upload(req, res) {
    try {
      const upload = multer({ storage }).single('files');
      upload(req, res, (err) => {
        if (err) {
          return res.send(err);
        }

        // SEND FILE TO CLOUDINARY
    
        cloudinary.config({
          cloud_name: 'dihl0midk',
          api_key: '774732129924841',
          api_secret: '0qnLfcObIaNR2Acc4N40Sy29pKM'
        });

        const { path } = req.file;
        const uniqueFilename = new Date().toISOString();
        cloudinary.uploader.upload(
          path, { public_id: `blog/${uniqueFilename}`, tags: 'blog' },
          (error, result) => {
            if (error) return res.send(error);
            console.log('file uploaded to Cloudinary');
            // remove file from server
            fs.unlinkSync(path);
            // return image details
            res.send({
              status: true,
              message: 'File uploaded successful',
              data: {
                path: result
              }
            });
            // res.json(image);
          }
        );
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
export default FileController;
