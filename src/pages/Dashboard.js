import React from 'react';
import "../stylesheets/dashboard.css";


const Dashboard = () => {
    return (
        <div>
            <div> <h1>Dashboard</h1>
            </div>
        
            
            
            <table>
                <tr>
                    <td className="placeholder" id="placeholder11">
                        
                        [Component Placeholder: Row 1, Col 1]
                        
                    </td>
                    <td className="placeholder" id="placeholder12">
                        
                        [Component Placeholder: Row 1, Col 2]
                        
                    </td>
                    <td className="placeholder" id="placeholder13">
                        <td>
                        [Component Placeholder: Row 1, Col 3]
                        </td>
                    </td>
                </tr>
                <tr>
                    <td className="placeholder" id="placeholder21">
                        
                        [Component Placeholder: Row 2, Col 1]
                        
                    </td>
                    <td className="placeholder" id="placeholder22">
                        
                        [Component Placeholder: Row 2, Col 2]
                        
                    </td>
                </tr>
                <tr>
                    <td className="placeholder" id="placeholder31">
                        
                        [Component Placeholder: Row 3, Col 1, for dummy submit form]
                        
                    </td>
                </tr>
            </table>
        
        </div>
        
    );
};
export default Dashboard;