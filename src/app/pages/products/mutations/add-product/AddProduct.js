// import ProductForm from "./form";
import { ProductForm } from '../../components';

const AddProduct = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 5px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;';
    document.body.setAttribute('style', bodyStyles)
    return (
        <ProductForm/>
    )
}

const AddNewProduct = () => (
    <AddProduct />
)

export { AddNewProduct }