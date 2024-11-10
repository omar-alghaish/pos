import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import DatePickerField from "../../../components/common/datePickerField";
import Typography from "../../../components/common/typography/Index";
import { Table, Input, Select, Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { productsData } from "../../products/pages/ProductsTable"; // Mock products data
import moment from "moment";

interface Product {
  id: string;
  name: string;
  SKU: string;
  price: number;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  quantity: string;
  tax: string;
  SKU:string
}

interface OrderForm {
  customer: string;
  number: string;
  dateAdded: Date;
  items: OrderItem[];
}

const validationSchema = Yup.object().shape({
  customer: Yup.string().required("Customer is required"),
  number: Yup.string().required("Number is required"),
  dateAdded: Yup.date().required("Date is required"),
});

interface IAddOrderForm {
  type: "update" | "add";
  title: string;
  values?: OrderForm;
}

const AddOrderForm: React.FC<IAddOrderForm> = ({ type = "add", title, values }) => {
  const [items, setItems] = useState<OrderItem[]>(values?.items || []);
  
  const products= productsData; // Replace with actual data source
  
  const dateAdded = useMemo(() => (type === "update" && values ? moment(values.dateAdded) : moment()), [type, values?.dateAdded]);

  const formik = useFormik({
    initialValues: {
      customer: type === "update" && values ? values.customer : "",
      dateAdded: dateAdded.toISOString(),
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const orderData = { ...values, items };
      console.log(orderData);
    },
  });

  const handleAddItem = () => {
    setItems([...items, { id: "", name: "", price: 0, totalPrice: 0, quantity: "1", tax: "",SKU:"" }]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof OrderItem, value: string) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        if (field === "quantity" || field === "price") {
          const quantity = parseFloat(updatedItem.quantity) || 1;
          const price = updatedItem.price || 0;
          updatedItem.totalPrice = (quantity * price);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleProductSelectByField = (value: string, itemId: string, field: keyof Product) => {
    const selectedProduct = products.find((product) => product[field] === value);
    if (selectedProduct) {
      setItems(items.map((item) =>
        item.id === itemId
          ? { 
              ...item,
              id: selectedProduct.id,
              name: selectedProduct.name,
              price: selectedProduct.price, // Corrected from selectedProduct.price to selectedProduct.price
              totalPrice: selectedProduct.price * parseFloat(item.quantity || "1"), // Corrected from selectedProduct.price to selectedProduct.price
              SKU: selectedProduct.SKU 
            }
          : item
      ));
    }
  };
  

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,  // This will add ellipsis when the content is too wide

      render: (_: any, record: OrderItem) => (
        <Select
          showSearch
          placeholder="Search by name"
          style={{ width: "100%" }}
          value={record.name || undefined}
          onChange={(value) => handleProductSelectByField(value, record.id, 'name')}
          filterOption={(input, option) => {
            const product = products.find((p) => p.id === option?.value);
            return product ? product.name.toLowerCase().includes(input.toLowerCase()) : false;
          }}
          dropdownClassName="no-padding-margin-dropdown"
        >
          {products.map((product) => (
            <Select.Option key={product.id} value={product.name}>
              {`${product.name} | SKU: ${product.SKU} | ID: ${product.id}`}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Product ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,  // This will add ellipsis when the content is too wide

      render: (_: any, record: OrderItem) => (
        <Input
          value={record.id}
          onChange={(e) => handleProductSelectByField(e.target.value, record.id, 'id')}
          placeholder="Enter or search by ID"
        />
      ),
    },
    {
      title: "SKU",
      dataIndex: "SKU",
      key: "SKU",
      ellipsis: true,  // This will add ellipsis when the content is too wide

      render: (_: any, record: OrderItem) => (
        <Select
          showSearch
          placeholder="Search by SKU"
          style={{ padding: 0, margin: 0 ,width: "100%"}} // Remove padding and margin
          value={record.SKU || undefined}
          onChange={(value) => handleProductSelectByField(value, record.id, 'SKU')}
          filterOption={(input, option) => {
            const product = products.find((p) => p.id === option?.value);
            return product ? product.SKU.toLowerCase().includes(input.toLowerCase()) : false;
          }}
        >
          {products.map((product) => (
            <Select.Option key={product.id} value={product.SKU}>
              {`${product.SKU} | Name: ${product.name} | ID: ${product.id}`}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Item Price",
      dataIndex: "price",
      key: "price",
      ellipsis: true,  // This will add ellipsis when the content is too wide

      render: (_: any, record: OrderItem) => (
        <Input
          value={record.price}
          onChange={(e) => handleItemChange(record.id, "price", e.target.value)}
          placeholder="Enter item price"
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,  // This will add ellipsis when the content is too wide

      render: (_: any, record: OrderItem) => (
        <Input
          value={record.quantity}
          onChange={(e) => handleItemChange(record.id, "quantity", e.target.value)}
          placeholder="Enter quantity"
        />
      ),
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      ellipsis: true,  // This will add ellipsis when the content is too wide

      render: (_: any, record: OrderItem) => (
        <Select
          value={record.tax}
          onChange={(value) => handleItemChange(record.id, "tax", value)}
          style={{ padding: 0, margin: 0 ,width: "100%"}} // Remove padding and margin

        >
          <Select.Option value="5%">5%</Select.Option>
          <Select.Option value="10%">10%</Select.Option>
          <Select.Option value="15%">15%</Select.Option>
        </Select>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      ellipsis: true,  // This will add ellipsis when the content is too wide

      render: (_: any, record: OrderItem) => (
        <Input value={record.totalPrice} readOnly placeholder="Auto-calculated total price" />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: OrderItem) => (
        <Button icon={<DeleteOutlined />} onClick={() => handleDeleteItem(record.id)}>
        </Button>
      ),
    },
  ];
  

  return (
    <form onSubmit={formik.handleSubmit} className={`create_invoice_form ${type}`}>
      <Typography variant="h3">{title}</Typography>

      <div className="inputs_container">
        <InputField label="Customer Name" value={formik.values.customer} onChange={formik.handleChange} error={formik.errors.customer} name="customer" />
        <DatePickerField
          label="Date Added"
          value={formik.values.dateAdded ? moment(formik.values.dateAdded) : undefined}
          onChange={(date) => formik.setFieldValue("dateAdded", date ? date.toISOString() : null)}
          error={typeof formik.errors.dateAdded === "string" ? formik.errors.dateAdded : undefined}
        />
      </div>

      <Table
        columns={columns}
        dataSource={items}
        rowKey="id"
        pagination={false}
        style={{
          margin: 0,
          padding: 0,
          borderCollapse: 'collapse',
        }}
        footer={() => (
          <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddItem} style={{ width: "100%" }}>
            Add Item
          </Button>
        )}
      />

      <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
        Submit
      </Button>
    </form>
  );
};

export default AddOrderForm;
