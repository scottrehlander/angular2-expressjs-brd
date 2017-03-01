import appConfig = require('../config/app.config');

const request = require('request');
const config = appConfig.get();

export function getProjectsForUser(user : string) {
    return new Promise((resolve, reject) => {
        // Query project catalog to get the list of projects for this user
        request({
            url: `${config.pbs.baseUrl}/users/${user}/projects`,
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.projectdb+json'
            },
            auth: {
                user: config.pbs.user,
                pass: config.pbs.pass,
                sendImmediately: false
            }
        }, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });       
}