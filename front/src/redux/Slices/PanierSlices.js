import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BaseUrl } from '../../Components/Functions';

export const getPanier = createAsyncThunk('panier', async (userId)=> {
  try {
    const response = await axios.get(`${BaseUrl}/api/panier/${userId}/`)
    return response.data
  } catch (error) {
    console.log(error);
    return error.message
  }
})

export const PanierSlices = createSlice({
  name: 'Panier',
  initialState: {
    products: [],
    productsSelected: [],
    price: 0,
    isLoading: false,
    isError: false
  },
  reducers: {
    emptyPanier: (state, action)=> {
      state.products = []
    },
    addSelectProduct: (state, action)=> {
      state.productsSelected.push(action.payload)
    },
    removeSelectProduct: (state, action)=> {
      state.productsSelected = state.productsSelected.filter(function(item) {
        return item !== action.payload
      })
    },
    setPrice: (state, action)=> {
      state.price = action.payload
    },
    calculePrice: (state, action)=> {
      state.price = 0
      state.productsSelected.map((item)=> {
        state.price = state.price + item.prix * item.quantite
      })
    },
  },
  extraReducers(builder){
    builder
      .addCase(getPanier.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getPanier.fulfilled, (state, action)=> {
        state.products = action.payload
      })
      .addCase(getPanier.rejected, (state, action)=> {
        state.isError = action.error.message
      })

  }
})

export const panierActions = PanierSlices.actions
export default PanierSlices.reducer