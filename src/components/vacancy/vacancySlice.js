import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const vacancyAdapter = createEntityAdapter()

const initialState = vacancyAdapter.getInitialState({
    vacancyInfo: [],
    viewed: false
})


const vacancySlice = createSlice({
    name: 'vacancy',
    initialState,
    reducers: {
        toFavorite: (state, action) => {
            vacancyAdapter.setOne(state, action.payload)
        },
        deleteFavorite: (state, action) => {
            vacancyAdapter.removeOne(state, action.payload)
        },
        checkInfo: (state, action) => {
            state.vacancyInfo = action.payload
            state.viewed = true
        },
        backToVacancies: (state) => {
            state.viewed = false
        }
    }
})

const { actions, reducer } = vacancySlice;
export default reducer;

const { selectAll } = vacancyAdapter.getSelectors(state => state.vacancy)

export const vacancySelector = createSelector(
    selectAll,
    (vacancy) => {
        return vacancy
    }
)

export const { toFavorite, deleteFavorite, checkInfo, backToVacancies } = actions;