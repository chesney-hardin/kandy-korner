import { Link } from "react-router-dom"

export const Customer = ({id, fullName, email}) => {
    {
        return <section className="customer">
            <div>           
                <Link className="customer__link" to={`/customers/${id}`}>{fullName}</Link>
           </div>
            <div>Email: {email}</div>

        </section>
    }
}