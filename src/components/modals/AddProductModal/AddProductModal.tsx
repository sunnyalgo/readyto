import React, { FC, useState, useEffect } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { toast } from "react-toastify";
import { useContractRead, useContractWrite } from "wagmi";
import DatePicker from "react-datepicker";

import Select from "react-select";

import { ModalWrapper, Toast } from "components";
import { currentTime, ProductWriteType, contract_address, selectOptionType } from 'utilities';
import { AddProductModalProps } from "./AddProductModal.types";
import { abi as ContractABI } from "contracts";

import 'react-datepicker/dist/react-datepicker.css';
import Ingredients from '../../../pages/routes/Ingredients';

const AddProductModal: FC<AddProductModalProps> = ({ isOpen, closeModalHandler }) => {
  const timestamp = currentTime();
  const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'batchId', label: 'Batch ID', type: 'text', required: true },
    { name: 'organizationId', label: 'Orgnization ID', type: 'text', required: true },
    { name: 'imgUrl', label: 'Image URL', type: 'text', required: true },
    { name: 'certificationUrls', label: 'Certificates', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: true },
    { name: 'ingredientIds', label: 'Ingredients', type: 'select', required: true },
    { name: 'dateOfProduction', label: 'Production Date', type: 'date', required: true },
    { name: 'dateOfTesting', label: 'Test Date', type: 'date', required: true },
    { name: 'finalLocation', label: 'Location', type: 'text', required: true },
  ];

  const [formData, setFormData] = useState<Partial<ProductWriteType>>({});
  const [dropOptions, setDropOptions] = useState<selectOptionType[]>([]);
  const { data } = useContractRead({
      address: contract_address,
      abi: ContractABI,
      watch: true,
      functionName: "getIngredients",
    });

  const { write } = useContractWrite({
    address: contract_address,
    abi: ContractABI,
    functionName: 'addProductByOwner',
    args: [
      formData.name!,
      formData.batchId!,
      formData.organizationId!,
      formData.imgUrl!,
      formData.certificationUrls!,
      formData.description!,
      formData.ingredientIds!,
      Number(formData.dateOfProduction),
      Number(formData.dateOfTesting),
      formData.finalLocation!,
    ],
    onSuccess() {
      toast.success(
        <Toast timestamp={timestamp}>
          <span>New Product added successfully</span>
        </Toast>,
      )
    },
    onError(error) {
      alert(error);
      
    }
  })

  useEffect(() => {
    let options: selectOptionType[] = [];
    data?.map((item) => {
      options.push({ value: item.id, label: item.name });
    });
    setDropOptions(options);
  }, [data]);

  function convertFormDataToProductWriteType(formData: any): ProductWriteType {
    if(!formData.name || !formData.batchId || !formData.organizationId || !formData.imgUrl || !formData.certificationUrls || !formData.description 
      || !formData.finalLocation || !formData.IngredientsIds || !formData.dateOfProduction || !formData.dateOfTesting ) return ({
      name: '',
      batchId: '',
      organizationId: 0,
      imgUrl: '',
      certificationUrls: [''],
      description: '',
      ingredientIds: [0],
      dateOfProduction: 0,
      dateOfTesting: 0,
      finalLocation: ''
    });

    const convertedData: ProductWriteType = {
      name: formData.name,
      batchId: formData.batchId,
      organizationId: Number(formData.organizationId),
      imgUrl: formData.imgUrl,
      certificationUrls: formData.certificationUrls.split(','),
      description: formData.description,
      ingredientIds: formData.ingredientIds.map((id: any) => Number(id.value)),
      dateOfProduction: new Date(formData.dateOfProduction).getTime() / 1000,
      dateOfTesting: new Date(formData.dateOfTesting).getTime() / 1000,
      finalLocation: formData.finalLocation,
    };
    return convertedData;
  }

  const handleSubmit = () => {
    onAddProduct();
    closeModalHandler();
  };

  function onAddProduct() {
    write();
  }

  return (
    <ModalWrapper className="AddProductModal" isOpen={isOpen} closeModalHandler={closeModalHandler}>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="text-gray-900 dark:text-white text-center text-xl font-bold mb-5">Add New Product</div>
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
                            isMulti
                            required={field.required}
                          />
                        )}
                      />
                    ) : field.type === 'date' ? (
                      <Field
                        name={field.name}
                        render={({ input }) => (
                          <DatePicker
                            className="border-2 p-1 dark:border-gray-900"
                            dateFormat="dd/MM/yyyy"
                            selected={input.value}
                            onChange={(val) => {
                              input.onChange(val)
                            }}
                          />
                        )}
                      />
                    ) : (
                      <Field
                        className="border-2 p-2 w-3/5 dark:border-gray-900"
                        name={field.name}
                        component="input"
                        type={field.type}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="AddProductModal__container">
                <div className="AddProductModal__actions flex justify-end">
                  <button
                    className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={closeModalHandler}
                  >
                    Cancel
                  </button>
                  <button
                    className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-green-500 bg-white border border-green-300 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-200 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            <FormSpy
              subscription={{ values: true }}
              onChange={(formState) => {
                setFormData(convertFormDataToProductWriteType(formState.values));
              }}
            />
          </>
        )}
      />
    </ModalWrapper>
  );
};

export default AddProductModal;
