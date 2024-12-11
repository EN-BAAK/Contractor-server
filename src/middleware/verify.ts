export const login = {
  mobileNumber: {
    notEmpty: {
      errorMessage: "mobile number is required",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "The password is required",
    },
  },
};

export const addNewUser = {
  mobileNumber: {
    notEmpty: {
      errorMessage: "mobile number is required",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "The password is required",
    },
  },
  role: {
    notEmpty: {
      errorMessage: "The role is required",
    },
  },
  fullName: {
    notEmpty: {
      errorMessage: "full name is required",
    },
    isString: {
      errorMessage: "full name must be a string",
    },
  },
};

export const addRenew = {
  name: {
    notEmpty: {
      errorMessage: "name is required",
    },
    isString: {
      errorMessage: "name must be a string",
    },
  },
  companyName: {
    notEmpty: {
      errorMessage: "companyName is required",
    },
    isString: {
      errorMessage: "companyName must be a string",
    },
  },
  phone: {
    notEmpty: {
      errorMessage: "mobile number is required",
    },
  },
  city: {
    notEmpty: {
      errorMessage: "companyName is required",
    },
    isString: {
      errorMessage: "companyName must be a string",
    },
  },
  location: {
    notEmpty: {
      errorMessage: "location is required",
    },
    isString: {
      errorMessage: "location must be a string",
    },
  },
};
