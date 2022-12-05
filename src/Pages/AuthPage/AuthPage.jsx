import SignUpForm from "../../Components/SignUpForm/SignUpForm"

export default function AuthPage({setUser}) {
    return(
        <div>
        <h1>AuthPage</h1>


        <div>
            <SignUpForm
            setUser = {setUser}/>
        </div>

        </div>
    )
}