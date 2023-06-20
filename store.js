import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customerSliceReducer } from './reducer';


const rootReducer = combineReducers({
    customer: customerSliceReducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['loader', 'customer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
})

export default store;

export const persistor = persistStore(store);
export const resetStore = async () => {
    return await persistor.purge().then(() => persistor.flush());
}

