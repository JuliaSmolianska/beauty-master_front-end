import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const allClients = createAsyncThunk(
  'clients/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/clients');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addClient = createAsyncThunk(
  'clients/addClient',
  async (client, thunkApi) => {
    try {
      console.log(client);
      const { data } = await axios.post('/clients', client);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id, thunkApi) => {
    try {
      await axios.delete(`/clients/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editClient = createAsyncThunk(
  'clients/editClient',
  async (client, thunkApi) => {
    const { id, values } = client;
    try {
      const { data } = await axios.put(`/clients/${id}`, values);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);