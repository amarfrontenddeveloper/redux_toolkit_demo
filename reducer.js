import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { useSelector } from 'react-redux';
import axios from 'axios'

const initialState = {
    apiResponse: null,
    otpResponse: null,
}

export const apiCall = createAsyncThunk('customer/dumyApiCall', async (data) => {
    try {
        const response = await axios.get(`http://103.117.66.70:5013/api/Channel/GetChannelMasterList?Mobile_No=${data.Mobile_No}&pageNumber=${data.pageNumber}&&pageSize=${data.pageSize}`);
        return response.data;
    } catch (error) {
        console.log("error", error)
        throw error.message;
    }
});

export const otpApiCall = createAsyncThunk('customer/likeApiCall', async (datakkk) => {
    try {
        console.log("otp data",datakkk)
        const response = await axios.post('http://103.117.66.70:5013/api/Login/SendOTP', datakkk);
        return response.data;
    } catch (error) {
        console.log("error", error)
        throw error.message;
    }
});

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addExpertId(state, action) {
            state.selectedExpertList = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(apiCall?.pending, state => {
            state.customerLoading = true;
        });
        builder.addCase(apiCall?.fulfilled, (state, action) => {
            state.customerLoading = false;
            state.apiResponse = action.payload;

        });
        builder.addCase(apiCall?.rejected, state => {
            state.customerLoading = false;
            state.apiResponse = null;
        });
        builder.addCase(otpApiCall?.pending, state => {
            state.customerLoading = true;
        });
        builder.addCase(otpApiCall?.fulfilled, (state, action) => {
            state.customerLoading = false;
            state.otpResponse = action.payload;

        });
        builder.addCase(otpApiCall?.rejected, state => {
            state.customerLoading = false;
            state.otpResponse = null;
        })

        builder.addCase(PURGE, () => initialState);
    }
})

export const customerSliceReducer = customerSlice.reducer;

export const {
    addExpertId,
} = customerSlice.actions;

export const customerSelectors = () => {
    const apiResponse = useSelector(state => state.customer.apiResponse);
    const otpResponse = useSelector(state => state.customer.otpResponse);
    return {
        apiResponse,
        otpResponse,
    }
}
