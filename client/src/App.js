import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Switch, Route, Link } from 'react-router-dom'
import UserTable from './components/UserTable'

const App = () => {
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const changePage = num => {
    setPage(page + num)
  }

  const getTotalPages = () => {
    useEffect(() => {
      axios
        .get('https://acme-users-api.herokuapp.com/api/users/')
        .then(res => res.data.count)
        .then(count => setTotalPages(Math.ceil(count / 50)))
        .catch(() => console.error('Failed to get total number of pages'))
    }, [])
  }

  getTotalPages()

  return (
    <div>
      <h1>Users</h1>
      <h6>
        You are viewing page {page + 1} out of {totalPages}
      </h6>
      <div className="btn-group">
        <Link to="/">
          <button className="btn btn-primary" type="button" onClick={() => changePage(0 - page)}>
            First
          </button>
        </Link>
        <Link to={page === 1 ? '/' : `/${page - 1}`}>
          <button className="btn btn-primary" type="button" onClick={() => changePage(-1)}>
            Prev
          </button>
        </Link>
        <Link to={`/${page + 1}`}>
          <button className="btn btn-primary" type="button" onClick={() => changePage(1)}>
            Next
          </button>
        </Link>
        <Link to={`/${totalPages - 1}`}>
          <button className="btn btn-primary" type="button" onClick={() => changePage(totalPages - page - 1)}>
            Next
          </button>
        </Link>
      </div>
      <Switch>
        <Route path="/:page" exact render={({ match }) => <UserTable page={match.params.page} />} />
        <Route path="/" exact render={() => <UserTable page={0} />} />
      </Switch>
    </div>
  )
}

export default App
