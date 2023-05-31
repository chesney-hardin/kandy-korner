import { Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"


/*
Questions:
-Do we need <Outlet /> after our h1
*/

export const ApplicationViews = () => {
	return <>
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

										
				</>
			}>

				<Route path="locations" element={<LocationsList />} />

			</Route>


		</Routes>
	</>
}

