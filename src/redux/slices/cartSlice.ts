import { PayloadAction, createSlice } from "@reduxjs/toolkit";

function calcPriceAndCount(state: CartSliceState) {
    state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0);
}

export type CartItem = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    totalCount: number;
    items: CartItem[];
}

export const initialState: CartSliceState = {
    totalPrice: 0,
    totalCount: 0,
    items: JSON.parse(window.localStorage.getItem("cart") || "[]"),
};

calcPriceAndCount(initialState);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            let item = state.items.find(
                (obj) =>
                    obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size
            );

            if (item) {
                item.count++;
            } else {
                state.items.push(action.payload);
            }

            calcPriceAndCount(state);
        },

        plusItem: (state, action: PayloadAction<CartItem>) => {
            let item = state.items.find(
                (obj) =>
                    obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size
            );

            if (item) item.count++;

            calcPriceAndCount(state);
        },

        minusItem: (state, action: PayloadAction<CartItem>) => {
            let item = state.items.find(
                (obj) =>
                    obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size
            );

            if (item) item.count--;

            calcPriceAndCount(state);
        },

        removeItem: (state, action: PayloadAction<CartItem>) => {
            let item = state.items.find(
                (obj) =>
                    obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size
            );

            state.items = state.items.filter((obj) => obj !== item);

            calcPriceAndCount(state);
        },

        clearItems: (state) => {
            state.items = [];

            state.totalCount = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addItem, plusItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
