import { createColumnHelper } from "@tanstack/react-table"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { useContractRead, useContractWrite, useAccount } from "wagmi";


import { Toast } from "components";
import { ProductType, contract_address, currentTime } from "utilities"
import { abi as ContractABI } from "contracts"
import { Table, AddProductModal } from "components"

const Products = () => {
  const columnHelper = createColumnHelper<ProductType>()
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ contractData, setContractData ] = useState<Array<ProductType>>();
  const { address } = useAccount();
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
    columnHelper.accessor("organizationId", {
      header: "Organization",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("imgUrl", {
      header: "imgUrl",
      cell: info => {
        return(
          <a href={`${info.getValue().slice(1)}`}>
            <img src={`${info.getValue().slice(1)}`} width="100px" alt="product image"/>
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
    columnHelper.accessor("ingredientIds", {
      header: "Ingredients",
      cell: info => (
        <div>
          {info.getValue().map((id) => (
            `${id},`
          ))}
        </div>
      )
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
            onClick={()=>removeProduct(info.row.original.id)}
          >
            Remove
          </button>
      )
    }),
  ]
  const { data } = useContractRead({
    address: contract_address,
    abi: ContractABI,
    watch: true,
    functionName: "getProducts",
  }); 

  const timestamp = currentTime();

  const { writeAsync } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: "removeProductByOwner",
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

  function reloadData()
  {
    setContractData(covertDataToProductType(data as Array<ProductType>))
  }

  useEffect(()=>{
    reloadData();
  },[data])
  
  function covertDataToProductType(data: Array<ProductType>): ProductType[] {
    return data?.map((item)=>({
      id: item.id,
      name: item.name, 
      batchId: item.batchId,
      organizationId: item.organizationId,
      imgUrl: item.imgUrl,
      certificationUrls: item.certificationUrls,
      description: item.description,
      ingredientIds: item.ingredientIds,
      dateOfProduction: item.dateOfProduction,
      dateOfTesting: item.dateOfTesting,
      finalLocation: item.finalLocation,
      timestamp: item.timestamp,
    }))
  }

  function addNewProduct() {
    setModalOpen(true);
  }

  function removeProduct( id:number ) {
    writeAsync({
      args: [id]
    })
  }

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full mt-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Products Tab</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-end mb-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>addNewProduct()}>New Product</button>
      </div>
      {contractData 
      ? <Table columns={clientColumns} data={contractData} />
      : <Table columns={clientColumns} data={[]} />
      }
      <AddProductModal isOpen={modalOpen} closeModalHandler={()=>setModalOpen(false)}/>
      </div>
    </div>
  )
}

export default Products;