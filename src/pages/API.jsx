import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import apiActions from '../redux/actions/apiActions';
import AnimeCard from '../components/AnimeCard';

const API = () => {
  const history = useHistory();
  const urlSearch = new URLSearchParams(useLocation().search);

  const dispatch = useDispatch();
  const { apiData, loading } = useSelector((state) => state.api);

  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);

  const urlQuery = urlSearch.get('q') || '';
  const urlLimit = parseInt(urlSearch.get('limit'));

  useEffect(() => {
    // Run only when local query|limit and url query|limit not equal
    urlQuery !== query && setQuery(urlQuery);
    urlLimit !== limit && setLimit(urlLimit);
    return () => {
      // clear redux state
      dispatch(apiActions.getApiData(false, urlLimit));
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // call api when there is change in url query-limit
    urlQuery && dispatch(apiActions.getApiData(urlQuery, urlLimit));
  }, [urlQuery, urlLimit, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLimit(10);
    pushQueryToUrl(10);
    if (query === '') {
      // clear redux state
      dispatch(apiActions.getApiData(false, urlLimit));
    }
  };

  const handleLoadMore = () => {
    const tempLimit = limit + 10;
    setLimit(tempLimit);
    pushQueryToUrl(tempLimit);
  };

  const pushQueryToUrl = (limit) => {
    const params = new URLSearchParams();
    if (query) {
      params.append('q', query);
      params.append('limit', limit);
    } else {
      params.delete('q');
      params.delete('limit');
    }
    history.push({ search: params.toString() });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-4">
          <div>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search here"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit" onClick={handleSubmit}>
                Search
              </button>
            </form>
          </div>
        </div>
        {apiData &&
          apiData.results &&
          (apiData.results.length > 0
            ? apiData.results.map((item) => (
                <AnimeCard
                  key={item.mal_id}
                  animeData={item}
                  className="col-lg-3 col-md-4 col-sm-6 col-12 my-3 "
                />
              ))
            : !loading && (
                <div className="col-12 my-4">
                  <div align="center">
                    <h1>No Result</h1>
                  </div>
                </div>
              ))}

        {!apiData && !loading && (
          <div className="col-12 my-4">
            <div align="center">
              <h1>Make your Search</h1>
            </div>
          </div>
        )}

        {apiData && apiData.error && !loading && (
          <div className="col-12 my-4">
            <div align="center">
              <h1>{apiData.error}</h1>
            </div>
          </div>
        )}

        {loading && (
          <div className="col-12 my-4">
            <div align="center">
              <h1>Loading</h1>
            </div>
          </div>
        )}

        {apiData && apiData.results && apiData.results.length > 0 && (
          <div className="col-12 my-4">
            <div align="center">
              <button className="btn btn-primary" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default API;
