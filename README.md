# Covalent Azure Serverless
This repository is a Covalent Serverless Application deployed on Microsoft Azure. This wrapper will assist developers who want to utilize Covalent data without any server setup needed (serverless).

## Azure Service
[Azure Functions](https://azure.microsoft.com/services/functions/) - Service for create function to interact with [Covalent API](https://www.covalenthq.com/docs/api).

### Sample Service URL
[DEMO](https://covalent.azurewebsites.net/api/request?path=/chains)

### Getting Started
- Go to [Documentation](https://docs.microsoft.com/azure/azure-functions/create-first-function-cli-node)

- Start with [Configure your local environment](https://docs.microsoft.com/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli#configure-your-local-environment)
  - Create an account
  - Install [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools)
  - Install [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)

- Then, [Create supporting Azure resources](https://docs.microsoft.com/azure/azure-functions/create-first-function-cli-node#create-supporting-azure-resources-for-your-function)
  - Login

    ```
    az login
    ```

  - Create a resource group with your group name in your region:
    <br>
    - In this example, we use `RESOURCE_GROUP_NAME = covalent-rg` and `REGION = westeurope`
    <br>

    ```
    az group create --name covalent-rg --location westeurope
    ```

  - Create a general-purpose storage account in your resource group and region:
    <br>
    - In this example, we use `STORAGE_ACCOUNT_NAME = covalentstorage`
    <br>

    ```
    az storage account create --name covalentstorage --location westeurope --resource-group covalent-rg --sku Standard_LRS
    ```

  - Create a function app:
    <br>
    - In this example, we use `APP_NAME = covalent`
    <br>

    ```
    az functionapp create --resource-group covalent-rg --consumption-plan-location westeurope --runtime node --runtime-version 12 --functions-version 3 --name covalent --storage-account covalentstorage
    ```

- Finally, [Deploy the function project to Azure](https://docs.microsoft.com/azure/azure-functions/create-first-function-cli-node#deploy-the-function-project-to-azure)
  - Go to your project directory
  - Install dependencies

    ```
    npm install
    ```
  - Inside [index.js](/request/index.js) file, set your `api_key`.

  - Deploy project

    ```
    func azure functionapp publish covalent
    ```

- After deploy project successfully, you will find `API endpoint` at `Invoke url:`.

  <img width="560" alt="deploy-app" src="https://user-images.githubusercontent.com/13881651/126163773-c253180f-7eef-446c-b168-eaaf898fe522.png">

- How to use your API on Microsoft Azure
  ```
  GET {API endpoint}?path={COVALENT_API_PATH}&param1=value1&param2=value2&...
  ```
