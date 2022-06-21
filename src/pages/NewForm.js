import React from 'react';
import '../stylesheets/newform.css'

const NewForm = () => {
    return (
        <div className = "requestForm">
            <form action="/addNewRequest" method="post">
            <div>
            <input type="text" name="title" value="" placeholder="Title of Event" />
            <input type="number" name="amount" value="" placeholder="Bill Amount" />
            <input type="date" name="title" placeholder="Date" />
                <input type="submit" name="sub" value="Submit" />
            </div>
            </form>
        </div>
    );
};
export default NewForm;
