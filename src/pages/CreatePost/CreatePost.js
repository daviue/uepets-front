import './CreatePost.css'
import React, { useState } from 'react'
import HeaderComponent                  from '../../components/Header/HeaderComponent'
import styled, { css } 			from 'styled-components';
import { useNavigate } 		    from 'react-router-dom';
import { useUserContext } 		from '../../contexts/userContext';
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
    font-weight: 700;
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
		descricao: '',
		idade: '',
		raca: '',
        foto: '',
        usuario: '',
	};
};

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

const CreatePost = () => {
    const history = useNavigate();
	const [values, setValues] = useState(initialState);

	const onChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const createPost = () => {
		const id = sessionStorage.getItem('userid') || 1;
        values.usuario = id;
        api
		    .post('/pets/', values)
		    .then((response) => redirect(response))
		    .catch((err) => {
		    	console.error('ops! ocorreu um erro:\n' + err);
		    });
	};

	const redirect = (response) => {
		if (response.status === 201) {
			history('/feed');
		} else {
			alert('Usuário ou senha inválidos');
		}
	};

    const convertToBlob = (file) => {
        if(!file) {
            values.foto = '';
        return;
        }
    
        fileToDataUri(file)
            .then(dataUri => {
                values.foto = dataUri;
        })
        
    }

    return (
        <div className='create-body'>
			<HeaderComponent path='/feed' text='Voltar'/>
			<StyledFormWrapper>
				<StyledForm>
					<StyledInput type="text" name="nome" placeholder="Nome"  onChange={onChange} value={values.nome} required />
					<StyledInput type="text" name="raca" placeholder="Raça"  onChange={onChange} value={values.raca}/>
					<StyledInput type="text" name="idade" placeholder="Idade (Meses)"  onChange={onChange} value={values.idade}/>
					<StyledInput type="textarea" name="descricao" placeholder="Descrição"  onChange={onChange} value={values.descricao}/>
                    <input className='custom-file-upload' type="file" onChange={(event) => convertToBlob(event.target.files[0] || null)} />
					<StyledButton type='button' onClick={createPost}>Criar Publicação</StyledButton>
				</StyledForm>
			</StyledFormWrapper>
        </div>
    )
}

export default CreatePost