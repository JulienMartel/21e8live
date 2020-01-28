import { useRouter } from 'next/router';
import Nav from './../../components/nav'
import Link from 'next/link';


const Key = ({ arrTxData }) => {
    const router = useRouter();
    console.log(arrTxData)
    if (arrTxData > 0) {arrTxData[0].isFirst = true}

    const arrOfInstances = []

    arrTxData.forEach(tx => {   
    
        let dateFormatted = new Date(tx.blk.t * 1000)

        arrOfInstances.push(
            <Link href={"/tx/" + tx.tx.h}>
                <li key={tx.tx.h + tx.out[0].s16} className="txInstanceContainer">
                    <div className="userDate">
                        <span>
                            MB user: {tx.out[0].s16}
                        </span>
                        <span>{dateFormatted.toLocaleString()}</span>
                    </div>
                {tx.tx.h}
                </li>
            </Link>
            
        )
    })

    return (
        <main className="main">
            <div className="container">
                <Nav />
                <h4>{router.query.key_21e8}</h4>
                <ul className="allInstanceContainer">
                    <lh><h5>Twetch instances:</h5></lh>
                    <span className="hash">{arrOfInstances}</span>
                </ul>
            </div>

            <style global jsx>{`
                a {
                    color: black;
                    text-decoration: none;
                }

                ul {
                    margin: 0;
                    padding: 0;
                    border-top: px solid black;
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
            `}</style>
        </main>
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

Key.getInitialProps = async context => {
    const key = context.query.key_21e8
    console.log(key)

    const txInfo = await goGetTxs(key)
    console.log(txInfo)
    return { arrTxData: [...txInfo.c] }
}

export default Key

