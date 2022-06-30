import React from 'react';
import "../stylesheets/dashboard.css";
import DummyForm from '../components/dashboard/DummyForm';


const Dashboard = () => {
    return (
        <div>
            <div> <h1>Dashboard</h1>
            </div>
        
            
            
            <table>
                <tr>
                    <td className="placeholder1" id="placeholder11">
                        
                        [Component Placeholder: Row 1, Col 1]
                        
                    </td>
                    <td className="placeholder1" id="placeholder12">
                        
                        [Component Placeholder: Row 1, Col 2]
                        
                    </td>
                    <td className="placeholder1" id="placeholder13">
                        <td>
                        [Component Placeholder: Row 1, Col 3]
                        </td>
                    </td>
                </tr>
                <tr className='column'>
        
                    <td className="placeholder2 " id="placeholder21">
                        
                        [Component Placeholder: Row 2, Col 1]
                        
                    </td>
                    <td className="placeholder2 " id="placeholder22">
                        
                        [Component Placeholder: Row 2, Col 2]
                        
                    </td>
                </tr>
                <tr>
                    <td className="placeholder3" id="dummyform">
                        <DummyForm/>
                        [Dummyform]
                        
                    </td>
                </tr>
            </table>
        
        </div>
        
    );
};
export default Dashboard;