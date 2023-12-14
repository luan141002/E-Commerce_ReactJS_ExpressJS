import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import DebouncedInput from './DebouncedInput';
import AdminService from '../../services/AdminService';
import { USERS } from './data';
import OrderDetails from '../../pages/OrderDetails';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from '../DeleteModal';

const Table = ({ type }) => {
    const [data, setData] = useState(() => {
        switch (type) {
            case 'users':
                return [
                    {
                        userName: 'string',
                        userFullName: 'string',
                        address: 'string',
                        contactNumber: 'string',
                        activated: true,
                        isDeleted: true,
                        roles: 'string',
                    },
                ];
                break;
            case 'products':
                return [
                    {
                        productName: 'string',
                        actualPrice: 0,

                        manufacturer: 'string',
                        quantity: 0,
                        Image: '',
                        category: '',
                        status: 'AVAILABLE',
                    },
                ];
                break;
            case 'orders':
                return [
                    {
                        orderFullName: 'string',
                        orderFullAddress: 'string',
                        orderContactNumber: 'string',
                        orderStatus: 'string',
                        isPaid: true,
                        quantity: 0,
                        orderAmount: 0,
                        createdDate: '2023-12-14T00:36:19.672Z',
                        customProductName: '',
                    },
                ];
                break;
        }
    });
    const navigate = useNavigate();
    const [reloadPage, setReloadPage] = useState(0);
    const [openOrderDetails, setOpenOrderDetails] = useState(false);
    const [orderId, setOrderId] = useState(0);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(0);

    const isAdmin = useRef(false);
    useMemo(() => {
        async function fetchMyAPI() {
            isAdmin.current = await AdminService.checkAdmin();
            console.log(isAdmin.current);
            let result;
            if (isAdmin.current === false) {
                navigate('/');
            }
            if (isAdmin.current === true && type === 'users') {
                try {
                    const userList = await AdminService.getUsers();
                    const users = userList.filter((user) => user?.roles[0]?.roleName !== 'ADMIN');
                    if (users?.length !== 0) {
                        const processedResults = users?.map((element) => ({
                            Email: element?.userName,
                            FullName: element?.userFirstName + ' ' + element?.userLastName,
                            address: element?.address,
                            Phone: element?.contactNumber,
                            activated: element?.activated?.toString(),
                            Deleted: element?.isDeleted?.toString(),
                            roles: element?.roles[0]?.roleName,
                            edit: element?.userName,
                        }));
                        setData([...processedResults]);
                    } else {
                        setData([
                            {
                                userName: 'string',
                                userFirstName: 'string',
                                userLastName: 'string',
                                address: 'string',
                                contactNumber: 'string',
                                activated: true,
                                isDeleted: true,
                                roles: 'string',
                            },
                        ]);
                    }
                } catch (err) {
                    toast.error('Load Users failed', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                // console.log(users);
                // setData(users);
            } else if (isAdmin.current === true && type === 'products') {
                try {
                    const products = await AdminService.getProducts();

                    if (products?.length !== 0) {
                        const processedResults = products?.map((element) => ({
                            productName: element.productName,
                            Image: element.productImages[0].link,
                            actualPrice: `${element.actualPrice}vnđ`,
                            manufacturer: element.manufacturer,
                            quantity: element.quantity,
                            category: element.category.name,
                            status: element.status,
                        }));
                        setData([...processedResults]);
                    } else {
                        setData([
                            {
                                productName: 'string',
                                Image: '',
                                actualPrice: 0,
                                manufacturer: 'string',
                                quantity: 0,
                                category: '',
                                status: 'AVAILABLE',
                            },
                        ]);
                    }
                } catch (err) {
                    toast.error('Load Products failed', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else if (isAdmin.current === true && type === 'orders') {
                try {
                    const orders = await AdminService.getOrders();

                    if (orders?.length !== 0) {
                        const processedResults = orders?.map((element) => ({
                            Name: element?.orderFullName,
                            Address: element?.orderFullAddress,
                            Phone: element?.orderContactNumber,
                            Status: element?.orderStatus,
                            Paid: element?.isPaid.toString(),
                            quantity: element?.quantity,
                            Amount: `${element?.orderAmount}vnđ`,
                            Date: element?.createdDate?.toString(),
                            ProductName: element?.customProductEntity?.productEntity?.productName,
                            Image: element?.customProductEntity?.customImages[0]?.link,
                            edit: element?.id,
                        }));
                        setData([...processedResults]);
                    } else {
                        setData([
                            {
                                orderFullName: 'string',
                                orderFullAddress: 'string',
                                orderContactNumber: 'string',
                                orderStatus: 'string',
                                isPaid: true,
                                quantity: 0,
                                orderAmount: 0,
                                createdDate: '2023-12-14T00:36:19.672Z',
                                customProductName: '',
                            },
                        ]);
                    }
                } catch (err) {
                    toast.error('Load orders failed', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        }
        fetchMyAPI();
    }, [type, reloadPage]);

    const columnHelper = createColumnHelper();
    let columns = [
        columnHelper.accessor('', {
            id: 'No',
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: 'No',
        }),

        ...Object.keys(data[0])
            ?.map((field) => {
                return columnHelper.accessor(field, {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: camelToCapitalize(field),
                });
            })
            .filter((field) => field.header !== 'Edit'),
        columnHelper.accessor('edit', {
            id: 'Edit',
            cell: (info) => (
                <div>
                    {isAdmin.current === true && type === 'users' && (
                        <div className="flex justify-center space-x-3 ">
                            <button
                                type="button"
                                className="bg-green-700  text-white h-[30px] w-[90px] hover:border-3  hover:hover:opacity-80"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    try {
                                        await AdminService.reviveUser(info.getValue());
                                        setReloadPage((state) => state + 1);
                                    } catch (err) {
                                        toast.error('Revive user failed', {
                                            position: toast.POSITION.TOP_RIGHT,
                                        });
                                    }
                                }}
                            >
                                REVIVE
                            </button>
                            <button
                                type="button"
                                className="bg-gray-700 text-white h-[30px] w-[90px] hover:border-3  hover:opacity-80"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setOpenDeleteModal(true);
                                    setUserIdToDelete(info.getValue());
                                    // try {
                                    //     await AdminService.deleteUser(info.getValue());
                                    //     setReloadPage((state) => state + 1);
                                    // } catch (err) {
                                    //     toast.error('Delete user failed', {
                                    //         position: toast.POSITION.TOP_RIGHT,
                                    //     });
                                    // }
                                }}
                            >
                                DELETE
                            </button>
                        </div>
                    )}
                    {isAdmin.current === true && type === 'orders' && (
                        <div className="flex justify-center space-x-3 ">
                            <button
                                type="button"
                                className="bg-green-700  text-white h-[30px] w-[90px] hover:border-3  hover:hover:opacity-80"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    try {
                                        console.log(info.getValue());
                                        await AdminService.shippedOrder(info.getValue());
                                        setReloadPage((state) => state + 1);
                                    } catch (err) {
                                        toast.error('Set shipped status failed', {
                                            position: toast.POSITION.TOP_RIGHT,
                                        });
                                    }
                                }}
                            >
                                SHIPPED
                            </button>
                            <button
                                type="button"
                                className="bg-gray-700 text-white h-[30px] w-[90px] hover:border-3  hover:opacity-80"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setOrderId(info.getValue());
                                    setOpenOrderDetails(true);
                                }}
                            >
                                VIEW
                            </button>
                        </div>
                    )}
                </div>
            ),
            header: 'Edit',
        }),
    ];
    if (isAdmin.current === true && (type === 'products' || type === 'orders' || type === 'users')) {
        const newColumns = columns.filter((column) => column.header !== 'Image');
        columns = [
            ...newColumns,
            columnHelper.accessor('Image', {
                cell: (info) => (
                    <img src={info?.getValue()} alt="..." className="rounded-full w-10 h-10 object-cover" />
                ),
                header: 'Image',
            }),
        ];
    }
    if (isAdmin.current === true && type === 'products') {
        const newColumns = columns.filter((column) => column.header !== 'Edit');
        columns = [...newColumns];
    }
    if (isAdmin.current === true && type === 'users') {
        const newColumns = columns.filter((column) => column.header !== 'Image');
        columns = [...newColumns];
    }
    const [globalFilter, setGlobalFilter] = useState('');

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full h-screen">
            <label className="text-[25px] font-semibold capitalize">{type !== null ? type : ''} list</label>
            <div className="p-2 max-w-8xl mx-auto text-white fill-gray-400 bg-gray-800">
                <div className="flex justify-between mb-2">
                    <div className="w-full flex items-center gap-1">
                        <SearchIcon />
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={(value) => setGlobalFilter(String(value))}
                            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
                            placeholder="Search all columns..."
                        />
                    </div>

                    {/* {isPT && type === 'exercises' && (
                        <div>
                            <button
                                type="reset"
                                className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  px-2 hover:opacity-80"
                                onClick={() => setOpenAddExerciseModel((state) => !state)}
                            >
                                Add Exercise
                            </button>
                        </div>
                    )} */}
                </div>
                <table className="border border-gray-700 w-full text-left">
                    <thead className="bg-red-800 text-center">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="capitalize px-3.5 py-2">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`
                    ${i % 2 === 0 ? 'bg-gray-900 ' : 'bg-gray-800'}
                    `}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-3.5 py-2 text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center h-32">
                                <td colSpan={12}>No Record Found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* pagination */}
                <div className="flex items-center justify-end mt-2 gap-2">
                    <button
                        onClick={() => {
                            table.previousPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                        className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={() => {
                            table.nextPage();
                        }}
                        disabled={!table.getCanNextPage()}
                        className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                    >
                        {'>'}
                    </button>

                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            className="border p-1 rounded w-16 bg-transparent"
                        />
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="p-2 bg-transparent"
                    >
                        {[10, 20, 30, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                {openOrderDetails && <OrderDetails setOpenOrderDetails={setOpenOrderDetails} orderId={orderId} />}
                {openDeleteModal && (
                    <DeleteModal
                        type={type}
                        userIdToDelete={userIdToDelete}
                        setOpenDeleteModal={setOpenDeleteModal}
                        setReloadPage={setReloadPage}
                    />
                )}
                <ToastContainer />
            </div>
        </div>
    );
};
const SearchIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
    );
};
function camelToCapitalize(inputStr) {
    return inputStr.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
}
export default Table;
