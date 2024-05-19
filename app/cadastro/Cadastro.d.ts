interface UserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Error {
  message: string[];
  statusCode: number;
}
