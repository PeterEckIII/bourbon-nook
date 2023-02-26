type FormErrorProps = {
  errors?: string[];
};

export default function FormError({ errors }: FormErrorProps) {
  return (
    <div>
      {errors?.map((err) => (
        <p>{err}</p>
      ))}
    </div>
  );
}
