import { Router, Response, Request } from 'express';
import logger = require('../common/logger');
import http = require('http');

const publicRouter: Router = Router();

publicRouter.get('/simple', (request: Request, response: Response) => {
  logger.info('Requesting info from /simple');

  response.json({
    title: 'Greetings.',
    text: 'Hello Angular 2'
  });
});

export { publicRouter }
