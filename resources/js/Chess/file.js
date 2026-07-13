// Input :
const data = [
    { name: "Ali", note: 10 },
    { name: "Sara", note: 15 },
    { name: "Ali", note: 14 },
    { name: "Omar", note: 12 }
];

// Demande :
// Calculer la moyenne des notes pour chaque étudiant

// Output attendu :

//  [
//   { name: "Ali", moyenne: 12 },
//   { name: "Sara", moyenne: 15 },
//   { name: "Omar", moyenne: 12 }
//  ]

let result = [];
let passed = [];

data.forEach(({ name, note }) => {
    if(passed.includes(name))
        let count = 0;
        let last_name = name
        let total = 0;

        data.forEach(({ name, note }) => {
            if (name == last_name) {
                total += note;
                count++;
            }
        })

        result.push({ name: last_name, note: total/count });
})
