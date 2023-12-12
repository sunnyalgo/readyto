import { type FC, useState, useEffect } from "react"
import { Field, Form, FormSpy } from "react-final-form"
import { toast } from "react-toastify"
import { useContractRead, useContractWrite } from "wagmi";
import Select from "react-select";


import { ModalWrapper, Toast } from "components"
import { currentTime, IngredientWriteType, contract_address } from "utilities"
import { abi as ContractABI } from "contracts";
import { AddIngredientModalProps } from "./AddIngredientModal.types"
import { FLIGHT_PARAMETERS } from "next/dist/client/components/app-router-headers";

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
      watch: true,
      functionName: "getSuppliers",
    });

  const { write } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: 'addIngredientByOwner',
    args: [
      formData.name!,
      formData.batchId!,
      Number(formData.supplierId),
      formData.imgUrl!,
      formData.certificationUrls!,
      formData.description!,
      formData.finalLocation!,
    ],
    onSuccess() {
      toast.success(
        <Toast timestamp={timestamp}>
          <span>New Ingredient added successfully</span>
        </Toast>,
      )
      
    },
    onError(error) {
      alert(error)
      
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
    console.log("Add Data : ",formData);
    write();
  }

  function convertFormDataToIngredientWriteType(formData: any): IngredientWriteType {
    console.log("get fromData : ", formData);
    if(!formData.name || !formData.batchId || !formData.supplierId || !formData.imgUrl || !formData.certificationUrls || !formData.description || !formData.finalLocation) return ({
      name: '',
      batchId: '',
      supplierId: 0,
      imgUrl: '',
      certificationUrls: [''],
      description: '',
      finalLocation: ''
    });
    console.log("set");
    const convertedData: IngredientWriteType = {
      name: formData.name,
      batchId: formData.batchId,
      supplierId: formData.supplierId.value,
      imgUrl: formData.imgUrl,
      certificationUrls: formData.certificationUrls.split(','),
      description: formData.description,
      finalLocation: formData.finalLocation,
    };
    console.log("converted Data : ", convertedData);
    return convertedData;
  }

  const handleSubmit = async (values : Partial<IngredientWriteType>) => {
    onAddIngredient();
    closeModalHandler()
  }

  return (
    <ModalWrapper className={"AddProductModal"} isOpen={isOpen} closeModalHandler={closeModalHandler}>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="text-gray-900 dark:text-white text-center text-xl font-bold mb-5">Add New Ingredient</div>
              <div className="AddProductModal__Info space-y-2">
                {formFields.map((field) => (
                  <div key={field.name} className="AddProductModal__Info--item flex items-center">
                    <label htmlFor={field.name} className="w-2/5 font-semibold mr-5">{field.label}:</label>
                    {field.type === 'select' ? (
                      <Field
                        name={field.name}
                        render={({ input }) => (
                          <Select
                            className="p-2 w-3/5"
                            {...input}
                            options={dropOptions}
                            required={field.required}
                          />
                        )}
                      />
                    ) : (
                      <Field
                        className="border p-2 w-3/5 dark:border-gray-900"
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
            <FormSpy
              subscription={{ values: true }}
              onChange={(formState) => {
                setFormData(convertFormDataToIngredientWriteType(formState.values));
                console.log("FormSpy : ", formState.values);
              }}
            />
          </>
        )}
      />
    </ModalWrapper>
  )
}

export default AddIngredientModal
