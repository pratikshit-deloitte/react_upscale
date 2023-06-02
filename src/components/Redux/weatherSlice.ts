import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  cityNames: { name: string; id: number; data: object }[];
  id: number;
}

const initialState: WeatherState = { cityNames: [], id: 0 };

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCityName: (state, action: PayloadAction<{ name: string; data: object }>) => {
      state.cityNames.push({ name: action.payload.name, data: action.payload.data, id: state.id });
      state.id++;
    },
    removeCityName: (state, action: PayloadAction<{}>) => {
      state.cityNames = state.cityNames.filter((city) => city.name !== action.payload);
    },
  },
});

export const { addCityName, removeCityName } = weatherSlice.actions;
export const selectCityNames = (state: { weather: WeatherState }) => state.weather.cityNames;
