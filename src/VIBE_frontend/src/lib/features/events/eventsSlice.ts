import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@prisma/client";

// Define the initial state for the events slice
interface EventsState {
  events: Event[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching events from the API
export const fetchEvents = createAsyncThunk<Event[]>(
  "events/fetchEvents",
  async () => {
    const response = await fetch("http://localhost:3001/events");
    return await response.json();
  }
);

// Async thunk for toggling like/unlike on an event
export const toggleLikeEvent = createAsyncThunk<
  Event,
  { eventId: number; hasLiked: boolean; token: string }
>(
  "events/toggleLikeEvent",
  async ({ eventId, hasLiked, token }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:3001/events/${eventId}/${
        hasLiked ? "unlike" : "like"
      }`;
      const method = hasLiked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to update like status");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("Failed to update like status");
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchEvents lifecycle
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.status = "succeeded";
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch events";
      })

      // Handle toggleLikeEvent lifecycle
      .addCase(
        toggleLikeEvent.fulfilled,
        (state, action: PayloadAction<Event>) => {
          const updatedEvent = action.payload;
          const index = state.events.findIndex(
            (event) => event.id === updatedEvent.id
          );
          if (index !== -1) {
            state.events[index] = updatedEvent;
          }
        }
      )
      .addCase(toggleLikeEvent.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default eventsSlice.reducer;
