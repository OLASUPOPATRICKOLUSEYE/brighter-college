import React from 'react'

const MainHeader = () => {
  return (
    <div className="flex flex-col text-center justify-center text-white">
        <div className="flex flex-row bg-purple-900 w-full text-center justify-between">
          <div className="bg-black py-2 w-48">LEFT</div>
          <div className="bg-black py-2 w-52">RIGHT</div>
        </div>
        <div className="bg-purple-400 w-full py-3 text-center justify-center">2</div>
        <div className="bg-yellow-800 w-full py-4 text-center justify-center">3</div>
        <div className="bg-blue-600 w-full py-5 text-center justify-center">4</div>

    </div>
  )
}

export default MainHeader