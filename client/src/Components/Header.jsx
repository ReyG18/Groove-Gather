import { Link } from 'react-router-dom'
import ProfilePicture from '../assets/profile.jpg'
import Auth from '../utils/auth';

export default function Header() {
    const handleLogout = () => {
        Auth.logout();
    };

    return (
        <div className='flex justify-end items-center p-2 md:p-4 text-groove-red  w-full'>
            <div className="text-center w-full absolute">
                <Link to={'/homepage'}><p className="logo-font text-2xl md:text-4xl text-center">Groove Gather</p></Link>
            </div>
            <div className='flex items-center justify-center gap-1 md:gap-4 cursor-pointer'>
                <Link to={'/profile'} className='border-groove-red border flex items-center justify-center rounded-full size-12 md:size-16'>
                    <img src={ProfilePicture} alt="profile" className=' w-10 md:w-14 rounded-full relative' />
                </Link>
                <button className='text-xl' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}