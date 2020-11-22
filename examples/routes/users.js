import express from 'express';
import { body, validationResult } from 'express-validator';
import { BearerParser, BearerValidator } from 'bearer-token-parser';

const router = express.Router();

router.post('/', [
  // Validate input data.
  body('email').isEmail(),
  body('name').isLength({ min: 1, max: 20 }),

  // Validate Bearer tokens.
  BearerValidator.validation({
    realm: 'Sample API',
    tokenCheckCallback: (token) => {
      // Returns TRUE if the token is correct.
      return token === 'eTRPXY8F~np0zbAzi2~KN';
    },
    requestParameterCheck: (req) => {
      // Returns TRUE if the input data is correct using the "express-validator" package..
      const errors = validationResult(req);
      return errors.isEmpty();
    }
  }),
], (req, res, next) => {
  // Get bearer token.
  // It gets a token68 format token from the authorization header of the request.
  const token = BearerParser.parseBearerToken(req.headers);
  console.log(`Token: ${token}`);

  // Processing something.
  const newUser = {
    id: 1,
    email: req.body.email,
    name: req.body.name
  };

  // Respond.
  res.json(newUser);
});

export default router;