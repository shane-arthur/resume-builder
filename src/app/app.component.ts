import { Component, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'resume-builder';

  ngAfterViewInit(){
    //const filename  = 'ThisIsYourPDFFilename.pdf';

		html2canvas(document.body, 
								{scale: 1, allowTaint: true,  useCORS: true}
						 ).then(canvas => {
               document.body.appendChild(canvas);
			// let pdf = new jsPDF('p', 'mm', 'a4');
			// pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
			// pdf.save(filename);
		});
  }

}
