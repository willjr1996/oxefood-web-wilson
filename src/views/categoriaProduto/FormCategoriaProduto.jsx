import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import { notifyError, notifySuccess } from "../../views/util/Util";
import MenuSistema from "../../MenuSistema";

export default function FormCategoriaProduto() {
  const { state } = useLocation();
  const [descricao, setDescricao] = useState();
  const [idCategoria, setIdCategoria] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/categoriaproduto/" + state.id)
        .then((response) => {
          setIdCategoria(response.data.id);
          setDescricao(response.data.descricao);
        });
    }
  }, [state]);

  function salvar() {
    let categoriaProdutoRequest = {
      descricao: descricao,
    };

    if (idCategoria != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8080/api/categoriaproduto/" + idCategoria,
          categoriaProdutoRequest
        )
        .then((response) => {
          notifySuccess("Categoria alterada com sucesso.");
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
        .post(
          "http://localhost:8080/api/categoriaproduto",
          categoriaProdutoRequest
        )
        .then((response) => {
          notifySuccess("Categoria cadastrada com sucesso.");
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
      <MenuSistema tela={"categoriaProduto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCategoria === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idCategoria != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria &nbsp;
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
                  label="Descrição"
                  maxLength="100"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
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
                <Link to={"/list-categoriaproduto"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                disabled={!descricao}
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
