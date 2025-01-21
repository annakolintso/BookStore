import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../../services/api';

const api = new API();

export const getBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('search.json', {
        params: {
          author: "tolkien",
          limit: 2,
          fields: "title, id, olid, isbn"
        }
      });
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
)