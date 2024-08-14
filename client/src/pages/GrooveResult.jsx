// reference https://ui.dev/react-router-pass-props-to-link
import Header from "../Components/Header";
import { useLocation} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TEACHER_BY_GROOVE } from "../utils/queries";
import { Link } from 'react-router-dom'

export default function GrooveResult() {
  const location = useLocation();
  const { from } = location.state;
  console.log(from);
  const { data, loading, error } = useQuery(GET_TEACHER_BY_GROOVE, {
    variables: { grooves: [from] },
  });
  console.log(data);
  const teachers = data?.teacherByGroove;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading teachers.</p>;

  return (
    <div className="defaultFont">
      <Header />
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4">
        {from} Teachers
      </h1>
      <div className="size-full gap-2 grid grid-rows-2 grid-cols-3">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-gray-200 p-4 rounded-md flex flex-col items-center justify-center shadow-lg"
          >
            <p className="font-bold text-lg">{teacher.name}</p>
            <p className="text-sm text-gray-600">
              {teacher.experience} years experience
            </p>
            <p className="text-sm text-gray-600">
              {teacher.bio} 
            </p>
            <p className="text-sm text-gray-600">
              {teacher.nextfestical} 
            </p>
            <div>
            <Link 
                to={`/Profile`} 
                className="mt-4 bg-maroon-500 text-white py-2 px-4 rounded hover:bg-maroon-700"
              >
                Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}