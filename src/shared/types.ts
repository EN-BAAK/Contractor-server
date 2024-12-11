export type UserType = {
  id?: number;
  fullName: string;
  mobileNumber: string;
  password: string;
  role: string;
};

export type ReNewsType = {
  id?: number;
  name: string;
  companyName: string;
  phone: number;
  city: string;
  location: string;
  locationLink?: string;
  notes?: string;
};

export type ContractsType = {
  id?: number;
  name: string;
  companyName: string;
  phone: number;
  city: string;
  location: string;
  locationLink?: string;
  notes?: string;
  date: any;
  tester_id: number;
  done: "true" | "false";
  order?: number;
};
