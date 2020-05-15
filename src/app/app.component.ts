import { Component, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'resume-builder';

  ngAfterViewInit() {
    const filename = 'shane-arthur-may-2020.pdf';

    const pdf = new jsPDF('l', 'in', [2000, 1500]);
    html2canvas(document.getElementById('firstPage'),
      { scale: 2, allowTaint: true, imageTimeout: 0, useCORS: true }
    ).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      html2canvas(document.getElementById('secondPage'),
        { scale: 1, allowTaint: true, imageTimeout: 0, useCORS: true }
      ).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addPage();
        pdf.setPage(2);
        pdf.addImage(imgData, 'PNG', 0, 1, pdfWidth, pdfHeight);
        pdf.save(filename);
      });

    });

  }

}
