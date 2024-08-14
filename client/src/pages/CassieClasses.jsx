import { useQuery } from "@apollo/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GET_CASSIECLASSES } from "../utils/queries";
import CustomEvent from "../Components/CalanderClasses";

const localizer = momentLocalizer(moment);

const CassieCalendar = () => {
  const { loading, error, data } = useQuery(GET_CASSIECLASSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) console.log(data);
  const classes = data.classes || [];

  const events = classes.map((classItem) => {
    const startDate = new Date(
      `${classItem.schedule.day}T${classItem.schedule.time}`
    );
    console.log(classItem.schedule.day, classItem.schedule.time);

    const [durationHours, durationMinutes] = classItem.duration
      .split(" ")
      .map((d, i) => (i === 0 ? parseInt(d) : parseInt(d) || 0));

    const endDate = new Date(
      startDate.getTime() +
        durationHours * 60 * 60 * 1000 +
        durationMinutes * 60 * 1000
    );

    return {
      title: `${classItem.name}, ${classItem.duration}, ${classItem.location}`,
      start: startDate,
      end: endDate,
      duration: classItem.duration,
    };
  });

  const eventStyleGetter = () => {
    const backgroundColor = '#800000'; // Red color for events
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
      padding: '2px 5px',
      fontSize: '0.8rem', // Adjust font size
    };
    return {
      style,
    };
  };

  console.log(events);

  return (
    <div>
      <h1 style={{ color: "maroon", textAlign: "center", fontSize: "36px", fontWeight: "bold" }}>
        Cassie Grooves
      </h1>
      <div style={{ height: "700px", width: "100%" }}> 
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }} 
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent
          }}
        />
      </div>
    </div>
  );
};

export default CassieCalendar;
