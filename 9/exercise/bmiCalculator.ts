interface BmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('Provided values are not numbers');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height/100)**2);
    if(bmi < 18.5) {
        return("Underweight");
    }
    if(bmi > 29.9) {
        return("Obese");
    }
    if(bmi > 24.9) {
        return("Overweight");
    }
    return("Normal (healthy weight)");
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage = 'Error: ' + error.message;
    }
    console.log(errorMessage);
}