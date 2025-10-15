export interface DoctorAllConsultationsModel{
    consultId: number;
    patientId: number;
    doctorId: number;
    frontDeskId: number;
    currentStatus: string;
    createdOn: string;
    fee: number;
}