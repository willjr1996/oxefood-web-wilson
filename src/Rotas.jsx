import React from "react";
import { Route, Routes } from "react-router-dom";
import ListCliente from "./views/cliente/ListCliente";
import FormCliente from "./views/cliente/FormCliente";
import ListEntregador from "./views/entregador/ListEntregador";
import FormEntregador from "./views/entregador/FormEntregador";
import ListProduto from "./views/produto/ListProduto";
import FormProduto from "./views/produto/FormProduto";
import ListCategoriaProduto from "./views/categoriaProduto/ListCategoriaProduto";
import FormCategoriaProduto from "./views/categoriaProduto/FormCategoriaProduto";
import FormEnderecoCliente from "./views/cliente/FormEnderecoCliente";
import Home from "./views/home/Home";
import FormLogin from "./views/login/FormLogin";
import { ProtectedRoute } from "./views/util/ProtectedRoute";
// import FormVenda from "./views/venda/FormVenda";
// import ListVenda from "./views/venda/ListVenda";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FormLogin />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/list-cliente"
          element={
            <ProtectedRoute>
              <ListCliente />
            </ProtectedRoute>
          }
        />

        <Route 
        path="list-produto" 
        element={
        <ProtectedRoute>
          <ListProduto />
          </ProtectedRoute>
        }
         />
        
        <Route 
        path="list-entregador" 
        element={
        <ProtectedRoute>
          <ListEntregador />
        </ProtectedRoute>
        }
         />
        
        <Route
          path="list-categoriaproduto"
          element={
          <ProtectedRoute>
            <ListCategoriaProduto />
          </ProtectedRoute>
          }
        />

        <Route
          path="form-categoriaproduto"
          element={
            <ProtectedRoute>
              <FormCategoriaProduto />
            </ProtectedRoute>
            }
        />

        <Route 
          path="form-cliente" 
          element={
            <ProtectedRoute>
              <FormCliente />
            </ProtectedRoute>
          }
        />

        <Route 
          path="form-enderecocliente" 
          element={
          <ProtectedRoute>
            <FormEnderecoCliente />
          </ProtectedRoute>
          }
           />

        <Route 
          path="form-produto" 
          element={
          <ProtectedRoute>
            <FormProduto />
          </ProtectedRoute>
            }
          />

        <Route 
          path="form-entregador" 
          element={
            <ProtectedRoute>
              <FormEntregador />
            </ProtectedRoute>
            }
          />

        {/* <Route path="list-venda" element={ <ListVenda/> } />
                <Route path="form-venda" element={ <FormVenda/> } /> */}
      </Routes>
    </>
  );
}

export default Rotas;