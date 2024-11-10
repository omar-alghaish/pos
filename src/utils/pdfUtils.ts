// // src/utils/pdfUtils.ts
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generatePDF = <T>(data: T[], columns: any) => {
//   const doc = new jsPDF({ orientation: "landscape" });
  
//   autoTable(doc, {
//     head: [columns.map((col: { title: any }) => col.title || "")],
//     body: data.map((item) =>
//       columns.map(
//         (col: { dataIndex: keyof T }) => item[col.dataIndex as keyof T]
//       )
//     ),
//     styles: { fontSize: 8 },
//     headStyles: { fillColor: [240, 240, 240],cellWidth:"wrap", textColor: 0, fontStyle: "bold" },
//     columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: "auto" } },
//     margin: { top: 20, right: 10, left: 10 },
//     // pageBreak: 'auto',
//   });

//   doc.save("selected-items.pdf");
// };


// // src/utils/pdfUtils.ts
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generatePDF = <T>(data: T[], columns: any, color:string) => {
//   // Calculate the custom width based on the number of columns
//   const columnWidth = 100; // Fixed width per column, adjust as needed
//   const customWidth = columns.length * columnWidth; // Width depends on number of columns
  
//   // Create a new jsPDF document with the calculated width
//   const doc = new jsPDF({
//     orientation: "landscape",
//     unit: "pt",
//     format: [customWidth, 595], // Width: custom, Height: standard A4 height in landscape
//   });

//   autoTable(doc, {
//     head: [columns.map((col: { title: any }) => col.title || "")],
//     body: data.map((item) =>
//       columns.map((col: { dataIndex: keyof T }) => item[col.dataIndex as keyof T] || "")
//     ),
//     styles: { fontSize: 8 },
//     headStyles: { fillColor:color, textColor: 0, fontStyle: "bold" },
//     columnStyles: { 0: { cellWidth: "wrap" } }, // Ensure cell width wraps to fit content
//     tableWidth: "auto", // Allow the table to use the full width of the custom page size
//     margin: { top: 20, right: 10, left: 10 },
//     pageBreak: "auto",
//   });

//   doc.save("selected-items.pdf");
// };


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = <T>(
  data: T[],
  columns: any,
  color: string,
  title: string,
  excludeColumns: string[] = [] // Array of data indexes to exclude
) => {
  // Filter out columns that match any data index in excludeColumns
  const filteredColumns = columns.filter(
    (col: { dataIndex: string }) => !excludeColumns.includes(col.dataIndex)
  );

  // Calculate the custom width based on the filtered columns
  const columnWidth = 100; // Fixed width per column, adjust as needed
  const customWidth = filteredColumns.length * columnWidth; // Width depends on number of columns
  
  // Create a new jsPDF document with the calculated width
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [customWidth, 595], // Width: custom, Height: standard A4 height in landscape
  });

  // Add a title (e.g., store name) and item count at the top of the page
  doc.setFontSize(18);
  doc.text(`${title}`, 20, 30); 
  doc.text(`${data.length} items`, customWidth - 100, 30); 

  // Add the table using autoTable
  autoTable(doc, {
    head: [filteredColumns.map((col: { title: any }) => col.title || "")],
    body: data.map((item) =>
      filteredColumns.map((col: { dataIndex: keyof T }) => item[col.dataIndex as keyof T] || "")
    ),
    styles: { fontSize: 8 },
    headStyles: { fillColor: color, textColor: 0, fontStyle: "bold" },
    columnStyles: { 0: { cellWidth: "wrap" } }, // Ensure cell width wraps to fit content
    tableWidth: "auto", // Allow the table to use the full width of the custom page size
    margin: { top: 50, right: 10, left: 10 }, // Adjust top margin for title
    pageBreak: "auto",
  });

  // Get the total number of pages
  const pageCount = doc.getNumberOfPages();

  // Add page numbers to each page
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageNumberText = `Page ${i} of ${pageCount}`;
    doc.setFontSize(10);
    doc.text(pageNumberText, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20, {
      align: 'right',
    });
  }
  doc.save(`${title}.pdf`);
};
