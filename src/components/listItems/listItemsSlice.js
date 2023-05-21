import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

import useSuperjobService from "../../services/useSuperjobService";

const listAdapter = createEntityAdapter()

const initialState = listAdapter.getInitialState({
    loadingStatus: 'idle'
})

export const registration = createAsyncThunk(
    'list/registration',
    async () => {
        const { request } = useHttp()
        request(`https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password?login=sergei.stralenia@gmail.com&
        password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`
        )
    }
)

export const getVacancy = createAsyncThunk(
    'list/getVacancy',
    async () => {
        const { getVacancy } = useSuperjobService()
        return await getVacancy(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/`)
    }
)

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        updateVacancies: (state, action) => {
            listAdapter.setAll(state, action.payload)
        },
        filterVacancies: (state, action) => {
            listAdapter.setAll(state, action.payload)
        },
        favoriteSynchronization: (state, action) => {
            listAdapter.setAll(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVacancy.pending, state => { state.loadingStatus = 'loading' })
            .addCase(getVacancy.fulfilled, (state, action) => {
                state.loadingStatus = 'idle'
                listAdapter.addMany(state, action.payload)
            })
            .addCase(getVacancy.rejected, state => { state.loadingStatus = 'error' })
            .addDefaultCase(() => { })
    }
})

const { selectAll } = listAdapter.getSelectors(state => state.list)

export const listSelector = createSelector(
    selectAll,
    (list) => {
        return list
    }
)

const { actions, reducer } = listSlice;
export default reducer;

export const { updateVacancies, filterVacancies, favoriteSynchronization } = actions
