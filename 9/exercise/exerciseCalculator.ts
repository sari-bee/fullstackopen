interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
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
    let rating = 2
    let ratingDescription = "not too bad but could be better"
    let success = true;
    if (average < target) {
        success = false;
    }
    if (average < target-1) {
        rating = 1
        ratingDescription = "maybe better next time"
    }
    if (average > target+1) {
        rating = 3
        ratingDescription = "wow, you're a pro!"
    }
    const res = {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    }
    return res
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))