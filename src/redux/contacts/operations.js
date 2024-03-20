import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://beauty-master-back-end.onrender.com";

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/api/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contact/addContact',
  async (contact, thunkApi) => {
    try {
      console.log(contact);
      const { data } = await axios.post('/api/contacts', contact);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/api/contacts/${id}`);
      console.log(data)
      return data._id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
