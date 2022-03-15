const {
  ServerErrorResponse,
  FailedResponse,
  OkResponse,
} = require("../helper/response");
const employee = require("../model/employee");

module.exports = {
  createEmployee: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        mobile,
        email,
        image,
        gender,
        isActive,

        permanentHouseNo,
        permanentLandmark,
        permanentPincode,
        permanentCity,
        permanentState,
        currentHouseNo,
        currentLandmark,
        currentPincode,
        currentCity,
        currentState,
        designation,
        joiningDate,
        workExperience,
        dob,
        fatherName,
        motherName,
        emergencyContactName,
        emergencyContactRelation,
        emergencyContactMobile,
        bloodGroup,
        instagram,
        facebook,
        linkdin,
        twitter,
        aadharNumber,
        beneficiaryName,
        bank,
        IFSC,
        accountNumber,
        aadharCopy,
        panCopy,
      } = req.body;
      const empCount = await employee.find().count();
      const city = req.decode.city.substring(0, 3).toUpperCase();
      console.log(empCount, city, "checking city");

      const response = new employee({
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        image: image,
        gender: gender,
        isActive: isActive,
        city: req.decode.city,
        employeeId: city + (1000 + empCount),
        address: {
          permanent: {
            houseNo: permanentHouseNo,
            landmark: permanentLandmark,
            pincode: permanentPincode,
            city: permanentCity,
            state: permanentState,
          },
          current: {
            houseNo: currentHouseNo,
            landmark: currentLandmark,
            pincode: currentPincode,
            city: currentCity,
            state: currentState,
          },
        },
        officialData: {
          designation: designation,
          joiningDate: joiningDate,
          workExperience: workExperience,
        },
        dob: dob,
        fatherName: fatherName,
        motherName: motherName,
        emergencyContact: {
          name: emergencyContactName,
          relation: emergencyContactRelation,
          mobile: emergencyContactMobile,
        },
        bloodGroup: bloodGroup,
        socialMedia: {
          instagram: instagram,
          facebook: facebook,
          linkdin: linkdin,
          twitter: twitter,
        },
        aadharNumber: aadharNumber,
        bankDetails: {
          beneficiaryName: beneficiaryName,
          bank: bank,
          IFSC: IFSC,
          accountNumber: accountNumber,
        },
        documents: {
          aadhar: aadharCopy,
          pan: panCopy,
        },
      });
      response.save((err, result) => {
        if (err) {
          FailedResponse(res, err, "data could not saved");
        }
        if (result) {
          OkResponse(res, result, "data saved successfully");
        }
      });
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  getEmployee: async (req, res) => {
    try {
      const { searchKey } = req.body;
      let newSearchKey = searchKey != null ? searchKey : "";
      const response = await employee.find({
        employeeId: { $regex: newSearchKey.toUpperCase().trim() },
      });
      if (response) {
        OkResponse(res, response, "data found successfully");
      } else {
        {
          FailedResponse(res, response, "data could not found");
        }
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        mobile,
        email,
        image,
        employeeId,
        gender,
        isActive,

        permanentHouseNo,
        permanentLandmark,
        permanentPincode,
        permanentCity,
        permanentState,
        currentHouseNo,
        currentLandmark,
        currentPincode,
        currentCity,
        currentState,
        designation,
        joiningDate,
        workExperience,
        dob,
        fatherName,
        motherName,
        emergencyContactName,
        emergencyContactRelation,
        emergencyContactMobile,
        bloodGroup,
        instagram,
        facebook,
        linkdin,
        twitter,
        aadharNumber,
        beneficiaryName,
        bank,
        IFSC,
        accountNumber,
        aadharCopy,
        panCopy,
      } = req.body;
      console.log(employeeId.toUpperCase().trim(), "djdfghfgygfyrgf");
      const response = await employee.updateOne(
        { employeeId: employeeId.toUpperCase().trim() },
        {
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          email: email,
          image: image,
          gender: gender,
          isActive: isActive,
          address: {
            permanent: {
              houseNo: permanentHouseNo,
              landmark: permanentLandmark,
              pincode: permanentPincode,
              city: permanentCity,
              state: permanentState,
            },
            current: {
              houseNo: currentHouseNo,
              landmark: currentLandmark,
              pincode: currentPincode,
              city: currentCity,
              state: currentState,
            },
          },
          officialData: {
            designation: designation,
            joiningDate: joiningDate,
            workExperience: workExperience,
          },
          dob: dob,
          fatherName: fatherName,
          motherName: motherName,
          emergencyContact: {
            name: emergencyContactName,
            relation: emergencyContactRelation,
            mobile: emergencyContactMobile,
          },
          bloodGroup: bloodGroup,
          socialMedia: {
            instagram: instagram,
            facebook: facebook,
            linkdin: linkdin,
            twitter: twitter,
          },
          aadharNumber: aadharNumber,
          bankDetails: {
            beneficiaryName: beneficiaryName,
            bank: bank,
            IFSC: IFSC,
            accountNumber: accountNumber,
          },
          documents: {
            aadhar: aadharCopy,
            pan: panCopy,
          },
        }
      );
      if (response.modifiedCount > 0) {
        OkResponse(res, response, "data updated successfully");
      } else {
        FailedResponse(res, response, "data could not updated ");
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const { employeeId } = req.body;
      const response = await employee.deleteOne({
        employeeId: employeeId.toUpperCase().trim(),
      });
      if (response.deletedCount > 0) {
        OkResponse(res, response, "data deleted successfully");
      } else {
        FailedResponse(res, response, "data deleted successfully");
      }
    } catch (error) {
      /* handle error */
      console.log(error);
      return ServerErrorResponse(res, error);
    }
  },
};
