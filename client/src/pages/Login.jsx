import LoginCarousel from "../Components/LoginCarousel"
import AccountActionBox from "../Components/AccountActionBox"

export default function Login() {

    return (
        <div className="flex items-center default-font">
            <LoginCarousel />
            <AccountActionBox type="Login" confirm={false} welcome="Welcome Back!" redirect="Don't have an account?" redirectType="Sign Up" />
        </div>
    )
}