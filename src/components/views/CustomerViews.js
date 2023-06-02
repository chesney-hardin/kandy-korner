//
import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { CandyContainer } from "../products/CandyContainer"



export const CustomerViews = () => {
	return <>
		<Routes>
			<Route path="/" element={
				<>
					<h1>🍬 🍭 Kandy Korner 🍭 🍬 </h1>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationsList />} />

                <Route path="/find_candy" element={<CandyContainer />} />

			</Route>


		</Routes>
	</>
}

