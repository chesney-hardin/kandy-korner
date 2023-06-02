// This component is the parent of FindCandy and ProductList so that state can pass between them

import { useState } from "react"
import { FindyCandy } from "./FindCandy"
import { ProductsList } from "./ProductsList"

export const CandyContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <FindyCandy setterFunction={setSearchTerms}/>
        <ProductsList searchTermState={searchTerms}/>
    </>
}