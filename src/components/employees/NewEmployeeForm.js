/*
Create a form for new employees. 
Include 4 properties: name, location, start date, and pay rate.
Need to make 2 POST requests to add the new employee to the users array
and the mployees array.
When submitted, redirect to the /employee (Employee List) view.
*/

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NewEmployeeForm.css"

//Export and define function to handle HTML, fetching, and POST request for ticket form
export const NewEmployeeForm = () => {

    // Establish initial state object with default properties for form
    const [user, setNewUser] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })

    const [employee, setNewEmployee] = useState({
        userId: 0,
        startDate: "",
        payRate: 0,
        locationId: 0
    })


// Add the useNavigate hook
const navigate = useNavigate()

// Define click event for submitting the form
const handleSaveButtonClick = (event) => {
    // Prevent the browser from executing the default action
    event.preventDefault()


    // POST the objects to the API
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then((newUser) => {
            const newUserCopy = { ...employee }
            newUserCopy.userId = newUser.id
            setNewEmployee(newUserCopy)
        })

}


useEffect(
    () => {
        if (employee.userId !== 0) {
            fetch("http://localhost:8088/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/employees")
                })
        }
    },
    [employee]
)


// Return the HTML for the form and button

return (
    <form className="employeeForm">
        <h2 className="employeeForm__title">Create New Employee</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={user.fullName}
                    onChange={
                        (evt) => {
                            const copy = { ...user }
                            const fullName= evt.target.value
                            copy.fullName = fullName
                            const noWhiteSpace = fullName.toLowerCase().replace(" ", "")
                            copy.email = `${noWhiteSpace}@kandykorner.com`
                            setNewUser(copy)
                        }
                    } />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location:</label>
                <select value={employee.locationId}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.locationId = JSON.parse(evt.target.value)
                            setNewEmployee(copy)
                        }
                    } >
                    <option value="">Select location</option>
                    <option value="1">2802 Zula Locks</option>
                    <option value="2">56849 Fadel Gateway</option>
                    <option value="3">7346 Ritchie Road</option>
                    <option value="4">589 Tricolor Drive</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    required autoFocus
                    type="date"
                    className="form-control"
                    placeholder="March 1, 1999"
                    value={employee.startDate}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.startDate = evt.target.value
                            setNewEmployee(copy)
                        }
                    } />
            </div>
            <div className="form-group">
                <label htmlFor="payRate">Pay Rate (per hour):</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="$18.00"
                    value={employee.payRate}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.payRate = evt.target.value
                            setNewEmployee(copy)
                        }
                    } />
            </div>

        </fieldset>

        {<button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-submitEmployee">
            Submit
        </button>}
    </form>
)
}

