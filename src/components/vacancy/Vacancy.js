import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toFavorite, deleteFavorite, checkInfo, backToVacancies } from './vacancySlice'
import { useNavigate } from 'react-router-dom'

import Icon from '../../images/Icon.svg'

import './vacancy.scss'
import './vacancyAdaptate.scss'

const Vacancy = ({ title, paymentFrom, currency, paymentTo, typeOfWork, city,
    id, isfavorite, information }) => {

    const [favorite, setFavorite] = useState(isfavorite)
    const viewed = useSelector(state => state.vacancy.viewed)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toFavorites = (id) => {
        const item = {
            title,
            paymentFrom,
            currency,
            paymentTo,
            typeOfWork,
            isfavorite: true,
            city,
            id,
            information
        }
        setFavorite(favorite => !favorite)
        if (favorite) {
            dispatch(deleteFavorite(id))
        } else {
            dispatch(toFavorite(item))
        }
    }

    const checkInformation = () => {
        if (viewed) {
            dispatch(backToVacancies())
            navigate('/')
        } else {
            console.log(favorite)
            const item = {
                title,
                paymentFrom,
                currency,
                paymentTo,
                typeOfWork,
                city,
                id,
                favorite,
                information
            }
            dispatch(checkInfo(item))
            navigate('/information')
        }
    }

    return (
        <div className="item" data-elem={`vacancy-${id}`}>
            <div className='item__wrap' onClick={() => {
                checkInformation()
            }}>
                <div className="item__title">
                    <h3>{title}</h3>
                </div>
                <div className='item__info'>
                    <h4 className='item__info-salary'>
                        {(paymentFrom === 0) ? null : (paymentTo === 0) ?
                            `з/п ${paymentFrom} ${currency} ` : `з/п от ${paymentFrom} - `}
                        {(paymentTo === 0) ? null : (paymentFrom === 0) ?
                            `з/п до ${paymentTo} ${currency}` : `до ${paymentTo} ${currency}`}</h4>
                    <div className='item__info-type'>
                        <div className='technical'></div>
                        <h4>{typeOfWork}</h4>
                    </div>
                </div>
                <div className='item__location'>
                    <img src={Icon} alt='location' />
                    <h4>{city}</h4>
                </div>
            </div>
            <svg width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-elem={`vacancy-${id}-shortlist-button`}
                style={favorite ? { fill: '#5E96FC' } : { fill: 'transparent' }}
                onClick={() => toFavorites(id)}>
                <path d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z" stroke="#ACADB9" strokeWidth="1.5" />
            </svg>
        </div>
    )
}

export default Vacancy;