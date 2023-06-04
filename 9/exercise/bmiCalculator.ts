const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height/100)**2);
    if(bmi < 18.5) {
        return("Underweight")
    }
    if(bmi > 29.9) {
        return("Obese")
    }
    if(bmi > 24.9) {
        return("Overweight")
    }
    return("Normal (healthy weight)");
}

console.log(calculateBmi(180,74))