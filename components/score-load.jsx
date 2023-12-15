
const ScoreLoad = () => {
    const divs = Array.from({length: 5}, (_, index)=> (
        <div key={index} className="w-[90%] m-2 p-5 bg-slate-600 rounded-md first-letter
        bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 animate-gradient"/>
    ))
    return ( 
        <>
        {divs}
        </>

     );
}
 
export default ScoreLoad;