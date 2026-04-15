import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../Components/Functions";

export const getFavorits = createAsyncThunk('favorits', async (userId)=> {
    try {
      const response = await axios.get(`${BaseUrl}/api/favorisuser/${userId}/`)
      return response.data
    } catch (error) {
      console.log(error);
      return error.message
    }
})

export const FavoritsSlice = createSlice({
    name:"Favorits",
    initialState: {
        products: [],
        isLoading: false,
        isError: false,
    },
    reducers: {
        emptyFavorites: (state, action) => {
            state.products = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFavorits.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getFavorits.fulfilled, (state, action)=> {
                state.products = action.payload
            })
            .addCase(getFavorits.rejected, (state, action)=> {
                state.isError = action.error.message
            })
    }
})

export const favoritsActions = FavoritsSlice.actions
export default FavoritsSlice.reducer