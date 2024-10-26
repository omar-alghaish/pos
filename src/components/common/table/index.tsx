// import React, { useState, useEffect } from "react";
// import { Table as AntTable, TableProps } from "antd";
// import { gsap } from "gsap";
// import Button from "../button/Index";
// import { MdDelete } from "react-icons/md";
// import { IoPrintOutline } from "react-icons/io5";

// interface ITableProps<T> extends TableProps<T> {}

// const Table = <T extends object>(props: ITableProps<T>) => {
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [showToast, setShowToast] = useState(false);

//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   useEffect(() => {
//     if (selectedRowKeys.length > 0) {
//       if (!showToast) {
//         setShowToast(true);
//       }
//       gsap.fromTo(
//         ".toast_table",
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 0.5 }
//       );
//     } else if (selectedRowKeys.length === 0 && showToast) {
//       gsap.to(".toast_table", {
//         opacity: 0,
//         y: 50,
//         duration: 0.5,
//         onComplete: () => setShowToast(false),
//       });
//     }
//   }, [selectedRowKeys, showToast]);

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };

//   return (
//     <div className="table_container">
//       <AntTable rowSelection={rowSelection} {...props} />

//       {showToast && (
//         <div className="toast_table">
//           You have selected {selectedRowKeys.length} item(s)
//           <div className="buttons">
//             <Button variant="outlined"><IoPrintOutline />
//             Print</Button>
//             <Button variant="contained" color="error">
//               <MdDelete />
//               Delete
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;

import React, { useState, useEffect } from "react";
import { Table as AntTable, TableProps, Dropdown, Menu } from "antd"; // Change ColumnType to ColumnsType
import { gsap } from "gsap";
import Button from "../button/Index";
import { MdDelete } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import jsPDF from "jspdf"; // Import jsPDF
import autoTable from "jspdf-autotable"; // Import autoTable
import { utils, writeFile } from "xlsx"; // Import xlsx
import { LuShare2 } from "react-icons/lu";
import Typography from "../typography/Index";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface ITableProps<T> extends TableProps<T> {
  dataSource: T[]; // Ensure dataSource is included in the props
}



const Table = <T extends { key: React.Key }>(props: ITableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {apperance} = useSelector((state: RootState)=> state.settings)
  const [showToast, setShowToast] = useState(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    if (selectedRowKeys.length > 0) {
      if (!showToast) {
        setShowToast(true);
      }
      gsap.fromTo(
        ".toast_table",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    } else if (selectedRowKeys.length === 0 && showToast) {
      gsap.to(".toast_table", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        onComplete: () => setShowToast(false),
      });
    }
  }, [selectedRowKeys, showToast]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    const selectedData = props.dataSource.filter((item) =>
      selectedRowKeys.includes(item.key)
    );

    // Ensure columns is not undefined
    if (!props.columns) {
      return; // You may want to handle this case differently
    }

    // Type assertion for columns
    const columns = props.columns as any;

    // Use autoTable to create a table in the PDF
    autoTable(doc, {
      head: [columns.map((col: { title: any }) => col.title || "")], // Column titles
      body: selectedData.map((item) =>
        columns.map(
          (col: { dataIndex: keyof T }) => item[col.dataIndex as keyof T] // Ensure proper typing
        )
      ),
    });

    doc.save("selected-items.pdf");
  };

  const handlePrintXLSX = () => {
    const selectedData = props.dataSource.filter((item) =>
      selectedRowKeys.includes(item.key)
    );

    const worksheet = utils.json_to_sheet(selectedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Selected Items");
    writeFile(workbook, "selected-items.xlsx");
  };

  const handleSend = () => {
    const selectedData = props.dataSource.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
  
    const message = `Check out these selected items: ${selectedData.map(item => JSON.stringify(item)).join(", ")}`;
    const pdfFile = new jsPDF();

    if (!props.columns) {
      return; // You may want to handle this case differently
    }
  
    if (props.columns) {
      if (selectedData.length > 0) {
        const columns = props.columns as any;

        // Use autoTable to create a table in the PDF
        autoTable(pdfFile, {
          head: [columns.map((col: { title: any }) => col.title || "")], // Column titles
          body: selectedData.map((item) =>
            columns.map(
              (col: { dataIndex: keyof T }) => item[col.dataIndex as keyof T] // Ensure proper typing
            )
          ),
        });
  
        const pdfBlob = pdfFile.output('blob');
        
        if (navigator.share) {
          const file = new File([pdfBlob], "selected-items.pdf", { type: "application/pdf" });
          navigator.share({
            title: 'Selected Items',
            text: message,
            files: [file]
          }).catch(console.error);
        } else {
          alert("Sharing not supported on this browser.");
        }
      }
    } else {
      console.error("Columns are not defined.");
    }
  };

  

  const printMenu = (
    <Menu>
      <Menu.Item key="pdf" onClick={handlePrintPDF}>
        Print PDF
      </Menu.Item>
      <Menu.Item key="xlsx" onClick={handlePrintXLSX}>
        Print XLSX
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="table_container">
      <AntTable
        rowSelection={rowSelection}
        columns={props.columns} // Spread columns from props
        rowClassName={(record) => 
          selectedRowKeys.includes(record.key) ? 
          `ant-table-row-selected ${apperance.theme}` : ''
        }
        {...props} // Spread any additional props, including dataSource
      />

      {showToast && (
        <div className={`toast_table ${showToast ? "active" : ""}`}>
      <Typography className="selected_message">You have selected {selectedRowKeys.length} item(s)</Typography>    
          <div className="buttons">
            <Dropdown overlay={printMenu} trigger={["click"]}>
              <Button variant="outlined">
                <IoPrintOutline />
                Print
              </Button>
            </Dropdown>
            <Button variant="outlined" onClick={handleSend}>
            <LuShare2 />
                Send
              </Button>
            <Button variant="contained" color="error">
              <MdDelete />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
