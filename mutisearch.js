import { useRef, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
export default function MultiSearch() {
    const data =[
    {
        "_id": "63a2930070399f8e3528ebce",
        "code": "IDS",
        "translations": {
            "language": "en",
            "name": "Hikura",
            "description": "This is a new boardtype."
        },
        "created_by_id": "6352492baa2ef07702408ecc",
        "created_by_name": "Saikrishna Vedagiri",
        "created_on": "2022-12-21T05:00:48.267Z",
        "modified_by_id": "6351162aa473c693baea6113",
        "modified_by_name": "Bheema Test Guguloth",
        "modified_on": "2023-06-30T11:05:04.752Z"
    },
    {
        "_id": "63a2933c70399f8e3528ebcf",
        "code": "UDH",
        "translations": {
            "language": "en",
            "name": "Terra",
            "description": "This is an old board type."
        },
        "created_by_id": "6352492baa2ef07702408ecc",
        "created_by_name": "Saikrishna Vedagiri",
        "created_on": "2022-12-21T05:01:48.514Z",
        "modified_by_id": "6351162aa473c693baea6113",
        "modified_by_name": "Bheema Guguloth",
        "modified_on": "2022-12-21T09:30:29.699Z"
    },
    {
        "_id": "63a2ac006a05403d182211b7",
        "code": "EWDEW",
        "translations": {
            "language": "en",
            "name": "New Board",
            "description": "board type board type  board type ecvfehnb gfh dfgh"
        },
        "created_by_id": "6351162aa473c693baea6113",
        "created_by_name": "Bheema Guguloth",
        "created_on": "2022-12-21T06:47:07.577Z",
        "modified_by_id": "6351162aa473c693baea6113",
        "modified_by_name": "Bheema Test Guguloth",
        "modified_on": "2023-05-18T12:27:44.217Z"
    }
]
    const [searchResults, setSearchResults] = useState([]);
    const searchData = (query) => {
        // return Array.isArray(item) && item.filter((i) => i.translations.name.toLowerCase().includes(searchText))
        const filteredResults = data?.filter(
            (item) =>
              item?.translations?.name?.toLowerCase().includes(query?.toLowerCase()) ||
              item?.translations?.description?.toLowerCase().includes(query?.toLowerCase()) ||
              item?.code?.toLowerCase().includes(query?.toLowerCase())
          );
          setSearchResults(filteredResults);
    }
    let newData = searchText !== ""? searchResults:data
    const onEnterPress = (e) => {
        if (inputRef.current.value.length > 2 && e.key === "Enter") {
            setSearchText(inputRef.current.value);
            searchData(inputRef.current.value)
        }
        if (searchText?.length > 0 && e.key === "Backspace") {
            setSearchText("");
            searchData("")
        }
    };

    const deleteSearch = () => {
        inputRef.current.value = ""
        if (searchText.length >= 3) {
            setSearchText("")
            searchData("")
        }
    }   
    return (
        <div className="h-full">
            {screen === "boardtype" ? (
                <div className="relative p-4 md:p-10">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                        <div className="flex-col sm:flex-auto md:flex-row flex gap-5">
                            <h1 className="text-xl font-semibold text-gray-900 mt-[3px]">Board Type Master</h1>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                                    <MagnifyingGlassIcon className="h-5 fill-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={"Search By Name"}
                                    name="searchbox"
                                    className="block w-full rounded-md border-gray-300 pl-8 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    ref={inputRef}
                                    onKeyDown={onEnterPress}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <XMarkIcon className="h-4 fill-slate-400 hover:cursor-pointer" onClick={deleteSearch} />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={addForm}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 md:px-4 md:py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Add Board Type
                        </button>
                    </div>
                    {error ? <Error /> : !data ? <Loading /> : null}
                    {data ? (
                        <div className="px-4 md:px-6 lg:px-0 mb-20">
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle lg:px-8">
                            <div className="overflow-y-visible shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Code
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Description
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only"></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {data?.map((item, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm ">{item.code}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm ">{item.translations.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm ">{item.translations.description}</td>
                                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button onClick={() => showDetails(item._id)} className="text-indigo-600 hover:text-indigo-900">
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
