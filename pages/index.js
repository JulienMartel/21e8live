import React from 'react'
import Nav from './../components/nav'

class Home extends React.Component {
  render(){

    return (
      <div>
        <main className="main">
          <div className="container">
            <Nav />
          </div>

        </main>

        <style jsx>{`
          * {
            max-width: 100% !important;
        }
        body {
            width: 100%;
        }

        .hash {
            max-width: 100%;
            overflow-wrap: break-word;
        }

        a {
            color: black;
            text-decoration: none;
        }

        h4 {
            max-width: 100%;
            overflow-wrap: break-word;
        }

        ul {
            margin: 0;
            padding: 0;
            border-top: 1px solid black;
            max-width: 100%;
        }

        h5 {
            margin: 15px 0 10px;
        }

        .main {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .container {
            min-width: 600px;
        }

        .txInstanceContainer {
            margin: 10px 0;
            padding: 10px;
            list-style: none;
            width: min-content;
            border-bottom: 1px solid lightgrey;
            width: calc(100% - 20px);
            border-radius: 15px;


        }

        .txInstanceContainer:hover, .txInstanceContainer:active {
            background-color: #f1eeee;
            cursor: pointer;
        }



        .userDate {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        @media (max-width: 600px) {
            .container {
                width: 100%;
                min-width: unset;
            }

            .allInstanceContainer, h4 {
                padding: 0 10px;
            }
        }
        `}</style>
      </div>
    )
  }

}

export default Home