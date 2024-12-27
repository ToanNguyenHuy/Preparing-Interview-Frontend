import { ROLE } from "@/constants/role";
import { resetMessage } from "@/reducers/adminReducer/adminReducer";
import { getListAllUser, getUpdateRoleError, getUpdateRoleMessage } from "@/reducers/adminReducer/adminSelector";
import { addRole, getAllUser, removeRole } from "@/reducers/adminReducer/adminThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const ROLE_COLOR = {
    ADMIN: "text-red-400",
    MOD: "text-indigo-400",
    USER: "text-lime-600",
    NONE: "text-zinc-400"
}

const ROLE_HOVER = {
    ENABLE: "hover:bg-green-300",
    DISABLE: "hover:bg-red-300",
}

export function RoleDisplay({ role, isEnable, onClick, ...props }) {
    const [roleColor, setRoleColor] = useState(ROLE_COLOR.NONE);
    const [hoverColor, setHoverColor] = useState(ROLE_HOVER.DISABLE);

    useEffect(() => {
        if (isEnable) {
            switch (role) {
                case ROLE.ADMIN:
                    setRoleColor(ROLE_COLOR.ADMIN)
                    break;
                case ROLE.MOD:
                    setRoleColor(ROLE_COLOR.MOD)
                    break;
                case ROLE.USER:
                    setRoleColor(ROLE_COLOR.USER)
                    break;
            }
            setHoverColor(ROLE_HOVER.DISABLE);
        } else {
            setHoverColor(ROLE_HOVER.ENABLE);
        }
    }, [role]);

    const convertToText = function (role) {
        switch (role) {
            case ROLE.ADMIN:
                return "admin"
            case ROLE.MOD:
                return "mod"
            case ROLE.USER:
                return "user"
        }
    }

    return (
        <button className={`${roleColor} font-bold px-2 py-1 bg-[#E2E8F0] rounded-md mx-2 ${hoverColor}`} onClick={onClick}>
            {convertToText(role)}
        </button>
    );
}

export function UserSlot({ userInfo, onUpdateRole, ...props }) {
    const ROLES = [ROLE.ADMIN, ROLE.MOD, ROLE.USER];
    const dispatch = useDispatch();

    const isRoleEnable = function (role) {
        return userInfo.roles.indexOf(role) !== -1;
    }

    const getRoleTitle = function (role) {
        switch (role) {
            case ROLE.ADMIN:
                return "Admin";
            case ROLE.MOD:
                return "Mod";
            case ROLE.USER:
                return "User";
        }
    }

    const showUpdateRoleNoti = async function (role) {
        let isEnableRole = !isRoleEnable(role);
        let notiInfo = {
            title: 'Bạn có chắc chắn muốn xóa?',
            text: 'Hành động này sẽ không thể hoàn tác!',
            icon: 'warning',
        }

        if (isEnableRole) {
            notiInfo.title = `Bạn có muốn cập nhật quyền ${getRoleTitle(role)} cho người dùng ${userInfo.userName}?`
        } else {
            notiInfo.title = `Bạn có muốn xóa quyền ${getRoleTitle(role)} của người dùng ${userInfo.userName}?`
        }

        let result = await Swal.fire({
            ...notiInfo,
            showCancelButton: true,
            confirmButtonText: 'Cập nhật',
            cancelButtonText: 'Hủy',
        })

        return result.isConfirmed;

    };

    const handleUpdateRole = async function (role) {
        let isConfirmed = await showUpdateRoleNoti(role);
        if (isConfirmed) {
            let isEnable = !isRoleEnable(role);
            if (isEnable) {
                dispatch(addRole({ userId: userInfo.id, role: role.split("_")[1].toLowerCase() }));
            } else {
                dispatch(removeRole({ userId: userInfo.id, role: role.split("_")[1].toLowerCase() }));
            }
        }
    };

    return (
        <div
            className={
                "w-full h-[40px] bg-slate-200 rounded flex flex-row items-center px-3 gap-2 mb-2 odd:bg-slate-50 even:bg-slate-100 hover:border hover:border-slate-200 justify-around"
            }
        >
            <div className="flex-1 flex flex-row justify-center truncate">
                {
                    userInfo.userName
                }
            </div>

            <div className="flex-1 flex flex-row justify-center truncate">
                {
                    userInfo.email
                }
            </div>

            <div className="flex-1 flex flex-row justify-center">
                {
                    ROLES.map((role, index) => {
                        return (
                            <RoleDisplay
                                key={"role_display" + index + isRoleEnable(role)}
                                role={role}
                                isEnable={isRoleEnable(role)}
                                onClick={() => handleUpdateRole(role)}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default function ListUser({ props }) {
    const dispatch = useDispatch();

    const messageError = useSelector(getUpdateRoleError);
    const messageSuccess = useSelector(getUpdateRoleMessage);
    const listUser = useSelector(getListAllUser);
    const [reload, setReload] = useState(1);

    useEffect(() => {
        if (messageError !== "") {
            handleShowErrorMessage();
        }
        if (messageSuccess !== "") {
            handleShowSuccessMessage();
        }
    }, [messageError, , messageSuccess]);


    const handleShowErrorMessage = () => {
        Swal.fire({
            title: messageError,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'Xác nhận',
        }).then(() => {
            dispatch(resetMessage());
            setReload(state => state + 1);
        });
    }

    const handleShowSuccessMessage = () => {
        Swal.fire({
            title: messageSuccess,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Xác nhận',
        }).then(() => {
            dispatch(resetMessage());
            setReload(state => state + 1);
        });
    }

    const [onlyOne, setOnlyOne] = useState(1);

    useEffect(() => {
        dispatch(getAllUser());
    }, [onlyOne]);

    return (
        <div className={"w-full px-5 mt-5"}>
            <div
                className={
                    "w-full h-[40px] bg-slate-200 rounded border border-slate-300 mb-2 flex flex-row px-3 gap-2 justify-around items-center font-semibold"
                }
            >
                <div className="flex-1 flex flex-row items-center justify-center">{"Tên người dùng"}</div>
                <div className="flex-1 flex flex-row items-center justify-center">{"Email"}</div>
                <div className={"flex-1 flex flex-row items-center justify-center"}>{"Phân quyền"}</div>
            </div>
            {
                !listUser.length ?
                    (
                        <div className={"font-medium text-slate-700 text-center mb-10 mt-5"}>
                            Chưa có người dùng nào trong hệ thống
                        </div>
                    ) :
                    listUser.map((user, index) => {
                        console.log(user.roles);
                        return (<UserSlot key={"user_slot" + index} userInfo={user} />)
                    })
            }
        </div>
    );
}
