export class OracleDbHelper {
    
    oracledb = require('oracledb');
    dbConfig: any;
    
    constructor(config) {
        this.dbConfig = config;
    }

    generateSqlFromJson(collection: string, obj: any): { statement: string, bindValues: string[] } {
        console.log("Attempting to construct statement for " + collection);
    
        let statement = "INSERT INTO " + collection + " (";
        let props = Object.keys(obj);
        statement += props.join(', ') + ") VALUES (";

        // Set the bind names
        statement += props.map((prop) => { return ":" + prop }).join(", ") + ")";

        let bindValues = props.map((prop) => {
            return obj[prop];
        });

        return { statement: statement, bindValues: bindValues };
    }

    connect(cb) {
        console.log("Attempting to connect using " + this.dbConfig.username + ", " + this.dbConfig.password + ", " + this.dbConfig.connectString);

        this.oracledb.getConnection({
            user: this.dbConfig.username,
            password: this.dbConfig.password,
            connectString: this.dbConfig.connectString
        }, cb);
    };
    
    release(conn) {
        console.log("Attempting to release the connection");

        conn.close(function (err) {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log("Successfully released connection");
            }
        });
    };

    insert(conn, statement: string, bindValues: any[], cb) {
        console.log('Attempting to insert: ' + statement + " with bind variables [" + bindValues + "]");

        conn.execute(statement, bindValues, { autoCommit: true }, function(err, result) {
            if (err) {
                return cb(err, conn);
            } 
            else {
                console.log("Rows inserted: " + result.rowsAffected);  // 1
                return cb(null, conn);
            }
        });
    };

}