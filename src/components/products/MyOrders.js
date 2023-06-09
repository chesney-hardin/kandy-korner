import { useEffect, useState } from "react"

export const MyOrders = () => {
    const [purchases, setPurchases] = useState([])
    const [customers, setCustomers] = useState([])
    const [orderedProducts, setOrderedProducts] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch("http://localhost:8088/purchases?_expand=product")
                .then(response => response.json())
                .then((purchasesArray) => {
                    setPurchases(purchasesArray)
                })

            fetch("http://localhost:8088/customers")
                .then(response => response.json())
                .then((customersArray) => {
                    setCustomers(customersArray)
                })
        },
        []
    )

    useEffect(
        () => {
            if (purchases.length !== 0) {
                const matchingCustomer = customers.find((customer) => {
                    return customer.userId === kandyUserObject.id;
                })
                const matchingCustomerId = matchingCustomer?.id

                const matchingPurchases = purchases.filter((purchase) => {
                    return purchase.customerId === matchingCustomerId;
                })
                setOrderedProducts(matchingPurchases)
            }

        },
        [purchases]
    )


    return <>
        <h2 className="order__header">Your Orders</h2>
        <ul className="orders">
            {
                orderedProducts.map(
                    (purchase) => {

                        return <li className="order">
                            {purchase?.product?.name}-- ${purchase?.product?.price}

                        </li>

                    }
                )
            }
        </ul>
    </>
}