const User = () => {
    return (
        <div>
            <main className="main">
            <div className="container">
                <Nav />
                <h4>{router.query.key_21e8}</h4>
                <ul className="allInstanceContainer">
                    <lh><h5>Twetch instances:</h5></lh>
                    {arrOfInstances}
                </ul>
            </div>

            <style global jsx>{`


                ul {
                    margin: 0;
                    padding: 15px 0 0 0;
                    border-top: 1px solid black;
                }

                h5 {
                    margin: 15px 0 10px;
                }

                .main {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: min-content;
                }

                .txInstanceContainer {
                    padding: 20px 0;
                    list-style: none;
                    width: min-content;
                    border-bottom: 1px solid lightgrey;

                }

                .txInstanceContainer + .txInstanceContainer {
                    border-bottom: 0px;
                }

                .userDate {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
            `}</style>
        </main>
        </div>
    )
}

function queryForAddress(address) {
    var query = {
        v: 3,
        q: {
            find: { 
                "out.b0": { op: 106 }, 
                $text: { $search: address },
                "out.s22": "twetch"
            },
            sort: { "blk.i": 1 },
            limit: 10
        }
    };
    return query;
}

function urlForQuery(query) {
    let buff = Buffer.from(JSON.stringify(query));
    var b64 = buff.toString('base64')
    var url = 
        "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" +
        b64;
    return url;
}

async function goGetTxs(address) {
    let header = {
        headers: { key: "1GaZvZEVwCSTzG189pzbvJzteDnx3NRAAt" }
    };

    let f = await fetch(urlForQuery(queryForAddress(address)), header)

    let json = await f.json()

    return json;
}

User.getInitialProps = async context => {
    const key = context.query.key_21e8
    console.log(key)

    const txInfo = await goGetTxs(key)
    console.log(txInfo)
    return { arrTxData: [...txInfo.c] }
}



export default User