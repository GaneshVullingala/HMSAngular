import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription',
  imports: [CommonModule],
  templateUrl: './prescription.html',
  styleUrls: ['./prescription.css']
})
export class PrescriptionComponent {
  @Input() medicinelist: any[] = []; // Pr
   @Input() consultationData: any;   // Con   sultation info from parent
  @Input() elementId: string = 'consultationPdfSection'; // container ID

  downloadPdf(){
    const DATA: any = document.getElementById(this.elementId);
    html2canvas(DATA).then(canvas => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('consultation-report.pdf');
    });
  }
}
