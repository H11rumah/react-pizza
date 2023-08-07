import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FilterSliceState {
    category: number;
    sortBy: string;
}

export const initialState: FilterSliceState = {
    category: 0,
    sortBy: "rating",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = +action.payload;
        },

        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },

        setFilterParams: (state, action: PayloadAction<FilterSliceState>) => {
            state.category = +action.payload.category;
            state.sortBy = action.payload.sortBy;
        },
    },
});

export const { setCategory, setSortBy, setFilterParams } = filterSlice.actions;

export default filterSlice.reducer;
