import {useState, useEffect} from "react"

export default function Temp(){
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMsg(data.message))
            .catch((err) => console.error(`Error in fetching data: ${err}`))

    }, [])

    return (
        <div>
            <h1>Talking to backend</h1>
            <p>{msg ? msg : "Still Not Working"}</p>
        </div>
    )
}
