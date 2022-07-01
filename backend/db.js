const {Pool} = require ('pg');
//require('dotenv').config();

const pool = new Pool({
    database: "splittr",
    host: "localhost",
    password: "2628",
    user: "lq262",
    port: "5432",
});

module.exports = pool;