

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: for create
 *     tags: [user]
 *     security:
 *           - bearerAuth: []
 *     description: user crut apis.
 *     requestBody:
 *        content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 username:
 *                   example: To34m
 *                   type: string
 *                   required: true
 *                 password:
 *                    type: string
 *                    example: Aa123456
 *                    required: true
 *                 fullname:
 *                   type: string
 *                   example: John Doe
 *                   required: true
 * 
 *     responses:
 *       201:
 *         description: Create user.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: successs

 * 
 * 
 * /api/user/statistics:
 *   get:
 *     summary: for get by fromDate, toDate
 *     tags: [user]
 *     responses:
 *       200:
 *         description: get statistikis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: number
 *                       example: 23
 *                     created_at:
 *                       type: stirng
 *                       format: date
 *                       description: required
 *                       example: 2023-23-5
 * /api/user:
 *   get:
 *     summary: for get all
 *     tags: [user]
 *     responses:
 *       200:
 *         description: get all users.
 *         content:
 *           application/json:
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
 *                          description: The user id
 *                          example: 20
 *                        username:
 *                          type: string
 *                          description: userName and required
 *                          example: Tom34
 *                        password:
 *                          type: string
 *                          description: password and required
 *                          example: doto56
 *                        fullname:
 *                          type: string
 *                          description: user's fullname
 *                          example: John Doe
 *                        balance:
 *                          type: number
 *                          description: user's balance
 *                          example: 0
 *                        created_at:
 *                          type: string
 *                          format: date
 *                          description: user's create time
 *                          example: 2023-08-30 22:13:45.913779
 *                        is_admin:
 *                          type: boolean
 *                          description: user's admin or no 
 *                          example: false
 * 
 * 
 * 
 * /api/user/payment:
 *   post:
 *     summary: for changeBalance
 *     tags: [user]
 *     security:
 *           - bearerAuth: []
 *     requestBody:
 *        content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 balance:
 *                   example: 34908
 *                   type: number
 *                   require: true

 *     responses:
 *       201:
 *         description: update balance.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: number
 *                          description: The user id
 *                          example: 20
 *                        username:
 *                          type: string
 *                          description: userName and required
 *                          example: Tom34
 *                        password:
 *                          type: string
 *                          description: password and required
 *                          example: doto56
 *                        fullname:
 *                          type: string
 *                          description: user's fullname
 *                          example: John Doe
 *                        balance:
 *                          type: number
 *                          description: user's balance
 *                          example: 0
 *                        created_at:
 *                          type: string
 *                          format: date
 *                          description: user's create time
 *                          example: 2023-08-30 22:13:45.913779
 *                        is_admin:
 *                          type: boolean
 *                          description: user's admin or no 
 *                          example: false
 */                 
