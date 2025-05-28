const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// valid input form data
export const validFormData = {
  fullName: "Birkin Aspin",
  companyName: "Pedigree Philippines",
  phone: "09123456789",
  email: "birkin@gmail.com",
  businessType: "Cafe/Bakery",
  numOfStores: "5",
  location: "NCR",
  city: "Pasig City",
  existingPOS: "Yes",
  whenCall: tomorrow.toISOString().split("T")[0], // format: YYYY-MM-DD
  message: "I am interested in KwikPOS for my small business.",
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
