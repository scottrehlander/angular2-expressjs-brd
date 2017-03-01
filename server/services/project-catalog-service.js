"use strict";
exports.__esModule = true;
var appConfig = require("../config/app.config");
var request = require('request');
var config = appConfig.get();
function getProjectsForUser(user) {
    return new Promise(function (resolve, reject) {
        // Query project catalog to get the list of projects for this user
        request({
            url: config.pbs.baseUrl + "/users/" + user + "/projects",
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.projectdb+json'
            },
            auth: {
                user: config.pbs.user,
                pass: config.pbs.pass,
                sendImmediately: false
            }
        }, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                resolve(body);
            }
        });
    });
}
exports.getProjectsForUser = getProjectsForUser;
