import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";

import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
  Menu,
  Segment,
  FormInput,
  FormSelect,
} from "semantic-ui-react";
import { notifyError, notifySuccess } from "../../views/util/Util";
import MenuSistema from "../../MenuSistema";

export default function ListProduto() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [menuFiltro, setMenuFiltro] = useState();
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [idCategoria, setIdCategoria] = useState();
  const [listaCategoriaProduto, setListaCategoriaProduto] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/produto").then((response) => {
      setLista(response.data);
    });
    axios.get("http://localhost:8080/api/categoriaproduto")
      .then((response) => {
        const dropDownCategorias = [{ text: '', value: '' }];
        response.data.forEach(c => {
          dropDownCategorias.push({ text: c.descricao, value: c.id });
        });
        setListaCategoriaProduto(dropDownCategorias);
      });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios.delete("http://localhost:8080/api/produto/" + idRemover)
      .then(() => {
        notifySuccess("Produto removido com sucesso.");
        carregarLista();
      })
      .catch((error) => {
        if (error.response.data.errors) {
          error.response.data.errors.forEach(err => notifyError(err.defaultMessage));
        } else {
          notifyError(error.response.data.message);
        }
      });
    setOpenModal(false);
  }

  function handleMenuFiltro() {
    setMenuFiltro(prev => !prev);
  }

  function handleChangeCodigo(value) {
    filtrarProdutos(value, titulo, idCategoria);
  }

  function handleChangeTitulo(value) {
    filtrarProdutos(codigo, value, idCategoria);
  }

  function handleChangeCategoriaProduto(value) {
    filtrarProdutos(codigo, titulo, value);
  }

  async function filtrarProdutos(codigoParam, tituloParam, idCategoriaParam) {
    let formData = new FormData();
    if (codigoParam !== undefined) setCodigo(codigoParam);
    if (tituloParam !== undefined) setTitulo(tituloParam);
    if (idCategoriaParam !== undefined) setIdCategoria(idCategoriaParam);

    formData.append("codigo", codigoParam || "");
    formData.append("titulo", tituloParam || "");
    formData.append("idCategoria", idCategoriaParam || "");

    await axios.post("http://localhost:8080/api/produto/filtrar", formData)
      .then((response) => setLista(response.data));
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Produto </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Menu compact>
              <Menu.Item
                name="menuFiltro"
                active={menuFiltro === true}
                onClick={handleMenuFiltro}
              >
                <Icon name="filter" />
                Filtrar
              </Menu.Item>
            </Menu>

            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-produto"
            />

            {menuFiltro ?

              <Segment>
                <Form className="form-filtros">

                  <Form.Input
                    icon="search"
                    value={codigo}
                    onChange={e => handleChangeCodigo(e.target.value)}
                    label='Código do Produto'
                    placeholder='Filtrar por Código do Produto'
                    labelPosition='left'
                    width={4}
                  />

                  <Form.Group widths='equal'>
                    <Form.Input
                      icon="search"
                      value={titulo}
                      onChange={e => handleChangeTitulo(e.target.value)}
                      label='Título'
                      placeholder='Filtrar por título'
                      labelPosition='left'
                    />

                    <Form.Select
                      placeholder='Filtrar por Categoria'
                      label='Categoria'
                      options={listaCategoriaProduto}
                      value={idCategoria}
                      onChange={(e, { value }) => {
                        handleChangeCategoriaProduto(value)
                      }}
                    />
                  </Form.Group>
                </Form>
              </Segment> : ""
            }
            <br /><br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Código</Table.HeaderCell>
                  <Table.HeaderCell>Categoria</Table.HeaderCell>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Valor unitário</Table.HeaderCell>
                  <Table.HeaderCell>Tempo de entrega mínimo</Table.HeaderCell>
                  <Table.HeaderCell>Tempo de entrega Máximo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>{produto.codigo}</Table.Cell>
                    <Table.Cell>{produto.categoria.descricao}</Table.Cell>
                    <Table.Cell>{produto.titulo}</Table.Cell>
                    <Table.Cell>{produto.descricao}</Table.Cell>
                    <Table.Cell>{produto.valorUnitario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMinimo} Min</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMaximo} Min</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button as={Link} to="/form-produto" state={{ id: produto.id }} color="green" icon="edit" />
                      <Button color="red" icon="trash" onClick={() => confirmaRemover(produto.id)} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
}