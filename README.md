
# Supabase Edge Function Deployer

This tool automates the deployment of edge functions to your Supabase project. Before using this script, ensure you have completed the necessary preliminary steps, including logging into Supabase CLI, having an existing Supabase project, and installing the required npm packages.

## Prerequisites

- Node.js (v14.14.0 or higher recommended)
- Supabase CLI installed globally
- An existing Supabase project

## Setup Instructions

### 1. Install Node.js and npm

Ensure you have Node.js and npm installed on your system. You can download them from [Node.js official website](https://nodejs.org/).

### 2. Install Supabase CLI

If you haven't already, install the Supabase CLI globally using npm:

```sh
npm install -g supabase
```

### 3. Login to Supabase CLI

Login to your Supabase account via the CLI to access your projects. Run the following command and follow the prompts:

```sh
supabase login
```

### 4. Obtain Your Supabase Project Reference ID

You will need your Supabase project's reference ID to use this script. You can find this ID in your project's settings on the Supabase dashboard.

### 5. Clone the Repository

Clone this repository to your local machine:

```sh
git clone <REPOSITORY_URL>
cd <REPOSITORY_DIRECTORY>
```

Replace `<REPOSITORY_URL>` with the actual URL of this repository and `<REPOSITORY_DIRECTORY>` with the name of the directory where you cloned the repository.

### 6. Install npm Packages

Before running the script, install the necessary npm packages:

```sh
npm install
```

## Running the Script

To deploy your edge functions, run the script with your Supabase project reference ID as an argument:

```sh
node <SCRIPT_NAME>.js <PROJECT_REF>
```

Replace `<SCRIPT_NAME>` with the name of the main script file (if it's not already specified) and `<PROJECT_REF>` with your Supabase project reference ID.

## Note

Before every execution, the script will automatically delete the existing `supabase` directory to prevent conflicts and ensure a fresh deployment environment.

## Contributing

We welcome contributions to improve this script. Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
