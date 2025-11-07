export interface ConsultationModel{ 
    consultId: number,
patientGenId: number;
patientId: number;
patientName: string;
  doctorId: number;
  doctorName: string;
  frontDeskId: number;
  frontDeskName: string;
  currentStatus: string;
  gender: string;
  age: string;
  diognosis: string;
  problem: string;
  advice: string;
  revisitDate: string;  // ISO string e.g. '2025-10-10T00:00:00'
  fee: number;
  consultationCreatedOn: string; // ISO string e.g. '2025-10-10T00:00:00'
  presentProblem: string;
  previousHistory: string;
  bp: string;
  sugar: string;
  height: string;
  weight: string;
  spo2: string;
  temperature: string;
  bloodGroup: string;
  vitalsCreatedOn: string; // ISO string e.g. '2025-10-10T00:00:00'

}