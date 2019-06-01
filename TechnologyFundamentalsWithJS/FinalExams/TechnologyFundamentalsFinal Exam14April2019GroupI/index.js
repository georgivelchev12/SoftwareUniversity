function solve(input) {



    for (let i = 0; i < input.length; i++) {
        let splited = input[i].split(/[!@#$?]/g).join('').split('=').join(' ').split('<<').join(' ');
        let [name,length,code] = splited.split(' ');
        length=+length
        if (name == 'Last note') {
            break;
        }
        if (!(code == undefined) && length == code.length && (!(name.includes('.')) && !(name.includes(',')))) {
            console.log(`Coordinates found! ${name} -> ${code}`);
            
        }
        else{
            console.log(`Nothing found!`);
        }
        
    }
}

// solve(['!@Ma?na?sl!u@=7<<tv58ycb4845',
//     'E!ve?rest=.6<<tuvz26',
// '!K@2.,##$=4<<tvnd',
//     '!Shiha@pan@gma##9<<tgfgegu67',
//     '!###Anna@pur@na##=16<<tv5dekdz8x11ddkc',
//     'Last note']
//     )


solve(['Ka?!#nch@@en@ju##nga@=3<<thfbghvn',
    '=9Cho?@#Oyu<<thvb7ydht',
    'Nan??ga#Par!ba!t?=16<<twm03q2rx5hpmyr6',
    'Dhau??la#gi@ri?!#=3<<bvnfhrtiuy',
    'Last note'
    )