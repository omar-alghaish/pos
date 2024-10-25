// import React from "react";
// import img from "../../../assets/imges/test.jpg";
// import Typography from "../../../components/common/typography/Index";
// import IconButton from "../../../components/common/iconButton/Index";
// import { IOrderItem, removeItem } from "../../../features/order/orderSlice";
// import { FaTrashAlt } from "react-icons/fa";
// import { useDispatch } from "react-redux";

// interface OrderItemProps {
//   item: IOrderItem;
// }
// const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
//   const dispatch = useDispatch();
//   return (
//     <div className="order_item_container">
//       <div className="right_side">
//         <div className="img_container">
//           <img src={item.img} alt="" />
//           <div
//             onClick={() => dispatch(removeItem(item.id))}
//             className="remove_button"
//           >
//             <FaTrashAlt />
//           </div>
//         </div>
//         <div className="info">
//           <Typography>{item.name}</Typography>
//           <Typography variant="body2" color="secondary">
//             {item.item_price}$
//           </Typography>
//         </div>
//       </div>
//       <div className="left_side">
//         <IconButton className="icon_button" icon={"+"} variant="circle" />
//         <Typography>{item.quantity}</Typography>
//         <IconButton className="icon_button" icon={"-"} variant="circle" />
//       </div>
//     </div>
//   );
// };

// export default OrderItem;

import React, { useEffect } from "react";
import img from "../../../assets/imges/test.jpg";
import Typography from "../../../components/common/typography/Index";
import IconButton from "../../../components/common/iconButton/Index";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  IOrderItem,
  removeItem,
} from "../../../features/order/orderSlice";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface OrderItemProps {
  item: IOrderItem;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const handleIncrease = (id: string, quantity: number) => {
    dispatch(increaseItemQuantity({ id, quantity }));
    console.log("test");
  };
  const handleDecrease = (id: string, quantity: number) => {
    dispatch(decreaseItemQuantity({ id, quantity }));
  };

  return (
    <div className="order_item_container" id="order_item_container">
      <div className="right_side">
        <div className="img_container">
          <img src={item.img} alt="" />
          <div
            onClick={() => dispatch(removeItem(item.id))}
            className="remove_button"
          >
            <FaTrashAlt />
          </div>
        </div>
        <div className="info">
          <Typography>{item.name}</Typography>
          <Typography variant="body2" color="secondary">
            {item.item_price}$
          </Typography>
        </div>
      </div>
      <div className="left_side">
        <IconButton
          className="icon_button"
          icon={"+"}
          onClick={() => handleIncrease(item.id, 1)}
          variant="circle"
        />
        <Typography>{item.quantity}</Typography>
        <IconButton
          className="icon_button"
          icon={"-"}
          onClick={() => handleDecrease(item.id, 1)}
          variant="circle"
        />
      </div>
    </div>
  );
};

export default OrderItem;
