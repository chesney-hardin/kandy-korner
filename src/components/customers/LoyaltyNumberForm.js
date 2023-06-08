import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const LoyaltyNumberForm = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})
    const [newLoyaltyNumber, setLoyaltyNumber] = useState(0)

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        []
    )

    useEffect(
        () => {
            let copy = { ...customer }
        copy.loyaltyNumber = parseInt(newLoyaltyNumber)
        updateCustomer(copy)
        },
        [newLoyaltyNumber]
    )

    const updateButton = (evt) => {
        evt.preventDefault()

        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/customers")
            }) 

    }

    return <>
        <form className="loyaltyForm">
            <h2 className="loyaltyForm__title">Update Loyalty Number</h2>

            <div className="form-group">
                <label htmlFor="name">Loyalty Number:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder={customer?.loyaltyNumber}
                    value={newLoyaltyNumber}
                    onChange={
                        (evt) => {
                            setLoyaltyNumber(evt.target.value)

                        }
                    } />
            </div>

            <button
                onClick={updateButton}
            >Update</button>
        </form>
    </>
}