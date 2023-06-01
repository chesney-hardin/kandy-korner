

/* Get the current user from the local storage (kandy_user)
hint: use localStorage.getItem("kandy_user") and then use JSON.parse to save the object
*/

import { useEffect, useState } from "react"
import "./ProductsList.css"


// Declare and export a function to fetch and generate the products list for employees

export const ProductsList = () => {
    // Establish state. We declare our state called products with an initial state of an empty array.
    const [products, setProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])
    const [topPriced, setTopPriced] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    // When products=[] (initial state), fetch the products data
    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=type")
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        []
    )

    // If an employee, sort products by name 
    useEffect(
        () => {
            if (kandyUserObject.staff) {
                const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name))
                setSortedProducts(sortedProducts)
            }
        }, [products]
    )

    // Filter products by price (>$2)
    useEffect(
        () => {
            if (topPriced) {
                const filteredProducts = sortedProducts.filter(product => product.price > 2)
                setSortedProducts(filteredProducts)
            }
        },
        [topPriced]
    )

    /* Products List HTML. Display name and price.
        -Check if kandy_user is an employee
        -Default displays all products sorted by name.
        -Add a "Top Priced" button that only displays products > $2
         */

    return <>

        {
            kandyUserObject.staff ?

                <>
                    <h2 class="product__header">Products List</h2>

                    <button class="btn_topPriced" onClick={() => { setTopPriced(true) }}>Top Priced</button>

                    <ul className="products">
                        {
                            sortedProducts.map(
                                (product) => {
                                    return <li className="product" key={`product--${product.id}`}>
                                        {product.name}-- ${product.price}-- {product.type.type}
                                    </li>
                                }
                            )
                        }
                    </ul>
                </>
                : <>
                    ""</>
        }

    </>

}