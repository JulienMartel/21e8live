import React from 'react'
import fetch from 'isomorphic-unfetch'


class Home extends React.Component {

  static async getInitialProps() {
    let mbUsers = new Set();

    function queryForAddress(address) {
      var query = {
        v: 3,
        q: {
          find: { "out.b0": { op: 106 }, $text: { $search: address }},
          sort: { "blk.i": 1 },
          limit: 1
        }
      };
      return query;
    }

    function hex2a(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
    }

    function urlForQuery(query) {
      let buff = Buffer.from(JSON.stringify(query));
      var b64 = buff.toString('base64')
      var url = 
        "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" +
        b64;
    
      return url;
    }

    let hashes = 
    [
      "21e800ee4ae497bb33b23ddca9e10b9264647e421247894d573e9aa0c7f2b5f6",
    ] 

    hashes.forEach(address => {
      // Attach API KEY as header 
      var header = {
        headers: { key: "1GaZvZEVwCSTzG189pzbvJzteDnx3NRAAt" }
      };
    
      // Make an HTTP request to bitdb.network public endpoint
      fetch(urlForQuery(queryForAddress(address)), header)
        .then(function(r) {
          return r.json();
        })
        .then(function(r) {
          r.c[0].out.forEach(t => {
            if (t.b0) {
              if (t.b0.op) {
                if (t.b0.op == 106) {
                  let nextIsMB = false;

                  (t.str.split(' ')).forEach(hex => {
                    let ascii = hex2a(hex)
                    

                    if (nextIsMB) { // this is mb_user
                      // console.log("MB User: " + ascii)
                      mbUsers.add(ascii)
                      nextIsMB = false
                    }

                    if (ascii == "mb_user") {
                      nextIsMB = true
                    }
                  })
                }
              }
            }
          })
           //console.log(mbUsers)
           mbUsers = Array.from(mbUsers)
           //console.log(mbUsers)
      });
    });
    console.log(mbUsers)
    return {"users": mbUsers}
  }

  

  render(){
    //console.log(this.props)
    return (
      <div>
        <span>hello</span>
        <div>
        {this.props.users.forEach(u => {
          //console.log(u);
          <a href="#">{u.toString()}</a>
        })}
        </div>
        
        <style jsx>{`
          
        `}</style>
      </div>
    )
  }

}

export default Home