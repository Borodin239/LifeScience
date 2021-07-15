const onThunkError = (error: any, thunkAPI: any) => {
    if (error.name === 'ApiError') {
        return thunkAPI.rejectWithValue({name: 'ApiError', description: error.description});
    }

    throw error;
}

export default onThunkError;
