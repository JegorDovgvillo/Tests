import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateVacancies } from '../listItems/listItemsSlice'
import { getCatalogues, filterSelector } from './filterSlice'
import { useSelector } from 'react-redux'

import Input from '../input/Input'
import cross from '../../images/cross.svg'
import useSuperjobService from '../../services/useSuperjobService'

import './filters.scss'
import './filtersAdaptate.scss'

const Filters = ({ term }) => {

    const [paymentFrom, setPaymentFrom] = useState('')
    const [paymentTo, setPaymentTo] = useState('')
    const [cataloguesKey, setCataloguesKey] = useState()
    const { getFilteredVacancies } = useSuperjobService()
    const industries = useSelector(filterSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCatalogues())
    }, [])


    function optionRender(data) {
        const item = data.map((item, i) => {
            return (
                <option key={item.key} value={item.key}>{item.title}</option>
            )
        })
        return (
            <select data-elem="industry-select"
                onClick={(e) => setCataloguesKey(e.target.value)}>
                <option defaultValue>Откройте это меню выбора</option>
                {item}
            </select>
        )
    }

    const option = optionRender(industries)

    return (
        <div className="filters">
            <div className='filters__wrap'>
                <div className='filters__header'>
                    <h4>Фильтры</h4>
                    <button type="button" onClick={() => {
                        setPaymentFrom(0)
                        setPaymentTo(0)
                    }}>
                        <p>Сбросить все</p>
                        <img src={cross} alt='cross'/>
                    </button>
                </div>
                <form>
                    <h4>Отрасль</h4>
                    {option}
                    <h4>Оклад</h4>
                    <Input textForPlaceholder='От'
                        textFromDataElem="salary-from-input"
                        onChangeValue={(value) => setPaymentFrom(value)}
                        value={paymentFrom} />
                    <Input textForPlaceholder='До'
                        textFromDataElem="salary-to-input"
                        onChangeValue={(value) => setPaymentTo(value)}
                        value={paymentTo} />
                    <button
                        data-elem="search-button"
                        onClick={(e) => {
                            e.preventDefault()
                            getFilteredVacancies(paymentFrom, paymentTo, cataloguesKey, term)
                                .then(data => dispatch(updateVacancies(data)))
                        }}
                    >
                        <p>Применить</p>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Filters;
