import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRe } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <FontAwesomeIcon icon={value >=1 ? faStar : value >=0.5 ? faStarHalfAlt : faStarRe} />
      </span>
      <span>
        <FontAwesomeIcon icon={value >= 2 ? faStar : value >=1.5 ? faStarHalfAlt : faStarRe} />
      </span>
      <span>
        <FontAwesomeIcon icon={value >= 3 ? faStar : value >= 2.5 ? faStarHalfAlt : faStarRe} />
      </span>
      <span>
        <FontAwesomeIcon icon={value >= 4 ? faStar : value >= 3.5 ? faStarHalfAlt : faStarRe} />
      </span>
      <span>
        <FontAwesomeIcon icon={value >= 5 ? faStar : value >= 4.5 ? faStarHalfAlt : faStarRe} />
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
