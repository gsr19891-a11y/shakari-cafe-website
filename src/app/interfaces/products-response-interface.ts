import { MetaInterface } from "./meta-interface";
import { ProductsDataInterface } from "./products-data-interface";

export interface ProductsResponseInterface {
    data: ProductsDataInterface;
    meta: MetaInterface;

}
