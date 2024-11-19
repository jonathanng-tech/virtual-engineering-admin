import { Field, ErrorMessage } from 'formik';
interface FieldInputProps {
  name: string;
  type?: string;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  placeholder: string;
  validateField?: (value: string) => string | undefined;
}

export function FieldInput({
  name,
  errors,
  type,
  touched,
  placeholder,
  validateField,
}: FieldInputProps): JSX.Element {
  return (
    <div>
      <Field
        type={type ?? 'text'}
        name={name}
        placeholder={placeholder}
        className="inputField"
        validate={validateField}
      />
      {errors[name] && touched[name] ? (
        <div
          className="error-message"
          style={{ color: 'red', fontSize: '10px', fontWeight: '500' }}
        >
          {errors[name]}
        </div>
      ) : null}
    </div>
  );
}
