const db = require('../config/connection');

function queries(sql, tableName) {
    db.promise().query(sql)
        .then(response => {
            if (sql.toLowerCase().includes("select")) {
                console.table(response[0]);
            } else if (sql.toLowerCase().includes("insert")) {
                console.log(`Successfully added ${tableName} to the database`);
            }
        }).catch(e => console.log(e));
};

module.exports = queries;