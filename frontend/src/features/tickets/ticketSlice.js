import {createSlice, createAsyncThunk}  from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSucess: false,
    isLoading: false,
    message: ''
}
//Create new ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
    }catch(error){
        const message = 
        (error.response && 
            error.response.data &&
             error.response.data.message) ||
            error.message || 
            error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

//Get user tickets
// Get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
  
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

//Get user ticket
export const getTicket = createAsyncThunk('tickets/get', async (ticketId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTicket(ticketId,  token)
    }catch(error){
        const message = 
        (error.response && 
            error.response.data &&
             error.response.data.message) ||
            error.message || 
            error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

//Close ticket
export const closeTicket = createAsyncThunk('tickets/close', async (ticketId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId,  token)
    }catch(error){
        const message = 
        (error.response && 
            error.response.data &&
             error.response.data.message) ||
            error.message || 
            error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state) => {
            state.isLoading = false
            state.isSucess = true
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSucess = true
/*             const array_test = [
                {
                    createdAt: "",
                    product: "iPad",
                    status: "open",
                    _id: 1,
                },
                {
                    createdAt: "",
                    product: "Mackbook",
                    status: "open",
                    _id: 2,
                },
                
            ] */

            state.tickets = action.payload.tickets
            
        })
        .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload.tickets
        })
        .addCase(getTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSucess = true
            state.ticket = action.payload.ticket
        })
        .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload.ticket
        })
        .addCase(closeTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.tickets.map((ticket) => ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket)
        })

    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer