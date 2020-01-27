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
      "21e800ee4ae497bb33b23ddca9e10b9264647e421247894d573e9aa0c7f2b5f6",
    ] 

    async function goGetTx(address) {
      let header = {
        headers: { key: "1GaZvZEVwCSTzG189pzbvJzteDnx3NRAAt" }
      };

      let f = await fetch(urlForQuery(queryForAddress(address)), header)

      let json = await f.json()

      return json;
    }

    

    async function hashesToUserList(hashes) {
      let mbUsers = [];

      for (let c = 0; c < hashes.length; c++) {

        await goGetTx(hashes[c])
          .then(r => {
            // console.log(r)
            if (r.c[0]) {

              r.c[0].out.forEach(t => {
                // console.log(t)
  
                if (t.b0) {
                  if (t.b0.op) {
                    if (t.b0.op == 106) {
  
                      let arrOfHexDataStrings = t.str.split(' ')
  
                      for (let c = 0; c < arrOfHexDataStrings.length; c++) {
  
                        let hex = arrOfHexDataStrings[c]
                        let ascii = hex2a(hex)
                         console.log(ascii)
        
                        if (ascii == "mb_user") {
                          mbUsers.push(hex2a(arrOfHexDataStrings[c + 1]))
                        }
                      }
                      
                    }
                  }
                }
              })
            } else {
              // no r.c[0]
            }
            
          })

      }
      return mbUsers
    }   

    
    return { mbUsers: [await hashesToUserList(hashes)] }
  }

  

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