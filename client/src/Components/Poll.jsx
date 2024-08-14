import PropTypes from 'prop-types';

export default function Poll({ selectedFestival, setSelectedFestival, handleVote, voteMessage }) {
    const festivals = ["EDC", "Tomorrowland", "Coachella", "Lollapalooza"];

    return (
        <div className='mx-6 mt-6 p-4 border rounded border-gray-300'>
            <h2 className='text-lg font-bold mb-4'>Which festival are you going to next?</h2>
            <div className='flex flex-col gap-2'>
                {festivals.map(festival => (
                    <label key={festival} className='flex items-center'>
                        <input
                            type='radio'
                            name='festival'
                            value={festival}
                            checked={selectedFestival === festival}
                            onChange={() => setSelectedFestival(festival)}
                            className='mr-2'
                        />
                        <span>{festival}</span>
                    </label>
                ))}
                <button
                    className='mt-4 text-white bg-groove-red rounded-full px-4 py-2'
                    onClick={handleVote}
                >
                    Vote
                </button>
                {voteMessage && (
                    <div className='mt-2 p-2 bg-gray-800 text-white rounded'>
                        {voteMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

Poll.propTypes = {
    selectedFestival: PropTypes.string.isRequired,
    setSelectedFestival: PropTypes.func.isRequired,
    handleVote: PropTypes.func.isRequired,
    voteMessage: PropTypes.string,
};
