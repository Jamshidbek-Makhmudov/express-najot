
/** 
* @swagger
*  components:
*    securitySchemes:
*      bearerAuth:
*        name : Authorization
*        type : http
*        scheme: bearer
*        bearerFormat: JWT    
*       
*/

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: for create
 *     tags: [film]
 *     security:
 *           - bearerAuth: []
 *     description: filmni crut apis.
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                 name:
 *                   example: harry potter
 *                   type: string
 *                 description:
 *                    type: string
 *                    example: good movie
 *                 year:
 *                    type: number
 *                    example: 2014
 *                 price:
 *                    type: number
 *                    example: 1398
 *                 photo:
 *                   type: file
 *                   example: 5ca8c742-5c20-4040-b2ea-99bb5963e93d.png
 *                 video_url:
 *                    type: string
 *                 release:
 *                    type: string
 *                    format : date
 *                    example: 2023-15-09
 *   
 *     responses:
 *       201:
 *         description: Create film.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 * 
 * /api/film/1:
 *   get:
 * 
 *     summary: for get by id
 *     tags: [film]
 *     responses:
 *       200:
 *         description: get by id film.
 *         content:
 *          multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:                    
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: int
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Titanik
 *                     description:
 *                       type: string
 *                       description: film's description and required
 *                       example: This is awesome movie
 *                     year:
 *                       type: number
 *                       description: film's year and required
 *                       example: 2014
 *                     price:
 *                       type: number
 *                       description: film's price and required
 *                       example: 1398
 *                     photo:
 *                       type: file
 *                       description: film's photo and required
 *                       example: 5ca8c742-5c20-4040-b2ea-99bb5963e93d.png
 *                     video_url:
 *                       type: string
 *                       description: film's video 
 *                     release:
 *                       type: string
 *                       format : date
 *                       description: film's premyer and required
 *                       example: 2023-15-09
 *                 
 * /api/film:
 *   get:
 *     summary: for get all
 *     tags: [film]
 *     responses:
 *       400:
 *         description: get all film.
 *         content:
 *          multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: number
 *                          description: The film id
 *                          example: 1
 *                        name:
 *                          type: string
 *                          description: film's Name and required
 *                          example: Tom Jerry
 *                        description:
 *                          type: string
 *                          description: film's description and required
 *                          example: very good premyera
 *                        year:
 *                          type: number
 *                          description: film's year and required
 *                          example: 2009
 *                        price:
 *                          type: number
 *                          description: film's price and required
 *                          example: 30908
 *                        photo:
 *                          type: file
 *                          description: film's phto and required
 *                          example: 5ca8c742-5c20-4040-b2ea-99bb5963e93d.png
 *                        video_url:
 *                          type: string
 *                          description: film's video and required
 *                        release:
 *                          type: string
 *                          frmat: date
 *                          description: film's premyer year and required
 *                          example: 2024
 */