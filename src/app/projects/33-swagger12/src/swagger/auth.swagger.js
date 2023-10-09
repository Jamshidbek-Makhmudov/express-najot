


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: for create
 *     tags: [Admin]
 *     description: Adminni crut apis.
 *     requestBody:
 *        content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 username:
 *                   example: Toms23
 *                   type: string
 *                   required: true
 *                 password:
 *                   example: ase2344
 *                   type: string
 *                   required: true
 *                 fullname:
 *                   type: string
 *                   example: Toms Doe
 *                   required: true
 *     responses:
 *       201:
 *         description: Create user.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTY4ZDFlLWUzNTctNDgzNS05YzM2LTMzMGY3MmEyYjJhNiIsImlhdCI6MTY5MTgyNzA1MSwiZXhwIjoxNjkyMDg2MjUxfQ.YBAK3LZ0ByOTKh7ttBGS9voDtjSjq_zyBHkKbzqArYc
 * /api/auth/login:
 *   post:
 *     summary: for login
 *     tags: [Admin]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 username:
 *                    type: string
 *                    example: toms23
 *                 password:
 *                   type: string
 *                   example: 7u%792003
 *     responses:
 *       201:
 *         description: Create admin.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTY4ZDFlLWUzNTctNDgzNS05YzM2LTMzMGY3MmEyYjJhNiIsImlhdCI6MTY5MTgyNzA1MSwiZXhwIjoxNjkyMDg2MjUxfQ.YBAK3LZ0ByOTKh7ttBGS9voDtjSjq_zyBHkKbzqArYc
 */