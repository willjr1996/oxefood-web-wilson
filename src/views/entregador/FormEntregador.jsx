import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Dropdown, Radio } from 'semantic-ui-react';

const estados = [
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

export default function FormEntregador() {

    const [value, setValue] = useState(null);

    const handleChange = (e, { value }) => {
        setValue(value);
    };

    return (

        <div>

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
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={8}>
                                    <InputMask
                                        required
                                        mask="9.999.999"
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
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    required
                                    label='Fone Celular'
                                >
                                    <InputMask
                                        mask="(99) 99999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                />

                                <Form.Input
                                    fluid
                                    label='Valor por frete'
                                />

                            </Form.Group>

                            { /* Terceiro grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='Rua'
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={5}
                                />
                            </Form.Group>

                            { /* Quarto grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                />

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={6}>
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
                                        options={estados}
                                    />
                                </Form.Input>
                            </Form.Group>

                            { /* Sexto grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='Complemento'>
                                </Form.Input>
                            </Form.Group>

                            { /* Sétimo grupo */}
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label='Ativo:'>
                                    <Radio
                                        fluid
                                        label="Sim"
                                        name="radioGroup"
                                        value="Sim"
                                        checked={value === 'Sim'}
                                        onChange={handleChange}
                                    />
                                    &nbsp;&nbsp;
                                    <Radio
                                        fluid
                                        label="Não"
                                        name="radioGroup"
                                        value="Não"
                                        checked={value === 'Não'}
                                        onChange={handleChange}
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
                                Voltar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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