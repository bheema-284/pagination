import { useEffect, useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Error from "../../components/common/error";
import Loading from "../../components/common/loading";
import { CMS_SERVICE_URL, getServiceHeader, trackerror } from "../../config/sitesettings";
import Notificationalert from "../../components/common/notificationalert";
import { showNotificationAlert } from "../../config/globalfunctions";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import BoardTypeList from "../../components/boardtype/boardtypelist";
import AddBoardType from "../../components/boardtype/addboardtype";
import BoardTypeTab from "../../components/boardtype/boardtypedetailstab";
export default function BoardType() {

    const router = useRouter()

    const GetServiceObj = () => {
        let token = getServiceHeader();
        if (!token) {
            if (typeof window !== 'undefined') {
                router.push({
                    pathname: "/login",
                });
            }
            return false;
        } else {
            return token
        }
    };

    const fetcher = async (url) =>
        fetch(url, { headers: await GetServiceObj() }).then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                let error = true;
                trackerror(error)
                throw error
            }
        }
        );

    const { mutate } = useSWRConfig();

    const [screen, setScreen] = useState("boardtype");
    const [searchText, setSearchText] = useState("");
    const [editData, setEditData] = useState({});
    const [boardTypeId, setBoardTypeId] = useState("")
    const [changeMode, setChangeMode] = useState("create");
    const [searchResults, setSearchResults] = useState([]);
    const [ShowNotificationAlert, setShowNotificationAlert] = useState(false);
    const [NotificationDetails, setNotificationDetails] = useState({
        isError: false,
        isSuccess: false,
        isWarning: false,
        message: "",
    });
    const inputRef = useRef()
    const { data, error } = useSWR(CMS_SERVICE_URL + `hotels/boardtype`, fetcher, { revalidateOnFocus: false, shouldRetryOnError: false });

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
    const cancel = () => {
        setScreen("boardtype");
        setChangeMode("create");
        if (changeMode === "update") {
            router.push({
                pathname: `/masters/boardtype`,
                query: { id: boardTypeId }
            })
            setScreen("details");
        }
        else {
            router.push({
                pathname: `/masters/boardtype`,
            })
        }
    };
    const SelectMode = (type) => {
        setChangeMode(type);
    };
    const addForm = () => {
        setScreen("addBoardType");
        SelectMode("create");
    }
    const editForm = (item, mode) => {
        setScreen("addBoardType");
        setEditData(item);
        setChangeMode(mode)
    };
    const showDetails = (id) => {
        router.push({
            pathname: `/masters/boardtype`,
            query: { id: id }
        })
        setBoardTypeId(id);
        setScreen("details");
    };

    useEffect(() => {
        if (router.query.id) {
            setBoardTypeId(router.query.id)
            setScreen("details");
        }
    }, [router.query.id])

    const showNotification = (status) => {
        if (status === 200) {
            showNotificationAlert(
                setShowNotificationAlert,
                setNotificationDetails({
                    isSuccess: true,
                    message: "Success!",
                })
            );
        }
    }

    const mutated = () => {
        mutate(CMS_SERVICE_URL + `hotels/boardtype`);
    };

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
                        <BoardTypeList
                            data={newData}
                            showDetails={showDetails}
                            showNotification={showNotification}
                        />
                    ) : null}
                </div>
            ) : screen === "addBoardType" ? (
                <AddBoardType
                    cancel={cancel}
                    showNotification={showNotification}
                    changeMode={changeMode}
                    mutated={mutated}
                    editData={changeMode === "create" ? "" : editData}
                />
            ) : screen === "details" && boardTypeId ? (
                <BoardTypeTab
                    cancel={cancel}
                    boardTypeId={boardTypeId}
                    editForm={editForm}
                />
            ) : null}
            {ShowNotificationAlert && (
                <Notificationalert
                    message={NotificationDetails.message}
                    success={NotificationDetails.isSuccess}
                    error={NotificationDetails.isError}
                    warning={NotificationDetails.isWarning}
                />
            )}
        </div>
    );
}