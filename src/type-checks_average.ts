import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to ask a question and return a Promise<string>
function ask(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

// Function to safely get a valid number
async function getValidNumber(prompt: string): Promise<number> {
    while (true) {
        const input: string = await ask(prompt);
        const num: number = Number(input);

        if (!isNaN(num)) {
            return num;
        } else {
            console.log("Invalid input. Please enter a valid number.");
        }
    }
}

async function main(): Promise<void> {
    const count: number = await getValidNumber("How many numbers do you want to enter? ");

    const numbers: number[] = [];

    for (let i = 0; i < count; i++) {
        const value: number = await getValidNumber(`Enter number ${i + 1}: `);
        numbers.push(value);
    }

    const sum: number = numbers.reduce((acc, curr) => acc + curr, 0);
    const average: number = sum / numbers.length;

    console.log(`Average is: ${average}`);

    rl.close();
}

main();