// Create an html list of tickets when a button in navbar is clicked on

import { useEffect, useState } from "react"
import "./LocationsList.css"


export const LocationsList = () => {
    const [locations, setLocations ] = useState([])

    // Fetch the locations data
    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
            .then(response => response.json())
            .then((locationsArray) => {
                setLocations(locationsArray)
            })
        },
        []
    )

    return <>
        <h2 class="location__header">List of Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section class="location">
                            <h3>Location #{location.id}</h3>
                            <ul>
                                <li>Address: {location.address}</li>
                                <li>{location.sqft} sqft</li>
                            </ul>
                        </section>
                    }
                )
            }
        </article>
    
    </>

}