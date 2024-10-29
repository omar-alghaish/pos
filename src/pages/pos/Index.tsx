import  {  useEffect, useState } from "react";
import OrderBar from "./components/OrderBar";
import Product from "./components/Product";
import Category from "./components/Category";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Optionally import additional modules
import { Navigation, A11y } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  addItem,
  IOrderItem,
  removeItem,
} from "../../features/order/orderSlice";
import img from "../../assets/imges/test.jpg";
import Toast from "../../components/common/toast/Index";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Header from "../../components/header/Index";
import DraggableFloatContainer from "./components/DragableContainer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import IconButton from "../../components/common/iconButton/Index";

export interface ICategory {
  id: string;
  name: string;
  items_quantity: number;
  color: string;
  products: IOrderItem[];
}

export interface IProduct {
  id: string;
  name: string;
  img: string;
  category: string;
  item_price: number;
  total_price: number;
  quantity: number;
  color: string;
}

export const categories: ICategory[] = [
  {
    id: "1",
    name: "eggs",
    items_quantity: 4,
    color: "red",
    products: [
      {
        id: "3",
        name: "eggs",
        quantity: 12,
        category: "eggs",
        item_price: 0.5,
        total_price: 6,
        img: img,
      },
      {
        id: "4",
        name: "organic eggs",
        quantity: 6,
        category: "eggs",
        item_price: 0.75,
        total_price: 4.5,
        img: img,
      },
    ],
  },
  {
    id: "2",
    name: "milks",
    items_quantity: 4,
    color: "brown",
    products: [
      {
        id: "1",
        name: "milk",
        quantity: 1,
        category: "milks",
        item_price: 2,
        total_price: 2,
        img: img,
      },
      {
        id: "2",
        name: "almond milk",
        quantity: 1,
        category: "milks",
        item_price: 2.5,
        total_price: 2.5,
        img: img,
      },
      {
        id: "5",
        name: "soy milk",
        quantity: 1,
        category: "milks",
        item_price: 2.2,
        total_price: 2.2,
        img: img,
      },
    ],
  },
  {
    id: "3",
    name: "meat",
    items_quantity: 5,
    color: "orange",
    products: [
      {
        id: "16",
        name: "ground beef",
        quantity: 1,
        category: "meat",
        item_price: 8,
        total_price: 8,
        img: img,
      },
      {
        id: "6",
        name: "chicken breast",
        quantity: 2,
        category: "meat",
        item_price: 7,
        total_price: 14,
        img: img,
      },
      {
        id: "17",
        name: "pork chops",
        quantity: 1,
        category: "meat",
        item_price: 10,
        total_price: 10,
        img: img,
      },
      {
        id: "8",
        name: "turkey breast",
        quantity: 1,
        category: "meat",
        item_price: 9,
        total_price: 9,
        img: img,
      },
    ],
  },
  {
    id: "4",
    name: "fruits",
    items_quantity: 5,
    color: "lime",
    products: [
      {
        id: "13",
        name: "bananas",
        quantity: 6,
        category: "fruits",
        item_price: 0.3,
        total_price: 1.8,
        img: img,
      },
      {
        id: "5",
        name: "apples",
        quantity: 6,
        category: "fruits",
        item_price: 0.75,
        total_price: 4.5,
        img: img,
      },
      {
        id: "14",
        name: "oranges",
        quantity: 10,
        category: "fruits",
        item_price: 0.5,
        total_price: 5,
        img: img,
      },
      {
        id: "15",
        name: "strawberries",
        quantity: 1,
        category: "fruits",
        item_price: 3,
        total_price: 3,
        img: img,
      },
    ],
  },
  {
    id: "5",
    name: "vegetables",
    items_quantity: 4,
    color: "yellow",
    products: [
      {
        id: "18",
        name: "potatoes",
        quantity: 5,
        category: "vegetables",
        item_price: 0.4,
        total_price: 2,
        img: img,
      },
      {
        id: "9",
        name: "carrots",
        quantity: 5,
        category: "vegetables",
        item_price: 0.6,
        total_price: 3,
        img: img,
      },
      {
        id: "12",
        name: "tomatoes",
        quantity: 4,
        category: "vegetables",
        item_price: 0.5,
        total_price: 2,
        img: img,
      },
      {
        id: "19",
        name: "spinach",
        quantity: 2,
        category: "vegetables",
        item_price: 1.5,
        total_price: 3,
        img: img,
      },
    ],
  },
  {
    id: "6",
    name: "grains",
    items_quantity: 3,
    color: "blue",
    products: [
      {
        id: "7",
        name: "rice",
        quantity: 1,
        category: "grains",
        item_price: 2.5,
        total_price: 2.5,
        img: img,
      },
      {
        id: "11",
        name: "pasta",
        quantity: 1,
        category: "grains",
        item_price: 1.8,
        total_price: 1.8,
        img: img,
      },
      {
        id: "20",
        name: "quinoa",
        quantity: 1,
        category: "grains",
        item_price: 3.5,
        total_price: 3.5,
        img: img,
      },
    ],
  },
  {
    id: "7",
    name: "snacks",
    items_quantity: 3,
    color: "purple",
    products: [
      {
        id: "21",
        name: "potato chips",
        quantity: 1,
        category: "snacks",
        item_price: 1.5,
        total_price: 1.5,
        img: img,
      },
      {
        id: "22",
        name: "chocolate bars",
        quantity: 5,
        category: "snacks",
        item_price: 1,
        total_price: 5,
        img: img,
      },
      {
        id: "23",
        name: "popcorn",
        quantity: 1,
        category: "snacks",
        item_price: 2,
        total_price: 2,
        img: img,
      },
    ],
  },
  {
    id: "8",
    name: "beverages",
    items_quantity: 4,
    color: "cyan",
    products: [
      {
        id: "24",
        name: "soda",
        quantity: 1,
        category: "beverages",
        item_price: 1.5,
        total_price: 1.5,
        img: img,
      },
      {
        id: "25",
        name: "coffee",
        quantity: 1,
        category: "beverages",
        item_price: 3,
        total_price: 3,
        img: img,
      },
      {
        id: "26",
        name: "tea",
        quantity: 1,
        category: "beverages",
        item_price: 2,
        total_price: 2,
        img: img,
      },
      {
        id: "27",
        name: "juice",
        quantity: 1,
        category: "beverages",
        item_price: 2.5,
        total_price: 2.5,
        img: img,
      },
    ],
  },
];

