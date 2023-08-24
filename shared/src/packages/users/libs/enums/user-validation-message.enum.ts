const UserValidationMessage = {
  EMAIL_REQUIRE: 'This field is required',
  EMAIL_WRONG: 'Please, enter a correct email',
  PASSWORD_REQUIRE: 'This field is required',
  PASSWORD_LENGTH: 'Your password must be at 4-20 characters long',
} as const;

export { UserValidationMessage };
