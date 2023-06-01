import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { ProductsList } from "../products/ProductsList"
import { ProductForm } from "../products/ProductForm"


/*
Questions:
-Do we need <Outlet /> after our h1
*/

export const ApplicationViews = () => {
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

			</Route>




		</Routes>
	</>
}

