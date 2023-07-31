import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Error from "../../components/common/error";
import Loading from "../../components/common/loading";
import { getServiceHeader, trackerror } from "../../config/sitesettings";
import PaginationList from "../../components/timezone/timezonelist";
import Notificationalert from "../../components/common/notificationalert";
import { showNotificationAlert } from "../../config/globalfunctions";
import NewPagination from "../../components/common/pagination/newpaginationcomponent";
import { useRouter } from "next/router";

export default function Pagination() {

    const [screen, setScreen] = useState("timezone");
    const [pageIndex, setPageIndex] = useState(1);
    const [changeMode, setChangeMode] = useState("");
    const [editData, setEditData] = useState({});
    const [ShowNotificationAlert, setShowNotificationAlert] = useState(false);
    const [NotificationDetails, setNotificationDetails] = useState({
        isError: false,
        isSuccess: false,
        isWarning: false,
        message: "",
    });
    const pageLimit = 20;
    const router = useRouter();
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
    const { data, error } = useSWR(`/api/masters/timezone`,
        fetcher, { revalidateOnFocus: false, shouldRetryOnError: false }
    );
    const indexOfLastData = pageIndex * pageLimit;
    const indexOfFirstData = indexOfLastData - pageLimit;
    const currentData = data?.slice(indexOfFirstData, indexOfLastData);
    const paginationClick = (page_number) => {
        setPageIndex(page_number);
    };
    const cancel = () => {
        setScreen("timezone");
        setChangeMode("create")
    };
    const editForm = (item, mode) => {
        setScreen("addTimezone");
        setEditData(item);
        setChangeMode(mode)
    };
    const SelectMode = (type) => {
        setChangeMode(type);
    };
    const addForm = () => {
        setScreen("addTimezone");
        SelectMode("create");
    }
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
        mutate(`/api/masters/timezone`);
    };

    return (
        <div className="h-full p-10">
            {screen === "timezone" ? (
                <div className="relative">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    TimeZone Master
                                </h1>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={addForm}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 md:px-4 md:py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Add TimeZone
                        </button>
                    </div>
                    {error ? <Error /> : null}
                    {!data ? <Loading /> : null}
                    {data ? (
                        <>
                            <TimeZoneList
                                data={currentData}
                                editForm={editForm}
                                editData={changeMode === "create" ? "" : editData}
                            />
                            <NewPagination
                                containerstyle={"w-full fixed bottom-0"}
                                totalRecords={data?.length}
                                recordsPerPage={pageLimit}
                                currentPage={pageIndex}
                                paginationClick={paginationClick}
                            />
                        </>
                    ) : null}
                </div>
            ) : null
            }
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
