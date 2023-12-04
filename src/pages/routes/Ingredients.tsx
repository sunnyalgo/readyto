import { useState } from "react"
import { useContractRead, useContractWrite } from "wagmi";
import { createColumnHelper } from "@tanstack/react-table"
import { toast } from "react-toastify";
import { ModalWrapper, Toast } from "components";
import { currentTime } from 'utilities';

import { IngredientType, contract_address } from "utilities"
import { abi as ContractABI } from "contracts"
import { Table, AddIngredientModal } from "components"

const Ingredients = () => {
  const columnHelper = createColumnHelper<IngredientType>()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ removeItemId, setRemoveItemId ] = useState<number>(0);

  const clientColumns = [
    columnHelper.accessor("id", {
      header: "Item ID",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("batchId", {
      header: "BatchId",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("supplierId", {
      header: "Supplier",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("imgUrl", {
      header: "imgUrl",
      cell: info => {
        return(
          <a href={`${info.getValue()}`}>
            <img src={`${info.getValue()}`} width="100px" alt="product image"/>
          </a>
        )
      },
    }),
    columnHelper.accessor("certificationUrls", {
      header: "Certification",
      cell: info => (
        <div>
          {info.getValue().map((url, index) => (
            <a key={index} href={url}>
              {url}
            </a>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("finalLocation", {
      header: "Location",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("timestamp", {
      header: "Time",
      cell: info => { return( <>{new Date(info.getValue()*1000).toDateString()}</>)}
    }),
    columnHelper.display({
      header: "Remove",
      cell: info => (
        <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2" 
        onClick={()=>removeIngredient(info.row.original.id)}
      >
        Remove
      </button>
      )
    })
  ]

  const { data } = useContractRead({
    address: contract_address,
    abi: ContractABI,
    functionName: "getIngredients",
  });
  
  const { write } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: "removeIngredientByOwner",
    args: [BigInt(removeItemId)],
    onSuccess: ()=>{
      console.log("successfully removed!");
    },
    onError: (error) => {
      console.log("Error : ",error);
    }
  })

  function covertDataToIngredientType(data: Array<IngredientType>): IngredientType[] {
    return data.map((item)=>({
      id: item.id,
      name: item.name, 
      batchId: item.batchId,
      supplierId: item.supplierId,
      imgUrl: item.imgUrl,
      certificationUrls: item.certificationUrls,
      description: item.description,
      finalLocation: item.finalLocation,
      timestamp: item.timestamp,
    }))
  }

  function addNewIngredient() {
    setModalOpen(true);
  }

  function removeIngredient( id:number ) {
    setRemoveItemId(id);
    write();
  }

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full mt-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ingredients Tab</h3>
      <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end mb-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>addNewIngredient()}>
            New Ingredient
          </button>
        </div>

        {data 
        ? <Table columns={clientColumns} data={covertDataToIngredientType(data as Array<IngredientType>)} />
        : <Table columns={clientColumns} data={[]} />
        }
        <AddIngredientModal isOpen={modalOpen} closeModalHandler={()=>setModalOpen(false)}/>
      </div>
    </div>
  )
}

export default Ingredients;