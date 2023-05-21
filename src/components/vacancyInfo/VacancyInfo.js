import { useSelector } from "react-redux";

import Vacancy from "../vacancy/Vacancy";

import './vacancyInfo.scss'
import './vacancyInfoAdaptate.scss'

const VacancyInfo = () => {

    const item = useSelector(state => state.vacancy.vacancyInfo)
    const informationText = `<div class='information-list'> ${item.information}</div>`

    return (
        <div className="information" >
            <Vacancy
                id={item.id}
                key={item.id}
                title={item.title}
                paymentFrom={item.paymentFrom}
                currency={item.currency}
                paymentTo={item.paymentTo}
                typeOfWork={item.typeOfWork}
                city={item.city}
                isfavorite={item.favorite}
            />
            <div className="information-list__wrap" dangerouslySetInnerHTML={{ __html: informationText }}></div>
        </div>
    )
}

export default VacancyInfo;