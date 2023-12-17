

const HomeBtns = () => {
    return ( 
        <div className="relative grid grid-cols-2 gap-3">
        <div key={1} className="h-28 w-28 rounded-xl anim-1 bg-green-300" />
        <div key={2} className="h-28 w-28 rounded-xl anim-2 bg-blue-300" />
        <div key={3} className="h-28 w-28 rounded-xl anim-3 bg-purple-300" />
        <div key={4} className="h-28 w-28 rounded-xl anim-4 bg-indigo-300" /> 
        </div>
     );
}
 
export default HomeBtns;