/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       name: Authorization
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *    summary: for Login
 *    tags: [Auth]
 *    requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *    responses:
 *     200:
 *      description: Successfully logged in
 *     401:
 *      description: Unauthorized - Missing or invalid beared token
 *     500:
 *      description: Internal server error
 * /pai/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username and password.
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registration successful
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: User already exists
 *
 * /api/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the currently authenticated user.
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       '200':
 *         description: Logout successful
 *
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get the profile of the currently authenticated user.
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       '200':
 *         description: Successful request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       '401':
 *         description: Unauthorized request
 */
