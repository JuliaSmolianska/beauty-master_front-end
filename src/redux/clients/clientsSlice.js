import { createSlice } from '@reduxjs/toolkit';
import { allClients, addClient, deleteClient, editClient } from './operations';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchClients
      .addCase(allClients.pending, state => {
        state.loading = true;
      })
      .addCase(allClients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(allClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addContact
      .addCase(addClient.pending, state => {
        state.loading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteClients
      .addCase(deleteClient.pending, state => {
        state.loading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // editClient
      .addCase(editClient.pending, state => {
        state.loading = true;
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.loading = false;

        const updatedClient = action.payload;

        const index = state.items.findIndex(item => item._id === updatedClient.id);
        if (index !== -1) {
          state.items[index] = updatedClient;
        }
      })
      .addCase(editClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const clientsReducer = clientsSlice.reducer;
