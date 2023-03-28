import {  useState } from "react"

function App() {
  const [words,setWords] = useState([])
  const [close,setClose] = useState(false)
  const getWord = (arg) => {
    let {value} = arg.currentTarget

    if (value.includes(" ")) {
      arg.currentTarget.value = value.trim().split(" ")[0]
    }

    let _str = `http://localhost:8000/api/search?word=${arg.target.value}`

    fetch(new URL(_str))
    .then(data => data.json())
    .then(data => {
      if (data.words == null) {
        return setWords([])
      }

      return setWords(data["words"])
    })
    
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
      {
        !close ? <div className="sm:w-9/12 sm:h-40 h-48 w-10/12 ease-in-out duration-300  flex justify-around items-center flex-col text-justify shadow p-2 select-none">
        <p className="sm:text-base text-sm
	 select-none break-words ease-in-out duration-300">გაითვალისწინეთ, რომ სიტყვები მოპოვებულია ელექტრონული წიგნებიდან და ამის გამო ისინი შესაძლოა არ იყოს სწორი.</p>
        <div className="w-24 h-12 bg-blue-200 flex justify-center items-center cursor-pointer hover:bg-slate-400" onClick={() => {setClose(true
          )}}>დახურვა</div>
        </div> : 
            <div className="shadow xl:w-2/4 sm:w-3/4 ease-in-out duration-500 w-10/12 height rounded-lg flex flex-col">
        <div className="w-full border-b-2">
          <input type="text" placeholder="მოძებნეთ სიტყვა" onChange={(arg) => getWord(arg)} className="w-full h-20 outline-none bg-transparent text-center"></input>
        </div>
        <div className="w-full h-auto scrollbar	scrollbar-hide" style={{height: words.length * 46.25,transition:"0.5s"}}>
          {
            words.map((word,i) => {
              return(
                <div className="w-full hover:bg-gray-200 flex row justify-start items-center" key={word} style={{height:"46.25px"}} title={`სიტყვა:${i + 1}`}>
                  <div>&nbsp;&nbsp;{i + 1}<span>.</span> {word}</div>
                </div>
              )
            })
          }
        </div>
      </div>
      }
    </div>
  );
}

export default App;
