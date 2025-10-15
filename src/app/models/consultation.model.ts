export interface ConsultationModel{ 
    ConsultId: number,
patientId: number;
  doctorId: number;
  frontDeskId: number;
  currentStatus: string;
  diognosis: string;
  problem: string;
  advice: string;
  revisitDate: string;  // ISO string e.g. '2025-10-10T00:00:00'
  fee: number;
}