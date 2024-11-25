import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [openModalEntregador, setOpenModalEntregador] = useState(false);
    const [idEntregador, setIdEntregador] = useState();

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    function carregarEntregador() {

        axios.get("http://localhost:8080/api/entregador" + idEntregador)
            .then((response) => {
                setIdEntregador(response.data)
            })
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    function confirmaVisualizar(id) {
        setOpenModalEntregador(true)
        setIdEntregador(id)
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {
                alert('Entregador removido com sucesso.');
                console.log('Entregador removido com sucesso.');

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data);
                    })
            })
            .catch((error) => {
                alert('Erro ao remover um entregador.');
                console.log('Erro ao remover um entregador.');
            })
        setOpenModal(false);
    }

    return (
        <div>
            <MenuSistema tela={'entregador  '} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>RG</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Telefone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell>Entregas Realizadas</Table.HeaderCell>
                                    <Table.HeaderCell>Valor frete</Table.HeaderCell>
                                    <Table.HeaderCell>Rua</Table.HeaderCell>
                                    <Table.HeaderCell>Número</Table.HeaderCell>
                                    <Table.HeaderCell>Complemento</Table.HeaderCell>
                                    <Table.HeaderCell>Bairro</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>Estado</Table.HeaderCell>
                                    <Table.HeaderCell>CEP</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.rg}</Table.Cell>
                                        <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                        <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                        <Table.Cell>{entregador.valorFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoRua}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoNumero}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoComplemento}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoBairro}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoCidade}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoCep}</Table.Cell>
                                        <Table.Cell>{entregador.ativo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para visualizar todos os dados deste entregador'
                                                icon
                                                onClick={e => confirmaVisualizar(entregador.idEntregador)}>
                                                <Icon name='eye' />
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
            <Modal
                basic
                onClose={() => setOpenModalEntregador(false)}
                onOpen={() => setOpenModalEntregador(true)}
                open={openModalEntregador}
            >
                <Modal.Actions>
                    <Table color='orange' sortable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>CPF</Table.HeaderCell>
                                <Table.HeaderCell>RG</Table.HeaderCell>
                                <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                <Table.HeaderCell>Celular</Table.HeaderCell>
                                <Table.HeaderCell>Telefone Fixo</Table.HeaderCell>
                                <Table.HeaderCell>Entregas Realizadas</Table.HeaderCell>
                                <Table.HeaderCell>Valor frete</Table.HeaderCell>
                                <Table.HeaderCell>Rua</Table.HeaderCell>
                                <Table.HeaderCell>Número</Table.HeaderCell>
                                <Table.HeaderCell>Complemento</Table.HeaderCell>
                                <Table.HeaderCell>Bairro</Table.HeaderCell>
                                <Table.HeaderCell>Cidade</Table.HeaderCell>
                                <Table.HeaderCell>Estado</Table.HeaderCell>
                                <Table.HeaderCell>CEP</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {lista.map(entregador => (
                                <Table.Row key={entregador.id}>
                                    <Table.Cell>{entregador.nome}</Table.Cell>
                                    <Table.Cell>{entregador.cpf}</Table.Cell>
                                    <Table.Cell>{entregador.rg}</Table.Cell>
                                    <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                    <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                    <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                    <Table.Cell>{entregador.valorFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoRua}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoNumero}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoComplemento}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoBairro}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoCidade}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoCep}</Table.Cell>
                                    <Table.Cell>{entregador.ativo}</Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        {/* Aqui podem ir as ações (ex: botões de editar ou excluir) */}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Modal.Actions>
            </Modal>

        </div>
    )
}