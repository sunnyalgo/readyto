import { createColumnHelper } from "@tanstack/react-table"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import { useContractRead, useContractWrite, useAccount } from "wagmi";


import { Toast } from "components";
import { OrganizationType, contract_address, currentTime } from "utilities"
import { abi as ContractABI } from "contracts"
import { Table, AddOrganizationModal } from "components"

const Organizations = () => {
  const columnHelper = createColumnHelper<OrganizationType>()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ contractData, setContractData ] = useState<Array<OrganizationType>>();
  const { address } = useAccount();
  const { data } = useContractRead({
    address: contract_address,
    abi: ContractABI,
watch: true,
    functionName: "getOrganizations",
  });
  const clientColumns = [
    columnHelper.accessor("id", {
      header: "Organization ID",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Organizatin Name",
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
  const timestamp = currentTime();

  const { writeAsync } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: "removeOrganizationByOwner",
    onSuccess: ()=>{
      toast.success(
        <Toast timestamp={timestamp}>
          <span>Successfully removed</span>
        </Toast>,
      )
    },
    onError: (error) => {
      alert(error);
    }
  })

  function covertDataToOrganizationType(data: Array<OrganizationType>): OrganizationType[] {
    return data?.map((item)=>({
      id: item.id,
      name: item.name
    }))
  }

  function addNewOrganization() {
    setModalOpen(true);
  }

  function removeOrganization( id:number ) {
    writeAsync({ args:[id] })
  }

  function reloadData()
  {
    setContractData(covertDataToOrganizationType(data as Array<OrganizationType>));
  }

  useEffect(()=>{
    reloadData();
  },[data])

  return (
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full mt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Organizations Tab</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-end mb-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>addNewOrganization()}>New Organization</button>
          </div>
          {contractData
          ? <Table columns={clientColumns} data={contractData} />
          : <Table columns={clientColumns} data={[]} />
          }
          <AddOrganizationModal isOpen={modalOpen} closeModalHandler={()=>{setModalOpen(false)}}/>
        </div>
      </div>
  )
}

export default Organizations;