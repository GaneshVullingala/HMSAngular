export interface UpdateConsultationModel{
    consultId: number;
    PatientId: number;
    DoctorId: number;
    FrontDeskId: number;
    CurrentStatus: string;
    diognosis: string;
    problem: string;
    advice: string;
    revisitDate: string;  // ISO string e.g. '2025-10-10T00:00:00'
}