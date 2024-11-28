import React from 'react';
import { Route, Routes } from "react-router-dom";
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from "./views/produto/ListProduto"
import ListEntregador from './views/entregador/ListEntregador';
import FormEmpresa from  './views/empresa/FormEmpresa';
import ListEmpresa from './views/empresa/ListEmpresa'

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                
                <Route path="list-empresa" element={ <ListEmpresa/> } />
                
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                
                <Route path="form-empresa" element={ <FormEmpresa/> } />
            </Routes>
        </>
    )
}

export default Rotas