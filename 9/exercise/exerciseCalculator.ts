interface ExerciseValues {
    value1: number;
    value2: number[];
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        const c = [];
        for (let k = 3; k < args.length; k++) {
            if(isNaN(Number(args[k]))) {
                throw new Error('Provided values are not numbers');
            }
            c[k-3] = Number(args[k]);
        }
        return {
            value1: Number(args[2]),
            value2: c
        };
    } else {
        throw new Error('Provided values are not numbers');
    }
};

export const calculateExercises = (target: number, hours: number[]): Result => {
    let trainingDays = 0;
    for (let i = 0; i < hours.length; i++) {
        if (hours[i] > 0) {
            trainingDays += 1;
        }
    }
    let sum = 0;
    for (let j = 0; j < hours.length; j++) {
        sum += hours[j];
    }
    const average = sum/hours.length;
    let rating = 2;
    let ratingDescription = "not too bad but could be better";
    let success = true;
    if (average < target) {
        success = false;
    }
    if (average < target-1) {
        rating = 1;
        ratingDescription = "maybe better next time";
    }
    if (average > target+1) {
        rating = 3;
        ratingDescription = "wow, you're a pro!";
    }
    const res = {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
    return res;
};

try {
    const { value1, value2 } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage = 'Error: ' + error.message;
    }
    console.log(errorMessage);
}