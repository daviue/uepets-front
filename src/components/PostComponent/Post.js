import './Post.css';
import React    from 'react'

const PostComponent = (props) => {
    return (
        <div className='post'>
            <div className='post__header'>
                <p className='donator__name'>{props?.name}</p>
            </div>
            <img src={props?.image} className='post__image' alt='Foto do animal'/>
            <div className='post__footer'>
                {props.raca && <p className='donator__contact'>Raça: {props.raca}</p>}
                <p className='description'>Descrição: {props?.desc}</p>
            </div>
        </div>
    )
}

export default PostComponent