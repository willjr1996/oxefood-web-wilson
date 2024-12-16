import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './views/home/Home';
import ListCliente from './views/cliente/ListCliente';
import FormCliente from './views/cliente/FormCliente';
import ListEntregador from './views/entregador/ListEntregador';
import FormEntregador from './views/entregador/FormEntregador';
import ListProduto from "./views/produto/ListProduto"
import FormProduto from './views/produto/FormProduto';
import ListCategoriaProduto from "./views/categoriaProduto/ListCategoriaProduto";
import FormCategoriaProduto from "./views/categoriaProduto/FormCategoriaProduto";
import FormEnderecoCliente from './views/cliente/FormEnderecoCliente';
// import FormVenda from "./views/venda/FormVenda";
// import ListVenda from "./views/venda/ListVenda";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                <Route path="list-categoriaproduto" element={ <ListCategoriaProduto/> } />
                <Route path="form-categoriaproduto" element={ <FormCategoriaProduto/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-enderecocliente" element={ <FormEnderecoCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                {/* <Route path="list-venda" element={ <ListVenda/> } />
                <Route path="form-venda" element={ <FormVenda/> } /> */}
            </Routes>
        </>
    )
}

export default Rotas