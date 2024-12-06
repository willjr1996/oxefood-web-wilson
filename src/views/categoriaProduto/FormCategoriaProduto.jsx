import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormCliente() {

    const { state } = useLocation();
    const [idCategoria, setIdCategoria] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/categoriaproduto/" + state.id)
                .then((response) => {
                    setIdCategoria(response.data.descricao);
                })
        }
    }, [state])

    function salvar() {

        let categoriaProdutoRequest = {
            descricao: descricao
        }

        if (idCategoria != null) { //Alteração:
            axios.put("http://localhost:8080/api/categoriaproduto/" + idCategoria, categoriaProdutoRequest)
                .then((response) => { 
                    alert('Categoria alterada com sucesso.');
                    console.log('Categoria alterada com sucesso.') ;
                })
                .catch((error) => { 
                    alert('Erro ao alterar uma categoria.');
                    console.log('Erro ao alterar uma categoria.');
                })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/categoriaproduto", categoriaProdutoRequest)
                .then((response) => { 
                    alert('Categoria cadastrada com sucesso.'); 
                    console.log('Categoria cadastrada com sucesso.'); 
                })
                .catch((error) => { 
                    alert('Erro ao incluir o Categoria.'); 
                    console.log('Erro ao incluir o categoria.'); 
                })
        }
    }

    return (

        <div>
            <MenuSistema tela={'cliente'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idCategoria === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCategoria != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='CPF'
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 99999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
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
                                <Link to={'/list-cliente'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                disabled={!nome || !cpf || !dataNascimento || !foneCelular || !foneFixo}
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