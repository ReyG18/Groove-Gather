import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Calendar from "./pages/Calendar.jsx";
import GrooveResult from './pages/GrooveResult.jsx'
import CassieClasses from "./pages/CassieClasses.jsx";
import './index.css'
import Homepage from "./pages/Homepage.jsx";
import { setContext } from '@apollo/client/link/context'

//initialize Apollo Client
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/calendar",
    element: <Calendar />
  },
  {
    path: "/homepage",
    element: <Homepage />
  },
  {
    path: "/grooveResult",
    element: <GrooveResult />
  },
  {
    path: "/cassiesclasses",
    element: <CassieClasses />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
