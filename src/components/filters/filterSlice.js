import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from "@reduxjs/toolkit";

import useSuperjobService from "../../services/useSuperjobService";
const filterAdapter = createEntityAdapter()

const initialState = filterAdapter.getInitialState({
    loadingStatus: 'idle'
})

export const getCatalogues = createAsyncThunk(
    'filter/getCatalogues',
    async () => {
        const { getCatalogues } = useSuperjobService()
        return await getCatalogues()
    }
)

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(getCatalogues.pending, state => {
                state.loadingStatus = 'loading'
            })
            .addCase(getCatalogues.fulfilled, (state, action) => {
                state.loadingStatus = 'idle'
                filterAdapter.setAll(state, action.payload)
            })
            .addCase(getCatalogues.rejected, state => {
                state.loadingStatus = 'error'

            })
            .addDefaultCase(() => { })
    }
})

const { reducer } = filterSlice;
export default reducer;

const { selectAll } = filterAdapter.getSelectors(state => state.filter)

export const filterSelector = createSelector(
    selectAll,
    (filter) => {
        return filter
    }
)
