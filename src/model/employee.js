const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");
const employee = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      permanent: {
        houseNo: {
          type: String,
          required: true,
        },
        landmark: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
      current: {
        houseNo: {
          type: String,
          required: true,
        },
        landmark: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
    },
    officialData: {
      designation: {
        type: String,
        required: true,
      },
      joiningDate: {
        type: String,
        required: true,
      },
      workExperience: {
        type: String,
        required: true,
      },
    },
    dob: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    emergencyContact: {
      name: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
    },
    bloodGroup: {
      type: String,
    },
    socialMedia: {
      instagram: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkdin: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
    },
    bankDetails: {
      beneficiaryName: {
        type: String,
      },
      bank: {
        type: String,
      },
      IFSC: {
        type: String,
      },
      accountNumber: {
        type: String,
      },
    },
    documents: {
      aadhar: {
        type: String,
      },
      pan: {
        type: String,
      },
    },
  },
  { timespan: true }
);
module.exports = mongoose.model("Employee", employee);
