import React from 'react'
import fetch from 'isomorphic-unfetch'


class Home extends React.Component {

  static async getInitialProps() {

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
      "21e80035418e117035071e6d0f6f91edb3fba4e5da7da519dfddb18161626bf6",
    ] 
    
    let addys = {Rs: []}

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
          addys.Rs.push(r)
          
          r.c[0].out.forEach(t => {
            if (t.b0) {
              if (t.b0.op) {
                if (t.b0.op == 106) {
                  let nextIsMB = false;

                  (t.str.split(' ')).forEach(hex => {
                    let ascii = hex2a(hex)
                    console.log(ascii)

                    if (nextIsMB) {
                      console.log("MB User: " + ascii)
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
      });
    });
    return addys
  }

  

  render(){
    return (
      <div>
        <span>hello</span>
        <div>
          this: {this.props.Rs.c}
        </div>
        
        <style jsx>{`
          
        `}</style>
      </div>
    )
  }

}

export default Home