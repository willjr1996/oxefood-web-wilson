import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Divider,
  Form,
  FormGroup,
  Icon,
  TextArea,
} from "semantic-ui-react";
import { notifyError, notifySuccess } from "../../views/util/Util";
import MenuSistema from "../../MenuSistema";

export default function FormProduto() {
  const { state } = useLocation();
  const [idProduto, setIdProduto] = useState();
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
  const [listaCategoria, setListaCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setIdProduto(response.data.id);
          setCodigo(response.data.codigo);
          setTitulo(response.data.titulo);
          setDescricao(response.data.descricao);
          setValorUnitario(response.data.valorUnitario);
          setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
          setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
          setIdCategoria(response.data.categoria.id);
        });
    }
    axios.get("http://localhost:8080/api/categoriaproduto").then((response) => {
      const dropDownCategorias = response.data.map((c) => ({
        text: c.descricao,
        value: c.id,
      }));
      setListaCategoria(dropDownCategorias);
    });
  }, [state]);

  function salvar() {
    let produtoRequest = {
      idCategoria: idCategoria,
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };

    if (idProduto != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then((response) => {
          notifySuccess("Produto alterado com sucesso.");
        })
        .catch((error) => {
          if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
              notifyError(error.response.data.errors[i].defaultMessage);
            }
          } else {
            notifyError(error.response.data.message);
          }
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
          notifySuccess("Produto cadastrado com sucesso.");
        })
        .catch((error) => {
          if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
              notifyError(error.response.data.errors[i].defaultMessage);
            }
          } else {
            notifyError(error.response.data.message);
          }
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  placeholder="Informe o título do produto"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Código do Produto"
                  width={7}
                  placeholder="Informe o código do produto"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <FormGroup widths={"equal"}>
                <Form.Select
                  required
                  fluid
                  tabIndex="3"
                  placeholder="Selecione"
                  label="Categoria"
                  options={listaCategoria}
                  value={idCategoria}
                  onChange={(e, { value }) => {
                    setIdCategoria(value);
                  }}
                />
              </FormGroup>

              <Form.Group widths={"equal"}>
                <Form.Input fluid label="Descrição">
                  <TextArea
                    placeholder="Informe a descrição do produto"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.Input
                  fluid
                  label="Valor unitário"
                  required
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de entrega mínimo em minutos"
                  placeholder="30"
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de entrega máximo em minutos"
                  placeholder="40"
                  value={tempoEntregaMaximo}
                  onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                ></Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                <Link to={"/list-produto"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                disabled={
                  !codigo ||
                  !idCategoria ||
                  !titulo ||
                  !descricao ||
                  !valorUnitario ||
                  !tempoEntregaMinimo ||
                  !tempoEntregaMaximo
                }
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
