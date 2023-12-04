import { type FC, useState } from "react"
import { Field, Form } from "react-final-form"
import { toast } from "react-toastify"
import { useContractWrite } from "wagmi";

import { ModalWrapper, Toast } from "components"
import { currentTime, contract_address } from "utilities"
import { abi as ContractABI } from "contracts";
import { AddSupplierModalProps } from "./AddSupplierModal.types"

const AddSupplierModal: FC<AddSupplierModalProps> = ({ isOpen, closeModalHandler }) => {
  const timestamp = currentTime()
  const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
  ];

  const [formData, setFormData] = useState('');

  const { isSuccess, write } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: 'addSupplierByOwner',
    args: [
      formData,
    ],
    onSuccess(data) {
      toast.success(
        <Toast timestamp={timestamp}>
          <span>New Supplier added successfully</span>
        </Toast>,
      )
      console.log("success : ",data);
    },
    onError(error) {
      toast.error(
        <Toast timestamp={timestamp}>
          <span>You are not owner of this contract.</span>
        </Toast>,
      )
      console.log("Error : ",error);
    }
  })

  function onAddSupplier() {
    write();
  }

  const handleSubmit = (values : {name : string}) => {
    setFormData(values.name);
    onAddSupplier();
    closeModalHandler()
  }

  return (
    <ModalWrapper className="AddSupplierModal" isOpen={isOpen} closeModalHandler={closeModalHandler}>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="text-gray-900 dark:text-white text-center text-xl font-bold mb-5">New Supplier</div>
            <div className="AddProductModal__Info">
              {formFields.map((field) => (
                <div key={field.name} className="AddProductModal__Info--item">
                  <label htmlFor={field.name} className="w-2/5 font-semibold mr-5">{field.label}:</label>
                  <Field className="border ml-2"
                    name={field.name}
                    component="input"
                    type={field.type}
                    required={field.required}
                  />
                </div>
              ))}
            </div>
            <div className='AddSupplierModal__container'>
              <div className='AddSupplierModal__actions'>
                <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={closeModalHandler}>Cancel</button>
                <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-green-500 bg-white border border-green-300 rounded-full focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-green-200 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700" type='submit' >Add</button>
              </div>
            </div>
          </form>
        )}
      />
    </ModalWrapper>
  )
}

export default AddSupplierModal
