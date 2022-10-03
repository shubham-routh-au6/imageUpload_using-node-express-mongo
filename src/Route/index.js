const express = require("express");
const multer = require("../../utility/multer");
const controller = require("../Controller/index");
const route = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     image:
 *       type: object
 *       properties:
 *         filename:
 *            type: string
 *            example: gohanfondo.png
 *         from:
 *            type: string
 *            example: "2022-10-01"
 *         to:
 *            type: string
 *            example: "2022-10-02"
 */


/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Save image metadata to Image collection.
 *     description: Save an image in the static folder and save the path along with some metadata to MongoDB.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *           
 *     responses:
 *       200:
 *         description: upload Image!
*/

route.post("/upload", multer.single("image"), async (req, res) => {
    try {
        let obj = {
            filename: req.body.filename ? req.body.filename : null,
            from: req.body.from ? req.body.from : null,
            to: req.body.to ? req.body.to : null,
        }

        await controller.imageUpload(req);
        res.json({
            status: 201,
            message: 'File uploded successfully!'
        });
    } catch (err) {
        console.log('err', err)
        res.json({
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while uploading image!'
        });
    }
});


/**
 * @swagger
 * /get_images:
 *   post:
 *     summary: Retrieve images from image collection
 *     description: Retrieve a list or single image based on the parameters passed in the request body.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return   
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: The number of items to skip before starting to collect the result set
 *       
 *     requestBody:
 *        description: Optional description in *Markdown*
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/image'
 *       
 *     responses:
 *       200:
 *         description: A list of images.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The image ID.
 *                         example: '633a16c9c5d2abb4ca28648f'
 *                       date:
 *                         type: string
 *                         description: Image saved date.
 *                         example: 2022-09-02
 *                       imageUrl:
 *                         type: string
 *                         description: The images url.
 *                         example: "images/panCard.jpeg"
 *                       name:
 *                         type: string
 *                         description: The image format.
 *                         example: jpeg
 *                       mimetype:
 *                         type: string
 *                         description: The image mimetype.
 *                         example: image/jpeg
 *                       encoding:
 *                         type: string
 *                         description: The image encoding.
 *                         example: 7bit
 */

route.post('/get_images', async (req, res) => {
    try {
        let limit = req.query.limit ? req.query.limit : 10;
        let skip = req.query.skip ? req.query.skip : 0

        let obj = {
            filename: req.body.filename ? req.body.filename : null,
            from: req.body.from ? req.body.from : null,
            to: req.body.to ? req.body.to : null,
            limit,
            skip
        }

        const images = await controller.getImage(obj);
        res.json({
            images,
            status: 200,
            message: 'Fetched successfully!'
        });
    } catch (err) {
        console.log('err', err)
        res.json({
            images: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while fetching from DB!'
        });
    }
});


module.exports = route;