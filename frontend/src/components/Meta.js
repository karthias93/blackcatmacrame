import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Meta = ({ title = 'Black Cat Macrame', description = 'Hand Craftred Micro Macrame', keywords = 'Macrame, Micro Macrame, Wall Art, Custom Hand Made' }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keywords} />
      </Helmet>
    </HelmetProvider>
  )
}

export default Meta
