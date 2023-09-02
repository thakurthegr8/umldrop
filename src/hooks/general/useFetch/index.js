import { useEffect, useState } from "react";
import axios from "axios";
import { generateQueryString } from "@/src/utils/url";

const useFetch = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setError(null);
    setLoading(true);
    setData(null);
    const result = { data: null, error: null, loading: true };
    try {
      const res = await axios.get(props.url);
      const resData = await res.data;
      result.data = resData;
      setData(resData);
    } catch (error) {
      result.error = error.response.data;
      setError(error.response.data);
    } finally {
      result.loading = false;
      setLoading(false);
    }
    return result;
  };
  const postData = async (payload) => {
    setError(null);
    setLoading(true);
    setData(null);
    const result = { data: null, error: null, loading: true };
    try {
      const res = await axios.post(props.url, payload);
      const resData = await res.data;
      result.data = resData;
      setData(resData);
    } catch (error) {
      result.error = error.response.data;
      setError(error.response.data);
    } finally {
      result.loading = false;
      setLoading(false);
    }
    return result;
  };
  const putData = async (payload) => {
    setError(null);
    setLoading(true);
    setData(null);
    const result = { data: null, error: null, loading: true };
    try {
      const res = await axios.put(props.url, payload);
      const resData = await res.data;
      result.data = resData;
      setData(resData);
    } catch (error) {
      result.error = error.response.data;
      setError(error.response.data);
    } finally {
      result.loading = false;
      setLoading(false);
    }
    return result;
  };
  const deleteData = async (payload) => {
    setError(null);
    setLoading(true);
    setData(null);
    const result = { data: null, error: null, loading: true };
    try {
      const res = await axios.delete(
        `${props.url}/?${generateQueryString(payload)}`
      );
      const resData = await res.data;
      result.data = resData;
      setData(resData);
    } catch (error) {
      setError(error.response.data);
      result.error = error.response.data;
    } finally {
      setLoading(false);
      result.loading = false;
    }
    return result;
  };
  const dispatch = async (payload = null) => {
    return new Promise((resolve, reject) => {
      if (props.method === "GET") {
        return resolve(getData());
      } else if (props.method === "POST") {
        return resolve(postData(payload));
      } else if (props.method === "PUT") {
        return resolve(putData(payload));
      } else if (props.method === "DELETE") {
        return resolve(deleteData(payload));
      }
      return reject({
        data,
        error,
        loading,
      });
    });
  };

  //   if (props.method === "GET") dispatch();
  useEffect(() => {
    if (props.method === "GET") getData();
  }, []);
  return { data, setData, error, loading, dispatch };
};

export default useFetch;
