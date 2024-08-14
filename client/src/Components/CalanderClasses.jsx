import PropTypes from 'prop-types';

const CustomEvent = ({ event }) => {
  const handleSignUp = () => {
    alert(`Signed up for ${event.title}`);
  };

  return (
    <div className="p-2 bg-red-700 text-white rounded-sm text-xs flex flex-col items-center justify-center">
      <strong className="text-sm">{event.title}</strong>
      <div className="mt-1">
        <p className="m-0 text-xs">{event.duration}</p>
        <p className="m-0 text-xs">{event.location}</p>
      </div>
      <button 
        onClick={handleSignUp}
        className="mt-2 bg-white text-red-700 border-none rounded-sm px-2 py-1 text-xs"
      >
        Sign Up
      </button>
    </div>
  );
};

CustomEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default CustomEvent;
