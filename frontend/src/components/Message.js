// import React from 'react'
// import { Alert } from 'react-bootstrap'

// const Message = ({ variant, children }) => {
//   return <Alert variant={variant}>{children}</Alert>
// }

// Message.defaultProps = {
//   variant: 'info',
// }

// export default Message

import React from 'react';

const Message = ({ variant, children }) => {
  const alertClasses = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div className={`border-l-4 p-4 ${alertClasses[variant]}`}>
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
