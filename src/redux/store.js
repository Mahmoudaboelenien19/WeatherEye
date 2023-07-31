import { configureStore } from '@reduxjs/toolkit'
import slice from './slice'
 const store=configureStore({
    reducer:{
        input:slice

    }
})
export default store