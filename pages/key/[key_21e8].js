import { useRouter } from 'next/router';

const Key = ({ arrTxData }) => {
    const router = useRouter();
    console.log(arrTxData)

    const arrOfInstances = []

    arrTxData.forEach(tx => {
        arrOfInstances.push(<li key={tx.tx.h} className="txInstanceContainer"><a href="#">{tx.tx.h}</a></li>)
    })

    return (
        <div>
            <main>
                <h4>{router.query.key_21e8}</h4>
                <ul className="allInstanceContainer">{arrOfInstances}</ul>
            </main>

            <style jsx>{`
                .txInstanceContainer {
                    min-height: 100px;
                }

                .allInstanceContainer:first-child {
                    color: red;
                }
            `}</style>
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

Key.getInitialProps = async context => {
    const key = context.query.key_21e8
    console.log(key)

    const txInfo = await goGetTxs(key)
    console.log(txInfo)
    return { arrTxData: [...txInfo.c] }
}

export default Key

