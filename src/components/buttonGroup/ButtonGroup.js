
import leftArrow from '../../images/leftArrow.svg'
import rightArrow from '../../images/rightArrow.svg'

import './buttonGroup.scss'

const ButtonGroup = ({ perPage, totalVacancies, nextPageOnButton, currentPage, nextPageOnArrow }) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalVacancies / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="buttons">
            <button type='button'
                className='back'
                onClick={(e) => nextPageOnArrow(e)}>
                <img src={leftArrow} alt='last page' />
            </button>
            {
                pageNumbers.map(number => (
                    <button className={(currentPage === number) ? 'active' : null} type='button'
                        key={number}
                        onClick={() => nextPageOnButton(number)}>
                        <p>{number}</p>
                    </button>
                ))
            }
            <button type='button'
                className='forward'
                onClick={(e) => nextPageOnArrow(e)}>
                <img src={rightArrow} alt='next page' />
            </button>
        </div>
    )
}

export default ButtonGroup;