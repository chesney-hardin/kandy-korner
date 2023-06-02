/* Display a view with a text input field and 
a label that asks "What candy are you looking for?" 
*/
import "./FindCandy.css"

export const FindyCandy = ({ setterFunction }) => {
    return (
        <div className="findCandy">
            <label htmlFor="name">What candy are you looking for?</label>
            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" placeholder="Enter search terms" />
        </div>
    )
}