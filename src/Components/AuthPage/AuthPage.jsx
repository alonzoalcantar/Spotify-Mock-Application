import LogInForm from "../LogInForm/LogInForm"
import SignUpForm from "../SignUpForm/SignUpForm"

export default function AuthPage({setUser}) {
    return(
        <div>
        <h1>AuthPage</h1>


        <div>
            <SignUpForm
            setUser = {setUser}/>
        </div>

        <div>
            <LogInForm
            setUser={setUser}/>
        </div>

        </div>
    )
}