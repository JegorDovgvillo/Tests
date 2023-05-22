import { useEffect, useState } from 'react'
import { getVacancy, registration, listSelector, filterVacancies, favoriteSynchronization } from './listItemsSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Vacancy from '../vacancy/Vacancy'
import Search from '../../images/Search.png'
import Filters from '../filters/Filters'
import ButtonGroup from '../buttonGroup/ButtonGroup'
import Spinner from '../spinner/Spinner'


import './listItems.scss'
import './listItemsAdaptate.scss'
import { vacancySelector } from '../vacancy/vacancySlice'

const ListItems = () => {
    const favoritesList = useSelector(vacancySelector)
    const listItems = useSelector(listSelector)
    const loadingStatus = useSelector(state => state.list.loadingStatus)
    const dispatch = useDispatch()
    const [term, setTerm] = useState('')
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(4)

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const current = listItems.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(listItems.length / perPage)

    useEffect(() => {
        dispatch(registration())
        dispatch(getVacancy())
        if (favoritesList.length > 0) {
            dispatch(favoriteSynchronization(favoritesList))
        }
    }, [])

    const nextPageOnButton = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const nextPageOnArrow = (e) => {
        if (e.currentTarget.className === 'back' && currentPage > 1) {
            setCurrentPage(currentPage => currentPage - 1)
        } else {
            setCurrentPage(currentPage => currentPage)
        }
        if (e.currentTarget.className === 'forward' && currentPage < totalPages) {
            setCurrentPage(currentPage => currentPage + 1)
        } else {
            setCurrentPage(currentPage => currentPage)
        }
    }

    const filteredVacancies = current.filter(item => {
        return item.title.toLowerCase().includes(term.toLowerCase())
    })

    const onSearch = () => {
        if (term) {
            dispatch(filterVacancies(filteredVacancies))
        } else {
            dispatch(getVacancy())
        }
    }

    function renderItems(data) {
        const item = data.map((item, i) => {
            return (
                <Vacancy
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    paymentFrom={item.paymentFrom}
                    currency={item.currency}
                    paymentTo={item.paymentTo}
                    typeOfWork={item.typeOfWork}
                    city={item.city}
                    isfavorite={item.isfavorite}
                    information={item.information} />
            )
        })
        return (
            <>
                {item}
            </>
        )
    }

    const listVacancies = renderItems(current)

    return (
        <>
            {(listItems.length === 0 && loadingStatus === 'idle') ?
                navigate('/emptyPage') :
                <div className="container">
                    <Filters term={term} />
                    <div className='list'>
                        <div className='list__search'>
                            <img src={Search} alt='search' />
                            <input placeholder='Введите название вакансии'
                                data-elem="search-input" value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            <button type='button' data-elem="search-button" onClick={() => onSearch()}>
                                <p>
                                    Поиск
                                </p>
                            </button>
                        </div>
                        {(loadingStatus === 'loading') ?
                            <Spinner /> :
                            <>
                                <div className='list__vacancies'>
                                    {listVacancies}
                                </div>
                                <ButtonGroup
                                    nextPageOnArrow={nextPageOnArrow}
                                    currentPage={currentPage}
                                    perPage={perPage}
                                    totalVacancies={listItems.length}
                                    nextPageOnButton={nextPageOnButton} />
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ListItems;