const Pos = () => {
  const { order } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IOrderItem | null>(
    null
  );

  const [activeCategory, setActiveCategory] = useState("all");

  const handleProductClick = (
// e: unknown, // e: MouseEvent<HTMLDivElement>,
item: IOrderItem  ) => {
    const isAlreadyInOrder = order.items.some(
      (orderItem) => orderItem.id === item.id
    );

    if (isAlreadyInOrder) {
      setSelectedProduct(item);
      setShowToast(true);
    } else {
      dispatch(addItem(item));
    }
  };

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id); // Set the active category first

    if (id === "all") {
      setAllProducts();
    } else {
      const category = categories.find((category) => category.id === id);
      if (category?.products) {
        const categoryProducts = category.products.map((product) => ({
          ...product,
          color: category.color,
          category: category.name,
        }));
        setProducts(categoryProducts);
      }
    }
  };

  const handleConfirmRemove = () => {
    if (selectedProduct) {
      dispatch(removeItem(selectedProduct.id));
    }
    setShowToast(false);
    setSelectedProduct(null);
  };

  const handleCancelRemove = () => {
    setShowToast(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".order_bar_container",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: ".edit_order",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: ".order_invoice",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: ".order_type",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: ".select_option",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: "#order_items",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: ".subtotal",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: ".tax",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: ".total",
          popover: { title: "Title", description: "Description" },
        },
        {
          element: "#pay_button",
          popover: { title: "Title", description: "Description" },
        },
      ],
    });

    driverObj.drive(); // Start the tour
  }, []); // Empty dependency array to run once

  const setAllProducts = () => {
    const allProducts = categories.flatMap((category) =>
      category.products.map((product) => {
        return { ...product, color: category.color, category: category.name };
      })
    );
    setProducts(allProducts);
  };
  useEffect(() => {
    setAllProducts();
  }, []);

  console.log(order);
  return (
    <div className="pos_container">
      <OrderBar order={order} />

      <div className="main_content">
        <Header />
        {/* <Search /> */}
        <div className="categories_section section">
          {/* <div className="section_header">
            <Typography variant="h6">Categories</Typography>
          </div> */}
          <div className="categories_container">
          <IconButton
                className="custom-prev"
                icon={<IoIosArrowBack />}
              ></IconButton>
              <IconButton
                className="custom-next"
                icon={<IoIosArrowForward />}
              ></IconButton>
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={3}
              slidesPerView={"auto"}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              pagination={{ clickable: true }}
            >
          
              <SwiperSlide
                style={{
                  width: "max-content",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => handleCategoryClick("all")}
                  className={`category_container all ${
                    activeCategory === "all" ? "active" : ""
                  }`}
                >
                  All
                </div>{" "}
              </SwiperSlide>
              {categories.map((item, index) => (
                <SwiperSlide
                  style={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Category
                    className={`${activeCategory === item.id ? "active" : ""}`}
                    onClick={() => handleCategoryClick(item.id)}
                    item={item}
                  />{" "}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>

        <div className="products_section section">
          {/* <div className="section_header">
            <Typography variant="h6">Products</Typography>
          </div> */}

          <div className="products_container">
            {products.map((item, index) => (
              <Product
                key={index}
                onClick={() => handleProductClick(item)}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
      <DraggableFloatContainer />

      {showToast && (
        <Toast
          message={`Are you sure you want to remove ${selectedProduct?.name}?`}
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </div>
  );
};

export default Pos;
