export interface Doctor{
  doctorId: number;
  genId: number;
  generalInfo: string | null;
  fullName: string;
  phone: string;
  email: string;
  qualification: string;
  speciality: string;
  experience: number;
  photoImgUrl: string;
  docImgUrl: string;
  address: string;
  pincode: string;
  createdOn: string;
}