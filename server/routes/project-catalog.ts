import { Router, Response, Request } from "express";
import projectCatalogService = require("../services/project-catalog-service");

const projectCatalogRouter: Router = Router();

// Get projects for user
projectCatalogRouter.get("/users/:user", (request: Request, response: Response) => {
  var user = request.params.user;
  projectCatalogService.getProjectsForUser(user)
    .then(data => response.json(data))
    .catch(err => {
      response.status(500);
      response.render('Could not get projects for user.', { error: err });
    });
});

export { projectCatalogRouter };
