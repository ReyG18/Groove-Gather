import { Link } from "react-router-dom"
import DanceClass from '../assets/DanceClass.png'

export default function CalendarPreview() {

    return (
        <Link to={'/calendar'} className=" w-full h-3/4 md:h-1/4 defaultFont shadow-lg">
            <img src={DanceClass} alt="dance class" className="w-full rounded h-full object-cover hover:grayscale-50" />
        </Link>
    )
}