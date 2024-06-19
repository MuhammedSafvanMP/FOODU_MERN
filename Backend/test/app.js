


var expect = function(val) {
    return {
        toBe: (number) =>  {
            if(number === val) return true;
            else throw new Error("Not Equal")
        },
        notToBe: (number) => {
            if(number !== val) return true;
            else throw new Error("Not Equal")
        }
    }
};



let func = () => expect(5).toBe(5)

console.log(func());

// Output: 
// Explanation: 5 === 5 so this expression returns true.