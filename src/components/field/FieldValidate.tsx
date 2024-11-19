export function validateEmail(value: string): string | undefined {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export function required(value: string): string | undefined {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}
