import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title = 'Black Cat Macrame', description = 'Hand Craftred Micro Macrame', keywords = 'Macrame, Micro Macrame, Wall Art, Custom Hand Made' }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

export default Meta
