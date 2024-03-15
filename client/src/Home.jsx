import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employee data from the backend when the component mounts
        axios.get('http://localhost:3001/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Delete employee with given id
        axios.delete(`http://localhost:3001/employees/${id}`)
            .then(response => {
                // Filter out the deleted employee from the list
                setEmployees(employees.filter(employee => employee._id !== id));
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    return (
        <div>
            <h2>Employee Details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th> {/* Add a column for delete button */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td> {/* Add delete button with onClick event */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
