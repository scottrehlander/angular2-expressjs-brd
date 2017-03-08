function generateStubs() {

    const fs = require('fs');  
    const pathUtil = require('path');  
    const exec = require('child_process').execSync;

    const appConfig: any = require('../config/app.config.dev').database.resultdb;
    const dbUser: string = appConfig.username;
    const dbPass = appConfig.password;
    const connectString = appConfig.connectString;

    const handleErr = callback => (err, res) => {  
    if (err) {
        console.error(err.message);
        return;
    }
    callback(res);
    };

    function runScripts(user: string, dir: string, callback) {
        fs.readdir(dir, function(err, filenames) {
            if(err) {
                console.log("ERROR: " + err);
                return;
            }

            filenames.sort((file1, file2) => { return file1 > file2 }).forEach(function(filename) {
                if(filename.endsWith('.sql')) {
                    executeSql(user, dir, filename);
                }
                else if(filename.endsWith('.ts')) {
                    executeScript(dir, filename);
                }
            });
            
            if(callback) {
                callback();
            }
        });
    };

    function executeSql(user: string, dir: string, filename: string) {
        console.log('Exec sqlplus ' + pathUtil.join(dir, filename));

        exec("exit | sqlplus " + user + "/" + dbPass + "@localhost @" + pathUtil.join(dir, filename), {stdio:[0,1,2]});
    }

    function executeScript(dir, filename) {
        console.log('Exec script ' + pathUtil.join(dir, filename));

        exec("ts-node --project \"./server\" " + pathUtil.join(dir, filename), {stdio:[0,1,2]});
    }

    // Run the cleanup
    runScripts('system', './server/stubs/scripts/cleanup', () => {
        // Run the scripts
        runScripts(dbUser, './server/stubs/scripts', () => { });
    });

}

generateStubs();