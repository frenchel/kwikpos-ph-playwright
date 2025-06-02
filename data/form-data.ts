const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// valid input form data
export const validFormData = {
  fullName: "Kyla Villanueva",
  companyName: "Facessentials Clinic",
  phone: "09123456789",
  email: "kylavillanueva@facessentials.com",
  businessType: "Pharmacy",
  numOfStores: "1",
  location: "NCR",
  city: "Caloocan City",
  existingPOS: "No",
  whenCall: tomorrow.toISOString().split("T")[0], // format: YYYY-MM-DD
  message: "POS device for beauty products",
};

// invalid names
export const invalidNames = {
  ...validFormData,
  fullName: "123!@#?.,",
  companyName: ",./<>?;",
};

// invalid phone number
export const invalidPhone = {
  ...validFormData,
  phone: "911",
};

// invalid email
export const invalidEmail = {
  ...validFormData,
  email: "no-email-available",
};

// missing required fields
export const missingRequiredFields = {
  fullName: "",
  phone: "",
  email: "",
};
