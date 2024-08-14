const { AuthenticationError } = require("apollo-server-errors");
const { User, Class, Teacher } = require("../models");
const { signToken } = require("../utils/auth");
const pwSchema = require("../utils/pwValidator");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError("Not logged in");
    },
    user: async (parent, { id }) => {
      return User.findById(id);
    },
    searchTeachers: async (parent, { keyword }) => {
      if (!keyword) {
        return [];
      }
      const regex = new RegExp(keyword, "i");
      return Teacher.find({
        $or: [
          { name: regex },
          { grooves: regex }, 
        ],
      });
    },
    teacherByGroove: async (parent, { grooves }) => {
      if (!grooves) {
        return [];
      }
      console.log(grooves);

      return Teacher.find({
        grooves: { $in: grooves },
      });
    },
    teachers: async () => {
      return Teacher.find().populate("classes");
    },
    teacher: async (parent, { id }) => {
      return Teacher.findById(id).populate("classes");
    },
    classes: async () => {
      const result = Class.find().populate("instructor");
      console.log(result);
      return result;
    },
    class: async (parent, { id }) => {
      return Class.findById(id).populate("instructor");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        if (!pwSchema.validate(password)) {
          const failedList = pwSchema.validate(password, { list: true });
          let message = '';

          if (failedList.includes('min') || failedList.includes('max')) {
            message = 'Password must be between 8 and 100 characters long'
          } else if (failedList.includes('digits')) {
            message = 'Password must include at least 1 digit'
          } else if (failedList.includes('spaces')) {
            message = 'Password must not include spaces'
          } else if (failedList.includes('uppercase') || failedList.includes('lowercase')) {
            message = 'Password must include both uppercase and lowercase letters'
          } else if (failedList.includes('oneOf')) {
            message = 'Passw0rd and Password123 are not allowed'
          } else if (failedList) {
            'Password must be at least 8 characters long, include at least 1 digit, both uppercase and lowercase letters, and with no spaces. Passw0rd and Password123 are not allowed.'
          }

          throw new AuthenticationError(message);
        }

        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };

      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUserProfile: async (
      parent,
      { firstName, lastName, bio },
      context
    ) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { firstName, lastName, bio },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },
    addTeacher: async (
      parent,
      { name, nextFestival, bio, grooves, experience }
    ) => {
      const teacher = new Teacher({
        name,
        nextFestival,
        bio,
        grooves,
        experience,
      });
      return teacher.save();
    },
    updateTeacher: async (
      parent,
      { id, name, nextFestival, bio, grooves, experience }
    ) => {
      return Teacher.findByIdAndUpdate(
        id,
        { name, nextFestival, bio, grooves, experience },
        { new: true }
      );
    },
    removeTeacher: async (parent, { id }) => {
      return Teacher.findByIdAndDelete(id);
    },
    addClass: async (
      parent,
      { name, grooves, instructor, schedule, duration, location }
    ) => {
      const newClass = new Class({
        name,
        instructor,
        schedule,
        duration,
        location,
      });
      return newClass.save();
    },
    updateClass: async (
      parent,
      { id, name, grooves, instructor, schedule, duration, location }
    ) => {
      return Class.findByIdAndUpdate(
        id,
        { name, grooves, instructor, schedule, duration, location },
        { new: true }
      );
    },
    removeClass: async (parent, { id }) => {
      return Class.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
