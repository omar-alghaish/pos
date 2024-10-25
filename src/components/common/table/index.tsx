import React, { useState, useEffect } from 'react';
import { Table as AntTable, TableProps } from 'antd';
import { gsap } from 'gsap';

interface ITableProps<T> extends TableProps<T> {}

const Table = <T extends object>(props: ITableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
        '.toast_table', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.5 }
      );
    } else if (selectedRowKeys.length === 0 && showToast) {
      gsap.to('.toast_table', {
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

  return (
    <div className="table_container">
      <AntTable rowSelection={rowSelection} {...props} />

      {showToast && (
        <div className="toast_table">
          You have selected {selectedRowKeys.length} item(s)
        </div>
      )}
    </div>
  );
};

export default Table;
