import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Dropdown } from 'semantic-ui-react';
import { notifyError, notifySuccess } from '../../views/util/Util';
import MenuSistema from '../../MenuSistema';

export default function FormEnderecoCliente() {
    
    const { state } = useLocation();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cep, setCep] = useState();
    const [cidade, setCidade] = useState();
    const [complemento, setComplemento] = useState();
 
    const uf = [
        { key: 'AC', text: 'Acre', value: 'Acre' },
        { key: 'AL', text: 'Alagoas', value: 'Alagoas' },
        { key: 'AP', text: 'Amapá', value: 'Amapá' },
        { key: 'AM', text: 'Amazonas', value: 'Amazonas' },
        { key: 'BA', text: 'Bahia', value: 'Bahia' },
        { key: 'CE', text: 'Ceará', value: 'Ceará' },
        { key: 'DF', text: 'Distrito Federal', value: 'Distrito Federal' },
        { key: 'ES', text: 'Espírito Santo', value: 'Espírito Santo' },
        { key: 'GO', text: 'Goiás', value: 'Goiás' },
        { key: 'MA', text: 'Maranhão', value: 'Maranhão' },
        { key: 'MT', text: 'Mato Grosso', value: 'Mato Grosso' },
        { key: 'MS', text: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul' },
        { key: 'MG', text: 'Minas Gerais', value: 'Minas Gerais' },
        { key: 'PA', text: 'Pará', value: 'Pará' },
        { key: 'PB', text: 'Paraíba', value: 'Paraíba' },
        { key: 'PR', text: 'Paraná', value: 'Paraná' },
        { key: 'PE', text: 'Pernambuco', value: 'Pernambuco' },
        { key: 'PI', text: 'Piauí', value: 'Piauí' },
        { key: 'RJ', text: 'Rio de Janeiro', value: 'Rio de Janeiro' },
        { key: 'RN', text: 'Rio Grande do Norte', value: 'Rio Grande do Norte' },
        { key: 'RS', text: 'Rio Grande do Sul', value: 'Rio Grande do Sul' },
        { key: 'RO', text: 'Rondônia', value: 'Rondônia' },
        { key: 'RR', text: 'Roraima', value: 'Roraima' },
        { key: 'SC', text: 'Santa Catarina', value: 'Santa Catarina' },
        { key: 'SP', text: 'São Paulo', value: 'São Paulo' },
        { key: 'SE', text: 'Sergipe', value: 'Sergipe' },
        { key: 'TO', text: 'Tocantins', value: 'Tocantins' },
    ];

    const [estado, setEstado] = useState();
    const handleChange = (e, { value }) => {
        setEstado(value);
    };

    // useEffect(() => {
    //     if (state != null && state.id != null) {
    //         axios.get("http://localhost:8080/api/cliente/" + state.id)
    //             .then((response) => {
    //                 setIdCliente(response.data.id)
    //                 setNome(response.data.nome)
    //                 setCpf(response.data.cpf)
    //                 setDataNascimento(formatarData(response.data.dataNascimento))
    //                 setFoneCelular(response.data.foneCelular)
    //                 setFoneFixo(response.data.foneFixo)
    //             })
    //     }
    // }, [state])

    // function formatarData(dataParam) {

    //     if (dataParam === null || dataParam === '' || dataParam === undefined) {
    //         return ''
    //     }

    //     let arrayData = dataParam.split('-');
    //     return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    // }

    function salvar() {

        let enderecoRequest = {
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            complemento:complemento
        }

        // if (idCliente != null) { //Alteração:
        //     axios.put("http://localhost:8080/api/cliente/" + idCliente, enderecoRequest)
        //         .then((response) => { 
        //             alert('Cliente alterado com sucesso.');
        //             console.log('Cliente alterado com sucesso.') ;
        //         })
        //         .catch((error) => { 
        //             alert('Erro ao alterar um cliente.');
        //             console.log('Erro ao alterar um cliente.');
        //         })
        // } else { //Cadastro:
        //     axios.post("http://localhost:8080/api/cliente", clienteRequest)
        //         .then((response) => { 
        //             alert('Cliente cadastrado com sucesso.'); 
        //             console.log('Cliente cadastrado com sucesso.'); 
        //         })
        //         .catch((error) => { 
        //             alert('Erro ao incluir o cliente.'); 
        //             console.log('Erro ao incluir o cliente.'); 
        //         })
        // }

        axios.post(`http://localhost:8080/api/cliente/endereco/${state.id}`, enderecoRequest)
                .then((response) => { 
                    notifySuccess('Endereço cadastrado com sucesso.');
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
    }

    return (

        <div>
            <MenuSistema tela={'cliente'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {/* {idCliente === undefined && */}
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro de Endereço</h2>
                    {/* } */}
                    {/* {idCliente != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    } */}

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Rua'
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Numero'
                                    width={5}
                                >
                                    <InputMask
                                        required
                                        value={numero}
                                        onChange={e => setNumero(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Bairro'
                                    width={6}>
                                    <InputMask
                                        value={bairro}
                                        onChange={e => setBairro(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='CEP'
                                    width={6}>
                                    <InputMask
                                        mask="99999-999"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths={"equal"}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Cidade'
                                    width={10}
                                >
                                    <InputMask
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                    />
                                </Form.Input>
         
                                <Form.Input
                                    required
                                    fluid
                                    label='Estado'
                                    width={10}
                                    >
                                    <Dropdown
                                        placeholder='Selecione'
                                        fluid
                                        selection
                                        options={uf}
                                        value={estado}
                                        onChange={handleChange}
                                        
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={6}
                                >
                                    <InputMask
                                        value={complemento}
                                        onChange={e => setComplemento(e.target.value)}
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
                                disabled={!rua || !numero || !bairro || !cep || !cidade || !estado}
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