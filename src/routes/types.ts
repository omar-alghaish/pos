export interface Route {
    index?: boolean;
    path?: string;
    element: JSX.Element;
    state: string;
    children?: Route[];
  }
  
  export interface Link {
    path: string;
    state: string;
    title: JSX.Element;
    children?: Link[];
    icon?: JSX.Element;
  }