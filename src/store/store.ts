import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import dialogReducer from './slices/dialog';
import loadingReducer from './slices/loadging';
import ordersDetailReducer from './slices/orders/detail';
import deliveryDocumentDetailReducer from './slices/delivery-document/detail';
import productionOrderDetailReducer from './slices/production-order/detail';
import ordersPaginationReducer from './slices/orders/pagination';
import deliveryDocumentPaginationReducer from './slices/delivery-document/pagination';
import productionOrderPaginationReducer from './slices/production-order/pagination';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dialog: dialogReducer,
        loading: loadingReducer,
        ordersDetail: ordersDetailReducer,
        deliveryDocumentDetail: deliveryDocumentDetailReducer,
        productionOrderDetail: productionOrderDetailReducer,
        ordersPagination: ordersPaginationReducer,
        deliveryDocumentPagination: deliveryDocumentPaginationReducer,
        productionOrderPagination: productionOrderPaginationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
