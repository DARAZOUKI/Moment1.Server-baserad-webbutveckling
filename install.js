const { exec } = require('child_process');

// Function to install dependencies using npm
const installDependencies = () => {
  return new Promise((resolve, reject) => {
    console.log('Installing dependencies...');
    const npmCommand = 'npm install';
    exec(npmCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing dependencies: ${error}`);
        reject(error);
      } else {
        console.log(`Dependencies installed successfully: ${stdout}`);
        resolve();
      }
    });
  });
};

// Main function to run installation steps
const install = async () => {
  try {
    await installDependencies();
    console.log('Installation completed successfully.');
  } catch (error) {
    console.error('Installation failed:', error);
    process.exit(1); // Exit with non-zero status to indicate failure
  }
};

// Run the installation process
install();
