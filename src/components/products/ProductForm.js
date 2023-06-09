/* Create a form for creating new product. 
Only available to employees.
Form should include: product name, product type, and price.
Then send the data to our permanent database with a POST request
*/

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"

//Export and define function to handle HTML, fetching, and POST request for ticket form
export const ProductForm = () => {

    // Establish initial state object with default properties for form
    const [product, setNewProduct] = useState({
        name: "",
        type: 0,
        price: 0
    })
    const [types, setTypes] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:8088/types`)
        .then(response=>response.json())
        .then((typesArray)=> {
            setTypes(typesArray)}
        )
    },
    [])


    // Add the useNavigate hook
    const navigate = useNavigate()

    // Define click event for submitting the form
    const handleSaveButtonClick = (event) => {
        // Prevent the browser from executing the default action
        event.preventDefault()

        // Create object to be saved to the API
        const saveNewProduct =
        {
            name: product.name,
            typeId: product.type,
            price: product.price
        }


        // POST the object to the API
        return fetch("http://localhost:8088/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveNewProduct)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })

    }
    // Return the HTML for the form and button

    return (
        <form className="productForm">
            <h2 className="productForm__title">Create New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Popular name of the candy"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                setNewProduct(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="10000"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = JSON.parse(evt.target.value)
                                setNewProduct(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select value={product.type}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.type = JSON.parse(evt.target.value)
                                setNewProduct(copy)
                            }
                        } >
                        <option value="0">Select type</option>
                        {types.map((type) =>
                        <option value={type.id}>{type.type}</option>
                        )}
                        
                    </select>
                </div>
            </fieldset>

            {<button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-submitProduct">
                Submit Product
            </button>}
        </form>
    )
}

