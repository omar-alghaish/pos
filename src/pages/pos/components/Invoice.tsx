import Typography from "../../../components/common/typography/Index";
import Divider from "../../../components/common/divider/Index";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const Invoice = () => {
  const { order } = useSelector((state: RootState) => state);

  return (
    <div className="invoice_container">
      <div className="section">
        <div className="line">
          <Typography>No.Transaction</Typography>{" "}
          <Typography>Ord235</Typography>
        </div>
        <div className="line">
          <Typography>Payment</Typography> <Typography>Cash</Typography>
        </div>
      </div>
      <Divider color="secondary" thickness="2px" />
      <div className="section items">
        <div className="line">
          <Typography>Total Items</Typography>
          <Typography>{order?.items.length}</Typography>
        </div>
        {order?.items.map((item) => (
          <div className="line">
            <Typography variant="body2" color="secondary">
              +{item.quantity}
              {item.name}
            </Typography>
            <Typography variant="body2" color="secondary">
              {item.total_price}$
            </Typography>
          </div>
        ))}

      </div>

      <Divider color="secondary" thickness="2px" />
      <div className="section">
        <div className="line">
          <Typography>Subtotal</Typography> <Typography>{order.subtotal}$</Typography>
        </div>
        <div className="line">
          <Typography>Discount Sales</Typography> <Typography>10$</Typography>
        </div>
        <div className="line">
          <Typography>Total sales tax</Typography> <Typography>{order.tax}$</Typography>
        </div>
      </div>
      <Divider color="secondary" thickness="2px" />
      <div className="section total">
        <div className="line">
          <Typography variant="h5">Total</Typography>
          <Typography>{order.total}$</Typography>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
