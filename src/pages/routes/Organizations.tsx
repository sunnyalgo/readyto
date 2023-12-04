import { createColumnHelper } from "@tanstack/react-table"
import { useState } from "react"
import { useContractRead, useContractWrite } from "wagmi";

import { OrganizationType, contract_address } from "utilities"
import { abi as ContractABI } from "contracts"
import { Table, AddOrganizationModal } from "components"

const Organizations = () => {
  const columnHelper = createColumnHelper<OrganizationType>()
  const [ modalOpen, setModalOpen ] = useState(false)

  const clientColumns = [
    columnHelper.accessor("id", {
      header: "Supplier ID",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Supplier Name",
      cell: info => info.getValue(),
    }),
    columnHelper.display({
      header: "Remove",
      cell: info => (
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2" 
          onClick={()=>removeOrganization(info.row.original.id)}
        >
          Remove
        </button>
      )
    }),
  ]

  const { data } = useContractRead({
    address: contract_address,
    abi: ContractABI,
    functionName: "getOrganizations",
  });
  const [ removeItemId, setRemoveItemId ] = useState<number>(0);
  const { write } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: "removeOrganizationByOwner",
    args: [removeItemId],
    onSuccess: ()=>{
      console.log("successfully removed!");
    },
    onError: (error) => {
      console.log("Error : ",error);
    }
  })
  
  function covertDataToOrganizationType(data: Array<OrganizationType>): OrganizationType[] {
    return data.map((item)=>({
      id: item.id,
      name: item.name
    }))
  }

  function addNewOrganization() {
    setModalOpen(true);
  }

  function removeOrganization( id:number ) {
    setRemoveItemId(id);
    write();
  }

  return (
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full mt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Organizations Tab</h3>
        <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-end mb-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>addNewOrganization()}>New Organization</button>
          </div>
          {data 
          ? <Table columns={clientColumns} data={covertDataToOrganizationType(data as Array<OrganizationType>)} />
          : <Table columns={clientColumns} data={[]} />
          }
          <AddOrganizationModal isOpen={modalOpen} closeModalHandler={()=>setModalOpen(false)}/>
        </div>
      </div>
  )
}

export default Organizations;