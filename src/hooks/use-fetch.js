import {useState, useEffect} from 'react';
import { SYSTEM } from '../constants/systems';
import {useLocalStorage} from '../hooks/use-local-storage';


// const API = "https://algo-blog-api.herokuapp.com/api";
// const API = "http://localhost:3001/api";

export function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const [token] = useLocalStorage(SYSTEM.AUTH_TOKEN_KEY);

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }

  // Make fetch api call here
  useEffect(() => {
    if (!isLoading) return;

    // Fetch the data
    fetch(`${SYSTEM.API_BASE}/${url}`, {
      ...options,
      mode: 'cors',
      headers: {
        "Content-type": "application/json; charset=UTf-8",
        "Access-Control-Allow-Origin":"*",
        "Authorization": token ? `Token ${token}` : ''
      }
    }).then(res => {
      console.log(res);
      // if (!res.ok) {
      //   throw "Some error occurred.  Likely, issue with authentication!";
      // }
      return res.json();
    }).then(json => {
      // Our data is here in json parameter
      console.log("JSON:", json);
      setIsLoading(false);

      if (json.errors) {
        setError(json.errors);
        return;
      }
      setResponse(json);
    }).catch(e => {
      //{"errors":{"email or password":["is invalid"]}}
      setError({
          "Server side error": [e.message]
      });
      setIsLoading(false);
    })

  },[isLoading, url, options])

  return [
    {
      isLoading: isLoading, 
      response: response, 
      error: error
    }, 
    doFetch
  ]
}