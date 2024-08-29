import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@prisma/client"; 

interface UserDetails {
  id: number;
  communityName: string;
  userName: string;
  email: string;
}

interface UserState {
  id: number | null;
  token: string | null;
  isAuthenticated: boolean;
  userDetails: UserDetails | null;
  userEvents: Event[];
  userLikedEvents: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  id: null,
  token: null,
  isAuthenticated: false,
  userDetails: null,
  userEvents: [],
  userLikedEvents: [],
  status: 'idle',
  error: null,
};


export const fetchUserEvents = createAsyncThunk<Event[], void, { state: { user: UserState } }>(
  "user/fetchUserEvents",
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState();
    if (!user.id || !user.token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const response = await fetch(`http://localhost:3001/users/${user.id}/events`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user events');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue("Failed to fetch user events");
    }
  }
);

export const fetchUserLikedEvents = createAsyncThunk<Event[], void, { state: { user: UserState } }>(
  "user/fetchUserLikedEvents",
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState();
    if (!user.id || !user.token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const response = await fetch(`http://localhost:3001/users/${user.id}/liked-events`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user liked events');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue("Failed to fetch user liked events");
    }
  }
);

export const fetchUserDetails = createAsyncThunk<UserDetails, void, { state: { user: UserState } }>(
  "user/fetchUserDetails",
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState();
    if (!user.id || !user.token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue("Failed to fetch user details");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: number; token: string }>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userEvents = [];
      state.userLikedEvents = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userEvents = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user events';
      })
      .addCase(fetchUserLikedEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserLikedEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userLikedEvents = action.payload;
      })
      .addCase(fetchUserLikedEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user liked events';
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user details';
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;