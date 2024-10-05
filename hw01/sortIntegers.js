const fs = require('fs');
const path = require('path');

function processFile(inputFile, outputFile) {
    // The method reads an input file, processes each line, and writes the unique integers to an output file.
    const uniqueIntegers = new Set();

    const lines = fs.readFileSync(inputFile, 'utf-8').split('\n');

    for (let line of lines) {
        // Remove leading/trailing whitespace
        line = line.trim();

        // Skip empty lines or lines with multiple integers
        if (!line || line.split(/\s+/).length > 1) {
            continue;
        }

        // Use regex to match valid integers (positive or negative)
        const match = /^[-+]?\d+$/.test(line);
        if (match) {
            const num = parseInt(line, 10);
            // Add the number to the set for uniqueness
            uniqueIntegers.add(num);
        }
    }

    // Convert Set to array and sort the unique integers
    const sortedIntegers = Array.from(uniqueIntegers).sort((a, b) => a - b);

    // Write the result to the output file
    fs.writeFileSync(outputFile, sortedIntegers.join('\n') + '\n');
}

function processSampleFolder(sampleFolder, resultFolder) {
    // The method processes all .txt files in the sample folder and creates corresponding result files in the result folder.
    
    // Create the result folder if it doesn't exist
    if (!fs.existsSync(resultFolder)) {
        fs.mkdirSync(resultFolder);
    }

    // Process each file in the sample folder
    const files = fs.readdirSync(sampleFolder);
    files.forEach(filename => {
        if (filename.endsWith('.txt')) {
            const inputPath = path.join(sampleFolder, filename);
            const outputPath = path.join(resultFolder, `${filename}_result`);

            const startTime = Date.now();
            processFile(inputPath, outputPath);
            const endTime = Date.now();
            
            const elapsedTime = endTime - startTime;
            console.log(`Processed ${filename} in ${elapsedTime} milliseconds`);
        }
    });
}

// Usage
const sampleFolder = '../../sample_inputs';
const resultFolder = '../../sample_results';

// Show the elapsed time
const totalStartTime = Date.now();
processSampleFolder(sampleFolder, resultFolder);
const totalEndTime = Date.now();

const totalElapsedTimeMs = totalEndTime - totalStartTime;
console.log(`\nTotal processing time: ${totalElapsedTimeMs} milliseconds`);
