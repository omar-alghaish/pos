// src/utils/shareUtils.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const sharePDF = <T>(data: T[], columns: any, message: string) => {
  const pdfFile = new jsPDF({ orientation: "landscape" });

  autoTable(pdfFile, {
    head: [columns.map((col: { title: any }) => col.title || "")],
    body: data.map((item) =>
      columns.map(
        (col: { dataIndex: keyof T }) => item[col.dataIndex as keyof T]
      )
    ),
    styles: { fontSize: 8 },
    columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: "auto" } },
    margin: { top: 20, right: 10, left: 10 },
    pageBreak: 'auto',
  });

  const pdfBlob = pdfFile.output("blob");

  if (navigator.share) {
    const file = new File([pdfBlob], "selected-items.pdf", { type: "application/pdf" });
    navigator.share({
      title: "Selected Items",
      text: message,
      files: [file],
    }).catch(console.error);
  } else {
    alert("Sharing not supported on this browser.");
  }
};
