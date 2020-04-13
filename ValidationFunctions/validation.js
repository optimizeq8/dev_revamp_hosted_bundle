const validation = {
  firstName: {
    length: {
      minimum: 3,
      message: "must be at least 3 characters long"
    }
  },
  lastName: {
    length: {
      minimum: 3,
      message: "must be at least 3 characters long"
    }
  },
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
      message: "must be at least 8 characters long"
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
    // url: {
    //   // schemes: ["ftp", "http", "https"],
    //   allowLocal: true
    // },
    // format: /^((https+|http+|ftp|smtp):\/\/)+(www.)?[a-z0-9]{1,63}\.[a-z]{2,}(\/?[a-zA-Z0-9#]+\/?)*$/i,
    format: /^((https+|http+|ftp|smtp):\/\/){0,1}(?!(www\.)?(snapchat\.?|instagram\.?|youtube\.?|youtu.be|facebook\.?|fb.me|whatsapp\.?|wa.me))[a-z0-9_-]{1,63}\.[a-z]{2,}(\/?[a-zA-Z0-9#]+(\.[a-z]{2,})*(\\?[?;&a-z\\d%_~+=-]*)?)*\/?$/i,
    presence: { allowEmpty: false }
  },
  url: {
    // Just to check if it's a valid website independent of social platforms
    format: /^((https+|http+|ftp|smtp):\/\/){0,1}(www.|m.)?\b[a-z0-9_-]{1,63}\.[a-z]{2,}(\/?[a-zA-Z0-9#]+(\.[a-z]{2,})*(\\?[?;&a-z\\d%_~+=-]*)?)*\/?$/i,
    presence: { allowEmpty: false }
  },
  deepLink: {
    format: {
      pattern: /^([a-z]+\.?\w*)+\w*:\/\/=?([a-z0-9]+([\-\.])?[a-z0-9]+)*(\w*\??[a-z]*\=?[a-z0-9]+)(\.[a-z]{2,5})*(:[0-9]{1,5})?(\/.*)?$/i,
      message:
        "^Invalid deep link url. A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://url.com'"
    },
    presence: { allowEmpty: false }
  },
  googleMapLink: {
    format: /^((https):\/\/)\b[a-z0-9]{1,63}\.[a-z]{2,}(\/?[a-zA-Z0-9#]+\/?(\.[a-z]{2,})*(\\?[?;&a-z\\d%_~+=-]*)?)*$/i
  },
  Budget: {
    numericality: {
      lessThanOrEqualTo: 9999999
    },
    presence: {
      allowEmpty: false
    }
  }
};

export default validation;
