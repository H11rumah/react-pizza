import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type FetchPizzasParams = {
    category: number;
    sortBy: string;
};

export let fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params: FetchPizzasParams) => {
    let { category, sortBy } = params;

    let url = new URL(`https://645ca5e4250a246ae30a0341.mockapi.io/data?`);

    if (category) {
        url.searchParams.append("category", `${category}`);
    }

    url.searchParams.append("sortBy", sortBy.replace("-", ""));
    url.searchParams.append("order", sortBy[0] === "-" ? "desc" : "asc");

    let resp = await fetch(url);
    let result = await resp.json();

    return result as PizzaItem[];
});

type PizzaItem = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    category: number;
    rating: number;
};

interface PizzaSliceState {
    items: PizzaItem[];
    status: string;
}

const initialState: PizzaSliceState = {
    items: [],
    status: "loading",
};

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = "loading";
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.status = "error";
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
