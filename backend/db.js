const {Pool} = require ('pg');
//require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://lq262:2628@localhost/splittr',
    ssl: process.env.DATABASE_URL ? true : false
});

module.exports = pool;