import { useState, useContext, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { UserDetailsContext } from '../providers/UserDetailsProvider';

const defaultOptions = {
  initialData: null,
  invokeManually: false,
  data: {},
  method: 'get',
};

const getEndpoint = (endpoint, method, userId) => {
  const url = `http://localhost:3001${endpoint}`;
  if (method.toLowerCase() === 'get') {
    return `${url}?userId=${userId}`;
  }
  return url;
};

const dataMixer = (optionsData, userDetails) =>
  userDetails.name ? { ...optionsData, user: userDetails } : optionsData;

export const useApi = (endpoint, options = defaultOptions) => {
  const _options = { ...defaultOptions, ...options };
  const { data: optionsData, method, initialData, invokeManually } = _options;
  const { userDetails } = useContext(UserDetailsContext);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState(initialData);

  const _data = dataMixer(optionsData, userDetails);

  const callApi = useCallback(
    (passedData) =>
      Axios.request({
        url: getEndpoint(endpoint, method, userDetails.googleId),
        method,
        data: passedData ? dataMixer(passedData, userDetails) : _data,
      }),
    [method, endpoint, _data, userDetails]
  );

  useEffect(() => {
    if (!invokeManually) {
      callApi()
        .then(({ data }) => {
          console.log({ data });
          setData(data);
        })
        .catch(setHasError)
        .finally(() => setIsFetching(false));
    }
  }, []);

  return { isFetching, data, hasError, callApi, setData };
};
