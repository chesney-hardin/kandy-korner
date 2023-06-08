import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { ProductsList } from "../products/ProductsList"
import { ProductForm } from "../products/ProductForm"
import { EmployeeList } from "../employees/EmployeeList"
import { NewEmployeeForm } from "../employees/NewEmployeeForm"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { LoyaltyNumberForm } from "../customers/LoyaltyNumberForm"



export const EmployeeViews = () => {
	return <>
		<Routes>
			<Route path="/" element={
				<>
					<h1>🍬 🍭 Kandy Korner 🍭 🍬 </h1>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationsList />} />

				<Route path="products" element={<ProductsList />} />

				<Route path="product/create" element={<ProductForm />} />

				<Route path="employees" element={<EmployeeList />} />

				<Route path="employee/create" element={<NewEmployeeForm />} />

				<Route path="customers" element={<CustomerList />} />

				<Route path="customers/:customerId" element={<CustomerDetails />} />

				<Route path="customers/:customerId/loyaltyform" element={<LoyaltyNumberForm />} />


			</Route>




		</Routes>
	</>
}
