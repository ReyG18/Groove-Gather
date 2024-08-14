import CalendarPreview from "../Components/CalendarPreview";
import Grooves from "../Components/Grooves";
import Header from "../Components/Header";
import TopSongs from "../Components/TopSongs";


export default function Homepage() {
    return (
        <div className="flex-col flex">
            <Header />
            <div className="h-svh flex flex-col md:flex-row gap-4 px-2">
                <div className="flex flex-col gap-2 h-full">
                    <CalendarPreview />
                    <TopSongs />
                </div>
                <Grooves />
            </div>
        </div>
    );
}
