import React from 'react'
import Link from 'next/link'
import Router from 'next/router'


class Nav extends React.Component {
  state = {
    query: ""
  }

  updateQuery = (e) => {
    console.log(e)
    this.setState({query: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    let query = this.state.query
    Router.push('/key/' + query)
    this.setState({query: ""})
  }

  render() {
    console.log(this.state)
    return (
      <nav>
        <div className="searchAndLogo">
          <div className="logo">
            <h2>21explorer</h2>
          </div>
          <form onSubmit={(e) => this.submit(e)}>
            <input placeholder="Search 21e800... world key" value={this.state.query} onChange={e => this.updateQuery(e)}></input>
          </form>
        </div>
  
        <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }

          :global(a) {
            color: black;
            text-decoration-color: black;
          }

          nav {
            background-color: lightsteelblue;
            padding: 0 10px;
          }

          h2 {
            margin: 10px 0
          }

          .searchAndLogo {
            display: flex;
            flex-direction: column;
            
            align-items: center;

          }

          form {
            display: flex;
            flex-direction: row;
            justify-content: center; 
            align-items: center; 
            height: 47px;
            width: 100%;
          }

          input {
            height: 60%;
            width: 100%;
            background-color: inherit;
            border: 2px solid black;
            border-radius: 9px;
            padding: 0 8px
            
          }

          input:focus {
            outline: none;
          }
          
        `}</style>
      </nav>
    )
  }
}

export default Nav
