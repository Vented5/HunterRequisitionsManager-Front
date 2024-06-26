'use client'
import { useContext } from "react"
import { Context } from "../context/Context"
import Link from "next/link";

//icons
import { MdRequestQuote, MdOutlineUpdate } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { GrInProgress } from "react-icons/gr";
import { FaRegMoneyBillAlt, FaAngleRight, FaUsers } from "react-icons/fa";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { BsDatabaseFillLock } from "react-icons/bs";

function SideBar() {
    const [toggle, setToggle] = useContext(Context)
    return (
        <div className="flex justify-start itmes-start">
        <aside
          className={`bg-white rounded-lg overflow-hideen transition-all  ${
            toggle ? "w-60 p-4" : "w-0"
          }lg:w-60 lg:p-4`}
        >
          <ul>
            <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/Requisitions" className="flex justify-start items-center p-2">
                    <MdRequestQuote className="mr-2" />Requisitions
                </Link>
            </li>

            <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/MakeRequest" className="flex justify-start items-center p-2">
                    <PiGitPullRequestDuotone className="mr-2" />Make Request
                </Link>
            </li>

            <li className="items-center hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/" className="flex justify-start p-2">
                    <MdOutlineUpdate className="mr-2" />Update Request
                </Link>
            </li>

            <li className="hover:bg-blue-200 hover:text-blue-800-rounded-px2 ">
              <Link href="/" className="flex justify-start p-2">
                    <GrValidate className="mr-2" />Request Validation
                </Link>
            </li>

            <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px2 ">
              <Link href="/RequestP" className="flex justify-start items-center p-2">
                    <GrInProgress className="mr-2" />Request Progress
            </Link>
            </li>

            <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/Budget" className="flex justify-start items-center p-2">
                    <FaRegMoneyBillAlt className="mr-2" />Budget
              </Link>
            </li>

            <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/Users" className="flex justify-start items-center p-2">
                    <FaUsers className="mr-2" />Users
              </Link>
            </li>

            <li className="hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/" className="flex justify-start items-center p-2">
                <BsDatabaseFillLock className="mr-2" />DB
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    )
}

export default SideBar