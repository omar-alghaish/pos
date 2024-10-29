import React from "react";
import Loading from "../common/loading/Index";
import img from "../../assets/imges/alphatek.jpeg"
import Typography from "../common/typography/Index";
interface ILoadingPageProps {
  variant: "circular" | "dots" | "linear";
}
const LoadingPage: React.FC<ILoadingPageProps> = ({ variant }) => {
  return (
    <div className="loading_page_container">
        <div className="header">
              <Loading variant={variant} />
    
        </div>
       <div className="logo">
       <Typography variant="h1" >Alrahma</Typography> 
       </div>
      <div className="alphatek_logo">
      <Typography variant="body1">powerd by</Typography>   <div className="img_container"><img src={img}></img></div>
      </div>
    </div>
  );
};

export default LoadingPage;
