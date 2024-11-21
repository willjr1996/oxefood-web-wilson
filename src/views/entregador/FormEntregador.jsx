import React, { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Dropdown, Radio } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";

export default function FormEntregador() {

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

    const [enderecoUf, setEnderecoUf] = useState();
    const handleChange = (e, { value }) => {
        setEnderecoUf(value);
    };

    const [ativo, setAtivo] = useState(true);
    const handleChangeRadio = (e, { value }) => {
        setAtivo(value);
    };

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();

    function salvar() {
        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            ativo: ativo
        }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.');
                console.log(ativo);
                alert("Entregador cadastrado com sucesso");
                setNome("");
                setCpf("");
                setRg("");
                setDataNascimento("");
                setFoneCelular("");
                setFoneFixo("");
                setQtdEntregasRealizadas("");
                setValorFrete("");
                setEnderecoRua("");
                setEnderecoComplemento("");
                setEnderecoNumero("");
                setEnderecoBairro("");
                setEnderecoCidade("");
                setEnderecoCep("");
                setEnderecoUf("");
                setAtivo(null);
            })
            .catch((error) => {
                console.log('Erro ao incluir o entregador.');
                alert("Erro ao incluir o entregador.");
                setNome("");
                setCpf("");
                setRg("");
                setDataNascimento("");
                setFoneCelular("");
                setFoneFixo("");
                setQtdEntregasRealizadas("");
                setValorFrete("");
                setEnderecoRua("");
                setEnderecoComplemento("");
                setEnderecoNumero("");
                setEnderecoBairro("");
                setEnderecoCidade("");
                setEnderecoCep("");
                setEnderecoUf("");
                setAtivo(null);
            })
    }

    return (

        <div>
            
            <MenuSistema tela={'entregador'} />
            
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>
                            { /* primeiro grupo */}
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
                                    required
                                    fluid
                                    label='CPF'
                                    width={8}
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={8}
                                >
                                    <InputMask
                                        required
                                        mask="9.999.999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            { /* Segundo grupo */}
                            <Form.Group widths="equal">

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    required
                                    label='Fone Celular'
                                >
                                    <InputMask
                                        mask="(99) 99999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Valor por frete'
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                />

                            </Form.Group>

                            { /* Terceiro grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={5}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                />
                            </Form.Group>

                            { /* Quarto grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={6}
                                    >
                                    <InputMask
                                    mask="99999-999"
                                    value={enderecoCep}
                                    onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            { /* Quinto grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='UF'>
                                    <Dropdown
                                        placeholder='Selecione'
                                        fluid
                                        selection
                                        options={uf}
                                        value={enderecoUf}
                                        onChange={handleChange}
                                    />
                                </Form.Input>
                            </Form.Group>

                            { /* Sexto grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    value={enderecoComplemento}
                                    onChange={e => setEnderecoComplemento(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>

                            { /* Sétimo grupo */}
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Ativo:</label>
                                    <Radio
                                        label="Sim"
                                        name="radioGroup"
                                        value={true}
                                        checked={ativo === true}
                                        onChange={handleChangeRadio}
                                    />
                                    &nbsp;&nbsp;
                                    <Radio
                                        label="Não"
                                        name="radioGroup"
                                        value={false}
                                        checked={ativo === false}
                                        onChange={handleChangeRadio}
                                    />
                                </Form.Field>
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
                            <Link to={'/list-entregador'}>Voltar</Link>                            
                        </Button>

                        <Button
                            inverted
                            circular
                            icon
                            labelPosition='left'
                            color='blue'
                            floated='right'
                            disabled={!nome || 
                                !cpf || 
                                !rg || 
                                !dataNascimento || 
                                !foneCelular || 
                                !foneFixo || 
                                !qtdEntregasRealizadas || 
                                !valorFrete || 
                                !enderecoRua || 
                                !enderecoComplemento || 
                                !enderecoNumero || 
                                !enderecoBairro || 
                                !enderecoCidade || 
                                !enderecoCep || 
                                !enderecoUf
                                }
                            onClick={() => salvar()}
                        >
                            <Icon name='save' />
                            Salvar
                        </Button>

                    </div>

            </div>

        </Container>
            </div >
        </div >

    );
}