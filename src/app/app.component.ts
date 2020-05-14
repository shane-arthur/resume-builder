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

  ngAfterViewInit(){
    const filename  = 'shane-arthur-may-2020.pdf';

		html2canvas(document.body, 
								{scale: 1, allowTaint: true,   imageTimeout:0,  useCORS: true}
						 ).then(canvas => {
               console.log(canvas);
               document.body.appendChild(canvas);
      let pdf = new jsPDF('l');
      const imgData = canvas.toDataURL('image/png');
      const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
			pdf.save(filename);
		});
  }

}
