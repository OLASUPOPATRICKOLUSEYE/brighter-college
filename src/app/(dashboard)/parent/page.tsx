import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";

const ParentPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
              {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="w-full bg-white h-full p-4 rounded-md">
                    <h1 className="font-semibold text-xl">Schedule (John Doe)</h1>
                    <BigCalender />
                </div>
            </div>
              {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8 ">
                <Announcements />
            </div>
        </div>
    )
}

export default ParentPage;