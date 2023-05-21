
import downArrow from '../../images/downArrow.svg'
import upArrow from '../../images/upArrow.svg'

import './input.scss'
import './inputAdaptate.scss'

const Input = ({ textForPlaceholder, textFromDataElem, onChangeValue, value }) => {

    return (
        <div className='input-wrap'>
            <input type='number' min='1' step={100} max='10000000'
                onChange={(e) => onChangeValue(e.target.value)}
                placeholder={textForPlaceholder}
                data-elem={textFromDataElem}
                value={value} />
            <div className='input-wrap__technical'>
                <img className='up-arrow'
                    src={upArrow}
                    alt='increas'
                    onMouseDown={() => {
                        if (value >= 1000000) {
                            return value
                        } else {
                            onChangeValue(++value)
                        }
                    }} />
                <img className='down-arrow'
                    src={downArrow}
                    alt='decrease'
                    onClick={() => {
                        if (value <= 0) {
                            return value
                        } else {
                            onChangeValue(--value)
                        }
                    }} />
            </div>
        </div>
    )
}

export default Input;