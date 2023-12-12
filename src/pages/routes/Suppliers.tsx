import { createColumnHelper } from "@tanstack/react-table"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { useContractRead, useContractWrite, useAccount } from "wagmi";


import { Toast } from "components";
import { SupplierType, contract_address, currentTime } from "utilities"
import { abi as ContractABI } from "contracts"
import { Table, AddSupplierModal } from "components"

const Suppliers = () => {
  const columnHelper = createColumnHelper<SupplierType>()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ contractData, setContractData ] = useState<Array<SupplierType>>();
  const { address } = useAccount();
  const { data } = useContractRead({
    address: contract_address,
    abi: ContractABI,
    watch: true,
    functionName: "getSuppliers",
  });
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
          onClick={()=>removeSupplier(info.row.original.id)}
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
    functionName: "removeSupplierByOwner",
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
  
  function covertDataToSupplierType(data: Array<SupplierType>): SupplierType[] {
    return data?.map((item)=>({
      id: item.id,
      name: item.name
    }))
  }

  function addNewSupplier() {
    setModalOpen(true);
  }

  function removeSupplier( id:number ) {
    writeAsync({args: [id]});    
  }

  function reloadData()
  {

    setContractData(covertDataToSupplierType(data as Array<SupplierType>));
  }

  useEffect(()=>{
    reloadData()
  },[data])

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full mt-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Suppliers Tab</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-end mb-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>addNewSupplier()}>New Supplier</button>
      </div>
      
      {contractData 
      ? <Table columns={clientColumns} data={contractData} />
      : <Table columns={clientColumns} data={[]} />
      }
      <AddSupplierModal isOpen={modalOpen} closeModalHandler={()=>setModalOpen(false)}/>
      </div>
    </div>
  )
}

export default Suppliers;