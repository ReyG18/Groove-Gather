import { useEffect, useState } from "react"
export default function TopSongs() {
    const [apiData, setApiData] = useState()

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json')
            .then(res => res.json())
            .then(data => setApiData(data))
    }, [])
    console.log(apiData)

    return (
        <div className=" default-font md:h-full h-[80%] ">
            <p className="text-xl md:text-2xl text-center">Top songs today</p>
            <div className="h-1/2 md:h-3/4 flex flex-col gap-2 overflow-auto hideScrollbar">
                {apiData && apiData.data.map((content, index) => {
                    return <div key={index} className="flex flex-col gap-2">
                        <div key={index} className="flex items-center gap-2">
                            <p className="rounded w-9 text-center p-2 bg-groove-red text-white">{content.rank}</p>
                            <img src={content.image} alt={content.name} className="size-12" />
                            <div className="flex flex-col text-sm">
                                <p>{content.name}</p>
                                <p>{content.artist}</p>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-black/50"></div>
                    </div>
                })}
            </div>
        </div>
    )
}