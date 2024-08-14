import AccountActionBox from "../Components/AccountActionBox";
import LoginCarousel from "../Components/LoginCarousel";

export default function Signup() {

    return (
        <div className="flex items-center default-font">
            <LoginCarousel />
            <AccountActionBox type="Sign Up" confirm={true} welcome="Join the Groove" redirect="Already have an account?" redirectType="Login" />
        </div>
    )
}