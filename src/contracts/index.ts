export const abi = [
  {
      "inputs":[],
      "stateMutability":"nonpayable",
      "type":"constructor"
  },

  {
      "anonymous":false,
      "inputs":[{
          "indexed":true,
          "internalType":"address",
          "name":"previousOwner",
          "type":"address"
      },

      {
          "indexed":true,
          "internalType":"address",
          "name":"newOwner",
          "type":"address"
      }],
      "name":"OwnershipTransferred",
      "type":"event"
  },

  {
      "inputs":[{
          "internalType":"string",
          "name":"_name",
          "type":"string"
      },

      {
          "internalType":"string",
          "name":"_batchId",
          "type":"string"
      },

      {
          "internalType":"uint16",
          "name":"_supplierId_",
          "type":"uint16"
      },

      {
          "internalType":"string",
          "name":"_imgUrl",
          "type":"string"
      },

      {
          "internalType":"string[]",
          "name":"_certificationUrls",
          "type":"string[]"
      },

      {
          "internalType":"string",
          "name":"_description",
          "type":"string"
      },

      {
          "internalType":"string",
          "name":"_finalLocation",
          "type":"string"
      }],
      "name":"addIngredientByOwner",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
  },

  {
      "inputs":[
      {
          "internalType":"string",
          "name":"_name",
          "type":"string"
      }],
      "name":"addOrganizationByOwner",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
      },

  {
      "inputs":[
      {
          "internalType":"string",
          "name":"_name",
          "type":"string"
      },

      {
          "internalType":"string",
          "name":"_batchIds",
          "type":"string"
      },

      {
          "internalType":"uint16",
          "name":"_organizationId_",
          "type":"uint16"
      },

      {
          "internalType":"string",
          "name":"_imgUrl",
          "type":"string"
      },

      {
          "internalType":"string[]",
          "name":"_certificationUrls",
          "type":"string[]"
      },

      {
          "internalType":"string",
          "name":"_description",
          "type":"string"
      },

      {
          "internalType":"uint16[]",
          "name":"_ingredientIds",
          "type":"uint16[]"
      },

      {
          "internalType":"uint40",
          "name":"_dateOfProduction",
          "type":"uint40"
      },

      {
          "internalType":"uint40",
          "name":"_dateOfTesting",
          "type":"uint40"
      },

      {
          "internalType":"string",
          "name":"_finalLocation",
          "type":"string"
      }],
      "name":"addProductByOwner",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
  },

  {
      "inputs":[
      {
          "internalType":"string",
          "name":"_name",
          "type":"string"
      }],
      "name":"addSupplierByOwner",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
  },

  {
      "inputs":[],
      "name":"getIngredients",
      "outputs":[
      {
          "components":[
          {
              "internalType":"uint16",
              "name":"id",
              "type":"uint16"
          },

          {
              "internalType":"string",
              "name":"name",
              "type":"string"
          },

          {
              "internalType":"string",
              "name":"batchId",
              "type":"string"
          },

          {
              "internalType":"uint16",
              "name":"supplierId",
              "type":"uint16"
          },

          {
              "internalType":"string",
              "name":"imgUrl",
              "type":"string"
          },

          {
              "internalType":"string[]",
              "name":"certificationUrls",
              "type":"string[]"
          },

          {
              "internalType":"string",
              "name":"description",
              "type":"string"
          },

          {
              "internalType":"string",
              "name":"finalLocation",
              "type":"string"
          },

          {
              "internalType":"uint40",
              "name":"timestamp",
              "type":"uint40"
          }],
          "internalType":"struct ReadyToProofChain.Ingredient[]",
          "name":"",
          "type":"tuple[]"
      }],
      "stateMutability":"view",
      "type":"function"
  },

  {
      "inputs":[],
      "name":"getOrganizations",
      "outputs":[
      {
          "components":[
          {
              "internalType":"uint16",
              "name":"id",
              "type":"uint16"
          },

          {
              "internalType":"string",
              "name":"name",
              "type":"string"
          }],
          "internalType":"struct ReadyToProofChain.Organization[]",
          "name":"",
          "type":"tuple[]"
      }],
      "stateMutability":"view",
      "type":"function"
  },

  {
      "inputs":[],
      "name":"getProducts",
      "outputs":[
      {
          "components":[
              {
                  "internalType":"uint16",
                  "name":"id",
                  "type":"uint16"
              },

          {
              "internalType":"string",
              "name":"name",
              "type":"string"
          },

          {
              "internalType":"string",
              "name":"batchId",
              "type":"string"
          },

          {
              "internalType":"uint16",
              "name":"organizationId",
              "type":"uint16"
          },

          {
              "internalType":"string",
              "name":"imgUrl",
              "type":"string"
          },

          {
              "internalType":"string[]",
              "name":"certificationUrls",
              "type":"string[]"
          },

          {
              "internalType":"string",
              "name":"description",
              "type":"string"
          },

          {
              "internalType":"uint16[]",
              "name":"ingredientIds",
              "type":"uint16[]"
          },

          {
              "internalType":"uint40",
              "name":"dateOfProduction",
              "type":"uint40"
          },

          {
              "internalType":"uint40",
              "name":"dateOfTesting",
              "type":"uint40"
          },

          {
              "internalType":"string",
              "name":"finalLocation",
              "type":"string"
          },

          {
              "internalType":"uint40",
              "name":"timestamp",
              "type":"uint40"
          }],
      "internalType":"struct ReadyToProofChain.Product[]",
      "name":"",
      "type":"tuple[]"
      }],
      "stateMutability":"view",
      "type":"function"
  },

  {
      "inputs":[],
      "name":"getSuppliers",
      "outputs":[
      {
          "components":[
              {
                  "internalType":"uint16",
                  "name":"id",
                  "type":"uint16"
              },

          {
              "internalType":"string",
              "name":"name",
              "type":"string"
          }],
      "internalType":"struct ReadyToProofChain.Supplier[]",
      "name":"",
      "type":"tuple[]"
      }],
      "stateMutability":"view",
      "type":"function"
  },

  {
    "inputs":[],
    "name":"owner",
    "outputs":[{
      "internalType":"address",
      "name":"",
      "type":"address"
    }],
    "stateMutability":"view",
    "type":"function"
  },

  {
    "inputs":[
    {
      "internalType":"uint256",
      "name":"_ingredientId_",
      "type":"uint256"
    }],
    "name":"removeIngredientByOwner",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },

  {
    "inputs":[
    {
      "internalType":"uint16",
      "name":"_organizationId_",
      "type":"uint16"
    }],
    "name":"removeOrganizationByOwner",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },

  {
    "inputs":[
    {
      "internalType":"uint16",
      "name":"_productId_",
      "type":"uint16"
    }],
    "name":"removeProductByOwner",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },

  {
    "inputs":[
    {
        "internalType":"uint16",
        "name":"_supplierId_",
        "type":"uint16"
    }],
    "name":"removeSupplierByOwner",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },

  {
    "inputs":[],
    "name":"renounceOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },

  {
    "inputs":[
    {
        "internalType":"address",
        "name":"newOwner",
        "type":"address"
    }],
    "name":"transferOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  }
] as const