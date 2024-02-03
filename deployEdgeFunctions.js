const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const functionsDir = path.join(__dirname, 'edge-functions');
const supabaseDir = path.join(process.cwd(), 'supabase');
const projectRef = process.argv[2]; // Get the project ref from the command line arguments

// Verify that the project ref is provided
if (!projectRef) {
    console.error('Please provide the Supabase project ref as an argument.');
    process.exit(1);
}

// Execute a shell command
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(stderr);
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
}

// Delete the supabase directory if it exists
async function deleteSupabaseDir() {
    fs.rm(supabaseDir, { recursive: true, force: true }, (err) => {
        if (err) {
            return console.error(`Failed to delete Supabase directory: ${err}`);
        }
        console.log('Supabase directory deleted successfully');
    });
}

// Init the supabase project
async function initProject() {
    console.log(`Doing an init on Supabase project: ${projectRef}`);
    await deleteSupabaseDir(); // Ensure the supabase directory is deleted before initializing
    await executeCommand(`npx supabase init`);
}

// Deploy an Edge Function
async function deployFunction(functionName, functionPath) {
    try {
        // Step 1: Create the function using Supabase CLI via npx
        console.log(`Creating function: ${functionName}`);
        await executeCommand(`npx supabase functions new ${functionName}`);

        // Step 2: Copy the function code to the Supabase function directory
        const destPath = path.join(process.cwd()+"\\supabase\\functions", functionName, 'index.js');
        fs.copyFileSync(functionPath, destPath);
        console.log(`Function code for ${functionName} copied to ${destPath}`);

        // Step 3: Deploy the function via npx
        console.log(`Deploying function: ${functionName}`);
        await executeCommand(`npx supabase functions deploy ${functionName} --project-ref ${projectRef}`);
    } catch (error) {
        console.error(`Failed to deploy function ${functionName}:`, error);
    }
}

// Read all function files and deploy them
function deployAllFunctions() {
    fs.readdir(functionsDir, (err, files) => {
        if (err) {
            return console.error('Failed to read functions directory:', err);
        }

        files.forEach(file => {
            if (path.extname(file) === '.js') {
                const functionName = path.basename(file, '.js');
                const functionPath = path.join(functionsDir, file);
                deployFunction(functionName, functionPath);
            }
        });
    });
}

// Main function to init and deploy all functions
async function main() {
    try {
        await initProject();
        deployAllFunctions();
    } catch (error) {
        console.error('Failed to init project or deploy functions:', error);
    }
}

main();
