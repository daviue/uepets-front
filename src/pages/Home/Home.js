import React from 'react'
import './Home.css';
import Dog from '../../assets/dog.png';
import { useNavigate } 		    from 'react-router-dom';
import HeaderComponent from '../../components/Header/HeaderComponent';


const Home = () => {
    const history = useNavigate();

    return (
        <div className='home'>
            <HeaderComponent path='/entrar' text='Entrar / Cadastrar'/>
            <main className="home-main">
                <div className="home-main__content">
                    <h1 className="home-main__title">Encontre ou anuncie Pets em um só lugar</h1>
                    <p className="home-main__description">A UePets busca facilitar a adoção encontrando ou anunciando pets através do nosso Feed.</p>
                    <button className="home-main__button" onClick={() => history('/feed')}>Ver Feed →</button>
                </div>
                <div className="home-main__banner">
                    <img src={Dog} alt="Dog" className="home-main__img"/>
                </div>
            </main>
        </div>
    )
}

export default Home