import React from "react";
import { Link } from "react-router-dom";

type BreadcrumbProps = {
  path: string[]; // Array of URL path segments (e.g., ['products', 'productsList'])
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
  const thePath = ["home", ...path];
  return (
    <nav aria-label="breadcrumb">
      <ol
        style={{
          display: "flex",
          listStyleType: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {thePath.map((item, index) => (
          <li key={index} style={{ marginRight: "8px" }}>
            {item == "home" ? (
              <>
                <Link to={`/`}>{item}</Link>
                <span> &gt; </span>
              </>
            ) : index < thePath.length - 1 ? (
              <>
                <Link to={`/${path.slice(0, index + 1).join("/")}`}>
                  {item}
                </Link>
                <span> &gt; </span>
              </>
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
