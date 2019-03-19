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
  duration: {
    numericality: {
      greaterThanOrEqualTo: 15000,
      message: "^Video must be longer than 15 seconds"
    }
  },
  video: {
    presence: {
      allowEmpty: false,
      message: "^Please upload a video"
    }
  },
  website: {
    format: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    presence: { allowEmpty: false }
  },
  deepLink: {
    format: {
      pattern: /^((?!https|http))([a-z]{2,5}\.\w*)?\w*:\/\/=?([a-z0-9]+([\-\.])?[a-z0-9]+)*(\??[a-z]*\=?[a-z0-9]+)(\.[a-z]{2,5})*(:[0-9]{1,5})?(\/.*)?$/,
      message:
        "^Invalid deep link url. A few format examples: my-app://your_url_here or my-app://?content="
    },
    presence: { allowEmpty: false }
  }
};

export default validation;
