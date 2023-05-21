import { configureStore } from "@reduxjs/toolkit";

import vacancy from '../components/vacancy/vacancySlice'
import list from '../components/listItems/listItemsSlice'
import filter from '../components/filters/filterSlice'

const store = configureStore({
    reducer: { vacancy, list, filter },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store