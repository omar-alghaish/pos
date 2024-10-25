import React, { useEffect, useRef, useState } from "react";
import { TbInvoice } from "react-icons/tb";
import IconButton from "../../../components/common/iconButton/Index";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Typography from "../../../components/common/typography/Index";
import Divider from "../../../components/common/divider/Index";
import DropdownMenu from "../../../components/common/dropdownMenu/Index";
import Button from "../../../components/common/button/Index";
import { useIntl } from "react-intl";
import Modal from "../../../components/common/modal/Index";
import gsap from "gsap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Invoice from "./Invoice";
import OrderItem from "./OrderItem";
import {
  editOrder,
  IOrderItem,
  OrderState,
} from "../../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import CusomtersModal from "./CusomtersModal";
import { RootState } from "../../../app/store";
import NotesModal from "./NotesModal";

interface OrderBarProps {
  order: OrderState;
}

const OrderBar: React.FC<OrderBarProps> = ({}) => {
  const { order } = useSelector((state: RootState) => state);
console.log(order)
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isExpanded, setExpanded] = useState(false);
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [isInvoiceModalOpen, setInvoiceModal] = useState(false);
  const [isCustomerModalOpen, setCustomerModal] = useState(false);
  const [isNotesModalOpen, setNotesModal] = useState(false);

  const orderBarRef = useRef<HTMLDivElement | null>(null);

  const handleSelectPayType = (item: string) => {
    dispatch(editOrder({ ...order, payType: item }));
    console.log(order);
  };

  const handleOpenInvoiceModal = () => {
    setInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setInvoiceModal(false);
  };

  const handleOpenCustomerModal = () => {
    setCustomerModal(true);
  };

  const handleCloseCustomerModal = () => {
    setCustomerModal(false);
  };

  const handleOpenNotesModal = () => {
    setNotesModal(true);
  };

  const handleCloseNotesModal = () => {
    setNotesModal(false);
  };

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 800);
      if (window.innerWidth > 800) {
        setExpanded(true); // Always expanded on large screens
      }
    };

    // Apply the resizing logic on component mount and when window resizes
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      if (isExpanded) {
        gsap.to(orderBarRef.current, { height: "100vh", duration: 0.5 });
      } else {
        gsap.to(orderBarRef.current, {
          height: "0px",
          duration: 0.5,
          width: "100%",
          position: "fixed",
          bottom: "0",
          overflow: "hidden",
          zIndex: "11111",
        });
      }
    }
  }, [isExpanded, isSmallScreen]);

  return (
    <div className={`order_bar_container ${!isExpanded ? "small" : ""}`}>
      {isSmallScreen && (
        <div className="small_container">
          <div className={`buttons_container`}>
            <Button
              disabled={!order.items.length && true}
              id="pay_button"
              variant="contained"
            >
              {intl.formatMessage({ id: "pay" })}
            </Button>
            <Button  id="pending_button" variant="contained">
              {intl.formatMessage({ id: "pending" })}
            </Button>
            <div className="total">
              <Typography variant="body2">{intl.formatMessage({ id: "total" })}</Typography>
              <Typography variant="body2" className="value">{order.total}$</Typography>
            </div>
          </div>
          {isSmallScreen && (
            <IconButton
              variant="text"
              onClick={toggleExpand}
              icon={isExpanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
            ></IconButton>
          )}
        </div>
      )}

      <div className="order_bar" ref={orderBarRef}>
        <div className="top">
          <div className="header">
            <IconButton
              onClick={handleOpenInvoiceModal}
              variant="circle"
              className="icon order_invoice "
              icon={<TbInvoice />}
            />
            <div>
              <Typography variant="h6" color="secondary">
                <Button onClick={handleOpenCustomerModal}>
                  {order.customer
                    ? order.customer
                    : intl.formatMessage({ id: "chooseCustomer" })}
                </Button>
              </Typography>
              <Typography color="secondary" variant="body2">
                {intl.formatMessage({ id: "orderNumber" })} {order.orderNumber}{" "}
                {/* Localized order number */}
              </Typography>
            </div>
            <IconButton
              className="icon edit_order"
              variant="circle"
              icon={<MdOutlineModeEditOutline />}
              onClick={handleOpenNotesModal}
            />
          </div>
          <Divider thickness="4px" margin="0" />
          <div className="dropdown_container">
            <DropdownMenu
              className="select_option"
              buttonLabel={intl.formatMessage({ id: "payType" })} // Localized label
              items={[
                intl.formatMessage({ id: "nowPay" }),
                intl.formatMessage({ id: "futurePay" }),
              ]}
              value={order.payType}
              onSelect={handleSelectPayType}
            />
            <DropdownMenu
              className="order_type"
              buttonLabel={intl.formatMessage({ id: "orderType" })} // Localized label
              items={[
                intl.formatMessage({ id: "delivery" }),
                intl.formatMessage({ id: "in" }),
              ]}
              value={order.orderType}
              onSelect={handleSelectPayType}
            />
          </div>
          <Divider thickness="4px" margin="0" />
        </div>

        <div className="items_container">
          <div className="items" id="order_items">
            {!order.items?.length && (
              <Typography color="secondary">
                {intl.formatMessage({ id: "noItemsSelected" })}
              </Typography>
            )}
            {order.items?.map((item) => {
              return (
                <>
                  <OrderItem item={item} />
                  <Divider margin="0" />
                </>
              );
            })}
          </div>
        </div>

        <div className="bottom">
          <div className="subtotal">
            <Typography color="secondary">
              {intl.formatMessage({ id: "subtotal" })}
            </Typography>
            <Typography className="value">{order.subtotal}$</Typography>
          </div>
          <div className="tax">
            <Typography color="secondary" variant="body2">
              {intl.formatMessage({ id: "tax" })} 10%
            </Typography>
            <Typography className="value">{order.tax}$</Typography>
          </div>
          <Divider thickness="4px" margin="0" />
          <div
            className={`not_expended_container ${!isExpanded ? "small" : ""}`}
          >
            <div className="total">
              <Typography>{intl.formatMessage({ id: "total" })}</Typography>
              <Typography className="value">{order.total}$</Typography>
            </div>
            <div className={`buttons_container`}>
              <Button
                disabled={!order.items.length && true}
                id="pay_button"
                variant="contained"
              >
                {intl.formatMessage({ id: "pay" })}
              </Button>{" "}
              <Button id="pending_button" variant="contained">
                {intl.formatMessage({ id: "pending" })}
              </Button>
              {isSmallScreen && (
                <IconButton
                  variant="text"
                  onClick={toggleExpand}
                  icon={isExpanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
                ></IconButton>
              )}
            </div>
          </div>
        </div>
        <Modal
          title="invoice"
          isOpen={isInvoiceModalOpen}
          onClose={handleCloseInvoiceModal}
        >
          <Invoice />
        </Modal>
        <Modal
          title={`${intl.formatMessage({ id: "chooseCustomer" })}`}
          isOpen={isCustomerModalOpen}
          onClose={handleCloseCustomerModal}
        >
          <CusomtersModal onClose={handleCloseCustomerModal} />
        </Modal>
        <Modal
          title={`${intl.formatMessage({ id: "addNotes" })}`}
          isOpen={isNotesModalOpen}
          onClose={handleCloseNotesModal}
        >
          <NotesModal onClose={handleCloseNotesModal} />
        </Modal>
      </div>
    </div>
  );
};

export default OrderBar;
