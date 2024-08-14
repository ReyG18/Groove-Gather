// takes props:
// {
//  type: String,
//  confirm: Boolean,
//  welcome: String,
// redirect: String,
// redirectType: String
// }
import { Link, useNavigate } from "react-router-dom"
import LoginAndSignupHeader from "./LoginAndSignupHeader"
import { useState } from "react"
import { ApolloError, useMutation } from '@apollo/client'
import { LOGIN_USER, ADD_USER } from "../utils/mutations"
import Auth from '../utils/auth'

export default function AccountActionBox(props) {
    const navigate = useNavigate()
    const [username, setUsername] = useState() // username is a required field for sign up
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [verifyPassword, setVerifyPassword] = useState()
    const [alert, setAlert] = useState('hidden')
    const [alertType, setAlertType] = useState()

    // Mutations for login and signup
    const [loginUser] = useMutation(LOGIN_USER);
    const [addUser] = useMutation(ADD_USER);

    let hideConfirmPass
    let linkSwitch
    if (props.confirm === false) {
        hideConfirmPass = "w-full hidden"
        linkSwitch = '/signup'
    } else {
        hideConfirmPass = "w-full flex flex-col"
        linkSwitch = '/'
    }

    function handleUsernameChange(evt) {
        setUsername(evt.target.value)
    }
    function handleEmailChange(evt) {
        setEmail(evt.target.value)
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value)
        setAlert('hidden')
    }

    function handleVerifyPasswordChange(evt) {
        setVerifyPassword(evt.target.value)
        setAlert('hidden')
    }

    function setAlerts(alertType, alertClass) {
        setAlertType(alertType)
        setAlert(alertClass)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (props.type === 'Login') {
            try {
                const { data, errors } = await loginUser({
                    variables: { email, password },
                    errorPolicy: 'all'
                });
                if (data.login === null) {
                    setAlerts(errors[0].message, "inline text-groove-red")
                }
                console.log(errors)
                Auth.login(data.login.token);
                navigate('/homepage')
            } catch (err) {
                console.error(err)
            }
        };

        if (props.type === "Sign Up") {
            if (password !== verifyPassword) {
                return setAlerts("Passwords do not match", "inline text-groove-red")
            }
            try {
                const { data, errors } = await addUser({
                    variables: { username, email, password },
                    errorPolicy: 'all'
                })
                if (data.addUser === null) {
                    console.log(errors[0].message)
                    setAlerts(errors[0].message, "inline text-groove-red")
                }
                alert('Account creation successful!')
                Auth.login(data.addUser.token);
                navigate('/login')
            } catch (err) {
                console.error(err)
            }
        }
    }


    return (
        <div className="w-full h-svh overflow-hidden defaultFont">
            <LoginAndSignupHeader />
            <div className="w-full h-full flex justify-center flex-col items-center gap-5 default-font">
                <h1 className="text-3xl ">{props.welcome}</h1>
                <p className="text-gray-500">Flow, Swing, Jazz, Groove Gather.</p>
                <div className=" lg:w-1/2 flex w-3/4 flex-col gap-5 p-4 items-center">
                    {/* This makes the username field only visible on the sign up screen */}
                    {props.type === "Sign Up" && (
                        <div className="w-full">
                            <h1 className="text-lg">Username</h1>
                            <input type="text" className="border border-groove-red rounded w-full p-2" placeholder="username" onChange={handleUsernameChange} />
                        </div>
                    )}
                    <div className="w-full">
                        <h1 className="text-lg">Email</h1>
                        <input type="text" className="border border-groove-red rounded w-full p-2" placeholder="you@email.com" onChange={handleEmailChange} />
                    </div>
                    <div className="w-full">
                        <h1 className="text-lg">Password</h1>
                        <input type="password" className="border border-groove-red rounded w-full p-2" placeholder="Password" onChange={handlePasswordChange} />
                    </div>
                    <div className={hideConfirmPass}>
                        <h1 className="text-lg">Confirm Password</h1>
                        <input type="password" placeholder="Confirm password" className="border border-groove-red rounded w-full p-2" onChange={handleVerifyPasswordChange} />
                    </div>
                    <div className={alert}>{alertType}</div>
                    <button className="bg-groove-red text-white p-2 text-xl w-full rounded hover:bg-groove-red-hover active:bg-groove-red-active" onClick={handleSubmit}>{props.type}</button>
                    <div className="flex text-sm gap-1 lg:text-md" >
                        <p>{props.redirect}</p><Link to={linkSwitch} className="text-blue-600 cursor-pointer hover:underline">{props.redirectType}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}