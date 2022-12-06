import { checkToken } from "../../utilities/users-service"

export default function profile() {
    
    
    async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
}
   
    

    return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={handleCheckToken}>Check When Log In Token Expires</button>
        </div>
    )
}