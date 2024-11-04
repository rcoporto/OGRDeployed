


const ActivitiesTable = () => {
    return (
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-base text-gray-700 uppercase bg-gray-50 text-center">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Event Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody class="cursor-pointer">
                        <tr class="bg-white border-b hover:bg-gray-50 text-center">
                            <th scope="row" class="px-6 py-4 font-medium font-lora text-gray-900 whitespace-nowrap">
                                Lorem ipsum
                            </th>
                            <td class="px-6 py-4 font-lora">
                                Lorem ipsum
                            </td>
                            <td class="px-6 py-4 text-center">
                                <button type="button" class="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                                        <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                        </svg>
                                        Edit
                                    </button>
                                    <button type="button" class="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                                    <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                    </svg>
                                        Delete
                                </button>
                            </td>
                        </tr>
                        <tr class="bg-white border-b hover:bg-gray-50 text-center">
                            <th scope="row" class="px-6 py-4 font-medium font-lora text-gray-900 whitespace-nowrap dark:text-white">
                                Lorem ipsum
                            </th>
                            <td class="px-6 py-4 font-lora">
                                Lorem ipsum
                            </td>
                            <td class="px-6 py-4 text-center">
                                <button type="button" class="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                                        <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                        </svg>
                                        Edit
                                    </button>
                                    <button type="button" class="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                                    <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                    </svg>
                                        Delete
                                </button>
                            </td>
                        </tr>
                        <tr class="bg-white border-b hover:bg-gray-50 text-center">
                            <th scope="row" class="px-6 py-4 font-medium font-lora text-gray-900 whitespace-nowrap dark:text-white">
                                Lorem ipsum
                            </th>
                            <td class="px-6 py-4 font-lora">
                                Lorem ipsum
                            </td>
                            <td class="px-6 py-4 text-center">
                                <button type="button" class="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                                    <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                    </svg>
                                    Edit
                                </button>
                                <button type="button" class="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                                <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                </svg>
                                    Delete
                                </button>
                            </td>
                            
                        </tr>
                    </tbody>
                    <tfoot>
            <tr class="bg-white border-b hover:bg-gray-50 text-center">
                <th scope="row" class="px-6 py-3 text-base">
                <button class="text-white bg-bluegreen-1 cursor-pointer focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 hover:bg-bluegreen-60">
                <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>

                Add Event</button>
                </th>
                <td class="px-6 py-3"></td>
                <td class="px-6 py-3"></td>
            </tr>
        </tfoot>
                </table>
            </div>
        </div>
    )
}

export default ActivitiesTable;