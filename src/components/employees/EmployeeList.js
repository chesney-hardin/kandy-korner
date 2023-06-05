import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EmployeeList.css"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch('http://localhost:8088/employees?_expand=user&_expand=location')
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    return (
        <>
            <h2 className="employees__header">Employees</h2>

            <button className="btn_createNewEmployee" onClick={() => navigate("/employee/create")}>Add a New Employee</button>

            <article className="employees">

                {
                    employees.map(employee =>
                        <section className="employee--details" key={`employee--${employee.id}`}>
                            <header>{employee?.user?.fullName}</header>
                            <div>Email: {employee?.user?.email}</div>
                            <div>Location: {employee?.location?.address}</div>
                            <div>Pay Rate: ${employee.payRate} per hour</div>
                        </section>)
                }
            </article>
        </>
    )
}