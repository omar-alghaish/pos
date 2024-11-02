import React from "react";
import Loading from "../common/loading/Index";
import { FaRegCopyright } from "react-icons/fa"; // Import the copyright icon
import Typography from "../common/typography/Index";

const LoadingPage: React.FC<{ variant: "circular" | "dots" | "linear" }> = ({
  variant,
}) => {
  // Function to get the current year
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <div className="loading_page_container">
      <div className="header">
        <Loading variant={variant} />
      </div>
      <div className="logo">
        <Typography variant="h1">Alrahma</Typography>
      </div>
      <div className="alphatek_logo" style={{ textAlign: "center" }}>
        <Typography variant="body1" color="secondary">
          powered by
        </Typography>
        <Typography>subsub</Typography>
        <span>
          <Typography>
            <FaRegCopyright
              style={{ padding: "0 1px", height: "max-content" }}
            />
            {getCurrentYear()}
          </Typography>
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
