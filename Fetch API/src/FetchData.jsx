import React from "react";
import { useState, useEffect,useRef } from "react";
import axios from "axios";

const FetchData = () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com";

  const [data, setdata] = useState([]);
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [page, setpage] = useState(0)

  const abortControllerRef = useRef(null)

  useEffect(() => {
    const fetchDataFromUrl = async () => {

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
      try {
        setisLoading(true);
        const response = await axios(`${BASE_URL}/posts?page=${page}`,{
            signal:abortControllerRef.current?.signal
        });
        setdata(response.data);
      } catch (error) {

        if(error.name==='AbortError'){
            console.log('Aborted');
            return;
        }
        seterror(error.message);
      } finally {
        setisLoading(false);
      }
    };

    fetchDataFromUrl();
  }, [page]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p> Errror : {error} </p>}

      <ul>
        {!isLoading &&
          !error &&
          data.map((item) => <li key={item.id}> {item.title}</li>)}
      </ul>
    </>
  );
};

export default FetchData;
