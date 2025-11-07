import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class Pdfservice {
  constructor() { }
  generatePdf(elementId: string, fileName: string){
     const data = document.getElementById(elementId);
     if (!data) return;
      html2canvas(data, { scale: 2 }).then(canvas => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(fileName);
    });
  }
}
