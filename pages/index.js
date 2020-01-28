import React from 'react'
import fetch from 'isomorphic-unfetch'


class Home extends React.Component {
  render(){
    console.log(this.props)

    let userList = []

    // this.props.mbUsers.forEach(u => {
    //   console.log(u);
    //   userList.push(<a href="#" id={u}>{u}</a>)
      
    // })
    return (
      <div>
        <h2>21e8 Live</h2>
        <div>
          {userList}
        </div>

        <style jsx>{`
          
        `}</style>
      </div>
    )
  }

}

export default Home