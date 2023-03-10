export type User = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  band: string;
  address: string;
  city: string;
  province: string;
  courses: Course[]?;
  role: Role;
};
