import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseUrl } from '../../Components/Functions'

export const getProducts = createAsyncThunk('products', async ()=> {
  try {
    const response = await axios.get(`${BaseUrl}/api/products/`)
    return response.data
  } catch (error) {
    console.log(error);
    return error.message
  }
})

export const getProductsByCategorie = createAsyncThunk('productsByCategorie', async (Categorie)=> {
  try {
    const response = await axios.get(`${BaseUrl}/api/getproductbycategorie/${Categorie}/`)
    return response.data
  } catch (error) {
    console.log(error);
    return error.message
  }
})

export const productSlice = createSlice({
  name: 'ProductPage',
  initialState: {
    products: null,
    productsByCategorie: null,
    isLoadingP: false,
    isLoadingPC: false,
    isError: false,
    opened: false,
    product: {},
    addedToPanier: false
  },
  reducers: {
    open: (state, action) => {
      state.opened = true
      state.product = action.payload
    },
    close: (state) => {
      state.opened = false
      state.product = {}
    },
    openAdded: (state, action) => {
      state.addedToPanier = true
    },
    closeAdded: (state) => {
      state.addedToPanier = false
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoadingP = true
      })
      .addCase(getProducts.fulfilled, (state, action)=> {
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action)=> {
        state.isError = action.error.message
      })


      .addCase(getProductsByCategorie.pending, (state, action) => {
        state.isLoadingPC = true
      })
      .addCase(getProductsByCategorie.fulfilled, (state, action)=> {
        state.productsByCategorie = action.payload
        state.isLoadingPC = false
      })
      .addCase(getProductsByCategorie.rejected, (state, action)=> {
        state.isError = action.error.message
        state.isLoadingPC = false
      })
  }
})

export const productActions = productSlice.actions
export default productSlice.reducer