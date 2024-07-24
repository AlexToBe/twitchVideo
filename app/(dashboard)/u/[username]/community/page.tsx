import { getBlockedUsers } from "@/lib/block-service"
import {  columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { formatDate } from "date-fns"









const CommunityPage = async() => {
    const blockedUsers = await getBlockedUsers()
    const formattedData = blockedUsers.map((block) => ({
        ...block,
        userId:block.blocked.id,
        imageUrl:block.blocked.imageUrl,
        username:block.blocked.username,
        createdAt:formatDate(new Date(block.blocked.createdAt),'dd/mm/yyyy')
    }))

  return (
    <div className="p-6">
          <div className=" mb-4">
              <h1 className=" text-2xl font-bold">
                  
            community page
            </h1>
              
        </div>
         <DataTable columns={columns} data={formattedData} />
    </div>
  )
}

export default CommunityPage
