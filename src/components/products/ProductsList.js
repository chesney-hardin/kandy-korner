

/* Get the current user from the local storage (kandy_user)
hint: use localStorage.getItem("kandy_user") and then use JSON.parse to save the object
*/

import { useEffect, useState } from "react"
import "./ProductsList.css"
import { useNavigate } from "react-router-dom"


// Declare and export a function to fetch and generate the products list for employees

export const ProductsList = ({ searchTermState }) => {
    // Establish state. We declare our state called products with an initial state of an empty array.
    const [products, setProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])
    const [topPriced, setTopPriced] = useState(false)
    const [customers, setCustomers] = useState([])

    const [ newPurchase, setNewPurchase] = useState({
        customerId: 0,
        locationInventoryId: 0,
        purchaseQuantity: 0,
        productId: 0
    })

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setSortedProducts(searchedProducts)
        },
        [searchTermState]
    )


    // When products=[] (initial state), fetch the products data
    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=type&_embed=locationInventories")
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })

                fetch("http://localhost:8088/customers")
                .then(response => response.json())
                .then((customersArray) => {
                    setCustomers(customersArray)
                })
        },
        []
    )
   

    // If an employee, sort products by name 
    useEffect(
        () => {

            const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name))
            setSortedProducts(sortedProducts)

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
    
    const savePurchase = (product) => {

        // need to find customerId (customer with matching userId)
        const matchingCustomer = customers.find((customer) => {
            return customer.userId === kandyUserObject.id;
          })          
        const matchingCustomerId = matchingCustomer.id
        
 
        // set the purchase object
        const purchaseObjectToSend = {
            customerId: matchingCustomerId,
            locationInventoryId: product?.locationInventories[0]?.id,
            purchaseQuantity: 1,
            productId: product.id
        }

        setNewPurchase(purchaseObjectToSend)
                                        
    }


    
    useEffect(
    () => {
        if(newPurchase.customerId!==0) {
        fetch("http://localhost:8088/purchases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        })
    }
    },
    [newPurchase]
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
                    <h2 className="product__header">Products List</h2>

                    <button className="btn_topPriced" onClick={() => { setTopPriced(true) }}>Top Priced</button>

                    <button className="btn_createNewProduct" onClick={() => navigate("/product/create")}>Add a New Product</button>

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

                    <ul className="products">
                        {
                            sortedProducts.map(
                                (product) => {

                                    return <li className="product" key={`product--${product.id}`}>
                                        {product.name}-- ${product.price}

                                        <button
                                            onClick={()=> {savePurchase(product)}}
                                                
                                            className="btn btn-purchase"
                                        >Purchase</button>
                                    </li>

                                }
                            )
                        }
                    </ul></>
        }

    </>

}
