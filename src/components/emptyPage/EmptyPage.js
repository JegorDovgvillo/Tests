import { Link } from 'react-router-dom'

import empty from '../../images/emty.svg'

import './emptyPage.scss'
import './emptyPageAdaptate.scss'

const EmptyPage = () => {

    return (
        <div className='empty-page'>
            <img src={empty} alt="empty page" />
            <p>Упс, здесь еще ничего нет!</p>
            <Link to='/'>Поиск вакансий</Link>
        </div>
    )
}
export default EmptyPage;