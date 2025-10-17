export interface ConsultationModel{ 
    ConsultId: number,
PatientGenId: number;
PatientId: number;
PatientName: string;
  doctorId: number;
  DoctorName: string;
  frontDeskId: number;
  FrontDeskName: string;
  CurrentStatus: string;
  Diognosis: string;
  Problem: string;
  Advice: string;
  RevisitDate: string;  // ISO string e.g. '2025-10-10T00:00:00'
  Fee: number;
  ConsultationCreatedOn: string; // ISO string e.g. '2025-10-10T00:00:00'
  PresentProblem: string;
  PreviousHistory: string;
  BP: string;
  Sugar: string;
  Height: string;
  Weight: string;
SPO2: string;
VitalsCreatedOn: string; // ISO string e.g. '2025-10-10T00:00:00'

}