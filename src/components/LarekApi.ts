import { Api, ApiListResponse } from './base/api'; 
import { IProduct, IOrder, IOrderResult } from '../types'; 

export class LarekApi extends Api {
 
    getProductList(): Promise<ApiListResponse<IProduct>> {
        return this.get('/product').then(data => data as ApiListResponse<IProduct>);
    }

    getProductById(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(data => data as IProduct);
    }
    getProductByCategory(category: string): Promise<ApiListResponse<IProduct>> {
        return this.get(`/product/category/${category}`).then(data => data as ApiListResponse<IProduct>);
    }

 
    sendOrder(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(data => data as IOrderResult);
    }
}
