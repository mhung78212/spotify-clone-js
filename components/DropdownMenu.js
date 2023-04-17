import React from "react";

const DropdownMenu = () => {
    return (
        <div>
            <ul
                className={`absolute top-full right-0 z-10 w-full bg-gray-900 mt-1 text-white rounded-xl hidden`}
            >
                <li className="m-4">Tài khoản</li>
                <li className="m-4">Hồ sơ</li>
                <li className="m-4">Cài đặt</li>
                <li className="m-4">Đăng xuất</li>
            </ul>
        </div>
    );
};

export default DropdownMenu;
