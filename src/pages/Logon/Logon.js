import './Logon.css';
import React, { useState } 		from 'react'
import HeaderComponent 			from '../../components/Header/HeaderComponent';
import styled, { css } 			from 'styled-components';
import { useNavigate } 		    from 'react-router-dom';
import api 					    from '../../services/api';


const sharedStyles = css`
	background-color: #eee;
	height: 40px;
	border-radius: 5px;
	border: 1px solid #ddd;
	margin: 10px 0 20px 0;
	padding: 20px;
	box-sizing: border-box;
`

const StyledFormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
    min-height: 100vh;
	padding: 0 20px;
`

const StyledForm = styled.form`
	width: 100%;
	max-width: 500px;
	padding: 40px;
	background-color: #fff;
	border-radius: 10px;
	box-sizing: border-box;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledInput = styled.input`
	display: block;
	width: 100%;
	${sharedStyles};
`

const StyledButton = styled.button`
	display: block;
	background-color: #12fd8c;
	color: #fff;
	font-size: .9rem;
	border: 0;
	border-radius: 5px;
	height: 40px;
	padding: 0 20px;
	cursor: pointer;
	box-sizing: border-box;
`

const CreateAccount = styled.span`
    font-size: 1rem;
    margin: .5rem 0;
`

const CreateAccountButton = styled.span`
    color: #12fd8c;
    cursor: pointer;
    font-weight: 700;
`

const initialState = () => {
	return {
		nome: '',
		email: '',
		senha: '',
		telefone: '',
	};
};

const Logon = () => {
    const history = useNavigate();
	const [values, setValues] = useState(initialState);

	const onChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const createUser = () => {
		api
			.post('/usuarios/', values)
			.then((response) => loginRedirect(response))
			.catch((err) => {
				console.error('ops! ocorreu um erro:\n' + err);
			});
	};

	const loginRedirect = (response) => {
		if (response.status === 201) {
			sessionStorage.setItem('userid', response?.data?.id);
			history('/feed');
		} else {
			alert('Erro ao criar usuário');
		}
	};

    return (
        <div className='login-body'>
			<HeaderComponent path='/' text='Voltar'/>
			<StyledFormWrapper>
				<StyledForm>
					<h2>Crie sua conta abaixo</h2>
					<CreateAccount>Já tem uma conta? <CreateAccountButton onClick={() => history('/entrar')}>Entrar</CreateAccountButton></CreateAccount>
					<StyledInput type="text" name="nome" placeholder="Nome"  onChange={onChange} value={values.nome}/>
					<StyledInput type="email" name="email" placeholder="Email"  onChange={onChange} value={values.email}/>
					<StyledInput type="password" name="senha" placeholder="Senha"  onChange={onChange} value={values.senha}/>
					<StyledInput type="number" name="telefone" placeholder="Telefone"  onChange={onChange} value={values.telefone}/>
					<StyledButton type='button' onClick={createUser}>Cadastrar</StyledButton>
				</StyledForm>
			</StyledFormWrapper>
        </div>
    )
}

export default Logon