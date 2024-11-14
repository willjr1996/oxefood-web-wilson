import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Divider, Form, Icon, TextArea } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";

export default function FormProduto() {

    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
    
    function salvar() {

        let produtoRequest = {
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => {
                console.log('Produto cadastrado com sucesso.');
                alert("Produto cadastrado com sucesso");
                setCodigo("");
                setTitulo("");
                setDescricao("");
                setValorUnitario("");
                setTempoEntregaMinimo("");
                setTempoEntregaMaximo("");
            })
            .catch((error) => {
                console.log('Erro ao incluir o produto.');
                alert("Erro ao incluir o produto.");
                setCodigo("");
                setTitulo("");
                setDescricao("");
                setValorUnitario("");
                setTempoEntregaMinimo("");
                setTempoEntregaMaximo("");
            })
    }

    return (

        <div>
            
            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    placeholder='Informe o título do produto'
                                    value = {titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    width={7}
                                    placeholder='Informe o código do produto'
                                    value = {codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths={"equal"}>
                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    
                                    >
                                    <TextArea placeholder='Informe a descrição do produto' 
                                    value = {descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths={"equal"}>

                                <Form.Input
                                    fluid
                                    label='Valor unitário'
                                    required
                                    value = {valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega mínimo em minutos'
                                    placeholder='30'
                                    value = {tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega máximo em minutos'
                                    placeholder='40'
                                    value = {tempoEntregaMaximo}
                                    onChange={e => setTempoEntregaMaximo(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                disabled={
                                    !codigo || 
                                    !titulo || 
                                    !descricao || 
                                    !valorUnitario || 
                                    !tempoEntregaMinimo || 
                                    !tempoEntregaMaximo
                                  }
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
