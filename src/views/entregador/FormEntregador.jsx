import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormEntregador () {

    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>
                        { /* primeiro grupo */ }
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
                            
                            { /* Segundo grupo */ }
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

                            { /* Terceiro grupo */ }
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

                            { /* Quarto grupo */ }
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
                                    <InputMask 
                                        mask="99999-999"
                                        placeholder='Ex: 00000-000'
                                    />
                                    </Form.Input>
                            </Form.Group>


                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

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
