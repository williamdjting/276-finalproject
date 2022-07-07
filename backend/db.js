const {Pool} = require ('pg');
require('dotenv').config();

const pool = new Pool({
    // connectionString: process.env.DATABASE_URL || 'postgres://lq262:2628@localhost/splittr',

    // connects to prod postgres
    connectionString: process.env.DATABASE_URL || 'postgres://nlnajewasujowz:68afbba1d1882dc6bade2888069594672cdbe27e0cc2907a2e860722f2f2ba8e@ec2-23-23-151-191.compute-1.amazonaws.com:5432/d6mhtc326luj06',

    // ssl: process.env.DATABASE_URL ? true : false,

    ssl: {
        rejectUnauthorized: false
    },
    secure: false
});

module.exports = pool;