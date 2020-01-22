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
        "21e800aea3feb32454cbb7c6b79cb39abfde084819c958074d15fd5ed0b15799",
        "21e8006d480d6b4ec7d5ac7a12333fa762c0240fca0d3d8bb69d0ed70510f08e",
        "21e8005bf83ec3d9270a56968ad95a1ea0d526ab8ab8ad19d9bf5202b8f81e81",
        "21e80031d50ae131cf0a6649e055fcd4883b83fd45fe210f1965d96a58e1e552",
        "21e800c10fc7f53aa6f9dea19618b159e10bf87da50cb0da2d4a967ae5f0614e",
        "21e800375178c7b0fd95f593627ac39f799570dc00f3c449468d41e9431b1a8c",
        "21e80035418e117035071e6d0f6f91edb3fba4e5da7da519dfddb18161626bf6",
        "21e8000abeb40afba6d27eec3f40d3e3310e15fdcf7d69e8c6455e9ace1c9a80",
        "21e800f0227ae55047901ac8a6e8ef142a3ec373298f9fdb7d6e4931c27fc114",
        "21e80083728a69649771c3ce1e56070e75713087731313a54a2b4e2552b3dcd2", // this one is a non-twetch -> WHY ITS BREAKING 
        "21e8003dcdd60a3cb56874fddcca42e3485f6408e190201fe4fd09959b265c22",
        "21e80068fd5dcf385aff90418fcf89e2380f4e92b1873a5f51ae813aa45bfb90",
        "21e800abd6b00065390c3352881f5cf522259e89494a638034c808c886c3c4fb",
        "21e800ea8c0d0da31e63baf4787fb6a91dc69ba71107bc598c36d0b65b5e80ce",
        "21e800d1c26c28b2cf2ef99671a79a4ec974d12bf0a76bdb2c11704d90ecdcf7",
        "21e8000fb02462b6e367e8cf9bf56d495b9b0c1e1870d9f0e040dee8245d525d",
        "21e800e246cdcf39cfd5d31406a7dd22b051290774fcbf8966e8613ff8e69e79",
        "21e800649d2d35e4f74caf2f80a262c4e63b246fcae54a698591a601dc1e06f5",
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
            console.log(r)
            r.c[0].out.forEach(t => {
              // console.log(t)
              if (t.b0) {
                if (t.b0.op) {
                  if (t.b0.op == 106) {
                    let nextIsMB = false;
                    t.str.split(' ').forEach(hex => {
                      let ascii = hex2a(hex)
      
                      if (nextIsMB) { // this is mb_user
                        mbUsers.push(ascii)
                        // console.log(ascii, mbUsers)
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
          })

      }

    }   

    
    return { mbUsers: [hashesToUserList(hashes)] }
  }

  

  render(){
    // console.log(this.props)

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