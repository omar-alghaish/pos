// CardItem.tsx
import React from 'react';
import { Dropdown } from "antd";
import Card from '../../../card';
import { TbDotsVertical } from "react-icons/tb";
import Typography from '../../../common/typography/Index';

interface CardItemProps {
  item: any;
  onClick?: () => void;
  menu?: React.ReactElement | undefined; // Corrected type
  truncateString: (str: string, maxLength: number) => string;
}

const CardItem: React.FC<CardItemProps> = ({ item, onClick, menu, truncateString }) => {
  return (
    <Card
      imageUrl={item?.img}
      variant="elevated"
      elevation={2}
      padding="10px"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {truncateString(item?.name, 10)}
        {menu && ( // Ensure menu is not null before rendering Dropdown
          <Dropdown overlay={menu} trigger={["click"]}>
            <TbDotsVertical
              style={{ cursor: "pointer" }}
              onClick={(e) => e.stopPropagation()} // Prevents click from affecting card selection
            />
          </Dropdown>
        )}
      </div>
      {item.role && <Typography>{item?.role}</Typography>}
    </Card>
  );
};

export default CardItem;
