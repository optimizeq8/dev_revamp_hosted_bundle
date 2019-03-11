const validation = {
  email: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address"
    },
    email: {
      message: "^Please enter a valid email address"
    }
  },
  password: {
    presence: { allowEmpty: false },
    length: {
      minimum: 8,
      message: "must be at least 8 characters long."
    }
  },
  name: {
    presence: { allowEmpty: false }
  }
};

export default validation;
