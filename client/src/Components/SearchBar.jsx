import { Search } from 'lucide-react'
export default function SearchBar() {

    return (
        <div className=' items-center md:w-3/4 w-full flex justify-center gap-2 defaultFont'>
            <input type="text" placeholder="Search" className='border border-groove-red rounded w-full md:w-3/4 h-10 p-1' />
            <Search className='bg-groove-red text-white size-10 rounded p-1' />
        </div>
    )
}