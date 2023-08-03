import { Component, AfterViewInit } from "@angular/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "resume-builder";

  ngAfterViewInit() {
    const filename = "shane-arthur-jan-2023.pdf";

    const pdf = new jsPDF("l", "in", [2000, 1600]);

    const image = new Image();
    image.src = "/assets/images/shane.jpg";

    image.onload = () => {
      html2canvas(document.getElementById("firstPage"), {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        html2canvas(document.getElementById("secondPage"), {
          scale: 2,
          allowTaint: true,
          useCORS: true,
        }).then((canvas) => {
          var context = canvas.getContext("2d");
          context.fillStyle = "#FFFFFF";
          const imgData2 = canvas.toDataURL("image/png");
          const imgProps = pdf.getImageProperties(imgData2);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addPage();
          pdf.setPage(2);
          pdf.addImage(imgData2, "PNG", 0, 0, pdfWidth, pdfHeight);
          html2canvas(document.getElementById("thirdPage"), {
            scale: 2,
            allowTaint: true,
            useCORS: true,
          }).then((canvas) => {
            var context = canvas.getContext("2d");
            context.fillStyle = "#FFFFFF";
            const imgData3 = canvas.toDataURL("image/png");
            const imgProps = pdf.getImageProperties(imgData3);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addPage();
            pdf.setPage(3);
            pdf.addImage(imgData3, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(filename);
          });
        });
      });
    };
  }
}
