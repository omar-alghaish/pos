import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOrderItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  item_price: number;
  total_price: number;
  img: string;
}

export interface OrderState {
  id: string;
  orderNumber: number;
  orderType: string;
  payType: string;
  notes: {id:string,text:string}[];
  items: IOrderItem[];
  customer?: string;
  total: number;
  subtotal: number;
  tax: number;
}

export interface IChangeItemQuantity {
  id: string;
  quantity: number;
}

const initialState: OrderState = {
  id: "1a",
  orderNumber: 1,
  payType: "now",
  orderType: "in",
  total: 0,
  subtotal: 0,
  tax: 0,
  customer: "",
  notes: [],
  items: [],
};

const calcTotal = (state: OrderState, what: '+' | '-') => {
  if(what == '+'){
   state.subtotal = state.items.reduce((acc, item) => {
    return acc + item.total_price;
  }, state.subtotal);

  state.tax = (state.subtotal * 10) / 100;

  state.total = state.tax + state.subtotal; 
  }else if(what == '-'){
    state.subtotal = state.items.reduce((acc, item) => {
      return acc + item.total_price;
    }, 0);
  
    state.tax = (state.subtotal * 10) / 100;
  
    state.total = state.tax + state.subtotal; 
  }
  
};

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    addItem: (state, action: PayloadAction<IOrderItem>) => {
      state.items.push(action.payload);
      calcTotal(state, '+');
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      calcTotal(state, '-');
    },

    editOrder: (state, action: PayloadAction<OrderState>) => {
      state.items = action.payload.items;
      state.notes = action.payload.notes;
      state.orderType = action.payload.orderType;
      state.payType = action.payload.payType;
      state.subtotal = action.payload.subtotal;
      state.tax = action.payload.tax;
      state.total = action.payload.total;
      state.id = action.payload.id;
      state.orderNumber = action.payload.orderNumber;
      state.customer = action.payload.customer;
    },

    increaseItemQuantity: (
      state,
      action: PayloadAction<IChangeItemQuantity>
    ) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + action.payload.quantity }
          : item
      );
      calcTotal(state, '+');
    },
    decreaseItemQuantity: (
      state,
      action: PayloadAction<IChangeItemQuantity>
    ) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id && item.quantity != 1
          ? { ...item, quantity: item.quantity - action.payload.quantity }
          : item
      );
      calcTotal(state, '-');
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  editOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
