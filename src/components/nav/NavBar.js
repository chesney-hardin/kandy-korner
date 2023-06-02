import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

	if (kandyUserObject.staff) {
		// Return Employee views
		return <EmployeeNav />
	}

	else {
		// Return customer views
		return <CustomerNav />
	}
}

/* Change this to check if kandy_user is a customer 
or employee and direct to the corresponding navbar 
*/