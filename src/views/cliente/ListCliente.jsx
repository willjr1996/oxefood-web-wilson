import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import { notifyError, notifySuccess } from '../../views/util/Util';
import MenuSistema from '../../MenuSistema';

export default function ListCliente() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [openModalEndereco, setOpenModalEndereco] = useState(false);
    const [idCliente, setIdCliente] = useState();
    const [listaEndereco, setListaEndereco] = useState([]);


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/cliente")
            .then((response) => {
                setLista(response.data)
            })
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    useEffect(() => {
        if (idCliente) {
            carregarEndereco();
        }
    }, [idCliente]);

    function confirmaVisualizar(id) {
        setIdCliente(id)
        setOpenModalEndereco(true)
    }

    function carregarEndereco() {
        axios.get("http://localhost:8080/api/cliente/" + idCliente)
            .then((response) => {
                setListaEndereco(response.data.enderecos)
            })
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/cliente/' + idRemover)
            .then((response) => {
                notifySuccess('Cliente removido com sucesso.');

                axios.get("http://localhost:8080/api/cliente")
                    .then((response) => {
                        setLista(response.data);
                    })
            })
            .catch((error) => {
                if (error.response.data.errors != undefined) {
                                        for (let i = 0; i < error.response.data.errors.length; i++) {
                                            notifyError(error.response.data.errors[i].defaultMessage)
                                     }
                             } else {
                                 notifyError(error.response.data.message)
                             }
            })
        setOpenModal(false);
    }

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(cliente => (

                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                icon
                                                onClick={e => confirmaRemover(cliente.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='purple'
                                                title='Clique aqui para visualizar o endereço do cliente'
                                                icon
                                                onClick={e => confirmaVisualizar(cliente.id)}
                                            >
                                                <Icon name='eye' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para adicionar o endereço do cliente'
                                                icon                                               
                                            >
                                                <Link to="/form-enderecocliente" state={{ id: cliente.id }} style={{ color: 'blue' }}> <Icon name='add' /> </Link>
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            {/* visualizar endereços */}
            <Modal
                basic
                onClose={() => setOpenModalEndereco(false)}
                onOpen={() => {
                    setOpenModalEndereco(true);
                    carregarEndereco();
                }}
                open={openModalEndereco}
            >
                <Header icon>
                    <Icon name='eye' />
                    Endereços do cliente
                </Header>
                <Modal.Content>
                    <div style={{ marginTop: '3%' }}>

                        <Container textAlign='justified'>

                            <Table color='orange' sortable celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Rua</Table.HeaderCell>
                                        <Table.HeaderCell>Número</Table.HeaderCell>
                                        <Table.HeaderCell>Complemento</Table.HeaderCell>
                                        <Table.HeaderCell>Bairro</Table.HeaderCell>
                                        <Table.HeaderCell>CEP</Table.HeaderCell>
                                        <Table.HeaderCell>Cidade</Table.HeaderCell>
                                        <Table.HeaderCell>Estado</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {listaEndereco.map(enderecos => (
                                        <Table.Row key={enderecos.id}>
                                            <Table.Cell>{enderecos.rua}</Table.Cell>
                                            <Table.Cell>{enderecos.numero}</Table.Cell>
                                            <Table.Cell>{enderecos.complemento}</Table.Cell>
                                            <Table.Cell>{enderecos.bairro}</Table.Cell>
                                            <Table.Cell>{enderecos.cep}</Table.Cell>
                                            <Table.Cell>{enderecos.cidade}</Table.Cell>
                                            <Table.Cell>{enderecos.estado}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Container>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={() => setOpenModalEndereco(false)}>
                        <Icon name='checkmark' /> Fechar
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}