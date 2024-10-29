import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import Typography from "../../../components/common/typography/Index";

interface StateCardProps {
  icon: React.ReactNode;     // Icon to be passed as a prop
  title: string;             // Title of the card
  total: string | number;    // Total value to display
  percentage: string | number; // Percentage change
  status: "increase" | "decrease"; // Status (increase or decrease)
}

const StateCard: React.FC<StateCardProps> = ({ icon, title, total, percentage, status }) => {
  return (
    <div className="state_card_container">
      <div className="top_part">
        <div className="title_container">
          {icon}
          <Typography className="title">{title}</Typography>
        </div>
        <HiOutlineDotsHorizontal />
      </div>
      <div className="bottom_part">
        <Typography variant="h3" className="total">
          {total}
        </Typography>
        <div className={`status ${status}`}>
          {percentage}%
          {status === "increase" ? <GoArrowUpRight /> : <GoArrowDownRight />}
        </div>
      </div>
    </div>
  );
};

export default StateCard;
