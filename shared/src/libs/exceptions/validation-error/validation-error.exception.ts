import { ValidationError as JoiValidationError } from 'joi';

class ValidationError extends JoiValidationError {}

export { ValidationError };
