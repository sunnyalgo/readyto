import { type FC, useState, useEffect } from "react"
import { Field, Form } from "react-final-form"
import { toast } from "react-toastify"
import { useContractRead, useContractWrite } from "wagmi";
import Select from "react-select";

import { ModalWrapper, Toast } from "components"
import { currentTime, IngredientWriteType, contract_address } from "utilities"
import { abi as ContractABI } from "contracts";
import { AddIngredientModalProps } from "./AddIngredientModal.types"

const AddIngredientModal: FC<AddIngredientModalProps> = ({ isOpen, closeModalHandler }) => {
  const timestamp = currentTime()
  const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'batchId', label: 'Batch ID', type: 'text', required: true },
    { name: 'imgUrl', label: 'Image URL', type: 'text', required: true },
    { name: 'certificationUrls', label: 'Certificates', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: true },
    { name: 'supplierId', label: 'Suppliers', type: 'select', required: true },
    { name: 'finalLocation', label: 'Location', type: 'text', required: true },
  ];

  const [dropOptions, setDropOptions] = useState<any[]>([]);
  const [formData, setFormData] = useState<Partial<IngredientWriteType>>({});

  const { data } = useContractRead({
    address: contract_address,
    abi: ContractABI,
    functionName: "getSuppliers",
  });

  const { isSuccess, write } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: 'addIngredientByOwner',
    args: [
      formData.name!,
      formData.batchId!,
      formData.supplierId!,
      formData.imgUrl!,
      formData.certificationUrls!,
      formData.description!,
      formData.finalLocation!,
    ],
    onSuccess(data) {
      toast.success(
        <Toast timestamp={timestamp}>
          <span>New Ingredient added successfully</span>
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
  useEffect(() => {
    let options: any[] = [];
    data?.map((item) => {
      options.push({ value: item.id, label: item.name });
    });
    setDropOptions(options);
  }, [data]);

  function onAddIngredient() {
    write();
  }

  function convertFormDataToIngredientWriteType(formData: any): IngredientWriteType {
    const convertedData: IngredientWriteType = {
      name: formData.name,
      batchId: formData.batchId,
      supplierId: Number(formData.supplierId.value),
      imgUrl: formData.imgUrl,
      certificationUrls: formData.certificationUrls.split(','),
      description: formData.description,
      finalLocation: formData.finalLocation,
    };
    console.log(convertedData);
    return convertedData;
  }


  const handleSubmit = (values : Partial<IngredientWriteType>) => {
    setFormData(convertFormDataToIngredientWriteType(values));
    onAddIngredient();
    closeModalHandler()
  }

  return (
    <ModalWrapper className={"AddProductModal"} isOpen={isOpen} closeModalHandler={closeModalHandler}>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="text-gray-900 dark:text-white text-center text-xl font-bold mb-5">Add New Ingredient</div>
            <div className="AddProductModal__Info space-y-2">
              {formFields.map((field) => (
                <div key={field.name} className="AddProductModal__Info--item flex items-center">
                  <label htmlFor={field.name} className="w-2/5 font-semibold mr-5">{field.label}:</label>
                  {field.type === 'select' ? (
                    <Field
                      className="border p-2 w-3/5"
                      name={field.name}
                      render={({ input }) => (
                        <Select
                          className="ingre-select"
                          {...input}
                          options={dropOptions}
                          isMulti
                          required={field.required}
                        />
                      )}
                    />
                  ) : (
                    <Field
                      className="border p-2 w-3/5"
                      name={field.name}
                      component="input"
                      type={field.type}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className='AddProductModal__container'>
              <div className='AddProductModal__actions flex justify-end'>
                <button
                  className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={closeModalHandler}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-green-500 bg-white border border-green-300 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-200 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700"
                  type='submit'
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </ModalWrapper>
  )
}

export default AddIngredientModal
