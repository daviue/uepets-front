import './Feed.css';
import React, { useState, useEffect }   from 'react'
import HeaderComponent                  from '../../components/Header/HeaderComponent'
import PostComponent                    from '../../components/PostComponent/Post';
import api 					            from '../../services/api';


const Feed = () => {
    const [posts, setPosts] = useState([]);

	useEffect(() => {
		api
			.get('/pets')
			.then((response) => setPosts(response.data))
			.catch((err) => {
				console.error('ops! ocorreu um erro:\n' + err);
			});
	}, []);

    return (
        <div className='feed-container'>
            <HeaderComponent path='/feed/create' text='Criar Postagem'/>
            <div className='feed'>
                {posts.length > 0 ? posts.map((post) => (
                    <PostComponent name={post.nome} image={post.foto} desc={post.descricao} raca={post.raca} />
                )) : <h1>Carregando...</h1>}
            </div>
        </div>
    )
}

export default Feed