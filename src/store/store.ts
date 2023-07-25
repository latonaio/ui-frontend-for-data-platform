import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import dialogReducer from './slices/dialog';
import loadingReducer from './slices/loadging';
import snackbarReducer from './slices/snackbar';
import ordersDetailReducer from './slices/orders/detail';
import deliveryDocumentDetailReducer from './slices/delivery-document/detail';
import productionOrderDetailReducer from './slices/production-order/detail';
import ordersPaginationReducer from './slices/orders/pagination';
import deliveryDocumentPaginationReducer from './slices/delivery-document/pagination';
import productionOrderPaginationReducer from './slices/production-order/pagination';
import { ordersList, } from './slices/orders/list';
import { ordersDetailList, } from './slices/orders/detail-list';
import { billOfMaterialList, } from './slices/bill-of-material/list';
import { billOfMaterialDetailList, } from './slices/bill-of-material/detail-list';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dialog: dialogReducer,
        loading: loadingReducer,
        ordersList: ordersList.reducer,
        ordersDetailList: ordersDetailList.reducer,
        ordersDetail: ordersDetailReducer,
        snackbar: snackbarReducer,
        deliveryDocumentDetail: deliveryDocumentDetailReducer,
        productionOrderDetail: productionOrderDetailReducer,
        ordersPagination: ordersPaginationReducer,
        deliveryDocumentPagination: deliveryDocumentPaginationReducer,
        productionOrderPagination: productionOrderPaginationReducer,
        billOfMaterialList: billOfMaterialList.reducer,
        billOfMaterialDetailList: billOfMaterialDetailList.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
