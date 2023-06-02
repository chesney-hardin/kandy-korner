import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

	if (kandyUserObject.staff) {
		// Return Employee views
		return <EmployeeViews />
	}

	else {
		// Return customer views
		return <CustomerViews />
	}
	
}