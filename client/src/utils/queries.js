import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      firstName
      lastName
      bio
    }
  }
`;

export const GET_TEACHERS = gql`
  query GetTeachers {
    teachers {
      _id
      name
    }
  }
`;

export const GET_TEACHER_BY_ID = gql`
  query GetTeacherById($id: ID!) {
    teacher(id: $id) {
      _id
      name
      nextfestival
      grooves
      experience
    }
  }
`;

export const GET_TEACHER_BY_GROOVE = gql`
  query teacherByGroove($grooves: [String]!) {
    teacherByGroove(grooves: $grooves) {
      _id
      name
      nextfestival
      bio
      grooves
      experience
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;
export const GET_CLASSES = gql`
  query GetClasses {
    classes {
      _id
      name
      instructor {
        name
      }
      schedule {
        day
        time
      }
      duration
      location
    }
  }
`;
export const GET_CASSIECLASSES = gql`
  query GetClasses {
    classes {
      name
      instructor {
        name
      }
      schedule {
        day
        time
      }
      duration
      location
    }
  }
`;

export const GET_TEACHER_BY_NAME = gql`
  query GetTeacherByName($name: String!) {
    teacherByName(name: $name) {
      _id
      name
      nextfestival
      bio
      grooves
      experience
    }
  }
`;
export const SEARCH_TEACHERS = gql`
  query SearchTeachers($keyword: String!) {
    searchTeachers(keyword: $keyword) {
      _id
      name
      nextfestival
      bio
      grooves
      experience
    }
  }
`;
