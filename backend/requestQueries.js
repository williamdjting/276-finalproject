const pool = require("./db");
var format = require('pg-format');
// const { use } = require("./routers/adminRouter");

// Request Accessor Views
// getUserData actually gives us the basic view
const viewRequestByID = (request, response) => {
    const { userid, reqid } = request.body;

    pool.query(
        format("SELECT * FROM %I WHERE reqid = '%I'", 'user'.concat(userid), reqid),
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)

        })
}

// Look at all requests sent
const viewSentRequestsByUser = (request, response) => {
    const { userid, reqid } = request.body;

    pool.query(
        format("SELECT * FROM %I WHERE receiverid = '%I' AND req_sent IS TRUE", 'user'.concat(userid), reqid),
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)

        })
}

const viewReceivedRequestsByUser = (request, response) => {
    const { userid, reqid } = request.body;

    pool.query(
        format("SELECT * FROM %I WHERE receiverid = '%I' AND req_sent IS NOT TRUE", 'user'.concat(userid), reqid),
        (error, results) => {
            if (error) {
                throw error
            }
        response.status(200).json(results.rows)

        })
    
}

const viewAllOpenRequests = (request, response) => {
    const { userid } = request.body;
    pool.query(
        format("SELECT * FROM %I WHERE paid IS NOT TRUE", 'user'.concat(userid)),
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const viewAllClosedRequests = (request, response) => {
    const { userid } = request.body;

    pool.query(
        format("SELECT * FROM %I WHERE paid IS TRUE", 'user'.concat(userid)),
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)

        })
}

// Request Mutators

const createNewRequestSerialized = (request, response) => {

    const { userid, senderid, receiverids, amount } = request.body;
    let reqid = null;
    //const isTableExist =  pool.query(format("SELECT EXISTS ( SELECT FROM  pg_tables WHERE  schemaname = 'public' AND tablename  = %I", 'user'.concat(id)));
    //console.log("isTable Existed :" + isTableExist[0]);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    pool.query(
        'INSERT INTO requests (host_userid) VALUES ($1) RETURNING reqid', [senderid],
        (error, results) => {
            if (error) {
                temp = false;
                throw error
            }
            reqid = results;

        })

    splitAmount = (amount / receiverids.length)

    receiverids.forEach(receiverid => {
        // insert into host table
        pool.query(
            format('INSERT INTO "%I"  (reqid, req_sent, date, receiverid, amount, paid) VALUES (%I, %I, %I, %I, %I)', 'user'.concat(userid), 'TRUE', reqid, date, receiverid, splitAmount, 'FALSE'),
            (error, results) => {
                if (error) {
                    temp = false;

                    throw error
                }

            })
        // insert into guest table
        pool.query(
            format('INSERT INTO "%I"  (reqid, req_sent, date, receiverid, amount, paid) VALUES (%I, %I, %I, %I, %I)', 'user'.concat(receiverid), 'FALSE', reqid, date, userid, splitAmount, 'FALSE'),
            (error, results) => {
                if (error) {
                    temp = false;

                    throw error
                }
            })
    });

    if (temp) {
        response.status(200).send(`Request added with reqid: ${reqid}`);
    }

    else {
        response.status(404);
    }

}

const createNewRequest = (request, response) => {

    const { userid, senderid, receiverid, amount } = request.body;
    let reqid = null;
    //const isTableExist =  pool.query(format("SELECT EXISTS ( SELECT FROM  pg_tables WHERE  schemaname = 'public' AND tablename  = %I", 'user'.concat(id)));
    //console.log("isTable Existed :" + isTableExist[0]);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    pool.query(
        'INSERT INTO requests (host_userid) VALUES ($1) RETURNING reqid', [senderid],
        (error, results) => {
            if (error) {
                temp = false;
                throw error
            }
            reqid = results;

        })




    // insert into host table
    pool.query(
        format('INSERT INTO "%I"  (reqid, req_sent, date, receiverid, amount, paid) VALUES (%I, %I, %I, %I, %I)', 'user'.concat(userid), 'TRUE', reqid, date, receiverid, amount, 'FALSE'),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }

        })
    // insert into guest table
    pool.query(
        format('INSERT INTO "%I"  (reqid, req_sent, date, receiverid, amount, paid) VALUES (%I, %I, %I, %I, %I)', 'user'.concat(receiverid), 'FALSE', reqid, date, userid, amount, 'FALSE'),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }
        })


    if (temp) {
        response.status(200).send(`Request added with reqid: ${reqid}`);
    }

    else {
        response.status(404);
    }

}


const editRequestAmount = (request, response) => {
    const { reqid, userid, receiverid, amount } = request.body;

    // update host table
    pool.query(
        format('UPDATE "%I" SET amount = %I WHERE reqid = %I AND receiverid = %I', 'user'.concat(userid), amount, reqid, receiverid),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }

        })
    // update guest table
    pool.query(
        format('UPDATE "%I" SET amount = %I WHERE reqid = %I AND receiverid = %I', 'user'.concat(receiverid), amount, reqid, userid),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }
        })
    if (temp) {
        response.status(200).send(`Request ${reqid} amount changed to ${amount} `);
    }

    else {
        response.status(404);
    }

}


const editRequestUser = (request, response) => {
    const { reqid, userid, receiverid, oldid } = request.body;

    // update host table
    pool.query(
        format('UPDATE "%I" SET receiverid = %I WHERE reqid = %I AND receiverid = %I', 'user'.concat(userid), receiverid, reqid, oldid),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }

        })
    // update guest tables
    // copies row from old user to new user
    // NOTE: We do not need to update the copied row's receiverid as that id represents the user it was sent from 
    //      which is the host, and that did not change when the row gets edited
    pool.query(
        format('INSERT INTO %I (SELECT * FROM %I WHERE reqid = %I AND receiverid = %I)', 'user'.concat(receiverid), 'user'.concat(oldid), reqid, userid),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }
            
        })

    // delete the original row from the old user table
    pool.query(
        format('DELETE FROM %I WHERE reqid = %I AND receiverid = %I)', 'user'.concat(oldid), reqid, userid),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }
        })


    if (temp) {
        response.status(200).send(`User changed from ${oldid} to ${receiverid}`);
    }

    else {
        response.status(404);
    }

}

const requestPaid = (request, response) => {
    const { reqid, userid, receiverid } = request.body;

    // update host table
    pool.query(
        format('UPDATE "%I" SET paid = "TRUE" WHERE reqid = %I AND receiverid = %I', 'user'.concat(userid), reqid, receiverid),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }

        })
    // update guest table
    pool.query(
        format('UPDATE "%I" SET paid = "TRUE" WHERE reqid = %I AND receiverid = %I', 'user'.concat(receiverid), reqid, userid),
        (error, results) => {
            if (error) {
                temp = false;

                throw error
            }
        })
    if (temp) {
        response.status(200).send(`User deleted with ID: ${id}`);
    }

    else {
        response.status(404);
    }

}

// export methods to routing
module.exports = {
    viewRequestByID,
    viewSentRequestsByUser,
    viewReceivedRequestsByUser,
    viewAllOpenRequests,
    viewAllClosedRequests,
    createNewRequestSerialized,
    createNewRequest,
    editRequestAmount,
    editRequestUser,
    requestPaid
}
