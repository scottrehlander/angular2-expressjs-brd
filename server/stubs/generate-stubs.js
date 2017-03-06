const fs = require('fs');  
const path = require('path');  
const argv = require('minimist')(process.argv.slice(2));  
const exec = require('child_process').exec;

const sqlFile = argv.f;
const sqlDir = argv.d;
const dbUser = argv.u;
const dbPass = argv.p;
const connectString = argv.c;

const dbConfig = {  
  user          : dbUser,
  password      : dbPass,
  connectString : connectString,
};

const handleErr = callback => (err, res) => {  
  if (err) {
    console.error(err.message);
    return;
  }
  callback(res);
};

function executeSqlPlus() {  
    if(sqlFile) {
        executeScript(connection, sqlFile);
    }
    else if (sqlDir) {
        fs.readdir(sqlDir, function(err, filenames) {
            if(err) {
                console.log("ERROR: " + err);
                return;
            }
            filenames.forEach(function(filename) {
                if(filename.endsWith('.sql')) {
                    console.log('Exec sqlplus ' + path.join(sqlDir, filename));

                    exec("exit | sqlplus " + dbUser + "/" + dbPass + "@localhost @" + path.join(sqlDir, filename), function(err, stdout, stderr) {
                        if(stdout) {
                            console.log(stdout);
                        }
                        if(stderr) {
                            console.log("ERROR: " + stderr);
                        }
                    });
                }
            });
        });
    }
};

executeSqlPlus();

