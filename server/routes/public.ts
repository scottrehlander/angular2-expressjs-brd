import { Router, Response, Request } from 'express';

const http = require('http');

const publicRouter: Router = Router();

publicRouter.get('/simple', (request: Request, response: Response) => {
  
  let options = {
    host: 'https://cbnt-project-catalog.broadinstitute.org',
    path: '/projectdb/api/users/krose/projects'
  }


  response.json({
    title: 'Greetings.',
    text: 'Hello Angular 2'
  });
});

export { publicRouter }
