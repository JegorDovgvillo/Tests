import { useSelector } from "react-redux";
import { useState } from "react";
import { vacancySelector } from "../vacancy/vacancySlice";

import Vacancy from "../vacancy/Vacancy";
import EmptyPage from "../emptyPage/EmptyPage";
import ButtonGroup from "../buttonGroup/ButtonGroup";

import './favoritesList.scss'

const FavoritesList = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(4)
    const vacancy = useSelector(vacancySelector)

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const current = vacancy.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(vacancy.length / perPage)

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

    function renderItems(data) {
        const item = data.map((item) => {
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
                    isfavorite={true}
                    information={item.information} />
            )
        })
        return (
            <>
                {item}
            </>
        )
    }

    const list = renderItems(current)

    return (
        <>
            {(vacancy.length === 0) ? <EmptyPage /> :
                <div className='favorites'>
                    {list}
                    <ButtonGroup
                        currentPage={currentPage}
                        nextPageOnArrow={nextPageOnArrow}
                        perPage={perPage}
                        totalVacancies={vacancy.length}
                        nextPageOnButton={nextPageOnButton} />
                </div>}
        </>

    )
}

export default FavoritesList;