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
  mandatory: {
    presence: { allowEmpty: false }
  },
  age: {
    presence: { allowEmpty: false },
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 13,
      lessThanOrEqualTo: 90
    }
  },
  website: {
    url: { schemes: [".+"] },
    presence: { allowEmpty: false }
  }
};

export default validation;
