import { useEffect, useState } from 'react';

import { teste } from '../service/api/userAPI';

export default function Teste() {

  const [data, setData] = useState({});

  useEffect(() => {
    const promise = teste();
    promise
      .then((data) => {
        console.log(data);
      })
  },[]);

  return (
    <>
    </>
  );
}
