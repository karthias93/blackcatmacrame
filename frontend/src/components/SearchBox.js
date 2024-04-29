// import React, { useState } from 'react'
// import { Form, Button } from 'react-bootstrap'

// const SearchBox = ({ history }) => {
//   const [keyword, setKeyword] = useState('')

//   const submitHandler = (e) => {
//     e.preventDefault()
//     if (keyword.trim()) {
//       history.push(`/search/${keyword}`)
//     } else {
//       history.push('/')
//     }
//   }

//   return (
//     <Form onSubmit={submitHandler} inline id="search_box_div">
//       <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5' id="search_box">

//       </Form.Control>
//       <Button type='submit' variant='outline-success' className='p-2' id="search_box_button">
//         Search
//       </Button>
//     </Form>
//   )
// }

// export default SearchBox

import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center">
      <Input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-2 ml-5"
        id="search_box"
      />
      <Button
        type="primary"
        htmlType="submit"
        className="p-2"
        id="search_box_button"
        icon={<SearchOutlined />}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
