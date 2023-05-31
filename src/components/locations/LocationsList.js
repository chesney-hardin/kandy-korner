
//create an html list of tickets when a button in navbar is clicked on

import { useEffect, useState } from "react"

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
        <h2>List of Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section>
                            <h3>Location #{location.id}</h3>
                            <ul>
                                <li>address: {location.address}</li>
                                <li>{location.sqft}sqft</li>
                            </ul>
                        </section>
                    }
                )
            }
        </article>
    
    </>

}